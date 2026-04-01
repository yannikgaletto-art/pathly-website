"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PRICING, SITE } from "@/lib/constants";

/**
 * Section — Pricing (v2: 3D Carousel)
 *
 * Apple/Liquid design. Center card in spotlight (full scale, bright),
 * side cards recede with perspective rotation + dimmed opacity.
 * Slide-to-confirm CTA instead of plain button.
 * No emojis, no Job-Queue, Video Letter added.
 */

type Interval = "monthly" | "quarterly";
type Plan = (typeof PRICING.plans)[number];

function formatPrice(price: number): string {
  if (price === 0) return "0";
  return price.toFixed(2).replace(".", ",");
}

export function Pricing() {
  const [interval, setInterval] = useState<Interval>("monthly");
  const [activeIndex, setActiveIndex] = useState(1); // Start with Starter in center

  const goTo = useCallback(
    (idx: number) => {
      if (idx >= 0 && idx < PRICING.plans.length) setActiveIndex(idx);
    },
    []
  );

  return (
    <section
      id="pricing"
      aria-label="Preise"
      className="bg-white px-6 py-16 md:py-28 overflow-hidden"
    >
      <div className="mx-auto max-w-site">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-[32px] md:text-[44px] font-bold text-text leading-tight tracking-tight">
            {PRICING.headline}
          </h2>
          <p className="mt-4 text-[16px] text-muted leading-relaxed">
            {PRICING.subline}
          </p>
        </div>

        {/* ─── Interval Toggle ─── */}
        <div className="flex justify-center mb-16">
          <div className="relative inline-flex items-center bg-navy-tint rounded-full p-1 gap-0.5">
            <button
              onClick={() => setInterval("monthly")}
              className="relative z-10 px-7 py-2.5 rounded-full text-[14px] font-semibold transition-colors duration-200"
            >
              {interval === "monthly" && (
                <motion.div
                  layoutId="pricing-pill"
                  className="absolute inset-0 rounded-full bg-navy"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
              <span className={`relative z-10 ${interval === "monthly" ? "text-white" : "text-navy"}`}>
                {PRICING.intervalLabels.monthly}
              </span>
            </button>
            <button
              onClick={() => setInterval("quarterly")}
              className="relative z-10 px-7 py-2.5 rounded-full text-[14px] font-semibold transition-colors duration-200"
            >
              {interval === "quarterly" && (
                <motion.div
                  layoutId="pricing-pill"
                  className="absolute inset-0 rounded-full bg-navy"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
              <span className={`relative z-10 flex items-center gap-2 ${interval === "quarterly" ? "text-white" : "text-navy"}`}>
                {PRICING.intervalLabels.quarterly}
                <span
                  className={`text-[11px] px-2 py-0.5 rounded-full font-bold transition-all duration-200 ${
                    interval === "quarterly" ? "bg-white/20 text-white" : "bg-success/15 text-success"
                  }`}
                >
                  {PRICING.quarterlyBadge}
                </span>
              </span>
            </button>
          </div>
        </div>

        {/* ─── 3D Carousel ─── */}
        <div className="relative flex items-center justify-center" style={{ perspective: "1200px" }}>
          {/* Navigation arrows */}
          <button
            onClick={() => goTo(activeIndex - 1)}
            disabled={activeIndex === 0}
            aria-label="Vorheriger Plan"
            className="absolute left-0 md:left-8 z-20 w-10 h-10 rounded-full bg-white border border-border shadow-sm flex items-center justify-center text-muted hover:text-navy hover:border-navy/30 transition-all disabled:opacity-0 disabled:pointer-events-none"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={() => goTo(activeIndex + 1)}
            disabled={activeIndex === PRICING.plans.length - 1}
            aria-label="Nächster Plan"
            className="absolute right-0 md:right-8 z-20 w-10 h-10 rounded-full bg-white border border-border shadow-sm flex items-center justify-center text-muted hover:text-navy hover:border-navy/30 transition-all disabled:opacity-0 disabled:pointer-events-none"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          {/* Cards container */}
          <div className="relative w-full max-w-4xl mx-auto h-[520px] flex items-center justify-center">
            <AnimatePresence mode="sync">
              {PRICING.plans.map((plan, idx) => {
                const offset = idx - activeIndex;
                return (
                  <CarouselCard
                    key={plan.id}
                    plan={plan}
                    interval={interval}
                    offset={offset}
                    isActive={idx === activeIndex}
                    onClick={() => goTo(idx)}
                  />
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {PRICING.plans.map((plan, idx) => (
            <button
              key={plan.id}
              onClick={() => goTo(idx)}
              aria-label={`Plan ${plan.name} anzeigen`}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === activeIndex
                  ? "w-6 bg-navy"
                  : "w-2 bg-border hover:bg-muted"
              }`}
            />
          ))}
        </div>

        {/* ─── Trust Signals ─── */}
        <div className="mt-10 flex flex-wrap justify-center gap-6">
          {PRICING.trustSignals.map((signal) => (
            <span key={signal} className="flex items-center gap-1.5 text-[13px] text-muted font-medium">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-success">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              {signal}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Carousel Card ─── */
function CarouselCard({
  plan,
  interval,
  offset,
  isActive,
  onClick,
}: {
  plan: Plan;
  interval: Interval;
  offset: number;
  isActive: boolean;
  onClick: () => void;
}) {
  const isPopular = "popular" in plan && plan.popular;
  const isFree = plan.id === "free";
  const price = interval === "monthly" ? plan.monthlyPrice : plan.quarterlyPrice;
  const originalMonthlyPrice = plan.monthlyPrice;
  const showStrikethrough = interval === "quarterly" && !isFree && originalMonthlyPrice > 0;

  // 3D positioning
  const rotateY = offset * -25;
  const translateX = offset * 320;
  const translateZ = isActive ? 0 : -120;
  const scale = isActive ? 1 : 0.85;
  const opacity = Math.abs(offset) > 1 ? 0 : isActive ? 1 : 0.55;
  const zIndex = isActive ? 10 : 5 - Math.abs(offset);

  return (
    <motion.div
      layout
      onClick={!isActive ? onClick : undefined}
      animate={{
        rotateY,
        x: translateX,
        z: translateZ,
        scale,
        opacity,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
      style={{
        position: "absolute",
        zIndex,
        cursor: isActive ? "default" : "pointer",
        transformStyle: "preserve-3d",
      }}
      className={`w-[340px] rounded-2xl p-7 flex flex-col transition-shadow duration-500 ${
        isActive
          ? "bg-white border border-navy/12 shadow-xl shadow-navy/8"
          : "bg-white/80 border border-border/60 shadow-md"
      }`}
    >
      {/* Popular badge */}
      {isPopular && isActive && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-navy text-white text-[11px] font-semibold uppercase tracking-wider whitespace-nowrap"
        >
          {PRICING.popular}
        </motion.div>
      )}

      {/* Plan header */}
      <div className="mb-5">
        <h3 className="text-[22px] font-bold text-text tracking-tight">
          {plan.name}
        </h3>
        <p className="text-[14px] text-muted mt-0.5">{plan.description}</p>
      </div>

      {/* Price */}
      <div className="mb-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${plan.id}-${interval}`}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.2 }}
            className="flex items-baseline gap-2"
          >
            {isFree ? (
              <span className="text-[36px] font-extrabold text-text leading-none tracking-tight">
                Kostenlos
              </span>
            ) : (
              <>
                <span className="text-[36px] font-extrabold text-text leading-none tracking-tight">
                  €{formatPrice(price)}
                </span>
                {showStrikethrough && (
                  <span className="text-[15px] text-muted/60 line-through">
                    €{formatPrice(originalMonthlyPrice)}
                  </span>
                )}
                <span className="text-[14px] text-muted">{PRICING.perMonth}</span>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-border/60 mb-5" />

      {/* Feature list */}
      <ul className="space-y-2.5 mb-7 flex-1">
        {plan.features.map((feature) => (
          <li key={feature.text} className="flex items-center gap-2.5">
            {feature.included ? (
              <div className="w-4.5 h-4.5 rounded-full bg-success/12 flex items-center justify-center flex-shrink-0">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-success">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
            ) : (
              <div className="w-4.5 h-4.5 rounded-full bg-border/40 flex items-center justify-center flex-shrink-0">
                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-muted/40">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </div>
            )}
            <span className={`text-[13.5px] ${feature.included ? "text-text" : "text-muted/50"}`}>
              {feature.text}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA — Slide-to-Confirm for paid, simple button for free */}
      {isActive && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>
          {isFree ? (
            <a
              href={SITE.appUrl}
              className="block w-full py-3 rounded-xl text-center text-[14px] font-semibold border border-navy/15 text-navy bg-navy-tint hover:bg-navy hover:text-white transition-all duration-300"
            >
              {PRICING.freeCta}
            </a>
          ) : (
            <SlideToConfirm href={SITE.appUrl} label={PRICING.paidCta} />
          )}
        </motion.div>
      )}
    </motion.div>
  );
}

/* ─── Slide-to-Confirm CTA ─── */
function SlideToConfirm({ href, label }: { href: string; label: string }) {
  const [dragX, setDragX] = useState(0);
  const [confirmed, setConfirmed] = useState(false);
  const trackWidth = 276; // w-[340px] - 2*p-7(28px) = 284, track a bit less
  const thumbWidth = 48;
  const threshold = trackWidth - thumbWidth - 8;

  const handleDragEnd = () => {
    if (dragX >= threshold) {
      setConfirmed(true);
      // Navigate after short feedback
      setTimeout(() => {
        window.location.href = href;
      }, 400);
    } else {
      setDragX(0);
    }
  };

  return (
    <div className="relative w-full h-[48px] rounded-xl bg-navy-tint border border-navy/10 overflow-hidden select-none">
      {/* Track label */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.span
          animate={{ opacity: confirmed ? 0 : Math.max(0.35, 1 - dragX / threshold) }}
          className="text-[13px] font-semibold text-navy/60"
        >
          {label} →
        </motion.span>
      </div>

      {/* Progress fill */}
      <motion.div
        className="absolute top-0 left-0 h-full rounded-xl bg-navy/8"
        animate={{ width: dragX + thumbWidth }}
        transition={{ type: "tween", duration: 0.05 }}
      />

      {/* Draggable thumb */}
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: threshold }}
        dragElastic={0.05}
        dragMomentum={false}
        onDrag={(_, info) => setDragX(Math.max(0, info.point.x - 60))}
        onDragEnd={handleDragEnd}
        animate={confirmed ? { x: threshold, scale: 0.9 } : { x: dragX < 10 ? 0 : undefined }}
        className="absolute top-1 left-1 z-10 w-[46px] h-[40px] rounded-lg bg-navy flex items-center justify-center cursor-grab active:cursor-grabbing shadow-md shadow-navy/20"
      >
        {confirmed ? (
          <motion.svg initial={{ scale: 0 }} animate={{ scale: 1 }} width="16" height="16"
            viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5" />
          </motion.svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white"
            strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        )}
      </motion.div>
    </div>
  );
}
