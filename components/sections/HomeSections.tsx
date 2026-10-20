import Link from "next/link";
import { journeys } from "@/data/journeys";
import { experienceGroups, experiencesByGroup } from "@/data/experiences";
import { team, testimonials } from "@/data/people";
import { faqs } from "@/data/faqs";
import { press } from "@/config/media";
import { site } from "@/config/site";
import { Emph, Heading } from "@/components/ui/Heading";
import { Carousel } from "@/components/ui/Carousel";
import { StoneMask } from "@/components/ui/StoneMask";
import { ArrowLink, LinkButton } from "@/components/ui/Button";
import { PlaceholderBadge } from "@/components/ui/Badges";
import { JourneyCard, StoryCard } from "./Cards";
import { FaqList } from "./FaqList";
import { EnquireButton } from "@/components/enquire/EnquireProvider";
import { BudgetPoints } from "@/components/enquire/BudgetPanel";
import { StoneDivider } from "@/components/ui/Stone";
import type { StoryMeta } from "@/lib/stories";
import Image from "next/image";

export function JourneyCarouselSection({ title = "Journeys, *paced right*", eyebrow = "Our journeys", list = journeys }: { title?: string; eyebrow?: string; list?: typeof journeys }) {
  return (
    <section aria-labelledby="journeys-title" className="on-dark relative bg-indigo py-20 lg:py-28">
      <StoneDivider color="var(--color-indigo)" className="absolute -top-6 left-0 sm:-top-10" />
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Heading id="journeys-title" eyebrow={eyebrow} text={title} />
            <p className="mt-4 max-w-2xl text-cream/80">
              Every journey is private and tailored to you. Each shows its altitude, night by night, so you know exactly how it climbs.
            </p>
          </div>
          <ArrowLink href="/journeys">Browse all journeys</ArrowLink>
        </div>
        <Carousel label="Journeys" dark className="mt-6">
          {list.map((j, i) => <JourneyCard key={j.slug} j={j} dark priority={i === 0} />)}
        </Carousel>
      </div>
    </section>
  );
}

