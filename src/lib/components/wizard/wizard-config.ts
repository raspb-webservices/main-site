export interface ProjectType {
  id: string;
  title: string;
  description: string;
  icon: string;
  lowestPrice: number;
  highestPrice: number;
}

export interface SubType {
  id: string;
  title: string;
  description: string;
  parentId: string;
  price: number;
}

export interface Feature {
  name: string;
  title: string;
  description?: string;
  category?: string;
}

export interface FormFieldType {
  id: string;
  title: string;
}

export const projectTypes: ProjectType[] = [
  {
    id: 'website',
    title: 'Website',
    description: 'Klassische Unternehmenswebsite oder einfache Webvisitenkarte',
    icon: '🌐',
    lowestPrice: 399,
    highestPrice: 5000
  },
  {
    id: 'cms',
    title: 'Content Management System',
    description: 'Website mit eigenständiger Inhaltsverwaltung',
    icon: '📝',
    lowestPrice: 1999,
    highestPrice: 10000
  },
  {
    id: 'webApplication',
    title: 'Web Application',
    description: 'Interaktive Webanwendung oder PWA',
    icon: '💻',
    lowestPrice: 5999,
    highestPrice: 15000
  },
  {
    id: 'artificialIntelligence',
    title: 'Ihr KI Use-Case',
    description: 'Infrastruktur, Automation, Engineering',
    icon: '🤖',
    lowestPrice: 10000,
    highestPrice: 50000
  },
  {
    id: 'freestyle',
    title: 'Individuelle Entwicklung',
    description: 'Maßgeschneiderte Lösung nach Ihren Anforderungen',
    icon: '🛠️',
    lowestPrice: 5000,
    highestPrice: 50000
  }
];

export const subTypes: SubType[] = [
  {
    id: 'onepager',
    title: 'Webvisitenkarte',
    description: 'Einfacher Onepager mit Kontaktdaten und grundlegenden Informationen',
    parentId: 'website',
    price: 399
  },
  {
    id: 'onepagerPlus',
    title: 'Kampagnen Seite',
    description: 'Zielgerichtete Landing Page für Marketing-Kampagnen mit Call-to-Action',
    parentId: 'website',
    price: 699
  },
  {
    id: 'corporateWebsite',
    title: 'Unternehmenswebseite',
    description: 'Professionelle Firmenwebsite mit mehreren Seiten und Unternehmensinformationen',
    parentId: 'website',
    price: 999
  },
  {
    id: 'corporateWebsitePremium',
    title: 'Unternehmenswebseite Premium',
    description: 'Umfassende Unternehmenswebsite mit erweiterten Funktionen und individuellem Design',
    parentId: 'website',
    price: 1999
  },
  { id: 'cmsSimple', title: 'Einfaches CMS', description: 'Grundlegendes Content Management System für einfache Inhaltspflege', parentId: 'cms', price: 1999 },
  {
    id: 'cmsPremium',
    title: 'Premium CMS',
    description: 'Erweiterte Content-Management-Lösung mit benutzerdefinierten Feldern und Workflows',
    parentId: 'cms',
    price: 4999
  },
  { id: 'blogSystem', title: 'Blog System', description: 'Vollständiges Blog-System mit Kategorien, Tags und Kommentarfunktion', parentId: 'cms', price: 3999 },
  {
    id: 'headlessCms',
    title: 'Headless CMS',
    description: 'API-basiertes Content Management System für flexible Frontend-Lösungen',
    parentId: 'cms',
    price: 5999
  },
  {
    id: 'pwa',
    title: 'Progressive Web App',
    description: 'App-ähnliche Webanwendung mit Offline-Funktionalität und Push-Benachrichtigungen',
    parentId: 'webApplication',
    price: 5999
  },
  {
    id: 'customApp',
    title: 'Individuelle Anwendung',
    description: 'Maßgeschneiderte Webanwendung nach spezifischen Anforderungen',
    parentId: 'webApplication',
    price: 5999
  },
  {
    id: 'eCommerce',
    title: 'E-Commerce Shop',
    description: 'Online-Shop mit Produktkatalog, Warenkorb und Zahlungsabwicklung',
    parentId: 'webApplication',
    price: 5999
  },
  {
    id: 'apiIntegration',
    title: 'API Integration',
    description: 'Integration externer Dienste und APIs in bestehende Systeme',
    parentId: 'webApplication',
    price: 5999
  },
  {
    id: 'customTool',
    title: 'Individuelles Tool',
    description: 'Spezialisierte Web-Tools für spezifische Geschäftsprozesse',
    parentId: 'webApplication',
    price: 5999
  }
];

