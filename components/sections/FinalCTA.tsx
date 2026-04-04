"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";

/**
 * Section 10 — Final CTA
 * Inline email capture with urgency-driven copy.
 *
 * Sends email to SaaS API: POST /api/waitlist/subscribe
 * Bot protection: Honeypot field (invisible input)
 * DOI: User receives confirmation email via Resend
 */

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://app.path-ly.eu";

export function FinalCTA() {
  const t = useTranslations("finalCta");
  const locale = useLocale();
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

        <form
          onSubmit={handleSubmit}
          className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 max-w-[480px] mx-auto"
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
              disabled={state !== "idle"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("inputPlaceholder")}
              aria-label={t("inputPlaceholder")}
              className="w-full h-[52px] px-5 text-[15px] text-text bg-white rounded-xl border border-border
                         placeholder:text-muted/50
                         focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy
                         disabled:opacity-50 disabled:cursor-not-allowed
                         transition-all duration-200"
            />
          </div>

          <button
            type="submit"
            disabled={state === "submitting" || state === "done" || state === "duplicate"}
            className="h-[52px] px-7 text-[15px] font-semibold text-white bg-navy rounded-xl
                       hover:bg-navy-hover active:scale-[0.98]
                       focus-visible:outline-navy
                       disabled:opacity-60 disabled:cursor-not-allowed
                       transition-all duration-200
                       whitespace-nowrap shrink-0"
          >
            {state === "submitting" ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                …
              </span>
            ) : state === "done" || state === "duplicate" ? (
              <span className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                ✓
              </span>
            ) : (
              t("cta")
            )}
          </button>
        </form>

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
