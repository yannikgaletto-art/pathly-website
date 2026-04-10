"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { TESTIMONIALS } from "@/lib/constants";

type Item = (typeof TESTIMONIALS.items)[number];

const ITEM_KEYS = [
  "joachim",
  "clara",
  "bastian",
  "dorothea",
  "elenor",
  "jack",
  "laura",
  "franziska",
] as const;

const SLIDE_DURATION = 5000; // ms per slide

/**
 * Section 08 — Testimonials (Animated)
 * Photo-stack left + quote right.
 * Autoplay 5 s, Pause/Play control, dot nav.
 * Fixed-height photo container prevents layout influence on sections below.
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
  const [paused, setPaused] = useState(false);

  // Keep a stable ref to active so the interval doesn't need to be re-created
  const activeRef = useRef(active);
  activeRef.current = active;

  const advance = useCallback(() => {
    setActive((prev) => (prev + 1) % items.length);
  }, [items.length]);

  // Autoplay — restarts whenever paused state changes
  useEffect(() => {
    if (paused) return;
    const id = setInterval(advance, SLIDE_DURATION);
    return () => clearInterval(id);
  }, [paused, advance]);

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
          {t("subline") && (
            <p className="mt-4 text-[16px] text-muted">{t("subline")}</p>
          )}
        </div>

        {/* Two-column layout — items-start keeps columns anchored at top,
            preventing the photo stack from pushing content below */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start max-w-4xl mx-auto">

          {/* Left — Photo stack (fixed dimensions, never grows) */}
          <div className="flex justify-center">
            {/* Outer has fixed dimensions; nothing below can be affected */}
            <div className="relative h-80 w-72 shrink-0">
              <AnimatePresence>
                {items.map((item, index) => {
                  const isActive = index === active;
                  return (
                    <motion.div
                      key={item.src}
                      initial={{
                        opacity: 0,
                        scale: 0.9,
                        y: 40,
                        rotate: getRotation(index, 1),
                      }}
                      animate={{
                        opacity: isActive ? 1 : 0.45,
                        scale: isActive ? 1 : 0.92,
                        y: isActive ? 0 : 16,
                        rotate: isActive
                          ? "0deg"
                          : getRotation(index, active),
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
          <div className="flex flex-col justify-start">
            {/* Fixed min-height so layout is stable across slides */}
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
                  <p className="text-[13px] text-muted mb-6">
                    {t(`items.${ITEM_KEYS[active]}.role`)}
                  </p>

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

            {/* Controls: dots + Pause/Play */}
            <div className="flex items-center gap-3 mt-10">
              {/* Dot indicator */}
              <div className="flex gap-1.5">
                {items.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setActive(i);
                      setPaused(false);
                    }}
                    aria-label={`Testimonial ${i + 1}`}
                    className={`rounded-full transition-all duration-300 ${
                      i === active
                        ? "w-6 h-2 bg-navy"
                        : "w-2 h-2 bg-border hover:bg-muted"
                    }`}
                  />
                ))}
              </div>

              {/* Pause / Play button */}
              <button
                onClick={() => setPaused((p) => !p)}
                aria-label={paused ? "Fortsetzen" : "Pausieren"}
                className="w-10 h-10 rounded-full bg-white border border-border flex items-center justify-center shadow-sm hover:shadow-md hover:border-navy transition-all duration-200 group ml-1"
              >
                {paused ? (
                  /* Play icon */
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-text group-hover:text-navy transition-colors translate-x-px"
                  >
                    <path d="M6 4.75a.75.75 0 0 0-1.5 0v14.5a.75.75 0 0 0 1.5 0V4.75zm13.25 7.25-10-6.5a.75.75 0 0 0-1.25.56v12.99a.75.75 0 0 0 1.25.56l10-6.5a.75.75 0 0 0 0-1.05z" />
                    <polygon points="5,3 20,12 5,21" />
                  </svg>
                ) : (
                  /* Pause icon */
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-text group-hover:text-navy transition-colors"
                  >
                    <rect x="5" y="3" width="4" height="18" rx="1" />
                    <rect x="15" y="3" width="4" height="18" rx="1" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
