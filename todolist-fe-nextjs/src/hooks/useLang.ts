"use client";

import { useContext } from "react";
import type { LangContextType } from "@/types/i18n";

export function useLang(): LangContextType {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
}
