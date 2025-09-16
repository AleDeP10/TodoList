/**
 * useResponsiveVisibility.ts
 *
 * 📱 Context:
 * This hook provides responsive visibility flags based on the current viewport width,
 * enabling conditional rendering and layout adjustments across breakpoints.
 *
 * ✅ Solves:
 * - Centralizes responsive logic across components
 * - Avoids reliance on Tailwind-only visibility classes
 * - Enables dynamic behavior on resize events
 * - Supports multiple breakpoints for granular control
 *
 * ⚙️ Behavior:
 * - Returns:
 *   - An object with three boolean flags:
 *     - `sm`: true if viewport < 576px
 *     - `md`: true if viewport < 768px
 *     - `lg`: true if viewport < 992px
 * - Internally:
 *   - Checks `window.innerWidth` on mount and on resize
 *   - Updates state accordingly
 *
 * 📦 Usage:
 * ```tsx
 * const { md } = useResponsiveVisibility();
 *
 * return (
 *   <span className={`${md ? "sr-only" : ""} leading-none align-middle`}>
 *     Label
 *   </span>
 * );
 * ```
 *
 * 📐 Breakpoints:
 * - `sm`: Mobile base (≤ 575px)
 * - `md`: Tablet (≤ 767px)
 * - `lg`: Desktop (≤ 991px)
 *
 * 🧠 Notes:
 * - Use `sm` to stack elements vertically on small screens
 * - Use `md` to hide labels or reduce padding on tablets
 * - Use `lg` to trigger layout changes before full desktop width
 */

import { useCallback, useEffect, useState } from "react";

export interface Breakpoints {
  sm: boolean;
  md: boolean;
  lg: boolean;
}

export function useResponsiveVisibility(): Breakpoints {
  const [breakpoints, setBreakpoints] = useState<Breakpoints>({
    sm: false,
    md: false,
    lg: false,
  });

  const checkViewport = useCallback(() => {
    const width = window.innerWidth;
    setBreakpoints({
      sm: width < 576,
      md: width < 768,
      lg: width < 992,
    });
  }, []);

  useEffect(() => {
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, [checkViewport]);

  return breakpoints;
}
