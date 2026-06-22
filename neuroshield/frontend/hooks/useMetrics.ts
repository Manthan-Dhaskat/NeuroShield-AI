"use client";

import { useEffect } from "react";
import { useMetricStore } from "@/store/metricStore";
import { monitoringService } from "@/services/monitoringService";

export const useMetrics = () => {
  const { setMetrics } = useMetricStore();

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const data = await monitoringService.getMetrics();
        setMetrics(data);
      } catch (error) {
        console.error("METRIC FETCH ERROR:", error);
      }
    };

    fetchMetrics();
  }, [setMetrics]);
};
