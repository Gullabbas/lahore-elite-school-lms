import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { PaymentRecordSchema } from "@/lib/validations";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = PaymentRecordSchema.parse(body);

    const voucher = await prisma.feeVoucher.findUnique({
      where: { id: validated.voucherId },
      include: { student: true },
    });

    if (!voucher) {
      return NextResponse.json({ success: false, message: "Fee voucher not found" }, { status: 404 });
    }

    if (validated.amount > voucher.balance) {
      return NextResponse.json(
        { success: false, message: `Payment amount cannot exceed outstanding balance of ₨${voucher.balance}` },
        { status: 400 }
      );
    }

    const randomSeq = Math.floor(1000 + Math.random() * 9000);
    const receiptNo = `REC-2025-${randomSeq}`;

    // Record payment
    const payment = await prisma.payment.create({
      data: {
        receiptNo,
        voucherId: voucher.id,
        studentId: voucher.studentId,
        amount: validated.amount,
        paymentDate: new Date(),
        paymentMethod: validated.paymentMethod,
        referenceNo: validated.referenceNo || null,
        receivedBy: validated.receivedBy || "Accounts Officer",
        notes: validated.notes || null,
      },
    });

    // Update voucher
    const newPaidAmount = voucher.paidAmount + validated.amount;
    const newBalance = voucher.totalAmount - newPaidAmount;
    const newStatus = newBalance <= 0 ? "PAID" : "PARTIAL";

    await prisma.feeVoucher.update({
      where: { id: voucher.id },
      data: {
        paidAmount: newPaidAmount,
        balance: newBalance,
        status: newStatus,
      },
    });

    // Check if student has any other overdue vouchers
    const otherUnpaid = await prisma.feeVoucher.count({
      where: {
        studentId: voucher.studentId,
        status: { in: ["UNPAID", "PARTIAL"] },
      },
    });

    await prisma.student.update({
      where: { id: voucher.studentId },
      data: {
        feeStatus: otherUnpaid === 0 ? "CURRENT" : "OVERDUE",
      },
    });

    // Audit log
    await prisma.auditLog.create({
      data: {
        action: "PAYMENT_RECORDED",
        entity: "FEE",
        entityId: payment.id,
        details: `Recorded fee payment of ₨${validated.amount} for ${voucher.student.fullName} (Receipt: ${receiptNo})`,
      },
    });

    return NextResponse.json({
      success: true,
      message: `Payment of ₨${validated.amount} recorded successfully. Receipt No: ${receiptNo}`,
      receiptNo,
      voucherStatus: newStatus,
      balance: newBalance,
    });
  } catch (error: any) {
    console.error("Payment recording error:", error);
    return NextResponse.json(
      { success: false, message: error.errors?.[0]?.message || "Payment recording failed" },
      { status: 400 }
    );
  }
}
