import { Emph } from "@/components/ui/Heading";
import { StoneMask } from "@/components/ui/StoneMask";
import { photo } from "@/data/photos";
import { ArrowLink } from "@/components/ui/Button";

const values = [
  {
    name: "Pace",
    color: "bg-cochineal",
    body: "We plan around altitude, distance and permits so the trip feels easy. Sleep lower first, climb in steps, book Machu Picchu and the Inca Trail early, and never spend a whole day in transit when a short flight will do.",
  },
  {
    name: "Ayni",
    color: "bg-mustard",
    body: "In the Andes, ayni means reciprocity: what you receive, you give back. Weaving cooperatives and community homestays are paid fairly and directly, and our trek teams' porters are paid, equipped and loaded properly.",
  },
];

/** Centred section on deep green: the dedicated planner, and two values joined by a woven thread. */
export function ValuesIntro() {
  const img = photo("family");
  return (
    <section aria-labelledby="values-title" className="on-dark relative overflow-hidden bg-amazon-deep py-20 text-cream lg:py-28">
      <div className="container-x text-center">
        <p className="eyebrow text-mustard-soft">Why travel with us</p>
        <h2 id="values-title" className="mt-4 text-4xl text-cream sm:text-5xl">
          <Emph text="Your own *Peru Specialist*" />
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-cream/85">
          One person plans your trip from first call to flight home. They know which nights to spend lower down, which train to catch, when Inca Trail permits open and where to eat in every town.
        </p>
      </div>

      <div className="container-x relative mt-14 grid items-center gap-10 lg:grid-cols-[1fr_auto_1fr]">
        {/* The thread: a woven line looping through both values and the image */}
        <svg aria-hidden viewBox="0 0 1200 300" preserveAspectRatio="none" className="pointer-events-none absolute inset-x-0 top-1/2 hidden h-48 w-full -translate-y-1/2 lg:block">
          <path d="M0 150 C 150 40, 300 260, 450 150 S 750 40, 900 150 S 1100 260, 1200 140" fill="none" stroke="var(--color-mustard)" strokeWidth="3" strokeDasharray="14 8" opacity=".7" />
          <path d="M0 160 C 150 50, 300 270, 450 160 S 750 50, 900 160 S 1100 270, 1200 150" fill="none" stroke="var(--color-cochineal)" strokeWidth="2" strokeDasharray="4 10" opacity=".8" />
        </svg>
        {values.map((v, i) => (
          <div key={v.name} className={`relative z-10 max-w-md bg-amazon-deep/90 p-2 text-center lg:text-left ${i === 0 ? "lg:order-1 lg:justify-self-end" : "lg:order-3"}`}>
            <div className={`flex items-center justify-center gap-3 ${i === 0 ? "lg:justify-end lg:text-right" : "lg:justify-start"}`}>
              <span aria-hidden className={`inline-block h-10 w-12 ${v.color}`} style={{ clipPath: i ? "polygon(8% 0,100% 6%,94% 100%,0 92%)" : "polygon(0 8%,92% 0,100% 90%,6% 100%)" }} />
              <h3 className="font-display text-4xl italic text-cream">{v.name}</h3>
            </div>
            <p className={`mt-4 text-cream/85 ${i === 0 ? "lg:text-right" : ""}`}>{v.body}</p>
          </div>
        ))}
        <StoneMask src={img.src} alt={img.alt} shape={4} className="relative z-10 mx-auto aspect-[4/5] w-64 lg:order-2 lg:w-72" sizes="300px" />
      </div>

      <div className="container-x mt-14 flex flex-wrap justify-center gap-8">
        <ArrowLink href="/about/our-team">Meet your specialists</ArrowLink>
        <ArrowLink href="/travel-that-gives-back">Travel that gives back</ArrowLink>
      </div>
    </section>
  );
}
