import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const certificates = await prisma.certificate.findMany({
      include: { student: true, staff: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, certificates });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to fetch certificates" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { recipientName, recipientType, studentId, staffId, templateType, title, description, signatory } = await req.json();

    const randomSeq = Math.floor(1000 + Math.random() * 9000);
    const certificateNo = `LES-CERT-2025-${randomSeq}`;

    const cert = await prisma.certificate.create({
      data: {
        certificateNo,
        recipientName,
        recipientType: recipientType || "STUDENT",
        studentId: studentId || null,
        staffId: staffId || null,
        templateType: templateType || "ACADEMIC_EXCELLENCE",
        title,
        description,
        signatory: signatory || "Principal, Lahore Elite School",
        status: "ISSUED",
      },
    });

    await prisma.auditLog.create({
      data: {
        action: "CREATE",
        entity: "CERTIFICATE",
        entityId: cert.id,
        details: `Issued ${templateType} certificate to ${recipientName} (${certificateNo})`,
      },
    });

    return NextResponse.json({ success: true, certificate: cert });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to issue certificate" }, { status: 500 });
  }
}
