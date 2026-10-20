import React from "react";
import { getStudentContext } from "@/lib/student";
import { prisma } from "@/lib/prisma";
import StudentFeesManager from "@/components/student/StudentFeesManager";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Fee Vouchers & Receipts | Lahore Elite School",
};

export default async function StudentFeesPage() {
  const student = await getStudentContext();

  if (!student) {
    return (
      <div className="p-8 text-center bg-white rounded-2xl border border-school-border">
        <p className="text-sm text-school-muted">Student profile not found.</p>
      </div>
    );
  }

  // Fetch all fee vouchers for this student
  const vouchers = await prisma.feeVoucher.findMany({
    where: { studentId: student.id },
    orderBy: { issueDate: "desc" },
  });

  // Fetch all payment receipts
  const payments = await prisma.payment.findMany({
    where: { studentId: student.id },
    orderBy: { paymentDate: "desc" },
    include: { voucher: true },
  });

  return (
    <StudentFeesManager
      student={{
        id: student.id,
        fullName: student.fullName,
        admissionNo: student.admissionNo,
        monthlyTuitionFee: student.monthlyTuitionFee,
        discountAmount: student.discountAmount,
      }}
      initialVouchers={vouchers.map((v) => ({
        id: v.id,
        voucherNo: v.voucherNo,
        feeMonth: v.feeMonth,
        dueDate: v.dueDate.toISOString(),
        tuitionFee: v.tuitionFee,
        otherCharges: v.otherCharges,
        discount: v.discount,
        totalAmount: v.totalAmount,
        paidAmount: v.paidAmount,
        balance: v.balance,
        status: v.status,
      }))}
      payments={payments.map((p) => ({
        id: p.id,
        receiptNo: p.receiptNo,
        paymentDate: p.paymentDate.toISOString(),
        amount: p.amount,
        paymentMethod: p.paymentMethod,
        receivedBy: p.receivedBy,
        voucher: {
          voucherNo: p.voucher.voucherNo,
        },
      }))}
    />
  );
}
