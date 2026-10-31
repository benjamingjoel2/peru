"use client";

import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { journeys } from "@/data/journeys";
import { otherCountries, priorityCountries } from "@/data/countries";
import { Emph, plain } from "@/components/ui/Heading";
import { t } from "@/lib/i18n";

export function ItineraryDownloadModal({ open, journey, onClose }: { open: boolean; journey: string; onClose: () => void }) {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [href, setHref] = useState<string | null>(null);
  const j = journeys.find((x) => x.slug === journey);

  // eslint-disable-next-line react-hooks/set-state-in-effect -- reset when reopened
  useEffect(() => { if (open) { setState("idle"); setHref(null); } }, [open, journey]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    setState("sending");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...data, journey, source: "itinerary-download" }),
      });
      if (!res.ok) throw new Error();
      const body = await res.json();
      setHref(body.downloadUrl);
      setState("done");
      // Start the download straight away
      const a = document.createElement("a");
      a.href = body.downloadUrl;
      a.download = `${journey}-itinerary.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch {
      setState("error");
    }
  }

  const input = "min-h-11 w-full rounded-[3px] border-2 border-stone-light bg-cream px-3 text-ink focus:border-indigo";

  return (
    <Modal open={open} onClose={onClose} labelledBy="download-title" className="max-w-xl">
      <div className="p-5 sm:p-8">
        <h2 id="download-title" className="pr-10 text-3xl text-indigo">
          <Emph text={t("Download the *itinerary*")} />
        </h2>
        <p className="mt-2 text-stone-dark">
          {j ? <><strong>{t("{n} days: {title}", { n: j.days, title: plain(j.title) })}</strong>. </> : null}
          {t("The PDF includes the day-by-day plan and the altitude profile for every night. Fill in your details to download it.")}
        </p>
        {state === "done" ? (
          <div role="status" className="mt-6 rounded-sm bg-amazon/10 p-5">
            <p className="font-display text-xl text-indigo">{t("Gracias. Your download should start now.")}</p>
            {href && (
              <a href={href} download className="mt-3 inline-block font-bold text-cochineal underline">
                {t("Download didn't start? Click here.")}
              </a>
            )}
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
            <div>
              <label htmlFor="dl-name" className="mb-1 block text-sm font-bold text-stone-dark">{t("Name")}</label>
              <input id="dl-name" name="name" required autoComplete="name" className={input} />
            </div>
            <div>
              <label htmlFor="dl-email" className="mb-1 block text-sm font-bold text-stone-dark">{t("Email")}</label>
              <input id="dl-email" name="email" type="email" required autoComplete="email" className={input} />
            </div>
            <div>
              <label htmlFor="dl-country" className="mb-1 block text-sm font-bold text-stone-dark">{t("Country of residence")}</label>
              <select id="dl-country" name="country" required defaultValue="" className={input}>
                <option value="" disabled>{t("Choose a country")}</option>
                {priorityCountries.map((c) => <option key={c}>{c}</option>)}
                <option disabled>──────────</option>
                {otherCountries.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <label className="flex items-start gap-2 text-sm text-stone-dark">
              <input type="checkbox" name="newsletter" className="mt-1 h-4 w-4 accent-cochineal" />
              {t("Send me the monthly Peru letter too (optional)")}
            </label>
            {state === "error" && <p role="alert" className="text-sm font-semibold text-cochineal">{t("Something went wrong. Please try again.")}</p>}
            <button type="submit" disabled={state === "sending"} className="min-h-12 w-full rounded-full bg-cochineal px-8 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-cream hover:bg-cochineal-dark disabled:opacity-60">
              {state === "sending" ? "Preparing…" : t("Download PDF")}
            </button>
          </form>
        )}
      </div>
    </Modal>
  );
}
