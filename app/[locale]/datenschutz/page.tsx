'use client';

import { useState } from 'react';
import { SITE } from "@/lib/constants";

const SUBPROCESSORS = [
  { name: 'Supabase (AWS)', purpose: 'Datenbank, Authentifizierung, Dateispeicher', location: '🇩🇪 EU (Frankfurt)', safeguard: 'AVV, TLS, AES-256' },
  { name: 'Vercel Inc.', purpose: 'Hosting, CDN', location: '🇩🇪 EU (Frankfurt)', safeguard: 'AVV, TLS' },
  { name: 'Anthropic (Claude)', purpose: 'KI-Textgenerierung (Anschreiben, Coaching, Optimierung)', location: '🇺🇸 USA', safeguard: 'AVV, EU-SCC, Zero Data Retention' },
  { name: 'OpenAI (Whisper)', purpose: 'Sprachtranskription (Coaching Audio)', location: '🇺🇸 USA', safeguard: 'AVV, EU-SCC, Zero Data Retention' },
  { name: 'Microsoft Azure', purpose: 'Dokumentenextraktion (Lebenslauf-Parsing)', location: '🇪🇺 EU (West Europe)', safeguard: 'AVV, EU-DSGVO' },
  { name: 'Perplexity', purpose: 'KI-gestützte Unternehmensrecherche', location: '🇺🇸 USA', safeguard: 'AVV, EU-SCC' },
  { name: 'SerpAPI', purpose: 'Stellensuche', location: '🇺🇸 USA', safeguard: 'AVV, EU-SCC' },
  { name: 'Stripe', purpose: 'Zahlungsabwicklung', location: '🇮🇪 IE / 🇺🇸 USA', safeguard: 'AVV, EU-SCC, PCI DSS' },
  { name: 'PostHog', purpose: 'Anonymisierte Produktanalyse', location: '🇪🇺 EU', safeguard: 'AVV, keine Cookies' },
  { name: 'Sentry', purpose: 'Fehlerüberwachung', location: '🇪🇺 EU (Ingest)', safeguard: 'AVV, PII-Filterung' },
  { name: 'Upstash', purpose: 'Rate Limiting (Redis)', location: '🇪🇺 EU', safeguard: 'AVV, TLS' },
  { name: 'Inngest', purpose: 'Asynchrone Hintergrundprozesse', location: '🇺🇸 USA', safeguard: 'AVV, EU-SCC' },
];

