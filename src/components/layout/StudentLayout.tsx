"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  Clock,
  BookOpen,
  Award,
  Receipt,
  FileCheck2,
  FileText,
  LogOut,
  Menu,
  X,
  ExternalLink,
  GraduationCap,
  Layers,
  Sparkles,
  Phone,
} from "lucide-react";

interface StudentLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { name: "My Dashboard", href: "/student", icon: LayoutDashboard },
  { name: "Class Timetable", href: "/student/timetable", icon: Calendar },
  { name: "My Attendance", href: "/student/attendance", icon: Clock },
  { name: "Homework & Tasks", href: "/student/assignments", icon: Layers },
  { name: "Exam Date Sheets", href: "/student/examinations", icon: FileText },
  { name: "Progress Report", href: "/student/results", icon: FileCheck2 },
  { name: "Fee Vouchers", href: "/student/fees", icon: Receipt },
  { name: "My Certificates", href: "/student/certificates", icon: Award },
];

export default function StudentLayout({ children }: StudentLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  };

  const isActive = (href: string) => {
    if (href === "/student") return pathname === "/student";
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-school-bg flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-school-navy text-white border-r border-school-navy-light shrink-0">
        <div className="p-4 border-b border-school-navy-light flex items-center space-x-3">
          <div className="relative shrink-0 drop-shadow" style={{ width: 40, height: 40, minWidth: 40 }}>
            <Image src="/images/brand/logo.png" alt="Logo" width={40} height={40} style={{ width: "40px", height: "40px", objectFit: "contain" }} />
          </div>
          <div>
            <h2 className="text-sm font-extrabold text-white truncate">Lahore Elite School</h2>
            <span className="text-[10px] font-bold text-school-gold uppercase tracking-wider block">
              Student / Parent Portal
            </span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-2.5 px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
                  active
                    ? "bg-school-gold text-school-navy-deep font-bold shadow"
                    : "text-slate-200 hover:bg-school-navy-light hover:text-white"
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${active ? "text-school-navy-deep" : "text-school-gold"}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>

        <div className="p-3 bg-school-navy-deep/60 m-3 rounded-xl border border-school-gold/20 text-xs">
          <div className="flex items-center space-x-2 text-school-gold font-bold mb-1">
            <GraduationCap className="w-4 h-4" />
            <span>Academic Portal</span>
          </div>
          <p className="text-[11px] text-slate-300 leading-tight">
            Lahore Elite School &bull; Al-Nisa &amp; Sabzazar Campuses
          </p>
        </div>

        <div className="p-3 border-t border-school-navy-light flex items-center justify-between text-xs">
          <Link href="/" target="_blank" className="text-slate-300 hover:text-school-gold flex items-center space-x-1">
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Public Website</span>
          </Link>
          <button onClick={handleLogout} className="text-rose-300 hover:text-rose-100 flex items-center space-x-1">
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="fixed inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-school-navy text-white p-4">
            <div className="flex items-center justify-between pb-4 border-b border-school-navy-light">
              <div className="flex items-center space-x-2">
                <div className="relative shrink-0 drop-shadow" style={{ width: 32, height: 32, minWidth: 32 }}>
                  <Image src="/images/brand/logo.png" alt="Logo" width={32} height={32} style={{ width: "32px", height: "32px", objectFit: "contain" }} />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white">Lahore Elite School</h3>
                  <p className="text-[10px] text-school-gold">Student Portal</p>
                </div>
              </div>
              <button onClick={() => setMobileOpen(false)} className="p-1 rounded text-slate-300 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center space-x-2.5 px-3 py-2.5 rounded-lg text-xs font-semibold ${
                      active
                        ? "bg-school-gold text-school-navy-deep font-bold"
                        : "text-slate-200 hover:bg-school-navy-light"
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>

            <div className="pt-3 border-t border-school-navy-light flex items-center justify-between text-xs">
              <Link href="/" target="_blank" className="text-slate-300 hover:text-white flex items-center space-x-1">
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Public Site</span>
              </Link>
              <button onClick={handleLogout} className="text-rose-300 hover:text-rose-100 flex items-center space-x-1">
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 bg-white border-b border-school-border h-16 px-4 sm:px-6 flex items-center justify-between shadow-sm">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 rounded-lg text-school-navy hover:bg-slate-100"
              aria-label="Toggle navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-school-navy hidden sm:inline">
                Lahore Elite School &bull; Student Desk
              </span>
              <span className="text-xs font-bold text-school-navy sm:hidden">LES Student Desk</span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 border-l pl-3 border-school-border">
              <div className="w-8 h-8 rounded-full bg-school-gold text-school-navy-deep font-bold flex items-center justify-center text-xs shadow-sm">
                ST
              </div>
              <div className="hidden sm:block text-left text-xs">
                <span className="font-bold text-school-navy block">Student / Parent Portal</span>
                <span className="text-[10px] text-school-muted block">Academic Session 2025-2026</span>
              </div>
              <button
                onClick={handleLogout}
                className="p-1.5 text-school-muted hover:text-rose-600 rounded-lg hover:bg-rose-50"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-6xl w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}
