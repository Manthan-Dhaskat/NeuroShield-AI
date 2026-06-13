import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";

import ThreatTrendChart from "@/components/charts/ThreatTrendChart";
import SeverityChart from "@/components/charts/SeverityChart";
import NetworkActivityChart from "@/components/charts/NetworkActivityChart";

export default function AnalyticsPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <main className="p-6 space-y-6">
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