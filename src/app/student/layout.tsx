import React from "react";
import StudentLayout from "@/components/layout/StudentLayout";

export const metadata = {
  title: "Student Portal | Lahore Elite School",
  description: "Lahore Elite School Student and Parent Portal",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <StudentLayout>{children}</StudentLayout>;
}
