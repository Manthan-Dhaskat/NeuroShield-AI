"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  ShieldAlert,
  BarChart3,
  AlertTriangle,
  Settings,
} from "lucide-react";

const items = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Threats", href: "/threats", icon: ShieldAlert },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Incidents", href: "/incidents", icon: AlertTriangle },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  return (
    <aside className="w-64 border-r bg-background h-screen">
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold">NeuroShield</h1>
        <p className="text-sm text-muted-foreground">
          AI Cyber Defense
        </p>
      </div>

      <nav className="p-4 space-y-2">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-accent"
            >
              <Icon size={18} />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}