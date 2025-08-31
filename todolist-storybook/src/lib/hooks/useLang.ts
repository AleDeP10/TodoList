import { useContext } from 'react';
import { LangContext } from '../utils/i18n';
import type { LangContextType } from '../types/i18n';

/**
 * Hook to access current language context.
 * Returns [lang, setLang] for consistency with useState.
 */
export function useLang(): [LangContextType['lang'], LangContextType['setLang']] {
  const ctx = useContext(LangContext);
  if (!ctx) {
    throw new Error('useLang must be used within LangProvider');
  }
  return [ctx.lang, ctx.setLang];
}
