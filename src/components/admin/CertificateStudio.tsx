"use client";

import React, { useState } from "react";
import Image from "next/image";
import { formatDate } from "@/lib/utils";
import PrintButton from "@/components/ui/PrintButton";
import { Award, Plus, Printer, Sparkles, Check, FileCheck } from "lucide-react";

interface CertificateRecord {
  id: string;
  certificateNo: string;
  recipientName: string;
  templateType: string;
  title: string;
  description: string;
  issueDate: string;
  signatory: string;
}

interface StudentOption {
  id: string;
  fullName: string;
  admissionNo: string;
  class: { name: string };
}

interface Props {
  initialCertificates: CertificateRecord[];
  students: StudentOption[];
}

export default function CertificateStudio({ initialCertificates, students }: Props) {
  const [certificates, setCertificates] = useState<CertificateRecord[]>(initialCertificates);

  // Form State for Active Certificate
  const [recipientName, setRecipientName] = useState(
    students[0]?.fullName || "Muhammad Ali Raza"
  );
  const [studentId, setStudentId] = useState(students[0]?.id || "");
  const [templateType, setTemplateType] = useState("ACADEMIC_EXCELLENCE");
  const [title, setTitle] = useState("Certificate of Academic Excellence");
  const [description, setDescription] = useState(
    "For securing 1st Position with High Distinction in Class 9 Annual Examinations, demonstrating exemplary commitment and intellectual rigor."
  );
  const [certificateNo, setCertificateNo] = useState("LES-CERT-2025-001");
  const [signatory, setSignatory] = useState("Principal & Founder, Lahore Elite School");
  const [saving, setSaving] = useState(false);

  const handleTemplateChange = (type: string) => {
    setTemplateType(type);
    if (type === "ACADEMIC_EXCELLENCE") {
      setTitle("Certificate of Academic Excellence");
      setDescription("For securing top position and extraordinary merit in school examinations, demonstrating exemplary academic discipline.");
    } else if (type === "ACHIEVEMENT") {
      setTitle("Certificate of Outstanding Achievement");
      setDescription("Awarded in recognition of exceptional performance, intellectual creativity, and remarkable accomplishments.");
    } else if (type === "CHARACTER") {
      setTitle("Certificate of Character & Moral Leadership");
      setDescription("Presented for demonstrating outstanding integrity, humility, helpfulness, and moral leadership within the student body.");
    } else if (type === "PARTICIPATION") {
      setTitle("Certificate of Active Participation");
      setDescription("Awarded for commendable enthusiasm and enthusiastic contribution during the Annual Science & Extracurricular Gala.");
    }
  };

  const handleIssueCertificate = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/certificates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipientName,
          studentId,
          templateType,
          title,
          description,
          signatory,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error("Failed to issue certificate");

      setCertificateNo(data.certificate.certificateNo);

      const fetchRes = await fetch("/api/certificates");
      const fetchData = await fetchRes.json();
      if (fetchData.certificates) setCertificates(fetchData.certificates);

      alert(`Certificate ${data.certificate.certificateNo} issued successfully!`);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-school-border shadow-sm no-print">
        <div>
          <span className="text-xs font-bold text-school-navy bg-school-gold-light px-2.5 py-1 rounded">
            Official Document Studio
          </span>
          <h1 className="text-xl font-bold text-school-navy mt-1">School Certificate Generator</h1>
          <p className="text-xs text-school-muted">
            Issue and print high-resolution certificates of excellence, character, participation, and staff merit.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleIssueCertificate}
            disabled={saving}
            className="px-4 py-2 rounded-lg bg-school-gold text-school-navy-deep text-xs font-bold hover:bg-school-gold-warm shadow transition-all flex items-center space-x-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Save & Issue Certificate</span>
          </button>
          <PrintButton label="Print Certificate (A4)" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Config Panel */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-school-border shadow-sm space-y-4 no-print text-xs">
          <h2 className="font-bold text-school-navy text-sm border-b pb-2">Certificate Settings</h2>

          <div>
            <label className="font-bold text-school-navy block mb-1">Select Enrolled Student</label>
            <select
              value={studentId}
              onChange={(e) => {
                const sId = e.target.value;
                setStudentId(sId);
                const s = students.find((st) => st.id === sId);
                if (s) setRecipientName(s.fullName);
              }}
              className="w-full px-3 py-2 rounded-lg border border-school-border bg-white text-xs"
            >
              {students.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.admissionNo} - {s.fullName} ({s.class.name})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-bold text-school-navy block mb-1">Recipient Name (As printed)</label>
            <input
              type="text"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-school-border text-xs font-bold"
            />
          </div>

          <div>
            <label className="font-bold text-school-navy block mb-1">Certificate Template Type</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { type: "ACADEMIC_EXCELLENCE", label: "Academic Excellence" },
                { type: "ACHIEVEMENT", label: "Achievement Award" },
                { type: "CHARACTER", label: "Character & Morals" },
                { type: "PARTICIPATION", label: "Participation Gala" },
              ].map((t) => (
                <button
                  key={t.type}
                  type="button"
                  onClick={() => handleTemplateChange(t.type)}
                  className={`p-2 rounded-lg border text-left text-[11px] font-semibold transition-all ${
                    templateType === t.type
                      ? "bg-school-navy text-white border-school-navy font-bold"
                      : "border-slate-200 text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="font-bold text-school-navy block mb-1">Certificate Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-school-border text-xs font-bold"
            />
          </div>

          <div>
            <label className="font-bold text-school-navy block mb-1">Citation / Citation Statement</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-school-border text-xs"
            />
          </div>

          <div>
            <label className="font-bold text-school-navy block mb-1">Authorized Signatory</label>
            <input
              type="text"
              value={signatory}
              onChange={(e) => setSignatory(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-school-border text-xs"
            />
          </div>
        </div>

        {/* Right Live A4 Certificate Preview */}
        <div className="lg:col-span-7">
          <div className="printable-document bg-gradient-to-br from-[#fffdf5] via-white to-[#fffcf0] p-10 rounded-2xl border-8 border-double border-school-gold shadow-2xl relative overflow-hidden text-center text-school-navy flex flex-col justify-between min-h-[520px]">
            {/* Subtle Watermark */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
              <div className="relative w-96 h-96">
                <Image src="/images/brand/logo.png" alt="Watermark" fill className="object-contain" />
              </div>
            </div>

            {/* Certificate Header */}
            <div className="space-y-3 relative z-10">
              <div className="flex justify-center">
                <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-school-gold bg-white p-1 shadow-md">
                  <Image src="/images/brand/logo.png" alt="Logo" fill className="object-contain" />
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-black uppercase tracking-widest text-school-navy font-serif">
                  Lahore Elite School
                </h2>
                <span className="text-[11px] font-bold text-school-gold-warm uppercase tracking-widest block mt-0.5">
                  Excellence in Modern Education • Lahore, Pakistan
                </span>
              </div>
            </div>

            {/* Certificate Body */}
            <div className="my-6 space-y-4 relative z-10">
              <h3 className="text-xl sm:text-2xl font-bold font-serif text-school-navy uppercase tracking-wider underline decoration-school-gold decoration-2 underline-offset-8">
                {title}
              </h3>

              <p className="text-xs text-school-muted uppercase tracking-widest pt-2">
                This honor is proudly presented to
              </p>

              <div className="text-2xl sm:text-3xl font-extrabold text-school-navy font-serif tracking-tight py-1 border-b border-school-gold/60 max-w-md mx-auto">
                {recipientName}
              </div>

              <p className="text-xs sm:text-sm text-slate-700 italic max-w-lg mx-auto leading-relaxed pt-1">
                &ldquo;{description}&rdquo;
              </p>
            </div>

            {/* Certificate Footer */}
            <div className="pt-8 border-t border-school-gold/40 grid grid-cols-2 items-end relative z-10 text-xs">
              <div className="text-left">
                <span className="font-mono text-[10px] text-school-muted block">
                  Ref: {certificateNo}
                </span>
                <span className="font-semibold text-slate-700 block text-[11px]">
                  Date: {formatDate(new Date())}
                </span>
              </div>

              <div className="text-right">
                <div className="border-t border-school-navy inline-block pt-1 min-w-[180px] text-center">
                  <span className="font-bold text-school-navy block text-xs">{signatory}</span>
                  <span className="text-[9px] text-school-muted block">Authorized Signatory</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
