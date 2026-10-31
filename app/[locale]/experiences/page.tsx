import Image from "next/image";
import Link from "@/components/i18n/Link";
import { PageHero } from "@/components/sections/PageHero";
import { photo } from "@/data/photos";
import { experienceGroups, experiencesByGroup } from "@/data/experiences";
import { Emph } from "@/components/ui/Heading";
import { stoneShapes } from "@/components/ui/StoneMask";
import { pageMeta } from "@/lib/seo";
import { CtaBand } from "@/components/sections/HomeSections";
import { t, L } from "@/lib/i18n";
import { initLocale } from "@/lib/i18n/server";

export async function generateMetadata() {
  await initLocale();
  return pageMeta({
    title: t("Experiences in Peru"),
    description: t("Icons of Peru, Living Culture and Peru Unplugged: Machu Picchu, Lake Titicaca, weaving cooperatives, Lima's food scene, the Inca Trail, Salkantay and Amazon lodges."),
    path: "/experiences",
  });
}

const effortLabel = L({ gentle: "Gentle", moderate: "Moderate", demanding: "Demanding" });

export default async function ExperiencesPage() {
  await initLocale();
  return (
    <>
      <PageHero
        image={photo("humantay-shore")}
        crumbs={[{ name: t("Experiences"), path: "/experiences" }]}
        eyebrow={t("Experiences")}
        title={t("What do you want to *feel* in Peru?")}
        intro={t("Three kinds of days make a great Peru trip: the icons, time with the people who live here, and the trails. Mix them however you like.")}
      >
        <nav aria-label={t("Experience groups")} className="mt-6 flex flex-wrap gap-2">
          {experienceGroups.map((g) => (
            <a key={g.id} href={`#${g.id}`} className="rounded-full border-2 border-indigo px-4 py-1.5 text-sm font-semibold text-indigo hover:bg-indigo hover:text-cream">{g.name}</a>
          ))}
        </nav>
      </PageHero>
      {experienceGroups.map((g, gi) => (
        <section key={g.id} id={g.id} aria-labelledby={`${g.id}-title`} className={`scroll-mt-28 py-16 ${gi % 2 ? "bg-cream-deep" : ""}`}>
          <div className="container-x">
            <p className="eyebrow text-stone-dark">0{gi + 1}</p>
            <h2 id={`${g.id}-title`} className="mt-2 text-3xl text-indigo sm:text-4xl"><Emph text={g.title} /></h2>
            <p className="mt-3 max-w-3xl text-stone-dark">{g.intro}</p>
            <ul className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {experiencesByGroup(g.id).map((e, i) => (
                <li key={e.slug}>
                  <article className="group relative">
                    <div className="relative aspect-[4/3] overflow-hidden" style={{ clipPath: stoneShapes[(i + gi) % stoneShapes.length] }}>
                      <Image src={e.image.src} alt={e.image.alt} fill sizes="(min-width:1024px) 30vw, 90vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    </div>
                    <h3 className="mt-4 font-display text-2xl text-indigo">
                      <Link href={`/experiences/${e.slug}`} className="after:absolute after:inset-0">{e.name}</Link>
                    </h3>
                    <p className="mt-1 text-sm text-stone-dark">{e.summary}</p>
                    <p className="mt-2 text-xs font-bold uppercase tracking-wider text-cochineal">
                      {effortLabel[e.effort]}{e.altitudeM ? ` · ~${e.altitudeM.toLocaleString("en-GB")} m` : ""}
                    </p>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}
      <CtaBand />
    </>
  );
}
