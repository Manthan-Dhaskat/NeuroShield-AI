"use client";

import { useEffect } from "react";
import { useThreats } from "@/hooks/useThreats";
import { useMetrics } from "@/hooks/useMetrics";
import { useWebSocket } from "@/hooks/useWebSocket";
import { useThemeStore } from "@/store/themeStore";
import { api } from "@/lib/api";

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useThreats();
  useMetrics();
  useWebSocket();

  const { setTheme } = useThemeStore();

  useEffect(() => {
    const initTheme = async () => {
      try {
        const localTheme = localStorage.getItem("theme");
        if (localTheme === "light" || localTheme === "dark") {
          setTheme(localTheme);
          return;
        }
        const response = await api.get("/settings");
        if (response.data && response.data.theme) {
          setTheme(response.data.theme as "light" | "dark");
        }
      } catch (err) {
        console.error("Failed to load initial settings:", err);
      }
    };
    initTheme();
  }, [setTheme]);

  return <>{children}</>;
}