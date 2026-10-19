import { NextResponse } from "next/server";
import { z } from "zod";
import { journeyBySlug } from "@/data/journeys";
import { signDownload } from "@/lib/token";

const Lead = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.email(),
  country: z.string().min(1).max(80),
  journey: z.string().max(100),
  source: z.literal("itinerary-download"),
  newsletter: z.string().optional(),
  company: z.string().max(0).optional().or(z.literal("")),
});

export async function POST(req: Request) {
  const parsed = Lead.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ ok: false, errors: parsed.error.issues.map((i) => i.message) }, { status: 400 });
  const { company: _honeypot, ...lead } = parsed.data;
  void _honeypot;
  if (!journeyBySlug(lead.journey)) return NextResponse.json({ ok: false, errors: ["Unknown journey"] }, { status: 404 });

  console.log("[lead]", JSON.stringify({ receivedAt: new Date().toISOString(), ...lead, newsletter: lead.newsletter === "on" }));
  // TODO: CRM integration. Create/update the contact and tag it with the journey.

  const token = signDownload(lead.journey);
  return NextResponse.json({ ok: true, downloadUrl: `/api/itinerary/${lead.journey}?token=${encodeURIComponent(token)}` });
}
