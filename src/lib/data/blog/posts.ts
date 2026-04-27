export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  tags: string[];
  date: string;
  readTime: number;
  author: {
    name: string;
    avatar: string;
  };
  featured?: boolean;
}

export const posts: BlogPost[] = [
  {
    slug: 'ki-agenten-fuer-kmu-leitfaden',
    title: 'KI-Agenten für KMUs: Der komplette Leitfaden für 2026',
    excerpt: 'Erfahren Sie, wie KI-Agenten Ihre Geschäftsprozesse automatisieren und bis zu 80% Kosten sparen können. Praxisbeispiele und konkrete Schritte für den Einstieg.',
    content: `
## Was sind KI-Agenten?

KI-Agenten sind intelligente Software-Lösungen, die eigenständig Aufgaben ausführen können – von der Datenerfassung bis zum Kundenservice. Anders als einfache Chatbots können sie komplexe Workflows durchlaufen und sich an neue Situationen anpassen.

### Vorteile für KMUs

- **Kosteneinsparnis:** Bis zu 80% weniger Kosten bei Routineaufgaben
- **Verfügbarkeit:** 24/7 ohne Pausen oder Krankheitstage
- **Skalierbarkeit:** Beliebig erweiterbar je nach Bedarf
- **Fehlerfreiheit:** Keine menschlichen Fehler bei Datenverarbeitung

## Die 10 wichtigsten KI-Agenten für Ihr Unternehmen

### 1. Datenerfassung (Eliza)
Automatisiert die Erfassung und Verarbeitung von Dokumenten, Rechnungen und Formularen.

### 2. Kundenservice (Rohan)
Beantwortet Kundenanfragen automatisch und eskaliert bei Bedarf an Mitarbeiter.

### 3. Buchhaltung (Finn)
Verarbeitet Rechnungen, erstellt Buchungen und überwacht Zahlungseingänge.

### 4. Übersetzung (Lena)
Übersetzt Dokumente und Kommunikation in über 100 Sprachen.

### 5. Rechtsfachkraft (Anna)
Prüft Verträge auf Konformität und erstellt rechtssichere Dokumente.

## So starten Sie mit KI-Agenten

### Schritt 1: Bedarfsanalyse
Identifizieren Sie die Aufgaben, die am meisten Zeit und Ressourcen kosten.

### Schritt 2: Pilotprojekt
Starten Sie mit einem einzelnen KI-Agenten und testen Sie die Wirkung.

### Schritt 3: Skalierung
Erweitern Sie schrittweise auf weitere Bereiche und Agenten.

## Fazit

KI-Agenten sind kein Zukunftsmusik mehr, sondern ein konkretes Werkzeug für die heute Wettbewerbsfähigkeit. Starten Sie jetzt und sichern Sie sich Ihren Vorsprung.
    `,
    image: '/images/blog/ki-agenten-leitfaden.jpg',
    category: 'KI-Agenten',
    tags: ['KI', 'Automatisierung', 'KMU', 'Business OS'],
    date: '2026-04-27',
    readTime: 8,
    author: {
      name: 'Markus',
      avatar: '/images/authors/markus.jpg'
    },
    featured: true
  },
  {
    slug: 'business-os-grundlagen',
    title: 'Was ist ein Business OS? Die Zukunft der Geschäftsprozess-Automatisierung',
    excerpt: 'Ein Business Operating System vereint alle Ihre Geschäftsprozesse in einer Plattform. Erfahren Sie, wie es Ihrem Unternehmen helfen kann.',
    content: `
## Definition: Was ist ein Business OS?

Ein Business Operating System (BOS) ist eine integrierte Plattform, die alle wesentlichen Geschäftsprozesse eines Unternehmens vereint und automatisiert. Es dient als zentrale Schaltstelle für Kommunikation, Datenfluss und Aufgabenkoordination.

### Kernelemente eines Business OS

1. **Prozess-Automatisierung:** Wiederkehrende Aufgaben werden automatisch ausgeführt
2. **Datenintegration:** Alle Informationen an einem Ort
3. **KI-Unterstützung:** Intelligente Entscheidungshilfen
4. **Reporting:** Echtzeit-Übersichten und Analysen

## Vorteile für Ihr Unternehmen

### Zeitersparnis
Durchschnittlich 10-15 Stunden pro Woche und Mitarbeiter bei Routineaufgaben.

### Kostenreduktion
Bis zu 40% geringere Betriebskosten durch Automatisierung.

### Fehlerreduktion
95% weniger Fehler bei Datenverarbeitung und -weitergabe.

### Skalierbarkeit
Wachse mit Ihrem Unternehmen ohne proportionalen Personalzuwachs.

## Das raspb Business OS

Unser Business OS kombiniert 20 spezialisierte KI-Agenten zu einer durchgängigen Plattform:

- **Eliza** für Datenerfassung
- **Rohan** für Kundenservice
- **Finn** für Buchhaltung
- **Anna** für Rechtsfragen
- Und 16 weitere Spezialisten

## Implementation in 4 Schritten

1. **Analyse:** Wir prüfen Ihre aktuellen Prozesse
2. **Konfiguration:** Passende KI-Agenten werden eingerichtet
3. **Integration:** Nahtlose Einbindung in bestehende Systeme
4. **Go-Live:** Produktiver Einsatz mit Support

## Fazit

Ein Business OS ist die natürliche Evolution der Unternehmensdigitalisierung. Es vereint das Beste aus Automatisierung, KI und benutzerfreundlicher Gestaltung.
    `,
    image: '/images/blog/business-os-grundlagen.jpg',
    category: 'Business OS',
    tags: ['Business OS', 'Automatisierung', 'Digitalisierung'],
    date: '2026-04-25',
    readTime: 6,
    author: {
      name: 'Markus',
      avatar: '/images/authors/markus.jpg'
    }
  },
  {
    slug: 'dsgvo-konforme-ki-im-unternehmen',
    title: 'DSGVO-konforme KI im Unternehmen: Was Sie wissen müssen',
    excerpt: 'Die EU-Regulierung für KI wird immer strenger. Erfahren Sie, wie Sie KI-Tools DSGVO-konform einsetzen und rechtliche Fallstricke vermeiden.',
    content: `
## Herausforderungen bei KI und DSGVO

Die DSGVO stellt klare Anforderungen an die Verarbeitung personenbezogener Daten – und KI-Systeme fallen definitut darunter. Unternehmen müssen mehrere Aspekte beachten:

### Rechtsgrundlage (Art. 6 DSGVO)
- **Einwilligung:** Ausdrückliche Zustimmung der Betroffenen
- **Vertragserfüllung:** Notwendig für die Vertragsabwicklung
- **Berechtigtes Interesse:** Nur mit Interessenabwägung

### Informationspflichten (Art. 13-14 DSGVO)
Betroffene müssen darüber informiert werden, dass ihre Daten von KI verarbeitet werden.

## Praxis-Tipps für DSGVO-konforme KI

### 1. Datenminimierung
Nur die Daten erheben, die wirklich benötigt werden.

### 2. Speicherbegrenzung
Daten nur so lange aufbewahren, wie nötig.

### 3. Privacy by Design
Datenschutz von Anfang in die Systeme einbauen.

### 4. Auftragsverarbeitung
Klare Verträge mit KI-Anbietern schließen.

## Das raspb Business OS und DSGVO

Unser System wurde von Grund auf für DSGVO-Konformität entwickelt:

- **Hosting in Deutschland:** Alle Daten bleiben in der EU
- **Keine Weitergabe an Dritte:** Volle Kontrolle über Ihre Daten
- **Transparente Verarbeitung:** Sie sehen genau, welche Daten wo verarbeitet werden
- **Löschfunktionen:** Einfaches Entfernen aller Daten auf Wunsch

## Handlungsempfehlungen

1. **Bestandsaufnahme:** Prüfen Sie bestehende KI-Einsätze
2. **Gap-Analyse:** Identifizieren Sie Abweichungen zur DSGVO
3. **Maßnahmenplan:** Schließen Sie die Lücken systematisch
4. **Dokumentation:** Halten Sie alles für Prüfungen fest

## Fazit

DSGVO und KI schließen sich nicht aus – im Gegenteil. Mit der richtigen Umsetzung können Sie beides optimal nutzen.
    `,
    image: '/images/blog/dsgvo-ki.jpg',
    category: 'Branchen',
    tags: ['DSGVO', 'Compliance', 'Recht', 'KI'],
    date: '2026-04-22',
    readTime: 7,
    author: {
      name: 'Markus',
      avatar: '/images/authors/markus.jpg'
    }
  },
  {
    slug: 'sveltekit-webentwicklung-vorteile',
    title: 'Warum SvelteKit die Zukunft der Webentwicklung ist',
    excerpt: 'SvelteKit vereint Performance, Entwicklerfreundlichkeit und Flexibilität. Erfahren Sie, warum wir es für alle unsere Projekte einsetzen.',
    content: `
## Was ist SvelteKit?

SvelteKit ist ein modernes Web-Framework, das auf Svelte aufbaut. Es ermöglicht die Erstellung von performanten, serverseitig gerenderten Webanwendungen mit minimalem JavaScript-Overhead.

### Vorteile gegenüber React/Next.js

1. **Performance:** Weniger JavaScript = schnellere Ladezeiten
2. **Entwicklerfreundlichkeit:** Einfachere Syntax, weniger Boilerplate
3. **SEO:** Optimales server-side rendering
4. **Sicherheit:** Weniger Angriffsfläche durch weniger Client-Code

## Warum wir SvelteKit nutzen

### Performance
Unsere Projekte erreichen durchschnittlich Lighthouse-Scores von 95+.

### Entwicklungszeit
Bis zu 40% schnellere Entwicklung compared zu React-basierten Lösungen.

### Wartbarkeit
Klarer Code, der auch für neue Entwickler leicht verständlich ist.

### Ökosystem
Zugriff auf alle npm-Pakete bei gleichzeitig geringerem Overhead.

## Fallbeispiele

### raspb.de
- Lighthouse Score: 98
- First Contentful Paint: 0.8s
- Total Blocking Time: 20ms

### agentenwerk.ai
- Lighthouse Score: 96
- First Contentful Paint: 0.9s
- Total Blocking Time: 25ms

## Fazit

SvelteKit ist die ideale Wahl für Unternehmen, die Wert auf Performance, SEO und Entwicklerfreundlichkeit legen.
    `,
    image: '/images/blog/sveltekit-webentwicklung.jpg',
    category: 'Technologie',
    tags: ['SvelteKit', 'Webentwicklung', 'Performance', 'SEO'],
    date: '2026-04-18',
    readTime: 5,
    author: {
      name: 'Markus',
      avatar: '/images/authors/markus.jpg'
    }
  },
  {
    slug: 'kundenservice-ki-automatisieren',
    title: 'Kundenservice mit KI automatisieren: Ein Praxisleitfaden',
    excerpt: 'Lernen Sie, wie Sie mit KI-Agenten Ihren Kundenservice revolutionieren und gleichzeitig die Qualität steigern können.',
    content: `
## Die Herausforderungen im modernen Kundenservice

Kunden erwarten heute:
- **Sofortige Antworten** (24/7)
- **Personalisierte Betreuung**
- **Mehrkanal-Kommunikation**
- **Hohe Qualität**

## KI-Lösungen für den Kundenservice

### 1. intelligente Chatbots
- Beantworten 80% der häufigsten Fragen automatisch
- Lernen aus jeder Interaktion
- Eskalieren bei Bedarf an Mitarbeiter

### 2. Sentiment-Analyse
- Erkennt die Stimmung von Kunden
- Priorisiert dringende Anfragen
- Verbessert die Service-Qualität

### 3. Automatische Ticket-Klassifizierung
- Ordnet Anfragen automatisch zu
- Leitet an richtige Abteilung weiter
- Reduziert Bearbeitungszeit um 60%

## Der KI-Agent Rohan

Unser KI-Agent Rohan ist speziell für den Kundenservice entwickelt:

- **Sprachverständnis:** Versteht natürliche Sprache
- **Kontextwissen:** Kennt Ihre Produkte und Dienstleistungen
- **Eskalation:** Weiß, wann ein Mensch gefragt ist
- **Lernfähig:** Verbessert sich mit jeder Interaktion

## Implementierungs-Schritte

1. **Analyse:** Welche Anfragen kommen häufig vor?
2. **Wissensbasis:** Erstellen Sie eine umfassende FAQ
3. **Training:** Trainieren Sie den KI-Agenten mit Ihren Daten
4. **Test:** Laufen Sie parallel zum bestehenden Service
5. **Go-Live:** Schalten Sie den KI-Agenten frei

## Messbare Ergebnisse

| Metrik | Vorher | Nachher |
|--------|--------|---------|
| Antwortzeit | 24 Stunden | < 1 Minute |
| Zufriedenheit | 72% | 89% |
| Kosten pro Ticket | €12 | €3 |
| Verfügbarkeit | 8h/Tag | 24/7 |

## Fazit

KI im Kundenservice ist kein Entweder-oder, sondern ein Sowohl-als-auch. Die Kombination aus menschlicher Empathie und maschineller Effizienz ist die Zukunft.
    `,
    image: '/images/blog/kundenservice-ki.jpg',
    category: 'KI-Agenten',
    tags: ['Kundenservice', 'KI', 'Automatisierung', 'Rohan'],
    date: '2026-04-15',
    readTime: 6,
    author: {
      name: 'Markus',
      avatar: '/images/authors/markus.jpg'
    }
  }
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find(p => p.slug === slug);
}

export function getFeaturedPosts(): BlogPost[] {
  return posts.filter(p => p.featured);
}

export function getPostsByCategory(category: string): BlogPost[] {
  return posts.filter(p => p.category === category);
}

export function getRecentPosts(count: number): BlogPost[] {
  return [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, count);
}
