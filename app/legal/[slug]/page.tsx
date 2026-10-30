import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/PageHero";
import { legalPages } from "@/data/legal";
import { pageMeta } from "@/lib/seo";

export const dynamicParams = false;
export const generateStaticParams = () => Object.keys(legalPages).map((slug) => ({ slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = legalPages[slug];
  return p ? pageMeta({ title: p.title, description: p.description, path: `/legal/${slug}` }) : {};
}

export default async function LegalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = legalPages[slug];
  if (!p) notFound();
  return (
    <>
      <PageHero crumbs={[{ name: p.title, path: `/legal/${slug}` }]} title={p.title} intro={p.intro} />
      <section className="container-x max-w-3xl space-y-8 py-14">
        <p className="text-sm text-stone-dark">Last updated: {p.updated}</p>
        {p.sections.map((s) => (
          <div key={s.h}>
            <h2 className="font-display text-2xl text-indigo">{s.h}</h2>
            {s.p.map((para) => (
              <p key={para} className="mt-2 text-stone-dark">{para}</p>
            ))}
          </div>
        ))}
      </section>
    </>
  );
}
