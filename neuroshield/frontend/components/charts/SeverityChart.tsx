"use client";

import { useThreatStore } from "@/store/threatStore";
import { ShieldAlert } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = [
  "#22c55e",
  "#eab308",
  "#f97316",
  "#ef4444",
];

export default function SeverityChart() {
  const { threats } = useThreatStore();

  const data = [
    {
      name: "Low",
      value: threats.filter((t) => t.severity === "LOW" || (!t.severity)).length,
    },
    {
      name: "Medium",
      value: threats.filter((t) => t.severity === "MEDIUM").length,
    },
    {
      name: "High",
      value: threats.filter((t) => t.severity === "HIGH").length,
    },
    {
      name: "Critical",
      value: threats.filter((t) => t.severity === "CRITICAL").length,
    },
  ];

  const total = threats.length;

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-zinc-950/95 border border-zinc-800/80 backdrop-blur-md px-3.5 py-2.5 rounded-2xl shadow-2xl">
          <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">{payload[0].name} Severity</p>
          <p className="text-lg font-bold text-white mt-0.5">{payload[0].value} threat{payload[0].value !== 1 ? "s" : ""}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glow-card glow-border rounded-3xl p-6 relative">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl font-semibold">
            Severity Distribution
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Real-time vulnerability metrics
          </p>
        </div>
        <ShieldAlert size={18} className="text-zinc-500" />
      </div>

      <div className="h-80 relative flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={75}
              outerRadius={95}
              paddingAngle={4}
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                  className="outline-none focus:outline-none transition-all duration-300 hover:opacity-90"
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="bottom"
              height={36}
              content={({ payload }) => (
                <div className="flex justify-center gap-4 text-xs font-medium mt-4">
                  {payload?.map((entry: any, index: number) => (
                    <div key={index} className="flex items-center gap-1.5 text-zinc-400">
                      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
                      <span>{entry.value} ({data[index].value})</span>
                    </div>
                  ))}
                </div>
              )}
            />
          </PieChart>
        </ResponsiveContainer>

        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-9">
          <span className="text-4xl font-extrabold text-white tracking-tight">{total}</span>
          <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold mt-1">Threats Logged</span>
        </div>
      </div>
    </div>
  );
}