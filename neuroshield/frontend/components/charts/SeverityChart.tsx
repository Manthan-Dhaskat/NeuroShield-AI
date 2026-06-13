"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Low", value: 20 },
  { name: "Medium", value: 35 },
  { name: "High", value: 25 },
  { name: "Critical", value: 20 },
];

const COLORS = [
  "#22c55e",
  "#eab308",
  "#f97316",
  "#ef4444",
];

export default function SeverityChart() {
  return (
    <div className="glow-card glow-border rounded-3xl p-6">
      <div className="mb-5">
        <h2 className="text-xl font-semibold">
          Severity Distribution
        </h2>

        <p className="text-sm text-zinc-400">
          Threat severity breakdown
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
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}