"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

interface Props {
  present: number;
  absent: number;
  late: number;
  leave: number;
}

const COLORS = ["#16865C", "#C83D46", "#D99012", "#3b82f6"];

export default function AttendancePieChart({ present, absent, late, leave }: Props) {
  const data = [
    { name: "Present", value: present },
    { name: "Absent", value: absent },
    { name: "Late", value: late },
    { name: "On Leave", value: leave },
  ].filter((d) => d.value > 0);

  if (data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-xs text-school-muted">
        No attendance recorded today yet.
      </div>
    );
  }

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={80}
            paddingAngle={4}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "#ffffff",
              borderColor: "#e2e8f0",
              borderRadius: "10px",
              fontSize: "12px",
            }}
          />
          <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
