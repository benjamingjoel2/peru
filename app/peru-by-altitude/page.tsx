import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { FoodMap } from "@/components/food/FoodMap";
import { Heading, plain } from "@/components/ui/Heading";
import { foodBands, foods } from "@/data/foods";
import { journeyBySlug } from "@/data/journeys";
import { pageMeta } from "@/lib/seo";
import { CtaBand } from "@/components/sections/HomeSections";
import { JourneyCard } from "@/components/sections/Cards";

export const metadata = pageMeta({
  title: "Peru by altitude: a food map",
  description: "What Peru eats from the Pacific to the peaks to the jungle: ceviche on the coast, thousands of potatoes in the Andes, river fish and fruit in the Amazon, and the journeys that take you there.",
  path: "/peru-by-altitude",
});

export default function FoodMapPage() {
  const foodJourney = journeyBySlug("peru-for-food-lovers")!;
  return (
    <>
      <PageHero
        crumbs={[{ name: "Peru by altitude", path: "/peru-by-altitude" }]}
        eyebrow="A food map"
        title="Peru by *altitude*"
        intro="In Peru, the menu changes with the altitude. So does the view. Move from the Pacific up through Andean valleys to the high plains, then down the cloud forest into the Amazon, and see what's eaten at each level."
      />
      <section aria-labelledby="map-title" className="container-x py-12">
        <h2 id="map-title" className="sr-only">Interactive food map</h2>
        <p className="mb-4 text-sm text-stone-dark">Use the markers (or the arrow keys once one is focused) to move between altitude zones. A full list follows the map.</p>
        <FoodMap />
      </section>

      <section aria-labelledby="list-title" className="bg-cream-deep py-16">
        <div className="container-x">
          <Heading id="list-title" eyebrow="Everything on the map" text="From coast to *jungle*, as a list" size="md" />
          <div className="mt-8 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {foodBands.map((b) => (
              <section key={b.id} aria-labelledby={`band-${b.id}`}>
                <h3 id={`band-${b.id}`} className="font-display text-xl text-indigo">{b.name} <span className="text-sm font-normal text-stone-dark">({b.range}, verify)</span></h3>
                <ul className="mt-3 space-y-2 text-sm">
                  {foods.filter((f) => f.band === b.id).map((f) => (
                    <li key={f.id}>
                      <strong>{f.name}</strong> <span className="text-stone-dark">({f.kind})</span>: {f.description}
                      {f.journeys[0] && journeyBySlug(f.journeys[0]) && (
                        <> <Link href={`/journeys/${f.journeys[0]}`} className="text-cochineal underline">{plain(journeyBySlug(f.journeys[0])!.title)}</Link></>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="food-exp-title" className="container-x grid items-center gap-10 py-16 lg:grid-cols-2">
        <div>
          <Heading id="food-exp-title" eyebrow="Taste it" text="Food experiences on our *journeys*" size="md" />
          <ul className="mt-6 space-y-3 text-stone-dark">
            <li><strong className="text-indigo">Lima&apos;s restaurant scene:</strong> the tables that need booking months ahead, and the cevicherías that close at 5pm.</li>
            <li><strong className="text-indigo">Cooking classes:</strong> in a Sacred Valley farm kitchen or a Cusco home.</li>
            <li><strong className="text-indigo">Market tours:</strong> Surquillo in Lima, San Pedro in Cusco, Belén in Iquitos.</li>
            <li><strong className="text-indigo">Chocolate workshop:</strong> bean to bar on a rainy Cusco afternoon.</li>
            <li><strong className="text-indigo">Pisco tasting:</strong> in a bodega near Ica or a Lima bar.</li>
          </ul>
        </div>
        <div className="mx-auto w-full max-w-sm"><JourneyCard j={foodJourney} /></div>
      </section>
      <CtaBand title="Plan a trip around *lunch*" journey="peru-for-food-lovers" />
    </>
  );
}
