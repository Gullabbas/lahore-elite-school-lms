"use client";

import React, { useState } from "react";
import { formatDate, getWhatsAppUrl } from "@/lib/utils";
import {
  GraduationCap,
  Search,
  Filter,
  Phone,
  MessageSquare,
  CheckCircle2,
  XCircle,
  Clock,
  Trash2,
  Edit3,
  Loader2,
  Building2,
} from "lucide-react";

interface Inquiry {
  id: string;
  studentName: string;
  fatherName: string;
  phone: string;
  whatsapp: string | null;
  email: string | null;
  requestedClass: string;
  campusName: string;
  previousSchool: string | null;
  message: string | null;
  status: string;
  notes: string | null;
  createdAt: string;
}

interface Props {
  initialInquiries: Inquiry[];
}

export default function AdmissionsManager({ initialInquiries }: Props) {
  const [inquiries, setInquiries] = useState<Inquiry[]>(initialInquiries);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [campusFilter, setCampusFilter] = useState("ALL");
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const filtered = inquiries.filter((inq) => {
    const q = search.toLowerCase();
    const matchesSearch =
      inq.studentName.toLowerCase().includes(q) ||
      inq.fatherName.toLowerCase().includes(q) ||
      inq.phone.includes(q) ||
      inq.requestedClass.toLowerCase().includes(q);

    const matchesStatus = statusFilter === "ALL" || inq.status === statusFilter;
    const matchesCampus = campusFilter === "ALL" || inq.campusName === campusFilter;

    return matchesSearch && matchesStatus && matchesCampus;
  });

  const handleStatusChange = async (id: string, newStatus: string) => {
    setLoadingId(id);
    try {
      const res = await fetch("/api/admissions", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setInquiries((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
        );
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingId(null);
    }
  };

  const handleNotesUpdate = async (id: string, currentNotes: string | null) => {
    const newNotes = window.prompt("Enter admin follow-up notes:", currentNotes || "");
    if (newNotes === null) return;

    setLoadingId(id);
    try {
      const res = await fetch("/api/admissions", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, notes: newNotes }),
      });
      const data = await res.json();
      if (data.success) {
        setInquiries((prev) =>
          prev.map((item) => (item.id === id ? { ...item, notes: newNotes } : item))
        );
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this admission inquiry?")) return;

    setLoadingId(id);
    try {
      const res = await fetch(`/api/admissions?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setInquiries((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingId(null);
    }
  };

  const total = inquiries.length;
  const pending = inquiries.filter((i) => i.status === "PENDING").length;
  const reviewed = inquiries.filter((i) => i.status === "REVIEWED").length;
  const accepted = inquiries.filter((i) => i.status === "ACCEPTED").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-school-border shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-school-gold-warm font-bold text-xs uppercase tracking-wider mb-1">
            <GraduationCap className="w-4 h-4" />
            <span>Admissions Desk</span>
          </div>
          <h1 className="text-2xl font-extrabold text-school-navy">Online Admission Inquiries</h1>
          <p className="text-xs text-school-muted mt-1">
            Review, follow up, and admit applicants from the public website admission portal
          </p>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-school-border shadow-sm">
          <span className="text-[10px] font-bold text-school-muted uppercase block">Total Inquiries</span>
          <span className="text-2xl font-extrabold text-school-navy mt-1 block">{total}</span>
        </div>
        <div className="bg-amber-50/60 p-4 rounded-xl border border-amber-100 shadow-sm">
          <span className="text-[10px] font-bold text-amber-800 uppercase block">Pending Review</span>
          <span className="text-2xl font-extrabold text-amber-700 mt-1 block">{pending}</span>
        </div>
        <div className="bg-blue-50/60 p-4 rounded-xl border border-blue-100 shadow-sm">
          <span className="text-[10px] font-bold text-blue-800 uppercase block">In Contact / Reviewed</span>
          <span className="text-2xl font-extrabold text-blue-700 mt-1 block">{reviewed}</span>
        </div>
        <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-100 shadow-sm">
          <span className="text-[10px] font-bold text-emerald-800 uppercase block">Enrolled / Accepted</span>
          <span className="text-2xl font-extrabold text-emerald-700 mt-1 block">{accepted}</span>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-2xl border border-school-border shadow-sm flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-3 text-school-muted" />
          <input
            type="text"
            placeholder="Search applicant name, father, phone, class..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-school-border text-xs focus:outline-none focus:ring-2 focus:ring-school-gold"
          />
        </div>

        <div className="flex items-center space-x-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-school-border text-xs bg-white text-school-navy font-semibold focus:outline-none"
          >
            <option value="ALL">All Statuses</option>
            <option value="PENDING">Pending</option>
            <option value="REVIEWED">Reviewed</option>
            <option value="ACCEPTED">Accepted</option>
            <option value="REJECTED">Rejected</option>
          </select>

          <select
            value={campusFilter}
            onChange={(e) => setCampusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-school-border text-xs bg-white text-school-navy font-semibold focus:outline-none"
          >
            <option value="ALL">All Campuses</option>
            <option value="Al-Nisa Campus">Al-Nisa Campus</option>
            <option value="Sabzazar Campus">Sabzazar Campus</option>
          </select>
        </div>
      </div>

      {/* Inquiries Table */}
      <div className="bg-white rounded-2xl border border-school-border overflow-hidden shadow-sm">
        {filtered.length === 0 ? (
          <div className="p-12 text-center text-xs text-school-muted">
            No admission inquiries found matching your filters.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-school-navy font-bold uppercase text-[10px] tracking-wider border-b border-school-border">
                <tr>
                  <th className="p-3.5">Submission Date</th>
                  <th className="p-3.5">Student &amp; Class</th>
                  <th className="p-3.5">Father &amp; Contact</th>
                  <th className="p-3.5">Campus</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">Office Notes</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-school-border">
                {filtered.map((item) => {
                  const isLoading = loadingId === item.id;
                  const waNumber = item.whatsapp || item.phone;
                  const waUrl = getWhatsAppUrl(
                    waNumber,
                    `Assalam-o-Alaikum ${item.fatherName}, Greetings from Lahore Elite School regarding the admission inquiry for ${item.studentName} in ${item.requestedClass}.`
                  );

                  return (
                    <tr key={item.id} className="hover:bg-slate-50">
                      <td className="p-3.5 font-mono text-school-muted">
                        {formatDate(item.createdAt)}
                      </td>
                      <td className="p-3.5">
                        <span className="font-bold text-school-navy text-sm block">{item.studentName}</span>
                        <span className="text-[11px] font-semibold text-school-gold-warm">
                          Applying for: {item.requestedClass}
                        </span>
                        {item.previousSchool && (
                          <span className="text-[10px] text-school-muted block">
                            Prev: {item.previousSchool}
                          </span>
                        )}
                      </td>
                      <td className="p-3.5">
                        <span className="font-semibold text-slate-800 block">{item.fatherName}</span>
                        <div className="flex items-center space-x-2 mt-1">
                          <a
                            href={`tel:${item.phone}`}
                            className="inline-flex items-center space-x-1 text-slate-600 hover:text-school-navy font-mono"
                          >
                            <Phone className="w-3 h-3" />
                            <span>{item.phone}</span>
                          </a>
                          <a
                            href={waUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-1 px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold text-[10px]"
                          >
                            <MessageSquare className="w-3 h-3" />
                            <span>WhatsApp</span>
                          </a>
                        </div>
                      </td>
                      <td className="p-3.5">
                        <span className="px-2 py-1 rounded bg-slate-100 text-[11px] font-medium text-slate-700">
                          {item.campusName}
                        </span>
                      </td>
                      <td className="p-3.5">
                        <select
                          disabled={isLoading}
                          value={item.status}
                          onChange={(e) => handleStatusChange(item.id, e.target.value)}
                          className={`px-2.5 py-1 rounded-full text-[11px] font-bold border-0 cursor-pointer focus:ring-1 focus:ring-school-gold ${
                            item.status === "PENDING"
                              ? "bg-amber-100 text-amber-800"
                              : item.status === "REVIEWED"
                              ? "bg-blue-100 text-blue-800"
                              : item.status === "ACCEPTED"
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-rose-100 text-rose-800"
                          }`}
                        >
                          <option value="PENDING">PENDING</option>
                          <option value="REVIEWED">REVIEWED</option>
                          <option value="ACCEPTED">ACCEPTED</option>
                          <option value="REJECTED">REJECTED</option>
                        </select>
                      </td>
                      <td className="p-3.5 max-w-xs">
                        {item.notes ? (
                          <p className="text-[11px] text-slate-700 italic">{item.notes}</p>
                        ) : (
                          <span className="text-[11px] text-slate-400 italic">No notes</span>
                        )}
                      </td>
                      <td className="p-3.5 text-right space-x-1">
                        <button
                          onClick={() => handleNotesUpdate(item.id, item.notes)}
                          className="p-1.5 text-slate-500 hover:text-school-navy rounded hover:bg-slate-100"
                          title="Add/Edit Notes"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          disabled={isLoading}
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded hover:bg-rose-50"
                          title="Delete Lead"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
