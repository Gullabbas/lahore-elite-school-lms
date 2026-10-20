import React from "react";
import { prisma } from "@/lib/prisma";
import FeesManager from "@/components/admin/FeesManager";

export const dynamic = "force-dynamic";

export default async function AdminFeesPage() {
  const [vouchers, classes, currentSession] = await Promise.all([
    prisma.feeVoucher.findMany({
      include: {
        student: { include: { class: true, section: true, campus: true } },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.class.findMany({
      orderBy: { orderIndex: "asc" },
    }),
    prisma.academicSession.findFirst({
      where: { isCurrent: true },
    }),
  ]);

  return (
    <FeesManager
      initialVouchers={vouchers as any}
      classes={classes as any}
      currentSessionId={currentSession?.id || ""}
    />
  );
}
