"use client";

import { useTranslations } from "next-intl";
import { PROBLEMS } from "@/lib/constants";

/**
 * Parses **bold** markers in text and returns JSX with <strong> tags.
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
 */
export function Problem() {
  const t = useTranslations("problems");

  const itemIds = ["01", "02", "03"] as const;

  return (
    <>
      {itemIds.map((id, i) => (
        <details
          key={id}
          data-toggle-item
          className="pathly-toggle group"
          open={i === 0}
          style={{ opacity: 0, transform: "translateY(20px)" }}
        >
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
              <strong className="text-navy">{t(`items.${id}.tag`)}:</strong>{" "}
              {renderBold(t(`items.${id}.headline`))}
            </span>
          </summary>

          <div className="pathly-toggle-content">
            <p className="text-[15px] text-text leading-[1.75]">
              {renderBold(t(`items.${id}.body`))}
            </p>

            <div className="mt-4 flex flex-col gap-1">
              <a
                href={PROBLEMS.items[i].sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] text-muted hover:text-navy transition-colors duration-200"
              >
                {t(`items.${id}.source`)} ↗
              </a>
              {i === 0 && "sourceUrlSecondary" in PROBLEMS.items[0] && (
                <a
                  href={(PROBLEMS.items[0] as any).sourceUrlSecondary}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] text-muted hover:text-navy transition-colors duration-200"
                >
                  {(PROBLEMS.items[0] as any).sourceSecondaryLabel || "Source ↗"}
                </a>
              )}
            </div>
          </div>
        </details>
      ))}
    </>
  );
}
