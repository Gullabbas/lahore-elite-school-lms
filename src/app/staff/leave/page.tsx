"use client";

import React, { useState, useEffect } from "react";
import { Heart, Plus, Calendar, CheckCircle2, Clock, AlertCircle, Loader2 } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface LeaveItem {
  id: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: string;
  createdAt: string;
  approvalNotes: string | null;
}

export default function StaffLeavePage() {
  const [leaves, setLeaves] = useState<LeaveItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [form, setForm] = useState({
    leaveType: "CASUAL",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const fetchLeaves = async () => {
    try {
      const res = await fetch("/api/leave");
      const data = await res.json();
      if (data.success) {
        setLeaves(data.leaves);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const res = await fetch("/api/leave", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (data.success) {
        setSuccessMsg("Your leave application has been submitted successfully to the Principal's office.");
        setForm({
          leaveType: "CASUAL",
          startDate: "",
          endDate: "",
          reason: "",
        });
        fetchLeaves();
      } else {
        setErrorMsg(data.message || "Failed to submit leave request.");
      }
    } catch (err) {
      setErrorMsg("Network or server error occurred.");
    } finally {
      setSubmitting(false);
    }
  };

  const approvedLeaves = leaves.filter((l) => l.status === "APPROVED").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-school-border shadow-sm">
        <div className="flex items-center space-x-2 text-school-gold-warm font-bold text-xs uppercase tracking-wider mb-1">
          <Heart className="w-4 h-4" />
          <span>Faculty Human Resources</span>
        </div>
        <h1 className="text-2xl font-extrabold text-school-navy">Leave Requests &amp; Entitlements</h1>
        <p className="text-xs text-school-muted mt-1">
          Submit formal leave applications for sick leave, casual leave, or emergencies for principal review and approval.
        </p>
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-school-border shadow-sm">
          <span className="text-[10px] font-bold text-school-muted uppercase tracking-wider block">Casual Leave Balance</span>
          <span className="text-2xl font-black text-school-navy mt-1 block">8 Days</span>
          <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">Available for active academic session</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-school-border shadow-sm">
          <span className="text-[10px] font-bold text-school-muted uppercase tracking-wider block">Medical / Sick Leaves</span>
          <span className="text-2xl font-black text-school-navy mt-1 block">10 Days</span>
          <span className="text-[11px] text-school-muted mt-1 block">Medical certificate required for &gt; 2 days</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-school-border shadow-sm">
          <span className="text-[10px] font-bold text-school-muted uppercase tracking-wider block">Leaves Availed This Term</span>
          <span className="text-2xl font-black text-school-navy mt-1 block">{approvedLeaves} Days</span>
          <span className="text-[11px] text-school-muted mt-1 block">Reconciled with monthly payroll</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Leave Request Form */}
        <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-school-border shadow-sm space-y-4">
          <div className="border-b border-school-border pb-3">
            <h2 className="text-sm font-extrabold text-school-navy">Submit New Leave Request</h2>
            <p className="text-xs text-school-muted">All applications are subject to administrator approval.</p>
          </div>

          {successMsg && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-school-navy block mb-1">Leave Type *</label>
              <select
                required
                value={form.leaveType}
                onChange={(e) => setForm({ ...form, leaveType: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-school-border bg-white text-xs text-school-navy font-semibold focus:ring-2 focus:ring-school-gold"
              >
                <option value="CASUAL">Casual / Personal Leave</option>
                <option value="SICK">Medical / Sick Leave</option>
                <option value="EMERGENCY">Family Emergency</option>
                <option value="ANNUAL">Annual Leave</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-school-navy block mb-1">From Date *</label>
                <input
                  type="date"
                  required
                  value={form.startDate}
                  onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-school-border text-xs focus:ring-2 focus:ring-school-gold"
                />
              </div>
              <div>
                <label className="font-bold text-school-navy block mb-1">To Date *</label>
                <input
                  type="date"
                  required
                  value={form.endDate}
                  onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-school-border text-xs focus:ring-2 focus:ring-school-gold"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-school-navy block mb-1">Reason / Statement *</label>
              <textarea
                required
                rows={4}
                value={form.reason}
                onChange={(e) => setForm({ ...form, reason: e.target.value })}
                placeholder="State the reason for absence and lesson coverage arrangements if any..."
                className="w-full px-3 py-2.5 rounded-xl border border-school-border text-xs focus:ring-2 focus:ring-school-gold"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 rounded-xl bg-school-navy text-white font-bold text-xs hover:bg-school-navy-light transition-all flex items-center justify-center space-x-2 shadow-md"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-school-gold" />
                  <span>Submitting Application...</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 text-school-gold" />
                  <span>Submit Leave Application</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Column: Leave History & Status */}
        <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-school-border shadow-sm space-y-4">
          <div className="border-b border-school-border pb-3 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-extrabold text-school-navy">Leave Application History</h2>
              <p className="text-xs text-school-muted">Review status and approval feedback</p>
            </div>
            <span className="text-xs text-school-muted font-mono">{leaves.length} Applications</span>
          </div>

          {loading ? (
            <div className="p-8 text-center text-xs text-school-muted">Loading leave records...</div>
          ) : leaves.length === 0 ? (
            <div className="p-10 text-center text-xs text-school-muted bg-slate-50 rounded-xl">
              No leave applications submitted yet for this session.
            </div>
          ) : (
            <div className="space-y-3">
              {leaves.map((item) => (
                <div key={item.id} className="p-4 rounded-xl border border-school-border bg-slate-50 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-school-navy text-school-gold">
                      {item.leaveType}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                        item.status === "APPROVED"
                          ? "bg-emerald-100 text-emerald-800"
                          : item.status === "REJECTED"
                          ? "bg-rose-100 text-rose-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-school-navy">{item.reason}</p>

                  <div className="flex items-center justify-between text-[11px] text-school-muted pt-1 border-t border-slate-200">
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3.5 h-3.5 text-school-gold-warm" />
                      <span>
                        {formatDate(item.startDate)} to {formatDate(item.endDate)}
                      </span>
                    </span>
                    <span className="font-mono text-[10px]">Applied: {formatDate(item.createdAt)}</span>
                  </div>

                  {item.approvalNotes && (
                    <div className="text-[11px] text-slate-700 bg-white p-2 rounded border italic">
                      Admin Note: {item.approvalNotes}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
