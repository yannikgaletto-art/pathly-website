"use client";

import { useRef, useEffect, type ReactNode, Children } from "react";
import { HERO, PROBLEMS, COMPARISON, SITE } from "@/lib/constants";

/**
 * ScrollSection — Single continuous sticky scroll container.
 *
 * ARCHITECTURE (v3 — Continuous Canvas):
 *   One 600vh outer container with a sticky 100vh viewport.
 *   Inside, a single tall canvas contains ALL content vertically stacked:
 *     - Hero/Problem typewriter text
 *     - Problem toggles
 *     - 30vh gap
 *     - Comparison section
 *
 *   GSAP translateY on the canvas simulates native scrolling within
 *   the sticky viewport. Toggles stay visible as comparison slides up.
 *
 *   Phase A–C (GSAP Timeline, no scroll): Hero chars type in on page load.
 *   Phases 1–4 (ScrollTrigger 0–55%): Backspace, problem typewriter, toggles.
 *   Phase 5 (55–70%): Canvas scroll — moves everything up, reveals comparison.
 *   Phases 6–10 (70–99%): Comparison animations (titles, steps, Pathly card).
 *
 * Children: [Hero (above-fold shell), ProblemToggles]
 */

// ── Split texts into character arrays ──
const heroText = HERO.headline.replace(/\n/g, " ");
const heroChars = heroText.split("");
const problemText = PROBLEMS.headline;
const problemChars = problemText.split("");
const manualChars = COMPARISON.manualTitle.split("");
const pathlyChars = COMPARISON.pathlyTitle.split("");

