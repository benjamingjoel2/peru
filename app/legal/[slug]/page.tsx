import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/PageHero";
import { PlaceholderBadge } from "@/components/ui/Badges";
import { site } from "@/config/site";
import { pageMeta } from "@/lib/seo";

const pages: Record<string, { title: string; sections: { h: string; p: string }[] }> = {
  privacy: {
    title: "Privacy policy",
    sections: [
      { h: "Who we are", p: `${site.company.legalName}, ${site.company.address}.` },
      { h: "What we collect", p: "The details you give us in enquiry, download and newsletter forms: name, email, phone, country, travel preferences and anything you write in your notes." },
      { h: "How we use it", p: "To reply to your enquiry, plan and book your trip, send the itinerary you asked for and, if you opt in, our newsletter." },
      { h: "Who we share it with", p: "Only the suppliers needed to deliver your trip (hotels, guides, transport, ticketing authorities) and our CRM and email providers." },
      { h: "Your rights", p: "You can ask to see, correct or delete your data at any time by emailing us." },
    ],
  },
  terms: {
    title: "Terms & booking conditions",
    sections: [
      { h: "Booking and deposits", p: "[Placeholder] Deposit amount, payment schedule and how bookings are confirmed." },
      { h: "Permits and tickets", p: "[Placeholder] Machu Picchu tickets and Inca Trail permits are named, limited and usually non-refundable once purchased." },
      { h: "Changes and cancellations", p: "[Placeholder] Cancellation charges by notice period, and changes by you or by us." },
      { h: "Insurance", p: "[Placeholder] Comprehensive travel insurance including medical evacuation is required." },
      { h: "Licences", p: `${site.company.tourismRegistration}. ${site.company.incaTrailPartner}.` },
    ],
  },
  cookies: {
    title: "Cookies",
    sections: [
      { h: "What we use", p: "We store your currency preference in your browser. We don't use advertising cookies. [Placeholder: add analytics details if introduced.]" },
    ],
  },
};

export const dynamicParams = false;
export const generateStaticParams = () => Object.keys(pages).map((slug) => ({ slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = pages[slug];
  return p ? { ...pageMeta({ title: p.title, description: `${p.title} for ${site.name}.`, path: `/legal/${slug}` }), robots: { index: false } } : {};
}

export default async function LegalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = pages[slug];
  if (!p) notFound();
  return (
    <>
      <PageHero crumbs={[{ name: p.title, path: `/legal/${slug}` }]} title={p.title}>
        <PlaceholderBadge className="mt-5" label="Placeholder legal text, to be reviewed by a lawyer" />
      </PageHero>
      <section className="container-x max-w-3xl space-y-8 py-14">
        {p.sections.map((s) => (
          <div key={s.h}>
            <h2 className="font-display text-2xl text-indigo">{s.h}</h2>
            <p className="mt-2 text-stone-dark">{s.p}</p>
          </div>
        ))}
      </section>
    </>
  );
}
