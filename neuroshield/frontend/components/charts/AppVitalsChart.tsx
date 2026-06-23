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
  Legend,
} from "recharts";

export default function AppVitalsChart() {
  const { metrics } = useMetricStore();

  const chartData = useMemo(() => {
    if (!metrics) return [];
    return metrics
      .slice(0, 30)
      .reverse()
      .map((item: any) => ({
        time: item.timestamp
          ? new Date(item.timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })
          : "",
        cpu: item.cpu_usage || 0,
        memory: item.memory_usage || 0,
      }));
  }, [metrics]);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-zinc-950/95 border border-zinc-800/80 backdrop-blur-md px-3.5 py-2.5 rounded-2xl shadow-2xl space-y-1">
          <p className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">Time: {payload[0].payload.time}</p>
          <div className="flex gap-4">
            <p className="text-sm font-bold text-blue-400">CPU: {payload[0].value.toFixed(1)}%</p>
            <p className="text-sm font-bold text-purple-400">RAM: {payload[1]?.value.toFixed(1) || 0}%</p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glow-card glow-border rounded-3xl p-6 space-y-5">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="text-xl font-semibold">Protected App Vitals History</h2>
          <p className="text-xs text-zinc-400 mt-1">
            Real-time CPU and Memory allocation mapping
          </p>
        </div>
        <Activity size={18} className="text-zinc-555" />
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="vitalsCpuGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="vitalsMemGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#a855f7" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(255,255,255,0.03)" strokeDasharray="3 3" />
            <XAxis dataKey="time" stroke="#71717a" fontSize={9} tickLine={false} />
            <YAxis stroke="#71717a" fontSize={9} tickLine={false} domain={[0, 100]} />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="top"
              height={36}
              content={({ payload }) => (
                <div className="flex justify-end gap-4 text-xs font-semibold uppercase tracking-wider mb-2">
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
              name="App CPU"
              dataKey="cpu"
              stroke="#3b82f6"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#vitalsCpuGrad)"
            />
            <Area
              type="monotone"
              name="App RAM"
              dataKey="memory"
              stroke="#a855f7"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#vitalsMemGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
