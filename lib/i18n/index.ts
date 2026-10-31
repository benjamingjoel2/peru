import * as React from "react";
import { use } from "react";
import { I18nContext, getBrowserState, type I18nState } from "./context";
import { hashKey } from "./hash";
import { SKIP_KEYS, COPY_UNDER_SKIP } from "./skip";
import type { Locale } from "./config";

export { hashKey } from "./hash";
export * from "./config";

const EN: I18nState = { locale: "en", dict: {} };

// Set by ./server in the React Server Components module graph only.
let serverResolver: (() => I18nState) | null = null;
export function registerServerResolver(fn: () => I18nState) {
  serverResolver = fn;
}

function state(): I18nState {
  if (serverResolver) return serverResolver();
  if (typeof window === "undefined") {
    // Server-side render of a client component: read the provider through context
    // (only while React is rendering; module-level code gets English).
    const internals = (React as unknown as Record<string, { H?: unknown } | undefined>).__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
    if (internals && !internals.H) return EN;
    try {
      // eslint-disable-next-line react-hooks/rules-of-hooks -- `use` may be called conditionally
      return use(I18nContext) ?? EN;
    } catch {
      return EN;
    }
  }
  return getBrowserState() ?? EN;
}

/** Translate an English source string (falls back to English). */
export function t(s: string, vars?: Record<string, string | number | undefined>): string {
  const st = state();
  let out = st.locale === "en" ? s : (st.dict[hashKey(s)] ?? s);
  if (vars) out = out.replace(/\{(\w+)\}/g, (m, k: string) => (k in vars ? String(vars[k] ?? "") : m));
  return out;
}

export function currentLocale(): Locale {
  return state().locale;
}

/* ---------- Translated views of typed data ---------- */

export const RAW = Symbol.for("i18n.raw");
const unbound = new WeakMap<object, object>();
const bound = new WeakMap<object, [WeakMap<object, object>, WeakMap<object, object>]>();

function translateLeaf(v: string, st: I18nState): string {
  if (st.locale === "en" || !/[A-Za-z]/.test(v)) return v;
  return st.dict[hashKey(v)] ?? v;
}

/**
 * Wrap data so every visible string reads in the current locale.
 * Identifiers (see SKIP_KEYS) pass through untouched, so lookups and filters keep working.
 * Nested values are bound to the locale in force when they were read, so they stay correct
 * even if React serialises them later.
 */
export function L<T>(value: T, skipped = false, at?: I18nState): T {
  if (value === null || typeof value !== "object") return value;
  const target = value as unknown as object;
  let cache: WeakMap<object, object> | null = skipped ? null : unbound;
  if (at) {
    let pair = bound.get(at.dict);
    if (!pair) bound.set(at.dict, (pair = [new WeakMap(), new WeakMap()]));
    cache = pair[skipped ? 1 : 0];
  }
  if (cache?.has(target)) return cache.get(target) as T;
  const proxy = new Proxy(target, {
    get(obj, key, receiver) {
      if (key === RAW) return obj;
      const v = Reflect.get(obj, key, receiver);
      if (typeof key !== "string") return v;
      const isIndex = Array.isArray(obj) && /^\d+$/.test(key);
      const skip = skipped ? !COPY_UNDER_SKIP.has(key) && !isIndex : SKIP_KEYS.has(key) && !COPY_UNDER_SKIP.has(key);
      if (typeof v === "string") return (skipped && isIndex) || skip ? v : translateLeaf(v, at ?? state());
      if (v && typeof v === "object") {
        if (skip) return key === "image" || key === "images" ? L(v, true, at ?? state()) : v;
        return L(v, skipped, at ?? state());
      }
      return v;
    },
  });
  cache?.set(target, proxy);
  return proxy as T;
}

/** The untranslated object behind a translated view. */
export function raw<T>(value: T): T {
  return ((value as unknown as Record<symbol, T>)?.[RAW] ?? value) as T;
}

/** Every visible English string inside a data value (for client dictionaries). */
export function copyStrings(value: unknown, out: Set<string> = new Set(), skipped = false): Set<string> {
  const v = raw(value);
  if (typeof v === "string") {
    if (/[A-Za-z]/.test(v)) out.add(v);
  } else if (Array.isArray(v)) {
    for (const x of v) if (!(skipped && typeof x === "string")) copyStrings(x, out, skipped);
  } else if (v && typeof v === "object") {
    for (const [k, x] of Object.entries(v)) {
      const skip = skipped ? !COPY_UNDER_SKIP.has(k) : SKIP_KEYS.has(k) && !COPY_UNDER_SKIP.has(k);
      if (!skip) copyStrings(x, out, false);
      else if (x && typeof x === "object" && (k === "image" || k === "images")) copyStrings(x, out, true);
    }
  }
  return out;
}
