"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { formatPKR } from "@/lib/utils";

interface DataPoint {
  month: string;
  fees: number;
  expenses: number;
  payroll: number;
}

interface Props {
  data: DataPoint[];
}

export default function FinanceOverviewChart({ data }: Props) {
  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748b" }} />
          <YAxis tick={{ fontSize: 11, fill: "#64748b" }} tickFormatter={(val) => `₨${val / 1000}k`} />
          <Tooltip
            formatter={(value: number) => [formatPKR(value), ""]}
            contentStyle={{
              backgroundColor: "#ffffff",
              borderColor: "#e2e8f0",
              borderRadius: "12px",
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
              fontSize: "12px",
            }}
          />
          <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "10px" }} />
          <Bar dataKey="fees" name="Fees Collected" fill="#091A4A" radius={[4, 4, 0, 0]} />
          <Bar dataKey="payroll" name="Staff Payroll" fill="#FFD02F" radius={[4, 4, 0, 0]} />
          <Bar dataKey="expenses" name="Operating Expenses" fill="#ef4444" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
