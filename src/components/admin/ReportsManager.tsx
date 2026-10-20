"use client";

import React, { useState } from "react";
import { formatPKR, formatDate } from "@/lib/utils";
import {
  FileText,
  Download,
  Users,
  Receipt,
  DollarSign,
  Clock,
  Printer,
  TrendingUp,
  AlertTriangle,
  Building2,
} from "lucide-react";
import PrintButton from "@/components/ui/PrintButton";

interface ClassStrength {
  className: string;
  code: string;
  totalStudents: number;
  boys: number;
  girls: number;
}

interface CampusStrength {
  campusName: string;
  totalStudents: number;
}

interface Props {
  classStrengths: ClassStrength[];
  campusStrengths: CampusStrength[];
  feeStats: {
    totalBilled: number;
    totalCollected: number;
    totalPending: number;
    paidVouchers: number;
    unpaidVouchers: number;
  };
  payrollStats: {
    totalStaff: number;
    monthlyPayrollOutlay: number;
    paidCount: number;
    pendingCount: number;
  };
  attendanceStats: {
    studentAttendanceRate: number;
    defaulterStudentsCount: number;
  };
}

export default function ReportsManager({
  classStrengths,
  campusStrengths,
  feeStats,
  payrollStats,
  attendanceStats,
}: Props) {
  const [activeReport, setActiveReport] = useState<"STUDENTS" | "FEES" | "STAFF" | "ATTENDANCE">("STUDENTS");

  const exportStudentsCSV = () => {
    let csv = "Class,Code,Total Students,Male Students,Female Students\n";
    classStrengths.forEach((c) => {
      csv += `"${c.className}","${c.code}",${c.totalStudents},${c.boys},${c.girls}\n`;
    });
    downloadCSV(csv, "les-student-strength-report.csv");
  };

  const exportFeesCSV = () => {
    let csv = "Metric,Value\n";
    csv += `"Total Billed Vouchers",${feeStats.totalBilled}\n`;
    csv += `"Total Collected Fee (PKR)",${feeStats.totalCollected}\n`;
    csv += `"Total Outstanding Balance (PKR)",${feeStats.totalPending}\n`;
    csv += `"Paid Vouchers Count",${feeStats.paidVouchers}\n`;
    csv += `"Unpaid Vouchers Count",${feeStats.unpaidVouchers}\n`;
    downloadCSV(csv, "les-financial-fee-recovery-report.csv");
  };

  const exportPayrollCSV = () => {
    let csv = "Metric,Value\n";
    csv += `"Total Staff Members",${payrollStats.totalStaff}\n`;
    csv += `"Monthly Basic Outlay (PKR)",${payrollStats.monthlyPayrollOutlay}\n`;
    csv += `"Paid Payroll Slips",${payrollStats.paidCount}\n`;
    csv += `"Pending Payroll Slips",${payrollStats.pendingCount}\n`;
    downloadCSV(csv, "les-faculty-payroll-report.csv");
  };

  const downloadCSV = (content: string, filename: string) => {
    const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  const totalStudentsAll = classStrengths.reduce((acc, c) => acc + c.totalStudents, 0);
  const totalBoysAll = classStrengths.reduce((acc, c) => acc + c.boys, 0);
  const totalGirlsAll = classStrengths.reduce((acc, c) => acc + c.girls, 0);
  const recoveryPct =
    feeStats.totalBilled > 0 ? Math.round((feeStats.totalCollected / feeStats.totalBilled) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-school-border shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-school-gold-warm font-bold text-xs uppercase tracking-wider mb-1">
            <FileText className="w-4 h-4" />
            <span>Institutional Intelligence</span>
          </div>
          <h1 className="text-2xl font-extrabold text-school-navy">Executive Reports &amp; Analytics</h1>
          <p className="text-xs text-school-muted mt-1">
            Generate and export official administrative summaries, fee recovery audits, and student demographics
          </p>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <PrintButton label="Print Report" />
        </div>
      </div>

      {/* Report Navigation Tabs */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveReport("STUDENTS")}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
            activeReport === "STUDENTS"
              ? "bg-school-navy text-school-gold"
              : "bg-white text-school-navy hover:bg-slate-50 border border-school-border"
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Student Strength Report</span>
        </button>

        <button
          onClick={() => setActiveReport("FEES")}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
            activeReport === "FEES"
              ? "bg-school-navy text-school-gold"
              : "bg-white text-school-navy hover:bg-slate-50 border border-school-border"
          }`}
        >
          <Receipt className="w-4 h-4" />
          <span>Fee Recovery &amp; Receivables</span>
        </button>

        <button
          onClick={() => setActiveReport("STAFF")}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
            activeReport === "STAFF"
              ? "bg-school-navy text-school-gold"
              : "bg-white text-school-navy hover:bg-slate-50 border border-school-border"
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>Payroll Outlay Audit</span>
        </button>

        <button
          onClick={() => setActiveReport("ATTENDANCE")}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
            activeReport === "ATTENDANCE"
              ? "bg-school-navy text-school-gold"
              : "bg-white text-school-navy hover:bg-slate-50 border border-school-border"
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Attendance Analytics</span>
        </button>
      </div>

      {/* REPORT 1: STUDENT STRENGTH */}
      {activeReport === "STUDENTS" && (
        <div className="space-y-6 printable-document">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-extrabold text-school-navy">Enrollment &amp; Class Strength Audit</h2>
              <p className="text-xs text-school-muted">
                Detailed headcount breakdown across all academic tiers (Pre-School, Primary, Middle, High School)
              </p>
            </div>
            <button
              onClick={exportStudentsCSV}
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-school-gold text-school-navy-deep font-bold text-xs hover:bg-school-gold-warm transition-all shadow self-start sm:self-auto"
            >
              <Download className="w-4 h-4" />
              <span>Export CSV</span>
            </button>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl border border-school-border shadow-sm">
              <span className="text-[10px] uppercase font-bold text-school-muted block">Total Enrolled</span>
              <span className="text-2xl font-black text-school-navy mt-1 block">{totalStudentsAll}</span>
            </div>
            <div className="bg-blue-50/60 p-4 rounded-xl border border-blue-100 shadow-sm">
              <span className="text-[10px] uppercase font-bold text-blue-800 block">Male Students</span>
              <span className="text-2xl font-black text-blue-700 mt-1 block">{totalBoysAll}</span>
            </div>
            <div className="bg-pink-50/60 p-4 rounded-xl border border-pink-100 shadow-sm">
              <span className="text-[10px] uppercase font-bold text-pink-800 block">Female Students</span>
              <span className="text-2xl font-black text-pink-700 mt-1 block">{totalGirlsAll}</span>
            </div>
            <div className="bg-purple-50/60 p-4 rounded-xl border border-purple-100 shadow-sm">
              <span className="text-[10px] uppercase font-bold text-purple-800 block">Active Classes</span>
              <span className="text-2xl font-black text-purple-700 mt-1 block">{classStrengths.length}</span>
            </div>
          </div>

          {/* Campus Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {campusStrengths.map((camp) => (
              <div key={camp.campusName} className="bg-white p-4 rounded-xl border border-school-border flex items-center justify-between shadow-sm">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-school-navy text-school-gold flex items-center justify-center font-bold">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-school-navy">{camp.campusName}</h4>
                    <p className="text-[11px] text-school-muted">Registered Strength</p>
                  </div>
                </div>
                <span className="text-xl font-extrabold text-school-navy">{camp.totalStudents} Students</span>
              </div>
            ))}
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl border border-school-border overflow-hidden shadow-sm">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-school-navy font-bold uppercase text-[10px] tracking-wider border-b border-school-border">
                <tr>
                  <th className="p-3.5">Academic Class</th>
                  <th className="p-3.5">Class Code</th>
                  <th className="p-3.5 text-center">Boys</th>
                  <th className="p-3.5 text-center">Girls</th>
                  <th className="p-3.5 text-right">Total Students</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-school-border">
                {classStrengths.map((c) => (
                  <tr key={c.code} className="hover:bg-slate-50">
                    <td className="p-3.5 font-bold text-school-navy">{c.className}</td>
                    <td className="p-3.5 font-mono text-school-muted">{c.code}</td>
                    <td className="p-3.5 text-center font-mono font-semibold text-blue-700">{c.boys}</td>
                    <td className="p-3.5 text-center font-mono font-semibold text-pink-700">{c.girls}</td>
                    <td className="p-3.5 text-right font-mono font-black text-school-navy text-sm">
                      {c.totalStudents}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* REPORT 2: FEE RECOVERY */}
      {activeReport === "FEES" && (
        <div className="space-y-6 printable-document">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-extrabold text-school-navy">Fee Collection &amp; Defaulter Audit</h2>
              <p className="text-xs text-school-muted">
                Executive financial ledger comparison of billed vouchers vs cash realization
              </p>
            </div>
            <button
              onClick={exportFeesCSV}
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-school-gold text-school-navy-deep font-bold text-xs hover:bg-school-gold-warm transition-all shadow self-start sm:self-auto"
            >
              <Download className="w-4 h-4" />
              <span>Export CSV</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-school-border shadow-sm">
              <span className="text-[10px] uppercase font-bold text-school-muted block">Total Vouchers Billed</span>
              <span className="text-2xl font-black text-school-navy mt-1 block font-mono">
                {formatPKR(feeStats.totalBilled)}
              </span>
            </div>
            <div className="bg-emerald-50/60 p-5 rounded-2xl border border-emerald-100 shadow-sm">
              <span className="text-[10px] uppercase font-bold text-emerald-800 block">Total Realized &amp; Paid</span>
              <span className="text-2xl font-black text-emerald-700 mt-1 block font-mono">
                {formatPKR(feeStats.totalCollected)}
              </span>
            </div>
            <div className="bg-rose-50/60 p-5 rounded-2xl border border-rose-100 shadow-sm">
              <span className="text-[10px] uppercase font-bold text-rose-800 block">Outstanding Receivables</span>
              <span className="text-2xl font-black text-rose-700 mt-1 block font-mono">
                {formatPKR(feeStats.totalPending)}
              </span>
            </div>
            <div className="bg-purple-50/60 p-5 rounded-2xl border border-purple-100 shadow-sm">
              <span className="text-[10px] uppercase font-bold text-purple-800 block">Recovery Rate</span>
              <span className="text-2xl font-black text-purple-700 mt-1 block font-mono">{recoveryPct}%</span>
            </div>
          </div>
        </div>
      )}

      {/* REPORT 3: STAFF PAYROLL */}
      {activeReport === "STAFF" && (
        <div className="space-y-6 printable-document">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-extrabold text-school-navy">Faculty &amp; Payroll Outlay Audit</h2>
              <p className="text-xs text-school-muted">
                Monthly teaching compensation breakdown and disbursement compliance
              </p>
            </div>
            <button
              onClick={exportPayrollCSV}
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-school-gold text-school-navy-deep font-bold text-xs hover:bg-school-gold-warm transition-all shadow self-start sm:self-auto"
            >
              <Download className="w-4 h-4" />
              <span>Export CSV</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-school-border shadow-sm">
              <span className="text-[10px] uppercase font-bold text-school-muted block">Total Staff Members</span>
              <span className="text-2xl font-black text-school-navy mt-1 block">{payrollStats.totalStaff}</span>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-school-border shadow-sm">
              <span className="text-[10px] uppercase font-bold text-school-muted block">Monthly Basic Outlay</span>
              <span className="text-2xl font-black text-school-navy mt-1 block font-mono">
                {formatPKR(payrollStats.monthlyPayrollOutlay)}
              </span>
            </div>
            <div className="bg-emerald-50/60 p-5 rounded-2xl border border-emerald-100 shadow-sm">
              <span className="text-[10px] uppercase font-bold text-emerald-800 block">Disbursed Slips</span>
              <span className="text-2xl font-black text-emerald-700 mt-1 block">
                {payrollStats.paidCount} / {payrollStats.paidCount + payrollStats.pendingCount}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* REPORT 4: ATTENDANCE */}
      {activeReport === "ATTENDANCE" && (
        <div className="space-y-6 printable-document">
          <div>
            <h2 className="text-base font-extrabold text-school-navy">Student Attendance Compliance Audit</h2>
            <p className="text-xs text-school-muted">
              Monitoring institutional attendance benchmarks and exam eligibility thresholds
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-school-border shadow-sm">
              <span className="text-[10px] uppercase font-bold text-school-muted block">Overall Present Rate</span>
              <span className="text-3xl font-black text-emerald-600 mt-1 block font-mono">
                {attendanceStats.studentAttendanceRate}%
              </span>
              <p className="text-xs text-school-muted mt-2">
                Calculated across all logged attendance sessions for the active academic term.
              </p>
            </div>

            <div className="bg-amber-50/60 p-5 rounded-2xl border border-amber-100 shadow-sm">
              <span className="text-[10px] uppercase font-bold text-amber-800 block">Students Under 65% Deficit</span>
              <span className="text-3xl font-black text-amber-700 mt-1 block font-mono">
                {attendanceStats.defaulterStudentsCount}
              </span>
              <p className="text-xs text-amber-800/80 mt-2">
                Students flagged for attendance warning letters before terminal board examination admission cards are issued.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
