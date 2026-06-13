import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const threats = [
  {
    id: 1,
    process: "malware.exe",
    severity: "CRITICAL",
    score: 95,
  },
  {
    id: 2,
    process: "suspicious.py",
    severity: "HIGH",
    score: 82,
  },
  {
    id: 3,
    process: "network_scan.exe",
    severity: "MEDIUM",
    score: 68,
  },
];

export default function ThreatTable() {
  return (
    <div className="glow-card glow-border rounded-3xl p-6">
      <h2 className="text-2xl font-semibold mb-6">
        Threat Analysis
      </h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-base text-zinc-300">
              Process
            </TableHead>

            <TableHead className="text-base text-zinc-300">
              Severity
            </TableHead>

            <TableHead className="text-base text-zinc-300">
              Risk Score
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {threats.map((threat) => (
            <TableRow
              key={threat.id}
              className="h-16"
            >
              <TableCell className="text-lg font-medium">
                {threat.process}
              </TableCell>

              <TableCell
                className={`
                  text-base
                  font-semibold

                  ${
                    threat.severity === "CRITICAL"
                      ? "text-red-400"
                      : threat.severity === "HIGH"
                      ? "text-orange-400"
                      : "text-yellow-400"
                  }
                `}
              >
                {threat.severity}
              </TableCell>

              <TableCell className="text-lg">
                {threat.score}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}