/**
 * useResponsiveVisibility.ts
 *
 * 📱 Context:
 * This hook determines whether the current viewport width is below a specified breakpoint,
 * enabling conditional rendering of UI elements based on screen size.
 *
 * ✅ Solves:
 * - Centralizes responsive logic across components
 * - Avoids reliance on Tailwind-only visibility classes
 * - Enables dynamic behavior on resize events
 *
 * ⚙️ Behavior:
 * - Accepts:
 *   - `breakpoint`: optional pixel value (default: 768)
 * - Returns:
 *   - `isMobile`: boolean indicating if viewport is smaller than the breakpoint
 * - Internally:
 *   - Checks `window.innerWidth` on mount and on resize
 *   - Updates state accordingly
 *
 * 📦 Usage:
 * ```tsx
 * const isMobile = useResponsiveVisibility();
 * return <span className={isMobile ? "sr-only" : "not-sr-only"}>Label</span>;
 * ```
 */

import { useEffect, useState } from "react";

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
