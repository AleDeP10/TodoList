'use client';

import type { Lang, TranslationMap } from '@/types/i18n';
import it from '@/assets/i18n/it.json';
import en from '@/assets/i18n/en.json';

export { LangContext, LangProvider } from '@/lib/i18n/LangProvider';

// 🌐 Translation map
const translations: Record<Lang, TranslationMap> = { it, en };

/** Basic translate function */
export function t(lang: Lang, key: string): string {
  return translations[lang]?.[key] ?? key;
}


