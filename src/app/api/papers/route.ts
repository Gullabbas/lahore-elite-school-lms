import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const papers = await prisma.questionPaper.findMany({
      include: { class: true, subject: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, papers });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to fetch papers" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { title, examType, classId, subjectId, duration, totalMarks, instructions, status, questions } = await req.json();

    const paper = await prisma.questionPaper.create({
      data: {
        title,
        examType: examType || "Mid Term",
        classId,
        subjectId,
        duration: duration || "2 Hours 30 Mins",
        totalMarks: parseFloat(totalMarks) || 100,
        instructions: instructions || "Attempt all questions. Write legibly.",
        status: status || "PUBLISHED",
        questionsJson: JSON.stringify(questions || []),
      },
      include: { class: true, subject: true },
    });

    await prisma.auditLog.create({
      data: {
        action: "CREATE",
        entity: "EXAM",
        entityId: paper.id,
        details: `Created examination paper: ${paper.title} (${paper.class.name} - ${paper.subject.name})`,
      },
    });

    return NextResponse.json({ success: true, paper });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to save paper" }, { status: 500 });
  }
}
