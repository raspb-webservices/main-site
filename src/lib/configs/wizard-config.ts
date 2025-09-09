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
  lowestPrice: number;
  highestPrice: number;
}

export interface Feature {
  name: string;
  title: string;
  description?: string;
  category?: string;
  complexityFactor?: number;
}

export interface FormFieldType {
  id: string;
  title: string;
}

export const projectTypes: ProjectType[] = [
  {
    id: 'website',
    title: 'wizard.config.projectTypes.website.title',
    description: 'wizard.config.projectTypes.website.description',
    icon: '🌐',
    lowestPrice: 399,
    highestPrice: 5000
  },
  {
    id: 'cms',
    title: 'wizard.config.projectTypes.cms.title',
    description: 'wizard.config.projectTypes.cms.description',
    icon: '📝',
    lowestPrice: 1999,
    highestPrice: 10000
  },
  {
    id: 'webApplication',
    title: 'wizard.config.projectTypes.webApplication.title',
    description: 'wizard.config.projectTypes.webApplication.description',
    icon: '💻',
    lowestPrice: 5999,
    highestPrice: 15000
  },
  {
    id: 'artificialIntelligence',
    title: 'wizard.config.projectTypes.artificialIntelligence.title',
    description: 'wizard.config.projectTypes.artificialIntelligence.description',
    icon: '🤖',
    lowestPrice: 10000,
    highestPrice: 50000
  },
  {
    id: 'freestyle',
    title: 'wizard.config.projectTypes.freestyle.title',
    description: 'wizard.config.projectTypes.freestyle.description',
    icon: '🛠️',
    lowestPrice: 5000,
    highestPrice: 50000
  }
];

export const subTypes: SubType[] = [
  {
    id: 'onepager',
    title: 'wizard.config.subTypes.onepager.title',
    description: 'wizard.config.subTypes.onepager.description',
    parentId: 'website',
    lowestPrice: 399,
    highestPrice: 1000
  },
  {
    id: 'onepagerPlus',
    title: 'wizard.config.subTypes.onepagerPlus.title',
    description: 'wizard.config.subTypes.onepagerPlus.description',
    parentId: 'website',
    lowestPrice: 699,
    highestPrice: 1999
  },
  {
    id: 'corporateWebsite',
    title: 'wizard.config.subTypes.corporateWebsite.title',
    description: 'wizard.config.subTypes.corporateWebsite.description',
    parentId: 'website',
    lowestPrice: 999,
    highestPrice: 3000
  },
  {
    id: 'corporateWebsitePremium',
    title: 'wizard.config.subTypes.corporateWebsitePremium.title',
    description: 'wizard.config.subTypes.corporateWebsitePremium.description',
    parentId: 'website',
    lowestPrice: 1999,
    highestPrice: 5000
  },
  {
    id: 'cmsSimple',
    title: 'wizard.config.subTypes.cmsSimple.title',
    description: 'wizard.config.subTypes.cmsSimple.description',
    parentId: 'cms',
    lowestPrice: 1999,
    highestPrice: 6999
  },
  {
    id: 'cmsPremium',
    title: 'wizard.config.subTypes.cmsPremium.title',
    description: 'wizard.config.subTypes.cmsPremium.description',
    parentId: 'cms',
    lowestPrice: 4999,
    highestPrice: 10000
  },
  {
    id: 'blogSystem',
    title: 'wizard.config.subTypes.blogSystem.title',
    description: 'wizard.config.subTypes.blogSystem.description',
    parentId: 'cms',
    lowestPrice: 3999,
    highestPrice: 7999
  },
  {
    id: 'headlessCms',
    title: 'wizard.config.subTypes.headlessCms.title',
    description: 'wizard.config.subTypes.headlessCms.description',
    parentId: 'cms',
    lowestPrice: 5999,
    highestPrice: 10000
  },
  {
    id: 'pwa',
    title: 'wizard.config.subTypes.pwa.title',
    description: 'wizard.config.subTypes.pwa.description',
    parentId: 'webApplication',
    lowestPrice: 5999,
    highestPrice: 15000
  },
  {
    id: 'customApp',
    title: 'wizard.config.subTypes.customApp.title',
    description: 'wizard.config.subTypes.customApp.description',
    parentId: 'webApplication',
    lowestPrice: 5999,
    highestPrice: 15000
  },
  {
    id: 'apiIntegration',
    title: 'wizard.config.subTypes.apiIntegration.title',
    description: 'wizard.config.subTypes.apiIntegration.description',
    parentId: 'webApplication',
    lowestPrice: 3999,
    highestPrice: 8999
  },
  // AI Use Case Subtypes
  {
    id: 'aiConsulting',
    title: 'wizard.config.subTypes.aiConsulting.title',
    description: 'wizard.config.subTypes.aiConsulting.description',
    parentId: 'artificialIntelligence',
    lowestPrice: 5000,
    highestPrice: 50000
  },
  {
    id: 'aiWorkflows',
    title: 'wizard.config.subTypes.aiWorkflows.title',
    description: 'wizard.config.subTypes.aiWorkflows.description',
    parentId: 'artificialIntelligence',
    lowestPrice: 10000,
    highestPrice: 50000
  },
  {
    id: 'aiAgents',
    title: 'wizard.config.subTypes.aiAgents.title',
    description: 'wizard.config.subTypes.aiAgents.description',
    parentId: 'artificialIntelligence',
    lowestPrice: 10000,
    highestPrice: 50000
  },
  {
    id: 'aiIndividual',
    title: 'wizard.config.subTypes.aiIndividual.title',
    description: 'wizard.config.subTypes.aiIndividual.description',
    parentId: 'artificialIntelligence',
    lowestPrice: 20000,
    highestPrice: 50000
  }
];

