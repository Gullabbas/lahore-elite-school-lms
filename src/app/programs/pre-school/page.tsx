import React from "react";
import Image from "next/image";
import Link from "next/link";
import PublicHeader from "@/components/layout/PublicHeader";
import PublicFooter from "@/components/layout/PublicFooter";
import { Sparkles, Heart, Smile, Palette, Compass, ArrowRight, GraduationCap } from "lucide-react";

export const metadata = {
  title: "Pre-School Program (Playgroup, Nursery, Prep) | Lahore Elite School",
  description:
    "Early childhood education, play-based sensory learning, and foundational literacy at Lahore Elite School.",
};

export default function PreSchoolPage() {
  return (
    <>
      <PublicHeader />

      <main className="flex-1 bg-school-bg py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-school-navy bg-school-gold-light px-3 py-1 rounded-full border border-school-gold/30">
              Early Years Foundation
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-school-navy">
              Pre-School Section (Ages 3 – 5)
            </h1>
            <p className="text-sm sm:text-base text-school-muted">
              Nurturing joyful curiosity, social empathy, and essential sensory-motor development in Playgroup, Nursery, and Prep.
            </p>
          </div>

          {/* Banner Image & Story */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl p-6 sm:p-10 border border-school-border shadow-sm">
            <div className="lg:col-span-6 space-y-4">
              <h2 className="text-2xl font-bold text-school-navy">Where Lifelong Love for Learning Begins</h2>
              <p className="text-sm text-school-muted leading-relaxed">
                Our Pre-School environment is specifically crafted to bridge the warm transition from home to school.
                Children learn through guided exploration, sensory-rich play, phonics games, music, rhymes, and creative
                hands-on arts that stimulate cognitive and fine motor dexterity.
              </p>
              <div className="space-y-2 pt-2">
                <div className="flex items-center space-x-2 text-sm text-school-navy font-semibold">
                  <Heart className="w-4 h-4 text-rose-500" />
                  <span>Caring, Motherly and Highly Trained Early Childhood Teachers</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-school-navy font-semibold">
                  <Palette className="w-4 h-4 text-amber-500" />
                  <span>Color-Rich Classrooms & Safe Indoor Soft-Play Areas</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-school-navy font-semibold">
                  <Smile className="w-4 h-4 text-emerald-500" />
                  <span>Focus on Positive Socialization, Manners, and Confidence</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative w-full h-72 sm:h-88 rounded-2xl overflow-hidden border-2 border-school-border shadow-md">
                <Image
                  src="/images/programs/pre-school.png"
                  alt="Pre-School at Lahore Elite School"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Core Pre-School Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-school-border shadow-sm space-y-3">
              <span className="text-xs font-bold text-school-navy bg-school-gold-light px-2.5 py-1 rounded">
                Pillar 1
              </span>
              <h3 className="font-bold text-lg text-school-navy">Early Literacy & Phonics</h3>
              <p className="text-xs text-school-muted leading-relaxed">
                Systematic synthetic phonics, letter sounds, storytelling, vocabulary expansion, and early pencil-grip exercises.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-school-border shadow-sm space-y-3">
              <span className="text-xs font-bold text-school-navy bg-school-gold-light px-2.5 py-1 rounded">
                Pillar 2
              </span>
              <h3 className="font-bold text-lg text-school-navy">Numeracy & Shapes</h3>
              <p className="text-xs text-school-muted leading-relaxed">
                Concrete mathematical counters, sorting, patterns, counting beads, shape recognition, and foundational spatial awareness.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-school-border shadow-sm space-y-3">
              <span className="text-xs font-bold text-school-navy bg-school-gold-light px-2.5 py-1 rounded">
                Pillar 3
              </span>
              <h3 className="font-bold text-lg text-school-navy">Creative Expression & Motor Skills</h3>
              <p className="text-xs text-school-muted leading-relaxed">
                Clay modeling, finger painting, sand play, puzzle solving, physical movement, rhythm, and moral character stories.
              </p>
            </div>
          </div>

          {/* CTA Banner */}
          <div className="bg-school-navy text-white rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold">Enroll Your Little One Today</h3>
              <p className="text-xs text-slate-300">Playgroup, Nursery and Prep admissions currently open for 2025-26.</p>
            </div>
            <Link
              href="/admission/admission-process"
              className="px-6 py-3 rounded-lg bg-school-gold text-school-navy-deep font-bold text-sm hover:bg-school-gold-warm transition-all shrink-0 flex items-center space-x-2"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Apply for Pre-School</span>
            </Link>
          </div>
        </div>
      </main>

      <PublicFooter />
    </>
  );
}
