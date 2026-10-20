import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const records = await prisma.incomeExpense.findMany({
      include: { campus: true },
      orderBy: { date: "desc" },
    });
    return NextResponse.json({ success: true, records });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to fetch finance records" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { type, category, description, amount, campusId, payeeOrPayer, referenceNo, recordedBy } = await req.json();

    if (!type || !category || !description || !amount || amount <= 0) {
      return NextResponse.json({ success: false, message: "Missing required financial fields" }, { status: 400 });
    }

    const entry = await prisma.incomeExpense.create({
      data: {
        type,
        category,
        description,
        amount: parseFloat(amount),
        campusId: campusId || null,
        payeeOrPayer: payeeOrPayer || null,
        referenceNo: referenceNo || null,
        recordedBy: recordedBy || "Accounts Officer",
      },
    });

    await prisma.auditLog.create({
      data: {
        action: "CREATE",
        entity: "FINANCE",
        entityId: entry.id,
        details: `Recorded financial ${type}: ${description} (₨${amount})`,
      },
    });

    return NextResponse.json({ success: true, entry });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to record financial entry" }, { status: 500 });
  }
}
