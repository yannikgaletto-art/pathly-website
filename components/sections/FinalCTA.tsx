"use client";

import { useState, useRef } from "react";
import { FINAL_CTA } from "@/lib/constants";

/**
 * Section 10 — Final CTA
 * Inline email capture with urgency-driven copy.
 * No external dependencies — native form with client-side state.
 */
export function FinalCTA() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "submitting" | "done">("idle");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || state === "submitting") return;

    setState("submitting");

    // Simulate — replace with real endpoint later
    setTimeout(() => {
      setState("done");
      setEmail("");
    }, 1200);
  };

  return (
    <section id="waitlist" aria-label="Warteliste" className="bg-white px-6 py-24 md:py-32">
      <div className="mx-auto max-w-[640px] text-center">

        {/* Headline */}
        <h2 className="text-[28px] md:text-[40px] font-bold text-text leading-[1.15] tracking-tight">
          {FINAL_CTA.headlinePart1}
          <br />
          <span className="text-muted font-normal">{FINAL_CTA.headlinePart2}</span>{" "}
          <span className="text-navy">{FINAL_CTA.headlineAccent}</span>
        </h2>

        {/* Subline */}
        <p className="mt-5 text-[16px] md:text-[17px] text-muted leading-relaxed max-w-[440px] mx-auto">
          {FINAL_CTA.body}
        </p>

        {/* Email Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 max-w-[480px] mx-auto"
        >
          <div className="relative flex-1">
            <input
              ref={inputRef}
              type="email"
              required
              disabled={state !== "idle"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={FINAL_CTA.inputPlaceholder}
              aria-label={FINAL_CTA.inputPlaceholder}
              className="w-full h-[52px] px-5 text-[15px] text-text bg-white rounded-xl border border-border
                         placeholder:text-muted/50
                         focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy
                         disabled:opacity-50 disabled:cursor-not-allowed
                         transition-all duration-200"
            />
          </div>

          <button
            type="submit"
            disabled={state !== "idle"}
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
                Wird gesendet…
              </span>
            ) : state === "done" ? (
              <span className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Du bist dabei!
              </span>
            ) : (
              FINAL_CTA.cta
            )}
          </button>
        </form>

        {/* Success Message */}
        {state === "done" && (
          <p className="mt-4 text-[14px] text-success font-medium animate-[fadeIn_0.3s_ease]">
            Perfekt — wir melden uns, sobald es losgeht.
          </p>
        )}

        {/* Trust Signals */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          {FINAL_CTA.trustSignals.map((signal) => (
            <span
              key={signal}
              className="flex items-center gap-1.5 text-[13px] text-muted"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
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
