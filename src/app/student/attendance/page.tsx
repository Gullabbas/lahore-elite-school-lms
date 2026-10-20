import React from "react";
import { getStudentContext } from "@/lib/student";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { Clock, CheckCircle2, XCircle, AlertCircle, AlertTriangle, Calendar } from "lucide-react";
import PrintButton from "@/components/ui/PrintButton";

export const dynamic = "force-dynamic";

export default async function StudentAttendancePage() {
  const student = await getStudentContext();

  if (!student) {
    return (
      <div className="p-8 text-center bg-white rounded-2xl border border-school-border">
        <p className="text-sm text-school-muted">Student profile not found.</p>
      </div>
    );
  }

  // Fetch full attendance history for this student
  const attendances = await prisma.attendance.findMany({
    where: { studentId: student.id },
    orderBy: { date: "desc" },
  });

  const totalDays = attendances.length;
  const presents = attendances.filter((a) => a.status === "PRESENT").length;
  const absents = attendances.filter((a) => a.status === "ABSENT").length;
  const lates = attendances.filter((a) => a.status === "LATE").length;
  const leaves = attendances.filter((a) => a.status === "LEAVE").length;

  const attendanceRate = totalDays > 0 ? Math.round(((presents + lates) / totalDays) * 100) : 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-school-border shadow-sm">
        <div>
          <div className="flex items-center space-x-2 text-school-gold-warm font-bold text-xs uppercase tracking-wider mb-1">
            <Clock className="w-4 h-4" />
            <span>Attendance Record</span>
          </div>
          <h1 className="text-2xl font-extrabold text-school-navy">My Attendance History</h1>
          <p className="text-xs text-school-muted mt-1">
            {student.fullName} ({student.admissionNo}) &bull; {student.class.name} ({student.section.name})
          </p>
        </div>
        <div className="shrink-0 flex items-center space-x-3">
          <PrintButton label="Print Record" />
        </div>
      </div>

      {/* Warning if below 65% */}
      {attendanceRate < 65 && (
        <div className="p-4 bg-amber-50 border-l-4 border-amber-500 rounded-xl flex items-center space-x-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
          <div>
            <h4 className="text-xs font-bold text-amber-900">Attendance Deficit Warning (&lt; 65%)</h4>
            <p className="text-[11px] text-amber-700">
              According to Lahore Elite School rules, students must maintain a minimum of 65% attendance across the academic term to qualify for terminal exams.
            </p>
          </div>
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="bg-white p-4 rounded-xl border border-school-border shadow-sm text-center">
          <span className="text-[10px] font-bold text-school-muted uppercase block">Total Days</span>
          <span className="text-2xl font-extrabold text-school-navy mt-1 block">{totalDays}</span>
        </div>
        <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-100 shadow-sm text-center">
          <span className="text-[10px] font-bold text-emerald-800 uppercase block">Present</span>
          <span className="text-2xl font-extrabold text-emerald-700 mt-1 block">{presents}</span>
        </div>
        <div className="bg-rose-50/60 p-4 rounded-xl border border-rose-100 shadow-sm text-center">
          <span className="text-[10px] font-bold text-rose-800 uppercase block">Absent</span>
          <span className="text-2xl font-extrabold text-rose-700 mt-1 block">{absents}</span>
        </div>
        <div className="bg-amber-50/60 p-4 rounded-xl border border-amber-100 shadow-sm text-center">
          <span className="text-[10px] font-bold text-amber-800 uppercase block">Late</span>
          <span className="text-2xl font-extrabold text-amber-700 mt-1 block">{lates}</span>
        </div>
        <div className="bg-blue-50/60 p-4 rounded-xl border border-blue-100 shadow-sm text-center col-span-2 sm:col-span-1">
          <span className="text-[10px] font-bold text-blue-800 uppercase block">Overall Rate</span>
          <span className="text-2xl font-extrabold text-blue-700 mt-1 block">{attendanceRate}%</span>
        </div>
      </div>

      {/* History Table */}
      <div className="bg-white rounded-2xl border border-school-border overflow-hidden shadow-sm printable-document">
        <div className="hidden print:block text-center border-b p-4 mb-2">
          <h2 className="text-base font-black text-school-navy">LAHORE ELITE SCHOOL</h2>
          <p className="text-xs text-slate-600">Official Attendance Log &bull; {student.fullName} ({student.admissionNo})</p>
        </div>

        <div className="p-4 bg-slate-50 border-b border-school-border flex items-center justify-between">
          <span className="text-xs font-bold text-school-navy">Attendance Daily Log</span>
          <span className="text-xs text-school-muted font-mono">{attendances.length} Entries Recorded</span>
        </div>

        {attendances.length === 0 ? (
          <div className="p-8 text-center text-xs text-school-muted">
            No attendance entries have been logged yet for your profile.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-school-navy font-bold uppercase text-[10px] tracking-wider border-b border-school-border">
                <tr>
                  <th className="p-3.5">Date</th>
                  <th className="p-3.5">Day</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">Notes / Remarks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-school-border">
                {attendances.map((record) => {
                  const dayName = new Date(record.date).toLocaleDateString("en-US", { weekday: "long" });

                  return (
                    <tr key={record.id} className="hover:bg-slate-50">
                      <td className="p-3.5 font-mono font-semibold text-school-navy">
                        {formatDate(record.date)}
                      </td>
                      <td className="p-3.5 text-school-muted">{dayName}</td>
                      <td className="p-3.5">
                        <span
                          className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            record.status === "PRESENT"
                              ? "bg-emerald-100 text-emerald-800"
                              : record.status === "ABSENT"
                              ? "bg-rose-100 text-rose-800"
                              : record.status === "LATE"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {record.status === "PRESENT" && <CheckCircle2 className="w-3 h-3 mr-1" />}
                          {record.status === "ABSENT" && <XCircle className="w-3 h-3 mr-1" />}
                          {record.status === "LATE" && <AlertCircle className="w-3 h-3 mr-1" />}
                          <span>{record.status}</span>
                        </span>
                      </td>
                      <td className="p-3.5 text-school-muted text-[11px]">
                        {record.notes || "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
