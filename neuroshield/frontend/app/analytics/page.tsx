import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";

import ThreatTrendChart from "@/components/charts/ThreatTrendChart";
import SeverityChart from "@/components/charts/SeverityChart";
import NetworkActivityChart from "@/components/charts/NetworkActivityChart";

export default function AnalyticsPage() {
  return (
    <div className="flex min-h-screen bg-black">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <main
          className="
            p-6
            space-y-6
            bg-gradient-to-br
            from-zinc-950
            via-zinc-900
            to-black
            min-h-screen
          "
        >
          <div>
            <h1 className="text-3xl font-bold">
              Security Analytics
            </h1>

            <p className="text-zinc-400 mt-2">
              Threat intelligence and system insights
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <ThreatTrendChart />
            <SeverityChart />
          </div>

          <NetworkActivityChart />
        </main>
      </div>
    </div>
  );
}