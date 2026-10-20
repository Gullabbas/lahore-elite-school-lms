"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Clock,
  Layers,
  BookOpen,
  Calendar,
  Receipt,
  HelpCircle,
  LogOut,
  Menu,
  X,
  ExternalLink,
  Bell,
  Heart,
} from "lucide-react";

interface Props {
  children: React.ReactNode;
}

const navItems = [
  { name: "My Dashboard", href: "/staff", icon: LayoutDashboard },
  { name: "My Teaching Timetable", href: "/staff/timetable", icon: Calendar },
  { name: "Mark Class Attendance", href: "/staff/attendance", icon: Clock },
  { name: "Homework & Tasks", href: "/staff/assignments", icon: Layers },
  { name: "Enter Exam Marks", href: "/staff/results", icon: BookOpen },
  { name: "My Salary Slips", href: "/staff/salary", icon: Receipt },
  { name: "Leave Requests", href: "/staff/leave", icon: Heart },
  { name: "Help & Developer Support", href: "/staff/support", icon: HelpCircle },
];

export default function StaffLayout({ children }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  };

  const isActive = (href: string) => {
    if (href === "/staff") return pathname === "/staff";
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-school-bg flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-school-navy text-white border-r border-school-navy-light shrink-0">
        <div className="p-4 border-b border-school-navy-light flex items-center space-x-3">
          <div className="relative shrink-0 drop-shadow" style={{ width: 40, height: 40, minWidth: 40 }}>
            <Image src="/images/brand/logo.png" alt="Logo" width={40} height={40} style={{ width: "40px", height: "40px", objectFit: "contain" }} />
          </div>
          <div>
            <h2 className="text-sm font-extrabold text-white truncate">Lahore Elite School</h2>
            <span className="text-[10px] font-bold text-school-gold uppercase tracking-wider block">
              Faculty / Staff Portal
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

        <div className="p-3 border-t border-school-navy-light flex items-center justify-between text-xs">
          <Link href="/" target="_blank" className="text-slate-300 hover:text-school-gold flex items-center space-x-1">
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Public Site</span>
          </Link>
          <button onClick={handleLogout} className="text-rose-300 hover:text-rose-100 flex items-center space-x-1">
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 bg-white border-b border-school-border h-16 px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button onClick={() => setMobileOpen(true)} className="lg:hidden p-2 rounded-lg text-school-navy hover:bg-slate-100">
              <Menu className="w-5 h-5" />
            </button>
            <span className="text-xs font-bold text-school-navy">Lahore Elite School Faculty Desk</span>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 border-l pl-3 border-school-border">
              <div className="w-8 h-8 rounded-full bg-school-gold text-school-navy-deep font-bold flex items-center justify-center text-xs">
                TC
              </div>
              <div className="hidden sm:block text-left text-xs">
                <span className="font-bold text-school-navy block">Faculty Educator</span>
                <span className="text-[10px] text-school-muted block">Al-Nisa / Sabzazar</span>
              </div>
              <button onClick={handleLogout} className="p-1.5 text-school-muted hover:text-rose-600 rounded-lg">
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
