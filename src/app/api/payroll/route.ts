import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const payrolls = await prisma.payroll.findMany({
      include: { staff: { include: { campus: true } } },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, payrolls });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to fetch payroll" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { payrollMonth, payrollYear, staffId, allowances, deductions } = await req.json();

    const staff = await prisma.staff.findUnique({
      where: { id: staffId },
    });
    if (!staff) {
      return NextResponse.json({ success: false, message: "Staff member not found" }, { status: 404 });
    }

    // Check duplicate payroll
    const existing = await prisma.payroll.findUnique({
      where: {
        payrollMonth_payrollYear_staffId: {
          payrollMonth,
          payrollYear: parseInt(payrollYear),
          staffId,
        },
      },
    });
    if (existing) {
      return NextResponse.json(
        { success: false, message: `Payroll for ${payrollMonth} ${payrollYear} already generated for this staff member.` },
        { status: 400 }
      );
    }

    const basicSalary = staff.basicSalary;
    const allow = parseFloat(allowances) || 0;
    const deduct = parseFloat(deductions) || 0;
    const netPayable = basicSalary + allow - deduct;

    const payroll = await prisma.payroll.create({
      data: {
        payrollMonth,
        payrollYear: parseInt(payrollYear),
        staffId,
        basicSalary,
        allowances: allow,
        deductions: deduct,
        netPayable,
        status: "PENDING",
      },
    });

    await prisma.auditLog.create({
      data: {
        action: "CREATE",
        entity: "PAYROLL",
        entityId: payroll.id,
        details: `Generated payroll of ₨${netPayable} for ${staff.fullName} (${payrollMonth} ${payrollYear})`,
      },
    });

    return NextResponse.json({ success: true, payroll });
  } catch (error: any) {
    console.error("Payroll generation error:", error);
    return NextResponse.json({ success: false, message: "Failed to generate payroll" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { payrollId, paymentMethod, paymentRef } = await req.json();

    const payroll = await prisma.payroll.update({
      where: { id: payrollId },
      data: {
        status: "PAID",
        paymentDate: new Date(),
        paymentMethod: paymentMethod || "Bank Transfer",
        paymentRef: paymentRef || null,
      },
      include: { staff: true },
    });

    await prisma.auditLog.create({
      data: {
        action: "SALARY_PAID",
        entity: "PAYROLL",
        entityId: payroll.id,
        details: `Disbursed salary of ₨${payroll.netPayable} to ${payroll.staff.fullName} via ${paymentMethod}`,
      },
    });

    return NextResponse.json({ success: true, message: "Salary marked as paid successfully" });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to update payroll status" }, { status: 500 });
  }
}
