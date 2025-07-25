import { t } from '@/lib/i18n';
import { useLang } from '@/hooks/useLang';

/**
 * Hook to access current localization context.
 * Throws if used outside of LangProvider.
 */
export function useT() {
  const { lang } = useLang();

  return (key: string, variables?: Record<string, string | number>) =>
    t(lang, key, variables);
}