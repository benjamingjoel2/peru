import { L } from "@/lib/i18n";
export type CurrencyCode = "USD" | "PEN" | "EUR" | "GBP";

export const pricing = L({
  /** "Journeys generally start around US$[X] per person per day". PLACEHOLDER value, confirm before launch. */
  fromPerDayUSD: 350,
  excludes: "international flights",
  isPlaceholder: true,
} as const);

/** Display-only conversion rates from USD. PLACEHOLDER rates, update regularly. */
export const currencies: Record<CurrencyCode, { label: string; symbol: string; rate: number; locale: string }> = L({
  USD: { label: "US dollar", symbol: "US$", rate: 1, locale: "en-US" },
  PEN: { label: "Peruvian sol", symbol: "S/", rate: 3.75, locale: "es-PE" },
  EUR: { label: "Euro", symbol: "€", rate: 0.92, locale: "en-IE" },
  GBP: { label: "Pound sterling", symbol: "£", rate: 0.78, locale: "en-GB" },
});

export const ratesAsOf = "2026-10-01";
