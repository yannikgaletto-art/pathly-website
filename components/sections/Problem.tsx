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
 * Section 04 — Problem
 * Notion-style toggle (accordion) using native <details>/<summary>.
 * Server Component — no JS needed for toggle behavior.
 * First item is open by default.
 */
export function Problem() {
  return (
    <section aria-label="Das Problem" className="bg-white px-6 py-16 md:py-24">
      <div className="mx-auto max-w-site">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-[32px] md:text-[40px] font-bold text-text leading-tight">
            {PROBLEMS.headline}
          </h2>
        </div>

        {/* Toggles */}
        <div className="mx-auto max-w-3xl">
          {PROBLEMS.items.map((item, i) => (
            <details
              key={item.id}
              className="pathly-toggle group"
              {...(i === 0 ? { open: true } : {})}
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

                {/* Source Links — stacked vertically */}
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
        </div>
      </div>
    </section>
  );
}
