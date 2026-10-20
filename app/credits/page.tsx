import { PageHero } from "@/components/sections/PageHero";
import { photoSources } from "@/data/photos";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Photo credits",
  description: "The photographers whose work appears on Discover Peru Travel.",
  path: "/credits",
});

export default function CreditsPage() {
  const sorted = [...photoSources].sort((a, b) => a.photographer.localeCompare(b.photographer));
  return (
    <>
      <PageHero crumbs={[{ name: "Photo credits", path: "/credits" }]} eyebrow="Thank you" title="Photo *credits*" intro="Photography on this site is used under the Unsplash License. Thank you to the photographers below." />
      <section className="container-x py-14">
        <ul className="grid gap-x-8 gap-y-3 text-sm sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((p) => (
            <li key={p.slot}>
              <a href={p.page} target="_blank" rel="noopener" className="font-semibold text-indigo hover:text-cochineal hover:underline">{p.alt}</a>
              <span className="block text-stone-dark">Photo by {p.photographer} on Unsplash</span>
            </li>
          ))}
        </ul>
        <p className="mt-10 text-sm text-stone-dark">Team portraits are illustrated placeholders until real photos of the team are added.</p>
      </section>
    </>
  );
}
