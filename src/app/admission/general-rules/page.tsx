import React from "react";
import PublicHeader from "@/components/layout/PublicHeader";
import PublicFooter from "@/components/layout/PublicFooter";
import { Shield, Clock, BookOpen, Ban, HeartHandshake, PhoneCall } from "lucide-react";

export const metadata = {
  title: "General School Rules & Policies | Lahore Elite School",
  description:
    "Discipline code, attendance regulations, leave procedures, and campus safety guidelines for students and parents at Lahore Elite School.",
};

const ruleSections = [
  {
    title: "1. Punctuality & Morning Assembly",
    icon: Clock,
    rules: [
      "School gates open at 7:30 AM and close promptly at 7:55 AM. Late comers will receive a late remark.",
      "Three late arrivals in a month will result in a formal notice sent to parents.",
      "Participation in the morning assembly, national anthem, and recitation is mandatory for all students.",
    ],
  },
  {
    title: "2. Attendance & Leave Application",
    icon: Shield,
    rules: [
      "A minimum of 75% attendance is required to appear in the annual school and board examinations.",
      "In case of illness or unforeseen absence, a written leave application signed by the parent/guardian must be submitted to the class teacher upon return.",
      "Absence exceeding 3 consecutive days requires a medical certificate.",
      "Unexplained continuous absence of 10 school days may lead to cancellation of student admission.",
    ],
  },
  {
    title: "3. Classroom Conduct & Discipline",
    icon: BookOpen,
    rules: [
      "Students must treat all faculty members, peers, and campus staff with utmost courtesy and respect.",
      "Defacing school furniture, walls, laboratory apparatus, or library books is strictly prohibited; damages must be reimbursed by parents.",
      "Bullying, teasing, or physical altercation of any kind will result in immediate suspension and disciplinary hearing.",
    ],
  },
  {
    title: "4. Prohibited Items on Campus",
    icon: Ban,
    rules: [
      "Mobile phones, smartwatches, gaming consoles, and personal electronic devices are strictly prohibited.",
      "Confiscated mobile phones will only be returned to parents at the conclusion of the academic term.",
      "Valuable jewelry, large sums of cash, and inappropriate magazines/materials are not permitted.",
    ],
  },
  {
    title: "5. Parent Communication & Campus Visits",
    icon: HeartHandshake,
    rules: [
      "Parents wishing to meet teachers must book an appointment through the administration office during designated visiting hours.",
      "Parents are not permitted to visit classrooms directly during active instructional hours.",
      "Attendance at quarterly Parent-Teacher Meetings (PTM) is compulsory to review student academic progress.",
    ],
  },
];

export default function GeneralRulesPage() {
  return (
    <>
      <PublicHeader />

      <main className="flex-1 bg-school-bg py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-school-navy bg-school-gold-light px-3 py-1 rounded-full border border-school-gold/30">
              Code of Conduct
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-school-navy">
              General Rules & Code of Ethics
            </h1>
            <p className="text-sm sm:text-base text-school-muted">
              These regulations ensure a safe, disciplined, and productive environment conducive to intellectual
              and moral growth for all Lahore Elite School students.
            </p>
          </div>

          <div className="space-y-6">
            {ruleSections.map((sec, idx) => {
              const IconComp = sec.icon;
              return (
                <div key={idx} className="bg-white rounded-2xl p-6 sm:p-7 border border-school-border shadow-sm space-y-3">
                  <div className="flex items-center space-x-3 text-school-navy">
                    <div className="p-2 rounded-lg bg-school-gold-light text-school-navy">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h2 className="text-lg font-bold">{sec.title}</h2>
                  </div>
                  <ul className="text-xs sm:text-sm text-school-muted space-y-2 pl-4 list-disc">
                    {sec.rules.map((r, rIdx) => (
                      <li key={rIdx} className="leading-relaxed">{r}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <div className="p-6 bg-school-navy text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-base">Inquiries Regarding Discipline Policy?</h3>
              <p className="text-xs text-slate-300">Contact the Campus Administration Office at Al-Nisa or Sabzazar.</p>
            </div>
            <a
              href="tel:03004279059"
              className="px-4 py-2 rounded-lg bg-school-gold text-school-navy-deep font-bold text-xs hover:bg-school-gold-warm transition-colors inline-flex items-center space-x-1.5 shrink-0"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Call Campus Office: 0300-4279059</span>
            </a>
          </div>
        </div>
      </main>

      <PublicFooter />
    </>
  );
}
