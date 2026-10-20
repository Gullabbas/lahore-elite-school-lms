import React from "react";
import { prisma } from "@/lib/prisma";
import AdmissionsManager from "@/components/admin/AdmissionsManager";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admissions Management | Lahore Elite School",
};

export default async function AdminAdmissionsPage() {
  const inquiries = await prisma.admissionInquiry.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <AdmissionsManager
      initialInquiries={inquiries.map((i) => ({
        ...i,
        createdAt: i.createdAt.toISOString(),
      }))}
    />
  );
}
