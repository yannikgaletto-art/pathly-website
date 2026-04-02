import { SITE } from "@/lib/constants";

export default function DatenschutzPage() {
  return (
    <main className="mx-auto max-w-site px-6 py-16 md:py-24">
      <h1 className="text-h2-mobile lg:text-h2-desktop font-bold text-text mb-8">
        Datenschutzerklärung
      </h1>

      <div className="prose prose-gray max-w-2xl text-body text-muted space-y-8">
        <section>
          <h2 className="text-h3-desktop font-semibold text-text">
            1. Datenschutz auf einen Blick
          </h2>
          <p>
            Die folgenden Hinweise geben einen Überblick darüber, was mit Ihren
            personenbezogenen Daten passiert, wenn Sie diese Website besuchen.
          </p>
          <p>
            <strong>Wer ist verantwortlich?</strong><br />
            Verantwortlich für die Datenverarbeitung auf dieser Website ist
            Yannik Galetto (Kontakt: hello@{SITE.domain}).
          </p>
        </section>

        <section>
          <h2 className="text-h3-desktop font-semibold text-text">
            2. Hosting
          </h2>
          <p>
            Diese Website wird bei Vercel Inc. gehostet. Die Server befinden sich
            in der EU (Frankfurt). Es werden keine Cookies gesetzt und kein
            Tracking durchgeführt.
          </p>
        </section>

        <section>
          <h2 className="text-h3-desktop font-semibold text-text">
            3. Allgemeine Hinweise und Pflichtinformationen
          </h2>
          <p>
            Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen
            Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten
            vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften
            sowie dieser Datenschutzerklärung.
          </p>
        </section>

        <section>
          <h2 className="text-h3-desktop font-semibold text-text">
            4. Datenerfassung auf dieser Website
          </h2>
          <p>
            <strong>Server-Log-Dateien:</strong> Der Provider der Seiten erhebt
            und speichert automatisch Informationen in Server-Log-Dateien.
            Diese Daten sind nicht bestimmten Personen zuordenbar.
          </p>
          <p>
            <strong>Warteliste (Tally.so):</strong> Wenn Sie sich für die
            Warteliste eintragen, werden Ihre Daten über Tally.so (EU-Server,
            DSGVO-konform) verarbeitet. Wir erheben nur Ihre E-Mail-Adresse
            zum Zweck der Benachrichtigung über den Launch.
          </p>
        </section>

        <section>
          <h2 className="text-h3-desktop font-semibold text-text">
            5. Ihre Rechte
          </h2>
          <p>
            Sie haben jederzeit das Recht auf Auskunft, Berichtigung, Löschung,
            Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch.
            Kontaktieren Sie uns unter hello@{SITE.domain}.
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
