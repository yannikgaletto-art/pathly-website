"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { COMPARISON, SITE } from "@/lib/constants";

/* ── Confetti (side burst — Pathly SaaS pattern) ─────────────── */

function fireConfetti() {
  import("canvas-confetti").then(({ default: confetti }) => {
    const duration = 2500;
    const end = Date.now() + duration;
    const colors = ["#002e7a", "#3b82f6", "#60a5fa", "#93c5fd", "#A8C4E6"];
    function frame() {
      confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0, y: 0.65 }, colors });
      confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1, y: 0.65 }, colors });
      if (Date.now() < end) requestAnimationFrame(frame);
    }
    frame();
  });
}

/* ── Glass Filter SVG (Liquid Radio effect) ─────────────────── */

function GlassFilter() {
  return (
    <svg className="hidden" aria-hidden="true">
      <defs>
        <filter
          id="radio-glass"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.05 0.05"
            numOctaves="1"
            seed="1"
            result="turbulence"
          />
          <feGaussianBlur in="turbulence" stdDeviation="2" result="blurredNoise" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurredNoise"
            scale="30"
            xChannelSelector="R"
            yChannelSelector="B"
            result="displaced"
          />
          <feGaussianBlur in="displaced" stdDeviation="2" result="finalBlur" />
          <feComposite in="finalBlur" in2="finalBlur" operator="over" />
        </filter>
      </defs>
    </svg>
  );
}

/* ── Step Icons (inline SVG) ─────────────────────────────────── */

