"use client";

import React, { useState } from "react";
import { formatDate } from "@/lib/utils";
import {
  Bell,
  Plus,
  Trash2,
  CheckCircle2,
  XCircle,
  Eye,
  EyeOff,
  X,
  Loader2,
  Users,
  GraduationCap,
  Sparkles,
} from "lucide-react";

interface Announcement {
  id: string;
  title: string;
  message: string;
  targetRole: string;
  isPublished: boolean;
  publishDate: string;
}

interface Props {
  initialAnnouncements: Announcement[];
}

export default function AnnouncementsManager({ initialAnnouncements }: Props) {
  const [announcements, setAnnouncements] = useState<Announcement[]>(initialAnnouncements);
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: "",
    message: "",
    targetRole: "ALL",
    isPublished: true,
  });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/announcements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setAnnouncements([data.announcement, ...announcements]);
        setShowModal(false);
        setForm({ title: "", message: "", targetRole: "ALL", isPublished: true });
      } else {
        alert(data.message || "Failed to create announcement");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    } finally {
      setSubmitting(false);
    }
  };

  const togglePublish = async (id: string, currentStatus: boolean) => {
    setLoadingId(id);
    try {
      const res = await fetch("/api/announcements", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, isPublished: !currentStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setAnnouncements((prev) =>
          prev.map((a) => (a.id === id ? { ...a, isPublished: !currentStatus } : a))
        );
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this announcement?")) return;

    setLoadingId(id);
    try {
      const res = await fetch(`/api/announcements?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setAnnouncements((prev) => prev.filter((a) => a.id !== id));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-school-border shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-school-gold-warm font-bold text-xs uppercase tracking-wider mb-1">
            <Bell className="w-4 h-4" />
            <span>School Circulars &amp; Notices</span>
          </div>
          <h1 className="text-2xl font-extrabold text-school-navy">Campus Announcements</h1>
          <p className="text-xs text-school-muted mt-1">
            Broadcast official notices to students, parents, faculty, or all portal users
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-school-navy text-white text-xs font-bold hover:bg-school-navy-light transition-all shadow self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-school-gold" />
          <span>New Announcement</span>
        </button>
      </div>

      {/* Announcements List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {announcements.map((item) => {
          const isLoading = loadingId === item.id;

          return (
            <div
              key={item.id}
              className={`p-5 rounded-2xl border transition-all bg-white shadow-sm flex flex-col justify-between space-y-4 ${
                item.isPublished ? "border-school-border" : "border-slate-200 opacity-60 bg-slate-50/50"
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                      item.targetRole === "ALL"
                        ? "bg-purple-100 text-purple-800"
                        : item.targetRole === "STUDENTS"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    Target: {item.targetRole}
                  </span>

                  <span className="text-[10px] font-mono text-school-muted">
                    {formatDate(item.publishDate)}
                  </span>
                </div>

                <h3 className="text-base font-extrabold text-school-navy">{item.title}</h3>
                <p className="text-xs text-school-muted leading-relaxed whitespace-pre-line">
                  {item.message}
                </p>
              </div>

              <div className="pt-3 border-t border-school-border flex items-center justify-between text-xs">
                <button
                  onClick={() => togglePublish(item.id, item.isPublished)}
                  disabled={isLoading}
                  className={`inline-flex items-center space-x-1.5 font-bold ${
                    item.isPublished
                      ? "text-emerald-700 hover:text-emerald-800"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  {item.isPublished ? (
                    <>
                      <Eye className="w-3.5 h-3.5" />
                      <span>Published (Live)</span>
                    </>
                  ) : (
                    <>
                      <EyeOff className="w-3.5 h-3.5" />
                      <span>Draft / Hidden</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => handleDelete(item.id)}
                  disabled={isLoading}
                  className="p-1.5 text-slate-400 hover:text-rose-600 rounded hover:bg-rose-50"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* New Announcement Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-school-border">
            <div className="flex items-center justify-between border-b pb-3 mb-4">
              <h3 className="text-base font-extrabold text-school-navy">Create School Notice</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-school-navy mb-1">Notice Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Winter Vacation Schedule &amp; Examinations"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl text-xs focus:ring-2 focus:ring-school-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-school-navy mb-1">Audience / Target Role</label>
                <select
                  value={form.targetRole}
                  onChange={(e) => setForm({ ...form, targetRole: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl text-xs bg-white focus:ring-2 focus:ring-school-gold"
                >
                  <option value="ALL">All Portal Users (Everyone)</option>
                  <option value="STUDENTS">Students &amp; Parents Only</option>
                  <option value="TEACHERS">Faculty &amp; Staff Only</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-school-navy mb-1">Notice Message / Details</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Enter the complete notification details..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl text-xs focus:ring-2 focus:ring-school-gold"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="pub"
                  checked={form.isPublished}
                  onChange={(e) => setForm({ ...form, isPublished: e.target.checked })}
                  className="rounded text-school-navy focus:ring-school-gold"
                />
                <label htmlFor="pub" className="text-xs font-semibold text-school-navy">
                  Publish immediately to student/staff dashboards
                </label>
              </div>

              <div className="pt-3 border-t flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded-xl text-xs text-slate-600 hover:bg-slate-50 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 bg-school-navy text-white text-xs font-bold rounded-xl hover:bg-school-navy-light flex items-center space-x-1"
                >
                  {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>Publish Notice</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
