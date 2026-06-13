"use client";

import { useThreatStore } from "@/store/threatStore";

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

  return (
    <div className="glow-card glow-border rounded-3xl p-6">
      <h2 className="text-2xl font-semibold mb-6">
        Threat Analysis
      </h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Process</TableHead>
            <TableHead>Severity</TableHead>
            <TableHead>Risk Score</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {threats.map((threat) => (
            <TableRow key={threat.id}>
              <TableCell>
                {threat.process_name}
              </TableCell>

              <TableCell
                className={
                  threat.severity === "CRITICAL"
                    ? "text-red-400"
                    : threat.severity === "HIGH"
                    ? "text-orange-400"
                    : threat.severity === "MEDIUM"
                    ? "text-yellow-400"
                    : "text-green-400"
                }
              >
                {threat.severity}
              </TableCell>

              <TableCell>
                {threat.risk_score}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}