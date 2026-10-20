import React from "react";
import StaffLayout from "@/components/layout/StaffLayout";

export const metadata = {
  title: "Faculty Dashboard | Lahore Elite School LMS",
  description: "Teacher portal for timetable schedules, class attendance, homework, and personal salary records.",
};

export default function StaffRootLayout({ children }: { children: React.ReactNode }) {
  return <StaffLayout>{children}</StaffLayout>;
}
