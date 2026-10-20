"use client";

import React, { useState } from "react";
import { formatPKR, formatDate } from "@/lib/utils";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Plus,
  Filter,
  Receipt,
  X,
  Loader2,
  CheckCircle2,
  FileText,
} from "lucide-react";

interface FinanceRecord {
  id: string;
  type: string;
  category: string;
  description: string;
  amount: number;
  date: string;
  campus?: { name: string } | null;
  payeeOrPayer?: string | null;
  referenceNo?: string | null;
  recordedBy?: string | null;
}

interface CampusOption {
  id: string;
  name: string;
}

interface Props {
  initialRecords: FinanceRecord[];
  feesCollected: number;
  payrollPaid: number;
  campuses: CampusOption[];
}

export default function FinanceManager({
  initialRecords,
  feesCollected,
  payrollPaid,
  campuses,
}: Props) {
  const [records, setRecords] = useState<FinanceRecord[]>(initialRecords);
  const [activeTab, setActiveTab] = useState<"ALL" | "INCOME" | "EXPENSE">("ALL");
  const [showAddModal, setShowAddModal] = useState(false);

  const [formType, setFormType] = useState<"INCOME" | "EXPENSE">("EXPENSE");
  const [formCategory, setFormCategory] = useState("UTILITIES");
  const [formDescription, setFormDescription] = useState("");
  const [formAmount, setFormAmount] = useState<number>(0);
  const [formCampusId, setFormCampusId] = useState(campuses[0]?.id || "");
  const [formPayee, setFormPayee] = useState("");
  const [formLoading, setFormLoading] = useState(false);

  // Computations
  const otherIncome = records
    .filter((r) => r.type === "INCOME")
    .reduce((acc, r) => acc + r.amount, 0);

  const operatingExpenses = records
    .filter((r) => r.type === "EXPENSE")
    .reduce((acc, r) => acc + r.amount, 0);

  const totalRevenue = feesCollected + otherIncome;
  const totalExpenditure = operatingExpenses + payrollPaid;
  const netSurplus = totalRevenue - totalExpenditure;

  const filteredRecords = records.filter((r) => {
    if (activeTab === "ALL") return true;
    return r.type === activeTab;
  });

  const handleAddRecord = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);

    try {
      const res = await fetch("/api/finance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: formType,
          category: formCategory,
          description: formDescription,
          amount: formAmount,
          campusId: formCampusId || null,
          payeeOrPayer: formPayee || null,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Failed to save record");

      const fetchRes = await fetch("/api/finance");
      const fetchData = await fetchRes.json();
      if (fetchData.records) setRecords(fetchData.records);

      setShowAddModal(false);
      setFormDescription("");
      setFormAmount(0);
      setFormPayee("");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-school-border shadow-sm">
        <div>
          <span className="text-xs font-bold text-school-navy bg-school-gold-light px-2.5 py-1 rounded">
            Institutional Accounting
          </span>
          <h1 className="text-xl font-bold text-school-navy mt-1">Income, Expenses & Operating Ledger</h1>
          <p className="text-xs text-school-muted">
            Tracking verified tuition collections, vendor expenses, payroll disbursements, and net operating balance.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 rounded-lg bg-school-navy text-white text-xs font-bold hover:bg-school-navy-light flex items-center space-x-1.5 shadow"
        >
          <Plus className="w-3.5 h-3.5 text-school-gold" />
          <span>Record Income / Expense</span>
        </button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-school-border shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-school-muted uppercase">Total Realized Revenue</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <span className="text-2xl font-black text-emerald-700 block mt-2">{formatPKR(totalRevenue)}</span>
          <div className="text-[11px] text-school-muted mt-1">
            Tuition: {formatPKR(feesCollected)} • Other: {formatPKR(otherIncome)}
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-school-border shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-school-muted uppercase">Total Operating Expenditure</span>
            <TrendingDown className="w-4 h-4 text-rose-600" />
          </div>
          <span className="text-2xl font-black text-rose-700 block mt-2">{formatPKR(totalExpenditure)}</span>
          <div className="text-[11px] text-school-muted mt-1">
            Payroll: {formatPKR(payrollPaid)} • Operations: {formatPKR(operatingExpenses)}
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-school-border shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-school-muted uppercase">Net Operating Surplus</span>
            <DollarSign className="w-4 h-4 text-school-navy" />
          </div>
          <span
            className={`text-2xl font-black block mt-2 ${
              netSurplus >= 0 ? "text-school-navy" : "text-rose-700"
            }`}
          >
            {formatPKR(netSurplus)}
          </span>
          <div className="text-[11px] text-school-muted mt-1">
            Revenue minus all paid commitments
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-2 border-b border-school-border pb-2">
        <button
          onClick={() => setActiveTab("ALL")}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
            activeTab === "ALL"
              ? "bg-school-navy text-white"
              : "text-school-muted hover:text-school-navy"
          }`}
        >
          All Ledger Entries ({records.length})
        </button>
        <button
          onClick={() => setActiveTab("INCOME")}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
            activeTab === "INCOME"
              ? "bg-emerald-700 text-white"
              : "text-school-muted hover:text-emerald-700"
          }`}
        >
          Income Entries
        </button>
        <button
          onClick={() => setActiveTab("EXPENSE")}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
            activeTab === "EXPENSE"
              ? "bg-rose-700 text-white"
              : "text-school-muted hover:text-rose-700"
          }`}
        >
          Expense Entries
        </button>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-2xl border border-school-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 font-bold text-school-navy border-b">
              <tr>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4">Campus</th>
                <th className="py-3 px-4">Payee / Payer</th>
                <th className="py-3 px-4 text-right">Amount (PKR)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-school-border text-school-text">
              {filteredRecords.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50">
                  <td className="py-3 px-4 text-school-muted">{formatDate(r.date)}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        r.type === "INCOME"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-rose-50 text-rose-700"
                      }`}
                    >
                      {r.type}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-semibold text-school-navy">{r.category}</td>
                  <td className="py-3 px-4 max-w-xs">{r.description}</td>
                  <td className="py-3 px-4 text-school-muted">{r.campus?.name || "General"}</td>
                  <td className="py-3 px-4 text-slate-700">{r.payeeOrPayer || "—"}</td>
                  <td
                    className={`py-3 px-4 text-right font-black ${
                      r.type === "INCOME" ? "text-emerald-700" : "text-rose-700"
                    }`}
                  >
                    {r.type === "INCOME" ? "+" : "-"}
                    {formatPKR(r.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Record Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-school-border">
            <div className="flex items-center justify-between border-b pb-3 mb-4">
              <h2 className="text-lg font-bold text-school-navy">Record Income or Expense</h2>
              <button onClick={() => setShowAddModal(false)} className="text-school-muted hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddRecord} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-2 p-1 rounded-lg bg-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setFormType("EXPENSE");
                    setFormCategory("UTILITIES");
                  }}
                  className={`py-2 rounded-md font-bold text-xs ${
                    formType === "EXPENSE" ? "bg-rose-600 text-white shadow" : "text-slate-600"
                  }`}
                >
                  School Expense
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFormType("INCOME");
                    setFormCategory("FEES");
                  }}
                  className={`py-2 rounded-md font-bold text-xs ${
                    formType === "INCOME" ? "bg-emerald-600 text-white shadow" : "text-slate-600"
                  }`}
                >
                  School Income
                </button>
              </div>

              <div>
                <label className="font-bold text-school-navy block mb-1">Category *</label>
                <select
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-school-border bg-white"
                >
                  {formType === "EXPENSE" ? (
                    <>
                      <option value="UTILITIES">Utilities (Electricity, Generator, Water)</option>
                      <option value="MAINTENANCE">Campus Building Repairs & Maintenance</option>
                      <option value="STATIONERY">Printing, Stationery & Supplies</option>
                      <option value="LAB_EQUIPMENT">Science & Computer Lab Equipment</option>
                      <option value="SECURITY">Campus Security & Cleaning Services</option>
                      <option value="MISCELLANEOUS">Miscellaneous Operational Expense</option>
                    </>
                  ) : (
                    <>
                      <option value="FEES">Tuition / Admission Fees</option>
                      <option value="DONATION">Educational Grants / Trust Donations</option>
                      <option value="CANTEEN">School Canteen Lease</option>
                      <option value="OTHER">Other Institutional Income</option>
                    </>
                  )}
                </select>
              </div>

              <div>
                <label className="font-bold text-school-navy block mb-1">Description *</label>
                <input
                  type="text"
                  required
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="e.g. Monthly LESCO Electricity Bill"
                  className="w-full px-3 py-2 rounded-lg border border-school-border"
                />
              </div>

              <div>
                <label className="font-bold text-school-navy block mb-1">Amount (PKR) *</label>
                <input
                  type="number"
                  required
                  min={1}
                  value={formAmount}
                  onChange={(e) => setFormAmount(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-lg border border-school-border font-bold text-sm"
                />
              </div>

              <div>
                <label className="font-bold text-school-navy block mb-1">Campus</label>
                <select
                  value={formCampusId}
                  onChange={(e) => setFormCampusId(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-school-border bg-white"
                >
                  {campuses.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-school-navy block mb-1">Payee / Payer Name (Optional)</label>
                <input
                  type="text"
                  value={formPayee}
                  onChange={(e) => setFormPayee(e.target.value)}
                  placeholder="e.g. Vendor name, LESCO, Store"
                  className="w-full px-3 py-2 rounded-lg border border-school-border"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-lg border font-bold text-school-muted"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formLoading || formAmount <= 0}
                  className="px-5 py-2 rounded-lg bg-school-navy text-white font-bold hover:bg-school-navy-light flex items-center space-x-1.5"
                >
                  {formLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-3.5 h-3.5 text-school-gold" />}
                  <span>Save Entry</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
