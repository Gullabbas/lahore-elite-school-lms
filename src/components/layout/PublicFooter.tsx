import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, MapPin, Mail, Clock, ExternalLink, ShieldCheck } from "lucide-react";

export default function PublicFooter() {
  return (
    <footer className="bg-school-navy text-white pt-16 pb-8 border-t-4 border-school-gold">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand & Introduction */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="relative shrink-0 drop-shadow-md" style={{ width: 56, height: 56, minWidth: 56 }}>
                <Image
                  src="/images/brand/logo.png"
                  alt="Lahore Elite School Crest"
                  width={56}
                  height={56}
                  style={{ width: "56px", height: "56px", objectFit: "contain" }}
                />
              </div>
              <div>
                <h3 className="text-xl font-bold tracking-tight text-white">
                  Lahore Elite School
                </h3>
                <p className="text-xs text-school-gold tracking-wide uppercase">
                  Excellence in Education
                </p>
              </div>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              Committed to providing holistic education, moral discipline, and academic excellence
              in Lahore, nurturing future leaders and visionary minds.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-school-navy-light text-school-gold border border-school-gold/30">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Authorized Educational Institution</span>
              </span>
            </div>
          </div>

          {/* Campuses & Contact */}
          <div className="space-y-4">
            <h4 className="text-base font-bold text-school-gold uppercase tracking-wider border-b border-school-navy-light pb-2">
              Campuses & Contact
            </h4>
            <div className="space-y-3 text-sm text-slate-300">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-school-gold shrink-0 mt-1" />
                <div>
                  <strong className="text-white block font-semibold">Al-Nisa Campus:</strong>
                  <span>1-S 9/14 Zubaida Park, Multan Road, Lahore</span>
                </div>
              </div>

              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-school-gold shrink-0 mt-1" />
                <div>
                  <strong className="text-white block font-semibold">Sabzazar Campus:</strong>
                  <span>280 B-Block, Sabzazar, Multan Road, Lahore</span>
                </div>
              </div>

              <div className="flex items-center space-x-2.5 pt-2">
                <Phone className="w-4 h-4 text-school-gold shrink-0" />
                <div>
                  <span className="text-xs text-slate-400 block">General Inquiries / WhatsApp:</span>
                  <a
                    href="https://wa.me/923004279059"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-white hover:text-school-gold transition-colors text-base"
                  >
                    0300-4279059
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-base font-bold text-school-gold uppercase tracking-wider border-b border-school-navy-light pb-2">
              Admissions & Academics
            </h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <Link
                  href="/admission/fee-structure"
                  className="hover:text-school-gold transition-colors flex items-center space-x-1.5"
                >
                  <span className="text-school-gold">›</span>
                  <span>Fee Structure</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/admission/admission-process"
                  className="hover:text-school-gold transition-colors flex items-center space-x-1.5"
                >
                  <span className="text-school-gold">›</span>
                  <span>Admission Process</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/admission/evaluation"
                  className="hover:text-school-gold transition-colors flex items-center space-x-1.5"
                >
                  <span className="text-school-gold">›</span>
                  <span>Evaluation & Grading</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/admission/school-uniform"
                  className="hover:text-school-gold transition-colors flex items-center space-x-1.5"
                >
                  <span className="text-school-gold">›</span>
                  <span>Uniform Guidelines</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/programs/pre-school"
                  className="hover:text-school-gold transition-colors flex items-center space-x-1.5"
                >
                  <span className="text-school-gold">›</span>
                  <span>Pre-School Curriculum</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/programs/high-school"
                  className="hover:text-school-gold transition-colors flex items-center space-x-1.5"
                >
                  <span className="text-school-gold">›</span>
                  <span>High School (Matric)</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Portals & Connect */}
          <div className="space-y-4">
            <h4 className="text-base font-bold text-school-gold uppercase tracking-wider border-b border-school-navy-light pb-2">
              LMS & Opportunities
            </h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <Link
                  href="/login"
                  className="text-school-gold font-semibold hover:underline flex items-center space-x-1.5"
                >
                  <span>Portal Login (Admin, Teacher, Student)</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/contact/jobs"
                  className="hover:text-school-gold transition-colors flex items-center space-x-1.5"
                >
                  <span className="text-school-gold">›</span>
                  <span>Career Opportunities</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/contact/franchise"
                  className="hover:text-school-gold transition-colors flex items-center space-x-1.5"
                >
                  <span className="text-school-gold">›</span>
                  <span>Franchise Inquiries</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/contact/faqs"
                  className="hover:text-school-gold transition-colors flex items-center space-x-1.5"
                >
                  <span className="text-school-gold">›</span>
                  <span>Parent FAQs</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="hover:text-school-gold transition-colors flex items-center space-x-1.5"
                >
                  <span className="text-school-gold">›</span>
                  <span>Photo Gallery</span>
                </Link>
              </li>
            </ul>

            <div className="pt-2">
              <span className="text-xs text-slate-400 block mb-1">Office Hours:</span>
              <span className="text-xs text-slate-200 block">Monday to Saturday: 8:00 AM - 2:00 PM</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-school-navy-light pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} Lahore Elite School, Lahore. All Rights Reserved.</p>
          <div className="flex items-center space-x-6">
            <span>Al-Nisa & Sabzazar Campuses</span>
            <span>•</span>
            <a
              href="https://muhammadraza707.xyz/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-school-gold transition-colors underline decoration-slate-600 hover:decoration-school-gold"
            >
              Technical Support: Muhammad Raza
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
