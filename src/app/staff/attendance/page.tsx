import React from "react";
import { prisma } from "@/lib/prisma";
import AttendanceManager from "@/components/admin/AttendanceManager";

export const dynamic = "force-dynamic";

export default async function StaffAttendancePage() {
  const today = new Date();
  const todayStr = today.toISOString().slice(0, 10);

  const [students, staff, classes] = await Promise.all([
    prisma.student.findMany({
      where: { enrollmentStatus: "ACTIVE" },
      orderBy: { admissionNo: "asc" },
    }),
    prisma.staff.findMany({
      where: { status: "ACTIVE" },
      orderBy: { employeeId: "asc" },
    }),
    prisma.class.findMany({
      include: { sections: true },
      orderBy: { orderIndex: "asc" },
    }),
  ]);

  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded-xl border border-school-border text-xs text-school-muted">
        <strong>Teacher Portal:</strong> Mark daily student attendance for your assigned classes.
      </div>
      <AttendanceManager
        students={students as any}
        staff={staff as any}
        classes={classes as any}
        todayStr={todayStr}
      />
    </div>
  );
}
