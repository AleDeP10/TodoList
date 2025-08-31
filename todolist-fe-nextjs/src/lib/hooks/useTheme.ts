import { useLayoutEffect, useState, useCallback } from "react";
import { ThemeName } from "../types/ThemeName";

export function useTheme(): [ThemeName, (t: ThemeName) => void] {
  // Initialize theme from localStorage or system preference
  const [theme, setThemeRaw] = useState<ThemeName>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("theme") as ThemeName | null;
      return (
        stored ??
        (window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "custom")
      );
    }
    return "custom"; // fallback for SSR
  });

  // Apply theme CSS by injecting a <link> tag
  const applyThemeCss = useCallback((newTheme: ThemeName) => {
    // Remove any previously injected theme styles
    document.querySelectorAll("link[data-theme]").forEach((el) => el.remove());

    // Inject the new theme stylesheet
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `/styles/themes/${newTheme}-theme.css`;
    link.setAttribute("data-theme", "true");
    document.head.appendChild(link);

    if (process.env.NODE_ENV !== "production") {
      console.debug(`[useTheme] theme applied: ${newTheme}`);
    }
  }, []);

  // Update theme state and persist to localStorage
  const setTheme = useCallback(
    (newTheme: ThemeName) => {
      if (newTheme === theme) return;
      setThemeRaw(newTheme);
      localStorage.setItem("theme", newTheme);
      applyThemeCss(newTheme);
    },
    [theme, applyThemeCss]
  );

  // Ensure theme CSS is applied before first paint
  useLayoutEffect(() => {
    applyThemeCss(theme);
    if (process.env.NODE_ENV !== "production") {
      console.debug(`[useTheme] initialized with theme: ${theme}`);
    }
  }, [theme, applyThemeCss]);

  return [theme, setTheme];
}
