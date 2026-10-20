"use client";

import React, { useState } from "react";
import { formatDate } from "@/lib/utils";
import {
  Clock,
  Calendar,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  UserCheck,
  Users,
  Save,
  Loader2,
  ShieldAlert,
} from "lucide-react";

interface StudentItem {
  id: string;
  admissionNo: string;
  fullName: string;
  fatherName: string;
  classId: string;
  sectionId: string;
}

interface StaffItem {
  id: string;
  employeeId: string;
  fullName: string;
  designation: string;
}

interface ClassOption {
  id: string;
  name: string;
  sections: { id: string; name: string }[];
}

interface Props {
  students: StudentItem[];
  staff: StaffItem[];
  classes: ClassOption[];
  todayStr: string;
}

export default function AttendanceManager({
  students,
  staff,
  classes,
  todayStr,
}: Props) {
  const [entityType, setEntityType] = useState<"STUDENT" | "STAFF">("STUDENT");
  const [selectedDate, setSelectedDate] = useState(todayStr);
  const [selectedClassId, setSelectedClassId] = useState(classes[0]?.id || "");
  const [selectedSectionId, setSelectedSectionId] = useState(
    classes[0]?.sections[0]?.id || ""
  );

  // Attendance state map: entityId -> { status, notes }
  const [attendanceMap, setAttendanceMap] = useState<
    Record<string, { status: "PRESENT" | "ABSENT" | "LATE" | "LEAVE"; notes: string }>
  >(() => {
    const initial: any = {};
    students.forEach((s) => {
      initial[s.id] = { status: "PRESENT", notes: "" };
    });
    staff.forEach((st) => {
      initial[st.id] = { status: "PRESENT", notes: "" };
    });
    return initial;
  });

  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const activeStudents = students.filter(
    (s) => s.classId === selectedClassId && s.sectionId === selectedSectionId
  );

  const setStatus = (id: string, status: "PRESENT" | "ABSENT" | "LATE" | "LEAVE") => {
    setAttendanceMap((prev) => ({
      ...prev,
      [id]: { ...(prev[id] || { notes: "" }), status },
    }));
  };

  const markAllPresent = () => {
    const list = entityType === "STUDENT" ? activeStudents : staff;
    setAttendanceMap((prev) => {
      const updated = { ...prev };
      list.forEach((item) => {
        updated[item.id] = { ...(updated[item.id] || { notes: "" }), status: "PRESENT" };
      });
      return updated;
    });
  };

  const handleSave = async () => {
    setSaving(true);
    setFeedback(null);

    const list = entityType === "STUDENT" ? activeStudents : staff;
    const records = list.map((item) => ({
      entityId: item.id,
      status: attendanceMap[item.id]?.status || "PRESENT",
      notes: attendanceMap[item.id]?.notes || "",
    }));

    try {
      const res = await fetch("/api/attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dateStr: selectedDate,
          entityType,
          records,
          classId: entityType === "STUDENT" ? selectedClassId : undefined,
          sectionId: entityType === "STUDENT" ? selectedSectionId : undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Failed to save attendance");

      setFeedback(`Attendance for ${records.length} records saved successfully for ${selectedDate}.`);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-school-border shadow-sm">
        <div>
          <span className="text-xs font-bold text-school-navy bg-school-gold-light px-2.5 py-1 rounded">
            Daily Academic Registry
          </span>
          <h1 className="text-xl font-bold text-school-navy mt-1">Attendance Management</h1>
          <p className="text-xs text-school-muted">
            Daily roll-call tracking for students and staff. Prevents duplicate daily records.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={markAllPresent}
            className="px-3.5 py-2 rounded-lg border border-school-border text-school-navy font-bold text-xs hover:bg-slate-50 transition-colors"
          >
            Mark All Present
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="px-5 py-2 rounded-lg bg-school-navy text-white font-bold text-xs hover:bg-school-navy-light flex items-center space-x-1.5 shadow"
          >
            {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5 text-school-gold" />}
            <span>Save Attendance</span>
          </button>
        </div>
      </div>

      {feedback && (
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Control Bar: Mode, Date, Class/Section */}
      <div className="bg-white p-4 rounded-xl border border-school-border shadow-sm grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
        {/* Toggle Mode */}
        <div className="sm:col-span-4 flex rounded-lg bg-slate-100 p-1">
          <button
            type="button"
            onClick={() => setEntityType("STUDENT")}
            className={`flex-1 py-1.5 rounded-md text-xs font-bold transition-all flex items-center justify-center space-x-1.5 ${
              entityType === "STUDENT"
                ? "bg-school-navy text-white shadow"
                : "text-school-muted hover:text-school-navy"
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Students</span>
          </button>

          <button
            type="button"
            onClick={() => setEntityType("STAFF")}
            className={`flex-1 py-1.5 rounded-md text-xs font-bold transition-all flex items-center justify-center space-x-1.5 ${
              entityType === "STAFF"
                ? "bg-school-navy text-white shadow"
                : "text-school-muted hover:text-school-navy"
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Teachers & Staff</span>
          </button>
        </div>

        {/* Date Picker */}
        <div className="sm:col-span-3">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full px-3 py-1.5 rounded-lg border border-school-border text-xs"
          />
        </div>

        {/* Class and Section (Only for Students) */}
        {entityType === "STUDENT" && (
          <>
            <div className="sm:col-span-3">
              <select
                value={selectedClassId}
                onChange={(e) => {
                  const cId = e.target.value;
                  setSelectedClassId(cId);
                  const matched = classes.find((c) => c.id === cId);
                  setSelectedSectionId(matched?.sections[0]?.id || "");
                }}
                className="w-full px-3 py-1.5 rounded-lg border border-school-border text-xs bg-white"
              >
                {classes.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <select
                value={selectedSectionId}
                onChange={(e) => setSelectedSectionId(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg border border-school-border text-xs bg-white"
              >
                {classes
                  .find((c) => c.id === selectedClassId)
                  ?.sections.map((s) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
              </select>
            </div>
          </>
        )}
      </div>

      {/* Attendance Roster Table */}
      <div className="bg-white rounded-2xl border border-school-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 font-bold text-school-navy border-b">
              <tr>
                <th className="py-3 px-4">Identifier</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Details</th>
                <th className="py-3 px-4">Status Selection</th>
                <th className="py-3 px-4 text-right">Notes (Optional)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-school-border text-school-text">
              {entityType === "STUDENT" ? (
                activeStudents.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-school-muted">
                      No students enrolled in this class and section.
                    </td>
                  </tr>
                ) : (
                  activeStudents.map((st) => {
                    const currentStatus = attendanceMap[st.id]?.status || "PRESENT";
                    return (
                      <tr key={st.id} className="hover:bg-slate-50">
                        <td className="py-3 px-4 font-mono font-bold text-school-navy">{st.admissionNo}</td>
                        <td className="py-3 px-4 font-bold text-school-navy">{st.fullName}</td>
                        <td className="py-3 px-4 text-school-muted">Father: {st.fatherName}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-1">
                            {(["PRESENT", "ABSENT", "LATE", "LEAVE"] as const).map((s) => (
                              <button
                                key={s}
                                type="button"
                                onClick={() => setStatus(st.id, s)}
                                className={`px-2.5 py-1 rounded text-[10px] font-bold transition-all ${
                                  currentStatus === s
                                    ? s === "PRESENT"
                                      ? "bg-emerald-600 text-white shadow-sm"
                                      : s === "ABSENT"
                                      ? "bg-rose-600 text-white shadow-sm"
                                      : s === "LATE"
                                      ? "bg-amber-600 text-white shadow-sm"
                                      : "bg-blue-600 text-white shadow-sm"
                                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                }`}
                              >
                                {s}
                              </button>
                            ))}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <input
                            type="text"
                            placeholder="Optional remark..."
                            value={attendanceMap[st.id]?.notes || ""}
                            onChange={(e) => {
                              const val = e.target.value;
                              setAttendanceMap((prev) => ({
                                ...prev,
                                [st.id]: { ...(prev[st.id] || { status: "PRESENT" }), notes: val },
                              }));
                            }}
                            className="px-2 py-1 rounded border border-school-border text-xs max-w-xs w-full text-right"
                          />
                        </td>
                      </tr>
                    );
                  })
                )
              ) : (
                staff.map((st) => {
                  const currentStatus = attendanceMap[st.id]?.status || "PRESENT";
                  return (
                    <tr key={st.id} className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-mono font-bold text-school-navy">{st.employeeId}</td>
                      <td className="py-3 px-4 font-bold text-school-navy">{st.fullName}</td>
                      <td className="py-3 px-4 text-school-muted">{st.designation}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-1">
                          {(["PRESENT", "ABSENT", "LATE", "LEAVE"] as const).map((s) => (
                            <button
                              key={s}
                              type="button"
                              onClick={() => setStatus(st.id, s)}
                              className={`px-2.5 py-1 rounded text-[10px] font-bold transition-all ${
                                currentStatus === s
                                  ? s === "PRESENT"
                                    ? "bg-emerald-600 text-white shadow-sm"
                                    : s === "ABSENT"
                                    ? "bg-rose-600 text-white shadow-sm"
                                    : s === "LATE"
                                    ? "bg-amber-600 text-white shadow-sm"
                                    : "bg-blue-600 text-white shadow-sm"
                                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                              }`}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <input
                          type="text"
                          placeholder="Optional remark..."
                          value={attendanceMap[st.id]?.notes || ""}
                          onChange={(e) => {
                            const val = e.target.value;
                            setAttendanceMap((prev) => ({
                              ...prev,
                              [st.id]: { ...(prev[st.id] || { status: "PRESENT" }), notes: val },
                            }));
                          }}
                          className="px-2 py-1 rounded border border-school-border text-xs max-w-xs w-full text-right"
                        />
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
