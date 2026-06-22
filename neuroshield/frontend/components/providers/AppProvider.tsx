"use client";

import { useThreats } from "@/hooks/useThreats";
import { useMetrics } from "@/hooks/useMetrics";
import { useWebSocket } from "@/hooks/useWebSocket";

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useThreats();
  useMetrics();
  useWebSocket();

  return <>{children}</>;
}