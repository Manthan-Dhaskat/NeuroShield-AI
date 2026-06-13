"use client";

import { useEffect } from "react";

import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";

import { incidentService } from "@/services/incidentService";
import { useIncidentStore } from "@/store/incidentStore";

export default function IncidentsPage() {
  const {
    incidents,
    setIncidents,
  } = useIncidentStore();

  useEffect(() => {
    const loadIncidents = async () => {
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
    <div className="flex min-h-screen bg-black">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <main
          className="
            p-6
            space-y-6
            bg-gradient-to-br
            from-zinc-950
            via-zinc-900
            to-black
            min-h-screen
          "
        >
          <div>
            <h1 className="section-title">
              Incident Response
            </h1>

            <p className="section-subtitle">
              Automated mitigation actions
            </p>
          </div>

          <div className="space-y-4">
            {incidents.map((incident) => (
              <div
                key={incident.id}
                className="
                  glow-card
                  glow-border
                  rounded-3xl
                  p-5
                "
              >
                <h3 className="text-xl font-semibold">
                  {incident.action_taken}
                </h3>

                <p className="text-zinc-400 mt-2">
                  Status: {incident.action_status}
                </p>

                <p className="text-zinc-500 mt-2">
                  {incident.details}
                </p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}