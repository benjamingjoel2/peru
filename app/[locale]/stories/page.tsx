import { PageHero } from "@/components/sections/PageHero";
import { photo } from "@/data/photos";
import { StoryCard } from "@/components/sections/Cards";
import { CtaBand } from "@/components/sections/HomeSections";
import { getStories } from "@/lib/stories";
import { pageMeta } from "@/lib/seo";
import { t } from "@/lib/i18n";
import { initLocale } from "@/lib/i18n/server";

export async function generateMetadata() {
  await initLocale();
  return pageMeta({
    title: t("Stories: Peru travel guides and ideas"),
    description: t("Practical guides to altitude, Machu Picchu, Peruvian food and the places beyond the classic route."),
    path: "/stories",
  });
}

export default async function StoriesPage() {
  await initLocale();
  const stories = getStories();
  return (
    <>
      <PageHero
        image={photo("corn")}
        crumbs={[{ name: t("Stories"), path: "/stories" }]}
        eyebrow={t("Stories")}
        title={t("Stories from *the trail*")}
        intro={t("Straight answers and good ideas from people who've been many times.")}
      />
      <section className="container-x py-16">
        <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {stories.map((s) => <StoryCard key={s.slug} s={s} />)}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
