import { NextResponse } from "next/server";
import { z } from "zod";

const Signup = z.object({ email: z.email(), company: z.string().max(0).optional().or(z.literal("")) });

export async function POST(req: Request) {
  const parsed = Signup.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ ok: false }, { status: 400 });
  console.log("[newsletter]", JSON.stringify({ receivedAt: new Date().toISOString(), email: parsed.data.email }));
  // TODO: CRM integration. Add to the newsletter list (double opt-in).
  return NextResponse.json({ ok: true });
}
