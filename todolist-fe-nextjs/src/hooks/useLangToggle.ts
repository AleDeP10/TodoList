import { useEffect, useState } from 'react';

export default function useLangToggle(storageKey = 'lang') {
  const [lang, setLang] = useState<'it' | 'en'>(() => {
    if (typeof window === 'undefined') return 'en'; // fallback SSR
    return (localStorage.getItem(storageKey) as 'it' | 'en') ?? 'en';
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(storageKey, lang);
    }
  }, [lang, storageKey]);

  const toggle = () => setLang(lang === 'it' ? 'en' : 'it');

  return {
    lang,
    toggle,
  };
}