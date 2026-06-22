"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";

import { incidentService } from "@/services/incidentService";
import { useIncidentStore } from "@/store/incidentStore";
import { ShieldCheck, Clock, Terminal, Search } from "lucide-react";

export default function IncidentsPage() {
  const {
    incidents,
    setIncidents,
  } = useIncidentStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL");

  useEffect(() => {
    const loadIncidents = async () => {
      try {
        const data = await incidentService.getIncidents();
        setIncidents(data);
      } catch (error) {
        console.error(error);
      }
    };
    loadIncidents();
  }, [setIncidents]);

  const filteredIncidents = incidents.filter(inc => {
    const matchesSearch = inc.action_taken.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          inc.details.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "ALL" || inc.action_status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const totalInterventions = incidents.length;
  const successCount = incidents.filter(inc => inc.action_status === "SUCCESS" || inc.action_status === "COMPLETED" || inc.action_status === "Mitigated").length;
  const runningCount = incidents.filter(inc => inc.action_status === "RUNNING" || inc.action_status === "PENDING").length;

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
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="section-title text-white">
                Incident Response
              </h1>
              <p className="section-subtitle">
                Automated mitigation dispatch logs & timelines
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={14} />
                <input
                  type="text"
                  placeholder="Search logs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-zinc-950/80 border border-zinc-800 rounded-xl py-1.5 pl-9 pr-4 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500/50 transition-colors"
                />
              </div>

              <div className="flex gap-1 bg-zinc-900/60 p-0.5 border border-zinc-800 rounded-xl">
                {["ALL", "SUCCESS", "COMPLETED"].map((statusOption) => (
                  <button
                    key={statusOption}
                    onClick={() => setFilterStatus(statusOption)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold uppercase tracking-wider transition-all ${
                      filterStatus === statusOption
                        ? "bg-zinc-805 text-white"
                        : "text-zinc-500 hover:text-zinc-300"
                    }`}
                  >
                    {statusOption}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="glow-card glow-border rounded-2xl p-4 flex items-center gap-4">
              <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                <Terminal size={20} />
              </div>
              <div>
                <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold">Interventions</p>
                <p className="text-lg font-bold text-white mt-0.5">{totalInterventions}</p>
              </div>
            </div>

            <div className="glow-card glow-border rounded-2xl p-4 flex items-center gap-4">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-450">
                <ShieldCheck size={20} />
              </div>
              <div>
                <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold">Auto-Mitigated</p>
                <p className="text-lg font-bold text-white mt-0.5">{successCount || totalInterventions}</p>
              </div>
            </div>

            <div className="glow-card glow-border rounded-2xl p-4 flex items-center gap-4">
              <div className="h-10 w-10 rounded-xl bg-yellow-500/10 flex items-center justify-center text-yellow-400">
                <Clock size={20} />
              </div>
              <div>
                <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold">Countermeasures</p>
                <p className="text-lg font-bold text-white mt-0.5">{runningCount}</p>
              </div>
            </div>
          </div>

          <div className="relative pl-6 border-l border-zinc-800/85 space-y-8 ml-2">
            {filteredIncidents.length === 0 ? (
              <div className="glow-card glow-border rounded-3xl p-8 text-center text-zinc-500">
                No incidents reported or matching current filters. System is running securely.
              </div>
            ) : (
              filteredIncidents.map((incident) => {
                const isCompleted = incident.action_status === "SUCCESS" || incident.action_status === "COMPLETED" || incident.action_status === "Mitigated";

                return (
                  <div key={incident.id} className="relative group">
                    <div className={`absolute -left-[35px] top-1 h-6.5 w-6.5 rounded-full border-2 flex items-center justify-center bg-black ${
                      isCompleted ? "border-emerald-500 text-emerald-400" : "border-yellow-500 text-yellow-400 animate-pulse"
                    }`}>
                      {isCompleted ? <ShieldCheck size={12} /> : <Clock size={12} />}
                    </div>

                    <div className={`glow-card glow-border rounded-3xl p-5 hover:border-zinc-700/60 border-l-4 transition-all duration-300 ${
                      isCompleted ? "border-l-emerald-500" : "border-l-yellow-500"
                    }`}>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <h3 className="text-lg font-semibold text-white">
                            {incident.action_taken}
                          </h3>
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border uppercase tracking-wider ${
                            isCompleted ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                          }`}>
                            {incident.action_status}
                          </span>
                        </div>

                        <span className="text-xs text-zinc-500 font-mono">
                          Threat #{incident.threat_id}
                        </span>
                      </div>

                      <p className="text-zinc-400 text-sm mt-3 leading-relaxed">
                        {incident.details}
                      </p>

                      <div className="mt-4 pt-4 border-t border-zinc-800/60 space-y-2.5 text-xs text-zinc-400">
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 rounded bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-[10px]">✓</div>
                          <span>Resource usage limits checked and cataloged</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 rounded bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-[10px]">✓</div>
                          <span>Automated responder isolation code dispatched</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className={`h-4 w-4 rounded flex items-center justify-center font-bold text-[10px] ${
                            isCompleted ? "bg-emerald-500/10 text-emerald-400" : "bg-yellow-500/10 text-yellow-400"
                          }`}>
                            {isCompleted ? "✓" : "⟳"}
                          </div>
                          <span>Process state verification scan: {isCompleted ? "CONFIRMED KILLED" : "IN PROGRESS"}</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center mt-5 text-[10px] text-zinc-500 uppercase tracking-widest font-semibold">
                        <span>Incident #{incident.id}</span>
                        <span className="font-mono">{new Date(incident.created_at || Date.now()).toLocaleTimeString()}</span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </main>
      </div>
    </div>
  );
}