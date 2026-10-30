import React from "react";
import Image from "next/image";
import Link from "next/link";
import PublicHeader from "@/components/layout/PublicHeader";
import PublicFooter from "@/components/layout/PublicFooter";
import { Microscope, Cpu, Award, CheckCircle2, ArrowRight, GraduationCap } from "lucide-react";

export const metadata = {
  title: "High School (Classes 9 & 10 Matric) | Lahore Elite School",
  description:
    "Matriculation science and computer science programs, board examination preparation, and state-of-the-art laboratories at Lahore Elite School.",
};

export default function HighSchoolPage() {
  return (
    <>
      <PublicHeader />

      <main className="flex-1 bg-school-bg py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-school-navy bg-school-gold-light px-3 py-1 rounded-full border border-school-gold/30">
              Senior Secondary Education
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-school-navy">
              High School (Classes 9 & 10 – Matriculation)
            </h1>
            <p className="text-sm sm:text-base text-school-muted">
              Intensive academic mentoring, fully equipped STEM labs, and proven test-series strategies for board distinction.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl p-6 sm:p-10 border border-school-border shadow-sm">
            <div className="lg:col-span-6 space-y-4">
              <h2 className="text-2xl font-bold text-school-navy">Pathway to Medical, Engineering & IT Careers</h2>
              <p className="text-sm text-school-muted leading-relaxed">
                The high school program at Lahore Elite School prepares students rigorously for the Board of Intermediate
                and Secondary Education (BISE) Lahore matriculation examinations. Under the guidance of experienced
                senior subject specialists, students gain deep conceptual mastery, hands-on lab proficiency, and
                strategic exam revision techniques.
              </p>
              <div className="space-y-2 pt-2">
                <div className="flex items-center space-x-2 text-sm text-school-navy font-semibold">
                  <Microscope className="w-4 h-4 text-emerald-600" />
                  <span>Dedicated Science Laboratories (Physics, Chemistry & Biology)</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-school-navy font-semibold">
                  <Cpu className="w-4 h-4 text-sky-600" />
                  <span>Advanced Computer Science & Digital Programming Lab</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-school-navy font-semibold">
                  <Award className="w-4 h-4 text-school-gold" />
                  <span>Comprehensive Monthly Test Series & Past Board Paper Workshops</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden border-2 border-school-border shadow-2xl bg-slate-900 group card-3d-lift">
                <Image
                  src="/images/programs/high-school.jpg"
                  alt="High School Science Laboratories"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Academic Streams */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Science Group */}
            <div className="bg-white rounded-2xl p-7 border border-school-border shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <Microscope className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-school-navy">Science Group (Biology)</h3>
              <p className="text-xs text-school-muted leading-relaxed">
                Ideal for aspiring medical doctors, healthcare professionals, biotechnologists, and life science researchers.
              </p>
              <ul className="text-xs text-school-text space-y-2 border-t pt-3">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Core: Biology, Chemistry, Physics, Mathematics</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Compulsory: English, Urdu, Islamiyat, Pakistan Studies</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Practical Apparatus Training according to BISE standard</span>
                </li>
              </ul>
            </div>

            {/* Computer Science Group */}
            <div className="bg-white rounded-2xl p-7 border border-school-border shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-school-navy">Computer Science Group</h3>
              <p className="text-xs text-school-muted leading-relaxed">
                Designed for students pursuing Software Engineering, Artificial Intelligence, Cybersecurity, and Data Sciences.
              </p>
              <ul className="text-xs text-school-text space-y-2 border-t pt-3">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-600" />
                  <span>Core: Computer Science, Physics, Chemistry, Mathematics</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-600" />
                  <span>Compulsory: English, Urdu, Islamiyat, Pakistan Studies</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-600" />
                  <span>C-Language Coding & Database Lab Practicals</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-school-navy text-white rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold">Class 9 & 10 Admissions</h3>
              <p className="text-xs text-slate-300">Merit scholarships available for high-achieving 8th grade graduates.</p>
            </div>
            <Link
              href="/admission/admission-process"
              className="px-6 py-3 rounded-lg bg-school-gold text-school-navy-deep font-bold text-sm hover:bg-school-gold-warm transition-all shrink-0 flex items-center space-x-2"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Apply for High School</span>
            </Link>
          </div>
        </div>
      </main>

      <PublicFooter />
    </>
  );
}
