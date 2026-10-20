import type { Metadata, Viewport } from "next";
import { Source_Sans_3, Zilla_Slab } from "next/font/google";
import "./globals.css";
import { site } from "@/config/site";
import { TopBar } from "@/components/layout/TopBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CurrencyProvider } from "@/lib/currency";
import { EnquireProvider } from "@/components/enquire/EnquireProvider";
import { JsonLd, organizationLd } from "@/lib/seo";

const zilla = Zilla_Slab({ subsets: ["latin"], weight: ["500", "600", "700"], style: ["normal", "italic"], variable: "--font-zilla", display: "swap" });
const source = Source_Sans_3({ subsets: ["latin"], weight: ["400", "600", "700"], style: ["normal", "italic"], variable: "--font-source", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name}: Peru, done right`, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  openGraph: { type: "website", siteName: site.name, locale: "en_GB" },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = { themeColor: "#23285a", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" data-scroll-behavior="smooth" className={`${zilla.variable} ${source.variable}`}>
      <body className="min-h-dvh antialiased">
        <a href="#main" className="sr-only-focusable fixed left-3 top-3 z-[60] rounded-sm bg-indigo px-4 py-2 font-bold text-cream">
          Skip to content
        </a>
        <CurrencyProvider>
          <EnquireProvider>
            <TopBar />
            <Header />
            <main id="main">{children}</main>
            <Footer />
          </EnquireProvider>
        </CurrencyProvider>
        <JsonLd data={organizationLd()} />
      </body>
    </html>
  );
}
