"use client";

import {
  ShieldAlert,
  Activity,
  Cpu,
  Layers,
} from "lucide-react";

import { useThreatStore } from "@/store/threatStore";
import { useMetricStore } from "@/store/metricStore";

export default function MetricsCards() {
  const { threats } = useThreatStore();
  const { metrics } = useMetricStore();

  const activeThreats = threats.filter(
    (t) => t.status === "ACTIVE"
  ).length;

  const latestMetric = metrics && metrics.length > 0 ? metrics[0] : null;
  const appName = (latestMetric as any)?.target_app_name || "protected_app.py";
  const appStatus = (latestMetric as any)?.app_status || "OFFLINE";
  const cpu = latestMetric?.cpu_usage !== undefined ? latestMetric.cpu_usage : 0.0;
  const memory = latestMetric?.memory_usage !== undefined ? latestMetric.memory_usage : 0.0;

  const metricsData = [
    {
      title: "Protected App Status",
      value: appStatus,
      subtitle: appName,
      icon: Activity,
      color: appStatus === "RUNNING" ? "text-green-400" : "text-zinc-500",
      bgColor: appStatus === "RUNNING" ? "bg-green-500/10" : "bg-zinc-500/10",
    },
    {
      title: "App CPU Usage",
      value: `${cpu.toFixed(1)}%`,
      subtitle: "Normalized Core Usage",
      icon: Cpu,
      color: cpu > 75 ? "text-red-400" : cpu > 40 ? "text-yellow-400" : "text-blue-400",
      bgColor: cpu > 75 ? "bg-red-500/10" : cpu > 40 ? "bg-yellow-500/10" : "bg-blue-500/10",
    },
    {
      title: "App Memory Usage",
      value: `${memory.toFixed(1)}%`,
      subtitle: "Process Allocation",
      icon: Layers,
      color: memory > 75 ? "text-red-400" : memory > 40 ? "text-yellow-400" : "text-purple-400",
      bgColor: memory > 75 ? "bg-red-500/10" : memory > 40 ? "bg-yellow-500/10" : "bg-purple-500/10",
    },
    {
      title: "Active Threats",
      value: activeThreats,
      subtitle: "Current Mitigations",
      icon: ShieldAlert,
      color: activeThreats > 0 ? "text-red-400 animate-pulse" : "text-green-400",
      bgColor: activeThreats > 0 ? "bg-red-500/10" : "bg-green-500/10",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {metricsData.map((metric) => {
        const Icon = metric.icon;

        return (
          <div
            key={metric.title}
            className="
              glow-card
              glow-border
              rounded-3xl
              p-6
              hover:scale-[1.02]
              transition-all
              duration-300
            "
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-zinc-400">
                  {metric.title}
                </p>

                <h2 className={`text-4xl font-bold mt-3 tracking-tight ${metric.color}`}>
                  {metric.value}
                </h2>

                <p className="text-xs text-zinc-500 mt-1 font-mono">
                  {metric.subtitle}
                </p>
              </div>

              <div
                className={`
                  h-14
                  w-14
                  rounded-2xl
                  flex
                  items-center
                  justify-center
                  ${metric.bgColor}
                `}
              >
                <Icon
                  size={26}
                  className={metric.color}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}