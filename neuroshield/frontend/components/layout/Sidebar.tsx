"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  ShieldAlert,
  BarChart3,
  AlertTriangle,
  Settings,
} from "lucide-react";

const items = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Threats",
    href: "/threats",
    icon: ShieldAlert,
  },
  {
    name: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    name: "Incidents",
    href: "/incidents",
    icon: AlertTriangle,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="
        w-72
        h-screen
        bg-zinc-900/95
        backdrop-blur-xl
        border-r
        border-zinc-800
        sticky
        top-0
      "
    >
      <div className="p-6 border-b border-zinc-800">
        <h1
          className="
            text-3xl
            font-bold
            bg-gradient-to-r
            from-red-500
            via-orange-400
            to-blue-500
            bg-clip-text
            text-transparent
          "
        >
          NeuroShield
        </h1>

        <p className="text-zinc-400 text-sm mt-2">
          AI-Powered Cyber Defense
        </p>
      </div>

      <div className="p-4">
        <p
          className="
            text-xs
            uppercase
            tracking-widest
            text-zinc-500
            mb-3
          "
        >
          Navigation
        </p>

        <nav className="space-y-2">
          {items.map((item) => {
            const Icon = item.icon;

            const isActive =
              pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  flex
                  items-center
                  gap-3
                  px-4
                  py-3
                  rounded-2xl
                  transition-all
                  duration-300

                  ${
                    isActive
                      ? "bg-blue-500/15 text-blue-400 border border-blue-500/20"
                      : "text-zinc-300 hover:bg-zinc-800 hover:text-white"
                  }
                `}
              >
                <Icon size={20} />

                <span className="font-medium">
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="absolute bottom-6 left-4 right-4">
        <div
          className="
            rounded-2xl
            border
            border-zinc-800
            bg-zinc-950
            p-4
          "
        >
          <p className="text-sm text-zinc-400">
            System Status
          </p>

          <div className="flex items-center gap-2 mt-2">
            <div
              className="
                w-3
                h-3
                rounded-full
                bg-green-500
                animate-pulse
              "
            />

            <span className="text-sm text-green-400">
              Monitoring Active
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}