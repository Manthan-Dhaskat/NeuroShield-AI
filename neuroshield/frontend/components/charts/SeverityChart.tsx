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
    <div className="border rounded-xl p-5">
      <h2 className="font-semibold mb-4">
        Severity Distribution
      </h2>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              outerRadius={100}
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