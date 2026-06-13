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
];

export default function ThreatTable() {
  return (
    <div className="border rounded-xl p-4">
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
                {threat.process}
              </TableCell>

              <TableCell>
                {threat.severity}
              </TableCell>

              <TableCell>
                {threat.score}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}