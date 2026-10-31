import { journeyBySlug } from "@/data/journeys";
import { verifyDownload } from "@/lib/token";
// Rendered at build time by scripts/build-itineraries.mjs (components/pdf/ItineraryDocument.tsx),
// so the PDF library stays out of the server bundle.
import { itineraryPdfs } from "@/lib/itineraryPdfs.generated.mjs";

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const j = journeyBySlug(slug);
  const pdf = j ? itineraryPdfs[slug] : undefined;
  if (!pdf) return new Response("Not found", { status: 404 });

  // Gated: only served with a token issued by /api/leads after the download form
  const token = new URL(req.url).searchParams.get("token");
  if (!verifyDownload(slug, token)) return new Response("This link has expired. Please request the itinerary again.", { status: 403 });

  return new Response(Buffer.from(pdf, "base64"), {
    headers: {
      "content-type": "application/pdf",
      "content-disposition": `attachment; filename="${slug}-itinerary.pdf"`,
      "cache-control": "private, no-store",
    },
  });
}
