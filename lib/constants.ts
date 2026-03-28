/**
 * Pathly Website — All text constants (REGEL 7)
 * No text is hardcoded in components. Everything lives here.
 */

// ─── Site Meta ───────────────────────────────────────────────
export const SITE = {
  name: "Pathly",
  domain: "path-ly.eu",
  tagline: "Dein Weg. Deine Bewerbung. Deine KI.",
  description:
    "Pathly ist die DSGVO-konforme KI-Plattform, die Lebenslauf, Anschreiben und Profil so aufbereitet, dass Bewerber gesehen werden — EU-gehostet, ohne Datenmissbrauch.",
  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? "https://app.path-ly.eu",
  tallyFormId: process.env.NEXT_PUBLIC_TALLY_FORM_ID ?? "",
} as const;

// ─── Navigation ──────────────────────────────────────────────
export const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "So geht's", href: "#how-it-works" },
  { label: "Über uns", href: "#differentiation" },
] as const;

export const NAV_CTA = "Jetzt starten →" as const;

// ─── Hero Section ────────────────────────────────────────────
export const HERO = {
  headline: "Jeder Mensch verdient es,\ngesehen zu werden.",
  subheadline:
    "Pathly bereitet deinen Lebenslauf, dein Anschreiben und dein Profil so auf, dass Recruiting-KIs dich nicht übersehen können.",
  cta: "Kostenlos starten →",
  ctaSecondary: "Demo ansehen",
  chips: [
    "CV Optimizer",
    "DSGVO-konform",
    "Cover Letter KI",
    "Interview Coaching",
  ],
} as const;

// ─── Trust Ticker ────────────────────────────────────────────
export const TRUST_TICKER = {
  quote:
    "Harvard × Accenture (2021): Millionen qualifizierter Kandidaten werden durch automatisierte Systeme aussortiert — nicht wegen mangelnder Qualifikation.",
  url: "https://www.hbs.edu/managing-the-future-of-work/Documents/research/hiddenworkers09032021.pdf",
  linkLabel: "Studie lesen →",
} as const;

// ─── Problem Section ────────────────────────────────────────
export const PROBLEMS = {
  headline: "Weißt Du, was mit deiner Bewerbung passiert, bevor ein Mensch sie liest?",
  items: [
    {
      id: "01",
      tag: "ATS-Filter",
      headline: "Eine **KI** liest deinen **CV** zuerst. Recruiter nehmen sich im Schnitt **7,4 Sekunden** Zeit.",
      body: "**98%** der Fortune-500-Unternehmen nutzen **Applicant Tracking Systems** (ATS), die CVs nach Keywords ranken, bevor ein Mensch sie sieht. Kommt dein CV durch, scannt ein Recruiter im Schnitt nur 7,4 Sekunden, dabei folgt das Auge dem **F-Pattern**: Jobtitel, aktuelle Stelle, Keywords oben links. Was dort fehlt, wird nie gelesen.",
      source: "Resume Statistics Report, 2026",
      sourceUrl: "https://www.resume-now.com/job-resources/jobs/resume-statistics#:~:text=11.,keyword%20alignment%20before%20submitting%20applications.",
      sourceUrlSecondary: "https://www.bu.edu/com/files/2018/10/TheLadders-EyeTracking-StudyC2.pdf",
      sourceSecondaryLabel: "TheLadders Eye-Tracking Study, 2012 ↗",
    },
    {
      id: "02",
      tag: "Generische Bewerbung",
      headline: "Durch ein **personalisiertes Anschreiben**, steigt die Chance auf ein Interview um **+53%**.",
      body: "Ein **Feldexperiment** mit **7.287** echten **Bewerbungen** zeigt: Maßgeschneiderte Anschreiben führten zu 53% mehr Interview-Einladungen. Generische Copy-Paste-Texte brachten nur +17%. 78% der Recruiter erkennen KI-generierte Standardtexte sofort und werten sie als **Zeichen mangelnder Motivation**.",
      source: "ResumeGo Field Experiment, 2020 (n = 7.287)",
      sourceUrl: "https://www.resumego.net/research/cover-letters/",
    },
    {
      id: "03",
      tag: "Zahlen im CV",
      headline: "**81–92%** aller CVs enthalten keine einzige Zahl.",
      body: "Recruiter und ATS-Systeme bevorzugen messbare Erfolge statt Aufgabenlisten. Wer Metriken einsetzt, z.B. \"Kosten um 23% gesenkt\", hat bis zu **40% bessere Chancen** auf ein Interview. Fast niemand macht es. **34%** der Recruiter nennen fehlende Zahlen explizit als Ablehnungsgrund.",
      source: "Resume Statistics Report, 2026",
      sourceUrl: "https://www.resume-now.com/job-resources/jobs/resume-statistics",
    },
  ],
} as const;

