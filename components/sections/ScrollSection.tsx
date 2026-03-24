"use client";

import { useRef, useEffect, type ReactNode, Children } from "react";
import { HERO, PROBLEMS } from "@/lib/constants";

/**
 * ScrollSection — Character-level scroll-driven typewriter transition.
 *
 * ARCHITECTURE:
 *   Phase A–C (GSAP Timeline, no scroll): Hero chars type in on page load.
 *   Phase 1–9 (ScrollTrigger onUpdate): Backspace, pause, problem typewriter, toggles.
 *
 *   Two separate text containers share ONE vertical position (sticky centered).
 *   Hero-line: text-align center (single line).
 *   Problem-line: text-align left, width max-content, margin auto (wraps to 2 lines).
 *
 * Children: [Hero (above-fold shell), ProblemToggles]
 */

// ── Split texts into character arrays ──
const heroText = HERO.headline.replace(/\n/g, " ");
const heroChars = heroText.split("");
const problemText = PROBLEMS.headline;
const problemChars = problemText.split("");

interface ScrollSectionProps {
  children: ReactNode;
}

export function ScrollSection({ children }: ScrollSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const childArray = Children.toArray(children);
  const heroChild = childArray[0];
  // Problem renders a Fragment with 3 <details> — Children.toArray flattens it
  const toggleChildren = childArray.slice(1);

  useEffect(() => {
    if (typeof window !== "undefined" && window.history.scrollRestoration) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    async function initAnimation() {
      try {
        const { gsap } = await import("gsap");
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        gsap.registerPlugin(ScrollTrigger);

        const container = containerRef.current;
        if (!container) return;

        // ── Cache DOM elements ──
        const heroSection = container.querySelector<HTMLElement>("[aria-label='Hero']");
        const belowFold = heroSection?.querySelector<HTMLElement>(".max-w-site");
        const textLine = container.querySelector<HTMLElement>("[data-text-line]");
        const contentWrapper = container.querySelector<HTMLElement>("[data-content-wrapper]");
        const heroLine = container.querySelector<HTMLElement>("[data-hero-line]");
        const problemLine = container.querySelector<HTMLElement>("[data-problem-line]");
        const heroCursor = container.querySelector<HTMLElement>("[data-cursor-hero]");
        const problemCursor = container.querySelector<HTMLElement>("[data-cursor-problem]");
        const heroSpans = container.querySelectorAll<HTMLElement>("[data-hc]");
        const problemSpans = container.querySelectorAll<HTMLElement>("[data-pc]");
        const toggleItems = container.querySelectorAll<HTMLElement>("[data-toggle-item]");

        if (!textLine || heroSpans.length === 0) return;

        const hArr = Array.from(heroSpans);
        const pArr = Array.from(problemSpans);
        const tArr = Array.from(toggleItems);
        const hLen = hArr.length;
        const pLen = pArr.length;
        const tLen = tArr.length;

        // ── Show the text line immediately (behind hidden Hero section) ──
        textLine.style.opacity = "1";
        textLine.style.visibility = "visible";

        // ── Phase A–C: GSAP Timeline — type hero chars on page load ──
        // Chars start hidden via display:none so cursor follows as they appear
        hArr.forEach((el) => {
          el.style.display = "none";
          el.style.opacity = "1";
        });

        // Cursor visible from the start
        if (heroCursor) {
          heroCursor.style.opacity = "1";
        }

        const introTimeline = gsap.timeline({
          onComplete: () => {
            // ── Handoff: Enable ScrollTrigger after intro completes ──
            createScrollAnimation();
          },
        });

        // Each char: instant display:inline with stagger — cursor follows L→R
        hArr.forEach((el, i) => {
          introTimeline.call(() => { el.style.display = "inline"; }, [], i * 0.05);
        });

        // Hold for a beat after typing finishes
        introTimeline.to({}, { duration: 0.8 });

        // ── ScrollTrigger phases ──
        const createScrollAnimation = () => {
          ScrollTrigger.create({
            trigger: container,
            start: "top top",
            end: "bottom bottom",
            onUpdate: (self) => {
              const p = self.progress;

              // ── Phase 1: Below-fold fade out 0–3% ──
              if (belowFold) {
                const op = p < 0.03 ? 1 - p / 0.03 : 0;
                belowFold.style.opacity = String(op);
                belowFold.style.visibility = op > 0 ? "visible" : "hidden";
              }

              // Hide Hero section shell when animation starts
              if (heroSection) {
                if (p > 0.03) {
                  heroSection.style.opacity = "0";
                  heroSection.style.visibility = "hidden";
                } else {
                  heroSection.style.opacity = "1";
                  heroSection.style.visibility = "visible";
                }
              }

              // ── Phase 2: Backspace R→L 3%–28% ──
              const bStart = 0.03, bEnd = 0.28;
              const bSlice = hLen > 0 ? (bEnd - bStart) / hLen : 0;

              for (let i = 0; i < hLen; i++) {
                const ri = hLen - 1 - i; // reverse index: last char first
                const ws = bStart + ri * bSlice;
                const we = ws + bSlice;

                let op: number;
                if (p < ws) op = 1;
                else if (p > we) op = 0;
                else {
                  const t = (p - ws) / (we - ws);
                  op = 1 - t * t; // ease-in for snappy disappearance
                }
                hArr[i].style.opacity = String(op);
                hArr[i].style.display = op < 0.01 ? "none" : "inline";
              }

              // ── Cursor logic: hero cursor vs problem cursor ──
              const switchPoint = 0.30; // when hero is gone, switch cursors

              if (heroCursor) {
                if (p < 0.03) heroCursor.style.opacity = "1";
                else if (p < switchPoint) heroCursor.style.opacity = "1";
                else heroCursor.style.opacity = "0";
              }

              if (problemCursor) {
                let cop: number;
                if (p < switchPoint) cop = 0;
                else if (p < 0.55) cop = 1;
                else if (p < 0.58) cop = 1 - (p - 0.55) / 0.03;
                else cop = 0;
                problemCursor.style.opacity = String(cop);
              }

              // ── Show/hide hero-line vs problem-line ──
              if (heroLine && problemLine) {
                if (p < switchPoint) {
                  heroLine.style.display = "block";
                  problemLine.style.display = "none";
                } else {
                  heroLine.style.display = "none";
                  problemLine.style.display = "block";
                }
              }

              // ── Phase 4: Typewriter L→R 32%–55% ──
              const tStart = 0.32, tEnd = 0.55;
              const tSlice = pLen > 0 ? (tEnd - tStart) / pLen : 0;

              for (let i = 0; i < pLen; i++) {
                const ws = tStart + i * tSlice;
                const we = ws + tSlice;

                let op: number;
                if (p < ws) op = 0;
                else if (p > we) op = 1;
                else {
                  const t = (p - ws) / (we - ws);
                  op = t * t; // ease-in for snap appearance
                }
                pArr[i].style.opacity = String(op);
                pArr[i].style.display = op > 0.01 ? "inline" : "none";
              }

              // ── Phase 6–8: Toggle stagger 60%–84% ──
              if (tLen > 0) {
                const togStart = 0.60, togEnd = 0.84;
                const togSlice = (togEnd - togStart) / tLen;

                for (let i = 0; i < tLen; i++) {
                  const ws = togStart + i * togSlice;
                  const we = ws + togSlice;

                  let op: number;
                  if (p < ws) op = 0;
                  else if (p > we) op = 1;
                  else op = (p - ws) / (we - ws);

                  tArr[i].style.opacity = String(op);
                  tArr[i].style.transform = `translateY(${(1 - op) * 20}px)`;
                }
              }

              // ── Shift content up during toggle phase to fit all 3 toggles ──
              if (contentWrapper) {
                const shiftStart = 0.55;
                const shiftEnd = 0.65;
                let shiftY = 0;
                if (p > shiftStart && p <= shiftEnd) {
                  shiftY = -((p - shiftStart) / (shiftEnd - shiftStart)) * 20;
                } else if (p > shiftEnd) {
                  shiftY = -20;
                }
                contentWrapper.style.transform = `translateY(${shiftY}vh)`;
              }
            },
          });
        }
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
    <div ref={containerRef} style={{ height: "500vh" }} className="relative">
      <div className="sticky top-0 w-full" style={{ height: "100vh" }}>

        {/* Layer 1: Hero above-fold (full viewport, visible initially) */}
        {heroChild}

        {/* Layer 2: Single-line text container — same position as hero H1 */}
        <div
          data-text-line
          className="absolute inset-0 flex flex-col items-center justify-center px-6"
          style={{ opacity: 1, visibility: "visible" }}
        >
          <div data-content-wrapper className="w-full max-w-4xl mx-auto" style={{ transition: 'none' }}>

            {/* Hero chars — text-center, each char is a span */}
            <div
              data-hero-line
              className="text-center text-[clamp(1.75rem,4.2vw,3.5rem)] font-bold text-text leading-[1.15] tracking-[-0.03em] md:whitespace-nowrap"
            >
              {heroChars.map((char, i) => (
                <span key={`hc-${i}`} data-hc style={{ opacity: 1, display: "none" }}>
                  {char}
                </span>
              ))}
              <span
                data-cursor-hero
                className="typewriter-cursor"
                aria-hidden="true"
                style={{ opacity: 0 }}
              />
            </div>

            {/* Problem chars — left-aligned, max-content centered, wraps to 2 lines */}
            <div
              data-problem-line
              className="text-[clamp(1.75rem,4.2vw,3.5rem)] font-bold text-text leading-[1.15] tracking-[-0.03em]"
              style={{
                textAlign: "left",
                width: "max-content",
                maxWidth: "100%",
                margin: "0 auto",
                display: "none",
              }}
            >
              {problemChars.map((char, i) => (
                <span key={`pc-${i}`} data-pc style={{ opacity: 0 }}>
                  {char}
                </span>
              ))}
              <span
                data-cursor-problem
                className="typewriter-cursor"
                aria-hidden="true"
                style={{ opacity: 0 }}
              />
            </div>

            {/* Toggles container — appears below the headline */}
            <div className="mt-12 mx-auto max-w-3xl text-left">
              {toggleChildren}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
