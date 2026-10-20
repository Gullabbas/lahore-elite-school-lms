"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Printer, Download, Sparkles, QrCode, ShieldCheck, Check } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface StudentOption {
  id: string;
  admissionNo: string;
  fullName: string;
  fatherName: string;
  class: { name: string };
  section: { name: string };
  campus: { name: string };
  dob: string;
}

interface Props {
  students: StudentOption[];
  preselectedStudentId?: string;
}

export default function IdCardGenerator({ students, preselectedStudentId }: Props) {
  const [selectedStudentId, setSelectedStudentId] = useState(
    preselectedStudentId || students[0]?.id || ""
  );
  const [theme, setTheme] = useState<"navy-gold" | "royal-navy" | "gold-heritage">("navy-gold");
  const [cardTitle, setCardTitle] = useState("STUDENT IDENTITY CARD");
  const [issueDate, setIssueDate] = useState("2025-04-01");
  const [validUntil, setValidUntil] = useState("2026-03-31");

  const student = students.find((s) => s.id === selectedStudentId) || students[0];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-school-border shadow-sm no-print">
        <div>
          <span className="text-xs font-bold text-school-navy bg-school-gold-light px-2.5 py-1 rounded">
            Official Document Studio
          </span>
          <h1 className="text-xl font-bold text-school-navy mt-1">Student ID Card Generator</h1>
          <p className="text-xs text-school-muted">
            Standard CR80 dimensions (85.6mm × 53.98mm). Print ready for PVC or laminated card printing.
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="px-5 py-2.5 rounded-lg bg-school-navy text-white text-xs font-bold hover:bg-school-navy-light flex items-center space-x-2 transition-all shadow-md"
        >
          <Printer className="w-4 h-4 text-school-gold" />
          <span>Print Physical ID Card</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Settings Panel */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-school-border shadow-sm space-y-5 no-print">
          <h2 className="text-sm font-bold text-school-navy border-b pb-2">Configure ID Card</h2>

          <div className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-school-navy block mb-1">Select Student</label>
              <select
                value={selectedStudentId}
                onChange={(e) => setSelectedStudentId(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-school-border text-xs bg-white text-school-text font-medium"
              >
                {students.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.admissionNo} - {s.fullName} ({s.class.name})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-bold text-school-navy block mb-1">Color Theme Preset</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setTheme("navy-gold")}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    theme === "navy-gold"
                      ? "border-school-navy bg-school-navy text-white font-bold"
                      : "border-slate-200 text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  Navy & Gold
                </button>
                <button
                  type="button"
                  onClick={() => setTheme("royal-navy")}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    theme === "royal-navy"
                      ? "border-school-navy-deep bg-school-navy-deep text-white font-bold"
                      : "border-slate-200 text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  Royal Deep
                </button>
                <button
                  type="button"
                  onClick={() => setTheme("gold-heritage")}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    theme === "gold-heritage"
                      ? "border-amber-400 bg-amber-50 text-school-navy font-bold"
                      : "border-slate-200 text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  Warm Gold
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-school-navy block mb-1">Issue Date</label>
                <input
                  type="date"
                  value={issueDate}
                  onChange={(e) => setIssueDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-school-border"
                />
              </div>
              <div>
                <label className="font-bold text-school-navy block mb-1">Valid Until</label>
                <input
                  type="date"
                  value={validUntil}
                  onChange={(e) => setValidUntil(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-school-border"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-school-navy block mb-1">Card Header Title</label>
              <input
                type="text"
                value={cardTitle}
                onChange={(e) => setCardTitle(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-school-border"
              />
            </div>
          </div>
        </div>

        {/* Right Live Preview Panel */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-slate-100 p-8 rounded-2xl border border-school-border flex flex-col items-center justify-center">
            <span className="text-[11px] font-bold text-school-muted uppercase tracking-wider mb-4 no-print">
              Live Card Print Preview (Actual CR80 Scale)
            </span>

            {/* CR80 Card Front (85.6mm x 53.98mm - approx 330px x 210px in CSS) */}
            <div
              id="id-card-element"
              className={`id-card-print relative w-[340px] h-[215px] rounded-2xl shadow-xl overflow-hidden border-2 flex flex-col justify-between text-school-text transition-all ${
                theme === "navy-gold"
                  ? "bg-white border-school-gold"
                  : theme === "royal-navy"
                  ? "bg-white border-school-navy"
                  : "bg-[#fffdf2] border-amber-400"
              }`}
            >
              {/* Header Bar */}
              <div
                className={`px-3 py-2 flex items-center justify-between text-white ${
                  theme === "navy-gold"
                    ? "bg-school-navy"
                    : theme === "royal-navy"
                    ? "bg-school-navy-deep"
                    : "bg-[#091A4A]"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden bg-white p-0.5 shrink-0 border border-school-gold">
                    <Image
                      src="/images/brand/logo.png"
                      alt="Logo"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-[11px] font-black tracking-tight leading-tight uppercase text-white">
                      Lahore Elite School
                    </h3>
                    <span className="text-[8px] font-bold text-school-gold uppercase tracking-wider block">
                      {cardTitle}
                    </span>
                  </div>
                </div>

                <div className="text-right text-[8px] text-slate-300">
                  <span className="font-semibold block">{student?.campus.name}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="px-3 py-2 flex items-center space-x-3 flex-1">
                {/* Photo Placeholder */}
                <div className="w-20 h-24 rounded-lg bg-slate-200 border-2 border-school-border overflow-hidden relative shrink-0 flex items-center justify-center">
                  <div className="text-center text-slate-400">
                    <span className="text-[22px] font-black text-school-navy">
                      {student?.fullName.charAt(0)}
                    </span>
                    <span className="text-[7px] block font-bold text-slate-500 uppercase mt-0.5">
                      Student
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-1 text-[9px] flex-1 leading-tight text-slate-800">
                  <div>
                    <span className="text-slate-500 block text-[8px]">Student Name:</span>
                    <strong className="text-[11px] text-school-navy font-black block truncate">
                      {student?.fullName}
                    </strong>
                  </div>

                  <div>
                    <span className="text-slate-500 block text-[8px]">Father&apos;s Name:</span>
                    <span className="font-semibold text-slate-700 truncate block">
                      {student?.fatherName}
                    </span>
                  </div>

                  <div className="flex justify-between pt-0.5">
                    <div>
                      <span className="text-slate-500 block text-[7px]">Admission No:</span>
                      <span className="font-mono font-bold text-school-navy text-[10px]">
                        {student?.admissionNo}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[7px]">Class:</span>
                      <span className="font-bold text-school-navy">
                        {student?.class.name} - {student?.section.name}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between pt-0.5 text-[8px] text-slate-600">
                    <span>Valid: <strong>{formatDate(validUntil)}</strong></span>
                  </div>
                </div>
              </div>

              {/* Bottom Security Strip */}
              <div className="bg-slate-100 px-3 py-1.5 border-t border-slate-200 flex items-center justify-between text-[7px] text-slate-500">
                <span className="truncate">Campus Mobile: 0300-4279059</span>
                <span className="font-bold text-school-navy border-b border-school-navy uppercase tracking-wider">
                  Authorized Signature
                </span>
              </div>
            </div>

            <p className="text-[10px] text-school-muted mt-4 text-center max-w-sm no-print">
              * The printed card maintains exact physical dimensions (3.375&quot; × 2.125&quot;). Print on cardstock or direct card printers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
