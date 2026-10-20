import React from "react";
import { prisma } from "@/lib/prisma";
import ReportsManager from "@/components/admin/ReportsManager";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Reports & Analytics | Lahore Elite School",
};

export default async function AdminReportsPage() {
  // 1. Classes with student counts and gender
  const classes = await prisma.class.findMany({
    orderBy: { orderIndex: "asc" },
    include: {
      students: true,
    },
  });

  const classStrengths = classes.map((c) => ({
    className: c.name,
    code: c.code,
    totalStudents: c.students.length,
    boys: c.students.filter((s) => s.gender === "Male").length,
    girls: c.students.filter((s) => s.gender === "Female").length,
  }));

  // 2. Campus strengths
  const campuses = await prisma.campus.findMany({
    include: { students: true },
  });

  const campusStrengths = campuses.map((camp) => ({
    campusName: camp.name,
    totalStudents: camp.students.length,
  }));

  // 3. Fee metrics
  const vouchers = await prisma.feeVoucher.findMany();
  const totalBilled = vouchers.reduce((acc, v) => acc + v.totalAmount, 0);
  const totalCollected = vouchers.reduce((acc, v) => acc + v.paidAmount, 0);
  const totalPending = vouchers.reduce((acc, v) => acc + v.balance, 0);
  const paidVouchers = vouchers.filter((v) => v.status === "PAID").length;
  const unpaidVouchers = vouchers.filter((v) => v.status !== "PAID").length;

  // 4. Payroll metrics
  const staffMembers = await prisma.staff.findMany({
    where: { status: "ACTIVE" },
  });
  const monthlyPayrollOutlay = staffMembers.reduce((acc, s) => acc + s.basicSalary, 0);
  const payrollSlips = await prisma.payroll.findMany();
  const paidCount = payrollSlips.filter((p) => p.status === "PAID").length;
  const pendingCount = payrollSlips.filter((p) => p.status !== "PAID").length;

  // 5. Attendance analytics
  const attendances = await prisma.attendance.findMany({
    where: { entityType: "STUDENT" },
  });
  const totalAtt = attendances.length;
  const presents = attendances.filter((a) => a.status === "PRESENT" || a.status === "LATE").length;
  const studentAttendanceRate = totalAtt > 0 ? Math.round((presents / totalAtt) * 100) : 94;

  return (
    <ReportsManager
      classStrengths={classStrengths}
      campusStrengths={campusStrengths}
      feeStats={{
        totalBilled,
        totalCollected,
        totalPending,
        paidVouchers,
        unpaidVouchers,
      }}
      payrollStats={{
        totalStaff: staffMembers.length,
        monthlyPayrollOutlay,
        paidCount,
        pendingCount,
      }}
      attendanceStats={{
        studentAttendanceRate,
        defaulterStudentsCount: 0,
      }}
    />
  );
}
