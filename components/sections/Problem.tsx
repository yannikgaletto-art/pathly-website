import { PROBLEMS } from "@/lib/constants";

/**
 * Parses **bold** markers in text and returns JSX with <strong> tags.
 * Keeps all text in constants.ts (REGEL 7) while supporting inline emphasis.
 */
function renderBold(text: string) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i} className="font-semibold">{part}</strong> : part
  );
}

/**
 * Problem toggles — Notion-style accordion.
 * Headline is rendered by ScrollSection (same-line typewriter).
 * This component only renders the toggle items.
 * Each toggle has data-toggle-item for GSAP stagger-in control.
 */
export function Problem() {
  return (
    <>
      {PROBLEMS.items.map((item, i) => (
        <details
          key={item.id}
          data-toggle-item
          className="pathly-toggle group"
          open={i === 0}
          style={{ opacity: 0, transform: "translateY(20px)" }}
        >
          {/* Summary / Toggle Header */}
          <summary className="pathly-toggle-summary">
            <svg
              className="pathly-toggle-arrow"
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M3 1L7 5L3 9"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>
              <strong className="text-navy">{item.tag}:</strong>{" "}
              {renderBold(item.headline)}
            </span>
          </summary>

          {/* Expanded Content */}
          <div className="pathly-toggle-content">
            <p className="text-[15px] text-text leading-[1.75]">
              {renderBold(item.body)}
            </p>

            {/* Source Links */}
            <div className="mt-4 flex flex-col gap-1">
              <a
                href={item.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] text-muted hover:text-navy transition-colors duration-200"
              >
                Studie: {item.source} ↗
              </a>
              {"sourceUrlSecondary" in item && item.sourceUrlSecondary && (
                <a
                  href={item.sourceUrlSecondary}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] text-muted hover:text-navy transition-colors duration-200"
                >
                  {"sourceSecondaryLabel" in item ? item.sourceSecondaryLabel : "Weitere Quelle ↗"}
                </a>
              )}
            </div>
          </div>
        </details>
      ))}
    </>
  );
}
