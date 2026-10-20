import React from "react";
import { getStudentContext } from "@/lib/student";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { Layers, Calendar, Clock, User, CheckCircle2, AlertCircle } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function StudentAssignmentsPage() {
  const student = await getStudentContext();

  if (!student) {
    return (
      <div className="p-8 text-center bg-white rounded-2xl border border-school-border">
        <p className="text-sm text-school-muted">Student profile not found.</p>
      </div>
    );
  }

  // Fetch homework assignments for student's class and section
  const assignments = await prisma.homeworkAssignment.findMany({
    where: {
      classId: student.classId,
      sectionId: student.sectionId,
    },
    include: {
      subject: true,
      staff: true,
    },
    orderBy: { dueDate: "asc" },
  });

  const now = new Date();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-school-border shadow-sm">
        <div className="flex items-center space-x-2 text-school-gold-warm font-bold text-xs uppercase tracking-wider mb-1">
          <Layers className="w-4 h-4" />
          <span>Homework &amp; Assignments</span>
        </div>
        <h1 className="text-2xl font-extrabold text-school-navy">My Assigned Tasks</h1>
        <p className="text-xs text-school-muted mt-1">
          Class: {student.class.name} ({student.section.name}) &bull; Active Academic Coursework
        </p>
      </div>

      {assignments.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-school-border shadow-sm">
          <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-3" />
          <h3 className="text-base font-bold text-school-navy">No pending homework assignments!</h3>
          <p className="text-xs text-school-muted mt-1">
            You are completely caught up on your tasks for this week.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {assignments.map((task) => {
            const isOverdue = new Date(task.dueDate) < now;

            return (
              <div
                key={task.id}
                className="bg-white p-6 rounded-2xl border border-school-border hover:border-school-gold transition-colors shadow-sm flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-school-navy text-school-gold">
                      {task.subject.name}
                    </span>
                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full font-mono ${
                        isOverdue ? "bg-rose-100 text-rose-800" : "bg-emerald-100 text-emerald-800"
                      }`}
                    >
                      {isOverdue ? "Overdue" : "Active"}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-extrabold text-school-navy">{task.title}</h3>
                    <p className="text-xs text-school-muted mt-1.5 leading-relaxed whitespace-pre-line">
                      {task.description}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-school-border flex items-center justify-between text-xs text-school-muted">
                  <div className="flex items-center space-x-1">
                    <User className="w-3.5 h-3.5 text-school-gold-warm" />
                    <span>Teacher: {task.staff.fullName}</span>
                  </div>
                  <div className="flex items-center space-x-1 font-mono font-semibold text-rose-600">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Due: {formatDate(task.dueDate)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
