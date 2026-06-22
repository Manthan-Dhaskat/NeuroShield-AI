"use client";

import { create } from "zustand";

export interface Metric {
  id?: number;
  cpu_usage: number;
  memory_usage: number;
  disk_usage: number;
  network_sent: number;
  network_received: number;
  timestamp?: string;
}

interface MetricState {
  metrics: Metric[];
  setMetrics: (metrics: Metric[]) => void;
  addMetric: (metric: Metric) => void;
}

export const useMetricStore = create<MetricState>((set) => ({
  metrics: [],

  setMetrics: (metrics) =>
    set({ metrics }),

  addMetric: (metric) =>
    set((state) => ({
      metrics: [
        metric,
        ...state.metrics.slice(0, 49),
      ],
    })),
}));
