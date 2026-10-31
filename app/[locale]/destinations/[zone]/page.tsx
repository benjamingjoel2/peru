import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/PageHero";
import { zones, zoneById } from "@/data/zones";
import { destinationsByZone } from "@/data/destinations";
import { journeys } from "@/data/journeys";
import { DestinationCard } from "@/components/sections/Cards";
import { FactBar, FoodStrip, JourneyGrid, StayGrid } from "@/components/sections/Blocks";
import { Heading, plain } from "@/components/ui/Heading";
import { pageMeta } from "@/lib/seo";
import { monthNames, monthShort } from "@/data/seasons";
import { CtaBand } from "@/components/sections/HomeSections";
import { stays } from "@/data/stays";
import type { ZoneId } from "@/data/types";
import { t } from "@/lib/i18n";
import { initLocale } from "@/lib/i18n/server";

export const dynamicParams = false;
export const generateStaticParams = () => zones.map((z) => ({ zone: z.id }));

export async function generateMetadata({ params }: { params: Promise<{ zone: string }> }) {
  await initLocale();
  const { zone } = await params;
  const z = zones.find((x) => x.id === zone);
  if (!z) return {};
  return pageMeta({ title: t("{name}, Peru", { name: z.name }), description: z.intro, path: `/destinations/${z.id}`, image: z.image.src });
}

export default async function ZonePage({ params }: { params: Promise<{ zone: string }> }) {
  await initLocale();
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
        crumbs={[{ name: t("Destinations"), path: "/destinations" }, { name: z.name, path: `/destinations/${z.id}` }]}
        eyebrow={t("Destination")}
        title={z.title}
        intro={z.intro}
        image={z.image}
      />
      <section className="container-x py-10">
        <FactBar
          facts={[
            { label: t("Altitude"), value: <>~{z.altitudeRange[0].toLocaleString("en-GB")}–{z.altitudeRange[1].toLocaleString("en-GB")} m <span className="text-xs font-normal">{t("(verify)")}</span></> },
            { label: t("Best months"), value: <>{z.bestMonths.map((m) => monthShort[m]).join(", ")} <span className="text-xs font-normal">{t("(verify)")}</span></> },
            { label: t("Regions"), value: regions.length },
            { label: t("Journeys"), value: zoneJourneys.length },
          ]}
        />
      </section>
      <section aria-labelledby="regions-title" className="container-x py-10">
        <Heading id="regions-title" eyebrow={t("Regions in {name}", { name: z.name })} text={t("Where to *go*")} size="md" />
        <div className="mt-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {regions.map((d, i) => <DestinationCard key={d.slug} d={d} shape={i} />)}
        </div>
      </section>
      <FoodStrip ids={eat} title={t("What to *eat* in {name}", { name: plain(z.name) })} />
      <JourneyGrid list={zoneJourneys} />
      <StayGrid slugs={zoneStays} />
      <CtaBand />
    </>
  );
}
