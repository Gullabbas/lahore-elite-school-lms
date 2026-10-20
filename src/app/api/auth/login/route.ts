import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { comparePassword, createSessionToken, AUTH_COOKIE_NAME } from "@/lib/auth";
import { LoginSchema } from "@/lib/validations";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = LoginSchema.parse(body);

    const identifier = validated.username.trim().toLowerCase();

    // Find user by username or email or student admission number
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { username: { equals: identifier } },
          { email: { equals: identifier } },
          {
            studentProfile: {
              admissionNo: { equals: validated.username.trim() },
            },
          },
          {
            staffProfile: {
              employeeId: { equals: validated.username.trim() },
            },
          },
        ],
      },
      include: {
        studentProfile: true,
        staffProfile: true,
        campus: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Invalid username, admission number, or password." },
        { status: 401 }
      );
    }

    // Role verification: user's actual database role MUST match the selected role!
    if (user.role !== validated.role) {
      return NextResponse.json(
        {
          success: false,
          message: `Access denied. This account has role "${user.role}" and cannot log in through the ${validated.role} portal.`,
        },
        { status: 403 }
      );
    }

    if (user.status === "SUSPENDED" || user.status === "INACTIVE") {
      return NextResponse.json(
        { success: false, message: "This account has been suspended. Please contact school administration." },
        { status: 403 }
      );
    }

    const isValidPassword = await comparePassword(validated.password, user.passwordHash);
    if (!isValidPassword) {
      return NextResponse.json(
        { success: false, message: "Invalid username, admission number, or password." },
        { status: 401 }
      );
    }

    // Create signed JWT session token
    const token = await createSessionToken({
      userId: user.id,
      username: user.username,
      role: user.role as "ADMIN" | "TEACHER" | "STUDENT",
      name: user.name,
      campusId: user.campusId,
    });

    // Set HttpOnly session cookie
    cookies().set({
      name: AUTH_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    // Record audit log for login
    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: "LOGIN",
        entity: "USER",
        entityId: user.id,
        details: `Successful ${user.role} portal login for user ${user.username}`,
      },
    });

    let redirectUrl = "/admin";
    if (user.role === "TEACHER") redirectUrl = "/staff";
    if (user.role === "STUDENT") redirectUrl = "/student";

    return NextResponse.json({
      success: true,
      message: "Authentication successful!",
      role: user.role,
      redirectUrl,
    });
  } catch (error: any) {
    console.error("Login authentication error:", error);
    return NextResponse.json(
      { success: false, message: error.errors?.[0]?.message || "Authentication failed" },
      { status: 400 }
    );
  }
}
