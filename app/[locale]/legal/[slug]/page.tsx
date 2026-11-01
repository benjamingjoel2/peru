import { notFound } from "next/navigation";
import Link from "@/components/i18n/Link";
import { PageHero } from "@/components/sections/PageHero";
import { legalPages } from "@/data/legal";
import { pageMeta } from "@/lib/seo";
import { t } from "@/lib/i18n";
import { initLocale } from "@/lib/i18n/server";

/** Renders [label](/path) links inside a legal paragraph. */
function RichText({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return (
    <>
      {parts.map((part, i) => {
        const m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        return m ? (
          <Link key={i} href={m[2]} className="underline underline-offset-2 hover:text-indigo">
            {m[1]}
          </Link>
        ) : (
          part
        );
      })}
    </>
  );
}

export const dynamicParams = false;
export const generateStaticParams = () => Object.keys(legalPages).map((slug) => ({ slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  await initLocale();
  const { slug } = await params;
  const p = legalPages[slug];
  return p ? pageMeta({ title: p.title, description: p.description, path: `/legal/${slug}` }) : {};
}

export default async function LegalPage({ params }: { params: Promise<{ slug: string }> }) {
  await initLocale();
  const { slug } = await params;
  const p = legalPages[slug];
  if (!p) notFound();
  return (
    <>
      <PageHero crumbs={[{ name: p.title, path: `/legal/${slug}` }]} title={p.title} intro={p.intro} />
      <section className="container-x max-w-3xl space-y-8 py-14">
        <p className="text-sm text-stone-dark">{t("Last updated:")} {p.updated}</p>
        {p.sections.map((s) => (
          <div key={s.h}>
            <h2 className="font-display text-2xl text-indigo">{s.h}</h2>
            {s.p.map((para) => (
              <p key={para} className="mt-2 text-stone-dark"><RichText text={para} /></p>
            ))}
            {s.table && (
              <div className="mt-4 overflow-x-auto">
                <table className="w-full border-collapse text-left text-sm">
                  <thead>
                    <tr>
                      {s.table.head.map((c) => (
                        <th key={c} scope="col" className="border-b border-stone/40 py-2 pr-4 align-bottom font-semibold text-indigo">
                          {c}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {s.table.rows.map((r) => (
                      <tr key={r.join("|")}>
                        {r.map((c, i) => (
                          <td key={i} className="border-b border-stone/20 py-2 pr-4 align-top text-stone-dark">
                            {c}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {s.after?.map((para) => (
              <p key={para} className="mt-2 text-stone-dark"><RichText text={para} /></p>
            ))}
          </div>
        ))}
      </section>
    </>
  );
}
