import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getStories, getStory } from "@/lib/stories";
import { journeyBySlug } from "@/data/journeys";
import { JourneyGrid } from "@/components/sections/Blocks";
import { CtaBand } from "@/components/sections/HomeSections";
import { StoryCard } from "@/components/sections/Cards";
import { stoneShapes } from "@/components/ui/StoneMask";
import { JsonLd, breadcrumbLd, pageMeta } from "@/lib/seo";
import { site } from "@/config/site";
import type { Journey } from "@/data/types";

export const dynamicParams = false;
export const generateStaticParams = () => getStories().map((s) => ({ slug: s.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getStory(slug);
  if (!s) return {};
  return { ...pageMeta({ title: s.meta.title, description: s.meta.excerpt, path: `/stories/${slug}`, image: s.meta.image }), openGraph: { type: "article", title: s.meta.title, description: s.meta.excerpt, publishedTime: s.meta.date } };
}

const components = {
  Callout: ({ children }: { children: React.ReactNode }) => (
    <aside role="note" className="not-prose my-6 border-l-4 border-cochineal bg-cochineal/5 px-5 py-4 text-base text-ink">{children}</aside>
  ),
  a: ({ href = "", children }: { href?: string; children: React.ReactNode }) =>
    href.startsWith("/") ? <Link href={href}>{children}</Link> : <a href={href} target="_blank" rel="noopener">{children}</a>,
  table: ({ children }: { children: React.ReactNode }) => <div className="overflow-x-auto"><table>{children}</table></div>,
};

export default async function StoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const story = getStory(slug);
  if (!story) notFound();
  const { meta, content } = story;
  const related = meta.related.map(journeyBySlug).filter(Boolean) as Journey[];
  const more = getStories().filter((s) => s.slug !== slug).slice(0, 3);
  const headings = [...content.matchAll(/^## (.+)$/gm)].map((m) => m[1]);

  return (
    <>
      <article>
        <header className="container-x max-w-4xl py-12 text-center">
          <nav aria-label="Breadcrumb" className="mb-5 text-sm text-stone-dark">
            <Link href="/" className="hover:text-cochineal">Home</Link> / <Link href="/stories" className="hover:text-cochineal">Stories</Link>
          </nav>
          <p className="eyebrow text-cochineal">{meta.category}</p>
          <h1 className="mt-3 text-4xl text-indigo sm:text-5xl">{meta.title}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-stone-dark">{meta.excerpt}</p>
          <p className="mt-4 text-sm text-stone-dark">
            <time dateTime={meta.date}>{new Date(meta.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</time> · {meta.readingMinutes} min read
          </p>
        </header>
        <div className="container-x max-w-5xl">
          <div className="relative aspect-[16/8] overflow-hidden" style={{ clipPath: stoneShapes[2] }}>
            <Image src={meta.image} alt={meta.imageAlt} fill priority sizes="(min-width:1024px) 70vw, 100vw" className="object-cover" />
          </div>
        </div>
        <div className="container-x grid max-w-5xl grid-cols-1 gap-10 py-12 lg:grid-cols-[minmax(0,1fr)_220px] [&>*]:min-w-0">
          <div className="prose-peru max-w-none text-[1.08rem]">
            <MDXRemote source={content} components={components} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
          </div>
          {headings.length > 0 && (
            <nav aria-label="In this story" className="hidden lg:block">
              <div className="sticky top-28">
                <p className="eyebrow text-stone-dark">In this story</p>
                <ul className="mt-3 space-y-2 border-l-2 border-stone-light pl-4 text-sm">
                  {headings.map((h) => <li key={h} className="text-indigo">{h}</li>)}
                </ul>
              </div>
            </nav>
          )}
        </div>
      </article>
      <JourneyGrid list={related} title="Journeys for this *story*" />
      <section className="border-t border-stone-light py-16">
        <div className="container-x">
          <h2 className="text-3xl text-indigo">More <em className="text-cochineal">stories</em></h2>
          <div className="mt-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">{more.map((s) => <StoryCard key={s.slug} s={s} />)}</div>
        </div>
      </section>
      <CtaBand />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: meta.title,
          description: meta.excerpt,
          datePublished: meta.date,
          image: `${site.url}${meta.image}`,
          author: { "@type": "Organization", name: site.name },
          publisher: { "@type": "Organization", name: site.name },
          mainEntityOfPage: `${site.url}/stories/${slug}`,
        }}
      />
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, { name: "Stories", path: "/stories" }, { name: meta.title, path: `/stories/${slug}` }])} />
    </>
  );
}
