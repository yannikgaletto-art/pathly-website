"use client";

import { useRef, useEffect } from "react";
import { COMPARISON, SITE } from "@/lib/constants";

// ── SVG Icons ─────────────────────────────────────────────────
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

const manualChars = COMPARISON.manualTitle.split("");
const pathlyChars = COMPARISON.pathlyTitle.split("");

export function Comparison() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    async function init() {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const section = sectionRef.current;
      if (!section) return;

      // ── Cache DOM ──
      const t1 = Array.from(section.querySelectorAll<HTMLElement>("[data-t1c]"));
      const t2 = Array.from(section.querySelectorAll<HTMLElement>("[data-t2c]"));
      const t1Cursor = section.querySelector<HTMLElement>("[data-cursor-t1]");
      const t2Cursor = section.querySelector<HTMLElement>("[data-cursor-t2]");
      const sArr = Array.from(section.querySelectorAll<HTMLElement>("[data-step]"));
      const timelineLine = section.querySelector<HTMLElement>("[data-timeline-line]");
      const rightSide = section.querySelector<HTMLElement>("[data-right-side]");
      const pathlyCard = section.querySelector<HTMLElement>("[data-pathly-card]");
      const sLen = sArr.length;

      // ── Init: hide all animated elements ──
      // No-JS: all visible by default in JSX
      t1.forEach(el => { el.style.display = "none"; el.style.opacity = "1"; });
      t2.forEach(el => { el.style.display = "none"; el.style.opacity = "1"; });
      sArr.forEach(el => { el.style.opacity = "0"; el.style.transform = "translateY(10px)"; });
      if (t1Cursor) t1Cursor.style.opacity = "0";
      if (t2Cursor) t2Cursor.style.opacity = "0";
      if (timelineLine) timelineLine.style.height = "0%";
      if (rightSide) { rightSide.style.opacity = "0"; rightSide.style.pointerEvents = "none"; }
      if (pathlyCard) pathlyCard.style.opacity = "0";

      // ── Blink-stop flags (trigger once per cursor) ──
      let t1BlinkTriggered = false;
      let t2BlinkTriggered = false;

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const p = self.progress;

          // ── Phase 1: Left title typewriter 0–6% ──
          if (t1.length > 0) {
            const slice = 0.06 / t1.length;
            t1.forEach((el, i) => { el.style.display = p >= i * slice ? "inline" : "none"; });
          }

          // T1 cursor: visible during typing → finite blink after → hidden when right side comes in
          if (t1Cursor) {
            if (p < 0.06) {
              t1Cursor.style.opacity = "1";
              t1Cursor.classList.remove("cursor-blink-7");
              t1BlinkTriggered = false;
            } else if (p < 0.60) {
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

          // ── Phase 2: Left steps stagger 8–62% ──
          if (sLen > 0) {
            const sStart = 0.08, sEnd = 0.62;
            const sSlice = (sEnd - sStart) / sLen;
            sArr.forEach((el, i) => {
              const ws = sStart + i * sSlice;
              const we = ws + sSlice * 0.45;
              const op = p < ws ? 0 : p > we ? 1 : (p - ws) / (we - ws);
              el.style.opacity = String(op);
              el.style.transform = `translateY(${(1 - op) * 10}px)`;
            });
            if (timelineLine) {
              const lp = Math.min(1, Math.max(0, (p - 0.08) / (0.62 - 0.08)));
              timelineLine.style.height = `${lp * 100}%`;
            }
          }

          // ── Phase 3: Right side fades in 62–68% ──
          if (rightSide) {
            const rOp = p < 0.62 ? 0 : p > 0.68 ? 1 : (p - 0.62) / 0.06;
            rightSide.style.opacity = String(rOp);
            rightSide.style.pointerEvents = rOp > 0 ? "auto" : "none";
          }

          // ── Phase 4: Right title typewriter 68–74% ──
          if (t2.length > 0) {
            const slice = 0.06 / t2.length;
            t2.forEach((el, i) => { el.style.display = p >= 0.68 + i * slice ? "inline" : "none"; });
          }
          if (t2Cursor) {
            if (p >= 0.68 && p < 0.74) {
              t2Cursor.style.opacity = "1";
              t2Cursor.classList.remove("cursor-blink-7");
              t2BlinkTriggered = false;
            } else if (p >= 0.74 && p < 0.95) {
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

          // ── Phase 5: Pathly card fades in 74–88% ──
          if (pathlyCard) {
            const op = p < 0.74 ? 0 : p > 0.88 ? 1 : (p - 0.74) / 0.14;
            pathlyCard.style.opacity = String(op);
          }
        },
      });
    }

    init().catch(console.error);

    return () => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        ScrollTrigger.getAll().forEach(t => t.kill());
      });
    };
  }, []);

  return (
    // 400vh scroll space — sticky inner keeps everything in viewport
    <section
      ref={sectionRef}
      aria-label="Vorher-Nachher Vergleich"
      className="bg-white"
      style={{ height: "400vh" }}
    >
      <div
        className="sticky top-0 w-full flex items-center justify-center"
        style={{ height: "100vh" }}
      >
        {/* Flip wrapper — transparent, no border/bg, ready for rotateY */}
        <div data-flipper className="w-full max-w-2xl mx-auto px-6">
          <div className="grid grid-cols-2 gap-8 items-start">

            {/* ── LEFT: Manual Process (transparent) ── */}
            <div className="relative">
              <h2 className="text-[1.1rem] font-bold text-text leading-snug tracking-[-0.02em] mb-5">
                {manualChars.map((char, i) => (
                  <span key={`t1-${i}`} data-t1c style={{ opacity: 1 }}>{char}</span>
                ))}
                <span data-cursor-t1 className="typewriter-cursor" aria-hidden="true" style={{ opacity: 0 }} />
              </h2>

              {/* Vertical timeline + steps */}
              <div className="relative">
                <div className="absolute left-[15px] top-0 bottom-0 w-px bg-border overflow-hidden">
                  <div data-timeline-line className="w-full bg-navy" style={{ height: "0%" }} />
                </div>

                <ol className="relative space-y-4">
                  {COMPARISON.steps.map((step) => (
                    <li key={step.id} data-step className="flex items-start gap-3" style={{ opacity: 1 }}>
                      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-white border border-border flex items-center justify-center shadow-sm">
                        <StepIcon iconKey={step.iconKey} />
                      </div>
                      <div className="pt-0.5">
                        <p className="text-[13px] font-semibold text-text leading-snug">{step.id}. {step.title}</p>
                        <p className="text-[12px] text-muted leading-relaxed">{step.description}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* ── RIGHT: Pathly (fades in after left is done) ── */}
            <div data-right-side className="relative" style={{ opacity: 0 }}>
              <h2 className="text-[1.1rem] font-bold text-text leading-snug tracking-[-0.02em] mb-5">
                {pathlyChars.map((char, i) => (
                  <span key={`t2-${i}`} data-t2c style={{ opacity: 1 }}>{char}</span>
                ))}
                <span data-cursor-t2 className="typewriter-cursor" aria-hidden="true" style={{ opacity: 0 }} />
              </h2>

              {/* Pathly navy card */}
              <div data-pathly-card style={{ opacity: 0 }}>
                <div className="rounded-xl p-5" style={{ backgroundColor: "#133C7B" }}>
                  <p className="text-white text-base font-bold mb-5 text-center">{SITE.name}</p>

                  <ul className="space-y-3 mb-5">
                    {COMPARISON.pathlyCard.checks.map((check, i) => (
                      <li key={i} className="flex items-center gap-2.5">
                        <svg className="w-4 h-4 text-white flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span className="text-white font-semibold text-[13px]">{check}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="bg-white/10 rounded-lg p-3 mb-4">
                    <p className="text-white/90 text-[12px] leading-relaxed text-center">
                      {COMPARISON.pathlyCard.subtext}
                    </p>
                  </div>

                  <a
                    href={SITE.appUrl}
                    className="block w-full text-center py-2 px-4 rounded-lg bg-[#A8C4E6] text-navy font-semibold text-[13px] hover:bg-[#93B5DC] transition-colors duration-200"
                  >
                    {COMPARISON.pathlyCard.cta}
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
