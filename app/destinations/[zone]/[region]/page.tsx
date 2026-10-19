import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/PageHero";
import { destinations, destinationBySlug } from "@/data/destinations";
import { zoneById } from "@/data/zones";
import { journeys } from "@/data/journeys";
import { experiences } from "@/data/experiences";
import { FactBar, FoodStrip, JourneyGrid, StayGrid } from "@/components/sections/Blocks";
import { DestinationCard } from "@/components/sections/Cards";
import { Heading } from "@/components/ui/Heading";
import { Verify } from "@/components/ui/Badges";
import { bandFor, formatFt, formatM } from "@/lib/altitude";
import { pageMeta } from "@/lib/seo";
import { MONTHS } from "@/data/types";
import { CtaBand } from "@/components/sections/HomeSections";

export const dynamicParams = false;
export const generateStaticParams = () => destinations.map((d) => ({ zone: d.zone, region: d.slug }));

export async function generateMetadata({ params }: { params: Promise<{ zone: string; region: string }> }) {
  const { region } = await params;
  const d = destinationBySlug(region);
  if (!d) return {};
  return pageMeta({ title: `${d.name}: altitude, best time & how to get there`, description: `${d.tagline}. About ${formatM(d.elevationM)} (verify). ${d.opening.slice(0, 110)}…`, path: `/destinations/${d.zone}/${d.slug}`, image: d.image.src });
}

export default async function RegionPage({ params }: { params: Promise<{ zone: string; region: string }> }) {
  const { zone, region } = await params;
  const d = destinationBySlug(region);
  if (!d || d.zone !== zone) notFound();
  const z = zoneById(d.zone);
  const band = bandFor(d.elevationM);
  const regionJourneys = journeys.filter(
    (j) => j.itinerary.some((day) => day.sleepAt === d.slug) || (d.slug === "machu-picchu" && Boolean(j.machuPicchu)),
  );
  const regionExperiences = experiences.filter((e) => e.destinations.includes(d.slug));
  const nearby = destinations.filter((x) => x.zone === d.zone && x.slug !== d.slug);

  return (
    <>
      <PageHero
        crumbs={[{ name: "Destinations", path: "/destinations" }, { name: z.name, path: `/destinations/${z.id}` }, { name: d.name, path: `/destinations/${z.id}/${d.slug}` }]}
        eyebrow={z.name}
        title={d.name}
        intro={d.tagline}
        image={d.image}
      />
      <section className="container-x py-10">
        <FactBar
          facts={[
            { label: "Altitude", value: <>~{formatM(d.elevationM)} <span className="text-xs font-normal text-stone-dark">({formatFt(d.elevationM)})</span><Verify note={d.elevationNote} /></> },
            { label: "Altitude band", value: <span className="flex items-center gap-2"><span aria-hidden className="h-3 w-3 rounded-full" style={{ background: band.color }} />{band.label}</span> },
            { label: "Time needed", value: d.timeNeeded },
            { label: "Zone", value: <Link href={`/destinations/${z.id}`} className="underline hover:text-cochineal">{z.name}</Link> },
          ]}
        />
      </section>

      <section className="container-x grid gap-12 py-10 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="font-display text-2xl leading-snug text-indigo first-letter:float-left first-letter:mr-2 first-letter:text-6xl first-letter:leading-none first-letter:text-cochineal">{d.opening}</p>
          {d.elevationNote && <p className="mt-4 text-sm text-stone-dark">Altitude note: {d.elevationNote} (verify).</p>}
          <p className="mt-4 text-sm text-stone-dark">{band.advice} <Link href="/altitude" className="font-semibold text-cochineal underline">Altitude, explained</Link></p>
          <h2 className="mt-10 font-display text-2xl text-indigo">Highlights</h2>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {d.highlights.map((h) => (
              <li key={h} className="flex gap-3"><span aria-hidden className="mt-2 h-2.5 w-2.5 shrink-0 rotate-45 bg-mustard" />{h}</li>
            ))}
          </ul>
        </div>
        <aside className="space-y-8">
          <div>
            <h2 className="font-display text-xl text-indigo">Best months <Verify /></h2>
            <ul className="mt-3 grid grid-cols-6 gap-1 text-center text-xs font-bold" aria-label="Best months to visit">
              {MONTHS.map((m) => {
                const good = d.bestMonths.includes(m);
                return (
                  <li key={m} className={`rounded-sm py-1.5 ${good ? "bg-amazon text-cream" : "bg-cream-deep text-stone-dark"}`}>
                    {m}<span className="sr-only">{good ? ": recommended" : ""}</span>
                  </li>
                );
              })}
            </ul>
            <p className="mt-2 text-sm text-stone-dark">{d.bestMonthsNote}</p>
          </div>
          <div>
            <h2 className="font-display text-xl text-indigo">How to get there</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {d.gettingThere.map((g) => <li key={g} className="border-l-4 border-mustard pl-3">{g}</li>)}
            </ul>
          </div>
          {regionExperiences.length > 0 && (
            <div>
              <h2 className="font-display text-xl text-indigo">Experiences here</h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {regionExperiences.map((e) => (
                  <li key={e.slug}><Link href={`/experiences/${e.slug}`} className="inline-block rounded-full border-2 border-stone-light px-3 py-1 text-sm font-semibold text-indigo hover:border-cochineal hover:text-cochineal">{e.name}</Link></li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </section>

      <FoodStrip ids={d.eat} />
      <StayGrid destination={d.slug} title={`Where to *stay* in ${d.name.split(" (")[0]}`} />
      <JourneyGrid list={regionJourneys} />
      {nearby.length > 0 && (
        <section aria-labelledby="nearby-title" className="border-t border-stone-light py-16">
          <div className="container-x">
            <Heading id="nearby-title" eyebrow={z.name} text="Nearby *too*" size="md" />
            <div className="mt-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {nearby.slice(0, 4).map((n, i) => <DestinationCard key={n.slug} d={n} shape={i + 2} />)}
            </div>
          </div>
        </section>
      )}
      <CtaBand title={`Add ${d.name.split(" (")[0]} to *your* trip`} />
    </>
  );
}
