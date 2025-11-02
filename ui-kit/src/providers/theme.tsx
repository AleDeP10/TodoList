"use client";

import { useEffect } from "react";
import { useTheme } from "../hooks/useTheme";

// Theme wrapper component
export const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  // Get current theme and setter
  const [theme, setTheme] = useTheme();

  // Apply theme to body class
  useEffect(() => {
    setTheme(theme);
    document.body.classList.remove("midnight", "sunleaf", "skyline");
    document.body.classList.add(theme);
  }, [theme, setTheme]);

  return <>{children}</>;
};
