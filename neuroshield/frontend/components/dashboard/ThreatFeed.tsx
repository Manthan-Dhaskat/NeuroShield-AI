const threats = [
  {
    id: 1,
    process: "malware.exe",
    severity: "CRITICAL",
  },
  {
    id: 2,
    process: "suspicious.py",
    severity: "HIGH",
  },
  {
    id: 3,
    process: "network_scan.exe",
    severity: "MEDIUM",
  },
];

export default function ThreatFeed() {
  return (
    <div className="rounded-xl border p-5">
      <h2 className="font-semibold text-lg mb-4">
        Live Threat Feed
      </h2>

      <div className="space-y-3">
        {threats.map((threat) => (
          <div
            key={threat.id}
            className="border rounded-lg p-3"
          >
            <p className="font-medium">
              {threat.process}
            </p>

            <p className="text-sm text-muted-foreground">
              Severity: {threat.severity}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}