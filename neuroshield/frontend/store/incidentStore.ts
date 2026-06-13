"use client";

import { create } from "zustand";

interface IncidentState {
  incidents: any[];

  setIncidents: (
    incidents: any[]
  ) => void;

  addIncident: (
    incident: any
  ) => void;
}

export const useIncidentStore =
  create<IncidentState>((set) => ({
    incidents: [],

    setIncidents: (
      incidents
    ) =>
      set({
        incidents,
      }),

    addIncident: (
      incident
    ) =>
      set((state) => ({
        incidents: [
          incident,
          ...state.incidents,
        ],
      })),
  }));