"use client";

import { useEffect } from "react";

import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";

import ThreatTable from "@/components/threats/ThreatTable";
import ThreatExplanation from "@/components/threats/ThreatExplanation";

import { threatService } from "@/services/threatService";
import { useThreatStore } from "@/store/threatStore";
import { Shield, ShieldAlert, Sparkles, CheckCircle } from "lucide-react";

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

  const activeCount = threats.filter(t => t.status === "ACTIVE").length;
  const mitigatedCount = threats.filter(t => t.status === "MITIGATED").length;
  const criticalCount = threats.filter(t => t.severity === "CRITICAL").length;

  const latestExplanation =
    threats.length > 0
      ? threats[0].description
      : "No active threats detected. System is running securely.";

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
          <div className="flex justify-between items-center">
            <div>
              <h1 className="section-title text-white">
                Threat Analysis
              </h1>

              <p className="section-subtitle">
                AI-powered classification & auto-mitigation
              </p>
            </div>
            
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-zinc-800 bg-zinc-900/40 text-xs text-zinc-400">
              <Sparkles size={14} className="text-blue-400" />
              Models: Isolation Forest & MLP Classifier
            </div>
          </div>

          {/* Quick Telemetry Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="glow-card glow-border rounded-2xl p-4 flex items-center gap-4">
              <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                <Shield size={20} />
              </div>
              <div>
                <p className="text-xs text-zinc-500">Total Detections</p>
                <p className="text-xl font-bold text-white mt-0.5">{threats.length}</p>
              </div>
            </div>

            <div className="glow-card glow-border rounded-2xl p-4 flex items-center gap-4">
              <div className="h-10 w-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-400">
                <ShieldAlert size={20} />
              </div>
              <div>
                <p className="text-xs text-zinc-500">Active Threats</p>
                <p className="text-xl font-bold text-white mt-0.5">{activeCount}</p>
              </div>
            </div>

            <div className="glow-card glow-border rounded-2xl p-4 flex items-center gap-4">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                <CheckCircle size={20} />
              </div>
              <div>
                <p className="text-xs text-zinc-500">Mitigated Threats</p>
                <p className="text-xl font-bold text-white mt-0.5">{mitigatedCount}</p>
              </div>
            </div>

            <div className="glow-card glow-border rounded-2xl p-4 flex items-center gap-4">
              <div className="h-10 w-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400">
                <ShieldAlert size={20} />
              </div>
              <div>
                <p className="text-xs text-zinc-500">Critical Threats</p>
                <p className="text-xl font-bold text-white mt-0.5">{criticalCount}</p>
              </div>
            </div>
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