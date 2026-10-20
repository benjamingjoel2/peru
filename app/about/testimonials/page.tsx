import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { photo } from "@/data/photos";
import { CtaBand } from "@/components/sections/HomeSections";
import { PlaceholderBadge } from "@/components/ui/Badges";
import { testimonials } from "@/data/people";
import { journeyBySlug } from "@/data/journeys";
import { plain } from "@/components/ui/Heading";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Testimonials",
  description: "What travellers say about their Peru journeys with Discover Peru Travel.",
  path: "/about/testimonials",
});

export default function TestimonialsPage() {
  return (
    <>
      <PageHero
        image={photo("uros-islands")}
        crumbs={[{ name: "About", path: "/about" }, { name: "Testimonials", path: "/about/testimonials" }]}
        eyebrow="Testimonials"
        title="In *their* words"
        intro="What travellers tell us when they get home."
      >
        <PlaceholderBadge className="mt-5" label="Placeholder testimonials, replace with real, consented reviews" />
      </PageHero>
      <section className="container-x py-16">
        <ul className="columns-1 gap-6 sm:columns-2 lg:columns-3">
          {testimonials.map((t) => {
            const j = t.journey ? journeyBySlug(t.journey) : null;
            return (
              <li key={t.name} className="mb-6 break-inside-avoid">
                <figure className="bg-cream-deep/60 p-7">
                  <div className="woven-stripe-thin -mx-7 -mt-7 mb-6" aria-hidden />
                  <blockquote className="font-display text-xl leading-snug text-indigo">&ldquo;{t.quote}&rdquo;</blockquote>
                  <figcaption className="mt-5 flex items-center gap-3 text-sm">
                    <span className="text-2xl" role="img" aria-label={t.country}>{t.flag}</span>
                    <span>
                      <span className="block font-bold">{t.name}</span>
                      <span className="text-stone-dark">{t.country}</span>
                      {j && <Link href={`/journeys/${j.slug}`} className="block text-cochineal underline">{plain(j.title)}</Link>}
                    </span>
                  </figcaption>
                </figure>
              </li>
            );
          })}
        </ul>
      </section>
      <CtaBand />
    </>
  );
}
