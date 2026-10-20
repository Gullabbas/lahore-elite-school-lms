"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

const defaultFaqs: FAQItem[] = [
  {
    id: "1",
    category: "Admissions",
    question: "What is the admission procedure at Lahore Elite School?",
    answer:
      "Parents can submit an admission inquiry online or visit either Al-Nisa or Sabzazar Campus. An entry evaluation interview is scheduled, followed by verification of B-Form and birth certificate, upon which the official admission fee voucher is issued.",
  },
  {
    id: "2",
    category: "Admissions",
    question: "What documents are required for admission confirmation?",
    answer:
      "Required documents include NADRA Computerized B-Form copy, Father/Guardian CNIC copy, 3 passport-sized student photographs with blue background, and previous school leaving certificate (for Class 1 to 10 admissions).",
  },
  {
    id: "3",
    category: "Fee Payments",
    question: "When are monthly school fees due, and what are the payment modes?",
    answer:
      "Fee vouchers are issued on the 1st of every month and are due by the 10th. Payments can be deposited in cash at the campus accounts counter or through direct online bank transfer to the school's designated bank account.",
  },
  {
    id: "4",
    category: "Fee Payments",
    question: "Does Lahore Elite School offer sibling discounts or scholarships?",
    answer:
      "Yes! We offer a 10% tuition concession for the 2nd sibling and 15% for the 3rd sibling. We also offer merit-based academic scholarships for top position-holders scoring 90%+ in annual examinations.",
  },
  {
    id: "5",
    category: "Uniform",
    question: "Where can authorized school uniforms and crests be obtained?",
    answer:
      "Official school uniforms, neckties, belts, and embroidered blazers can be procured from authorized school uniform retailers located on Multan Road near both campuses.",
  },
  {
    id: "6",
    category: "Academic",
    question: "Which educational board does Lahore Elite School follow for Matric?",
    answer:
      "Our secondary school section follows the Board of Intermediate and Secondary Education (BISE) Lahore curriculum for Class 9 and 10 examinations in both Science (Biology) and Computer Science groups.",
  },
  {
    id: "7",
    category: "Attendance",
    question: "What is the mandatory attendance policy for board examination eligibility?",
    answer:
      "Students must maintain at least 75% attendance throughout the academic session. Attendance dropping below 65% results in an administrative warning and parental review meeting.",
  },
  {
    id: "8",
    category: "Campus & Safety",
    question: "What security measures are in place across campuses?",
    answer:
      "Both Al-Nisa and Sabzazar Campuses maintain 24/7 armed security guards, complete CCTV video surveillance, gated visitor check-ins, and emergency evacuation protocols.",
  },
];

const categories = ["All", "Admissions", "Fee Payments", "Academic", "Uniform", "Attendance", "Campus & Safety"];

export default function FaqAccordion() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [openId, setOpenId] = useState<string | null>("1");

  const filteredFaqs =
    selectedCategory === "All"
      ? defaultFaqs
      : defaultFaqs.filter((f) => f.category.toLowerCase() === selectedCategory.toLowerCase());

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="space-y-6">
      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              selectedCategory === cat
                ? "bg-school-navy text-white shadow"
                : "bg-white text-school-muted hover:text-school-navy border border-school-border"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Accordion Items */}
      <div className="space-y-3 max-w-4xl mx-auto">
        {filteredFaqs.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div
              key={faq.id}
              className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen ? "border-school-gold shadow-md" : "border-school-border shadow-sm hover:border-slate-300"
              }`}
            >
              <button
                onClick={() => toggle(faq.id)}
                className="w-full p-5 text-left flex items-center justify-between space-x-4"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-[10px] font-bold text-school-navy bg-school-gold-light px-2.5 py-0.5 rounded uppercase shrink-0">
                    {faq.category}
                  </span>
                  <span className="font-bold text-school-navy text-sm sm:text-base">
                    {faq.question}
                  </span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-school-navy shrink-0 transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-school-muted leading-relaxed border-t border-slate-100">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
