"use client";

import { usePathname } from "next/navigation";
import { locales, localeLabels, localizePath, splitPath } from "@/lib/i18n/config";
import { useLocale } from "@/lib/i18n/context";
import { t } from "@/lib/i18n";

/** EN · FR · DE · ES: links to the same page in each language. */
export function LanguageSelector({ className = "", linkClassName = "" }: { className?: string; linkClassName?: string }) {
  const current = useLocale();
  const { path } = splitPath(usePathname() ?? "/");
  return (
    <nav aria-label={t("Language")} className={className}>
      <ul className="flex items-center gap-1">
        {locales.map((l, i) => (
          <li key={l} className="flex items-center gap-1">
            {i > 0 && <span aria-hidden className="opacity-50">·</span>}
            <a
              href={localizePath(path, l)}
              hrefLang={l}
              lang={l}
              aria-current={l === current ? "true" : undefined}
              aria-label={localeLabels[l].name}
              className={`rounded-sm px-1 py-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mustard ${l === current ? "font-bold underline underline-offset-4" : "opacity-80 hover:opacity-100"} ${linkClassName}`}
            >
              {localeLabels[l].short}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
