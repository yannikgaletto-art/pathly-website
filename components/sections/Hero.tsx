"use client";

import { HERO, STATS } from "@/lib/constants";
import { ShimmerButton } from "@/components/ui/ShimmerButton";
import { FeatureChip } from "@/components/ui/FeatureChip";
import { PhoneCarousel } from "@/components/ui/PhoneCarousel";
import { CountUp } from "@/components/ui/CountUp";
import { HighlightText } from "@/components/ui/HighlightText";

/**
 * Hero section.
 *
 * Layout: The headline fills the viewport as a single line, no
 * distractions — no badges, no subline, no CTAs above the fold.
 * "gesehen zu werden." has a marker-highlight + "Pathly" badge
 * that sweeps in (inspired by ready.so Febby animation).
 */
export function Hero() {
  return (
    <section
      aria-label="Hero"
      className="relative overflow-hidden bg-white"
    >
      {/* ── Full-viewport Headline Block ──────────────────────── */}
      <div className="flex items-center justify-center min-h-[100svh] px-6">
        <div className="text-center w-full">
          {/* Headline — single line, smaller font to fit */}
          <h1
            className="hero-fade-in-delay-1 text-[clamp(1.75rem,4.2vw,3.5rem)] font-bold text-text leading-[1.15] tracking-[-0.03em] whitespace-nowrap"
          >
            Jeder verdient es,{" "}
            <HighlightText color="#CADCF2" delay={400} badge="Pathly" badgeColor="#CADCF2">
              gesehen zu werden.
            </HighlightText>
          </h1>


        </div>
      </div>

      {/* ── Below-fold content ────────────────────────────────── */}
      <div className="mx-auto max-w-site px-6 pb-16 md:pb-24">
        <div className="flex flex-col items-center text-center gap-8">

          {/* Subline */}
          <p className="text-[18px] text-muted leading-[1.7] max-w-2xl">
            {HERO.subheadline}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap justify-center gap-4">
            <ShimmerButton href="#waitlist" size="lg">
              Kostenlos starten →
            </ShimmerButton>
            {/* Ghost secondary button */}
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-body font-medium text-text hover:border-navy hover:text-navy transition-colors duration-200"
            >
              Demo ansehen
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          {/* Phone Mockup + Chip Cluster */}
          <div className="relative w-full flex justify-center mt-4">
            {/* Floating chips — hidden on mobile */}
            <div className="absolute z-10 top-[12%] left-[5%] hidden md:block">
              <FeatureChip label={HERO.chips[0]} delay={0} />
            </div>
            <div className="absolute z-10 bottom-[20%] left-[5%] hidden md:block">
              <FeatureChip label={HERO.chips[1]} delay={0.15} />
            </div>
            <div className="absolute z-10 top-[12%] right-[5%] hidden md:block">
              <FeatureChip label={HERO.chips[2]} delay={0.3} />
            </div>
            <div className="absolute z-10 bottom-[20%] right-[5%] hidden md:block">
              <FeatureChip label={HERO.chips[3]} delay={0.45} />
            </div>

            <PhoneCarousel />
          </div>

          {/* Stats Row */}
          <div className="w-full grid grid-cols-3 divide-x divide-border max-w-2xl mt-2">
            {STATS.map((stat) => (
              <div key={stat.label} className="px-8 py-4 text-center first:pl-0 last:pr-0">
                <CountUp
                  value={stat.value}
                  suffix={stat.suffix}
                  className="text-[36px] font-bold text-navy leading-none"
                />
                <p className="mt-2 text-[13px] text-muted leading-snug">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Background gradient blobs */}
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-navy-tint rounded-full blur-3xl opacity-40 pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-navy-tint rounded-full blur-3xl opacity-30 pointer-events-none" />
    </section>
  );
}
