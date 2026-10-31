"use client";

import NextLink from "next/link";
import type { ComponentProps } from "react";
import { useLocale } from "@/lib/i18n/context";
import { localizePath } from "@/lib/i18n/config";

/** next/link that keeps the visitor in their language. */
export default function Link({ href, ...props }: ComponentProps<typeof NextLink>) {
  const locale = useLocale();
  const h = typeof href === "string" ? localizePath(href, locale) : href;
  return <NextLink href={h} {...props} />;
}
