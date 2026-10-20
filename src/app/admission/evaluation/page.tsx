import React from "react";
import PublicHeader from "@/components/layout/PublicHeader";
import PublicFooter from "@/components/layout/PublicFooter";
import { Award, BookOpen, CheckCircle, Percent, AlertCircle } from "lucide-react";

export const metadata = {
  title: "Evaluation & Assessment Policy | Lahore Elite School",
  description:
    "Grading criteria, promotion standards, and examination structure at Lahore Elite School, Lahore.",
};

export default function EvaluationPage() {
  return (
    <>
      <PublicHeader />

      <main className="flex-1 bg-school-bg py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-school-navy bg-school-gold-light px-3 py-1 rounded-full border border-school-gold/30">
              Academic Standards
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-school-navy">
              Evaluation, Grading & Promotion Criteria
            </h1>
            <p className="text-sm sm:text-base text-school-muted">
              We employ a balanced assessment methodology that integrates continuous formative class evaluations
              with structured summative examinations.
            </p>
          </div>

          {/* Assessment Methodology Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-school-border shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-school-navy text-school-gold flex items-center justify-center font-bold">
                1
              </div>
              <h3 className="text-lg font-bold text-school-navy">Continuous Monthly Assessments</h3>
              <p className="text-xs text-school-muted leading-relaxed">
                Bi-weekly topic tests, homework reviews, classroom oral participation, and practical science/computer lab performance.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-school-border shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-school-navy text-school-gold flex items-center justify-center font-bold">
                2
              </div>
              <h3 className="text-lg font-bold text-school-navy">Mid-Term Examinations</h3>
              <p className="text-xs text-school-muted leading-relaxed">
                Formal comprehensive examinations held in November, evaluating syllabus coverage from the first half of the academic session.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-school-border shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-school-navy text-school-gold flex items-center justify-center font-bold">
                3
              </div>
              <h3 className="text-lg font-bold text-school-navy">Annual Final Examinations</h3>
              <p className="text-xs text-school-muted leading-relaxed">
                Conducted in March across all grades. Class 9 and 10 students are prepared following the official BISE Lahore Board pattern.
              </p>
            </div>
          </div>

          {/* Grading Scale Table */}
          <div className="bg-white rounded-2xl border border-school-border shadow-sm overflow-hidden">
            <div className="p-6 bg-school-navy text-white">
              <h2 className="text-lg font-bold">Standard Grade Scale & Classification</h2>
              <p className="text-xs text-school-gold">Applicable across primary, middle, and secondary grades</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 border-b font-bold text-school-navy">
                  <tr>
                    <th className="py-3.5 px-6">Percentage Range</th>
                    <th className="py-3.5 px-6">Grade</th>
                    <th className="py-3.5 px-6">Descriptor</th>
                    <th className="py-3.5 px-6">Performance Evaluation</th>
                  </tr>
                </thead>
                <tbody className="divide-y text-school-text">
                  <tr>
                    <td className="py-3.5 px-6 font-bold">85% and Above</td>
                    <td className="py-3.5 px-6 font-extrabold text-emerald-700">A+</td>
                    <td className="py-3.5 px-6 font-medium">Outstanding Distinction</td>
                    <td className="py-3.5 px-6 text-xs text-school-muted">Exceptional mastery of core concepts and critical thinking.</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-6 font-bold">75% to 84%</td>
                    <td className="py-3.5 px-6 font-extrabold text-blue-700">A</td>
                    <td className="py-3.5 px-6 font-medium">Excellent</td>
                    <td className="py-3.5 px-6 text-xs text-school-muted">High conceptual understanding with commendable problem solving.</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-6 font-bold">65% to 74%</td>
                    <td className="py-3.5 px-6 font-extrabold text-indigo-700">B</td>
                    <td className="py-3.5 px-6 font-medium">Very Good</td>
                    <td className="py-3.5 px-6 text-xs text-school-muted">Sound grasp of concepts with consistent application.</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-6 font-bold">50% to 64%</td>
                    <td className="py-3.5 px-6 font-extrabold text-amber-700">C</td>
                    <td className="py-3.5 px-6 font-medium">Good / Satisfactory</td>
                    <td className="py-3.5 px-6 text-xs text-school-muted">Meets grade requirements; periodic revision recommended.</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-6 font-bold">40% to 49%</td>
                    <td className="py-3.5 px-6 font-extrabold text-orange-700">D</td>
                    <td className="py-3.5 px-6 font-medium">Pass</td>
                    <td className="py-3.5 px-6 text-xs text-school-muted">Minimum acceptable baseline; mandatory academic mentoring.</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-6 font-bold">Below 40%</td>
                    <td className="py-3.5 px-6 font-extrabold text-rose-700">F</td>
                    <td className="py-3.5 px-6 font-medium">Fail / Needs Improvement</td>
                    <td className="py-3.5 px-6 text-xs text-school-muted">Requires parent-teacher conference and remediation plan.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Promotion & Attendance Rules */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-school-border shadow-sm space-y-3">
              <h3 className="font-bold text-school-navy text-lg flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-school-success" />
                <span>Annual Promotion Criteria</span>
              </h3>
              <p className="text-xs text-school-muted leading-relaxed">
                Promotion to the next class tier is granted based on cumulative annual performance (40% Mid-Term + 60% Final Examination).
                A student must secure a minimum aggregate of 40% in core disciplines (English, Mathematics, Urdu, and Sciences).
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-school-border shadow-sm space-y-3">
              <h3 className="font-bold text-school-navy text-lg flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-school-warning" />
                <span>Minimum Attendance Requirement</span>
              </h3>
              <p className="text-xs text-school-muted leading-relaxed">
                A minimum attendance of <strong>75%</strong> is mandatory across the academic year to qualify for appearance in final
                examinations. Attendance below 65% triggers an administrative warning and review.
              </p>
            </div>
          </div>
        </div>
      </main>

      <PublicFooter />
    </>
  );
}
