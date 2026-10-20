import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatDate, formatPKR } from "@/lib/utils";
import { FileCheck2, Search, Eye, CreditCard, Award, Receipt } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDocumentsPage() {
  const students = await prisma.student.findMany({
    include: {
      class: true,
      section: true,
      campus: true,
      feeVouchers: true,
      examResults: true,
      certificates: true,
    },
    orderBy: { admissionNo: "asc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-school-border shadow-sm">
        <div>
          <span className="text-xs font-bold text-school-navy bg-school-gold-light px-2.5 py-1 rounded">
            Student Dossiers
          </span>
          <h1 className="text-xl font-bold text-school-navy mt-1">Student Academic Records & Dossiers</h1>
          <p className="text-xs text-school-muted">
            Centralized document hub tracking enrollment files, exam transcripts, fee records, and certificates.
          </p>
        </div>

        <Link
          href="/admin/id-cards"
          className="px-4 py-2 rounded-lg bg-school-navy text-white text-xs font-bold hover:bg-school-navy-light flex items-center space-x-1.5 shadow"
        >
          <CreditCard className="w-3.5 h-3.5 text-school-gold" />
          <span>ID Card Studio</span>
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-school-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 font-bold text-school-navy border-b">
              <tr>
                <th className="py-3 px-4">Adm No</th>
                <th className="py-3 px-4">Student Name</th>
                <th className="py-3 px-4">Class & Campus</th>
                <th className="py-3 px-4">Fee Vouchers</th>
                <th className="py-3 px-4">Exam Transcripts</th>
                <th className="py-3 px-4">Certificates</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-school-border text-school-text">
              {students.map((st) => (
                <tr key={st.id} className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-mono font-bold text-school-navy">{st.admissionNo}</td>
                  <td className="py-3 px-4 font-bold text-school-navy">{st.fullName}</td>
                  <td className="py-3 px-4 text-school-muted">
                    {st.class.name} ({st.section.name}) • {st.campus.name}
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-semibold text-school-navy">
                      {st.feeVouchers.length} issued
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-semibold text-school-navy">
                      {st.examResults.length} marks recorded
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-semibold text-emerald-700">
                      {st.certificates.length} certificates
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Link
                      href={`/admin/students/${st.id}`}
                      className="px-3 py-1 rounded bg-slate-100 hover:bg-school-navy hover:text-white font-bold text-[11px] transition-colors inline-block"
                    >
                      View Dossier
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
