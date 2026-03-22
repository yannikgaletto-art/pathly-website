import { HOW_IT_WORKS } from "@/lib/constants";

/**
 * Section 05 — How It Works
 * Vertical timeline with connecting line and numbered circles.
 * No Framer Motion — renders immediately for reliable visibility.
 */
export function HowItWorks() {
  return (
    <section id="how-it-works" aria-label="So funktioniert's" className="bg-bg-soft px-6 py-16 md:py-24">
      <div className="mx-auto max-w-site">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-[32px] md:text-[40px] font-bold text-text leading-tight">
            {HOW_IT_WORKS.headline}
          </h2>
          <p className="mt-4 text-[16px] text-muted">
            {HOW_IT_WORKS.subline}
          </p>
        </div>

        {/* Steps — vertical timeline */}
        <div className="max-w-2xl mx-auto">
          {HOW_IT_WORKS.steps.map((step, i) => (
            <div
              key={step.step}
              className="relative flex gap-6 pb-12 last:pb-0"
            >
              {/* Left: Circle + Connecting Line */}
              <div className="relative flex flex-col items-center">
                {/* Circle */}
                <div className="w-10 h-10 rounded-full bg-navy text-white text-[14px] font-bold flex items-center justify-center shrink-0 z-10">
                  {step.step}
                </div>
                {/* Connecting Line — hidden for last item */}
                {i < HOW_IT_WORKS.steps.length - 1 && (
                  <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[2px] h-[calc(100%-40px)] bg-border" />
                )}
              </div>

              {/* Right: Content */}
              <div className="pt-1.5">
                <h3 className="text-[20px] font-semibold text-text leading-snug">
                  {step.title}
                </h3>
                <p className="mt-2 text-[16px] text-muted leading-[1.7]">
                  {step.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
