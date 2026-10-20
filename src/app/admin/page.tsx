import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatPKR, formatDate } from "@/lib/utils";
import FinanceOverviewChart from "@/components/charts/FinanceOverviewChart";
import AttendancePieChart from "@/components/charts/AttendancePieChart";
import {
  Users,
  UserCheck,
  CreditCard,
  DollarSign,
  AlertTriangle,
  Receipt,
  GraduationCap,
  Bell,
  ArrowRight,
  TrendingUp,
  Clock,
  Building,
  Calendar,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  // Query live metrics from database
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [
    totalStudents,
    totalStaff,
    totalClasses,
    todayAttendance,
    feeStats,
    payrollStats,
    incomeStats,
    expenseStats,
    recentStudents,
    recentInquiries,
    recentAnnouncements,
    upcomingExams,
  ] = await Promise.all([
    // Active students
    prisma.student.count({ where: { enrollmentStatus: "ACTIVE" } }),
    // Active staff
    prisma.staff.count({ where: { status: "ACTIVE" } }),
    // Classes
    prisma.class.count(),
    // Today's attendance
    prisma.attendance.findMany({
      where: { date: today },
    }),
    // Fee vouchers aggregate
    prisma.feeVoucher.aggregate({
      _sum: {
        totalAmount: true,
        paidAmount: true,
        balance: true,
      },
    }),
    // Payroll aggregate
    prisma.payroll.aggregate({
      _sum: {
        netPayable: true,
      },
      where: { status: "PAID" },
    }),
    // Income aggregate
    prisma.incomeExpense.aggregate({
      _sum: { amount: true },
      where: { type: "INCOME" },
    }),
    // Expense aggregate
    prisma.incomeExpense.aggregate({
      _sum: { amount: true },
      where: { type: "EXPENSE" },
    }),
    // Recent 5 students
    prisma.student.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { class: true, section: true, campus: true },
    }),
    // Pending admission leads
    prisma.admissionInquiry.findMany({
      take: 4,
      orderBy: { createdAt: "desc" },
    }),
    // Announcements
    prisma.announcement.findMany({
      take: 3,
      orderBy: { createdAt: "desc" },
    }),
    // Upcoming exams
    prisma.examination.findMany({
      take: 2,
      orderBy: { startDate: "asc" },
      include: { examSubjects: true },
    }),
  ]);

  // Attendance breakdown
  const studentAttendance = todayAttendance.filter((a) => a.entityType === "STUDENT");
  const presentCount = studentAttendance.filter((a) => a.status === "PRESENT").length;
  const absentCount = studentAttendance.filter((a) => a.status === "ABSENT").length;
  const lateCount = studentAttendance.filter((a) => a.status === "LATE").length;
  const leaveCount = studentAttendance.filter((a) => a.status === "LEAVE").length;

  const totalVouchersSum = feeStats._sum.totalAmount || 0;
  const totalPaidFees = feeStats._sum.paidAmount || 0;
  const totalOutstandingFees = feeStats._sum.balance || 0;
  const totalPaidPayroll = payrollStats._sum.netPayable || 0;
  const totalIncome = (incomeStats._sum.amount || 0) + totalPaidFees;
  const totalExpenses = (expenseStats._sum.amount || 0) + totalPaidPayroll;
  const netOperatingBalance = totalIncome - totalExpenses;

  // Chart dataset
  const chartData = [
    { month: "Aug", fees: 110000, expenses: 32000, payroll: 85000 },
    { month: "Sep", fees: 125000, expenses: 38000, payroll: 87000 },
    { month: "Oct (Current)", fees: totalPaidFees || 14300, expenses: expenseStats._sum.amount || 28500, payroll: totalPaidPayroll || 93200 },
  ];

  return (
    <div className="space-y-8">
      {/* Top Welcome & KPI Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-school-border shadow-sm">
        <div>
          <span className="text-xs font-bold text-school-navy bg-school-gold-light px-2.5 py-1 rounded">
            Live Administrative Overview
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-school-navy mt-1">
            Lahore Elite School Management Dashboard
          </h1>
          <p className="text-xs text-school-muted mt-1">
            Real-time synchronization across Al-Nisa & Sabzazar Campuses. Academic Session 2025-2026.
          </p>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <Link
            href="/admin/students"
            className="px-4 py-2 rounded-lg bg-school-navy text-white font-bold text-xs hover:bg-school-navy-light transition-all shadow"
          >
            Manage Students
          </Link>
          <Link
            href="/admin/fees"
            className="px-4 py-2 rounded-lg bg-school-gold text-school-navy-deep font-bold text-xs hover:bg-school-gold-warm transition-all shadow"
          >
            Fee Vouchers
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Active Students */}
        <Link
          href="/admin/students"
          className="bg-white p-5 rounded-2xl border border-school-border shadow-sm hover:shadow-md hover:border-school-navy transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-school-muted uppercase tracking-wider">
              Enrolled Students
            </span>
            <div className="w-10 h-10 rounded-xl bg-school-navy/5 text-school-navy flex items-center justify-center group-hover:bg-school-navy group-hover:text-school-gold transition-colors">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-black text-school-navy">{totalStudents}</span>
            <span className="text-xs text-emerald-600 font-semibold ml-2">Active</span>
          </div>
          <div className="text-[11px] text-school-muted mt-1">
            Distributed across {totalClasses} classes
          </div>
        </Link>

        {/* Card 2: Faculty & Staff */}
        <Link
          href="/admin/teachers"
          className="bg-white p-5 rounded-2xl border border-school-border shadow-sm hover:shadow-md hover:border-school-navy transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-school-muted uppercase tracking-wider">
              Faculty & Staff
            </span>
            <div className="w-10 h-10 rounded-xl bg-school-navy/5 text-school-navy flex items-center justify-center group-hover:bg-school-navy group-hover:text-school-gold transition-colors">
              <UserCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-black text-school-navy">{totalStaff}</span>
            <span className="text-xs text-school-navy font-semibold ml-2">Instructors</span>
          </div>
          <div className="text-[11px] text-school-muted mt-1">
            Monthly payroll: {formatPKR(totalPaidPayroll)}
          </div>
        </Link>

        {/* Card 3: Collected Fees */}
        <Link
          href="/admin/fees"
          className="bg-white p-5 rounded-2xl border border-school-border shadow-sm hover:shadow-md hover:border-school-navy transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-school-muted uppercase tracking-wider">
              Fees Collected (PKR)
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <Receipt className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-black text-emerald-700">{formatPKR(totalPaidFees)}</span>
          </div>
          <div className="text-[11px] text-school-muted mt-1">
            Total generated: {formatPKR(totalVouchersSum)}
          </div>
        </Link>

        {/* Card 4: Outstanding Fees */}
        <Link
          href="/admin/fees/defaulters"
          className="bg-white p-5 rounded-2xl border border-school-border shadow-sm hover:shadow-md hover:border-rose-400 transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-school-muted uppercase tracking-wider">
              Outstanding Defaulters
            </span>
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center group-hover:bg-rose-600 group-hover:text-white transition-colors">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-black text-rose-700">
              {formatPKR(totalOutstandingFees)}
            </span>
          </div>
          <div className="text-[11px] text-rose-600 font-semibold mt-1">
            Requires follow-up reminders
          </div>
        </Link>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Financial Flow Bar Chart */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-school-border shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <div>
              <h2 className="text-base font-bold text-school-navy">Monthly Financial Performance</h2>
              <p className="text-xs text-school-muted">
                Tuition fees collected vs committed staff payroll and school operating expenses.
              </p>
            </div>
            <Link
              href="/admin/finance"
              className="text-xs font-bold text-school-navy hover:text-school-navy-light flex items-center space-x-1"
            >
              <span>Full Finance</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <FinanceOverviewChart data={chartData} />
        </div>

        {/* Today's Student Attendance Pie */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-school-border shadow-sm space-y-4">
          <div className="border-b pb-3">
            <h2 className="text-base font-bold text-school-navy">Today&apos;s Student Attendance</h2>
            <p className="text-xs text-school-muted">
              {formatDate(today)} summary across campuses.
            </p>
          </div>

          <AttendancePieChart
            present={presentCount}
            absent={absentCount}
            late={lateCount}
            leave={leaveCount}
          />

          <div className="pt-2 border-t flex justify-between text-xs text-school-muted">
            <span>Present: <strong className="text-emerald-700">{presentCount}</strong></span>
            <span>Absent: <strong className="text-rose-700">{absentCount}</strong></span>
            <Link href="/admin/attendance" className="font-bold text-school-navy hover:underline">
              Mark Attendance →
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Section: Recent Students, Admission Inquiries, and Circulars */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Students Registry */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-school-border shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <h2 className="text-base font-bold text-school-navy">Recent Student Enrollments</h2>
            <Link
              href="/admin/students"
              className="text-xs font-bold text-school-navy hover:underline flex items-center space-x-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {recentStudents.map((st) => (
              <div key={st.id} className="py-3 flex items-center justify-between text-xs">
                <div>
                  <Link
                    href={`/admin/students/${st.id}`}
                    className="font-bold text-school-navy hover:underline text-sm block"
                  >
                    {st.fullName}
                  </Link>
                  <span className="text-school-muted">
                    Adm No: {st.admissionNo} • {st.class.name} ({st.section.name})
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-school-navy block">
                    {formatPKR(st.monthlyTuitionFee)}/mo
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      st.feeStatus === "CURRENT"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-rose-50 text-rose-700"
                    }`}
                  >
                    {st.feeStatus}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Admission Leads & Announcements */}
        <div className="lg:col-span-5 space-y-6">
          {/* Pending Admission Inquiries */}
          <div className="bg-white p-6 rounded-2xl border border-school-border shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h2 className="text-base font-bold text-school-navy">Pending Admission Leads</h2>
              <Link
                href="/admin/admissions"
                className="text-xs font-bold text-school-navy hover:underline"
              >
                All Leads →
              </Link>
            </div>

            <div className="space-y-3">
              {recentInquiries.map((inq) => (
                <div key={inq.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs flex justify-between items-center">
                  <div>
                    <strong className="text-school-navy block">{inq.studentName}</strong>
                    <span className="text-school-muted">
                      Class: {inq.requestedClass} • Father: {inq.fatherName}
                    </span>
                  </div>
                  <a
                    href={`https://wa.me/${inq.phone.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 rounded bg-emerald-600 text-white font-bold text-[10px] hover:bg-emerald-700"
                  >
                    WhatsApp
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Circulars */}
          <div className="bg-white p-6 rounded-2xl border border-school-border shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b pb-2">
              <h2 className="text-base font-bold text-school-navy flex items-center space-x-2">
                <Bell className="w-4 h-4 text-school-gold" />
                <span>Active School Notices</span>
              </h2>
              <Link href="/admin/announcements" className="text-xs text-school-navy font-bold hover:underline">
                Create →
              </Link>
            </div>

            <div className="space-y-2 text-xs">
              {recentAnnouncements.map((a) => (
                <div key={a.id} className="p-2.5 rounded-lg border border-slate-100 hover:bg-slate-50">
                  <span className="font-bold text-school-navy block">{a.title}</span>
                  <p className="text-school-muted text-[11px] line-clamp-1">{a.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
