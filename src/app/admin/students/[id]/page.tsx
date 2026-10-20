import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatPKR, formatDate, getWhatsAppUrl } from "@/lib/utils";
import {
  User,
  ArrowLeft,
  CreditCard,
  Receipt,
  Clock,
  Award,
  Phone,
  MapPin,
  Calendar,
  ShieldAlert,
  MessageSquare,
  FileCheck2,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function StudentDetailPage({ params }: { params: { id: string } }) {
  const student = await prisma.student.findUnique({
    where: { id: params.id },
    include: {
      class: true,
      section: true,
      campus: true,
      academicSession: true,
      feeVouchers: {
        orderBy: { issueDate: "desc" },
        include: { payments: true },
      },
      attendances: {
        orderBy: { date: "desc" },
        take: 30,
      },
      examResults: {
        include: { examSubject: { include: { subject: true, exam: true } } },
      },
      certificates: true,
    },
  });

  if (!student) {
    notFound();
  }

  // Attendance stats
  const totalDays = student.attendances.length;
  const presentDays = student.attendances.filter((a) => a.status === "PRESENT").length;
  const attendancePercentage = totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 100;

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-school-border shadow-sm">
        <div className="flex items-center space-x-3">
          <Link
            href="/admin/students"
            className="p-2 rounded-lg border border-school-border hover:bg-slate-50 text-school-muted hover:text-school-navy"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-bold text-school-navy">{student.fullName}</h1>
              <span className="text-xs font-mono font-bold bg-school-gold-light text-school-navy px-2 py-0.5 rounded">
                {student.admissionNo}
              </span>
            </div>
            <span className="text-xs text-school-muted">
              {student.class.name} ({student.section.name}) • {student.campus.name}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href={`/admin/id-cards?studentId=${student.id}`}
            className="px-3.5 py-2 rounded-lg bg-school-navy text-white text-xs font-bold hover:bg-school-navy-light flex items-center space-x-1.5 shadow"
          >
            <CreditCard className="w-3.5 h-3.5 text-school-gold" />
            <span>Generate ID Card</span>
          </Link>

          <a
            href={getWhatsAppUrl(
              student.phone,
              `Assalam-o-Alaikum, this is an official message from Lahore Elite School regarding ${student.fullName} (Admission No: ${student.admissionNo}).`
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 flex items-center space-x-1.5"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>WhatsApp Guardian</span>
          </a>
        </div>
      </div>

      {/* Grid: Profile Card & Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Profile Overview */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-school-border shadow-sm space-y-5">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-school-navy text-school-gold font-black text-xl flex items-center justify-center">
              {student.fullName.charAt(0)}
            </div>
            <div>
              <h3 className="font-bold text-school-navy text-base">{student.fullName}</h3>
              <span className="text-xs text-school-muted block">Father: {student.fatherName}</span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded inline-block mt-1 ${
                  student.feeStatus === "CURRENT"
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-rose-50 text-rose-700"
                }`}
              >
                {student.feeStatus}
              </span>
            </div>
          </div>

          <div className="divide-y divide-slate-100 text-xs text-school-text space-y-2.5 pt-2">
            <div className="flex justify-between py-1.5">
              <span className="text-school-muted">Gender:</span>
              <span className="font-semibold">{student.gender}</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-school-muted">Date of Birth:</span>
              <span className="font-semibold">{formatDate(student.dob)}</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-school-muted">B-Form / ID:</span>
              <span className="font-mono font-semibold">{student.bFormNo || "Not Recorded"}</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-school-muted">Contact Phone:</span>
              <span className="font-semibold">{student.phone}</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-school-muted">Monthly Fee:</span>
              <span className="font-bold text-school-navy">{formatPKR(student.monthlyTuitionFee)}</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-school-muted">Fee Concession:</span>
              <span className="font-semibold">{formatPKR(student.discountAmount)}</span>
            </div>
            <div className="pt-2">
              <span className="text-school-muted block mb-1">Residential Address:</span>
              <span className="font-medium text-slate-700 leading-snug">{student.address}</span>
            </div>
          </div>

          {/* Attendance Warning if <65% */}
          {attendancePercentage < 65 && (
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-start space-x-2">
              <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                <strong>Low Attendance Warning:</strong> Student attendance is at {attendancePercentage}%, which is below
                the mandatory 65% threshold. Administrative review required.
              </span>
            </div>
          )}
        </div>

        {/* Right Tabbed History: Attendance, Fees & Results */}
        <div className="lg:col-span-8 space-y-6">
          {/* Fee Vouchers & Receipts */}
          <div className="bg-white p-6 rounded-2xl border border-school-border shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h2 className="text-base font-bold text-school-navy flex items-center space-x-2">
                <Receipt className="w-4 h-4 text-school-gold" />
                <span>Fee Vouchers & Payment History</span>
              </h2>
              <Link
                href="/admin/fees"
                className="text-xs font-bold text-school-navy hover:underline"
              >
                Fee Desk →
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 font-bold text-school-navy border-b">
                  <tr>
                    <th className="py-2.5 px-3">Voucher No</th>
                    <th className="py-2.5 px-3">Fee Month</th>
                    <th className="py-2.5 px-3">Total Payable</th>
                    <th className="py-2.5 px-3">Paid Amount</th>
                    <th className="py-2.5 px-3">Balance</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3 text-right">Receipt</th>
                  </tr>
                </thead>
                <tbody className="divide-y text-school-text">
                  {student.feeVouchers.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-4 text-center text-school-muted">
                        No fee vouchers generated yet.
                      </td>
                    </tr>
                  ) : (
                    student.feeVouchers.map((v) => (
                      <tr key={v.id} className="hover:bg-slate-50">
                        <td className="py-2.5 px-3 font-mono font-bold text-school-navy">
                          {v.voucherNo}
                        </td>
                        <td className="py-2.5 px-3">{v.feeMonth}</td>
                        <td className="py-2.5 px-3 font-bold">{formatPKR(v.totalAmount)}</td>
                        <td className="py-2.5 px-3 text-emerald-700 font-semibold">{formatPKR(v.paidAmount)}</td>
                        <td className="py-2.5 px-3 font-bold text-rose-700">{formatPKR(v.balance)}</td>
                        <td className="py-2.5 px-3">
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                              v.status === "PAID"
                                ? "bg-emerald-50 text-emerald-700"
                                : v.status === "PARTIAL"
                                ? "bg-amber-50 text-amber-700"
                                : "bg-rose-50 text-rose-700"
                            }`}
                          >
                            {v.status}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-right">
                          <Link
                            href={`/admin/fees/voucher/${v.id}`}
                            className="text-school-navy font-bold hover:underline"
                          >
                            Print Voucher
                          </Link>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Examination Results */}
          <div className="bg-white p-6 rounded-2xl border border-school-border shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h2 className="text-base font-bold text-school-navy flex items-center space-x-2">
                <FileCheck2 className="w-4 h-4 text-school-gold" />
                <span>Examination Results & Progress</span>
              </h2>
            </div>

            {student.examResults.length === 0 ? (
              <p className="text-xs text-school-muted py-2">No examination results published yet.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {student.examResults.map((r) => (
                  <div key={r.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-school-navy text-sm">
                        {r.examSubject.subject.name}
                      </span>
                      <span className="font-extrabold text-xs px-2 py-0.5 rounded bg-school-navy text-school-gold">
                        Grade {r.grade}
                      </span>
                    </div>
                    <div className="text-school-muted">
                      <span>Exam: {r.examSubject.exam.name}</span>
                    </div>
                    <div className="flex justify-between items-center pt-1 border-t text-[11px]">
                      <span>Marks: <strong>{r.marksObtained} / {r.totalMarks}</strong></span>
                      <span className="text-emerald-700 font-semibold">{r.remarks || "Satisfactory"}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
