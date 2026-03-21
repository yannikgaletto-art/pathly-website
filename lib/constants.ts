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
  headline: "Jeder verdient es,\ngesehen zu werden.",
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
export const TRUST = {
  quote:
    "»74 % aller Bewerbungen werden von ATS-Systemen aussortiert, bevor ein Mensch sie liest.«",
  source: "Harvard Business Review, 2024",
  badges: [
    "EU-gehostet",
    "DSGVO-konform",
    "Ende-zu-Ende verschlüsselt",
    "Kein Datenverkauf",
  ],
} as const;

// ─── Problem Section ────────────────────────────────────────
export const PROBLEM = {
  sectionLabel: "Das Problem",
  headline: "90 % der Jobsuchenden bewerben sich falsch.",
  items: [
    {
      emoji: "📋",
      title: "Generische Lebensläufe",
      body: "Derselbe CV für jede Stelle — ATS-Systeme sortieren dich sofort aus.",
    },
    {
      emoji: "✍️",
      title: "Leere Anschreiben",
      body: "»Hiermit bewerbe ich mich…« — HR-Manager lesen nicht weiter.",
    },
    {
      emoji: "🕳️",
      title: "Blindes Bewerben",
      body: "Keine Recherche, kein Unternehmensbezug, kein Plan — kein Gespräch.",
    },
  ],
} as const;

// ─── How It Works ────────────────────────────────────────────
export const HOW_IT_WORKS = {
  sectionLabel: "So funktioniert's",
  headline: "Von der Stellenanzeige zum Vorstellungsgespräch.",
  steps: [
    {
      step: "01",
      title: "Job finden",
      body: "Pathly durchsucht Stellenportale und zeigt dir nur relevante Jobs — gefiltert nach deinen Werten und Skills.",
      icon: "search",
    },
    {
      step: "02",
      title: "CV optimieren",
      body: "Dein Lebenslauf wird für jede Stelle individuell optimiert. ATS-Keywords, klare Struktur, 2-Seiten Format.",
      icon: "file",
    },
    {
      step: "03",
      title: "Anschreiben generieren",
      body: "KI-gestützt, aber in deiner Sprache. Mit Unternehmensbezug, persönlichem Stil und ohne Floskeln.",
      icon: "pen",
    },
    {
      step: "04",
      title: "Interview vorbereiten",
      body: "Mock-Interviews mit KI-Coach. Gap-Analyse, PREP-Framework und personalisiertes Feedback.",
      icon: "mic",
    },
  ],
} as const;

// ─── Features Section ───────────────────────────────────────
export const FEATURES = {
  sectionLabel: "Funktionen",
  headline: "Alles, was du für eine erfolgreiche Bewerbung brauchst.",
  items: [
    {
      title: "Job Pipeline",
      body: "Automatisches Scraping, Steckbrief-Preview, Culture-Fit-Scoring — alles in einer Queue.",
      screen: "/images/screen-02-queue.jpg",
    },
    {
      title: "Cover Letter Studio",
      body: "3-stufige Generierung mit Writing-Style-Analyse. Zitate, Hiring-Manager-Kritik, Anti-Fluff-Filter.",
      screen: "/images/screen-03-cover.jpg",
    },
    {
      title: "Interview Coaching",
      body: "3-Runden Mock-Interview mit PREP- und 3-2-1-Framework. Personalisierte Gap-Analyse nach jeder Session.",
      screen: "/images/screen-04-coach.jpg",
    },
    {
      title: "Today's Goals",
      body: "Pulse Board, Pomodoro-Tracking, Drag-and-Drop Tasks — dein tägliches Cockpit für die Jobsuche.",
      screen: "/images/screen-01-goals.jpg",
    },
  ],
} as const;

// ─── Differentiation Section ────────────────────────────────
export const DIFFERENTIATION = {
  sectionLabel: "Warum Pathly",
  headline: "Was uns von anderen unterscheidet.",
  items: [
    {
      title: "Mensch entscheidet — KI assistiert",
      body: "Keine Bewerbung wird ohne deine Freigabe versendet. Du behältst immer die Kontrolle.",
    },
    {
      title: "DSGVO by Design",
      body: "EU-gehostet, PII-verschlüsselt, automatische Datenlöschung. Kein Tracking, kein Datenverkauf.",
    },
    {
      title: "Dein Stil, nicht ChatGPT-Stil",
      body: "Pathly lernt deinen Schreibstil und generiert Anschreiben, die nach dir klingen — nicht nach einer Maschine.",
    },
    {
      title: "Transparent & Fair",
      body: "Du siehst genau, welche KI was generiert hat. Audit Trail für jede Generation. Keine Black Box.",
    },
  ],
} as const;

// ─── Testimonials ────────────────────────────────────────────
export const TESTIMONIALS = {
  sectionLabel: "Erfahrungen",
  headline: "Von Early Adopters, die den Unterschied spüren.",
  items: [
    {
      quote:
        "Pathly hat mir in 2 Wochen 3 Vorstellungsgespräche gebracht. Vorher hatte ich in 3 Monaten kein einziges.",
      name: "Sarah K.",
      role: "Marketing Managerin, München",
    },
    {
      quote:
        "Endlich ein Tool, das mir nicht das Gefühl gibt, meine Daten zu verschenken. EU-gehostet, DSGVO-konform — genau was ich gesucht habe.",
      name: "Lukas M.",
      role: "Software Engineer, Berlin",
    },
    {
      quote:
        "Das Interview-Coaching hat mir gezeigt, wo ich in Gesprächen Schwächen habe. Die Gap-Analyse war ein Augenöffner.",
      name: "Nina R.",
      role: "Product Designerin, Wien",
    },
  ],
} as const;

// ─── Final CTA ───────────────────────────────────────────────
export const FINAL_CTA = {
  headline: "Bereit, gesehen zu werden?",
  subheadline:
    "Trag dich in die Warteliste ein und gehöre zu den Ersten, die Pathly nutzen dürfen.",
  cta: "Jetzt Warteliste beitreten",
  note: "Kostenlos. Keine Kreditkarte. Jederzeit kündbar.",
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
  socials: [
    { label: "LinkedIn", href: "https://linkedin.com/company/pathly", icon: "linkedin" },
  ],
} as const;

// ─── Phone Carousel Screens ─────────────────────────────────
export const PHONE_SCREENS = [
  { src: "/images/screen-01-goals.jpg", alt: "Today's Goals — Pulse Board und Tagesübersicht" },
  { src: "/images/screen-02-queue.jpg", alt: "Job Queue — Pipeline und Steckbrief" },
  { src: "/images/screen-03-cover.jpg", alt: "Cover Letter — KI-generiertes Anschreiben" },
  { src: "/images/screen-04-coach.jpg", alt: "Coaching — Mock-Interview mit KI" },
] as const;

// ─── Stats ───────────────────────────────────────────────────
export const STATS = [
  { value: 74, suffix: "%", label: "der Bewerbungen werden von ATS-Systemen aussortiert" },
  { value: 3, suffix: "x", label: "mehr Vorstellungsgespräche mit optimiertem CV" },
  { value: 12, suffix: "s", label: "durchschnittliche CV-Prüfzeit durch HR" },
] as const;
