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
} from "lucide-react";

export default function HomePage() {
  return (
    <>
      <PublicHeader />

      <main className="flex-1">
        {/* A. Hero Image Slider */}
        <HeroSlider />

        {/* B. Explore Our Journey Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Heading, Vision, Text, CTA */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-school-navy bg-school-gold-light px-3 py-1 rounded-full border border-school-gold/40">
                  <Compass className="w-3.5 h-3.5 text-school-navy" />
                  <span>Our Heritage & Vision</span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-school-navy tracking-tight leading-tight">
                  Explore Our Journey
                </h2>

                <p className="text-base sm:text-lg text-school-muted leading-relaxed">
                  Lahore Elite School was established with a singular, noble mission: to provide world-class,
                  morally grounded, and academically rigorous education to the youth of Lahore. Operating across
                  our state-of-the-art <strong>Al-Nisa Campus</strong> and <strong>Sabzazar Campus</strong>,
                  we have developed a vibrant educational ecosystem that empowers students to excel academically,
                  think critically, and lead with empathy.
                </p>

                <div className="space-y-3 pt-2">
                  <div className="flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-school-success shrink-0 mt-0.5" />
                    <p className="text-sm sm:text-base text-school-text">
                      <strong>Progressive Curriculum:</strong> Blending national curriculum rigor with international
                      pedagogies, computer literacy, and STEM sciences.
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-school-success shrink-0 mt-0.5" />
                    <p className="text-sm sm:text-base text-school-text">
                      <strong>Character & Moral Discipline:</strong> Instilling Islamic ethics, integrity, discipline,
                      and community responsibility in every student.
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-school-success shrink-0 mt-0.5" />
                    <p className="text-sm sm:text-base text-school-text">
                      <strong>Individual Student Attention:</strong> Optimal student-teacher ratios ensuring every child
                      receives targeted developmental support.
                    </p>
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap gap-4">
                  <Link
                    href="/about"
                    className="inline-flex items-center space-x-2 px-6 py-3 rounded-lg bg-school-navy text-white font-semibold hover:bg-school-navy-light transition-all shadow"
                  >
                    <span>Learn More About Us</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href="/admission/admission-process"
                    className="inline-flex items-center space-x-2 px-6 py-3 rounded-lg bg-school-gold text-school-navy-deep font-bold hover:bg-school-gold-warm transition-all shadow"
                  >
                    <span>Admission Process</span>
                  </Link>
                </div>
              </div>

              {/* Right Column: Crest inside elegant circular visual with subtle pulse animation */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-72 h-72 sm:w-88 sm:h-88 flex items-center justify-center">
                  {/* Subtle rotating glow / shield rings */}
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-school-gold/50 animate-[spin_30s_linear_infinite]" />
                  <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-school-navy-deep to-school-navy shadow-2xl flex items-center justify-center p-6 border-4 border-school-gold">
                    <div className="relative" style={{ width: 192, height: 192, maxWidth: "100%" }}>
                      <Image
                        src="/images/brand/logo.png"
                        alt="Lahore Elite School Official Crest"
                        width={192}
                        height={192}
                        style={{ width: "192px", height: "192px", objectFit: "contain" }}
                        priority
                      />
                    </div>
                  </div>
                  {/* Floating decorative badge */}
                  <div className="absolute -bottom-4 bg-white border border-school-border shadow-xl px-5 py-2.5 rounded-full flex items-center space-x-2 text-xs font-bold text-school-navy">
                    <Sparkles className="w-4 h-4 text-school-gold" />
                    <span>Serving Lahore With Pride</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* C. School Services and Educational Strengths (4 Cards) */}
        <section className="py-16 bg-school-bg border-y border-school-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
              <span className="text-xs font-bold text-school-navy bg-school-gold-light px-3 py-1 rounded-full uppercase tracking-wider border border-school-gold/30">
                Core Strengths
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-school-navy">
                School Services & Educational Strengths
              </h2>
              <p className="text-sm sm:text-base text-school-muted">
                Our multidimensional educational framework is tailored to cultivate academic proficiency,
                emotional intelligence, and future-ready capabilities.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Card 1 */}
              <div className="bg-white rounded-2xl p-7 border border-school-border shadow-sm hover:shadow-md hover:border-school-gold transition-all group">
                <div className="w-14 h-14 rounded-xl bg-school-navy/5 text-school-navy flex items-center justify-center mb-5 group-hover:bg-school-navy group-hover:text-school-gold transition-colors">
                  <BookOpen className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-school-navy mb-2">Quality Education</h3>
                <p className="text-sm text-school-muted leading-relaxed">
                  Structured learning syllabi integrating conceptual clarity, interactive multimedia,
                  and regular evaluation to foster true understanding.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-white rounded-2xl p-7 border border-school-border shadow-sm hover:shadow-md hover:border-school-gold transition-all group">
                <div className="w-14 h-14 rounded-xl bg-school-navy/5 text-school-navy flex items-center justify-center mb-5 group-hover:bg-school-navy group-hover:text-school-gold transition-colors">
                  <Award className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-school-navy mb-2">Academic Excellence</h3>
                <p className="text-sm text-school-muted leading-relaxed">
                  Consistent distinction results in board examinations, rigorous test preparation,
                  and individualized academic counseling for senior students.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-white rounded-2xl p-7 border border-school-border shadow-sm hover:shadow-md hover:border-school-gold transition-all group">
                <div className="w-14 h-14 rounded-xl bg-school-navy/5 text-school-navy flex items-center justify-center mb-5 group-hover:bg-school-navy group-hover:text-school-gold transition-colors">
                  <Users className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-school-navy mb-2">Student Development</h3>
                <p className="text-sm text-school-muted leading-relaxed">
                  Extracurricular sports, debate clubs, science exhibitions, and art competitions
                  that build resilient character and teamwork skills.
                </p>
              </div>

              {/* Card 4 */}
              <div className="bg-white rounded-2xl p-7 border border-school-border shadow-sm hover:shadow-md hover:border-school-gold transition-all group">
                <div className="w-14 h-14 rounded-xl bg-school-navy/5 text-school-navy flex items-center justify-center mb-5 group-hover:bg-school-navy group-hover:text-school-gold transition-colors">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-school-navy mb-2">Safe & Supportive Environment</h3>
                <p className="text-sm text-school-muted leading-relaxed">
                  24/7 campus security, CCTV surveillance, hygienic surroundings, and compassionate
                  teachers ensuring complete peace of mind for parents.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* D. Chairman's Message */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-school-navy to-school-navy-deep rounded-3xl overflow-hidden shadow-xl text-white border-4 border-school-gold/20">
              <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
                {/* Left: Message content */}
                <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 space-y-6">
                  <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-school-gold bg-white/10 px-3 py-1 rounded-full border border-white/20">
                    <Sparkles className="w-3.5 h-3.5 text-school-gold" />
                    <span>Leadership Vision</span>
                  </div>

                  <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                    Chairman&apos;s Message
                  </h2>

                  <div className="space-y-4 text-slate-200 text-sm sm:text-base leading-relaxed italic">
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

                  <div className="pt-4 border-t border-white/10">
                    <div className="font-bold text-lg text-school-gold">Office of the Chairman</div>
                    <div className="text-xs text-slate-300">Lahore Elite School, Lahore, Pakistan</div>
                  </div>
                </div>

                {/* Right: Chairman Photo with elegant framing */}
                <div className="lg:col-span-5 p-8 flex justify-center bg-black/10">
                  <div className="relative w-64 h-80 sm:w-72 sm:h-96 rounded-2xl overflow-hidden border-4 border-school-gold shadow-2xl">
                    <Image
                      src="/images/brand/chairman.png"
                      alt="Chairman, Lahore Elite School"
                      fill
                      className="object-cover object-top"
                    />
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-school-navy-deep via-school-navy-deep/60 to-transparent p-4 text-center">
                      <span className="text-xs font-bold text-school-gold uppercase tracking-wider">
                        Chairman & Founder
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* E. Milestones Section */}
        <section className="py-20 bg-school-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
              <span className="text-xs font-bold text-school-navy bg-school-gold-light px-3 py-1 rounded-full uppercase tracking-wider border border-school-gold/30">
                Continuous Progress
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-school-navy">
                Institutional Milestones & Commitments
              </h2>
              <p className="text-sm sm:text-base text-school-muted">
                Key benchmarks reflecting our sustained dedication to academic rigor, student welfare,
                and educational excellence.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Academic Excellence",
                  desc: "Consistently producing high-percentage matriculation achievers and subject toppers.",
                  icon: Award,
                },
                {
                  title: "Student Scholarships",
                  desc: "Merit-based and sibling fee concessions supporting talented and deserving scholars.",
                  icon: GraduationCap,
                },
                {
                  title: "Teacher Development",
                  desc: "Regular workshops, modern pedagogical training, and teacher mentorship programs.",
                  icon: BookOpen,
                },
                {
                  title: "Community Engagement",
                  desc: "Social welfare drives, neighborhood cleanups, and local civic responsibility projects.",
                  icon: HeartHandshake,
                },
                {
                  title: "Student Activities",
                  desc: "Annual sports gala, speech competitions, science fairs, and scouting initiatives.",
                  icon: Medal,
                },
                {
                  title: "Environmental Awareness",
                  desc: "Green campus initiatives, recycling programs, and environmental science modules.",
                  icon: Leaf,
                },
                {
                  title: "Parent Engagement",
                  desc: "Structured quarterly Parent-Teacher Meetings and transparent progress reporting.",
                  icon: Users,
                },
                {
                  title: "Student Achievements",
                  desc: "Recognizing outstanding conduct, attendance, and extracurricular laurels annually.",
                  icon: Sparkles,
                },
                {
                  title: "Educational Innovation",
                  desc: "Smart digital classrooms, integrated LMS access, and hands-on computer science labs.",
                  icon: Lightbulb,
                },
              ].map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white p-6 rounded-xl border border-school-border shadow-sm hover:border-school-gold hover:shadow-md transition-all flex items-start space-x-4"
                  >
                    <div className="p-3 rounded-lg bg-school-gold-light text-school-navy shrink-0">
                      <IconComponent className="w-5 h-5 text-school-navy" />
                    </div>
                    <div>
                      <h3 className="font-bold text-school-navy text-base mb-1">{item.title}</h3>
                      <p className="text-xs text-school-muted leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* F. Award Ceremony 2025 */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5 space-y-6">
                <span className="text-xs font-bold text-school-navy bg-school-gold-light px-3 py-1 rounded-full uppercase tracking-wider border border-school-gold/30">
                  Annual Honors
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-school-navy leading-tight">
                  Award Ceremony 2025
                </h2>
                <p className="text-sm sm:text-base text-school-muted leading-relaxed">
                  Our annual Award Ceremony celebrates the exceptional accomplishments of our students across
                  academics, sports, arts, and character. We honor top rank-holders, debate champions, and
                  exemplary student council representatives before parents and esteemed guests.
                </p>
                <div className="pt-2">
                  <Link
                    href="/gallery"
                    className="inline-flex items-center space-x-2 px-6 py-3 rounded-lg bg-school-navy text-white font-semibold hover:bg-school-navy-light transition-all shadow"
                  >
                    <span>View Event Gallery</span>
                    <ArrowRight className="w-4 h-4 text-school-gold" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden border-4 border-school-border shadow-lg">
                  <Image
                    src="/images/gallery/award-ceremony.png"
                    alt="Lahore Elite School Award Ceremony"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
                    <span className="text-white text-sm font-semibold tracking-wide bg-school-navy/80 px-3 py-1.5 rounded-lg border border-school-gold/40">
                      Celebrating Academic & Extracurricular Brilliance
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* G. Academic Programs Overview */}
        <section className="py-20 bg-school-bg border-t border-school-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
              <span className="text-xs font-bold text-school-navy bg-school-gold-light px-3 py-1 rounded-full uppercase tracking-wider border border-school-gold/30">
                Educational Pathways
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-school-navy">
                Comprehensive Academic Programs
              </h2>
              <p className="text-sm sm:text-base text-school-muted">
                Age-tailored curricula designed to ignite imagination in early years, cultivate core
                literacy in middle school, and achieve board distinction in matriculation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Pre-School */}
              <div className="bg-white rounded-2xl overflow-hidden border border-school-border shadow-sm hover:shadow-lg transition-all flex flex-col">
                <div className="relative h-48 w-full bg-slate-100">
                  <Image
                    src="/images/programs/pre-school.png"
                    alt="Pre-School Program"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-school-gold text-school-navy-deep text-xs font-bold px-2.5 py-1 rounded-md">
                    Playgroup, Nursery, Prep
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-school-navy mb-2">Pre-School Section</h3>
                    <p className="text-sm text-school-muted mb-4 leading-relaxed">
                      Nurturing early literacy, numeracy, creative expression, and motor skills through
                      play-based sensory learning in bright, child-friendly spaces.
                    </p>
                  </div>
                  <Link
                    href="/programs/pre-school"
                    className="text-sm font-bold text-school-navy hover:text-school-navy-light inline-flex items-center space-x-1"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>

              {/* Primary & Middle */}
              <div className="bg-white rounded-2xl overflow-hidden border border-school-border shadow-sm hover:shadow-lg transition-all flex flex-col">
                <div className="relative h-48 w-full bg-slate-100">
                  <Image
                    src="/images/programs/primary-middle.png"
                    alt="Primary & Middle Program"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-school-navy text-white text-xs font-bold px-2.5 py-1 rounded-md">
                    Classes 1 to 8
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-school-navy mb-2">Primary & Middle School</h3>
                    <p className="text-sm text-school-muted mb-4 leading-relaxed">
                      Foundational mastery in English language, Mathematics, General Sciences, Urdu,
                      Islamiyat, and Computer Applications with interactive projects.
                    </p>
                  </div>
                  <Link
                    href="/programs/primary-middle"
                    className="text-sm font-bold text-school-navy hover:text-school-navy-light inline-flex items-center space-x-1"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>

              {/* High School */}
              <div className="bg-white rounded-2xl overflow-hidden border border-school-border shadow-sm hover:shadow-lg transition-all flex flex-col">
                <div className="relative h-48 w-full bg-slate-100">
                  <Image
                    src="/images/programs/high-school.png"
                    alt="High School Program"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-school-gold text-school-navy-deep text-xs font-bold px-2.5 py-1 rounded-md">
                    Classes 9 & 10 (Matric)
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-school-navy mb-2">High School (Matric)</h3>
                    <p className="text-sm text-school-muted mb-4 leading-relaxed">
                      Focused board exam preparation in Science (Biology/Chemistry/Physics) and Computer Science
                      groups with advanced laboratories and revision test series.
                    </p>
                  </div>
                  <Link
                    href="/programs/high-school"
                    className="text-sm font-bold text-school-navy hover:text-school-navy-light inline-flex items-center space-x-1"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Admission CTA & Campuses Banner */}
        <section className="py-16 bg-school-navy text-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="bg-school-navy-deep/80 border border-school-gold/40 rounded-3xl p-8 sm:p-12 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="space-y-4 max-w-2xl text-center lg:text-left">
                <span className="text-xs font-bold uppercase tracking-wider text-school-gold bg-school-gold/10 px-3 py-1 rounded-full border border-school-gold/30">
                  Admissions Open Academic Year 2025-26
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                  Join Lahore Elite School Today
                </h2>
                <p className="text-sm sm:text-base text-slate-300">
                  Give your child the foundation for a lifetime of distinction and ethical success. Visit
                  our campus office or complete our online admission inquiry form.
                </p>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-300 pt-2">
                  <span className="flex items-center space-x-1.5">
                    <MapPin className="w-4 h-4 text-school-gold" />
                    <span>Al-Nisa Campus (Multan Road)</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center space-x-1.5">
                    <MapPin className="w-4 h-4 text-school-gold" />
                    <span>Sabzazar Campus (Multan Road)</span>
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
                <Link
                  href="/admission/admission-process"
                  className="px-6 py-3.5 rounded-lg bg-school-gold text-school-navy-deep font-bold text-sm sm:text-base hover:bg-school-gold-warm transition-all shadow-lg flex items-center space-x-2"
                >
                  <GraduationCap className="w-5 h-5" />
                  <span>Apply for Admission</span>
                </Link>

                <a
                  href="https://wa.me/923004279059"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold text-sm sm:text-base border border-white/20 transition-all flex items-center space-x-2"
                >
                  <PhoneCall className="w-4 h-4 text-school-gold" />
                  <span>0300-4279059</span>
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