// ─── How It Works ────────────────────────────────────────────
// ─── Features Section (Tab-based) ───────────────────────────
export const FEATURES = {
  headline: "Alles in einem System.",
  subline: "Kein Tab-Switching. Kein manuelles Tracking.",
  tabs: [
    {
      label: "Job Search",
      headline: "Der sichtbarste Kandidat gewinnt.",
      bullets: [
        "Nie wieder 4 Portale, 20 Tabs, kein Überblick.",
        "Andere scrollen LinkedIn. Du hast bereits eine Queue.",
        "Hat dich eine KI aussortiert? Eine KI holt dich zurück.",
      ],
      screen: "/images/screen-02-queue.jpg",
      cards: [
        { src: "/images/feature-js-1.png", alt: "Job Search — Keyword & Filter" },
        { src: "/images/feature-js-2.png", alt: "Job Search — Add Job Modal" },
        { src: "/images/feature-js-3.png", alt: "Job Search — Job Preview" },
      ],
    },
    {
      label: "CV Optimizer",
      headline: "ATS sortiert aus. Pathly sortiert ein.",
      bullets: [
        "Der Unterschied zwischen Absage und Interview: 3 Keywords.",
        "Gleiche Erfahrung. Anderes CV. Mehr Interviews.",
        "7,4 Sekunden Aufmerksamkeit. Dein CV muss sie gewinnen.",
      ],
      screen: "/images/screen-01-goals.jpg",
      cards: [
        { src: "/images/feature-cv-1.png", alt: "CV Optimizer — Match Score & Analyse" },
        { src: "/images/feature-cv-2.png", alt: "CV Optimizer — Review Changes" },
        { src: "/images/feature-cv-3.png", alt: "CV Optimizer — Preview & Template" },
      ],
    },
    {
      label: "Cover Letter",
      headline: "Recruiter erkennen KI-Texte in 3 Sekunden. Unseren nicht.",
      bullets: [
        "Unternehmensanalyse + Zitat = echte Personalisierung.",
        "Fertig in 3 Minuten. Klingt nach 30 Minuten Arbeit.",
        "Schreibstil-Analyse aus deinen eigenen Texten — keine Templates.",
        "Skeptical Hiring Manager prüft jeden Satz bevor du es siehst.",
      ],
      screen: "/images/screen-03-cover.jpg",
      cards: [
        { src: "/images/feature-cl-1.png", alt: "Cover Letter — Hook & Quotes" },
        { src: "/images/feature-cl-2.png", alt: "Cover Letter — Tone & Sprache" },
        { src: "/images/feature-cl-3.png", alt: "Cover Letter — Ergebnis" },
      ],
    },
    {
      label: "Coaching",
      headline: "Alle sind nervös. Du bist vorbereitet.",
      bullets: [
        "Üben ohne Risiko. Performen wenn es zählt.",
        "KI-Gesprächspartner simuliert echte Interviews.",
        "Antwort-Analyse nach jedem Gespräch. Nicht nach der Absage.",
      ],
      screen: "/images/screen-04-coach.jpg",
      cards: [
        { src: "/images/feature-co-1.png", alt: "Coaching — Mock Interview" },
        { src: "/images/feature-co-2.pg.png", alt: "Coaching — Feedback & Gap-Analyse" },
        { src: "/images/feature-co-3.png", alt: "Coaching — Session Report" },
      ],
    },
  ],
} as const;

