"use client";

import { motion } from "framer-motion";
import { TESTIMONIALS } from "@/lib/constants";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

export function Testimonials() {
  return (
    <SectionWrapper id="testimonials" ariaLabel={TESTIMONIALS.sectionLabel} soft>
      <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
        <p className="text-small font-semibold text-navy uppercase tracking-wider mb-4">
          {TESTIMONIALS.sectionLabel}
        </p>
        <h2 className="text-h2-mobile lg:text-h2-desktop font-bold text-text">
          {TESTIMONIALS.headline}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {TESTIMONIALS.items.map((item, i) => (
          <motion.blockquote
            key={item.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="rounded-lg border border-border bg-white p-8 shadow-sm"
          >
            {/* Quote icon */}
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-navy-tint mb-4">
              <path
                d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1zm12 0c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"
                fill="currentColor"
              />
            </svg>

            <p className="text-body text-text italic leading-relaxed">
              &ldquo;{item.quote}&rdquo;
            </p>

            <footer className="mt-6 pt-4 border-t border-border">
              <cite className="not-italic">
                <span className="block font-semibold text-text">{item.name}</span>
                <span className="block text-small text-muted">{item.role}</span>
              </cite>
            </footer>
          </motion.blockquote>
        ))}
      </div>
    </SectionWrapper>
  );
}
