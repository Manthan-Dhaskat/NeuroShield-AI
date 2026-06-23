"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";

import { api } from "@/lib/api";
import { useThreatStore } from "@/store/threatStore";
import { useIncidentStore } from "@/store/incidentStore";
import { Shield, Server, Database, Save, RotateCcw, AlertTriangle, CheckCircle } from "lucide-react";

export default function SettingsPage() {
  const { setThreats } = useThreatStore();
  const { setIncidents } = useIncidentStore();

  const [targetAppName, setTargetAppName] = useState("protected_app.py");
  const [medThreshold, setMedThreshold] = useState(30);
  const [highThreshold, setHighThreshold] = useState(32);
  const [critThreshold, setCritThreshold] = useState(33);

  const [autoKill, setAutoKill] = useState(true);
  const [forceShutdownOnCritical, setForceShutdownOnCritical] = useState(true);
  const [liveStream, setLiveStream] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(false);

  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [dbResetStatus, setDbResetStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [apiStatus, setApiStatus] = useState<"Checking..." | "Active" | "Offline">("Checking...");
  const [apiLatency, setApiLatency] = useState<number | null>(null);

  useEffect(() => {
    const checkApi = async () => {
      const startTime = Date.now();
      try {
        const response = await api.get("/health");
        if (response.data && response.data.status === "healthy") {
          setApiStatus("Active");
          setApiLatency(Date.now() - startTime);
        } else {
          setApiStatus("Offline");
          setApiLatency(null);
        }
      } catch {
        setApiStatus("Offline");
        setApiLatency(null);
      }
    };

    checkApi();
    const interval = setInterval(checkApi, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const response = await api.get("/settings");
        if (response.data) {
          const d = response.data;
          setTargetAppName(d.target_app_name || "protected_app.py");
          setMedThreshold(d.med_threshold || 30);
          setHighThreshold(d.high_threshold || 32);
          setCritThreshold(d.crit_threshold || 33);
          setAutoKill(d.auto_kill !== undefined ? d.auto_kill : true);
          setForceShutdownOnCritical(d.force_shutdown_on_critical !== undefined ? d.force_shutdown_on_critical : true);
        }
      } catch (err) {
        console.error("Failed to load app settings:", err);
      }
    };
    loadSettings();
  }, []);

  const handleSaveSettings = async () => {
    setSaveStatus("saving");
    try {
      await api.post("/settings", {
        target_app_name: targetAppName,
        med_threshold: medThreshold,
        high_threshold: highThreshold,
        crit_threshold: critThreshold,
        auto_kill: autoKill,
        force_shutdown_on_critical: forceShutdownOnCritical
      });
      setSaveStatus("success");
      setTimeout(() => setSaveStatus("idle"), 3000);
    } catch (err) {
      console.error("Failed to save settings:", err);
      setSaveStatus("error");
      setTimeout(() => setSaveStatus("idle"), 3000);
    }
  };

  const handleResetDatabase = async () => {
    if (!confirm("Warning: This will clear all historical threats, system metrics, and incident actions from the database. Are you sure?")) {
      return;
    }

    setDbResetStatus("loading");
    try {
      const response = await api.post("/health/clear-db");
      if (response.data && response.data.status === "success") {
        setDbResetStatus("success");
        setThreats([]);
        setIncidents([]);
        setTimeout(() => setDbResetStatus("idle"), 4000);
      } else {
        setDbResetStatus("error");
        setTimeout(() => setDbResetStatus("idle"), 4000);
      }
    } catch (error) {
      console.error(error);
      setDbResetStatus("error");
      setTimeout(() => setDbResetStatus("idle"), 4000);
    }
  };

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
            <h1 className="section-title text-white">
              System Settings
            </h1>

            <p className="section-subtitle">
              Configure AI classification ranges and mitigation actions
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="glow-card glow-border rounded-3xl p-6 space-y-6">
              <div className="flex items-center gap-3 border-b border-zinc-800 pb-4">
                <Shield className="text-blue-405" size={20} />
                <h2 className="text-xl font-semibold">
                  AI Detection Limits & App Protection
                </h2>
              </div>

              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-zinc-300">Protected Target Application Process</label>
                  <input
                    type="text"
                    value={targetAppName}
                    onChange={(e) => setTargetAppName(e.target.value)}
                    placeholder="e.g. protected_app.py"
                    className="w-full bg-zinc-950/60 border border-zinc-800/80 rounded-2xl p-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-all font-mono"
                  />
                  <p className="text-[10px] text-zinc-500">The shield targets and secures any running process matching this name.</p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-zinc-300">Medium Anomaly Range (Threshold)</span>
                    <span className="text-yellow-450 font-semibold">{medThreshold}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="50"
                    value={medThreshold}
                    onChange={(e) => setMedThreshold(Number(e.target.value))}
                    className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-yellow-400"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-zinc-300">High Anomaly Range (Threshold)</span>
                    <span className="text-orange-405 font-semibold">{highThreshold}%</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="70"
                    value={highThreshold}
                    onChange={(e) => setHighThreshold(Number(e.target.value))}
                    className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-orange-400"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-zinc-300">Critical Anomaly Range (Threshold)</span>
                    <span className="text-red-405 font-semibold">{critThreshold}%</span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="90"
                    value={critThreshold}
                    onChange={(e) => setCritThreshold(Number(e.target.value))}
                    className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-red-400"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={handleSaveSettings}
                  disabled={saveStatus === "saving"}
                  className="flex items-center gap-1.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer disabled:opacity-50"
                >
                  <Save size={14} /> 
                  {saveStatus === "saving" ? "Saving..." : saveStatus === "success" ? "Settings Saved!" : saveStatus === "error" ? "Error Saving" : "Save Settings"}
                </button>
              </div>
            </div>

            <div className="glow-card glow-border rounded-3xl p-6 space-y-6">
              <div className="flex items-center gap-3 border-b border-zinc-800 pb-4">
                <Server className="text-blue-405" size={20} />
                <h2 className="text-xl font-semibold">
                  Mitigation Protocols
                </h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-2xl bg-zinc-900/20 border border-zinc-800/80">
                  <div>
                    <p className="text-sm font-semibold text-white">Automated Process Termination</p>
                    <p className="text-xs text-zinc-500">Auto-kill threats matching Critical severity</p>
                  </div>
                  <button
                    onClick={() => setAutoKill(!autoKill)}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      autoKill ? "bg-blue-500" : "bg-zinc-800"
                    }`}
                  >
                    <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      autoKill ? "translate-x-5" : "translate-x-0"
                    }`} />
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 rounded-2xl bg-zinc-900/20 border border-zinc-800/80">
                  <div>
                    <p className="text-sm font-semibold text-white">Critical Force Shutdown</p>
                    <p className="text-xs text-zinc-500">Force shut down target app on Critical severity alert</p>
                  </div>
                  <button
                    onClick={() => setForceShutdownOnCritical(!forceShutdownOnCritical)}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      forceShutdownOnCritical ? "bg-blue-500" : "bg-zinc-800"
                    }`}
                  >
                    <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      forceShutdownOnCritical ? "translate-x-5" : "translate-x-0"
                    }`} />
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 rounded-2xl bg-zinc-900/20 border border-zinc-800/80">
                  <div>
                    <p className="text-sm font-semibold text-white">WebSocket Stream Alerts</p>
                    <p className="text-xs text-zinc-500">Push real-time process alerts directly to layout</p>
                  </div>
                  <button
                    onClick={() => setLiveStream(!liveStream)}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      liveStream ? "bg-blue-500" : "bg-zinc-800"
                    }`}
                  >
                    <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      liveStream ? "translate-x-5" : "translate-x-0"
                    }`} />
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 rounded-2xl bg-zinc-900/20 border border-zinc-800/80">
                  <div>
                    <p className="text-sm font-semibold text-white">Email Incident Reports</p>
                    <p className="text-xs text-zinc-500">Dispatches email summary to administrator log</p>
                  </div>
                  <button
                    onClick={() => setEmailAlerts(!emailAlerts)}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      emailAlerts ? "bg-blue-500" : "bg-zinc-800"
                    }`}
                  >
                    <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      emailAlerts ? "translate-x-5" : "translate-x-0"
                    }`} />
                  </button>
                </div>
              </div>
            </div>

            <div className="glow-card glow-border rounded-3xl p-6 space-y-6">
              <div className="flex items-center gap-3 border-b border-zinc-800 pb-4">
                <Server className="text-blue-450" size={20} />
                <h2 className="text-xl font-semibold">
                  API & Engine Status
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-zinc-900/40 border border-zinc-800 p-4 rounded-2xl space-y-1">
                  <span className="text-[10px] uppercase font-semibold tracking-wider text-zinc-500">FastAPI Connection</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`h-2.5 w-2.5 rounded-full ${apiStatus === 'Active' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                    <span className={`text-base font-bold ${apiStatus === 'Active' ? 'text-green-400' : 'text-red-400'}`}>{apiStatus}</span>
                  </div>
                </div>

                <div className="bg-zinc-900/40 border border-zinc-800 p-4 rounded-2xl space-y-1">
                  <span className="text-[10px] uppercase font-semibold tracking-wider text-zinc-500">Latency Speed</span>
                  <p className="text-base font-bold text-white mt-1">{apiLatency ? `${apiLatency} ms` : "N/A"}</p>
                </div>
              </div>

              <div className="space-y-1 text-xs">
                <p className="text-zinc-500">Rest API Endpoint URL:</p>
                <div className="flex items-center justify-between bg-zinc-950 p-2.5 rounded-xl border border-zinc-800 font-mono text-[11px] text-blue-400">
                  <span>http://localhost:8000/api</span>
                  <span className="text-[10px] text-zinc-500 cursor-pointer uppercase font-semibold hover:text-white" onClick={() => navigator.clipboard.writeText("http://localhost:8000/api")}>Copy</span>
                </div>
              </div>
            </div>

            <div className="glow-card glow-border rounded-3xl p-6 space-y-6">
              <div className="flex items-center gap-3 border-b border-zinc-800 pb-4">
                <Database className="text-blue-450" size={20} />
                <h2 className="text-xl font-semibold">
                  Database Administrative Tools
                </h2>
              </div>

              <p className="text-xs text-zinc-405 leading-relaxed">
                Clean and wipe historical security logs from SQLite/MySQL schema. Wiping tables does not interrupt active AI monitors but will purge dashboard logs in real-time.
              </p>

              <div className="flex flex-col gap-3 pt-2">
                <button
                  onClick={handleResetDatabase}
                  disabled={dbResetStatus === "loading"}
                  className={`flex items-center justify-center gap-2 px-5 py-3 rounded-2xl text-xs font-semibold transition-all border ${
                    dbResetStatus === "loading"
                      ? "bg-zinc-800 text-zinc-500 border-zinc-800 cursor-not-allowed"
                      : "bg-red-500/10 hover:bg-red-500/20 text-red-400 border-red-500/20 cursor-pointer"
                  }`}
                >
                  <RotateCcw size={14} className={dbResetStatus === "loading" ? "animate-spin" : ""} />
                  {dbResetStatus === "loading" ? "Executing Database Reset..." : "Reset Database & Wipe Telemetry"}
                </button>

                {dbResetStatus === "success" && (
                  <div className="flex items-center gap-2 p-3.5 rounded-2xl bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium animate-in fade-in duration-200">
                    <CheckCircle size={16} /> Data purged successfully. Dashboard updated.
                  </div>
                )}

                {dbResetStatus === "error" && (
                  <div className="flex items-center gap-2 p-3.5 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium animate-in fade-in duration-200">
                    <AlertTriangle size={16} /> Error executing database clear sequence. Check backend service status.
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}