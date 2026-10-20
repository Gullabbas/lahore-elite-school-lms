import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ContactInquirySchema } from "@/lib/validations";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = ContactInquirySchema.parse(body);

    const inquiry = await prisma.contactInquiry.create({
      data: {
        name: validated.name,
        email: validated.email || null,
        phone: validated.phone,
        subject: validated.subject,
        message: validated.message,
        status: "NEW",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Thank you for reaching out! Your message has been delivered to the school administration office.",
      inquiryId: inquiry.id,
    });
  } catch (error: any) {
    console.error("Contact inquiry error:", error);
    return NextResponse.json(
      { success: false, message: error.errors?.[0]?.message || "Failed to submit message" },
      { status: 400 }
    );
  }
}
