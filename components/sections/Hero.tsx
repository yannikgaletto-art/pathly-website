"use client";

import { useTranslations } from "next-intl";
import { ShimmerButton } from "@/components/ui/ShimmerButton";
import { FeatureChip } from "@/components/ui/FeatureChip";
import { PhoneCarousel } from "@/components/ui/PhoneCarousel";
import { CountUp } from "@/components/ui/CountUp";

/**
 * Hero section.
 * Layout: headline fills viewport (animated by ScrollSection).
 * Below-fold: subline, CTAs, phone mockup, stats.
 */
export function Hero() {
  const t = useTranslations("hero");
  const tStats = useTranslations("stats");

  const stats = [
    { value: Number(tStats("ats.value")), suffix: tStats("ats.suffix"), label: tStats("ats.label") },
    { value: Number(tStats("interviews.value")), suffix: tStats("interviews.suffix"), label: tStats("interviews.label") },
    { value: Number(tStats("scanTime.value")), suffix: tStats("scanTime.suffix"), label: tStats("scanTime.label") },
  ];

  const chips = [t("chips.cv"), t("chips.dsgvo"), t("chips.coverLetter"), t("chips.coaching")];

  return (
    <section aria-label="Hero" className="relative bg-white">
      {/* Full-viewport Headline Block */}
      <div className="flex items-start pt-[16vh] md:pt-[12vh] px-6 md:px-10 lg:px-16 min-h-[100svh]">
        <div className="text-center md:text-left md:ml-[32%] lg:ml-[30%] w-full">
          <h1
            className="text-[clamp(1.5rem,3.8vw,3.4rem)] font-bold text-text leading-[1.12] tracking-[-0.025em]"
            style={{ visibility: "hidden" }}
          >
            {t("headline")}
          </h1>
        </div>
      </div>

      {/* Below-fold content */}
      <div className="mx-auto max-w-site px-6 pb-16 md:pb-24">
        <div className="flex flex-col items-center text-center gap-8">
          <p className="text-[18px] text-muted leading-[1.7] max-w-2xl">
            {t("subheadline")}
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <ShimmerButton href="#waitlist" size="lg">
              {t("cta")}
            </ShimmerButton>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-body font-medium text-text hover:border-navy hover:text-navy transition-colors duration-200"
            >
              {t("ctaSecondary")}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          <div className="relative w-full flex justify-center mt-4">
            <div className="absolute z-10 top-[12%] left-[5%] hidden md:block">
              <FeatureChip label={chips[0]} delay={0} />
            </div>
            <div className="absolute z-10 bottom-[20%] left-[5%] hidden md:block">
              <FeatureChip label={chips[1]} delay={0.15} />
            </div>
            <div className="absolute z-10 top-[12%] right-[5%] hidden md:block">
              <FeatureChip label={chips[2]} delay={0.3} />
            </div>
            <div className="absolute z-10 bottom-[20%] right-[5%] hidden md:block">
              <FeatureChip label={chips[3]} delay={0.45} />
            </div>
            <PhoneCarousel />
          </div>

          <div className="w-full grid grid-cols-3 divide-x divide-border max-w-2xl mt-2">
            {stats.map((stat) => (
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

      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-navy-tint rounded-full blur-3xl opacity-40 pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-navy-tint rounded-full blur-3xl opacity-30 pointer-events-none" />
    </section>
  );
}
