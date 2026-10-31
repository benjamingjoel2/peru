import { PageHero } from "@/components/sections/PageHero";
import { photo } from "@/data/photos";
import { EnquiryForm } from "@/components/enquire/EnquiryForm";
import { BudgetPoints } from "@/components/enquire/BudgetPanel";
import { RouteBuilder } from "@/components/altitude/RouteBuilder";
import { Heading } from "@/components/ui/Heading";
import { pageMeta } from "@/lib/seo";
import { t } from "@/lib/i18n";
import { initLocale } from "@/lib/i18n/server";
import { ClientStrings } from "@/lib/i18n/ClientStrings";
import { destinations } from "@/data/destinations";

export async function generateMetadata() {
  await initLocale();
  return pageMeta({
    title: t("Start planning your Peru trip"),
    description: t("Tell us when you'd like to go, what you'd love to see and how much hiking you fancy. Your Peru Specialist will design a private, well-paced journey."),
    path: "/start-planning",
  });
}

export default async function StartPlanningPage() {
  await initLocale();
  return (
    <>
      <PageHero
        image={photo("amazon-river")}
        crumbs={[{ name: t("Start planning"), path: "/start-planning" }]}
        eyebrow={t("Start planning")}
        title={t("Your Peru, *designed*")}
        intro={t("Tell us the shape of the trip you have in mind. We'll come back with a day-by-day plan, its altitude profile and a clear price.")}
      />
      <section className="container-x grid gap-12 py-14 lg:grid-cols-[1.6fr_1fr]">
        <div>
          <EnquiryForm />
        </div>
        <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
          <div className="bg-cream-deep/60 p-6">
            <h2 className="font-display text-xl text-indigo">{t("What to expect")}</h2>
            <div className="mt-4"><BudgetPoints /></div>
          </div>
          <div className="bg-indigo p-6 text-cream">
            <h2 className="font-display text-xl">{t("Our promise")}</h2>
            <p className="mt-2 text-sm text-cream/85">{t("No obligation, no hard sell. We'll tell you honestly what works, what doesn't, and when to go.")}</p>
          </div>
        </aside>
      </section>
      <section id="route-builder" aria-labelledby="sp-builder" className="scroll-mt-28 border-t border-stone-light bg-cream-deep/40 py-16">
        <div className="container-x">
          <Heading id="sp-builder" eyebrow={t("Optional")} text={t("Sketch your route by *altitude*")} size="md" />
          <p className="mt-3 max-w-2xl text-stone-dark">{t("Already have stops in mind? Try them here and see how the trip climbs. Mention it in your notes and we'll check it.")}</p>
          <div className="mt-8"><ClientStrings data={[destinations]}><RouteBuilder /></ClientStrings></div>
        </div>
      </section>
    </>
  );
}
