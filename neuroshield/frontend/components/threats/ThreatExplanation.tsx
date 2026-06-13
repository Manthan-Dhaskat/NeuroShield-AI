interface ThreatExplanationProps {
  explanation: string;
}

export default function ThreatExplanation({
  explanation,
}: ThreatExplanationProps) {
  return (
    <div
      className="
        glow-card
        glow-border
        rounded-3xl
        p-6
      "
    >
      <h2 className="text-2xl font-semibold mb-4">
        AI Threat Explanation
      </h2>

      <p
        className="
          text-lg
          text-zinc-300
          leading-8
        "
      >
        {explanation}
      </p>
    </div>
  );
}