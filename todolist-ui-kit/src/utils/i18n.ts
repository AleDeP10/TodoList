'use client';

import type { Lang, TranslationMap } from '../types/i18n';
import it from '../assets/i18n/it.json';
import en from '../assets/i18n/en.json';

export { LangContext, LangProvider} from '../providers/i18n'

// 🌐 Translation map
const translations: Record<Lang, TranslationMap> = { it, en };

/** Translate function with variables interpolation */
export function t(lang: Lang, key: string, variables?: Record<string, string | number>): string {
  let label = translations[lang]?.[key] ?? key;

  if (variables) {
    Object.entries(variables).forEach(([varName, value]) => {
      const regex = new RegExp(`{{\\s*${varName}\\s*}}`, 'g');
      label = label.replace(regex, String(value));
    });
  }

  return label;
}
