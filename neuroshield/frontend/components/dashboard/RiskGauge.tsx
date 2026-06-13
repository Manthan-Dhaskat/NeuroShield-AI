export default function RiskGauge() {
  return (
    <div className="rounded-xl border p-5">
      <h2 className="font-semibold text-lg mb-4">
        Overall Risk Score
      </h2>

      <div className="text-center">
        <h1 className="text-6xl font-bold">
          78
        </h1>

        <p className="text-muted-foreground">
          HIGH
        </p>
      </div>
    </div>
  );
}