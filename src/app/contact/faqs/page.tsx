import React from "react";
import PublicHeader from "@/components/layout/PublicHeader";
import PublicFooter from "@/components/layout/PublicFooter";
import FaqAccordion from "@/components/faqs/FaqAccordion";

export const metadata = {
  title: "Frequently Asked Questions (FAQs) | Lahore Elite School",
  description:
    "Find answers to frequently asked questions about admissions, fees, curricula, uniforms, and school policies at Lahore Elite School.",
};

export default function FaqsPage() {
  return (
    <>
      <PublicHeader />

      <main className="flex-1 bg-school-bg py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-school-navy bg-school-gold-light px-3 py-1 rounded-full border border-school-gold/30">
              Clear Guidance
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-school-navy">
              Frequently Asked Questions (FAQs)
            </h1>
            <p className="text-sm sm:text-base text-school-muted">
              Everything you need to know about admissions, tuition fees, academics, uniform regulations, and student attendance.
            </p>
          </div>

          <FaqAccordion />
        </div>
      </main>

      <PublicFooter />
    </>
  );
}
