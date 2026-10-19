"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { currencies, type CurrencyCode } from "@/config/pricing";

const STORAGE_KEY = "dpt-currency";

const CurrencyContext = createContext<{ code: CurrencyCode; setCode: (c: CurrencyCode) => void }>({
  code: "USD",
  setCode: () => {},
});

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [code, setCodeState] = useState<CurrencyCode>("USD");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as CurrencyCode | null;
      // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrate the saved preference after mount
      if (saved && saved in currencies) setCodeState(saved);
    } catch {}
  }, []);

  const setCode = useCallback((c: CurrencyCode) => {
    setCodeState(c);
    try {
      localStorage.setItem(STORAGE_KEY, c);
    } catch {}
  }, []);

  return <CurrencyContext.Provider value={{ code, setCode }}>{children}</CurrencyContext.Provider>;
}

export const useCurrency = () => useContext(CurrencyContext);

export function formatPrice(usd: number, code: CurrencyCode) {
  const c = currencies[code];
  const value = usd * c.rate;
  const rounded = value >= 1000 ? Math.round(value / 50) * 50 : Math.round(value / 5) * 5;
  return `${c.symbol}${rounded.toLocaleString(c.locale === "es-PE" ? "en-US" : c.locale)}`;
}
