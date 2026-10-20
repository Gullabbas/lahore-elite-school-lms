import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { FeeVoucherGenerateSchema } from "@/lib/validations";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const classId = searchParams.get("classId");

    const vouchers = await prisma.feeVoucher.findMany({
      where: {
        AND: [
          status ? { status } : {},
          classId ? { student: { classId } } : {},
        ],
      },
      include: {
        student: { include: { class: true, section: true, campus: true } },
        payments: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, vouchers });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to fetch fee vouchers" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = FeeVoucherGenerateSchema.parse(body);

    // Fetch target students
    const students = await prisma.student.findMany({
      where: {
        enrollmentStatus: "ACTIVE",
        ...(validated.classId ? { classId: validated.classId } : {}),
        ...(validated.studentId ? { id: validated.studentId } : {}),
      },
      include: {
        feeVouchers: {
          where: { feeMonth: validated.feeMonth },
        },
      },
    });

    const createdVouchers = [];

    for (const student of students) {
      // Check if voucher already exists for this month to prevent duplicate vouchers
      if (student.feeVouchers.length > 0) {
        continue;
      }

      // Check previous unpaid balance
      const unpaidVouchers = await prisma.feeVoucher.findMany({
        where: {
          studentId: student.id,
          status: { in: ["UNPAID", "PARTIAL"] },
        },
      });
      const previousBalance = unpaidVouchers.reduce((acc, v) => acc + v.balance, 0);

      const tuitionFee = student.monthlyTuitionFee;
      const discount = student.discountAmount;
      const otherCharges = 500; // Standard activity/exam charge
      const totalAmount = tuitionFee + otherCharges - discount + previousBalance;

      const randomSeq = Math.floor(1000 + Math.random() * 9000);
      const voucherNo = `VOU-${validated.feeMonth.slice(0, 3).toUpperCase()}-${student.admissionNo.slice(-3)}-${randomSeq}`;

      const voucher = await prisma.feeVoucher.create({
        data: {
          voucherNo,
          studentId: student.id,
          academicSessionId: validated.academicSessionId,
          feeMonth: validated.feeMonth,
          dueDate: new Date(validated.dueDate),
          tuitionFee,
          otherCharges,
          discount,
          previousBalance,
          totalAmount,
          paidAmount: 0,
          balance: totalAmount,
          status: "UNPAID",
        },
      });

      createdVouchers.push(voucher.voucherNo);
    }

    await prisma.auditLog.create({
      data: {
        action: "CREATE",
        entity: "FEE",
        details: `Generated ${createdVouchers.length} fee vouchers for month: ${validated.feeMonth}`,
      },
    });

    return NextResponse.json({
      success: true,
      message: `Generated ${createdVouchers.length} fee vouchers successfully.`,
      vouchersCount: createdVouchers.length,
    });
  } catch (error: any) {
    console.error("Voucher generation error:", error);
    return NextResponse.json(
      { success: false, message: error.errors?.[0]?.message || "Failed to generate fee vouchers" },
      { status: 400 }
    );
  }
}
