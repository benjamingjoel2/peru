import { PageHero } from "@/components/sections/PageHero";
import { FaqList } from "@/components/sections/FaqList";
import { CtaBand } from "@/components/sections/HomeSections";
import { faqs } from "@/data/faqs";
import type { Faq } from "@/data/types";
import { JsonLd, faqLd, pageMeta } from "@/lib/seo";
import { t, L } from "@/lib/i18n";
import { initLocale } from "@/lib/i18n/server";

export async function generateMetadata() {
  await initLocale();
  return pageMeta({
    title: t("Questions travellers ask about Peru"),
    description: t("Altitude sickness, Machu Picchu tickets, Inca Trail permits, the best time to visit, entry requirements, health, safety, money, tipping, children and costs."),
    path: "/faq",
  });
}

const groups: { id: Faq["category"]; label: string }[] = L([
  { id: "health", label: "Health & altitude" },
  { id: "machu-picchu", label: "Machu Picchu & the Inca Trail" },
  { id: "planning", label: "Planning" },
  { id: "practical", label: "Practical" },
  { id: "booking", label: "Booking" },
]);

export default async function FaqPage() {
  await initLocale();
  return (
    <>
      <PageHero crumbs={[{ name: t("FAQ"), path: "/faq" }]} eyebrow={t("FAQ")} title={t("Questions travellers *ask*")} intro={t("Straight answers to what people ask us most. Anything marked verify changes often: check official sources, and we'll confirm the latest.")} />
      <div className="container-x space-y-14 py-14">
        {groups.map((g) => (
          <section key={g.id} aria-labelledby={`faq-${g.id}`} className="grid gap-6 lg:grid-cols-[1fr_2fr]">
            <h2 id={`faq-${g.id}`} className="font-display text-2xl text-indigo">{g.label}</h2>
            <FaqList faqs={faqs.filter((f) => f.category === g.id)} />
          </section>
        ))}
      </div>
      <CtaBand title={t("Still *wondering*?")} text={t("Ask us anything. Your Peru Specialist answers in Lima time.")} />
      <JsonLd data={faqLd(faqs)} />
    </>
  );
}
