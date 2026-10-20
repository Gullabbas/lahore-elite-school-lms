"use client";

import React, { useState } from "react";
import Link from "next/link";
import { formatPKR, formatDate, getWhatsAppUrl } from "@/lib/utils";
import {
  UserCheck,
  Plus,
  Search,
  MessageSquare,
  DollarSign,
  Calendar,
  X,
  Loader2,
  AlertCircle,
  Briefcase,
  Phone,
} from "lucide-react";

interface StaffMember {
  id: string;
  employeeId: string;
  fullName: string;
  phone: string;
  whatsapp: string | null;
  email: string | null;
  designation: string;
  department: string;
  basicSalary: number;
  status: string;
  qualification: string | null;
  campus: { id: string; name: string };
  joiningDate: string;
}

interface CampusOption {
  id: string;
  name: string;
}

interface Props {
  initialStaff: StaffMember[];
  campuses: CampusOption[];
}

export default function StaffManager({ initialStaff, campuses }: Props) {
  const [staffList, setStaffList] = useState<StaffMember[]>(initialStaff);
  const [search, setSearch] = useState("");
  const [selectedCampusId, setSelectedCampusId] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  const [newStaff, setNewStaff] = useState({
    employeeId: `LES-T-${100 + staffList.length + 1}`,
    fullName: "",
    phone: "",
    whatsapp: "",
    email: "",
    designation: "Senior Science Teacher",
    department: "Academics",
    campusId: campuses[0]?.id || "",
    basicSalary: 42000,
    qualification: "M.Sc. / B.Ed",
    address: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const filteredStaff = staffList.filter((s) => {
    const matchesSearch =
      search === "" ||
      s.fullName.toLowerCase().includes(search.toLowerCase()) ||
      s.employeeId.toLowerCase().includes(search.toLowerCase()) ||
      s.designation.toLowerCase().includes(search.toLowerCase()) ||
      s.department.toLowerCase().includes(search.toLowerCase());

    const matchesCampus = selectedCampusId === "" || s.campus.id === selectedCampusId;
    return matchesSearch && matchesCampus;
  });

  const handleCreateStaff = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/staff", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newStaff),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to create staff member");
      }

      // Refresh list
      const fetchRes = await fetch("/api/staff");
      const fetchData = await fetchRes.json();
      if (fetchData.staff) {
        setStaffList(fetchData.staff);
      }

      setShowAddModal(false);
      setNewStaff({
        employeeId: `LES-T-${100 + staffList.length + 2}`,
        fullName: "",
        phone: "",
        whatsapp: "",
        email: "",
        designation: "Senior Science Teacher",
        department: "Academics",
        campusId: campuses[0]?.id || "",
        basicSalary: 42000,
        qualification: "M.Sc. / B.Ed",
        address: "",
      });
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-school-border shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-school-navy">Teachers & Staff Directory</h1>
          <p className="text-xs text-school-muted">
            Managing {staffList.length} instructors and operational personnel.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 rounded-lg bg-school-navy text-white text-xs font-bold hover:bg-school-navy-light flex items-center space-x-1.5 shadow"
        >
          <Plus className="w-4 h-4 text-school-gold" />
          <span>Add Faculty Member</span>
        </button>
      </div>

      {/* Filter / Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 bg-white p-4 rounded-xl border border-school-border shadow-sm">
        <div className="sm:col-span-8 relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by teacher name, employee ID, designation, or department..."
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-school-border text-xs focus:ring-2 focus:ring-school-gold focus:border-school-navy"
          />
          <Search className="w-4 h-4 text-school-muted absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        <div className="sm:col-span-4">
          <select
            value={selectedCampusId}
            onChange={(e) => setSelectedCampusId(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-school-border text-xs bg-white text-school-text"
          >
            <option value="">All Campuses</option>
            {campuses.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Staff Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStaff.map((staff) => (
          <div
            key={staff.id}
            className="bg-white rounded-2xl p-6 border border-school-border shadow-sm flex flex-col justify-between space-y-4 hover:border-school-gold transition-all"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold bg-school-navy/5 text-school-navy px-2 py-0.5 rounded">
                  {staff.employeeId}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    staff.status === "ACTIVE"
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {staff.status}
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-xl bg-school-navy text-school-gold font-bold text-lg flex items-center justify-center shrink-0">
                  {staff.fullName.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-school-navy text-sm">{staff.fullName}</h3>
                  <span className="text-xs text-school-gold-warm font-semibold block">
                    {staff.designation}
                  </span>
                  <span className="text-[11px] text-school-muted block">
                    Dept: {staff.department} • {staff.campus.name}
                  </span>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-3 space-y-1.5 text-xs text-school-muted">
                <div className="flex justify-between">
                  <span>Basic Salary:</span>
                  <strong className="text-school-navy font-bold">{formatPKR(staff.basicSalary)}/mo</strong>
                </div>
                <div className="flex justify-between">
                  <span>Qualification:</span>
                  <span className="font-medium text-slate-700">{staff.qualification || "Graduation"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Phone:</span>
                  <span className="font-semibold text-slate-700">{staff.phone}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t flex items-center justify-between">
              <a
                href={getWhatsAppUrl(
                  staff.whatsapp || staff.phone,
                  `Assalam-o-Alaikum ${staff.fullName}, this is an administrative message from Lahore Elite School.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 flex items-center space-x-1"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>

              <Link
                href="/admin/payroll"
                className="text-xs font-bold text-school-navy hover:underline"
              >
                View Payroll →
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Add Staff Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-school-border max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3 mb-4">
              <h2 className="text-lg font-bold text-school-navy">Add Faculty / Staff Member</h2>
              <button onClick={() => setShowAddModal(false)} className="text-school-muted hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleCreateStaff} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-school-navy block mb-1">Employee ID *</label>
                  <input
                    type="text"
                    required
                    value={newStaff.employeeId}
                    onChange={(e) => setNewStaff({ ...newStaff, employeeId: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-school-border font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="font-bold text-school-navy block mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={newStaff.fullName}
                    onChange={(e) => setNewStaff({ ...newStaff, fullName: e.target.value })}
                    placeholder="e.g. Prof. Tariq Jamil"
                    className="w-full px-3 py-2 rounded-lg border border-school-border"
                  />
                </div>

                <div>
                  <label className="font-bold text-school-navy block mb-1">Contact Phone *</label>
                  <input
                    type="tel"
                    required
                    value={newStaff.phone}
                    onChange={(e) => setNewStaff({ ...newStaff, phone: e.target.value })}
                    placeholder="0321-1234567"
                    className="w-full px-3 py-2 rounded-lg border border-school-border"
                  />
                </div>

                <div>
                  <label className="font-bold text-school-navy block mb-1">WhatsApp Number</label>
                  <input
                    type="tel"
                    value={newStaff.whatsapp}
                    onChange={(e) => setNewStaff({ ...newStaff, whatsapp: e.target.value })}
                    placeholder="0321-1234567"
                    className="w-full px-3 py-2 rounded-lg border border-school-border"
                  />
                </div>

                <div>
                  <label className="font-bold text-school-navy block mb-1">Designation *</label>
                  <input
                    type="text"
                    required
                    value={newStaff.designation}
                    onChange={(e) => setNewStaff({ ...newStaff, designation: e.target.value })}
                    placeholder="e.g. Senior Science Teacher"
                    className="w-full px-3 py-2 rounded-lg border border-school-border"
                  />
                </div>

                <div>
                  <label className="font-bold text-school-navy block mb-1">Department *</label>
                  <input
                    type="text"
                    required
                    value={newStaff.department}
                    onChange={(e) => setNewStaff({ ...newStaff, department: e.target.value })}
                    placeholder="e.g. Academics / Administration"
                    className="w-full px-3 py-2 rounded-lg border border-school-border"
                  />
                </div>

                <div>
                  <label className="font-bold text-school-navy block mb-1">Assigned Campus *</label>
                  <select
                    value={newStaff.campusId}
                    onChange={(e) => setNewStaff({ ...newStaff, campusId: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-school-border bg-white"
                  >
                    {campuses.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-school-navy block mb-1">Basic Monthly Salary (PKR) *</label>
                  <input
                    type="number"
                    required
                    value={newStaff.basicSalary}
                    onChange={(e) => setNewStaff({ ...newStaff, basicSalary: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 rounded-lg border border-school-border"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-school-navy block mb-1">Academic Qualification</label>
                <input
                  type="text"
                  value={newStaff.qualification}
                  onChange={(e) => setNewStaff({ ...newStaff, qualification: e.target.value })}
                  placeholder="e.g. M.Sc. Physics (Punjab University), B.Ed"
                  className="w-full px-3 py-2 rounded-lg border border-school-border"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-lg border border-school-border font-bold text-school-muted"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 rounded-lg bg-school-navy text-white font-bold hover:bg-school-navy-light flex items-center space-x-1.5"
                >
                  {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-3.5 h-3.5 text-school-gold" />}
                  <span>Save Staff Record</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
