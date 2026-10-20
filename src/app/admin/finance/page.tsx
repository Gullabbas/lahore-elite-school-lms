import React from "react";
import { prisma } from "@/lib/prisma";
import FinanceManager from "@/components/admin/FinanceManager";

export const dynamic = "force-dynamic";

export default async function AdminFinancePage() {
  const [records, feePayments, payrollPayments, campuses] = await Promise.all([
    prisma.incomeExpense.findMany({
      include: { campus: true },
      orderBy: { date: "desc" },
    }),
    prisma.payment.aggregate({
      _sum: { amount: true },
    }),
    prisma.payroll.aggregate({
      _sum: { netPayable: true },
      where: { status: "PAID" },
    }),
    prisma.campus.findMany({
      where: { isActive: true },
    }),
  ]);

  return (
    <FinanceManager
      initialRecords={records.map((r) => ({
        ...r,
        date: r.date.toISOString(),
      }))}
      feesCollected={feePayments._sum.amount || 0}
      payrollPaid={payrollPayments._sum.netPayable || 0}
      campuses={campuses as any}
    />
  );
}
