import { PageHero } from "@/components/sections/PageHero";
import { photo } from "@/data/photos";
import { ValuesIntro } from "@/components/sections/ValuesIntro";
import { CtaBand } from "@/components/sections/HomeSections";
import { Heading } from "@/components/ui/Heading";
import { ArrowLink } from "@/components/ui/Button";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "About us: why travel with Discover Peru Travel",
  description: "Private Peru journeys planned by a dedicated Peru Specialist around altitude, distance and permits, guided by two values: Pace and Ayni.",
  path: "/about",
});

const reasons = [
  { t: "We know the altitude", d: "Every itinerary is built night by night around how high you sleep." },
  { t: "We know the permits", d: "Machu Picchu slots and Inca Trail permits secured the moment you confirm." },
  { t: "We know the distances", d: "Short flights where roads are long, trains where they're beautiful." },
  { t: "We're here while you travel", d: "A local team on call, in your time zone and ours." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        image={photo("cusco")}
        crumbs={[{ name: "About", path: "/about" }]}
        eyebrow="About us"
        title="Peru, *done right*"
        intro="Peru has a desert coast, the high Andes and the Amazon. It also has altitude, permits that sell out and distances that surprise people. We plan private, well-paced journeys that get all of that right."
      />
      <section className="container-x grid gap-12 py-16 lg:grid-cols-2">
        <div className="space-y-4 text-lg text-stone-dark">
          <p>Discover Peru Travel began with a simple idea: most Peru trips go wrong in the same few ways. People fly straight into Cusco and spend two days feeling awful. They find out Inca Trail permits sold out months ago. They lose a whole day to a bus that a one-hour flight would have replaced.</p>
          <p>So we plan the other way round: altitude first, permits early, travel times honest. Then we fill the days with the things that make Peru unforgettable: the food, the people, the trails and the views.</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {reasons.map((r) => (
            <div key={r.t} className="bg-cream-deep/60 p-5">
              <h2 className="font-display text-xl text-indigo">{r.t}</h2>
              <p className="mt-2 text-sm text-stone-dark">{r.d}</p>
            </div>
          ))}
        </div>
      </section>
      <ValuesIntro />
      <section className="container-x py-16">
        <Heading text="Learn *more*" size="md" />
        <div className="mt-6 flex flex-wrap gap-8">
          <ArrowLink href="/about/our-process">Our process</ArrowLink>
          <ArrowLink href="/travel-that-gives-back">Travel that gives back</ArrowLink>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
