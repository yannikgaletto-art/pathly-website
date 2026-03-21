"use client";

import { motion } from "framer-motion";
import { FINAL_CTA, SITE } from "@/lib/constants";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { ShimmerButton } from "@/components/ui/ShimmerButton";

export function FinalCTA() {
  const tallyId = SITE.tallyFormId;

  return (
    <SectionWrapper id="waitlist" ariaLabel="Warteliste">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="relative rounded-2xl bg-gradient-to-br from-navy to-navy-hover p-12 md:p-16 text-center text-white overflow-hidden"
      >
        {/* Background glow */}
        <div className="absolute -top-24 -right-24 w-[400px] h-[400px] bg-white/5 rounded-full blur-3xl pointer-events-none" />

        <h2 className="text-h2-mobile lg:text-h2-desktop font-bold relative z-10">
          {FINAL_CTA.headline}
        </h2>
        <p className="mt-4 text-lg text-white/80 max-w-xl mx-auto relative z-10">
          {FINAL_CTA.subheadline}
        </p>

        <div className="mt-8 relative z-10">
          {tallyId ? (
            /* Tally.so Embed — DSGVO-konform (EU Server) */
            <iframe
              data-tally-src={`https://tally.so/embed/${tallyId}?alignLeft=1&hideTitle=1&transparentBackground=1`}
              loading="lazy"
              width="100%"
              height="200"
              title="Pathly Warteliste"
              className="rounded-lg"
              // F-06 fix: sandbox restricts iframe capabilities (no top-nav, no popups)
              sandbox="allow-scripts allow-forms allow-same-origin"
            />
          ) : (
            /* Fallback: Direct CTA link when no Tally form configured */
            <ShimmerButton
              href={`mailto:hello@${SITE.domain}?subject=Warteliste%20Pathly`}
              size="lg"
              variant="secondary"
              className="bg-white text-navy hover:bg-gray-50"
            >
              {FINAL_CTA.cta}
            </ShimmerButton>
          )}
        </div>

        <p className="mt-4 text-small text-white/60 relative z-10">
          {FINAL_CTA.note}
        </p>
      </motion.div>
    </SectionWrapper>
  );
}
