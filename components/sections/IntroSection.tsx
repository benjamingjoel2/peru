import { Emph } from "@/components/ui/Heading";
import { StoneMask } from "@/components/ui/StoneMask";
import { LinkButton } from "@/components/ui/Button";
import { PlaceholderBadge } from "@/components/ui/Badges";
import { photo } from "@/data/photos";
import { press } from "@/config/media";

/** Left: eyebrow, H1, intro and a row of recognition badges. Right: a tall image. */
export function IntroSection() {
  const img = photo("ollantaytambo");
  return (
    <section aria-labelledby="intro-title" className="py-20 lg:py-28">
      <div className="container-x grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <p className="eyebrow flex items-center gap-3 text-stone-dark">
            <span aria-hidden className="inline-block h-[3px] w-10 woven-stripe-thin" />
            Every trip is private and planned around you
          </p>
          <h1 id="intro-title" className="mt-5 text-4xl text-indigo sm:text-5xl lg:text-6xl">
            <Emph text="Private Peru journeys, *done right*" />
          </h1>
          <div className="mt-6 max-w-xl space-y-4 text-lg text-stone-dark">
            <p>
              Peru is three countries in one: a desert coast, the high Andes and the Amazon. It has Machu Picchu, Lake Titicaca, the Nazca Lines and one of the best food scenes on Earth.
            </p>
            <p>
              It also has altitude, permits that sell out and distances that surprise people. We plan around all three, so you spend your time amazed, not out of breath or out of tickets.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <LinkButton href="/journeys">Explore journeys</LinkButton>
            <LinkButton href="/start-planning" variant="ghost">Start planning</LinkButton>
          </div>
          <ul className="mt-12 flex flex-wrap items-center gap-3" aria-label="Recognition">
            {press.items.slice(0, 4).map((p) => (
              <li key={p.name} className="grid h-14 w-28 place-items-center border-2 border-dashed border-stone-light px-2 text-center text-[0.6rem] font-bold uppercase tracking-wider text-stone-dark">
                {p.name.replace(" placeholder", "")}
              </li>
            ))}
            {press.isPlaceholder && <li><PlaceholderBadge label="Placeholder badges" /></li>}
          </ul>
        </div>
        <StoneMask src={img.src} alt={img.alt} shape={2} className="aspect-[4/5] w-full lg:max-w-lg lg:justify-self-end" sizes="(min-width:1024px) 40vw, 100vw" />
      </div>
    </section>
  );
}
