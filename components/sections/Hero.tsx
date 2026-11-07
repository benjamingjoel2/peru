import Image from "next/image";
import Link from "@/components/i18n/Link";
import { t, L } from "@/lib/i18n";

const tiles = L([
  { src: "/photos/machu-picchu.jpg", alt: "Machu Picchu among misty mountains" },
  { src: "/photos/uros-boat.jpg", alt: "A reed boat at the Uros floating islands on Lake Titicaca" },
  { src: "/photos/macaws-flock.jpg", alt: "Scarlet macaws in the Amazon canopy" },
]);

/** Mosaic hero: the headline on the left, three photos from three parts of Peru on the right. */
export function Hero() {
  const [main, ...side] = tiles;
  return (
    <section aria-label={t("Peru, done right")} className="bg-cream">
      <div className="container-x grid items-end gap-8 py-10 sm:py-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14 lg:py-16">
        <div className="lg:pb-4">
          <p className="eyebrow text-cochineal">{t("Private journeys, paced for altitude")}</p>
          <p className="mt-4 font-display text-[clamp(2.5rem,5vw,4.25rem)] font-light leading-[1.02] text-indigo">
            {t("Peru,")} <em>{t("done right.")}</em>
          </p>
          <Link
            href="/start-planning"
            className="mt-8 inline-flex min-h-12 items-center rounded-full bg-cochineal px-8 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-cream hover:bg-cochineal-dark"
          >
            {t("Start planning")}
          </Link>
        </div>
        <div className="grid h-[min(64vh,620px)] min-h-[360px] grid-cols-[3fr_2fr] grid-rows-2 gap-3 sm:gap-4">
          <div className="relative row-span-2 overflow-hidden">
            <Image src={main.src} alt={main.alt} fill priority sizes="(min-width:1024px) 34vw, 60vw" className="object-cover" />
          </div>
          {side.map((s) => (
            <div key={s.src} className="relative overflow-hidden">
              <Image src={s.src} alt={s.alt} fill sizes="(min-width:1024px) 23vw, 40vw" className="object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
