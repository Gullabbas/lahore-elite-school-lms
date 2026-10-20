import React from "react";
import { getStudentContext } from "@/lib/student";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { BookOpen, Calendar, Clock, MapPin, AlertCircle, FileText } from "lucide-react";
import PrintButton from "@/components/ui/PrintButton";

export const dynamic = "force-dynamic";

export default async function StudentExaminationsPage() {
  const student = await getStudentContext();

  if (!student) {
    return (
      <div className="p-8 text-center bg-white rounded-2xl border border-school-border">
        <p className="text-sm text-school-muted">Student profile not found.</p>
      </div>
    );
  }

  // Fetch published examinations for student's class
  const examSubjects = await prisma.examSubject.findMany({
    where: {
      classId: student.classId,
      exam: {
        isPublished: true,
      },
    },
    include: {
      exam: true,
      subject: true,
    },
    orderBy: { examDate: "asc" },
  });

  // Group by Exam
  const examsMap: Record<string, { exam: any; subjects: typeof examSubjects }> = {};
  for (const es of examSubjects) {
    if (!examsMap[es.examId]) {
      examsMap[es.examId] = { exam: es.exam, subjects: [] };
    }
    examsMap[es.examId].subjects.push(es);
  }

  const examGroups = Object.values(examsMap);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-school-border shadow-sm">
        <div>
          <div className="flex items-center space-x-2 text-school-gold-warm font-bold text-xs uppercase tracking-wider mb-1">
            <BookOpen className="w-4 h-4" />
            <span>Examination Schedules</span>
          </div>
          <h1 className="text-2xl font-extrabold text-school-navy">Official Exam Date Sheets</h1>
          <p className="text-xs text-school-muted mt-1">
            {student.class.name} &bull; Section {student.section.name} &bull; {student.campus.name}
          </p>
        </div>
        <div className="shrink-0 flex items-center space-x-3">
          <PrintButton label="Print Date Sheet" />
        </div>
      </div>

      {/* Rules Notice */}
      <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-1 text-xs">
        <div className="flex items-center space-x-2 text-school-navy font-bold">
          <AlertCircle className="w-4 h-4 text-school-gold-warm shrink-0" />
          <span>General Examination Instructions:</span>
        </div>
        <ul className="list-disc list-inside text-school-muted space-y-0.5 pl-2 text-[11px]">
          <li>Students must arrive in proper school uniform at least 15 minutes before the exam commences.</li>
          <li>Possession of Lahore Elite School Student ID Card is mandatory in the examination hall.</li>
          <li>Mobile phones, smartwatches, and unauthorized notes are strictly prohibited.</li>
        </ul>
      </div>

      {examGroups.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-school-border shadow-sm">
          <FileText className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-school-navy">No Published Date Sheets</h3>
          <p className="text-xs text-school-muted mt-1">
            Date sheets for upcoming examinations will appear here once officially published by the administration.
          </p>
        </div>
      ) : (
        <div className="space-y-6 printable-document">
          {examGroups.map(({ exam, subjects }) => (
            <div key={exam.id} className="bg-white rounded-2xl border border-school-border overflow-hidden shadow-sm">
              <div className="bg-school-navy px-6 py-4 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-base font-extrabold text-white">{exam.name}</h3>
                  <p className="text-xs text-school-gold">
                    Term: {exam.term} &bull; {formatDate(exam.startDate)} to {formatDate(exam.endDate)}
                  </p>
                </div>
                <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-white/10 text-slate-200 border border-white/20 self-start sm:self-auto">
                  {subjects.length} Papers Scheduled
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-school-navy font-bold uppercase text-[10px] tracking-wider border-b border-school-border">
                    <tr>
                      <th className="p-3.5">Date &amp; Day</th>
                      <th className="p-3.5">Subject</th>
                      <th className="p-3.5">Timings</th>
                      <th className="p-3.5">Total Marks</th>
                      <th className="p-3.5">Passing Marks</th>
                      <th className="p-3.5">Room</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-school-border">
                    {subjects.map((sub) => {
                      const dayName = new Date(sub.examDate).toLocaleDateString("en-US", { weekday: "long" });

                      return (
                        <tr key={sub.id} className="hover:bg-slate-50">
                          <td className="p-3.5 font-semibold text-school-navy">
                            <span className="font-mono block">{formatDate(sub.examDate)}</span>
                            <span className="text-[10px] text-school-muted">{dayName}</span>
                          </td>
                          <td className="p-3.5 font-bold text-school-navy">{sub.subject.name}</td>
                          <td className="p-3.5 font-mono text-slate-700">
                            {sub.startTime} - {sub.endTime}
                          </td>
                          <td className="p-3.5 font-mono font-bold text-school-navy">{sub.totalMarks}</td>
                          <td className="p-3.5 font-mono text-school-muted">{sub.passingMarks}</td>
                          <td className="p-3.5 font-medium text-slate-600">{sub.roomNo || "Exam Hall"}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
