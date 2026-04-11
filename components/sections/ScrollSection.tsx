"use client";

import { useRef, useEffect, type ReactNode, Children } from "react";
import { useTranslations } from "next-intl";
import { HERO } from "@/lib/constants";

/**
 * ScrollSection — Sticky scroll container for Hero + Problem.
 *
 * ARCHITECTURE (v6 — Brand Split + Divider Progress):
 *   400vh outer → sticky 100vh viewport.
 *   Left (30%): Brand stack "Pathly / Simplify / your / Path." — CSS cascade.
 *   Center: 2px navy progress divider with fill + dot.
 *   Right (70%): Typewriter headlines + toggles.
 *   Phase 0 (CSS @keyframes): Brand words cascade.
 *   Phase A–C (GSAP, delayed 1.4s): Hero chars type in.
 *   Phases 1–4 (ScrollTrigger): Backspace, problem typewriter, toggles.
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
  const problemText = tProblems("headline").replace(/\n/g, " ");
  const problemChars = problemText.split("");

  const containerRef = useRef<HTMLDivElement>(null);
  const dotPulsedRef = useRef(false);
  const reducedMotionRef = useRef(false);

  const childArray = Children.toArray(children);
  const heroChild = childArray[0];
  // drawerChild = 3rd child (ComparisonToggle), shown inside the drawer
  const drawerChild = childArray[childArray.length - 1];
  const toggleChildren = childArray.slice(1, childArray.length - 1);

  useEffect(() => {
    if (typeof window !== "undefined" && window.history.scrollRestoration) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    // ── Scroll-Lock during intro ──
    // Block all scroll until the typewriter animation completes.
    // overflow:hidden on <html> + <body> covers mouse-wheel, keyboard,
    // and trackpad momentum. Touch is blocked via the passive listener below.
    const htmlEl = document.documentElement;
    const bodyEl = document.body;
    htmlEl.style.overflow = "hidden";
    bodyEl.style.overflow = "hidden";

    // Block touch-move events (mobile / trackpad) while locked
    const blockTouch = (e: TouchEvent) => e.preventDefault();
    document.addEventListener("touchmove", blockTouch, { passive: false });

    const releaseScrollLock = () => {
      htmlEl.style.overflow = "";
      bodyEl.style.overflow = "";
      document.removeEventListener("touchmove", blockTouch);
    };


    async function initAnimation() {
      try {
        const { gsap } = await import("gsap");
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        gsap.registerPlugin(ScrollTrigger);

        const container = containerRef.current;
        if (!container) return;

        // ── Accessibility: respect reduced-motion preference ──
        reducedMotionRef.current = window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches;

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
        const scrollDot = container.querySelector<HTMLElement>("[data-scroll-dot]");
        const scrollFill = container.querySelector<HTMLElement>("[data-scroll-fill]");
        const drawerOverlay = container.querySelector<HTMLElement>("[data-drawer-overlay]");

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
        // Delayed 1.4s to start AFTER brand-word CSS cascade finishes.
        // Scroll-lock is held for the full duration; released in onComplete.
        const introTimeline = gsap.timeline({
          delay: 1.4,
          onComplete: () => {
            releaseScrollLock();
            createScrollAnimation();
          },
        });
        hArr.forEach((el, i) => {
          introTimeline.call(() => { el.style.display = "inline"; }, [], i * 0.05);
        });
        // Extra 0.8s pause after last char so the completed sentence
        // is readable before scroll is enabled.
        introTimeline.to({}, { duration: 0.8 });

        // ══════════════════════════════════════════════════════════════
        // SCROLL PHASES — all in one continuous ScrollTrigger
        // ══════════════════════════════════════════════════════════════
        const createScrollAnimation = () => {
          ScrollTrigger.create({
            trigger: container,
            start: "top top",
            end: "bottom bottom",
            onUpdate: (self) => {
              const p = self.progress;

              // ── Progress divider (dot moves to bottom by p≈0.55) ──
              const dotP = Math.min(p / 0.55, 1);
              if (scrollDot) scrollDot.style.top = `${Math.min(dotP * 100, 95)}%`;
              if (scrollFill) scrollFill.style.height = `${Math.min(dotP * 100, 96)}%`;

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
              // PHASE 5: Dot pulse at arrival — once only
              // ════════════════════════════════════════════════
              if (scrollDot) {
                // Reset guard on scroll-back so pulse can re-fire
                if (p < 0.50) dotPulsedRef.current = false;

                if (p >= 0.55 && !dotPulsedRef.current && !reducedMotionRef.current) {
                  dotPulsedRef.current = true;
                  gsap.fromTo(
                    scrollDot,
                    { scale: 1, opacity: 1 },
                    {
                      scale: 2,
                      opacity: 0.4,
                      duration: 0.2,
                      ease: "power2.out",
                      yoyo: true,
                      repeat: 1,
                      onComplete: () => { gsap.set(scrollDot, { scale: 1, opacity: 1 }); },
                    }
                  );
                }
              }

              // ════════════════════════════════════════════════
              // PHASE 6: Drawer — drawer is cached once above (not re-queried)
              // 58→80% = 22% of 500vh ≈ 1100px slow reveal
              // Starts right after dot reaches bottom and finishes at 0.8.
              // The remaining 20% (0.8 to 1.0) is exactly 100vh ("1 scroll"),
              // during which the user scrolls but nothing happens (deliberate pause).
              // ════════════════════════════════════════════════
              if (drawerOverlay) {
                const exitStart = 0.58, exitEnd = 0.80;
                if (p >= exitEnd) {
                  drawerOverlay.style.transform = "translateY(0%)";
                  drawerOverlay.style.opacity = "1";
                  drawerOverlay.style.visibility = "visible";
                } else if (p >= exitStart) {
                  // Linear mapping — user scroll IS the easing.
                  // No power curves: they fight scroll speed → cause stutter.
                  const t = (p - exitStart) / (exitEnd - exitStart);
                  const yPercent = 100 * (1 - t);
                  drawerOverlay.style.transform = `translateY(${yPercent.toFixed(3)}%)`;
                  drawerOverlay.style.opacity = "1";
                  drawerOverlay.style.visibility = "visible";
                } else {
                  drawerOverlay.style.transform = "translateY(100%)";
                  drawerOverlay.style.opacity = "0";
                  drawerOverlay.style.visibility = "hidden";
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
      // Always release scroll lock on unmount (e.g. route change mid-animation)
      releaseScrollLock();
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        ScrollTrigger.getAll().forEach((t) => t.kill());
      });
    };
  }, []);

  return (
    <div ref={containerRef} style={{ height: "500vh" }} className="relative">
      <div className="sticky top-0 w-full overflow-hidden" style={{ height: "100vh" }}>

        {/* Drawer — slides up after dot hits bottom, contains real ComparisonToggle content */}
        <div
          data-drawer-overlay
          className="absolute inset-x-0 bottom-0 z-30 overflow-y-auto"
          style={{
            height: "100%",
            background: "var(--color-bg-soft)",
            transform: "translateY(100%)",
            opacity: 0,
            visibility: "hidden",
            borderTopLeftRadius: "32px",
            borderTopRightRadius: "32px",
            boxShadow: "0 -12px 40px rgba(19,60,123,0.10)",
            paddingTop: "20vh",
            // 40ms linear bridges the gap between discrete scroll events (~15-30 fps)
            // giving the browser time to glide to the next position smoothly
            transition: "transform 40ms linear",
            willChange: "transform",
          }}
        >
          {drawerChild}
        </div>

        {/* Layer 1: Hero above-fold (full viewport, visible initially) */}
        {heroChild}

        {/* ── Overlay canvas ── */}
        <div
          data-text-line
          className="absolute inset-0"
          style={{ opacity: 1, visibility: "visible" }}
        >
          <div
            data-content-wrapper
            className="w-full h-full"
            style={{ willChange: "transform" }}
          >
            {/* Unified layout — works on all breakpoints */}
            <div className="w-full h-full flex items-start pt-[16vh] md:pt-[12vh] px-6 md:px-10 lg:px-16">

              {/* Left column: Brand words — desktop only */}
              <div className="hidden md:flex w-[30%] lg:w-[28%] shrink-0 flex-col">
                <span
                  className="brand-word-0"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "clamp(4.5rem,7vw,7rem)",
                    lineHeight: 0.92,
                    letterSpacing: "-0.04em",
                    color: "var(--color-text)",
                  }}
                >
                  {HERO.brandWords[0]}
                </span>
                <span
                  className="brand-word-1"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "clamp(2.8rem,4.5vw,4.5rem)",
                    lineHeight: 1.0,
                    letterSpacing: "-0.03em",
                    color: "var(--color-text)",
                    marginTop: "0.1em",
                  }}
                >
                  {HERO.brandWords[1]}
                </span>
                <span
                  className="brand-word-2"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "clamp(2.8rem,4.5vw,4.5rem)",
                    lineHeight: 1.0,
                    letterSpacing: "-0.03em",
                    color: "var(--color-text)",
                  }}
                >
                  {HERO.brandWords[2]}
                </span>
                <span
                  className="brand-word-3"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "clamp(2.8rem,4.5vw,4.5rem)",
                    lineHeight: 1.0,
                    letterSpacing: "-0.03em",
                    color: "var(--color-navy)",
                  }}
                >
                  {HERO.brandWords[3]}
                </span>
              </div>

              {/* Vertical progress divider — desktop only */}
              <div
                className="hidden md:block relative self-stretch mx-6 lg:mx-10 shrink-0"
                style={{ width: "2px" }}
                aria-hidden="true"
              >
                <div className="absolute inset-0" style={{ background: "var(--color-border)" }} />
                <div
                  data-scroll-fill
                  className="absolute top-0 left-0 w-full"
                  style={{ height: "0%", background: "var(--color-navy)" }}
                />
                <div
                  data-scroll-dot
                  className="absolute left-1/2 -translate-x-1/2 rounded-full"
                  style={{
                    width: "10px",
                    height: "10px",
                    background: "var(--color-navy)",
                    boxShadow: "0 0 10px rgba(19,60,123,0.35)",
                    top: "0%",
                  }}
                />
              </div>

              {/* Right column (desktop) / Full column (mobile) */}
              <div className="flex-1 flex flex-col justify-start items-center md:items-start min-w-0 md:pt-2">

                {/* Mobile brand line */}
                <div className="md:hidden flex items-baseline gap-2 mb-8 brand-word-0">
                  <span
                    className="text-[24px] font-bold text-text"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {HERO.brandWords[0]}
                  </span>
                  <span className="text-[16px] text-muted">—</span>
                  <span
                    className="text-[16px] text-muted"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {HERO.brandWords[1]} {HERO.brandWords[2]}{" "}
                    <span className="text-navy font-semibold">{HERO.brandWords[3]}</span>
                  </span>
                </div>

                {/* Hero chars — ghost reserves 2-line height. textWrap:balance
                     ensures the natural word-boundary break at the right point */}
                <div
                  data-hero-line
                  className="text-center md:text-left font-bold text-text leading-[1.12] tracking-[-0.025em] relative"
                  style={{
                    fontSize: "clamp(1.4rem,3.4vw,3rem)",
                    textWrap: "balance" as never,
                  }}
                >
                  {/* Ghost: invisible full text pre-reserves line breaks */}
                  <span className="block invisible" aria-hidden="true">{heroText}</span>
                  {/* Typed chars: overlaid on ghost */}
                  <span className="absolute top-0 left-0 right-0 block">
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
                  </span>
                </div>

                {/* Problem chars — same pattern, smaller font for 2-line fit */}
                <div
                  data-problem-line
                  className="text-center md:text-left font-bold text-text leading-[1.12] tracking-[-0.025em] relative"
                  style={{
                    display: "none",
                    fontSize: "clamp(1.1rem,2.0vw,2.0rem)",
                    textWrap: "balance" as never,
                  }}
                >
                  <span className="block invisible" aria-hidden="true">{problemText}</span>
                  <span className="absolute top-0 left-0 right-0 block">
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
                  </span>
                </div>

                {/* Toggles */}
                <div className="w-full mt-10">
                  {toggleChildren}
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
