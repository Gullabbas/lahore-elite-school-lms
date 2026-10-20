import React from "react";
import Link from "next/link";
import PublicHeader from "@/components/layout/PublicHeader";
import PublicFooter from "@/components/layout/PublicFooter";
import { formatPKR } from "@/lib/utils";
import { CheckCircle2, AlertCircle, Sparkles, Download, Phone } from "lucide-react";

export const metadata = {
  title: "Fee Structure | Lahore Elite School",
  description:
    "Official fee structure for Lahore Elite School for Academic Session 2025-2026 across Playgroup, Primary, Middle, and High School classes.",
};

const feeData = [
  { class: "Playgroup & Nursery", admission: 8000, security: 3000, tuition: 5000, charges: 500 },
  { class: "Prep", admission: 8000, security: 3000, tuition: 5200, charges: 500 },
  { class: "Class 1 - Class 3", admission: 10000, security: 3000, tuition: 5500, charges: 600 },
  { class: "Class 4 - Class 5", admission: 10000, security: 3000, tuition: 5800, charges: 600 },
  { class: "Class 6 - Class 8", admission: 12000, security: 4000, tuition: 6200, charges: 800 },
  { class: "Class 9 (Science / CS)", admission: 14000, security: 5000, tuition: 6800, charges: 1000 },
  { class: "Class 10 (Science / CS)", admission: 14000, security: 5000, tuition: 7000, charges: 1000 },
];

export default function FeeStructurePage() {
  return (
    <>
      <PublicHeader />

      <main className="flex-1 bg-school-bg py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-school-navy bg-school-gold-light px-3 py-1 rounded-full border border-school-gold/30">
              Transparent & Affordable
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-school-navy">
              Academic Fee Structure (2025 - 2026)
            </h1>
            <p className="text-sm sm:text-base text-school-muted">
              All fees are charged in Pakistani Rupees (PKR) and are applicable to both Al-Nisa and Sabzazar Campuses.
            </p>
          </div>

          {/* Fee Table */}
          <div className="bg-white rounded-2xl border border-school-border shadow-md overflow-hidden">
            <div className="p-6 bg-school-navy text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold">Class-Wise Tuition & Admission Schedule</h2>
                <p className="text-xs text-school-gold">Currency: Pakistani Rupees (PKR ₨)</p>
              </div>
              <Link
                href="/admission/admission-process"
                className="px-4 py-2 bg-school-gold text-school-navy-deep font-bold text-xs rounded-lg hover:bg-school-gold-warm transition-colors"
              >
                Apply Online
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-school-navy font-bold border-b border-school-border">
                  <tr>
                    <th className="py-4 px-6">Class Tier</th>
                    <th className="py-4 px-6">Admission Fee (One-Time)</th>
                    <th className="py-4 px-6">Security (Refundable)</th>
                    <th className="py-4 px-6">Monthly Tuition</th>
                    <th className="py-4 px-6">Exam & Lab Charges</th>
                    <th className="py-4 px-6 font-extrabold text-school-navy bg-school-gold-light/50">
                      Total at Admission
                    </th>
                    <th className="py-4 px-6 font-extrabold text-school-navy bg-school-gold-light/80">
                      Recurring Monthly
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-school-border text-school-text">
                  {feeData.map((row, idx) => {
                    const totalAtAdmission = row.admission + row.security + row.tuition + row.charges;
                    const recurringMonthly = row.tuition + row.charges;
                    return (
                      <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-4 px-6 font-semibold text-school-navy">{row.class}</td>
                        <td className="py-4 px-6">{formatPKR(row.admission)}</td>
                        <td className="py-4 px-6">{formatPKR(row.security)}</td>
                        <td className="py-4 px-6 font-medium">{formatPKR(row.tuition)}</td>
                        <td className="py-4 px-6">{formatPKR(row.charges)}</td>
                        <td className="py-4 px-6 font-bold text-school-navy bg-school-gold-light/30">
                          {formatPKR(totalAtAdmission)}
                        </td>
                        <td className="py-4 px-6 font-extrabold text-school-navy bg-school-gold-light/60">
                          {formatPKR(recurringMonthly)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Note & Policy Footer */}
            <div className="p-6 bg-slate-50 border-t border-school-border space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-school-muted">
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-school-success shrink-0 mt-0.5" />
                  <span>
                    <strong>Sibling Concession:</strong> A 10% discount is applied to the tuition fee of the 2nd child,
                    and 15% for the 3rd child enrolled concurrently.
                  </span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-school-success shrink-0 mt-0.5" />
                  <span>
                    <strong>Merit Scholarship:</strong> Students scoring 90%+ in annual board/school examinations are
                    eligible for full or partial tuition concessions.
                  </span>
                </div>
                <div className="flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 text-school-warning shrink-0 mt-0.5" />
                  <span>
                    <strong>Due Date & Late Fee:</strong> Monthly fees are payable by the 10th of every month. A nominal
                    late fee of PKR 200 is charged after the due date.
                  </span>
                </div>
                <div className="flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 text-school-warning shrink-0 mt-0.5" />
                  <span>
                    <strong>Payment Methods:</strong> Vouchers can be deposited at the campus accounts counter in cash or
                    via direct online bank transfer to the school account.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Box */}
          <div className="bg-white rounded-2xl p-6 border border-school-border shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-school-navy">Have Questions About Financial Assistance?</h3>
              <p className="text-xs text-school-muted">
                Speak directly with our Accounts & Admission Office at Al-Nisa or Sabzazar Campus.
              </p>
            </div>
            <a
              href="https://wa.me/923004279059"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-lg bg-school-navy text-white text-xs font-bold hover:bg-school-navy-light transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-school-gold" />
              <span>WhatsApp Accounts Office: 0300-4279059</span>
            </a>
          </div>
        </div>
      </main>

      <PublicFooter />
    </>
  );
}
