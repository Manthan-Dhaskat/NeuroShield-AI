"use client";

import { ShieldAlert } from "lucide-react";

export default function RiskGauge() {
  const score = 78;

  const circumference = 2 * Math.PI * 90;
  const offset =
    circumference -
    (score / 100) * circumference;

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
        <ShieldAlert className="text-red-400" />

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
              stroke="#ef4444"
              strokeWidth="12"
              fill="transparent"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
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

            <span className="text-red-400 font-semibold mt-2">
              HIGH
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