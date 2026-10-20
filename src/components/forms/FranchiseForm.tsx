"use client";

import React, { useState } from "react";
import { CheckCircle2, AlertCircle, Loader2, Send } from "lucide-react";

export default function FranchiseForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    city: "Lahore",
    proposedLocation: "",
    background: "Education / Business",
    experience: "3-5 years",
    proposedFacilities: "8-12 classrooms, laboratory, play area",
    estimatedInvestment: "PKR 5 Million – 10 Million",
    preferredLevels: "Playgroup to Matric",
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
      const res = await fetch("/api/franchise", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to submit franchise inquiry");
      }

      setStatus({
        type: "success",
        message: "Thank you for your interest! Your franchise inquiry has been logged. Our campus expansion director will contact you to discuss feasibility.",
      });
      setFormData({
        fullName: "",
        phone: "",
        email: "",
        city: "Lahore",
        proposedLocation: "",
        background: "",
        experience: "",
        proposedFacilities: "",
        estimatedInvestment: "PKR 5 Million – 10 Million",
        preferredLevels: "Playgroup to Matric",
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
            Applicant Full Name *
          </label>
          <input
            type="text"
            required
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            placeholder="e.g. Mian Shahzad"
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
            placeholder="e.g. 0300-1234567"
            className="w-full px-3.5 py-2.5 rounded-lg border border-school-border focus:ring-2 focus:ring-school-gold focus:border-school-navy text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-school-navy mb-1">
            Target City *
          </label>
          <input
            type="text"
            required
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            placeholder="e.g. Lahore / Kasur / Sheikhupura"
            className="w-full px-3.5 py-2.5 rounded-lg border border-school-border focus:ring-2 focus:ring-school-gold focus:border-school-navy text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-school-navy mb-1">
            Proposed Campus Location / Area *
          </label>
          <input
            type="text"
            required
            value={formData.proposedLocation}
            onChange={(e) => setFormData({ ...formData, proposedLocation: e.target.value })}
            placeholder="e.g. Multan Road / Thokar / Johar Town"
            className="w-full px-3.5 py-2.5 rounded-lg border border-school-border focus:ring-2 focus:ring-school-gold focus:border-school-navy text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-school-navy mb-1">
            Estimated Investment Budget *
          </label>
          <select
            value={formData.estimatedInvestment}
            onChange={(e) => setFormData({ ...formData, estimatedInvestment: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-lg border border-school-border focus:ring-2 focus:ring-school-gold focus:border-school-navy text-sm bg-white"
          >
            <option value="PKR 3 Million – 5 Million">PKR 3 Million – 5 Million</option>
            <option value="PKR 5 Million – 10 Million">PKR 5 Million – 10 Million</option>
            <option value="PKR 10 Million – 20 Million">PKR 10 Million – 20 Million</option>
            <option value="PKR 20 Million+">PKR 20 Million+</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-school-navy mb-1">
            Preferred Academic Offerings *
          </label>
          <select
            value={formData.preferredLevels}
            onChange={(e) => setFormData({ ...formData, preferredLevels: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-lg border border-school-border focus:ring-2 focus:ring-school-gold focus:border-school-navy text-sm bg-white"
          >
            <option value="Playgroup to Prep (Junior Campus)">Playgroup to Prep (Junior Campus)</option>
            <option value="Playgroup to Class 8 (Middle Campus)">Playgroup to Class 8 (Middle Campus)</option>
            <option value="Playgroup to Matric (Full Campus)">Playgroup to Matric (Full Campus)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-school-navy mb-1">
            Professional / Business Background *
          </label>
          <input
            type="text"
            required
            value={formData.background}
            onChange={(e) => setFormData({ ...formData, background: e.target.value })}
            placeholder="e.g. Education management, corporate business"
            className="w-full px-3.5 py-2.5 rounded-lg border border-school-border focus:ring-2 focus:ring-school-gold focus:border-school-navy text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-school-navy mb-1">
            Building Facilities / Land Details *
          </label>
          <input
            type="text"
            required
            value={formData.proposedFacilities}
            onChange={(e) => setFormData({ ...formData, proposedFacilities: e.target.value })}
            placeholder="e.g. 1 Kanal rented/owned building, 12 rooms"
            className="w-full px-3.5 py-2.5 rounded-lg border border-school-border focus:ring-2 focus:ring-school-gold focus:border-school-navy text-sm"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-school-navy mb-1">
          Additional Remarks or Inquiries
        </label>
        <textarea
          rows={3}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Any specific questions regarding royalty terms, curriculum support, and licensing..."
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
            <span>Submitting Proposal...</span>
          </>
        ) : (
          <>
            <Send className="w-4 h-4 text-school-gold" />
            <span>Submit Franchise Request</span>
          </>
        )}
      </button>
    </form>
  );
}
