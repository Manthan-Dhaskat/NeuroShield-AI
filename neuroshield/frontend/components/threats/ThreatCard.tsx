interface ThreatCardProps {
  processName: string;
  severity: string;
  score: number;
}

export default function ThreatCard({
  processName,
  severity,
  score,
}: ThreatCardProps) {
  return (
    <div className="border rounded-xl p-4">
      <h3 className="font-semibold">
        {processName}
      </h3>

      <p className="text-sm text-muted-foreground">
        Severity: {severity}
      </p>

      <p className="mt-2 font-bold">
        Risk Score: {score}
      </p>
    </div>
  );
}