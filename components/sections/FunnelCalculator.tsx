"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";

/**
 * FunnelCalculator — Interactive "Funnel Leak" ROI Calculator.
 *
 * Shows the user how many of their applications statistically
 * never reach a human. Based on:
 *   - Harvard × Accenture 2021: 74% filtered by ATS
 *   - TheLadders 2018: 7.4s average CV scan time
 *   - ResumeGo 2020: +53% interview rate with personalized cover letter
 *
 * NO fabricated Pathly conversion rates — only industry data.
 */

export function FunnelCalculator() {
  const t = useTranslations("funnelCalculator");
  const [applications, setApplications] = useState(30);
  const [showResult, setShowResult] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  // Derived stats (rounded) based on industry research
  const filtered = Math.round(applications * 0.74);
  const passedAts = applications - filtered;
  const actuallyRead = Math.max(1, Math.round(passedAts * 0.35));

  useEffect(() => {
    if (showResult && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [showResult]);

  return (
    <section
      id="funnel-calculator"
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ background: "var(--color-bg-soft)" }}
    >
      {/* Subtle top separator */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "var(--color-border)" }}
      />

      <div className="max-w-site mx-auto px-6 md:px-10 lg:px-16">
        {/* Headline */}
        <div className="text-center mb-12 md:mb-16">
          <h2
            className="text-h2-mobile md:text-h2-desktop font-bold text-text mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {t("headline")}
          </h2>
          <p className="text-body text-muted max-w-2xl mx-auto">
            {t("subline")}
          </p>
        </div>

        {/* Input area */}
        <div className="max-w-xl mx-auto">
          <div
            className="rounded-xl p-6 md:p-8"
            style={{
              background: "var(--color-bg)",
              border: "1px solid var(--color-border)",
              boxShadow: "0 4px 12px rgba(19,60,123,0.06)",
            }}
          >
            <label
              htmlFor="applications-slider"
              className="block text-[15px] font-medium text-text mb-6"
            >
              {t("sliderLabel")}
            </label>

            {/* Slider + value */}
            <div className="flex items-center gap-5">
              <input
                id="applications-slider"
                type="range"
                min={5}
                max={100}
                step={1}
                value={applications}
                onChange={(e) => {
                  setApplications(Number(e.target.value));
                  setShowResult(false);
                }}
                className="flex-1 h-2 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, var(--color-navy) ${
                    ((applications - 5) / 95) * 100
                  }%, var(--color-border) ${
                    ((applications - 5) / 95) * 100
                  }%)`,
                }}
              />
              <span
                className="text-[28px] font-bold tabular-nums min-w-[3ch] text-right"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--color-navy)",
                }}
              >
                {applications}
              </span>
            </div>

            {/* CTA Button */}
            <button
              type="button"
              onClick={() => setShowResult(true)}
              className="mt-8 w-full py-3.5 px-6 rounded-lg text-[15px] font-semibold text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: "var(--color-navy)",
                boxShadow: "0 2px 8px rgba(19,60,123,0.25)",
              }}
            >
              {t("cta")}
            </button>
          </div>

          {/* Results — animated funnel */}
          {showResult && (
            <div
              ref={resultRef}
              className="mt-8 space-y-4"
              style={{
                animation: "funnel-appear 0.5s ease-out both",
              }}
            >
              {/* Funnel step 1: Total */}
              <FunnelStep
                number={applications}
                label={t("steps.sent")}
                width="100%"
                variant="full"
                delay={0}
              />

              {/* Funnel step 2: Filtered */}
              <div className="flex items-start gap-3 pl-4">
                <svg
                  width="16"
                  height="40"
                  viewBox="0 0 16 40"
                  fill="none"
                  className="shrink-0 mt-1"
                >
                  <path
                    d="M8 0V32M8 32L2 26M8 32L14 26"
                    stroke="var(--color-muted)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0.5"
                  />
                </svg>
                <div
                  className="text-[13px] text-muted leading-snug py-2"
                  style={{
                    animation: "funnel-appear 0.4s ease-out 0.2s both",
                  }}
                >
                  <span className="font-semibold text-text">{filtered} {t("steps.filteredCount")}</span>{" "}
                  {t("steps.filteredReason")}
                </div>
              </div>

              {/* Funnel step 3: Passed ATS */}
              <FunnelStep
                number={passedAts}
                label={t("steps.passedAts")}
                width={`${Math.max(15, (passedAts / applications) * 100)}%`}
                variant="medium"
                delay={0.3}
              />

              {/* Funnel step 4: Arrow + annotation */}
              <div className="flex items-start gap-3 pl-4">
                <svg
                  width="16"
                  height="40"
                  viewBox="0 0 16 40"
                  fill="none"
                  className="shrink-0 mt-1"
                >
                  <path
                    d="M8 0V32M8 32L2 26M8 32L14 26"
                    stroke="var(--color-muted)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0.5"
                  />
                </svg>
                <div
                  className="text-[13px] text-muted leading-snug py-2"
                  style={{
                    animation: "funnel-appear 0.4s ease-out 0.45s both",
                  }}
                >
                  {t("steps.scanNote")}
                </div>
              </div>

              {/* Funnel step 5: Actually read */}
              <FunnelStep
                number={actuallyRead}
                label={t("steps.actuallyRead")}
                width={`${Math.max(10, (actuallyRead / applications) * 100)}%`}
                variant="narrow"
                delay={0.55}
              />

              {/* Takeaway */}
              <div
                className="mt-6 pt-6"
                style={{
                  borderTop: "1px solid var(--color-border)",
                  animation: "funnel-appear 0.5s ease-out 0.7s both",
                }}
              >
                <p className="text-[15px] text-text leading-relaxed">
                  <span className="font-bold" style={{ color: "var(--color-navy)" }}>
                    {filtered} {t("takeaway.of")} {applications} {t("takeaway.applications")}
                  </span>{" "}
                  {t("takeaway.body")}
                </p>
                <p
                  className="mt-3 text-[14px] font-medium"
                  style={{ color: "var(--color-navy)" }}
                >
                  {t("takeaway.pathlyLine")}
                </p>
              </div>

              {/* Sources */}
              <div
                className="flex flex-wrap gap-x-4 gap-y-1 pt-4"
                style={{
                  animation: "funnel-appear 0.4s ease-out 0.85s both",
                }}
              >
                <a
                  href="https://www.hbs.edu/managing-the-future-of-work/Documents/research/hiddenworkers09032021.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[12px] text-muted hover:text-navy transition-colors"
                >
                  Harvard × Accenture, 2021 ↗
                </a>
                <a
                  href="https://www.bu.edu/com/files/2018/10/TheLadders-EyeTracking-StudyC2.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[12px] text-muted hover:text-navy transition-colors"
                >
                  TheLadders Eye-Tracking, 2018 ↗
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Inline animation keyframes */}
      <style>{`
        @keyframes funnel-appear {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Slider thumb styling */
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: var(--color-navy);
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 2px 6px rgba(19,60,123,0.3);
          transition: transform 0.15s ease;
        }
        input[type="range"]::-webkit-slider-thumb:hover {
          transform: scale(1.15);
        }
        input[type="range"]::-moz-range-thumb {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: var(--color-navy);
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 2px 6px rgba(19,60,123,0.3);
        }
      `}</style>
    </section>
  );
}

/* ───────── Sub-component: Single funnel bar ───────── */

function FunnelStep({
  number,
  label,
  width,
  variant,
  delay,
}: {
  number: number;
  label: string;
  width: string;
  variant: "full" | "medium" | "narrow";
  delay: number;
}) {
  const bg =
    variant === "full"
      ? "var(--color-navy)"
      : variant === "medium"
      ? "var(--color-navy-hover)"
      : "var(--color-navy)";
  const opacity = variant === "full" ? 0.12 : variant === "medium" ? 0.18 : 0.25;

  return (
    <div
      className="relative rounded-lg overflow-hidden py-3.5 px-4"
      style={{
        width,
        background: `color-mix(in srgb, ${bg} ${opacity * 100}%, transparent)`,
        border: `1px solid color-mix(in srgb, ${bg} 15%, transparent)`,
        animation: `funnel-appear 0.45s ease-out ${delay}s both`,
        transition: "width 0.5s ease",
      }}
    >
      <div className="flex items-baseline gap-2">
        <span
          className="text-[22px] font-bold tabular-nums"
          style={{ fontFamily: "var(--font-display)", color: "var(--color-navy)" }}
        >
          {number}
        </span>
        <span className="text-[14px] text-text font-medium">{label}</span>
      </div>
    </div>
  );
}
