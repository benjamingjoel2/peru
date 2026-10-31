import type { Metadata, Viewport } from "next";
import { Crimson_Pro, Hanken_Grotesk } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { site } from "@/config/site";
import { TopBar } from "@/components/layout/TopBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CurrencyProvider } from "@/lib/currency";
import { EnquireProvider } from "@/components/enquire/EnquireProvider";
import { JsonLd, organizationLd } from "@/lib/seo";
import { clientDict, initLocale } from "@/lib/i18n/server";
import { I18nProvider } from "@/lib/i18n/context";
import { htmlLang, isLocale, locales, ogLocale, t } from "@/lib/i18n";
import { mainNav } from "@/lib/nav";
import { zones } from "@/data/zones";
import { journeys } from "@/data/journeys";
import { monthNames, monthShort, seasonByMonth } from "@/data/seasons";
import { priorityCountries, otherCountries } from "@/data/countries";
import { altitudeBands, tipText } from "@/lib/altitude";
import { mpRoutes, mpRulesNote } from "@/config/machuPicchu";

const serif = Crimson_Pro({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-serif", display: "swap" });
const grotesk = Hanken_Grotesk({ subsets: ["latin"], variable: "--font-grotesk", display: "swap" });

export const dynamicParams = false;
export const generateStaticParams = () => locales.map((locale) => ({ locale }));

export async function generateMetadata(): Promise<Metadata> {
  const locale = await initLocale();
  return {
    metadataBase: new URL(site.url),
    title: { default: `${site.name}: ${t("Peru, done right")}`, template: `%s | ${site.name}` },
    description: t(site.description),
    applicationName: site.name,
    openGraph: { type: "website", siteName: site.name, locale: ogLocale[locale] },
    twitter: { card: "summary_large_image" },
  };
}

export const viewport: Viewport = { themeColor: "#3e2a2e", width: "device-width", initialScale: 1 };

export default async function RootLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale: l } = await params;
  if (!isLocale(l)) notFound();
  const locale = await initLocale();
  const dict = clientDict(locale, [
    zones, monthNames, monthShort, seasonByMonth, mpRoutes, priorityCountries, otherCountries, altitudeBands, tipText,
    journeys.map((j) => ({ title: j.title })),
    { hours: site.contact.hours, tz: site.contact.timezoneLabel, address: site.address.full, rules: mpRulesNote },
  ]);
  return (
    <html lang={htmlLang[locale]} data-scroll-behavior="smooth" className={`${serif.variable} ${grotesk.variable}`}>
      <body className="min-h-dvh antialiased">
        <I18nProvider locale={locale} dict={dict}>
          <a href="#main" className="sr-only-focusable fixed left-3 top-3 z-[60] rounded-sm bg-indigo px-4 py-2 font-bold text-cream">
            {t("Skip to content")}
          </a>
          <CurrencyProvider>
            <EnquireProvider>
              <TopBar />
              <Header nav={mainNav} />
              <main id="main">{children}</main>
              <Footer />
            </EnquireProvider>
          </CurrencyProvider>
        </I18nProvider>
        <JsonLd data={organizationLd()} />
      </body>
    </html>
  );
}
