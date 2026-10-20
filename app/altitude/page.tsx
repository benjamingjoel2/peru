import { PageHero } from "@/components/sections/PageHero";
import { RouteBuilder } from "@/components/altitude/RouteBuilder";
import { AltitudeProfile } from "@/components/altitude/AltitudeProfile";
import { Heading } from "@/components/ui/Heading";
import { altitudeBands, formatM, type ProfilePoint } from "@/lib/altitude";
import { destinations } from "@/data/destinations";
import { pageMeta } from "@/lib/seo";
import { CtaBand } from "@/components/sections/HomeSections";
import Link from "next/link";

export const metadata = pageMeta({
  title: "Altitude in Peru, explained",
  description: "How altitude affects travel in Peru, how we plan around it, and a route builder that shows the altitude of every night. General guidance, not medical advice.",
  path: "/altitude",
});

const steps = [
  { title: "Sleep lower first", body: "Start in the Sacred Valley (about 2,800–2,900 m) rather than Cusco (about 3,400 m). Around 500 metres makes a real difference on night one." },
  { title: "Climb in steps", body: "Go up gradually. As a rough rule, mountain guides avoid adding much more than 300–500 m of sleeping altitude per night once above 3,000 m." },
  { title: "Take day one easy", body: "Walk slowly, rest in the afternoon, eat light, drink water and go easy on alcohol." },
  { title: "Save the highest days", body: "Rainbow Mountain, Salkantay Pass and Laguna 69 come after several nights at altitude, never at the start." },
  { title: "Go lower to recover", body: "The Amazon and the coast are low and kind to tired lungs. If symptoms worsen, the answer is to descend." },
];

