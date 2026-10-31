import { Document, Page, Text, View, StyleSheet, Svg, Path, Rect, Line, Circle, G, Text as SvgText } from "@react-pdf/renderer";
import type { Journey } from "@/data/types";
import { altitudeBands, bandFor, bandHex, tipText } from "@/lib/altitude";
import { site } from "@/config/site";
import { stayBySlug } from "@/data/stays";
import { mpRoutes } from "@/config/machuPicchu";
import { t } from "@/lib/i18n";

const C = { cream: "#f6f1e7", indigo: "#23285a", cochineal: "#b3283c", mustard: "#e0a526", stone: "#8a857c", stoneDark: "#4a4741", stoneLight: "#d8d2c6", ink: "#1d1b19" };

/** The built-in PDF fonts lack arrows; swap them for plain text. */
const pdfSafe = (t: string) => t.replace(/ → /g, " to ").replace(/ ↔ /g, " and ").replace(/→/g, "to");

const s = StyleSheet.create({
  page: { backgroundColor: C.cream, padding: 40, paddingBottom: 56, fontFamily: "Helvetica", fontSize: 10, color: C.ink, lineHeight: 1.45 },
  stripe: { flexDirection: "row", height: 6, marginBottom: 18 },
  eyebrow: { fontSize: 8, letterSpacing: 1.6, color: C.stoneDark, fontFamily: "Helvetica-Bold", textTransform: "uppercase" },
  h1: { fontSize: 28, lineHeight: 1.2, fontFamily: "Helvetica-Bold", color: C.indigo, marginTop: 6, marginBottom: 4 },
  em: { fontFamily: "Helvetica-BoldOblique", color: C.cochineal },
  h2: { fontSize: 15, fontFamily: "Helvetica-Bold", color: C.indigo, marginTop: 18, marginBottom: 6 },
  p: { marginBottom: 6 },
  muted: { color: C.stoneDark },
  day: { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: C.stoneLight, paddingVertical: 7 },
  dayNum: { width: 46, fontFamily: "Helvetica-Bold", color: C.cochineal, fontSize: 11 },
  dayTitle: { fontFamily: "Helvetica-Bold", color: C.indigo, fontSize: 11 },
  chip: { fontSize: 8, color: C.stoneDark, marginTop: 2 },
  tip: { fontSize: 8.5, color: C.cochineal, fontFamily: "Helvetica-Bold", marginTop: 2 },
  footer: { position: "absolute", left: 40, right: 40, bottom: 22, fontSize: 7.5, color: C.stoneDark, flexDirection: "row", justifyContent: "space-between" },
  note: { borderLeftWidth: 3, borderLeftColor: C.cochineal, paddingLeft: 8, marginTop: 10, fontSize: 8.5, color: C.stoneDark },
});

function Title({ text }: { text: string }) {
  const parts = text.split(/(\*[^*]+\*)/g).filter(Boolean);
  return (
    <Text style={s.h1}>
      {parts.map((p, i) => (p.startsWith("*") ? <Text key={i} style={s.em}>{p.slice(1, -1)}</Text> : p))}
    </Text>
  );
}

function Stripe() {
  const cols = [C.cochineal, C.mustard, C.indigo, C.cream, "#2f6b45", C.mustard];
  return (
    <View style={s.stripe}>
      {Array.from({ length: 36 }, (_, i) => <View key={i} style={{ flex: i % 6 === 3 ? 0.3 : 1, backgroundColor: cols[i % 6] }} />)}
    </View>
  );
}

function AltitudeChart({ j }: { j: Journey }) {
  const W = 515, H = 210, L = 44, R = 70, T = 16, B = 34;
  const n = j.itinerary.length;
  const yMax = 5200;
  const iw = W - L - R, ih = H - T - B;
  const x = (i: number) => L + (n === 1 ? iw / 2 : (i / (n - 1)) * iw);
  const y = (m: number) => T + ih - (Math.min(m, yMax) / yMax) * ih;
  const d = j.itinerary.map((day, i) => `${i ? "L" : "M"}${x(i).toFixed(1)} ${y(day.sleepAltitudeM).toFixed(1)}`).join(" ");
  return (
    <Svg width={W} height={H}>
      {altitudeBands.map((b) => (
        <G key={b.id}>
          <Rect x={L} y={y(Math.min(b.max, yMax))} width={iw} height={y(b.min) - y(Math.min(b.max, yMax))} fill={bandHex[b.id]} fillOpacity={0.12} />
          <SvgText x={L + iw + 6} y={(y(Math.min(b.max, yMax)) + y(b.min)) / 2 + 3} style={{ fontSize: 7 }} fill={C.stoneDark}>{b.label}</SvgText>
        </G>
      ))}
      {[0, 1000, 2000, 3000, 4000, 5000].map((m) => (
        <G key={m}>
          <Line x1={L} x2={L + iw} y1={y(m)} y2={y(m)} stroke={C.stoneLight} strokeWidth={0.5} />
          <SvgText x={L - 6} y={y(m) + 2.5} style={{ fontSize: 7 }} fill={C.stoneDark} textAnchor="end">{m === 0 ? "0 m" : `${m.toLocaleString("en-GB")} m`}</SvgText>
        </G>
      ))}
      {j.itinerary.map((day, i) =>
        day.maxAltitudeM && day.maxAltitudeM > day.sleepAltitudeM + 50 ? (
          <G key={`m${i}`}>
            <Line x1={x(i)} x2={x(i)} y1={y(day.sleepAltitudeM)} y2={y(day.maxAltitudeM)} stroke={C.stoneDark} strokeWidth={0.8} strokeDasharray="2 2" />
            <Path d={`M${x(i) - 3} ${y(day.maxAltitudeM) + 3} L${x(i)} ${y(day.maxAltitudeM) - 2} L${x(i) + 3} ${y(day.maxAltitudeM) + 3} Z`} fill={C.stoneDark} />
          </G>
        ) : null,
      )}
      <Path d={d} stroke={C.indigo} strokeWidth={1.6} fill="none" />
      {j.itinerary.map((day, i) => (
        <G key={i}>
          <Circle cx={x(i)} cy={y(day.sleepAltitudeM)} r={3.6} fill={bandHex[bandFor(day.sleepAltitudeM).id]} stroke={C.cream} strokeWidth={1.2} />
          <SvgText x={x(i)} y={H - B + 14} style={{ fontSize: 7.5 }} fill={C.indigo} textAnchor="middle">{`D${day.day}`}</SvgText>
          {day.tip ? <SvgText x={x(i)} y={T - 4} style={{ fontSize: 8 }} fill={C.cochineal} textAnchor="middle">!</SvgText> : null}
        </G>
      ))}
    </Svg>
  );
}

