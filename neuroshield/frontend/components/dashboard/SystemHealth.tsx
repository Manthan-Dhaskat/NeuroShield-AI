"use client";

import { useMetricStore } from "@/store/metricStore";
import { Cpu, HardDrive, Layers } from "lucide-react";

export default function SystemHealth() {
  const { metrics } = useMetricStore();
  const metric = metrics && metrics.length > 0 ? metrics[0] : null;

  const cpu = metric?.cpu_usage !== undefined ? metric.cpu_usage : 0;
  const memory = metric?.memory_usage !== undefined ? metric.memory_usage : 0;
  const disk = metric?.disk_usage !== undefined ? metric.disk_usage : 0;

  const getBarColor = (val: number, baseColor: string) => {
    if (val >= 80) return "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]";
    if (val >= 60) return "bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]";
    return baseColor;
  };

  const getTextColor = (val: number) => {
    if (val >= 80) return "text-red-400 font-semibold animate-pulse";
    if (val >= 60) return "text-orange-400 font-semibold";
    return "text-zinc-300";
  };

  return (
    <div className="glow-card glow-border rounded-3xl p-6 transition-all duration-300">
      <div className="flex items-center gap-3 mb-6">
        <Cpu className="text-blue-400" size={22} />
        <div>
          <h2 className="text-xl font-semibold">System Hardware Health</h2>
          <p className="text-xs text-zinc-400">Real-time resource utilization</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* CPU */}
        <div className="space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="flex items-center gap-2 text-zinc-300 font-medium">
              <Cpu size={16} className="text-blue-400" /> CPU Usage
            </span>
            <span className={`font-mono ${getTextColor(cpu)}`}>{cpu.toFixed(1)}%</span>
          </div>
          <div className="h-2 w-full bg-zinc-800/80 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${getBarColor(cpu, "bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]")}`}
              style={{ width: `${Math.min(100, cpu)}%` }}
            />
          </div>
        </div>

        {/* Memory */}
        <div className="space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="flex items-center gap-2 text-zinc-300 font-medium">
              <Layers size={16} className="text-purple-400" /> Memory Usage
            </span>
            <span className={`font-mono ${getTextColor(memory)}`}>{memory.toFixed(1)}%</span>
          </div>
          <div className="h-2 w-full bg-zinc-800/80 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${getBarColor(memory, "bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]")}`}
              style={{ width: `${Math.min(100, memory)}%` }}
            />
          </div>
        </div>

        {/* Disk */}
        <div className="space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="flex items-center gap-2 text-zinc-300 font-medium">
              <HardDrive size={16} className="text-emerald-400" /> Disk Usage
            </span>
            <span className={`font-mono ${getTextColor(disk)}`}>{disk.toFixed(1)}%</span>
          </div>
          <div className="h-2 w-full bg-zinc-800/80 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${getBarColor(disk, "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]")}`}
              style={{ width: `${Math.min(100, disk)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}