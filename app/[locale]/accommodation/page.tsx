import { PageHero } from "@/components/sections/PageHero";
import { photo } from "@/data/photos";
import { stays } from "@/data/stays";
import { zones } from "@/data/zones";
import { destinationBySlug } from "@/data/destinations";
import { StayCard } from "@/components/sections/Cards";
import { Emph } from "@/components/ui/Heading";
import { pageMeta } from "@/lib/seo";
import { CtaBand } from "@/components/sections/HomeSections";
import { t } from "@/lib/i18n";
import { initLocale } from "@/lib/i18n/server";

export async function generateMetadata() {
  await initLocale();
  return pageMeta({
    title: t("Where to stay in Peru"),
    description: t("Haciendas in the Sacred Valley, boutique hotels on Inca walls, lakeside lodges on Titicaca and eco-lodges in the Amazon, chosen for comfort, location and altitude."),
    path: "/accommodation",
  });
}

export default async function AccommodationPage() {
  await initLocale();
  return (
    <>
      <PageHero
        image={photo("stay-hacienda")}
        crumbs={[{ name: t("Accommodation"), path: "/accommodation" }]}
        eyebrow={t("Accommodation")}
        title={t("Places to *rest* well")}
        intro={t("We choose stays for character, comfort and, in the Andes, for altitude too: oxygen-enriched rooms in Cusco, heated rooms by the lake, and valley haciendas for gentle first nights.")}
      >
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
