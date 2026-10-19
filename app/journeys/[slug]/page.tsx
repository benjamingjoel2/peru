import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { journeys, journeyBySlug } from "@/data/journeys";
import { stayBySlug } from "@/data/stays";
import { experienceBySlug } from "@/data/experiences";
import { zoneById } from "@/data/zones";
import { mpRoutes, mpRulesNote } from "@/config/machuPicchu";
import { Emph, Heading, plain } from "@/components/ui/Heading";
import { Price } from "@/components/ui/Price";
import { Accordion } from "@/components/ui/Accordion";
import { stoneShapes } from "@/components/ui/StoneMask";
import { AltitudeProfile } from "@/components/altitude/AltitudeProfile";
import { DownloadButton, EnquireButton } from "@/components/enquire/EnquireProvider";
import { JourneyGrid, StayGrid } from "@/components/sections/Blocks";
import { CtaBand } from "@/components/sections/HomeSections";
import { journeyPoints } from "@/lib/journeyProfile";
import { bandFor, formatM, tipText } from "@/lib/altitude";
import { JsonLd, breadcrumbLd, pageMeta, tripLd } from "@/lib/seo";
import { monthNames } from "@/data/seasons";
import type { Transport } from "@/data/types";

export const dynamicParams = false;
export const generateStaticParams = () => journeys.map((j) => ({ slug: j.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const j = journeyBySlug(slug);
  if (!j) return {};
  return pageMeta({ title: `${j.days} days: ${plain(j.title)}`, description: j.summary, path: `/journeys/${j.slug}`, image: j.image.src });
}

const transportLabel: Record<Transport, string> = { flight: "Flight", train: "Train", road: "Road", boat: "Boat", trek: "On foot" };
const hikingLabel = { none: "No hiking", easy: "Easy walking", moderate: "Moderate hiking", challenging: "Challenging trekking" };

export default async function JourneyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const j = journeyBySlug(slug);
  if (!j) notFound();
  const points = journeyPoints(j);
  const highestNight = Math.max(...j.itinerary.map((d) => d.sleepAltitudeM));
  const highestPoint = Math.max(...j.itinerary.map((d) => d.maxAltitudeM ?? d.sleepAltitudeM));
  const mp = j.machuPicchu ? mpRoutes.find((r) => r.id === j.machuPicchu!.route) : null;
  const staySlugs = [...new Set(j.itinerary.map((d) => d.stay).filter(Boolean) as string[])];
  const related = journeys.filter((x) => x.slug !== j.slug && x.zones.some((z) => j.zones.includes(z))).slice(0, 3);
  const crumbs = [{ name: "Home", path: "/" }, { name: "Journeys", path: "/journeys" }, { name: plain(j.title), path: `/journeys/${j.slug}` }];

  return (
    <>
      <section className="relative overflow-hidden border-b border-stone-light">
        <div className="container-x grid items-center gap-10 py-12 lg:grid-cols-[1.1fr_1fr] lg:py-16">
          <div>
            <nav aria-label="Breadcrumb" className="mb-5 text-sm text-stone-dark">
              <ol className="flex flex-wrap gap-1.5">
                <li><Link href="/" className="hover:text-cochineal">Home</Link> /</li>
                <li><Link href="/journeys" className="hover:text-cochineal">Journeys</Link> /</li>
                <li aria-current="page" className="font-semibold text-indigo">{plain(j.title)}</li>
              </ol>
            </nav>
            <p className="inline-flex items-baseline gap-1 rounded-sm bg-cochineal px-3 py-1 font-display text-2xl font-bold text-cream">
              {j.days} <span className="font-sans text-xs uppercase tracking-wider">days</span>
            </p>
            <h1 className="mt-4 text-4xl text-indigo sm:text-5xl lg:text-6xl"><Emph text={j.title} /></h1>
            <p className="mt-5 max-w-2xl text-lg text-stone-dark">{j.summary}</p>
            <p className="mt-5 text-lg">
              From <Price usd={j.fromPriceUSD} className="font-display text-2xl font-bold text-indigo" /> <span className="text-sm text-stone-dark">per person, excluding international flights (placeholder price)</span>
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <EnquireButton journey={j.slug} className="min-h-12 rounded-[3px] bg-cochineal px-7 text-sm font-bold uppercase tracking-[0.14em] text-cream hover:bg-cochineal-dark">Enquire about this journey</EnquireButton>
              <DownloadButton journey={j.slug} className="min-h-12 rounded-[3px] border-2 border-indigo px-7 text-sm font-bold uppercase tracking-[0.14em] text-indigo hover:bg-indigo hover:text-cream">Download itinerary</DownloadButton>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden" style={{ clipPath: stoneShapes[j.days % stoneShapes.length] }}>
            <Image src={j.image.src} alt={j.image.alt} fill priority sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section className="container-x py-10">
        <dl className="grid gap-px overflow-hidden rounded-sm bg-stone-light sm:grid-cols-2 lg:grid-cols-5">
          {[
            ["Length", `${j.days} days`],
            ["Regions", j.zones.map((z) => zoneById(z).name).join(", ")],
            ["Hiking", hikingLabel[j.hikingLevel]],
            ["Highest night", `~${formatM(highestNight)} · ${bandFor(highestNight).label}`],
            ["Best months", j.bestMonths.map((m) => monthNames[m].slice(0, 3)).join(", ")],
          ].map(([k, v]) => (
            <div key={k} className="bg-cream p-5">
              <dt className="eyebrow text-stone-dark">{k}</dt>
              <dd className="mt-2 font-semibold text-indigo">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="overview-title" className="container-x grid gap-12 py-10 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <Heading id="overview-title" eyebrow="Overview" text="Why it *works*" size="md" />
          <p className="mt-4 text-lg text-stone-dark">{j.intro}</p>
        </div>
        <div className="bg-cream-deep/60 p-6">
          <h3 className="font-display text-xl text-indigo">Highlights</h3>
          <ul className="mt-3 space-y-2">
            {j.highlights.map((h) => <li key={h} className="flex gap-3"><span aria-hidden className="mt-2 h-2.5 w-2.5 shrink-0 rotate-45 bg-mustard" />{h}</li>)}
          </ul>
        </div>
      </section>

      <section id="altitude" aria-labelledby="alt-title" className="container-x scroll-mt-28 py-10">
        <Heading id="alt-title" eyebrow="Altitude profile" text="How this journey *climbs*" size="md" />
        <p className="mt-3 max-w-3xl text-stone-dark">
          Highest night about {formatM(highestNight)}; highest point about {formatM(highestPoint)} (verify). Diamonds mark days with a pacing tip. <Link href="/altitude" className="font-semibold text-cochineal underline">Altitude, explained</Link>
        </p>
        <div className="mt-6"><AltitudeProfile points={points} title={`${j.days} days: ${plain(j.title)}`} /></div>
      </section>

      <section id="itinerary" aria-labelledby="days-title" className="container-x scroll-mt-28 py-10">
        <Heading id="days-title" eyebrow="Day by day" text="Your *itinerary*" size="md" />
        <div className="mt-6">
          <Accordion
            defaultOpen="day-1"
            items={j.itinerary.map((d) => {
              const stay = d.stay ? stayBySlug(d.stay) : null;
              return {
                id: `day-${d.day}`,
                title: (
                  <span className="flex flex-wrap items-baseline gap-x-3">
                    <span className="font-sans text-sm font-bold uppercase tracking-wider text-cochineal">Day {d.day}</span>
                    {d.title}
                    <span className="font-sans text-xs font-semibold text-stone-dark">~{formatM(d.sleepAltitudeM)}</span>
                  </span>
                ),
                content: (
                  <div className="space-y-3">
                    <p>{d.summary}</p>
                    <ul className="flex flex-wrap gap-2 text-xs font-semibold">
                      <li className="rounded-full bg-cream-deep px-3 py-1">Sleep: {d.sleepLabel}, ~{formatM(d.sleepAltitudeM)} ({bandFor(d.sleepAltitudeM).label.toLowerCase()})</li>
                      {d.maxAltitudeM && d.maxAltitudeM > d.sleepAltitudeM && <li className="rounded-full bg-cream-deep px-3 py-1">High point: ~{formatM(d.maxAltitudeM)}{d.maxLabel ? ` (${d.maxLabel})` : ""}</li>}
                      {d.transport.map((t) => <li key={t} className="rounded-full bg-indigo/10 px-3 py-1 text-indigo">{transportLabel[t]}</li>)}
                    </ul>
                    {d.tip && <p className="font-semibold text-cochineal">Tip: {tipText[d.tip]}</p>}
                    {stay && <p className="text-sm">Stay: <Link href={`/accommodation/${stay.slug}`} className="font-semibold text-indigo underline">{stay.name}</Link> <span className="text-xs">(placeholder)</span></p>}
                  </div>
                ),
              };
            })}
          />
        </div>
      </section>

      <section aria-labelledby="travel-title" className="bg-cream-deep py-14">
        <div className="container-x grid gap-10 lg:grid-cols-2">
          <div>
            <Heading id="travel-title" eyebrow="Getting around" text="How you *travel*" size="md" />
            <ul className="mt-5 space-y-2">
              {j.howYouTravel.map((h) => <li key={h} className="border-l-4 border-mustard bg-cream px-4 py-2">{h}</li>)}
            </ul>
          </div>
          {mp && j.machuPicchu && (
            <div className="bg-indigo p-7 text-cream on-dark">
              <p className="eyebrow text-mustard-soft">Machu Picchu details</p>
              <h3 className="mt-2 font-display text-2xl">{mp.name}</h3>
              <p className="mt-3 text-cream/85">{j.machuPicchu.note}</p>
              <p className="mt-3 text-sm text-cream/75">Permit: {mp.permit}. Typically booked {mp.bookAheadMonths[0]}–{mp.bookAheadMonths[1]} months ahead.</p>
              <p className="mt-4 text-xs text-cream/70"><strong>Rules change, we&apos;ll confirm the latest.</strong> {mpRulesNote}</p>
              <Link href="/machu-picchu" className="mt-5 inline-block text-sm font-bold uppercase tracking-[0.12em] text-mustard underline underline-offset-4">Machu Picchu planner</Link>
            </div>
          )}
        </div>
      </section>

      <StayGrid slugs={staySlugs} title="Where you'll *stay*" />

      {j.experiences.length > 0 && (
        <section aria-labelledby="jexp-title" className="container-x py-10">
          <Heading id="jexp-title" eyebrow="Experiences" text="Along the *way*" size="md" />
          <ul className="mt-5 flex flex-wrap gap-2">
            {j.experiences.map((s) => {
              const e = experienceBySlug(s);
              return e ? <li key={s}><Link href={`/experiences/${s}`} className="inline-block rounded-full border-2 border-stone-light px-4 py-1.5 font-semibold text-indigo hover:border-cochineal hover:text-cochineal">{e.name}</Link></li> : null;
            })}
          </ul>
        </section>
      )}

      <section aria-labelledby="dl-title" className="container-x py-14">
        <div className="grid items-center gap-8 bg-cream-deep p-8 sm:p-10 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <h2 id="dl-title" className="font-display text-3xl text-indigo">Take it <em className="text-cochineal">with you</em></h2>
            <p className="mt-2 text-stone-dark">Download the full itinerary as a PDF, with the day-by-day plan and the altitude profile for every night.</p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <DownloadButton journey={j.slug} className="min-h-12 rounded-[3px] bg-indigo px-7 text-sm font-bold uppercase tracking-[0.14em] text-cream hover:bg-indigo-deep">Download PDF</DownloadButton>
            <EnquireButton journey={j.slug} className="min-h-12 rounded-[3px] bg-cochineal px-7 text-sm font-bold uppercase tracking-[0.14em] text-cream hover:bg-cochineal-dark">Enquire</EnquireButton>
          </div>
        </div>
      </section>

      <JourneyGrid list={related} title="You might also *like*" eyebrow="Related journeys" />
      <CtaBand journey={j.slug} title="Make it *yours*" text="Change the pace, the hotels or the order. Your Peru Specialist will shape this journey around you." />
      <JsonLd data={tripLd(j)} />
      <JsonLd data={breadcrumbLd(crumbs)} />
    </>
  );
}
