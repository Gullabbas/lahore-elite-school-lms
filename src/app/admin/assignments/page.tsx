import React from "react";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { Layers, Plus, Calendar, Clock, BookOpen, User } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminAssignmentsPage() {
  const [assignments, classes, staff] = await Promise.all([
    prisma.homeworkAssignment.findMany({
      include: {
        class: true,
        section: true,
        subject: true,
        staff: true,
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.class.findMany({
      include: { sections: true, subjects: true },
      orderBy: { orderIndex: "asc" },
    }),
    prisma.staff.findMany({
      where: { status: "ACTIVE" },
      orderBy: { employeeId: "asc" },
    }),
  ]);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-school-border shadow-sm">
        <div>
          <span className="text-xs font-bold text-school-navy bg-school-gold-light px-2.5 py-1 rounded">
            Student Tasks
          </span>
          <h1 className="text-xl font-bold text-school-navy mt-1">Homework & Class Assignments</h1>
          <p className="text-xs text-school-muted">
            Tracking assignments, submission deadlines, and tasks assigned to students across classes.
          </p>
        </div>
      </div>

      {/* Assignments List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assignments.length === 0 ? (
          <div className="col-span-full bg-white p-8 rounded-2xl border text-center text-xs text-school-muted">
            No homework assignments published currently.
          </div>
        ) : (
          assignments.map((asg) => (
            <div key={asg.id} className="bg-white rounded-2xl p-6 border border-school-border shadow-sm space-y-4 hover:border-school-gold transition-all flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-school-navy text-school-gold">
                    {asg.class.name} ({asg.section.name})
                  </span>
                  <span className="text-xs font-semibold text-rose-700 flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>Due: {formatDate(asg.dueDate)}</span>
                  </span>
                </div>

                <h3 className="font-bold text-school-navy text-base">{asg.title}</h3>
                <span className="text-xs font-bold text-school-gold-warm block">
                  Subject: {asg.subject.name}
                </span>
                <p className="text-xs text-school-muted leading-relaxed line-clamp-3">
                  {asg.description}
                </p>
              </div>

              <div className="pt-3 border-t text-[11px] text-school-muted flex items-center justify-between">
                <span>Teacher: <strong>{asg.staff.fullName}</strong></span>
                <span className="text-emerald-700 font-bold">Active Task</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
