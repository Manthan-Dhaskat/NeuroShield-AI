"use client";

import { useEffect, useState } from "react";
import { monitoringService } from "@/services/monitoringService";

export default function SystemHealth() {
  const [metric, setMetric] =
    useState<any>(null);

  useEffect(() => {
    const loadMetrics = async () => {
      try {
        const data =
          await monitoringService.getMetrics();

        setMetric(data[0]);
      } catch (error) {
        console.error(error);
      }
    };

    loadMetrics();
  }, []);

  return (
    <div className="rounded-xl border p-5">
      <h2 className="font-semibold text-lg mb-4">
        System Health
      </h2>

      <div className="space-y-3">
        <p>
          CPU Usage:{" "}
          {metric?.cpu_usage?.toFixed(1)}%
        </p>

        <p>
          Memory Usage:{" "}
          {metric?.memory_usage?.toFixed(1)}%
        </p>

        <p>
          Disk Usage:{" "}
          {metric?.disk_usage?.toFixed(1)}%
        </p>
      </div>
    </div>
  );
}