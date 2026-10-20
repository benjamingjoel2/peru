// Generates illustrated placeholder portraits for the team until real team photos exist.
// (Destination, journey and stay imagery uses real photos in public/photos.)
// Run: node scripts/gen-placeholders.mjs
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const OUT = join(process.cwd(), "public/images");
const W = 1600, H = 1000;

const C = {
  cream: "#f6f1e7", creamDeep: "#ece4d3", cochineal: "#b3283c", cochDark: "#8e1e2f", indigo: "#23285a", indigoDeep: "#181c42",
  mustard: "#e0a526", mustardSoft: "#f2d58f", stone: "#8a857c", stoneDark: "#4a4741", stoneLight: "#d8d2c6",
  amazon: "#2f6b45", amazonDark: "#1f4a30", amazonLight: "#6f9f62", pacific: "#1f6e8c", pacificLight: "#7fb3c4", sand: "#e3c58f", sandDark: "#c99b5a",
  snow: "#f4f2ee", terracotta: "#c4643f",
};

function rng(seed) {
  let h = 2166136261;
  for (const ch of seed) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  return () => {
    h += 0x6d2b79f5;
    let t = h;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const ridge = (r, base, amp, peaks, opts = {}) => {
  const pts = [[0, base + (r() - 0.5) * amp]];
  const n = peaks * 2;
  for (let i = 1; i <= n; i++) {
    const x = (W / n) * i + (r() - 0.5) * (W / n) * 0.4;
    const up = i % 2 === 1;
    const y = up ? base - amp * (0.5 + r() * 0.6) : base - amp * r() * 0.25;
    pts.push([x, y]);
  }
  pts.push([W, base]);
  const d = `M0 ${H} ` + pts.map(([x, y]) => `L${x.toFixed(0)} ${y.toFixed(0)}`).join(" ") + ` L${W} ${H} Z`;
  if (!opts.snow) return { d, pts };
  // Snow caps: small triangles at each peak
  const caps = pts
    .filter((_, i) => i % 2 === 1)
    .map(([x, y]) => {
      const w = 40 + r() * 50;
      return `M${x - w} ${y + w * 0.9} L${x} ${y} L${x + w} ${y + w * 0.9} L${x + w * 0.4} ${y + w * 0.65} L${x} ${y + w} L${x - w * 0.35} ${y + w * 0.6} Z`;
    })
    .join(" ");
  return { d, pts, caps };
};

const sky = (id, top, bottom) =>
  `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${top}"/><stop offset="1" stop-color="${bottom}"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#${id})"/>`;

const sun = (r, color, y = 260) => `<circle cx="${(300 + r() * 1000).toFixed(0)}" cy="${y}" r="${(70 + r() * 40).toFixed(0)}" fill="${color}" opacity=".9"/>`;

const terraces = (r, y0, rows, color, x0 = 200, w = 900) => {
  let s = "";
  for (let i = 0; i < rows; i++) {
    const y = y0 + i * 34;
    const inset = i * 26 + r() * 20;
    s += `<path d="M${x0 + inset} ${y} Q${x0 + w / 2} ${y - 28} ${x0 + w - inset} ${y}" fill="none" stroke="${color}" stroke-width="10" stroke-linecap="round" opacity="${0.55 + i * 0.04}"/>`;
  }
  return s;
};

const trees = (r, y, count, color, size = 60) => {
  let s = "";
  for (let i = 0; i < count; i++) {
    const x = r() * W;
    const sz = size * (0.6 + r() * 0.8);
    s += `<circle cx="${x.toFixed(0)}" cy="${(y + r() * 40).toFixed(0)}" r="${sz.toFixed(0)}" fill="${color}"/>`;
  }
  return s;
};

const stonesWall = (r, y, rows, color, line) => {
  let s = "";
  for (let row = 0; row < rows; row++) {
    let x = -30 * r();
    const h = 70 + r() * 20;
    const yy = y + row * h;
    while (x < W) {
      const w = 110 + r() * 140;
      const j = () => (r() - 0.5) * 14;
      s += `<path d="M${x + j()} ${yy + j()} L${x + w + j()} ${yy + j()} L${x + w + j()} ${yy + h + j()} L${x + j()} ${yy + h + j()} Z" fill="${color}" stroke="${line}" stroke-width="5" stroke-linejoin="round"/>`;
      x += w;
    }
  }
  return s;
};

const water = (y, color, light) =>
  `<rect x="0" y="${y}" width="${W}" height="${H - y}" fill="${color}"/>` +
  Array.from({ length: 6 }, (_, i) => `<path d="M${80 + i * 260} ${y + 40 + (i % 3) * 60} h${120 + (i % 2) * 80}" stroke="${light}" stroke-width="6" stroke-linecap="round" opacity=".6"/>`).join("");

const scenes = {
  coast: (r) =>
    sky("s", C.mustardSoft, C.cream) + sun(r, C.mustard, 300) +
    `<path d="${ridge(r, 620, 160, 3).d}" fill="${C.sandDark}"/>` + `<path d="${ridge(r, 700, 90, 4).d}" fill="${C.sand}"/>` + water(760, C.pacific, C.pacificLight),
  dunes: (r) =>
    sky("s", "#f5d9a0", C.cream) + sun(r, C.cochineal, 240) +
    `<path d="M0 ${H} L0 620 Q300 380 620 600 T1200 560 Q1420 470 ${W} 600 L${W} ${H} Z" fill="${C.sandDark}"/>` +
    `<path d="M0 ${H} L0 760 Q420 560 860 740 T${W} 700 L${W} ${H} Z" fill="${C.sand}"/>` +
    `<ellipse cx="800" cy="860" rx="260" ry="50" fill="${C.amazon}"/>` + trees(r, 800, 6, C.amazonDark, 30),
  nazca: (r) =>
    sky("s", C.sand, C.sandDark) +
    `<rect y="0" width="${W}" height="${H}" fill="${C.sand}"/>` +
    `<g fill="none" stroke="${C.cream}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" opacity=".9">` +
    `<path d="M640 300 L800 470 L960 300 M800 470 L800 760 M800 560 L620 520 M800 560 L980 520 M740 760 L860 760"/>` +
    `<path d="M120 900 L1500 120" opacity=".5"/><path d="M80 200 L1520 860" opacity=".4"/></g>`,
  city: (r) =>
    sky("s", C.cochineal, C.mustard) + sun(r, C.mustardSoft, 420) +
    Array.from({ length: 14 }, (_, i) => {
      const w = 80 + r() * 90, h = 120 + r() * 260, x = i * 115 + r() * 20;
      return `<rect x="${x.toFixed(0)}" y="${(620 - h).toFixed(0)}" width="${w.toFixed(0)}" height="${(h + 40).toFixed(0)}" fill="${C.indigo}" opacity="${0.75 + r() * 0.25}"/>`;
    }).join("") +
    `<path d="M0 640 L${W} 600 L${W} ${H} L0 ${H} Z" fill="${C.stoneDark}"/>` + water(820, C.pacific, C.pacificLight),
  valley: (r) => {
    const back = ridge(r, 520, 300, 3, { snow: true });
    return sky("s", C.pacificLight, C.cream) + `<path d="${back.d}" fill="${C.stone}"/><path d="${back.caps}" fill="${C.snow}"/>` +
      `<path d="${ridge(r, 700, 220, 2).d}" fill="${C.amazonLight}"/>` + terraces(r, 640, 6, C.amazon, 180, 1200) +
      `<path d="${ridge(r, 860, 120, 3).d}" fill="${C.amazon}"/>`;
  },
  ruins: (r) => {
    const back = ridge(r, 600, 460, 2);
    return sky("s", C.creamDeep, C.cream) + `<path d="${back.d}" fill="${C.amazon}"/>` +
      `<path d="M560 ${H} L560 640 L700 560 L880 560 L1040 640 L1040 ${H} Z" fill="${C.amazonLight}"/>` +
      terraces(r, 620, 7, C.stoneLight, 520, 560) +
      Array.from({ length: 7 }, (_, i) => `<rect x="${600 + i * 60}" y="${560 + (i % 3) * 14}" width="44" height="34" fill="${C.stoneLight}"/>`).join("") +
      `<path d="${ridge(r, 900, 90, 4).d}" fill="${C.amazonDark}"/>` +
      `<g fill="${C.cream}" opacity=".8"><ellipse cx="300" cy="380" rx="260" ry="40"/><ellipse cx="1300" cy="460" rx="300" ry="36"/></g>`;
  },
  peaks: (r) => {
    const back = ridge(r, 600, 420, 3, { snow: true });
    return sky("s", C.indigo, C.pacific) + `<path d="${back.d}" fill="${C.stoneDark}"/><path d="${back.caps}" fill="${C.snow}"/>` +
      `<path d="${ridge(r, 780, 200, 3).d}" fill="${C.stone}"/>` + `<path d="${ridge(r, 900, 120, 4).d}" fill="${C.amazonDark}"/>`;
  },
  lake: (r) => {
    const back = ridge(r, 560, 200, 2, { snow: true });
    return sky("s", C.pacific, C.pacificLight) + sun(r, C.cream, 220) + `<path d="${back.d}" fill="${C.stone}"/><path d="${back.caps}" fill="${C.snow}"/>` +
      water(560, C.indigo, C.pacificLight) +
      `<path d="M520 780 Q700 740 900 780 L870 810 Q700 790 550 810 Z" fill="${C.mustard}"/><path d="M700 780 L700 690 L760 760 Z" fill="${C.sandDark}"/>`;
  },
  canyon: (r) =>
    sky("s", C.mustardSoft, C.cream) +
    `<path d="M0 ${H} L0 380 L380 420 L560 560 L640 ${H} Z" fill="${C.terracotta}"/>` +
    `<path d="M${W} ${H} L${W} 360 L1180 420 L1000 580 L900 ${H} Z" fill="${C.cochDark}"/>` +
    `<path d="M560 ${H} L640 620 L900 620 L1000 ${H} Z" fill="${C.stoneDark}"/>` + terraces(r, 460, 5, C.amazonLight, 40, 420) +
    `<path d="M760 300 q40 -30 80 0 q-40 -10 -80 0 Z M700 300 q100 -40 200 0" stroke="${C.indigoDeep}" stroke-width="8" fill="none"/>`,
  volcano: (r) =>
    sky("s", C.pacificLight, C.cream) +
    `<path d="M300 760 L700 260 L780 250 L1180 760 Z" fill="${C.stoneDark}"/><path d="M620 360 L700 260 L780 250 L860 350 L790 330 L740 370 L690 330 Z" fill="${C.snow}"/>` +
    `<path d="M0 ${H} L0 760 L${W} 740 L${W} ${H} Z" fill="${C.stoneLight}"/>` +
    Array.from({ length: 8 }, (_, i) => `<path d="M${120 + i * 180} 840 h120 v-90 q-60 -40 -120 0 Z" fill="${C.cream}" stroke="${C.stone}" stroke-width="4"/>`).join(""),
  jungle: (r) =>
    sky("s", "#c9dccb", C.cream) + sun(r, C.mustard, 200) +
    trees(r, 420, 22, C.amazonLight, 90) + trees(r, 520, 26, C.amazon, 90) +
    `<path d="M0 760 C300 700 520 820 800 760 S1300 700 ${W} 760 L${W} 860 C1200 820 1000 900 800 860 S300 820 0 880 Z" fill="${C.sandDark}"/>` +
    trees(r, 900, 22, C.amazonDark, 80) +
    `<g fill="${C.cochineal}"><path d="M300 260 l40 -10 -10 30 Z"/><path d="M1180 300 l40 -10 -10 30 Z"/></g><g fill="${C.mustard}"><path d="M1240 240 l30 -8 -8 22 Z"/></g>`,
  river: (r) =>
    sky("s", C.mustardSoft, C.cream) + trees(r, 470, 20, C.amazon, 80) +
    `<path d="M0 560 L${W} 540 L${W} ${H} L0 ${H} Z" fill="${C.sandDark}"/>` +
    `<path d="M560 ${H} C620 820 980 760 1040 560 L1180 560 C1100 780 820 860 900 ${H} Z" fill="${C.pacific}"/>` +
    `<path d="M860 700 l160 -10 -20 22 -150 6 Z" fill="${C.indigoDeep}"/>` + trees(r, 940, 16, C.amazonDark, 70),
  cloudforest: (r) =>
    sky("s", C.stoneLight, C.cream) + `<path d="${ridge(r, 620, 420, 2).d}" fill="${C.amazon}"/>` +
    `<g fill="${C.cream}" opacity=".85"><ellipse cx="400" cy="460" rx="420" ry="60"/><ellipse cx="1200" cy="560" rx="460" ry="70"/></g>` +
    `<path d="${ridge(r, 860, 200, 3).d}" fill="${C.amazonDark}"/>` +
    `<path d="M1050 520 L1050 900" stroke="${C.cream}" stroke-width="16" opacity=".9"/>`,
  glacier: (r) => {
    const back = ridge(r, 520, 360, 2, { snow: true });
    return sky("s", C.pacific, C.cream) + `<path d="${back.d}" fill="${C.stone}"/><path d="${back.caps}" fill="${C.snow}"/>` +
      `<path d="M0 ${H} L0 700 L${W} 680 L${W} ${H} Z" fill="${C.stoneDark}"/>` +
      `<ellipse cx="800" cy="800" rx="520" ry="110" fill="#2fb1b0"/><ellipse cx="800" cy="780" rx="420" ry="60" fill="#5fc9c4" opacity=".7"/>`;
  },
  beach: (r) =>
    sky("s", "#9fd0dc", C.cream) + sun(r, C.mustard, 220) + water(520, C.pacific, C.cream) +
    `<path d="M0 ${H} L0 760 C400 700 900 760 ${W} 700 L${W} ${H} Z" fill="${C.sand}"/>` +
    `<path d="M1240 760 C1260 620 1270 540 1320 460" stroke="${C.stoneDark}" stroke-width="16" fill="none"/>` +
    `<g fill="${C.amazon}"><path d="M1320 460 q-120 -10 -180 60 q100 -40 180 -60Z"/><path d="M1320 460 q120 -30 190 30 q-100 -20 -190 -30Z"/><path d="M1320 460 q-20 -110 60 -160 q-40 80 -60 160Z"/></g>`,
  adobe: (r) =>
    sky("s", C.mustardSoft, C.sand) +
    `<rect x="0" y="380" width="${W}" height="620" fill="${C.sandDark}"/>` +
    Array.from({ length: 5 }, (_, row) =>
      Array.from({ length: 10 }, (_, i) => `<path d="M${60 + i * 150} ${450 + row * 110} l30 -24 30 24 30 -24 30 24" fill="none" stroke="${C.sand}" stroke-width="10"/>`).join(""),
    ).join(""),
  wall: (r) => sky("s", C.creamDeep, C.cream) + stonesWall(r, 120, 10, C.stoneLight, C.stone),
  textile: (r) => {
    const cols = [C.cochineal, C.mustard, C.indigo, C.amazon, C.cream, C.pacific];
    let s = `<rect width="${W}" height="${H}" fill="${C.cochDark}"/>`;
    let y = 0;
    while (y < H) {
      const h = 20 + Math.floor(r() * 70);
      const c = cols[Math.floor(r() * cols.length)];
      s += `<rect y="${y}" width="${W}" height="${h}" fill="${c}"/>`;
      if (h > 50) for (let x = 0; x < W; x += 60) s += `<path d="M${x} ${y + h / 2} l15 -12 15 12 15 -12 15 12" stroke="${C.cream}" stroke-width="4" fill="none" opacity=".7"/>`;
      y += h;
    }
    return s;
  },
  food: (r) =>
    `<rect width="${W}" height="${H}" fill="${C.indigo}"/>` +
    `<circle cx="800" cy="520" r="380" fill="${C.cream}"/><circle cx="800" cy="520" r="300" fill="${C.creamDeep}"/>` +
    Array.from({ length: 12 }, () => `<path d="M${640 + r() * 320} ${380 + r() * 280} l${30 + r() * 30} ${-10 + r() * 20} l-10 ${20 + r() * 20} Z" fill="${C.snow}" stroke="${C.stoneLight}" stroke-width="3"/>`).join("") +
    Array.from({ length: 8 }, () => `<path d="M${600 + r() * 380} ${360 + r() * 300} q30 -10 60 0" stroke="${C.cochineal}" stroke-width="8" fill="none"/>`).join("") +
    `<circle cx="1080" cy="420" r="60" fill="${C.mustard}"/><circle cx="560" cy="660" r="56" fill="${C.terracotta}"/>` +
    `<path d="M520 360 q30 -60 70 -40 q-10 50 -70 40Z" fill="${C.amazonLight}"/>`,
  portrait: (r) => {
    const bg = ["#d6cbc7", "#cfcacb", "#e3ded4", "#9e9496", "#b8aaa5"][Math.floor(r() * 5)];
    return `<rect width="${W}" height="${H}" fill="${bg}"/>` + `<g opacity=".25">${stonesWall(r, 0, 14, bg, C.cream)}</g>` +
      `<circle cx="800" cy="420" r="170" fill="#f1eee9"/><path d="M460 ${H} q30 -380 340 -380 q310 0 340 380 Z" fill="#3e2a2e"/>` +
      ``;
  },
};

function render(scene, seed, label) {
  const r = rng(seed);
  const body = scenes[scene](r);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${label.replace(/"/g, "")}">${body}</svg>`;
}

function write(rel, scene, seed = rel, label = "Placeholder illustration") {
  const p = join(OUT, rel);
  mkdirSync(dirname(p), { recursive: true });
  writeFileSync(p, render(scene, seed, label));
}

for (const slug of ["specialist-1", "specialist-2", "specialist-3", "guide-1", "guide-2"]) write(`team/${slug}.svg`, "portrait", `t-${slug}`, "Placeholder portrait");

console.log("Team placeholder portraits generated in public/images/team");
