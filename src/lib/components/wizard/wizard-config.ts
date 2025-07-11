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
  lowestPrice: number;
  highestPrice: number;
}

export interface Feature {
  id: string;
  title: string;
  price: number;
}

export interface FormFieldType {
  id: string;
  title: string;
}

export const projectTypes: ProjectType[] = [
  {
    id: 'website',
    title: 'Website',
    description: 'Klassische Unternehmenswebsite oder Webvisitenkarte',
    icon: '🌐',
    lowestPrice: 800,
    highestPrice: 3500
  },
  {
    id: 'cms',
    title: 'Content Management System',
    description: 'Website mit eigenständiger Inhaltsverwaltung',
    icon: '📝',
    lowestPrice: 2500,
    highestPrice: 8000
  },
  {
    id: 'webapp',
    title: 'Web Application',
    description: 'Interaktive Webanwendung oder PWA',
    icon: '💻',
    lowestPrice: 6000,
    highestPrice: 25000
  },
  {
    id: 'mobile',
    title: 'Mobile Application',
    description: 'Native oder hybride Mobile App',
    icon: '📱',
    lowestPrice: 12000,
    highestPrice: 50000
  },
  {
    id: 'individual',
    title: 'Individuelle Entwicklung',
    description: 'Maßgeschneiderte Lösung nach Ihren Anforderungen',
    icon: '🛠️',
    lowestPrice: 3000,
    highestPrice: 100000
  }
];

export const subTypes: Record<string, SubType[]> = {
  website: [
    { id: 'business-card', title: 'Webvisitenkarte', description: 'Einfacher Onepager mit Kontaktdaten', lowestPrice: 800, highestPrice: 1500 },
    { id: 'corporate', title: 'Unternehmenswebsite', description: 'Mehrere Seiten mit umfassenden Informationen', lowestPrice: 2000, highestPrice: 5000 },
    { id: 'onepager', title: 'Onepager', description: 'Alles auf einer Seite, modern und übersichtlich', lowestPrice: 1200, highestPrice: 2500 },
    { id: 'landing', title: 'Landing Page', description: 'Kampagnenseite mit klarem Call-to-Action', lowestPrice: 1500, highestPrice: 3000 }
  ],
  cms: [
    { id: 'simple', title: 'Einfaches CMS', description: 'Grundlegende Inhaltsbearbeitung', lowestPrice: 2500, highestPrice: 4000 },
    { id: 'advanced', title: 'Erweiterte CMS', description: 'Komplexe Inhaltsverwaltung mit Nutzerverwaltung', lowestPrice: 5000, highestPrice: 12000 },
    { id: 'blog', title: 'Blog-System', description: 'Speziell für Blogs und News optimiert', lowestPrice: 3000, highestPrice: 6000 },
    { id: 'headless', title: 'Headless CMS', description: 'API-basiertes CMS für flexible Nutzung', lowestPrice: 4000, highestPrice: 8000 }
  ],
  webapp: [
    { id: 'pwa', title: 'Progressive Web App', description: 'App-ähnliche Webanwendung', lowestPrice: 6000, highestPrice: 15000 },
    { id: 'dashboard', title: 'Dashboard/Admin Panel', description: 'Verwaltungsoberfläche für Daten', lowestPrice: 8000, highestPrice: 20000 },
    { id: 'ecommerce', title: 'E-Commerce Platform', description: 'Online-Shop mit Zahlungsabwicklung', lowestPrice: 12000, highestPrice: 35000 }
  ],
  mobile: [
    { id: 'hybrid', title: 'Hybrid App', description: 'Eine App für iOS und Android', lowestPrice: 12000, highestPrice: 25000 },
    { id: 'native', title: 'Native App', description: 'Separate Apps für iOS und Android', lowestPrice: 20000, highestPrice: 45000 }
  ],
  individual: [
    { id: 'api-integration', title: 'API Integration', description: 'Anbindung externer Systeme', lowestPrice: 3000, highestPrice: 8000 },
    { id: 'automation', title: 'Workflow Automation', description: 'Automatisierung von Geschäftsprozessen', lowestPrice: 8000, highestPrice: 25000 },
    { id: 'custom-tool', title: 'Custom Tool', description: 'Spezielles Werkzeug für Ihre Anforderungen', lowestPrice: 5000, highestPrice: 50000 }
  ]
};

export const availableFeatures: Feature[] = [
  { id: 'contact-form', title: 'Kontaktformular', price: 300 },
  { id: 'gallery', title: 'Bildergalerie', price: 500 },
  { id: 'maps', title: 'Karten Integration', price: 200 },
  { id: 'social-media', title: 'Social Media Integration', price: 300 },
  { id: 'newsletter', title: 'Newsletter Anmeldung', price: 400 },
  { id: 'search', title: 'Suchfunktion', price: 800 },
  { id: 'multilingual', title: 'Mehrsprachigkeit', price: 1500 },
  { id: 'booking', title: 'Terminbuchung', price: 1200 },
  { id: 'payment', title: 'Zahlungsabwicklung', price: 2000 },
  { id: 'user-accounts', title: 'Benutzerkonten', price: 1800 },
  { id: 'analytics', title: 'Analytics Integration', price: 300 },
  { id: 'seo', title: 'SEO Optimierung', price: 600 }
];

export const googleFonts: string[] = [
  'Circular',
  'Lato',
  'PT Serif',
  'Inter',
  'Roboto',
  'Open Sans',
  'Montserrat',
  'Source Sans Pro',
  'Raleway',
  'PT Sans',
  'Lora',
  'Merriweather',
  'Playfair Display',
  'Oswald'
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