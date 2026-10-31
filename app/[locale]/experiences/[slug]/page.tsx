import Link from "@/components/i18n/Link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/PageHero";
import { experiences, experienceBySlug, experienceGroups } from "@/data/experiences";
import { destinationBySlug } from "@/data/destinations";
import { journeys } from "@/data/journeys";
import { FactBar, JourneyGrid } from "@/components/sections/Blocks";
import { Verify } from "@/components/ui/Badges";
import { pageMeta } from "@/lib/seo";
import { bandFor, formatM } from "@/lib/altitude";
import { CtaBand } from "@/components/sections/HomeSections";
import { ArrowLink } from "@/components/ui/Button";
import { t } from "@/lib/i18n";
import { initLocale } from "@/lib/i18n/server";

export const dynamicParams = false;
export const generateStaticParams = () => experiences.map((e) => ({ slug: e.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  await initLocale();
  const { slug } = await params;
  const e = experienceBySlug(slug);
  if (!e) return {};
  return pageMeta({ title: t("{name} | Experiences in Peru", { name: e.name }), description: e.summary, path: `/experiences/${e.slug}`, image: e.image.src });
}

export default async function ExperiencePage({ params }: { params: Promise<{ slug: string }> }) {
  await initLocale();
  const { slug } = await params;
  const e = experienceBySlug(slug);
  if (!e) notFound();
  const g = experienceGroups.find((x) => x.id === e.group)!;
  const related = journeys.filter((j) => j.experiences.includes(e.slug));
  const siblings = experiences.filter((x) => x.group === e.group && x.slug !== e.slug);

  return (
    <>
      <PageHero
        crumbs={[{ name: t("Experiences"), path: "/experiences" }, { name: g.name, path: `/experiences#${g.id}` }, { name: e.name, path: `/experiences/${e.slug}` }]}
        eyebrow={g.name}
        title={e.name}
        intro={e.summary}
        image={e.image}
      />
      <section className="container-x py-10">
        <FactBar
          facts={[
            { label: t("Effort"), value: t(e.effort[0].toUpperCase() + e.effort.slice(1)) },
            { label: t("Altitude"), value: e.altitudeM ? <>~{formatM(e.altitudeM)} · {bandFor(e.altitudeM).label}<Verify /></> : t("Varies") },
            { label: t("Who it suits"), value: <span className="text-sm font-normal">{e.whoFor}</span> },
            {
              label: t("Where"),
              value: (
                <span className="text-sm">
                  {e.destinations.map((s, i) => {
                    const d = destinationBySlug(s);
                    return d ? <span key={s}>{i > 0 && ", "}<Link href={`/destinations/${d.zone}/${d.slug}`} className="underline hover:text-cochineal">{d.name}</Link></span> : null;
                  })}
                </span>
              ),
            },
          ]}
        />
      </section>
      <section className="container-x grid gap-12 py-10 lg:grid-cols-[1.4fr_1fr]">
        <div className="prose-peru max-w-none text-lg">
          {e.body.map((p) => <p key={p}>{p}</p>)}
        </div>
        <aside className="bg-cream-deep/60 p-6">
          <h2 className="font-display text-xl text-indigo">{t("More: {name}", { name: g.name })}</h2>
          <ul className="mt-3 space-y-2">
            {siblings.map((s) => <li key={s.slug}><Link href={`/experiences/${s.slug}`} className="font-semibold text-indigo hover:text-cochineal">{s.name}</Link></li>)}
          </ul>
          {(e.slug.includes("inca") || e.slug === "salkantay" || e.slug === "machu-picchu") && <ArrowLink href="/machu-picchu" className="mt-6">{t("Machu Picchu planner")}</ArrowLink>}
          {(e.altitudeM ?? 0) >= 3500 && <ArrowLink href="/altitude" className="mt-4">{t("Altitude, explained")}</ArrowLink>}
        </aside>
      </section>
      <JourneyGrid list={related} title={t("Journeys with this *experience*")} />
      <CtaBand />
    </>
  );
}
