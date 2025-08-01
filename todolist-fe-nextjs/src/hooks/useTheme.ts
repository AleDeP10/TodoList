"use client";

import { useEffect, useState } from "react";

export type ThemeName = "dark" | "light" | "custom";

export function useTheme(): [ThemeName, (t: ThemeName) => void] {
  const [theme, setThemeRaw] = useState<ThemeName>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("theme") as ThemeName | null;
      if (stored) return stored;

      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      return prefersDark ? "dark" : "light";
    }

    return "dark"; // fallback server-side
  });

  const setTheme = (newTheme: ThemeName) => {
    setThemeRaw(newTheme);
    localStorage.setItem("theme", newTheme);

    // Remove old css
    document.querySelectorAll("link[data-theme]").forEach((el) => el.remove());

    // Add the correct css
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `/themes/${newTheme}-theme.css`;
    link.setAttribute("data-theme", "true");
    document.head.appendChild(link);
  };

  useEffect(() => {
    setTheme(theme); // init
  });

  return [theme, setTheme];
}
