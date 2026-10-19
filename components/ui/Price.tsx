"use client";

import { formatPrice, useCurrency } from "@/lib/currency";

export function Price({ usd, className }: { usd: number; className?: string }) {
  const { code } = useCurrency();
  return (
    <span className={className} data-currency={code}>
      {formatPrice(usd, code)}
    </span>
  );
}
