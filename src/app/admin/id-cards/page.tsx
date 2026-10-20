import React from "react";
import { prisma } from "@/lib/prisma";
import IdCardGenerator from "@/components/admin/IdCardGenerator";

export const dynamic = "force-dynamic";

export default async function AdminIdCardsPage({
  searchParams,
}: {
  searchParams: { studentId?: string };
}) {
  const students = await prisma.student.findMany({
    where: { enrollmentStatus: "ACTIVE" },
    include: { class: true, section: true, campus: true },
    orderBy: { admissionNo: "asc" },
  });

  return (
    <IdCardGenerator
      students={students as any}
      preselectedStudentId={searchParams.studentId}
    />
  );
}
