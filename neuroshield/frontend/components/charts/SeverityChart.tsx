"use client";

import { useThreatStore } from "@/store/threatStore";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#22c55e",
  "#eab308",
  "#f97316",
  "#ef4444",
];

export default function SeverityChart() {
  const { threats } = useThreatStore();

  const data = [
    {
      name: "Low",
      value: threats.filter(
        (t) => t.severity === "LOW"
      ).length,
    },
    {
      name: "Medium",
      value: threats.filter(
        (t) => t.severity === "MEDIUM"
      ).length,
    },
    {
      name: "High",
      value: threats.filter(
        (t) => t.severity === "HIGH"
      ).length,
    },
    {
      name: "Critical",
      value: threats.filter(
        (t) =>
          t.severity === "CRITICAL"
      ).length,
    },
  ];

  return (
    <div className="glow-card glow-border rounded-3xl p-6">
      <div className="mb-5">
        <h2 className="text-xl font-semibold">
          Severity Distribution
        </h2>

        <p className="text-sm text-zinc-400">
          Live threat breakdown
        </p>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              outerRadius={110}
              dataKey="value"
            >
              {data.map(
                (_, index) => (
                  <Cell
                    key={index}
                    fill={
                      COLORS[index]
                    }
                  />
                )
              )}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}