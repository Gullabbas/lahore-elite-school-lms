import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { csvContent } = await req.json();
    if (!csvContent || typeof csvContent !== "string") {
      return NextResponse.json({ success: false, message: "Invalid or empty CSV content" }, { status: 400 });
    }

    const lines = csvContent
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    if (lines.length < 2) {
      return NextResponse.json({ success: false, message: "CSV file must contain header row and data rows" }, { status: 400 });
    }

    const headers = lines[0].split(",").map((h) => h.trim());
    const expectedHeaders = ["AdmissionNo", "FullName", "FatherName", "Gender", "Phone", "ClassCode", "MonthlyFee", "Address"];
    const missingHeaders = expectedHeaders.filter((eh) => !headers.includes(eh));

    if (missingHeaders.length > 0) {
      return NextResponse.json(
        { success: false, message: `Missing required CSV headers: ${missingHeaders.join(", ")}` },
        { status: 400 }
      );
    }

    const defaultCampus = await prisma.campus.findFirst();
    const defaultSession = await prisma.academicSession.findFirst({ where: { isCurrent: true } });
    const classes = await prisma.class.findMany({ include: { sections: true } });

    if (!defaultCampus || !defaultSession || classes.length === 0) {
      return NextResponse.json({ success: false, message: "Academic session, campus or classes not configured" }, { status: 400 });
    }

    const successRecords = [];
    const errors = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(",").map((v) => v.trim());
      if (values.length < expectedHeaders.length) continue;

      const record: any = {};
      headers.forEach((h, idx) => {
        record[h] = values[idx];
      });

      // Validations
      if (!record.AdmissionNo || !record.FullName || !record.FatherName) {
        errors.push(`Row ${i + 1}: Missing mandatory names or admission number.`);
        continue;
      }

      // Duplicate admission check
      const duplicate = await prisma.student.findUnique({
        where: { admissionNo: record.AdmissionNo },
      });
      if (duplicate) {
        errors.push(`Row ${i + 1}: Admission number "${record.AdmissionNo}" already exists.`);
        continue;
      }

      // Class match
      const matchedClass = classes.find(
        (c) => c.code.toLowerCase() === record.ClassCode?.toLowerCase() || c.name.toLowerCase() === record.ClassCode?.toLowerCase()
      ) || classes[0];

      const defaultSection = matchedClass.sections[0];

      try {
        const student = await prisma.student.create({
          data: {
            admissionNo: record.AdmissionNo,
            fullName: record.FullName,
            fatherName: record.FatherName,
            gender: record.Gender === "Female" ? "Female" : "Male",
            phone: record.Phone || "0300-0000000",
            address: record.Address || "Lahore",
            monthlyTuitionFee: parseFloat(record.MonthlyFee) || 5000,
            campusId: defaultCampus.id,
            academicSessionId: defaultSession.id,
            classId: matchedClass.id,
            sectionId: defaultSection.id,
            dob: new Date("2012-01-01"),
          },
        });
        successRecords.push(student.admissionNo);
      } catch (err: any) {
        errors.push(`Row ${i + 1} (${record.AdmissionNo}): Database insertion error.`);
      }
    }

    return NextResponse.json({
      success: true,
      importedCount: successRecords.length,
      errors,
      message: `Imported ${successRecords.length} student records successfully. ${errors.length} rows failed.`,
    });
  } catch (error: any) {
    console.error("CSV import error:", error);
    return NextResponse.json({ success: false, message: "CSV parsing failed" }, { status: 500 });
  }
}
