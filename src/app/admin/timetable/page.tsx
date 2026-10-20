import React from "react";
import { prisma } from "@/lib/prisma";
import TimetableManager from "@/components/admin/TimetableManager";

export const dynamic = "force-dynamic";

export default async function AdminTimetablePage() {
  const [slots, classes, staff, campuses, currentSession] = await Promise.all([
    prisma.timetable.findMany({
      include: {
        class: true,
        section: true,
        subject: true,
        staff: true,
        campus: true,
      },
      orderBy: { startTime: "asc" },
    }),
    prisma.class.findMany({
      include: { sections: true, subjects: true },
      orderBy: { orderIndex: "asc" },
    }),
    prisma.staff.findMany({
      where: { status: "ACTIVE" },
      orderBy: { employeeId: "asc" },
    }),
    prisma.campus.findMany({
      where: { isActive: true },
    }),
    prisma.academicSession.findFirst({
      where: { isCurrent: true },
    }),
  ]);

  return (
    <TimetableManager
      initialSlots={slots as any}
      classes={classes as any}
      staff={staff as any}
      campuses={campuses as any}
      sessionId={currentSession?.id || ""}
    />
  );
}
