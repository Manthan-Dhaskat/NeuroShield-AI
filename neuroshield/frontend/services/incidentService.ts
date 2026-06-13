import { api } from "@/lib/api";

export const incidentService = {
  async getIncidents() {
    const response = await api.get(
      "/incidents"
    );

    return response.data;
  },
};