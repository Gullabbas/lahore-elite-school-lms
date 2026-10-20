import React from "react";
import { prisma } from "@/lib/prisma";
import AnnouncementsManager from "@/components/admin/AnnouncementsManager";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Announcements & Circulars | Lahore Elite School",
};

export default async function AdminAnnouncementsPage() {
  const announcements = await prisma.announcement.findMany({
    orderBy: { publishDate: "desc" },
  });

  return (
    <AnnouncementsManager
      initialAnnouncements={announcements.map((a) => ({
        ...a,
        publishDate: a.publishDate.toISOString(),
      }))}
    />
  );
}
