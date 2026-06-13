"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
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
    <div className="border rounded-xl p-5">
      <h2 className="font-semibold mb-4">
        Threat Trends
      </h2>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="threats"
              stroke="#ef4444"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}