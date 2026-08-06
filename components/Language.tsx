"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

const LANGUAGES = ["UA", "EN"] as const;
export type Language = (typeof LANGUAGES)[number];

type LanguageState = { language: Language; setLanguage: (l: Language) => void };

const LanguageContext = createContext<LanguageState | null>(null);

/** Holds the choice for the whole page. The switcher is rendered twice — once
 *  at the top of the header, once in the pinned bar — and they are never both
 *  on screen, but shared state keeps them from drifting apart. */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("EN");
  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): Language {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx.language;
}

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("LanguageSwitcher must be used inside LanguageProvider");
  const { language, setLanguage } = ctx;

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {LANGUAGES.map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLanguage(code)}
          aria-pressed={language === code}
          className={`font-futura font-semibold text-sm tracking-[0.15em] transition-colors hover:text-gold ${
            language === code ? "text-gold underline underline-offset-4" : "text-dark"
          }`}
        >
          {code}
        </button>
      ))}
    </div>
  );
}
