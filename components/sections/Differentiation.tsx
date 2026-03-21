"use client";

import { motion } from "framer-motion";
import { DIFFERENTIATION } from "@/lib/constants";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

export function Differentiation() {
  return (
    <SectionWrapper id="differentiation" ariaLabel={DIFFERENTIATION.sectionLabel} navy>
      <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
        <p className="text-small font-semibold text-white/70 uppercase tracking-wider mb-4">
          {DIFFERENTIATION.sectionLabel}
        </p>
        <h2 className="text-h2-mobile lg:text-h2-desktop font-bold text-white">
          {DIFFERENTIATION.headline}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {DIFFERENTIATION.items.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm p-8"
          >
            <h3 className="text-h3-mobile lg:text-h3-desktop font-semibold text-white">
              {item.title}
            </h3>
            <p className="mt-3 text-body text-white/80">
              {item.body}
            </p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
