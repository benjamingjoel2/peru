import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/HomeSections";
import { stoneShapes } from "@/components/ui/StoneMask";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Our process: how we plan your Peru trip",
  description: "From first enquiry to flight home: how your Peru Specialist plans, books permits and supports you while you travel.",
  path: "/about/our-process",
});

const steps = [
  { t: "Tell us what you'd love", d: "Send an enquiry with your dates, interests and travellers. It takes about three minutes." },
  { t: "A call with your Specialist", d: "A relaxed conversation about pace, hiking, hotels, budget and anything that worries you, from altitude to food." },
  { t: "Your first itinerary", d: "Usually within a few working days: a day-by-day plan with its altitude profile, hotels and a clear price." },
  { t: "Refine it together", d: "Swap hotels, add a night lower down, move the Amazon to the end. As many rounds as you need." },
  { t: "Book, then breathe", d: "When you confirm, we secure Machu Picchu tickets, Inca Trail permits, trains and flights straight away." },
  { t: "Ready to go", d: "Pre-departure notes: packing for three climates, tipping guide, health and entry reminders (verify with official sources)." },
  { t: "On the ground", d: "Private guides and drivers, and a local team on call throughout your trip." },
];

export default function ProcessPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "About", path: "/about" }, { name: "Our process", path: "/about/our-process" }]}
        eyebrow="Our process"
        title="How we *plan* it"
        intro="Seven steps from your first message to your flight home. One Peru Specialist the whole way."
      />
      <section className="container-x py-16">
        <ol className="relative space-y-6 before:absolute before:bottom-6 before:left-7 before:top-6 before:w-1 before:bg-stone-light sm:before:left-9">
          {steps.map((s, i) => (
            <li key={s.t} className="relative flex gap-6">
              <span
                aria-hidden
                className={`relative z-10 grid h-14 w-14 shrink-0 place-items-center font-display text-2xl font-light text-cream sm:h-[4.5rem] sm:w-[4.5rem] ${["bg-cochineal", "bg-indigo", "bg-amazon", "bg-pacific", "bg-mustard", "bg-stone-dark", "bg-cochineal"][i]}`}
                style={{ clipPath: stoneShapes[i % stoneShapes.length] }}
              >
                {i + 1}
              </span>
              <div className="flex-1 bg-cream-deep/60 p-5">
                <h2 className="font-display text-2xl text-indigo"><span className="sr-only">Step {i + 1}: </span>{s.t}</h2>
                <p className="mt-1 text-stone-dark">{s.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
      <CtaBand title="Start with *step one*" />
    </>
  );
}
