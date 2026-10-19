import { LinkButton } from "@/components/ui/Button";
import { Emph } from "@/components/ui/Heading";

export default function NotFound() {
  return (
    <section className="container-x py-24 text-center">
      <p className="eyebrow text-stone-dark">404</p>
      <h1 className="mt-3 text-4xl text-indigo sm:text-5xl"><Emph text="This trail *doesn't go* anywhere" /></h1>
      <p className="mx-auto mt-4 max-w-xl text-stone-dark">The page you&apos;re looking for has moved or never existed. Let&apos;s get you back on the path.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <LinkButton href="/">Home</LinkButton>
        <LinkButton href="/journeys" variant="ghost">Journeys</LinkButton>
      </div>
    </section>
  );
}
