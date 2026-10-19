import { Heading } from "@/components/ui/Heading";
import { StoneMask } from "@/components/ui/StoneMask";
import { ArrowLink } from "@/components/ui/Button";
import { PlaceholderBadge } from "@/components/ui/Badges";

const values = [
  {
    name: "Pace",
    color: "bg-cochineal",
    body: "We plan around altitude, distance and permits so the trip feels easy. Sleep lower first, climb in steps, book Machu Picchu and the Inca Trail early, and never spend a whole day in transit when a short flight will do.",
  },
  {
    name: "Ayni",
    color: "bg-amazon",
    body: "In the Andes, ayni means reciprocity: what you receive, you give back. We travel that way, with weaving cooperatives and community homestays paid fairly and directly, and trek teams whose porters are paid, equipped and loaded properly.",
  },
];

export function ValuesIntro() {
  return (
    <section aria-labelledby="values-title" className="bg-cream-deep py-20 lg:py-28">
      <div className="container-x grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <Heading id="values-title" eyebrow="Why travel with us" text="Your own *Peru Specialist*" />
          <p className="mt-5 max-w-2xl text-lg text-stone-dark">
            One person plans your trip from first call to flight home. They know which nights to spend lower down, which train to catch, when Inca Trail permits open and where to eat in every town. Two values shape everything they do.
          </p>
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            {values.map((v, i) => (
              <div key={v.name}>
                <div className="flex items-center gap-3">
                  <span aria-hidden className={`inline-block h-10 w-12 ${v.color}`} style={{ clipPath: i ? "polygon(8% 0,100% 6%,94% 100%,0 92%)" : "polygon(0 8%,92% 0,100% 90%,6% 100%)" }} />
                  <h3 className="font-display text-3xl italic text-indigo">{v.name}</h3>
                </div>
                <p className="mt-3 text-stone-dark">{v.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-6">
            <ArrowLink href="/about/our-team">Meet your specialists</ArrowLink>
            <ArrowLink href="/travel-that-gives-back">Travel that gives back</ArrowLink>
          </div>
        </div>
        <div className="relative">
          <StoneMask src="/images/team/values-specialist.svg" alt="Placeholder portrait of a Peru Specialist" shape={4} className="aspect-[4/5] w-full max-w-md lg:ml-auto" />
          <div className="absolute bottom-6 left-0 max-w-[16rem] bg-indigo p-5 text-cream shadow-xl lg:left-6">
            <p className="font-display text-lg italic">&ldquo;Start lower, finish higher. Your lungs will thank you.&rdquo;</p>
            <p className="mt-2 text-xs uppercase tracking-wider text-mustard-soft">Peru Specialist</p>
            <PlaceholderBadge className="mt-2 border-mustard text-mustard" />
          </div>
        </div>
      </div>
    </section>
  );
}
