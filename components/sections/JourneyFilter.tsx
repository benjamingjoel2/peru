"use client";

import { useMemo, useState } from "react";
import type { HikingLevel, Journey, ZoneId } from "@/data/types";
import { zones } from "@/data/zones";
import { JourneyCard } from "./Cards";
import { t, L } from "@/lib/i18n";

const lengths = L([
  { id: "all", label: "Any length", test: () => true },
  { id: "short", label: "Up to 8 days", test: (d: number) => d <= 8 },
  { id: "mid", label: "9–11 days", test: (d: number) => d >= 9 && d <= 11 },
  { id: "long", label: "12+ days", test: (d: number) => d >= 12 },
]);
const hiking: { id: HikingLevel | "all"; label: string }[] = L([
  { id: "all", label: "Any hiking" },
  { id: "easy", label: "Easy" },
  { id: "moderate", label: "Moderate" },
  { id: "challenging", label: "Challenging" },
]);

export function JourneyFilter({ list }: { list: Journey[] }) {
  const [len, setLen] = useState("all");
  const [hike, setHike] = useState<HikingLevel | "all">("all");
  const [zone, setZone] = useState<ZoneId | "all">("all");
  const [kids, setKids] = useState(false);

  const results = useMemo(
    () =>
      list.filter(
        (j) =>
          lengths.find((l) => l.id === len)!.test(j.days) &&
          (hike === "all" || j.hikingLevel === hike) &&
          (zone === "all" || j.zones.includes(zone)) &&
          (!kids || j.tags.includes("kids")),
      ),
    [list, len, hike, zone, kids],
  );

  const select = "min-h-11 rounded-[3px] border-2 border-stone-light bg-cream px-3 text-sm font-semibold text-indigo";

  return (
    <div>
      <div className="flex flex-wrap items-end gap-3 border-y border-stone-light py-4" role="group" aria-label={t("Filter journeys")}>
        <label className="text-sm">
          <span className="mb-1 block font-bold text-stone-dark">{t("Length")}</span>
          <select className={select} value={len} onChange={(e) => setLen(e.target.value)}>
            {lengths.map((l) => <option key={l.id} value={l.id}>{l.label}</option>)}
          </select>
        </label>
        <label className="text-sm">
          <span className="mb-1 block font-bold text-stone-dark">{t("Hiking")}</span>
          <select className={select} value={hike} onChange={(e) => setHike(e.target.value as HikingLevel | "all")}>
            {hiking.map((h) => <option key={h.id} value={h.id}>{h.label}</option>)}
          </select>
        </label>
        <label className="text-sm">
          <span className="mb-1 block font-bold text-stone-dark">{t("Region")}</span>
          <select className={select} value={zone} onChange={(e) => setZone(e.target.value as ZoneId | "all")}>
            <option value="all">{t("All regions")}</option>
            {zones.map((z) => <option key={z.id} value={z.id}>{z.name}</option>)}
          </select>
        </label>
        <label className="flex min-h-11 cursor-pointer items-center gap-2 rounded-[3px] border-2 border-stone-light px-3 text-sm font-semibold text-indigo">
          <input type="checkbox" checked={kids} onChange={(e) => setKids(e.target.checked)} className="h-4 w-4 accent-cochineal" />
          {t("Great with kids")}
        </label>
        <p className="ml-auto text-sm text-stone-dark" aria-live="polite">{t("{n} of {total} journeys", { n: results.length, total: list.length })}</p>
      </div>
      <div className="mt-10 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((j) => <JourneyCard key={j.slug} j={j} />)}
      </div>
      {results.length === 0 && (
        <p className="py-10 text-center text-stone-dark">{t("No journeys match all of those. Try fewer filters, or ask us to design one from scratch.")}</p>
      )}
    </div>
  );
}
