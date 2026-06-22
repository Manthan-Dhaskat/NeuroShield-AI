"use client";

import { useEffect } from "react";

import { useThreatStore } from "@/store/threatStore";
import { useIncidentStore } from "@/store/incidentStore";
import { useMetricStore } from "@/store/metricStore";

export const useWebSocket = () => {
  const addThreat =
    useThreatStore(
      (state) =>
        state.addThreat
    );

  const addIncident =
    useIncidentStore(
      (state) =>
        state.addIncident
    );

  const addMetric =
    useMetricStore(
      (state) =>
        state.addMetric
    );

  useEffect(() => {
    const socket =
      new WebSocket(
        "ws://localhost:8000/ws"
      );

    socket.onopen = () => {
      console.log(
        "WebSocket Connected"
      );
    };

    socket.onmessage = (
      event
    ) => {
      const message =
        JSON.parse(
          event.data
        );

      switch (
        message.event
      ) {
        case "new_threat":
          addThreat(
            message.data
          );
          break;

        case "incident_created":
          addIncident(
            message.data
          );
          break;

        case "system_metrics":
          addMetric(
            message.data
          );
          break;

        default:
          break;
      }
    };

    socket.onerror = (
      error
    ) => {
      console.error(
        "WebSocket Error:",
        error
      );
    };

    socket.onclose = () => {
      console.log(
        "WebSocket Closed"
      );
    };

    return () =>
      socket.close();
  }, [
    addThreat,
    addIncident,
    addMetric,
  ]);
};