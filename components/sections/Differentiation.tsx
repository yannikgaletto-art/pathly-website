import { DIFFERENTIATION } from "@/lib/constants";

/**
 * Section 07 — Differentiation
 * Navy background with glassmorphism comparison table (Pathly vs ChatGPT)
 * and trust badges underneath.
 * No Framer Motion — fully server-rendered for reliable visibility.
 */
export function Differentiation() {
  return (
    <section
      id="differentiation"
      aria-label="Warum Pathly"
      className="bg-navy px-6 py-16 md:py-24"
    >
      <div className="mx-auto max-w-site">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-[32px] md:text-[40px] font-bold text-white leading-tight">
            {DIFFERENTIATION.headline}
          </h2>
          <p className="mt-4 text-[16px] text-white/70">
            {DIFFERENTIATION.subline}
          </p>
        </div>

        {/* Comparison Table — Glassmorphism */}
        <div className="max-w-3xl mx-auto rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/15">
                <th className="px-6 py-4 text-[13px] font-medium text-white/50 uppercase tracking-wider">
                  Feature
                </th>
                <th className="px-6 py-4 text-[13px] font-semibold text-white uppercase tracking-wider text-center">
                  Pathly
                </th>
                <th className="px-6 py-4 text-[13px] font-medium text-white/50 uppercase tracking-wider text-center">
                  ChatGPT
                </th>
              </tr>
            </thead>
            <tbody>
              {DIFFERENTIATION.rows.map((row) => (
                <tr key={row.feature} className="border-b border-white/10 last:border-0">
                  <td className="px-6 py-4">
                    <span className="text-[15px] text-white font-medium">{row.feature}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center gap-1.5 text-[14px] text-success font-medium">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      {row.pathly}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center gap-1.5 text-[14px] text-white/30 font-medium">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                      {row.chatgpt}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Trust Badges */}
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          {DIFFERENTIATION.trustBadges.map((badge) => (
            <span
              key={badge}
              className="inline-flex items-center rounded-full bg-white/15 px-4 py-2 text-[13px] font-medium text-white"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
