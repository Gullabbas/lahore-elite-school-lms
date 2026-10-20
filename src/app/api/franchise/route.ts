import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { FranchiseInquirySchema } from "@/lib/validations";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = FranchiseInquirySchema.parse(body);

    const franchise = await prisma.franchiseInquiry.create({
      data: {
        fullName: validated.fullName,
        phone: validated.phone,
        email: validated.email || null,
        city: validated.city,
        proposedLocation: validated.proposedLocation,
        background: validated.background,
        experience: validated.experience,
        proposedFacilities: validated.proposedFacilities,
        estimatedInvestment: validated.estimatedInvestment,
        preferredLevels: validated.preferredLevels,
        message: validated.message || null,
        status: "PENDING",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Franchise inquiry submitted successfully! Our expansion director will review your proposal.",
      franchiseId: franchise.id,
    });
  } catch (error: any) {
    console.error("Franchise inquiry error:", error);
    return NextResponse.json(
      { success: false, message: error.errors?.[0]?.message || "Failed to submit franchise inquiry" },
      { status: 400 }
    );
  }
}
