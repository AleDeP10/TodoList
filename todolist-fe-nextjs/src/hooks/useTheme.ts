"use client";

import { useEffect, useState } from "react";

export type ThemeName = "dark" | "light" | "custom";

export function useTheme(): [ThemeName, (t: ThemeName) => void] {
  const [theme, setThemeRaw] = useState<ThemeName>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("theme") as ThemeName) ?? "dark";
    }
    return "dark"; // default server-side
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
