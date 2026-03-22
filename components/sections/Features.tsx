"use client";

import { useState } from "react";
import Image from "next/image";
import { FEATURES } from "@/lib/constants";

/**
 * Section 06 — Features (Tab-based)
 * 4 horizontal tabs that switch content: left side has headline + 3 bullets,
 * right side shows a placeholder/screenshot image.
 * No Framer Motion AnimatePresence — uses CSS transitions for tab switching.
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

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {FEATURES.tabs.map((t, i) => (
            <button
              key={t.label}
              onClick={() => setActive(i)}
              className={`px-5 py-2.5 rounded-md text-[14px] font-medium transition-all duration-200 ${
                active === i
                  ? "bg-navy text-white shadow-sm"
                  : "bg-transparent text-muted hover:text-navy hover:bg-navy-tint"
              }`}
            >
              {t.label}
            </button>
          ))}
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

          {/* Right: Screenshot */}
          <div className="relative aspect-[4/3] rounded-xl border border-border bg-bg-soft overflow-hidden shadow-lg">
            <Image
              src={tab.screen}
              alt={tab.label}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
