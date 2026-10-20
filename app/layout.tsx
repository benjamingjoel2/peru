import type { Metadata, Viewport } from "next";
import { Crimson_Pro, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { site } from "@/config/site";
import { TopBar } from "@/components/layout/TopBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CurrencyProvider } from "@/lib/currency";
import { EnquireProvider } from "@/components/enquire/EnquireProvider";
import { JsonLd, organizationLd } from "@/lib/seo";

const serif = Crimson_Pro({ subsets: ["latin"], weight: ["300", "400", "500"], style: ["normal", "italic"], variable: "--font-serif", display: "swap" });
const grotesk = Hanken_Grotesk({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-grotesk", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name}: Peru, done right`, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  openGraph: { type: "website", siteName: site.name, locale: "en_GB" },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = { themeColor: "#3e2a2e", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" data-scroll-behavior="smooth" className={`${serif.variable} ${grotesk.variable}`}>
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
