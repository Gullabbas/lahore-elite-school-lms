"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  GraduationCap,
  LogIn,
  Phone,
  Clock,
  Sparkles,
} from "lucide-react";

export default function PublicHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [admissionOpen, setAdmissionOpen] = useState(false);
  const [programsOpen, setProgramsOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-school-border shadow-sm">
      {/* Top Notification Bar */}
      <div className="bg-school-navy text-white text-xs py-2 px-4 border-b border-school-navy-light/40">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1.5 text-school-gold">
              <Phone className="w-3.5 h-3.5" />
              <span className="font-semibold tracking-wide">0300-4279059</span>
            </span>
            <span className="hidden md:inline-flex items-center space-x-1 text-slate-300">
              <Clock className="w-3.5 h-3.5" />
              <span>Mon - Sat: 8:00 AM - 2:00 PM</span>
            </span>
          </div>
          <div className="flex items-center space-x-3 text-xs">
            <span className="text-slate-300 hidden sm:inline">
              Al-Nisa & Sabzazar Campuses, Lahore
            </span>
            <Link
              href="/admission/admission-process"
              className="bg-school-gold text-school-navy-deep px-2.5 py-0.5 rounded font-bold hover:bg-school-gold-warm transition-colors inline-flex items-center space-x-1"
            >
              <Sparkles className="w-3 h-3" />
              <span>Admissions Open 2025-26</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & School Name */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative shrink-0 group-hover:scale-105 transition-transform duration-200 drop-shadow" style={{ width: 56, height: 56, minWidth: 56 }}>
              <Image
                src="/images/brand/logo.png"
                alt="Lahore Elite School Crest"
                width={56}
                height={56}
                style={{ width: "56px", height: "56px", objectFit: "contain" }}
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-school-navy group-hover:text-school-navy-light transition-colors">
                Lahore Elite School
              </span>
              <span className="text-xs font-medium text-school-muted uppercase tracking-wider">
                Excellence in Modern Education
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            <Link
              href="/"
              className={`px-3.5 py-2 rounded-md text-sm font-semibold transition-colors ${
                isActive("/")
                  ? "text-school-navy bg-school-gold-light font-bold"
                  : "text-school-text hover:text-school-navy hover:bg-slate-100"
              }`}
            >
              Home
            </Link>

            <Link
              href="/about"
              className={`px-3.5 py-2 rounded-md text-sm font-semibold transition-colors ${
                isActive("/about")
                  ? "text-school-navy bg-school-gold-light font-bold"
                  : "text-school-text hover:text-school-navy hover:bg-slate-100"
              }`}
            >
              About
            </Link>

            {/* Admission Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setAdmissionOpen(true)}
              onMouseLeave={() => setAdmissionOpen(false)}
            >
              <button
                className={`px-3.5 py-2 rounded-md text-sm font-semibold flex items-center space-x-1 transition-colors ${
                  pathname.startsWith("/admission")
                    ? "text-school-navy bg-school-gold-light font-bold"
                    : "text-school-text hover:text-school-navy hover:bg-slate-100"
                }`}
              >
                <span>Admission</span>
                <ChevronDown className="w-4 h-4 ml-0.5" />
              </button>

              {admissionOpen && (
                <div className="absolute left-0 mt-0 w-56 rounded-xl bg-white shadow-xl border border-school-border py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <Link
                    href="/admission/fee-structure"
                    className="block px-4 py-2 text-sm text-school-text hover:bg-school-gold-light hover:text-school-navy font-medium"
                  >
                    Fee Structure
                  </Link>
                  <Link
                    href="/admission/admission-process"
                    className="block px-4 py-2 text-sm text-school-text hover:bg-school-gold-light hover:text-school-navy font-medium"
                  >
                    Admission Process
                  </Link>
                  <Link
                    href="/admission/evaluation"
                    className="block px-4 py-2 text-sm text-school-text hover:bg-school-gold-light hover:text-school-navy font-medium"
                  >
                    Evaluation & Assessment
                  </Link>
                  <Link
                    href="/admission/school-uniform"
                    className="block px-4 py-2 text-sm text-school-text hover:bg-school-gold-light hover:text-school-navy font-medium"
                  >
                    School Uniform
                  </Link>
                  <Link
                    href="/admission/general-rules"
                    className="block px-4 py-2 text-sm text-school-text hover:bg-school-gold-light hover:text-school-navy font-medium"
                  >
                    General Rules & Policies
                  </Link>
                </div>
              )}
            </div>

            {/* Programs Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setProgramsOpen(true)}
              onMouseLeave={() => setProgramsOpen(false)}
            >
              <button
                className={`px-3.5 py-2 rounded-md text-sm font-semibold flex items-center space-x-1 transition-colors ${
                  pathname.startsWith("/programs")
                    ? "text-school-navy bg-school-gold-light font-bold"
                    : "text-school-text hover:text-school-navy hover:bg-slate-100"
                }`}
              >
                <span>Programs</span>
                <ChevronDown className="w-4 h-4 ml-0.5" />
              </button>

              {programsOpen && (
                <div className="absolute left-0 mt-0 w-64 rounded-xl bg-white shadow-xl border border-school-border py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <Link
                    href="/programs/pre-school"
                    className="block px-4 py-2.5 text-sm text-school-text hover:bg-school-gold-light hover:text-school-navy font-medium"
                  >
                    <div className="font-semibold text-school-navy">Pre-School</div>
                    <div className="text-xs text-school-muted">Playgroup, Nursery & Prep</div>
                  </Link>
                  <Link
                    href="/programs/primary-middle"
                    className="block px-4 py-2.5 text-sm text-school-text hover:bg-school-gold-light hover:text-school-navy font-medium"
                  >
                    <div className="font-semibold text-school-navy">Primary & Middle School</div>
                    <div className="text-xs text-school-muted">Classes 1 through Class 8</div>
                  </Link>
                  <Link
                    href="/programs/high-school"
                    className="block px-4 py-2.5 text-sm text-school-text hover:bg-school-gold-light hover:text-school-navy font-medium"
                  >
                    <div className="font-semibold text-school-navy">High School (Matriculation)</div>
                    <div className="text-xs text-school-muted">Classes 9 & 10 (Science & CS)</div>
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/gallery"
              className={`px-3.5 py-2 rounded-md text-sm font-semibold transition-colors ${
                isActive("/gallery")
                  ? "text-school-navy bg-school-gold-light font-bold"
                  : "text-school-text hover:text-school-navy hover:bg-slate-100"
              }`}
            >
              Gallery
            </Link>

            {/* Contact Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setContactOpen(true)}
              onMouseLeave={() => setContactOpen(false)}
            >
              <button
                className={`px-3.5 py-2 rounded-md text-sm font-semibold flex items-center space-x-1 transition-colors ${
                  pathname.startsWith("/contact")
                    ? "text-school-navy bg-school-gold-light font-bold"
                    : "text-school-text hover:text-school-navy hover:bg-slate-100"
                }`}
              >
                <span>Contact</span>
                <ChevronDown className="w-4 h-4 ml-0.5" />
              </button>

              {contactOpen && (
                <div className="absolute right-0 mt-0 w-56 rounded-xl bg-white shadow-xl border border-school-border py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <Link
                    href="/contact"
                    className="block px-4 py-2 text-sm text-school-text hover:bg-school-gold-light hover:text-school-navy font-medium"
                  >
                    Contact Us
                  </Link>
                  <Link
                    href="/contact/social-feeds"
                    className="block px-4 py-2 text-sm text-school-text hover:bg-school-gold-light hover:text-school-navy font-medium"
                  >
                    Social Feeds
                  </Link>
                  <Link
                    href="/contact/jobs"
                    className="block px-4 py-2 text-sm text-school-text hover:bg-school-gold-light hover:text-school-navy font-medium"
                  >
                    Career Opportunities
                  </Link>
                  <Link
                    href="/contact/franchise"
                    className="block px-4 py-2 text-sm text-school-text hover:bg-school-gold-light hover:text-school-navy font-medium"
                  >
                    Franchise Request
                  </Link>
                  <Link
                    href="/contact/faqs"
                    className="block px-4 py-2 text-sm text-school-text hover:bg-school-gold-light hover:text-school-navy font-medium"
                  >
                    Frequently Asked Questions
                  </Link>
                </div>
              )}
            </div>
          </nav>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center space-x-3">
            <Link
              href="/admission/admission-process"
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-school-gold text-school-navy-deep font-bold text-sm shadow-sm hover:bg-school-gold-warm transition-all"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Apply Now</span>
            </Link>

            <Link
              href="/login"
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-school-navy text-white font-semibold text-sm shadow-sm hover:bg-school-navy-deep transition-all"
            >
              <LogIn className="w-4 h-4 text-school-gold" />
              <span>Portal Login</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-school-navy hover:bg-slate-100 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-school-border bg-white px-4 pt-3 pb-6 space-y-2 shadow-2xl">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md font-semibold text-school-navy hover:bg-slate-100"
          >
            Home
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md font-semibold text-school-navy hover:bg-slate-100"
          >
            About School
          </Link>

          {/* Admission Mobile Submenu */}
          <div className="pl-3 border-l-2 border-school-gold space-y-1 my-1">
            <span className="block text-xs font-bold uppercase tracking-wider text-school-muted pt-1">
              Admission
            </span>
            <Link
              href="/admission/fee-structure"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1 text-sm text-school-text hover:text-school-navy"
            >
              Fee Structure
            </Link>
            <Link
              href="/admission/admission-process"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1 text-sm text-school-text hover:text-school-navy"
            >
              Admission Process
            </Link>
            <Link
              href="/admission/evaluation"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1 text-sm text-school-text hover:text-school-navy"
            >
              Evaluation & Assessment
            </Link>
            <Link
              href="/admission/school-uniform"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1 text-sm text-school-text hover:text-school-navy"
            >
              School Uniform
            </Link>
            <Link
              href="/admission/general-rules"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1 text-sm text-school-text hover:text-school-navy"
            >
              General Rules & Policies
            </Link>
          </div>

          {/* Programs Mobile Submenu */}
          <div className="pl-3 border-l-2 border-school-navy space-y-1 my-1">
            <span className="block text-xs font-bold uppercase tracking-wider text-school-muted pt-1">
              Academic Programs
            </span>
            <Link
              href="/programs/pre-school"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1 text-sm text-school-text hover:text-school-navy"
            >
              Pre-School (PG, Nursery, Prep)
            </Link>
            <Link
              href="/programs/primary-middle"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1 text-sm text-school-text hover:text-school-navy"
            >
              Primary & Middle School (1 - 8)
            </Link>
            <Link
              href="/programs/high-school"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1 text-sm text-school-text hover:text-school-navy"
            >
              High School (Classes 9 & 10)
            </Link>
          </div>

          <Link
            href="/gallery"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md font-semibold text-school-navy hover:bg-slate-100"
          >
            Gallery
          </Link>

          {/* Contact Mobile Submenu */}
          <div className="pl-3 border-l-2 border-school-gold space-y-1 my-1">
            <span className="block text-xs font-bold uppercase tracking-wider text-school-muted pt-1">
              Contact & Opportunities
            </span>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1 text-sm text-school-text hover:text-school-navy"
            >
              Contact Us & Campuses
            </Link>
            <Link
              href="/contact/social-feeds"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1 text-sm text-school-text hover:text-school-navy"
            >
              Social Feeds
            </Link>
            <Link
              href="/contact/jobs"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1 text-sm text-school-text hover:text-school-navy"
            >
              Job Applications
            </Link>
            <Link
              href="/contact/franchise"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1 text-sm text-school-text hover:text-school-navy"
            >
              Franchise Request
            </Link>
            <Link
              href="/contact/faqs"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1 text-sm text-school-text hover:text-school-navy"
            >
              FAQs
            </Link>
          </div>

          <div className="pt-4 flex flex-col space-y-2">
            <Link
              href="/admission/admission-process"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 rounded-lg bg-school-gold text-school-navy-deep font-bold text-center text-sm shadow"
            >
              Apply for Admission
            </Link>
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 rounded-lg bg-school-navy text-white font-semibold text-center text-sm shadow flex items-center justify-center space-x-2"
            >
              <LogIn className="w-4 h-4 text-school-gold" />
              <span>Portal Login (Admin / Staff / Student)</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
