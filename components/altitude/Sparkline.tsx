import { bandFor, formatM } from "@/lib/altitude";
import type { JourneyDay } from "@/data/types";

/** Tiny decorative altitude line for journey cards. Text alternative provided via the label. */
export function AltitudeSparkline({ days, className = "" }: { days: JourneyDay[]; className?: string }) {
  const W = 200, H = 44, max = 5000;
  const x = (i: number) => (days.length === 1 ? W / 2 : (i / (days.length - 1)) * (W - 8) + 4);
  const y = (m: number) => H - 4 - (Math.min(m, max) / max) * (H - 10);
  const peak = Math.max(...days.map((d) => d.sleepAltitudeM));
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className} role="img" aria-label={`Altitude profile: highest night about ${formatM(peak)}`}>
      <line x1="0" x2={W} y1={y(3500)} y2={y(3500)} stroke="currentColor" strokeOpacity=".25" strokeDasharray="2 3" />
      <path d={days.map((d, i) => `${i ? "L" : "M"}${x(i)} ${y(d.sleepAltitudeM)}`).join(" ")} fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      {days.map((d, i) => (
        <circle key={i} cx={x(i)} cy={y(d.sleepAltitudeM)} r="3" fill={bandFor(d.sleepAltitudeM).color} />
      ))}
    </svg>
  );
}
