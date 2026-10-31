import { LinkButton } from "@/components/ui/Button";
import { Emph } from "@/components/ui/Heading";
import { initLocale } from "@/lib/i18n/server";
import { t } from "@/lib/i18n";

export default async function NotFound() {
  await initLocale();
  return (
    <section className="container-x py-24 text-center">
      <p className="eyebrow text-stone-dark">404</p>
      <h1 className="mt-3 text-4xl text-indigo sm:text-5xl"><Emph text={t("This trail *doesn't go* anywhere")} /></h1>
      <p className="mx-auto mt-4 max-w-xl text-stone-dark">{t("The page you're looking for has moved or never existed. Let's get you back on the path.")}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <LinkButton href="/">{t("Home")}</LinkButton>
        <LinkButton href="/journeys" variant="ghost">{t("Journeys")}</LinkButton>
      </div>
    </section>
  );
}
