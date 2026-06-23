import { create } from "zustand";

interface ThemeState {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: "dark",

  setTheme: (theme) => {
    if (typeof window !== "undefined") {
      const root = window.document.documentElement;
      const body = window.document.body;
      if (theme === "light") {
        root.classList.add("light");
        body.classList.add("light");
        root.classList.remove("dark");
        body.classList.remove("dark");
      } else {
        root.classList.add("dark");
        body.classList.add("dark");
        root.classList.remove("light");
        body.classList.remove("light");
      }
      localStorage.setItem("theme", theme);
    }
    set({ theme });
  },

  toggleTheme: () => {
    set((state) => {
      const nextTheme = state.theme === "dark" ? "light" : "dark";
      const root = window.document.documentElement;
      const body = window.document.body;
      if (nextTheme === "light") {
        root.classList.add("light");
        body.classList.add("light");
        root.classList.remove("dark");
        body.classList.remove("dark");
      } else {
        root.classList.add("dark");
        body.classList.add("dark");
        root.classList.remove("light");
        body.classList.remove("light");
      }
      localStorage.setItem("theme", nextTheme);
      return { theme: nextTheme };
    });
  },
}));