export const availableFeatures: Feature[] = [
  // Kommunikation & Kontakt
  {
    name: 'kontaktformular',
    title: 'wizard.config.features.kontaktformular.title',
    description: 'wizard.config.features.kontaktformular.description',
    category: 'wizard.config.categories.kommunikation',
    complexityFactor: 3
  },
  {
    name: 'newsletterRegistrierung',
    title: 'wizard.config.features.newsletterRegistrierung.title',
    description: 'wizard.config.features.newsletterRegistrierung.description',
    category: 'wizard.config.categories.kommunikation',
    complexityFactor: 3
  },
  {
    name: 'chatbot',
    title: 'wizard.config.features.chatbot.title',
    description: 'wizard.config.features.chatbot.description',
    category: 'wizard.config.categories.kommunikation',
    complexityFactor: 3
  },
  {
    name: 'terminbuchung',
    title: 'wizard.config.features.terminbuchung.title',
    description: 'wizard.config.features.terminbuchung.description',
    category: 'wizard.config.categories.kommunikation',
    complexityFactor: 3
  },

  // Content & Medien
  {
    name: 'bildergalerie',
    title: 'wizard.config.features.bildergalerie.title',
    description: 'wizard.config.features.bildergalerie.description',
    category: 'wizard.config.categories.content',
    complexityFactor: 3
  },
  {
    name: 'videoEmbedding',
    title: 'wizard.config.features.videoEmbedding.title',
    description: 'wizard.config.features.videoEmbedding.description',
    category: 'wizard.config.categories.content',
    complexityFactor: 3
  },
  {
    name: 'portfolioGrid',
    title: 'wizard.config.features.portfolioGrid.title',
    description: 'wizard.config.features.portfolioGrid.description',
    category: 'wizard.config.categories.content',
    complexityFactor: 3
  },
  {
    name: 'kalender',
    title: 'wizard.config.features.kalender.title',
    description: 'wizard.config.features.kalender.description',
    category: 'wizard.config.categories.content',
    complexityFactor: 3
  },
  {
    name: 'dateiupload',
    title: 'wizard.config.features.dateiupload.title',
    description: 'wizard.config.features.dateiupload.description',
    category: 'wizard.config.categories.content',
    complexityFactor: 3
  },

  // Navigation & UI
  {
    name: 'megaMenu',
    title: 'wizard.config.features.megaMenu.title',
    description: 'wizard.config.features.megaMenu.description',
    category: 'wizard.config.categories.navigation',
    complexityFactor: 3
  },
  {
    name: 'customTeaser',
    title: 'wizard.config.features.customTeaser.title',
    description: 'wizard.config.features.customTeaser.description',
    category: 'wizard.config.categories.navigation',
    complexityFactor: 3
  },
  {
    name: 'customCarousel',
    title: 'wizard.config.features.customCarousel.title',
    description: 'wizard.config.features.customCarousel.description',
    category: 'wizard.config.categories.navigation',
    complexityFactor: 3
  },
  {
    name: 'akkordeon',
    title: 'wizard.config.features.akkordeon.title',
    description: 'wizard.config.features.akkordeon.description',
    category: 'wizard.config.categories.navigation',
    complexityFactor: 3
  },
  {
    name: 'tabs',
    title: 'wizard.config.features.tabs.title',
    description: 'wizard.config.features.tabs.description',
    category: 'wizard.config.categories.navigation',
    complexityFactor: 3
  },
  {
    name: 'themeSwitcher',
    title: 'wizard.config.features.themeSwitcher.title',
    description: 'wizard.config.features.themeSwitcher.description',
    category: 'wizard.config.categories.navigation',
    complexityFactor: 3
  },

  // Funktionalität & Tools
  {
    name: 'suchfunktion',
    title: 'wizard.config.features.suchfunktion.title',
    description: 'wizard.config.features.suchfunktion.description',
    category: 'wizard.config.categories.funktionalitaet',
    complexityFactor: 3
  },
  {
    name: 'customFilter',
    title: 'wizard.config.features.customFilter.title',
    description: 'wizard.config.features.customFilter.description',
    category: 'wizard.config.categories.funktionalitaet',
    complexityFactor: 3
  },
  {
    name: 'multiStepDialog',
    title: 'wizard.config.features.multiStepDialog.title',
    description: 'wizard.config.features.multiStepDialog.description',
    category: 'wizard.config.categories.funktionalitaet',
    complexityFactor: 3
  },
  {
    name: 'konfigurator',
    title: 'wizard.config.features.konfigurator.title',
    description: 'wizard.config.features.konfigurator.description',
    category: 'wizard.config.categories.funktionalitaet',
    complexityFactor: 3
  },
  {
    name: 'assistent',
    title: 'wizard.config.features.assistent.title',
    description: 'wizard.config.features.assistent.description',
    category: 'wizard.config.categories.funktionalitaet',
    complexityFactor: 3
  },
  {
    name: 'bewertungsmechanismus',
    title: 'wizard.config.features.bewertungsmechanismus.title',
    description: 'wizard.config.features.bewertungsmechanismus.description',
    category: 'wizard.config.categories.funktionalitaet',
    complexityFactor: 3
  },

  // E-Commerce & Zahlungen
  {
    name: 'zahlungsbawicklung',
    title: 'wizard.config.features.zahlungsbawicklung.title',
    description: 'wizard.config.features.zahlungsbawicklung.description',
    category: 'wizard.config.categories.ecommerce',
    complexityFactor: 3
  },

  // Benutzer & Sicherheit
  {
    name: 'benutzerkonten',
    title: 'wizard.config.features.benutzerkonten.title',
    description: 'wizard.config.features.benutzerkonten.description',
    category: 'wizard.config.categories.benutzer',
    complexityFactor: 3
  },
  {
    name: 'altersverifikation',
    title: 'wizard.config.features.altersverifikation.title',
    description: 'wizard.config.features.altersverifikation.description',
    category: 'wizard.config.categories.benutzer',
    complexityFactor: 3
  },
  {
    name: 'cookieConsent',
    title: 'wizard.config.features.cookieConsent.title',
    description: 'wizard.config.features.cookieConsent.description',
    category: 'wizard.config.categories.benutzer',
    complexityFactor: 3
  },
  {
    name: 'barrierefreiheitTools',
    title: 'wizard.config.features.barrierefreiheitTools.title',
    description: 'wizard.config.features.barrierefreiheitTools.description',
    category: 'wizard.config.categories.benutzer',
    complexityFactor: 3
  },

  // Integration & Services
  {
    name: 'mapsIntegration',
    title: 'wizard.config.features.mapsIntegration.title',
    description: 'wizard.config.features.mapsIntegration.description',
    category: 'wizard.config.categories.integration',
    complexityFactor: 3
  },
  {
    name: 'socialMediaIntegration',
    title: 'wizard.config.features.socialMediaIntegration.title',
    description: 'wizard.config.features.socialMediaIntegration.description',
    category: 'wizard.config.categories.integration',
    complexityFactor: 3
  },
  {
    name: 'analyticsIntegration',
    title: 'wizard.config.features.analyticsIntegration.title',
    description: 'wizard.config.features.analyticsIntegration.description',
    category: 'wizard.config.categories.integration',
    complexityFactor: 3
  },

  // Marketing & SEO
  {
    name: 'seo',
    title: 'wizard.config.features.seo.title',
    description: 'wizard.config.features.seo.description',
    category: 'wizard.config.categories.marketing',
    complexityFactor: 3
  },
  {
    name: 'marketingTools',
    title: 'wizard.config.features.marketingTools.title',
    description: 'wizard.config.features.marketingTools.description',
    category: 'wizard.config.categories.marketing',
    complexityFactor: 3
  },

  // Lokalisierung
  {
    name: 'mehrsprachigkeit',
    title: 'wizard.config.features.mehrsprachigkeit.title',
    description: 'wizard.config.features.mehrsprachigkeit.description',
    category: 'wizard.config.categories.lokalisierung',
    complexityFactor: 3
  }
];

