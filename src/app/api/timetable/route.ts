import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const classId = searchParams.get("classId");
    const staffId = searchParams.get("staffId");

    const slots = await prisma.timetable.findMany({
      where: {
        ...(classId ? { classId } : {}),
        ...(staffId ? { staffId } : {}),
      },
      include: {
        class: true,
        section: true,
        subject: true,
        staff: true,
        campus: true,
      },
      orderBy: { startTime: "asc" },
    });

    return NextResponse.json({ success: true, slots });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to fetch timetable" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { academicSessionId, campusId, classId, sectionId, subjectId, staffId, dayOfWeek, startTime, endTime, room } = await req.json();

    // Conflict Check 1: Teacher conflict (same teacher double-booked in same time slot on same day)
    const teacherConflict = await prisma.timetable.findFirst({
      where: {
        staffId,
        dayOfWeek,
        startTime,
      },
      include: { class: true, staff: true },
    });

    if (teacherConflict) {
      return NextResponse.json(
        {
          success: false,
          message: `Teacher Conflict! ${teacherConflict.staff.fullName} is already scheduled with ${teacherConflict.class.name} on ${dayOfWeek} at ${startTime}.`,
        },
        { status: 400 }
      );
    }

    // Conflict Check 2: Room conflict
    if (room) {
      const roomConflict = await prisma.timetable.findFirst({
        where: {
          room,
          dayOfWeek,
          startTime,
        },
      });
      if (roomConflict) {
        return NextResponse.json(
          { success: false, message: `Room Conflict! ${room} is already booked on ${dayOfWeek} at ${startTime}.` },
          { status: 400 }
        );
      }
    }

    const slot = await prisma.timetable.create({
      data: {
        academicSessionId,
        campusId,
        classId,
        sectionId,
        subjectId,
        staffId,
        dayOfWeek,
        startTime,
        endTime,
        room: room || null,
      },
      include: { class: true, subject: true, staff: true },
    });

    return NextResponse.json({ success: true, slot });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to create timetable slot" }, { status: 500 });
  }
}
