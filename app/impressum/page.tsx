import { SITE } from "@/lib/constants";

export default function ImpressumPage() {
  return (
    <main className="mx-auto max-w-site px-6 py-16 md:py-24">
      <h1 className="text-h2-mobile lg:text-h2-desktop font-bold text-text mb-8">
        Impressum
      </h1>

      <div className="prose prose-gray max-w-2xl text-body text-muted space-y-6">
        <section>
          <h2 className="text-h3-desktop font-semibold text-text">Angaben gemäß § 5 TMG</h2>
          {/* TODO: Angaben ersetzen */}
          <p>
            Yannik Galetto<br />
            Pathly<br />
            [Adresse eintragen]<br />
            [PLZ Ort]
          </p>
        </section>

        <section>
          <h2 className="text-h3-desktop font-semibold text-text">Kontakt</h2>
          <p>
            E-Mail: hello@{SITE.domain}
          </p>
        </section>

        <section>
          <h2 className="text-h3-desktop font-semibold text-text">
            Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
          </h2>
          {/* TODO: Angaben ersetzen */}
          <p>
            Yannik Galetto<br />
            [Adresse eintragen]<br />
            [PLZ Ort]
          </p>
        </section>
      </div>

      <div className="mt-16 pt-8 border-t border-border">
        <a href="/" className="text-navy hover:text-navy-hover text-small font-medium transition-colors">
          ← Zurück zur Startseite
        </a>
      </div>
    </main>
  );
}
