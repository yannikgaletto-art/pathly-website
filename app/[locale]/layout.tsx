import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { routing } from "@/i18n/routing";
import { SITE } from "@/lib/constants";
import type { Metadata } from "next";

const CookieBanner = dynamic(() => import("@/components/ui/CookieBanner"), {
  ssr: false,
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`@/messages/${locale}.json`)).default;

  return {
    title: `${SITE.name} — ${messages.site.tagline}`,
    description: messages.site.description,
    metadataBase: new URL(`https://${SITE.domain}`),
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: '48x48' },
        { url: '/icon_32.png', sizes: '32x32', type: 'image/png' },
        { url: '/icon.png', sizes: '1024x1024', type: 'image/png' },
      ],
      apple: [
        { url: '/apple-icon.png', sizes: '1024x1024', type: 'image/png' },
      ],
    },
    openGraph: {
      title: `${SITE.name} — ${messages.site.tagline}`,
      description: messages.site.description,
      url: `https://${SITE.domain}`,
      siteName: SITE.name,
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: SITE.name }],
      locale: locale === "de" ? "de_DE" : locale === "es" ? "es_ES" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${SITE.name} — ${messages.site.tagline}`,
      description: messages.site.description,
      images: ["/og-image.png"],
    },
    robots: { index: true, follow: true },
    alternates: {
      languages: {
        de: `https://${SITE.domain}`,
        en: `https://${SITE.domain}/en`,
        es: `https://${SITE.domain}/es`,
      },
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <link
          rel="preload"
          href="/fonts/Geist-Variable.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className="font-sans antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
          <CookieBanner />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
