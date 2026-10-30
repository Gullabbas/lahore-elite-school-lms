import React from "react";
import Image from "next/image";
import Link from "next/link";
import PublicHeader from "@/components/layout/PublicHeader";
import PublicFooter from "@/components/layout/PublicFooter";
import HeroSlider from "@/components/home/HeroSlider";
import {
  BookOpen,
  Award,
  Users,
  ShieldCheck,
  GraduationCap,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Building,
  HeartHandshake,
  Compass,
  Lightbulb,
  Leaf,
  Medal,
  PhoneCall,
  MapPin,
  Clock,
  Layers,
  ChevronRight,
  Check,
  Zap,
} from "lucide-react";

export default function HomePage() {
  return (
    <>
      <PublicHeader />

      <main className="flex-1 overflow-x-hidden">
        {/* A. 2026 Apple / Samsung 3D Interactive Hero Slider */}
        <HeroSlider />

        {/* B. Explore Our Journey Section (Apple Keynote Style) */}
        <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
          {/* Subtle Ambient Radial Glows */}
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-school-gold/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-school-navy/5 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Left Column: Vision & Narrative */}
              <div className="lg:col-span-7 space-y-7">
                <div className="inline-flex items-center space-x-2 text-xs font-extrabold uppercase tracking-widest text-school-navy bg-gradient-to-r from-school-gold-light via-amber-50 to-school-gold-light px-4 py-1.5 rounded-full border border-school-gold/40 shadow-sm">
                  <Compass className="w-3.5 h-3.5 text-school-gold-warm" />
                  <span>Heritage of Academic Excellence</span>
                </div>

                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-school-navy tracking-tight leading-[1.12]">
                  Explore Our Journey &bull;{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-school-navy via-school-navy-light to-amber-700">
                    Nurturing Future Leaders
                  </span>
                </h2>

                <p className="text-base sm:text-lg text-school-muted leading-relaxed font-normal">
                  Lahore Elite School was founded with a singular, noble commitment: to deliver world-class,
                  morally grounded, and academically rigorous education to the youth of Lahore. Operating across
                  our modern <strong>Al-Nisa Campus</strong> and <strong>Sabzazar Campus</strong> on Multan Road,
                  we have cultivated a dynamic learning ecosystem where every student is challenged to achieve
                  intellectual brilliance and lead with ethical confidence.
                </p>

                {/* 3D Modern Feature Pills */}
                <div className="space-y-4 pt-2">
                  <div className="card-3d-lift p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:border-school-gold hover:bg-white flex items-start space-x-4 transition-all">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-school-navy to-school-navy-deep text-school-gold flex items-center justify-center shrink-0 shadow-md">
                      <Zap className="w-5 h-5 text-school-gold" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-school-navy text-sm sm:text-base">
                        Progressive STEM &amp; Digital Curriculum
                      </h3>
                      <p className="text-xs sm:text-sm text-school-muted leading-relaxed mt-0.5">
                        Blending national curriculum benchmarks with modern computer literacy, interactive science labs, and critical problem-solving skills.
                      </p>
                    </div>
                  </div>

                  <div className="card-3d-lift p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:border-school-gold hover:bg-white flex items-start space-x-4 transition-all">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-school-navy to-school-navy-deep text-school-gold flex items-center justify-center shrink-0 shadow-md">
                      <ShieldCheck className="w-5 h-5 text-school-gold" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-school-navy text-sm sm:text-base">
                        Moral Integrity &amp; Character Building
                      </h3>
                      <p className="text-xs sm:text-sm text-school-muted leading-relaxed mt-0.5">
                        Instilling Islamic ethics, universal human values, mutual respect, and social empathy in every student entrusted to our care.
                      </p>
                    </div>
                  </div>

                  <div className="card-3d-lift p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:border-school-gold hover:bg-white flex items-start space-x-4 transition-all">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-school-navy to-school-navy-deep text-school-gold flex items-center justify-center shrink-0 shadow-md">
                      <GraduationCap className="w-5 h-5 text-school-gold" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-school-navy text-sm sm:text-base">
                        Individual Mentorship &amp; Optimal Teacher Ratios
                      </h3>
                      <p className="text-xs sm:text-sm text-school-muted leading-relaxed mt-0.5">
                        Targeted classroom sizes ensuring individual student evaluation, remedial guidance, and holistic personal growth.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 3D Action Buttons */}
                <div className="pt-4 flex flex-wrap gap-4">
                  <Link
                    href="/about"
                    className="btn-shimmer px-7 py-3.5 rounded-xl bg-school-navy text-white font-bold text-sm hover:bg-school-navy-light transition-all shadow-navy-glow flex items-center space-x-2.5"
                  >
                    <span>Discover School Heritage</span>
                    <ArrowRight className="w-4 h-4 text-school-gold" />
                  </Link>

                  <Link
                    href="/admission/admission-process"
                    className="btn-shimmer px-7 py-3.5 rounded-xl bg-gradient-to-r from-school-gold to-school-gold-warm text-school-navy-deep font-extrabold text-sm shadow-gold-glow hover:shadow-gold-glow-lg transition-all flex items-center space-x-2"
                  >
                    <span>Admissions Process</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Right Column: 3D Holographic Crest Stage */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-80 h-80 sm:w-96 sm:h-96 flex items-center justify-center">
                  {/* Outer Orbital Glowing Rings */}
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-school-gold/50 animate-spin-slow" />
                  <div className="absolute inset-4 rounded-full border border-school-navy/15 animate-[spin_25s_linear_infinite_reverse]" />

                  {/* 3D Glass Embossed Stage */}
                  <div className="absolute inset-8 rounded-full bg-gradient-to-tr from-school-navy-deep via-school-navy to-school-navy-light shadow-[0_25px_60px_-15px_rgba(9,26,74,0.5)] flex items-center justify-center p-8 border-4 border-school-gold/80 transition-transform duration-700 hover:scale-105">
                    <div className="relative" style={{ width: 180, height: 180, maxWidth: "100%" }}>
                      <Image
                        src="/images/brand/logo.png"
                        alt="Lahore Elite School Official Crest"
                        width={180}
                        height={180}
                        style={{ width: "180px", height: "180px", objectFit: "contain" }}
                        priority
                      />
                    </div>
                  </div>

                  {/* Floating Hologram Badges */}
                  <div className="absolute -bottom-2 bg-white/95 backdrop-blur-xl border border-school-border shadow-2xl px-5 py-2.5 rounded-full flex items-center space-x-2 text-xs font-bold text-school-navy animate-float">
                    <Sparkles className="w-4 h-4 text-school-gold-warm" />
                    <span>Serving Lahore With Academic Pride</span>
                  </div>

                  <div className="absolute -top-2 bg-school-navy text-school-gold border border-school-gold/40 shadow-xl px-4 py-1.5 rounded-full flex items-center space-x-1.5 text-[11px] font-bold animate-float-delayed">
                    <Building className="w-3.5 h-3.5" />
                    <span>Al-Nisa &bull; Sabzazar Campuses</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* C. School Services & Educational Strengths (Apple 3D Grid) */}
        <section className="py-20 lg:py-28 bg-gradient-to-b from-school-bg via-slate-50 to-school-bg border-y border-school-border relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <span className="text-xs font-extrabold text-school-navy bg-gradient-to-r from-school-gold-light via-amber-50 to-school-gold-light px-4 py-1.5 rounded-full uppercase tracking-widest border border-school-gold/40 shadow-sm inline-block">
                Core Institutional Pillars
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-school-navy tracking-tight">
                School Services &amp; Educational Strengths
              </h2>
              <p className="text-sm sm:text-base text-school-muted leading-relaxed">
                Our multidimensional educational framework is designed to cultivate academic proficiency,
                emotional intelligence, and modern technological readiness.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {/* Card 1 */}
              <div className="card-3d-lift bg-white rounded-3xl p-8 border border-school-border shadow-3d-card hover:shadow-3d-hover hover:border-school-gold/60 transition-all flex flex-col justify-between group">
                <div>
                  <div className="icon-3d-badge w-16 h-16 rounded-2xl bg-gradient-to-br from-school-navy to-school-navy-deep text-school-gold flex items-center justify-center mb-6 shadow-md group-hover:scale-110 group-hover:shadow-gold-glow transition-all">
                    <BookOpen className="w-8 h-8 text-school-gold" />
                  </div>
                  <h3 className="text-xl font-extrabold text-school-navy mb-2.5">Quality Education</h3>
                  <p className="text-xs sm:text-sm text-school-muted leading-relaxed">
                    Structured learning syllabi integrating conceptual clarity, interactive multimedia lessons,
                    and continuous formative assessments to nurture deep understanding.
                  </p>
                </div>
                <div className="pt-6 border-t border-slate-100 mt-6 flex items-center text-xs font-bold text-school-navy group-hover:text-amber-600 transition-colors">
                  <span>Structured Learning Syllabi</span>
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Card 2 */}
              <div className="card-3d-lift bg-white rounded-3xl p-8 border border-school-border shadow-3d-card hover:shadow-3d-hover hover:border-school-gold/60 transition-all flex flex-col justify-between group">
                <div>
                  <div className="icon-3d-badge w-16 h-16 rounded-2xl bg-gradient-to-br from-school-navy to-school-navy-deep text-school-gold flex items-center justify-center mb-6 shadow-md group-hover:scale-110 group-hover:shadow-gold-glow transition-all">
                    <Award className="w-8 h-8 text-school-gold" />
                  </div>
                  <h3 className="text-xl font-extrabold text-school-navy mb-2.5">Academic Excellence</h3>
                  <p className="text-xs sm:text-sm text-school-muted leading-relaxed">
                    Consistent distinction results in Lahore Board matriculation examinations, rigorous revision test series,
                    and personalized academic coaching for senior students.
                  </p>
                </div>
                <div className="pt-6 border-t border-slate-100 mt-6 flex items-center text-xs font-bold text-school-navy group-hover:text-amber-600 transition-colors">
                  <span>Board Distinction Records</span>
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Card 3 */}
              <div className="card-3d-lift bg-white rounded-3xl p-8 border border-school-border shadow-3d-card hover:shadow-3d-hover hover:border-school-gold/60 transition-all flex flex-col justify-between group">
                <div>
                  <div className="icon-3d-badge w-16 h-16 rounded-2xl bg-gradient-to-br from-school-navy to-school-navy-deep text-school-gold flex items-center justify-center mb-6 shadow-md group-hover:scale-110 group-hover:shadow-gold-glow transition-all">
                    <Users className="w-8 h-8 text-school-gold" />
                  </div>
                  <h3 className="text-xl font-extrabold text-school-navy mb-2.5">Student Development</h3>
                  <p className="text-xs sm:text-sm text-school-muted leading-relaxed">
                    Extracurricular sports tournaments, debate societies, science exhibitions, and annual arts showcases
                    that build resilient confidence, leadership, and teamwork.
                  </p>
                </div>
                <div className="pt-6 border-t border-slate-100 mt-6 flex items-center text-xs font-bold text-school-navy group-hover:text-amber-600 transition-colors">
                  <span>Sports &amp; Debates Co-Curriculum</span>
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Card 4 */}
              <div className="card-3d-lift bg-white rounded-3xl p-8 border border-school-border shadow-3d-card hover:shadow-3d-hover hover:border-school-gold/60 transition-all flex flex-col justify-between group">
                <div>
                  <div className="icon-3d-badge w-16 h-16 rounded-2xl bg-gradient-to-br from-school-navy to-school-navy-deep text-school-gold flex items-center justify-center mb-6 shadow-md group-hover:scale-110 group-hover:shadow-gold-glow transition-all">
                    <ShieldCheck className="w-8 h-8 text-school-gold" />
                  </div>
                  <h3 className="text-xl font-extrabold text-school-navy mb-2.5">Safe &amp; Modern Campuses</h3>
                  <p className="text-xs sm:text-sm text-school-muted leading-relaxed">
                    24/7 dedicated campus security, HD CCTV monitoring, hygienic indoor facilities, and caring,
                    compassionate faculty ensuring parents total peace of mind.
                  </p>
                </div>
                <div className="pt-6 border-t border-slate-100 mt-6 flex items-center text-xs font-bold text-school-navy group-hover:text-amber-600 transition-colors">
                  <span>24/7 Security &amp; Surveillance</span>
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* D. Chairman's Message (Executive 3D Glass Stage) */}
        <section className="py-20 lg:py-28 bg-white relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-school-navy-deep via-school-navy to-school-navy-light rounded-3xl sm:rounded-[36px] overflow-hidden shadow-2xl text-white border-2 border-school-gold/30 relative">
              {/* Background ambient lighting */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-school-gold/15 rounded-full blur-3xl pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-12 items-center relative z-10">
                {/* Left: Message content */}
                <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 space-y-6">
                  <div className="inline-flex items-center space-x-2 text-xs font-extrabold uppercase tracking-widest text-school-gold bg-white/10 px-4 py-1.5 rounded-full border border-white/20 backdrop-blur-sm">
                    <Sparkles className="w-3.5 h-3.5 text-school-gold" />
                    <span>Executive Leadership Vision</span>
                  </div>

                  <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                    Chairman&apos;s Vision &amp; Message
                  </h2>

                  <div className="space-y-4 text-slate-200 text-sm sm:text-base leading-relaxed italic border-l-4 border-school-gold pl-5 py-1">
                    <p>
                      &ldquo;At Lahore Elite School, we hold a profound conviction that true education transcends
                      mere textbook knowledge. It is the noble art of building character, cultivating integrity,
                      and instilling an unwavering passion for lifelong learning.&rdquo;
                    </p>
                    <p>
                      &ldquo;Our dedicated faculty across Al-Nisa and Sabzazar Campuses works tirelessly to provide an
                      environment where every child feels valued, challenged, and inspired. We warmly invite parents
                      to join hands with us in shaping bright, honorable, and visionary leaders for Pakistan and the global community.&rdquo;
                    </p>
                  </div>

                  <div className="pt-6 border-t border-white/15 flex items-center justify-between">
                    <div>
                      <div className="font-extrabold text-xl text-school-gold">Office of the Chairman</div>
                      <div className="text-xs text-slate-300">Lahore Elite School, Lahore, Pakistan</div>
                    </div>
                    <div className="hidden sm:block">
                      <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-white/10 border border-white/20 text-slate-300">
                        Founded in Lahore
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Chairman Photo with 3D Float Frame */}
                <div className="lg:col-span-5 p-8 sm:p-12 flex justify-center bg-black/20">
                  <div className="relative w-64 h-80 sm:w-80 sm:h-96 rounded-2xl sm:rounded-3xl overflow-hidden border-4 border-school-gold shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform hover:scale-105 transition-transform duration-500 group">
                    <Image
                      src="/images/brand/chairman.png"
                      alt="Chairman, Lahore Elite School"
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-school-navy-deep via-school-navy-deep/70 to-transparent p-4 text-center">
                      <span className="text-xs font-bold text-school-gold uppercase tracking-widest drop-shadow">
                        Chairman &amp; Founder
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* E. Institutional Milestones & Commitments (Interactive 3D Grid) */}
        <section className="py-20 lg:py-28 bg-school-bg relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <span className="text-xs font-extrabold text-school-navy bg-gradient-to-r from-school-gold-light via-amber-50 to-school-gold-light px-4 py-1.5 rounded-full uppercase tracking-widest border border-school-gold/40 shadow-sm inline-block">
                Continuous Progress &bull; 2026 Benchmarks
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-school-navy tracking-tight">
                Institutional Milestones &amp; Commitments
              </h2>
              <p className="text-sm sm:text-base text-school-muted leading-relaxed">
                Key benchmarks reflecting our sustained dedication to academic rigor, student welfare,
                and educational distinction.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Academic Excellence",
                  desc: "Consistently producing high-percentage matriculation achievers and subject toppers.",
                  icon: Award,
                  tag: "Top Ranks",
                },
                {
                  title: "Student Scholarships",
                  desc: "Merit-based and sibling fee concessions supporting talented and deserving scholars.",
                  icon: GraduationCap,
                  tag: "Merit Concessions",
                },
                {
                  title: "Teacher Development",
                  desc: "Regular workshops, modern pedagogical training, and teacher mentorship programs.",
                  icon: BookOpen,
                  tag: "Trained Faculty",
                },
                {
                  title: "Community Engagement",
                  desc: "Social welfare drives, neighborhood cleanups, and local civic responsibility projects.",
                  icon: HeartHandshake,
                  tag: "Social Welfare",
                },
                {
                  title: "Student Activities",
                  desc: "Annual sports gala, speech competitions, science fairs, and scouting initiatives.",
                  icon: Medal,
                  tag: "Co-Curricular",
                },
                {
                  title: "Environmental Awareness",
                  desc: "Green campus initiatives, recycling programs, and environmental science modules.",
                  icon: Leaf,
                  tag: "Green Campus",
                },
                {
                  title: "Parent Engagement",
                  desc: "Structured quarterly Parent-Teacher Meetings and transparent digital progress reporting.",
                  icon: Users,
                  tag: "PTM Meetings",
                },
                {
                  title: "Student Achievements",
                  desc: "Recognizing outstanding conduct, attendance, and extracurricular laurels annually.",
                  icon: Sparkles,
                  tag: "Annual Honors",
                },
                {
                  title: "Educational Innovation",
                  desc: "Smart digital classrooms, integrated LMS access, and hands-on computer science labs.",
                  icon: Lightbulb,
                  tag: "Digital LMS",
                },
              ].map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={idx}
                    className="card-3d-lift bg-white p-7 rounded-2xl border border-school-border shadow-sm hover:border-school-gold hover:shadow-3d-card transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="icon-3d-badge w-12 h-12 rounded-xl bg-school-gold-light text-school-navy flex items-center justify-center group-hover:bg-school-navy group-hover:text-school-gold transition-colors shadow-sm">
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                          {item.tag}
                        </span>
                      </div>
                      <h3 className="font-extrabold text-school-navy text-lg mb-1.5">{item.title}</h3>
                      <p className="text-xs text-school-muted leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* F. Annual Award Ceremony Showcase */}
        <section className="py-20 lg:py-28 bg-white relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5 space-y-6">
                <span className="text-xs font-extrabold text-school-navy bg-school-gold-light px-4 py-1.5 rounded-full uppercase tracking-widest border border-school-gold/30">
                  Annual Laurels &bull; 2025
                </span>
                <h2 className="text-3xl sm:text-5xl font-black text-school-navy leading-tight">
                  Annual Award Ceremony
                </h2>
                <p className="text-sm sm:text-base text-school-muted leading-relaxed">
                  Our annual Award Ceremony celebrates the exceptional accomplishments of our students across
                  academics, sports, arts, and character. We honor top rank-holders, debate champions, and
                  exemplary student council representatives before parents and esteemed guests.
                </p>
                <div className="pt-2">
                  <Link
                    href="/gallery"
                    className="btn-shimmer inline-flex items-center space-x-2.5 px-7 py-3.5 rounded-xl bg-school-navy text-white font-bold text-sm hover:bg-school-navy-light transition-all shadow-navy-glow"
                  >
                    <span>Explore Event Gallery</span>
                    <ArrowRight className="w-4 h-4 text-school-gold" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="card-3d-lift relative w-full h-80 sm:h-96 rounded-3xl overflow-hidden border-4 border-school-border shadow-2xl group">
                  <Image
                    src="/images/gallery/award-ceremony.png"
                    alt="Lahore Elite School Award Ceremony"
                    fill
                    sizes="(max-width: 1024px) 100vw, 650px"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex items-end p-6 sm:p-8">
                    <span className="text-white text-xs sm:text-sm font-bold tracking-wide bg-school-navy/85 backdrop-blur-md px-4 py-2 rounded-xl border border-school-gold/40 shadow-lg">
                      Celebrating Academic &amp; Extracurricular Brilliance &bull; Al-Nisa &amp; Sabzazar Campuses
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* G. Comprehensive Academic Programs (Updated with User 3 Images in 16:9 Aspect Ratio) */}
        <section className="py-20 lg:py-28 bg-gradient-to-b from-school-bg via-slate-50 to-school-bg border-t border-school-border relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <span className="text-xs font-extrabold text-school-navy bg-gradient-to-r from-school-gold-light via-amber-50 to-school-gold-light px-4 py-1.5 rounded-full uppercase tracking-widest border border-school-gold/40 shadow-sm inline-block">
                Academic Pathways &bull; Playgroup to Matriculation
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-school-navy tracking-tight">
                Comprehensive Academic Programs
              </h2>
              <p className="text-sm sm:text-base text-school-muted leading-relaxed">
                Age-tailored curricula designed to ignite imagination in early years, cultivate core
                literacy in middle school, and achieve board distinction in matriculation.
              </p>
            </div>

            {/* 3 Modern 2026 Program Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Program 1: Pre-School Section */}
              <div className="card-3d-lift bg-white rounded-3xl overflow-hidden border border-school-border shadow-3d-card hover:shadow-3d-hover hover:border-school-gold/60 transition-all flex flex-col group">
                {/* 16:9 Image Frame showcasing full wooden title badge without cropping */}
                <div className="relative aspect-[16/9] w-full bg-slate-900 overflow-hidden">
                  <Image
                    src="/images/programs/pre-school.jpg"
                    alt="Pre-School Section: Playgroup, Nursery, Prep"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                  <div className="absolute top-3.5 left-3.5 bg-school-gold text-school-navy-deep text-[11px] font-black px-3 py-1 rounded-full shadow-md uppercase tracking-wider">
                    Playgroup &bull; Nursery &bull; Prep
                  </div>
                </div>

                <div className="p-7 flex-1 flex flex-col justify-between space-y-5">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-school-navy mb-2.5">
                      Pre-School Section
                    </h3>
                    <p className="text-xs sm:text-sm text-school-muted leading-relaxed mb-4">
                      Nurturing early literacy, numeracy, creative expression, and motor skills through
                      play-based sensory learning in bright, child-friendly spaces.
                    </p>

                    <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-700 font-medium">
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Montessori-inspired phonics &amp; sensory play</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Dedicated female early-childhood educators</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Safe, air-conditioned indoor learning areas</span>
                      </div>
                    </div>
                  </div>

                  <Link
                    href="/programs/pre-school"
                    className="btn-shimmer w-full py-3 rounded-xl bg-school-navy text-white text-xs font-bold hover:bg-school-navy-light transition-all flex items-center justify-center space-x-2 shadow-sm"
                  >
                    <span>Explore Pre-School Curriculum</span>
                    <ArrowRight className="w-4 h-4 text-school-gold" />
                  </Link>
                </div>
              </div>

              {/* Program 2: Primary & Middle School */}
              <div className="card-3d-lift bg-white rounded-3xl overflow-hidden border border-school-border shadow-3d-card hover:shadow-3d-hover hover:border-school-gold/60 transition-all flex flex-col group">
                {/* 16:9 Image Frame showcasing full wooden title badge without cropping */}
                <div className="relative aspect-[16/9] w-full bg-slate-900 overflow-hidden">
                  <Image
                    src="/images/programs/primary-middle.jpg"
                    alt="Primary & Middle School: Classes 1 to 8"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                  <div className="absolute top-3.5 left-3.5 bg-school-navy text-school-gold text-[11px] font-black px-3 py-1 rounded-full shadow-md uppercase tracking-wider border border-school-gold/30">
                    Classes 1 to 8
                  </div>
                </div>

                <div className="p-7 flex-1 flex flex-col justify-between space-y-5">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-school-navy mb-2.5">
                      Primary &amp; Middle School
                    </h3>
                    <p className="text-xs sm:text-sm text-school-muted leading-relaxed mb-4">
                      Foundational mastery in English language, Mathematics, General Sciences, Urdu,
                      Islamiyat, and Computer Applications with interactive projects.
                    </p>

                    <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-700 font-medium">
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Interactive smart boards &amp; science projects</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Oxford-aligned English spoken and written fluency</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Hands-on computer labs with coding fundamentals</span>
                      </div>
                    </div>
                  </div>

                  <Link
                    href="/programs/primary-middle"
                    className="btn-shimmer w-full py-3 rounded-xl bg-school-navy text-white text-xs font-bold hover:bg-school-navy-light transition-all flex items-center justify-center space-x-2 shadow-sm"
                  >
                    <span>Explore Primary &amp; Middle</span>
                    <ArrowRight className="w-4 h-4 text-school-gold" />
                  </Link>
                </div>
              </div>

              {/* Program 3: High School (Matric) */}
              <div className="card-3d-lift bg-white rounded-3xl overflow-hidden border border-school-border shadow-3d-card hover:shadow-3d-hover hover:border-school-gold/60 transition-all flex flex-col group md:col-span-2 lg:col-span-1">
                {/* 16:9 Image Frame showcasing full wooden title badge without cropping */}
                <div className="relative aspect-[16/9] w-full bg-slate-900 overflow-hidden">
                  <Image
                    src="/images/programs/high-school.jpg"
                    alt="High School: Classes 9 & 10 (Matriculation)"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                  <div className="absolute top-3.5 left-3.5 bg-school-gold text-school-navy-deep text-[11px] font-black px-3 py-1 rounded-full shadow-md uppercase tracking-wider">
                    Classes 9 &amp; 10 (Matric)
                  </div>
                </div>

                <div className="p-7 flex-1 flex flex-col justify-between space-y-5">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-school-navy mb-2.5">
                      High School (Matric)
                    </h3>
                    <p className="text-xs sm:text-sm text-school-muted leading-relaxed mb-4">
                      Focused board exam preparation in Science (Biology/Chemistry/Physics) and Computer Science
                      groups with advanced laboratories and revision test series.
                    </p>

                    <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-700 font-medium">
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Lahore Board matriculation exam coaching</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Advanced Physics, Chemistry &amp; Biology labs</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Regular testing &amp; past board paper series</span>
                      </div>
                    </div>
                  </div>

                  <Link
                    href="/programs/high-school"
                    className="btn-shimmer w-full py-3 rounded-xl bg-school-navy text-white text-xs font-bold hover:bg-school-navy-light transition-all flex items-center justify-center space-x-2 shadow-sm"
                  >
                    <span>Explore Matriculation Groups</span>
                    <ArrowRight className="w-4 h-4 text-school-gold" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* H. Admission CTA & Campuses Arena (Apple / Samsung S26 Style) */}
        <section className="py-20 bg-school-navy text-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="bg-gradient-to-r from-school-navy-deep via-school-navy to-school-navy-light border-2 border-school-gold/40 rounded-3xl sm:rounded-[36px] p-8 sm:p-14 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-10">
              <div className="space-y-5 max-w-2xl text-center lg:text-left">
                <div className="inline-flex items-center space-x-2 text-xs font-extrabold uppercase tracking-widest text-school-gold bg-white/10 px-4 py-1.5 rounded-full border border-white/20">
                  <span className="w-2 h-2 rounded-full bg-school-gold animate-ping" />
                  <span>Admissions Open Academic Year 2025-26</span>
                </div>

                <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                  Join Lahore Elite School Today
                </h2>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  Give your child the foundation for a lifetime of distinction and ethical success. Visit
                  our campus admissions office or submit an online inquiry.
                </p>

                {/* Campus Chips */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/15 flex items-center space-x-3 text-left">
                    <MapPin className="w-5 h-5 text-school-gold shrink-0" />
                    <div>
                      <strong className="text-white block font-bold">Al-Nisa Campus</strong>
                      <span className="text-[11px] text-slate-300">1-S 9/14 Zubaida Park, Multan Road</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/15 flex items-center space-x-3 text-left">
                    <MapPin className="w-5 h-5 text-school-gold shrink-0" />
                    <div>
                      <strong className="text-white block font-bold">Sabzazar Campus</strong>
                      <span className="text-[11px] text-slate-300">280 B-Block, Sabzazar, Multan Road</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col gap-3.5 w-full sm:w-auto shrink-0">
                <Link
                  href="/admission/admission-process"
                  className="btn-shimmer px-8 py-4 rounded-xl bg-gradient-to-r from-school-gold to-school-gold-warm text-school-navy-deep font-extrabold text-sm sm:text-base shadow-gold-glow hover:shadow-gold-glow-lg transition-all flex items-center justify-center space-x-2"
                >
                  <GraduationCap className="w-5 h-5 text-school-navy-deep" />
                  <span>Apply for Admission Online</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>

                <a
                  href="tel:03004279059"
                  className="px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base border border-white/25 transition-all flex items-center justify-center space-x-2"
                >
                  <PhoneCall className="w-4 h-4 text-school-gold" />
                  <span>Call Hotline: 0300-4279059</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </>
  );
}
