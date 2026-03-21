"use client";

import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  children: React.ReactNode;
  id?: string;
  ariaLabel: string;
  className?: string;
  /** Use bg-soft (#F9FAFB) background */
  soft?: boolean;
  /** Use navy (#133C7B) background with white text */
  navy?: boolean;
}

/**
 * Consistent section wrapper enforcing semantic HTML (REGEL 4),
 * 8px grid spacing (REGEL 2), and alternating backgrounds.
 */
export function SectionWrapper({
  children,
  id,
  ariaLabel,
  className,
  soft = false,
  navy = false,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={cn(
        "px-6 py-16 md:py-24",
        soft && "bg-bg-soft",
        navy && "bg-navy text-white",
        !soft && !navy && "bg-white",
        className
      )}
    >
      <div className="mx-auto max-w-site">{children}</div>
    </section>
  );
}
