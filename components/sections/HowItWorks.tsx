"use client";

import { motion } from "framer-motion";
import { HOW_IT_WORKS } from "@/lib/constants";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

const ICONS: Record<string, React.ReactNode> = {
  search: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
    </svg>
  ),
  file: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" />
    </svg>
  ),
  pen: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
    </svg>
  ),
  mic: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" x2="12" y1="19" y2="22" />
    </svg>
  ),
};

export function HowItWorks() {
  return (
    <SectionWrapper id="how-it-works" ariaLabel={HOW_IT_WORKS.sectionLabel} soft>
      <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
        <p className="text-small font-semibold text-navy uppercase tracking-wider mb-4">
          {HOW_IT_WORKS.sectionLabel}
        </p>
        <h2 className="text-h2-mobile lg:text-h2-desktop font-bold text-text">
          {HOW_IT_WORKS.headline}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {HOW_IT_WORKS.steps.map((step, i) => (
          <motion.div
            key={step.step}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="relative"
          >
            {/* Connector line for desktop */}
            {i < HOW_IT_WORKS.steps.length - 1 && (
              <div className="hidden lg:block absolute top-8 left-[calc(50%+32px)] w-[calc(100%-64px)] h-[2px] bg-border" />
            )}

            <div className="relative flex flex-col items-center text-center">
              {/* Step Number + Icon */}
              <div className="w-16 h-16 rounded-full bg-navy-tint flex items-center justify-center text-navy mb-4">
                {ICONS[step.icon]}
              </div>
              <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-navy text-white text-small font-bold flex items-center justify-center md:static md:mb-2 md:w-auto md:h-auto md:bg-transparent md:text-navy md:text-[13px] md:font-semibold">
                {step.step}
              </span>

              <h3 className="text-h3-mobile lg:text-h3-desktop font-semibold text-text">
                {step.title}
              </h3>
              <p className="mt-3 text-body text-muted">
                {step.body}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
