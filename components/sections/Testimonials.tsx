"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { TESTIMONIALS } from "@/lib/constants";

type Item = (typeof TESTIMONIALS.items)[number];

const ITEM_KEYS = ["bastian", "clara", "dorothea", "elenor", "franziska", "jack", "joachim"] as const;
/**
 * Section 08 — Testimonials (Animated)
 * Photo-stack left + quote right, autoplay 5s, arrow nav.
 * Below-the-fold → Framer Motion allowed per AGENTS.md.
 */



// Seeded pseudo-random per index so SSR and client match (no hydration mismatch)
function getRotation(index: number, seed: number): string {
  const val = ((index * 37 + seed * 13) % 17) - 8; // range -8..+8
  return `${val}deg`;
}

export function Testimonials() {
  const t = useTranslations("testimonials");
  const items = TESTIMONIALS.items as unknown as Item[];
  const [active, setActive] = useState(0);

  const handleNext = useCallback(() => {
    setActive((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const handlePrev = useCallback(() => {
    setActive((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  // Autoplay
  useEffect(() => {
    const t = setInterval(handleNext, 5500);
    return () => clearInterval(t);
  }, [handleNext]);

  const current = items[active];

  return (
    <section
      id="testimonials"
      aria-label="Testimonials"
      className="bg-bg-soft px-6 py-16 md:py-24"
    >
      <div className="mx-auto max-w-site">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-[32px] md:text-[40px] font-bold text-text leading-tight">
            {t("headline")}
          </h2>
          <p className="mt-4 text-[16px] text-muted">
            {t("subline")}
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center max-w-4xl mx-auto">

          {/* Left — Photo stack */}
          <div className="flex justify-center">
            <div className="relative h-80 w-72">
              <AnimatePresence>
                {items.map((item, index) => {
                  const isActive = index === active;
                  return (
                    <motion.div
                      key={item.src}
                      initial={{ opacity: 0, scale: 0.9, y: 40, rotate: getRotation(index, 1) }}
                      animate={{
                        opacity: isActive ? 1 : 0.45,
                        scale: isActive ? 1 : 0.92,
                        y: isActive ? 0 : 16,
                        rotate: isActive ? "0deg" : getRotation(index, active),
                        zIndex: isActive
                          ? items.length + 1
                          : items.length - Math.abs(index - active),
                      }}
                      exit={{ opacity: 0, scale: 0.9, y: -40 }}
                      transition={{ duration: 0.45, ease: "easeInOut" }}
                      className="absolute inset-0 origin-bottom"
                    >
                      <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-xl">
                        <Image
                          src={item.src ?? ""}
                          alt={item.name}
                          fill
                          className="object-cover object-top"
                          sizes="288px"
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* Right — Quote + controls */}
          <div className="flex flex-col justify-center">
            <div className="min-h-[280px] md:min-h-[240px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  {/* Name + meta */}
                  <p className="text-[13px] font-medium text-navy uppercase tracking-wider mb-1">
                    {current.name}, {current.age} · {current.location}
                  </p>
                  <p className="text-[13px] text-muted mb-6">{t(`items.${ITEM_KEYS[active]}.role`)}</p>

                  {/* Quote */}
                  <blockquote>
                    <span
                      className="text-[56px] font-serif text-navy/20 leading-none select-none"
                      aria-hidden="true"
                    >
                      &ldquo;
                    </span>
                    <p className="text-[17px] text-text leading-relaxed -mt-4">
                      {t(`items.${ITEM_KEYS[active]}.quote`)}
                    </p>
                  </blockquote>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Arrow controls */}
            <div className="flex items-center gap-3 mt-10">
              <button
                onClick={handlePrev}
                aria-label="Vorherige"
                className="w-10 h-10 rounded-full bg-white border border-border flex items-center justify-center shadow-sm hover:shadow-md hover:border-navy transition-all duration-200 group"
              >
                {/* Inline SVG arrow left — no lucide dep */}
                <svg
                  width="16" height="16" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round"
                  className="text-text group-hover:text-navy transition-colors group-hover:-translate-x-0.5 duration-200"
                >
                  <path d="M19 12H5M12 5l-7 7 7 7" />
                </svg>
              </button>

              {/* Dot indicator */}
              <div className="flex gap-1.5">
                {items.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    aria-label={`Testimonial ${i + 1}`}
                    className={`rounded-full transition-all duration-300 ${
                      i === active
                        ? "w-6 h-2 bg-navy"
                        : "w-2 h-2 bg-border hover:bg-muted"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                aria-label="Nächste"
                className="w-10 h-10 rounded-full bg-white border border-border flex items-center justify-center shadow-sm hover:shadow-md hover:border-navy transition-all duration-200 group"
              >
                <svg
                  width="16" height="16" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round"
                  className="text-text group-hover:text-navy transition-colors group-hover:translate-x-0.5 duration-200"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
