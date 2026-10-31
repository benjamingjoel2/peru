"use client";

import Link from "@/components/i18n/Link";
import { useId, useState } from "react";
import { MONTHS, type Month } from "@/data/types";
import { monthNames, seasonByMonth } from "@/data/seasons";
import { journeys } from "@/data/journeys";
import { otherCountries, priorityCountries } from "@/data/countries";
import { plain } from "@/components/ui/Heading";
import { t, L } from "@/lib/i18n";

// Values stay in English (they go to the enquiry API); mustSeeLabel() gives the visible label.
const mustSees = ["Machu Picchu", "The Amazon", "Lake Titicaca", "The Nazca Lines", "The north"];
const mustSeeLabel = (m: string) => ({ "Machu Picchu": t("Machu Picchu"), "The Amazon": t("The Amazon"), "Lake Titicaca": t("Lake Titicaca"), "The Nazca Lines": t("The Nazca Lines"), "The north": t("The north") })[m] ?? m;
const hikingLevels = L([
  { v: "none", l: "None", d: "Sightseeing on foot only" },
  { v: "easy", l: "Easy", d: "A few hours, gentle paths" },
  { v: "moderate", l: "Moderate", d: "Full-day hikes" },
  { v: "challenging", l: "Challenging", d: "Multi-day treks, high passes" },
]);
const mpRoutes = L([
  { v: "train", l: "By train" },
  { v: "classic-inca-trail", l: "Classic Inca Trail (4 days)" },
  { v: "short-inca-trail", l: "Short Inca Trail (1 day)" },
  { v: "salkantay", l: "Salkantay trek" },
  { v: "unsure", l: "Not sure yet" },
  { v: "not-visiting", l: "Not visiting Machu Picchu" },
]);
const interests = ["Food & drink", "Culture & history", "Wildlife", "Hiking", "Photography", "Festivals", "Community visits", "Relaxing", "Luxury stays"];
// Interest labels, listed so they reach the translation files
const interestLabels = L({ "Food & drink": "Food & drink", "Culture & history": "Culture & history", Wildlife: "Wildlife", Hiking: "Hiking", Photography: "Photography", Festivals: "Festivals", "Community visits": "Community visits", Relaxing: "Relaxing", "Luxury stays": "Luxury stays", Email: "Email", Phone: "Phone" } as Record<string, string>);

const fieldset = "rounded-sm border border-stone-light bg-cream-deep/40 p-4 sm:p-5";
const legend = "px-1 font-display text-lg font-semibold text-indigo";
const label = "mb-1 block text-sm font-bold text-stone-dark";
const input = "min-h-11 w-full rounded-[3px] border-2 border-stone-light bg-cream px-3 text-ink focus:border-indigo";
const pill =
  "cursor-pointer select-none rounded-full border-2 border-stone-light bg-cream px-3.5 py-1.5 text-sm font-semibold text-indigo has-[:checked]:border-indigo has-[:checked]:bg-indigo has-[:checked]:text-cream has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-mustard";

