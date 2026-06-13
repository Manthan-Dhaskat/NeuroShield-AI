export default function SystemHealth() {
  return (
    <div className="rounded-xl border p-5">
      <h2 className="font-semibold text-lg mb-4">
        System Health
      </h2>

      <div className="space-y-3">
        <p>CPU Usage: 34%</p>
        <p>Memory Usage: 57%</p>
        <p>Disk Usage: 41%</p>
      </div>
    </div>
  );
}