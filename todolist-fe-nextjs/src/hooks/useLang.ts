'use client';

import { useContext } from 'react';
import type { LangContextType } from '@/types/i18n';
import { LangContext } from '@/lib/i18n';

/**
 * Hook to access current language context.
 * Throws if used outside of LangProvider.
 */
export function useLang(): LangContextType {
  const ctx = useContext(LangContext);
  if (!ctx) {
    throw new Error('useLang must be used within LangProvider');
  }
  return ctx;
}
