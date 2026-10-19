import Link from "next/link";
import { StoneMark } from "@/components/ui/Stone";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label="Discover Peru Travel: home">
      <StoneMark className="h-9 w-9 shrink-0" />
      <span className={`font-display leading-none ${light ? "text-cream" : "text-indigo"}`}>
        <span className="block text-[0.7rem] font-semibold uppercase tracking-[0.28em] opacity-80">Discover</span>
        <span className="block text-xl font-bold tracking-tight">
          Peru <em className="font-medium text-cochineal [.on-dark_&]:text-mustard">Travel</em>
        </span>
      </span>
    </Link>
  );
}
