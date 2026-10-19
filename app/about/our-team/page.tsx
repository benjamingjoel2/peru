import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/HomeSections";
import { StoneMask } from "@/components/ui/StoneMask";
import { PlaceholderBadge } from "@/components/ui/Badges";
import { team } from "@/data/people";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Our team: Peru Specialists and local guides",
  description: "Meet the Peru Specialists who plan your trip and the local guides who show you their country.",
  path: "/about/our-team",
});

export default function TeamPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "About", path: "/about" }, { name: "Our team", path: "/about/our-team" }]}
        eyebrow="Our team"
        title="*Meet* the team"
        intro="Peru Specialists in Lima and Cusco, and local guides across the country. People who've been many times, and some who've never left."
      >
        <PlaceholderBadge className="mt-5" label="Placeholder team, replace with real people (with their consent)" />
      </PageHero>
      <section className="container-x py-16">
        <ul className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((m, i) => (
            <li key={m.slug}>
              <StoneMask src={`/images/team/${m.slug}.svg`} alt={`Placeholder portrait of ${m.name}`} shape={i} className="aspect-[4/5]" sizes="(min-width:1024px) 30vw, 90vw" />
              <h2 className="mt-4 font-display text-2xl text-indigo">{m.name}</h2>
              <p className="font-semibold text-cochineal">{m.role}</p>
              <p className="text-sm text-stone-dark">Based in {m.base}</p>
              <p className="mt-3 text-stone-dark">{m.bio}</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {m.knows.map((k) => <li key={k} className="rounded-full bg-cream-deep px-3 py-1 text-xs font-semibold text-indigo">{k}</li>)}
              </ul>
            </li>
          ))}
        </ul>
      </section>
      <CtaBand title="Talk to a *Specialist*" />
    </>
  );
}
