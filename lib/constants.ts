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
  // Chrome Web Store listing URL — set NEXT_PUBLIC_EXTENSION_URL once published.
  // Falls back to #waitlist scroll so the button isn't broken before the Store listing exists.
  extensionUrl: process.env.NEXT_PUBLIC_EXTENSION_URL ?? "#waitlist",
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
  headline: "Wir glauben, dass jeder es verdient, gesehen zu werden.",
  brandWords: ["Pathly", "Simplify", "your", "Path."],
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
        { src: "/images/feature-js-1.png", alt: "Job Search — Keyword & Filter", objectPosition: "center 60%" },
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
        { src: "/images/CV_Analyse_1.png", alt: "CV Optimizer — Match Score & Analyse" },
        { src: "/images/CV_1.png", alt: "CV Optimizer — Review Changes" },
        { src: "/images/CV_2.png", alt: "CV Optimizer — Preview & Template" },
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
        { src: "/images/feature-cl-1.png", alt: "Cover Letter — Hook & Quotes", objectPosition: "center 55%" },
        { src: "/images/Cover_Letter_1.png", alt: "Cover Letter — Tone & Sprache" },
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
        { src: "/images/feature-co-1.png", alt: "Coaching — Mock Interview", objectPosition: "center 55%" },
        { src: "/images/feature-co-2.pg.png", alt: "Coaching — Feedback & Gap-Analyse" },
        { src: "/images/feature-co-3.png", alt: "Coaching — Session Report" },
      ],
    },
  ],
} as const;

// ─── Differentiation Section (Comparison Table) ─────────────
export const DIFFERENTIATION = {
  headline: "Was Pathly kann. Was andere nicht.",
  subline: "Kein generischer Output. Kein US-Server. Kein Alleingang.",
  leftTitle: "Pathly",
  rightTitle: "Andere KI-Tools",
  rows: [
    { feature: "Schreibstil",       pathly: "Dein Stil",                   others: "Generischer Output"        },
    { feature: "ATS-Optimierung",   pathly: "Pro Job individuell",         others: "Manuell nacharbeiten"      },
    { feature: "Datenschutz",       pathly: "EU-gehostet & DSGVO",         others: "US-Server, keine Garantie" },
    { feature: "Job-Tracking",      pathly: "Pipeline & Workflow",         others: "Kein Tracking"             },
    { feature: "Coaching",          pathly: "KI-Interview-Coaching",       others: "Kein Coaching"             },
    { feature: "Video Pitch",       pathly: "Video Letter / Pitch",        others: "Nicht vorhanden"           },
    { feature: "Pomodoro Workflow", pathly: "Integrierter Fokus-Timer",    others: "Kein Produktivitäts-Tool"  },
    { feature: "Ehrenamt & Gaps",   pathly: "Lücken intelligent erklären", others: "Keine Gap-Unterstützung"   },
    { feature: "Community",         pathly: "Pathly Community & Support",  others: "Alleine"                   },
  ],
  trustBadges: ["🔒 EU-gehostet", "🛡️ DSGVO-konform", "🇪🇺 NIS2-ready"],
} as const;

