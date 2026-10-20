import React from "react";
import Link from "next/link";
import { getStudentContext } from "@/lib/student";
import { prisma } from "@/lib/prisma";
import { formatDate, formatPKR } from "@/lib/utils";
import {
  Calendar,
  Clock,
  BookOpen,
  Award,
  Receipt,
  FileCheck2,
  AlertTriangle,
  CheckCircle2,
  Layers,
  ArrowRight,
  Sparkles,
  Bell,
  MapPin,
  User,
  GraduationCap,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function StudentDashboardPage() {
  const student = await getStudentContext();

  if (!student) {
    return (
      <div className="p-8 text-center bg-white rounded-2xl border border-school-border">
        <p className="text-sm text-school-muted">No student record found. Please log in or seed the database.</p>
      </div>
    );
  }

  // 1. Fetch attendance records for this student
  const attendances = await prisma.attendance.findMany({
    where: { studentId: student.id },
    orderBy: { date: "desc" },
    take: 30,
  });

  const totalDays = attendances.length;
  const presentDays = attendances.filter((a) => a.status === "PRESENT" || a.status === "LATE").length;
  const absentDays = attendances.filter((a) => a.status === "ABSENT").length;
  const attendanceRate = totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 95;

  // 2. Fetch Latest Fee Voucher
  const latestVoucher = await prisma.feeVoucher.findFirst({
    where: { studentId: student.id },
    orderBy: { issueDate: "desc" },
  });

  // 3. Fetch Timetable for student's class and section
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const currentDay = daysOfWeek[new Date().getDay()];
  const displayDay = currentDay === "Sunday" ? "Monday" : currentDay;

  const todayClasses = await prisma.timetable.findMany({
    where: {
      classId: student.classId,
      sectionId: student.sectionId,
      dayOfWeek: displayDay,
    },
    include: {
      subject: true,
      staff: true,
    },
    orderBy: { startTime: "asc" },
  });

  // 4. Fetch Active Homework Assignments
  const assignments = await prisma.homeworkAssignment.findMany({
    where: {
      classId: student.classId,
      sectionId: student.sectionId,
    },
    include: {
      subject: true,
      staff: true,
    },
    orderBy: { dueDate: "asc" },
    take: 4,
  });

  // 5. Fetch Recent Exam Results
  const results = await prisma.examResult.findMany({
    where: { studentId: student.id },
    include: {
      examSubject: {
        include: {
          exam: true,
          subject: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
    take: 4,
  });

  // 6. Announcements for Students or All
  const announcements = await prisma.announcement.findMany({
    where: {
      targetRole: { in: ["ALL", "STUDENTS"] },
      isPublished: true,
    },
    orderBy: { publishDate: "desc" },
    take: 3,
  });

  return (
    <div className="space-y-6">
      {/* Student Welcome Banner */}
      <div className="bg-gradient-to-r from-school-navy-deep via-school-navy to-school-navy-light text-white p-6 sm:p-8 rounded-3xl shadow-xl border-2 border-school-gold/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-1.5 text-[10px] font-bold text-school-gold uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-school-gold" />
            <span>Official Student Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Welcome back, {student.fullName}!
          </h1>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-300">
            <span>Admission No: <strong className="text-white font-mono">{student.admissionNo}</strong></span>
            <span>&bull;</span>
            <span>Class: <strong className="text-white">{student.class.name} ({student.section.name})</strong></span>
            <span>&bull;</span>
            <span>Campus: <strong className="text-white">{student.campus.name}</strong></span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <Link
            href="/student/timetable"
            className="px-4 py-2.5 rounded-xl bg-school-gold text-school-navy-deep font-bold text-xs hover:bg-school-gold-warm transition-all shadow-md"
          >
            Class Timetable
          </Link>
          <Link
            href="/student/results"
            className="px-4 py-2.5 rounded-xl bg-white/10 text-white font-semibold text-xs border border-white/20 hover:bg-white/20 transition-all"
          >
            Exam Results
          </Link>
        </div>
      </div>

      {/* Low Attendance Alert if < 65% */}
      {attendanceRate < 65 && (
        <div className="p-4 bg-amber-50 border-l-4 border-amber-500 rounded-xl flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
            <div>
              <p className="text-xs font-bold text-amber-900">Attendance Warning Notice</p>
              <p className="text-[11px] text-amber-700">
                Your current attendance is {attendanceRate}%, which is below the mandatory 65% threshold required to appear in final board examinations.
              </p>
            </div>
          </div>
          <Link
            href="/student/attendance"
            className="text-xs font-bold text-amber-800 hover:text-amber-950 underline shrink-0 ml-4"
          >
            View Details
          </Link>
        </div>
      )}

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Attendance */}
        <div className="bg-white p-5 rounded-2xl border border-school-border shadow-sm">
          <div className="flex items-center justify-between text-school-muted mb-2">
            <span className="text-xs font-semibold">Attendance Rate</span>
            <Clock className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-extrabold text-school-navy">{attendanceRate}%</span>
            <span className="text-[11px] text-school-muted font-medium">({presentDays}/{totalDays || 1} days)</span>
          </div>
          <div className="mt-3 w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div
              className={`h-full rounded-full ${
                attendanceRate >= 85 ? "bg-emerald-500" : attendanceRate >= 65 ? "bg-amber-500" : "bg-rose-500"
              }`}
              style={{ width: `${attendanceRate}%` }}
            />
          </div>
        </div>

        {/* Current Fee Voucher */}
        <div className="bg-white p-5 rounded-2xl border border-school-border shadow-sm">
          <div className="flex items-center justify-between text-school-muted mb-2">
            <span className="text-xs font-semibold">Fee Status</span>
            <Receipt className="w-4 h-4 text-school-gold-warm" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-extrabold text-school-navy">
              {latestVoucher ? formatPKR(latestVoucher.totalAmount) : formatPKR(student.monthlyTuitionFee)}
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                latestVoucher?.status === "PAID"
                  ? "bg-emerald-100 text-emerald-800"
                  : "bg-rose-100 text-rose-800"
              }`}
            >
              {latestVoucher?.status || "CURRENT"}
            </span>
            <Link href="/student/fees" className="text-[11px] font-bold text-school-navy hover:underline">
              Vouchers &rarr;
            </Link>
          </div>
        </div>

        {/* Active Homework */}
        <div className="bg-white p-5 rounded-2xl border border-school-border shadow-sm">
          <div className="flex items-center justify-between text-school-muted mb-2">
            <span className="text-xs font-semibold">Active Tasks</span>
            <Layers className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-extrabold text-school-navy">{assignments.length}</span>
            <span className="text-[11px] text-school-muted font-medium">Pending Tasks</span>
          </div>
          <div className="mt-2 text-right">
            <Link href="/student/assignments" className="text-[11px] font-bold text-school-navy hover:underline">
              View Tasks &rarr;
            </Link>
          </div>
        </div>

        {/* Exam Results Summary */}
        <div className="bg-white p-5 rounded-2xl border border-school-border shadow-sm">
          <div className="flex items-center justify-between text-school-muted mb-2">
            <span className="text-xs font-semibold">Published Results</span>
            <Award className="w-4 h-4 text-purple-600" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-extrabold text-school-navy">{results.length}</span>
            <span className="text-[11px] text-school-muted font-medium">Subjects Graded</span>
          </div>
          <div className="mt-2 text-right">
            <Link href="/student/results" className="text-[11px] font-bold text-purple-700 hover:underline">
              View Report Card &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* Main Grid: Today's Schedule & Homework */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Today's Schedule (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-2xl border border-school-border p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-school-border">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-school-gold-warm" />
                <h2 className="text-sm font-extrabold text-school-navy">
                  Schedule for Today ({displayDay})
                </h2>
              </div>
              <Link href="/student/timetable" className="text-xs font-bold text-school-gold-warm hover:underline">
                Full Week
              </Link>
            </div>

            {todayClasses.length === 0 ? (
              <div className="p-8 text-center text-xs text-school-muted bg-slate-50 rounded-xl">
                No classes scheduled for today or it is a weekend. Check the full weekly timetable.
              </div>
            ) : (
              <div className="space-y-3">
                {todayClasses.map((item, idx) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-xl border border-school-border hover:border-school-gold transition-colors flex items-center justify-between bg-slate-50/50"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-school-navy text-school-gold font-extrabold text-xs flex items-center justify-center shrink-0">
                        {idx + 1}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-school-navy">{item.subject.name}</p>
                        <p className="text-[11px] text-school-muted">
                          Teacher: {item.staff.fullName} {item.room ? `• Room: ${item.room}` : ""}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-mono font-bold text-school-navy bg-white px-2 py-1 rounded border border-school-border">
                        {item.startTime} - {item.endTime}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Exam Results */}
          <div className="bg-white rounded-2xl border border-school-border p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-school-border">
              <div className="flex items-center space-x-2">
                <Award className="w-4 h-4 text-purple-600" />
                <h2 className="text-sm font-extrabold text-school-navy">Recent Exam Results</h2>
              </div>
              <Link href="/student/results" className="text-xs font-bold text-purple-700 hover:underline">
                Complete Report
              </Link>
            </div>

            {results.length === 0 ? (
              <div className="p-6 text-center text-xs text-school-muted bg-slate-50 rounded-xl">
                No examination results published yet for this term.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {results.map((r) => {
                  const pct = Math.round((r.marksObtained / r.totalMarks) * 100);
                  return (
                    <div key={r.id} className="p-3.5 rounded-xl border border-school-border bg-slate-50 flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold text-school-navy">{r.examSubject.subject.name}</p>
                        <p className="text-[10px] text-school-muted">{r.examSubject.exam.name}</p>
                        <span className="text-[11px] font-mono font-semibold text-slate-700 mt-1 block">
                          {r.marksObtained} / {r.totalMarks} ({pct}%)
                        </span>
                      </div>
                      <div className="text-center">
                        <span className="inline-block px-2.5 py-1 rounded-lg text-xs font-black bg-purple-100 text-purple-800">
                          {r.grade}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Homework & Announcements (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Active Homework */}
          <div className="bg-white rounded-2xl border border-school-border p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-school-border">
              <div className="flex items-center space-x-2">
                <Layers className="w-4 h-4 text-indigo-600" />
                <h2 className="text-sm font-extrabold text-school-navy">Homework &amp; Tasks</h2>
              </div>
              <Link href="/student/assignments" className="text-xs font-bold text-indigo-600 hover:underline">
                All
              </Link>
            </div>

            {assignments.length === 0 ? (
              <div className="p-6 text-center text-xs text-school-muted bg-slate-50 rounded-xl">
                No pending homework assignments at this time.
              </div>
            ) : (
              <div className="space-y-3">
                {assignments.map((task) => (
                  <div key={task.id} className="p-3.5 rounded-xl border border-school-border bg-white space-y-1.5 hover:border-indigo-300 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700">
                        {task.subject.name}
                      </span>
                      <span className="text-[10px] text-rose-600 font-semibold font-mono">
                        Due: {formatDate(task.dueDate)}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-school-navy">{task.title}</p>
                    <p className="text-[11px] text-school-muted line-clamp-2">{task.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* School Announcements */}
          <div className="bg-white rounded-2xl border border-school-border p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-school-border">
              <div className="flex items-center space-x-2">
                <Bell className="w-4 h-4 text-school-gold-warm" />
                <h2 className="text-sm font-extrabold text-school-navy">School Notices</h2>
              </div>
            </div>

            {announcements.length === 0 ? (
              <div className="p-6 text-center text-xs text-school-muted bg-slate-50 rounded-xl">
                No active announcements for students.
              </div>
            ) : (
              <div className="space-y-3">
                {announcements.map((note) => (
                  <div key={note.id} className="p-3.5 rounded-xl border-l-4 border-school-navy bg-slate-50 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-school-navy">{note.title}</p>
                      <span className="text-[10px] text-school-muted font-mono">{formatDate(note.publishDate)}</span>
                    </div>
                    <p className="text-[11px] text-school-muted">{note.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Guardian Profile Info */}
          <div className="bg-slate-50 rounded-2xl border border-school-border p-5 space-y-2">
            <h3 className="text-xs font-bold text-school-navy flex items-center space-x-1.5">
              <User className="w-3.5 h-3.5 text-school-gold-warm" />
              <span>Registered Guardian Info</span>
            </h3>
            <div className="text-xs text-school-muted space-y-1">
              <p>Father / Guardian: <strong className="text-school-navy font-semibold">{student.fatherName}</strong></p>
              <p>Registered Phone: <strong className="text-school-navy font-semibold">{student.phone}</strong></p>
              <p>Address: <span className="text-school-navy">{student.address}</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
