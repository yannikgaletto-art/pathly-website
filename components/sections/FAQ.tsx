"use client";

import { useTranslations } from "next-intl";
import { FAQ_DATA } from "@/lib/constants";
import { FAQCarousel } from "@/components/ui/FAQCarousel";

const FAQ_IDS = ["01", "02", "03", "04", "05", "06", "07"] as const;

/**
 * Section 09 — FAQ
 * Headline + JSON-LD schema + horizontal carousel.
 */
export function FAQSection() {
  const t = useTranslations("faq");

  // Build translated items for carousel
  const translatedItems = FAQ_IDS.map((id) => ({
    id,
    tag: t(`items.${id}.tag`),
    question: t(`items.${id}.question`),
    answer: t(`items.${id}.answer`),
  }));

  return (
    <section
      id="faq"
      aria-label="FAQ"
      className="bg-bg-soft px-0 py-16 md:py-24"
    >
      {/* JSON-LD Schema for Google Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: translatedItems.map((item) => ({
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

      {/* Header */}
      <div className="mx-auto max-w-site px-6 mb-10">
        <h2 className="text-[32px] md:text-[40px] font-bold text-text leading-tight">
          {t("headline")}
        </h2>
      </div>

      {/* Carousel — Client Component */}
      <FAQCarousel items={translatedItems} />
    </section>
  );
}
