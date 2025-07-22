"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { Lang, LangContextType } from "@/types/i18n";

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

// ✅ Hook consumer da importare ovunque
export function useLang(): LangContextType {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
}
