import { PageHero } from "@/components/sections/PageHero";
import { photo } from "@/data/photos";
import { JourneyFilter } from "@/components/sections/JourneyFilter";
import { journeys } from "@/data/journeys";
import { pageMeta } from "@/lib/seo";
import { CtaBand } from "@/components/sections/HomeSections";
import { LinkButton } from "@/components/ui/Button";
import { t } from "@/lib/i18n";
import { initLocale } from "@/lib/i18n/server";

export async function generateMetadata() {
  await initLocale();
  return pageMeta({
    title: t("Peru journeys: private, well-paced itineraries"),
    description: t("Eight private Peru journeys from 7 to 14 days, each with a night-by-night altitude profile: Machu Picchu, the Inca Trail, Salkantay, Titicaca, the Amazon, the north, food and family trips."),
    path: "/journeys",
  });
}

export default async function JourneysPage() {
  await initLocale();
  return (
    <>
      <PageHero
        image={photo("machu-picchu-sunrise")}
        crumbs={[{ name: t("Journeys"), path: "/journeys" }]}
        eyebrow={t("Journeys")}
        title={t("Journeys, *paced right*")}
        intro={t("Starting points, not packages. Every journey is private and shaped around your dates, interests and pace, and every one shows how it climbs, night by night.")}
      >
        <div className="mt-6 flex flex-wrap gap-3">
          <LinkButton href="/start-planning" variant="ghost">{t("Design your own")}</LinkButton>
          <LinkButton href="/altitude#route-builder" variant="ghost">{t("Build a route by altitude")}</LinkButton>
        </div>
      </PageHero>
      <section className="container-x py-12">
        <h2 className="sr-only">{t("All journeys")}</h2>
        <JourneyFilter list={journeys} />
      </section>
      <CtaBand title={t("Don't see *your* trip?")} text={t("Most of our travellers end up with something made just for them. Tell us what you'd love and we'll design it.")} />
    </>
  );
}
