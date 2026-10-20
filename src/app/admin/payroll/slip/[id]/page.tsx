import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatPKR, formatDate } from "@/lib/utils";
import PrintButton from "@/components/ui/PrintButton";
import { ArrowLeft } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function SalarySlipPrintPage({ params }: { params: { id: string } }) {
  const payroll = await prisma.payroll.findUnique({
    where: { id: params.id },
    include: {
      staff: { include: { campus: true } },
    },
  });

  if (!payroll) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-school-border shadow-sm no-print">
        <Link
          href="/admin/payroll"
          className="text-xs font-semibold text-school-navy hover:underline flex items-center space-x-1"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Payroll</span>
        </Link>
        <PrintButton label="Print Salary Slip (A4)" />
      </div>

      {/* A4 Salary Slip */}
      <div className="printable-document max-w-2xl mx-auto bg-white p-8 sm:p-10 rounded-2xl border-2 border-school-navy shadow-lg relative overflow-hidden">
        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
          <div className="relative w-80 h-80">
            <Image src="/images/brand/logo.png" alt="Watermark" fill className="object-contain" />
          </div>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-school-navy pb-4 mb-6">
          <div className="flex items-center space-x-3">
            <div className="relative w-14 h-14 rounded-full overflow-hidden border border-school-gold bg-white p-0.5 shrink-0">
              <Image src="/images/brand/logo.png" alt="Logo" fill className="object-contain" />
            </div>
            <div>
              <h1 className="text-lg font-black text-school-navy uppercase tracking-tight">
                Lahore Elite School
              </h1>
              <span className="text-xs text-school-muted block">
                {payroll.staff.campus.name} • Multan Road, Lahore
              </span>
              <span className="text-xs font-bold text-school-navy block">
                Official Staff Salary Voucher
              </span>
            </div>
          </div>

          <div className="text-right">
            <span className="px-3 py-1 rounded bg-school-navy text-white text-xs font-bold uppercase tracking-wider block">
              PAYSLIP
            </span>
            <span className="text-xs font-bold text-school-navy block mt-1">
              {payroll.payrollMonth} {payroll.payrollYear}
            </span>
          </div>
        </div>

        {/* Employee Meta Details */}
        <div className="grid grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6">
          <div>
            <span className="text-school-muted block text-[10px]">Employee Name:</span>
            <strong className="text-school-navy text-sm block">{payroll.staff.fullName}</strong>
          </div>
          <div>
            <span className="text-school-muted block text-[10px]">Employee ID:</span>
            <span className="font-mono font-bold text-school-navy text-sm block">{payroll.staff.employeeId}</span>
          </div>
          <div>
            <span className="text-school-muted block text-[10px]">Designation:</span>
            <span className="font-semibold text-slate-700">{payroll.staff.designation}</span>
          </div>
          <div>
            <span className="text-school-muted block text-[10px]">Department:</span>
            <span className="font-semibold text-slate-700">{payroll.staff.department}</span>
          </div>
        </div>

        {/* Salary Breakdown Table */}
        <div className="border border-slate-200 rounded-xl overflow-hidden mb-6">
          <table className="w-full text-left text-xs">
            <thead className="bg-school-navy text-white font-bold">
              <tr>
                <th className="py-2.5 px-4">Earnings / Allowances</th>
                <th className="py-2.5 px-4 text-right">Amount (PKR)</th>
                <th className="py-2.5 px-4 border-l border-white/20">Deductions</th>
                <th className="py-2.5 px-4 text-right">Amount (PKR)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="py-2.5 px-4">Basic Pay</td>
                <td className="py-2.5 px-4 text-right font-medium">{formatPKR(payroll.basicSalary)}</td>
                <td className="py-2.5 px-4 border-l">Tax / Standard Deductions</td>
                <td className="py-2.5 px-4 text-right font-medium text-rose-700">{formatPKR(payroll.deductions)}</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4">Special Teaching Allowance</td>
                <td className="py-2.5 px-4 text-right font-medium text-emerald-700">+{formatPKR(payroll.allowances)}</td>
                <td className="py-2.5 px-4 border-l">Other Deductions / Leaves</td>
                <td className="py-2.5 px-4 text-right font-medium">₨ 0</td>
              </tr>
            </tbody>
            <tfoot className="border-t-2 border-school-navy bg-school-gold-light/40 font-bold text-sm text-school-navy">
              <tr>
                <td colSpan={3} className="py-3 px-4 text-right font-black">
                  Net Salary Payable (PKR):
                </td>
                <td className="py-3 px-4 text-right font-black text-base">
                  {formatPKR(payroll.netPayable)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Disbursement Meta */}
        <div className="text-xs text-school-muted space-y-1 mb-8">
          <div className="flex justify-between">
            <span>Payment Status:</span>
            <strong className="text-emerald-700 uppercase font-black">{payroll.status}</strong>
          </div>
          {payroll.paymentDate && (
            <div className="flex justify-between">
              <span>Disbursement Date:</span>
              <span className="font-semibold text-slate-700">{formatDate(payroll.paymentDate)}</span>
            </div>
          )}
          {payroll.paymentMethod && (
            <div className="flex justify-between">
              <span>Mode of Transfer:</span>
              <span className="font-semibold text-slate-700">{payroll.paymentMethod} ({payroll.paymentRef || "Verified"})</span>
            </div>
          )}
        </div>

        {/* Signatures */}
        <div className="pt-8 border-t border-slate-300 grid grid-cols-2 text-center text-xs text-slate-700">
          <div className="border-t border-slate-400 mx-6 pt-1">
            <span className="font-bold">Employee Signature</span>
          </div>
          <div className="border-t border-slate-400 mx-6 pt-1">
            <span className="font-bold">Principal / Authorized Signatory</span>
          </div>
        </div>
      </div>
    </div>
  );
}
