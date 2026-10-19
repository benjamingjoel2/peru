import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/PageHero";
import { zones, zoneById } from "@/data/zones";
import { destinationsByZone } from "@/data/destinations";
import { journeys } from "@/data/journeys";
import { DestinationCard } from "@/components/sections/Cards";
import { FactBar, FoodStrip, JourneyGrid, StayGrid } from "@/components/sections/Blocks";
import { Heading, plain } from "@/components/ui/Heading";
import { pageMeta } from "@/lib/seo";
import { monthNames } from "@/data/seasons";
import { CtaBand } from "@/components/sections/HomeSections";
import { stays } from "@/data/stays";
import type { ZoneId } from "@/data/types";

export const dynamicParams = false;
export const generateStaticParams = () => zones.map((z) => ({ zone: z.id }));

export async function generateMetadata({ params }: { params: Promise<{ zone: string }> }) {
  const { zone } = await params;
  const z = zones.find((x) => x.id === zone);
  if (!z) return {};
  return pageMeta({ title: `${z.name}, Peru`, description: z.intro, path: `/destinations/${z.id}`, image: z.image.src });
}

export default async function ZonePage({ params }: { params: Promise<{ zone: string }> }) {
  const { zone } = await params;
  if (!zones.some((z) => z.id === zone)) notFound();
  const z = zoneById(zone as ZoneId);
  const regions = destinationsByZone(z.id);
  const regionSlugs = regions.map((r) => r.slug);
  const eat = [...new Set(regions.flatMap((r) => r.eat))].slice(0, 9);
  const zoneJourneys = journeys.filter((j) => j.zones.includes(z.id));
  const zoneStays = stays.filter((s) => regionSlugs.includes(s.destination)).map((s) => s.slug);

  return (
    <>
      <PageHero
        crumbs={[{ name: "Destinations", path: "/destinations" }, { name: z.name, path: `/destinations/${z.id}` }]}
        eyebrow="Destination"
        title={z.title}
        intro={z.intro}
        image={z.image}
      />
      <section className="container-x py-10">
        <FactBar
          facts={[
            { label: "Altitude", value: <>~{z.altitudeRange[0].toLocaleString("en-GB")}–{z.altitudeRange[1].toLocaleString("en-GB")} m <span className="text-xs font-normal">(verify)</span></> },
            { label: "Best months", value: <>{z.bestMonths.map((m) => monthNames[m].slice(0, 3)).join(", ")} <span className="text-xs font-normal">(verify)</span></> },
            { label: "Regions", value: regions.length },
            { label: "Journeys", value: zoneJourneys.length },
          ]}
        />
      </section>
      <section aria-labelledby="regions-title" className="container-x py-10">
        <Heading id="regions-title" eyebrow={`Regions in ${z.name}`} text="Where to *go*" size="md" />
        <div className="mt-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {regions.map((d, i) => <DestinationCard key={d.slug} d={d} shape={i} />)}
        </div>
      </section>
      <FoodStrip ids={eat} title={`What to *eat* in ${plain(z.name).replace("The ", "the ")}`} />
      <JourneyGrid list={zoneJourneys} />
      <StayGrid slugs={zoneStays} />
      <CtaBand />
    </>
  );
}
