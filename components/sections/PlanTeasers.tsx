import { journeys } from "@/data/journeys";
import { journeyPoints } from "@/lib/journeyProfile";
import { AltitudeProfile } from "@/components/altitude/AltitudeProfile";
import { BookingHelper } from "@/components/machu-picchu/BookingHelper";
import { Heading } from "@/components/ui/Heading";
import { ArrowLink } from "@/components/ui/Button";
import { StoneDivider } from "@/components/ui/Stone";
import { plain } from "@/components/ui/Heading";

export function AltitudeTeaser() {
  const j = journeys[0];
  return (
    <section aria-labelledby="alt-teaser-title" className="bg-cream-deep py-20 lg:py-28">
      <div className="container-x grid items-start gap-12 lg:grid-cols-[1fr_1.5fr] [&>*]:min-w-0">
        <div>
          <Heading id="alt-teaser-title" eyebrow="The altitude profile" text="Every night, *mapped*" />
          <p className="mt-4 text-stone-dark">
            Cusco sits at about 3,400 metres. Your lungs will notice before you do. That&apos;s why we start lower. Every journey shows where you sleep each night, how high it is and where to take it easy.
          </p>
          <ul className="mt-6 space-y-3 text-stone-dark">
            <li className="flex gap-3"><span aria-hidden className="mt-2 h-2.5 w-2.5 shrink-0 rotate-45 bg-mustard" /><span><strong className="text-indigo">Sleep lower first.</strong> The Sacred Valley is about 500 m lower than Cusco.</span></li>
            <li className="flex gap-3"><span aria-hidden className="mt-2 h-2.5 w-2.5 shrink-0 rotate-45 bg-mustard" /><span><strong className="text-indigo">Climb in steps.</strong> Big passes come after a few nights at altitude.</span></li>
            <li className="flex gap-3"><span aria-hidden className="mt-2 h-2.5 w-2.5 shrink-0 rotate-45 bg-mustard" /><span><strong className="text-indigo">Go low to recover.</strong> The Amazon and the coast are kind to tired lungs.</span></li>
          </ul>
          <div className="mt-8 flex flex-col gap-3">
            <ArrowLink href="/altitude">Altitude, explained</ArrowLink>
            <ArrowLink href="/altitude#route-builder">Build your own route</ArrowLink>
          </div>
        </div>
        <AltitudeProfile points={journeyPoints(j)} title={`${j.days} days: ${plain(j.title)}`} compact />
      </div>
    </section>
  );
}

export function MachuPicchuTeaser() {
  return (
    <section aria-labelledby="mp-teaser-title" className="on-dark relative bg-indigo py-20 lg:py-28">
      <StoneDivider color="var(--color-indigo)" className="absolute -top-6 left-0 sm:-top-10" />
      <div className="container-x grid items-center gap-12 lg:grid-cols-2">
        <div>
          <Heading id="mp-teaser-title" eyebrow="Machu Picchu planner" text="The hardest part, *made simple*" />
          <p className="mt-4 text-cream/85">
            Machu Picchu tickets come in time slots and sell out. Book the trip, then breathe. Inca Trail permits are limited and sold only through licensed operators, and the trail closes every February. Our planner explains the routes, circuits and timing in plain English.
          </p>
          <ArrowLink href="/machu-picchu" className="mt-8">Open the Machu Picchu planner</ArrowLink>
        </div>
        <BookingHelper dark />
      </div>
    </section>
  );
}
