import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";

import MetricsCards from "@/components/dashboard/MetricsCards";
import ThreatFeed from "@/components/dashboard/ThreatFeed";
import RiskGauge from "@/components/dashboard/RiskGauge";
import SystemHealth from "@/components/dashboard/SystemHealth";

export default function DashboardPage() {
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
            <h1 className="section-title">
              NeuroShield Dashboard
            </h1>

            <p className="section-subtitle">
              AI-Powered Threat Detection &
              Response
            </p>
          </div>

          <MetricsCards />

          <div className="grid lg:grid-cols-2 gap-6">
            <ThreatFeed />
            <RiskGauge />
          </div>

          <SystemHealth />
        </main>
      </div>
    </div>
  );
}