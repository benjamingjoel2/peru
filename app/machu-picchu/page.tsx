import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { photo } from "@/data/photos";
import { BookingHelper } from "@/components/machu-picchu/BookingHelper";
import { Heading } from "@/components/ui/Heading";
import { mpRoutes, mpRules, mpRulesNote, officialSources, mpPeakMonths } from "@/config/machuPicchu";
import { MONTHS } from "@/data/types";
import { monthNames, seasonByMonth } from "@/data/seasons";
import { formatM } from "@/lib/altitude";
import { pageMeta } from "@/lib/seo";
import { journeys } from "@/data/journeys";
import { JourneyCard } from "@/components/sections/Cards";
import { CtaBand } from "@/components/sections/HomeSections";

export const metadata = pageMeta({
  title: "Machu Picchu planner: routes, tickets, permits and timing",
  description: "How to get to Machu Picchu (train, Classic Inca Trail, Short Inca Trail, Salkantay), how tickets, time slots and circuits work, Inca Trail permits, and how far ahead to book.",
  path: "/machu-picchu",
});

const fmtDate = (iso: string) => new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

export default function MachuPicchuPage() {
  const related = journeys.filter((j) => j.machuPicchu);
  return (
    <>
      <PageHero
        crumbs={[{ name: "Machu Picchu planner", path: "/machu-picchu" }]}
        eyebrow="The hardest part, made simple"
        title="The Machu Picchu *planner*"
        intro="Machu Picchu tickets come in time slots and sell out. Book the trip, then breathe. Here's how to get there, how tickets and permits work, and when to book."
        image={photo("machu-picchu-ruins")}
      >
        <nav aria-label="On this page" className="mt-6 flex flex-wrap gap-2 text-sm">
          {[["#routes", "Ways to get there"], ["#tickets", "Tickets & circuits"], ["#permits", "Inca Trail permits"], ["#when", "Best time"], ["#book", "When to book"]].map(([h, l]) => (
            <a key={h} href={h} className="rounded-full border-2 border-stone-light px-3 py-1 font-semibold text-indigo hover:border-cochineal hover:text-cochineal">{l}</a>
          ))}
        </nav>
      </PageHero>

      <div className="container-x pt-8">
        <p role="note" className="rounded-sm border-l-4 border-mustard bg-mustard/15 px-4 py-3 text-sm text-ink">
          <strong>Rules change, we&apos;ll confirm the latest.</strong> {mpRulesNote} Each rule below shows when we last checked it and links to the official source.
        </p>
      </div>

      <section id="routes" aria-labelledby="routes-title" className="container-x scroll-mt-28 py-16">
        <Heading id="routes-title" eyebrow="Ways to get there" text="Train, trail or *trek*?" size="md" />
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {mpRoutes.map((r) => (
            <article key={r.id} className="flex flex-col bg-cream-deep/60 p-6">
              <div className="woven-stripe-thin -mx-6 -mt-6 mb-5" aria-hidden />
              <h3 className="font-display text-2xl text-indigo">{r.name}</h3>
              <p className="mt-2 text-sm text-stone-dark">{r.summary}</p>
              <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 text-sm">
                <dt className="font-bold text-stone-dark">Time</dt><dd>{r.days}</dd>
                <dt className="font-bold text-stone-dark">High point</dt><dd>~{formatM(r.maxAltitudeM)} <span className="text-xs">(verify)</span></dd>
                <dt className="font-bold text-stone-dark">Effort</dt><dd>{r.fitness}</dd>
                <dt className="font-bold text-stone-dark">Permit</dt><dd>{r.permit}</dd>
                <dt className="font-bold text-stone-dark">Book</dt><dd>{r.bookAheadMonths[0]}–{r.bookAheadMonths[1]} months ahead</dd>
                {r.closedMonths.length > 0 && (<><dt className="font-bold text-cochineal">Closed</dt><dd className="font-semibold text-cochineal">{r.closedMonths.map((m) => monthNames[m]).join(", ")}</dd></>)}
              </dl>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="font-bold text-amazon">Good</p>
                  <ul className="mt-1 list-disc space-y-1 pl-4">{r.pros.map((p) => <li key={p}>{p}</li>)}</ul>
                </div>
                <div>
                  <p className="font-bold text-cochineal">Watch out</p>
                  <ul className="mt-1 list-disc space-y-1 pl-4">{r.cons.map((p) => <li key={p}>{p}</li>)}</ul>
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-6 text-sm text-stone-dark">
          Comparing them in depth? Read <Link href="/stories/every-way-to-reach-machu-picchu" className="font-semibold text-cochineal underline">Every way to reach Machu Picchu, compared</Link>.
        </p>
      </section>

      <section id="tickets" aria-labelledby="rules-title" className="scroll-mt-28 bg-cream-deep py-16">
        <div className="container-x">
          <Heading id="rules-title" eyebrow="Tickets, circuits & permits" text="How it *works*" size="md" />
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {mpRules.map((r) => (
              <article key={r.id} id={r.id === "inca-trail-permits" ? "permits" : undefined} className="scroll-mt-28 bg-cream p-6">
                <h3 className="font-display text-xl text-indigo">{r.title}</h3>
                <p className="mt-2 text-sm text-stone-dark">{r.body}</p>
                <p className="mt-4 text-xs text-stone-dark">
                  Verified as of <time dateTime={r.verifiedAsOf} className="font-semibold">{fmtDate(r.verifiedAsOf)}</time>
                  {" · "}
                  {r.sources.map((s, i) => (
                    <span key={s.url}>
                      {i > 0 && ", "}
                      <a href={s.url} target="_blank" rel="noopener" className="text-cochineal underline">{s.label}</a>
                    </span>
                  ))}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="when" aria-labelledby="when-title" className="container-x scroll-mt-28 py-16">
        <Heading id="when-title" eyebrow="Best time" text="When to *go*" size="md" />
        <p className="mt-3 max-w-2xl text-stone-dark">
          Machu Picchu is open all year. The dry season brings clearer views and the biggest crowds; the shoulder months are a sweet spot. The Inca Trail is closed every February.
        </p>
        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-center text-sm">
            <caption className="sr-only">Season, demand and Inca Trail status by month (verify)</caption>
            <thead>
              <tr>
                <th scope="col" className="py-2 text-left text-xs uppercase tracking-wide text-stone-dark">Month</th>
                {MONTHS.map((m) => <th key={m} scope="col" className="py-2 text-xs font-bold uppercase text-indigo">{m}</th>)}
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-stone-light">
                <th scope="row" className="py-3 pr-3 text-left font-semibold">Andes season</th>
                {MONTHS.map((m) => {
                  const s = seasonByMonth[m].andes;
                  return <td key={m} className="p-1"><span className={`block rounded-sm py-1.5 text-xs font-bold ${s === "dry" ? "bg-mustard/40 text-indigo" : s === "wet" ? "bg-pacific/15 text-indigo" : "bg-amazon/15 text-amazon"}`}>{s}</span></td>;
                })}
              </tr>
              <tr className="border-t border-stone-light">
                <th scope="row" className="py-3 pr-3 text-left font-semibold">Demand</th>
                {MONTHS.map((m) => <td key={m} className="p-1 text-xs">{mpPeakMonths.includes(m) ? <strong className="text-cochineal">Peak</strong> : "Lower"}</td>)}
              </tr>
              <tr className="border-t border-stone-light">
                <th scope="row" className="py-3 pr-3 text-left font-semibold">Inca Trail</th>
                {MONTHS.map((m) => <td key={m} className="p-1 text-xs">{seasonByMonth[m].incaTrailOpen ? "Open" : <strong className="text-cochineal">Closed</strong>}</td>)}
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-stone-dark">Seasons are approximate and vary year to year (verify).</p>
      </section>

      <section id="book" aria-labelledby="book-title" className="scroll-mt-28 bg-indigo py-16 on-dark">
        <div className="container-x grid items-start gap-10 lg:grid-cols-2">
          <div>
            <Heading id="book-title" eyebrow="Timing" text="How far ahead should I *book*?" size="md" />
            <p className="mt-4 text-cream/85">
              Pick your travel month and route. We&apos;ll suggest when to secure tickets or permits. When you book with us, we buy them as soon as you confirm.
            </p>
            <h3 className="mt-8 font-display text-xl text-cream">Official sources</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {Object.values(officialSources).map((s) => (
                <li key={s.url}><a href={s.url} target="_blank" rel="noopener" className="text-mustard-soft underline">{s.label}</a></li>
              ))}
            </ul>
          </div>
          <BookingHelper dark />
        </div>
      </section>

      <section aria-labelledby="mp-journeys" className="container-x py-16">
        <Heading id="mp-journeys" eyebrow="Journeys" text="Journeys with Machu Picchu, *sorted*" size="md" />
        <div className="mt-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {related.slice(0, 6).map((j) => <JourneyCard key={j.slug} j={j} />)}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
