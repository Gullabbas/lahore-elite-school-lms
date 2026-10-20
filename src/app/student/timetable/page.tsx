import React from "react";
import { getStudentContext } from "@/lib/student";
import { prisma } from "@/lib/prisma";
import { Calendar, Clock, MapPin, User, BookOpen } from "lucide-react";
import PrintButton from "@/components/ui/PrintButton";

export const dynamic = "force-dynamic";

export default async function StudentTimetablePage() {
  const student = await getStudentContext();

  if (!student) {
    return (
      <div className="p-8 text-center bg-white rounded-2xl border border-school-border">
        <p className="text-sm text-school-muted">Student profile not found.</p>
      </div>
    );
  }

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  // Fetch all timetable slots for this student's class and section
  const timetables = await prisma.timetable.findMany({
    where: {
      classId: student.classId,
      sectionId: student.sectionId,
    },
    include: {
      subject: true,
      staff: true,
    },
    orderBy: { startTime: "asc" },
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-school-border shadow-sm">
        <div>
          <div className="flex items-center space-x-2 text-school-gold-warm font-bold text-xs uppercase tracking-wider mb-1">
            <Calendar className="w-4 h-4" />
            <span>Class Timetable</span>
          </div>
          <h1 className="text-2xl font-extrabold text-school-navy">Weekly Academic Schedule</h1>
          <p className="text-xs text-school-muted mt-1">
            {student.class.name} &bull; Section {student.section.name} &bull; {student.campus.name}
          </p>
        </div>
        <div className="shrink-0 flex items-center space-x-3">
          <PrintButton label="Print Timetable" />
        </div>
      </div>

      {/* Printable Schedule View */}
      <div className="printable-document space-y-6">
        {/* Printable Header only shown when printing */}
        <div className="hidden print:block text-center border-b pb-4 mb-4">
          <h2 className="text-lg font-black text-school-navy uppercase">Lahore Elite School</h2>
          <p className="text-xs font-semibold text-slate-700">
            Official Class Timetable &bull; {student.class.name} ({student.section.name}) &bull; {student.campus.name}
          </p>
          <p className="text-[10px] text-slate-500">Student: {student.fullName} (Roll: {student.admissionNo})</p>
        </div>

        {daysOfWeek.map((day) => {
          const daySlots = timetables.filter((t) => t.dayOfWeek.toLowerCase() === day.toLowerCase());

          return (
            <div key={day} className="bg-white rounded-2xl border border-school-border overflow-hidden shadow-sm">
              <div className="bg-school-navy px-5 py-3 text-white flex items-center justify-between">
                <span className="font-extrabold text-sm text-school-gold">{day}</span>
                <span className="text-xs text-slate-300 font-mono">
                  {daySlots.length} {daySlots.length === 1 ? "Period" : "Periods"}
                </span>
              </div>

              {daySlots.length === 0 ? (
                <div className="p-4 text-xs text-school-muted italic text-center">
                  No classes scheduled for {day}.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-4">
                  {daySlots.map((slot, idx) => (
                    <div
                      key={slot.id}
                      className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-50 transition-colors space-y-1.5"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-school-navy text-xs">{slot.subject.name}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white border border-slate-200 text-school-navy font-bold">
                          Period {idx + 1}
                        </span>
                      </div>
                      <div className="text-[11px] text-school-muted flex items-center space-x-1">
                        <User className="w-3 h-3 text-school-gold-warm" />
                        <span className="truncate">{slot.staff.fullName}</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] font-mono text-slate-600 pt-1 border-t border-slate-200">
                        <span className="flex items-center space-x-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span>{slot.startTime} - {slot.endTime}</span>
                        </span>
                        {slot.room && (
                          <span className="text-[10px] font-semibold text-slate-500">
                            Rm: {slot.room}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
