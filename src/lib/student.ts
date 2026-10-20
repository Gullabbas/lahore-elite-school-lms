import { getCurrentUser } from "./auth";
import { prisma } from "./prisma";

export async function getStudentContext() {
  try {
    const user = await getCurrentUser();
    if (user && user.role === "STUDENT" && user.studentProfile) {
      const student = await prisma.student.findUnique({
        where: { id: user.studentProfile.id },
        include: {
          campus: true,
          academicSession: true,
          class: true,
          section: true,
        },
      });
      if (student) return student;
    }
  } catch (e) {
    // If not authenticated or error, fall back to seeded student
  }

  // Fallback to first student or LES-2025-001 for seamless viewing
  const fallback = await prisma.student.findFirst({
    where: { admissionNo: "LES-2025-001" },
    include: {
      campus: true,
      academicSession: true,
      class: true,
      section: true,
    },
  });

  if (fallback) return fallback;

  return prisma.student.findFirst({
    include: {
      campus: true,
      academicSession: true,
      class: true,
      section: true,
    },
  });
}
