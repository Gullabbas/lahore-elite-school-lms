"use client";

import React, { useState } from "react";
import {
  Sliders,
  Building2,
  Calendar,
  Save,
  Loader2,
  CheckCircle2,
  HelpCircle,
  Phone,
  Mail,
  MapPin,
  Shield,
} from "lucide-react";

interface Campus {
  id: string;
  name: string;
  code: string;
  address: string;
  phone: string;
  email: string | null;
  isActive: boolean;
}

interface AcademicSession {
  id: string;
  name: string;
  isCurrent: boolean;
  startDate: string;
  endDate: string;
}

interface SettingItem {
  key: string;
  value: string;
}

interface Props {
  campuses: Campus[];
  sessions: AcademicSession[];
  settings: SettingItem[];
}

export default function SchoolSettingsManager({
  campuses: initialCampuses,
  sessions,
  settings: initialSettings,
}: Props) {
  const [campuses, setCampuses] = useState<Campus[]>(initialCampuses);
  const [schoolName, setSchoolName] = useState(
    initialSettings.find((s) => s.key === "SCHOOL_NAME")?.value || "Lahore Elite School"
  );
  const [officialPhone, setOfficialPhone] = useState(
    initialSettings.find((s) => s.key === "OFFICIAL_PHONE")?.value || "0300-4279059"
  );
  const [officialEmail, setOfficialEmail] = useState(
    initialSettings.find((s) => s.key === "OFFICIAL_EMAIL")?.value || "info@lahoreeliteschool.edu.pk"
  );

  const [saving, setSaving] = useState(false);
  const [savedNotice, setSavedNotice] = useState(false);

  const handleCampusChange = (id: string, field: keyof Campus, val: string) => {
    setCampuses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: val } : c))
    );
  };

  const handleSaveAll = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          campuses,
          settings: [
            { key: "SCHOOL_NAME", value: schoolName, category: "GENERAL" },
            { key: "OFFICIAL_PHONE", value: officialPhone, category: "CONTACT" },
            { key: "OFFICIAL_EMAIL", value: officialEmail, category: "CONTACT" },
          ],
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSavedNotice(true);
        setTimeout(() => setSavedNotice(false), 3000);
      } else {
        alert(data.message || "Failed to save settings");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-school-border shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-school-gold-warm font-bold text-xs uppercase tracking-wider mb-1">
            <Sliders className="w-4 h-4" />
            <span>Institution Configuration</span>
          </div>
          <h1 className="text-2xl font-extrabold text-school-navy">School &amp; Campus Settings</h1>
          <p className="text-xs text-school-muted mt-1">
            Configure school profile, active campuses, academic sessions, and institutional parameters
          </p>
        </div>

        {savedNotice && (
          <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
            <CheckCircle2 className="w-4 h-4" />
            <span>Settings saved successfully!</span>
          </span>
        )}
      </div>

      <form onSubmit={handleSaveAll} className="space-y-6">
        {/* Core School Identity */}
        <div className="bg-white rounded-2xl border border-school-border p-6 shadow-sm space-y-4">
          <div className="flex items-center space-x-2 pb-3 border-b border-school-border">
            <Shield className="w-4 h-4 text-school-gold-warm" />
            <h2 className="text-sm font-extrabold text-school-navy">Core Institutional Details</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-school-navy mb-1">School Name</label>
              <input
                type="text"
                required
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                className="w-full px-3 py-2 border rounded-xl text-xs font-semibold focus:ring-2 focus:ring-school-gold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-school-navy mb-1">Official Mobile / UAN</label>
              <input
                type="text"
                required
                value={officialPhone}
                onChange={(e) => setOfficialPhone(e.target.value)}
                className="w-full px-3 py-2 border rounded-xl text-xs font-mono focus:ring-2 focus:ring-school-gold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-school-navy mb-1">Official Support Email</label>
              <input
                type="email"
                required
                value={officialEmail}
                onChange={(e) => setOfficialEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-xl text-xs font-mono focus:ring-2 focus:ring-school-gold"
              />
            </div>
          </div>
        </div>

        {/* Campuses Configuration */}
        <div className="bg-white rounded-2xl border border-school-border p-6 shadow-sm space-y-4">
          <div className="flex items-center space-x-2 pb-3 border-b border-school-border">
            <Building2 className="w-4 h-4 text-school-gold-warm" />
            <h2 className="text-sm font-extrabold text-school-navy">Registered Campuses</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {campuses.map((campus) => (
              <div key={campus.id} className="p-4 rounded-xl border border-school-border bg-slate-50 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-school-navy">{campus.name}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white text-slate-700 font-bold border">
                    {campus.code}
                  </span>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-school-navy mb-1">Campus Name</label>
                  <input
                    type="text"
                    value={campus.name}
                    onChange={(e) => handleCampusChange(campus.id, "name", e.target.value)}
                    className="w-full px-3 py-1.5 border rounded-lg text-xs bg-white focus:ring-2 focus:ring-school-gold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-school-navy mb-1">Physical Address</label>
                  <input
                    type="text"
                    value={campus.address}
                    onChange={(e) => handleCampusChange(campus.id, "address", e.target.value)}
                    className="w-full px-3 py-1.5 border rounded-lg text-xs bg-white focus:ring-2 focus:ring-school-gold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold text-school-navy mb-1">Phone</label>
                    <input
                      type="text"
                      value={campus.phone}
                      onChange={(e) => handleCampusChange(campus.id, "phone", e.target.value)}
                      className="w-full px-3 py-1.5 border rounded-lg text-xs bg-white font-mono focus:ring-2 focus:ring-school-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-school-navy mb-1">Email</label>
                    <input
                      type="text"
                      value={campus.email || ""}
                      onChange={(e) => handleCampusChange(campus.id, "email", e.target.value)}
                      className="w-full px-3 py-1.5 border rounded-lg text-xs bg-white font-mono focus:ring-2 focus:ring-school-gold"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Academic Session */}
        <div className="bg-white rounded-2xl border border-school-border p-6 shadow-sm space-y-4">
          <div className="flex items-center space-x-2 pb-3 border-b border-school-border">
            <Calendar className="w-4 h-4 text-school-gold-warm" />
            <h2 className="text-sm font-extrabold text-school-navy">Academic Sessions</h2>
          </div>

          <div className="space-y-2">
            {sessions.map((sess) => (
              <div
                key={sess.id}
                className="p-3.5 rounded-xl border border-school-border flex items-center justify-between bg-slate-50"
              >
                <div>
                  <span className="font-extrabold text-xs text-school-navy">{sess.name}</span>
                  <span className="text-[11px] text-school-muted block">
                    Duration: {new Date(sess.startDate).toLocaleDateString()} to{" "}
                    {new Date(sess.endDate).toLocaleDateString()}
                  </span>
                </div>
                {sess.isCurrent && (
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800">
                    ACTIVE CURRENT SESSION
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Developer Support Notice */}
        <div className="bg-slate-50 rounded-2xl border border-school-border p-5 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-3">
            <HelpCircle className="w-5 h-5 text-school-gold-warm shrink-0" />
            <div>
              <p className="font-bold text-school-navy">Technical Architecture &amp; Developer Support</p>
              <p className="text-[11px] text-school-muted">
                System Developed &amp; Engineered by Muhammad Raza (Cell: +923341816004). All rights reserved.
              </p>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 bg-school-navy text-white text-xs font-bold rounded-xl hover:bg-school-navy-light flex items-center space-x-2 shadow-lg"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 text-school-gold" />}
            <span>Save All Configurations</span>
          </button>
        </div>
      </form>
    </div>
  );
}
