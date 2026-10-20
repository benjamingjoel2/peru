"use client";

import { useState } from "react";

/** Newsletter sign-up, shown in the footer's left column. */
export function Newsletter() {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    setState("sending");
    try {
      const res = await fetch("/api/newsletter", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(data) });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }

  return (
    <section aria-labelledby="newsletter-heading">
      <p className="eyebrow text-mustard">Newsletter</p>
      <h2 id="newsletter-heading" className="mt-3 font-display text-3xl text-cream sm:text-4xl">
        Peru in your <em className="font-medium text-mustard">inbox</em>
      </h2>
      <p className="mt-3 max-w-md text-cream/80">
        One letter a month: permit dates, the best months to go, and what we&apos;re eating. No spam, unsubscribe any time.
      </p>
      {state === "done" ? (
        <p role="status" className="mt-6 font-display text-2xl text-mustard">
          Gracias. You&apos;re on the list.
        </p>
      ) : (
        <form onSubmit={onSubmit} className="mt-6 flex max-w-md flex-col gap-3 sm:flex-row">
          <label htmlFor="nl-email" className="sr-only">
            Email address
          </label>
          <input
            id="nl-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="Your email address"
            className="min-h-12 flex-1 rounded-[3px] border-2 border-cream/40 bg-transparent px-4 text-cream placeholder:text-cream/60 focus:border-mustard"
          />
          {/* Honeypot */}
          <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
          <button
            type="submit"
            disabled={state === "sending"}
            className="min-h-12 rounded-[3px] bg-mustard px-6 text-sm font-bold uppercase tracking-[0.14em] text-indigo-deep hover:bg-mustard-soft disabled:opacity-60"
          >
            {state === "sending" ? "Sending…" : "Subscribe"}
          </button>
          {state === "error" && (
            <p role="alert" className="text-sm font-semibold text-mustard-soft sm:basis-full">
              Something went wrong. Please try again.
            </p>
          )}
        </form>
      )}
    </section>
  );
}
