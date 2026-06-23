"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";

import MetricsCards from "@/components/dashboard/MetricsCards";
import ThreatFeed from "@/components/dashboard/ThreatFeed";
import RiskGauge from "@/components/dashboard/RiskGauge";
import SystemHealth from "@/components/dashboard/SystemHealth";

import { useIncidentStore } from "@/store/incidentStore";
import { AlertTriangle, ShieldAlert, X } from "lucide-react";

export default function DashboardPage() {
  const { incidents } = useIncidentStore();
  const [showWarning, setShowWarning] = useState(false);
  const [lastIncidentId, setLastIncidentId] = useState<number | null>(null);
  const [cooldown, setCooldown] = useState(5);

  useEffect(() => {
    if (incidents && incidents.length > 0) {
      const latest = incidents[0];
      if (latest.action_taken === "FORCE_SHUTDOWN" && latest.id !== lastIncidentId) {
        setShowWarning(true);
        setLastIncidentId(latest.id);
      }
    }
  }, [incidents, lastIncidentId]);

  useEffect(() => {
    if (showWarning) {
      setCooldown(5);
      const timer = setInterval(() => {
        setCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [showWarning]);

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
            page-background
          "
        >
          <div>
            <h1 className="section-title text-white">
              Application Shield Dashboard
            </h1>

            <p className="section-subtitle">
              RASP Real-Time Active Protection & Vitals
            </p>
          </div>

          <MetricsCards />

          <div className="grid lg:grid-cols-2 gap-6">
            <ThreatFeed />
            <RiskGauge />
          </div>

          <SystemHealth />
        </main>
      </div>

      {/* Critical Threat Popup Modal */}
      {showWarning && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 backdrop-blur-md p-4 animate-in fade-in duration-300">
          <div className="bg-zinc-900 border border-red-500/30 rounded-3xl p-8 max-w-md w-full shadow-[0_0_50px_rgba(239,68,68,0.25)] relative animate-in zoom-in-95 duration-300 text-center space-y-6 glow-card">
            {cooldown === 0 && (
              <button 
                onClick={() => setShowWarning(false)}
                className="absolute top-4 right-4 text-zinc-500 hover:text-white p-1 rounded-full hover:bg-zinc-800 transition-all cursor-pointer"
              >
                <X size={18} />
              </button>
            )}

            <div className="mx-auto h-16 w-16 rounded-full bg-red-500/10 flex items-center justify-center animate-bounce">
              <AlertTriangle className="text-red-500" size={32} />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-black text-red-500 uppercase tracking-wide">
                Critical Intrusion Blocked
              </h2>
              <p className="text-xs text-zinc-400 font-mono">
                RASP ACTIVE DEFENSE MITIGATION
              </p>
            </div>

            <p className="text-sm text-zinc-300 leading-relaxed">
              A high-risk anomaly was detected inside the protected target process. 
              To prevent data theft, encryption, or privilege escalation, 
              <strong> NeuroShield AI has executed a secure force shutdown</strong> of the application.
            </p>

            <div className="bg-red-950/20 border border-red-500/10 rounded-2xl p-4 text-xs font-mono text-red-400 text-left space-y-1">
              <div className="flex justify-between">
                <span>Mitigation Action:</span>
                <span className="font-bold">FORCE_SHUTDOWN</span>
              </div>
              <div className="flex justify-between">
                <span>Target App Status:</span>
                <span className="font-bold">TERMINATED (OFFLINE)</span>
              </div>
              <div className="flex justify-between">
                <span>System Security:</span>
                <span className="font-bold text-green-400">SECURE</span>
              </div>
            </div>

            <button
              onClick={() => setShowWarning(false)}
              disabled={cooldown > 0}
              className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-3 rounded-2xl text-sm transition-all cursor-pointer shadow-lg shadow-red-600/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-zinc-800 disabled:text-zinc-500"
            >
              {cooldown > 0 ? `Acknowledge & Clear Alert (${cooldown}s)` : "Acknowledge & Clear Alert"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}