"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { time: "10:00", traffic: 120 },
  { time: "11:00", traffic: 180 },
  { time: "12:00", traffic: 240 },
  { time: "13:00", traffic: 200 },
  { time: "14:00", traffic: 310 },
  { time: "15:00", traffic: 280 },
];

export default function NetworkActivityChart() {
  return (
    <div className="glow-card glow-border rounded-3xl p-6">
      <div className="mb-5">
        <h2 className="text-xl font-semibold">
          Network Activity
        </h2>

        <p className="text-sm text-zinc-400">
          Real-time traffic monitoring
        </p>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <CartesianGrid
              stroke="#27272a"
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="time"
              stroke="#71717a"
            />

            <YAxis
              stroke="#71717a"
            />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="traffic"
              stroke="#3b82f6"
              fill="#3b82f6"
              fillOpacity={0.2}
              strokeWidth={3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}