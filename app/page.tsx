import { Hero } from "@/components/sections/Hero";
import { IntroSection } from "@/components/sections/IntroSection";
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
      <IntroSection />
      <LandscapesFilm />
      <ValuesIntro />
      <JourneyCarouselSection />
      <ExperienceGroups />
      <DestinationTabs />
      <Testimonials />
      <TeamCarousel />
      <EnquireBand />
      <StoriesSection stories={stories} />
      <PressStrip />
      <FaqSection limit={6} />
      <AltitudeTeaser />
      <MachuPicchuTeaser />
      <JsonLd data={faqLd(faqs.filter((f) => f.onHome))} />
    </>
  );
}
