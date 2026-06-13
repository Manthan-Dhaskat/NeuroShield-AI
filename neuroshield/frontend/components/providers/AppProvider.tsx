"use client";

import { useThreats } from "@/hooks/useThreats";
import { useWebSocket } from "@/hooks/useWebSocket";

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useThreats();

  useWebSocket();

  return <>{children}</>;
}