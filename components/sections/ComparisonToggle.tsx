"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { COMPARISON } from "@/lib/constants";

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
            ? "bg-[#133C7B] border-white/10"
            : "bg-white border-border"
          }
        `}
      >
        <div className="px-8 py-8 md:px-12 md:py-10">

          {/* ── Toggle — centered inside card ── */}
          <div className="flex justify-center mb-8">
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
                width: "150px",
                height: "62px",
                borderRadius: "999px",
                padding: "6px",
                background: isActive
                  ? "linear-gradient(135deg, rgba(19,60,123,0.85) 0%, rgba(26,78,155,0.90) 100%)"
                  : "#E4E8EE",
                border: isActive
                  ? "1px solid rgba(255,255,255,0.15)"
                  : "1px solid rgba(185,200,220,0.5)",
                boxShadow: isActive
                  ? "0 6px 20px rgba(19,60,123,0.30), inset 0 1px 0 rgba(255,255,255,0.10)"
                  : "0 2px 8px rgba(0,0,0,0.07), inset 0 1px 0 rgba(255,255,255,1)",
                transition: "background 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease",
              }}
            >
              {/* Left label — Before/Bisher */}
              <span
                className="relative z-10 flex-1 text-center select-none"
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  color: isActive ? "rgba(255,255,255,0.45)" : "rgba(50,65,90,0.80)",
                  transition: "color 0.3s ease",
                }}
              >
                {t("toggleBefore")}
              </span>

              {/* Sliding pill — solid white when active, natural white when inactive */}
              <span
                style={{
                  position: "absolute",
                  top: "6px",
                  left: isActive ? "calc(50% - 3px)" : "6px",
                  width: "calc(50% - 3px)",
                  height: "calc(100% - 12px)",
                  borderRadius: "999px",
                  background: "white",
                  boxShadow: isActive
                    ? "0 2px 10px rgba(0,0,0,0.20), 0 1px 3px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,1)"
                    : "0 2px 10px rgba(0,0,0,0.12), 0 1px 3px rgba(0,0,0,0.07), inset 0 1px 0 rgba(255,255,255,1)",
                  transition: "left 0.35s cubic-bezier(0.34,1.4,0.64,1), box-shadow 0.35s ease",
                }}
              />

              {/* Right label — Pathly (navy text on white pill) */}
              <span
                className="relative z-10 flex-1 text-center select-none"
                style={{
                  fontSize: "14px",
                  fontWeight: 700,
                  color: isActive ? "#133C7B" : "rgba(50,65,90,0.38)",
                  transition: "color 0.3s ease",
                }}
              >
                Pathly
              </span>
            </button>
          </div>

          {/* ── Step Rows (equal-height: Before determines height, After overlaid) ── */}
          <div className="relative">
            {/* BEFORE: always rendered — determines natural height */}
            <div
              className={`space-y-2.5 transition-opacity duration-300 ${
                isActive ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
            >
              {COMPARISON.steps.map((step, i) => (
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

            {/* AFTER: absolute overlay — same height as Before */}
            <div
              className={`absolute inset-0 flex flex-col justify-center space-y-2.5 transition-opacity duration-300 ${
                isActive ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              {[t("pathlyCard.checks.0"), t("pathlyCard.checks.1"), t("pathlyCard.checks.2"), t("pathlyCard.checks.3")].map((check, i) => (
                <div
                  key={`pathly-${i}`}
                  className="flex items-center gap-3 rounded-xl px-4 py-3.5 border"
                  style={{
                    background: "rgba(255,255,255,0.07)",
                    borderColor: "rgba(255,255,255,0.1)",
                    transitionDelay: `${i * 70}ms`,
                  }}
                >
                  <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center shrink-0">
                    <svg
                      className="w-3.5 h-3.5 text-[#133C7B]"
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
              ))}
            </div>
          </div>


        </div>
      </div>
    </section>
  );
}
