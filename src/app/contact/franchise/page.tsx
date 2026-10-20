import React from "react";
import PublicHeader from "@/components/layout/PublicHeader";
import PublicFooter from "@/components/layout/PublicFooter";
import FranchiseForm from "@/components/forms/FranchiseForm";
import { Building2, Award, ShieldCheck, CheckCircle2, TrendingUp } from "lucide-react";

export const metadata = {
  title: "Franchise Partnership Request | Lahore Elite School",
  description:
    "Partner with Lahore Elite School to open a premier educational campus in your city or locality.",
};

export default function FranchisePage() {
  return (
    <>
      <PublicHeader />

      <main className="flex-1 bg-school-bg py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-school-navy bg-school-gold-light px-3 py-1 rounded-full border border-school-gold/30">
              Institutional Growth
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-school-navy">
              Lahore Elite School Franchise Partnership
            </h1>
            <p className="text-sm sm:text-base text-school-muted">
              Join hands with a respected Pakistani school brand. Benefit from our proven pedagogical model,
              integrated LMS infrastructure, centralized curriculum, and continuous teacher training.
            </p>
          </div>

          {/* Value Props */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-school-border shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-school-gold-light text-school-navy flex items-center justify-center">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-school-navy text-lg">Turnkey School System</h3>
              <p className="text-xs text-school-muted leading-relaxed">
                Standardized curriculum, textbook lists, lesson plans, examination papers, and digital assessment schemes.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-school-border shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-school-gold-light text-school-navy flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-school-navy text-lg">Integrated LMS & ERP</h3>
              <p className="text-xs text-school-muted leading-relaxed">
                Access to complete student attendance, fee voucher generator, digital report cards, and parent communication tools.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-school-border shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-school-gold-light text-school-navy flex items-center justify-center">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-school-navy text-lg">Staff Training & Audits</h3>
              <p className="text-xs text-school-muted leading-relaxed">
                Regular professional development workshops for your teachers and annual quality assurance campus reviews.
              </p>
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-3xl p-7 sm:p-10 border border-school-border shadow-md max-w-4xl mx-auto space-y-6">
            <div className="border-b pb-4">
              <h2 className="text-2xl font-bold text-school-navy">Submit a Franchise Inquiry</h2>
              <p className="text-xs text-school-muted">
                Provide preliminary details regarding your proposed campus location, financial viability, and facilities.
              </p>
            </div>

            <FranchiseForm />
          </div>
        </div>
      </main>

      <PublicFooter />
    </>
  );
}
