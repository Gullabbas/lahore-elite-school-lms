import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { StudentFormSchema } from "@/lib/validations";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const student = await prisma.student.findUnique({
      where: { id: params.id },
      include: {
        class: true,
        section: true,
        campus: true,
        academicSession: true,
        feeVouchers: {
          orderBy: { issueDate: "desc" },
          include: { payments: true },
        },
        attendances: {
          orderBy: { date: "desc" },
          take: 30,
        },
        examResults: {
          include: { examSubject: { include: { subject: true, exam: true } } },
        },
        certificates: true,
      },
    });

    if (!student) {
      return NextResponse.json({ success: false, message: "Student not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, student });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const validated = StudentFormSchema.parse(body);

    const student = await prisma.student.update({
      where: { id: params.id },
      data: {
        fullName: validated.fullName,
        fatherName: validated.fatherName,
        guardianRelation: validated.guardianRelation,
        dob: new Date(validated.dob),
        gender: validated.gender,
        phone: validated.phone,
        whatsapp: validated.whatsapp || validated.phone,
        email: validated.email || null,
        campusId: validated.campusId,
        classId: validated.classId,
        sectionId: validated.sectionId,
        academicSessionId: validated.academicSessionId,
        address: validated.address,
        monthlyTuitionFee: validated.monthlyTuitionFee,
        discountAmount: validated.discountAmount,
        bFormNo: validated.bFormNo || null,
        emergencyContact: validated.emergencyContact || null,
      },
    });

    await prisma.auditLog.create({
      data: {
        action: "UPDATE",
        entity: "STUDENT",
        entityId: student.id,
        details: `Updated student details for ${student.fullName} (${student.admissionNo})`,
      },
    });

    return NextResponse.json({ success: true, student });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.errors?.[0]?.message || "Failed to update student" },
      { status: 400 }
    );
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const student = await prisma.student.update({
      where: { id: params.id },
      data: { enrollmentStatus: "WITHDRAWN" },
    });

    await prisma.auditLog.create({
      data: {
        action: "DELETE",
        entity: "STUDENT",
        entityId: student.id,
        details: `Marked student status as WITHDRAWN for ${student.fullName} (${student.admissionNo})`,
      },
    });

    return NextResponse.json({ success: true, message: "Student marked as withdrawn" });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to withdraw student" }, { status: 500 });
  }
}
