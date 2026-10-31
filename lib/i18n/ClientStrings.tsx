import { I18nProvider } from "./context";
import { clientDict, initLocale } from "./server";

/** Ship the translations for the given data to the client components inside. */
export async function ClientStrings({ data, children }: { data: unknown[]; children: React.ReactNode }) {
  const locale = await initLocale();
  if (locale === "en") return <>{children}</>;
  return (
    <I18nProvider locale={locale} dict={clientDict(locale, data, false)}>
      {children}
    </I18nProvider>
  );
}
