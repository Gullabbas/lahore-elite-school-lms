import React from "react";
import { prisma } from "@/lib/prisma";
import StudentsManager from "@/components/admin/StudentsManager";

export const dynamic = "force-dynamic";

export default async function AdminStudentsPage() {
  const [students, classes, campuses, currentSession] = await Promise.all([
    prisma.student.findMany({
      include: { class: true, section: true, campus: true },
      orderBy: { admissionNo: "asc" },
    }),
    prisma.class.findMany({
      include: { sections: true },
      orderBy: { orderIndex: "asc" },
    }),
    prisma.campus.findMany({
      where: { isActive: true },
    }),
    prisma.academicSession.findFirst({
      where: { isCurrent: true },
    }),
  ]);

  return (
    <StudentsManager
      initialStudents={students as any}
      classes={classes as any}
      campuses={campuses as any}
      currentSessionId={currentSession?.id || ""}
    />
  );
}
