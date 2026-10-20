import React from "react";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { Layers, Clock, Plus, BookOpen } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function StaffAssignmentsPage() {
  const staff = await prisma.staff.findFirst();

  const assignments = await prisma.homeworkAssignment.findMany({
    where: staff ? { staffId: staff.id } : {},
    include: { class: true, section: true, subject: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-white p-5 rounded-2xl border border-school-border shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-school-navy">Homework & Class Assignments</h1>
          <p className="text-xs text-school-muted">
            Manage instructional tasks and homework assigned to your students.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assignments.length === 0 ? (
          <div className="col-span-full bg-white p-8 rounded-2xl border text-center text-xs text-school-muted">
            No homework assignments currently posted.
          </div>
        ) : (
          assignments.map((asg) => (
            <div key={asg.id} className="bg-white rounded-2xl p-6 border border-school-border shadow-sm space-y-3">
              <div className="flex justify-between items-center">
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
              <p className="text-xs text-school-muted leading-relaxed">{asg.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