export const availableFeatures: Feature[] = [
  // Kommunikation & Kontakt
  {
    name: 'kontaktformular',
    title: 'Kontaktformular',
    description: 'Ein individuelles Kontaktformular, welches alle Anfragen erfasst.',
    category: 'Kommunikation'
  },
  {
    name: 'newsletterRegistrierung',
    title: 'Newsletter Registrierung',
    description: 'Newsletter-Anmeldung mit E-Mail-Validierung und Double-Opt-In',
    category: 'Kommunikation'
  },
  { name: 'chatbot', title: 'Chatbot', description: 'KI-gestützter Chatbot für Kundenservice und Beratung', category: 'Kommunikation' },
  { name: 'terminbuchung', title: 'Terminbuchung', description: 'Online-Terminbuchungssystem mit Kalenderintegration', category: 'Kommunikation' },

  // Content & Medien
  {
    name: 'bildergalerie',
    title: 'Bildergalerie',
    description: 'Responsive Bildergalerie mit Lightbox-Funktionalität und Kategorisierung',
    category: 'Content'
  },
  { name: 'videoEmbedding', title: 'Video Embedding', description: 'Responsive Video-Einbindung mit Player-Kontrollen', category: 'Content' },
  { name: 'portfolioGrid', title: 'Portfolio Grid', description: 'Responsive Portfolio-Raster zur Präsentation von Arbeiten', category: 'Content' },
  { name: 'kalender', title: 'Kalender', description: 'Interaktiver Kalender mit Event-Management und Terminanzeige', category: 'Content' },
  { name: 'dateiupload', title: 'Datei Upload', description: 'Sichere Datei-Upload-Funktionalität mit Validierung und Vorschau', category: 'Content' },

  // Navigation & UI
  { name: 'megaMenu', title: 'Mega Menu', description: 'Erweiterte Navigation mit mehrstufigen Dropdown-Menüs', category: 'Navigation' },
  { name: 'customTeaser', title: 'Custom Teaser', description: 'Individuelle Teaser-Komponenten für Inhalte und Produkte', category: 'Navigation' },
  { name: 'customCarousel', title: 'Custom Carousel', description: 'Maßgeschneiderte Karussell-Komponente für Bilder und Inhalte', category: 'Navigation' },
  { name: 'akkordeon', title: 'Akkordeon', description: 'Zusammenklappbare Inhaltsabschnitte für FAQ und strukturierte Inhalte', category: 'Navigation' },
  { name: 'tabs', title: 'Tabs', description: 'Tab-Navigation zur übersichtlichen Darstellung von Inhalten', category: 'Navigation' },
  { name: 'themeSwitcher', title: 'Theme Switcher', description: 'Dark/Light Mode Toggle und individuelle Theme-Auswahl', category: 'Navigation' },

  // Funktionalität & Tools
  { name: 'suchfunktion', title: 'Suchfunktion', description: 'Intelligente Suchfunktion für Website-Inhalte mit Filteroptionen', category: 'Funktionalität' },
  { name: 'customFilter', title: 'Custom Filter', description: 'Erweiterte Filterfunktionen für Produktkataloge und Inhalte', category: 'Funktionalität' },
  { name: 'multiStepDialog', title: 'Multi-Step Dialog', description: 'Mehrstufige Formulare und Dialoge für komplexe Eingaben', category: 'Funktionalität' },
  { name: 'konfigurator', title: 'Konfigurator', description: 'Interaktiver Produkt- oder Service-Konfigurator', category: 'Funktionalität' },
  { name: 'assistent', title: 'Assistent', description: 'Digitaler Assistent zur Benutzerführung und Hilfestellung', category: 'Funktionalität' },
  {
    name: 'bewertungsmechanismus',
    title: 'Bewertungsmechanismus',
    description: 'Bewertungs- und Review-System für Produkte oder Services',
    category: 'Funktionalität'
  },

  // E-Commerce & Zahlungen
  {
    name: 'zahlungsbawicklung',
    title: 'Zahlungsabwicklung',
    description: 'Sichere Online-Zahlungsabwicklung mit verschiedenen Payment-Providern',
    category: 'E-Commerce'
  },

  // Benutzer & Sicherheit
  { name: 'benutzerkonten', title: 'Benutzerkonten', description: 'User-Management mit Registrierung, Login und Profilverwaltung', category: 'Benutzer' },
  { name: 'altersverifikation', title: 'Altersverifikation', description: 'Altersverifikationssystem für altersbeschränkte Inhalte', category: 'Benutzer' },
  { name: 'cookieConsent', title: 'Cookie Consent', description: 'DSGVO-konforme Cookie-Einverständniserklärung und -verwaltung', category: 'Benutzer' },
  {
    name: 'barrierefreiheitTools',
    title: 'Barrierefreiheit Tools',
    description: 'Accessibility-Features für bessere Nutzbarkeit und WCAG-Konformität',
    category: 'Benutzer'
  },

  // Integration & Services
  {
    name: 'mapsIntegration',
    title: 'Maps Integration',
    description: 'Google Maps, Mapbox oder OpenStreetMap Integration mit Standortmarkierungen',
    category: 'Integration'
  },
  {
    name: 'socialMediaIntegration',
    title: 'Social Media Integration',
    description: 'Einbindung von Social Media Feeds und Sharing-Buttons',
    category: 'Integration'
  },
  {
    name: 'analyticsIntegration',
    title: 'Analytics Integration',
    description: 'Google Analytics, Matomo oder andere Tracking-Tools Integration',
    category: 'Integration'
  },

  // Marketing & SEO
  { name: 'seo', title: 'SEO Optimierung', description: 'Suchmaschinenoptimierung mit Meta-Tags, Schema Markup und Performance', category: 'Marketing' },
  { name: 'marketingTools', title: 'Marketing Tools', description: 'A/B-Testing, Conversion-Tracking und Marketing-Automation', category: 'Marketing' },

  // Lokalisierung
  { name: 'mehrsprachigkeit', title: 'Mehrsprachigkeit', description: 'Multi-Language Support mit automatischer Spracherkennung', category: 'Lokalisierung' }
];

