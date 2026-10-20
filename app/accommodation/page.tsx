import { PageHero } from "@/components/sections/PageHero";
import { photo } from "@/data/photos";
import { stays } from "@/data/stays";
import { zones } from "@/data/zones";
import { destinationBySlug } from "@/data/destinations";
import { StayCard } from "@/components/sections/Cards";
import { Emph } from "@/components/ui/Heading";
import { PlaceholderBadge } from "@/components/ui/Badges";
import { pageMeta } from "@/lib/seo";
import { CtaBand } from "@/components/sections/HomeSections";

export const metadata = pageMeta({
  title: "Where to stay in Peru",
  description: "Haciendas in the Sacred Valley, boutique hotels on Inca walls, lakeside lodges on Titicaca and eco-lodges in the Amazon, chosen for comfort, location and altitude.",
  path: "/accommodation",
});

export default function AccommodationPage() {
  return (
    <>
      <PageHero
        image={photo("stay-hacienda")}
        crumbs={[{ name: "Accommodation", path: "/accommodation" }]}
        eyebrow="Accommodation"
        title="Places to *rest* well"
        intro="We choose stays for character, comfort and, in the Andes, for altitude too: oxygen-enriched rooms in Cusco, heated rooms by the lake, and valley haciendas for gentle first nights."
      >
        <PlaceholderBadge className="mt-5" label="All property names are placeholders until partner hotels are confirmed" />
      </PageHero>
      {zones.map((z) => {
        const list = stays.filter((s) => destinationBySlug(s.destination)?.zone === z.id);
        if (!list.length) return null;
        return (
          <section key={z.id} aria-labelledby={`stays-${z.id}`} className="container-x border-b border-stone-light py-14 last:border-0">
            <h2 id={`stays-${z.id}`} className="text-3xl text-indigo"><Emph text={z.title} /></h2>
            <div className="mt-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((s) => <StayCard key={s.slug} s={s} />)}
            </div>
          </section>
        );
      })}
      <CtaBand />
    </>
  );
}
