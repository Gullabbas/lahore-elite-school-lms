import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatPKR, formatDate } from "@/lib/utils";
import DefaultersTable from "@/components/admin/DefaultersTable";
import { AlertTriangle, ArrowLeft, Receipt, MessageSquare } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDefaultersPage() {
  // Query vouchers with positive unpaid balance
  const overdueVouchers = await prisma.feeVoucher.findMany({
    where: {
      status: { in: ["UNPAID", "PARTIAL"] },
      balance: { gt: 0 },
    },
    include: {
      student: { include: { class: true, section: true, campus: true } },
      payments: { orderBy: { paymentDate: "desc" }, take: 1 },
    },
    orderBy: { balance: "desc" },
  });

  const defaulters = overdueVouchers.map((v) => ({
    voucherId: v.id,
    voucherNo: v.voucherNo,
    studentId: v.student.id,
    studentName: v.student.fullName,
    admissionNo: v.student.admissionNo,
    className: `${v.student.class.name} (${v.student.section.name})`,
    guardianName: v.student.fatherName,
    guardianPhone: v.student.phone,
    feeMonth: v.feeMonth,
    outstandingAmount: v.balance,
    dueDate: v.dueDate.toISOString(),
    lastPaymentDate: v.payments[0]?.paymentDate.toISOString() || null,
  }));

  const totalOutstanding = defaulters.reduce((acc, d) => acc + d.outstandingAmount, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-school-border shadow-sm">
        <div className="flex items-center space-x-3">
          <Link
            href="/admin/fees"
            className="p-2 rounded-lg border border-school-border hover:bg-slate-50 text-school-muted hover:text-school-navy"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded">
              Accounts Receivable
            </span>
            <h1 className="text-xl font-bold text-school-navy mt-1">Fee Defaulters & Overdue Reminders</h1>
            <p className="text-xs text-school-muted">
              Monitoring {defaulters.length} overdue student balances. Send pre-filled reminders via official WhatsApp click-to-chat.
            </p>
          </div>
        </div>

        <div className="bg-rose-50 border border-rose-200 px-4 py-2.5 rounded-xl text-right">
          <span className="text-[10px] font-bold text-rose-700 uppercase tracking-wider block">
            Total Overdue Receivables
          </span>
          <span className="text-lg font-black text-rose-700">{formatPKR(totalOutstanding)}</span>
        </div>
      </div>

      <DefaultersTable defaulters={defaulters} />
    </div>
  );
}
