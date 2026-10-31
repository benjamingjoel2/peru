import { Hero } from "@/components/sections/Hero";
import { IntroSection } from "@/components/sections/IntroSection";
import { ValuesIntro } from "@/components/sections/ValuesIntro";
import { LandscapesFilm } from "@/components/sections/LandscapesFilm";
import { ClientStrings } from "@/lib/i18n/ClientStrings";
import { destinations } from "@/data/destinations";
import { photoSources } from "@/data/photos";
import {
  EnquireBand,
  ExperienceGroups,
  FaqSection,
  JourneyCarouselSection,
  StoriesSection,
} from "@/components/sections/HomeSections";
import { DestinationTabs } from "@/components/sections/DestinationTabs";
import { AltitudeTeaser, MachuPicchuTeaser } from "@/components/sections/PlanTeasers";
import { getStories } from "@/lib/stories";
import { faqs } from "@/data/faqs";
import type { Metadata } from "next";
import { JsonLd, faqLd, pageMeta } from "@/lib/seo";
import { initLocale } from "@/lib/i18n/server";
import { t } from "@/lib/i18n";
import { site } from "@/config/site";

export async function generateMetadata(): Promise<Metadata> {
  await initLocale();
  const title = `${site.name}: ${t("Peru, done right")}`;
  return { ...pageMeta({ title, description: t(site.description), path: "/" }), title: { absolute: title } };
}

export default async function Home() {
  await initLocale();
  const stories = getStories();
  return (
    <>
      <Hero />
      <IntroSection />
      <ClientStrings data={[photoSources.filter((p) => ["huacachina", "kuelap", "llanganuco", "weaving-hands"].includes(p.slot)).map((p) => p.alt)]}>
        <LandscapesFilm />
      </ClientStrings>
      <ValuesIntro />
      <JourneyCarouselSection />
      <ExperienceGroups />
      <ClientStrings data={[destinations]}>
        <DestinationTabs />
      </ClientStrings>
      <EnquireBand />
      <StoriesSection stories={stories} />
      <FaqSection limit={6} />
      <AltitudeTeaser />
      <MachuPicchuTeaser />
      <JsonLd data={faqLd(faqs.filter((f) => f.onHome))} />
    </>
  );
}
