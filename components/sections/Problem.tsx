"use client";

import { motion } from "framer-motion";
import { PROBLEM } from "@/lib/constants";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

export function Problem() {
  return (
    <SectionWrapper ariaLabel={PROBLEM.sectionLabel}>
      <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
        <p className="text-small font-semibold text-navy uppercase tracking-wider mb-4">
          {PROBLEM.sectionLabel}
        </p>
        <h2 className="text-h2-mobile lg:text-h2-desktop font-bold text-text">
          {PROBLEM.headline}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {PROBLEM.items.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="rounded-lg border border-border bg-white p-8 text-center shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <span className="text-4xl" role="img" aria-hidden="true">
              {item.emoji}
            </span>
            <h3 className="mt-4 text-h3-mobile lg:text-h3-desktop font-semibold text-text">
              {item.title}
            </h3>
            <p className="mt-3 text-body text-muted">
              {item.body}
            </p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
