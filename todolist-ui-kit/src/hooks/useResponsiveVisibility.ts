/**
 * useResponsiveVisibility.ts
 *
 * 📌 Context:
 * This hook is designed to manage conditional visibility of UI elements
 * based on the current viewport width. It is especially useful for
 * components like buttons or labels that should be hidden on mobile
 * and shown on larger screens.
 *
 * ✅ Solves:
 * - Responsive rendering logic without relying on Tailwind-only class toggling
 * - Centralized control of visibility behavior across components
 *
 * ⚙️ Behavior:
 * - Returns a boolean `isMobile` indicating if the viewport is below the defined breakpoint
 * - Default breakpoint is 768px (Tailwind's `md`)
 * - Automatically updates on window resize
 *
 * 📦 Usage:
 * ```tsx
 * const isMobile = useResponsiveVisibility();
 * return <span className={isMobile ? "sr-only" : "not-sr-only"}>Label</span>;
 * ```
 */

import { useEffect, useState } from "react";

/**
 * Hook to detect if the current viewport is below a given breakpoint
 * @param breakpoint - pixel value to compare against (default: 768)
 * @returns boolean indicating if the viewport is considered mobile
 */
export function useResponsiveVisibility(breakpoint: number = 768): boolean {
  const [isMobile, setIsMobile] = useState(false);

  // Function to check current viewport width
  const checkViewport = () => {
    setIsMobile(window.innerWidth < breakpoint);
  };

  // Initial check and listener setup
  useEffect(() => {
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, [breakpoint]);

  return isMobile;
}
