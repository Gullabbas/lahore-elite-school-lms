"use client";

import React, { useState } from "react";
import Link from "next/link";
import { formatPKR, formatDate } from "@/lib/utils";
import {
  Receipt,
  CheckCircle2,
  AlertTriangle,
  Printer,
  Plus,
  Loader2,
  Building2,
  HelpCircle,
  FileText,
} from "lucide-react";

interface Payment {
  id: string;
  receiptNo: string;
  paymentDate: string;
  amount: number;
  paymentMethod: string;
  receivedBy: string | null;
  voucher: {
    voucherNo: string;
  };
}

interface Voucher {
  id: string;
  voucherNo: string;
  feeMonth: string;
  dueDate: string;
  tuitionFee: number;
  otherCharges: number;
  discount: number;
  totalAmount: number;
  paidAmount: number;
  balance: number;
  status: string;
}

interface Props {
  student: {
    id: string;
    fullName: string;
    admissionNo: string;
    monthlyTuitionFee: number;
    discountAmount: number;
  };
  initialVouchers: Voucher[];
  payments: Payment[];
}

export default function StudentFeesManager({ student, initialVouchers, payments }: Props) {
  const [vouchers, setVouchers] = useState<Voucher[]>(initialVouchers);
  const [generating, setGenerating] = useState(false);
  const [notice, setNotice] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const months = [
    "October 2026",
    "November 2026",
    "December 2026",
    "January 2027",
    "February 2027",
    "March 2027",
  ];
  const [selectedMonth, setSelectedMonth] = useState(months[0]);

  const unpaidVouchers = vouchers.filter((v) => v.status !== "PAID");
  const totalOutstanding = unpaidVouchers.reduce((sum, v) => sum + v.balance, 0);

  const handleGenerateVoucher = async () => {
    setGenerating(true);
    setNotice(null);

    try {
      const res = await fetch("/api/student/fees/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ feeMonth: selectedMonth }),
      });
      const data = await res.json();

      if (data.success) {
        setNotice({ type: "success", message: data.message });
        if (!data.isExisting && data.voucher) {
          setVouchers([data.voucher, ...vouchers]);
        }
      } else {
        setNotice({ type: "error", message: data.message || "Failed to generate voucher" });
      }
    } catch (err) {
      setNotice({ type: "error", message: "Network error occurred." });
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-school-border shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-school-gold-warm font-bold text-xs uppercase tracking-wider mb-1">
            <Receipt className="w-4 h-4" />
            <span>Student Billing &amp; Fees</span>
          </div>
          <h1 className="text-2xl font-extrabold text-school-navy">Fee Vouchers &amp; Receipts</h1>
          <p className="text-xs text-school-muted mt-1">
            {student.fullName} ({student.admissionNo}) &bull; Standard Monthly Tuition: {formatPKR(student.monthlyTuitionFee)}
          </p>
        </div>

        <div className="text-right bg-slate-50 p-4 rounded-xl border border-school-border self-start sm:self-auto">
          <span className="text-[10px] uppercase font-bold text-school-muted block">Total Outstanding Balance</span>
          <span className={`text-xl font-black ${totalOutstanding > 0 ? "text-rose-600" : "text-emerald-600"}`}>
            {formatPKR(totalOutstanding)}
          </span>
        </div>
      </div>

      {/* Notice Banner */}
      {notice && (
        <div
          className={`p-4 rounded-xl text-xs font-semibold flex items-center justify-between ${
            notice.type === "success"
              ? "bg-emerald-50 text-emerald-900 border border-emerald-200"
              : "bg-rose-50 text-rose-900 border border-rose-200"
          }`}
        >
          <span>{notice.message}</span>
          <button onClick={() => setNotice(null)} className="text-xs underline font-bold ml-2">
            Dismiss
          </button>
        </div>
      )}

      {/* Generate Fee Voucher Card */}
      <div className="bg-white rounded-2xl border border-school-border p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-sm font-extrabold text-school-navy flex items-center space-x-2">
            <FileText className="w-4 h-4 text-school-gold-warm" />
            <span>Generate Monthly Fee Voucher</span>
          </h2>
          <p className="text-xs text-school-muted">
            Generate your official fee voucher for the selected month according to your grade fee structure and registered concessions.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="px-3 py-2 rounded-xl border border-school-border text-xs font-semibold bg-white text-school-navy focus:ring-2 focus:ring-school-gold"
          >
            {months.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>

          <button
            onClick={handleGenerateVoucher}
            disabled={generating}
            className="px-4 py-2 bg-school-navy text-white text-xs font-bold rounded-xl hover:bg-school-navy-light transition-all flex items-center space-x-1.5 shadow"
          >
            {generating ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin text-school-gold" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5 text-school-gold" />
                <span>Generate Voucher</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Payment Bank Instructions */}
      <div className="bg-school-navy text-white p-5 rounded-2xl shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-school-gold font-bold text-xs">
            <Building2 className="w-4 h-4" />
            <span>Designated Fee Collection Counters &amp; Bank Channels</span>
          </div>
          <p className="text-xs text-slate-300">
            Fee can be deposited at the Accounts Office of Al-Nisa Campus or Sabzazar Campus (Mon-Sat, 8:00 AM - 2:00 PM) or via online bank deposit using your unique voucher number. Once verified, your official paid receipt will be available below.
          </p>
        </div>
      </div>

      {/* Vouchers Table */}
      <div className="bg-white rounded-2xl border border-school-border overflow-hidden shadow-sm">
        <div className="p-4 bg-slate-50 border-b border-school-border flex items-center justify-between">
          <h2 className="text-xs font-bold text-school-navy">My Fee Vouchers</h2>
          <span className="text-xs text-school-muted font-mono">{vouchers.length} Vouchers</span>
        </div>

        {vouchers.length === 0 ? (
          <div className="p-8 text-center text-xs text-school-muted">
            No fee vouchers currently issued. Click &quot;Generate Voucher&quot; above to create a voucher for this month.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-school-navy font-bold uppercase text-[10px] tracking-wider border-b border-school-border">
                <tr>
                  <th className="p-3.5">Voucher No</th>
                  <th className="p-3.5">Month</th>
                  <th className="p-3.5">Due Date</th>
                  <th className="p-3.5 text-right">Total Payable</th>
                  <th className="p-3.5 text-right">Paid</th>
                  <th className="p-3.5 text-right">Balance</th>
                  <th className="p-3.5 text-center">Status</th>
                  <th className="p-3.5 text-center">Receipt / Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-school-border">
                {vouchers.map((v) => {
                  const isPaid = v.status === "PAID" || v.paidAmount > 0;

                  return (
                    <tr key={v.id} className="hover:bg-slate-50">
                      <td className="p-3.5 font-mono font-bold text-school-navy">{v.voucherNo}</td>
                      <td className="p-3.5 font-semibold text-slate-700">{v.feeMonth}</td>
                      <td className="p-3.5 font-mono text-school-muted">{formatDate(v.dueDate)}</td>
                      <td className="p-3.5 text-right font-mono font-bold text-school-navy">
                        {formatPKR(v.totalAmount)}
                      </td>
                      <td className="p-3.5 text-right font-mono text-emerald-700 font-semibold">
                        {formatPKR(v.paidAmount)}
                      </td>
                      <td className="p-3.5 text-right font-mono font-bold text-rose-600">
                        {formatPKR(v.balance)}
                      </td>
                      <td className="p-3.5 text-center">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            v.status === "PAID"
                              ? "bg-emerald-100 text-emerald-800"
                              : v.status === "PARTIAL"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-rose-100 text-rose-800"
                          }`}
                        >
                          {v.status}
                        </span>
                      </td>
                      <td className="p-3.5 text-center">
                        {isPaid ? (
                          <Link
                            href={`/student/fees/receipt/${v.id}`}
                            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-[11px] font-bold hover:bg-emerald-700 transition-colors shadow-sm"
                          >
                            <Printer className="w-3.5 h-3.5" />
                            <span>Print Paid Receipt</span>
                          </Link>
                        ) : (
                          <span className="text-[11px] text-slate-500 font-semibold italic">
                            Pay at Campus Counter
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Payment Receipts History */}
      <div className="bg-white rounded-2xl border border-school-border overflow-hidden shadow-sm">
        <div className="p-4 bg-slate-50 border-b border-school-border flex items-center justify-between">
          <h2 className="text-xs font-bold text-school-navy">Recorded Payment Receipts</h2>
          <span className="text-xs text-school-muted font-mono">{payments.length} Payments</span>
        </div>

        {payments.length === 0 ? (
          <div className="p-8 text-center text-xs text-school-muted">
            No payments recorded yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-school-navy font-bold uppercase text-[10px] tracking-wider border-b border-school-border">
                <tr>
                  <th className="p-3.5">Receipt No</th>
                  <th className="p-3.5">Payment Date</th>
                  <th className="p-3.5">Linked Voucher</th>
                  <th className="p-3.5">Payment Method</th>
                  <th className="p-3.5 text-right">Amount Paid</th>
                  <th className="p-3.5">Received By</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-school-border">
                {payments.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50">
                    <td className="p-3.5 font-mono font-bold text-school-navy">{p.receiptNo}</td>
                    <td className="p-3.5 font-mono text-school-muted">{formatDate(p.paymentDate)}</td>
                    <td className="p-3.5 font-mono text-slate-700">{p.voucher.voucherNo}</td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-[10px] font-bold text-slate-800">
                        {p.paymentMethod}
                      </span>
                    </td>
                    <td className="p-3.5 text-right font-mono font-bold text-emerald-700">
                      {formatPKR(p.amount)}
                    </td>
                    <td className="p-3.5 text-school-muted text-[11px]">{p.receivedBy || "Accounts Office"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
