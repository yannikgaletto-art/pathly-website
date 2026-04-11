"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { SITE } from "@/lib/constants";

/**
 * Section 10 — Final CTA
 *
 * PRIMARY: Direct button → SaaS Signup (no email needed here, Onboarding collects it)
 * SECONDARY: Expandable waitlist form for users who prefer to wait for an invitation
 *
 * Backend: POST /api/waitlist/subscribe (existing DOI pipeline via Resend)
 * Bot protection: Honeypot field (invisible input)
 */

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://app.path-ly.eu";

export function FinalCTA() {
  const t = useTranslations("finalCta");
  const locale = useLocale();
  const [showWaitlist, setShowWaitlist] = useState(false);
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState(""); // Bot trap
  const [state, setState] = useState<"idle" | "submitting" | "done" | "duplicate" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || state === "submitting") return;

    setState("submitting");

    try {
      const res = await fetch(`${APP_URL}/api/waitlist/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          locale,
          honeypot, // Empty = human, filled = bot
        }),
      });

      const data = await res.json();

      if (data.success) {
        setState(data.duplicate ? "duplicate" : "done");
        setEmail("");
      } else {
        console.error("[FinalCTA] Submit failed:", data.error);
        setState("error");
      }
    } catch (err) {
      console.error("[FinalCTA] Network error:", err);
      setState("error");
    }
  };

  const trustSignals = [
    t("trustSignals.0"),
    t("trustSignals.1"),
    t("trustSignals.2"),
  ];

  return (
    <section id="waitlist" aria-label="Waitlist" className="bg-white px-6 py-24 md:py-32">
      <div className="mx-auto max-w-[640px] text-center">

        <h2 className="text-[28px] md:text-[40px] font-bold text-text leading-[1.15] tracking-tight">
          {t("headlinePart1")}
          <br />
          <span className="text-muted font-normal">{t("headlinePart2")}</span>{" "}
          <span className="text-navy">{t("headlineAccent")}</span>
        </h2>

        <p className="mt-5 text-[16px] md:text-[17px] text-muted leading-relaxed max-w-[440px] mx-auto">
          {t("body")}
        </p>

        {/* ── Primary CTA: Direct to Signup ── */}
        <div className="mt-10">
          <a
            href={`${SITE.appUrl}/signup`}
            className="group relative inline-flex items-center gap-2.5 px-8 py-4 rounded-xl text-[16px] font-semibold text-white overflow-hidden transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #133C7B 0%, #1A4E9F 100%)",
              boxShadow: "0 4px 14px rgba(19,60,123,0.25), inset 0 1px 0 rgba(255,255,255,0.10)",
            }}
          >
            <span className="absolute inset-0 overflow-hidden rounded-xl">
              <span className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/15 to-transparent group-hover:left-[200%] transition-all duration-700" />
            </span>
            <span className="relative z-10">{t("cta")}</span>
            <span className="relative z-10 flex items-center justify-center w-6 h-6 rounded-[5px] bg-white/15 group-hover:bg-white/25 transition-colors duration-200">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 transition-transform duration-200">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </span>
          </a>
        </div>

        {/* ── Secondary: Expandable Waitlist (for users who prefer email invite) ── */}
        {!showWaitlist && state === "idle" && (
          <button
            onClick={() => setShowWaitlist(true)}
            className="mt-4 text-[13px] text-muted hover:text-navy transition-colors duration-200 underline underline-offset-2"
          >
            {t("waitlistToggle")}
          </button>
        )}

        {showWaitlist && state === "idle" && (
          <form
            onSubmit={handleSubmit}
            className="mt-6 flex flex-row items-center gap-3 mx-auto max-w-[520px] animate-fade-in"
          >
            {/* Honeypot — invisible to humans, bots fill it */}
            <input
              type="text"
              name="company_url"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute opacity-0 w-0 h-0 pointer-events-none"
            />

            <div className="relative flex-1">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("inputPlaceholder")}
                aria-label={t("inputPlaceholder")}
                className="w-full h-[48px] px-5 text-[14px] text-text bg-white rounded-xl border border-border
                           placeholder:text-muted/50
                           focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy
                           transition-all duration-200"
              />
            </div>

            <button
              type="submit"
              className="h-[48px] px-6 text-[14px] font-semibold text-white bg-navy rounded-xl
                         hover:bg-navy-hover active:scale-[0.98]
                         focus-visible:outline-navy
                         transition-all duration-200
                         whitespace-nowrap shrink-0"
            >
              {t("waitlistCta")}
            </button>
          </form>
        )}

        {/* Success message — appears after submit */}
        {state === "done" && (
          <p className="mt-4 text-sm text-navy font-medium animate-fade-in">
            {t("successMessage")}
          </p>
        )}
        {state === "duplicate" && (
          <p className="mt-4 text-sm text-muted font-medium animate-fade-in">
            {t("duplicateMessage")}
          </p>
        )}
        {state === "error" && (
          <p className="mt-4 text-sm text-red-500 font-medium animate-fade-in">
            {t("errorMessage")}
          </p>
        )}

        {/* Trust Signals */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          {trustSignals.map((signal) => (
            <span
              key={signal}
              className="flex items-center gap-1.5 text-[13px] text-muted"
            >
              <svg
                width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                className="text-success shrink-0"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
              {signal}
            </span>
          ))}
        </div>

      </div>
    </section>
  );
}
