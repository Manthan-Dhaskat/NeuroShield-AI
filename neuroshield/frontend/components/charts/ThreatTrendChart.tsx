"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { day: "Mon", threats: 4 },
  { day: "Tue", threats: 7 },
  { day: "Wed", threats: 5 },
  { day: "Thu", threats: 9 },
  { day: "Fri", threats: 12 },
  { day: "Sat", threats: 8 },
  { day: "Sun", threats: 6 },
];

export default function ThreatTrendChart() {
  return (
    <div className="glow-card glow-border rounded-3xl p-6">
      <div className="mb-5">
        <h2 className="text-xl font-semibold">
          Threat Trends
        </h2>

        <p className="text-sm text-zinc-400">
          Threat activity over the last week
        </p>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid
              stroke="#27272a"
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="day"
              stroke="#71717a"
            />

            <YAxis
              stroke="#71717a"
            />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="threats"
              stroke="#3b82f6"
              strokeWidth={4}
              dot={{
                r: 5,
                fill: "#3b82f6",
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}