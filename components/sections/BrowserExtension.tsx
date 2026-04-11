"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
// SITE import removed — CTA button hidden until extension published
import Image from "next/image";

/**
 * Section — Browser Extension (Redesigned V2)
 *
 * 4-phase interactive demo inside a single browser window:
 *   Phase 0: Real LinkedIn screenshot — user sees a hint to click the P icon
 *   Phase 1: "Job speichern" floating button appears over the screenshot
 *   Phase 2: Slide-up "In Queue packen?" confirmation card (job matches screenshot)
 *   Phase 3: Success steckbrief with keywords extracted from the real job
 *
 * Auto-play: Phase 0 → (5s) → Phase 1 → (5s) → Phase 2 → (3s) → Phase 3 → (4s) → loop.
 * Stops permanently on user interaction.
 *
 * Job data matches the LinkedIn screenshot exactly:
 *   Title: IT Business Consultant / Architekt
 *   Company: zeb consulting · Berlin (Hybrid)
 */

type Phase = 0 | 1 | 2 | 3;

// Job data — matches the LinkedIn screenshot exactly
const DEMO_JOB = {
  title: "IT Business Consultant / Architekt",
  company: "zeb consulting",
  location: "Berlin (Hybrid)",
  companyShort: "zeb consulting · Berlin",
  keywords: ["IT-Architektur", "Banking", "Multi-Tier", "Consulting", "Finanzdienstleister"],
} as const;

