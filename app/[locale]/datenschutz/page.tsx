import { SITE } from "@/lib/constants";

export const metadata = {
  title: "Datenschutzerklärung | Pathly",
  description: "Datenschutzerklärung von Pathly — DSGVO-konform, transparent und verständlich.",
};

export default function DatenschutzPage() {
  return (
    <main className="mx-auto max-w-site px-6 py-16 md:py-24">
      <h1 className="text-h2-mobile lg:text-h2-desktop font-bold text-text mb-2">
        Datenschutzerklärung
      </h1>
      <p className="text-small text-muted mb-10">Stand: April 2026 · Version 2.0</p>

      <div className="prose prose-gray max-w-2xl text-body text-muted space-y-10">

        {/* 1. Verantwortlicher */}
        <section>
          <h2 className="text-h3-desktop font-semibold text-text">
            1. Verantwortlicher
          </h2>
          <p>
            Verantwortlicher im Sinne der DSGVO ist:
          </p>
          <div className="bg-gray-50 rounded-lg p-4 mt-3 text-sm space-y-1 border border-gray-200">
            <p className="font-semibold text-text">Pathly</p>
            <p>Yannik Galetto</p>
            <p>E-Mail: <a href="mailto:contact@path-ly.eu" className="text-navy underline">contact@path-ly.eu</a></p>
            <p>Website: <a href="https://path-ly.eu" className="text-navy underline">path-ly.eu</a></p>
          </div>
        </section>

        {/* 2. Überblick */}
        <section>
          <h2 className="text-h3-desktop font-semibold text-text">
            2. Überblick
          </h2>
          <p>
            Pathly ist eine KI-gestützte Bewerbungsplattform. Diese Datenschutzerklärung gilt für die
            Marketing-Website (<strong>path-ly.eu</strong>) sowie die registrierungspflichtige
            Plattform (<strong>app.path-ly.eu</strong> bzw. <strong>path-ly.eu/dashboard</strong>).
          </p>
          <p className="mt-3">
            Wir nehmen den Schutz Ihrer Daten ernst. Daten werden nur erhoben, soweit es für den
            Betrieb der Plattform erforderlich ist — nach dem Prinzip der Datensparsamkeit (Art. 5
            Abs. 1 lit. c DSGVO).
          </p>
        </section>

        {/* 3. Hosting & Infrastruktur */}
        <section>
          <h2 className="text-h3-desktop font-semibold text-text">
            3. Hosting & Infrastruktur
          </h2>
          <p>
            Diese Website sowie die Plattform werden bei <strong>Vercel Inc.</strong> gehostet.
            Die primären Server befinden sich in der EU (Frankfurt). Vercel verarbeitet technische
            Zugriffsdaten (IP-Adresse, User-Agent, Zeitstempel) in Server-Log-Dateien.
            Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an Betriebssicherheit).
          </p>
          <p className="mt-3">
            Die Datenbank und Authentifizierung laufen auf <strong>Supabase</strong> (AWS eu-central-1,
            Frankfurt). Alle Daten sind AES-256 verschlüsselt gespeichert (at rest) und werden via
            TLS 1.3 übertragen (in transit).
          </p>
        </section>

        {/* 4. Datenerfassung auf der Website */}
        <section>
          <h2 className="text-h3-desktop font-semibold text-text">
            4. Datenerfassung auf der Marketing-Website
          </h2>

          <h3 className="font-semibold text-text mt-4 mb-1">Server-Log-Dateien</h3>
          <p>
            Bei jedem Aufruf werden automatisch technische Daten erfasst (IP-Adresse, Browser,
            Betriebssystem, Referrer, Uhrzeit). Diese dienen ausschließlich dem technischen Betrieb
            und ermöglichen keine Personenidentifikation. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO.
          </p>

          <h3 className="font-semibold text-text mt-4 mb-1">Warteliste (Tally.so)</h3>
          <p>
            Wenn Sie sich für die Warteliste eintragen, wird Ihre E-Mail-Adresse über{" "}
            <strong>Tally.so</strong> (EU-Server, DSGVO-konform) verarbeitet. Zweck: Benachrichtigung
            über den Launch. Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO (Einwilligung).
            Sie können Ihre Einwilligung jederzeit widerrufen via{" "}
            <a href="mailto:contact@path-ly.eu" className="text-navy underline">contact@path-ly.eu</a>.
          </p>

          <h3 className="font-semibold text-text mt-4 mb-1">Cookies & Tracking</h3>
          <p>
            Auf der Marketing-Website werden <strong>keine Tracking-Cookies</strong> gesetzt.
            Es wird kein Google Analytics oder vergleichbares Tracking eingesetzt.
          </p>
        </section>

        {/* 5. Datenverarbeitung in der Plattform */}
        <section>
          <h2 className="text-h3-desktop font-semibold text-text">
            5. Datenverarbeitung in der Plattform (registrierte Nutzer)
          </h2>
          <p>
            Für registrierte Nutzer verarbeiten wir zusätzlich folgende Datenkategorien:
          </p>

          <div className="overflow-x-auto mt-4">
            <table className="w-full text-sm border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left p-3 font-semibold text-text">Datenkategorie</th>
                  <th className="text-left p-3 font-semibold text-text">Beispiele</th>
                  <th className="text-left p-3 font-semibold text-text">Rechtsgrundlage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="p-3 font-medium text-text">Account-Daten</td>
                  <td className="p-3">E-Mail, Passwort (gehasht)</td>
                  <td className="p-3">Art. 6(1)(b) — Vertragserfüllung</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-text">Lebenslauf-Daten</td>
                  <td className="p-3">Berufserfahrung, Ausbildung, Qualifikationen</td>
                  <td className="p-3">Art. 6(1)(a) — Einwilligung</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-text">Besondere Kategorien (Art. 9)</td>
                  <td className="p-3">Foto, Behinderung (optional, im Lebenslauf)</td>
                  <td className="p-3">Art. 9(2)(a) — Ausdrückliche Einwilligung</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-text">Stellendaten</td>
                  <td className="p-3">Jobtitel, Unternehmensname, Beschreibung</td>
                  <td className="p-3">Art. 6(1)(b) — Vertragserfüllung</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-text">Coaching-Daten</td>
                  <td className="p-3">Interview-Antworten, Sprachaufnahmen (transkribiert)</td>
                  <td className="p-3">Art. 6(1)(a) — Einwilligung</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-text">Zahlungsdaten</td>
                  <td className="p-3">Zahlungsmethode, Abrechnungsdetails</td>
                  <td className="p-3">Art. 6(1)(b) — Vertragserfüllung</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-text">Nutzungsanalyse</td>
                  <td className="p-3">Feature-Events (anonymisiert, keine PII)</td>
                  <td className="p-3">Art. 6(1)(f) — Berechtigtes Interesse</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 6. KI-Verarbeitung & EU AI Act */}
        <section>
          <h2 className="text-h3-desktop font-semibold text-text">
            6. KI-Verarbeitung & EU AI Act Transparenz
          </h2>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-3">
            <p className="text-sm font-semibold text-blue-900 mb-1">
              Pflichthinweis nach EU AI Act Art. 50
            </p>
            <p className="text-sm text-blue-800">
              Pathly nutzt KI-Systeme (Claude von Anthropic) zur Erstellung von Anschreiben,
              zur Optimierung von Lebensläufen und zur Durchführung von Coaching-Gesprächen.
              Diese Inhalte sind im Interface als <strong>„KI-generiert"</strong> gekennzeichnet.
            </p>
          </div>

          <ul className="space-y-3 text-sm mt-4">
            <li>
              <strong className="text-text">Kein KI-Training mit Ihren Daten:</strong>{" "}
              Ihre Daten werden nicht zur Verbesserung externer KI-Modelle verwendet. Anthropic
              und OpenAI nutzen API-Anfragen nicht für Training (Zero Data Retention, ZDR).
            </li>
            <li>
              <strong className="text-text">PII-Pseudonymisierung:</strong>{" "}
              Vor jeder KI-Anfrage werden Name, E-Mail, Telefon und Adresse durch Platzhalter ersetzt.
              Nur berufliche Inhalte werden verarbeitet.
            </li>
            <li>
              <strong className="text-text">Mensch behält die Kontrolle:</strong>{" "}
              Alle KI-generierten Inhalte müssen vom Nutzer geprüft und freigegeben werden,
              bevor sie verwendet werden können.
            </li>
            <li>
              <strong className="text-text">Besondere Datenkategorien (Art. 9):</strong>{" "}
              Fotos oder Angaben zu Behinderungen im Lebenslauf werden nur mit Ihrer ausdrücklichen
              Einwilligung an KI-Dienste übertragen. Sie können diese Einwilligung jederzeit
              in den Einstellungen widerrufen — die Daten werden dann automatisch gefiltert.
            </li>
            <li>
              <strong className="text-text">Coaching & Sprachverarbeitung:</strong>{" "}
              Sprachaufnahmen werden via OpenAI Whisper transkribiert und anschließend sofort
              verworfen. Nur der Text wird für die Coaching-Sitzung verwendet.
            </li>
          </ul>
        </section>

        {/* 7. Auftragsverarbeiter */}
        <section>
          <h2 className="text-h3-desktop font-semibold text-text">
            7. Auftragsverarbeiter (Sub-Processors)
          </h2>
          <p className="mb-4">
            Wir setzen folgende Dienstleister ein, mit denen Auftragsverarbeitungsverträge (AVV)
            gemäß Art. 28 DSGVO bestehen:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left p-3 font-semibold text-text">Anbieter</th>
                  <th className="text-left p-3 font-semibold text-text">Zweck</th>
                  <th className="text-left p-3 font-semibold text-text">Standort</th>
                  <th className="text-left p-3 font-semibold text-text">Schutzmaßnahme</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs">
                <tr><td className="p-3 font-medium text-text">Supabase (AWS)</td><td className="p-3">Datenbank, Auth, Speicher</td><td className="p-3">🇩🇪 EU (Frankfurt)</td><td className="p-3">AVV, TLS, AES-256</td></tr>
                <tr><td className="p-3 font-medium text-text">Vercel Inc.</td><td className="p-3">Hosting, CDN</td><td className="p-3">🇩🇪 EU (Frankfurt)</td><td className="p-3">AVV, TLS</td></tr>
                <tr><td className="p-3 font-medium text-text">Anthropic (Claude)</td><td className="p-3">KI-Textgenerierung</td><td className="p-3">🇺🇸 USA</td><td className="p-3">AVV, SCC, ZDR</td></tr>
                <tr><td className="p-3 font-medium text-text">OpenAI (Whisper)</td><td className="p-3">Sprachtranskription</td><td className="p-3">🇺🇸 USA</td><td className="p-3">AVV, SCC, ZDR</td></tr>
                <tr><td className="p-3 font-medium text-text">Microsoft Azure</td><td className="p-3">Dokumentenextraktion (CV)</td><td className="p-3">🇪🇺 EU (West Europe)</td><td className="p-3">AVV, EU-DSGVO</td></tr>
                <tr><td className="p-3 font-medium text-text">Perplexity</td><td className="p-3">Unternehmensrecherche</td><td className="p-3">🇺🇸 USA</td><td className="p-3">AVV, SCC</td></tr>
                <tr><td className="p-3 font-medium text-text">SerpAPI</td><td className="p-3">Jobsuche</td><td className="p-3">🇺🇸 USA</td><td className="p-3">AVV, SCC</td></tr>
                <tr><td className="p-3 font-medium text-text">Stripe</td><td className="p-3">Zahlungsabwicklung</td><td className="p-3">🇮🇪 IE / 🇺🇸 USA</td><td className="p-3">AVV, SCC, PCI DSS</td></tr>
                <tr><td className="p-3 font-medium text-text">PostHog</td><td className="p-3">Produktanalyse (anonym)</td><td className="p-3">🇪🇺 EU</td><td className="p-3">AVV, keine Cookies</td></tr>
                <tr><td className="p-3 font-medium text-text">Sentry</td><td className="p-3">Fehlermonitoring</td><td className="p-3">🇪🇺 EU (Ingest)</td><td className="p-3">AVV, PII-Filterung</td></tr>
                <tr><td className="p-3 font-medium text-text">Upstash</td><td className="p-3">Rate Limiting (Redis)</td><td className="p-3">🇪🇺 EU</td><td className="p-3">AVV, TLS</td></tr>
                <tr><td className="p-3 font-medium text-text">Inngest</td><td className="p-3">Hintergrundprozesse</td><td className="p-3">🇺🇸 USA</td><td className="p-3">AVV, SCC</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs mt-3 text-muted">
            Für Drittlandtransfers (USA) gelten EU-Standardvertragsklauseln (SCC) gemäß Art. 46 Abs. 2 lit. c DSGVO.
            ZDR = Zero Data Retention (keine Nutzung für KI-Training).
          </p>
        </section>

        {/* 8. Speicherdauer */}
        <section>
          <h2 className="text-h3-desktop font-semibold text-text">
            8. Speicherdauer
          </h2>
          <ul className="space-y-2 text-sm">
            <li><strong className="text-text">Account-Daten:</strong> Solange das Konto aktiv ist. Bei Inaktivität &gt; 12 Monate werden Anwendungsdaten automatisch gelöscht (Art. 5 Abs. 1 lit. e DSGVO).</li>
            <li><strong className="text-text">Lebenslauf & Dokumente:</strong> Bis zur Löschung durch den Nutzer oder automatisch nach 12 Monaten Inaktivität.</li>
            <li><strong className="text-text">Coaching-Protokolle:</strong> Sitzung gelöscht nach 180 Tagen; Chat anonymisiert nach 90 Tagen.</li>
            <li><strong className="text-text">Einwilligungsnachweise:</strong> 3 Jahre nach Account-Löschung (Art. 7 DSGVO — Beweissicherung).</li>
            <li><strong className="text-text">Zahlungs-Audittrail:</strong> 10 Jahre gemäß steuerrechtlichen Aufbewahrungspflichten (§ 147 AO).</li>
            <li><strong className="text-text">Server-Logs:</strong> 7 Tage, danach automatisch gelöscht.</li>
          </ul>
        </section>

        {/* 9. Ihre Rechte */}
        <section>
          <h2 className="text-h3-desktop font-semibold text-text">
            9. Ihre Rechte
          </h2>
          <p className="mb-3">
            Sie haben nach DSGVO folgende Rechte, die Sie jederzeit unter{" "}
            <a href="mailto:contact@path-ly.eu" className="text-navy underline">contact@path-ly.eu</a>{" "}
            oder direkt in der Plattform (Dashboard → Einstellungen → Sicherheit) ausüben können:
          </p>
          <ul className="space-y-2 text-sm">
            <li><strong className="text-text">Art. 15 — Auskunft:</strong> Abruf aller gespeicherten Daten (in der Plattform als JSON-Export verfügbar).</li>
            <li><strong className="text-text">Art. 16 — Berichtigung:</strong> Korrektur unrichtiger Daten.</li>
            <li><strong className="text-text">Art. 17 — Löschung:</strong> Selbstständige Account-Löschung direkt in der App (Dashboard → Einstellungen → Sicherheit → Account löschen).</li>
            <li><strong className="text-text">Art. 18 — Einschränkung:</strong> Einschränkung der Verarbeitung auf Anfrage.</li>
            <li><strong className="text-text">Art. 20 — Datenportabilität:</strong> Export Ihrer Daten als maschinenlesbares JSON in der Plattform.</li>
            <li><strong className="text-text">Art. 21 — Widerspruch:</strong> Widerspruch gegen Verarbeitungen auf Basis berechtigter Interessen.</li>
            <li><strong className="text-text">Art. 7 Abs. 3 — Widerruf der Einwilligung:</strong> Jederzeit mit Wirkung für die Zukunft (in den Einstellungen oder per E-Mail).</li>
          </ul>
          <p className="text-sm mt-3">
            Auf Anfragen antworten wir innerhalb von <strong>30 Tagen</strong> (Art. 12 Abs. 3 DSGVO).
          </p>
        </section>

        {/* 10. Aufsichtsbehörde */}
        <section>
          <h2 className="text-h3-desktop font-semibold text-text">
            10. Beschwerderecht bei der Aufsichtsbehörde
          </h2>
          <p className="text-sm">
            Sie haben das Recht, sich bei einer Datenschutzaufsichtsbehörde zu beschweren (Art. 77 DSGVO).
            Zuständige Behörde für Deutschland:{" "}
            <strong>Bayerisches Landesamt für Datenschutzaufsicht (BayLDA)</strong>,{" "}
            <a href="https://www.lda.bayern.de" target="_blank" rel="noopener noreferrer" className="text-navy underline">www.lda.bayern.de</a>.
          </p>
        </section>

        {/* 11. Sicherheit */}
        <section>
          <h2 className="text-h3-desktop font-semibold text-text">
            11. Technische & organisatorische Maßnahmen (TOM)
          </h2>
          <ul className="space-y-2 text-sm">
            <li><strong className="text-text">Verschlüsselung:</strong> AES-256 at rest, TLS 1.3 in transit.</li>
            <li><strong className="text-text">Zugriffskontrolle:</strong> Row Level Security (RLS) — jeder Nutzer sieht ausschließlich seine eigenen Daten.</li>
            <li><strong className="text-text">PII-Pseudonymisierung:</strong> Name, E-Mail, Telefon und Adresse werden vor jeder KI-Anfrage automatisch durch Platzhalter ersetzt.</li>
            <li><strong className="text-text">Rate Limiting:</strong> Alle APIs sind gegen Missbrauch geschützt (Upstash Redis, 14 Endpunkte).</li>
            <li><strong className="text-text">Fehlermonitoring:</strong> Sentry mit PII-Filterung und deaktiviertem Session Replay.</li>
            <li><strong className="text-text">Produktanalyse:</strong> PostHog ausschließlich via localStorage (keine Cookies), alle Eingaben maskiert.</li>
          </ul>
        </section>

        {/* 12. Änderungen */}
        <section>
          <h2 className="text-h3-desktop font-semibold text-text">
            12. Änderungen dieser Datenschutzerklärung
          </h2>
          <p className="text-sm">
            Wir behalten uns vor, diese Datenschutzerklärung bei wesentlichen Änderungen der
            Verarbeitungstätigkeiten zu aktualisieren. Registrierte Nutzer werden über wesentliche
            Änderungen per Banner in der Plattform informiert. Das Datum der letzten Änderung ist
            oben auf dieser Seite angegeben.
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
