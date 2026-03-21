"use client";

import { cn } from "@/lib/utils";

interface FeatureChipProps {
  label: string;
  className?: string;
  /** Stagger delay in seconds — used as CSS animation delay */
  delay?: number;
}

/**
 * Floating feature chip for Hero section.
 * Uses CSS animation (not Framer Motion) to avoid SSR/hydration opacity:0 flash.
 * prefers-reduced-motion is handled globally in globals.css.
 */
export function FeatureChip({ label, className, delay = 0 }: FeatureChipProps) {
  return (
    <span
      style={{ animationDelay: `${delay}s` }}
      className={cn(
        // CSS fade-in — fires independently of JS hydration
        "hero-fade-in",
        "inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[13px] font-semibold text-navy shadow-card border border-border",
        className
      )}
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
        <path d="M20 6L9 17l-5-5" />
      </svg>
      {label}
    </span>
  );
}
