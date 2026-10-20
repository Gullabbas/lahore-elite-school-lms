import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { StudentFormSchema } from "@/lib/validations";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const classId = searchParams.get("classId") || "";
    const campusId = searchParams.get("campusId") || "";

    const students = await prisma.student.findMany({
      where: {
        AND: [
          search
            ? {
                OR: [
                  { fullName: { contains: search } },
                  { admissionNo: { contains: search } },
                  { fatherName: { contains: search } },
                  { phone: { contains: search } },
                ],
              }
            : {},
          classId ? { classId } : {},
          campusId ? { campusId } : {},
        ],
      },
      include: {
        class: true,
        section: true,
        campus: true,
        academicSession: true,
      },
      orderBy: { admissionNo: "asc" },
    });

    return NextResponse.json({ success: true, students });
  } catch (error) {
    console.error("Students fetch error:", error);
    return NextResponse.json({ success: false, message: "Failed to fetch students" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = StudentFormSchema.parse(body);

    // Duplicate admission number check
    const existing = await prisma.student.findUnique({
      where: { admissionNo: validated.admissionNo },
    });
    if (existing) {
      return NextResponse.json(
        { success: false, message: `Admission number "${validated.admissionNo}" already exists.` },
        { status: 400 }
      );
    }

    const student = await prisma.student.create({
      data: {
        admissionNo: validated.admissionNo,
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
        enrollmentStatus: "ACTIVE",
        feeStatus: "CURRENT",
      },
    });

    // Log administrative action
    await prisma.auditLog.create({
      data: {
        action: "CREATE",
        entity: "STUDENT",
        entityId: student.id,
        details: `Enrolled new student: ${student.fullName} (${student.admissionNo})`,
      },
    });

    return NextResponse.json({ success: true, student });
  } catch (error: any) {
    console.error("Student create error:", error);
    return NextResponse.json(
      { success: false, message: error.errors?.[0]?.message || "Validation failed" },
      { status: 400 }
    );
  }
}
