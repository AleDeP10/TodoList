"use client";

import { createContext, useContext, useEffect, useState } from "react";
import it from "@/assets/i18n/it.json";
import en from "@/assets/i18n/en.json";
import type { Lang, LangContextType, TranslationMap } from "@/types/i18n";

const translations: Record<Lang, TranslationMap> = { it, en };

export function t(lang: Lang, key: string): string {
  return translations[lang][key] ?? key;
}

export const LangContext = createContext<LangContextType | undefined>(
  undefined
);

export function LangProvider({ children }: { children?: React.ReactNode }) {
  const [lang, setLangRaw] = useState<Lang>("it");

  // ✅ Carica lingua da localStorage all'avvio
  useEffect(() => {
    const stored = localStorage.getItem("lang");
    if (stored === "en" || stored === "it") setLangRaw(stored);
  }, []);

  // ✅ Persistenza centralizzata
  const setLang = (newLang: Lang) => {
    localStorage.setItem("lang", newLang);
    setLangRaw(newLang);
  };

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
}
