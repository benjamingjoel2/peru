import { renderToBuffer } from "@react-pdf/renderer";
import { journeyBySlug } from "@/data/journeys";
import { verifyDownload } from "@/lib/token";
import { ItineraryDocument } from "@/components/pdf/ItineraryDocument";

export const runtime = "nodejs";

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const j = journeyBySlug(slug);
  if (!j) return new Response("Not found", { status: 404 });

  // Gated: only served with a token issued by /api/leads after the download form
  const token = new URL(req.url).searchParams.get("token");
  if (!verifyDownload(slug, token)) return new Response("This link has expired. Please request the itinerary again.", { status: 403 });

  const pdf = await renderToBuffer(<ItineraryDocument j={j} />);
  return new Response(new Uint8Array(pdf), {
    headers: {
      "content-type": "application/pdf",
      "content-disposition": `attachment; filename="${slug}-itinerary.pdf"`,
      "cache-control": "private, no-store",
    },
  });
}
