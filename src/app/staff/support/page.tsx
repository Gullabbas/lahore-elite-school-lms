import React from "react";
import Image from "next/image";
import { HelpCircle, Phone, Mail, MessageSquare, Wrench, ShieldCheck, CheckCircle2, Globe, ExternalLink } from "lucide-react";

export const dynamic = "force-dynamic";

export default function StaffSupportPage() {
  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-2xl border border-school-border shadow-sm">
        <span className="text-xs font-bold text-school-navy bg-school-gold-light px-2.5 py-1 rounded">
          Technical Assistance
        </span>
        <h1 className="text-xl font-bold text-school-navy mt-1">LMS Developer &amp; Technical Support</h1>
        <p className="text-xs text-school-muted">
          Need assistance with timetable updates, report cards, fee adjustments, or software queries? Contact the developer.
        </p>
      </div>

      {/* Developer Profile Card with dim photo background */}
      <div className="relative bg-white rounded-3xl p-6 sm:p-8 border border-school-border shadow-md overflow-hidden">
        {/* Dim background image */}
        <div className="absolute inset-0 pointer-events-none select-none z-0">
          <Image
            src="/images/brand/developer-raza.jpg"
            alt="Muhammad Raza Background"
            fill
            className="object-cover object-center opacity-[0.07] grayscale contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/70" />
        </div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Left: Photo / Badge */}
          <div className="md:col-span-4 flex justify-center">
            <div className="relative w-52 h-64 rounded-2xl border-4 border-school-gold shadow-2xl overflow-hidden bg-school-navy shrink-0 group">
              <Image
                src="/images/brand/developer-raza.jpg"
                alt="Muhammad Raza - Full Stack Engineer"
                fill
                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-school-navy via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-3 left-3 right-3 text-center text-white">
                <h3 className="font-extrabold text-base text-white drop-shadow">Muhammad Raza</h3>
                <span className="text-[10px] text-school-gold font-bold uppercase tracking-wider block drop-shadow">
                  Lead Software Architect
                </span>
              </div>
            </div>
          </div>

          {/* Right: Info & Contact CTAs */}
          <div className="md:col-span-8 space-y-4">
            <div>
              <span className="text-[10px] font-bold text-school-navy bg-school-gold-light px-2.5 py-0.5 rounded uppercase">
                System Developer Contact
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-school-navy mt-1">Muhammad Raza</h2>
              <p className="text-xs font-semibold text-school-gold-warm uppercase tracking-wider">
                Lead Full-Stack Engineer &amp; Software Architect
              </p>
              <p className="text-xs text-school-muted mt-2 leading-relaxed">
                Developer and technical architect for the Lahore Elite School Website and Learning Management System.
                Available for priority administrative support, custom academic module expansions, and technical maintenance.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
              <div className="p-3 bg-white/80 backdrop-blur-sm rounded-xl border border-school-border flex items-center space-x-2.5 shadow-sm">
                <Phone className="w-4 h-4 text-school-navy shrink-0" />
                <div>
                  <span className="text-school-muted text-[10px] block">Direct Phone / WhatsApp:</span>
                  <a href="tel:+923341816004" className="font-bold text-school-navy text-sm hover:underline">
                    +923341816004
                  </a>
                </div>
              </div>

              <div className="p-3 bg-white/80 backdrop-blur-sm rounded-xl border border-school-border flex items-center space-x-2.5 shadow-sm">
                <Mail className="w-4 h-4 text-school-navy shrink-0" />
                <div>
                  <span className="text-school-muted text-[10px] block">Official Developer Email:</span>
                  <a href="mailto:mraza4897@gmail.com" className="font-bold text-school-navy text-xs hover:underline">
                    mraza4897@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <a
                href="https://wa.me/923341816004?text=Assalam-o-Alaikum%20Muhammad%20Raza,%20I%20am%20contacting%20you%20regarding%20Lahore%20Elite%20School%20LMS%20technical%20support."
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 flex items-center space-x-1.5 shadow transition-all"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Message on WhatsApp (+923341816004)</span>
              </a>

              <a
                href="https://muhammadraza707.xyz/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-school-navy text-school-gold font-bold text-xs hover:bg-school-navy-light flex items-center space-x-1.5 shadow transition-all border border-school-gold/30"
              >
                <Globe className="w-3.5 h-3.5 text-school-gold" />
                <span>Visit Developer Portfolio</span>
                <ExternalLink className="w-3 h-3 text-slate-300 ml-1" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Troubleshooting Guidance */}
      <div className="bg-white p-6 rounded-2xl border border-school-border shadow-sm space-y-3">
        <h3 className="font-bold text-school-navy text-sm flex items-center space-x-2">
          <Wrench className="w-4 h-4 text-school-gold" />
          <span>Quick Troubleshooting Guidelines</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-school-muted">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <strong className="text-school-navy block mb-1">Password Resets</strong>
            <span>School administrator can reset any teacher or student password under User Accounts in the Admin panel.</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <strong className="text-school-navy block mb-1">Printer Margin Alignment</strong>
            <span>When printing A4 vouchers, report cards, or ID cards, set Margins to &quot;Default&quot; and enable &quot;Background graphics&quot;.</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <strong className="text-school-navy block mb-1">Database Syncing</strong>
            <span>All mutations (fee payments, grades, attendance) commit immediately to the persistent database.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
