"use client";

import { cn } from "@/lib/utils";

interface ShimmerButtonProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary";
  size?: "md" | "lg";
}

/**
 * Custom shimmer CTA button — Tailwind-only, no external lib (REGEL 8).
 * Supports arbitrary HTML attributes (data-tally-*, aria-*, etc.) via rest spread.
 */
export function ShimmerButton({
  children,
  href,
  onClick,
  className,
  variant = "primary",
  size = "md",
  ...rest
}: ShimmerButtonProps) {
  const baseClasses = cn(
    "shimmer-btn inline-flex items-center justify-center font-semibold rounded-md transition-colors duration-200 focus-visible:outline-navy",
    size === "md" && "px-6 py-3 text-base",
    size === "lg" && "px-8 py-4 text-lg",
    variant === "primary" &&
      "bg-navy text-white hover:bg-navy-hover",
    variant === "secondary" &&
      "bg-white text-navy border-2 border-navy hover:bg-navy-tint",
    className
  );

  if (href) {
    return (
      <a href={href} className={baseClasses} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={baseClasses} {...rest}>
      {children}
    </button>
  );
}
