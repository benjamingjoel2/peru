import { ImageResponse } from "next/og";
import { site } from "@/config/site";

export const alt = `${site.name}: Peru, done right`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const stripe = ["#b3283c", "#e0a526", "#23285a", "#f6f1e7", "#2f6b45", "#e0a526"];
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: "#f6f1e7", fontFamily: "serif" }}>
        <div style={{ display: "flex", height: 18 }}>
          {Array.from({ length: 48 }, (_, i) => <div key={i} style={{ flex: 1, background: stripe[i % 6] }} />)}
        </div>
        <div style={{ display: "flex", flex: 1, padding: "60px 80px", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexDirection: "column", maxWidth: 680 }}>
            <div style={{ fontSize: 26, letterSpacing: 8, color: "#4a4741", textTransform: "uppercase" }}>{site.name}</div>
            <div style={{ display: "flex", fontSize: 104, color: "#23285a", fontWeight: 700, marginTop: 20, lineHeight: 1.05 }}>
              Peru,&nbsp;<span style={{ color: "#b3283c", fontStyle: "italic" }}>done right.</span>
            </div>
            <div style={{ fontSize: 30, color: "#4a4741", marginTop: 28 }}>Private journeys, paced for altitude, distance and permits.</div>
          </div>
          <svg width="260" height="260" viewBox="0 0 48 48">
            <path d="M3 27 5 8l17-4 3 10-2 15-12 1Z" fill="#b3283c" />
            <path d="M27 4 44 6l1 16-12 3-8-3 1-9Z" fill="#e0a526" />
            <path d="M12 34 24 32l2-8 9 2 10-2 0 19-19 2-15-2Z" fill="#23285a" />
          </svg>
        </div>
        <svg width="1200" height="120" viewBox="0 0 1200 120" style={{ display: "flex" }}>
          <path d="M0 120 L0 90 L180 70 L320 40 L420 60 L560 10 L700 50 L820 30 L960 70 L1080 55 L1200 80 L1200 120 Z" fill="#23285a" />
        </svg>
      </div>
    ),
    size,
  );
}
