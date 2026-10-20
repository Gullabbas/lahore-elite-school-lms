import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { StaffFormSchema } from "@/lib/validations";

export async function GET() {
  try {
    const staff = await prisma.staff.findMany({
      include: { campus: true, timetables: true, payrolls: true },
      orderBy: { employeeId: "asc" },
    });
    return NextResponse.json({ success: true, staff });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to fetch staff" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = StaffFormSchema.parse(body);

    const existing = await prisma.staff.findUnique({
      where: { employeeId: validated.employeeId },
    });
    if (existing) {
      return NextResponse.json(
        { success: false, message: `Employee ID "${validated.employeeId}" already exists.` },
        { status: 400 }
      );
    }

    const staffMember = await prisma.staff.create({
      data: {
        employeeId: validated.employeeId,
        fullName: validated.fullName,
        phone: validated.phone,
        whatsapp: validated.whatsapp || validated.phone,
        email: validated.email || null,
        designation: validated.designation,
        department: validated.department,
        campusId: validated.campusId,
        basicSalary: validated.basicSalary,
        qualification: validated.qualification || null,
        address: validated.address || null,
        status: "ACTIVE",
      },
    });

    await prisma.auditLog.create({
      data: {
        action: "CREATE",
        entity: "STAFF",
        entityId: staffMember.id,
        details: `Created staff member: ${staffMember.fullName} (${staffMember.employeeId})`,
      },
    });

    return NextResponse.json({ success: true, staffMember });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.errors?.[0]?.message || "Validation failed" },
      { status: 400 }
    );
  }
}
