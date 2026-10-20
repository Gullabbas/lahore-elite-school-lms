import React from "react";
import AdminLayout from "@/components/layout/AdminLayout";

export const metadata = {
  title: "Admin Dashboard | Lahore Elite School LMS",
  description: "Comprehensive school operations, student registry, fees, payroll, and academic management.",
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>;
}
