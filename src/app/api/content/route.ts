import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type"); // "faq", "gallery", "settings"

    if (type === "faq") {
      const faqs = await prisma.fAQ.findMany({ orderBy: { orderIndex: "asc" } });
      return NextResponse.json({ success: true, faqs });
    }

    if (type === "gallery") {
      const gallery = await prisma.galleryItem.findMany({ orderBy: { createdAt: "desc" } });
      return NextResponse.json({ success: true, gallery });
    }

    const settings = await prisma.schoolSetting.findMany();
    return NextResponse.json({ success: true, settings });
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
    const { type, ...data } = body;

    if (type === "faq") {
      const faq = await prisma.fAQ.create({
        data: {
          category: data.category || "General",
          question: data.question,
          answer: data.answer,
          isPublished: data.isPublished !== undefined ? Boolean(data.isPublished) : true,
        },
      });
      return NextResponse.json({ success: true, faq });
    }

    if (type === "gallery") {
      const item = await prisma.galleryItem.create({
        data: {
          title: data.title,
          category: data.category || "Activities",
          imageUrl: data.imageUrl,
          description: data.description || null,
          eventDate: data.eventDate || null,
          isPublished: true,
        },
      });
      return NextResponse.json({ success: true, item });
    }

    if (type === "setting") {
      const setting = await prisma.schoolSetting.upsert({
        where: { key: data.key },
        update: { value: data.value, category: data.category || "GENERAL" },
        create: { key: data.key, value: data.value, category: data.category || "GENERAL" },
      });
      return NextResponse.json({ success: true, setting });
    }

    return NextResponse.json({ success: false, message: "Invalid type" }, { status: 400 });
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
    const type = searchParams.get("type");
    const id = searchParams.get("id");

    if (!id || !type) {
      return NextResponse.json({ success: false, message: "ID and type required" }, { status: 400 });
    }

    if (type === "faq") {
      await prisma.fAQ.delete({ where: { id } });
    } else if (type === "gallery") {
      await prisma.galleryItem.delete({ where: { id } });
    }

    return NextResponse.json({ success: true, message: "Deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
