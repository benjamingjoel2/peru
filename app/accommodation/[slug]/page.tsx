import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/PageHero";
import { stays, stayBySlug } from "@/data/stays";
import { destinationBySlug } from "@/data/destinations";
import { journeys } from "@/data/journeys";
import { FactBar, JourneyGrid, StayGrid } from "@/components/sections/Blocks";
import { PlaceholderBadge, Verify } from "@/components/ui/Badges";
import { bandFor, formatM } from "@/lib/altitude";
import { pageMeta } from "@/lib/seo";
import { CtaBand } from "@/components/sections/HomeSections";

export const dynamicParams = false;
export const generateStaticParams = () => stays.map((s) => ({ slug: s.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = stayBySlug(slug);
  if (!s) return {};
  return pageMeta({ title: `${s.name} | Where to stay in Peru`, description: s.summary, path: `/accommodation/${s.slug}`, image: s.image.src });
}

export default async function StayPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = stayBySlug(slug);
  if (!s) notFound();
  const d = destinationBySlug(s.destination)!;
  const withStay = journeys.filter((j) => j.itinerary.some((day) => day.stay === s.slug));
  const others = stays.filter((x) => x.destination === s.destination && x.slug !== s.slug).map((x) => x.slug);

  return (
    <>
      <PageHero
        crumbs={[{ name: "Accommodation", path: "/accommodation" }, { name: s.name, path: `/accommodation/${s.slug}` }]}
        eyebrow={`${d.name} · ${s.style}`}
        title={s.name}
        intro={s.summary}
        image={s.image}
      >
        <PlaceholderBadge className="mt-5" label="Placeholder property" />
      </PageHero>
      <section className="container-x py-10">
        <FactBar
          facts={[
            { label: "Where", value: <Link href={`/destinations/${d.zone}/${d.slug}`} className="underline hover:text-cochineal">{d.name}</Link> },
            { label: "Altitude", value: <>~{formatM(s.elevationM)} · {bandFor(s.elevationM).label}<Verify /></> },
            { label: "Style", value: s.style[0].toUpperCase() + s.style.slice(1) },
            { label: "Size", value: s.rooms },
          ]}
        />
      </section>
      <section className="container-x py-8">
        <h2 className="font-display text-2xl text-indigo">Why we like it</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {s.features.map((f) => <li key={f} className="flex gap-3 bg-cream-deep/60 p-4"><span aria-hidden className="mt-2 h-2.5 w-2.5 shrink-0 rotate-45 bg-mustard" />{f}</li>)}
        </ul>
      </section>
      <JourneyGrid list={withStay} title="Journeys that stay *here*" />
      <StayGrid slugs={others} title={`Other stays in ${d.name.split(" (")[0]}`} />
      <CtaBand />
    </>
  );
}
