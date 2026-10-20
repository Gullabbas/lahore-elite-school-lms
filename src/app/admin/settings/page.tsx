import React from "react";
import { prisma } from "@/lib/prisma";
import SchoolSettingsManager from "@/components/admin/SchoolSettingsManager";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "School Settings | Lahore Elite School",
};

export default async function AdminSettingsPage() {
  const campuses = await prisma.campus.findMany();
  const sessions = await prisma.academicSession.findMany({ orderBy: { startDate: "desc" } });
  const settings = await prisma.schoolSetting.findMany();

  return (
    <SchoolSettingsManager
      campuses={campuses}
      sessions={sessions.map((s) => ({
        ...s,
        startDate: s.startDate.toISOString(),
        endDate: s.endDate.toISOString(),
      }))}
      settings={settings.map((s) => ({ key: s.key, value: s.value }))}
    />
  );
}
