export type Lang = 'en' | 'it';

export interface LangContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

export type TranslationMap = Record<string, string>; 