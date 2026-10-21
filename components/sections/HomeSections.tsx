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
import { JourneyOverlayCard, StoryCard } from "./Cards";
import { WipeImage } from "@/components/ui/WipeImage";
import { EnquiryForm } from "@/components/enquire/EnquiryForm";
import { photo } from "@/data/photos";
import { FaqList } from "./FaqList";
import { EnquireButton } from "@/components/enquire/EnquireProvider";
import { BudgetPoints } from "@/components/enquire/BudgetPanel";
import type { StoryMeta } from "@/lib/stories";
import Image from "next/image";

export function JourneyCarouselSection({ title = "Journeys, *paced right*", eyebrow = "Featured journeys", list = journeys }: { title?: string; eyebrow?: string; list?: typeof journeys }) {
  return (
    <section aria-labelledby="journeys-title" className="on-dark relative bg-indigo-deep py-20 lg:py-28">
      <div className="container-x">
        <Heading id="journeys-title" eyebrow={eyebrow} text={title} align="center" />
        <p className="mx-auto mt-4 max-w-2xl text-center text-cream/80">
          Every journey is private and tailored to you. Each one shows its altitude, night by night, so you know exactly how it climbs.
        </p>
        <Carousel label="Journeys" dark arrows="sides" className="mt-10" itemClassName="w-[82%] sm:w-[46%] lg:w-[31%]">
          {list.map((j, i) => <JourneyOverlayCard key={j.slug} j={j} />)}
        </Carousel>
        <div className="mt-10 text-center">
          <LinkButton href="/journeys" variant="light">Browse all journeys</LinkButton>
        </div>
      </div>
    </section>
  );
}

export function ExperienceGroups() {
  const [g1, g2, g3] = experienceGroups;
  const chips = (id: (typeof experienceGroups)[number]["id"]) => (
    <ul className="mt-5 flex flex-wrap gap-2">
      {experiencesByGroup(id).map((e) => (
        <li key={e.slug}>
          <Link href={`/experiences/${e.slug}`} className="inline-block rounded-full border-2 border-stone-light px-3 py-1 text-sm font-semibold text-indigo hover:border-cochineal hover:text-cochineal">
            {e.name}
          </Link>
        </li>
      ))}
    </ul>
  );
  const intro = photo("humantay");
  return (
    <section aria-labelledby="exp-title" className="py-20 lg:py-28">
      {/* Intro: text left, image right */}
      <div className="container-x grid items-center gap-12 lg:grid-cols-2">
        <div>
          <Heading id="exp-title" eyebrow="Experiences" text="What do you want to *feel* in Peru?" />
          <p className="mt-5 max-w-xl text-lg text-stone-dark">
            Wonder, connection or a good ache in the legs. Most trips mix all three, and the order matters: icons when you&apos;re fresh, culture as you slow down, the big trails once your lungs have caught up.
          </p>
          <ArrowLink href="/experiences" className="mt-6">All experiences</ArrowLink>
        </div>
        <WipeImage src={intro.src} alt={intro.alt} shape={1} className="aspect-[5/4]" />
      </div>

      {/* 1: text left, image right */}
      <div className="container-x mt-24 grid items-center gap-12 lg:grid-cols-2">
        <div className="lg:order-2">
          <WipeImage src={g1.image.src} alt={g1.image.alt} shape={3} from="right" className="aspect-[4/3]" />
        </div>
        <div>
          <p className="eyebrow text-stone-dark">01</p>
          <h3 className="mt-2 text-3xl text-indigo sm:text-4xl"><Emph text={g1.title} /></h3>
          <p className="mt-4 text-stone-dark">{g1.intro}</p>
          {chips(g1.id)}
          <ArrowLink href={`/experiences#${g1.id}`} className="mt-6">Explore {g1.name}</ArrowLink>
        </div>
      </div>

      {/* 2: full-width image band, text centred below */}
      <div className="mt-24">
        <WipeImage src={g2.image.src} alt={g2.image.alt} shape={5} className="mx-auto aspect-[16/7] w-full max-w-[96rem]" sizes="100vw" />
        <div className="container-x mt-10 text-center">
          <p className="eyebrow text-stone-dark">02</p>
          <h3 className="mt-2 text-3xl text-indigo sm:text-4xl"><Emph text={g2.title} /></h3>
          <p className="mx-auto mt-4 max-w-2xl text-stone-dark">{g2.intro}</p>
          <div className="flex justify-center">{chips(g2.id)}</div>
          <ArrowLink href={`/experiences#${g2.id}`} className="mt-6">Explore {g2.name}</ArrowLink>
        </div>
      </div>

      {/* 3: text left, image right */}
      <div className="container-x mt-24 grid items-center gap-12 lg:grid-cols-2">
        <div className="lg:order-2">
          <WipeImage src={g3.image.src} alt={g3.image.alt} shape={0} from="right" className="aspect-[4/3]" />
        </div>
        <div>
          <p className="eyebrow text-stone-dark">03</p>
          <h3 className="mt-2 text-3xl text-indigo sm:text-4xl"><Emph text={g3.title} /></h3>
          <p className="mt-4 text-stone-dark">{g3.intro}</p>
          {chips(g3.id)}
          <ArrowLink href={`/experiences#${g3.id}`} className="mt-6">Explore {g3.name}</ArrowLink>
        </div>
      </div>
    </section>
  );
}

