import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { AdmissionInquirySchema } from "@/lib/validations";
import { getSession } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const session = await getSession();
    if (!session || session.role !== "ADMIN") {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const campus = searchParams.get("campus");

    const where: any = {};
    if (status && status !== "ALL") where.status = status;
    if (campus && campus !== "ALL") where.campusName = campus;

    const inquiries = await prisma.admissionInquiry.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, inquiries });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = AdmissionInquirySchema.parse(body);

    const inquiry = await prisma.admissionInquiry.create({
      data: {
        studentName: validated.studentName,
        fatherName: validated.fatherName,
        phone: validated.phone,
        whatsapp: validated.whatsapp || validated.phone,
        email: validated.email || null,
        requestedClass: validated.requestedClass,
        campusName: validated.campusName,
        previousSchool: validated.previousSchool || null,
        message: validated.message || null,
        status: "PENDING",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Admission inquiry submitted successfully. The school office will contact you shortly.",
      inquiryId: inquiry.id,
    });
  } catch (error: any) {
    console.error("Admission inquiry error:", error);
    return NextResponse.json(
      { success: false, message: error.errors?.[0]?.message || "Validation failed or server error" },
      { status: 400 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getSession();
    if (!session || session.role !== "ADMIN") {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { id, status, notes } = await req.json();
    if (!id) {
      return NextResponse.json({ success: false, message: "Inquiry ID is required" }, { status: 400 });
    }

    const updated = await prisma.admissionInquiry.update({
      where: { id },
      data: {
        ...(status ? { status } : {}),
        ...(notes !== undefined ? { notes } : {}),
      },
    });

    return NextResponse.json({ success: true, inquiry: updated });
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
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, message: "Inquiry ID is required" }, { status: 400 });
    }

    await prisma.admissionInquiry.delete({ where: { id } });
    return NextResponse.json({ success: true, message: "Inquiry deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
