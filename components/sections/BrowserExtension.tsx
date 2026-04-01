"use client";

import { motion } from "framer-motion";
import { BROWSER_EXTENSION, SITE } from "@/lib/constants";

/**
 * Section — Browser Extension
 * Split layout: left = headline + 4-step flow + CTA, right = animated popup mockup.
 * Below-the-fold → Framer Motion OK per AGENTS.md.
 */

export function BrowserExtension() {
  return (
    <section
      id="extension"
      aria-label="Browser Extension"
      className="bg-navy-tint px-6 py-16 md:py-24 overflow-hidden"
    >
      <div className="mx-auto max-w-site">
        {/* ─── Header ─── */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-navy/10 border border-navy/15"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
            <span className="text-[13px] font-semibold text-navy">
              {BROWSER_EXTENSION.badge}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-[32px] md:text-[44px] font-bold text-text leading-tight"
          >
            {BROWSER_EXTENSION.headline}{" "}
            <span className="text-navy">{BROWSER_EXTENSION.headlineAccent}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-[16px] text-muted max-w-xl mx-auto"
          >
            {BROWSER_EXTENSION.subline}
          </motion.p>
        </div>

        {/* ─── Main Split ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* LEFT: Steps + CTA */}
          <div>
            {/* Platform support */}
            <div className="flex items-center gap-2 mb-10 flex-wrap">
              <span className="text-[13px] text-muted font-medium mr-1">Funktioniert auf:</span>
              {BROWSER_EXTENSION.platforms.map((p, i) => (
                <motion.span
                  key={p.name}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-border text-[13px] font-semibold text-text shadow-sm"
                >
                  <PlatformIcon name={p.icon} />
                  {p.name}
                </motion.span>
              ))}
            </div>

            {/* 4-step flow */}
            <div className="space-y-6 mb-10">
              {BROWSER_EXTENSION.steps.map((step, i) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  className="flex gap-4 items-start"
                >
                  {/* Step number bubble */}
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-navy flex items-center justify-center">
                    <span className="text-[12px] font-bold text-white">{step.number}</span>
                  </div>
                  {/* Content */}
                  <div className="pt-1">
                    <p className="text-[15px] font-bold text-text">{step.title}</p>
                    <p className="text-[14px] text-muted mt-0.5">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Feature pills */}
            <div className="flex flex-wrap gap-2 mb-10">
              {BROWSER_EXTENSION.features.map((f) => (
                <span
                  key={f}
                  className="inline-flex items-center gap-1.5 text-[13px] text-text font-medium"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                    strokeLinejoin="round" className="text-success flex-shrink-0">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  {f}
                </span>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
            >
              <a
                href={SITE.appUrl}
                className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-navy text-white text-[15px] font-semibold overflow-hidden hover:bg-navy-hover transition-colors duration-300 shadow-md shadow-navy/20"
              >
                {/* Shimmer */}
                <span className="absolute inset-0 overflow-hidden rounded-xl">
                  <span className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/15 to-transparent group-hover:left-[200%] transition-all duration-700" />
                </span>
                <ChromeIcon />
                <span className="relative z-10">{BROWSER_EXTENSION.cta}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                  strokeLinejoin="round"
                  className="relative z-10 group-hover:translate-x-1 transition-transform duration-200">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <span className="text-[13px] text-muted">{BROWSER_EXTENSION.ctaNote}</span>
            </motion.div>
          </div>

          {/* RIGHT: Animated popup mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative flex justify-center lg:justify-end"
          >
            <PopupMockup />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── Animated Popup Mockup ─── */
function PopupMockup() {
  return (
    <div className="relative w-full max-w-[400px]">
      {/* Glow behind popup */}
      <div
        aria-hidden
        className="absolute -inset-8 rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, #133C7B 0%, transparent 70%)" }}
      />

      {/* Browser chrome */}
      <div className="relative rounded-2xl border border-border bg-white shadow-lg overflow-hidden">
        {/* Browser bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-bg-soft">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400/70" />
            <div className="w-3 h-3 rounded-full bg-yellow-400/70" />
            <div className="w-3 h-3 rounded-full bg-green-400/70" />
          </div>
          <div className="flex-1 mx-3 h-6 rounded-md bg-border/60 flex items-center px-3">
            <span className="text-[11px] text-muted truncate">linkedin.com/jobs/view/software-engineer-berlin</span>
          </div>
          {/* Extension icon in toolbar */}
          <div className="w-6 h-6 rounded-md bg-navy flex items-center justify-center flex-shrink-0">
            <span className="text-[10px] font-bold text-white">P</span>
          </div>
        </div>

        {/* "LinkedIn Job Page" content (blurred) */}
        <div className="relative px-5 py-5 bg-white">
          {/* Fake job listing */}
          <div className="space-y-2 opacity-40 blur-[1px] select-none pointer-events-none">
            <div className="h-5 w-3/4 rounded bg-border" />
            <div className="h-4 w-1/2 rounded bg-border" />
            <div className="h-3 w-full rounded bg-border/60 mt-3" />
            <div className="h-3 w-5/6 rounded bg-border/60" />
            <div className="h-3 w-4/6 rounded bg-border/60" />
            <div className="h-3 w-full rounded bg-border/60 mt-2" />
            <div className="h-3 w-3/4 rounded bg-border/60" />
          </div>

          {/* Floating Pathly popup */}
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
            className="absolute inset-x-4 bottom-4 rounded-xl border border-navy/20 bg-white shadow-xl shadow-navy/10 overflow-hidden"
          >
            {/* Popup header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-navy-tint">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-navy flex items-center justify-center">
                  <span className="text-[10px] font-bold text-white">P</span>
                </div>
                <span className="text-[13px] font-bold text-navy">Pathly</span>
              </div>
              <span className="text-[11px] text-success font-semibold">● Verbunden</span>
            </div>

            {/* Detected job data */}
            <div className="px-4 py-3 space-y-2">
              <div className="flex items-start gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  className="text-navy mt-0.5 flex-shrink-0">
                  <rect x="2" y="7" width="20" height="14" rx="2"/>
                  <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
                </svg>
                <div>
                  <p className="text-[12px] text-muted">Position</p>
                  <p className="text-[13px] font-semibold text-text">Software Engineer (m/w/d)</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  className="text-navy mt-0.5 flex-shrink-0">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                </svg>
                <div>
                  <p className="text-[12px] text-muted">Unternehmen</p>
                  <p className="text-[13px] font-semibold text-text">Acme GmbH · Berlin</p>
                </div>
              </div>

              {/* ATS score pill */}
              <div className="flex items-center gap-2 pt-1">
                <span className="text-[12px] text-muted">ATS-Score:</span>
                <div className="flex-1 h-1.5 rounded-full bg-border overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "72%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                    className="h-full rounded-full bg-success"
                  />
                </div>
                <span className="text-[12px] font-bold text-success">72%</span>
              </div>
            </div>

            {/* Import button */}
            <div className="px-4 pb-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                className="w-full py-2.5 rounded-lg bg-navy text-white text-[13px] font-bold flex items-center justify-center gap-2"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5v14M5 12l7 7 7-7"/>
                </svg>
                Job zur Queue hinzufügen
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Success toast */}
      <motion.div
        initial={{ opacity: 0, y: 8, x: 20 }}
        whileInView={{ opacity: 1, y: 0, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 1.2 }}
        className="absolute -bottom-4 -right-4 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-border shadow-lg shadow-black/8"
      >
        <div className="w-6 h-6 rounded-full bg-success/15 flex items-center justify-center flex-shrink-0">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-success">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <div>
          <p className="text-[12px] font-bold text-text">Job gespeichert!</p>
          <p className="text-[11px] text-muted">KI-Analyse läuft…</p>
        </div>
      </motion.div>
    </div>
  );
}

/* ─── Platform Icons (inline SVG) ─── */
function PlatformIcon({ name }: { name: string }) {
  switch (name) {
    case "linkedin":
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#0A66C2">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      );
    case "stepstone":
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="12" fill="#E8322A"/>
          <path d="M7 9h10M7 12h7M7 15h10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      );
    case "indeed":
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="4" fill="#2557A7"/>
          <path d="M12 5v14M8 9l4-4 4 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case "xing":
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#026466">
          <path d="M17.998 2h-3.04l-7.04 12.2L11.92 22h3.04l-3.04-7.8L17.998 2zM6.002 6.4H3l3.52 6-2.48 4h3l2.52-4-3.56-6z"/>
        </svg>
      );
    default:
      return null;
  }
}

/* ─── Chrome Icon ─── */
function ChromeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
      <circle cx="12" cy="12" r="10" fill="white" fillOpacity="0.2"/>
      <path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" fill="white"/>
      <path d="M12 8h8.94M12 8l-4.47 7.75M12 8l-4.47 7.75M20.94 8A10 10 0 1 1 3.06 16" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}