export function BrowserExtension() {
  const t = useTranslations("browserExtension");
  const [phase, setPhase] = useState<Phase>(0);
  const [userInteracted, setUserInteracted] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Auto-play logic
  useEffect(() => {
    if (userInteracted) return;

    const delays: Record<Phase, number> = { 0: 5000, 1: 5000, 2: 3000, 3: 4000 };
    timerRef.current = setTimeout(() => {
      setPhase((prev) => {
        if (prev === 3) return 0; // loop
        return (prev + 1) as Phase;
      });
    }, delays[phase]);

    return clearTimer;
  }, [phase, userInteracted, clearTimer]);

  const handleUserAdvance = useCallback(
    (nextPhase: Phase) => {
      setUserInteracted(true);
      clearTimer();
      setPhase(nextPhase);
    },
    [clearTimer]
  );

  return (
    <section id="extension" aria-label="Browser Extension" className="bg-white px-6 py-16 md:py-24">
      <div className="mx-auto max-w-site">
        {/* ─── Header ─── */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-navy/5 border border-navy/10"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
            <span className="text-[13px] font-semibold text-navy">{t("badge")}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-[32px] md:text-[44px] font-bold text-text leading-tight"
          >
            {t("headline")} <span className="text-navy">{t("headlineAccent")}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-[16px] text-muted max-w-xl mx-auto"
          >
            {t("subline")}
          </motion.p>
        </div>

        {/* ─── Single Demo Window ─── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mx-auto max-w-[560px]"
        >
          <div className="rounded-2xl border border-border bg-white shadow-lg overflow-hidden">
            {/* Browser chrome bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-bg-soft">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
              </div>
              <div className="flex-1 mx-3 h-6 rounded-md bg-border/40 flex items-center px-3">
                <span className="text-[11px] text-muted/60 truncate">
                  linkedin.com/jobs/view/it-business-consultant
                </span>
              </div>
              {/* Pathly extension icon in browser bar */}
              <motion.div
                className="w-6 h-6 rounded-md bg-navy flex items-center justify-center shrink-0 cursor-pointer"
                animate={
                  phase === 0
                    ? { scale: [1, 1.2, 1], boxShadow: ["0 0 0 0 rgba(19,60,123,0)", "0 0 0 6px rgba(19,60,123,0.25)", "0 0 0 0 rgba(19,60,123,0)"] }
                    : {}
                }
                transition={phase === 0 ? { duration: 1.8, repeat: Infinity, ease: "easeInOut" } : {}}
                onClick={() => handleUserAdvance(1)}
              >
                <span className="text-[9px] font-bold text-white">P</span>
              </motion.div>
            </div>

            {/* Content area */}
            <div className="relative" style={{ minHeight: 380 }}>
              <AnimatePresence mode="wait">
                {phase === 0 && (
                  <PhaseLinkedIn key="phase-0" onClickExtension={() => handleUserAdvance(1)} t={t} />
                )}
                {phase === 1 && (
                  <PhaseButton key="phase-1" onAdvance={() => handleUserAdvance(2)} t={t} />
                )}
                {phase === 2 && (
                  <PhaseConfirm key="phase-2" onAdvance={() => handleUserAdvance(3)} t={t} />
                )}
                {phase === 3 && <PhaseSuccess key="phase-3" t={t} />}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* ─── Feature pills ─── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-10"
        >
          {[t("features.0"), t("features.1"), t("features.2"), t("features.3")].map((f) => (
            <span key={f} className="inline-flex items-center gap-1.5 text-[13px] text-muted font-medium">
              <CheckIcon size={14} className="text-success" />
              {f}
            </span>
          ))}
        </motion.div>

        {/* ─── CTA Block — HIDDEN until extension is published ─── */}
        {/* <motion.div ... hidden until Chrome Web Store listing is live /> */}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   Phase 0 — Real LinkedIn screenshot with pulsing P icon hint
   ═══════════════════════════════════════════════════ */
function PhaseLinkedIn({
  onClickExtension,
  t,
}: {
  onClickExtension: () => void;
  t: ReturnType<typeof useTranslations>;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.3 }}
      className="absolute inset-0"
    >
      {/* LinkedIn screenshot */}
      <div className="relative w-full h-full">
        <Image
          src="/demo-linkedin.png"
          alt="LinkedIn Stellenanzeige — IT Business Consultant / Architekt bei zeb consulting, Berlin"
          fill
          className="object-cover object-top"
          sizes="560px"
          priority
        />

        {/* Gradient overlay at bottom for hint text */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white/95 via-white/70 to-transparent" />

        {/* Hint text at bottom */}
        <div className="absolute bottom-4 inset-x-0 flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-navy/90 backdrop-blur-sm shadow-lg cursor-pointer hover:bg-navy transition-colors"
            onClick={onClickExtension}
          >
            <span className="w-5 h-5 rounded bg-white/20 flex items-center justify-center shrink-0">
              <span className="text-[8px] font-bold text-white">P</span>
            </span>
            <span className="text-[13px] text-white font-medium">
              {t("demo.hintClick")}
            </span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="text-white/70"
            >
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════
   Phase 1 — Floating "Job speichern" button over the screenshot
   ═══════════════════════════════════════════════════ */
function PhaseButton({
  onAdvance,
  t,
}: {
  onAdvance: () => void;
  t: ReturnType<typeof useTranslations>;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="absolute inset-0"
    >
      {/* LinkedIn screenshot — dimmed */}
      <div className="relative w-full h-full">
        <Image
          src="/demo-linkedin.png"
          alt="LinkedIn Stellenanzeige — IT Business Consultant / Architekt bei zeb consulting, Berlin"
          fill
          className="object-cover object-top opacity-30 blur-[2px]"
          sizes="560px"
        />
      </div>

      {/* Floating button overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.button
          onClick={onAdvance}
          className="
            relative z-10 flex items-center gap-3
            px-6 py-3.5 rounded-2xl cursor-pointer
            bg-navy text-white font-semibold text-[15px]
            shadow-xl shadow-navy/25
            hover:shadow-2xl hover:shadow-navy/35
            hover:scale-105 active:scale-95
            transition-all duration-200
          "
          animate={{
            boxShadow: [
              "0 8px 24px rgba(19,60,123,0.25)",
              "0 8px 32px rgba(19,60,123,0.4)",
              "0 8px 24px rgba(19,60,123,0.25)",
            ],
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
          <span>{t("demo.buttonLabel")}</span>
        </motion.button>

        <p className="relative z-10 mt-4 text-[13px] text-muted">{t("demo.buttonHint")}</p>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════
   Phase 2 — "In Queue packen?" confirmation card
   Job data matches the LinkedIn screenshot exactly
   ═══════════════════════════════════════════════════ */
function PhaseConfirm({
  onAdvance,
  t,
}: {
  onAdvance: () => void;
  t: ReturnType<typeof useTranslations>;
}) {
  const [typedTitle, setTypedTitle] = useState("");
  const [typedCompany, setTypedCompany] = useState("");

  // Typewriter effect — job data from the LinkedIn screenshot
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= DEMO_JOB.title.length) {
        setTypedTitle(DEMO_JOB.title.slice(0, i));
        i++;
      } else if (i <= DEMO_JOB.title.length + DEMO_JOB.companyShort.length) {
        const ci = i - DEMO_JOB.title.length - 1;
        setTypedCompany(DEMO_JOB.companyShort.slice(0, ci + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 25);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="absolute inset-0 flex items-center justify-center px-8"
    >
      <div className="w-full max-w-[380px] rounded-2xl border border-border bg-white shadow-xl p-6 text-center">
        <h3 className="text-[20px] font-bold text-text mb-5">{t("demo.confirmTitle")}</h3>

        {/* Detected job info — typewriter */}
        <div className="text-left mb-6 space-y-1 min-h-[52px]">
          <p className="text-[15px] font-semibold text-text">
            {typedTitle}
            <span className="inline-block w-[2px] h-[14px] bg-navy ml-0.5 animate-pulse" />
          </p>
          {typedCompany && <p className="text-[14px] text-muted">{typedCompany}</p>}
        </div>

        {/* Buttons */}
        <button
          onClick={onAdvance}
          className="
            w-full py-3 rounded-xl bg-navy text-white text-[15px] font-semibold
            hover:bg-navy-hover active:scale-[0.98] cursor-pointer
            transition-all duration-200 mb-3
          "
        >
          {t("demo.confirmYes")}
        </button>
        <button type="button" className="text-[14px] text-muted hover:text-text transition-colors cursor-pointer">
          {t("demo.confirmNo")}
        </button>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════
   Phase 3 — Success steckbrief with real pipeline value
   Keywords match the actual job on the LinkedIn screenshot
   ═══════════════════════════════════════════════════ */
function PhaseSuccess({ t }: { t: ReturnType<typeof useTranslations> }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="absolute inset-0 flex items-center justify-center px-8"
    >
      <div className="w-full max-w-[380px] rounded-2xl border border-border bg-white shadow-xl p-6">
        {/* Success header — same job as LinkedIn screenshot */}
        <div className="flex items-start gap-3 mb-5">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 400, damping: 15 }}
            className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center shrink-0 mt-0.5"
          >
            <CheckIcon size={16} className="text-success" strokeWidth={3} />
          </motion.div>
          <div>
            <p className="text-[16px] font-bold text-text leading-snug">{DEMO_JOB.title}</p>
            <p className="text-[14px] text-muted">{DEMO_JOB.companyShort}</p>
          </div>
        </div>

        <div className="h-[1px] bg-border mb-5" />

        {/* Keywords extracted — real buzzwords from the job */}
        <div className="space-y-3">
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          >
            <p className="text-[12px] text-muted mb-1.5 font-medium">{t("demo.keywordsLabel")}</p>
            <div className="flex flex-wrap gap-1.5">
              {DEMO_JOB.keywords.map((kw, i) => (
                <motion.span
                  key={kw}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + i * 0.08 }}
                  className="px-2.5 py-1 rounded-md bg-navy/5 border border-navy/10 text-[12px] font-medium text-navy"
                >
                  {kw}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Pipeline steps */}
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.3 }}
            className="space-y-2 pt-2"
          >
            {[
              { label: t("demo.pipelineMatch"), done: true },
              { label: t("demo.pipelineLetter"), done: true },
              { label: t("demo.pipelineCoaching"), done: false },
            ].map((step, i) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 + i * 0.15 }}
                className="flex items-center gap-2.5"
              >
                {step.done ? (
                  <CheckIcon size={14} className="text-success" />
                ) : (
                  <div className="w-3.5 h-3.5 rounded-full border-2 border-navy/30 border-t-navy animate-spin shrink-0" />
                )}
                <span className={`text-[13px] ${step.done ? "text-text" : "text-muted"}`}>{step.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Reusable Check Icon ─── */
function CheckIcon({
  size = 14,
  className = "",
  strokeWidth = 2.5,
}: {
  size?: number;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 ${className}`}
      aria-hidden="true"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

/* ─── Chrome Icon ─── */
function ChromeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0" aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="10" fill="white" fillOpacity="0.2" />
      <path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" fill="white" />
      <path d="M12 8h8.94M12 8l-4.47 7.75M12 8l-4.47 7.75M20.94 8A10 10 0 1 1 3.06 16" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
