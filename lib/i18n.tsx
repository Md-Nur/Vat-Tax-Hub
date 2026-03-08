"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import enMessages from "@/locales/en.json";
import bnMessages from "@/locales/bn.json";
import Cookies from "js-cookie";

type Messages = typeof enMessages;
type Locale = "en" | "bn";

const messages: Record<Locale, Messages> = { en: enMessages, bn: bnMessages };

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

function getNestedValue(obj: Record<string, unknown>, path: string): string {
  const keys = path.split(".");
  let current: unknown = obj;
  for (const key of keys) {
    if (current && typeof current === "object" && key in (current as Record<string, unknown>)) {
      current = (current as Record<string, unknown>)[key];
    } else {
      return path;
    }
  }
  return typeof current === "string" ? current : path;
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const saved = Cookies.get("locale") as Locale;
    if (saved && (saved === "en" || saved === "bn")) {
      setLocaleState(saved);
    }
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    Cookies.set("locale", newLocale, { expires: 365 });
  }, []);

  const t = useCallback(
    (key: string) => getNestedValue(messages[locale] as unknown as Record<string, unknown>, key),
    [locale]
  );

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return context;
}

export function useTranslation() {
  return useI18n();
}
