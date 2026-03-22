import { TESTIMONIALS } from "@/lib/constants";

/**
 * Section 08 — Testimonials
 * 3 cards with quote icon, testimonial text, avatar initials, and name/role.
 * No Framer Motion — renders immediately for reliable visibility.
 */
export function Testimonials() {
  return (
    <section
      id="testimonials"
      aria-label="Testimonials"
      className="bg-bg-soft px-6 py-16 md:py-24"
    >
      <div className="mx-auto max-w-site">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-[32px] md:text-[40px] font-bold text-text leading-tight">
            {TESTIMONIALS.headline}
          </h2>
          <p className="mt-4 text-[16px] text-muted">
            {TESTIMONIALS.subline}
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.items.map((item) => (
            <blockquote
              key={item.name}
              className="relative bg-white rounded-lg border border-border shadow-sm p-8 hover:shadow-md transition-shadow duration-200"
            >
              {/* Decorative Quote Mark */}
              <span
                className="absolute top-4 left-6 text-[64px] font-serif text-navy/10 leading-none select-none pointer-events-none"
                aria-hidden="true"
              >
                &ldquo;
              </span>

              {/* Quote Text */}
              <p className="relative text-[16px] text-text italic leading-relaxed pt-8">
                &ldquo;{item.quote}&rdquo;
              </p>

              {/* Author */}
              <footer className="mt-6 pt-4 border-t border-border flex items-center gap-3">
                {/* Initials Avatar */}
                <div className="w-10 h-10 rounded-full bg-navy-tint flex items-center justify-center text-[13px] font-semibold text-navy shrink-0">
                  {item.initials}
                </div>
                <cite className="not-italic">
                  <span className="block text-[14px] font-semibold text-text">{item.name}</span>
                  <span className="block text-[13px] text-muted">{item.role}</span>
                </cite>
              </footer>
            </blockquote>
          ))}
        </div>

        {/* Placeholder Disclaimer */}
        <p className="mt-10 text-center text-[11px] text-muted italic">
          {TESTIMONIALS.disclaimer}
        </p>
      </div>
    </section>
  );
}
