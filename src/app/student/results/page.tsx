import React from "react";
import { getStudentContext } from "@/lib/student";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { FileCheck2, Award, CheckCircle2, XCircle, Printer } from "lucide-react";
import PrintButton from "@/components/ui/PrintButton";

export const dynamic = "force-dynamic";

export default async function StudentResultsPage() {
  const student = await getStudentContext();

  if (!student) {
    return (
      <div className="p-8 text-center bg-white rounded-2xl border border-school-border">
        <p className="text-sm text-school-muted">Student profile not found.</p>
      </div>
    );
  }

  // Fetch all published exam results for this student
  const results = await prisma.examResult.findMany({
    where: {
      studentId: student.id,
      status: "PUBLISHED",
    },
    include: {
      examSubject: {
        include: {
          exam: true,
          subject: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  // Calculate aggregates
  let totalMaxMarks = 0;
  let totalMarksObtained = 0;
  let hasFailedSubject = false;

  for (const r of results) {
    totalMaxMarks += r.totalMarks;
    totalMarksObtained += r.marksObtained;
    if (r.marksObtained < r.examSubject.passingMarks) {
      hasFailedSubject = true;
    }
  }

  const overallPercentage = totalMaxMarks > 0 ? Math.round((totalMarksObtained / totalMaxMarks) * 100) : 0;

  const calculateGrade = (pct: number) => {
    if (pct >= 85) return "A+";
    if (pct >= 75) return "A";
    if (pct >= 65) return "B";
    if (pct >= 55) return "C";
    if (pct >= 45) return "D";
    return "F";
  };

  const overallGrade = calculateGrade(overallPercentage);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-school-border shadow-sm">
        <div>
          <div className="flex items-center space-x-2 text-school-gold-warm font-bold text-xs uppercase tracking-wider mb-1">
            <FileCheck2 className="w-4 h-4" />
            <span>Academic Assessment</span>
          </div>
          <h1 className="text-2xl font-extrabold text-school-navy">Examination Results &amp; Report Card</h1>
          <p className="text-xs text-school-muted mt-1">
            Official terminal academic evaluation for session {student.academicSession.name}
          </p>
        </div>
        <div className="shrink-0 flex items-center space-x-3">
          <PrintButton label="Print Report Card" />
        </div>
      </div>

      {results.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-school-border shadow-sm">
          <Award className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-school-navy">No Exam Results Published Yet</h3>
          <p className="text-xs text-school-muted mt-1">
            Your teacher and examination department have not published terminal grades for this term yet.
          </p>
        </div>
      ) : (
        <div className="space-y-6 printable-document">
          {/* Printable Watermark Card Container */}
          <div className="bg-white rounded-3xl border-2 border-school-navy/15 p-6 sm:p-8 shadow-md relative overflow-hidden">
            {/* Watermark Logo Background */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
              <span className="text-[180px] font-black tracking-widest text-school-navy">LES</span>
            </div>

            {/* School Header */}
            <div className="text-center pb-6 border-b-2 border-school-navy/10 relative">
              <span className="text-[11px] font-bold text-school-gold uppercase tracking-widest block">
                Official Academic Assessment Record
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-school-navy tracking-tight mt-1">
                LAHORE ELITE SCHOOL
              </h2>
              <p className="text-xs font-semibold text-slate-600 mt-1">
                {student.campus.name} &bull; {student.campus.address}
              </p>
              <div className="inline-block mt-3 px-4 py-1 rounded-full bg-school-navy text-school-gold font-bold text-xs uppercase tracking-wider">
                Terminal Examination Report Card
              </div>
            </div>

            {/* Student Dossier Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-b border-school-border text-xs">
              <div>
                <span className="text-[10px] uppercase font-bold text-school-muted block">Student Name</span>
                <span className="font-extrabold text-school-navy text-sm">{student.fullName}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-school-muted block">Father&apos;s Name</span>
                <span className="font-bold text-school-navy">{student.fatherName}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-school-muted block">Admission / Roll No</span>
                <span className="font-mono font-extrabold text-school-navy text-sm">{student.admissionNo}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-school-muted block">Class &amp; Section</span>
                <span className="font-bold text-school-navy">{student.class.name} - {student.section.name}</span>
              </div>
            </div>

            {/* Results Table */}
            <div className="py-6 overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-school-navy text-white font-bold uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="p-3.5 rounded-l-lg">Subject</th>
                    <th className="p-3.5">Examination Term</th>
                    <th className="p-3.5 text-center">Max Marks</th>
                    <th className="p-3.5 text-center">Passing Marks</th>
                    <th className="p-3.5 text-center">Marks Obtained</th>
                    <th className="p-3.5 text-center">Percentage</th>
                    <th className="p-3.5 text-center">Grade</th>
                    <th className="p-3.5 rounded-r-lg">Teacher Remarks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-school-border">
                  {results.map((r) => {
                    const pct = Math.round((r.marksObtained / r.totalMarks) * 100);
                    const isPass = r.marksObtained >= r.examSubject.passingMarks;

                    return (
                      <tr key={r.id} className="hover:bg-slate-50">
                        <td className="p-3.5 font-bold text-school-navy">{r.examSubject.subject.name}</td>
                        <td className="p-3.5 text-school-muted">{r.examSubject.exam.name}</td>
                        <td className="p-3.5 text-center font-mono font-semibold">{r.totalMarks}</td>
                        <td className="p-3.5 text-center font-mono text-school-muted">{r.examSubject.passingMarks}</td>
                        <td className="p-3.5 text-center font-mono font-black text-school-navy text-sm">
                          {r.marksObtained}
                        </td>
                        <td className="p-3.5 text-center font-mono font-semibold">{pct}%</td>
                        <td className="p-3.5 text-center">
                          <span
                            className={`px-2.5 py-0.5 rounded font-black text-xs ${
                              isPass ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"
                            }`}
                          >
                            {r.grade}
                          </span>
                        </td>
                        <td className="p-3.5 text-school-muted text-[11px] italic">
                          {r.remarks || (isPass ? "Satisfactory performance." : "Needs improvement.")}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Performance Summary Banner */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-school-border flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-6 text-xs">
                <div>
                  <span className="text-[10px] font-bold text-school-muted uppercase block">Total Marks</span>
                  <span className="text-lg font-black text-school-navy font-mono">
                    {totalMarksObtained} / {totalMaxMarks}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-school-muted uppercase block">Aggregate</span>
                  <span className="text-lg font-black text-school-navy font-mono">{overallPercentage}%</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-school-muted uppercase block">Overall Grade</span>
                  <span className="text-lg font-black text-school-navy font-mono">{overallGrade}</span>
                </div>
              </div>

              <div>
                <span
                  className={`inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider ${
                    !hasFailedSubject && overallPercentage >= 50
                      ? "bg-emerald-600 text-white"
                      : "bg-rose-600 text-white"
                  }`}
                >
                  {!hasFailedSubject && overallPercentage >= 50 ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>PASSED / PROMOTED</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4" />
                      <span>SUPPLEMENTARY / REVIEW</span>
                    </>
                  )}
                </span>
              </div>
            </div>

            {/* Official Signatures for Printed Document */}
            <div className="pt-16 pb-4 grid grid-cols-3 gap-6 text-center text-xs border-t border-dashed border-slate-300 mt-12">
              <div>
                <div className="border-t border-slate-700 w-36 mx-auto mb-1" />
                <span className="font-bold text-school-navy">Class Teacher</span>
              </div>
              <div>
                <div className="border-t border-slate-700 w-36 mx-auto mb-1" />
                <span className="font-bold text-school-navy">Examination Controller</span>
              </div>
              <div>
                <div className="border-t border-slate-700 w-36 mx-auto mb-1" />
                <span className="font-bold text-school-navy">Principal &bull; LES</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
