import React from "react";
import Image from "next/image";
import Link from "next/link";
import PublicHeader from "@/components/layout/PublicHeader";
import PublicFooter from "@/components/layout/PublicFooter";
import { BookOpen, Laptop, Microscope, Award, ArrowRight, GraduationCap } from "lucide-react";

export const metadata = {
  title: "Primary & Middle School (Classes 1 - 8) | Lahore Elite School",
  description:
    "Comprehensive primary and middle school education covering STEM, English language, computer literacy, and character development at Lahore Elite School.",
};

export default function PrimaryMiddlePage() {
  return (
    <>
      <PublicHeader />

      <main className="flex-1 bg-school-bg py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-school-navy bg-school-gold-light px-3 py-1 rounded-full border border-school-gold/30">
              Foundational & Intermediate Grades
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-school-navy">
              Primary & Middle School (Classes 1 – 8)
            </h1>
            <p className="text-sm sm:text-base text-school-muted">
              Cultivating inquisitive intellects, bilingual fluency, mathematical competence, and strong ethical character.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl p-6 sm:p-10 border border-school-border shadow-sm">
            <div className="lg:col-span-6 space-y-4">
              <h2 className="text-2xl font-bold text-school-navy">A Rigorous, Inquiry-Driven Syllabus</h2>
              <p className="text-sm text-school-muted leading-relaxed">
                During the primary and middle school years, students develop essential conceptual frameworks.
                Our teachers emphasize active discussion, analytical problem-solving, project-based science investigations,
                and digital literacy using contemporary computer labs.
              </p>
              <div className="space-y-2 pt-2">
                <div className="flex items-center space-x-2 text-sm text-school-navy font-semibold">
                  <BookOpen className="w-4 h-4 text-school-navy" />
                  <span>Enriched English & Urdu Language Comprehension</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-school-navy font-semibold">
                  <Microscope className="w-4 h-4 text-school-success" />
                  <span>Practical General Sciences & Experimental Projects</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-school-navy font-semibold">
                  <Laptop className="w-4 h-4 text-sky-600" />
                  <span>Early Computer Science, Typing & Coding Foundations</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative w-full h-72 sm:h-88 rounded-2xl overflow-hidden border-2 border-school-border shadow-md">
                <Image
                  src="/images/programs/primary-middle.png"
                  alt="Primary and Middle School Students"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Core Curriculum Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-school-border shadow-sm space-y-2">
              <h3 className="font-bold text-school-navy">English Language</h3>
              <p className="text-xs text-school-muted leading-relaxed">
                Grammar mastery, creative essay composition, comprehension passages, and public speaking debates.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-school-border shadow-sm space-y-2">
              <h3 className="font-bold text-school-navy">Mathematics</h3>
              <p className="text-xs text-school-muted leading-relaxed">
                Arithmetic fundamentals, word problems, fractions, geometry, algebra, and logical reasoning puzzles.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-school-border shadow-sm space-y-2">
              <h3 className="font-bold text-school-navy">General Science</h3>
              <p className="text-xs text-school-muted leading-relaxed">
                Living organisms, energy, forces, matter, earth science, and safe laboratory experimentation.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-school-border shadow-sm space-y-2">
              <h3 className="font-bold text-school-navy">Urdu & Islamiyat</h3>
              <p className="text-xs text-school-muted leading-relaxed">
                National heritage, Urdu literature, Quranic recitation with translation, ethics, and Seerah study.
              </p>
            </div>
          </div>

          <div className="bg-school-navy text-white rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold">Secure Your Child&apos;s Admission</h3>
              <p className="text-xs text-slate-300">Classes 1 through 8 admissions open for the current academic session.</p>
            </div>
            <Link
              href="/admission/admission-process"
              className="px-6 py-3 rounded-lg bg-school-gold text-school-navy-deep font-bold text-sm hover:bg-school-gold-warm transition-all shrink-0 flex items-center space-x-2"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Apply for Primary / Middle</span>
            </Link>
          </div>
        </div>
      </main>

      <PublicFooter />
    </>
  );
}
