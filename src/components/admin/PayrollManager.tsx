"use client";

import React, { useState } from "react";
import Link from "next/link";
import { formatPKR, formatDate } from "@/lib/utils";
import {
  CreditCard,
  Plus,
  Printer,
  CheckCircle2,
  AlertCircle,
  Loader2,
  DollarSign,
  X,
  FileText,
} from "lucide-react";

interface PayrollEntry {
  id: string;
  payrollMonth: string;
  payrollYear: number;
  basicSalary: number;
  allowances: number;
  deductions: number;
  netPayable: number;
  status: string;
  paymentDate: string | null;
  paymentMethod: string | null;
  paymentRef: string | null;
  staff: {
    id: string;
    employeeId: string;
    fullName: string;
    designation: string;
    department: string;
    campus: { name: string };
  };
}

interface StaffOption {
  id: string;
  employeeId: string;
  fullName: string;
  basicSalary: number;
}

interface Props {
  initialPayrolls: PayrollEntry[];
  staffList: StaffOption[];
}

export default function PayrollManager({ initialPayrolls, staffList }: Props) {
  const [payrolls, setPayrolls] = useState<PayrollEntry[]>(initialPayrolls);
  const [showGenModal, setShowGenModal] = useState(false);
  const [showPayModal, setShowPayModal] = useState(false);
  const [activePayroll, setActivePayroll] = useState<PayrollEntry | null>(null);

  // Form State
  const [staffId, setStaffId] = useState(staffList[0]?.id || "");
  const [payrollMonth, setPayrollMonth] = useState("November");
  const [payrollYear, setPayrollYear] = useState(2025);
  const [allowances, setAllowances] = useState<number>(3000);
  const [deductions, setDeductions] = useState<number>(1000);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // Pay Modal Form
  const [payMethod, setPayMethod] = useState("Direct Bank Transfer");
  const [payRef, setPayRef] = useState("SAL-NOV-01");
  const [payLoading, setPayLoading] = useState(false);

  // Metrics
  const totalCommitted = payrolls.reduce((acc, p) => acc + p.netPayable, 0);
  const totalDisbursed = payrolls.filter((p) => p.status === "PAID").reduce((acc, p) => acc + p.netPayable, 0);
  const totalPending = payrolls.filter((p) => p.status === "PENDING").reduce((acc, p) => acc + p.netPayable, 0);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/payroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          staffId,
          payrollMonth,
          payrollYear,
          allowances,
          deductions,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Failed to generate payroll");

      setMessage("Payroll generated successfully!");
      setShowGenModal(false);

      const fetchRes = await fetch("/api/payroll");
      const fetchData = await fetchRes.json();
      if (fetchData.payrolls) setPayrolls(fetchData.payrolls);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkPaid = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activePayroll) return;
    setPayLoading(true);

    try {
      const res = await fetch("/api/payroll", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          payrollId: activePayroll.id,
          paymentMethod: payMethod,
          paymentRef: payRef,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Failed to mark paid");

      setMessage("Salary marked as disbursed!");
      setShowPayModal(false);
      setActivePayroll(null);

      const fetchRes = await fetch("/api/payroll");
      const fetchData = await fetchRes.json();
      if (fetchData.payrolls) setPayrolls(fetchData.payrolls);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setPayLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-school-border shadow-sm">
        <div>
          <span className="text-xs font-bold text-school-navy bg-school-gold-light px-2.5 py-1 rounded">
            Faculty Compensation
          </span>
          <h1 className="text-xl font-bold text-school-navy mt-1">Staff Payroll & Salary Slips</h1>
          <p className="text-xs text-school-muted">
            Net Payable = Basic Salary + Allowances − Deductions. Generate salary slips and log disbursements.
          </p>
        </div>

        <button
          onClick={() => setShowGenModal(true)}
          className="px-4 py-2 rounded-lg bg-school-navy text-white text-xs font-bold hover:bg-school-navy-light flex items-center space-x-1.5 shadow"
        >
          <Plus className="w-3.5 h-3.5 text-school-gold" />
          <span>Generate Staff Payroll</span>
        </button>
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
          <span className="text-xs font-bold text-school-muted uppercase block">Total Payroll Committed</span>
          <span className="text-2xl font-black text-school-navy mt-1 block">{formatPKR(totalCommitted)}</span>
          <span className="text-[11px] text-school-muted">{payrolls.length} payroll entries recorded</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-school-border shadow-sm">
          <span className="text-xs font-bold text-school-muted uppercase block">Total Salaries Disbursed</span>
          <span className="text-2xl font-black text-emerald-700 mt-1 block">{formatPKR(totalDisbursed)}</span>
          <span className="text-[11px] text-emerald-600 font-semibold">Transferred to faculty accounts</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-school-border shadow-sm">
          <span className="text-xs font-bold text-school-muted uppercase block">Pending Disbursements</span>
          <span className="text-2xl font-black text-amber-700 mt-1 block">{formatPKR(totalPending)}</span>
          <span className="text-[11px] text-amber-600 font-semibold">Awaiting monthly approval/payout</span>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-school-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 font-bold text-school-navy border-b">
              <tr>
                <th className="py-3 px-4">Employee Details</th>
                <th className="py-3 px-4">Period</th>
                <th className="py-3 px-4">Basic Salary</th>
                <th className="py-3 px-4">Allowances</th>
                <th className="py-3 px-4">Deductions</th>
                <th className="py-3 px-4 font-black">Net Payable</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-school-border text-school-text">
              {payrolls.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50">
                  <td className="py-3 px-4">
                    <strong className="text-school-navy block">{p.staff.fullName}</strong>
                    <span className="text-school-muted text-[10px]">
                      {p.staff.employeeId} • {p.staff.designation} ({p.staff.campus.name})
                    </span>
                  </td>
                  <td className="py-3 px-4 font-medium">
                    {p.payrollMonth} {p.payrollYear}
                  </td>
                  <td className="py-3 px-4">{formatPKR(p.basicSalary)}</td>
                  <td className="py-3 px-4 text-emerald-700">+{formatPKR(p.allowances)}</td>
                  <td className="py-3 px-4 text-rose-700">-{formatPKR(p.deductions)}</td>
                  <td className="py-3 px-4 font-black text-school-navy text-sm">
                    {formatPKR(p.netPayable)}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        p.status === "PAID"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      {p.status !== "PAID" && (
                        <button
                          onClick={() => {
                            setActivePayroll(p);
                            setShowPayModal(true);
                          }}
                          className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px]"
                        >
                          Mark as Paid
                        </button>
                      )}
                      <Link
                        href={`/admin/payroll/slip/${p.id}`}
                        className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-school-navy font-bold text-[10px] flex items-center space-x-1"
                      >
                        <Printer className="w-3 h-3" />
                        <span>Salary Slip</span>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Generate Payroll Modal */}
      {showGenModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-school-border">
            <div className="flex items-center justify-between border-b pb-3 mb-4">
              <h2 className="text-lg font-bold text-school-navy">Generate Monthly Salary</h2>
              <button onClick={() => setShowGenModal(false)} className="text-school-muted hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleGenerate} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-school-navy block mb-1">Select Employee *</label>
                <select
                  value={staffId}
                  onChange={(e) => setStaffId(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-school-border bg-white"
                >
                  {staffList.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.employeeId} - {s.fullName} ({formatPKR(s.basicSalary)})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-school-navy block mb-1">Payroll Month *</label>
                  <select
                    value={payrollMonth}
                    onChange={(e) => setPayrollMonth(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-school-border bg-white"
                  >
                    {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-bold text-school-navy block mb-1">Payroll Year *</label>
                  <input
                    type="number"
                    value={payrollYear}
                    onChange={(e) => setPayrollYear(parseInt(e.target.value) || 2025)}
                    className="w-full px-3 py-2 rounded-lg border border-school-border"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-school-navy block mb-1">Allowances (PKR)</label>
                  <input
                    type="number"
                    value={allowances}
                    onChange={(e) => setAllowances(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-lg border border-school-border"
                  />
                </div>
                <div>
                  <label className="font-bold text-school-navy block mb-1">Deductions (PKR)</label>
                  <input
                    type="number"
                    value={deductions}
                    onChange={(e) => setDeductions(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-lg border border-school-border"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowGenModal(false)}
                  className="px-4 py-2 rounded-lg border font-bold text-school-muted"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 rounded-lg bg-school-navy text-white font-bold hover:bg-school-navy-light flex items-center space-x-1.5"
                >
                  {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-3.5 h-3.5 text-school-gold" />}
                  <span>Generate Salary</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Pay Disbursement Modal */}
      {showPayModal && activePayroll && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-school-border">
            <div className="flex items-center justify-between border-b pb-3 mb-4">
              <div>
                <h2 className="text-lg font-bold text-school-navy">Confirm Salary Disbursement</h2>
                <span className="text-xs text-school-muted">{activePayroll.staff.fullName}</span>
              </div>
              <button onClick={() => setShowPayModal(false)} className="text-school-muted hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleMarkPaid} className="space-y-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border flex justify-between items-center">
                <span>Net Payable Amount:</span>
                <strong className="text-sm text-school-navy font-black">{formatPKR(activePayroll.netPayable)}</strong>
              </div>

              <div>
                <label className="font-bold text-school-navy block mb-1">Payment Method *</label>
                <select
                  value={payMethod}
                  onChange={(e) => setPayMethod(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-school-border bg-white"
                >
                  <option value="Direct Bank Transfer">Direct Online Bank Transfer</option>
                  <option value="Cash Disbursement">Cash Disbursement at Office</option>
                  <option value="Bank Cheque">Bank Cheque</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-school-navy block mb-1">Disbursement Reference / Transaction ID</label>
                <input
                  type="text"
                  value={payRef}
                  onChange={(e) => setPayRef(e.target.value)}
                  placeholder="e.g. HBL-FT-78219"
                  className="w-full px-3 py-2 rounded-lg border border-school-border"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowPayModal(false)}
                  className="px-4 py-2 rounded-lg border font-bold text-school-muted"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={payLoading}
                  className="px-5 py-2 rounded-lg bg-emerald-700 text-white font-bold hover:bg-emerald-800 flex items-center space-x-1.5"
                >
                  {payLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <DollarSign className="w-3.5 h-3.5" />}
                  <span>Confirm Payout</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
