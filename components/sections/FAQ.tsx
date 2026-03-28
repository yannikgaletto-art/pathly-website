import { FAQ_DATA } from "@/lib/constants";
import { FAQCarousel } from "@/components/ui/FAQCarousel";

/**
 * Section 09 — FAQ
 * Server Component: renders layout, headline, JSON-LD schema, delegates carousel to client.
 */
export function FAQSection() {
  return (
    <section
      id="faq"
      aria-label="Häufige Fragen"
      className="bg-bg-soft px-0 py-16 md:py-24"
    >
      {/* JSON-LD Schema for Google Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQ_DATA.items.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
              },
            })),
          }),
        }}
      />

      {/* Header: centered layout since subline is removed */}
      <div className="mx-auto max-w-site px-6 mb-10">
        <h2 className="text-[32px] md:text-[40px] font-bold text-text leading-tight">
          Häufige{" "}
          <span className="text-navy">Fragen.</span>
        </h2>
      </div>

      {/* Carousel — Client Component */}
      <FAQCarousel items={FAQ_DATA.items} />
    </section>
  );
}
