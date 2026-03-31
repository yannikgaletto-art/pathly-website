import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { SITE, COOKIE_CONSENT } from "@/lib/constants";
import "./globals.css";

const CookieBanner = dynamic(() => import("@/components/ui/CookieBanner"), {
  ssr: false,
});

export const metadata: Metadata = {
  title: `${SITE.name} — ${SITE.tagline}`,
  description: SITE.description,
  metadataBase: new URL(`https://${SITE.domain}`),
  openGraph: {
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    url: `https://${SITE.domain}`,
    siteName: SITE.name,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: SITE.name }],
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
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
        {children}
        <CookieBanner />
        <noscript>
          <div
            className="fixed bottom-0 left-0 right-0 z-[100]
                       bg-white border-t border-border px-6 py-4
                       text-[13px] text-muted text-center"
          >
            {COOKIE_CONSENT.noscript}
          </div>
        </noscript>
      </body>
    </html>
  );
}
