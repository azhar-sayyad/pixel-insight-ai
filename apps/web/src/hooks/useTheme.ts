import { create } from "zustand";
import { useEffect } from "react";

type Theme = "dark" | "light";

function getInitial(): Theme {
  const stored = localStorage.getItem("theme") as Theme | null;
  if (stored) return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

interface ThemeStore {
  theme: Theme;
  toggle: () => void;
}

const useThemeStore = create<ThemeStore>((set, get) => ({
  theme: getInitial(),
  toggle: () => {
    const next: Theme = get().theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", next);
    applyTheme(next);
    set({ theme: next });
  },
}));

function applyTheme(theme: Theme) {
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

export function useTheme() {
  const { theme, toggle } = useThemeStore();

  // Apply on first mount
  useEffect(() => {
    applyTheme(theme);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { theme, toggle };
}
