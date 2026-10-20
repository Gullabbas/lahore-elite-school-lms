import React from "react";
import { prisma } from "@/lib/prisma";
import CertificateStudio from "@/components/admin/CertificateStudio";

export const dynamic = "force-dynamic";

export default async function AdminCertificatesPage() {
  const [certificates, students] = await Promise.all([
    prisma.certificate.findMany({
      orderBy: { createdAt: "desc" },
    }),
    prisma.student.findMany({
      where: { enrollmentStatus: "ACTIVE" },
      include: { class: true },
      orderBy: { admissionNo: "asc" },
    }),
  ]);

  return (
    <CertificateStudio
      initialCertificates={certificates.map((c) => ({
        ...c,
        issueDate: c.issueDate.toISOString(),
      }))}
      students={students as any}
    />
  );
}