function SubprocessorAccordion() {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between px-5 py-4 text-left text-text font-medium hover:bg-bg-soft transition-colors"
        aria-expanded={open}
      >
        <span>Vollständige Liste der Auftragsverarbeiter anzeigen</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`w-4 h-4 text-muted flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <div className="border-t border-border divide-y divide-border">
          {SUBPROCESSORS.map((sp) => (
            <div key={sp.name} className="px-5 py-3 grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] gap-1 md:gap-4">
              <p className="font-medium text-text text-small">{sp.name}</p>
              <p className="text-muted text-small">{sp.purpose}</p>
              <p className="text-muted text-small">{sp.location} · {sp.safeguard}</p>
            </div>
          ))}
          <div className="px-5 py-3 bg-bg-soft">
            <p className="text-small text-muted">
              Für Drittlandtransfers (USA) gelten EU-Standardvertragsklauseln (SCC) nach Art. 46 Abs. 2 lit. c DSGVO.
              Zero Data Retention = Ihre Daten werden nicht für KI-Training genutzt.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function DatenschutzPage() {
  return (
    <main className="mx-auto max-w-site px-6 py-16 md:py-24">
      <h1 className="text-h2-mobile lg:text-h2-desktop font-bold text-text mb-2">
        Datenschutzerklärung
      </h1>
      <p className="text-small text-muted mb-12">Stand: April 2026 · Version 2.0</p>

      <div className="max-w-2xl space-y-12">

        {/* 1. Verantwortlicher */}
        <section>
          <h2 className="text-h3-mobile lg:text-h3-desktop font-semibold text-text mb-4">
            1. Verantwortlicher
          </h2>
          <p className="text-small text-muted mb-3">
            Verantwortlicher im Sinne der DSGVO ist:
          </p>
          <div className="bg-bg-soft rounded-lg p-4 border border-border space-y-1">
            <p className="text-small font-semibold text-text">Pathly</p>
            <p className="text-small text-muted">Yannik Galetto</p>
            <p className="text-small text-muted">
              E-Mail:{' '}
              <a href="mailto:contact@path-ly.eu" className="text-navy underline">
                contact@{SITE.domain}
              </a>
            </p>
          </div>
        </section>

        {/* 2. Überblick */}
        <section>
          <h2 className="text-h3-mobile lg:text-h3-desktop font-semibold text-text mb-4">
            2. Überblick
          </h2>
          <p className="text-small text-muted mb-3">
            Pathly ist eine KI-gestützte Bewerbungsplattform. Diese Datenschutzerklärung gilt für
            die Marketing-Website (<strong className="text-text">path-ly.eu</strong>) sowie die
            registrierungspflichtige Plattform (Dashboard).
          </p>
          <p className="text-small text-muted">
            Daten werden nur erhoben, soweit es für den Betrieb erforderlich ist — nach dem Prinzip
            der Datensparsamkeit (Art. 5 Abs. 1 lit. c DSGVO).
          </p>
        </section>

        {/* 3. Hosting */}
        <section>
          <h2 className="text-h3-mobile lg:text-h3-desktop font-semibold text-text mb-4">
            3. Hosting & Infrastruktur
          </h2>
          <p className="text-small text-muted mb-3">
            Website und Plattform werden bei <strong className="text-text">Vercel Inc.</strong> gehostet.
            Primäre Server: EU (Frankfurt). Vercel verarbeitet technische Zugriffsdaten
            (IP-Adresse, User-Agent, Zeitstempel). Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO.
          </p>
          <p className="text-small text-muted">
            Datenbank und Authentifizierung laufen auf{' '}
            <strong className="text-text">Supabase</strong> (AWS eu-central-1, Frankfurt).
            Alle Daten sind AES-256 verschlüsselt (at rest) und via TLS 1.3 gesichert (in transit).
          </p>
        </section>

        {/* 4. Website-Datenerfassung */}
        <section>
          <h2 className="text-h3-mobile lg:text-h3-desktop font-semibold text-text mb-4">
            4. Datenerfassung auf der Website
          </h2>

          <div className="space-y-4">
            <div>
              <p className="text-small font-semibold text-text mb-1">Server-Log-Dateien</p>
              <p className="text-small text-muted">
                Bei jedem Aufruf werden technische Daten erfasst (IP-Adresse, Browser, Betriebssystem,
                Referrer, Uhrzeit). Diese dienen ausschließlich dem Betrieb und ermöglichen keine
                Personenidentifikation. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO.
              </p>
            </div>

            <div>
              <p className="text-small font-semibold text-text mb-1">Warteliste (Tally.so)</p>
              <p className="text-small text-muted">
                Bei Eintragung in die Warteliste wird Ihre E-Mail-Adresse über Tally.so
                (EU-Server, DSGVO-konform) verarbeitet. Zweck: Launch-Benachrichtigung.
                Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO (Einwilligung). Widerruf jederzeit
                unter{' '}
                <a href="mailto:contact@path-ly.eu" className="text-navy underline">
                  contact@{SITE.domain}
                </a>.
              </p>
            </div>

            <div>
              <p className="text-small font-semibold text-text mb-1">Cookies & Tracking</p>
              <p className="text-small text-muted">
                Auf der Marketing-Website werden keine Tracking-Cookies gesetzt.
                Kein Google Analytics oder vergleichbares Tracking.
              </p>
            </div>
          </div>
        </section>

        {/* 5. Plattform-Verarbeitung */}
        <section>
          <h2 className="text-h3-mobile lg:text-h3-desktop font-semibold text-text mb-4">
            5. Datenverarbeitung in der Plattform
          </h2>
          <p className="text-small text-muted mb-4">
            Für registrierte Nutzer werden folgende Datenkategorien verarbeitet:
          </p>

          <div className="space-y-3">
            {[
              { cat: 'Account-Daten', ex: 'E-Mail, Passwort (gehasht)', basis: 'Art. 6(1)(b) — Vertragserfüllung' },
              { cat: 'Lebenslauf-Inhalte', ex: 'Berufserfahrung, Ausbildung, Qualifikationen', basis: 'Art. 6(1)(a) — Einwilligung' },
              { cat: 'Besondere Kategorien (Art. 9)', ex: 'Foto, Behinderung — nur mit ausdrücklicher Einwilligung', basis: 'Art. 9(2)(a) — Ausdrückliche Einwilligung' },
              { cat: 'Stellendaten', ex: 'Jobtitel, Unternehmen, Beschreibung', basis: 'Art. 6(1)(b) — Vertragserfüllung' },
              { cat: 'Coaching-Daten', ex: 'Interview-Nachrichten, Sprachaufnahmen (transkribiert)', basis: 'Art. 6(1)(a) — Einwilligung' },
              { cat: 'Zahlungsdaten', ex: 'Zahlungsmethode, Abrechnungsdetails', basis: 'Art. 6(1)(b) — Vertragserfüllung' },
              { cat: 'Nutzungsanalyse', ex: 'Feature-Events, anonymisiert, keine PII', basis: 'Art. 6(1)(f) — Berechtigtes Interesse' },
            ].map((row) => (
              <div key={row.cat} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 border-b border-border pb-3 last:border-none last:pb-0">
                <span className="text-small font-medium text-text min-w-[160px]">{row.cat}</span>
                <span className="text-small text-muted flex-1">{row.ex}</span>
                <span className="text-small text-muted opacity-75 whitespace-nowrap">{row.basis}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 6. KI-Transparenz */}
        <section>
          <h2 className="text-h3-mobile lg:text-h3-desktop font-semibold text-text mb-4">
            6. KI-Verarbeitung & Transparenz
          </h2>

          <div className="bg-navy/5 border border-navy/20 rounded-lg p-4 mb-4">
            <p className="text-small font-semibold text-navy mb-1">Pflichthinweis nach EU AI Act Art. 50</p>
            <p className="text-small text-text/80">
              Pathly nutzt KI-Systeme zur Erstellung von Anschreiben, zur Lebenslauf-Optimierung
              und für Coaching-Gespräche. Diese Inhalte sind im Interface als{' '}
              <strong>„KI-generiert"</strong> gekennzeichnet.
            </p>
          </div>

          <div className="space-y-3">
            {[
              { label: 'Kein KI-Training mit Ihren Daten', text: 'Ihre Inhalte werden nicht zur Verbesserung externer KI-Modelle genutzt. Alle KI-Anbieter haben Zero Data Retention (ZDR) vertraglich zugesichert.' },
              { label: 'PII-Pseudonymisierung', text: 'Vor jeder KI-Anfrage werden Name, E-Mail, Telefon und Adresse durch Platzhalter ersetzt. Nur berufliche Inhalte werden übertragen.' },
              { label: 'Mensch entscheidet', text: 'Alle KI-generierten Inhalte müssen aktiv vom Nutzer geprüft und freigegeben werden.' },
              { label: 'Besondere Datenkategorien', text: 'Fotos oder Angaben zu Behinderungen werden nur mit ausdrücklicher Einwilligung an KI-Dienste übertragen. Widerruf jederzeit in den Einstellungen.' },
              { label: 'Sprachaufnahmen', text: 'Coaching-Audio wird via Whisper transkribiert und sofort verworfen. Nur der Text verbleibt für die Sitzung.' },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-small font-semibold text-text mb-0.5">{item.label}</p>
                <p className="text-small text-muted">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Auftragsverarbeiter — Accordion */}
        <section>
          <h2 className="text-h3-mobile lg:text-h3-desktop font-semibold text-text mb-2">
            7. Auftragsverarbeiter
          </h2>
          <p className="text-small text-muted mb-4">
            Wir setzen technische Dienstleister ein, mit denen Auftragsverarbeitungsverträge (AVV)
            nach Art. 28 DSGVO bestehen. Die vollständige Liste ist auf Anfrage einsehbar:
          </p>
          <SubprocessorAccordion />
        </section>

        {/* 8. Speicherdauer */}
        <section>
          <h2 className="text-h3-mobile lg:text-h3-desktop font-semibold text-text mb-4">
            8. Speicherdauer
          </h2>
          <div className="space-y-3">
            {[
              { label: 'Account-Daten', text: 'Solange das Konto aktiv ist. Bei Inaktivität > 12 Monate werden Anwendungsdaten automatisch gelöscht (Art. 5 Abs. 1 lit. e DSGVO).' },
              { label: 'Dokumente & Lebenslauf', text: 'Bis zur Nutzer-Löschung oder automatisch nach 12 Monaten Inaktivität.' },
              { label: 'Coaching-Protokolle', text: 'Chat anonymisiert nach 90 Tagen, Sitzung gelöscht nach 180 Tagen.' },
              { label: 'Einwilligungsnachweise', text: '3 Jahre nach Account-Löschung (Art. 7 DSGVO — Beweissicherung).' },
              { label: 'Zahlungs-Audittrail', text: '10 Jahre nach handels- und steuerrechtlichen Vorgaben (§ 147 AO).' },
              { label: 'Server-Logs', text: '7 Tage, danach automatisch gelöscht.' },
            ].map((item) => (
              <div key={item.label} className="border-b border-border pb-3 last:border-none last:pb-0">
                <p className="text-small font-semibold text-text mb-0.5">{item.label}</p>
                <p className="text-small text-muted">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 9. Ihre Rechte */}
        <section>
          <h2 className="text-h3-mobile lg:text-h3-desktop font-semibold text-text mb-4">
            9. Ihre Rechte
          </h2>
          <p className="text-small text-muted mb-4">
            Sie können Ihre Rechte jederzeit unter{' '}
            <a href="mailto:contact@path-ly.eu" className="text-navy underline">
              contact@{SITE.domain}
            </a>{' '}
            oder direkt in der Plattform (Dashboard → Einstellungen → Sicherheit) ausüben:
          </p>
          <div className="space-y-3">
            {[
              { art: 'Art. 15', label: 'Auskunft', text: 'Abruf aller gespeicherten Daten — als JSON-Export direkt in der App verfügbar.' },
              { art: 'Art. 16', label: 'Berichtigung', text: 'Korrektur unrichtiger Daten.' },
              { art: 'Art. 17', label: 'Löschung', text: 'Selbstständige Account-Löschung in der App (Dashboard → Einstellungen → Sicherheit).' },
              { art: 'Art. 18', label: 'Einschränkung', text: 'Einschränkung der Verarbeitung auf Anfrage.' },
              { art: 'Art. 20', label: 'Datenportabilität', text: 'Export Ihrer Daten als maschinenlesbares JSON direkt in der Plattform.' },
              { art: 'Art. 21', label: 'Widerspruch', text: 'Widerspruch gegen Verarbeitungen auf Basis berechtigter Interessen.' },
              { art: 'Art. 7(3)', label: 'Widerruf', text: 'Widerruf Ihrer Einwilligung jederzeit mit Wirkung für die Zukunft.' },
            ].map((item) => (
              <div key={item.art} className="flex gap-3 border-b border-border pb-3 last:border-none last:pb-0">
                <span className="text-small text-muted font-mono min-w-[56px]">{item.art}</span>
                <div>
                  <p className="text-small font-semibold text-text mb-0.5">{item.label}</p>
                  <p className="text-small text-muted">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-small text-muted mt-4">
            Auf Anfragen antworten wir innerhalb von <strong className="text-text">30 Tagen</strong>{' '}
            (Art. 12 Abs. 3 DSGVO).
          </p>
        </section>

        {/* 10. Aufsichtsbehörde */}
        <section>
          <h2 className="text-h3-mobile lg:text-h3-desktop font-semibold text-text mb-4">
            10. Beschwerderecht
          </h2>
          <p className="text-small text-muted">
            Sie haben das Recht, sich bei einer Datenschutzaufsichtsbehörde zu beschweren
            (Art. 77 DSGVO). Zuständig:{' '}
            <strong className="text-text">Bayerisches Landesamt für Datenschutzaufsicht (BayLDA)</strong>,{' '}
            <a
              href="https://www.lda.bayern.de"
              target="_blank"
              rel="noopener noreferrer"
              className="text-navy underline"
            >
              www.lda.bayern.de
            </a>.
          </p>
        </section>

        {/* 11. Sicherheit */}
        <section>
          <h2 className="text-h3-mobile lg:text-h3-desktop font-semibold text-text mb-4">
            11. Sicherheitsmaßnahmen (TOM)
          </h2>
          <div className="space-y-3">
            {[
              { label: 'Verschlüsselung', text: 'AES-256 (gespeicherte Daten), TLS 1.3 (Übertragung).' },
              { label: 'Zugriffskontrolle', text: 'Row Level Security — jeder Nutzer sieht ausschließlich seine eigenen Daten.' },
              { label: 'PII-Filter', text: 'Automatische Pseudonymisierung von Name, E-Mail, Telefon und Adresse vor jeder KI-Anfrage.' },
              { label: 'Rate Limiting', text: 'Alle APIs sind gegen Missbrauch geschützt (14 Endpunkte via Upstash Redis).' },
              { label: 'Fehlermonitoring', text: 'Sentry mit PII-Filterung, Session Replay deaktiviert.' },
              { label: 'Produktanalyse', text: 'PostHog via localStorage (keine Cookies), alle Eingaben maskiert.' },
            ].map((item) => (
              <div key={item.label} className="border-b border-border pb-3 last:border-none last:pb-0">
                <p className="text-small font-semibold text-text mb-0.5">{item.label}</p>
                <p className="text-small text-muted">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 12. Änderungen */}
        <section>
          <h2 className="text-h3-mobile lg:text-h3-desktop font-semibold text-text mb-4">
            12. Änderungen
          </h2>
          <p className="text-small text-muted">
            Bei wesentlichen Änderungen der Verarbeitungstätigkeiten aktualisieren wir diese
            Erklärung und informieren registrierte Nutzer per Banner in der Plattform. Das Datum
            der letzten Änderung ist oben angegeben.
          </p>
        </section>

      </div>

      <div className="mt-16 pt-8 border-t border-border max-w-2xl">
        <a href="/" className="text-navy hover:text-navy-hover text-small font-medium transition-colors">
          ← Zurück zur Startseite
        </a>
      </div>
    </main>
  );
}
