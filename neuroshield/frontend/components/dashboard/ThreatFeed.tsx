"use client";

import {
  AlertTriangle,
  ShieldAlert,
  Activity,
} from "lucide-react";

import { useThreatStore } from "@/store/threatStore";

const getSeverityStyle = (severity: string) => {
  switch (severity) {
    case "CRITICAL":
      return {
        color: "text-red-400",
        bg: "bg-red-500/10",
        border: "border-red-500/20",
        icon: AlertTriangle,
      };

    case "HIGH":
      return {
        color: "text-orange-400",
        bg: "bg-orange-500/10",
        border: "border-orange-500/20",
        icon: ShieldAlert,
      };

    case "YELLOW":
      return {
        color: "text-yellow-400",
        bg: "bg-yellow-500/10",
        border: "border-yellow-500/20",
        icon: Activity,
      };

    default:
      return {
        color: "text-blue-400",
        bg: "bg-blue-500/10",
        border: "border-blue-500/20",
        icon: Activity,
      };
  }
};

export default function ThreatFeed() {
  const { threats } = useThreatStore();

  return (
    <div className="glow-card glow-border rounded-3xl p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl font-semibold">
            Live Threat Feed
          </h2>

          <p className="text-sm text-zinc-400">
            Real-time detected threats
          </p>
        </div>

        <div className="flex items-center gap-2 text-green-400 text-sm">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Live
        </div>
      </div>

      <div className="space-y-4">
        {threats.map((threat) => {
          const style = getSeverityStyle(
            threat.severity
          );

          const Icon = style.icon;

          return (
            <div
              key={threat.id}
              className={`
                flex
                items-center
                justify-between
                rounded-2xl
                border
                p-4
                transition-all
                hover:scale-[1.01]
                ${style.bg}
                ${style.border}
              `}
            >
              <div className="flex items-center gap-4">
                <div
                  className="
                    h-10
                    w-10
                    rounded-xl
                    bg-black/30
                    flex
                    items-center
                    justify-center
                  "
                >
                  <Icon
                    size={18}
                    className={style.color}
                  />
                </div>

                <div>
                  <p className="font-medium">
                    {threat.process_name}
                  </p>

                  <p className="text-xs text-zinc-500">
                    {threat.description}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span
                  className={`
                    text-xs
                    font-semibold
                    ${style.color}
                  `}
                >
                  {threat.severity}
                </span>

                <p className="text-xs text-zinc-500 mt-1">
                  {new Date(
                    threat.created_at
                  ).toLocaleTimeString()}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}