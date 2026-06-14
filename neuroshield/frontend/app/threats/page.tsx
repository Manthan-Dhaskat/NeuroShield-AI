"use client";

import { useEffect } from "react";

import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";

import ThreatTable from "@/components/threats/ThreatTable";
import ThreatExplanation from "@/components/threats/ThreatExplanation";

import { threatService } from "@/services/threatService";
import { useThreatStore } from "@/store/threatStore";

export default function ThreatsPage() {
  const {
    threats,
    setThreats,
  } = useThreatStore();

  useEffect(() => {
    const loadThreats = async () => {
      try {
        const data =
          await threatService.getThreats();

        setThreats(data);
      } catch (error) {
        console.error(error);
      }
    };

    loadThreats();
  }, [setThreats]);

  const latestExplanation =
    threats.length > 0
      ? threats[0].description
      : "No active threats detected.";

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
              Threat Analysis
            </h1>

            <p className="section-subtitle">
              AI detected and classified threats
            </p>
          </div>

          <ThreatTable />

          <ThreatExplanation
            explanation={
              latestExplanation
            }
          />
        </main>
      </div>
    </div>
  );
}