// ─── Testimonials ────────────────────────────────────────────
export const TESTIMONIALS = {
  headline: "Was unsere Beta-Tester sagen.",
  subline: "",
  items: [
    {
      quote:
        "Mit 57 fängst du nicht gerne nochmal bei null an. Ich hatte befürchtet, dass meine Erfahrungen auf dem Papier alt aussehen. Und genau das war das Problem. Pathly hat das in Worte gefasst, die ich selbst nicht gefunden hätte. Klang ganz nach mir.",
      name: "Joachim",
      age: 57,
      location: "Düsseldorf",
      role: "Vertriebsleiter",
      initials: "J",
      src: "/images/Joachim_Rabe.jpg",
    },
    {
      quote:
        "Jeder will drei Jahre Erfahrung. Ich hab ein Jahr. Pathly hat mir klargemacht, dass ich die falschen Dinge in den Vordergrund gestellt hab. Das klingt trivial, hat mich aber zum Job-Interview gebracht.",
      name: "Clara",
      age: 27,
      location: "Berlin",
      role: "Marketing Managerin",
      initials: "C",
      src: "/images/Clara_Riedel.jpg",
    },
    {
      quote:
        "Ich bin kein Fan von KI-Texten die nach KI klingen. Das Anschreiben das Pathly rausgebracht hat klang nach mir. Keine Ahnung wie, aber es hat gepasst. Zweimal abgeschickt, zweimal Rückmeldung.",
      name: "Bastian",
      age: 31,
      location: "München",
      role: "Wirtschaftsingenieur auf Jobsuche",
      initials: "B",
      src: "/images/Bastian.jpg",
    },
    {
      quote:
        "Ich vor der Kamera, unvorbereitet. Ich hätte das nie gemacht. Pathly hat mich durch den Video Letter geführt, fast wie ein Coaching. Ich wusste danach was ich sagen will und warum. Die Recruiterin hat mir geschrieben, dass ich sie als einzige wirklich überrascht hätte.",
      name: "Dorothea",
      age: 34,
      location: "Köln",
      role: "Projektleiterin im Maschinenbau",
      initials: "D",
      src: "/images/Dorothea.jpg",
    },
    {
      quote:
        "Ich teste Produkte auf Usability. Pathly hat meinen eigenen Schreibstil besser gelesen als ich. Kein 'sehr geehrte Damen und Herren'. Kein generisches Nichts. Einfach ich. Das hat mich eine Weile beschäftigt.",
      name: "Elenor",
      age: 37,
      location: "Hamburg",
      role: "UX Researcherin",
      initials: "E",
      src: "/images/Elenor_Becker.jpg",
    },
    {
      quote:
        "Ich hab mal ausgerechnet wie viel Zeit ich pro Bewerbung investiere. 1½ Stunden im Schnitt für meinen eigenen Anspruch. Bei zwanzig Stellen wäre das fast eine Arbeitswoche. Mit Pathly war das ein Nachmittag und die Qualität war nicht schlechter.",
      name: "Jack",
      age: 36,
      location: "Stuttgart",
      role: "Analyst",
      initials: "J",
      src: "/images/Jack.jpg",
    },
    {
      quote:
        "Nach zehn Jahren selbstständig weiß ich wie ich mich verkaufe. Dachte ich. Der kritische Blick von Pathly hat mir gesagt, dass mein Anschreiben nach jemandem klingt der lieber alleine arbeitet. Das war nicht die Botschaft die ich wollte. Und ich hab es selbst nicht gesehen.",
      name: "Laura",
      age: 52,
      location: "Hamburg",
      role: "HR",
      initials: "L",
      src: "/images/Laura.png",
    },
    {
      quote:
        "3 Monate auf Stellen beworben, die ich auf LinkedIn gesehen habe mit 'Easy Apply'. Von den ca. 50 kamen zwei Rückmeldungen. Mit Pathly kommt einfach Qualität, ich glaube, dass Recruiter auch persönliche Anschreiben haben wollen, keine generischen KI-Texte.",
      name: "Franziska",
      age: 29,
      location: "Frankfurt",
      role: "Controllerin",
      initials: "F",
      src: "/images/Franziska.jpg",
    },
  ],
} as const;

// ─── Pricing ─────────────────────────────────────────────────
export const PRICING = {
  headline: "Transparente Preise.",
  subline: "Kein Abo-Dschungel. Wähle deinen Takt.",
  intervalLabels: {
    monthly: "Monatlich",
    quarterly: "Quartalsweise",
  },
  quarterlyBadge: "−15%",
  perMonth: "/ Monat",
  perQuarter: "/ Quartal",
  popular: "Beliebt",
  freeCta: "Kostenlos starten",
  paidCta: "Plan wählen",
  plans: [
    {
      id: "free",
      name: "Free",
      monthlyPrice: 0,
      quarterlyPrice: 0,
      description: "Perfekt zum Ausprobieren.",
      features: [
        { text: "6 Credits / Monat", included: true },
        { text: "CV Optimizer", included: true },
        { text: "Cover Letter Generator", included: true },
        { text: "Video Letter / Pitch", included: false },
        { text: "Interview Coaching", included: false },
        { text: "Job Search (Google Jobs)", included: false },
      ],
    },
    {
      id: "starter",
      name: "Starter",
      monthlyPrice: 9.90,
      quarterlyPrice: 8.42,
      description: "Für aktive Jobsuche.",
      features: [
        { text: "20 Credits / Monat", included: true },
        { text: "CV Optimizer", included: true },
        { text: "Cover Letter Generator", included: true },
        { text: "Video Letter / Pitch", included: true },
        { text: "3 Coaching Sessions", included: true },
        { text: "20 Job Searches", included: true },
      ],
    },
    {
      id: "durchstarter",
      name: "Durchstarter",
      monthlyPrice: 19.90,
      quarterlyPrice: 16.92,
      description: "Maximale Power für deine Karriere.",
      popular: true,
      features: [
        { text: "50 Credits / Monat", included: true },
        { text: "CV Optimizer", included: true },
        { text: "Cover Letter Generator", included: true },
        { text: "Video Letter / Pitch", included: true },
        { text: "10 Coaching Sessions", included: true },
        { text: "50 Job Searches", included: true },
      ],
    },
  ],
  trustSignals: ["14 Tage Geld-zurück", "EU-gehostet", "DSGVO-konform"],
} as const;



