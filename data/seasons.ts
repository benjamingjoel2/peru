import type { Month } from "./types";

/** Seasons in the Andes (roughly; verify each year). */
export const seasonByMonth: Record<Month, { andes: "dry" | "wet" | "shoulder"; incaTrailOpen: boolean; note: string }> = {
  Jan: { andes: "wet", incaTrailOpen: true, note: "Wet season in the Andes; summer sun on the coast." },
  Feb: { andes: "wet", incaTrailOpen: false, note: "Wettest month. Inca Trail closed for maintenance." },
  Mar: { andes: "wet", incaTrailOpen: true, note: "Wet season easing; green valleys." },
  Apr: { andes: "shoulder", incaTrailOpen: true, note: "Shoulder season: green and quieter." },
  May: { andes: "dry", incaTrailOpen: true, note: "Dry season begins. Clear days, cold nights." },
  Jun: { andes: "dry", incaTrailOpen: true, note: "Dry season. Inti Raymi in Cusco; busy." },
  Jul: { andes: "dry", incaTrailOpen: true, note: "Dry season and peak demand." },
  Aug: { andes: "dry", incaTrailOpen: true, note: "Dry season and peak demand; windy." },
  Sep: { andes: "dry", incaTrailOpen: true, note: "Dry season, a little quieter." },
  Oct: { andes: "shoulder", incaTrailOpen: true, note: "Shoulder season: some showers." },
  Nov: { andes: "shoulder", incaTrailOpen: true, note: "Rains begin in the Andes." },
  Dec: { andes: "wet", incaTrailOpen: true, note: "Wet season in the Andes; summer starts on the coast." },
};

export const monthNames: Record<Month, string> = {
  Jan: "January", Feb: "February", Mar: "March", Apr: "April", May: "May", Jun: "June",
  Jul: "July", Aug: "August", Sep: "September", Oct: "October", Nov: "November", Dec: "December",
};
