import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const dateStr = searchParams.get("date");
    const entityType = searchParams.get("entityType") || "STUDENT";
    const classId = searchParams.get("classId");
    const sectionId = searchParams.get("sectionId");

    const date = dateStr ? new Date(dateStr) : new Date();
    date.setHours(0, 0, 0, 0);

    const attendances = await prisma.attendance.findMany({
      where: {
        date,
        entityType,
        ...(classId ? { classId } : {}),
        ...(sectionId ? { sectionId } : {}),
      },
      include: {
        student: true,
        staff: true,
      },
    });

    return NextResponse.json({ success: true, attendances });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to fetch attendance" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { dateStr, entityType, records, classId, sectionId, campusId, recordedBy } = await req.json();

    const date = new Date(dateStr);
    date.setHours(0, 0, 0, 0);

    let updatedCount = 0;

    for (const rec of records) {
      // Find existing record for this date and entity
      const existing = await prisma.attendance.findFirst({
        where: {
          date,
          entityType,
          ...(entityType === "STUDENT" ? { studentId: rec.entityId } : { staffId: rec.entityId }),
        },
      });

      if (existing) {
        await prisma.attendance.update({
          where: { id: existing.id },
          data: {
            status: rec.status,
            notes: rec.notes || null,
            recordedBy: recordedBy || "Class Teacher",
          },
        });
      } else {
        await prisma.attendance.create({
          data: {
            date,
            entityType,
            studentId: entityType === "STUDENT" ? rec.entityId : null,
            staffId: entityType === "STAFF" ? rec.entityId : null,
            status: rec.status,
            notes: rec.notes || null,
            campusId: campusId || null,
            classId: classId || null,
            sectionId: sectionId || null,
            recordedBy: recordedBy || "Class Teacher",
          },
        });
      }
      updatedCount++;
    }

    await prisma.auditLog.create({
      data: {
        action: "UPDATE",
        entity: "ATTENDANCE",
        details: `Saved ${entityType} attendance for ${records.length} records on ${dateStr}`,
      },
    });

    return NextResponse.json({ success: true, updatedCount, message: "Attendance saved successfully" });
  } catch (error: any) {
    console.error("Attendance save error:", error);
    return NextResponse.json({ success: false, message: "Failed to save attendance" }, { status: 500 });
  }
}
