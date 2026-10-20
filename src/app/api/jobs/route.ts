import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { JobApplicationSchema } from "@/lib/validations";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = JobApplicationSchema.parse(body);

    const application = await prisma.jobApplication.create({
      data: {
        fullName: validated.fullName,
        email: validated.email,
        phone: validated.phone,
        position: validated.position,
        experience: validated.experience,
        qualification: validated.qualification,
        coverLetter: validated.coverLetter,
        status: "PENDING",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Job application submitted successfully! Our HR team will review your credentials.",
      applicationId: application.id,
    });
  } catch (error: any) {
    console.error("Job application error:", error);
    return NextResponse.json(
      { success: false, message: error.errors?.[0]?.message || "Failed to submit job application" },
      { status: 400 }
    );
  }
}
