import React from "react";
import { prisma } from "@/lib/prisma";
import AccountsManager from "@/components/admin/AccountsManager";

export const dynamic = "force-dynamic";

export default async function AdminAccountsPage() {
  const users = await prisma.user.findMany({
    include: {
      studentProfile: { include: { class: true } },
      staffProfile: true,
      campus: true,
    },
    orderBy: { createdAt: "desc" },
  });

  const formattedUsers = users.map((u) => ({
    id: u.id,
    username: u.username,
    email: u.email,
    role: u.role,
    status: u.status,
    name: u.name,
    campusName: u.campus?.name || "Global",
    associatedProfile: u.studentProfile
      ? `Student: ${u.studentProfile.fullName} (${u.studentProfile.class.name})`
      : u.staffProfile
      ? `Faculty: ${u.staffProfile.fullName} (${u.staffProfile.designation})`
      : "Master Administrator",
    createdAt: u.createdAt.toISOString(),
  }));

  return <AccountsManager initialUsers={formattedUsers} />;
}
