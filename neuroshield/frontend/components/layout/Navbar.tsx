import {
  Bell,
  Shield,
  AlertTriangle,
  Activity,
} from "lucide-react";

export default function Navbar() {
  return (
    <header
      className="
        sticky
        top-0
        z-50
        h-20
        px-8
        border-b
        border-zinc-800
        bg-zinc-900/70
        backdrop-blur-xl
        flex
        items-center
        justify-between
      "
    >
      {/* Left Section */}
      <div>
        <h2 className="text-xl font-semibold text-white">
          Security Operations Center
        </h2>

        <p className="text-sm text-zinc-400">
          Real-Time Threat Monitoring
        </p>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        
        {/* Critical Threats */}
        <div
          className="
            flex
            items-center
            gap-2
            rounded-xl
            border
            border-red-500/20
            bg-red-500/10
            px-4
            py-2
          "
        >
          <AlertTriangle
            size={18}
            className="text-red-400"
          />

          <span className="text-sm text-red-400">
            2 Critical
          </span>
        </div>

        {/* Active Threats */}
        <div
          className="
            flex
            items-center
            gap-2
            rounded-xl
            border
            border-orange-500/20
            bg-orange-500/10
            px-4
            py-2
          "
        >
          <Shield
            size={18}
            className="text-orange-400"
          />

          <span className="text-sm text-orange-400">
            6 Active
          </span>
        </div>

        {/* System Health */}
        <div
          className="
            flex
            items-center
            gap-2
            rounded-xl
            border
            border-green-500/20
            bg-green-500/10
            px-4
            py-2
          "
        >
          <Activity
            size={18}
            className="text-green-400"
          />

          <span className="text-sm text-green-400">
            Healthy
          </span>
        </div>

        {/* Notification Button */}
        <button
          className="
            relative
            h-11
            w-11
            rounded-xl
            border
            border-zinc-700
            bg-zinc-800
            flex
            items-center
            justify-center
            hover:bg-zinc-700
            transition-all
          "
        >
          <Bell size={18} />

          <span
            className="
              absolute
              top-2
              right-2
              h-2
              w-2
              rounded-full
              bg-red-500
            "
          />
        </button>

        {/* Date */}
        <div className="ml-2 text-right">
          <p className="text-sm text-white">
            {new Date().toLocaleDateString()}
          </p>

          <p className="text-xs text-zinc-500">
            Live Monitoring
          </p>
        </div>
      </div>
    </header>
  );
}