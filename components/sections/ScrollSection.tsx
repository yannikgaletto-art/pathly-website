"use client";

import { useRef, useEffect, type ReactNode, Children } from "react";
import { useTranslations } from "next-intl";

/**
 * ScrollSection — Sticky scroll container for Hero + Problem.
 *
 * ARCHITECTURE (v4 — Hero/Problem only):
 *   One 400vh outer container with a sticky 100vh viewport.
 *   Phase A–C (GSAP Timeline, no scroll): Hero chars type in on page load.
 *   Phases 1–4 (ScrollTrigger 0–100%): Backspace, problem typewriter, toggles.
 *
 * Children: [Hero (above-fold shell), ProblemToggles]
 */

interface ScrollSectionProps {
  children: ReactNode;
}

export function ScrollSection({ children }: ScrollSectionProps) {
  const tHero = useTranslations("hero");
  const tProblems = useTranslations("problems");

  const heroText = tHero("headline").replace(/\n/g, " ");
  const heroChars = heroText.split("");
  const problemText = tProblems("headline");
  const problemChars = problemText.split("");

  const containerRef = useRef<HTMLDivElement>(null);

  const childArray = Children.toArray(children);
  const heroChild = childArray[0];
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

        // ── Cache DOM ──
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

        if (!textLine || heroSpans.length === 0 || !contentWrapper) return;

        const hArr = Array.from(heroSpans);
        const pArr = Array.from(problemSpans);
        const tArr = Array.from(toggleItems);
        const hLen = hArr.length;
        const pLen = pArr.length;
        const tLen = tArr.length;

        // ── Init: Hero/Problem ──
        textLine.style.opacity = "1";
        textLine.style.visibility = "visible";
        hArr.forEach((el) => { el.style.display = "none"; el.style.opacity = "1"; });
        if (heroCursor) heroCursor.style.opacity = "1";

        // ── Phase A–C: GSAP Timeline — type hero chars on page load ──
        const introTimeline = gsap.timeline({
          onComplete: () => { createScrollAnimation(); },
        });
        hArr.forEach((el, i) => {
          introTimeline.call(() => { el.style.display = "inline"; }, [], i * 0.05);
        });
        introTimeline.to({}, { duration: 0.8 });

        // ══════════════════════════════════════════════════════════════
        // SCROLL PHASES — all in one continuous ScrollTrigger
        // 0–34%:  Hero backspace + Problem typewriter
        // 37–55%: Toggle stagger
        // 55–70%: Canvas scroll (translateY shifts everything up)
        // 70–99%: Comparison animations
        // ══════════════════════════════════════════════════════════════
        const createScrollAnimation = () => {
          ScrollTrigger.create({
            trigger: container,
            start: "top top",
            end: "bottom bottom",
            onUpdate: (self) => {
              const p = self.progress;

              // ════════════════════════════════════════════════
              // PHASE 1: Below-fold fade out 0–2%
              // ════════════════════════════════════════════════
              if (belowFold) {
                const op = p < 0.02 ? 1 - p / 0.02 : 0;
                belowFold.style.opacity = String(op);
                belowFold.style.visibility = op > 0 ? "visible" : "hidden";
              }

              // Hide Hero section shell
              if (heroSection) {
                if (p > 0.02) {
                  heroSection.style.opacity = "0";
                  heroSection.style.visibility = "hidden";
                } else {
                  heroSection.style.opacity = "1";
                  heroSection.style.visibility = "visible";
                }
              }

              // ════════════════════════════════════════════════
              // PHASE 2: Backspace R→L 2%–16%
              // ════════════════════════════════════════════════
              const bStart = 0.02, bEnd = 0.16;
              const bSlice = hLen > 0 ? (bEnd - bStart) / hLen : 0;
              for (let i = 0; i < hLen; i++) {
                const ri = hLen - 1 - i;
                const ws = bStart + ri * bSlice;
                const we = ws + bSlice;
                let op: number;
                if (p < ws) op = 1;
                else if (p > we) op = 0;
                else { const t = (p - ws) / (we - ws); op = 1 - t * t; }
                hArr[i].style.opacity = String(op);
                hArr[i].style.display = op < 0.01 ? "none" : "inline";
              }

              // Cursor logic: hero → problem
              const switchPoint = 0.18;
              if (heroCursor) {
                heroCursor.style.opacity = p < switchPoint ? "1" : "0";
              }
              if (problemCursor) {
                let cop: number;
                if (p < switchPoint) cop = 0;
                else if (p < 0.34) cop = 1;
                else if (p < 0.36) cop = 1 - (p - 0.34) / 0.02;
                else cop = 0;
                problemCursor.style.opacity = String(cop);
              }

              // Show/hide hero-line vs problem-line
              if (heroLine && problemLine) {
                if (p < switchPoint) {
                  heroLine.style.display = "block";
                  problemLine.style.display = "none";
                } else {
                  heroLine.style.display = "none";
                  problemLine.style.display = "block";
                }
              }

              // ════════════════════════════════════════════════
              // PHASE 3: Typewriter L→R 19%–34%
              // ════════════════════════════════════════════════
              const tStart = 0.19, tEnd = 0.34;
              const tSlice = pLen > 0 ? (tEnd - tStart) / pLen : 0;
              for (let i = 0; i < pLen; i++) {
                const ws = tStart + i * tSlice;
                const we = ws + tSlice;
                let op: number;
                if (p < ws) op = 0;
                else if (p > we) op = 1;
                else { const t = (p - ws) / (we - ws); op = t * t; }
                pArr[i].style.opacity = String(op);
                pArr[i].style.display = op > 0.01 ? "inline" : "none";
              }

              // ════════════════════════════════════════════════
              // PHASE 4: Toggle stagger 37%–55%
              // ════════════════════════════════════════════════
              if (tLen > 0) {
                const togStart = 0.37, togEnd = 0.55;
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
    <div ref={containerRef} style={{ height: "400vh" }} className="relative">
      <div className="sticky top-0 w-full overflow-hidden" style={{ height: "100vh" }}>

        {/* Layer 1: Hero above-fold (full viewport, visible initially) */}
        {heroChild}

        {/* Single continuous canvas — everything lives here */}
        <div
          data-text-line
          className="absolute inset-0 px-6"
          style={{ opacity: 1, visibility: "visible" }}
        >
          <div
            data-content-wrapper
            className="w-full flex flex-col items-center"
            style={{ willChange: "transform" }}
          >

            {/* ── Block 1: Hero + Problem + Toggles ── */}
            <div className="w-full pt-[35vh] pb-[6vh] flex flex-col items-center">

              {/* Hero chars */}
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

              {/* Problem chars — centered with max-w-3xl */}
              <div
                data-problem-line
                className="text-center text-[clamp(1.4rem,3.4vw,2.8rem)] font-bold text-text leading-[1.15] tracking-[-0.03em] max-w-3xl mx-auto"
                style={{ display: "none" }}
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

            {/* Toggles */}
            <div className="mx-auto max-w-3xl text-left w-full mt-8">
              {toggleChildren}
            </div>
          </div>

          </div>
        </div>

      </div>
    </div>
  );
}
