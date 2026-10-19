import Image from "next/image";
import Link from "next/link";
import { Emph } from "@/components/ui/Heading";
import { stoneShapes } from "@/components/ui/StoneMask";
import { JsonLd, breadcrumbLd } from "@/lib/seo";

type Crumb = { name: string; path: string };

/** Inner-page hero: breadcrumb, italic-emphasis H1, intro, optional stone-masked image. */
export function PageHero({
  title,
  intro,
  eyebrow,
  image,
  crumbs = [],
  children,
}: {
  title: string;
  intro?: string;
  eyebrow?: string;
  image?: { src: string; alt: string };
  crumbs?: Crumb[];
  children?: React.ReactNode;
}) {
  const all = [{ name: "Home", path: "/" }, ...crumbs];
  return (
    <section className="relative overflow-hidden border-b border-stone-light">
      <div className={`container-x grid items-center gap-10 py-12 lg:py-16 ${image ? "lg:grid-cols-[1.1fr_1fr]" : ""}`}>
        <div>
          {crumbs.length > 0 && (
            <nav aria-label="Breadcrumb" className="mb-5 text-sm">
              <ol className="flex flex-wrap items-center gap-1.5 text-stone-dark">
                {all.map((c, i) => (
                  <li key={c.path} className="flex items-center gap-1.5">
                    {i > 0 && <span aria-hidden>/</span>}
                    {i < all.length - 1 ? (
                      <Link href={c.path} className="hover:text-cochineal hover:underline">{c.name}</Link>
                    ) : (
                      <span aria-current="page" className="font-semibold text-indigo">{c.name}</span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          )}
          {eyebrow && (
            <p className="eyebrow mb-3 flex items-center gap-3 text-stone-dark">
              <span aria-hidden className="inline-block h-[3px] w-10 woven-stripe-thin" />
              {eyebrow}
            </p>
          )}
          <h1 className="text-4xl text-indigo sm:text-5xl lg:text-6xl">
            <Emph text={title} />
          </h1>
          {intro && <p className="mt-5 max-w-2xl text-lg text-stone-dark">{intro}</p>}
          {children}
        </div>
        {image && (
          <div className="relative aspect-[4/3] overflow-hidden" style={{ clipPath: stoneShapes[title.length % stoneShapes.length] }}>
            <Image src={image.src} alt={image.alt} fill priority sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" />
          </div>
        )}
      </div>
      {crumbs.length > 0 && <JsonLd data={breadcrumbLd(all)} />}
    </section>
  );
}
