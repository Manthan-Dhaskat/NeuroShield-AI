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
    change: "+12%",
    icon: ShieldAlert,
  },
  {
    title: "Active Threats",
    value: "6",
    change: "+3%",
    icon: Activity,
  },
  {
    title: "Critical Incidents",
    value: "2",
    change: "-1",
    icon: AlertTriangle,
  },
  {
    title: "System Health",
    value: "98%",
    change: "+2%",
    icon: Cpu,
  },
];

export default function MetricsCards() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => {
        const Icon = metric.icon;

        return (
          <div
            key={metric.title}
            className="
              glow-card
              glow-border
              rounded-3xl
              p-6
              hover:scale-[1.02]
              transition-all
              duration-300
            "
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-zinc-400">
                  {metric.title}
                </p>

                <h2 className="text-5xl font-bold mt-3 tracking-tight">
                  {metric.value}
                </h2>

                <p className="text-xs text-emerald-400 mt-2">
                  {metric.change} from last scan
                </p>
              </div>

              <div
                className="
                  h-14
                  w-14
                  rounded-2xl
                  bg-blue-500/10
                  flex
                  items-center
                  justify-center
                "
              >
                <Icon
                  size={26}
                  className="text-blue-400"
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}