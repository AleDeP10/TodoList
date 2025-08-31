"use client";

import type { Lang } from "../../types/i18n";
import { useLang } from "../../hooks/useLang";

const langs: Lang[] = ["it", "en"];

export default function LangSwitcher() {
  const [lang, setLang] = useLang();

  return (
    <div className="flex gap-2 items-center" role="group" aria-label="Lang">
      {langs.map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`px-2 py-1 text-sm border rounded ${
            lang === l ? "bg-blue-600 text-white" : "border-gray-300"
          }`}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