// Feature category colors for badges
export const featureCategoryColors: Record<string, string> = {
  'wizard.config.categories.kommunikation': 'badge-primary',
  'wizard.config.categories.content': 'badge-secondary',
  'wizard.config.categories.navigation': 'badge-accent',
  'wizard.config.categories.funktionalitaet': 'badge-info',
  'wizard.config.categories.ecommerce': 'badge-success',
  'wizard.config.categories.benutzer': 'badge-warning',
  'wizard.config.categories.integration': 'badge-error',
  'wizard.config.categories.marketing': 'badge-neutral',
  'wizard.config.categories.lokalisierung': 'badge-ghost'
};

export const googleFonts: string[] = [
  'Anton',
  'Arimo',
  'Bebas Neue',
  'Dancing Script',
  'Encode Sans',
  'Fjalla One',
  'Inconsolata',
  'Josefin Sans',
  'Lato',
  'Libre Baskerville',
  'Merriweather',
  'Montserrat',
  'Mukta',
  'Noto Sans',
  'Nunito',
  'Open Sans',
  'Oswald',
  'PT Sans',
  'Playfair Display',
  'Poppins',
  'Quicksand',
  'Raleway',
  'Roboto',
  'Roboto Condensed',
  'Rubik',
  'Slabo 27px',
  'Source Sans Pro',
  'Titillium Web',
  'Ubuntu',
  'Work Sans'
];

