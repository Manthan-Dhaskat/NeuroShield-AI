import { api } from "@/lib/api";

export const monitoringService = {
  async getMetrics() {
    const response = await api.get(
      "/monitoring/metrics"
    );

    return response.data;
  },
};