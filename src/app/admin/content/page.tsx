import React from "react";
import { prisma } from "@/lib/prisma";
import ContentManager from "@/components/admin/ContentManager";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Website Content Management | Lahore Elite School",
};

export default async function AdminContentPage() {
  const faqs = await prisma.fAQ.findMany({ orderBy: { orderIndex: "asc" } });
  const gallery = await prisma.galleryItem.findMany({ orderBy: { createdAt: "desc" } });
  const settings = await prisma.schoolSetting.findMany();

  return (
    <ContentManager
      initialFaqs={faqs}
      initialGallery={gallery}
      initialSettings={settings.map((s) => ({ key: s.key, value: s.value }))}
    />
  );
}
