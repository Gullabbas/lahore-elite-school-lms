"use client";

import React, { useState } from "react";
import Link from "next/link";
import { formatPKR } from "@/lib/utils";
import {
  Users,
  Search,
  Plus,
  Download,
  Upload,
  Eye,
  CreditCard,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Loader2,
  X,
  FileSpreadsheet,
} from "lucide-react";

interface Student {
  id: string;
  admissionNo: string;
  fullName: string;
  fatherName: string;
  gender: string;
  phone: string;
  address: string;
  monthlyTuitionFee: number;
  discountAmount: number;
  feeStatus: string;
  enrollmentStatus: string;
  class: { id: string; name: string };
  section: { id: string; name: string };
  campus: { id: string; name: string };
}

interface ClassOption {
  id: string;
  name: string;
  sections: { id: string; name: string }[];
}

interface CampusOption {
  id: string;
  name: string;
}

interface Props {
  initialStudents: Student[];
  classes: ClassOption[];
  campuses: CampusOption[];
  currentSessionId: string;
}

export default function StudentsManager({
  initialStudents,
  classes,
  campuses,
  currentSessionId,
}: Props) {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [search, setSearch] = useState("");
  const [selectedClassId, setSelectedClassId] = useState("");
  const [selectedCampusId, setSelectedCampusId] = useState("");

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);

  // New Student Form State
  const [newStudent, setNewStudent] = useState({
    admissionNo: `LES-2025-${String(students.length + 1).padStart(3, "0")}`,
    fullName: "",
    fatherName: "",
    guardianRelation: "Father",
    dob: "2012-05-10",
    gender: "Male",
    phone: "",
    address: "",
    monthlyTuitionFee: 6000,
    discountAmount: 0,
    campusId: campuses[0]?.id || "",
    classId: classes[0]?.id || "",
    sectionId: classes[0]?.sections[0]?.id || "",
    academicSessionId: currentSessionId,
  });

  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // CSV Import State
  const [csvText, setCsvText] = useState("");
  const [importLoading, setImportLoading] = useState(false);
  const [importResult, setImportResult] = useState<{ message: string; errors: string[] } | null>(null);

  // Filter students locally
  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      search === "" ||
      s.fullName.toLowerCase().includes(search.toLowerCase()) ||
      s.admissionNo.toLowerCase().includes(search.toLowerCase()) ||
      s.fatherName.toLowerCase().includes(search.toLowerCase()) ||
      s.phone.includes(search);

    const matchesClass = selectedClassId === "" || s.class.id === selectedClassId;
    const matchesCampus = selectedCampusId === "" || s.campus.id === selectedCampusId;

    return matchesSearch && matchesClass && matchesCampus;
  });

  const handleCreateStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError(null);

    try {
      const res = await fetch("/api/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newStudent),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to create student");
      }

      // Refresh list
      const fetchRes = await fetch("/api/students");
      const fetchData = await fetchRes.json();
      if (fetchData.students) {
        setStudents(fetchData.students);
      }

      setShowAddModal(false);
      setNewStudent({
        admissionNo: `LES-2025-${String(students.length + 2).padStart(3, "0")}`,
        fullName: "",
        fatherName: "",
        guardianRelation: "Father",
        dob: "2012-05-10",
        gender: "Male",
        phone: "",
        address: "",
        monthlyTuitionFee: 6000,
        discountAmount: 0,
        campusId: campuses[0]?.id || "",
        classId: classes[0]?.id || "",
        sectionId: classes[0]?.sections[0]?.id || "",
        academicSessionId: currentSessionId,
      });
    } catch (err: any) {
      setFormError(err.message || "Could not register student");
    } finally {
      setFormLoading(false);
    }
  };

  const handleImportCSV = async () => {
    if (!csvText.trim()) return;
    setImportLoading(true);
    setImportResult(null);

    try {
      const res = await fetch("/api/students/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ csvContent: csvText }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "CSV Import failed");
      }

      setImportResult({ message: data.message, errors: data.errors || [] });

      // Refresh list
      const fetchRes = await fetch("/api/students");
      const fetchData = await fetchRes.json();
      if (fetchData.students) {
        setStudents(fetchData.students);
      }
    } catch (err: any) {
      setImportResult({ message: err.message, errors: [] });
    } finally {
      setImportLoading(false);
    }
  };

  const downloadCSVTemplate = () => {
    const template =
      "AdmissionNo,FullName,FatherName,Gender,Phone,ClassCode,MonthlyFee,Address\nLES-2025-099,Saad Tariq,Tariq Mahmood,Male,0300-4279059,C9,6500,Multan Road Lahore";
    const blob = new Blob([template], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Lahore_Elite_School_Student_Import_Template.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-school-border shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-school-navy">Student Registry & Enrollment</h1>
          <p className="text-xs text-school-muted">
            Managing {students.length} enrolled students across campuses.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-3.5 py-2 rounded-lg bg-school-navy text-white text-xs font-bold hover:bg-school-navy-light flex items-center space-x-1.5 transition-all shadow"
          >
            <Plus className="w-3.5 h-3.5 text-school-gold" />
            <span>Add Student</span>
          </button>

          <button
            onClick={() => setShowImportModal(true)}
            className="px-3.5 py-2 rounded-lg bg-white border border-school-border text-school-navy text-xs font-bold hover:bg-slate-50 flex items-center space-x-1.5 transition-all"
          >
            <Upload className="w-3.5 h-3.5 text-school-navy" />
            <span>Import CSV</span>
          </button>

          <a
            href="/api/students/export"
            className="px-3.5 py-2 rounded-lg bg-white border border-school-border text-school-navy text-xs font-bold hover:bg-slate-50 flex items-center space-x-1.5 transition-all"
          >
            <Download className="w-3.5 h-3.5 text-school-navy" />
            <span>Export CSV</span>
          </a>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 bg-white p-4 rounded-xl border border-school-border shadow-sm">
        <div className="sm:col-span-6 relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search student by name, admission no, father's name or phone..."
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-school-border text-xs focus:ring-2 focus:ring-school-gold focus:border-school-navy"
          />
          <Search className="w-4 h-4 text-school-muted absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        <div className="sm:col-span-3">
          <select
            value={selectedClassId}
            onChange={(e) => setSelectedClassId(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-school-border text-xs bg-white text-school-text focus:ring-2 focus:ring-school-gold focus:border-school-navy"
          >
            <option value="">All Classes</option>
            {classes.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-3">
          <select
            value={selectedCampusId}
            onChange={(e) => setSelectedCampusId(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-school-border text-xs bg-white text-school-text focus:ring-2 focus:ring-school-gold focus:border-school-navy"
          >
            <option value="">All Campuses</option>
            {campuses.map((cp) => (
              <option key={cp.id} value={cp.id}>
                {cp.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Students Data Table */}
      <div className="bg-white rounded-2xl border border-school-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 font-bold text-school-navy border-b border-school-border">
              <tr>
                <th className="py-3.5 px-4">Adm No</th>
                <th className="py-3.5 px-4">Student Name</th>
                <th className="py-3.5 px-4">Father Name</th>
                <th className="py-3.5 px-4">Class & Section</th>
                <th className="py-3.5 px-4">Campus</th>
                <th className="py-3.5 px-4">Monthly Fee</th>
                <th className="py-3.5 px-4">Fee Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-school-border text-school-text">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-school-muted">
                    No student records found matching the filters.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((st) => (
                  <tr key={st.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-school-navy">
                      {st.admissionNo}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-school-navy">
                      <Link
                        href={`/admin/students/${st.id}`}
                        className="hover:underline flex items-center space-x-1"
                      >
                        <span>{st.fullName}</span>
                      </Link>
                    </td>
                    <td className="py-3.5 px-4">{st.fatherName}</td>
                    <td className="py-3.5 px-4">
                      {st.class?.name} ({st.section?.name})
                    </td>
                    <td className="py-3.5 px-4 text-school-muted">{st.campus?.name}</td>
                    <td className="py-3.5 px-4 font-semibold text-school-navy">
                      {formatPKR(st.monthlyTuitionFee)}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          st.feeStatus === "CURRENT"
                            ? "bg-emerald-50 text-emerald-700"
                            : st.feeStatus === "PARTIAL"
                            ? "bg-amber-50 text-amber-700"
                            : "bg-rose-50 text-rose-700"
                        }`}
                      >
                        {st.feeStatus}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end space-x-1.5">
                        <Link
                          href={`/admin/students/${st.id}`}
                          className="p-1 text-school-navy hover:bg-slate-100 rounded"
                          title="View Profile & Academic History"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </Link>
                        <Link
                          href={`/admin/id-cards?studentId=${st.id}`}
                          className="p-1 text-school-navy hover:bg-slate-100 rounded"
                          title="Generate Student ID Card"
                        >
                          <CreditCard className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Student Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-school-border max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3 mb-4">
              <h2 className="text-lg font-bold text-school-navy">Register New Student</h2>
              <button onClick={() => setShowAddModal(false)} className="text-school-muted hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="mb-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleCreateStudent} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="font-bold text-school-navy block mb-1">Admission Number *</label>
                  <input
                    type="text"
                    required
                    value={newStudent.admissionNo}
                    onChange={(e) => setNewStudent({ ...newStudent, admissionNo: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-school-border font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="font-bold text-school-navy block mb-1">Student Full Name *</label>
                  <input
                    type="text"
                    required
                    value={newStudent.fullName}
                    onChange={(e) => setNewStudent({ ...newStudent, fullName: e.target.value })}
                    placeholder="e.g. Muhammad Bilal"
                    className="w-full px-3 py-2 rounded-lg border border-school-border"
                  />
                </div>

                <div>
                  <label className="font-bold text-school-navy block mb-1">Father / Guardian Name *</label>
                  <input
                    type="text"
                    required
                    value={newStudent.fatherName}
                    onChange={(e) => setNewStudent({ ...newStudent, fatherName: e.target.value })}
                    placeholder="e.g. Tariq Mehmood"
                    className="w-full px-3 py-2 rounded-lg border border-school-border"
                  />
                </div>

                <div>
                  <label className="font-bold text-school-navy block mb-1">Contact Phone (WhatsApp) *</label>
                  <input
                    type="tel"
                    required
                    value={newStudent.phone}
                    onChange={(e) => setNewStudent({ ...newStudent, phone: e.target.value })}
                    placeholder="0300-1234567"
                    className="w-full px-3 py-2 rounded-lg border border-school-border"
                  />
                </div>

                <div>
                  <label className="font-bold text-school-navy block mb-1">Gender *</label>
                  <select
                    value={newStudent.gender}
                    onChange={(e) => setNewStudent({ ...newStudent, gender: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-school-border bg-white"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-school-navy block mb-1">Campus *</label>
                  <select
                    value={newStudent.campusId}
                    onChange={(e) => setNewStudent({ ...newStudent, campusId: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-school-border bg-white"
                  >
                    {campuses.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-school-navy block mb-1">Class *</label>
                  <select
                    value={newStudent.classId}
                    onChange={(e) => {
                      const cId = e.target.value;
                      const matched = classes.find((c) => c.id === cId);
                      setNewStudent({
                        ...newStudent,
                        classId: cId,
                        sectionId: matched?.sections[0]?.id || "",
                      });
                    }}
                    className="w-full px-3 py-2 rounded-lg border border-school-border bg-white"
                  >
                    {classes.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-school-navy block mb-1">Section *</label>
                  <select
                    value={newStudent.sectionId}
                    onChange={(e) => setNewStudent({ ...newStudent, sectionId: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-school-border bg-white"
                  >
                    {classes
                      .find((c) => c.id === newStudent.classId)
                      ?.sections.map((s) => (
                        <option key={s.id} value={s.id}>{s.name}</option>
                      ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-school-navy block mb-1">Monthly Tuition Fee (PKR) *</label>
                  <input
                    type="number"
                    required
                    value={newStudent.monthlyTuitionFee}
                    onChange={(e) => setNewStudent({ ...newStudent, monthlyTuitionFee: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 rounded-lg border border-school-border"
                  />
                </div>

                <div>
                  <label className="font-bold text-school-navy block mb-1">Sibling Discount (PKR)</label>
                  <input
                    type="number"
                    value={newStudent.discountAmount}
                    onChange={(e) => setNewStudent({ ...newStudent, discountAmount: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 rounded-lg border border-school-border"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-school-navy block mb-1 text-xs">Home Address in Lahore *</label>
                <input
                  type="text"
                  required
                  value={newStudent.address}
                  onChange={(e) => setNewStudent({ ...newStudent, address: e.target.value })}
                  placeholder="Street, Block, Area, Lahore"
                  className="w-full px-3 py-2 rounded-lg border border-school-border text-xs"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-lg border border-school-border text-xs font-bold text-school-muted hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formLoading}
                  className="px-5 py-2 rounded-lg bg-school-navy text-white text-xs font-bold hover:bg-school-navy-light flex items-center space-x-1.5"
                >
                  {formLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-3.5 h-3.5 text-school-gold" />}
                  <span>Save Student Record</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CSV Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-school-border">
            <div className="flex items-center justify-between border-b pb-3 mb-4">
              <h2 className="text-lg font-bold text-school-navy flex items-center space-x-2">
                <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
                <span>Import Students via CSV</span>
              </h2>
              <button onClick={() => setShowImportModal(false)} className="text-school-muted hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border flex items-center justify-between">
                <div>
                  <span className="font-bold text-school-navy block">Download Sample CSV Template</span>
                  <span className="text-school-muted text-[11px]">Headers: AdmissionNo, FullName, FatherName, Gender, Phone, ClassCode, MonthlyFee, Address</span>
                </div>
                <button
                  type="button"
                  onClick={downloadCSVTemplate}
                  className="px-3 py-1.5 rounded-lg bg-school-navy text-white text-xs font-bold hover:bg-school-navy-light flex items-center space-x-1 shrink-0"
                >
                  <Download className="w-3.5 h-3.5 text-school-gold" />
                  <span>Download</span>
                </button>
              </div>

              <div>
                <label className="font-bold text-school-navy block mb-1">Paste CSV Content Below</label>
                <textarea
                  rows={6}
                  value={csvText}
                  onChange={(e) => setCsvText(e.target.value)}
                  placeholder="AdmissionNo,FullName,FatherName,Gender,Phone,ClassCode,MonthlyFee,Address&#10;LES-2025-050,Hamza Farooq,Farooq Ahmed,Male,0321-4567891,C9,6500,Sabzazar Lahore"
                  className="w-full p-3 font-mono text-[11px] rounded-xl border border-school-border focus:ring-2 focus:ring-school-gold"
                />
              </div>

              {importResult && (
                <div
                  className={`p-3 rounded-lg border text-xs ${
                    importResult.errors.length === 0
                      ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                      : "bg-amber-50 border-amber-200 text-amber-800"
                  }`}
                >
                  <p className="font-bold">{importResult.message}</p>
                  {importResult.errors.map((err, i) => (
                    <p key={i} className="text-rose-600 text-[11px]">• {err}</p>
                  ))}
                </div>
              )}

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowImportModal(false)}
                  className="px-4 py-2 rounded-lg border border-school-border text-xs font-bold"
                >
                  Close
                </button>
                <button
                  type="button"
                  disabled={importLoading || !csvText.trim()}
                  onClick={handleImportCSV}
                  className="px-5 py-2 rounded-lg bg-school-navy text-white text-xs font-bold hover:bg-school-navy-light flex items-center space-x-1.5 disabled:opacity-60"
                >
                  {importLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5 text-school-gold" />}
                  <span>Parse & Import Students</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
