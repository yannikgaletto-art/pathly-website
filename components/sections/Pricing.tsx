"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PRICING, SITE } from "@/lib/constants";

/**
 * Section — Pricing
 * Pill-style interval toggle (Pathly Navy) + 3-column plan cards.
 * Design inspiration: slide-toggle like Cover Letter "Unternehmensanalyse" switch.
 * Below-the-fold → Framer Motion allowed per AGENTS.md.
 */

type Interval = "monthly" | "quarterly";
type Plan = (typeof PRICING.plans)[number];

function formatPrice(price: number): string {
  if (price === 0) return "0";
  return price.toFixed(2).replace(".", ",");
}

export function Pricing() {
  const [interval, setInterval] = useState<Interval>("monthly");

  return (
    <section
      id="pricing"
      aria-label="Preise"
      className="bg-white px-6 py-16 md:py-24"
    >
      <div className="mx-auto max-w-site">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-[32px] md:text-[40px] font-bold text-text leading-tight">
            {PRICING.headline}
          </h2>
          <p className="mt-4 text-[16px] text-muted">
            {PRICING.subline}
          </p>
        </div>

        {/* ─── Interval Toggle (Pill Slider) ─── */}
        <div className="flex justify-center mb-14">
          <div className="relative inline-flex items-center bg-navy-tint rounded-full p-1 gap-0.5">
            {/* Monthly button */}
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
              <span className={`relative z-10 ${interval === "monthly" ? "text-white" : "text-navy hover:text-navy/80"}`}>
                {PRICING.intervalLabels.monthly}
              </span>
            </button>

            {/* Quarterly button */}
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
              <span className={`relative z-10 flex items-center gap-2 ${interval === "quarterly" ? "text-white" : "text-navy hover:text-navy/80"}`}>
                {PRICING.intervalLabels.quarterly}
                <span
                  className={`text-[11px] px-2 py-0.5 rounded-full font-bold transition-all duration-200 ${
                    interval === "quarterly"
                      ? "bg-white/20 text-white"
                      : "bg-success/15 text-success"
                  }`}
                >
                  {PRICING.quarterlyBadge}
                </span>
              </span>
            </button>
          </div>
        </div>

        {/* ─── Plan Cards ─── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {PRICING.plans.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              interval={interval}
              appUrl={SITE.appUrl}
            />
          ))}
        </div>

        {/* ─── Trust Signals ─── */}
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          {PRICING.trustSignals.map((signal) => (
            <span
              key={signal}
              className="text-[13px] text-muted font-medium"
            >
              {signal}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Individual Plan Card ─── */
function PlanCard({
  plan,
  interval,
  appUrl,
}: {
  plan: Plan;
  interval: Interval;
  appUrl: string;
}) {
  const isPopular = "popular" in plan && plan.popular;
  const isFree = plan.id === "free";
  const price = interval === "monthly" ? plan.monthlyPrice : plan.quarterlyPrice;
  const originalMonthlyPrice = plan.monthlyPrice;
  const showStrikethrough = interval === "quarterly" && !isFree && originalMonthlyPrice > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`relative rounded-2xl border p-7 flex flex-col transition-all duration-300 ${
        isPopular
          ? "border-navy bg-navy-tint shadow-lg scale-[1.02] md:scale-105"
          : "border-border bg-white hover:border-navy/30 hover:shadow-md"
      }`}
    >
      {/* Popular badge */}
      {isPopular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-navy text-white text-[11px] font-bold uppercase tracking-wider whitespace-nowrap">
          {PRICING.popular}
        </div>
      )}

      {/* Plan header */}
      <div className="mb-5">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[20px]">{plan.emoji}</span>
          <h3
            className={`text-[20px] font-bold ${
              isPopular ? "text-navy" : "text-text"
            }`}
          >
            {plan.name}
          </h3>
        </div>
        <p className="text-[14px] text-muted">{plan.description}</p>
      </div>

      {/* Price */}
      <div className="mb-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${plan.id}-${interval}`}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className="flex items-baseline gap-2"
          >
            {isFree ? (
              <span className="text-[40px] font-extrabold text-text leading-none">
                Kostenlos
              </span>
            ) : (
              <>
                <span className="text-[40px] font-extrabold text-text leading-none">
                  €{formatPrice(price)}
                </span>
                {showStrikethrough && (
                  <span className="text-[16px] text-muted line-through">
                    €{formatPrice(originalMonthlyPrice)}
                  </span>
                )}
                <span className="text-[14px] text-muted">
                  {PRICING.perMonth}
                </span>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Feature list */}
      <ul className="space-y-3 mb-8 flex-1">
        {plan.features.map((feature) => (
          <li key={feature.text} className="flex items-start gap-2.5">
            {feature.included ? (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-success shrink-0 mt-0.5"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            ) : (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-muted/40 shrink-0 mt-0.5"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            )}
            <span
              className={`text-[14px] ${
                feature.included
                  ? "text-text"
                  : "text-muted/50 line-through"
              }`}
            >
              {feature.text}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA Button — Slide-style (Pathly Navy) */}
      <a
        href={appUrl}
        className={`group relative w-full h-[48px] rounded-xl overflow-hidden flex items-center justify-center text-[14px] font-semibold transition-all duration-300 ${
          isPopular
            ? "bg-navy text-white hover:bg-navy-hover shadow-md shadow-navy/20"
            : isFree
              ? "bg-navy-tint text-navy hover:bg-navy hover:text-white border border-navy/15"
              : "bg-navy text-white hover:bg-navy-hover"
        }`}
      >
        {/* Shimmer effect on hover */}
        <span className="absolute inset-0 overflow-hidden rounded-xl">
          <span className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/15 to-transparent group-hover:left-[200%] transition-all duration-700 ease-in-out" />
        </span>
        <span className="relative z-10 flex items-center gap-2">
          {isFree ? PRICING.freeCta : PRICING.paidCta}
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="group-hover:translate-x-1 transition-transform duration-200"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </span>
      </a>
    </motion.div>
  );
}