export function Testimonials() {
  const pics = [photo("uros-islands"), photo("machu-picchu-llamas"), photo("macaws")];
  // Quotes and photos interleaved in a masonry grid
  const tiles: ({ kind: "quote"; t: (typeof testimonials)[number] } | { kind: "photo"; p: { src: string; alt: string } })[] = [];
  testimonials.forEach((t, i) => {
    tiles.push({ kind: "quote", t });
    if (i % 2 === 1 && pics[(i - 1) / 2]) tiles.push({ kind: "photo", p: pics[(i - 1) / 2] });
  });
  return (
    <section aria-labelledby="testimonials-title" className="bg-cream-deep py-20 lg:py-28">
      <div className="container-x">
        <div className="text-center">
          <Heading id="testimonials-title" eyebrow="What travellers say" text="Our latest *traveller* stories" align="center" />
          <PlaceholderBadge label="Placeholder testimonials, replace before launch" className="mt-3" />
        </div>
        <ul className="mt-12 columns-1 gap-6 sm:columns-2 lg:columns-3">
          {tiles.map((tile, i) =>
            tile.kind === "quote" ? (
              <li key={i} className="mb-6 break-inside-avoid">
                <figure className="bg-cream p-7">
                  <div className="woven-stripe-thin -mx-7 -mt-7 mb-6" aria-hidden />
                  <blockquote className="font-display text-xl leading-snug text-indigo">&ldquo;{tile.t.quote}&rdquo;</blockquote>
                  <figcaption className="mt-5 flex items-center gap-3 text-sm">
                    <span className="text-2xl" role="img" aria-label={tile.t.country}>{tile.t.flag}</span>
                    <span>
                      <span className="block font-bold text-ink">{tile.t.name}</span>
                      <span className="text-stone-dark">{tile.t.country}</span>
                    </span>
                  </figcaption>
                </figure>
              </li>
            ) : (
              <li key={i} className="mb-6 break-inside-avoid">
                <StoneMask src={tile.p.src} alt={tile.p.alt} shape={i} className="aspect-[4/5]" sizes="(min-width:1024px) 30vw, 90vw" />
              </li>
            ),
          )}
        </ul>
        <div className="mt-6 text-center">
          <ArrowLink href="/about/testimonials">All testimonials</ArrowLink>
        </div>
      </div>
    </section>
  );
}

export function TeamCarousel() {
  return (
    <section aria-labelledby="team-title" className="py-20 lg:py-28">
      <div className="container-x">
        <div className="text-center">
          <Heading id="team-title" eyebrow="Our team" text="*Meet* our team" align="center" />
          <PlaceholderBadge label="Placeholder team" className="mt-3" />
        </div>
        <Carousel label="Our team" arrows="sides" className="mt-10" itemClassName="w-[70%] sm:w-[40%] lg:w-[23%]">
          {team.map((m, i) => (
            <article key={m.slug} className="text-center">
              <StoneMask src={`/images/team/${m.slug}.svg`} alt={`Placeholder portrait of ${m.name}`} shape={i + 2} className="aspect-[4/5]" sizes="(min-width:1024px) 22vw, 70vw" />
              <h3 className="mt-4 font-display text-xl text-indigo">{m.name}</h3>
              <p className="text-sm font-semibold text-cochineal">{m.role}</p>
              <p className="text-sm text-stone-dark">Based in {m.base}</p>
            </article>
          ))}
        </Carousel>
        <div className="mt-8 text-center">
          <LinkButton href="/about/our-team" variant="ghost">More about our team</LinkButton>
        </div>
      </div>
    </section>
  );
}

