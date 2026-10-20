"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Receipt,
  AlertTriangle,
  GraduationCap,
  Calendar,
  FileText,
  FileCheck2,
  Award,
  BookOpen,
  DollarSign,
  Clock,
  Bell,
  Settings,
  HelpCircle,
  LogOut,
  Menu,
  X,
  ExternalLink,
  ShieldCheck,
  ChevronRight,
  UserCheck,
  Globe,
  Sliders,
  Layers,
} from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const navSections = [
  {
    title: "OPERATIONAL OVERVIEW",
    items: [
      { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    ],
  },
  {
    title: "STUDENT AFFAIRS",
    items: [
      { name: "Students Registry", href: "/admin/students", icon: Users },
      { name: "Student ID Cards", href: "/admin/id-cards", icon: CreditCard },
      { name: "Academic Records", href: "/admin/documents", icon: FileCheck2 },
    ],
  },
  {
    title: "FINANCE & ACCOUNTS",
    items: [
      { name: "Fee Vouchers", href: "/admin/fees", icon: Receipt },
      { name: "Fee Defaulters", href: "/admin/fees/defaulters", icon: AlertTriangle },
      { name: "Income & Expenses", href: "/admin/finance", icon: DollarSign },
      { name: "Staff Payroll", href: "/admin/payroll", icon: CreditCard },
    ],
  },
  {
    title: "ACADEMICS & FACULTY",
    items: [
      { name: "Teachers & Staff", href: "/admin/teachers", icon: UserCheck },
      { name: "Daily Attendance", href: "/admin/attendance", icon: Clock },
      { name: "Timetables", href: "/admin/timetable", icon: Calendar },
      { name: "Paper Generator", href: "/admin/paper-generator", icon: FileText },
      { name: "Exam Date Sheets", href: "/admin/date-sheets", icon: BookOpen },
      { name: "Certificates", href: "/admin/certificates", icon: Award },
      { name: "Homework & Tasks", href: "/admin/assignments", icon: Layers },
    ],
  },
  {
    title: "COMMUNICATIONS & LEADS",
    items: [
      { name: "Announcements", href: "/admin/announcements", icon: Bell },
      { name: "Admission Leads", href: "/admin/admissions", icon: GraduationCap },
      { name: "Reports & Exports", href: "/admin/reports", icon: FileText },
    ],
  },
  {
    title: "SYSTEM & SETTINGS",
    items: [
      { name: "User Accounts", href: "/admin/accounts", icon: ShieldCheck },
      { name: "Content CMS", href: "/admin/content", icon: Globe },
      { name: "School Settings", href: "/admin/settings", icon: Sliders },
      { name: "Developer Support", href: "/admin/support", icon: HelpCircle },
    ],
  },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  };

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-school-bg flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-school-navy text-white border-r border-school-navy-light shrink-0">
        {/* Brand Header */}
        <div className="p-4 border-b border-school-navy-light flex items-center space-x-3">
          <div className="relative shrink-0 drop-shadow" style={{ width: 40, height: 40, minWidth: 40 }}>
            <Image
              src="/images/brand/logo.png"
              alt="Lahore Elite School Crest"
              width={40}
              height={40}
              style={{ width: "40px", height: "40px", objectFit: "contain" }}
            />
          </div>
          <div className="overflow-hidden">
            <h2 className="text-sm font-extrabold text-white truncate">Lahore Elite School</h2>
            <span className="text-[10px] font-bold text-school-gold uppercase tracking-wider block">
              Admin Control Panel
            </span>
          </div>
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-5">
          {navSections.map((section, sIdx) => (
            <div key={sIdx} className="space-y-1">
              <span className="text-[10px] font-extrabold tracking-wider text-slate-400 px-3 uppercase">
                {section.title}
              </span>
              <div className="space-y-0.5 pt-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center space-x-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                        active
                          ? "bg-school-gold text-school-navy-deep font-bold shadow-sm"
                          : "text-slate-200 hover:bg-school-navy-light hover:text-white"
                      }`}
                    >
                      <Icon className={`w-4 h-4 shrink-0 ${active ? "text-school-navy-deep" : "text-school-gold"}`} />
                      <span className="truncate">{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-school-navy-light flex items-center justify-between">
          <Link
            href="/"
            target="_blank"
            className="text-[11px] text-slate-300 hover:text-school-gold flex items-center space-x-1"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Public Site</span>
          </Link>

          <button
            onClick={handleLogout}
            className="text-[11px] text-rose-300 hover:text-rose-100 flex items-center space-x-1"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-white border-b border-school-border h-16 px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 rounded-lg text-school-navy hover:bg-slate-100"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden sm:flex items-center space-x-2 text-xs text-school-muted">
              <span className="font-semibold text-school-navy">Campus:</span>
              <span className="bg-school-gold-light text-school-navy font-bold px-2 py-0.5 rounded">
                Al-Nisa & Sabzazar (Lahore)
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg border border-school-border text-xs font-semibold text-school-text hover:bg-slate-50"
            >
              <ExternalLink className="w-3.5 h-3.5 text-school-navy" />
              <span>View Website</span>
            </Link>

            <Link
              href="/admin/announcements"
              className="p-2 rounded-lg text-school-muted hover:text-school-navy hover:bg-slate-100 relative"
              aria-label="View notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="w-2 h-2 rounded-full bg-school-error absolute top-1.5 right-1.5" />
            </Link>

            <div className="flex items-center space-x-2 border-l pl-3 border-school-border">
              <div className="w-8 h-8 rounded-full bg-school-navy text-school-gold font-extrabold flex items-center justify-center text-xs">
                AD
              </div>
              <div className="hidden md:block text-left">
                <span className="text-xs font-bold text-school-navy block leading-tight">Administrator</span>
                <span className="text-[10px] text-school-muted block">Super Admin</span>
              </div>
              <button
                onClick={handleLogout}
                className="p-1.5 text-school-muted hover:text-rose-600 rounded-lg hover:bg-rose-50"
                title="Sign out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>

        {/* Page Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="relative w-72 max-w-[85vw] bg-school-navy text-white flex flex-col justify-between shadow-2xl z-10">
            <div className="p-4 border-b border-school-navy-light flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="relative shrink-0 drop-shadow" style={{ width: 32, height: 32, minWidth: 32 }}>
                  <Image src="/images/brand/logo.png" alt="Logo" width={32} height={32} style={{ width: "32px", height: "32px", objectFit: "contain" }} />
                </div>
                <span className="font-bold text-sm text-white">LES Admin Panel</span>
              </div>
              <button onClick={() => setMobileOpen(false)} className="p-1.5 text-slate-300 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-4">
              {navSections.map((section, sIdx) => (
                <div key={sIdx} className="space-y-1">
                  <span className="text-[10px] font-extrabold tracking-wider text-slate-400 px-3 uppercase">
                    {section.title}
                  </span>
                  <div className="space-y-0.5 pt-1">
                    {section.items.map((item) => {
                      const Icon = item.icon;
                      const active = isActive(item.href);
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className={`flex items-center space-x-2.5 px-3 py-2 rounded-lg text-xs font-semibold ${
                            active
                              ? "bg-school-gold text-school-navy-deep font-bold"
                              : "text-slate-200 hover:bg-school-navy-light"
                          }`}
                        >
                          <Icon className={`w-4 h-4 shrink-0 ${active ? "text-school-navy-deep" : "text-school-gold"}`} />
                          <span className="truncate">{item.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 border-t border-school-navy-light flex items-center justify-between">
              <Link href="/" target="_blank" className="text-xs text-slate-300 hover:text-school-gold">
                View Public Site
              </Link>
              <button onClick={handleLogout} className="text-xs text-rose-300 hover:text-rose-100 flex items-center space-x-1">
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
