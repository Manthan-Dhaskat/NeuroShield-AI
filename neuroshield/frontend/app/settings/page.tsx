import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";

export default function SettingsPage() {
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
              Settings
            </h1>

            <p className="section-subtitle">
              NeuroShield configuration
            </p>
          </div>

          <div className="glow-card glow-border rounded-3xl p-6">
            <h2 className="text-xl font-semibold mb-3">
              API Configuration
            </h2>

            <p className="text-zinc-400">
              Backend URL:
            </p>

            <p className="mt-2 text-blue-400">
              http://localhost:8000
            </p>
          </div>

          <div className="glow-card glow-border rounded-3xl p-6">
            <h2 className="text-xl font-semibold mb-3">
              Detection Threshold
            </h2>

            <p className="text-zinc-400">
              Current Risk Threshold: 75
            </p>
          </div>

          <div className="glow-card glow-border rounded-3xl p-6">
            <h2 className="text-xl font-semibold mb-3">
              Monitoring Status
            </h2>

            <p className="text-green-400">
              Active
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}