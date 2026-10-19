"use client";

import { useEffect, useState } from "react";
import { site } from "@/config/site";
import { currencies, type CurrencyCode } from "@/config/pricing";
import { useCurrency } from "@/lib/currency";

function LimaClock() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const fmt = () =>
      new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: site.contact.timezone }).format(new Date());
    // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only clock
    setTime(fmt());
    const t = setInterval(() => setTime(fmt()), 30_000);
    return () => clearInterval(t);
  }, []);
  if (!time) return null;
  return <span className="hidden lg:inline"> · now {time}</span>;
}

export function TopBar() {
  const { code, setCode } = useCurrency();
  const c = site.contact;
  return (
    <div className="bg-indigo-deep text-cream/90">
      <div className="container-x flex h-10 items-center justify-between gap-4 text-[0.8rem]">
        <ul className="flex items-center gap-4 sm:gap-6">
          <li>
            <a href={c.phoneHref} className="flex items-center gap-1.5 hover:text-mustard">
              <PhoneIcon /> <span className="hidden sm:inline">{c.phone}</span>
              <span className="sm:hidden">Call</span>
            </a>
          </li>
          <li>
            <a href={`mailto:${c.email}`} className="flex items-center gap-1.5 hover:text-mustard">
              <MailIcon /> <span className="hidden md:inline">{c.email}</span>
              <span className="md:hidden">Email</span>
            </a>
          </li>
          <li className="hidden sm:block">
            <a href={c.whatsappHref} className="hover:text-mustard" rel="noopener" target="_blank">
              WhatsApp
            </a>
          </li>
        </ul>
        <div className="flex items-center gap-4">
          <p className="hidden md:block">
            {c.hours} ({c.timezoneLabel})
            <LimaClock />
          </p>
          <label className="flex items-center gap-1.5">
            <span className="sr-only">Currency</span>
            <select
              value={code}
              onChange={(e) => setCode(e.target.value as CurrencyCode)}
              className="cursor-pointer rounded-sm border border-cream/30 bg-transparent px-1.5 py-0.5 text-[0.8rem] font-semibold text-cream"
            >
              {(Object.keys(currencies) as CurrencyCode[]).map((k) => (
                <option key={k} value={k} className="text-ink">
                  {k}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>
    </div>
  );
}

const PhoneIcon = () => (
  <svg aria-hidden viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
    <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1Z" />
  </svg>
);
const MailIcon = () => (
  <svg aria-hidden viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="5" width="18" height="14" rx="1" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);
