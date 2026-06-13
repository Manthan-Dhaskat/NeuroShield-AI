"use client";

import { useEffect, useState } from "react";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import { monitoringService } from "@/services/monitoringService";

export default function NetworkActivityChart() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const metrics =
        await monitoringService.getMetrics();

      const chartData = metrics
        .slice(0, 20)
        .reverse()
        .map((item: any) => ({
          time: new Date(
            item.timestamp
          ).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),

          sent:
            Math.round(
              item.network_sent /
                1000000
            ),

          received:
            Math.round(
              item.network_received /
                1000000
            ),
        }));

      setData(chartData);
    };

    loadData();
  }, []);

  return (
    <div className="glow-card glow-border rounded-3xl p-6">
      <div className="mb-5">
        <h2 className="text-xl font-semibold">
          Network Activity
        </h2>

        <p className="text-sm text-zinc-400">
          Sent vs Received Traffic (MB)
        </p>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <CartesianGrid
              stroke="#27272a"
              strokeDasharray="3 3"
            />

            <XAxis dataKey="time" />

            <YAxis />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="sent"
              stroke="#3b82f6"
              fill="#3b82f6"
              fillOpacity={0.2}
            />

            <Area
              type="monotone"
              dataKey="received"
              stroke="#22c55e"
              fill="#22c55e"
              fillOpacity={0.2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}