export function ExperienceGroups() {
  return (
    <section aria-labelledby="exp-title" className="py-20 lg:py-28">
      <div className="container-x">
        <Heading id="exp-title" eyebrow="Experiences" text="What do you want to *feel* in Peru?" align="center" className="max-w-3xl" />
        <p className="mx-auto mt-4 max-w-2xl text-center text-stone-dark">
          Wonder, connection or a good ache in the legs. Most trips mix all three: we&apos;ll help you find the balance.
        </p>
        <div className="mt-14 space-y-20">
          {experienceGroups.map((g, i) => (
            <div key={g.id} className="grid items-center gap-10 lg:grid-cols-2">
              <StoneMask src={g.image.src} alt={g.image.alt} shape={i + 1} className={`aspect-[4/3] ${i % 2 ? "lg:order-2" : ""}`} />
              <div>
                <p className="eyebrow text-stone-dark">0{i + 1}</p>
                <h3 className="mt-2 text-3xl text-indigo sm:text-4xl">
                  <Emph text={g.title} />
                </h3>
                <p className="mt-4 text-stone-dark">{g.intro}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {experiencesByGroup(g.id).map((e) => (
                    <li key={e.slug}>
                      <Link href={`/experiences/${e.slug}`} className="inline-block rounded-full border-2 border-stone-light px-3 py-1 text-sm font-semibold text-indigo hover:border-cochineal hover:text-cochineal">
                        {e.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <ArrowLink href={`/experiences#${g.id}`} className="mt-6">Explore {g.name}</ArrowLink>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="woven-zigzag mt-20" aria-hidden />
    </section>
  );
}

export function Testimonials() {
  return (
    <section aria-labelledby="testimonials-title" className="bg-cream-deep py-20 lg:py-28">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Heading id="testimonials-title" eyebrow="What travellers say" text="Our latest *traveller* stories" />
            <PlaceholderBadge label="Placeholder testimonials, replace before launch" className="mt-3" />
          </div>
          <ArrowLink href="/about/testimonials">All testimonials</ArrowLink>
        </div>
        <Carousel label="Testimonials" className="mt-6" itemClassName="w-[88%] sm:w-[60%] lg:w-[40%]">
          {testimonials.map((t) => (
            <figure key={t.name} className="flex h-full flex-col bg-cream p-7 shadow-[0_1px_0_var(--color-stone-light)]">
              <div className="woven-stripe-thin -mx-7 -mt-7 mb-6" aria-hidden />
              <blockquote className="flex-1 font-display text-xl leading-snug text-indigo">&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption className="mt-6 flex items-center gap-3 text-sm">
                <span className="text-2xl" role="img" aria-label={t.country}>{t.flag}</span>
                <span>
                  <span className="block font-bold text-ink">{t.name}</span>
                  <span className="text-stone-dark">{t.country}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </Carousel>
      </div>
    </section>
  );
}

export function TeamCarousel() {
  return (
    <section aria-labelledby="team-title" className="py-20 lg:py-28">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Heading id="team-title" eyebrow="The people who plan it" text="*Meet* our team" />
            <PlaceholderBadge label="Placeholder team" className="mt-3" />
          </div>
          <ArrowLink href="/about/our-team">More about our team</ArrowLink>
        </div>
        <Carousel label="Our team" className="mt-6" itemClassName="w-[70%] sm:w-[40%] lg:w-[23%]">
          {team.map((m, i) => (
            <article key={m.slug}>
              <StoneMask src={`/images/team/${m.slug}.svg`} alt={`Placeholder portrait of ${m.name}`} shape={i + 2} className="aspect-[4/5]" sizes="(min-width:1024px) 22vw, 70vw" />
              <h3 className="mt-4 font-display text-xl text-indigo">{m.name}</h3>
              <p className="text-sm font-semibold text-cochineal">{m.role}</p>
              <p className="text-sm text-stone-dark">Based in {m.base}</p>
            </article>
          ))}
        </Carousel>
      </div>
    </section>
  );
}

export function EnquireBand() {
  const c = site.contact;
  return (
    <section aria-labelledby="enquire-band-title" className="relative bg-cream-deep py-20 lg:py-24">
      <div className="container-x grid gap-12 lg:grid-cols-2">
        <div>
          <Heading id="enquire-band-title" eyebrow="Contact us" text="Let's plan *your* Peru" />
          <p className="mt-4 text-stone-dark">Talk to a Peru Specialist. We&apos;re in Lima, so we answer in Lima time.</p>
          <ul className="mt-6 space-y-2 text-lg">
            <li><a href={c.phoneHref} className="font-semibold text-indigo hover:text-cochineal">{c.phone}</a></li>
            <li><a href={`mailto:${c.email}`} className="font-semibold text-indigo hover:text-cochineal">{c.email}</a></li>
            <li className="text-stone-dark">{c.hours} ({c.timezoneLabel})</li>
          </ul>
        </div>
        <div className="bg-cream p-7 shadow-[0_24px_48px_-24px_rgba(24,28,66,.35)] sm:p-9">
          <div className="woven-stripe -mx-7 -mt-7 mb-7 sm:-mx-9 sm:-mt-9" aria-hidden />
          <h3 className="font-display text-2xl text-indigo">
            Peru, planned <em className="text-cochineal">around you</em>
          </h3>
          <div className="mt-5"><BudgetPoints /></div>
          <EnquireButton className="mt-7 min-h-12 w-full rounded-[3px] bg-cochineal px-8 text-sm font-bold uppercase tracking-[0.14em] text-cream hover:bg-cochineal-dark sm:w-auto">
            Enquire now
          </EnquireButton>
        </div>
      </div>
    </section>
  );
}

export function StoriesSection({ stories }: { stories: StoryMeta[] }) {
  return (
    <section aria-labelledby="stories-title" className="py-20 lg:py-28">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Heading id="stories-title" eyebrow="Stories" text="Stories from *the trail*" />
          <ArrowLink href="/stories">All stories</ArrowLink>
        </div>
        <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {stories.slice(0, 4).map((s) => <StoryCard key={s.slug} s={s} />)}
        </div>
      </div>
    </section>
  );
}

export function PressStrip() {
  return (
    <section aria-labelledby="press-title" className="border-y border-stone-light bg-cream py-14">
      <div className="container-x">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 id="press-title" className="font-display text-2xl text-indigo sm:text-3xl">
            <em className="text-cochineal">Don&apos;t just</em> take our word for it
          </h2>
          {press.isPlaceholder && <PlaceholderBadge label="Placeholder press & awards, add real coverage before launch" />}
        </div>
        <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {press.items.map((p, i) => (
            <li
              key={p.name}
              className={`grid h-20 place-items-center border-2 border-dashed border-stone-light px-3 text-center text-xs font-bold uppercase tracking-wider text-stone-dark ${i % 2 ? "rotate-1" : "-rotate-1"}`}
            >
              {p.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function FaqSection({ limit }: { limit?: number }) {
  const list = limit ? faqs.filter((f) => f.onHome).slice(0, limit) : faqs;
  return (
    <section aria-labelledby="faq-title" className="py-20 lg:py-28">
      <div className="container-x grid gap-10 lg:grid-cols-[1fr_2fr]">
        <div>
          <Heading id="faq-title" eyebrow="FAQ" text="Questions travellers *ask*" />
          <p className="mt-4 text-stone-dark">Straight answers to what people ask us most. Anything marked &ldquo;verify&rdquo; changes often: we&apos;ll confirm the latest.</p>
          {limit && <ArrowLink href="/faq" className="mt-6">All questions</ArrowLink>}
        </div>
        <FaqList faqs={list} />
      </div>
    </section>
  );
}

export function CtaBand({ title = "Ready when *you* are", text = "Tell us when you'd like to go and what you'd love to see. Your Peru Specialist will come back with ideas, honest advice on altitude and timing, and a clear price.", journey }: { title?: string; text?: string; journey?: string }) {
  return (
    <section className="on-dark relative overflow-hidden bg-cochineal py-16">
      <Image src="/photos/pisac.jpg" alt="" fill sizes="100vw" className="object-cover opacity-10 mix-blend-multiply" />
      <div className="container-x relative flex flex-wrap items-center justify-between gap-8">
        <div className="max-w-2xl">
          <Heading text={title} size="lg" />
          <p className="mt-3 text-cream/90">{text}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <EnquireButton journey={journey} className="min-h-12 rounded-[3px] bg-cream px-8 text-sm font-bold uppercase tracking-[0.14em] text-cochineal hover:bg-mustard hover:text-indigo">
            Enquire now
          </EnquireButton>
          <LinkButton href="/start-planning" variant="light">Start planning</LinkButton>
        </div>
      </div>
    </section>
  );
}
