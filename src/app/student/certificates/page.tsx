import React from "react";
import { getStudentContext } from "@/lib/student";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { Award, Printer, Sparkles, CheckCircle2 } from "lucide-react";
import PrintButton from "@/components/ui/PrintButton";

export const dynamic = "force-dynamic";

export default async function StudentCertificatesPage() {
  const student = await getStudentContext();

  if (!student) {
    return (
      <div className="p-8 text-center bg-white rounded-2xl border border-school-border">
        <p className="text-sm text-school-muted">Student profile not found.</p>
      </div>
    );
  }

  // Fetch certificates issued to this student
  const certificates = await prisma.certificate.findMany({
    where: {
      studentId: student.id,
      status: "ISSUED",
    },
    orderBy: { issueDate: "desc" },
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-school-border shadow-sm">
        <div>
          <div className="flex items-center space-x-2 text-school-gold-warm font-bold text-xs uppercase tracking-wider mb-1">
            <Award className="w-4 h-4" />
            <span>Honors &amp; Recognitions</span>
          </div>
          <h1 className="text-2xl font-extrabold text-school-navy">My Official Certificates</h1>
          <p className="text-xs text-school-muted mt-1">
            {student.fullName} ({student.admissionNo}) &bull; Verified Academic &amp; Extracurricular Honors
          </p>
        </div>
        <div className="shrink-0 flex items-center space-x-3">
          <PrintButton label="Print Certificates" />
        </div>
      </div>

      {certificates.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-school-border shadow-sm">
          <Award className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-school-navy">No Certificates Issued Yet</h3>
          <p className="text-xs text-school-muted mt-1">
            Honors and achievement certificates will appear here once officially awarded by the school administration.
          </p>
        </div>
      ) : (
        <div className="space-y-8 printable-document">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="bg-white rounded-3xl border-4 border-double border-school-gold/60 p-8 sm:p-12 shadow-lg relative overflow-hidden text-center"
            >
              {/* Background watermark */}
              <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
                <span className="text-[180px] font-black text-school-navy">LES</span>
              </div>

              {/* Certificate Header */}
              <div className="space-y-2 relative">
                <div className="inline-flex items-center space-x-2 text-[10px] font-extrabold text-school-gold-warm uppercase tracking-widest bg-amber-50 px-4 py-1 rounded-full border border-amber-200">
                  <Sparkles className="w-3.5 h-3.5 text-school-gold-warm" />
                  <span>Lahore Elite School &bull; Certificate of Recognition</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-school-navy tracking-tight font-serif mt-2">
                  {cert.title}
                </h2>
                <p className="text-xs font-mono text-slate-400">
                  Certificate No: <strong className="text-school-navy">{cert.certificateNo}</strong>
                </p>
              </div>

              {/* Recipient */}
              <div className="my-8 relative">
                <p className="text-xs uppercase tracking-widest text-slate-500 font-semibold">
                  This Certificate is Proudly Awarded To
                </p>
                <div className="my-3 inline-block border-b-2 border-school-gold pb-1 px-8">
                  <span className="text-2xl sm:text-3xl font-extrabold text-school-navy font-serif">
                    {cert.recipientName}
                  </span>
                </div>
                <p className="text-xs text-slate-600">
                  Student of Class: <strong className="text-school-navy">{student.class.name} ({student.section.name})</strong> &bull; Roll: <strong className="font-mono text-school-navy">{student.admissionNo}</strong>
                </p>
              </div>

              {/* Citation Body */}
              <div className="max-w-xl mx-auto my-6 text-sm text-slate-700 leading-relaxed relative italic">
                &ldquo;{cert.description}&rdquo;
              </div>

              {/* Signatures */}
              <div className="pt-10 mt-8 grid grid-cols-2 gap-8 text-center text-xs border-t border-slate-200 relative">
                <div>
                  <p className="font-mono text-slate-500 text-[11px] mb-1">
                    Date of Issue: {formatDate(cert.issueDate)}
                  </p>
                  <span className="text-[10px] font-bold text-school-muted uppercase block">Registration Office</span>
                </div>
                <div>
                  <div className="border-t border-slate-700 w-36 mx-auto mb-1" />
                  <span className="font-bold text-school-navy">{cert.signatory}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
