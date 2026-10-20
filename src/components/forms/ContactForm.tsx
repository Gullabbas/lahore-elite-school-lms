"use client";

import React, { useState } from "react";
import { CheckCircle2, AlertCircle, Loader2, Send } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
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
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to submit inquiry");
      }

      setStatus({
        type: "success",
        message: "Thank you! Your inquiry has been delivered directly to Lahore Elite School administration. We will reply promptly.",
      });
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
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

      <div>
        <label className="block text-xs font-bold text-school-navy mb-1">
          Full Name *
        </label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="e.g. Tariq Mahmood"
          className="w-full px-3.5 py-2.5 rounded-lg border border-school-border focus:ring-2 focus:ring-school-gold focus:border-school-navy text-sm"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-school-navy mb-1">
            Phone / Mobile Number *
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
            Email Address (Optional)
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="e.g. tariq@gmail.com"
            className="w-full px-3.5 py-2.5 rounded-lg border border-school-border focus:ring-2 focus:ring-school-gold focus:border-school-navy text-sm"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-school-navy mb-1">
          Subject *
        </label>
        <input
          type="text"
          required
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          placeholder="e.g. Admission Inquiry for Class 9"
          className="w-full px-3.5 py-2.5 rounded-lg border border-school-border focus:ring-2 focus:ring-school-gold focus:border-school-navy text-sm"
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-school-navy mb-1">
          Message *
        </label>
        <textarea
          rows={4}
          required
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="How can our school administration assist you today?"
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
            <span>Sending Message...</span>
          </>
        ) : (
          <>
            <Send className="w-4 h-4 text-school-gold" />
            <span>Send Message</span>
          </>
        )}
      </button>
    </form>
  );
}