// ─── Final CTA ───────────────────────────────────────────────
export const FINAL_CTA = {
  headlinePart1: "Dein nächstes Interview.",
  headlinePart2: "Nicht irgendwann:",
  headlineAccent: "jetzt.",
  body: "Pathly ist in der Beta. Trag dich ein und du bekommst als Erste:r Zugang — kostenlos, ohne Verpflichtung.",
  inputPlaceholder: "E-Mail-Adresse",
  cta: "Ich will frühen Zugang →",
  trustSignals: [
    "Keine Kreditkarte",
    "Jederzeit abmeldbar",
    "EU-Server",
  ],
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

// ─── FAQ ─────────────────────────────────────────────────────
export const FAQ_DATA = {
  headline: "Häufige Fragen.",
  items: [
    {
      id: "01",
      tag: "Datenschutz",
      question: "Wo liegen meine Daten, und liest Pathly meinen Lebenslauf?",
      answer:
        "Deine Daten werden ausschließlich auf EU-Servern gespeichert. Pathly ist vollständig DSGVO-konform und NIS2-ready. Dein Lebenslauf wird nur verarbeitet, um dir bessere Bewerbungen zu ermöglichen. Niemals weitergegeben, verkauft oder für das Training von KI-Modellen genutzt. Du kannst deine Daten jederzeit vollständig löschen.",
    },
    {
      id: "02",
      tag: "Datenschutz",
      question: "Wird mein CV für KI-Training verwendet?",
      answer:
        "Nein. Deine Dokumente, Texte und persönlichen Daten werden niemals für das Training von KI-Modellen verwendet, weder von Pathly noch von unseren KI-Partnern. Das ist vertraglich garantiert. Deine Bewerbungsunterlagen gehören dir.",
    },
    {
      id: "03",
      tag: "KI & Stil",
      question: "Klingt das Anschreiben wirklich nach mir, oder nach KI?",
      answer:
        "Pathly analysiert deinen Schreibstil anhand deiner eigenen Texte: Satzlänge, Wortwahl, Ton. Das generierte Anschreiben wird zusätzlich durch eine Skeptical Hiring Manager-Kritik geprüft, die generische Formulierungen aktiv herausfiltert. Das Ergebnis klingt wie du. Nicht wie ein Chatbot.",
    },
    {
      id: "04",
      tag: "Vergleich",
      question: "Was macht Pathly anders als andere KI-Tools?",
      answer:
        "Andere KI-Tools kennen dich nicht, kennen den Job nicht und wissen nicht, was Recruiter wirklich sehen wollen. Pathly kombiniert dein individuelles Profil, die konkrete Stellenbeschreibung und Echtzeit-Unternehmensrecherche, und erstellt daraus eine Bewerbung, die ATS-Systeme passiert und trotzdem nach dir klingt. Dazu kommt EU-Datenschutz, Job-Tracking und Interview-Coaching in einem System.",
    },
    {
      id: "05",
      tag: "Produkt",
      question: "Funktioniert Pathly auch für meine Branche?",
      answer:
        "Ja. Pathly wurde für alle Berufsfelder entwickelt, von Marketing über Tech bis hin zu Design, Finanzen oder dem öffentlichen Dienst. Das System passt sich an deine Branche, deinen Karrierelevel und deine Ziele an. Auch Quereinsteiger, Berufsrückkehrer und Menschen mit Lücken im Lebenslauf werden gezielt unterstützt.",
    },
    {
      id: "06",
      tag: "Warteliste",
      question: "Was passiert nach der Warteliste?",
      answer:
        "Sobald Pathly in die Beta startet, bekommst du als Erste:r eine persönliche Einladung per E-Mail. Beta-Nutzer erhalten vollen Zugang zu allen Features, inklusive CV-Optimizer, Cover Letter, Interview-Coaching und Job-Queue. Dein Platz auf der Liste bleibt gesichert.",
    },
    {
      id: "07",
      tag: "Vertrauen",
      question: "Warum sollte ich einer neuen KI-Plattform vertrauen?",
      answer:
        "Weil wir selbst erlebt haben, wie frustrierend der Bewerbungsprozess ist, und wie wenig bestehende Tools wirklich helfen. Pathly wurde nicht gebaut, um einen weiteren KI-Wrapper auf den Markt zu bringen, sondern um das zu lösen, was wirklich im Weg steht: unsichtbare Hürden durch ATS-Filter, generische Texte und kein Überblick. Transparenz und Datenschutz sind dabei keine Features. Sie sind die Grundlage.",
    },
  ],
  schemaId: "faq-schema",
} as const;

// ─── Impressum ───────────────────────────────────────────────
export const IMPRESSUM = {
  meta: {
    title: "Impressum – Pathly",
  },
  heading: "Impressum",
  legalBasis: "Angaben gemäß § 5 DDG (Digitale-Dienste-Gesetz)",
  sections: [
    {
      id: "diensteanbieter",
      heading: "Diensteanbieter",
      legalRef: "§ 5 Abs. 1 DDG",
      lines: [
        "Yannik Galetto",
        "Pathly",
        "Borsigstraße 12",
        "10115 Berlin",
        "Deutschland",
      ],
      isTodo: false,
    },
    {
      id: "kontakt",
      heading: "Kontakt",
      legalRef: "§ 5 Abs. 1 Nr. 2 DDG",
      lines: null,
      isTodo: false,
    },
    {
      id: "verantwortlich",
      heading: "Verantwortlich für den Inhalt",
      legalRef: "§ 18 Abs. 2 MStV",
      lines: ["Yannik Galetto", "(Anschrift wie oben)"],
      isTodo: false,
    },
    {
      id: "streitschlichtung",
      heading: "EU-Streitschlichtung",
      legalRef: null,
      odrLink: "https://ec.europa.eu/consumers/odr/",
      paragraphs: [
        "Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:",
        "Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.",
      ],
      isTodo: false,
    },
    {
      id: "haftung-inhalte",
      heading: "Haftung für Inhalte",
      legalRef: "§§ 7–10 DDG",
      paragraphs: [
        "Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.",
        "Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich.",
      ],
      isTodo: false,
    },
    {
      id: "haftung-links",
      heading: "Haftung für externe Links",
      legalRef: null,
      paragraphs: [
        "Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.",
      ],
      isTodo: false,
    },
    {
      id: "urheberrecht",
      heading: "Urheberrecht",
      legalRef: null,
      paragraphs: [
        "Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechts bedürfen der schriftlichen Zustimmung des jeweiligen Autors.",
      ],
      isTodo: false,
    },
    {
      id: "ki-hinweis",
      heading: "Hinweis zum Einsatz von KI",
      legalRef: "Art. 50 EU KI-Verordnung (KI-VO)",
      paragraphs: [
        "Pathly nutzt KI-Technologien zur Erstellung von Bewerbungsunterlagen. Alle durch Pathly generierten Inhalte (Lebensläufe, Anschreiben, Coachinghinweise) sind KI-unterstützt erstellt. Nutzer werden innerhalb der Anwendung entsprechend informiert.",
      ],
      isTodo: false,
    },
  ],
  footer: {
    backLabel: "← Zurück zur Startseite",
    backHref: "/",
    datenschutzLabel: "Datenschutzerklärung →",
    datenschutzHref: "/datenschutz",
  },
} as const;

// ─── Cookie Consent ───────────────────────────────────────────
export const COOKIE_CONSENT = {
  STORAGE_KEY: "pathly_consent",
  VERSION: 1,
  // Version erhöhen bei Datenschutzänderungen → re-prompt
  banner: {
    title: "Wir respektieren deine Privatsphäre.",
    body: "Wir nutzen Cookies für technisch notwendige Funktionen. Analytics-Cookies setzen wir nur mit deiner Einwilligung ein.",
    acceptAll: "Alles akzeptieren",
    necessary: "Nur notwendige",
    settings: "Einstellungen",
    settingsTitle: "Cookie-Einstellungen",
    necessaryLabel: "Notwendige Cookies",
    necessaryDesc:
      "Technisch erforderlich für die Grundfunktionen der Website. Kann nicht deaktiviert werden.",
    analyticsLabel: "Analytics-Cookies",
    analyticsDesc:
      "Helfen uns zu verstehen, wie Besucher die Website nutzen (z.\u00A0B. Vercel Analytics).",
    save: "Einstellungen speichern",
    privacyLink: "Datenschutzerklärung",
    privacyHref: "/datenschutz",
  },
  noscript:
    "Diese Website verwendet technisch notwendige Cookies.",
} as const;
