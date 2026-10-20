import { PageHero } from "@/components/sections/PageHero";
import { photo } from "@/data/photos";
import { Heading } from "@/components/ui/Heading";
import { StoneMask } from "@/components/ui/StoneMask";
import { PlaceholderBadge } from "@/components/ui/Badges";
import { ArrowLink } from "@/components/ui/Button";
import { ayniPrinciples, partners, porterStandards } from "@/data/givesBack";
import { pageMeta } from "@/lib/seo";
import { CtaBand } from "@/components/sections/HomeSections";

export const metadata = pageMeta({
  title: "Travel that gives back",
  description: "Ayni, the Andean idea of reciprocity: community-based tourism with weaving cooperatives and homestays, and fair pay, load limits and proper equipment for porters on the Inca Trail and Salkantay.",
  path: "/travel-that-gives-back",
});

export default function GivesBackPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Travel that gives back", path: "/travel-that-gives-back" }]}
        eyebrow="Ayni"
        title="Travel that *gives back*"
        intro="In the Andes, ayni means reciprocity: what you receive, you return. It's how neighbours share the harvest, and it's how we want you to travel, with the people who host you better off for your visit."
        image={photo("weaving")}
      />
      <section aria-labelledby="principles-title" className="container-x py-16">
        <Heading id="principles-title" eyebrow="How we work" text="Four *promises*" size="md" />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ayniPrinciples.map((p, i) => (
            <div key={p.title} className="bg-cream-deep/60 p-6">
              <span className="font-display text-4xl font-bold text-mustard">{i + 1}</span>
              <h3 className="mt-2 font-display text-xl text-indigo">{p.title}</h3>
              <p className="mt-2 text-sm text-stone-dark">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="cbt-title" className="bg-cream-deep py-16">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <StoneMask src={photo("ausangate").src} alt={photo("ausangate").alt} shape={2} className="aspect-[4/3]" />
          <div>
            <Heading id="cbt-title" eyebrow="Community-based tourism" text="Visits run *by communities*" size="md" />
            <div className="mt-4 space-y-4 text-stone-dark">
              <p>Across the Andes, communities run their own tourism: weaving cooperatives where you learn natural dyeing from the people who do it, family homestays on the islands of Lake Titicaca, and guided walks through farmland led by local guides.</p>
              <p>We pay the price the community sets, directly. We keep groups small and visits respectful, and we brief you beforehand so you know what to expect, what to bring and how to say thank you.</p>
            </div>
            <ArrowLink href="/experiences#living-culture" className="mt-6">Living Culture experiences</ArrowLink>
          </div>
        </div>
      </section>

      <section aria-labelledby="porter-title" className="container-x py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <Heading id="porter-title" eyebrow="On the trail" text="Porters *matter*" size="md" />
            <p className="mt-4 text-stone-dark">
              On the Inca Trail and Salkantay, porters carry the camp, the kitchen and often more. They make the trek possible. We work only with licensed operators who meet these standards, and we check.
            </p>
            <p className="mt-4 text-sm text-stone-dark">Official rules on pay and load limits change: we verify current figures every season (verify).</p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {porterStandards.map((s) => (
              <li key={s.label} className="border-l-4 border-cochineal bg-cream-deep/60 p-4">
                <p className="font-display text-lg text-indigo">{s.label}</p>
                <p className="mt-1 text-sm text-stone-dark">{s.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="partners-title" className="border-t border-stone-light bg-cream py-16">
        <div className="container-x">
          <Heading id="partners-title" eyebrow="Partners" text="Who we *work with*" size="md" />
          <PlaceholderBadge className="mt-3" label="Placeholder partners, replace with real organisations" />
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {partners.map((p) => (
              <li key={p.name} className="border-2 border-dashed border-stone-light p-5">
                <p className="font-semibold text-indigo">{p.name}</p>
                <p className="text-xs font-bold uppercase tracking-wider text-stone-dark">{p.region}</p>
                <p className="mt-2 text-sm text-stone-dark">{p.what}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
