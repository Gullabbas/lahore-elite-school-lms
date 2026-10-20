import React from "react";
import { prisma } from "@/lib/prisma";
import PaperGeneratorStudio from "@/components/admin/PaperGeneratorStudio";

export const dynamic = "force-dynamic";

export default async function AdminPaperGeneratorPage() {
  const classes = await prisma.class.findMany({
    include: {
      subjects: true,
    },
    orderBy: { orderIndex: "asc" },
  });

  return <PaperGeneratorStudio classes={classes as any} />;
}
