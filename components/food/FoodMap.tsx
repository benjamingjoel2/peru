"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { foodBands, foods } from "@/data/foods";
import type { Food, FoodBand } from "@/data/types";
import { destinationBySlug } from "@/data/destinations";
import { journeyBySlug } from "@/data/journeys";
import { experienceBySlug } from "@/data/experiences";
import { plain } from "@/components/ui/Heading";

const kindLabel: Record<Food["kind"], string> = { dish: "Dish", ingredient: "Ingredient", drink: "Drink", experience: "Food experience" };
const kindIcon: Record<Food["kind"], string> = { dish: "●", ingredient: "◆", drink: "▲", experience: "★" };

// Order in which the bands appear along the cross-section: Pacific → coast → valleys → high Andes → cloud forest → Amazon
const order: FoodBand[] = ["pacific", "coast", "andes-valley", "high-andes", "cloud-forest", "amazon"];
// x positions (percent) and terrain height (percent of chart) for each band in the cross-section
const geo: Record<FoodBand, { x: number; h: number }> = {
  pacific: { x: 6, h: 6 },
  coast: { x: 20, h: 14 },
  "andes-valley": { x: 38, h: 52 },
  "high-andes": { x: 54, h: 74 },
  "cloud-forest": { x: 72, h: 44 },
  amazon: { x: 90, h: 12 },
};

