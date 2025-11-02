/**
 * useTranslation.ts
 *
 * 🌐 Context:
 * This hook provides access to the current translation function based on the active language.
 * It enables localized rendering of UI strings using the internal `t()` utility.
 *
 * ✅ Solves:
 * - Centralized access to translations
 * - Dynamic language switching via `LangProvider`
 * - Variable interpolation in localized strings
 *
 * ⚙️ Behavior:
 * - Internally uses `useLang()` to retrieve the current language
 * - Returns a function `(key, variables?) => string`
 * - Throws if used outside of `LangProvider`
 *
 * 📦 Usage:
 * ```tsx
 * const t = useTranslation();
 * return <span>{t("button.save")}</span>;
 * ```
 */

import { t } from "../utils/i18n";
import { useLang } from './useLang';

export function useTranslation() {
  const [lang] = useLang();

  return (key: string, variables?: Record<string, string | number>) =>
    t(lang, key, variables);
}