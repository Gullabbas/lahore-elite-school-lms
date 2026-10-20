import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const target = searchParams.get("target");

    const where: any = {};
    if (target && target !== "ALL") {
      where.targetRole = { in: [target, "ALL"] };
    }

    const announcements = await prisma.announcement.findMany({
      where,
      orderBy: { publishDate: "desc" },
    });

    return NextResponse.json({ success: true, announcements });
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
    const { title, message, targetRole = "ALL", isPublished = true } = body;

    if (!title || !message) {
      return NextResponse.json({ success: false, message: "Title and message are required" }, { status: 400 });
    }

    const announcement = await prisma.announcement.create({
      data: {
        title,
        message,
        targetRole,
        isPublished: Boolean(isPublished),
        publishDate: new Date(),
      },
    });

    return NextResponse.json({ success: true, announcement });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getSession();
    if (!session || session.role !== "ADMIN") {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { id, isPublished, title, message, targetRole } = await req.json();
    if (!id) {
      return NextResponse.json({ success: false, message: "Announcement ID required" }, { status: 400 });
    }

    const updated = await prisma.announcement.update({
      where: { id },
      data: {
        ...(title !== undefined ? { title } : {}),
        ...(message !== undefined ? { message } : {}),
        ...(targetRole !== undefined ? { targetRole } : {}),
        ...(isPublished !== undefined ? { isPublished } : {}),
      },
    });

    return NextResponse.json({ success: true, announcement: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getSession();
    if (!session || session.role !== "ADMIN") {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, message: "Announcement ID required" }, { status: 400 });
    }

    await prisma.announcement.delete({ where: { id } });
    return NextResponse.json({ success: true, message: "Announcement deleted" });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
