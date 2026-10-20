import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format currency in Pakistani Rupees (PKR)
 */
export function formatPKR(amount: number): string {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format date in standard Pakistan format (dd MMM yyyy)
 */
export function formatDate(date: Date | string | number | null | undefined): string {
  if (!date) return "—";
  const d = new Date(date);
  if (isNaN(d.getTime())) return "—";
  return new Intl.DateTimeFormat("en-PK", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(d);
}

/**
 * Clean & normalize Pakistani phone number into international WhatsApp wa.me format
 * Handles formats like: 0300-4279059, 03004279059, +92 300 4279059
 */
export function sanitizePakistaniPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("92")) {
    return digits;
  }
  if (digits.startsWith("03")) {
    return "92" + digits.substring(1);
  }
  if (digits.length === 10 && digits.startsWith("3")) {
    return "92" + digits;
  }
  return digits;
}

/**
 * Generate official WhatsApp click-to-chat URL with prefilled URL-encoded message
 */
export function getWhatsAppUrl(phone: string, message?: string): string {
  const cleanPhone = sanitizePakistaniPhone(phone);
  const baseUrl = `https://wa.me/${cleanPhone}`;
  if (!message) return baseUrl;
  return `${baseUrl}?text=${encodeURIComponent(message)}`;
}

/**
 * Calculate Grade based on percentage
 */
export function calculateGrade(marks: number, total: number): { grade: string; remarks: string } {
  if (total <= 0) return { grade: "F", remarks: "Invalid Total" };
  const percentage = (marks / total) * 100;
  if (percentage >= 85) return { grade: "A+", remarks: "Outstanding" };
  if (percentage >= 75) return { grade: "A", remarks: "Excellent" };
  if (percentage >= 65) return { grade: "B", remarks: "Very Good" };
  if (percentage >= 50) return { grade: "C", remarks: "Good" };
  if (percentage >= 40) return { grade: "D", remarks: "Pass" };
  return { grade: "F", remarks: "Needs Improvement" };
}
