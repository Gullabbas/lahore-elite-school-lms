import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getStudentContext } from "@/lib/student";

export async function POST(req: Request) {
  try {
    const student = await getStudentContext();
    if (!student) {
      return NextResponse.json({ success: false, message: "Student record not found" }, { status: 404 });
    }

    const body = await req.json().catch(() => ({}));
    const feeMonth = body.feeMonth || new Date().toLocaleString("en-US", { month: "long", year: "numeric" });

    // Check if voucher for this month already exists
    const existing = await prisma.feeVoucher.findFirst({
      where: {
        studentId: student.id,
        feeMonth,
      },
    });

    if (existing) {
      return NextResponse.json({
        success: true,
        message: `Fee voucher for ${feeMonth} already exists (Voucher #${existing.voucherNo}).`,
        voucher: existing,
        isExisting: true,
      });
    }

    // Calculate voucher amounts based on student data & fee structure
    const tuitionFee = student.monthlyTuitionFee || 5000;
    const discount = student.discountAmount || 0;
    const totalAmount = Math.max(0, tuitionFee - discount);

    // Calculate due date (10th of current/selected month)
    const dueDate = new Date();
    dueDate.setDate(10);
    dueDate.setMonth(dueDate.getMonth() + 1); // 10th of next month

    const voucherCounter = await prisma.feeVoucher.count();
    const voucherNo = `VOU-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, "0")}-${String(
      voucherCounter + 1
    ).padStart(4, "0")}`;

    const newVoucher = await prisma.feeVoucher.create({
      data: {
        voucherNo,
        studentId: student.id,
        academicSessionId: student.academicSessionId,
        feeMonth,
        tuitionFee,
        discount,
        otherCharges: 0,
        previousBalance: 0,
        totalAmount,
        paidAmount: 0,
        balance: totalAmount,
        status: "UNPAID",
        dueDate,
      },
    });

    return NextResponse.json({
      success: true,
      message: `Fee voucher generated successfully for ${feeMonth}.`,
      voucher: newVoucher,
      isExisting: false,
    });
  } catch (error: any) {
    console.error("Generate student voucher error:", error);
    return NextResponse.json({ success: false, message: error.message || "Failed to generate fee voucher" }, { status: 500 });
  }
}
