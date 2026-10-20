"use client";

import React, { useState } from "react";
import { CheckCircle2, AlertCircle, Loader2, Send } from "lucide-react";

interface Props {
  defaultPosition?: string;
}

export default function JobApplicationForm({ defaultPosition = "Senior Science Teacher" }: Props) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    position: defaultPosition,
    experience: "3-5 years",
    qualification: "M.Sc. / B.S. Hons",
    coverLetter: "",
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
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to submit job application");
      }

      setStatus({
        type: "success",
        message: "Thank you for applying! Your application has been logged in our HR recruitment registry. Shortlisted candidates will be contacted for an interview.",
      });
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        position: defaultPosition,
        experience: "3-5 years",
        qualification: "",
        coverLetter: "",
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
            Full Name *
          </label>
          <input
            type="text"
            required
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            placeholder="e.g. Asad Ullah Khan"
            className="w-full px-3.5 py-2.5 rounded-lg border border-school-border focus:ring-2 focus:ring-school-gold focus:border-school-navy text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-school-navy mb-1">
            Contact Number (WhatsApp) *
          </label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="e.g. 0321-1234567"
            className="w-full px-3.5 py-2.5 rounded-lg border border-school-border focus:ring-2 focus:ring-school-gold focus:border-school-navy text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-school-navy mb-1">
            Email Address *
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="e.g. asad@gmail.com"
            className="w-full px-3.5 py-2.5 rounded-lg border border-school-border focus:ring-2 focus:ring-school-gold focus:border-school-navy text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-school-navy mb-1">
            Position Applied For *
          </label>
          <select
            value={formData.position}
            onChange={(e) => setFormData({ ...formData, position: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-lg border border-school-border focus:ring-2 focus:ring-school-gold focus:border-school-navy text-sm bg-white"
          >
            <option value="Senior Science Teacher (Physics/Chem/Bio)">Senior Science Teacher (Physics/Chem/Bio)</option>
            <option value="Senior Mathematics Teacher">Senior Mathematics Teacher</option>
            <option value="English Language Specialist">English Language Specialist</option>
            <option value="Computer Science & IT Teacher">Computer Science & IT Teacher</option>
            <option value="Early Childhood / Montessori Teacher">Early Childhood / Montessori Teacher</option>
            <option value="Accounts & Administrative Officer">Accounts & Administrative Officer</option>
            <option value="General Faculty / Staff">General Faculty / Staff</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-school-navy mb-1">
            Highest Academic Qualification *
          </label>
          <input
            type="text"
            required
            value={formData.qualification}
            onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
            placeholder="e.g. M.Sc. Physics (Punjab University), B.Ed"
            className="w-full px-3.5 py-2.5 rounded-lg border border-school-border focus:ring-2 focus:ring-school-gold focus:border-school-navy text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-school-navy mb-1">
            Teaching Experience *
          </label>
          <select
            value={formData.experience}
            onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-lg border border-school-border focus:ring-2 focus:ring-school-gold focus:border-school-navy text-sm bg-white"
          >
            <option value="Fresh / Under 1 year">Fresh / Under 1 year</option>
            <option value="1-3 years">1-3 years</option>
            <option value="3-5 years">3-5 years</option>
            <option value="5-10 years">5-10 years</option>
            <option value="10+ years">10+ years</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-school-navy mb-1">
          Personal Statement / Summary of Experience *
        </label>
        <textarea
          rows={3}
          required
          value={formData.coverLetter}
          onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
          placeholder="Briefly describe your teaching philosophy, classroom management, and notable pedagogical strengths..."
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
            <span>Submitting Application...</span>
          </>
        ) : (
          <>
            <Send className="w-4 h-4 text-school-gold" />
            <span>Submit Job Application</span>
          </>
        )}
      </button>
    </form>
  );
}
