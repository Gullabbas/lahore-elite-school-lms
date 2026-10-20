import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Lahore Elite School | Excellence in Modern Education",
  description:
    "Official website & Learning Management System (LMS) of Lahore Elite School, Lahore, Pakistan. Offering Pre-School, Primary, Middle, and High School education across Al-Nisa and Sabzazar Campuses.",
  keywords: [
    "Lahore Elite School",
    "School in Lahore",
    "LMS Lahore",
    "Al-Nisa Campus",
    "Sabzazar Campus",
    "Quality Education",
  ],
  authors: [{ name: "Lahore Elite School" }],
  viewport: "width=device-width, initial-scale=1",
  icons: {
    icon: "/images/brand/logo.png",
    apple: "/images/brand/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col antialiased bg-school-bg text-school-text">
        {children}
      </body>
    </html>
  );
}
