import { api } from "@/lib/api";

export const threatService = {
  async getThreats() {
    const response = await api.get(
      "/threats"
    );

    return response.data;
  },
};