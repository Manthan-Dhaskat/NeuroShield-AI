"use client";

import { useThreatStore } from "@/store/threatStore";
import { useState, Fragment } from "react";
import { Search, ChevronDown, ChevronUp, ShieldCheck, ShieldAlert, Sparkles } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function ThreatTable() {
  const { threats } = useThreatStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [severityFilter, setSeverityFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const toggleRow = (id: number) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "CRITICAL":
        return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-500/10 text-red-400 border border-red-500/20">CRITICAL</span>;
      case "HIGH":
        return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-orange-500/10 text-orange-400 border border-orange-500/20">HIGH</span>;
      case "MEDIUM":
        return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">MEDIUM</span>;
      default:
        return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-500/10 text-green-400 border border-green-500/20">LOW</span>;
    }
  };

  const filteredThreats = threats.filter((threat) => {
    const matchesSearch = threat.process_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          threat.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = severityFilter === "ALL" || threat.severity === severityFilter;
    const matchesStatus = statusFilter === "ALL" || threat.status === statusFilter;
    return matchesSearch && matchesSeverity && matchesStatus;
  });

  return (
    <div className="glow-card glow-border rounded-3xl p-6 overflow-hidden space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold">
            Threat Analysis Log
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Browse, search, and analyze historical threat telemetry
          </p>
        </div>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
          <input
            type="text"
            placeholder="Search processes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-zinc-950/80 border border-zinc-800/80 rounded-xl py-2 pl-10 pr-4 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500/50 transition-colors"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-6 border-b border-zinc-850 pb-4 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-zinc-550 text-xs">Severity:</span>
          <div className="flex gap-1">
            {["ALL", "CRITICAL", "HIGH", "MEDIUM"].map((sev) => (
              <button
                key={sev}
                onClick={() => setSeverityFilter(sev)}
                className={`px-3 py-1 rounded-lg text-xs transition-all font-medium ${
                  severityFilter === sev
                    ? "bg-zinc-800 text-white border border-zinc-700"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {sev}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-zinc-550 text-xs">Status:</span>
          <div className="flex gap-1">
            {["ALL", "ACTIVE", "MITIGATED"].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1 rounded-lg text-xs transition-all font-medium ${
                  statusFilter === st
                    ? "bg-zinc-800 text-white border border-zinc-700"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-zinc-800 hover:bg-transparent">
              <TableHead className="w-10"></TableHead>
              <TableHead className="text-zinc-400 font-medium">Process</TableHead>
              <TableHead className="text-zinc-400 font-medium">PID</TableHead>
              <TableHead className="text-zinc-400 font-medium">Severity</TableHead>
              <TableHead className="text-zinc-400 font-medium">Risk Score</TableHead>
              <TableHead className="text-zinc-400 font-medium">Status</TableHead>
              <TableHead className="text-zinc-400 font-medium text-right">Time Detected</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredThreats.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-10 text-zinc-500">
                  No matching threats found.
                </TableCell>
              </TableRow>
            ) : (
              filteredThreats.map((threat) => {
                const isExpanded = expandedRow === threat.id;
                return (
                  <Fragment key={threat.id}>
                    <TableRow
                      onClick={() => toggleRow(threat.id)}
                      className="border-b border-zinc-800/50 hover:bg-zinc-800/10 cursor-pointer transition-colors"
                    >
                      <TableCell className="py-4">
                        {isExpanded ? <ChevronUp size={16} className="text-zinc-450" /> : <ChevronDown size={16} className="text-zinc-450" />}
                      </TableCell>
                      <TableCell className="font-semibold text-white py-4">
                        {threat.process_name}
                      </TableCell>
                      <TableCell className="text-zinc-400 font-mono py-4">
                        {threat.pid}
                      </TableCell>
                      <TableCell className="py-4">
                        {getSeverityBadge(threat.severity)}
                      </TableCell>
                      <TableCell className="font-mono text-zinc-300 font-medium py-4">
                        {threat.risk_score.toFixed(2)}
                      </TableCell>
                      <TableCell className="py-4">
                        <span className={`inline-flex items-center gap-1.5 text-xs ${threat.status === 'ACTIVE' ? 'text-red-400 font-semibold' : 'text-emerald-450'}`}>
                          {threat.status === 'ACTIVE' ? (
                            <>
                              <span className="h-1.5 w-1.5 rounded-full bg-red-400 animate-pulse" />
                              ACTIVE
                            </>
                          ) : (
                            <>
                              <ShieldCheck size={14} className="text-emerald-400" />
                              MITIGATED
                            </>
                          )}
                        </span>
                      </TableCell>
                      <TableCell className="text-right text-zinc-400 font-mono text-xs py-4">
                        {new Date(threat.created_at).toLocaleTimeString()}
                      </TableCell>
                    </TableRow>

                    {isExpanded && (
                      <TableRow className="bg-zinc-950/20 hover:bg-zinc-950/20">
                        <TableCell colSpan={7} className="p-0 whitespace-normal">
                          <div className="p-6 border-b border-zinc-800/40 grid md:grid-cols-3 gap-6 text-sm text-zinc-300">
                            <div className="space-y-2 md:col-span-2">
                              <span className="flex items-center gap-1.5 text-zinc-400 text-xs font-semibold uppercase tracking-wider">
                                <Sparkles size={14} className="text-blue-400" /> AI Classification Diagnostics
                              </span>
                              <p className="text-white text-sm leading-relaxed bg-zinc-900/40 p-4 rounded-2xl border border-zinc-800/80 whitespace-normal break-words">
                                {threat.description}
                              </p>
                            </div>

                            <div className="bg-zinc-900/20 p-5 rounded-2xl border border-zinc-800/80 space-y-3">
                              <span className="text-zinc-450 text-xs font-semibold uppercase tracking-wider block">Telemetry Spec</span>
                              <div className="space-y-2.5">
                                <div className="flex justify-between items-center text-xs border-b border-zinc-850 pb-1.5">
                                  <span className="text-zinc-550">Anomaly Index:</span>
                                  <span className="font-mono text-zinc-300 font-medium">{(threat.anomaly_score * 100).toFixed(1)}%</span>
                                </div>
                                <div className="flex justify-between items-center text-xs border-b border-zinc-850 pb-1.5">
                                  <span className="text-zinc-550">Target PID:</span>
                                  <span className="font-mono text-zinc-300 font-medium">{threat.pid}</span>
                                </div>
                                <div className="flex justify-between items-center text-xs">
                                  <span className="text-zinc-550">Mitigation:</span>
                                  <span className={threat.status === 'ACTIVE' ? 'text-red-400 font-semibold' : 'text-emerald-450 font-semibold'}>
                                    {threat.status === 'ACTIVE' ? 'SUSPENDED' : 'TERMINATED'}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </Fragment>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}