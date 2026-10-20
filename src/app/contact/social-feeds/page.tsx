import React from "react";
import Link from "next/link";
import PublicHeader from "@/components/layout/PublicHeader";
import PublicFooter from "@/components/layout/PublicFooter";
import { MessageSquare, Share2, ExternalLink, Globe, Phone } from "lucide-react";

export const metadata = {
  title: "Social Feeds & Community | Lahore Elite School",
  description:
    "Connect with Lahore Elite School across official communication channels and community updates.",
};

export default function SocialFeedsPage() {
  return (
    <>
      <PublicHeader />

      <main className="flex-1 bg-school-bg py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-school-navy bg-school-gold-light px-3 py-1 rounded-full border border-school-gold/30">
              Community Channels
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-school-navy">
              Social Feeds & Community Updates
            </h1>
            <p className="text-sm sm:text-base text-school-muted">
              Stay up to date with school activities, announcements, student achievements, and photo updates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* WhatsApp Community */}
            <div className="bg-white rounded-2xl p-7 border border-school-border shadow-sm space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-school-navy">Official WhatsApp Desk</h3>
                <p className="text-xs text-school-muted leading-relaxed">
                  Direct communication channel for admission inquiries, fee voucher verification, and immediate parent updates.
                </p>
              </div>
              <a
                href="https://wa.me/923004279059"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center space-x-1.5 transition-colors"
              >
                <span>Connect on WhatsApp</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* School Broadcast & Portal */}
            <div className="bg-white rounded-2xl p-7 border border-school-border shadow-sm space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-school-gold-light text-school-navy flex items-center justify-center">
                  <Globe className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-school-navy">Campus LMS Announcements</h3>
                <p className="text-xs text-school-muted leading-relaxed">
                  Parents and students can log in to their dedicated portal to view timely examination circulars and announcements.
                </p>
              </div>
              <Link
                href="/login"
                className="w-full py-2.5 rounded-lg bg-school-navy hover:bg-school-navy-light text-white font-bold text-xs flex items-center justify-center space-x-1.5 transition-colors"
              >
                <span>Portal Login</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Facebook & Media Community */}
            <div className="bg-white rounded-2xl p-7 border border-school-border shadow-sm space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Share2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-school-navy">Events & Media Broadcast</h3>
                <p className="text-xs text-school-muted leading-relaxed">
                  Highlights of sports days, student speech debates, award ceremonies, and national day festivities.
                </p>
              </div>
              <Link
                href="/gallery"
                className="w-full py-2.5 rounded-lg bg-school-gold hover:bg-school-gold-warm text-school-navy-deep font-bold text-xs flex items-center justify-center space-x-1.5 transition-colors"
              >
                <span>Explore School Gallery</span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <PublicFooter />
    </>
  );
}
