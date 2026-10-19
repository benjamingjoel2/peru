import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { zones } from "@/data/zones";
import { destinations, destinationsByZone } from "@/data/destinations";
import { Emph, Heading } from "@/components/ui/Heading";
import { StoneMask } from "@/components/ui/StoneMask";
import { ArrowLink } from "@/components/ui/Button";
import { pageMeta } from "@/lib/seo";
import { bandFor, formatM } from "@/lib/altitude";
import { CtaBand, JourneyCarouselSection } from "@/components/sections/HomeSections";

export const metadata = pageMeta({
  title: "Destinations in Peru",
  description: "The Coast, Cusco & the Sacred Valley, the Southern Andes, the Amazon and the North: where to go in Peru, how high each place is and when to visit.",
  path: "/destinations",
});

export default function DestinationsPage() {
  const sorted = [...destinations].sort((a, b) => a.elevationM - b.elevationM);
  return (
    <>
      <PageHero
        crumbs={[{ name: "Destinations", path: "/destinations" }]}
        eyebrow="Where we go"
        title="Peru is three countries *in one*"
        intro="A desert coast, the high Andes and the Amazon, plus a wild north most visitors never see. Here's where everything is, and how high."
      />
      <section aria-labelledby="zones-title" className="container-x space-y-20 py-16">
        <h2 id="zones-title" className="sr-only">Regions</h2>
        {zones.map((z, i) => (
          <article key={z.id} className="grid items-center gap-10 lg:grid-cols-2">
            <StoneMask src={z.image.src} alt={z.image.alt} shape={i} className={`aspect-[4/3] ${i % 2 ? "lg:order-2" : ""}`} />
            <div>
              <p className="eyebrow text-stone-dark">~{z.altitudeRange[0].toLocaleString("en-GB")}–{z.altitudeRange[1].toLocaleString("en-GB")} m (verify)</p>
              <h3 className="mt-2 text-3xl text-indigo sm:text-4xl"><Emph text={z.title} /></h3>
              <p className="mt-4 text-stone-dark">{z.intro}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {destinationsByZone(z.id).map((d) => (
                  <li key={d.slug}>
                    <Link href={`/destinations/${z.id}/${d.slug}`} className="inline-block rounded-full border-2 border-stone-light px-3 py-1 text-sm font-semibold text-indigo hover:border-cochineal hover:text-cochineal">
                      {d.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <ArrowLink href={`/destinations/${z.id}`} className="mt-6">Explore {z.name}</ArrowLink>
            </div>
          </article>
        ))}
      </section>

      <section aria-labelledby="section-title" className="bg-cream-deep py-16">
        <div className="container-x">
          <Heading id="section-title" eyebrow="Coast to jungle" text="Every destination, by *altitude*" size="md" />
          <p className="mt-3 max-w-2xl text-stone-dark">Each bar is one destination, from sea level to the highest viewpoint. Approximate, verify before travel.</p>
          <ul className="mt-8 space-y-2" aria-label="Destinations sorted by altitude">
            {sorted.map((d) => (
              <li key={d.slug} className="grid grid-cols-[minmax(0,10rem)_1fr] items-center gap-3 text-sm sm:grid-cols-[16rem_1fr]">
                <Link href={`/destinations/${d.zone}/${d.slug}`} className="truncate font-semibold text-indigo hover:text-cochineal">{d.name}</Link>
                <span className="flex items-center gap-2">
                  <span aria-hidden className="h-3 rounded-r-full" style={{ width: `${Math.max(1, (d.elevationM / 5200) * 85)}%`, background: bandFor(d.elevationM).color }} />
                  <span className="shrink-0 text-stone-dark">~{formatM(d.elevationM)} · {bandFor(d.elevationM).label}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <JourneyCarouselSection />
      <CtaBand />
    </>
  );
}
