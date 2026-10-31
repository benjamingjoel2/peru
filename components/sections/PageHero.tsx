import Image from "next/image";
import Link from "@/components/i18n/Link";
import { Emph } from "@/components/ui/Heading";
import { JsonLd, breadcrumbLd } from "@/lib/seo";
import { t } from "@/lib/i18n";

type Crumb = { name: string; path: string };

function Breadcrumb({ all, light }: { all: Crumb[]; light?: boolean }) {
  return (
    <nav aria-label={t("Breadcrumb")} className="mb-5 text-[0.72rem] font-medium uppercase tracking-[0.16em]">
      <ol className={`flex flex-wrap items-center gap-2 ${light ? "text-cream/80" : "text-stone-dark"}`}>
        {all.map((c, i) => (
          <li key={c.path} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden>/</span>}
            {i < all.length - 1 ? (
              <Link href={c.path} className={light ? "hover:text-cream" : "hover:text-indigo"}>{c.name}</Link>
            ) : (
              <span aria-current="page" className={light ? "text-cream" : "text-indigo"}>{c.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/**
 * Inner-page hero. With an image: a full-width photo banner with the title over it, then a centred
 * intro. Without: a centred title block. Mirrors the homepage's banner + intro rhythm.
 */
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
  const all = [{ name: t("Home"), path: "/" }, ...crumbs];
  return (
    <>
      {image ? (
        <section className="on-dark relative h-[62vh] min-h-[420px] overflow-hidden bg-indigo-deep lg:h-[72vh]">
          <Image src={image.src} alt={image.alt} fill loading="eager" fetchPriority="high" sizes="100vw" className="object-cover" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-indigo-deep/85 via-indigo-deep/20 to-indigo-deep/10" />
          <div className="container-x absolute inset-x-0 bottom-0 pb-10 sm:pb-14">
            {crumbs.length > 0 && <Breadcrumb all={all} light />}
            {eyebrow && <p className="eyebrow mb-3 text-cream/85">{eyebrow}</p>}
            <h1 className="max-w-5xl text-5xl text-cream sm:text-6xl lg:text-7xl">
              <Emph text={title} />
            </h1>
          </div>
        </section>
      ) : (
        <section className="border-b border-stone-light bg-cream-deep">
          <div className="container-x py-16 text-center lg:py-24">
            {crumbs.length > 0 && (
              <div className="flex justify-center">
                <Breadcrumb all={all} />
              </div>
            )}
            {eyebrow && <p className="eyebrow mb-3 text-stone-dark">{eyebrow}</p>}
            <h1 className="mx-auto max-w-4xl text-4xl text-indigo sm:text-5xl lg:text-6xl">
              <Emph text={title} />
            </h1>
            {intro && <p className="mx-auto mt-6 max-w-2xl text-lg text-stone-dark">{intro}</p>}
            {children && <div className="flex flex-col items-center">{children}</div>}
          </div>
        </section>
      )}
      {image && (intro || children) && (
        <section className="border-b border-stone-light">
          <div className="container-x py-14 text-center lg:py-20">
            {intro && <p className="mx-auto max-w-3xl font-display text-2xl font-light leading-snug text-indigo sm:text-3xl">{intro}</p>}
            {children && <div className="flex flex-col items-center">{children}</div>}
          </div>
        </section>
      )}
      {crumbs.length > 0 && <JsonLd data={breadcrumbLd(all)} />}
    </>
  );
}
