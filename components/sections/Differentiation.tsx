"use client";

import { useRef, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";

/**
 * Section 07 — Differentiation
 * One pill per row, full-width, slight horizontal drift + rotation.
 * Pills fall from above the container (clipped by overflow-hidden) and stack.
 * No text cut-off, no shadow.
 */

const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;

// Small horizontal drift (px) and rotation (deg) per pill index
// — enough to look organic, never enough to clip text
const ROT = [-2, 3, -1, 2, -3, 1, -2, 3, -1];

const ROW_KEYS = ["writingStyle", "ats", "privacy", "tracking", "coaching", "video", "pomodoro", "gaps", "community"] as const;

export function Differentiation() {
  const t = useTranslations("differentiation");
  const sectionRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  const animateDrop = useCallback(() => {
    const el = sectionRef.current;
    if (!el || hasAnimated.current) return;
    hasAnimated.current = true;

    const pills = el.querySelectorAll<HTMLElement>("[data-pill]");
    pills.forEach((pill, i) => {
      setTimeout(() => {
        pill.style.transition =
          "transform 1.1s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.45s ease-out";
        pill.style.opacity = "1";
        pill.style.transform = `translateY(0) rotate(${pill.dataset.rot}deg)`;
      }, i * 150);
    });
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { animateDrop(); observer.disconnect(); }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [animateDrop]);

  const rows = ROW_KEYS.map((key) => ({
    pathly: t(`rows.${key}.pathly`),
    others: t(`rows.${key}.others`),
  }));

  /* ── shared pill renderer ── */
  const renderPill = (
    label: string,
    mark: "check" | "cross",
    i: number,
    side: "left" | "right"
  ) => {
    const rot = side === "left" ? ROT[i % ROT.length] : -ROT[i % ROT.length];

    const isCheck = mark === "check";

    return (
      <div
        key={`${side}-${i}`}
        data-pill
        data-rot={rot}
        className="opacity-0 w-full"
        style={{
          transform: `translateY(-520px) rotate(${rot}deg)`,
        }}
      >
        <div
          className={`relative flex items-center justify-between gap-3 rounded-full overflow-hidden px-5 py-3 w-full ${
            isCheck
              ? "border border-white/60"
              : "border border-white/15"
          }`}
        >
          {/* Radial glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: isCheck
                ? "radial-gradient(circle at 0% 100%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.45) 50%, rgba(255,255,255,0.08) 100%)"
                : "radial-gradient(circle at 0% 100%, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 50%, rgba(0,0,0,0.1) 100%)",
            }}
          />
          {/* Noise texture */}
          <div
            className="absolute inset-0 opacity-[0.3] mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage: NOISE_SVG,
              WebkitMaskImage: "radial-gradient(circle at 0% 100%, black 0%, transparent 60%)",
              maskImage: "radial-gradient(circle at 0% 100%, black 0%, transparent 60%)",
            }}
          />

          {/* Label */}
          <span
            className={`relative z-10 font-semibold text-[14px] ${
              isCheck ? "text-navy" : "text-white/55"
            }`}
          >
            {label}
          </span>

          {/* Icon — white liquid SVG, far right */}
          <span className="relative z-10 shrink-0 w-5 h-5 flex items-center justify-center">
            {isCheck ? (
              <svg
                width="14" height="14" viewBox="0 0 24 24"
                fill="none" stroke="rgba(255,255,255,0.85)"
                strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            ) : (
              <svg
                width="12" height="12" viewBox="0 0 24 24"
                fill="none" stroke="rgba(255,255,255,0.45)"
                strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            )}
          </span>
        </div>
      </div>
    );
  };

  return (
    <section
      id="differentiation"
      aria-label="Warum Pathly"
      className="bg-navy px-6 py-16 md:py-24"
    >
      <div className="mx-auto max-w-site">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-[32px] md:text-[40px] font-bold text-white leading-tight">
            {t("headline")}
          </h2>
          <p className="mt-4 text-[16px] text-white/70">
            {t("subline")}
          </p>
        </div>

        {/* Two-card comparison */}
        <div
          ref={sectionRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mt-16 max-w-5xl mx-auto"
        >
          {/* ─── Left card: Pathly ─── */}
          <div className="bg-white/[0.06] border border-white/15 backdrop-blur-sm rounded-[2rem] p-8 overflow-hidden">
            <h3 className="text-white font-bold text-[22px] mb-6">
              {t("leftTitle")}
            </h3>
            {/* overflow-hidden clips pills as they fall in from above */}
            <div className="overflow-hidden">
              <div className="flex flex-col gap-3">
                {rows.map((row, i) =>
                  renderPill(row.pathly, "check", i, "left")
                )}
              </div>
            </div>
          </div>

          {/* ─── Right card: Andere KI-Tools ─── */}
          <div className="bg-black/20 border border-white/10 rounded-[2rem] p-8 overflow-hidden">
            <h3 className="text-white/50 font-normal text-[22px] mb-6">
              {t("rightTitle")}
            </h3>
            <div className="overflow-hidden">
              <div className="flex flex-col gap-3">
                {rows.map((row, i) =>
                  renderPill(row.others, "cross", i, "right")
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          {[t("trustBadges.0"), t("trustBadges.1"), t("trustBadges.2")].map((badge) => (
            <span
              key={badge}
              className="inline-flex items-center rounded-full bg-white/10 backdrop-blur-sm border border-white/10 px-5 py-2.5 text-[13px] md:text-[14px] font-medium text-white/90"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