function StepIcon({ iconKey }: { iconKey: string }) {
  const p = {
    className: "w-4 h-4",
    viewBox: "0 0 24 24",
    fill: "none" as const,
    stroke: "#8498B9",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (iconKey) {
    case "search":   return <svg {...p}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>;
    case "document": return <svg {...p}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/><path d="M16 13H8M16 17H8M10 9H8"/></svg>;
    case "pen":      return <svg {...p}><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>;
    case "file":     return <svg {...p}><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/></svg>;
    case "folder":   return <svg {...p}><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/></svg>;
    case "refresh":  return <svg {...p}><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M3 21v-5h5"/></svg>;
    case "calendar": return <svg {...p}><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>;
    default:         return null;
  }
}

/* ── Main Component ──────────────────────────────────────────── */

export function ComparisonToggle() {
  const t = useTranslations("comparison");
  const [isActive, setIsActive] = useState(false);

  const handleToggle = useCallback(() => {
    const next = !isActive;
    setIsActive(next);
    if (next) fireConfetti();
  }, [isActive]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        handleToggle();
      }
    },
    [handleToggle]
  );

  return (
    <section
      id="comparison"
      aria-label="Vorher-Nachher Vergleich"
      className="relative px-6 py-16 md:py-24 bg-bg-soft"
    >
      {/* Liquid glass filter def — hidden, referenced via CSS filter */}
      <GlassFilter />

      {/* ── Card / Window Frame ── */}
      <div
        className={`
          mx-auto max-w-2xl rounded-2xl border shadow-lg overflow-hidden
          transition-colors duration-500 ease-out
          ${isActive
            ? "bg-[#0B1D3A] border-white/10"
            : "bg-white border-border"
          }
        `}
      >
        <div className="px-8 py-10 md:px-12 md:py-12">

          {/* ── Header: Title — Liquid Toggle — Title ── */}
          <div className="flex items-center justify-between gap-4 mb-3">
            {/* Left title */}
            <h2
              className={`text-[16px] md:text-[18px] font-bold leading-tight tracking-tight whitespace-nowrap transition-colors duration-500 ${
                isActive ? "text-white/30" : "text-text"
              }`}
            >
              {t("manualTitle")}
            </h2>

            {/* Liquid Radio Toggle */}
            <button
              role="switch"
              aria-checked={isActive}
              aria-label={
                isActive
                  ? "Zurück zur manuellen Ansicht"
                  : "Zu Pathly-Ansicht wechseln"
              }
              onClick={handleToggle}
              onKeyDown={handleKeyDown}
              className="relative shrink-0 flex items-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-navy cursor-pointer"
              style={{
                background: isActive ? "rgba(255,255,255,0.08)" : "#E8E8EC",
                borderRadius: "999px",
                padding: "4px",
                gap: "0px",
                width: "96px",
                height: "40px",
              }}
            >
              {/* Left label — "Bisher" */}
              <span
                className={`relative z-10 text-[12px] font-semibold transition-colors duration-300 flex-1 text-center select-none ${
                  !isActive ? "text-transparent" : "text-white/40"
                }`}
              >
                Bisher
              </span>

              {/* Sliding pill — liquid glass card */}
              <span
                style={{
                  position: "absolute",
                  top: "4px",
                  left: isActive ? "calc(50% - 2px)" : "4px",
                  width: "calc(50% - 2px)",
                  height: "calc(100% - 8px)",
                  borderRadius: "999px",
                  background: isActive
                    ? "rgba(255,255,255,0.15)"
                    : "white",
                  boxShadow: isActive
                    ? "0 0 0 1px rgba(255,255,255,0.2)"
                    : "0 2px 8px rgba(0,0,0,0.15), 0 1px 2px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.9)",
                  transition: "left 0.3s cubic-bezier(0.34,1.56,0.64,1), background 0.3s, box-shadow 0.3s",
                  filter: "url(#radio-glass)",
                }}
              />

              {/* Right label — "Pathly" */}
              <span
                className={`relative z-10 text-[12px] font-semibold transition-colors duration-300 flex-1 text-center select-none ${
                  isActive ? "text-[#0B1D3A]" : "text-text/40"
                }`}
                style={{ color: isActive ? "white" : undefined }}
              >
                Pathly
              </span>
            </button>

            {/* Right title */}
            <h2
              className={`text-[16px] md:text-[18px] font-bold leading-tight tracking-tight whitespace-nowrap text-right transition-colors duration-500 ${
                isActive ? "text-white" : "text-muted"
              }`}
            >
              {t("pathlyTitle")}
            </h2>
          </div>

          {/* ── Subtitle ── */}
          <p
            className={`text-[13px] mb-8 transition-colors duration-500 ${
              isActive ? "text-white/50" : "text-muted"
            }`}
          >
            {isActive
              ? t("pathlyCard.subtext")
              : "—"}
          </p>

          {/* ── Step Rows ── */}
          <div className="space-y-2.5">
            {isActive
              ? /* ── AFTER: Pathly checks (4 items) ── */
                [t("pathlyCard.checks.0"), t("pathlyCard.checks.1"), t("pathlyCard.checks.2"), t("pathlyCard.checks.3")].map((check, i) => (
                  <div
                    key={`pathly-${i}`}
                    className="flex items-center gap-3 rounded-xl px-4 py-3.5 border"
                    style={{
                      background: "rgba(255,255,255,0.07)",
                      borderColor: "rgba(255,255,255,0.1)",
                      transitionDelay: `${i * 70}ms`,
                    }}
                  >
                    <div className="w-7 h-7 rounded-full bg-[#00B870]/20 flex items-center justify-center shrink-0">
                      <svg
                        className="w-3.5 h-3.5 text-[#00B870]"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={3}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </div>
                    <span className="flex-1 text-[14px] font-medium text-white">
                      {check}
                    </span>
                    <span className="text-[11px] font-medium text-white/35 tracking-widest uppercase">
                      Complete
                    </span>
                  </div>
                ))
              : /* ── BEFORE: Manual steps (7 items) ── */
                COMPARISON.steps.map((step, i) => (
                  <div
                    key={step.id}
                    className="flex items-center gap-3 rounded-xl px-4 py-3.5 bg-white border border-border"
                    style={{ transitionDelay: `${i * 50}ms` }}
                  >
                    <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                      <StepIcon iconKey={step.iconKey} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] font-semibold text-text leading-snug">
                        {t(`steps.${step.id}.title`)}
                      </p>
                      <p className="text-[12px] text-muted leading-relaxed">
                        {t(`steps.${step.id}.description`)}
                      </p>
                    </div>
                  </div>
                ))}
          </div>

          {/* ── CTA (only in active state) ── */}
          {isActive && (
            <div className="mt-7 text-center">
              <a
                href={SITE.appUrl}
                className="inline-block px-7 py-3 rounded-xl bg-[#A8C4E6] text-navy font-semibold text-[14px] hover:bg-[#93B5DC] transition-colors duration-200 shadow-md"
              >
                {t("pathlyCard.cta")}
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
