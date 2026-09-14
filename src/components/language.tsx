"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Language = "en" | "id";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem("ricky-portfolio-language");
    if (savedLanguage !== "id" && savedLanguage !== "en") return;

    const frame = window.requestAnimationFrame(() => setLanguageState(savedLanguage));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language === "id" ? "id" : "en";
  }, [language]);

  const setLanguage = (nextLanguage: Language) => {
    setLanguageState(nextLanguage);
    window.localStorage.setItem("ricky-portfolio-language", nextLanguage);
  };

  return <LanguageContext.Provider value={{ language, setLanguage }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}

export function Copy({ en, id }: { en: ReactNode; id: ReactNode }) {
  const { language } = useLanguage();
  return <>{language === "id" ? id : en}</>;
}

export function LanguageToggle({ className = "" }: { className?: string }) {
  const { language, setLanguage } = useLanguage();

  return (
    <div className={`language-toggle ${className}`} aria-label={language === "id" ? "Pilihan bahasa" : "Language selector"}>
      <button type="button" onClick={() => setLanguage("en")} aria-pressed={language === "en"}>EN</button>
      <span aria-hidden="true">/</span>
      <button type="button" onClick={() => setLanguage("id")} aria-pressed={language === "id"}>ID</button>
    </div>
  );
}
