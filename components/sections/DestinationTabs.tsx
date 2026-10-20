"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { zones } from "@/data/zones";
import { destinations } from "@/data/destinations";
import { Emph, Heading } from "@/components/ui/Heading";
import { Carousel } from "@/components/ui/Carousel";
import { ArrowLink } from "@/components/ui/Button";
import { StoneMask } from "@/components/ui/StoneMask";
import { DestinationCard } from "./Cards";
import { monthNames } from "@/data/seasons";

/** Vertical ARIA tabs (arrow keys, Home/End): areas on the left, two images, intro and a region carousel on the right. */
export function DestinationTabs() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const z = zones[active];
  const regions = destinations.filter((d) => d.zone === z.id);

  const onKey = (e: React.KeyboardEvent) => {
    let n = active;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") n = (active + 1) % zones.length;
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") n = (active - 1 + zones.length) % zones.length;
    else if (e.key === "Home") n = 0;
    else if (e.key === "End") n = zones.length - 1;
    else return;
    e.preventDefault();
    setActive(n);
    tabs.current[n]?.focus();
  };

  return (
    <section aria-labelledby="dest-title" className="bg-cream-deep py-20 lg:py-28">
      <div className="container-x">
        <div className="text-center">
          <Heading id="dest-title" eyebrow="Destinations" text="Five Perus, *one* trip" align="center" />
          <p className="mx-auto mt-4 max-w-2xl text-stone-dark">From sea level to above 4,000 metres and down into the rainforest. Choose an area to see where it sits, and how high.</p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[260px_minmax(0,1fr)]">
          <div role="tablist" aria-label="Areas of Peru" aria-orientation="vertical" onKeyDown={onKey} className="flex gap-1 overflow-x-auto border-b-2 border-stone-light [scrollbar-width:none] lg:flex-col lg:overflow-visible lg:border-b-0 lg:border-l-2">
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
                className={`relative shrink-0 px-4 py-3 text-left font-display text-lg transition-colors lg:py-4 lg:pl-6 lg:text-2xl ${active === i ? "text-cochineal" : "text-indigo hover:text-cochineal"}`}
              >
                {active === i && <span aria-hidden className="absolute inset-x-0 -bottom-[2px] h-1 bg-cochineal lg:inset-x-auto lg:-left-[2px] lg:bottom-0 lg:top-0 lg:h-auto lg:w-1" />}
                {zone.name}
              </button>
            ))}
          </div>

          <div role="tabpanel" id={`panel-${z.id}`} aria-labelledby={`tab-${z.id}`} tabIndex={0} className="min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={z.id}
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="grid grid-cols-[1.4fr_1fr] gap-4">
                  <StoneMask src={z.image.src} alt={z.image.alt} shape={active} className="aspect-[4/3]" settle={false} sizes="(min-width:1024px) 40vw, 60vw" />
                  {regions[1] && <StoneMask src={regions[1].image.src} alt={regions[1].image.alt} shape={active + 2} className="mt-10 aspect-[3/4]" settle={false} sizes="(min-width:1024px) 25vw, 40vw" />}
                </div>
                <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
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
                <Carousel label={`Regions in ${z.name}`} className="mt-6" itemClassName="w-[78%] sm:w-[46%] xl:w-[31%]">
                  {regions.map((d, i) => <DestinationCard key={d.slug} d={d} shape={i} />)}
                </Carousel>
                <ArrowLink href={`/destinations/${z.id}`} className="mt-4">Explore {z.name}</ArrowLink>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
