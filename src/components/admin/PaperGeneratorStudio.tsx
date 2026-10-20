"use client";

import React, { useState } from "react";
import Image from "next/image";
import PrintButton from "@/components/ui/PrintButton";
import {
  FileText,
  Plus,
  Trash2,
  Printer,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  Clock,
  Award,
} from "lucide-react";

interface Question {
  id: number;
  type: "MCQ" | "Short" | "Long" | "FillBlank" | "TrueFalse";
  question: string;
  options?: string[];
  marks: number;
}

interface ClassOption {
  id: string;
  name: string;
  subjects: { id: string; name: string }[];
}

interface Props {
  classes: ClassOption[];
}

export default function PaperGeneratorStudio({ classes }: Props) {
  const [selectedClassId, setSelectedClassId] = useState(classes[0]?.id || "");
  const [selectedSubjectId, setSelectedSubjectId] = useState(
    classes[0]?.subjects[0]?.id || ""
  );

  const [title, setTitle] = useState("Mid-Term Examination 2025");
  const [examType, setExamType] = useState("Mid Term");
  const [duration, setDuration] = useState("2 Hours 30 Minutes");
  const [instructions, setInstructions] = useState(
    "Attempt all questions. Check question numbering carefully before answering. Overwriting or cutting will not be credited."
  );

  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      type: "MCQ",
      question: "Which of the following is the standard unit of force in Physics?",
      options: ["Joule", "Newton", "Watt", "Pascal"],
      marks: 5,
    },
    {
      id: 2,
      type: "MCQ",
      question: "Which cellular organelle is known as the powerhouse of the cell?",
      options: ["Nucleus", "Ribosome", "Mitochondria", "Golgi apparatus"],
      marks: 5,
    },
    {
      id: 3,
      type: "Short",
      question: "State Newton's Second Law of Motion and write its mathematical formula.",
      marks: 10,
    },
    {
      id: 4,
      type: "Short",
      question: "Define Osmosis and differentiate it from Simple Diffusion with a labeled diagram.",
      marks: 10,
    },
    {
      id: 5,
      type: "Long",
      question: "Explain the Law of Conservation of Energy with suitable everyday examples. Derive the equation for gravitational potential energy.",
      marks: 15,
    },
    {
      id: 6,
      type: "TrueFalse",
      question: "Sound travels faster in a vacuum than through solid steel. (True / False)",
      marks: 5,
    },
  ]);

  // New Question form state
  const [qType, setQType] = useState<"MCQ" | "Short" | "Long" | "TrueFalse">("Short");
  const [qText, setQText] = useState("");
  const [qMarks, setQMarks] = useState<number>(5);
  const [mcqOptions, setMcqOptions] = useState(["Option A", "Option B", "Option C", "Option D"]);

  const currentClass = classes.find((c) => c.id === selectedClassId) || classes[0];
  const currentSubject = currentClass?.subjects.find((s) => s.id === selectedSubjectId) || currentClass?.subjects[0];

  const totalCalculatedMarks = questions.reduce((acc, q) => acc + q.marks, 0);

  const addQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!qText.trim()) return;

    const newQ: Question = {
      id: Date.now(),
      type: qType,
      question: qText,
      marks: qMarks,
      options: qType === "MCQ" ? [...mcqOptions] : undefined,
    };

    setQuestions([...questions, newQ]);
    setQText("");
  };

  const removeQuestion = (id: number) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const handleSavePaper = async () => {
    try {
      const res = await fetch("/api/papers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          examType,
          classId: selectedClassId,
          subjectId: selectedSubjectId,
          duration,
          totalMarks: totalCalculatedMarks,
          instructions,
          status: "PUBLISHED",
          questions,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error("Failed to save paper");

      alert("Question Paper saved & published successfully!");
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-school-border shadow-sm no-print">
        <div>
          <span className="text-xs font-bold text-school-navy bg-school-gold-light px-2.5 py-1 rounded">
            Academic Assessment Studio
          </span>
          <h1 className="text-xl font-bold text-school-navy mt-1">Examination Paper Generator</h1>
          <p className="text-xs text-school-muted">
            Create, format, and print standard A4 examination question papers with automatic mark totaling.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleSavePaper}
            className="px-4 py-2 rounded-lg bg-school-gold text-school-navy-deep text-xs font-bold hover:bg-school-gold-warm shadow flex items-center space-x-1"
          >
            <span>Save Paper Draft</span>
          </button>
          <PrintButton label="Print Question Paper (A4)" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Builder Controls */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-school-border shadow-sm space-y-5 no-print text-xs">
          <h2 className="font-bold text-school-navy text-sm border-b pb-2">Paper Settings</h2>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-school-navy block mb-1">Class *</label>
              <select
                value={selectedClassId}
                onChange={(e) => {
                  const cId = e.target.value;
                  setSelectedClassId(cId);
                  const cls = classes.find((c) => c.id === cId);
                  setSelectedSubjectId(cls?.subjects[0]?.id || "");
                }}
                className="w-full px-3 py-2 rounded-lg border border-school-border bg-white"
              >
                {classes.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-bold text-school-navy block mb-1">Subject *</label>
              <select
                value={selectedSubjectId}
                onChange={(e) => setSelectedSubjectId(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-school-border bg-white"
              >
                {currentClass?.subjects.map((s) => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-school-navy block mb-1">Exam Type</label>
              <select
                value={examType}
                onChange={(e) => setExamType(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-school-border bg-white"
              >
                <option value="Mid Term">Mid Term Examination</option>
                <option value="Final Term">Final Term Examination</option>
                <option value="Monthly Test">Monthly Assessment Test</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-school-navy block mb-1">Duration</label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-school-border"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-school-navy block mb-1">General Instructions</label>
            <textarea
              rows={2}
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-school-border"
            />
          </div>

          {/* Add Question Box */}
          <div className="border-t pt-4 space-y-3">
            <h3 className="font-bold text-school-navy text-xs flex items-center justify-between">
              <span>Add New Question</span>
              <span className="text-school-muted text-[10px]">
                Current Total: <strong>{totalCalculatedMarks} Marks</strong>
              </span>
            </h3>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="font-bold text-school-muted block mb-1">Question Type</label>
                <select
                  value={qType}
                  onChange={(e) => setQType(e.target.value as any)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-school-border bg-white text-[11px]"
                >
                  <option value="Short">Short Answer</option>
                  <option value="Long">Long Answer / Essay</option>
                  <option value="MCQ">Multiple Choice (MCQ)</option>
                  <option value="TrueFalse">True / False</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-school-muted block mb-1">Marks</label>
                <input
                  type="number"
                  min={1}
                  value={qMarks}
                  onChange={(e) => setQMarks(parseInt(e.target.value) || 1)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-school-border text-[11px]"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-school-muted block mb-1">Question Statement</label>
              <textarea
                rows={2}
                value={qText}
                onChange={(e) => setQText(e.target.value)}
                placeholder="Enter question text here..."
                className="w-full px-2.5 py-1.5 rounded-lg border border-school-border text-[11px]"
              />
            </div>

            {qType === "MCQ" && (
              <div className="space-y-1.5 bg-slate-50 p-2.5 rounded-lg border">
                <span className="font-bold text-[10px] text-school-navy block">4 Answer Options:</span>
                {mcqOptions.map((opt, oIdx) => (
                  <input
                    key={oIdx}
                    type="text"
                    value={opt}
                    onChange={(e) => {
                      const updated = [...mcqOptions];
                      updated[oIdx] = e.target.value;
                      setMcqOptions(updated);
                    }}
                    className="w-full px-2 py-1 rounded border border-school-border text-[10px]"
                  />
                ))}
              </div>
            )}

            <button
              type="button"
              onClick={addQuestion}
              className="w-full py-2 rounded-lg bg-school-navy text-white font-bold text-xs hover:bg-school-navy-light flex items-center justify-center space-x-1"
            >
              <Plus className="w-3.5 h-3.5 text-school-gold" />
              <span>Add to Question Paper</span>
            </button>
          </div>
        </div>

        {/* Right Printable A4 Question Paper */}
        <div className="lg:col-span-7">
          <div className="printable-document bg-white p-8 sm:p-12 rounded-2xl border-2 border-slate-300 shadow-xl relative min-h-[750px] text-black">
            {/* Watermark */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
              <div className="relative w-96 h-96">
                <Image src="/images/brand/logo.png" alt="Watermark" fill className="object-contain" />
              </div>
            </div>

            {/* Paper Header */}
            <div className="border-b-2 border-black pb-4 text-center space-y-2">
              <div className="flex items-center justify-center space-x-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-black bg-white p-0.5">
                  <Image src="/images/brand/logo.png" alt="Logo" fill className="object-contain" />
                </div>
                <div>
                  <h1 className="text-xl font-black uppercase tracking-tight">
                    Lahore Elite School
                  </h1>
                  <span className="text-xs font-semibold block text-slate-700">
                    Al-Nisa & Sabzazar Campuses, Lahore
                  </span>
                </div>
              </div>

              <div className="pt-1">
                <h2 className="text-sm font-bold uppercase underline tracking-wider">
                  {title} • {examType}
                </h2>
              </div>

              <div className="grid grid-cols-4 text-xs font-bold border-y border-black py-1.5 mt-2 text-left">
                <span>Class: {currentClass?.name}</span>
                <span>Subject: {currentSubject?.name}</span>
                <span>Time: {duration}</span>
                <span className="text-right">Total Marks: {totalCalculatedMarks}</span>
              </div>
            </div>

            {/* Student Fill-in Bar */}
            <div className="grid grid-cols-2 gap-4 text-xs font-bold py-3 border-b border-dashed border-slate-400">
              <div className="flex items-center space-x-2">
                <span>Student Name:</span>
                <span className="border-b border-black flex-1 min-h-[16px]" />
              </div>
              <div className="flex items-center space-x-2">
                <span>Roll / Admission No:</span>
                <span className="border-b border-black flex-1 min-h-[16px]" />
              </div>
            </div>

            {/* Instructions */}
            <div className="py-2 text-[11px] italic text-slate-700">
              <strong>Instructions:</strong> {instructions}
            </div>

            {/* Questions List */}
            <div className="space-y-6 pt-3">
              {questions.map((q, idx) => (
                <div key={q.id} className="relative group text-xs space-y-2">
                  <div className="flex items-start justify-between font-bold">
                    <div className="space-x-1.5 pr-4">
                      <span>Q.{idx + 1}</span>
                      <span>{q.question}</span>
                    </div>
                    <div className="flex items-center space-x-2 shrink-0">
                      <span className="font-black text-slate-800">[{q.marks} Marks]</span>
                      <button
                        onClick={() => removeQuestion(q.id)}
                        className="text-rose-500 hover:text-rose-700 p-0.5 no-print"
                        title="Delete Question"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {q.type === "MCQ" && q.options && (
                    <div className="grid grid-cols-2 gap-2 pl-6 pt-1 text-[11px]">
                      {q.options.map((opt, oIdx) => (
                        <div key={oIdx} className="flex items-center space-x-2">
                          <span className="w-4 h-4 rounded-full border border-black flex items-center justify-center text-[9px]">
                            {String.fromCharCode(65 + oIdx)}
                          </span>
                          <span>{opt}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {q.type === "Long" && (
                    <div className="pl-6 pt-1 text-[10px] text-slate-400 italic">
                      [Detailed explanatory response required]
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
