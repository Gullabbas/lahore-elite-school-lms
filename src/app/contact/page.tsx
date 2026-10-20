import React from "react";
import PublicHeader from "@/components/layout/PublicHeader";
import PublicFooter from "@/components/layout/PublicFooter";
import ContactForm from "@/components/forms/ContactForm";
import { MapPin, Phone, Mail, Clock, MessageSquare } from "lucide-react";

export const metadata = {
  title: "Contact Us & Campus Locations | Lahore Elite School",
  description:
    "Official contact information, campus addresses, and phone numbers for Lahore Elite School (Al-Nisa and Sabzazar Campuses, Lahore).",
};

export default function ContactPage() {
  return (
    <>
      <PublicHeader />

      <main className="flex-1 bg-school-bg py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-school-navy bg-school-gold-light px-3 py-1 rounded-full border border-school-gold/30">
              Get in Touch
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-school-navy">
              Contact Us & Campus Locations
            </h1>
            <p className="text-sm sm:text-base text-school-muted">
              We welcome prospective parents, students, and community members to visit our campuses or reach out online.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Campuses & Info */}
            <div className="lg:col-span-5 space-y-6">
              {/* Al-Nisa Campus Card */}
              <div className="bg-white rounded-2xl p-6 border border-school-border shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-school-navy">Al-Nisa Campus</h2>
                  <span className="text-xs bg-school-gold text-school-navy-deep px-2.5 py-0.5 rounded font-bold">
                    Primary & High
                  </span>
                </div>
                <div className="space-y-2 text-sm text-school-muted">
                  <div className="flex items-start space-x-2.5">
                    <MapPin className="w-4 h-4 text-school-navy shrink-0 mt-0.5" />
                    <span className="text-school-text">
                      <strong>Address:</strong> 1-S 9/14 Zubaida Park, Multan Road, Lahore.
                    </span>
                  </div>
                  <div className="flex items-center space-x-2.5">
                    <Phone className="w-4 h-4 text-school-navy shrink-0" />
                    <span>0300-4279059</span>
                  </div>
                </div>
              </div>

              {/* Sabzazar Campus Card */}
              <div className="bg-white rounded-2xl p-6 border border-school-border shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-school-navy">Sabzazar Campus</h2>
                  <span className="text-xs bg-school-navy text-white px-2.5 py-0.5 rounded font-bold">
                    Pre-School to Middle
                  </span>
                </div>
                <div className="space-y-2 text-sm text-school-muted">
                  <div className="flex items-start space-x-2.5">
                    <MapPin className="w-4 h-4 text-school-navy shrink-0 mt-0.5" />
                    <span className="text-school-text">
                      <strong>Address:</strong> 280 B-Block, Sabzazar, Multan Road, Lahore.
                    </span>
                  </div>
                  <div className="flex items-center space-x-2.5">
                    <Phone className="w-4 h-4 text-school-navy shrink-0" />
                    <span>0300-4279059</span>
                  </div>
                </div>
              </div>

              {/* Timing & WhatsApp Direct */}
              <div className="bg-school-navy text-white rounded-2xl p-6 space-y-3">
                <h3 className="font-bold text-base text-school-gold flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>Visiting & Office Hours</span>
                </h3>
                <p className="text-xs text-slate-300">
                  Monday to Saturday: 8:00 AM – 2:00 PM (Friday: 8:00 AM – 12:30 PM). Sunday Closed.
                </p>
                <div className="pt-2">
                  <a
                    href="https://wa.me/923004279059"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-lg bg-school-gold text-school-navy-deep font-bold text-xs hover:bg-school-gold-warm transition-all flex items-center justify-center space-x-2 shadow"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Chat on WhatsApp: 0300-4279059</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Interactive Contact Form */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-7 border border-school-border shadow-md space-y-4">
              <div className="border-b pb-3">
                <h2 className="text-xl font-bold text-school-navy">Send an Inquiry or Message</h2>
                <p className="text-xs text-school-muted">
                  Please complete the form below. We will attend to your inquiry with utmost care.
                </p>
              </div>

              <ContactForm />
            </div>
          </div>
        </div>
      </main>

      <PublicFooter />
    </>
  );
}
