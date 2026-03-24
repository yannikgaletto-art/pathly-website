"use client";

import { useRef, useEffect, type ReactNode, Children } from "react";

/**
 * ScrollSection — Wrapper for scroll-driven Hero→Problem transition.
 *
 * APPROACH v4: No absolute layers, no GSAP pin.
 * - The outer div provides 400vh of scroll distance.
 * - The sticky div (CSS `position: sticky`) stays fixed in viewport.
 * - Hero is the ONLY visible child initially (positioned naturally).
 * - Problem is hidden (opacity 0, visibility hidden) and positioned
 *   OVER the hero when revealed.
 * - GSAP ScrollTrigger.create() with onUpdate for manual opacity control.
 *
 * Children order: [Hero, Problem]
 */
interface ScrollSectionProps {
  children: ReactNode;
}

export function ScrollSection({ children }: ScrollSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const childArray = Children.toArray(children);
  const heroChild = childArray[0];
  const problemChild = childArray[1];

  useEffect(() => {
    // Restore scroll-to-top behavior only on initial page load
    // Does NOT fire on browser back-navigation (history.scrollRestoration = 'auto')
    if (typeof window !== 'undefined' && window.history.scrollRestoration) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    async function initAnimation() {
      try {
        const { gsap } = await import("gsap");
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        gsap.registerPlugin(ScrollTrigger);

        const container = containerRef.current;
        if (!container) return;

        const heroWords = container.querySelectorAll<HTMLElement>("[data-hero-word]");
        const heroSection = container.querySelector<HTMLElement>("[aria-label='Hero']");
        const problemLayer = container.querySelector<HTMLElement>("[data-problem-layer]");

        if (heroWords.length === 0 || !problemLayer) return;

        const belowFold = heroSection?.querySelector<HTMLElement>(".max-w-site");
        const wordArray = Array.from(heroWords);
        const totalWords = wordArray.length;

        ScrollTrigger.create({
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          onUpdate: (self) => {
            const p = self.progress; // 0 to 1

            // ── Below-fold: hide in first 3% ──
            if (belowFold) {
              const belowFoldOpacity = p < 0.03 ? 1 - (p / 0.03) : 0;
              belowFold.style.opacity = String(belowFoldOpacity);
              belowFold.style.visibility = belowFoldOpacity > 0 ? "visible" : "hidden";
            }

            // ── Phase 1: BACKSPACE (5%–45%) ──
            const backspaceStart = 0.05;
            const backspaceEnd = 0.45;
            const backspaceRange = backspaceEnd - backspaceStart;
            const sliceSize = backspaceRange / totalWords;

            for (let i = 0; i < totalWords; i++) {
              const reverseIndex = totalWords - 1 - i;
              const wordStart = backspaceStart + reverseIndex * sliceSize;
              const wordEnd = wordStart + sliceSize;

              let wordOpacity: number;
              if (p < wordStart) {
                wordOpacity = 1;
              } else if (p > wordEnd) {
                wordOpacity = 0;
              } else {
                wordOpacity = 1 - ((p - wordStart) / (wordEnd - wordStart));
              }
              wordArray[i].style.opacity = String(wordOpacity);
            }

            // ── Phase 2: Problem REVEAL (50%–65%) ──
            const revealStart = 0.50;
            const revealEnd = 0.65;
            let problemOpacity: number;
            if (p < revealStart) {
              problemOpacity = 0;
            } else if (p > revealEnd) {
              problemOpacity = 1;
            } else {
              problemOpacity = (p - revealStart) / (revealEnd - revealStart);
            }
            problemLayer.style.opacity = String(problemOpacity);
            problemLayer.style.visibility = problemOpacity > 0 ? "visible" : "hidden";

            // When problem is visible, hide hero section to avoid overlap issues
            if (heroSection) {
              heroSection.style.opacity = p > 0.48 ? "0" : "1";
              heroSection.style.visibility = p > 0.48 ? "hidden" : "visible";
            }
          },
        });

      } catch (err) {
        console.error("[ScrollSection] GSAP init failed:", err);
      }
    }

    initAnimation();

    return () => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        ScrollTrigger.getAll().forEach((t) => t.kill());
      });
    };
  }, []);

  return (
    <div ref={containerRef} style={{ height: "400vh" }} className="relative">
      {/* Sticky viewport — CSS position:sticky keeps this in view */}
      <div
        className="sticky top-0 w-full"
        style={{ height: "100vh" }}
      >
        {/* Hero child renders normally — uses its own min-h-[100svh] and flex layout */}
        {heroChild}

        {/* Problem overlay — absolutely positioned over the same viewport */}
        <div
          data-problem-layer
          className="absolute inset-0 flex items-start justify-center overflow-y-auto pt-16 bg-white"
          style={{ opacity: 0, visibility: "hidden" }}
        >
          <div className="w-full">
            {problemChild}
          </div>
        </div>
      </div>
    </div>
  );
}
