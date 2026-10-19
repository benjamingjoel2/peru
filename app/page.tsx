import { Hero } from "@/components/sections/Hero";
import { ValuesIntro } from "@/components/sections/ValuesIntro";
import { LandscapesFilm } from "@/components/sections/LandscapesFilm";
import {
  EnquireBand,
  ExperienceGroups,
  FaqSection,
  JourneyCarouselSection,
  PressStrip,
  StoriesSection,
  TeamCarousel,
  Testimonials,
} from "@/components/sections/HomeSections";
import { DestinationTabs } from "@/components/sections/DestinationTabs";
import { AltitudeTeaser, MachuPicchuTeaser } from "@/components/sections/PlanTeasers";
import { getStories } from "@/lib/stories";
import { faqs } from "@/data/faqs";
import { JsonLd, faqLd } from "@/lib/seo";

export default function Home() {
  const stories = getStories();
  return (
    <>
      <Hero />
      <ValuesIntro />
      <LandscapesFilm />
      <JourneyCarouselSection />
      <ExperienceGroups />
      <DestinationTabs />
      <AltitudeTeaser />
      <MachuPicchuTeaser />
      <Testimonials />
      <TeamCarousel />
      <EnquireBand />
      <StoriesSection stories={stories} />
      <PressStrip />
      <FaqSection limit={6} />
      <JsonLd data={faqLd(faqs.filter((f) => f.onHome))} />
    </>
  );
}
