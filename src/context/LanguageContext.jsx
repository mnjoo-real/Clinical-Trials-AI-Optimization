import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { translations } from "../i18n";

const LanguageContext = createContext({
  language: "en",
  toggleLanguage: () => {},
  t: (key) => key
});

const STORAGE_KEY = "siteLanguage";

const getInitialLanguage = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored === "ko" ? "ko" : "en";
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => getInitialLanguage());

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "ko" : "en"));
  };

  const t = useMemo(() => {
    return (key, vars = {}) => {
      const fallback = translations.en?.[key] ?? key;
      const text = translations[language]?.[key] ?? fallback;
      return Object.entries(vars).reduce(
        (acc, [varKey, value]) =>
          acc.replace(new RegExp(`\\{${varKey}\\}`, "g"), value),
        text
      );
    };
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
