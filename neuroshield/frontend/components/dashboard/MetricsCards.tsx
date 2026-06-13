import {
  ShieldAlert,
  Activity,
  AlertTriangle,
  Cpu,
} from "lucide-react";

const metrics = [
  {
    title: "Total Threats",
    value: "24",
    icon: ShieldAlert,
  },
  {
    title: "Active Threats",
    value: "6",
    icon: Activity,
  },
  {
    title: "Critical Incidents",
    value: "2",
    icon: AlertTriangle,
  },
  {
    title: "System Health",
    value: "98%",
    icon: Cpu,
  },
];

export default function MetricsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => {
        const Icon = metric.icon;

        return (
          <div
            key={metric.title}
            className="rounded-xl border p-5"
          >
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">
                {metric.title}
              </p>

              <Icon size={18} />
            </div>

            <h2 className="text-3xl font-bold mt-3">
              {metric.value}
            </h2>
          </div>
        );
      })}
    </div>
  );
}