"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { formatPKR, formatDate } from "@/lib/utils";
import PrintButton from "@/components/ui/PrintButton";
import { ArrowLeft, Users, Plus, Check, Printer, Sparkles } from "lucide-react";

interface SiblingItem {
  id: string;
  name: string;
  admissionNo: string;
  class: string;
  tuitionFee: number;
  discount: number;
  charges: number;
}

const mockSiblingsData: SiblingItem[] = [
  { id: "1", name: "Muhammad Ali Raza", admissionNo: "LES-2025-001", class: "Class 9 (Section A)", tuitionFee: 6500, discount: 500, charges: 500 },
  { id: "2", name: "Ayesha Tariq", admissionNo: "LES-2025-002", class: "Class 5 (Section A)", tuitionFee: 5500, discount: 1000, charges: 300 },
  { id: "3", name: "Bilal Tariq", admissionNo: "LES-2025-015", class: "Class 2 (Section B)", tuitionFee: 5000, discount: 1500, charges: 300 },
];

export default function FamilyFeeVoucherPage() {
  const [selectedIds, setSelectedIds] = useState<string[]>(["1", "2"]);
  const [guardianName, setGuardianName] = useState("Tariq Mahmood Raza");
  const [guardianPhone, setGuardianPhone] = useState("0300-4279059");
  const [feeMonth, setFeeMonth] = useState("October 2025");
  const [dueDate, setDueDate] = useState("2025-10-15");

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const selectedChildren = mockSiblingsData.filter((s) => selectedIds.includes(s.id));
  const familyTotalTuition = selectedChildren.reduce((acc, c) => acc + c.tuitionFee, 0);
  const familyTotalDiscounts = selectedChildren.reduce((acc, c) => acc + c.discount, 0);
  const familyTotalCharges = selectedChildren.reduce((acc, c) => acc + c.charges, 0);
  const familyGrandTotal = familyTotalTuition + familyTotalCharges - familyTotalDiscounts;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-school-border shadow-sm no-print">
        <div className="flex items-center space-x-3">
          <Link
            href="/admin/fees"
            className="p-2 rounded-lg border border-school-border hover:bg-slate-50 text-school-muted hover:text-school-navy"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <span className="text-xs font-bold text-school-navy bg-school-gold-light px-2.5 py-0.5 rounded">
              Multi-Sibling Voucher
            </span>
            <h1 className="text-xl font-bold text-school-navy mt-1">Combined Family Fee Voucher</h1>
            <p className="text-xs text-school-muted">
              Bundling multiple siblings under one invoice while preserving individual accounting records.
            </p>
          </div>
        </div>

        <PrintButton label="Print Family Voucher" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Config Panel (Hidden in Print) */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-school-border shadow-sm space-y-5 no-print">
          <h2 className="text-sm font-bold text-school-navy border-b pb-2 flex items-center space-x-1.5">
            <Users className="w-4 h-4 text-school-gold" />
            <span>Select Sibling Scholars</span>
          </h2>

          <div className="space-y-2">
            {mockSiblingsData.map((sib) => {
              const isSelected = selectedIds.includes(sib.id);
              return (
                <div
                  key={sib.id}
                  onClick={() => toggleSelect(sib.id)}
                  className={`p-3 rounded-xl border cursor-pointer text-xs flex items-center justify-between transition-all ${
                    isSelected
                      ? "border-school-navy bg-school-navy/5 font-semibold"
                      : "border-slate-200 hover:bg-slate-50 text-slate-600"
                  }`}
                >
                  <div>
                    <strong className="text-school-navy block">{sib.name}</strong>
                    <span className="text-school-muted block text-[10px]">
                      {sib.admissionNo} • {sib.class}
                    </span>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                      isSelected ? "bg-school-navy text-school-gold border-school-navy" : "border-slate-300"
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5" />}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="space-y-3 pt-2 text-xs">
            <div>
              <label className="font-bold text-school-navy block mb-1">Parent / Guardian Name</label>
              <input
                type="text"
                value={guardianName}
                onChange={(e) => setGuardianName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-school-border text-xs"
              />
            </div>
            <div>
              <label className="font-bold text-school-navy block mb-1">Guardian Phone (WhatsApp)</label>
              <input
                type="text"
                value={guardianPhone}
                onChange={(e) => setGuardianPhone(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-school-border text-xs"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="font-bold text-school-navy block mb-1">Fee Month</label>
                <input
                  type="text"
                  value={feeMonth}
                  onChange={(e) => setFeeMonth(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-school-border text-xs font-semibold"
                />
              </div>
              <div>
                <label className="font-bold text-school-navy block mb-1">Due Date</label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-school-border text-xs"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Printable Family Voucher */}
        <div className="lg:col-span-8">
          <div className="printable-document bg-white p-6 sm:p-8 rounded-2xl border-2 border-school-navy shadow-lg space-y-6 relative overflow-hidden">
            {/* Watermark */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
              <div className="relative w-80 h-80">
                <Image src="/images/brand/logo.png" alt="Watermark" fill className="object-contain" />
              </div>
            </div>

            {/* Header */}
            <div className="flex items-center justify-between border-b-2 border-school-navy pb-4">
              <div className="flex items-center space-x-3">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border border-school-gold bg-white p-0.5 shrink-0">
                  <Image src="/images/brand/logo.png" alt="Logo" fill className="object-contain" />
                </div>
                <div>
                  <h2 className="text-lg font-black text-school-navy uppercase tracking-tight">
                    Lahore Elite School
                  </h2>
                  <span className="text-xs text-school-muted block">
                    Al-Nisa & Sabzazar Campuses, Multan Road, Lahore
                  </span>
                  <span className="text-xs font-bold text-school-navy block">
                    Mobile: 0300-4279059
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="px-3 py-1 rounded bg-school-navy text-white text-xs font-bold uppercase tracking-wider block">
                  COMBINED FAMILY FEE VOUCHER
                </span>
                <span className="font-mono text-xs font-bold text-school-navy block mt-1">
                  FAM-202510-001
                </span>
              </div>
            </div>

            {/* Guardian & Date Meta */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <div>
                <span className="text-school-muted block text-[10px]">Guardian Name:</span>
                <strong className="text-school-navy">{guardianName}</strong>
              </div>
              <div>
                <span className="text-school-muted block text-[10px]">Guardian Contact:</span>
                <strong className="text-school-navy">{guardianPhone}</strong>
              </div>
              <div>
                <span className="text-school-muted block text-[10px]">Fee Billing Month:</span>
                <strong className="text-school-navy">{feeMonth}</strong>
              </div>
              <div>
                <span className="text-school-muted block text-[10px]">Payment Due Date:</span>
                <strong className="text-rose-700 font-extrabold">{formatDate(dueDate)}</strong>
              </div>
            </div>

            {/* Sibling Breakdown Table */}
            <div>
              <table className="w-full text-left text-xs">
                <thead className="bg-school-navy text-white font-bold">
                  <tr>
                    <th className="py-2.5 px-3">Child Name & Admission No</th>
                    <th className="py-2.5 px-3">Enrolled Class</th>
                    <th className="py-2.5 px-3 text-right">Tuition Fee</th>
                    <th className="py-2.5 px-3 text-right">Other Charges</th>
                    <th className="py-2.5 px-3 text-right">Sibling Discount</th>
                    <th className="py-2.5 px-3 text-right font-black">Net Child Payable</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-800">
                  {selectedChildren.map((ch) => {
                    const netPayable = ch.tuitionFee + ch.charges - ch.discount;
                    return (
                      <tr key={ch.id} className="hover:bg-slate-50">
                        <td className="py-3 px-3">
                          <strong className="text-school-navy block">{ch.name}</strong>
                          <span className="font-mono text-[10px] text-school-muted">
                            Adm No: {ch.admissionNo}
                          </span>
                        </td>
                        <td className="py-3 px-3">{ch.class}</td>
                        <td className="py-3 px-3 text-right">{formatPKR(ch.tuitionFee)}</td>
                        <td className="py-3 px-3 text-right">{formatPKR(ch.charges)}</td>
                        <td className="py-3 px-3 text-right text-emerald-700 font-semibold">
                          -{formatPKR(ch.discount)}
                        </td>
                        <td className="py-3 px-3 text-right font-bold text-school-navy">
                          {formatPKR(netPayable)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot className="border-t-2 border-school-navy font-bold text-sm bg-school-gold-light/40">
                  <tr>
                    <td colSpan={5} className="py-3 px-3 text-right text-school-navy">
                      Combined Family Total Payable (PKR):
                    </td>
                    <td className="py-3 px-3 text-right font-black text-school-navy text-base">
                      {formatPKR(familyGrandTotal)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Bottom Signatures */}
            <div className="pt-8 grid grid-cols-2 text-center text-xs text-slate-700 border-t border-slate-200">
              <div className="border-t border-slate-400 mx-6 pt-1">
                <span className="font-bold">Accounts Officer Signature & Stamp</span>
              </div>
              <div className="border-t border-slate-400 mx-6 pt-1">
                <span className="font-bold">Depositor / Parent Signature</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
