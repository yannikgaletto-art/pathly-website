"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { PHONE_SCREENS } from "@/lib/constants";

/**
 * Hero phone mockup with scroll-driven rotation and cross-fading screenshots.
 * Falls back to PhoneStatic when prefers-reduced-motion is active.
 */
export function PhoneCarousel() {
  const [current, setCurrent] = useState(0);
  const [prefersReduced, setPrefersReduced] = useState(false);
  const { scrollY } = useScroll();

  // Subtle 3D rotation driven by scroll
  const rotateY = useTransform(scrollY, [0, 600], [0, -8]);
  const rotateX = useTransform(scrollY, [0, 600], [0, 4]);

  // Detect prefers-reduced-motion (REGEL 5)
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Auto-cycle screenshots every 3s
  useEffect(() => {
    if (prefersReduced) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % PHONE_SCREENS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [prefersReduced]);

  // Reduced motion fallback
  if (prefersReduced) {
    return (
      <div className="relative mx-auto w-[280px] h-[560px] md:w-[320px] md:h-[640px]">
        <PhoneFrame>
          <Image
            src={PHONE_SCREENS[0].src}
            alt={PHONE_SCREENS[0].alt}
            fill
            className="object-cover rounded-[20px]"
            priority
          />
        </PhoneFrame>
      </div>
    );
  }

  return (
    // F-05 fix: perspective must be on the PARENT element in CSS, not the rotating child
    <div style={{ perspective: "1200px" }} className="mx-auto w-[280px] h-[560px] md:w-[320px] md:h-[640px]">
      <motion.div
        className="relative w-full h-full"
        style={{ rotateY, rotateX }}
      >
        <PhoneFrame>
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={PHONE_SCREENS[current].src}
                alt={PHONE_SCREENS[current].alt}
                fill
                className="object-cover rounded-[20px]"
                priority={current === 0}
              />
            </motion.div>
          </AnimatePresence>
        </PhoneFrame>
      </motion.div>
    </div>
  );
}

/** Phone bezel frame */
function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full h-full rounded-[32px] bg-gradient-to-b from-gray-800 to-gray-900 p-[6px] shadow-phone">
      {/* Screen area */}
      <div className="relative w-full h-full rounded-[26px] bg-black overflow-hidden">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[28px] bg-black rounded-b-2xl z-10" />
        {children}
      </div>
    </div>
  );
}
