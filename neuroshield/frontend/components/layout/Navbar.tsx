"use client";

import {
  Bell,
  Shield,
  AlertTriangle,
  Activity,
  Sun,
  Moon,
} from "lucide-react";

import { useThreatStore } from "@/store/threatStore";
import { useIncidentStore } from "@/store/incidentStore";
import { useThemeStore } from "@/store/themeStore";
import { api } from "@/lib/api";

import { useEffect, useState } from "react";

import { monitoringService } from "@/services/monitoringService";
import { incidentService } from "@/services/incidentService";

export default function Navbar() {
  const { threats } = useThreatStore();
  const { theme, toggleTheme } = useThemeStore();

  const handleToggleTheme = async () => {
    toggleTheme();
    const nextTheme = theme === "dark" ? "light" : "dark";
    try {
      await api.post("/settings", { theme: nextTheme });
    } catch (err) {
      console.error("Failed to persist theme settings:", err);
    }
  };

  const {
    incidents,
    setIncidents,
  } = useIncidentStore();

  const [health, setHealth] =
    useState("Healthy");

  const [
    showNotifications,
    setShowNotifications,
  ] = useState(false);

  const criticalThreats =
    threats.filter(
      (t) =>
        t.severity === "CRITICAL"
    ).length;

  const activeThreats =
    threats.filter(
      (t) => t.status === "ACTIVE"
    ).length;

  useEffect(() => {
    const loadHealth =
      async () => {
        try {
          const data =
            await monitoringService.getMetrics();

          const latest =
            data && data.length > 0
              ? data[0]
              : null;

          if (!latest) {
            setHealth("Unknown");
          } else if (
            latest.cpu_usage > 90 ||
            latest.memory_usage > 90
          ) {
            setHealth(
              "Critical"
            );
          } else if (
            latest.cpu_usage > 75 ||
            latest.memory_usage > 75
          ) {
            setHealth(
              "Warning"
            );
          } else {
            setHealth(
              "Healthy"
            );
          }
        } catch (error) {
          console.error(error);
        }
      };

    loadHealth();
  }, []);

  useEffect(() => {
    const loadIncidents =
      async () => {
        try {
          const data =
            await incidentService.getIncidents();

          setIncidents(data);
        } catch (error) {
          console.error(error);
        }
      };

    loadIncidents();
  }, [setIncidents]);

  return (
    <header
      className="
        sticky
        top-0
        z-50
        h-20
        px-8
        border-b
        border-zinc-800
        bg-zinc-900/70
        backdrop-blur-xl
        flex
        items-center
        justify-between
      "
    >
      <div>
        <h2 className="text-xl font-semibold text-white">
          Security Operations Center
        </h2>

        <p className="text-sm text-zinc-400">
          Real-Time Threat Monitoring
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div
          className="
            flex
            items-center
            gap-2
            rounded-xl
            border
            border-red-500/20
            bg-red-500/10
            px-4
            py-2
          "
        >
          <AlertTriangle
            size={18}
            className="text-red-400"
          />

          <span className="text-sm text-red-400">
            {criticalThreats} Critical
          </span>
        </div>

        <div
          className="
            flex
            items-center
            gap-2
            rounded-xl
            border
            border-orange-500/20
            bg-orange-500/10
            px-4
            py-2
          "
        >
          <Shield
            size={18}
            className="text-orange-400"
          />

          <span className="text-sm text-orange-400">
            {activeThreats} Active
          </span>
        </div>

        <div
          className="
            flex
            items-center
            gap-2
            rounded-xl
            border
            border-green-500/20
            bg-green-500/10
            px-4
            py-2
          "
        >
          <Activity
            size={18}
            className="text-green-400"
          />

          <span className="text-sm text-green-400">
            {health}
          </span>
        </div>

        <button
          onClick={handleToggleTheme}
          className="
            h-11
            w-11
            rounded-xl
            border
            border-zinc-700
            bg-zinc-800
            flex
            items-center
            justify-center
            hover:bg-zinc-700
            transition-all
            cursor-pointer
          "
        >
          {theme === "light" ? (
            <Moon size={18} className="text-zinc-500" />
          ) : (
            <Sun size={18} className="text-yellow-400" />
          )}
        </button>

        <div className="relative">
          <button
            onClick={() =>
              setShowNotifications(
                !showNotifications
              )
            }
            className="
              relative
              h-11
              w-11
              rounded-xl
              border
              border-zinc-700
              bg-zinc-800
              flex
              items-center
              justify-center
              hover:bg-zinc-700
              transition-all
            "
          >
            <Bell size={18} />

            {incidents.length > 0 && (
              <span
                className="
                  absolute
                  top-2
                  right-2
                  h-2
                  w-2
                  rounded-full
                  bg-red-500
                "
              />
            )}
          </button>

          {showNotifications && (
            <div
              className="
                absolute
                right-0
                mt-3
                w-96
                rounded-2xl
                border
                border-zinc-800
                bg-zinc-900
                shadow-2xl
                p-4
                z-50
              "
            >
              <h3 className="text-lg font-semibold mb-4">
                Recent Incidents
              </h3>

              <div className="space-y-3 max-h-80 overflow-y-auto">
                {incidents.length === 0 ? (
                  <p className="text-zinc-500">
                    No incidents found
                  </p>
                ) : (
                  incidents.map(
                    (incident) => (
                      <div
                        key={incident.id}
                        className="
                          rounded-xl
                          border
                          border-zinc-800
                          p-3
                        "
                      >
                        <div className="flex justify-between">
                          <span className="font-medium">
                            {incident.action_taken}
                          </span>

                          <span className="text-xs text-green-400">
                            {incident.action_status}
                          </span>
                        </div>

                        <p className="text-sm text-zinc-400 mt-2">
                          {incident.details}
                        </p>
                      </div>
                    )
                  )
                )}
              </div>
            </div>
          )}
        </div>

        <div className="ml-2 text-right">
          <p className="text-sm text-white">
            {new Date().toLocaleDateString("en-GB")}
          </p>

          <p className="text-xs text-zinc-500">
            Live Monitoring
          </p>
        </div>
      </div>
    </header>
  );
}