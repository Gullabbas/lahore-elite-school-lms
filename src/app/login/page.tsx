"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldAlert,
  GraduationCap,
  Briefcase,
  User,
  Key,
  Eye,
  EyeOff,
  Loader2,
  ArrowLeft,
  Sparkles,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

type RoleType = "ADMIN" | "TEACHER" | "STUDENT";

export default function LoginPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<RoleType>("ADMIN");
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin123");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRoleChange = (role: RoleType) => {
    setSelectedRole(role);
    setError(null);
    if (role === "ADMIN") {
      setUsername("admin");
      setPassword("admin123");
    } else if (role === "TEACHER") {
      setUsername("teacher1");
      setPassword("teacher123");
    } else if (role === "STUDENT") {
      setUsername("les-001");
      setPassword("student123");
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
          role: selectedRole,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Login authentication failed");
      }

      // Success redirect
      router.push(data.redirectUrl);
      router.refresh();
    } catch (err: any) {
      setError(err.message || "An unexpected login error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-school-navy-deep via-school-navy to-[#0f286b] flex flex-col justify-between p-4 sm:p-6 lg:p-8 text-white">
      {/* Top Header */}
      <div className="max-w-6xl w-full mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center space-x-2 text-xs sm:text-sm font-semibold text-slate-300 hover:text-school-gold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to School Website</span>
        </Link>
        <span className="text-xs text-school-gold font-bold">
          Lahore Elite School LMS Portal
        </span>
      </div>

      {/* Main Container */}
      <div className="max-w-4xl w-full mx-auto my-8 grid grid-cols-1 lg:grid-cols-12 rounded-3xl overflow-hidden shadow-2xl border-2 border-school-gold/30 bg-white text-school-text">
        {/* Left Visual Branding Panel */}
        <div className="lg:col-span-5 bg-gradient-to-b from-school-navy-deep to-school-navy p-8 sm:p-10 text-white flex flex-col justify-between space-y-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="relative shrink-0 drop-shadow-lg" style={{ width: 64, height: 64, minWidth: 64 }}>
                <Image
                  src="/images/brand/logo.png"
                  alt="Lahore Elite School Crest"
                  width={64}
                  height={64}
                  style={{ width: "64px", height: "64px", objectFit: "contain" }}
                />
              </div>
              <div>
                <h2 className="text-xl font-extrabold tracking-tight text-white leading-tight">
                  Lahore Elite School
                </h2>
                <p className="text-xs text-school-gold uppercase font-semibold tracking-wider">
                  Complete LMS & Portal
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 space-y-3">
              <h3 className="text-base font-bold text-school-gold">Role-Based Access</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Welcome to the unified digital campus of Lahore Elite School. Please select your
                portal role on the right to sign in.
              </p>
            </div>
          </div>

          {/* Quick Demo Credentials Assistant */}
          <div className="p-4 rounded-xl bg-white/10 border border-white/20 space-y-2 text-xs">
            <div className="flex items-center space-x-1 text-school-gold font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Instant Demo Account Credentials</span>
            </div>
            <div className="space-y-1 text-slate-300">
              <div
                onClick={() => handleRoleChange("ADMIN")}
                className="cursor-pointer hover:text-white flex justify-between p-1 rounded hover:bg-white/10"
              >
                <span>Admin:</span> <strong className="text-school-gold">admin / admin123</strong>
              </div>
              <div
                onClick={() => handleRoleChange("TEACHER")}
                className="cursor-pointer hover:text-white flex justify-between p-1 rounded hover:bg-white/10"
              >
                <span>Teacher:</span> <strong className="text-school-gold">teacher1 / teacher123</strong>
              </div>
              <div
                onClick={() => handleRoleChange("STUDENT")}
                className="cursor-pointer hover:text-white flex justify-between p-1 rounded hover:bg-white/10"
              >
                <span>Student:</span> <strong className="text-school-gold">les-001 / student123</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="lg:col-span-7 p-8 sm:p-10 space-y-6 flex flex-col justify-center">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-school-navy">Sign In to LMS</h1>
            <p className="text-xs text-school-muted mt-1">
              Select your authorization role and enter your portal credentials.
            </p>
          </div>

          {/* 3 Prominent Role Selector Tabs */}
          <div className="grid grid-cols-3 gap-2 p-1.5 rounded-xl bg-slate-100 border border-school-border">
            <button
              type="button"
              onClick={() => handleRoleChange("ADMIN")}
              className={`py-2.5 px-2 rounded-lg text-xs font-bold transition-all flex flex-col items-center space-y-1 ${
                selectedRole === "ADMIN"
                  ? "bg-school-navy text-white shadow-md"
                  : "text-school-muted hover:text-school-navy"
              }`}
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Admin</span>
            </button>

            <button
              type="button"
              onClick={() => handleRoleChange("TEACHER")}
              className={`py-2.5 px-2 rounded-lg text-xs font-bold transition-all flex flex-col items-center space-y-1 ${
                selectedRole === "TEACHER"
                  ? "bg-school-navy text-white shadow-md"
                  : "text-school-muted hover:text-school-navy"
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Teacher/Staff</span>
            </button>

            <button
              type="button"
              onClick={() => handleRoleChange("STUDENT")}
              className={`py-2.5 px-2 rounded-lg text-xs font-bold transition-all flex flex-col items-center space-y-1 ${
                selectedRole === "STUDENT"
                  ? "bg-school-navy text-white shadow-md"
                  : "text-school-muted hover:text-school-navy"
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Student</span>
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-school-navy mb-1.5">
                {selectedRole === "ADMIN" && "Administrator Username or Email"}
                {selectedRole === "TEACHER" && "Employee ID or Faculty Username"}
                {selectedRole === "STUDENT" && "Student Admission No or Username"}
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder={
                    selectedRole === "ADMIN"
                      ? "admin"
                      : selectedRole === "TEACHER"
                      ? "teacher1 or LES-T-101"
                      : "les-001 or LES-2025-001"
                  }
                  className="w-full px-4 py-3 rounded-xl border border-school-border focus:ring-2 focus:ring-school-gold focus:border-school-navy text-sm font-medium"
                />
                <User className="w-4 h-4 text-school-muted absolute right-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-school-navy">Password</label>
                <span className="text-[11px] text-school-muted">Default: admin123 / teacher123 / student123</span>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 rounded-xl border border-school-border focus:ring-2 focus:ring-school-gold focus:border-school-navy text-sm font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-school-muted hover:text-school-navy p-1"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-school-navy hover:bg-school-navy-light text-white font-bold text-sm shadow-md transition-all flex items-center justify-center space-x-2 disabled:opacity-70 mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-school-gold" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <Key className="w-4 h-4 text-school-gold" />
                  <span>Sign In as {selectedRole}</span>
                </>
              )}
            </button>
          </form>

          <div className="pt-2 text-center text-xs text-school-muted">
            <span>Need login assistance? Contact developer support at </span>
            <strong className="text-school-navy">+923341816004</strong>
          </div>
        </div>
      </div>

      {/* Footer copyright */}
      <div className="text-center text-xs text-slate-400">
        © {new Date().getFullYear()} Lahore Elite School, Lahore. All Rights Reserved.
      </div>
    </div>
  );
}