export function ItineraryDocument({ j }: { j: Journey }) {
  const mp = j.machuPicchu ? mpRoutes.find((r) => r.id === j.machuPicchu!.route) : null;
  const footer = (
    <View style={s.footer} fixed>
      <Text>{site.name} · {site.contact.email}</Text>
      <Text render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
    </View>
  );
  return (
    <Document title={`${j.days} days: ${j.title.replace(/\*/g, "")} | ${site.name}`} author={site.name}>
      <Page size="A4" style={s.page}>
        <Stripe />
        <Text style={s.eyebrow}>{site.name} · {j.days}{t("-day journey")}</Text>
        <Title text={j.title} />
        <Text style={[s.p, { marginTop: 8, fontSize: 11 }]}>{j.intro}</Text>
        <Text style={s.muted}>{t("From US$")}{j.fromPriceUSD.toLocaleString("en-US")} {t("per person, excluding international flights.")}</Text>

        <Text style={s.h2}>{t("Altitude profile")}</Text>
        <Text style={[s.muted, { marginBottom: 6, fontSize: 8.5 }]}>{t("Where you sleep each night (dots, coloured by altitude band) and the day's high point (dashed). ! marks a pacing tip. All altitudes approximate (verify).")}</Text>
        <AltitudeChart j={j} />
        <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 4 }}>
          {altitudeBands.map((b) => (
            <View key={b.id} style={{ flexDirection: "row", alignItems: "center", marginRight: 12 }}>
              <View style={{ width: 7, height: 7, borderRadius: 4, backgroundColor: bandHex[b.id], marginRight: 4 }} />
              <Text style={{ fontSize: 7.5, color: C.stoneDark }}>{b.label} {b.max < 9000 ? `${b.min}-${b.max} m` : `${b.min} m+`}</Text>
            </View>
          ))}
        </View>
        <Text style={s.note}>{t("General guidance, not medical advice. Talk to your doctor before you travel.")}</Text>

        <Text style={s.h2}>{t("Highlights")}</Text>
        {j.highlights.map((h) => <Text key={h} style={{ marginBottom: 2 }}>-  {pdfSafe(h)}</Text>)}

        <Text style={s.h2}>{t("How you travel")}</Text>
        {j.howYouTravel.map((h) => <Text key={h} style={{ marginBottom: 2 }}>-  {pdfSafe(h)}</Text>)}
        {footer}
      </Page>

      <Page size="A4" style={s.page}>
        <Stripe />
        <Text style={s.h2}>{t("Day by day")}</Text>
        {j.itinerary.map((day) => {
          const stay = day.stay ? stayBySlug(day.stay) : null;
          return (
            <View key={day.day} style={s.day} wrap={false}>
              <Text style={s.dayNum}>{t("Day")} {day.day}</Text>
              <View style={{ flex: 1 }}>
                <Text style={s.dayTitle}>{day.title}</Text>
                <Text>{pdfSafe(day.summary)}</Text>
                <Text style={s.chip}>
                  {t("Sleep:")} {day.sleepLabel}{t(", about")} {day.sleepAltitudeM.toLocaleString("en-GB")} m ({bandFor(day.sleepAltitudeM).label.toLowerCase()})
                  {day.maxAltitudeM && day.maxAltitudeM > day.sleepAltitudeM ? `  ·  High point: about ${day.maxAltitudeM.toLocaleString("en-GB")} m${day.maxLabel ? ` (${day.maxLabel})` : ""}` : ""}
                  {stay ? `  ·  Stay: ${stay.name}` : ""}
                  {day.transport.length ? `  ·  ${day.transport.join(", ")}` : ""}
                </Text>
                {day.tip ? <Text style={s.tip}>{tipText[day.tip]}</Text> : null}
              </View>
            </View>
          );
        })}
        {mp && j.machuPicchu && (
          <View wrap={false}>
            <Text style={s.h2}>{t("Machu Picchu")}</Text>
            <Text style={s.p}>{t("Route:")} {mp.name}. {j.machuPicchu.note}</Text>
            <Text style={s.note}>{t("Rules change often. Tickets are timed, named and tied to a circuit; we'll confirm the latest rules when you book.")}</Text>
          </View>
        )}
        <View wrap={false}>
          <Text style={s.h2}>{t("Make it yours")}</Text>
          <Text style={s.p}>{t("Every journey is private and tailored. Talk to a Peru Specialist about dates, hotels and pace.")}</Text>
          <Text>{site.contact.email}  ·  {t(site.address.full)}</Text>
          <Text style={s.muted}>{t(site.contact.hours)} ({t(site.contact.timezoneLabel)})</Text>
        </View>
        {footer}
      </Page>
    </Document>
  );
}
