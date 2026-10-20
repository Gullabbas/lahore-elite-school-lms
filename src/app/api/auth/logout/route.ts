import { NextResponse } from "next/server";
import { AUTH_COOKIE_NAME, getSession } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST() {
  cookies().delete(AUTH_COOKIE_NAME);
  return NextResponse.json({ success: true, message: "Logged out successfully" });
}

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
  return NextResponse.json({ authenticated: true, user: session });
}
