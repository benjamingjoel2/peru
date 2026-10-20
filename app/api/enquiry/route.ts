import { NextResponse } from "next/server";
import { z } from "zod";

const Enquiry = z.object({
  journey: z.string().max(100).optional(),
  budgetConfirmed: z.literal(true, { error: "Please confirm the budget fits what you have in mind." }),
  month: z.string().min(1, "Please choose a month."),
  year: z.coerce.number().int().min(2024).max(2100),
  days: z.number().int().min(3, "Trips are at least 3 days.").max(60),
  experience: z.enum(["first-time", "returning"]).optional(),
  mustSees: z.array(z.string().max(50)).max(10),
  hiking: z.enum(["none", "easy", "moderate", "challenging"]).optional(),
  machuPicchuRoute: z.string().max(50).optional(),
  interests: z.array(z.string().max(50)).max(20),
  adults: z.number().int().min(1).max(20),
  childrenAges: z.array(z.number().int().min(0).max(17)).max(10),
  country: z.string().min(1, "Please choose your country of residence.").max(80),
  name: z.string().trim().min(1, "Please tell us your name.").max(120),
  email: z.email("Please enter a valid email address."),
  phone: z.string().max(40).optional().or(z.literal("")),
  preferredContact: z.enum(["email", "whatsapp", "phone"]),
  notes: z.string().max(4000).optional().or(z.literal("")),
  company: z.string().max(0).optional().or(z.literal("")), // honeypot
});

export async function POST(req: Request) {
  const json = await req.json().catch(() => null);
  const parsed = Enquiry.safeParse(json);
  if (!parsed.success) {
    // Silently accept bot submissions caught by the honeypot
    if (json && typeof json.company === "string" && json.company.length > 0) return NextResponse.json({ ok: true });
    return NextResponse.json({ ok: false, errors: parsed.error.issues.map((i) => i.message) }, { status: 400 });
  }

  const { company: _honeypot, ...enquiry } = parsed.data;
  void _honeypot;
  console.log("[enquiry]", JSON.stringify({ receivedAt: new Date().toISOString(), ...enquiry }));
  // TODO: CRM integration. Send to the CRM (e.g. HubSpot/Pipedrive) and notify the Peru Specialist team.

  return NextResponse.json({ ok: true });
}
