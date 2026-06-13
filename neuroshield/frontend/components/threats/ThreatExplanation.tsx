interface ThreatExplanationProps {
  explanation: string;
}

export default function ThreatExplanation({
  explanation,
}: ThreatExplanationProps) {
  return (
    <div className="border rounded-xl p-4">
      <h3 className="font-semibold mb-2">
        AI Explanation
      </h3>

      <p className="text-sm text-muted-foreground">
        {explanation}
      </p>
    </div>
  );
}