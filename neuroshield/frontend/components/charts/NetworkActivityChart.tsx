"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
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
    <div className="border rounded-xl p-5">
      <h2 className="font-semibold mb-4">
        Network Activity
      </h2>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="traffic"
              stroke="#3b82f6"
              fill="#3b82f6"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}