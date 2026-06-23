"use client";

import { useEffect } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";

import ThreatTrendChart from "@/components/charts/ThreatTrendChart";
import SeverityChart from "@/components/charts/SeverityChart";
import AppVitalsChart from "@/components/charts/AppVitalsChart";

import { threatService } from "@/services/threatService";
import { useThreatStore } from "@/store/threatStore";
import { TrendingUp } from "lucide-react";

export default function AnalyticsPage() {
  const { threats, setThreats } = useThreatStore();

  useEffect(() => {
    const loadThreats = async () => {
      try {
        const data = await threatService.getThreats();
        setThreats(data);
      } catch (error) {
        console.error(error);
      }
    };
    loadThreats();
  }, [setThreats]);

  const totalThreats = threats.length;
  const criticalThreats = threats.filter(t => t.severity === "CRITICAL").length;
  const mitigatedThreats = threats.filter(t => t.status === "MITIGATED").length;
  
  // Calculate average risk score
  const averageRisk = totalThreats > 0
    ? threats.reduce((acc, t) => acc + t.risk_score, 0) / totalThreats
    : 0;

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
                Security Analytics
              </h1>

              <p className="section-subtitle">
                Threat intelligence and app vitals telemetry insights
              </p>
            </div>
            
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-zinc-800 bg-zinc-900/40 text-xs text-zinc-400">
              <TrendingUp size={14} className="text-green-400" />
              Intelligence Feed: Active
            </div>
          </div>

          {/* Analytics Summary Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glow-card glow-border rounded-3xl p-6">
              <span className="text-zinc-550 text-xs font-semibold uppercase tracking-wider block">Security Score</span>
              <div className="flex items-end justify-between mt-3">
                <span className="text-4xl font-extrabold text-white">{totalThreats === 0 ? "100" : Math.max(10, Math.round(100 - averageRisk))}/100</span>
                <span className="text-xs text-green-400 font-medium bg-green-500/10 px-2 py-0.5 rounded-md border border-green-500/20">Optimal</span>
              </div>
            </div>

            <div className="glow-card glow-border rounded-3xl p-6">
              <span className="text-zinc-550 text-xs font-semibold uppercase tracking-wider block">Average Threat Risk</span>
              <div className="flex items-end justify-between mt-3">
                <span className="text-4xl font-extrabold text-white">{Math.round(averageRisk)}%</span>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-md border ${
                  averageRisk >= 75 ? "bg-red-500/10 text-red-400 border-red-500/20" :
                  averageRisk >= 40 ? "bg-orange-500/10 text-orange-400 border-orange-500/20" :
                  "bg-green-500/10 text-green-400 border-green-500/20"
                }`}>Avg Severity</span>
              </div>
            </div>

            <div className="glow-card glow-border rounded-3xl p-6">
              <span className="text-zinc-550 text-xs font-semibold uppercase tracking-wider block">Mitigation Rate</span>
              <div className="flex items-end justify-between mt-3">
                <span className="text-4xl font-extrabold text-white">
                  {totalThreats > 0 ? Math.round((mitigatedThreats / totalThreats) * 100) : 100}%
                </span>
                <span className="text-xs text-blue-400 font-medium bg-blue-500/10 px-2 py-0.5 rounded-md border border-blue-500/20">Auto-Resolved</span>
              </div>
            </div>

            <div className="glow-card glow-border rounded-3xl p-6">
              <span className="text-zinc-550 text-xs font-semibold uppercase tracking-wider block">Critical Ratio</span>
              <div className="flex items-end justify-between mt-3">
                <span className="text-4xl font-extrabold text-white">
                  {totalThreats > 0 ? Math.round((criticalThreats / totalThreats) * 100) : 0}%
                </span>
                <span className="text-xs text-orange-400 font-medium bg-orange-500/10 px-2 py-0.5 rounded-md border border-orange-500/20">Incidents</span>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <ThreatTrendChart />
            <SeverityChart />
          </div>

          <AppVitalsChart />
        </main>
      </div>
    </div>
  );
}