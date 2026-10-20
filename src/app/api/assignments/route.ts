import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const classId = searchParams.get("classId");

    const assignments = await prisma.homeworkAssignment.findMany({
      where: classId ? { classId } : {},
      include: {
        class: true,
        section: true,
        subject: true,
        staff: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, assignments });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to fetch assignments" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { classId, sectionId, subjectId, staffId, title, description, dueDate } = await req.json();

    const assignment = await prisma.homeworkAssignment.create({
      data: {
        classId,
        sectionId,
        subjectId,
        staffId,
        title,
        description,
        dueDate: new Date(dueDate),
      },
    });

    return NextResponse.json({ success: true, assignment });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to create homework assignment" }, { status: 500 });
  }
}
