import { SITE, IMPRESSUM } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: IMPRESSUM.meta.title,
  robots: { index: false, follow: false },
  alternates: { canonical: `https://${SITE.domain}/impressum` },
};

export default function ImpressumPage() {
  const contactSection = IMPRESSUM.sections.find((s) => s.id === "kontakt");
  const hasTodos = IMPRESSUM.sections.some((s) => s.isTodo);

  return (
    <main className="mx-auto max-w-site px-6 py-16 md:py-24">
      <h1 className="text-[32px] md:text-[40px] font-bold text-text mb-2">
        {IMPRESSUM.heading}
      </h1>
      <p className="text-[14px] text-muted mb-12">{IMPRESSUM.legalBasis}</p>

      <div className="max-w-2xl space-y-12">
        {/* DEV-ONLY TODO Banner */}
        {process.env.NODE_ENV === "development" && hasTodos && (
          <div className="rounded-lg bg-yellow-50 border border-yellow-300 px-4 py-3 text-[13px] text-yellow-800">
            ⚠️ TODO: Adresse und Telefonnummer im Impressum eintragen
            (lib/constants.ts → IMPRESSUM.sections)
          </div>
        )}

        {/* Section: Diensteanbieter */}
        {(() => {
          const s = IMPRESSUM.sections.find((s) => s.id === "diensteanbieter");
          if (!s || !("lines" in s) || !s.lines) return null;
          return (
            <section aria-labelledby={s.id}>
              <h2
                id={s.id}
                className="text-[18px] font-semibold text-text mb-3"
              >
                {s.heading}
              </h2>
              <p className="text-[16px] text-muted leading-relaxed">
                {s.lines.map((line, i) => (
                  <span key={i}>
                    {line}
                    {i < s.lines!.length - 1 && <br />}
                  </span>
                ))}
              </p>
              {s.legalRef && (
                <p className="text-[12px] text-muted/60 mt-1">
                  gem. {s.legalRef}
                </p>
              )}
            </section>
          );
        })()}

        {/* Section: Kontakt */}
        <section aria-labelledby="kontakt">
          <h2
            id="kontakt"
            className="text-[18px] font-semibold text-text mb-3"
          >
            {contactSection?.heading}
          </h2>
          <p className="text-[16px] text-muted leading-relaxed">
            E-Mail:{" "}
            <a
              href={`mailto:contact@${SITE.domain}`}
              className="text-navy hover:underline"
            >
              contact@{SITE.domain}
            </a>
            {"phonePlaceholder" in (contactSection ?? {}) && (
              <>
                <br />
                Telefon: {(contactSection as { phonePlaceholder: string }).phonePlaceholder}
              </>
            )}
          </p>
          {contactSection?.legalRef && (
            <p className="text-[12px] text-muted/60 mt-1">
              gem. {contactSection.legalRef}
            </p>
          )}
        </section>

        {/* Section: Verantwortlich */}
        {(() => {
          const s = IMPRESSUM.sections.find((s) => s.id === "verantwortlich");
          if (!s || !("lines" in s) || !s.lines) return null;
          return (
            <section aria-labelledby={s.id}>
              <h2
                id={s.id}
                className="text-[18px] font-semibold text-text mb-3"
              >
                {s.heading}
              </h2>
              <p className="text-[16px] text-muted leading-relaxed">
                {s.lines.map((line, i) => (
                  <span key={i}>
                    {line}
                    {i < s.lines!.length - 1 && <br />}
                  </span>
                ))}
              </p>
              {s.legalRef && (
                <p className="text-[12px] text-muted/60 mt-1">
                  gem. {s.legalRef}
                </p>
              )}
            </section>
          );
        })()}

        {/* Section: EU-Streitschlichtung */}
        {(() => {
          const s = IMPRESSUM.sections.find(
            (s) => s.id === "streitschlichtung"
          );
          if (!s || !("paragraphs" in s)) return null;
          const sec = s as typeof s & {
            odrLink: string;
            paragraphs: readonly string[];
          };
          return (
            <section aria-labelledby={sec.id}>
              <h2
                id={sec.id}
                className="text-[18px] font-semibold text-text mb-3"
              >
                {sec.heading}
              </h2>
              <p className="text-[16px] text-muted leading-relaxed">
                {sec.paragraphs[0]}{" "}
                <a
                  href={sec.odrLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="EU Online-Streitbeilegungsplattform (öffnet in neuem Tab)"
                  className="text-navy hover:underline break-all"
                >
                  {sec.odrLink}
                </a>
              </p>
              <p className="mt-3 text-[16px] text-muted leading-relaxed">
                {sec.paragraphs[1]}
              </p>
            </section>
          );
        })()}

        {/* Sections: Haftung Inhalte, Haftung Links, Urheberrecht, KI-Hinweis */}
        {IMPRESSUM.sections
          .filter((s) =>
            ["haftung-inhalte", "haftung-links", "urheberrecht", "ki-hinweis"].includes(s.id)
          )
          .map((s) => {
            const sec = s as typeof s & { paragraphs: readonly string[] };
            if (!("paragraphs" in sec)) return null;
            return (
              <section key={sec.id} aria-labelledby={sec.id}>
                <h2
                  id={sec.id}
                  className="text-[18px] font-semibold text-text mb-3"
                >
                  {sec.heading}
                </h2>
                {sec.paragraphs.map((para, i) => (
                  <p
                    key={i}
                    className={`text-[16px] text-muted leading-relaxed ${
                      i > 0 ? "mt-3" : ""
                    }`}
                  >
                    {para}
                  </p>
                ))}
                {sec.legalRef && (
                  <p className="text-[12px] text-muted/60 mt-2">
                    gem. {sec.legalRef}
                  </p>
                )}
              </section>
            );
          })}
      </div>

      {/* Footer Navigation */}
      <div className="mt-16 pt-8 border-t border-border flex flex-wrap gap-6">
        <a
          href={IMPRESSUM.footer.backHref}
          className="text-navy hover:text-navy-hover text-[14px] font-medium transition-colors"
        >
          {IMPRESSUM.footer.backLabel}
        </a>
        <a
          href={IMPRESSUM.footer.datenschutzHref}
          className="text-navy hover:text-navy-hover text-[14px] font-medium transition-colors"
        >
          {IMPRESSUM.footer.datenschutzLabel}
        </a>
      </div>
    </main>
  );
}
