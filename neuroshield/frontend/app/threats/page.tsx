import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";

import ThreatTable from "@/components/threats/ThreatTable";
import ThreatExplanation from "@/components/threats/ThreatExplanation";

export default function ThreatsPage() {
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
              Threat Analysis
            </h1>

            <p className="section-subtitle">
              AI detected and classified threats
            </p>
          </div>

          <ThreatTable />

          <ThreatExplanation
            explanation="
            AI identified abnormal process behavior,
            suspicious network communication patterns,
            and elevated resource consumption that
            significantly deviated from normal system
            activity.
            "
          />
        </main>
      </div>
    </div>
  );
}