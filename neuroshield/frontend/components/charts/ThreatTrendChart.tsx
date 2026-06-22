"use client";

import { useMemo } from "react";
import { useMetricStore } from "@/store/metricStore";
import { Activity } from "lucide-react";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function ThreatTrendChart() {
  const { metrics } = useMetricStore();

  const data = useMemo(() => {
    if (!metrics) return [];
    return metrics
      .slice(0, 20)
      .reverse()
      .map((item: any) => ({
        time: item.timestamp
          ? new Date(item.timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })
          : "",
        cpu: item.cpu_usage,
      }));
  }, [metrics]);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-zinc-950/95 border border-zinc-800/80 backdrop-blur-md px-3.5 py-2.5 rounded-2xl shadow-2xl">
          <p className="text-xs font-semibold text-zinc-550 uppercase tracking-wider">Timestamp: {payload[0].payload.time}</p>
          <p className="text-lg font-bold text-blue-400 mt-0.5">CPU Load: {payload[0].value.toFixed(1)}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glow-card glow-border rounded-3xl p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl font-semibold">
            CPU Usage Trend
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Real-time CPU utilization mapping
          </p>
        </div>
        <Activity size={18} className="text-zinc-500" />
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="cpuGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              stroke="#1f1f23"
              strokeDasharray="3 3"
            />
            <XAxis
              dataKey="time"
              stroke="#52525b"
              fontSize={10}
              tickLine={false}
            />
            <YAxis
              stroke="#52525b"
              fontSize={10}
              tickLine={false}
              domain={[0, 100]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="cpu"
              stroke="#3b82f6"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#cpuGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}