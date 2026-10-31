import { cache } from "react";
import { locale as rootLocale } from "next/root-params";
import { registerServerResolver, copyStrings, hashKey, isLocale, type Locale } from "./index";
import type { I18nState } from "./context";
import fr from "@/i18n/fr.json";
import de from "@/i18n/de.json";
import es from "@/i18n/es.json";
import clientKeys from "@/i18n/client-keys.json";

export const dictionaries: Record<Locale, Record<string, string>> = { en: {}, fr, de, es };

const store = cache((): { locale: Locale | null } => ({ locale: null }));
// Every layout, page and generateMetadata calls initLocale() first, so the store is set
// before any component below it renders. Outside a request (sitemap, route handlers) it's English.
function resolve(): I18nState {
  const locale = store().locale ?? "en";
  return { locale, dict: dictionaries[locale] };
}
registerServerResolver(resolve);

/** Call at the top of generateMetadata (and anywhere outside render) before translating. */
export async function initLocale(): Promise<Locale> {
  const l = await rootLocale();
  const locale = isLocale(l) ? l : "en";
  store().locale = locale;
  return locale;
}

/** The slice of the dictionary that client components need: their own strings plus the given data. */
export function clientDict(locale: Locale, data: unknown[] = [], withBase = true): Record<string, string> {
  if (locale === "en") return {};
  const dict = dictionaries[locale];
  const out: Record<string, string> = {};
  if (withBase) for (const k of clientKeys as string[]) if (dict[k]) out[k] = dict[k];
  for (const d of data) {
    for (const s of copyStrings(d)) {
      const k = hashKey(s);
      if (dict[k]) out[k] = dict[k];
    }
  }
  return out;
}
