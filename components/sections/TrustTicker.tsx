"use client";

import { useTranslations } from "next-intl";
import { TRUST_TICKER } from "@/lib/constants";

/**
 * Section 03 — Trust Ticker
 * Thin horizontal band with Harvard study reference.
 */
export function TrustTicker() {
  const t = useTranslations("trustTicker");

  return (
    <section
      aria-label="Study Reference"
      className="bg-bg-soft border-y border-border"
    >
      <div className="mx-auto max-w-site px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="shrink-0">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-navy">
            <path
              d="M12 2L3 7v5c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z"
              fill="currentColor"
              opacity="0.15"
            />
            <path
              d="M12 2L3 7v5c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
              fill="none"
            />
            <text x="12" y="15" textAnchor="middle" fill="currentColor" fontSize="8" fontWeight="700" fontFamily="serif">H</text>
          </svg>
        </div>

        <p className="text-[13px] text-muted italic text-center md:text-left flex-1">
          {t("quote")}
        </p>

        <a
          href={TRUST_TICKER.url}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 text-[13px] font-semibold text-navy hover:underline transition-colors duration-200"
        >
          {t("linkLabel")}
        </a>
      </div>
    </section>
  );
}
