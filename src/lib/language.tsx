"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "en" | "fa";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  isRtl: boolean;
  t: (en: string, fa: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Load saved language preference
    const saved = localStorage.getItem("language") as Language;
    if (saved && (saved === "en" || saved === "fa")) {
      setLangState(saved);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      // Save language preference
      localStorage.setItem("language", lang);
      // Update document direction
      document.documentElement.dir = lang === "fa" ? "rtl" : "ltr";
      document.documentElement.lang = lang;
    }
  }, [lang, mounted]);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
  };

  const toggleLang = () => {
    setLangState((prev) => (prev === "en" ? "fa" : "en"));
  };

  const isRtl = lang === "fa";

  // Helper function to get translated text
  const t = (en: string, fa: string) => (lang === "fa" ? fa : en);

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <LanguageContext.Provider
        value={{ lang: "en", setLang, toggleLang, isRtl: false, t: (en) => en }}
      >
        {children}
      </LanguageContext.Provider>
    );
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, isRtl, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
