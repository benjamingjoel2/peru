import { PageHero } from "@/components/sections/PageHero";
import { photo } from "@/data/photos";
import { EnquiryForm } from "@/components/enquire/EnquiryForm";
import { BudgetPoints } from "@/components/enquire/BudgetPanel";
import { site } from "@/config/site";
import { pageMeta } from "@/lib/seo";
import { t } from "@/lib/i18n";
import { initLocale } from "@/lib/i18n/server";

export async function generateMetadata() {
  await initLocale();
  return pageMeta({
    title: t("Contact us"),
    description: t("Write to a Peru Specialist or send an enquiry. We're based in Lima and reply in Lima office hours."),
    path: "/contact",
  });
}

export default async function ContactPage() {
  await initLocale();
  const c = site.contact;
  return (
    <>
      <PageHero
        image={photo("sacsayhuaman")} crumbs={[{ name: t("Contact"), path: "/contact" }]} eyebrow={t("Contact us")} title={t("Let's *talk* Peru")} intro={t("Write to us or send an enquiry. We're in Lima, so we answer in Lima time.")} />
      <section className="container-x grid gap-12 py-14 lg:grid-cols-[1fr_1.6fr]">
        <aside className="space-y-8">
          <div>
            <h2 className="font-display text-2xl text-indigo">{t("Get in touch")}</h2>
            <ul className="mt-4 space-y-3">
              <li><span className="eyebrow block text-stone-dark">{t("Email")}</span><a href={`mailto:${c.email}`} className="text-lg font-semibold text-indigo hover:text-cochineal">{c.email}</a></li>
              <li><span className="eyebrow block text-stone-dark">{t("Office hours")}</span><span className="text-lg">{t(c.hours)} ({t(c.timezoneLabel)})</span></li>
              <li><span className="eyebrow block text-stone-dark">{t("Office")}</span><span>{t(site.address.full)}</span></li>
            </ul>
          </div>
          <div className="bg-cream-deep/60 p-6">
            <h2 className="font-display text-xl text-indigo">{t("Before you write")}</h2>
            <div className="mt-4"><BudgetPoints /></div>
          </div>
        </aside>
        <div>
          <h2 className="font-display text-3xl text-indigo">{t("Send an")} <em>{t("enquiry")}</em></h2>
          <p className="mb-6 mt-2 text-stone-dark">{t("A few details help your Peru Specialist come back with ideas that fit.")}</p>
          <EnquiryForm />
        </div>
      </section>
    </>
  );
}
