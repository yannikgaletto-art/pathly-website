/**
 * Marker-highlight text effect with optional sliding badge.
 *
 * Uses PURE CSS @keyframes (not React state) for the animation —
 * same bulletproof pattern as hero-fade-in. CSS animations fire
 * independently of JS hydration, so they work reliably for
 * above-the-fold content.
 *
 * prefers-reduced-motion is handled globally in globals.css.
 */

interface HighlightTextProps {
  children: React.ReactNode;
  /** Marker background color */
  color?: string;
  /** Optional badge label (e.g. "Pathly") */
  badge?: string;
  /** Badge background color */
  badgeColor?: string;
}

export function HighlightText({
  children,
  color = "#CADCF2",
  badge,
  badgeColor = "#CADCF2",
}: HighlightTextProps) {
  return (
    <span
      className="relative inline marker-highlight"
      style={{
        background: `linear-gradient(${color}, ${color}) no-repeat left center`,
        padding: "2px 6px",
        borderRadius: "6px",
      }}
    >
      {children}
      {badge && (
        <span
          className="marker-badge absolute -top-3 -right-14 md:-right-16 inline-flex items-center rounded-md px-2.5 py-1 text-[11px] md:text-[12px] font-bold tracking-wide shadow-sm"
          style={{
            backgroundColor: badgeColor,
            color: "#133C7B",
          }}
        >
          {badge}
        </span>
      )}
    </span>
  );
}
