import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";

import MetricsCards from "@/components/dashboard/MetricsCards";
import ThreatFeed from "@/components/dashboard/ThreatFeed";
import SystemHealth from "@/components/dashboard/SystemHealth";
import RiskGauge from "@/components/dashboard/RiskGauge";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <main className="p-6 space-y-6">
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