"use client";

import { FINAL_CTA, SITE } from "@/lib/constants";
import { ShimmerButton } from "@/components/ui/ShimmerButton";

/**
 * Section 09 — Final CTA
 * Centered card on #EEF3FB background with Tally popup trigger.
 * Generous whitespace (128px vertical padding).
 */
export function FinalCTA() {
  return (
    <section id="waitlist" aria-label="Warteliste" className="bg-white px-6 py-32">
      <div className="mx-auto max-w-[640px]">
        {/* CTA Card */}
        <div className="rounded-2xl bg-navy-tint border border-border p-12 md:p-16 text-center">
          <h2 className="text-[28px] md:text-[36px] font-bold text-navy leading-tight">
            {FINAL_CTA.headline}
          </h2>

          <p className="mt-4 text-[16px] text-muted leading-relaxed">
            {FINAL_CTA.body}
          </p>

          <div className="mt-8">
            <ShimmerButton
              href="#"
              size="lg"
              data-tally-open={SITE.tallyFormId || undefined}
              data-tally-emoji-text="👋"
              data-tally-emoji-animation="wave"
            >
              {FINAL_CTA.cta}
            </ShimmerButton>
          </div>

          <p className="mt-4 text-[12px] text-muted">
            {FINAL_CTA.note}
          </p>
        </div>
      </div>
    </section>
  );
}
