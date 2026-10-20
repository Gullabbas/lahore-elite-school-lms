import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatPKR, formatDate } from "@/lib/utils";
import { Receipt, Printer } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function StaffSalaryPage() {
  const staff = await prisma.staff.findFirst({
    include: {
      payrolls: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  const payrolls = staff?.payrolls || [];

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-2xl border border-school-border shadow-sm">
        <h1 className="text-xl font-bold text-school-navy">My Monthly Salary Slips</h1>
        <p className="text-xs text-school-muted">
          Your personal verified compensation records, breakdown, and printable salary vouchers.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-school-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 font-bold text-school-navy border-b">
              <tr>
                <th className="py-3 px-4">Period</th>
                <th className="py-3 px-4">Basic Salary</th>
                <th className="py-3 px-4">Allowances</th>
                <th className="py-3 px-4">Deductions</th>
                <th className="py-3 px-4 font-black">Net Disbursed</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Print Voucher</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-school-border text-school-text">
              {payrolls.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-bold text-school-navy">{p.payrollMonth} {p.payrollYear}</td>
                  <td className="py-3 px-4">{formatPKR(p.basicSalary)}</td>
                  <td className="py-3 px-4 text-emerald-700">+{formatPKR(p.allowances)}</td>
                  <td className="py-3 px-4 text-rose-700">-{formatPKR(p.deductions)}</td>
                  <td className="py-3 px-4 font-black text-school-navy text-sm">{formatPKR(p.netPayable)}</td>
                  <td className="py-3 px-4">
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      {p.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Link
                      href={`/admin/payroll/slip/${p.id}`}
                      className="px-3 py-1 rounded bg-school-navy text-white font-bold text-[10px] hover:bg-school-navy-light inline-flex items-center space-x-1"
                    >
                      <Printer className="w-3 h-3 text-school-gold" />
                      <span>Print Slip</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
