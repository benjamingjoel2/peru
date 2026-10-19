"use client";

import { useRef, useState } from "react";
import { zones } from "@/data/zones";
import { destinations } from "@/data/destinations";
import { Emph, Heading } from "@/components/ui/Heading";
import { Carousel } from "@/components/ui/Carousel";
import { ArrowLink } from "@/components/ui/Button";
import { DestinationCard } from "./Cards";
import { monthNames } from "@/data/seasons";

/** ARIA tabs (arrow keys, Home/End) with a carousel of regions per zone. */
export function DestinationTabs() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const z = zones[active];
  const regions = destinations.filter((d) => d.zone === z.id);

  const onKey = (e: React.KeyboardEvent) => {
    let n = active;
    if (e.key === "ArrowRight") n = (active + 1) % zones.length;
    else if (e.key === "ArrowLeft") n = (active - 1 + zones.length) % zones.length;
    else if (e.key === "Home") n = 0;
    else if (e.key === "End") n = zones.length - 1;
    else return;
    e.preventDefault();
    setActive(n);
    tabs.current[n]?.focus();
  };

  return (
    <section aria-labelledby="dest-title" className="py-20 lg:py-28">
      <div className="container-x">
        <Heading id="dest-title" eyebrow="Destinations" text="Five Perus, *one* trip" />
        <p className="mt-4 max-w-2xl text-stone-dark">
          From sea level to above 4,000 metres and down into the rainforest. Choose a region to see where it sits, and how high.
        </p>
        <div role="tablist" aria-label="Regions of Peru" onKeyDown={onKey} className="mt-10 flex gap-1 overflow-x-auto border-b-2 border-stone-light [scrollbar-width:none]">
          {zones.map((zone, i) => (
            <button
              key={zone.id}
              ref={(el) => { tabs.current[i] = el; }}
              role="tab"
              id={`tab-${zone.id}`}
              aria-selected={active === i}
              aria-controls={`panel-${zone.id}`}
              tabIndex={active === i ? 0 : -1}
              onClick={() => setActive(i)}
              className={`relative shrink-0 px-4 py-3 font-display text-lg transition-colors ${active === i ? "text-cochineal" : "text-indigo hover:text-cochineal"}`}
            >
              {zone.name}
              {active === i && <span aria-hidden className="woven-stripe-thin absolute inset-x-0 -bottom-[2px] h-1" />}
            </button>
          ))}
        </div>
        <div role="tabpanel" id={`panel-${z.id}`} aria-labelledby={`tab-${z.id}`} tabIndex={0} className="pt-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <h3 className="text-3xl text-indigo"><Emph text={z.title} /></h3>
              <p className="mt-3 max-w-3xl text-stone-dark">{z.intro}</p>
            </div>
            <dl className="flex gap-6 text-sm">
              <div>
                <dt className="eyebrow text-stone-dark">Altitude</dt>
                <dd className="mt-1 font-bold text-indigo">
                  ~{z.altitudeRange[0].toLocaleString("en-GB")}–{z.altitudeRange[1].toLocaleString("en-GB")} m <span className="text-xs font-normal">(verify)</span>
                </dd>
              </div>
              <div>
                <dt className="eyebrow text-stone-dark">Best months</dt>
                <dd className="mt-1 font-bold text-indigo">
                  {monthNames[z.bestMonths[0]].slice(0, 3)}–{monthNames[z.bestMonths[z.bestMonths.length - 1]].slice(0, 3)}
                </dd>
              </div>
            </dl>
          </div>
          <Carousel key={z.id} label={`Regions in ${z.name}`} className="mt-4">
            {regions.map((d, i) => <DestinationCard key={d.slug} d={d} shape={i} />)}
          </Carousel>
          <ArrowLink href={`/destinations/${z.id}`} className="mt-4">Explore {z.name}</ArrowLink>
        </div>
      </div>
    </section>
  );
}
