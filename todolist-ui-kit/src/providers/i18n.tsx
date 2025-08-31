"use client";

import { createContext, useEffect, useState, type ReactNode } from "react";
import type { Lang, LangContextType } from "../types/i18n";
import { useLang } from "../hooks/useLang";

// 🧠 Create context using a safe identifier
const _LangContext = createContext<LangContextType | undefined>(undefined);

// ✅ Exported alias
export const LangContext = _LangContext;

/** Component that provides current language context to the app */
export function LangProvider({ children }: { children?: ReactNode }) {
  const [lang, setLangRaw] = useState<Lang>("it");

  // 🎯 On mount, read saved language from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("lang");
    if (stored === "en" || stored === "it") {
      setLangRaw(stored);
    }
  }, []);

  // 💾 Persist language change
  const setLang = (newLang: Lang) => {
    localStorage.setItem("lang", newLang);
    setLangRaw(newLang);
  };

  return (
    <_LangContext.Provider value={{ lang, setLang }}>
      {children}
    </_LangContext.Provider>
  );
}

// Language wrapper component
export const LangWrapper = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLang] = useLang();

  useEffect(() => {
    setLang(lang); // trigger side effects if needed

    if (process.env.NODE_ENV !== "production") {
      console.debug(`[LangWrapper] active language: ${lang}`);
    }
  }, [lang, setLang]);

  return <>{children}</>;
};
