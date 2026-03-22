import { PROBLEMS } from "@/lib/constants";

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
          <p className="mt-4 text-[16px] text-muted">
            {PROBLEMS.subline}
          </p>
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
                  {item.headline}
                </span>
              </summary>

              {/* Expanded Content */}
              <div className="pathly-toggle-content">
                <p className="text-[15px] text-text leading-[1.75]">
                  {item.body}
                </p>

                <p className="mt-4 text-[15px] text-navy font-semibold">
                  <span className="mr-1.5">→</span>
                  {item.solution}
                </p>

                <a
                  href={item.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-[13px] text-muted hover:text-navy transition-colors duration-200"
                >
                  {item.source}
                </a>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
