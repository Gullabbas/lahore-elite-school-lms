import React from "react";
import { prisma } from "@/lib/prisma";
import PayrollManager from "@/components/admin/PayrollManager";

export const dynamic = "force-dynamic";

export default async function AdminPayrollPage() {
  const [payrolls, staff] = await Promise.all([
    prisma.payroll.findMany({
      include: {
        staff: { include: { campus: true } },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.staff.findMany({
      where: { status: "ACTIVE" },
      orderBy: { employeeId: "asc" },
    }),
  ]);

  return (
    <PayrollManager
      initialPayrolls={payrolls.map((p) => ({
        ...p,
        paymentDate: p.paymentDate ? p.paymentDate.toISOString() : null,
      }))}
      staffList={staff as any}
    />
  );
}
