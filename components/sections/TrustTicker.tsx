import { TRUST } from "@/lib/constants";

export function TrustTicker() {
  return (
    <section aria-label="Vertrauen" className="bg-bg-soft border-y border-border py-8 overflow-hidden">
      <div className="mx-auto max-w-site px-6">
        {/* Quote */}
        <blockquote className="text-center">
          <p className="text-body font-medium text-text italic">
            {TRUST.quote}
          </p>
          <cite className="mt-2 block text-small text-muted not-italic">
            — {TRUST.source}
          </cite>
        </blockquote>

        {/* Trust Badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          {TRUST.badges.map((badge) => (
            <span
              key={badge}
              className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-small font-medium text-navy border border-border shadow-sm"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-success">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              {badge}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
