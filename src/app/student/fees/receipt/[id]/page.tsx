import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatPKR, formatDate } from "@/lib/utils";
import PrintButton from "@/components/ui/PrintButton";
import { ArrowLeft, CheckCircle2, ShieldCheck, Printer } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Paid Fee Receipt | Lahore Elite School",
};

export default async function StudentPaidReceiptPage({ params }: { params: { id: string } }) {
  const voucher = await prisma.feeVoucher.findUnique({
    where: { id: params.id },
    include: {
      student: {
        include: {
          class: true,
          section: true,
          campus: true,
          academicSession: true,
        },
      },
      academicSession: true,
      payments: {
        orderBy: { paymentDate: "desc" },
      },
    },
  });

  if (!voucher) {
    notFound();
  }

  const isPaid = voucher.status === "PAID" || voucher.paidAmount > 0;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Top Action Bar (hidden in print) */}
      <div className="no-print flex items-center justify-between bg-white p-4 rounded-2xl border border-school-border shadow-sm">
        <Link
          href="/student/fees"
          className="inline-flex items-center space-x-1.5 text-xs font-bold text-school-navy hover:text-school-navy-light"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Fee Portal</span>
        </Link>
        <div className="flex items-center space-x-3">
          <PrintButton label="Print Official Receipt" />
        </div>
      </div>

      {/* Official Printable Receipt Document */}
      <div className="printable-document bg-white rounded-3xl border-2 border-school-navy/20 p-6 sm:p-10 shadow-lg relative overflow-hidden">
        {/* Background Watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none select-none">
          <div className="relative w-80 h-80">
            <Image src="/images/brand/logo.png" alt="Watermark" fill className="object-contain" />
          </div>
        </div>

        {/* Header */}
        <div className="border-b-2 border-school-navy pb-6 relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center space-x-4">
            <div className="relative w-16 h-16 shrink-0 drop-shadow">
              <Image src="/images/brand/logo.png" alt="Logo" fill className="object-contain" priority />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-school-navy uppercase tracking-tight">
                Lahore Elite School
              </h1>
              <p className="text-xs font-semibold text-slate-600">
                {voucher.student.campus.name} &bull; Multan Road, Lahore
              </p>
              <p className="text-[11px] text-school-muted">
                Official Helpline: 0300-4279059 &bull; info@lahoreeliteschool.edu.pk
              </p>
            </div>
          </div>

          <div className="text-right">
            <div className="inline-block px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 font-extrabold text-xs uppercase tracking-wider shadow-sm">
              Official Fee Receipt
            </div>
            <p className="font-mono text-xs text-slate-600 mt-2">
              Voucher No: <strong className="text-school-navy">{voucher.voucherNo}</strong>
            </p>
            <p className="font-mono text-[11px] text-slate-500">
              Billing Month: <strong className="text-school-navy">{voucher.feeMonth}</strong>
            </p>
          </div>
        </div>

        {/* Student Details Grid */}
        <div className="py-6 border-b border-school-border grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs relative z-10">
          <div>
            <span className="text-[10px] uppercase font-bold text-school-muted block">Student Full Name</span>
            <span className="font-extrabold text-school-navy text-sm">{voucher.student.fullName}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-school-muted block">Father / Guardian</span>
            <span className="font-bold text-school-navy">{voucher.student.fatherName}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-school-muted block">Admission / Roll No</span>
            <span className="font-mono font-extrabold text-school-navy text-sm">{voucher.student.admissionNo}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-school-muted block">Class &amp; Section</span>
            <span className="font-bold text-school-navy">
              {voucher.student.class.name} ({voucher.student.section.name})
            </span>
          </div>
        </div>

        {/* Fee Itemization Table */}
        <div className="py-6 relative z-10">
          <table className="w-full text-left text-xs">
            <thead className="bg-school-navy text-white font-bold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="p-3.5 rounded-l-lg">Fee Particulars</th>
                <th className="p-3.5 text-center">Billing Month</th>
                <th className="p-3.5 text-right rounded-r-lg">Amount (PKR)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-school-border">
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-bold text-school-navy">Monthly Tuition Fee</td>
                <td className="p-3.5 text-center text-school-muted">{voucher.feeMonth}</td>
                <td className="p-3.5 text-right font-mono font-bold">{formatPKR(voucher.tuitionFee)}</td>
              </tr>
              {voucher.discount > 0 && (
                <tr className="hover:bg-slate-50 text-emerald-700">
                  <td className="p-3.5 font-semibold">Scholarship / Sibling Concession</td>
                  <td className="p-3.5 text-center">—</td>
                  <td className="p-3.5 text-right font-mono font-semibold">-{formatPKR(voucher.discount)}</td>
                </tr>
              )}
              {voucher.otherCharges > 0 && (
                <tr className="hover:bg-slate-50">
                  <td className="p-3.5 font-semibold text-slate-700">Exam / Lab / Utility Charges</td>
                  <td className="p-3.5 text-center">—</td>
                  <td className="p-3.5 text-right font-mono font-semibold">{formatPKR(voucher.otherCharges)}</td>
                </tr>
              )}
              {voucher.previousBalance > 0 && (
                <tr className="hover:bg-slate-50 text-amber-700">
                  <td className="p-3.5 font-semibold">Arrears / Previous Unpaid Balance</td>
                  <td className="p-3.5 text-center">—</td>
                  <td className="p-3.5 text-right font-mono font-semibold">{formatPKR(voucher.previousBalance)}</td>
                </tr>
              )}
            </tbody>
            <tfoot className="border-t-2 border-school-navy">
              <tr className="font-bold text-xs">
                <td colSpan={2} className="p-3.5 text-school-navy uppercase font-black">
                  Total Billable Fee
                </td>
                <td className="p-3.5 text-right font-mono text-base font-black text-school-navy">
                  {formatPKR(voucher.totalAmount)}
                </td>
              </tr>
              <tr className="bg-emerald-50 text-emerald-900 font-extrabold text-xs">
                <td colSpan={2} className="p-3.5 uppercase">
                  Amount Deposited &amp; Realized
                </td>
                <td className="p-3.5 text-right font-mono text-base font-black text-emerald-700">
                  {formatPKR(voucher.paidAmount)}
                </td>
              </tr>
              <tr className="font-bold text-xs">
                <td colSpan={2} className="p-3.5 text-school-muted uppercase">
                  Remaining Outstanding Balance
                </td>
                <td className={`p-3.5 text-right font-mono font-black ${voucher.balance > 0 ? "text-rose-600" : "text-slate-600"}`}>
                  {formatPKR(voucher.balance)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Payment History Records */}
        {voucher.payments.length > 0 && (
          <div className="py-4 border-t border-dashed border-slate-300 relative z-10 space-y-2">
            <h3 className="text-xs font-bold text-school-navy uppercase tracking-wider">
              Recorded Deposit Receipts:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {voucher.payments.map((p) => (
                <div key={p.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="font-mono font-bold text-school-navy block">{p.receiptNo}</span>
                    <span className="text-[10px] text-school-muted">
                      Paid via {p.paymentMethod} &bull; {formatDate(p.paymentDate)}
                    </span>
                  </div>
                  <span className="font-mono font-extrabold text-emerald-700 text-sm">
                    {formatPKR(p.amount)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Clearance Seal & Signatures */}
        <div className="pt-12 mt-8 grid grid-cols-3 gap-6 text-center text-xs border-t border-slate-200 relative z-10">
          <div className="flex flex-col items-center justify-center">
            <div className="w-20 h-20 rounded-full border-4 border-double border-emerald-600 text-emerald-700 flex flex-col items-center justify-center font-black text-[9px] uppercase tracking-tighter transform -rotate-12 select-none shadow-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 mb-0.5" />
              <span>PAID &amp; VERIFIED</span>
              <span className="text-[7px]">LES ACCOUNTS</span>
            </div>
          </div>

          <div>
            <div className="border-t border-slate-700 w-36 mx-auto mb-1 mt-8" />
            <span className="font-bold text-school-navy">Accounts Officer</span>
            <span className="text-[10px] text-school-muted block">Lahore Elite School</span>
          </div>

          <div>
            <div className="border-t border-slate-700 w-36 mx-auto mb-1 mt-8" />
            <span className="font-bold text-school-navy">Principal</span>
            <span className="text-[10px] text-school-muted block">Al-Nisa / Sabzazar Campus</span>
          </div>
        </div>
      </div>
    </div>
  );
}
