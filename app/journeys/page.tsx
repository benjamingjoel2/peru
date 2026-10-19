import { PageHero } from "@/components/sections/PageHero";
import { JourneyFilter } from "@/components/sections/JourneyFilter";
import { journeys } from "@/data/journeys";
import { pageMeta } from "@/lib/seo";
import { CtaBand } from "@/components/sections/HomeSections";
import { LinkButton } from "@/components/ui/Button";

export const metadata = pageMeta({
  title: "Peru journeys: private, well-paced itineraries",
  description: "Eight private Peru journeys from 7 to 14 days, each with a night-by-night altitude profile: Machu Picchu, the Inca Trail, Salkantay, Titicaca, the Amazon, the north, food and family trips.",
  path: "/journeys",
});

export default function JourneysPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Journeys", path: "/journeys" }]}
        eyebrow="Journeys"
        title="Journeys, *paced right*"
        intro="Starting points, not packages. Every journey is private and shaped around your dates, interests and pace, and every one shows how it climbs, night by night."
      >
        <div className="mt-6 flex flex-wrap gap-3">
          <LinkButton href="/start-planning" variant="ghost">Design your own</LinkButton>
          <LinkButton href="/altitude#route-builder" variant="ghost">Build a route by altitude</LinkButton>
        </div>
      </PageHero>
      <section className="container-x py-12">
        <h2 className="sr-only">All journeys</h2>
        <JourneyFilter list={journeys} />
      </section>
      <CtaBand title="Don't see *your* trip?" text="Most of our travellers end up with something made just for them. Tell us what you'd love and we'll design it." />
    </>
  );
}
