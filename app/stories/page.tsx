import { PageHero } from "@/components/sections/PageHero";
import { photo } from "@/data/photos";
import { StoryCard } from "@/components/sections/Cards";
import { CtaBand } from "@/components/sections/HomeSections";
import { getStories } from "@/lib/stories";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Stories: Peru travel guides and ideas",
  description: "Practical guides to altitude, Machu Picchu, Peruvian food and the places beyond the classic route.",
  path: "/stories",
});

export default function StoriesPage() {
  const stories = getStories();
  return (
    <>
      <PageHero
        image={photo("corn")}
        crumbs={[{ name: "Stories", path: "/stories" }]}
        eyebrow="Stories"
        title="Stories from *the trail*"
        intro="Straight answers and good ideas from people who've been many times."
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
