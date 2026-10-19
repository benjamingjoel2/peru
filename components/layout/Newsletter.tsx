"use client";

import { useState } from "react";

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
    <section aria-labelledby="newsletter-heading" className="bg-mustard">
      <div className="container-x grid items-center gap-6 py-14 md:grid-cols-[1fr_1.1fr] md:py-16">
        <div>
          <h2 id="newsletter-heading" className="text-3xl text-indigo sm:text-4xl">
            Peru in your <em className="font-medium text-cochineal-dark">inbox</em>
          </h2>
          <p className="mt-2 max-w-md text-indigo">
            One letter a month: permit dates, the best months to go, and what we&apos;re eating. No spam, unsubscribe any time.
          </p>
        </div>
        {state === "done" ? (
          <p role="status" className="font-display text-2xl text-indigo">
            Gracias. You&apos;re on the list.
          </p>
        ) : (
          <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row" noValidate={false}>
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
              className="min-h-12 flex-1 rounded-[3px] border-2 border-indigo bg-cream px-4 text-ink placeholder:text-stone-dark"
            />
            {/* Honeypot */}
            <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
            <button
              type="submit"
              disabled={state === "sending"}
              className="min-h-12 rounded-[3px] bg-indigo px-6 text-sm font-bold uppercase tracking-[0.14em] text-cream hover:bg-indigo-deep disabled:opacity-60"
            >
              {state === "sending" ? "Sending…" : "Subscribe"}
            </button>
            {state === "error" && (
              <p role="alert" className="text-sm font-semibold text-cochineal-dark sm:basis-full">
                Something went wrong. Please try again.
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}