export default function AltitudePage() {
  const sorted = [...destinations].sort((a, b) => a.elevationM - b.elevationM);
  const night = (n: number, place: string, m: number, tip?: ProfilePoint["tip"]): ProfilePoint => ({ label: `Day ${n}`, sublabel: place, sleepM: m, tip });
  const lineup = [
    {
      title: "Straight to Cusco",
      points: [night(1, "Lima", 150), night(2, "Cusco", 3400, "take-it-easy"), night(3, "Cusco", 3400), night(4, "Aguas Calientes", 2040), night(5, "Sacred Valley", 2870), night(6, "Sacred Valley", 2870)],
    },
    {
      title: "Sleep lower first (how we do it)",
      points: [night(1, "Lima", 150), night(2, "Sacred Valley", 2870, "sleep-lower"), night(3, "Sacred Valley", 2870, "take-it-easy"), night(4, "Aguas Calientes", 2040), night(5, "Cusco", 3400), night(6, "Cusco", 3400)],
    },
  ];
  return (
    <>
      <PageHero
        crumbs={[{ name: "Altitude", path: "/altitude" }]}
        eyebrow="Plan it right"
        title="Altitude, *explained*"
        intro="Cusco sits at about 3,400 metres. Your lungs will notice before you do. Here's what altitude does, how we plan around it, and a tool to see how your own route climbs."
      />

      <section className="container-x py-10">
        <div role="note" className="flex gap-4 rounded-sm border-2 border-cochineal bg-cochineal/5 p-5">
          <span aria-hidden className="font-display text-3xl font-light text-cochineal">!</span>
          <div>
            <p className="font-bold text-indigo">General guidance, not medical advice.</p>
            <p className="mt-1 text-stone-dark">
              Everyone reacts to altitude differently and fitness doesn&apos;t protect you. Talk to your doctor before you travel, especially about medication, pregnancy, children, or any heart or lung condition. All altitudes on this site are approximate (verify).
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="what-title" className="container-x grid gap-12 py-12 lg:grid-cols-2">
        <div>
          <Heading id="what-title" text="What *happens* up there" size="md" />
          <div className="mt-4 space-y-4 text-stone-dark">
            <p>
              The higher you go, the less oxygen each breath carries. Above roughly 2,500 metres, many people notice it: a headache, breathlessness on stairs, a racing heart, poor sleep or less appetite. This is usually mild and settles over a day or two as your body adjusts.
            </p>
            <p>
              A small number of people get more serious altitude illness. Tell your guide straight away if symptoms get worse, or if you notice confusion, breathlessness at rest or trouble walking straight. Going lower is the main treatment, and our team can arrange it at any hour.
            </p>
          </div>
        </div>
        <div>
          <h3 className="font-display text-2xl text-indigo">How high is it?</h3>
          <ul className="mt-4 space-y-2">
            {altitudeBands.map((b) => (
              <li key={b.id} className="flex gap-3 rounded-sm bg-cream-deep/60 p-3">
                <span aria-hidden className="mt-1 h-4 w-4 shrink-0 rounded-full" style={{ background: b.color }} />
                <span>
                  <strong className="text-indigo">{b.label}</strong>{" "}
                  <span className="text-sm text-stone-dark">({b.max < 9000 ? `${b.min.toLocaleString("en-GB")}–${b.max.toLocaleString("en-GB")} m` : `above ${b.min.toLocaleString("en-GB")} m`})</span>
                  <span className="block text-sm text-stone-dark">{b.advice}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="how-title" className="bg-cream-deep py-16">
        <div className="container-x">
          <Heading id="how-title" eyebrow="How we plan" text="Five rules we *always* follow" size="md" />
          <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map((s, i) => (
              <li key={s.title} className="bg-cream p-5">
                <span className="font-display text-4xl font-light text-mustard">{i + 1}</span>
                <h3 className="mt-2 font-display text-xl text-indigo">{s.title}</h3>
                <p className="mt-2 text-sm text-stone-dark">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="compare-title" className="container-x py-16">
        <Heading id="compare-title" eyebrow="Why order matters" text="Two ways to start, *compared*" size="md" />
        <p className="mt-3 max-w-2xl text-stone-dark">Both journeys see the same places. The difference is which night is your first in the mountains.</p>
        <div className="mt-8 grid gap-6 lg:grid-cols-2 [&>*]:min-w-0">
          {lineup.map((l) => (
            <AltitudeProfile key={l.title} points={l.points} title={l.title} compact />
          ))}
        </div>
      </section>

      <section id="route-builder" aria-labelledby="builder-title" className="scroll-mt-28 border-t border-stone-light py-16">
        <div className="container-x">
          <Heading id="builder-title" eyebrow="Try it" text="Build your route, see its *altitude*" size="md" />
          <p className="mt-3 max-w-2xl text-stone-dark">
            Add stops, set the nights and reorder them. The chart shows the altitude of every night, with simple warnings when a route climbs too fast.
          </p>
          <div className="mt-8"><RouteBuilder /></div>
        </div>
      </section>

      <section aria-labelledby="table-title" className="bg-cream-deep py-16">
        <div className="container-x">
          <Heading id="table-title" text="Altitudes at a *glance*" size="md" />
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-left text-sm">
              <caption className="sr-only">Approximate altitude of destinations in Peru</caption>
              <thead>
                <tr className="border-b-2 border-stone text-xs uppercase tracking-wide text-stone-dark">
                  <th scope="col" className="py-2 pr-4">Place</th>
                  <th scope="col" className="py-2 pr-4">Approx. altitude (verify)</th>
                  <th scope="col" className="py-2">Note</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((d) => (
                  <tr key={d.slug} className="border-b border-stone-light">
                    <th scope="row" className="py-2 pr-4 font-semibold">
                      <Link href={`/destinations/${d.zone}/${d.slug}`} className="text-indigo hover:text-cochineal hover:underline">{d.name}</Link>
                    </th>
                    <td className="py-2 pr-4">~{formatM(d.elevationM)}</td>
                    <td className="py-2 text-stone-dark">{d.elevationNote ?? ""}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <CtaBand title="Want us to *check* your route?" text="Send us your plan and your Peru Specialist will suggest the order, the nights and the pace that suit you." />
    </>
  );
}
