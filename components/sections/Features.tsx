"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { FEATURES } from "@/lib/constants";
import { FeatureTabIcons } from "@/components/ui/FeatureTabIcons";
import { FeatureCardStack } from "@/components/ui/FeatureCardStack";

const TAB_KEYS = ["jobSearch", "cvOptimizer", "coverLetter", "coaching"] as const;

/**
 * Section 06 — Features (Tab-based)
 * 4 glassmorphism icon tabs that switch content.
 */
export function Features() {
  const t = useTranslations("features");
  const [active, setActive] = useState(0);
  const tabKey = TAB_KEYS[active];
  // Image data stays in constants (non-translatable asset paths)
  const tabData = FEATURES.tabs[active];

  // Build bullets array from translations
  const bulletCount = tabKey === "coverLetter" ? 4 : 3;
  const bullets = Array.from({ length: bulletCount }, (_, i) =>
    t(`tabs.${tabKey}.bullets.${i}`)
  );

  return (
    <section id="features" aria-label="Features" className="bg-white px-6 py-16 md:py-24">
      <div className="mx-auto max-w-site">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-[32px] md:text-[40px] font-bold text-text leading-tight">
            {t("headline")}
          </h2>
          <p className="mt-4 text-[16px] text-muted">
            {t("subline")}
          </p>
        </div>

        <div className="mb-12">
          <FeatureTabIcons activeIndex={active} onTabChange={setActive} />
        </div>

        <div
          key={active}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center animate-fade-in"
        >
          <div>
            <h3 className="text-[24px] font-semibold text-text leading-snug">
              {t(`tabs.${tabKey}.headline`)}
            </h3>
            <ul className="mt-6 space-y-4">
              {bullets.map((bullet, i) => (
                <li key={i} className="flex items-start gap-3">
                  <svg
                    width="20" height="20" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                    className="text-navy shrink-0 mt-0.5"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <span className="text-[16px] text-muted leading-relaxed">{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          {"cards" in tabData && tabData.cards ? (
            <FeatureCardStack images={tabData.cards} />
          ) : (
            <div className="relative aspect-[4/3] rounded-lg border border-border bg-bg-soft overflow-hidden shadow-md">
              <img
                src={tabData.screen}
                alt={t(`tabs.${tabKey}.label`)}
                className="object-cover w-full h-full"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
