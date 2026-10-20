"use client";

import React, { useState } from "react";
import { formatDate } from "@/lib/utils";
import { ShieldCheck, User, Key, Lock, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

interface UserAccount {
  id: string;
  username: string;
  email: string | null;
  role: string;
  status: string;
  name: string;
  campusName: string;
  associatedProfile: string;
  createdAt: string;
}

interface Props {
  initialUsers: UserAccount[];
}

export default function AccountsManager({ initialUsers }: Props) {
  const [users, setUsers] = useState<UserAccount[]>(initialUsers);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [resetModalUserId, setResetModalUserId] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const toggleStatus = async (user: UserAccount) => {
    setLoadingId(user.id);
    const nextStatus = user.status === "ACTIVE" ? "SUSPENDED" : "ACTIVE";

    try {
      const res = await fetch("/api/accounts", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, status: nextStatus }),
      });

      if (!res.ok) throw new Error("Failed to change account status");

      setUsers((prev) =>
        prev.map((u) => (u.id === user.id ? { ...u, status: nextStatus } : u))
      );
      setMessage(`Account ${user.username} is now ${nextStatus}.`);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoadingId(null);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetModalUserId || newPassword.length < 4) return;

    try {
      const res = await fetch("/api/accounts", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: resetModalUserId, newPassword }),
      });

      if (!res.ok) throw new Error("Failed to reset password");

      setMessage("Password updated successfully!");
      setResetModalUserId(null);
      setNewPassword("");
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-school-border shadow-sm">
        <div>
          <span className="text-xs font-bold text-school-navy bg-school-gold-light px-2.5 py-1 rounded">
            Security & Access Control
          </span>
          <h1 className="text-xl font-bold text-school-navy mt-1">LMS User Accounts & Credentials</h1>
          <p className="text-xs text-school-muted">
            Managing {users.length} authenticated login credentials across Admin, Teacher, and Student roles.
          </p>
        </div>
      </div>

      {message && (
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-school-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 font-bold text-school-navy border-b">
              <tr>
                <th className="py-3 px-4">Username</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Linked Person</th>
                <th className="py-3 px-4">Campus</th>
                <th className="py-3 px-4">Created</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-school-border text-school-text">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-mono font-bold text-school-navy">{u.username}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        u.role === "ADMIN"
                          ? "bg-purple-50 text-purple-700"
                          : u.role === "TEACHER"
                          ? "bg-blue-50 text-blue-700"
                          : "bg-school-gold-light text-school-navy"
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-medium">{u.associatedProfile}</td>
                  <td className="py-3 px-4 text-school-muted">{u.campusName}</td>
                  <td className="py-3 px-4 text-school-muted">{formatDate(u.createdAt)}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        u.status === "ACTIVE"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-rose-50 text-rose-700"
                      }`}
                    >
                      {u.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => setResetModalUserId(u.id)}
                        className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-school-navy font-bold text-[10px]"
                      >
                        Reset Password
                      </button>

                      {u.username !== "admin" && (
                        <button
                          disabled={loadingId === u.id}
                          onClick={() => toggleStatus(u)}
                          className={`px-2.5 py-1 rounded text-[10px] font-bold ${
                            u.status === "ACTIVE"
                              ? "bg-rose-50 text-rose-700 hover:bg-rose-100"
                              : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                          }`}
                        >
                          {u.status === "ACTIVE" ? "Suspend" : "Activate"}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Password Reset Modal */}
      {resetModalUserId && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-school-border">
            <h3 className="font-bold text-school-navy text-base mb-1">Set New Password</h3>
            <p className="text-xs text-school-muted mb-4">Enter a new secure password for this account.</p>

            <form onSubmit={handleResetPassword} className="space-y-4">
              <input
                type="password"
                required
                minLength={4}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New password (min 4 chars)"
                className="w-full px-3 py-2 text-xs rounded-lg border border-school-border"
              />

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setResetModalUserId(null)}
                  className="px-3 py-1.5 rounded-lg border text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-school-navy text-white text-xs font-bold"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
