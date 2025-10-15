import { useEffect, useState } from "react";

/**
 * useCSSVariable
 *
 * 🎯 Purpose:
 * Safely reads a CSS variable from :root after hydration.
 * Avoids SSR mismatches by deferring access to window.
 *
 * 📦 Usage:
 * ```tsx
 * const bg = useCSSVariable("--filter-bg");
 * ```
 *
 * 🔁 Returns:
 * - The value of the CSS variable (e.g. "#ffbb00")
 * - Initially returns `undefined` during SSR
 */
export function useCssVariable(name: string): string | undefined {
  const [value, setValue] = useState<string | undefined>(undefined);

  useEffect(() => {
    const root = window.getComputedStyle(document.documentElement);
    const raw = root.getPropertyValue(name).trim();
    setValue(raw || undefined);
  }, [name]);

  return value;
}