// ── SVG Icons ──
function StepIcon({ iconKey }: { iconKey: string }) {
  const p = { className: "w-4 h-4 text-navy", viewBox: "0 0 24 24", fill: "none" as const, stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (iconKey) {
    case "search":   return <svg {...p}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>;
    case "document": return <svg {...p}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/><path d="M16 13H8M16 17H8M10 9H8"/></svg>;
    case "pen":      return <svg {...p}><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>;
    case "file":     return <svg {...p}><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/></svg>;
    case "folder":   return <svg {...p}><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/></svg>;
    case "refresh":  return <svg {...p}><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M3 21v-5h5"/></svg>;
    case "calendar": return <svg {...p}><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>;
    default:         return null;
  }
}

interface ScrollSectionProps {
  children: ReactNode;
}

export function ScrollSection({ children }: ScrollSectionProps) {
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

        // Comparison elements (now inside the same canvas)
        const compSection = container.querySelector<HTMLElement>("[data-comparison-section]");
        const t1 = Array.from(container.querySelectorAll<HTMLElement>("[data-t1c]"));
        const t2 = Array.from(container.querySelectorAll<HTMLElement>("[data-t2c]"));
        const t1Cursor = container.querySelector<HTMLElement>("[data-cursor-t1]");
        const t2Cursor = container.querySelector<HTMLElement>("[data-cursor-t2]");
        const sArr = Array.from(container.querySelectorAll<HTMLElement>("[data-step]"));
        const timelineContainer = container.querySelector<HTMLElement>("[data-timeline-container]");
        const timelineLine = container.querySelector<HTMLElement>("[data-timeline-line]");
        const rightSide = container.querySelector<HTMLElement>("[data-right-side]");
        const pathlyCard = container.querySelector<HTMLElement>("[data-pathly-card]");
        const sLen = sArr.length;

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

        // ── Init: Comparison section (hidden initially, revealed by canvas scroll) ──
        if (compSection) compSection.style.opacity = "0"; // Start invisible — GSAP controls reveal
        t1.forEach(el => { el.style.display = "none"; el.style.opacity = "1"; });
        t2.forEach(el => { el.style.display = "none"; el.style.opacity = "1"; });
        sArr.forEach(el => { el.style.opacity = "0"; el.style.transform = "translateY(10px)"; });
        if (t1Cursor) { t1Cursor.style.opacity = "0"; t1Cursor.style.display = "none"; }
        if (t2Cursor) { t2Cursor.style.opacity = "0"; t2Cursor.style.display = "none"; }
        if (timelineContainer) timelineContainer.style.opacity = "0";
        if (timelineLine) timelineLine.style.height = "0%";
        if (rightSide) { rightSide.style.opacity = "0"; rightSide.style.pointerEvents = "none"; }
        if (pathlyCard) pathlyCard.style.opacity = "0";

        // ── Dynamic canvas scroll distance ──
        // Measure how far we need to translate the canvas up so the comparison
        // section is centered in the viewport.
        const viewportH = window.innerHeight;
        const canvasH = contentWrapper.scrollHeight;
        const maxShift = Math.max(0, canvasH - viewportH);

        // ── Blink-stop flags ──
        let t1BlinkTriggered = false;
        let t2BlinkTriggered = false;

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

              // ════════════════════════════════════════════════
              // PHASE 5: Canvas scroll 55%–70%
              // Translates the entire content wrapper upward,
              // keeping toggles visible while sliding comparison
              // into view from below.
              // ════════════════════════════════════════════════
              if (contentWrapper) {
                const scrollStart = 0.55, scrollEnd = 0.70;
                let shiftPx = 0;
                if (p > scrollStart && p <= scrollEnd) {
                  const t = (p - scrollStart) / (scrollEnd - scrollStart);
                  // Ease-out for smooth deceleration
                  const eased = 1 - (1 - t) * (1 - t);
                  shiftPx = eased * maxShift;
                } else if (p > scrollEnd) {
                  shiftPx = maxShift;
                }
                contentWrapper.style.transform = `translateY(${-shiftPx}px)`;
              }

              // ════════════════════════════════════════════════
              // PHASE 6: Left title typewriter 70–74%
              // ════════════════════════════════════════════════
              // Fade in the comparison section container first
              if (compSection) {
                if (p < 0.68) {
                  compSection.style.opacity = "0";
                } else if (p < 0.72) {
                  compSection.style.opacity = String((p - 0.68) / 0.04);
                } else {
                  compSection.style.opacity = "1";
                }
              }
              if (t1Cursor) {
                // Show cursor element at start of typing phase
                if (p >= 0.70 && t1Cursor.style.display === "none") {
                  t1Cursor.style.display = "";
                }
              }
              if (t1.length > 0) {
                const slice = 0.04 / t1.length;
                t1.forEach((el, i) => { el.style.display = p >= 0.70 + i * slice ? "inline" : "none"; });
              }

              // T1 cursor logic
              if (t1Cursor) {
                if (p >= 0.70 && p < 0.74) {
                  t1Cursor.style.opacity = "1";
                  t1Cursor.classList.remove("cursor-blink-7");
                  t1BlinkTriggered = false;
                } else if (p >= 0.74 && p < 0.86) {
                  if (!t1BlinkTriggered) {
                    t1BlinkTriggered = true;
                    t1Cursor.style.opacity = "1";
                    t1Cursor.classList.add("cursor-blink-7");
                  }
                } else {
                  t1Cursor.style.opacity = "0";
                  t1Cursor.classList.remove("cursor-blink-7");
                }
              }

              // ════════════════════════════════════════════════
              // PHASE 7: Left steps stagger 74–86%
              // ════════════════════════════════════════════════
              if (sLen > 0) {
                const sStart = 0.74, sEnd = 0.86;
                const sSlice = (sEnd - sStart) / sLen;
                
                // Show timeline gray background track ONLY when steps begin to appear
                if (timelineContainer) {
                  timelineContainer.style.opacity = p >= sStart ? "1" : "0";
                }

                sArr.forEach((el, i) => {
                  const ws = sStart + i * sSlice;
                  const we = ws + sSlice * 0.45;
                  const op = p < ws ? 0 : p > we ? 1 : (p - ws) / (we - ws);
                  el.style.opacity = String(op);
                  el.style.transform = `translateY(${(1 - op) * 10}px)`;
                });
                if (timelineLine) {
                  const lp = Math.min(1, Math.max(0, (p - 0.74) / (0.86 - 0.74)));
                  timelineLine.style.height = `${lp * 100}%`;
                }
              }

              // ════════════════════════════════════════════════
              // PHASE 8: Right side fades in 86–88%
              // ════════════════════════════════════════════════
              if (rightSide) {
                const rOp = p < 0.86 ? 0 : p > 0.88 ? 1 : (p - 0.86) / 0.02;
                rightSide.style.opacity = String(rOp);
                rightSide.style.pointerEvents = rOp > 0 ? "auto" : "none";
              }

              // ════════════════════════════════════════════════
              // PHASE 9: Right title typewriter 88–91%
              // ════════════════════════════════════════════════
              if (t2.length > 0) {
                if (t2Cursor && p >= 0.88 && t2Cursor.style.display === "none") {
                  t2Cursor.style.display = "";
                }
                const slice = 0.03 / t2.length;
                t2.forEach((el, i) => { el.style.display = p >= 0.88 + i * slice ? "inline" : "none"; });
              }
              if (t2Cursor) {
                if (p >= 0.88 && p < 0.91) {
                  t2Cursor.style.opacity = "1";
                  t2Cursor.classList.remove("cursor-blink-7");
                  t2BlinkTriggered = false;
                } else if (p >= 0.91 && p < 0.97) {
                  if (!t2BlinkTriggered) {
                    t2BlinkTriggered = true;
                    t2Cursor.style.opacity = "1";
                    t2Cursor.classList.add("cursor-blink-7");
                  }
                } else {
                  t2Cursor.style.opacity = "0";
                  t2Cursor.classList.remove("cursor-blink-7");
                }
              }

              // ════════════════════════════════════════════════
              // PHASE 10: Pathly card fades in 91–97%
              // ════════════════════════════════════════════════
              if (pathlyCard) {
                const op = p < 0.91 ? 0 : p > 0.97 ? 1 : (p - 0.91) / 0.06;
                pathlyCard.style.opacity = String(op);
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
    <div ref={containerRef} style={{ height: "600vh" }} className="relative">
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

          {/* ── Block 2: Comparison (Strict 10vh gap, then content) ── */}
            <div data-comparison-section className="w-full max-w-2xl mx-auto mt-[10vh] pb-[20vh]" style={{ opacity: 0 }}>
              <div className="grid grid-cols-2 gap-10 items-stretch">

                {/* LEFT: Manual Process */}
                <div className="relative flex flex-col">
                  <h2 className="text-2xl font-bold text-text leading-snug tracking-tight mb-5">
                    {manualChars.map((char, i) => (
                      <span key={`t1-${i}`} data-t1c style={{ opacity: 1 }}>{char}</span>
                    ))}
                    <span data-cursor-t1 className="typewriter-cursor" aria-hidden="true" style={{ opacity: 0 }} />
                  </h2>

                  <div className="relative">
                    <div data-timeline-container className="absolute left-[15px] top-0 bottom-0 w-px bg-border overflow-hidden" style={{ opacity: 0 }}>
                      <div data-timeline-line className="w-full bg-navy" style={{ height: "0%" }} />
                    </div>
                    <ol className="relative space-y-4">
                      {COMPARISON.steps.map((step) => (
                        <li key={step.id} data-step className="flex items-start gap-3" style={{ opacity: 1 }}>
                          <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-white border border-border flex items-center justify-center shadow-sm">
                            <StepIcon iconKey={step.iconKey} />
                          </div>
                          <div className="pt-0.5">
                            <p className="text-base font-semibold text-text leading-snug">{step.id}. {step.title}</p>
                            <p className="text-sm text-muted leading-relaxed">{step.description}</p>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>

                {/* RIGHT: Pathly */}
                <div data-right-side className="relative h-full flex flex-col" style={{ opacity: 0 }}>
                  <h2 className="text-2xl font-bold text-text leading-snug tracking-tight mb-5">
                    {pathlyChars.map((char, i) => (
                      <span key={`t2-${i}`} data-t2c style={{ opacity: 1 }}>{char}</span>
                    ))}
                    <span data-cursor-t2 className="typewriter-cursor" aria-hidden="true" style={{ opacity: 0 }} />
                  </h2>

                  <div data-pathly-card className="flex-1" style={{ opacity: 0 }}>
                    <div className="rounded-xl p-5 h-full flex flex-col" style={{ backgroundColor: "#133C7B" }}>
                      <p className="text-white text-base font-bold mb-5 text-center">{SITE.name}</p>

                      <ul className="space-y-3 mb-5 flex-1">
                        {COMPARISON.pathlyCard.checks.map((check, i) => (
                          <li key={i} className="flex items-center gap-2.5">
                            <svg className="w-4 h-4 text-white flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                            <span className="text-white font-semibold text-base">{check}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="bg-white/10 rounded-lg p-3 mb-4">
                        <p className="text-white/90 text-sm leading-relaxed text-center">
                          {COMPARISON.pathlyCard.subtext}
                        </p>
                      </div>

                      <a
                        href={SITE.appUrl}
                        className="block w-full text-center py-2 px-4 rounded-lg bg-[#A8C4E6] text-navy font-semibold text-base hover:bg-[#93B5DC] transition-colors duration-200"
                      >
                        {COMPARISON.pathlyCard.cta}
                      </a>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
