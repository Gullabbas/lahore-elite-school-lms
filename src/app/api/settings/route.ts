import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET() {
  try {
    const campuses = await prisma.campus.findMany();
    const sessions = await prisma.academicSession.findMany({ orderBy: { startDate: "desc" } });
    const settings = await prisma.schoolSetting.findMany();

    return NextResponse.json({ success: true, campuses, sessions, settings });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session || session.role !== "ADMIN") {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { campuses, settings } = body;

    // Update settings
    if (settings && Array.isArray(settings)) {
      for (const s of settings) {
        await prisma.schoolSetting.upsert({
          where: { key: s.key },
          update: { value: s.value },
          create: { key: s.key, value: s.value, category: s.category || "GENERAL" },
        });
      }
    }

    // Update campuses
    if (campuses && Array.isArray(campuses)) {
      for (const c of campuses) {
        await prisma.campus.update({
          where: { id: c.id },
          data: {
            name: c.name,
            address: c.address,
            phone: c.phone,
            email: c.email,
          },
        });
      }
    }

    return NextResponse.json({ success: true, message: "Settings saved successfully" });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
