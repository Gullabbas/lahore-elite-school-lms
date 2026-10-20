"use client";

import React, { useState } from "react";
import { CheckCircle2, AlertCircle, Loader2, Send } from "lucide-react";

export default function AdmissionForm() {
  const [formData, setFormData] = useState({
    studentName: "",
    fatherName: "",
    phone: "",
    whatsapp: "",
    email: "",
    requestedClass: "Class 1",
    campusName: "Al-Nisa Campus (Multan Road)",
    previousSchool: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error" | null; message: string }>({
    type: null,
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: null, message: "" });

    try {
      const res = await fetch("/api/admissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to submit admission inquiry");
      }

      setStatus({
        type: "success",
        message: "Your admission application has been registered successfully! Our admission officer will call you to schedule the interview.",
      });
      setFormData({
        studentName: "",
        fatherName: "",
        phone: "",
        whatsapp: "",
        email: "",
        requestedClass: "Class 1",
        campusName: "Al-Nisa Campus (Multan Road)",
        previousSchool: "",
        message: "",
      });
    } catch (err: any) {
      setStatus({
        type: "error",
        message: err.message || "An unexpected error occurred. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {status.type === "success" && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-start space-x-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <span>{status.message}</span>
        </div>
      )}

      {status.type === "error" && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-start space-x-2">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <span>{status.message}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-school-navy mb-1">
            Student Full Name *
          </label>
          <input
            type="text"
            required
            value={formData.studentName}
            onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
            placeholder="e.g. Muhammad Ali"
            className="w-full px-3.5 py-2.5 rounded-lg border border-school-border focus:ring-2 focus:ring-school-gold focus:border-school-navy text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-school-navy mb-1">
            Father / Guardian Name *
          </label>
          <input
            type="text"
            required
            value={formData.fatherName}
            onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
            placeholder="e.g. Tariq Mahmood"
            className="w-full px-3.5 py-2.5 rounded-lg border border-school-border focus:ring-2 focus:ring-school-gold focus:border-school-navy text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-school-navy mb-1">
            Contact Number *
          </label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="e.g. 0300-1234567"
            className="w-full px-3.5 py-2.5 rounded-lg border border-school-border focus:ring-2 focus:ring-school-gold focus:border-school-navy text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-school-navy mb-1">
            WhatsApp Number
          </label>
          <input
            type="tel"
            value={formData.whatsapp}
            onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
            placeholder="e.g. 0300-1234567"
            className="w-full px-3.5 py-2.5 rounded-lg border border-school-border focus:ring-2 focus:ring-school-gold focus:border-school-navy text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-school-navy mb-1">
            Preferred Campus *
          </label>
          <select
            value={formData.campusName}
            onChange={(e) => setFormData({ ...formData, campusName: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-lg border border-school-border focus:ring-2 focus:ring-school-gold focus:border-school-navy text-sm bg-white"
          >
            <option value="Al-Nisa Campus (Multan Road)">Al-Nisa Campus (Multan Road, Lahore)</option>
            <option value="Sabzazar Campus (Multan Road)">Sabzazar Campus (Multan Road, Lahore)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-school-navy mb-1">
            Applying for Class *
          </label>
          <select
            value={formData.requestedClass}
            onChange={(e) => setFormData({ ...formData, requestedClass: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-lg border border-school-border focus:ring-2 focus:ring-school-gold focus:border-school-navy text-sm bg-white"
          >
            <option value="Playgroup">Playgroup</option>
            <option value="Nursery">Nursery</option>
            <option value="Prep">Prep</option>
            <option value="Class 1">Class 1</option>
            <option value="Class 2">Class 2</option>
            <option value="Class 3">Class 3</option>
            <option value="Class 4">Class 4</option>
            <option value="Class 5">Class 5</option>
            <option value="Class 6">Class 6</option>
            <option value="Class 7">Class 7</option>
            <option value="Class 8">Class 8</option>
            <option value="Class 9">Class 9 (Matric)</option>
            <option value="Class 10">Class 10 (Matric)</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-school-navy mb-1">
          Previous School (if applicable)
        </label>
        <input
          type="text"
          value={formData.previousSchool}
          onChange={(e) => setFormData({ ...formData, previousSchool: e.target.value })}
          placeholder="Name of previous institution attended"
          className="w-full px-3.5 py-2.5 rounded-lg border border-school-border focus:ring-2 focus:ring-school-gold focus:border-school-navy text-sm"
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-school-navy mb-1">
          Additional Notes / Inquiries
        </label>
        <textarea
          rows={3}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Any specific educational background, questions or requirements..."
          className="w-full px-3.5 py-2.5 rounded-lg border border-school-border focus:ring-2 focus:ring-school-gold focus:border-school-navy text-sm"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-lg bg-school-navy hover:bg-school-navy-light text-white font-bold text-sm shadow transition-all flex items-center justify-center space-x-2 disabled:opacity-70"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Submitting Inquiry...</span>
          </>
        ) : (
          <>
            <Send className="w-4 h-4 text-school-gold" />
            <span>Submit Admission Application</span>
          </>
        )}
      </button>
    </form>
  );
}
