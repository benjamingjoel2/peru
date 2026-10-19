"use client";

import { useId, useMemo, useRef, useState } from "react";
import { altitudeBands, bandFor, formatFt, formatM, tipText, type ProfilePoint } from "@/lib/altitude";

type Props = {
  points: ProfilePoint[];
  title: string;
  /** Smaller variant for cards/teasers: no table, fewer labels */
  compact?: boolean;
  className?: string;
};

const H = 340;
const PAD = { top: 28, right: 112, bottom: 58, left: 56 };
const STEP = 76;

/**
 * Day-by-day altitude profile: where you sleep each night, plus the day's high point.
 * Accessible: summary caption, keyboard navigation (←/→/Home/End), live description and a table view.
 */
export function AltitudeProfile({ points, title, compact = false, className = "" }: Props) {
  const id = useId();
  const [active, setActive] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const yMax = Math.max(5200, ...points.map((p) => (p.maxM ?? p.sleepM) + 200));
  const innerW = Math.max(points.length - 1, 1) * STEP;
  const W = PAD.left + innerW + PAD.right;
  const innerH = H - PAD.top - PAD.bottom;
  const x = (i: number) => PAD.left + (points.length === 1 ? innerW / 2 : i * STEP);
  const y = (m: number) => PAD.top + innerH - (m / yMax) * innerH;

  const summary = useMemo(() => {
    if (!points.length) return "No nights added yet.";
    const highest = points.reduce((a, b, i) => (b.sleepM > points[a].sleepM ? i : a), 0);
    const peak = points.reduce((a, b, i) => ((b.maxM ?? b.sleepM) > (points[a].maxM ?? points[a].sleepM) ? i : a), 0);
    const veryHighNights = points.filter((p) => p.sleepM >= 3500).length;
    return `${points.length} days. Highest night: ${points[highest].sublabel ?? points[highest].label}, about ${formatM(points[highest].sleepM)} (day ${highest + 1}). Highest point: about ${formatM(points[peak].maxM ?? points[peak].sleepM)}${points[peak].maxLabel ? ` at ${points[peak].maxLabel}` : ""} (day ${peak + 1}). ${veryHighNights} night${veryHighNights === 1 ? "" : "s"} above 3,500 m. All altitudes approximate (verify).`;
  }, [points]);

  const describe = (i: number) => {
    const p = points[i];
    const parts = [`${p.label}: sleep in ${p.sublabel ?? "—"}, about ${formatM(p.sleepM)} (${bandFor(p.sleepM).label.toLowerCase()})`];
    if (p.maxM && p.maxM > p.sleepM) parts.push(`highest point about ${formatM(p.maxM)}${p.maxLabel ? ` at ${p.maxLabel}` : ""}`);
    if (p.tip) parts.push(tipText[p.tip]);
    return parts.join(". ") + ".";
  };

  const sleepPath = points.map((p, i) => `${i ? "L" : "M"}${x(i)} ${y(p.sleepM)}`).join(" ");

  const onKey = (e: React.KeyboardEvent) => {
    if (!points.length) return;
    const cur = active ?? -1;
    let next: number | null = null;
    if (e.key === "ArrowRight") next = Math.min(points.length - 1, cur + 1);
    if (e.key === "ArrowLeft") next = Math.max(0, cur === -1 ? 0 : cur - 1);
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = points.length - 1;
    if (e.key === "Escape") { setActive(null); return; }
    if (next !== null) {
      e.preventDefault();
      setActive(next);
      // Keep the active day in view on narrow screens
      const scroller = svgRef.current?.parentElement;
      if (scroller) {
        const px = (x(next) / W) * scroller.scrollWidth;
        if (px < scroller.scrollLeft + 40 || px > scroller.scrollLeft + scroller.clientWidth - 40) scroller.scrollTo({ left: px - scroller.clientWidth / 2 });
      }
    }
  };

  const onPointer = (e: React.PointerEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    if (!svg || !points.length) return;
    const rect = svg.getBoundingClientRect();
    const sx = ((e.clientX - rect.left) / rect.width) * W;
    const i = Math.round((sx - PAD.left) / STEP);
    setActive(Math.max(0, Math.min(points.length - 1, i)));
  };

  const a = active !== null ? points[active] : null;

  return (
    <figure className={`min-w-0 rounded-sm bg-cream p-4 ring-1 ring-stone-light sm:p-6 ${className}`}>
      <figcaption className="mb-3">
        <span className="block font-display text-xl font-semibold text-indigo">{title}</span>
        <span id={`${id}-sum`} className="mt-1 block text-sm text-stone-dark">{summary}</span>
      </figcaption>

      {/* Legend: band names + ranges; identity never by colour alone */}
      <ul className="mb-3 flex flex-wrap gap-x-4 gap-y-1 text-xs font-semibold text-stone-dark" aria-label="Altitude bands">
        {altitudeBands.map((b) => (
          <li key={b.id} className="flex items-center gap-1.5">
            <span aria-hidden className="inline-block h-3 w-3 rounded-full ring-2 ring-cream" style={{ background: b.color }} />
            {b.label} {b.max < 9000 ? `${b.min.toLocaleString("en-GB")}–${b.max.toLocaleString("en-GB")} m` : `${b.min.toLocaleString("en-GB")} m+`}
          </li>
        ))}
        <li className="flex items-center gap-1.5">
          <svg aria-hidden width="18" height="10"><path d="M1 9 L9 1 L17 9" fill="none" stroke="var(--color-stone-dark)" strokeWidth="2" strokeDasharray="3 2" /></svg>
          Day&apos;s high point
        </li>
      </ul>

      <div className="relative overflow-x-auto" style={{ scrollbarWidth: "thin" }}>
        <svg
          ref={svgRef}
          role="application"
          aria-roledescription="altitude chart"
          aria-label={`${title}. Use left and right arrow keys to move between days.`}
          aria-describedby={`${id}-sum`}
          tabIndex={0}
          onKeyDown={onKey}
          onPointerMove={onPointer}
          onPointerLeave={() => setActive(null)}
          viewBox={`0 0 ${W} ${H}`}
          className="block h-auto touch-pan-x outline-offset-4"
          style={{ width: "100%", minWidth: Math.max(points.length * 52 + 140, 320) }}
        >
          {/* Bands */}
          {altitudeBands.map((b) => {
            const top = y(Math.min(b.max, yMax));
            const bottom = y(b.min);
            if (b.min >= yMax) return null;
            return (
              <g key={b.id}>
                <rect x={PAD.left - 8} y={top} width={innerW + 16} height={bottom - top} fill={b.color} opacity={0.1} />
                <text x={PAD.left + innerW + 18} y={(top + bottom) / 2} dominantBaseline="middle" className="fill-stone-dark text-[11px] font-semibold">
                  {b.label}
                </text>
              </g>
            );
          })}
          {/* Grid + axis */}
          {[0, 1000, 2000, 3000, 4000, 5000].filter((m) => m <= yMax).map((m) => (
            <g key={m}>
              <line x1={PAD.left - 8} x2={PAD.left + innerW + 8} y1={y(m)} y2={y(m)} stroke="var(--color-stone-light)" strokeWidth={1} />
              <text x={PAD.left - 14} y={y(m)} textAnchor="end" dominantBaseline="middle" className="fill-stone-dark text-[11px]">
                {m === 0 ? "Sea level" : `${m / 1000}k m`}
              </text>
            </g>
          ))}
          {/* Day high points */}
          {points.map((p, i) =>
            p.maxM && p.maxM > p.sleepM + 50 ? (
              <g key={`max-${i}`}>
                <line x1={x(i)} x2={x(i)} y1={y(p.sleepM) - 8} y2={y(p.maxM) + 6} stroke="var(--color-stone-dark)" strokeWidth={1.5} strokeDasharray="3 3" />
                <path d={`M${x(i) - 6} ${y(p.maxM) + 6} L${x(i)} ${y(p.maxM) - 4} L${x(i) + 6} ${y(p.maxM) + 6} Z`} fill="var(--color-stone-dark)" />
              </g>
            ) : null,
          )}
          {/* Sleep line */}
          <path d={sleepPath} fill="none" stroke="var(--color-indigo)" strokeWidth={2.5} strokeLinejoin="round" />
          {/* Active crosshair */}
          {active !== null && <line x1={x(active)} x2={x(active)} y1={PAD.top} y2={PAD.top + innerH} stroke="var(--color-indigo)" strokeOpacity={0.35} strokeWidth={1} />}
          {/* Nights */}
          {points.map((p, i) => {
            const b = bandFor(p.sleepM);
            return (
              <g key={i}>
                <circle cx={x(i)} cy={y(p.sleepM)} r={active === i ? 9 : 6.5} fill={b.color} stroke="var(--color-cream)" strokeWidth={2.5} />
                {p.tip && (
                  <g aria-hidden>
                    <rect x={x(i) - 7} y={PAD.top - 22} width={14} height={14} rx={2} transform={`rotate(45 ${x(i)} ${PAD.top - 15})`} fill="var(--color-mustard)" />
                    <text x={x(i)} y={PAD.top - 14} textAnchor="middle" dominantBaseline="middle" className="fill-indigo text-[10px] font-bold">!</text>
                  </g>
                )}
                <text x={x(i)} y={H - PAD.bottom + 20} textAnchor="middle" className={`text-[12px] font-bold ${active === i ? "fill-cochineal" : "fill-indigo"}`}>
                  {p.label.replace("Day ", "D")}
                </text>
                {!compact && (
                  <text x={x(i)} y={H - PAD.bottom + 38} textAnchor="middle" className="fill-stone-dark text-[10px]">
                    {formatM(p.sleepM).replace(" m", "")}
                  </text>
                )}
              </g>
            );
          })}
          <text x={PAD.left - 14} y={H - PAD.bottom + 38} textAnchor="end" className="fill-stone-dark text-[10px]">{compact ? "" : "Sleep (m)"}</text>
        </svg>
      </div>

      {/* Detail / tooltip panel (also the live region) */}
      <div aria-live="polite" className="mt-3 min-h-[6.5rem] rounded-sm bg-cream-deep/60 px-4 py-3 text-sm">
        {a ? (
          <div>
            <p className="font-bold text-indigo">
              {a.label}
              {a.sublabel ? `: ${a.sublabel}` : ""}
            </p>
            <p className="text-stone-dark">
              Sleep about <strong>{formatM(a.sleepM)}</strong> ({formatFt(a.sleepM)}) · {bandFor(a.sleepM).label}
              {a.maxM && a.maxM > a.sleepM ? <> · High point about <strong>{formatM(a.maxM)}</strong>{a.maxLabel ? ` (${a.maxLabel})` : ""}</> : null}
            </p>
            {a.tip && <p className="mt-1 font-semibold text-cochineal">{tipText[a.tip]}</p>}
          </div>
        ) : (
          <p className="text-stone-dark">
            Hover, tap or use the arrow keys on the chart to see each night. Altitudes are approximate (verify). This is general guidance, not medical advice.
          </p>
        )}
      </div>

      {!compact && (
        <details className="mt-3 text-sm">
          <summary className="cursor-pointer font-bold text-cochineal">Show as a table</summary>
          <div className="mt-2 overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse text-left">
              <caption className="sr-only">{title}: altitude by day</caption>
              <thead>
                <tr className="border-b-2 border-stone-light text-xs uppercase tracking-wide text-stone-dark">
                  <th scope="col" className="py-2 pr-3">Day</th>
                  <th scope="col" className="py-2 pr-3">Sleep</th>
                  <th scope="col" className="py-2 pr-3">Sleep altitude</th>
                  <th scope="col" className="py-2 pr-3">High point</th>
                  <th scope="col" className="py-2">Tip</th>
                </tr>
              </thead>
              <tbody>
                {points.map((p, i) => (
                  <tr key={i} className="border-b border-stone-light">
                    <th scope="row" className="py-2 pr-3 font-semibold">{p.label}</th>
                    <td className="py-2 pr-3">{p.sublabel}</td>
                    <td className="py-2 pr-3">~{formatM(p.sleepM)} · {bandFor(p.sleepM).label}</td>
                    <td className="py-2 pr-3">{p.maxM && p.maxM > p.sleepM ? `~${formatM(p.maxM)}${p.maxLabel ? ` (${p.maxLabel})` : ""}` : "—"}</td>
                    <td className="py-2">{p.tip ? tipText[p.tip] : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>
      )}
    </figure>
  );
}
