import Image from "next/image";
import Link from "next/link";
import type { Destination, Journey, Stay } from "@/data/types";
import { Emph, plain } from "@/components/ui/Heading";
import { Price } from "@/components/ui/Price";
import { AltitudeSparkline } from "@/components/altitude/Sparkline";
import { stoneShapes } from "@/components/ui/StoneMask";
import { destinationBySlug } from "@/data/destinations";
import type { StoryMeta } from "@/lib/stories";
import { PlaceholderBadge } from "@/components/ui/Badges";

export function JourneyCard({ j, dark = false, priority }: { j: Journey; dark?: boolean; priority?: boolean }) {
  return (
    <article className={`group relative flex h-full flex-col ${dark ? "text-cream" : "text-ink"}`}>
      <div className="relative aspect-[4/5] overflow-hidden" style={{ clipPath: stoneShapes[j.days % stoneShapes.length] }}>
        <Image src={j.image.src} alt={j.image.alt} fill sizes="(min-width:1024px) 30vw, 80vw" priority={priority} className="object-cover transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105" />
        <span className="absolute left-4 top-4 rounded-sm bg-cochineal px-2.5 py-1 font-display text-lg font-bold text-cream">
          {j.days} <span className="text-xs font-sans uppercase tracking-wider">days</span>
        </span>
      </div>
      <div className="mt-4 flex flex-1 flex-col">
        <h3 className={`font-display text-2xl leading-tight ${dark ? "text-cream" : "text-indigo"}`}>
          <Link href={`/journeys/${j.slug}`} className="after:absolute after:inset-0">
            <Emph text={j.title} />
          </Link>
        </h3>
        <p className={`mt-2 text-[0.95rem] ${dark ? "text-cream/80" : "text-stone-dark"}`}>{j.summary}</p>
        <div className="mt-auto flex items-end justify-between gap-4 pt-4">
          <p className="text-sm">
            <span className={dark ? "text-cream/70" : "text-stone-dark"}>From </span>
            <Price usd={j.fromPriceUSD} className="font-bold" /> <span className={`text-xs ${dark ? "text-cream/70" : "text-stone-dark"}`}>pp</span>
          </p>
          <AltitudeSparkline days={j.itinerary} className={`h-9 w-28 ${dark ? "text-mustard-soft" : "text-indigo"}`} />
        </div>
      </div>
    </article>
  );
}

/** Full-bleed image card with the text laid over it, used in the dark journey carousel. */
export function JourneyOverlayCard({ j, priority }: { j: Journey; priority?: boolean }) {
  return (
    <article className="group relative aspect-[3/4] overflow-hidden bg-indigo-deep" style={{ clipPath: stoneShapes[j.days % stoneShapes.length] }}>
      <Image src={j.image.src} alt={j.image.alt} fill sizes="(min-width:1024px) 30vw, 80vw" priority={priority} className="object-cover transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-indigo-deep via-indigo-deep/40 to-transparent" />
      <div className="on-dark absolute inset-x-0 bottom-0 p-6">
        <p className="eyebrow text-mustard-soft">{j.days} days</p>
        <h3 className="mt-2 font-display text-2xl leading-tight text-cream sm:text-3xl">
          <Link href={`/journeys/${j.slug}`} className="after:absolute after:inset-0">
            <Emph text={j.title} />
          </Link>
        </h3>
        <div className="mt-4 flex items-end justify-between gap-4 text-cream">
          <p className="text-sm">
            <span className="text-cream/75">From </span>
            <Price usd={j.fromPriceUSD} className="font-bold" />
          </p>
          <AltitudeSparkline days={j.itinerary} className="h-8 w-24 text-mustard-soft" />
        </div>
        <p className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-mustard">
          Explore more <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
        </p>
      </div>
    </article>
  );
}

export function DestinationCard({ d, shape = 0 }: { d: Destination; shape?: number }) {
  return (
    <article className="group relative">
      <div className="relative aspect-[4/3] overflow-hidden" style={{ clipPath: stoneShapes[shape % stoneShapes.length] }}>
        <Image src={d.image.src} alt={d.image.alt} fill sizes="(min-width:1024px) 30vw, 80vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
      </div>
      <div className="mt-3 flex items-start justify-between gap-3">
        <h3 className="font-display text-xl text-indigo">
          <Link href={`/destinations/${d.zone}/${d.slug}`} className="after:absolute after:inset-0">{d.name}</Link>
        </h3>
        <span className="shrink-0 rounded-sm bg-cream-deep px-2 py-0.5 text-xs font-bold text-stone-dark" title="Approximate elevation (verify)">
          ~{d.elevationM.toLocaleString("en-GB")} m
        </span>
      </div>
      <p className="mt-1 text-sm text-stone-dark">{d.tagline}</p>
    </article>
  );
}

export function StayCard({ s }: { s: Stay }) {
  const d = destinationBySlug(s.destination);
  return (
    <article className="group relative">
      <div className="relative aspect-[4/3] overflow-hidden" style={{ clipPath: stoneShapes[s.name.length % stoneShapes.length] }}>
        <Image src={s.image.src} alt={s.image.alt} fill sizes="(min-width:1024px) 30vw, 80vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
      </div>
      <div className="mt-3">
        <p className="eyebrow text-stone-dark">{d?.name} · {s.style}</p>
        <h3 className="mt-1 font-display text-xl text-indigo">
          <Link href={`/accommodation/${s.slug}`} className="after:absolute after:inset-0">{s.name}</Link>
        </h3>
        <p className="mt-1 text-sm text-stone-dark">{s.summary}</p>
        <PlaceholderBadge label="Placeholder stay" className="mt-2" />
      </div>
    </article>
  );
}

export function StoryCard({ s }: { s: StoryMeta }) {
  return (
    <article className="group relative flex h-full flex-col">
      <div className="relative aspect-[3/2] overflow-hidden" style={{ clipPath: stoneShapes[s.title.length % stoneShapes.length] }}>
        <Image src={s.image} alt={s.imageAlt} fill sizes="(min-width:1024px) 25vw, 80vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
      </div>
      <p className="eyebrow mt-4 text-stone-dark">
        {s.category} · <time dateTime={s.date}>{new Date(s.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</time>
      </p>
      <h3 className="mt-2 font-display text-xl leading-snug text-indigo">
        <Link href={`/stories/${s.slug}`} className="after:absolute after:inset-0">{s.title}</Link>
      </h3>
      <p className="mt-2 text-sm text-stone-dark">{s.excerpt}</p>
    </article>
  );
}

export const journeyLabel = (j: Journey) => `${j.days} days: ${plain(j.title)}`;
