"use client";

import { useMemo } from "react";
import { useMetricStore } from "@/store/metricStore";
import { Network } from "lucide-react";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

export default function NetworkActivityChart() {
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

        sent: Math.round((item.network_sent || 0) / 1000000),
        received: Math.round((item.network_received || 0) / 1000000),
      }));
  }, [metrics]);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-zinc-950/95 border border-zinc-800/80 backdrop-blur-md px-3.5 py-2.5 rounded-2xl shadow-2xl space-y-1">
          <p className="text-xs font-semibold text-zinc-555 uppercase tracking-wider">Timestamp: {payload[0].payload.time}</p>
          <div className="flex gap-4">
            <p className="text-sm font-bold text-blue-400">Sent: {payload[0].value} MB</p>
            <p className="text-sm font-bold text-emerald-500">Received: {payload[1]?.value || 0} MB</p>
          </div>
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
            Network Activity
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Real-time outbound vs inbound traffic mapping
          </p>
        </div>
        <Network size={18} className="text-zinc-500" />
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="sentGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="receivedGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
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
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="top"
              height={36}
              content={({ payload }) => (
                <div className="flex justify-end gap-4 text-xs font-semibold uppercase tracking-wider mb-4">
                  {payload?.map((entry: any, index: number) => (
                    <div key={index} className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
                      <span className="text-zinc-400">{entry.value}</span>
                    </div>
                  ))}
                </div>
              )}
            />
            <Area
              type="monotone"
              name="Sent (Outbound)"
              dataKey="sent"
              stroke="#3b82f6"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#sentGradient)"
            />
            <Area
              type="monotone"
              name="Received (Inbound)"
              dataKey="received"
              stroke="#22c55e"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#receivedGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}