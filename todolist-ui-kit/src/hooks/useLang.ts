/**
 * useLang.ts
 *
 * 🌍 Context:
 * This hook provides access to the current language state via React context.
 * It enables localized rendering and dynamic language switching across the application.
 *
 * ✅ Solves:
 * - Centralizes language state management
 * - Ensures consistent access to `lang` and `setLang` across components
 * - Prevents misuse outside of `LangProvider`
 *
 * ⚙️ Behavior:
 * - Internally uses `useContext(LangContext)`
 * - Throws an error if used outside of `LangProvider`
 * - Returns a tuple `[lang, setLang]` for compatibility with `useState`
 *
 * 📦 Usage:
 * ```tsx
 * const [lang, setLang] = useLang();
 *
 * // Example: switch to Italian
 * setLang("it");
 *
 * // Example: conditionally render based on language
 * if (lang === "en") {
 *   return <EnglishContent />;
 * }
 * ```
 */

import { useContext } from "react";
import { LangContext } from "../providers/i18n";
import type { LangContextType } from "../types/i18n";

export function useLang(): [
  LangContextType["lang"],
  LangContextType["setLang"]
] {
  const ctx = useContext(LangContext);
  if (!ctx) {
    throw new Error("useLang must be used within LangProvider");
  }
  return [ctx.lang, ctx.setLang];
}
