import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { formatPKR, formatDate } from "@/lib/utils";
import PrintButton from "@/components/ui/PrintButton";
import { ArrowLeft, Printer } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function FeeVoucherPrintPage({ params }: { params: { id: string } }) {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    redirect("/login");
  }

  const voucher = await prisma.feeVoucher.findUnique({
    where: { id: params.id },
    include: {
      student: { include: { class: true, section: true, campus: true } },
      academicSession: true,
      payments: true,
    },
  });

  if (!voucher) {
    notFound();
  }

  const renderVoucherCopy = (copyType: "SCHOOL COPY" | "STUDENT / PARENT COPY") => (
    <div className="relative border-2 border-school-navy p-5 rounded-xl bg-white shadow-sm flex flex-col justify-between h-full overflow-hidden">
      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
        <div className="relative w-72 h-72">
          <Image src="/images/brand/logo.png" alt="Watermark" fill className="object-contain" />
        </div>
      </div>

      {/* Copy Header */}
      <div className="space-y-2 border-b-2 border-school-navy pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="relative w-12 h-12 shrink-0 drop-shadow">
              <Image src="/images/brand/logo.png" alt="Logo" fill className="object-contain" />
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-school-navy tracking-tight uppercase leading-tight">
                Lahore Elite School
              </h2>
              <span className="text-[9px] text-school-muted block">
                {voucher.student.campus.name} • Multan Road, Lahore
              </span>
              <span className="text-[9px] font-bold text-school-navy block">
                Tel: 0300-4279059
              </span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-school-navy text-white uppercase tracking-wider block">
              {copyType}
            </span>
            <span className="font-mono text-[10px] font-bold text-school-navy block mt-1">
              {voucher.voucherNo}
            </span>
          </div>
        </div>
      </div>

      {/* Student Meta Details Grid */}
      <div className="grid grid-cols-2 gap-2 text-[10px] py-2.5 border-b border-slate-200 text-slate-800">
        <div>
          <span className="text-slate-500 block text-[8px]">Student Name:</span>
          <strong className="text-school-navy text-[11px] block">{voucher.student.fullName}</strong>
        </div>
        <div>
          <span className="text-slate-500 block text-[8px]">Father&apos;s Name:</span>
          <strong className="block">{voucher.student.fatherName}</strong>
        </div>
        <div>
          <span className="text-slate-500 block text-[8px]">Admission No:</span>
          <span className="font-mono font-bold text-school-navy">{voucher.student.admissionNo}</span>
        </div>
        <div>
          <span className="text-slate-500 block text-[8px]">Class & Section:</span>
          <span className="font-bold text-school-navy">{voucher.student.class.name} ({voucher.student.section.name})</span>
        </div>
        <div>
          <span className="text-slate-500 block text-[8px]">Fee Month:</span>
          <strong className="text-school-navy">{voucher.feeMonth}</strong>
        </div>
        <div>
          <span className="text-slate-500 block text-[8px]">Due Date:</span>
          <strong className="text-rose-700 font-extrabold">{formatDate(voucher.dueDate)}</strong>
        </div>
      </div>

      {/* Fee Itemization Table */}
      <div className="py-2 flex-1">
        <table className="w-full text-left text-[10px]">
          <thead className="bg-slate-100 font-bold text-school-navy border-b border-slate-300">
            <tr>
              <th className="py-1 px-2">Charge Particulars</th>
              <th className="py-1 px-2 text-right">Amount (PKR)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            <tr>
              <td className="py-1 px-2">Monthly Tuition Fee</td>
              <td className="py-1 px-2 text-right font-medium">{formatPKR(voucher.tuitionFee)}</td>
            </tr>
            {voucher.otherCharges > 0 && (
              <tr>
                <td className="py-1 px-2">Exam, Lab & Activity Charges</td>
                <td className="py-1 px-2 text-right font-medium">{formatPKR(voucher.otherCharges)}</td>
              </tr>
            )}
            {voucher.discount > 0 && (
              <tr className="text-emerald-700 font-medium">
                <td className="py-1 px-2">Sibling / Merit Concession</td>
                <td className="py-1 px-2 text-right">-{formatPKR(voucher.discount)}</td>
              </tr>
            )}
            {voucher.previousBalance > 0 && (
              <tr className="text-rose-700 font-bold">
                <td className="py-1 px-2">Arrears / Previous Overdue Balance</td>
                <td className="py-1 px-2 text-right">+{formatPKR(voucher.previousBalance)}</td>
              </tr>
            )}
          </tbody>
          <tfoot className="border-t-2 border-school-navy font-bold text-[11px] text-school-navy bg-school-gold-light/40">
            <tr>
              <td className="py-1 px-2">Total Amount Payable:</td>
              <td className="py-1 px-2 text-right font-black">{formatPKR(voucher.totalAmount)}</td>
            </tr>
            {voucher.paidAmount > 0 && (
              <tr className="text-emerald-800 text-[10px]">
                <td className="py-0.5 px-2">Amount Deposited (Paid):</td>
                <td className="py-0.5 px-2 text-right">-{formatPKR(voucher.paidAmount)}</td>
              </tr>
            )}
            {voucher.balance > 0 && (
              <tr className="text-rose-800 text-[10px]">
                <td className="py-0.5 px-2 font-black">Current Balance Remaining:</td>
                <td className="py-0.5 px-2 text-right font-black">{formatPKR(voucher.balance)}</td>
              </tr>
            )}
          </tfoot>
        </table>
      </div>

      {/* Instructions & Signatures */}
      <div className="pt-2 border-t border-slate-200 text-[8px] text-slate-500 space-y-3">
        <p className="leading-tight">
          • Fee must be deposited on or before the due date. A late surcharge of PKR 200 applies after due date.
          <br />• Fee deposited is non-refundable. Please keep this receipt safe.
        </p>

        <div className="grid grid-cols-2 pt-4 text-center text-slate-700">
          <div className="border-t border-slate-400 mx-2 pt-1">
            <span className="font-bold">Bank / Cashier Stamp & Date</span>
          </div>
          <div className="border-t border-slate-400 mx-2 pt-1">
            <span className="font-bold">Authorized Officer Signature</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Top Bar for Action (Hidden in print) */}
      <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-school-border shadow-sm no-print">
        <Link
          href="/admin/fees"
          className="text-xs font-semibold text-school-navy hover:underline flex items-center space-x-1"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Fee Desk</span>
        </Link>

        <div className="flex items-center space-x-3">
          <span className="text-xs text-school-muted hidden sm:inline">
            A4 Standard Page (Dual Copies)
          </span>
          <PrintButton />
        </div>
      </div>

      {/* A4 Printable Container (Two Copies Side-by-Side or Stacked) */}
      <div className="printable-document max-w-4xl mx-auto bg-white p-4 sm:p-6 rounded-2xl shadow-lg border border-school-border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[720px] items-stretch">
          {renderVoucherCopy("SCHOOL COPY")}
          {renderVoucherCopy("STUDENT / PARENT COPY")}
        </div>
      </div>
    </div>
  );
}
