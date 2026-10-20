"use client";

import React, { useState } from "react";
import Link from "next/link";
import { formatPKR, formatDate, getWhatsAppUrl } from "@/lib/utils";
import {
  Search,
  MessageSquare,
  Copy,
  Check,
  AlertTriangle,
  Receipt,
} from "lucide-react";

interface Defaulter {
  voucherId: string;
  voucherNo: string;
  studentId: string;
  studentName: string;
  admissionNo: string;
  className: string;
  guardianName: string;
  guardianPhone: string;
  feeMonth: string;
  outstandingAmount: number;
  dueDate: string;
  lastPaymentDate: string | null;
}

interface Props {
  defaulters: Defaulter[];
}

export default function DefaultersTable({ defaulters }: Props) {
  const [search, setSearch] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filtered = defaulters.filter((d) => {
    return (
      search === "" ||
      d.studentName.toLowerCase().includes(search.toLowerCase()) ||
      d.admissionNo.toLowerCase().includes(search.toLowerCase()) ||
      d.guardianName.toLowerCase().includes(search.toLowerCase()) ||
      d.guardianPhone.includes(search)
    );
  });

  const generateReminderText = (d: Defaulter) => {
    return `Dear Parent/Guardian, this is a friendly reminder that the school fee for ${d.studentName}, Admission No. ${d.admissionNo}, for ${d.feeMonth} has an outstanding balance of PKR ${d.outstandingAmount}. Please contact the school office if you have already made the payment or need assistance. Thank you.`;
  };

  const copyReminder = (d: Defaulter) => {
    const text = generateReminderText(d);
    navigator.clipboard.writeText(text);
    setCopiedId(d.voucherId);
    setTimeout(() => setCopiedId(null), 3000);
  };

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="bg-white p-4 rounded-xl border border-school-border shadow-sm flex items-center space-x-3">
        <Search className="w-4 h-4 text-school-muted shrink-0" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter defaulters by student name, admission number, or guardian phone..."
          className="w-full text-xs border-none focus:outline-none"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-school-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-rose-50 text-rose-900 font-bold border-b border-rose-100">
              <tr>
                <th className="py-3 px-4">Student & Adm No</th>
                <th className="py-3 px-4">Class</th>
                <th className="py-3 px-4">Guardian Details</th>
                <th className="py-3 px-4">Fee Month</th>
                <th className="py-3 px-4">Due Date</th>
                <th className="py-3 px-4 font-black">Overdue Balance</th>
                <th className="py-3 px-4 text-right">Reminder Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-school-text">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-school-muted">
                    No overdue defaulters matching the search criteria.
                  </td>
                </tr>
              ) : (
                filtered.map((d) => {
                  const reminderMessage = generateReminderText(d);
                  const waUrl = getWhatsAppUrl(d.guardianPhone, reminderMessage);
                  const isCopied = copiedId === d.voucherId;

                  return (
                    <tr key={d.voucherId} className="hover:bg-rose-50/30 transition-colors">
                      <td className="py-3 px-4">
                        <Link
                          href={`/admin/students/${d.studentId}`}
                          className="font-bold text-school-navy hover:underline block"
                        >
                          {d.studentName}
                        </Link>
                        <span className="font-mono text-[10px] text-school-muted">
                          Adm: {d.admissionNo}
                        </span>
                      </td>
                      <td className="py-3 px-4">{d.className}</td>
                      <td className="py-3 px-4">
                        <strong className="block text-slate-700">{d.guardianName}</strong>
                        <span className="font-semibold text-slate-500 text-[11px]">
                          {d.guardianPhone}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-medium">{d.feeMonth}</td>
                      <td className="py-3 px-4 text-rose-700 font-semibold">{formatDate(d.dueDate)}</td>
                      <td className="py-3 px-4 font-black text-rose-700 text-sm">
                        {formatPKR(d.outstandingAmount)}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            type="button"
                            onClick={() => copyReminder(d)}
                            className="px-2.5 py-1 rounded border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-[10px] font-semibold flex items-center space-x-1"
                            title="Copy message to clipboard"
                          >
                            {isCopied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-slate-500" />}
                            <span>{isCopied ? "Copied" : "Copy Msg"}</span>
                          </button>

                          <a
                            href={waUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] flex items-center space-x-1 shadow-sm"
                          >
                            <MessageSquare className="w-3 h-3" />
                            <span>Send WhatsApp</span>
                          </a>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
