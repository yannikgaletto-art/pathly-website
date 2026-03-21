"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FEATURES } from "@/lib/constants";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

export function Features() {
  const [active, setActive] = useState(0);

  return (
    <SectionWrapper id="features" ariaLabel={FEATURES.sectionLabel}>
      <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
        <p className="text-small font-semibold text-navy uppercase tracking-wider mb-4">
          {FEATURES.sectionLabel}
        </p>
        <h2 className="text-h2-mobile lg:text-h2-desktop font-bold text-text">
          {FEATURES.headline}
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Tab List */}
        <div className="flex flex-col gap-4">
          {FEATURES.items.map((item, i) => (
            <button
              key={item.title}
              onClick={() => setActive(i)}
              className={`text-left rounded-lg border p-6 transition-all duration-200 ${
                active === i
                  ? "border-navy bg-navy-tint shadow-md"
                  : "border-border bg-white hover:border-navy/30 hover:shadow-sm"
              }`}
            >
              <h3 className={`text-h3-mobile lg:text-h3-desktop font-semibold ${
                active === i ? "text-navy" : "text-text"
              }`}>
                {item.title}
              </h3>
              <p className="mt-2 text-body text-muted">{item.body}</p>
            </button>
          ))}
        </div>

        {/* Screenshot Preview */}
        <div className="relative aspect-[4/3] rounded-xl border border-border bg-bg-soft overflow-hidden shadow-lg">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0"
            >
              <Image
                src={FEATURES.items[active].screen}
                alt={FEATURES.items[active].title}
                fill
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </SectionWrapper>
  );
}
