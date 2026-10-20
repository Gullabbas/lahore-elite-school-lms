import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getCurrentUser();
    let staffId: string | undefined;

    if (user?.staffProfile) {
      staffId = user.staffProfile.id;
    } else {
      const firstStaff = await prisma.staff.findFirst();
      staffId = firstStaff?.id;
    }

    const leaves = await prisma.leaveRequest.findMany({
      where: staffId ? { staffId } : {},
      include: { staff: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, leaves });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    let staffId: string | undefined;

    if (user?.staffProfile) {
      staffId = user.staffProfile.id;
    } else {
      const firstStaff = await prisma.staff.findFirst();
      staffId = firstStaff?.id;
    }

    if (!staffId) {
      return NextResponse.json({ success: false, message: "Staff profile not found" }, { status: 404 });
    }

    const body = await req.json();
    const { leaveType, startDate, endDate, reason } = body;

    if (!leaveType || !startDate || !endDate || !reason) {
      return NextResponse.json({ success: false, message: "All fields are required" }, { status: 400 });
    }

    const leave = await prisma.leaveRequest.create({
      data: {
        staffId,
        leaveType,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        reason,
        status: "PENDING",
      },
    });

    return NextResponse.json({ success: true, leave });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
