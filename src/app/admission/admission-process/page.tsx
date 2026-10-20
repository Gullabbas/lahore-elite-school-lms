import React from "react";
import Link from "next/link";
import PublicHeader from "@/components/layout/PublicHeader";
import PublicFooter from "@/components/layout/PublicFooter";
import AdmissionForm from "@/components/forms/AdmissionForm";
import {
  FileText,
  UserCheck,
  CalendarCheck,
  CheckCircle,
  CreditCard,
  Phone,
  FileCheck,
} from "lucide-react";

export const metadata = {
  title: "Admission Process | Lahore Elite School",
  description:
    "Step-by-step admission roadmap, required documents, and online application form for Lahore Elite School.",
};

const steps = [
  {
    step: 1,
    title: "Submit Admission Inquiry / Form",
    desc: "Complete our online admission form or obtain the admission prospectus directly from our Al-Nisa or Sabzazar campus office.",
    icon: FileText,
  },
  {
    step: 2,
    title: "Submit Required Documents",
    desc: "Provide copies of child's NADRA B-Form, Father/Guardian CNIC, 3 passport-sized photographs, and previous school leaving certificate.",
    icon: FileCheck,
  },
  {
    step: 3,
    title: "Diagnostic Assessment / Interview",
    desc: "A brief, welcoming assessment evaluates the student's foundation in English, Mathematics, and Urdu to determine appropriate class placement.",
    icon: UserCheck,
  },
  {
    step: 4,
    title: "Admission Confirmation",
    desc: "Upon successful assessment, the school issues an official Admission Offer Letter along with the verified fee voucher.",
    icon: CheckCircle,
  },
  {
    step: 5,
    title: "Registration & Fee Deposit",
    desc: "Deposit the admission fee voucher at the campus accounts counter or online to finalize the student's official LMS enrollment.",
    icon: CreditCard,
  },
];

export default function AdmissionProcessPage() {
  return (
    <>
      <PublicHeader />

      <main className="flex-1 bg-school-bg py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-school-navy bg-school-gold-light px-3 py-1 rounded-full border border-school-gold/30">
              Admission Guidelines 2025-26
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-school-navy">
              Simple 5-Step Admission Process
            </h1>
            <p className="text-sm sm:text-base text-school-muted">
              We have designed a transparent, student-friendly admission journey to welcome your child into our school family.
            </p>
          </div>

          {/* 5-Step Roadmap */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {steps.map((s) => {
              const IconComp = s.icon;
              return (
                <div
                  key={s.step}
                  className="bg-white rounded-2xl p-6 border border-school-border shadow-sm flex flex-col justify-between hover:border-school-gold transition-all"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="w-8 h-8 rounded-full bg-school-gold text-school-navy-deep font-extrabold flex items-center justify-center text-sm">
                        {s.step}
                      </span>
                      <IconComp className="w-5 h-5 text-school-navy" />
                    </div>
                    <h3 className="font-bold text-school-navy text-sm sm:text-base leading-snug">
                      {s.title}
                    </h3>
                    <p className="text-xs text-school-muted leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Two-Column Section: Documents Checklist & Interactive Form */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Required Documents Checklist */}
            <div className="lg:col-span-5 bg-white rounded-2xl p-7 border border-school-border shadow-sm space-y-6">
              <h2 className="text-xl font-bold text-school-navy border-b pb-3">
                Required Documentation Checklist
              </h2>
              <ul className="space-y-3 text-sm text-school-text">
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-4 h-4 text-school-success shrink-0 mt-0.5" />
                  <span>NADRA Birth Certificate or Computerized B-Form copy</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-4 h-4 text-school-success shrink-0 mt-0.5" />
                  <span>Father / Mother / Guardian CNIC copy</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-4 h-4 text-school-success shrink-0 mt-0.5" />
                  <span>3 recent passport-size student photographs with blue background</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-4 h-4 text-school-success shrink-0 mt-0.5" />
                  <span>Original School Leaving Certificate (SLC) for Class 1 to Class 10</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-4 h-4 text-school-success shrink-0 mt-0.5" />
                  <span>Previous school progress report card / examination sheet</span>
                </li>
              </ul>

              <div className="p-4 rounded-xl bg-school-gold-light border border-school-gold/40 text-xs text-school-navy space-y-1">
                <strong>Need Assistance?</strong>
                <p>
                  Our admission coordinators are available on-campus Monday through Saturday from 8:00 AM to 2:00 PM.
                </p>
                <div className="pt-2">
                  <a
                    href="https://wa.me/923004279059"
                    className="font-bold underline text-school-navy inline-flex items-center space-x-1"
                  >
                    <Phone className="w-3 h-3" />
                    <span>WhatsApp Inquiry: 0300-4279059</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Online Admission Application Form */}
            <div id="apply" className="lg:col-span-7 bg-white rounded-2xl p-7 border border-school-border shadow-md space-y-5">
              <div className="border-b pb-3">
                <h2 className="text-xl font-bold text-school-navy">Online Admission Application Form</h2>
                <p className="text-xs text-school-muted">
                  Fill in your details below. Your submission will be recorded instantly in our Admissions Registry.
                </p>
              </div>

              <AdmissionForm />
            </div>
          </div>
        </div>
      </main>

      <PublicFooter />
    </>
  );
}
