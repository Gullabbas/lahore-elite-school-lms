import React from "react";
import Image from "next/image";
import Link from "next/link";
import PublicHeader from "@/components/layout/PublicHeader";
import PublicFooter from "@/components/layout/PublicFooter";
import {
  Compass,
  Target,
  BookOpen,
  Award,
  Users,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Phone,
  Sparkles,
} from "lucide-react";

export const metadata = {
  title: "About Us | Lahore Elite School",
  description:
    "Learn about Lahore Elite School's educational vision, mission, chairman's message, core values, and modern campuses in Lahore.",
};

export default function AboutPage() {
  return (
    <>
      <PublicHeader />

      <main className="flex-1 bg-school-bg">
        {/* Page Banner */}
        <section className="bg-school-navy text-white py-16 sm:py-20 border-b-4 border-school-gold">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-school-gold bg-school-gold/10 px-3 py-1 rounded-full border border-school-gold/30">
                About Our School
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Empowering Minds, Inspiring Character
              </h1>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                Dedicated to academic rigor, moral integrity, and forward-looking holistic learning
                in Lahore, Pakistan across our Al-Nisa and Sabzazar Campuses.
              </p>
            </div>
          </div>
        </section>

        {/* Intro & Heritage */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-5">
                <h2 className="text-3xl font-extrabold text-school-navy">
                  Welcome to Lahore Elite School
                </h2>
                <p className="text-base text-school-muted leading-relaxed">
                  Established with the vision of providing accessible, high-caliber English-medium education,
                  Lahore Elite School has evolved into an educational benchmark in Lahore. We believe that true
                  educational excellence balances rigorous academic discovery with the development of moral
                  rectitude, civic responsibility, and emotional resilience.
                </p>
                <p className="text-base text-school-muted leading-relaxed">
                  With our established <strong>Al-Nisa Campus</strong> (Zubaida Park, Multan Road) and{" "}
                  <strong>Sabzazar Campus</strong> (B-Block, Sabzazar, Multan Road), we provide an enriched,
                  secure learning environment equipped with modern science laboratories, IT facilities, activity
                  zones, and an experienced faculty committed to nurturing every learner.
                </p>
              </div>

              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-3xl bg-school-navy p-8 border-4 border-school-gold shadow-xl flex items-center justify-center">
                  <div className="relative w-44 h-44">
                    <Image
                      src="/images/brand/logo.png"
                      alt="Lahore Elite School Crest"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="py-16 bg-school-bg border-y border-school-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Vision */}
              <div className="bg-white p-8 rounded-2xl border border-school-border shadow-sm space-y-4">
                <div className="w-12 h-12 rounded-xl bg-school-navy text-school-gold flex items-center justify-center">
                  <Compass className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-school-navy">Our Vision</h3>
                <p className="text-sm sm:text-base text-school-muted leading-relaxed">
                  To be an exemplary center of academic distinction and moral enrichment in Pakistan,
                  cultivating visionary leaders equipped with knowledge, ethical conviction, and the
                  analytical capability to positively transform society.
                </p>
              </div>

              {/* Mission */}
              <div className="bg-white p-8 rounded-2xl border border-school-border shadow-sm space-y-4">
                <div className="w-12 h-12 rounded-xl bg-school-gold text-school-navy-deep flex items-center justify-center">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-school-navy">Our Mission</h3>
                <p className="text-sm sm:text-base text-school-muted leading-relaxed">
                  To deliver an engaging, inclusive, and academically sound educational program that sparks
                  intellectual curiosity, champions Islamic and universal moral principles, fosters digital
                  acumen, and empowers every student to realize their fullest individual potential.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Chairman's Message */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-school-navy-deep to-school-navy rounded-3xl p-8 sm:p-12 text-white border-2 border-school-gold/30 shadow-xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8 space-y-4">
                  <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-school-gold uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Chairman&apos;s Message</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                    Guiding Every Student Toward Meaningful Success
                  </h3>
                  <p className="text-sm sm:text-base text-slate-200 leading-relaxed italic">
                    &ldquo;Education is the most transformative trust placed in our hands. At Lahore Elite School,
                    our objective is to develop well-rounded personalities possessing not only outstanding
                    academic credentials, but also sound character, empathy, and respect for their community.
                    We remain steadfast in our pledge to provide an inspiring atmosphere where every pupil can
                    thrive and excel.&rdquo;
                  </p>
                  <div className="pt-2 font-bold text-school-gold">
                    Office of the Chairman, Lahore Elite School
                  </div>
                </div>

                <div className="lg:col-span-4 flex justify-center">
                  <div className="relative w-56 h-72 rounded-2xl overflow-hidden border-2 border-school-gold shadow-lg">
                    <Image
                      src="/images/brand/chairman.png"
                      alt="Chairman, Lahore Elite School"
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Campuses Overview */}
        <section className="py-16 bg-school-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
              <h2 className="text-3xl font-extrabold text-school-navy">Our Campuses in Lahore</h2>
              <p className="text-sm text-school-muted">
                Strategically positioned in Lahore with comprehensive facilities and easy transport accessibility.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-7 rounded-2xl border border-school-border shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-school-navy">Al-Nisa Campus</h3>
                  <span className="text-xs bg-school-gold text-school-navy-deep px-2.5 py-1 rounded font-bold">
                    Primary & High School
                  </span>
                </div>
                <div className="space-y-2 text-sm text-school-muted">
                  <div className="flex items-start space-x-2">
                    <MapPin className="w-4 h-4 text-school-navy shrink-0 mt-0.5" />
                    <span>1-S 9/14 Zubaida Park, Multan Road, Lahore</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-school-navy shrink-0" />
                    <span>0300-4279059</span>
                  </div>
                </div>
                <p className="text-xs text-school-muted border-t pt-3">
                  Featuring science laboratories, library, and comprehensive classrooms for junior and senior grades.
                </p>
              </div>

              <div className="bg-white p-7 rounded-2xl border border-school-border shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-school-navy">Sabzazar Campus</h3>
                  <span className="text-xs bg-school-navy text-white px-2.5 py-1 rounded font-bold">
                    Junior & High School
                  </span>
                </div>
                <div className="space-y-2 text-sm text-school-muted">
                  <div className="flex items-start space-x-2">
                    <MapPin className="w-4 h-4 text-school-navy shrink-0 mt-0.5" />
                    <span>280 B-Block, Sabzazar, Multan Road, Lahore</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-school-navy shrink-0" />
                    <span>0300-4279059</span>
                  </div>
                </div>
                <p className="text-xs text-school-muted border-t pt-3">
                  Equipped with early childhood learning centers, digital learning aids, and sports play areas.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </>
  );
}