export function FoodMap() {
  const [band, setBand] = useState<FoodBand>("pacific");
  const [selected, setSelected] = useState<string | null>(null);
  const [kinds, setKinds] = useState<Food["kind"][]>(["dish", "ingredient", "drink", "experience"]);
  const btns = useRef<(HTMLButtonElement | null)[]>([]);

  const list = useMemo(() => foods.filter((f) => f.band === band && kinds.includes(f.kind)), [band, kinds]);
  const b = foodBands.find((x) => x.id === band)!;
  const food = selected ? foods.find((f) => f.id === selected) : null;

  const onKey = (e: React.KeyboardEvent) => {
    const i = order.indexOf(band);
    let n = i;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") n = Math.min(order.length - 1, i + 1);
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") n = Math.max(0, i - 1);
    else if (e.key === "Home") n = 0;
    else if (e.key === "End") n = order.length - 1;
    else return;
    e.preventDefault();
    setBand(order[n]);
    setSelected(null);
    btns.current[n]?.focus();
  };

  // Terrain path through the band peaks
  const terrain = `M0 100 L0 ${100 - 2} ${order.map((id) => `L${geo[id].x} ${100 - geo[id].h}`).join(" ")} L100 ${100 - 8} L100 100 Z`;

  return (
    <div>
      {/* Cross-section */}
      <div className="relative overflow-hidden rounded-sm bg-gradient-to-b from-pacific/15 to-cream-deep ring-1 ring-stone-light">
        <svg viewBox="0 0 100 60" preserveAspectRatio="none" className="block h-56 w-full sm:h-72" aria-hidden>
          <g transform="scale(1 0.6)">
            <rect x="0" y="92" width="12" height="8" fill="var(--color-pacific)" />
            <path d={terrain} fill="var(--color-stone-light)" />
            <path d={terrain} fill="none" stroke="var(--color-stone)" strokeWidth="0.4" />
            <path d="M60 30 L74 56 L86 86 L100 92 L100 100 L60 100 Z" fill="var(--color-amazon)" opacity=".55" />
            <path d="M48 18 L54 14 L58 20 Z" fill="#fff" />
          </g>
        </svg>
        <div role="tablist" aria-label="Altitude zones, from the Pacific to the Amazon" onKeyDown={onKey} className="absolute inset-0">
          {order.map((id, i) => {
            const fb = foodBands.find((x) => x.id === id)!;
            const active = id === band;
            return (
              <button
                key={id}
                ref={(el) => { btns.current[i] = el; }}
                role="tab"
                id={`food-tab-${id}`}
                aria-selected={active}
                aria-controls="food-panel"
                tabIndex={active ? 0 : -1}
                onClick={() => { setBand(id); setSelected(null); }}
                className="group absolute -translate-x-1/2 text-center"
                style={{ left: `${geo[id].x}%`, bottom: `calc(${geo[id].h}% + 6px)` }}
              >
                <span className={`mx-auto block h-4 w-4 rotate-45 border-2 transition ${active ? "scale-125 border-cream bg-cochineal" : "border-indigo bg-cream group-hover:bg-mustard"}`} />
                <span className={`mt-1 hidden whitespace-nowrap rounded-sm px-1.5 py-0.5 text-[11px] font-bold sm:block ${active ? "bg-indigo text-cream" : "bg-cream/90 text-indigo"}`}>
                  {fb.name}
                </span>
                <span className="sr-only">{fb.range}</span>
              </button>
            );
          })}
        </div>
        <p className="absolute left-3 top-3 text-[11px] font-bold uppercase tracking-wider text-stone-dark">Pacific ← west · east → Amazon</p>
      </div>

      {/* Mobile band chooser */}
      <label className="mt-4 block sm:hidden">
        <span className="text-sm font-bold text-stone-dark">Altitude zone</span>
        <select className="mt-1 min-h-11 w-full rounded-[3px] border-2 border-stone-light bg-cream px-3" value={band} onChange={(e) => { setBand(e.target.value as FoodBand); setSelected(null); }}>
          {order.map((id) => { const fb = foodBands.find((x) => x.id === id)!; return <option key={id} value={id}>{fb.name} ({fb.range})</option>; })}
        </select>
      </label>

      <fieldset className="mt-5 flex flex-wrap items-center gap-2">
        <legend className="sr-only">Show</legend>
        {(Object.keys(kindLabel) as Food["kind"][]).map((k) => (
          <label key={k} className="cursor-pointer rounded-full border-2 border-stone-light px-3 py-1 text-sm font-semibold text-indigo has-[:checked]:border-indigo has-[:checked]:bg-indigo has-[:checked]:text-cream has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-mustard">
            <input type="checkbox" className="sr-only" checked={kinds.includes(k)} onChange={(e) => setKinds((ks) => (e.target.checked ? [...ks, k] : ks.filter((x) => x !== k)))} />
            <span aria-hidden className="mr-1">{kindIcon[k]}</span>{kindLabel[k]}s
          </label>
        ))}
      </fieldset>

      <div id="food-panel" role="tabpanel" aria-labelledby={`food-tab-${band}`} className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <h3 className="font-display text-3xl text-indigo">
            {b.name} <span className="text-lg font-normal text-stone-dark">· {b.range} (verify)</span>
          </h3>
          <p className="mt-2 text-stone-dark">{b.intro}</p>
          <ul className="mt-5 grid gap-2 sm:grid-cols-2">
            {list.map((f) => (
              <li key={f.id}>
                <button
                  type="button"
                  aria-pressed={selected === f.id}
                  onClick={() => setSelected(f.id)}
                  className={`flex w-full items-center gap-3 rounded-sm p-3 text-left ring-1 transition ${selected === f.id ? "bg-indigo text-cream ring-indigo" : "bg-cream ring-stone-light hover:ring-cochineal"}`}
                >
                  <span aria-hidden className={selected === f.id ? "text-mustard" : "text-cochineal"}>{kindIcon[f.kind]}</span>
                  <span>
                    <span className="block font-semibold">{f.name}</span>
                    <span className={`text-xs ${selected === f.id ? "text-cream/75" : "text-stone-dark"}`}>{kindLabel[f.kind]}</span>
                  </span>
                </button>
              </li>
            ))}
            {list.length === 0 && <li className="text-sm text-stone-dark">Nothing to show with these filters.</li>}
          </ul>
        </div>
        <div aria-live="polite" className="min-h-48 bg-cream-deep/60 p-6">
            {food ? (
              <div key={food.id} className="fade-down">
                <p className="eyebrow text-cochineal">{kindLabel[food.kind]}</p>
                <h4 className="mt-1 font-display text-2xl text-indigo">{food.name}</h4>
                <p className="mt-2 text-stone-dark">{food.description}</p>
                {food.where.length > 0 && (
                  <p className="mt-4 text-sm"><strong>Where: </strong>
                    {food.where.map((w, i) => { const d = destinationBySlug(w); return d ? <span key={w}>{i > 0 && ", "}<Link href={`/destinations/${d.zone}/${d.slug}`} className="text-cochineal underline">{d.name}</Link></span> : null; })}
                  </p>
                )}
                {food.journeys.length > 0 && (
                  <p className="mt-2 text-sm"><strong>On these journeys: </strong>
                    {food.journeys.map((s, i) => { const j = journeyBySlug(s); return j ? <span key={s}>{i > 0 && ", "}<Link href={`/journeys/${s}`} className="text-cochineal underline">{plain(j.title)}</Link></span> : null; })}
                  </p>
                )}
                {food.experience && experienceBySlug(food.experience) && (
                  <p className="mt-2 text-sm"><strong>Experience: </strong><Link href={`/experiences/${food.experience}`} className="text-cochineal underline">{experienceBySlug(food.experience)!.name}</Link></p>
                )}
              </div>
            ) : (
              <p key="hint" className="text-stone-dark">
                Choose a dish, ingredient or drink to see where to try it and which journeys include it.
              </p>
            )}
        </div>
      </div>
    </div>
  );
}
