"use client";

import { create } from "zustand";
import { Threat } from "@/types/threat";

interface ThreatState {
  threats: Threat[];
  setThreats: (
    threats: Threat[]
  ) => void;
}

export const useThreatStore =
  create<ThreatState>((set) => ({
    threats: [],

    setThreats: (threats) =>
      set({ threats }),
  }));