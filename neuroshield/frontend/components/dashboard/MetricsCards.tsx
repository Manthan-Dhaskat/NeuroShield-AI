"use client";

import {
  ShieldAlert,
  Activity,
  AlertTriangle,
  Cpu,
} from "lucide-react";

import { useThreatStore } from "@/store/threatStore";

export default function MetricsCards() {
  const { threats } = useThreatStore();

  const totalThreats = threats.length;

  const activeThreats = threats.filter(
    (t) => t.status === "ACTIVE"
  ).length;

  const criticalThreats = threats.filter(
    (t) => t.severity === "CRITICAL"
  ).length;

  const metrics = [
    {
      title: "Total Threats",
      value: totalThreats,
      change: "",
      icon: ShieldAlert,
    },
    {
      title: "Active Threats",
      value: activeThreats,
      change: "",
      icon: Activity,
    },
    {
      title: "Critical Threats",
      value: criticalThreats,
      change: "",
      icon: AlertTriangle,
    },
    {
      title: "System Health",
      value: "LIVE",
      change: "",
      icon: Cpu,
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => {
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

                <h2 className="text-5xl font-bold mt-3 tracking-tight">
                  {metric.value}
                </h2>
              </div>

              <div
                className="
                  h-14
                  w-14
                  rounded-2xl
                  bg-blue-500/10
                  flex
                  items-center
                  justify-center
                "
              >
                <Icon
                  size={26}
                  className="text-blue-400"
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}