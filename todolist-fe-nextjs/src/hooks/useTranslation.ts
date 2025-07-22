import { t } from "@/lib/i18n";
import { useLang } from '@/hooks/useLang';

export function useT() {
  const { lang } = useLang();
  return (key: string) => t(lang, key);
}