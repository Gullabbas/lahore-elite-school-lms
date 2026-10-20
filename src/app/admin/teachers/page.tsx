import React from "react";
import { prisma } from "@/lib/prisma";
import StaffManager from "@/components/admin/StaffManager";

export const dynamic = "force-dynamic";

export default async function AdminTeachersPage() {
  const [staff, campuses] = await Promise.all([
    prisma.staff.findMany({
      include: { campus: true },
      orderBy: { employeeId: "asc" },
    }),
    prisma.campus.findMany({
      where: { isActive: true },
    }),
  ]);

  return <StaffManager initialStaff={staff as any} campuses={campuses as any} />;
}
