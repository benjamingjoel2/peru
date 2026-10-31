import Link from "@/components/i18n/Link";
import { foodById } from "@/data/foods";
import { journeyBySlug } from "@/data/journeys";
import type { Journey } from "@/data/types";
import { Heading, plain } from "@/components/ui/Heading";
import { JourneyCard, StayCard } from "./Cards";
import { stays } from "@/data/stays";
import { t } from "@/lib/i18n";

export function FoodStrip({ ids, title = t("What to *eat* here") }: { ids: string[]; title?: string }) {
  const items = ids.map(foodById).filter(Boolean);
  if (!items.length) return null;
  return (
    <section aria-labelledby="eat-title" className="bg-cream-deep py-14">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <Heading id="eat-title" text={title} size="md" />
          <Link href="/peru-by-altitude" className="text-sm font-bold uppercase tracking-[0.12em] text-cochineal underline underline-offset-4">{t("Open the food map")}</Link>
        </div>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((f) => (
            <li key={f!.id} className="bg-cream p-4">
              <p className="font-display text-lg text-indigo">{f!.name}</p>
              <p className="mt-1 text-sm text-stone-dark">{f!.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function JourneyGrid({ list, title = t("Journeys that *go here*"), eyebrow = t("Journeys") }: { list: Journey[]; title?: string; eyebrow?: string }) {
  if (!list.length) return null;
  return (
    <section aria-labelledby="jg-title" className="container-x py-16">
      <Heading id="jg-title" eyebrow={eyebrow} text={title} size="md" />
      <div className="mt-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((j) => <JourneyCard key={j.slug} j={j} />)}
      </div>
    </section>
  );
}

export function StayGrid({ destination, slugs, title = t("Where to *stay*") }: { destination?: string; slugs?: string[]; title?: string }) {
  const list = stays.filter((s) => (slugs ? slugs.includes(s.slug) : s.destination === destination));
  if (!list.length) return null;
  return (
    <section aria-labelledby="stay-title" className="container-x py-16">
      <Heading id="stay-title" eyebrow={t("Accommodation")} text={title} size="md" />
      <div className="mt-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((s) => <StayCard key={s.slug} s={s} />)}
      </div>
    </section>
  );
}

export const journeyTitles = (slugs: string[]) =>
  slugs.map((s) => journeyBySlug(s)).filter(Boolean).map((j) => ({ slug: j!.slug, title: plain(j!.title) }));

export function FactBar({ facts }: { facts: { label: string; value: React.ReactNode }[] }) {
  return (
    <dl className="grid gap-px overflow-hidden rounded-sm bg-stone-light sm:grid-cols-2 lg:grid-cols-4">
      {facts.map((f) => (
        <div key={f.label} className="bg-cream p-5">
          <dt className="eyebrow text-stone-dark">{f.label}</dt>
          <dd className="mt-2 font-semibold text-indigo">{f.value}</dd>
        </div>
      ))}
    </dl>
  );
}
