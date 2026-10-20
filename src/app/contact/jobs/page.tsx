import React from "react";
import PublicHeader from "@/components/layout/PublicHeader";
import PublicFooter from "@/components/layout/PublicFooter";
import JobApplicationForm from "@/components/forms/JobApplicationForm";
import { Briefcase, CheckCircle, GraduationCap, Users } from "lucide-react";

export const metadata = {
  title: "Career Opportunities & Jobs | Lahore Elite School",
  description:
    "Join the distinguished academic faculty and administrative team at Lahore Elite School.",
};

const openVacancies = [
  {
    title: "Senior Science Teacher (Physics / Chemistry)",
    department: "Secondary School (Classes 9 & 10)",
    type: "Full-Time",
    requirements: "M.Sc. in Physics or Chemistry with minimum 3 years of matriculation teaching experience.",
  },
  {
    title: "Senior English Language Teacher",
    department: "Middle & Secondary (Classes 6 to 10)",
    type: "Full-Time",
    requirements: "M.A. English / B.S. English Linguistics with strong oral and written communication proficiency.",
  },
  {
    title: "Montessori & Early Childhood Educator",
    department: "Pre-School Section (PG, Nursery, Prep)",
    type: "Full-Time",
    requirements: "Montessori diploma or graduation with passionate early years pedagogy experience.",
  },
];

export default function JobsPage() {
  return (
    <>
      <PublicHeader />

      <main className="flex-1 bg-school-bg py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-school-navy bg-school-gold-light px-3 py-1 rounded-full border border-school-gold/30">
              Join Our Faculty
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-school-navy">
              Career Opportunities & Vacancies
            </h1>
            <p className="text-sm sm:text-base text-school-muted">
              We offer a professional, supportive academic environment, market-competitive compensation,
              and ongoing pedagogical development opportunities.
            </p>
          </div>

          {/* Open Positions List */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-school-navy">Current Openings</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {openVacancies.map((v, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-school-border shadow-sm flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-school-navy bg-school-gold-light px-2.5 py-0.5 rounded uppercase">
                      {v.type}
                    </span>
                    <h3 className="font-bold text-school-navy text-base">{v.title}</h3>
                    <p className="text-xs text-school-gold-warm font-semibold">{v.department}</p>
                    <p className="text-xs text-school-muted leading-relaxed">{v.requirements}</p>
                  </div>
                  <a
                    href="#apply"
                    className="text-xs font-bold text-school-navy hover:text-school-navy-light underline"
                  >
                    Apply for this role ↓
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Application Form */}
          <div id="apply" className="bg-white rounded-3xl p-7 sm:p-10 border border-school-border shadow-md max-w-4xl mx-auto space-y-6">
            <div className="border-b pb-4">
              <h2 className="text-2xl font-bold text-school-navy">Submit Your Job Application</h2>
              <p className="text-xs text-school-muted">
                Complete the form below. Your application will be reviewed directly by our Principal and HR department.
              </p>
            </div>

            <JobApplicationForm />
          </div>
        </div>
      </main>

      <PublicFooter />
    </>
  );
}
