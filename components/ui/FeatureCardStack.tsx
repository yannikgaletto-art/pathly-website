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
}

interface FeatureCardStackProps {
  images: readonly CardImage[];
}

const STACK = [
  { rotate: 0, x: 0, y: 0, scale: 1, zIndex: 30, shadow: "shadow-lg" },
  { rotate: 3, x: 8, y: 12, scale: 0.97, zIndex: 20, shadow: "shadow-md" },
  { rotate: 6, x: 16, y: 24, scale: 0.94, zIndex: 10, shadow: "shadow-sm" },
] as const;

const RADIO_STEP = 32;
const BALL_SIZE = 22;
const TRACK_PAD = 10;

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
  const trackHeight = (count - 1) * RADIO_STEP + BALL_SIZE + TRACK_PAD * 2;

  return (
    <div className="flex items-start gap-5">
      {/* Card stack */}
      <div
        className="flex-1 relative w-full"
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
                      className={`object-cover object-top transition-transform ease-out ${
                        isTop ? "duration-[350ms] hover:scale-[1.8]" : "duration-0"
                      }`}
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

      {/* 3D Radio Selector */}
      <div
        className="flex items-start gap-2.5 shrink-0 pt-[40%]"
        role="tablist"
        aria-label="Card navigation"
      >
        {/* Glass pill track */}
        <div
          className="relative rounded-full"
          style={{
            width: 42,
            height: trackHeight,
            padding: 5,
            backgroundColor: "rgba(200, 200, 200, 0.35)",
            backdropFilter: "blur(8px)",
            boxShadow:
              "rgba(50,50,93,0.12) 0px 15px 30px -8px, rgba(0,0,0,0.15) 0px 6px 16px -8px, rgba(10,37,64,0.18) 0px -2px 5px 0px inset",
          }}
        >
          <div
            className="w-full h-full rounded-full"
            style={{ border: "5px solid rgba(245, 245, 245, 0.4)" }}
          />
          {/* Sliding ball */}
          <div
            className="absolute rounded-full"
            style={{
              width: BALL_SIZE,
              height: BALL_SIZE,
              left: (42 - BALL_SIZE) / 2,
              top: TRACK_PAD + activeIndex * RADIO_STEP,
              transition: "top 800ms cubic-bezier(1, -0.4, 0, 1.4)",
              background: "linear-gradient(180deg, #f0f0f0 0%, #c0c0c0 100%)",
              boxShadow:
                "rgba(0,0,0,0.15) 0px -6px 8px 0px inset, rgba(0,0,0,0.08) 0px -10px 12px 0px inset, rgba(0,0,0,0.05) 0px 2px 1px, rgba(0,0,0,0.07) 0px 4px 2px, rgba(0,0,0,0.07) 0px 8px 4px",
            }}
          />
        </div>

        {/* Numbers */}
        <div
          className="flex flex-col justify-between"
          style={{
            height: trackHeight,
            paddingBlock: TRACK_PAD + (BALL_SIZE - 20) / 2,
          }}
        >
          {images.map((img, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={img.alt}
              onClick={() => setActiveIndex(i)}
              className={`font-mono font-black text-xl leading-none cursor-pointer transition-colors duration-300 ${
                i === activeIndex ? "text-gray-500" : "text-gray-300 hover:text-gray-400"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
