import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatDate, formatPKR } from "@/lib/utils";
import {
  Calendar,
  Clock,
  Layers,
  Receipt,
  BookOpen,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Bell,
  Heart,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function StaffDashboardPage() {
  // Query first teacher or current session
  const staff = await prisma.staff.findFirst({
    include: {
      campus: true,
      timetables: {
        include: { class: true, section: true, subject: true },
        orderBy: { startTime: "asc" },
      },
      payrolls: {
        orderBy: { createdAt: "desc" },
        take: 3,
      },
    },
  });

  const announcements = await prisma.announcement.findMany({
    take: 3,
    orderBy: { createdAt: "desc" },
  });

  if (!staff) {
    return <div className="p-8 text-center text-xs text-school-muted">No staff profile found.</div>;
  }

  return (
    <div className="space-y-6">
      {/* Welcome Card */}
      <div className="bg-gradient-to-r from-school-navy-deep via-school-navy to-school-navy-light text-white p-6 sm:p-8 rounded-3xl shadow-lg border-2 border-school-gold/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-1.5 text-[10px] font-bold text-school-gold uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full border border-white/20">
            <Sparkles className="w-3 h-3 text-school-gold" />
            <span>Faculty Workspace</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Welcome, {staff.fullName}
          </h1>
          <p className="text-xs text-slate-300">
            {staff.designation} • {staff.department} • {staff.campus.name} (ID: {staff.employeeId})
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <Link
            href="/staff/attendance"
            className="px-4 py-2 rounded-lg bg-school-gold text-school-navy-deep font-bold text-xs hover:bg-school-gold-warm transition-all shadow"
          >
            Mark Attendance
          </Link>
          <Link
            href="/staff/assignments"
            className="px-4 py-2 rounded-lg bg-white/10 text-white font-semibold text-xs border border-white/20 hover:bg-white/20 transition-all"
          >
            Post Homework
          </Link>
        </div>
      </div>

      {/* Grid: Timetable & Payroll Quick Glance */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Assigned Teaching Timetable */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-school-border shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <h2 className="text-base font-bold text-school-navy flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-school-gold" />
              <span>Assigned Teaching Schedule</span>
            </h2>
            <Link href="/staff/timetable" className="text-xs font-bold text-school-navy hover:underline">
              Full Schedule →
            </Link>
          </div>

          <div className="space-y-3">
            {staff.timetables.length === 0 ? (
              <p className="text-xs text-school-muted py-4">No active timetable slots assigned.</p>
            ) : (
              staff.timetables.map((slot) => (
                <div key={slot.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-center justify-between">
                  <div>
                    <strong className="text-school-navy text-sm block">{slot.subject.name}</strong>
                    <span className="text-school-muted text-[11px]">
                      {slot.class.name} ({slot.section.name}) • Room: {slot.room || "Lab"}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-school-navy block">{slot.dayOfWeek}</span>
                    <span className="text-[10px] text-school-gold-warm font-semibold">
                      {slot.startTime} – {slot.endTime}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right: Personal Salary Records & Notices */}
        <div className="lg:col-span-5 space-y-6">
          {/* Salary Records */}
          <div className="bg-white p-6 rounded-2xl border border-school-border shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h2 className="text-base font-bold text-school-navy flex items-center space-x-2">
                <Receipt className="w-4 h-4 text-school-gold" />
                <span>My Salary Records</span>
              </h2>
              <Link href="/staff/salary" className="text-xs font-bold text-school-navy hover:underline">
                View Slips →
              </Link>
            </div>

            <div className="space-y-2.5 text-xs">
              {staff.payrolls.map((p) => (
                <div key={p.id} className="p-3 rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-school-navy block">
                      {p.payrollMonth} {p.payrollYear}
                    </span>
                    <span className="text-[10px] text-emerald-700 font-bold uppercase">{p.status}</span>
                  </div>
                  <div className="text-right">
                    <strong className="text-school-navy text-sm block">{formatPKR(p.netPayable)}</strong>
                    <Link
                      href={`/admin/payroll/slip/${p.id}`}
                      className="text-[10px] text-school-navy font-bold hover:underline"
                    >
                      Print Slip
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Announcements */}
          <div className="bg-white p-6 rounded-2xl border border-school-border shadow-sm space-y-3">
            <h2 className="text-base font-bold text-school-navy flex items-center space-x-2 border-b pb-2">
              <Bell className="w-4 h-4 text-school-gold" />
              <span>Campus Notices</span>
            </h2>

            <div className="space-y-2 text-xs">
              {announcements.map((a) => (
                <div key={a.id} className="p-2.5 rounded-lg border border-slate-100">
                  <span className="font-bold text-school-navy block">{a.title}</span>
                  <p className="text-[11px] text-school-muted line-clamp-1">{a.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
