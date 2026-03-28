"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

type FAQItem = {
  readonly id: string;
  readonly tag: string;
  readonly question: string;
  readonly answer: string;
};

interface FAQCarouselProps {
  items: readonly FAQItem[];
}

export function FAQCarousel({ items }: FAQCarouselProps) {
  const [active, setActive] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>(
    Array(items.length).fill(null)
  );
  const prefersReduced = useReducedMotion();

  // Scroll active card into center
  useEffect(() => {
    const container = containerRef.current;
    const card = cardRefs.current[active];
    if (!container || !card) return;

    const containerWidth = container.offsetWidth;
    const cardLeft = card.offsetLeft;
    const cardWidth = card.offsetWidth;
    const scrollTo = cardLeft - containerWidth / 2 + cardWidth / 2;

    const isReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    container.scrollTo({
      left: scrollTo,
      behavior: isReduced ? "auto" : "smooth",
    });
  }, [active]);

  return (
    <>
      {/* Nav Buttons — right-aligned above carousel */}
      <div className="flex justify-end gap-3 mx-auto max-w-site px-6 mb-6">
        {/* Prev */}
        <button
          disabled={active === 0}
          onClick={() => setActive((a) => Math.max(0, a - 1))}
          aria-label="Vorherige Frage"
          className={`w-10 h-10 rounded-full border flex items-center justify-center transition-colors duration-200 ${
            active === 0
              ? "border-border/50 text-muted opacity-40 cursor-not-allowed"
              : "border-border text-text hover:bg-navy hover:text-white hover:border-navy shadow-sm"
          }`}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        {/* Next */}
        <button
          disabled={active === items.length - 1}
          onClick={() => setActive((a) => Math.min(items.length - 1, a + 1))}
          aria-label="Nächste Frage"
          className={`w-10 h-10 rounded-full border flex items-center justify-center transition-colors duration-200 ${
            active === items.length - 1
              ? "border-border/50 text-muted opacity-40 cursor-not-allowed"
              : "bg-navy text-white border-navy hover:bg-navy-hover hover:border-navy-hover shadow-sm"
          }`}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      {/* Carousel Container */}
      <div
        ref={containerRef}
        role="region"
        aria-label="FAQ Karussell"
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide items-start"
        style={{
          paddingLeft: "max(24px, calc((100vw - 1280px) / 2))",
          paddingRight: "max(24px, calc((100vw - 1280px) / 2))",
          paddingBottom: "32px", // Extra padding so shadows don't clip
        }}
      >
        {items.map((item, index) => {
          const isActive = active === index;

          return (
            <motion.div
              layout
              key={item.id}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              role="listitem"
              tabIndex={0}
              aria-expanded={isActive}
              aria-label={item.question}
              onClick={() => setActive(index)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActive(index);
                }
              }}
              transition={{
                layout: { duration: prefersReduced ? 0 : 0.4, ease: "easeOut" }
              }}
              className={`snap-center shrink-0 cursor-pointer overflow-hidden transition-colors duration-300 rounded-[32px] ${
                isActive
                  ? "w-[300px] md:w-[460px] bg-navy text-white shadow-lg"
                  : "w-[260px] md:w-[320px] bg-white border border-border text-text hover:border-navy hover:shadow-md"
              }`}
            >
              <motion.div layout="position" className="p-6 md:p-8">
                {/* Tag Badge */}
                <motion.span
                  layout="position"
                  className={`inline-block text-[12px] rounded-full px-3 py-1 font-medium mb-4 ${
                    isActive
                      ? "text-white/80 bg-white/10"
                      : "text-muted bg-bg-soft border border-border"
                  }`}
                >
                  {item.tag}
                </motion.span>

                {/* Question */}
                <motion.p
                  layout="position"
                  className={`leading-snug ${
                    isActive
                      ? "text-[20px] md:text-[22px] font-bold"
                      : "text-[18px] font-semibold"
                  }`}
                >
                  {item.question}
                </motion.p>

                {/* Answer — Animated */}
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      key={`answer-${item.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        height: { duration: prefersReduced ? 0 : 0.4, ease: "easeOut" },
                        opacity: { duration: prefersReduced ? 0 : 0.3, delay: prefersReduced ? 0 : 0.1 }
                      }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-white/20 my-5" />
                      <p className="text-[15px] md:text-[16px] text-white/80 leading-[1.7]">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </>
  );
}