/** Full enquiry form. `compact` drops the interests step for inline use on the homepage. */
export function EnquiryForm({ journey, onDone, budgetConfirmed = false, compact = false }: { journey?: string; onDone?: () => void; budgetConfirmed?: boolean; compact?: boolean }) {
  const id = useId();
  const [month, setMonth] = useState<Month | "">("");
  const [children, setChildren] = useState(0);
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [errors, setErrors] = useState<string[]>([]);

  const season = month ? seasonByMonth[month] : null;
  const now = new Date();
  const years = [now.getFullYear(), now.getFullYear() + 1, now.getFullYear() + 2];

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      journey: fd.get("journey") || undefined,
      budgetConfirmed: fd.get("budgetConfirmed") === "on" || budgetConfirmed,
      month: fd.get("month"),
      year: fd.get("year"),
      days: Number(fd.get("days")),
      experience: fd.get("experience") ?? undefined,
      mustSees: fd.getAll("mustSees"),
      hiking: fd.get("hiking") ?? undefined,
      machuPicchuRoute: fd.get("mpRoute") ?? undefined,
      interests: fd.getAll("interests"),
      adults: Number(fd.get("adults")),
      childrenAges: fd.getAll("childAge").map(Number),
      country: fd.get("country"),
      name: fd.get("name"),
      email: fd.get("email"),
      phone: fd.get("phone"),
      preferredContact: fd.get("contact"),
      notes: fd.get("notes"),
      company: fd.get("company"),
    };
    setState("sending");
    setErrors([]);
    try {
      const res = await fetch("/api/enquiry", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload) });
      if (res.ok) {
        setState("done");
        onDone?.();
      } else {
        const body = await res.json().catch(() => ({}));
        setErrors(body.errors ?? ["Please check the form and try again."]);
        setState("error");
      }
    } catch {
      setErrors([t("We couldn't send your enquiry. Please check your connection and try again.")]);
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div role="status" className="py-10 text-center">
        <p className="font-display text-3xl text-indigo sm:text-4xl">
          <em>{t("Gracias.")}</em> {t("Your Peru Specialist will be in touch soon.")}
        </p>
        <p className="mx-auto mt-4 max-w-md text-stone-dark">{t("We usually reply within one working day (Lima time). Keep an eye on your inbox, including the spam folder.")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" aria-describedby={errors.length ? `${id}-errors` : undefined}>
      <input type="hidden" name="journey" value={journey ?? ""} />
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      {!budgetConfirmed && (
        <label className="flex items-start gap-3 rounded-sm border-2 border-mustard bg-mustard/10 p-4 font-semibold text-indigo">
          <input type="checkbox" name="budgetConfirmed" required className="mt-1 h-5 w-5 accent-cochineal" />
          {t("This fits what I have in mind")}
        </label>
      )}

      {journey && (
        <p className="rounded-sm bg-indigo/5 px-4 py-3 text-sm">
          {t("Enquiring about:")} <strong className="text-indigo">{plain(journeys.find((j) => j.slug === journey)?.title ?? journey)}</strong>
        </p>
      )}

      <fieldset className={fieldset}>
        <legend className={legend}>{t("Your trip")}</legend>
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label htmlFor={`${id}-month`} className={label}>{t("When (month)")}</label>
            <select id={`${id}-month`} name="month" required className={input} value={month} onChange={(e) => setMonth(e.target.value as Month)}>
              <option value="">{t("Choose a month")}</option>
              {MONTHS.map((m) => (
                <option key={m} value={m}>
                  {monthNames[m]}
                  {" · "}{seasonByMonth[m].andes === "dry" ? t("dry season") : seasonByMonth[m].andes === "wet" ? t("wet season") : t("shoulder season")}
                  {!seasonByMonth[m].incaTrailOpen ? ` · ${t("Inca Trail closed")}` : ""}
                </option>
              ))}
              <option value="flexible">{t("I'm flexible")}</option>
            </select>
          </div>
          <div>
            <label htmlFor={`${id}-year`} className={label}>{t("Year")}</label>
            <select id={`${id}-year`} name="year" className={input}>
              {years.map((y) => <option key={y}>{y}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor={`${id}-days`} className={label}>{t("Days in Peru")}</label>
            <input id={`${id}-days`} name="days" type="number" min={3} max={60} defaultValue={journeys.find((j) => j.slug === journey)?.days ?? 10} required className={input} />
          </div>
        </div>
        <p aria-live="polite" className="mt-3 min-h-6 text-sm">
          {season && (
            <span className="inline-flex flex-wrap items-center gap-2">
              <span className={`rounded-sm px-2 py-0.5 text-xs font-bold uppercase tracking-wide ${season.andes === "dry" ? "bg-mustard/30 text-indigo" : season.andes === "wet" ? "bg-pacific/15 text-pacific" : "bg-amazon/15 text-amazon"}`}>
                {season.andes === "dry" ? t("Andes: dry season") : season.andes === "wet" ? t("Andes: wet season") : t("Andes: shoulder season")}
              </span>
              {!season.incaTrailOpen && <span className="rounded-sm bg-cochineal/10 px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-cochineal">{t("Inca Trail closed")}</span>}
              <span className="text-stone-dark">{season.note} <span className="text-xs">{t("(verify)")}</span></span>
            </span>
          )}
        </p>
        <div className="mt-2">
          <span className={label} id={`${id}-exp`}>{t("Have you been to Peru before?")}</span>
          <div role="radiogroup" aria-labelledby={`${id}-exp`} className="flex flex-wrap gap-2">
            {[t("First time in Peru"), t("Returning to Peru")].map((v, i) => (
              <label key={v} className={pill}>
                <input type="radio" name="experience" value={i ? "returning" : "first-time"} required className="sr-only" defaultChecked={i === 0} />
                {t(v)}
              </label>
            ))}
          </div>
        </div>
      </fieldset>

      {!compact && (
      <fieldset className={fieldset}>
        <legend className={legend}>{t("What you'd love to see")}</legend>
        <p className={label}>{t("Must-sees")}</p>
        <div className="flex flex-wrap gap-2">
          {mustSees.map((m) => (
            <label key={m} className={pill}>
              <input type="checkbox" name="mustSees" value={m} className="sr-only" />
              {mustSeeLabel(m)}
            </label>
          ))}
        </div>
        <p className={`${label} mt-4`} id={`${id}-hike`}>{t("Hiking level")}</p>
        <div role="radiogroup" aria-labelledby={`${id}-hike`} className="grid gap-2 sm:grid-cols-4">
          {hikingLevels.map((h) => (
            <label key={h.v} className={`${pill} rounded-sm! text-left`}>
              <input type="radio" name="hiking" value={h.v} className="sr-only" defaultChecked={h.v === "easy"} />
              <span className="block">{h.l}</span>
              <span className="block text-xs font-normal opacity-80">{h.d}</span>
            </label>
          ))}
        </div>
        <div className="mt-4">
          <label htmlFor={`${id}-mp`} className={label}>{t("How would you like to reach Machu Picchu?")}</label>
          <select id={`${id}-mp`} name="mpRoute" className={input} defaultValue={journeys.find((j) => j.slug === journey)?.machuPicchu?.route ?? "unsure"}>
            {mpRoutes.map((r) => (
              <option key={r.v} value={r.v}>
                {r.l}
                {month === "Feb" && r.v.includes("inca-trail") ? " (closed in February)" : ""}
              </option>
            ))}
          </select>
        </div>
        <p className={`${label} mt-4`}>{t("Interests")}</p>
        <div className="flex flex-wrap gap-2">
          {interests.map((m) => (
            <label key={m} className={pill}>
              <input type="checkbox" name="interests" value={m} className="sr-only" />
              {interestLabels[m] ?? m}
            </label>
          ))}
        </div>
      </fieldset>
      )}

      <fieldset className={fieldset}>
        <legend className={legend}>{t("Who's travelling")}</legend>
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label htmlFor={`${id}-adults`} className={label}>{t("Adults")}</label>
            <input id={`${id}-adults`} name="adults" type="number" min={1} max={20} defaultValue={2} required className={input} />
          </div>
          <div>
            <label htmlFor={`${id}-kids`} className={label}>{t("Children (under 18)")}</label>
            <input id={`${id}-kids`} type="number" min={0} max={10} value={children} onChange={(e) => setChildren(Math.max(0, Math.min(10, Number(e.target.value) || 0)))} className={input} />
          </div>
          <div>
            <label htmlFor={`${id}-country`} className={label}>{t("Country of residence")}</label>
            <select id={`${id}-country`} name="country" required className={input} defaultValue="">
              <option value="" disabled>{t("Choose a country")}</option>
              {priorityCountries.map((c) => <option key={c}>{c}</option>)}
              <option disabled>──────────</option>
              {otherCountries.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>
        {children > 0 && (
          <div className="mt-4">
            <p className={label}>{t("Children's ages")}</p>
            <div className="flex flex-wrap gap-3">
              {Array.from({ length: children }, (_, i) => (
                <label key={i} className="text-sm">
                  <span className="sr-only">{t("Age of child {n}", { n: i + 1 })}</span>
                  <input name="childAge" type="number" min={0} max={17} required placeholder={t("Child {n}", { n: i + 1 })} className={`${input} w-28`} />
                </label>
              ))}
            </div>
          </div>
        )}
      </fieldset>

      <fieldset className={fieldset}>
        <legend className={legend}>{t("Your details")}</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor={`${id}-name`} className={label}>{t("Name")}</label>
            <input id={`${id}-name`} name="name" required autoComplete="name" className={input} />
          </div>
          <div>
            <label htmlFor={`${id}-email`} className={label}>{t("Email")}</label>
            <input id={`${id}-email`} name="email" type="email" required autoComplete="email" className={input} />
          </div>
          <div>
            <label htmlFor={`${id}-phone`} className={label}>{t("Phone (with country code)")}</label>
            <input id={`${id}-phone`} name="phone" type="tel" autoComplete="tel" className={input} />
          </div>
          <div>
            <span className={label} id={`${id}-contact`}>{t("Preferred contact")}</span>
            <div role="radiogroup" aria-labelledby={`${id}-contact`} className="flex flex-wrap gap-2">
              {["Email", "Phone"].map((v, i) => (
                <label key={v} className={pill}>
                  <input type="radio" name="contact" value={v.toLowerCase()} className="sr-only" defaultChecked={i === 0} />
                  {interestLabels[v] ?? v}
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor={`${id}-notes`} className={label}>{t("Anything else? (dates, celebrations, dietary needs, mobility)")}</label>
          <textarea id={`${id}-notes`} name="notes" rows={4} className={`${input} py-2`} />
        </div>
      </fieldset>

      {errors.length > 0 && (
        <div id={`${id}-errors`} role="alert" className="rounded-sm border-2 border-cochineal bg-cochineal/5 p-4 text-sm text-cochineal-dark">
          <ul className="list-disc pl-5">{errors.map((e) => <li key={e}>{t(e)}</li>)}</ul>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="max-w-md text-xs text-stone-dark">
          {t("We use your details only to plan your trip. See our")} <Link href="/legal/privacy" className="underline">{t("privacy policy")}</Link>.
        </p>
        <button type="submit" disabled={state === "sending"} className="min-h-12 rounded-full bg-cochineal px-8 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-cream hover:bg-cochineal-dark disabled:opacity-60">
          {state === "sending" ? "Sending…" : t("Send my enquiry")}
        </button>
      </div>
    </form>
  );
}
