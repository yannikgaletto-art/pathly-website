"use client";

import { useState, useCallback, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  PanInfo,
} from "framer-motion";
import Image from "next/image";

interface CardImage {
  readonly src: string;
  readonly alt: string;
  readonly objectPosition?: string;
}

interface FeatureCardStackProps {
  images: readonly CardImage[];
}

const STACK = [
  { rotate: 0, x: 0, y: 0, scale: 1, zIndex: 30, shadow: "shadow-lg" },
  { rotate: 3, x: 8, y: 12, scale: 0.97, zIndex: 20, shadow: "shadow-md" },
  { rotate: 6, x: 16, y: 24, scale: 0.94, zIndex: 10, shadow: "shadow-sm" },
] as const;

export function FeatureCardStack({ images }: FeatureCardStackProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imgErrors, setImgErrors] = useState<Set<number>>(new Set());
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const x = useMotionValue(0);
  const dragRotate = useTransform(
    x, [-200, 0, 200], reducedMotion ? [0, 0, 0] : [-12, 0, 12]
  );

  const count = images.length;

  const advanceCard = useCallback(
    (direction: 1 | -1 = 1) => {
      setActiveIndex((prev) => (prev + direction + count) % count);
    },
    [count]
  );

  const handleDragEnd = useCallback(
    (_: unknown, info: PanInfo) => {
      const power = Math.abs(info.offset.x) * Math.abs(info.velocity.x);
      if (power > 5000) {
        const target = info.offset.x > 0 ? 600 : -600;
        if (reducedMotion) { x.set(0); advanceCard(1); }
        else {
          animate(x, target, {
            type: "tween", duration: 0.25,
            onComplete: () => { x.set(0); advanceCard(1); },
          });
        }
      } else {
        animate(x, 0, { type: "spring", stiffness: 350, damping: 35 });
      }
    },
    [x, advanceCard, reducedMotion]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); advanceCard(1); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); advanceCard(-1); }
    },
    [advanceCard]
  );

  const handleImgError = useCallback((idx: number) => {
    setImgErrors((prev) => new Set(prev).add(idx));
  }, []);

  // Mouse-follow zoom: transform-origin tracks cursor (no re-render, direct DOM)
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const img = e.currentTarget.querySelector("img");
    if (!img) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const xP = ((e.clientX - rect.left) / rect.width) * 100;
    const yP = ((e.clientY - rect.top) / rect.height) * 100;
    img.style.transformOrigin = `${xP}% ${yP}%`;
  }, []);

  const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const img = e.currentTarget.querySelector("img");
    if (img) img.style.transformOrigin = "center center";
  }, []);

  const imgAt = (pos: number) => (activeIndex + pos) % count;

  return (
    <div className="flex flex-col gap-4">
      {/* Card stack */}
      <div
        className="relative w-full"
        style={{ paddingBottom: "6%" }}
        role="region"
        aria-roledescription="carousel"
        aria-label="Feature Screenshots"
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        <div className="relative w-full aspect-[4/3]">
          {[2, 1, 0].map((stackPos) => {
            const cfg = STACK[stackPos];
            const imgIdx = imgAt(stackPos);
            const img = images[imgIdx];
            const isTop = stackPos === 0;
            const hasError = imgErrors.has(imgIdx);

            return (
              <motion.div
                key={`slot-${stackPos}`}
                className={`absolute inset-0 rounded-xl overflow-hidden bg-white ${cfg.shadow} ${
                  isTop ? "cursor-zoom-in" : ""
                }`}
                style={{
                  zIndex: cfg.zIndex,
                  ...(isTop && { x, rotate: dragRotate, touchAction: "none" as const }),
                }}
                animate={
                  reducedMotion
                    ? { rotate: 0, x: 0, y: 0, scale: 1 }
                    : { rotate: cfg.rotate, x: isTop ? 0 : cfg.x, y: cfg.y, scale: cfg.scale }
                }
                transition={
                  reducedMotion
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 280, damping: 28, mass: 0.8 }
                }
                {...(isTop
                  ? {
                      drag: "x" as const,
                      dragConstraints: { left: 0, right: 0 },
                      dragElastic: 0.6,
                      onDragEnd: handleDragEnd,
                      onPointerDown: (e: React.PointerEvent) =>
                        e.currentTarget.setPointerCapture(e.pointerId),
                      onMouseMove: handleMouseMove,
                      onMouseLeave: handleMouseLeave,
                    }
                  : {})}
              >
                {hasError ? (
                  <div className="w-full h-full bg-bg-soft flex items-center justify-center p-6">
                    <span className="text-sm text-muted text-center">{img.alt}</span>
                  </div>
                ) : (
                  <div className="relative w-full h-full overflow-hidden">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className={`object-cover transition-transform ease-out ${
                        isTop ? "duration-[350ms] hover:scale-[1.8]" : "duration-0"
                      }`}
                      style={{ objectPosition: img.objectPosition ?? "top" }}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      onError={() => handleImgError(imgIdx)}
                    />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Arrow navigation — prev / next */}
      <div className="flex items-center gap-3 mt-2">
        {/* Prev arrow */}
        <button
          onClick={() => advanceCard(-1)}
          aria-label="Previous screenshot"
          className="
            group flex items-center justify-center
            w-10 h-10 rounded-full
            border border-border bg-white
            shadow-sm hover:shadow-md hover:border-navy/30
            transition-all duration-200
          "
        >
          <svg
            width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            className="text-muted group-hover:text-navy transition-colors duration-200"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        {/* Dot indicators */}
        <div className="flex items-center gap-1.5" role="tablist" aria-label="Card navigation">
          {images.map((img, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={img.alt}
              onClick={() => setActiveIndex(i)}
              className={`
                rounded-full transition-all duration-300
                ${i === activeIndex
                  ? "w-5 h-2 bg-navy"
                  : "w-2 h-2 bg-border hover:bg-muted/40"
                }
              `}
            />
          ))}
        </div>

        {/* Next arrow */}
        <button
          onClick={() => advanceCard(1)}
          aria-label="Next screenshot"
          className="
            group flex items-center justify-center
            w-10 h-10 rounded-full
            border border-border bg-white
            shadow-sm hover:shadow-md hover:border-navy/30
            transition-all duration-200
          "
        >
          <svg
            width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            className="text-muted group-hover:text-navy transition-colors duration-200"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
