import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const students = await prisma.student.findMany({
      include: { class: true, section: true, campus: true },
      orderBy: { admissionNo: "asc" },
    });

    const headers = [
      "AdmissionNo",
      "FullName",
      "FatherName",
      "Gender",
      "Phone",
      "Campus",
      "Class",
      "Section",
      "MonthlyTuitionFee",
      "FeeStatus",
      "EnrollmentStatus",
    ];

    const rows = students.map((s) => [
      `"${s.admissionNo}"`,
      `"${s.fullName}"`,
      `"${s.fatherName}"`,
      `"${s.gender}"`,
      `"${s.phone}"`,
      `"${s.campus.name}"`,
      `"${s.class.name}"`,
      `"${s.section.name}"`,
      s.monthlyTuitionFee,
      `"${s.feeStatus}"`,
      `"${s.enrollmentStatus}"`,
    ]);

    const csvString = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    return new Response(csvString, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="Lahore_Elite_School_Students_${new Date().toISOString().slice(0, 10)}.csv"`,
      },
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Export failed" }, { status: 500 });
  }
}
