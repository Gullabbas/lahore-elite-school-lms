"use client";

import React from "react";
import { Printer } from "lucide-react";

interface Props {
  label?: string;
  className?: string;
}

export default function PrintButton({ label = "Print Document (A4)", className = "" }: Props) {
  return (
    <button
      onClick={() => window.print()}
      className={`px-4 py-2 rounded-lg bg-school-navy text-white text-xs font-bold hover:bg-school-navy-light flex items-center space-x-1.5 shadow transition-all no-print ${className}`}
    >
      <Printer className="w-3.5 h-3.5 text-school-gold" />
      <span>{label}</span>
    </button>
  );
}
