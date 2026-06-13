"use client";

import { useEffect, useState } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import { monitoringService } from "@/services/monitoringService";

export default function ThreatTrendChart() {
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
          cpu: item.cpu_usage,
        }));

      setData(chartData);
    };

    loadData();
  }, []);

  return (
    <div className="glow-card glow-border rounded-3xl p-6">
      <div className="mb-5">
        <h2 className="text-xl font-semibold">
          CPU Usage Trend
        </h2>

        <p className="text-sm text-zinc-400">
          Live CPU monitoring
        </p>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid
              stroke="#27272a"
              strokeDasharray="3 3"
            />

            <XAxis dataKey="time" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="cpu"
              stroke="#3b82f6"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}