/** Dark contact section: details on the left, the enquiry form inline on the right. */
export function EnquireBand() {
  const c = site.contact;
  return (
    <section id="enquire" aria-labelledby="enquire-band-title" className="on-dark relative scroll-mt-24 bg-indigo-deep py-20 text-cream lg:py-28">
      <div className="container-x grid gap-12 lg:grid-cols-2">
        <div className="lg:border-r lg:border-cream/20 lg:pr-12">
          <Heading id="enquire-band-title" eyebrow="Contact us" text="Let's plan *your* Peru" />
          <p className="mt-4 text-cream/80">For anything at all, talk to a Peru Specialist. We&apos;re in Lima, so we answer in Lima time.</p>
          <ul className="mt-8 space-y-3 text-lg">
            <li><span className="eyebrow block text-mustard-soft">Phone</span><a href={c.phoneHref} className="font-semibold hover:text-mustard">{c.phone}</a></li>
            <li><span className="eyebrow block text-mustard-soft">Email</span><a href={`mailto:${c.email}`} className="font-semibold hover:text-mustard">{c.email}</a></li>
            <li><span className="eyebrow block text-mustard-soft">WhatsApp</span><a href={c.whatsappHref} target="_blank" rel="noopener" className="font-semibold hover:text-mustard">{c.whatsapp}</a></li>
            <li><span className="eyebrow block text-mustard-soft">Hours</span>{c.hours} ({c.timezoneLabel})</li>
          </ul>
          <div className="mt-10 bg-cream p-6 text-ink">
            <p className="font-display text-xl text-indigo">Peru, planned <em>around you</em></p>
            <div className="mt-4 text-stone-dark"><BudgetPoints /></div>
          </div>
        </div>
        <div>
          <h3 className="font-display text-3xl text-cream">Enquire <em>now</em></h3>
          <p className="mb-6 mt-2 text-cream/80">A few details help your Peru Specialist come back with ideas that fit.</p>
          <div className="rounded-sm bg-cream p-5 text-ink sm:p-6">
            <EnquiryForm compact />
          </div>
        </div>
      </div>
    </section>
  );
}

export function StoriesSection({ stories }: { stories: StoryMeta[] }) {
  return (
    <section aria-labelledby="stories-title" className="py-20 lg:py-28">
      <div className="container-x">
        <div className="text-center">
          <Heading id="stories-title" eyebrow="Travel stories" text="Stories from *the trail*" align="center" />
          <p className="mx-auto mt-4 max-w-xl text-stone-dark">Practical guides and good ideas from people who&apos;ve been many times.</p>
        </div>
        <Carousel label="Stories" arrows="sides" className="mt-10" itemClassName="w-[82%] sm:w-[46%] lg:w-[31%]">
          {stories.map((s) => <StoryCard key={s.slug} s={s} />)}
        </Carousel>
        <div className="mt-8 text-center">
          <LinkButton href="/stories" variant="ghost">All stories</LinkButton>
        </div>
      </div>
    </section>
  );
}

export function PressStrip() {
  return (
    <section aria-labelledby="press-title" className="border-y border-stone-light bg-cream py-16">
      <div className="container-x grid items-center gap-10 lg:grid-cols-[1fr_1.6fr]">
        <div>
          <p className="eyebrow text-stone-dark">Press &amp; recognition</p>
          <h2 id="press-title" className="mt-3 font-display text-3xl text-indigo sm:text-4xl">
            <em>Don&apos;t just</em> take our word for it
          </h2>
          {press.isPlaceholder && <PlaceholderBadge label="Placeholder press & awards, add real coverage before launch" className="mt-4" />}
        </div>
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3">
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
          <EnquireButton journey={journey} className="min-h-12 rounded-full bg-cream px-8 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-cochineal hover:bg-mustard hover:text-indigo">
            Enquire now
          </EnquireButton>
          <LinkButton href="/start-planning" variant="light">Start planning</LinkButton>
        </div>
      </div>
    </section>
  );
}