// ─── Differentiation Section (Comparison Table) ─────────────
export const DIFFERENTIATION = {
  headline: "Warum nicht einfach ChatGPT?",
  subline: "Weil generisch der neue Ablehnungsgrund ist.",
  rows: [
    { feature: "Schreibstil", pathly: "Dein Stil", chatgpt: "Generisch" },
    { feature: "ATS-Optimierung", pathly: "Pro Job", chatgpt: "Manuell" },
    { feature: "Quellencheck", pathly: "Echtzeit", chatgpt: "Veraltet" },
    { feature: "Hiring Manager", pathly: "Kritik", chatgpt: "Keins" },
    { feature: "Datenschutz", pathly: "EU-DSGVO", chatgpt: "US-Server" },
    { feature: "Job-Tracking", pathly: "Pipeline", chatgpt: "Keins" },
  ],
  trustBadges: ["🔒 EU-gehostet", "🛡️ DSGVO-konform", "🇪🇺 NIS2-ready"],
} as const;

// ─── Testimonials ────────────────────────────────────────────
export const TESTIMONIALS = {
  headline: "Was andere sagen.",
  subline: "Echte Erfahrungen — kein Marketing-Text.",
  items: [
    {
      quote:
        "Ich hab morgens aufgemacht, Pathly hat mir direkt 4 passende Stellen rausgesucht. Mittags hatte ich 2 davon angeschrieben — mit einem Anschreiben, das sich anfühlt als hätte ich selbst eine Stunde reingesteckt. Das hat so nicht mal meine alte Stelle gekostet.",
      name: "Bastian",
      age: 31,
      location: "München",
      role: "Wirtschaftsingenieur auf Jobsuche",
      initials: "B",
      src: "/images/Bastian.jpg",
    },
    {
      quote:
        "Der ATS-Scanner hat mein CV auf 34% eingeschätzt. Ich dachte, das Tool spinnt. Dann hab ich die Änderungen übernommen — und plötzlich 3 Rückmeldungen in einer Woche. Davor: Funkstille seit 6 Wochen.",
      name: "Clara",
      age: 27,
      location: "Berlin",
      role: "Marketing Managerin",
      initials: "C",
      src: "/images/Clara_Riedel.jpg",
    },
    {
      quote:
        "Ich bin 52 und dachte ehrlich, KI-Tools sind nichts für mich. Aber Pathly hat mir beim Mock-Interview gezeigt, dass ich auf die Frage nach meiner Schwäche seit Jahren dieselbe falsche Antwort gebe. Ein Programm. Das hat mir das gesagt.",
      name: "Dorothea",
      age: 52,
      location: "Köln",
      role: "Projektleiterin im Maschinenbau",
      initials: "D",
      src: "/images/Dorothea.jpg",
    },
    {
      quote:
        "Ich hab dem Anschreiben-Generator meinen eigenen Schreibstil gegeben — ein altes Motivationsschreiben und zwei E-Mails. Das Ergebnis klang tatsächlich nach mir. Nicht nach 'sehr geehrte Damen und Herren, hiermit bewerbe ich mich'.",
      name: "Elenor",
      age: 29,
      location: "Hamburg",
      role: "UX Researcherin",
      initials: "E",
      src: "/images/Elenor_Becker.jpg",
    },
    {
      quote:
        "3 Monate auf Stellen beworben, die ich auf LinkedIn gesehen habe. Dann zwei Wochen mit Pathly. Der Unterschied war nicht das Glück — es war, dass ich aufgehört hab, irgendwo hineinzupassen, und angefangen hab, gezielt zu suchen.",
      name: "Franziska",
      age: 34,
      location: "Frankfurt",
      role: "Controllerin",
      initials: "F",
      src: "/images/Franziska.jpg",
    },
    {
      quote:
        "Das Coaching hat mich auf eine Frage vorbereitet, die ich im echten Interview tatsächlich bekommen habe — fast wortgleich. Ich hab gelacht. Innerlich. Nach außen: ruhig, strukturiert, vorbereitet.",
      name: "Jack",
      age: 26,
      location: "Stuttgart",
      role: "Software Developer",
      initials: "J",
      src: "/images/Jack.jpg",
    },
    {
      quote:
        "Ich war 14 Jahre im selben Unternehmen. Erste Bewerbung seit 2010. Pathly hat mir gezeigt, dass mein CV zwar erfahren wirkt — aber komplett auf die falsche Zielgruppe ausgerichtet war. In zwei Stunden war das anders.",
      name: "Joachim",
      age: 47,
      location: "Düsseldorf",
      role: "Vertriebsleiter",
      initials: "J",
      src: "/images/Joachim_Rabe.jpg",
    },
  ],
} as const;


