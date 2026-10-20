"use client";

import { useId, useMemo, useState } from "react";
import { destinations } from "@/data/destinations";
import { zones } from "@/data/zones";
import { journeys } from "@/data/journeys";
import { routeWarnings, formatM, type ProfilePoint } from "@/lib/altitude";
import { AltitudeProfile } from "./AltitudeProfile";
import { plain } from "@/components/ui/Heading";
import { useEnquire } from "@/components/enquire/EnquireProvider";

// Places you can sleep: overnight-able destinations with a sensible sleeping altitude
const sleepable = destinations
  .filter((d) => !["inca-trail-salkantay", "rainbow-mountain", "nazca-lines"].includes(d.slug))
  .map((d) => ({
    slug: d.slug,
    name: d.slug === "machu-picchu" ? "Aguas Calientes (Machu Picchu)" : d.slug === "sacred-valley" ? "Sacred Valley" : d.slug === "arequipa-colca" ? "Arequipa" : d.name,
    zone: d.zone,
    // Aguas Calientes is where you actually sleep for Machu Picchu
    m: d.slug === "machu-picchu" ? 2040 : d.elevationM,
  }))
  .concat([{ slug: "colca", name: "Colca Canyon villages", zone: "southern-andes" as const, m: 3450 }]);

type Stop = { key: number; slug: string; nights: number };

const presets: { label: string; stops: Omit<Stop, "key">[] }[] = [
  { label: "Straight to Cusco (not ideal)", stops: [{ slug: "lima", nights: 1 }, { slug: "cusco", nights: 3 }, { slug: "machu-picchu", nights: 1 }, { slug: "lake-titicaca", nights: 2 }] },
  { label: "Sleep lower first", stops: [{ slug: "lima", nights: 1 }, { slug: "sacred-valley", nights: 2 }, { slug: "machu-picchu", nights: 1 }, { slug: "cusco", nights: 3 }, { slug: "lake-titicaca", nights: 2 }] },
];

let keySeq = 100;

