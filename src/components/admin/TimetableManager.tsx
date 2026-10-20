"use client";

import React, { useState } from "react";
import {
  Calendar,
  Clock,
  Plus,
  Users,
  AlertTriangle,
  CheckCircle2,
  Loader2,
  X,
  BookOpen,
} from "lucide-react";

interface TimetableSlot {
  id: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  room?: string | null;
  class: { id: string; name: string };
  section: { id: string; name: string };
  subject: { id: string; name: string };
  staff: { id: string; fullName: string };
  campus: { name: string };
}

interface ClassOption {
  id: string;
  name: string;
  sections: { id: string; name: string }[];
  subjects: { id: string; name: string }[];
}

interface StaffOption {
  id: string;
  fullName: string;
  designation: string;
}

interface CampusOption {
  id: string;
  name: string;
}

interface Props {
  initialSlots: TimetableSlot[];
  classes: ClassOption[];
  staff: StaffOption[];
  campuses: CampusOption[];
  sessionId: string;
}

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function TimetableManager({
  initialSlots,
  classes,
  staff,
  campuses,
  sessionId,
}: Props) {
  const [slots, setSlots] = useState<TimetableSlot[]>(initialSlots);
  const [selectedClassId, setSelectedClassId] = useState(classes[0]?.id || "");
  const [showAddModal, setShowAddModal] = useState(false);

  // New Slot State
  const [dayOfWeek, setDayOfWeek] = useState("Monday");
  const [startTime, setStartTime] = useState("08:30 AM");
  const [endTime, setEndTime] = useState("09:15 AM");
  const [subjectId, setSubjectId] = useState(classes[0]?.subjects[0]?.id || "");
  const [staffId, setStaffId] = useState(staff[0]?.id || "");
  const [room, setRoom] = useState("Room 101");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentClass = classes.find((c) => c.id === selectedClassId) || classes[0];
  const classSlots = slots.filter((s) => s.class.id === selectedClassId);

  const handleCreateSlot = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/timetable", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          academicSessionId: sessionId,
          campusId: campuses[0]?.id,
          classId: selectedClassId,
          sectionId: currentClass.sections[0]?.id,
          subjectId,
          staffId,
          dayOfWeek,
          startTime,
          endTime,
          room,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to create timetable slot");
      }

      setShowAddModal(false);

      const fetchRes = await fetch(`/api/timetable?classId=${selectedClassId}`);
      const fetchData = await fetchRes.json();
      if (fetchData.slots) setSlots(fetchData.slots);
    } catch (err: any) {
      setError(err.message || "Failed to add slot");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-school-border shadow-sm">
        <div>
          <span className="text-xs font-bold text-school-navy bg-school-gold-light px-2.5 py-1 rounded">
            Master Academic Schedule
          </span>
          <h1 className="text-xl font-bold text-school-navy mt-1">Class Timetables & Period Schedules</h1>
          <p className="text-xs text-school-muted">
            Weekly subject slots with automatic double-booking conflict detection for teachers and rooms.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 rounded-lg bg-school-navy text-white text-xs font-bold hover:bg-school-navy-light flex items-center space-x-1.5 shadow"
        >
          <Plus className="w-3.5 h-3.5 text-school-gold" />
          <span>Add Schedule Slot</span>
        </button>
      </div>

      {/* Class Selector Bar */}
      <div className="bg-white p-4 rounded-xl border border-school-border shadow-sm flex items-center space-x-3">
        <span className="text-xs font-bold text-school-navy shrink-0">Select Class Schedule:</span>
        <select
          value={selectedClassId}
          onChange={(e) => {
            const cId = e.target.value;
            setSelectedClassId(cId);
            const cls = classes.find((c) => c.id === cId);
            setSubjectId(cls?.subjects[0]?.id || "");
          }}
          className="px-3 py-1.5 rounded-lg border border-school-border text-xs bg-white font-bold text-school-navy"
        >
          {classes.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      {/* Weekly Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {days.map((day) => {
          const daySlots = classSlots.filter((s) => s.dayOfWeek === day);
          return (
            <div
              key={day}
              className="bg-white rounded-2xl border border-school-border shadow-sm overflow-hidden flex flex-col"
            >
              <div className="bg-school-navy text-white p-3.5 flex items-center justify-between">
                <span className="font-bold text-xs uppercase tracking-wider">{day}</span>
                <span className="text-[10px] text-school-gold font-semibold">
                  {daySlots.length} Periods
                </span>
              </div>

              <div className="p-4 space-y-3 flex-1">
                {daySlots.length === 0 ? (
                  <p className="text-[11px] text-school-muted py-6 text-center italic">
                    No periods scheduled for {day}.
                  </p>
                ) : (
                  daySlots.map((slot) => (
                    <div
                      key={slot.id}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1 hover:border-school-gold transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <strong className="text-school-navy text-sm">{slot.subject.name}</strong>
                        <span className="text-[10px] font-bold text-school-muted flex items-center space-x-1">
                          <Clock className="w-3 h-3 text-school-gold" />
                          <span>{slot.startTime} – {slot.endTime}</span>
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-school-muted pt-1">
                        <span>Teacher: <strong>{slot.staff.fullName}</strong></span>
                        <span className="bg-white px-2 py-0.5 rounded border border-slate-200 font-medium">
                          {slot.room || "Room 101"}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Slot Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-school-border">
            <div className="flex items-center justify-between border-b pb-3 mb-4">
              <div>
                <h2 className="text-lg font-bold text-school-navy">Schedule Period Slot</h2>
                <span className="text-xs text-school-muted">{currentClass.name}</span>
              </div>
              <button onClick={() => setShowAddModal(false)} className="text-school-muted hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleCreateSlot} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-school-navy block mb-1">Day of Week *</label>
                <select
                  value={dayOfWeek}
                  onChange={(e) => setDayOfWeek(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-school-border bg-white"
                >
                  {days.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-school-navy block mb-1">Subject *</label>
                <select
                  value={subjectId}
                  onChange={(e) => setSubjectId(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-school-border bg-white"
                >
                  {currentClass.subjects.map((sub) => (
                    <option key={sub.id} value={sub.id}>{sub.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-school-navy block mb-1">Assigned Teacher *</label>
                <select
                  value={staffId}
                  onChange={(e) => setStaffId(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-school-border bg-white"
                >
                  {staff.map((st) => (
                    <option key={st.id} value={st.id}>{st.fullName} ({st.designation})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-school-navy block mb-1">Start Time *</label>
                  <input
                    type="text"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    placeholder="08:30 AM"
                    className="w-full px-3 py-2 rounded-lg border border-school-border"
                  />
                </div>
                <div>
                  <label className="font-bold text-school-navy block mb-1">End Time *</label>
                  <input
                    type="text"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    placeholder="09:15 AM"
                    className="w-full px-3 py-2 rounded-lg border border-school-border"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-school-navy block mb-1">Classroom / Laboratory</label>
                <input
                  type="text"
                  value={room}
                  onChange={(e) => setRoom(e.target.value)}
                  placeholder="e.g. Science Lab / Room 102"
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
                  disabled={loading}
                  className="px-5 py-2 rounded-lg bg-school-navy text-white font-bold hover:bg-school-navy-light flex items-center space-x-1.5"
                >
                  {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-3.5 h-3.5 text-school-gold" />}
                  <span>Save Slot</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