export const formFieldTypes: FormFieldType[] = [
  { id: 'text', title: 'wizard.config.formFieldTypes.text' },
  { id: 'email', title: 'wizard.config.formFieldTypes.email' },
  { id: 'phone', title: 'wizard.config.formFieldTypes.phone' },
  { id: 'textarea', title: 'wizard.config.formFieldTypes.textarea' },
  { id: 'select', title: 'wizard.config.formFieldTypes.select' },
  { id: 'checkbox', title: 'wizard.config.formFieldTypes.checkbox' },
  { id: 'radio', title: 'wizard.config.formFieldTypes.radio' },
  { id: 'file', title: 'wizard.config.formFieldTypes.file' },
  { id: 'date', title: 'wizard.config.formFieldTypes.date' },
  { id: 'number', title: 'wizard.config.formFieldTypes.number' },
];

// Step Configuration Interface
export interface WizardStep {
  id: number;
  title: string;
  required: boolean;
}

// Dynamic step configuration function
export function getStepConfig(projectType: string): WizardStep[] {
  const baseSteps: WizardStep[] = [{ id: 1, title: 'wizard.config.steps.projekttyp', required: true }];

  if (projectType === 'website' || projectType === 'cms') {
    return [
      ...baseSteps,
      { id: 2, title: 'wizard.config.steps.details', required: true },
      { id: 3, title: 'wizard.config.steps.beschreibung', required: false },
      { id: 4, title: 'wizard.config.steps.features', required: false },
      { id: 5, title: 'wizard.config.steps.inhalte', required: false },
      { id: 6, title: 'wizard.config.steps.materialien', required: false },
      { id: 7, title: 'wizard.config.steps.ergebnis', required: false }
    ];
  } else if (projectType === 'webApplication') {
    return [
      ...baseSteps,
      { id: 2, title: 'wizard.config.steps.details', required: true },
      { id: 3, title: 'wizard.config.steps.beschreibung', required: false },
      { id: 4, title: 'wizard.config.steps.features', required: false },
      { id: 5, title: 'wizard.config.steps.materialien', required: false },
      { id: 6, title: 'wizard.config.steps.ergebnis', required: false }
    ];
  } else if (projectType === 'artificialIntelligence') {
    return [
      ...baseSteps,
      { id: 2, title: 'wizard.config.steps.details', required: true },
      { id: 3, title: 'wizard.config.steps.beschreibung', required: false },
      { id: 4, title: 'wizard.config.steps.materialien', required: false },
      { id: 5, title: 'wizard.config.steps.ergebnis', required: false }
    ];
  } else if (projectType === 'freestyle') {
    return [
      ...baseSteps,
      { id: 2, title: 'wizard.config.steps.beschreibung', required: false },
      { id: 3, title: 'wizard.config.steps.materialien', required: false },
      { id: 4, title: 'wizard.config.steps.ergebnis', required: false }
    ];
  } else {
    // Default fallback
    return [
      ...baseSteps,
      { id: 2, title: 'wizard.config.steps.details', required: true },
      { id: 3, title: 'wizard.config.steps.beschreibung', required: false },
      { id: 4, title: 'wizard.config.steps.materialien', required: false },
      { id: 5, title: 'wizard.config.steps.ergebnis', required: false }
    ];
  }
}