// ─── Final CTA ───────────────────────────────────────────────
export const FINAL_CTA = {
  headline: "Hör auf, ins Leere zu bewerben.",
  body: "Pathly ist aktuell in der Beta-Phase. Trage dich jetzt ein und sei einer der Ersten.",
  cta: "Kostenlos zur Warteliste →",
  note: "Kein Spam. Keine Kreditkarte. Jederzeit abmeldbar.",
} as const;

// ─── Footer ──────────────────────────────────────────────────
// F-04 fix: copyright year is rendered at runtime in Footer.tsx
// (module-level new Date() would be frozen at SSG build time)
export const FOOTER = {
  copyrightBase: "Pathly. Alle Rechte vorbehalten.",
  links: [
    { label: "Impressum", href: "/impressum" },
    { label: "Datenschutz", href: "/datenschutz" },
  ],
} as const;

// ─── Phone Carousel Screens ─────────────────────────────────
export const PHONE_SCREENS = [
  { src: "/images/screen-01-goals.jpg", alt: "Today's Goals — Pulse Board und Tagesübersicht" },
  { src: "/images/screen-02-queue.jpg", alt: "Job Search — Pipeline und Steckbrief" },
  { src: "/images/screen-03-cover.jpg", alt: "Cover Letter — KI-generiertes Anschreiben" },
  { src: "/images/screen-04-coach.jpg", alt: "Coaching — Mock-Interview mit KI" },
] as const;

// ─── Stats ───────────────────────────────────────────────────
export const STATS = [
  { value: 74, suffix: "%", label: "der Bewerbungen werden von ATS-Systemen aussortiert" },
  { value: 3, suffix: "x", label: "mehr Vorstellungsgespräche mit optimiertem CV" },
  { value: 12, suffix: "s", label: "durchschnittliche CV-Prüfzeit durch HR" },
] as const;

// ─── Comparison (Before/After) ───────────────────────────────
export const COMPARISON = {
  manualTitle: "Wie ich es bisher gemacht habe",
  pathlyTitle: "Wie ich es jetzt mache",
  steps: [
    {
      id: "01",
      title: "Jobsuche",
      description: "4 Portale, 20 Tabs, Unternehmensanalyse...",
      iconKey: "search",
    },
    {
      id: "02",
      title: "Lebenslauf anpassen",
      description: "ATS-Keywords, Stichpunkte und Zahlen zuordnen.",
      iconKey: "document",
    },
    {
      id: "03",
      title: "Anschreiben generieren",
      description: "KI prompten, Re-Prompten, Output anpassen: nicht generisch klingen.",
      iconKey: "pen",
    },
    {
      id: "04",
      title: "Formatieren",
      description: "Anschreiben in Word formatieren, letzte Änderungen, PDF Export",
      iconKey: "file",
    },
    {
      id: "05",
      title: "Verwaltung",
      description: "E-Mails senden, Follow-Ups, Tracking",
      iconKey: "folder",
    },
    {
      id: "06",
      title: "Nächste Stelle",
      description: "Von vorne beginnen. Jeden Tag.",
      iconKey: "refresh",
    },
    {
      id: "07",
      title: "Warten",
      description: "Keine Antwort, kein Feedback. Kein Grund.",
      iconKey: "calendar",
    },
  ],
  pathlyCard: {
    checks: [
      "Job analysiert",
      "CV auf Stelle optimiert",
      "Anschreiben in deinem Stil",
      "Bewerbung ready in 15min",
    ],
    subtext: "3× mehr Interviews. In der Hälfte der Zeit. Klingt trotzdem wie du.",
    cta: "Probier es jetzt!",
  },
} as const;
