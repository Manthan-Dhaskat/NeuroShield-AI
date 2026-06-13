"use client";

import { ShieldAlert } from "lucide-react";
import { useThreatStore } from "@/store/threatStore";

export default function RiskGauge() {
  const { threats } = useThreatStore();

  let score = 0;

  if (threats.length > 0) {
    const total = threats.reduce(
      (sum, threat) => {
        switch (threat.severity) {
          case "CRITICAL":
            return sum + 90;

          case "HIGH":
            return sum + 70;

          case "MEDIUM":
            return sum + 40;

          default:
            return sum + 20;
        }
      },
      0
    );

    score = Math.round(
      total / threats.length
    );
  }

  const level =
    score >= 80
      ? "CRITICAL"
      : score >= 60
      ? "HIGH"
      : score >= 40
      ? "MEDIUM"
      : "LOW";

  const color =
    level === "CRITICAL"
      ? "#ef4444"
      : level === "HIGH"
      ? "#f97316"
      : level === "MEDIUM"
      ? "#eab308"
      : "#22c55e";

  const circumference =
    2 * Math.PI * 90;

  const offset =
    circumference -
    (score / 100) *
      circumference;

  return (
    <div
      className="
        glow-card
        glow-border
        rounded-3xl
        p-6
      "
    >
      <div className="flex items-center gap-3 mb-6">
        <ShieldAlert
          className="text-red-400"
        />

        <h2 className="text-2xl font-semibold">
          Risk Assessment
        </h2>
      </div>

      <div className="flex justify-center">
        <div className="relative">
          <svg
            width="220"
            height="220"
            className="-rotate-90"
          >
            <circle
              cx="110"
              cy="110"
              r="90"
              stroke="#27272a"
              strokeWidth="12"
              fill="transparent"
            />

            <circle
              cx="110"
              cy="110"
              r="90"
              stroke={color}
              strokeWidth="12"
              fill="transparent"
              strokeLinecap="round"
              strokeDasharray={
                circumference
              }
              strokeDashoffset={
                offset
              }
            />
          </svg>

          <div
            className="
              absolute
              inset-0
              flex
              flex-col
              items-center
              justify-center
            "
          >
            <span className="text-6xl font-bold">
              {score}
            </span>

            <span
              className="font-semibold mt-2"
              style={{
                color,
              }}
            >
              {level}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center">
        <p className="text-zinc-400">
          Overall System Threat Level
        </p>
      </div>
    </div>
  );
}