// Feature category colors for badges
export const featureCategoryColors: Record<string, string> = {
  Kommunikation: 'badge-primary',
  Content: 'badge-secondary',
  Navigation: 'badge-accent',
  Funktionalität: 'badge-info',
  'E-Commerce': 'badge-success',
  Benutzer: 'badge-warning',
  Integration: 'badge-error',
  Marketing: 'badge-neutral',
  Lokalisierung: 'badge-ghost'
};

export const googleFonts: string[] = [
  'Roboto',
  'Open Sans',
  'Lato',
  'Montserrat',
  'Oswald',
  'Raleway',
  'Poppins',
  'Source Sans Pro',
  'Slabo 27px',
  'Merriweather',
  'Noto Sans',
  'PT Sans',
  'Playfair Display',
  'Ubuntu',
  'Roboto Condensed',
  'Mukta',
  'Nunito',
  'Rubik',
  'Quicksand',
  'Work Sans',
  'Josefin Sans',
  'Fjalla One',
  'Libre Baskerville',
  'Anton',
  'Bebas Neue',
  'Dancing Script',
  'Encode Sans',
  'Arimo',
  'Titillium Web',
  'Inconsolata'
];

export const formFieldTypes: FormFieldType[] = [
  { id: 'text', title: 'Textfeld' },
  { id: 'email', title: 'E-Mail' },
  { id: 'phone', title: 'Telefon' },
  { id: 'textarea', title: 'Textbereich' },
  { id: 'select', title: 'Auswahlliste' },
  { id: 'checkbox', title: 'Checkbox' },
  { id: 'radio', title: 'Radio Button' },
  { id: 'file', title: 'Datei Upload' },
  { id: 'date', title: 'Datum' },
  { id: 'number', title: 'Zahl' }
];

// Step Configuration Interface
export interface WizardStep {
  id: number;
  title: string;
  required: boolean;
}

// Dynamic step configuration function
export function getStepConfig(projectType: string): WizardStep[] {
  const baseSteps: WizardStep[] = [
    { id: 1, title: 'Projekttyp', required: true },
    { id: 2, title: 'Details', required: true },
    { id: 3, title: 'Beschreibung', required: false }
  ];

  if (projectType === 'website' || projectType === 'cms') {
    return [
      ...baseSteps,
      { id: 4, title: 'Features', required: false },
      { id: 5, title: 'Inhalte', required: false },
      { id: 6, title: 'Design', required: false },
      { id: 7, title: 'Kontakt', required: true },
      { id: 8, title: 'Ergebnis', required: false }
    ];
  } else if (projectType === 'webApplication' || projectType === 'artificialIntelligence') {
    return [
      ...baseSteps,
      { id: 4, title: 'Materialien', required: false },
      { id: 5, title: 'Kontakt', required: true },
      { id: 6, title: 'Ergebnis', required: false }
    ];
  } else {
    // freestyle
    return [...baseSteps, { id: 4, title: 'Kontakt', required: true }, { id: 5, title: 'Ergebnis', required: false }];
  }
}
