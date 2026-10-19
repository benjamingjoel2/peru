import type { Faq } from "@/data/types";
import { Accordion } from "@/components/ui/Accordion";

export function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <Accordion
      items={faqs.map((f) => ({
        id: f.id,
        title: f.q,
        content: (
          <div className="space-y-3">
            {f.a.map((p, i) => <p key={i}>{p}</p>)}
            {f.verify && <p className="rounded-sm bg-mustard/20 px-3 py-2 text-sm font-semibold text-indigo">Verify: {f.verify}</p>}
          </div>
        ),
      }))}
    />
  );
}
