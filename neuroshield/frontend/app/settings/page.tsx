"use client";

import { useEffect, useState } from "react";

import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";

import { monitoringService } from "@/services/monitoringService";

export default function SettingsPage() {
  const [monitoringStatus, setMonitoringStatus] =
    useState("Checking...");

  useEffect(() => {
    const loadStatus = async () => {
      try {
        const metrics =
          await monitoringService.getMetrics();

        if (
          metrics &&
          metrics.length > 0
        ) {
          setMonitoringStatus(
            "Active"
          );
        } else {
          setMonitoringStatus(
            "Offline"
          );
        }
      } catch {
        setMonitoringStatus(
          "Offline"
        );
      }
    };

    loadStatus();

    const interval =
      setInterval(
        loadStatus,
        10000
      );

    return () =>
      clearInterval(
        interval
      );
  }, []);

  return (
    <div className="flex min-h-screen bg-black">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <main
          className="
            p-6
            space-y-6
            bg-gradient-to-br
            from-zinc-950
            via-zinc-900
            to-black
            min-h-screen
          "
        >
          <div>
            <h1 className="section-title">
              Settings
            </h1>

            <p className="section-subtitle">
              NeuroShield configuration
            </p>
          </div>

          <div className="glow-card glow-border rounded-3xl p-6">
            <h2 className="text-xl font-semibold mb-3">
              API Configuration
            </h2>

            <p className="text-zinc-400">
              Backend URL:
            </p>

            <p className="mt-2 text-blue-400">
              http://localhost:8000
            </p>
          </div>

          <div className="glow-card glow-border rounded-3xl p-6">
            <h2 className="text-xl font-semibold mb-3">
              Detection Thresholds
            </h2>

            <div className="space-y-2 text-zinc-300">
              <p>
                Critical: 33+
              </p>

              <p>
                High: 32+
              </p>

              <p>
                Medium: 30+
              </p>

              <p>
                Low: &lt; 30
              </p>
            </div>
          </div>

          <div className="glow-card glow-border rounded-3xl p-6">
            <h2 className="text-xl font-semibold mb-3">
              Monitoring Status
            </h2>

            <p
              className={
                monitoringStatus ===
                "Active"
                  ? "text-green-400"
                  : "text-red-400"
              }
            >
              {monitoringStatus}
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}