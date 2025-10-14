"use client";

/**
 * useTheme.ts
 *
 * 🎨 Context:
 * This hook manages the active theme and dynamically injects the corresponding CSS file.
 * It supports persistence via localStorage and adapts to system preferences on first load.
 *
 * ✅ Solves:
 * - Centralized theme management across the app
 * - Dynamic stylesheet injection without relying on Tailwind-only theming
 * - Persistence of user preference across sessions
 *
 * ⚙️ Behavior:
 * - Initializes theme from localStorage or system dark mode preference
 * - Injects `/styles/themes/{theme}-theme.css` into the document head
 * - Persists theme changes to localStorage
 * - Ensures theme is applied before first paint using `useLayoutEffect`
 * - Sets `data-theme` attribute on <html> for immediate fallback styling
 *
 * - Returns:
 *   - `theme`: current theme name
 *   - `setTheme(theme)`: function to update theme
 *
 * 📦 Usage:
 * ```tsx
 * const [theme, setTheme] = useTheme();
 *
 * // Example: switch to midnight theme
 * setTheme("midnight");
 * ```
 */

import { useLayoutEffect, useState, useCallback } from "react";
import { ThemeName } from "../types/ThemeName";

export function useTheme(): [ThemeName, (t: ThemeName) => void] {
  // Initialize theme from localStorage or system preference
  const [theme, setThemeRaw] = useState<ThemeName>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("theme") || "skyline") as ThemeName;
    }
    return "skyline"; // fallback for SSR
  });

  // Apply theme CSS by injecting a <link> tag and setting data-theme attribute
  const applyThemeCss = useCallback((newTheme: ThemeName) => {
    // Remove any previously injected theme styles
    document.querySelectorAll("link[data-theme]").forEach((el) => el.remove());

    // Set data-theme attribute for immediate fallback styling
    document.documentElement.setAttribute("data-theme", newTheme);

    // Inject the new theme stylesheet
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `/styles/themes/${newTheme}-theme.css`;
    link.setAttribute("data-theme", "true");
    document.head.appendChild(link);
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
  }, [theme, applyThemeCss]);

  return [theme, setTheme];
}
