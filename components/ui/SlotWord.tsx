"use client";

import { useEffect, useRef, useState } from "react";

interface SlotWordProps {
  words: string[];
  intervalMs?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * SlotWord — Slot-machine word rotator.
 *
 * Cycles through `words` every `intervalMs` with a vertical flip/roll animation.
 * Pure CSS @keyframes driven from a data-attribute so no external dep needed.
 * Respects prefers-reduced-motion: just cross-fades instead of flipping.
 */
export function SlotWord({
  words,
  intervalMs = 2000,
  className,
  style,
}: SlotWordProps) {
  const [index, setIndex] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
      setAnimKey((prev) => prev + 1);
    }, intervalMs);

    return () => clearInterval(id);
  }, [words.length, intervalMs]);

  return (
    <span
      className={className}
      style={{
        display: "block",
        overflow: "hidden",
        position: "relative",
        ...style,
      }}
    >
      <span
        key={animKey}
        style={{
          display: "block",
          animation: "slot-roll-in 0.45s cubic-bezier(0.22, 1, 0.36, 1) both",
        }}
      >
        {words[index]}
      </span>

      {/* Inline keyframes — scoped to just this component */}
      <style>{`
        @keyframes slot-roll-in {
          from {
            opacity: 0;
            transform: translateY(-60%) rotateX(40deg);
            filter: blur(2px);
          }
          to {
            opacity: 1;
            transform: translateY(0) rotateX(0deg);
            filter: blur(0px);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          @keyframes slot-roll-in {
            from { opacity: 0; }
            to   { opacity: 1; }
          }
        }
      `}</style>
    </span>
  );
}
