import React from "react";
import { prisma } from "@/lib/prisma";
import { Award, BookOpen, CheckCircle2 } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function StaffResultsPage() {
  const results = await prisma.examResult.findMany({
    include: {
      student: { include: { class: true } },
      examSubject: { include: { subject: true, exam: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-2xl border border-school-border shadow-sm">
        <h1 className="text-xl font-bold text-school-navy">Examination Marks & Results Entry</h1>
        <p className="text-xs text-school-muted">
          Review submitted marks, assigned letter grades, and qualitative student feedback.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-school-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 font-bold text-school-navy border-b">
              <tr>
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">Class</th>
                <th className="py-3 px-4">Examination</th>
                <th className="py-3 px-4">Subject</th>
                <th className="py-3 px-4">Marks Obtained</th>
                <th className="py-3 px-4">Grade</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-school-border text-school-text">
              {results.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-bold text-school-navy">{r.student.fullName}</td>
                  <td className="py-3 px-4">{r.student.class.name}</td>
                  <td className="py-3 px-4 text-school-muted">{r.examSubject.exam.name}</td>
                  <td className="py-3 px-4 font-semibold text-school-navy">{r.examSubject.subject.name}</td>
                  <td className="py-3 px-4 font-bold text-school-navy">{r.marksObtained} / {r.totalMarks}</td>
                  <td className="py-3 px-4">
                    <span className="font-extrabold text-xs px-2 py-0.5 rounded bg-school-navy text-school-gold">
                      Grade {r.grade}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
