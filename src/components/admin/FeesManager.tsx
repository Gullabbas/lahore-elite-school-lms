"use client";

import React, { useState } from "react";
import Link from "next/link";
import { formatPKR, formatDate } from "@/lib/utils";
import {
  Receipt,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  Loader2,
  DollarSign,
  Printer,
  Users,
  CreditCard,
  X,
  FileCheck,
} from "lucide-react";

interface Voucher {
  id: string;
  voucherNo: string;
  feeMonth: string;
  dueDate: string;
  tuitionFee: number;
  otherCharges: number;
  discount: number;
  previousBalance: number;
  totalAmount: number;
  paidAmount: number;
  balance: number;
  status: string;
  student: {
    id: string;
    admissionNo: string;
    fullName: string;
    fatherName: string;
    class: { name: string };
    section: { name: string };
    campus: { name: string };
  };
}

interface ClassOption {
  id: string;
  name: string;
}

interface Props {
  initialVouchers: Voucher[];
  classes: ClassOption[];
  currentSessionId: string;
}

export default function FeesManager({ initialVouchers, classes, currentSessionId }: Props) {
  const [vouchers, setVouchers] = useState<Voucher[]>(initialVouchers);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [classFilter, setClassFilter] = useState("");
  const [search, setSearch] = useState("");

  // Modals
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [activeVoucher, setActiveVoucher] = useState<Voucher | null>(null);

  // Generate form
  const [genClassId, setGenClassId] = useState("");
  const [genMonth, setGenMonth] = useState("November 2025");
  const [genDueDate, setGenDueDate] = useState("2025-11-10");
  const [genLoading, setGenLoading] = useState(false);

  // Payment form
  const [paymentAmount, setPaymentAmount] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState("CASH");
  const [paymentRef, setPaymentRef] = useState("");
  const [paymentLoading, setPaymentLoading] = useState(false);

  const [message, setMessage] = useState<string | null>(null);

  // Totals
  const totalBilled = vouchers.reduce((acc, v) => acc + v.totalAmount, 0);
  const totalCollected = vouchers.reduce((acc, v) => acc + v.paidAmount, 0);
  const totalOutstanding = vouchers.reduce((acc, v) => acc + v.balance, 0);

  const filteredVouchers = vouchers.filter((v) => {
    const matchesSearch =
      search === "" ||
      v.voucherNo.toLowerCase().includes(search.toLowerCase()) ||
      v.student.fullName.toLowerCase().includes(search.toLowerCase()) ||
      v.student.admissionNo.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === "ALL" || v.status === statusFilter;
    const matchesClass = classFilter === "" || v.student.class.name === classFilter;

    return matchesSearch && matchesStatus && matchesClass;
  });

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setGenLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/fees/vouchers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          classId: genClassId || undefined,
          feeMonth: genMonth,
          dueDate: genDueDate,
          academicSessionId: currentSessionId,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to generate vouchers");
      }

      setMessage(data.message);
      setShowGenerateModal(false);

      // Refresh list
      const fetchRes = await fetch("/api/fees/vouchers");
      const fetchData = await fetchRes.json();
      if (fetchData.vouchers) setVouchers(fetchData.vouchers);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setGenLoading(false);
    }
  };

  const handleRecordPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeVoucher) return;
    setPaymentLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/fees/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          voucherId: activeVoucher.id,
          amount: paymentAmount,
          paymentMethod,
          referenceNo: paymentRef || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to record payment");
      }

      setMessage(data.message);
      setShowPaymentModal(false);
      setActiveVoucher(null);

      // Refresh list
      const fetchRes = await fetch("/api/fees/vouchers");
      const fetchData = await fetchRes.json();
      if (fetchData.vouchers) setVouchers(fetchData.vouchers);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setPaymentLoading(false);
    }
  };

  const openPaymentModal = (v: Voucher) => {
    setActiveVoucher(v);
    setPaymentAmount(v.balance);
    setPaymentMethod("CASH");
    setPaymentRef("");
    setShowPaymentModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-school-border shadow-sm">
        <div>
          <span className="text-xs font-bold text-school-navy bg-school-gold-light px-2.5 py-1 rounded">
            Financial Operations
          </span>
          <h1 className="text-xl font-bold text-school-navy mt-1">Student Fee Vouchers & Collections</h1>
          <p className="text-xs text-school-muted">
            Manage fee generations, partial/full cash & bank reconciliations, and print dual-copy vouchers.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowGenerateModal(true)}
            className="px-4 py-2 rounded-lg bg-school-navy text-white text-xs font-bold hover:bg-school-navy-light flex items-center space-x-1.5 shadow"
          >
            <Plus className="w-3.5 h-3.5 text-school-gold" />
            <span>Generate Monthly Vouchers</span>
          </button>

          <Link
            href="/admin/fees/family"
            className="px-4 py-2 rounded-lg bg-school-gold text-school-navy-deep text-xs font-bold hover:bg-school-gold-warm flex items-center space-x-1.5 shadow"
          >
            <Users className="w-3.5 h-3.5" />
            <span>Family Sibling Voucher</span>
          </Link>
        </div>
      </div>

      {message && (
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-school-border shadow-sm">
          <span className="text-xs font-bold text-school-muted uppercase block">Total Fees Billed</span>
          <span className="text-2xl font-black text-school-navy mt-1 block">{formatPKR(totalBilled)}</span>
          <span className="text-[11px] text-school-muted">{vouchers.length} vouchers generated</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-school-border shadow-sm">
          <span className="text-xs font-bold text-school-muted uppercase block">Fees Received (Collected)</span>
          <span className="text-2xl font-black text-emerald-700 mt-1 block">{formatPKR(totalCollected)}</span>
          <span className="text-[11px] text-emerald-600 font-semibold">Deposited into school account</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-school-border shadow-sm">
          <span className="text-xs font-bold text-school-muted uppercase block">Outstanding Receivables</span>
          <span className="text-2xl font-black text-rose-700 mt-1 block">{formatPKR(totalOutstanding)}</span>
          <Link href="/admin/fees/defaulters" className="text-[11px] font-bold text-rose-600 hover:underline">
            View Defaulters List →
          </Link>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 bg-white p-4 rounded-xl border border-school-border shadow-sm">
        <div className="sm:col-span-6 relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by student name, admission number, or voucher code..."
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-school-border text-xs focus:ring-2 focus:ring-school-gold"
          />
          <Search className="w-4 h-4 text-school-muted absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        <div className="sm:col-span-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-school-border text-xs bg-white"
          >
            <option value="ALL">All Payment Statuses</option>
            <option value="UNPAID">Unpaid</option>
            <option value="PARTIAL">Partial</option>
            <option value="PAID">Paid</option>
          </select>
        </div>

        <div className="sm:col-span-3">
          <select
            value={classFilter}
            onChange={(e) => setClassFilter(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-school-border text-xs bg-white"
          >
            <option value="">All Classes</option>
            {classes.map((c) => (
              <option key={c.id} value={c.name}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Vouchers Data Table */}
      <div className="bg-white rounded-2xl border border-school-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 font-bold text-school-navy border-b">
              <tr>
                <th className="py-3 px-4">Voucher No</th>
                <th className="py-3 px-4">Student Name</th>
                <th className="py-3 px-4">Class</th>
                <th className="py-3 px-4">Fee Month</th>
                <th className="py-3 px-4">Due Date</th>
                <th className="py-3 px-4">Total Amount</th>
                <th className="py-3 px-4">Paid</th>
                <th className="py-3 px-4">Balance</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-school-border text-school-text">
              {filteredVouchers.map((v) => (
                <tr key={v.id} className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-mono font-bold text-school-navy">{v.voucherNo}</td>
                  <td className="py-3 px-4 font-bold text-school-navy">
                    <Link href={`/admin/students/${v.student.id}`} className="hover:underline">
                      {v.student.fullName}
                    </Link>
                    <span className="text-school-muted block text-[10px]">
                      Adm: {v.student.admissionNo}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {v.student.class.name} ({v.student.section.name})
                  </td>
                  <td className="py-3 px-4">{v.feeMonth}</td>
                  <td className="py-3 px-4 text-school-muted">{formatDate(v.dueDate)}</td>
                  <td className="py-3 px-4 font-bold text-school-navy">{formatPKR(v.totalAmount)}</td>
                  <td className="py-3 px-4 font-semibold text-emerald-700">{formatPKR(v.paidAmount)}</td>
                  <td className="py-3 px-4 font-bold text-rose-700">{formatPKR(v.balance)}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        v.status === "PAID"
                          ? "bg-emerald-50 text-emerald-700"
                          : v.status === "PARTIAL"
                          ? "bg-amber-50 text-amber-700"
                          : "bg-rose-50 text-rose-700"
                      }`}
                    >
                      {v.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end space-x-1.5">
                      {v.status !== "PAID" && (
                        <button
                          onClick={() => openPaymentModal(v)}
                          className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px]"
                        >
                          Receive Cash/Bank
                        </button>
                      )}
                      <Link
                        href={`/admin/fees/voucher/${v.id}`}
                        className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-school-navy font-bold text-[10px] flex items-center space-x-1"
                        title="Print Dual-Copy Voucher"
                      >
                        <Printer className="w-3 h-3" />
                        <span>Print</span>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Generate Vouchers Modal */}
      {showGenerateModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-school-border">
            <div className="flex items-center justify-between border-b pb-3 mb-4">
              <h2 className="text-lg font-bold text-school-navy">Generate Monthly Fee Vouchers</h2>
              <button onClick={() => setShowGenerateModal(false)} className="text-school-muted hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleGenerate} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-school-navy block mb-1">Target Class</label>
                <select
                  value={genClassId}
                  onChange={(e) => setGenClassId(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-school-border bg-white"
                >
                  <option value="">All Classes (School-Wide)</option>
                  {classes.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-school-navy block mb-1">Fee Month Name *</label>
                <input
                  type="text"
                  required
                  value={genMonth}
                  onChange={(e) => setGenMonth(e.target.value)}
                  placeholder="e.g. November 2025"
                  className="w-full px-3 py-2 rounded-lg border border-school-border font-bold"
                />
              </div>

              <div>
                <label className="font-bold text-school-navy block mb-1">Payment Due Date *</label>
                <input
                  type="date"
                  required
                  value={genDueDate}
                  onChange={(e) => setGenDueDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-school-border"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowGenerateModal(false)}
                  className="px-4 py-2 rounded-lg border font-bold text-school-muted"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={genLoading}
                  className="px-5 py-2 rounded-lg bg-school-navy text-white font-bold hover:bg-school-navy-light flex items-center space-x-1.5"
                >
                  {genLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-3.5 h-3.5 text-school-gold" />}
                  <span>Generate Vouchers</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Record Payment Modal */}
      {showPaymentModal && activeVoucher && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-school-border">
            <div className="flex items-center justify-between border-b pb-3 mb-4">
              <div>
                <h2 className="text-lg font-bold text-school-navy">Receive Fee Deposit</h2>
                <span className="text-xs text-school-muted">
                  Voucher: {activeVoucher.voucherNo} • {activeVoucher.student.fullName}
                </span>
              </div>
              <button onClick={() => setShowPaymentModal(false)} className="text-school-muted hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRecordPayment} className="space-y-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border flex justify-between items-center">
                <span>Outstanding Balance:</span>
                <strong className="text-sm text-rose-700 font-black">{formatPKR(activeVoucher.balance)}</strong>
              </div>

              <div>
                <label className="font-bold text-school-navy block mb-1">Payment Amount (PKR) *</label>
                <input
                  type="number"
                  required
                  max={activeVoucher.balance}
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-sm font-bold rounded-lg border border-school-border"
                />
              </div>

              <div>
                <label className="font-bold text-school-navy block mb-1">Payment Method *</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-school-border bg-white"
                >
                  <option value="CASH">Cash at Accounts Desk</option>
                  <option value="BANK_TRANSFER">Direct Online Bank Transfer</option>
                  <option value="CHEQUE">Bank Cheque</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-school-navy block mb-1">Bank Reference / Cheque No (Optional)</label>
                <input
                  type="text"
                  value={paymentRef}
                  onChange={(e) => setPaymentRef(e.target.value)}
                  placeholder="e.g. HBL-981240"
                  className="w-full px-3 py-2 rounded-lg border border-school-border"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowPaymentModal(false)}
                  className="px-4 py-2 rounded-lg border font-bold text-school-muted"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={paymentLoading || paymentAmount <= 0}
                  className="px-5 py-2 rounded-lg bg-emerald-700 text-white font-bold hover:bg-emerald-800 flex items-center space-x-1.5"
                >
                  {paymentLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <DollarSign className="w-3.5 h-3.5" />}
                  <span>Record & Generate Receipt</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
