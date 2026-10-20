import React from "react";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import PrintButton from "@/components/ui/PrintButton";
import { BookOpen, Calendar, Clock, MapPin, CheckCircle2 } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDateSheetsPage() {
  const examinations = await prisma.examination.findMany({
    include: {
      examSubjects: {
        include: { class: true, subject: true },
        orderBy: { examDate: "asc" },
      },
      academicSession: true,
    },
    orderBy: { startDate: "asc" },
  });

  const activeExam = examinations[0];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-school-border shadow-sm no-print">
        <div>
          <span className="text-xs font-bold text-school-navy bg-school-gold-light px-2.5 py-1 rounded">
            Academic Schedule
          </span>
          <h1 className="text-xl font-bold text-school-navy mt-1">Examination Date Sheets</h1>
          <p className="text-xs text-school-muted">
            Manage comprehensive exam timetables, room allotments, and print official student date sheets.
          </p>
        </div>

        <PrintButton label="Print Official Date Sheet (A4)" />
      </div>

      {/* Printable Date Sheet Container */}
      {activeExam ? (
        <div className="printable-document max-w-4xl mx-auto bg-white p-8 sm:p-10 rounded-2xl border-2 border-school-navy shadow-lg relative overflow-hidden">
          {/* Watermark */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
            <div className="relative w-80 h-80">
              <Image src="/images/brand/logo.png" alt="Watermark" fill className="object-contain" />
            </div>
          </div>

          {/* Header */}
          <div className="flex items-center justify-between border-b-2 border-school-navy pb-4 mb-6">
            <div className="flex items-center space-x-3">
              <div className="relative w-14 h-14 rounded-full overflow-hidden border border-school-gold bg-white p-0.5 shrink-0">
                <Image src="/images/brand/logo.png" alt="Logo" fill className="object-contain" />
              </div>
              <div>
                <h2 className="text-lg font-black text-school-navy uppercase tracking-tight">
                  Lahore Elite School
                </h2>
                <span className="text-xs text-school-muted block">
                  Al-Nisa & Sabzazar Campuses, Multan Road, Lahore • Tel: 0300-4279059
                </span>
                <span className="text-xs font-bold text-school-navy block">
                  Office of the Controller of Examinations
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="px-3 py-1 rounded bg-school-navy text-white text-xs font-bold uppercase tracking-wider block">
                OFFICIAL DATE SHEET
              </span>
              <span className="text-xs font-bold text-school-navy block mt-1">
                {activeExam.name} ({activeExam.academicSession.name})
              </span>
            </div>
          </div>

          {/* Exam Summary Bar */}
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs flex justify-between items-center mb-6">
            <span>Examination Period: <strong>{formatDate(activeExam.startDate)} – {formatDate(activeExam.endDate)}</strong></span>
            <span className="text-emerald-700 font-bold">Status: Published to Portals</span>
          </div>

          {/* Schedule Table */}
          <div className="border border-slate-200 rounded-xl overflow-hidden mb-6">
            <table className="w-full text-left text-xs">
              <thead className="bg-school-navy text-white font-bold">
                <tr>
                  <th className="py-2.5 px-4">Exam Date</th>
                  <th className="py-2.5 px-4">Class</th>
                  <th className="py-2.5 px-4">Subject</th>
                  <th className="py-2.5 px-4">Exam Timing</th>
                  <th className="py-2.5 px-4">Total Marks</th>
                  <th className="py-2.5 px-4 text-right">Hall / Room</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                {activeExam.examSubjects.map((sub) => (
                  <tr key={sub.id} className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-bold text-school-navy">{formatDate(sub.examDate)}</td>
                    <td className="py-3 px-4">{sub.class.name}</td>
                    <td className="py-3 px-4 font-bold text-school-navy">{sub.subject.name}</td>
                    <td className="py-3 px-4 font-medium text-slate-700">{sub.startTime} – {sub.endTime}</td>
                    <td className="py-3 px-4 font-bold">{sub.totalMarks} Marks</td>
                    <td className="py-3 px-4 text-right font-semibold text-slate-700">{sub.roomNo || "Main Hall"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Guidelines */}
          <div className="text-[11px] text-slate-600 space-y-1 mb-8 leading-relaxed">
            <strong className="text-school-navy block">Examination Code & Instructions:</strong>
            <p>1. Students must arrive at the examination hall at least 15 minutes before the scheduled time.</p>
            <p>2. Students must bring their official School ID Card and stationery pouch (pens, pencils, rulers).</p>
            <p>3. Mobile phones, programmable calculators, or unfair means materials are strictly forbidden.</p>
          </div>

          {/* Signatures */}
          <div className="pt-8 border-t border-slate-300 grid grid-cols-2 text-center text-xs text-slate-700">
            <div className="border-t border-slate-400 mx-6 pt-1">
              <span className="font-bold">Controller of Examinations</span>
            </div>
            <div className="border-t border-slate-400 mx-6 pt-1">
              <span className="font-bold">Principal Signature & Stamp</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-2xl border text-center text-xs text-school-muted">
          No examination schedules created yet.
        </div>
      )}
    </div>
  );
}
