"use client";

import { createContext, useContext, useMemo } from "react";
import type { Locale } from "./config";

export type I18nState = { locale: Locale; dict: Record<string, string> };

export const I18nContext = createContext<I18nState | null>(null);

// Browser fallback for code that reads translated data outside render (event handlers).
// Only ever one locale on screen at a time, so a module-level value is safe in the browser.
let browserState: I18nState | null = null;
export const getBrowserState = () => browserState;
const setBrowserState = (v: I18nState) => {
  browserState = v;
};

export function I18nProvider({ locale, dict, children }: { locale: Locale; dict: Record<string, string>; children: React.ReactNode }) {
  const parent = useContext(I18nContext);
  const value = useMemo<I18nState>(
    () => ({ locale, dict: parent && parent.locale === locale ? { ...parent.dict, ...dict } : dict }),
    [locale, dict, parent],
  );
  if (typeof window !== "undefined") setBrowserState(value);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useLocale(): Locale {
  return useContext(I18nContext)?.locale ?? "en";
}
