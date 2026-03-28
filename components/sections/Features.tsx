"use client";

import { useState } from "react";
import Image from "next/image";
import { FEATURES } from "@/lib/constants";
import { FeatureTabIcons } from "@/components/ui/FeatureTabIcons";
import { FeatureCardStack } from "@/components/ui/FeatureCardStack";

/**
 * Section 06 — Features (Tab-based)
 * 4 glassmorphism icon tabs that switch content: left side has headline + 3 bullets,
 * right side shows a swipeable card stack or single screenshot fallback.
 */
export function Features() {
  const [active, setActive] = useState(0);
  const tab = FEATURES.tabs[active];

  return (
    <section id="features" aria-label="Features" className="bg-white px-6 py-16 md:py-24">
      <div className="mx-auto max-w-site">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-[32px] md:text-[40px] font-bold text-text leading-tight">
            {FEATURES.headline}
          </h2>
          <p className="mt-4 text-[16px] text-muted">
            {FEATURES.subline}
          </p>
        </div>

        {/* Tab Navigation — Glassmorphism Icon Cards */}
        <div className="mb-12">
          <FeatureTabIcons activeIndex={active} onTabChange={setActive} />
        </div>

        {/* Tab Content — CSS transition instead of AnimatePresence */}
        <div
          key={active}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center animate-fade-in"
        >
          {/* Left: Text */}
          <div>
            <h3 className="text-[24px] font-semibold text-text leading-snug">
              {tab.headline}
            </h3>
            <ul className="mt-6 space-y-4">
              {tab.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-navy shrink-0 mt-0.5"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <span className="text-[16px] text-muted leading-relaxed">{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Card Stack or Screenshot fallback */}
          {"cards" in tab && tab.cards ? (
            <FeatureCardStack images={tab.cards} />
          ) : (
            <div className="relative aspect-[4/3] rounded-lg border border-border bg-bg-soft overflow-hidden shadow-md">
              <Image
                src={tab.screen}
                alt={tab.label}
                fill
                className="object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
