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
export const TRUST_TICKER = {
  quote:
    "Harvard × Accenture (2021): Millionen qualifizierter Kandidaten werden durch automatisierte Systeme aussortiert — nicht wegen mangelnder Qualifikation.",
  url: "https://www.hbs.edu/managing-the-future-of-work/Documents/research/hiddenworkers09032021.pdf",
  linkLabel: "Studie lesen →",
} as const;

// ─── Problem Section ────────────────────────────────────────
export const PROBLEMS = {
  headline: "Das Recruiting-System ist strukturell kaputt.",
  subline: "Nicht deine Qualifikation ist das Problem.",
  items: [
    {
      id: "01",
      tag: "ATS-Filter",
      headline: "75% werden aussortiert, bevor ein Mensch deine Bewerbung liest",
      body: "Applicant Tracking Systems (ATS) scannen deinen CV in Sekunden. Ohne die richtigen Keywords bist du raus; egal wie qualifiziert du bist.",
      solution: "Pathly optimiert deinen CV mit ATS-Keywords pro Stelle.",
      source: "Studie: Harvard Business School, 2021",
      sourceUrl: "https://www.hbs.edu/managing-the-future-of-work/Documents/research/hiddenworkers09032021.pdf",
    },
    {
      id: "02",
      tag: "Generische Bewerbung",
      headline: "Gleicher CV und CL für jede Stelle = Rekrutier kennen das Wording von GBT Texten",
      body: "Recruiter erkennen Copy-Paste sofort. Ohne individuellen Bezug zur Stelle hast du keine Chance gegen optimierte Konkurrenz.",
      solution: "Pathly generiert Anschreiben in deinem Stil — pro Job.",
      source: "Studie: Stepstone Recruiting Report, 2023",
      sourceUrl: "https://www.stepstone.de/e-recruiting/hr-report/",
    },
    {
      id: "03",
      tag: "Blindes Bewerben",
      headline: "Keine Recherche, kein Gespräch.",
      body: "Du bewirbst dich ohne zu wissen, was das Unternehmen wirklich sucht. Ohne Kontext klingst du wie alle anderen.",
      solution: "Pathly recherchiert das Unternehmen automatisch für dich.",
      source: "Studie: LinkedIn Talent Trends, 2024",
      sourceUrl: "https://business.linkedin.com/talent-solutions/global-talent-trends",
    },
  ],
} as const;

// ─── How It Works ────────────────────────────────────────────
export const HOW_IT_WORKS = {
  headline: "So funktioniert Pathly.",
  subline: "Vier Schritte. Kein Chaos.",
  steps: [
    {
      step: "01",
      title: "Job finden & einfügen",
      body: "Füge eine Stellenanzeige ein — Pathly extrahiert automatisch alle relevanten Infos und erstellt einen strukturierten Steckbrief.",
    },
    {
      step: "02",
      title: "CV optimieren",
      body: "Dein Lebenslauf wird für jede Stelle individuell optimiert. ATS-Keywords, klare Struktur, professionelles Format.",
    },
    {
      step: "03",
      title: "Anschreiben generieren",
      body: "KI-gestützt, aber in deiner Sprache. Mit Unternehmensbezug, persönlichem Stil und ohne Floskeln.",
    },
    {
      step: "04",
      title: "Interview vorbereiten",
      body: "Mock-Interviews mit KI-Coach. Gap-Analyse, PREP-Framework und personalisiertes Feedback nach jeder Session.",
    },
  ],
} as const;

// ─── Features Section (Tab-based) ───────────────────────────
export const FEATURES = {
  headline: "Alles in einem System.",
  subline: "Kein Tab-Switching. Kein manuelles Tracking.",
  tabs: [
    {
      label: "Job Queue",
      headline: "Deine Bewerbungs-Pipeline auf einen Blick",
      bullets: [
        "Automatisches Job-Matching nach deinem Profil",
        "Status-Tracking für jede Bewerbung",
        "Bis zu 5 aktive Jobs parallel verwalten",
      ],
      screen: "/images/screen-02-queue.jpg",
    },
    {
      label: "CV Optimizer",
      headline: "Dein CV, optimiert für jeden Job einzeln",
      bullets: [
        "ATS-Keyword Alignment pro Stelle",
        "Match-Score Anzeige vor dem Absenden",
        "Originale Formatierung bleibt erhalten",
      ],
      screen: "/images/screen-01-goals.jpg",
    },
    {
      label: "Cover Letter",
      headline: "Anschreiben in deinem Stil — nicht in KI-Sprache",
      bullets: [
        "Schreibstil-Analyse aus deinen eigenen Texten",
        "Skeptical Hiring Manager Critique eingebaut",
        "Fertig in unter 3 Minuten",
      ],
      screen: "/images/screen-03-cover.jpg",
    },
    {
      label: "Coaching",
      headline: "Interview-Training, das dich wirklich vorbereitet",
      bullets: [
        "KI-Gesprächspartner simuliert echte Interviews",
        "Analyse deiner Antworten nach dem Gespräch",
        "Basiert auf der echten Stellenbeschreibung",
      ],
      screen: "/images/screen-04-coach.jpg",
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
        "Ich habe mich 3 Monate lang beworben und kaum Antworten bekommen. Mit Pathly hatte ich in 2 Wochen zwei Interviews.",
      name: "Sarah K.",
      role: "Product Managerin",
      initials: "SK",
    },
    {
      quote:
        "Das Anschreiben klingt tatsächlich wie ich. Nicht wie ein Roboter. Das ist der Unterschied.",
      name: "Marcus T.",
      role: "UX Designer",
      initials: "MT",
    },
    {
      quote:
        "Endlich weiß ich welche Jobs wirklich zu mir passen — und nicht nur welche zufällig auf LinkedIn auftauchen.",
      name: "Lena R.",
      role: "Data Analyst",
      initials: "LR",
    },
  ],
  disclaimer: "* Platzhalter bis Beta-Testimonials verfügbar",
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
