import React from "react";
import { prisma } from "@/lib/prisma";
import { Clock, Calendar } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function StaffTimetablePage() {
  const staff = await prisma.staff.findFirst({
    include: {
      timetables: {
        include: { class: true, section: true, subject: true },
        orderBy: { startTime: "asc" },
      },
    },
  });

  const slots = staff?.timetables || [];
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-2xl border border-school-border shadow-sm">
        <h1 className="text-xl font-bold text-school-navy">My Teaching Schedule</h1>
        <p className="text-xs text-school-muted">
          Your personal assigned periods, subjects, and classroom venues across the week.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {days.map((day) => {
          const daySlots = slots.filter((s) => s.dayOfWeek === day);
          return (
            <div key={day} className="bg-white rounded-2xl border border-school-border shadow-sm overflow-hidden flex flex-col">
              <div className="bg-school-navy text-white p-3.5 flex items-center justify-between">
                <span className="font-bold text-xs uppercase tracking-wider">{day}</span>
                <span className="text-[10px] text-school-gold font-semibold">{daySlots.length} Slots</span>
              </div>

              <div className="p-4 space-y-3 flex-1">
                {daySlots.length === 0 ? (
                  <p className="text-[11px] text-school-muted py-6 text-center italic">No classes scheduled.</p>
                ) : (
                  daySlots.map((slot) => (
                    <div key={slot.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <strong className="text-school-navy text-sm">{slot.subject.name}</strong>
                        <span className="text-[10px] text-school-muted flex items-center space-x-1">
                          <Clock className="w-3 h-3 text-school-gold" />
                          <span>{slot.startTime} – {slot.endTime}</span>
                        </span>
                      </div>
                      <div className="flex justify-between text-[11px] text-school-muted pt-1">
                        <span>Class: <strong>{slot.class.name} ({slot.section.name})</strong></span>
                        <span className="bg-white px-2 py-0.5 rounded border text-[10px] font-semibold">{slot.room || "Room 101"}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
