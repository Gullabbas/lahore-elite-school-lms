import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/auth";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      include: {
        studentProfile: { include: { class: true } },
        staffProfile: true,
        campus: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      users: users.map((u) => ({
        id: u.id,
        username: u.username,
        email: u.email,
        role: u.role,
        status: u.status,
        name: u.name,
        campusName: u.campus?.name || "Global",
        associatedProfile: u.studentProfile
          ? `Student: ${u.studentProfile.fullName} (${u.studentProfile.class.name})`
          : u.staffProfile
          ? `Faculty: ${u.staffProfile.fullName} (${u.staffProfile.designation})`
          : "Master Administrator",
        createdAt: u.createdAt,
      })),
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to fetch accounts" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { userId, status, newPassword } = await req.json();

    const updateData: any = {};
    if (status) updateData.status = status;
    if (newPassword && newPassword.length >= 4) {
      updateData.passwordHash = await hashPassword(newPassword);
    }

    const updated = await prisma.user.update({
      where: { id: userId },
      data: updateData,
    });

    await prisma.auditLog.create({
      data: {
        action: "UPDATE",
        entity: "USER",
        entityId: updated.id,
        details: `Updated account security for ${updated.username} (Status: ${updated.status})`,
      },
    });

    return NextResponse.json({ success: true, message: "Account updated successfully" });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to update account" }, { status: 500 });
  }
}