export function RouteBuilder() {
  const id = useId();
  const { openEnquire } = useEnquire();
  const [stops, setStops] = useState<Stop[]>(() => presets[1].stops.map((s) => ({ ...s, key: keySeq++ })));
  const [adding, setAdding] = useState(sleepable[0].slug);
  const [announce, setAnnounce] = useState("");

  const points: ProfilePoint[] = useMemo(() => {
    const out: ProfilePoint[] = [];
    stops.forEach((s) => {
      const place = sleepable.find((p) => p.slug === s.slug)!;
      for (let n = 0; n < s.nights; n++) out.push({ label: `Night ${out.length + 1}`, sublabel: place.name, sleepM: place.m });
    });
    return out.map((p) => ({ ...p, label: p.label.replace("Night", "Day") }));
  }, [stops]);

  const warnings = useMemo(() => routeWarnings(points), [points]);

  const update = (key: number, patch: Partial<Stop>) => setStops((ss) => ss.map((s) => (s.key === key ? { ...s, ...patch } : s)));
  const move = (i: number, dir: -1 | 1) => {
    setStops((ss) => {
      const j = i + dir;
      if (j < 0 || j >= ss.length) return ss;
      const copy = [...ss];
      [copy[i], copy[j]] = [copy[j], copy[i]];
      return copy;
    });
    const name = sleepable.find((p) => p.slug === stops[i].slug)?.name;
    setAnnounce(`${name} moved ${dir < 0 ? "up" : "down"}.`);
  };

  const loadJourney = (slug: string) => {
    const j = journeys.find((x) => x.slug === slug);
    if (!j) return;
    const out: Stop[] = [];
    j.itinerary.forEach((d, idx) => {
      if (idx === j.itinerary.length - 1 && d.sleepAt === "home") return;
      let slugGuess = sleepable.find((p) => p.slug === d.sleepAt && Math.abs(p.m - d.sleepAltitudeM) < 400)?.slug;
      if (!slugGuess) slugGuess = d.sleepLabel.includes("Colca") ? "colca" : sleepable.reduce((a, b) => (Math.abs(b.m - d.sleepAltitudeM) < Math.abs(a.m - d.sleepAltitudeM) ? b : a)).slug;
      const last = out[out.length - 1];
      if (last && last.slug === slugGuess) last.nights++;
      else out.push({ key: keySeq++, slug: slugGuess, nights: 1 });
    });
    setStops(out);
    setAnnounce(`Loaded ${plain(j.title)}: ${out.length} stops.`);
  };

  const input = "min-h-11 rounded-[3px] border-2 border-stone-light bg-cream px-2 text-ink";
  const iconBtn = "grid h-9 w-9 place-items-center rounded-sm border-2 border-stone-light text-indigo hover:border-indigo disabled:opacity-30";

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] [&>*]:min-w-0">
      <div>
        <div className="flex flex-wrap gap-2">
          {presets.map((p) => (
            <button key={p.label} type="button" onClick={() => { setStops(p.stops.map((s) => ({ ...s, key: keySeq++ }))); setAnnounce(`Loaded: ${p.label}`); }} className="rounded-full border-2 border-indigo px-3 py-1 text-sm font-semibold text-indigo hover:bg-indigo hover:text-cream">
              {p.label}
            </button>
          ))}
        </div>
        <label htmlFor={`${id}-journey`} className="mt-4 block text-sm font-bold text-stone-dark">Or start from one of our journeys</label>
        <select id={`${id}-journey`} className={`${input} mt-1 w-full`} defaultValue="" onChange={(e) => loadJourney(e.target.value)}>
          <option value="" disabled>Choose a journey</option>
          {journeys.map((j) => <option key={j.slug} value={j.slug}>{j.days} days: {plain(j.title)}</option>)}
        </select>

        <h3 className="mt-6 font-display text-xl text-indigo">Your stops</h3>
        <ol className="mt-3 space-y-2">
          {stops.map((s, i) => {
            const place = sleepable.find((p) => p.slug === s.slug)!;
            return (
              <li key={s.key} className="flex flex-wrap items-center gap-2 rounded-sm bg-cream p-2 ring-1 ring-stone-light">
                <span className="w-6 text-center font-display font-light text-cochineal">{i + 1}</span>
                <label className="sr-only" htmlFor={`${id}-p-${s.key}`}>Stop {i + 1} place</label>
                <select id={`${id}-p-${s.key}`} className={`${input} min-w-0 flex-1`} value={s.slug} onChange={(e) => update(s.key, { slug: e.target.value })}>
                  {zones.map((z) => (
                    <optgroup key={z.id} label={z.name}>
                      {sleepable.filter((p) => p.zone === z.id).map((p) => <option key={p.slug} value={p.slug}>{p.name} (~{formatM(p.m)})</option>)}
                    </optgroup>
                  ))}
                </select>
                <label className="sr-only" htmlFor={`${id}-n-${s.key}`}>Nights at stop {i + 1}</label>
                <input id={`${id}-n-${s.key}`} type="number" min={1} max={14} value={s.nights} onChange={(e) => update(s.key, { nights: Math.max(1, Math.min(14, Number(e.target.value) || 1)) })} className={`${input} w-16`} />
                <span className="text-xs text-stone-dark">night{s.nights > 1 ? "s" : ""}</span>
                <span className="ml-auto flex gap-1">
                  <button type="button" className={iconBtn} disabled={i === 0} onClick={() => move(i, -1)} aria-label={`Move ${place.name} up`}>↑</button>
                  <button type="button" className={iconBtn} disabled={i === stops.length - 1} onClick={() => move(i, 1)} aria-label={`Move ${place.name} down`}>↓</button>
                  <button type="button" className={iconBtn} disabled={stops.length === 1} onClick={() => { setStops((ss) => ss.filter((x) => x.key !== s.key)); setAnnounce(`${place.name} removed.`); }} aria-label={`Remove ${place.name}`}>×</button>
                </span>
              </li>
            );
          })}
        </ol>
        <div className="mt-3 flex gap-2">
          <label htmlFor={`${id}-add`} className="sr-only">Add a stop</label>
          <select id={`${id}-add`} className={`${input} min-w-0 flex-1`} value={adding} onChange={(e) => setAdding(e.target.value)}>
            {zones.map((z) => (
              <optgroup key={z.id} label={z.name}>
                {sleepable.filter((p) => p.zone === z.id).map((p) => <option key={p.slug} value={p.slug}>{p.name} (~{formatM(p.m)})</option>)}
              </optgroup>
            ))}
          </select>
          <button type="button" onClick={() => { setStops((ss) => [...ss, { key: keySeq++, slug: adding, nights: 1 }]); setAnnounce(`${sleepable.find((p) => p.slug === adding)?.name} added.`); }} className="rounded-full bg-indigo px-4 text-[0.72rem] font-semibold uppercase tracking-wider text-cream hover:bg-indigo-deep">
            Add stop
          </button>
        </div>
        <p className="sr-only" aria-live="polite">{announce}</p>
      </div>

      <div className="min-w-0">
        <AltitudeProfile points={points} title="Your route" />
        <div aria-live="polite" className="mt-4">
          {warnings.length ? (
            <ul className="space-y-2">
              {warnings.map((w) => (
                <li key={w} className="flex gap-3 rounded-sm border-l-4 border-cochineal bg-cochineal/5 px-4 py-3 text-sm text-ink">
                  <span aria-hidden className="font-bold text-cochineal">!</span>
                  {w}
                </li>
              ))}
            </ul>
          ) : (
            <p className="rounded-sm border-l-4 border-amazon bg-amazon/10 px-4 py-3 text-sm">This route climbs gradually. Nicely paced.</p>
          )}
          <p className="mt-3 text-xs text-stone-dark">
            The builder shows sleeping altitudes only, not passes or day trips. General guidance, not medical advice: talk to your doctor before travel.
          </p>
          <button type="button" onClick={() => openEnquire()} className="mt-4 min-h-11 rounded-full bg-cochineal px-6 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-cream hover:bg-cochineal-dark">
            Ask a Specialist to check my route
          </button>
        </div>
      </div>
    </div>
  );
}
