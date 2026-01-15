export interface ProjectCategory {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

export interface ProjectType {
  id: string;
  title: string;
  description: string;
  icon?: string;
  parentId?: string;
  lowestPrice?: number;
}

export interface Feature {
  id: string;
  title: string;
  description?: string;
  category?: string;
  complexityFactor?: number;
}

export interface FormFieldType {
  id: string;
  title: string;
}

export interface WizardStep {
  id: number;
  title: string;
  required: boolean;
}

export const projectCategories: ProjectCategory[] = [
  {
    id: 'websites-and-apps',
    title: 'wizard.categories.websitesAndApps',
    description: 'wizard.categories.websitesAndApps.description',
    icon: '🛫',
  },
  {
    id: 'ki-and-freestyle',
    title: 'wizard.categories.kiAndFreestyle',
    description: 'wizard.categories.kiAndFreestyle.description',
    icon: '🦄',
  }
];

export const projectTypesWebApp: ProjectType[] = [
  {
    id: 'website',
    title: 'wizard.type.website',
    description: 'wizard.type.website.description',
    icon: '🖥️',
    lowestPrice: 399
  },
  {
    id: 'app',
    title: 'wizard.type.app',
    description: 'wizard.type.app.description',
    icon: '🚀',
    lowestPrice: 3000
  }
];

export const projectTypesAiFreestyle: ProjectType[] = [
  {
    id: 'aiSolution',
    title: 'wizard.type.aiSolution',
    description: 'wizard.type.aiSolution.description',
    icon: '🤖',
    lowestPrice: 5000
  },
  {
    id: 'freestyle',
    title: 'wizard.type.freestyle',
    description: 'wizard.type.freestyle.description',
    icon: '⚗️',
    lowestPrice: 3000
  }
];

export const projectSubTypesWebsite: ProjectType[] = [
  {
    id: 'onepager',
    title: 'wizard.subTypes.onepager',
    description: 'wizard.subTypes.onepager.description',
    lowestPrice: 399,
  },
  {
    id: 'onepagerPlus',
    title: 'wizard.subTypes.onepagerPlus',
    description: 'wizard.subTypes.onepagerPlus.description',
    lowestPrice: 699
  },
  {
    id: 'corporateWebsite',
    title: 'wizard.subTypes.corporateWebsite',
    description: 'wizard.subTypes.corporateWebsite.description',
    lowestPrice: 999
  },
  {
    id: 'corporateWebsitePlus',
    title: 'wizard.subTypes.corporateWebsitePlus',
    description: 'wizard.subTypes.corporateWebsitePlus.description',
    lowestPrice: 1999
  },
  {
    id: 'cms',
    title: 'wizard.subTypes.cms',
    description: 'wizard.subTypes.cms.description',
    lowestPrice: 1999
  },
  {
    id: 'cmsPlus',
    title: 'wizard.subTypes.cmsPlus',
    description: 'wizard.subTypes.cmsPlus.description',
    lowestPrice: 4999
  }
];

export const projectSubTypesApp: ProjectType[] = [
  {
    id: 'webApp',
    title: 'wizard.subTypes.webApp',
    description: 'wizard.subTypes.webApp.description',
    lowestPrice: 4999,
  },
  {
    id: 'pwaSimple',
    title: 'wizard.subTypes.pwaSimple',
    description: 'wizard.subTypes.pwaSimple.description',
    lowestPrice: 1999
  },
  {
    id: 'pwaExtended',
    title: 'wizard.subTypes.pwaExtended',
    description: 'wizard.subTypes.pwaExtended.description',
    lowestPrice: 5999
  },
  {
    id: 'individualApp',
    title: 'wizard.subTypes.individualApp',
    description: 'wizard.subTypes.individualApp.description',
    lowestPrice: 5999
  }
];

export const projectSubTypesAi: ProjectType[] = [
  {
    id: 'aiConsulting',
    title: 'wizard.subTypes.aiConsulting',
    description: 'wizard.subTypes.aiConsulting.description',
    lowestPrice: 3000,
  },
  {
    id: 'agenticAi',
    title: 'wizard.subTypes.agenticAi',
    description: 'wizard.subTypes.agenticAi.description',
    lowestPrice: 3000
  },
  {
    id: 'generativeAi',
    title: 'wizard.subTypes.generativeAi',
    description: 'wizard.subTypes.generativeAi.description',
    lowestPrice: 3000
  },
  {
    id: 'bots',
    title: 'wizard.subTypes.bots',
    description: 'wizard.subTypes.bots.description',
    lowestPrice: 5000
  },
  {
    id: 'workflowAutomation',
    title: 'wizard.subTypes.workflowAutomation',
    description: 'wizard.subTypes.workflowAutomation.description',
    lowestPrice: 5000
  },
  {
    id: 'individualAi',
    title: 'wizard.subTypes.individualAi',
    description: 'wizard.subTypes.individualAi.description',
    lowestPrice: 5000
  }
];

export const projectSubTypesFreestyle: ProjectType[] = [
  {
    id: 'individualConsulting',
    title: 'wizard.subTypes.individualConsulting',
    description: 'wizard.subTypes.individualConsulting.description',
    lowestPrice: 3000,
  },
  {
    id: 'fullDevelopment',
    title: 'wizard.subTypes.fullDevelopment',
    description: 'wizard.subTypes.fullDevelopment.description',
    lowestPrice: 15000
  },
  {
    id: 'partDevelopment',
    title: 'wizard.subTypes.partDevelopment',
    description: 'wizard.subTypes.partDevelopment.description',
    lowestPrice: 3000
  }
];

export const availableFeatures: Feature[] = [
  // Kommunikation
  {
    id: 'contactForm',
    title: 'wizard.features.contactForm.title',
    description: 'wizard.features.contactForm.description',
    category: 'communication',
    complexityFactor: 3
  },
  {
    id: 'newsletterRegistration',
    title: 'wizard.features.newsletterRegistration.title',
    description: 'wizard.features.newsletterRegistration.description',
    category: 'communication',
    complexityFactor: 3
  },
  {
    id: 'chatbot',
    title: 'wizard.features.chatbot.title',
    description: 'wizard.features.chatbot.description',
    category: 'communication',
    complexityFactor: 3
  },
  {
    id: 'voicebot',
    title: 'wizard.features.voicebot.title',
    description: 'wizard.features.voicebot.description',
    category: 'communication',
    complexityFactor: 3
  },
  {
    id: 'appointments',
    title: 'wizard.features.appointments.title',
    description: 'wizard.features.appointments.description',
    category: 'communication',
    complexityFactor: 3
  },

  // Content & Medien
  {
    id: 'imageGallery',
    title: 'wizard.features.imageGallery.title',
    description: 'wizard.features.imageGallery.description',
    category: 'content',
    complexityFactor: 3
  },
  {
    id: 'videoEmbedding',
    title: 'wizard.features.videoEmbedding.title',
    description: 'wizard.features.videoEmbedding.description',
    category: 'content',
    complexityFactor: 3
  },
  {
    id: 'portfolioGrid',
    title: 'wizard.features.portfolioGrid.title',
    description: 'wizard.features.portfolioGrid.description',
    category: 'content',
    complexityFactor: 3
  },
  {
    id: 'calendar',
    title: 'wizard.features.calendar.title',
    description: 'wizard.features.calendar.description',
    category: 'content',
    complexityFactor: 3
  },
  {
    id: 'fileUpload',
    title: 'wizard.features.fileUpload.title',
    description: 'wizard.features.fileUpload.description',
    category: 'content',
    complexityFactor: 3
  },

  // Navigation & UI
  {
    id: 'megaMenu',
    title: 'wizard.features.megaMenu.title',
    description: 'wizard.features.megaMenu.description',
    category: 'navigation',
    complexityFactor: 3
  },
  {
    id: 'customTeaser',
    title: 'wizard.features.customTeaser.title',
    description: 'wizard.features.customTeaser.description',
    category: 'navigation',
    complexityFactor: 3
  },
  {
    id: 'customCarousel',
    title: 'wizard.features.customCarousel.title',
    description: 'wizard.features.customCarousel.description',
    category: 'navigation',
    complexityFactor: 3
  },
  {
    id: 'accordeon',
    title: 'wizard.features.accordeon.title',
    description: 'wizard.features.accordeon.description',
    category: 'navigation',
    complexityFactor: 3
  },
  {
    id: 'tabs',
    title: 'wizard.features.tabs.title',
    description: 'wizard.features.tabs.description',
    category: 'navigation',
    complexityFactor: 3
  },
  {
    id: 'themeSwitcher',
    title: 'wizard.features.themeSwitcher.title',
    description: 'wizard.features.themeSwitcher.description',
    category: 'navigation',
    complexityFactor: 3
  },

  // Funktionalität & Tools
  {
    id: 'search',
    title: 'wizard.features.search.title',
    description: 'wizard.features.search.description',
    category: 'functionality',
    complexityFactor: 3
  },
  {
    id: 'customFilter',
    title: 'wizard.features.customFilter.title',
    description: 'wizard.features.customFilter.description',
    category: 'functionality',
    complexityFactor: 3
  },
  {
    id: 'multiStepDialog',
    title: 'wizard.features.multiStepDialog.title',
    description: 'wizard.features.multiStepDialog.description',
    category: 'functionality',
    complexityFactor: 3
  },
  {
    id: 'configurator',
    title: 'wizard.features.configurator.title',
    description: 'wizard.features.configurator.description',
    category: 'functionality',
    complexityFactor: 3
  },
  {
    id: 'assistant',
    title: 'wizard.features.assistant.title',
    description: 'wizard.features.assistant.description',
    category: 'functionality',
    complexityFactor: 3
  },
  {
    id: 'rating',
    title: 'wizard.features.rating.title',
    description: 'wizard.features.rating.description',
    category: 'functionality',
    complexityFactor: 3
  },

  // E-Commerce & Zahlungen
  {
    id: 'payment',
    title: 'wizard.features.payment.title',
    description: 'wizard.features.payment.description',
    category: 'ecommerce',
    complexityFactor: 3
  },

  // Benutzer & Sicherheit
  {
    id: 'userAccounts',
    title: 'wizard.features.userAccounts.title',
    description: 'wizard.features.userAccounts.description',
    category: 'users',
    complexityFactor: 3
  },
  {
    id: 'ageVerification',
    title: 'wizard.features.ageVerification.title',
    description: 'wizard.features.ageVerification.description',
    category: 'users',
    complexityFactor: 3
  },
  {
    id: 'cookieConsent',
    title: 'wizard.features.cookieConsent.title',
    description: 'wizard.features.cookieConsent.description',
    category: 'users',
    complexityFactor: 3
  },
  {
    id: 'accessibility',
    title: 'wizard.features.accessibility.title',
    description: 'wizard.features.accessibility.description',
    category: 'users',
    complexityFactor: 3
  },

  // Integration & Services
  {
    id: 'mapsIntegration',
    title: 'wizard.features.mapsIntegration.title',
    description: 'wizard.features.mapsIntegration.description',
    category: 'integration',
    complexityFactor: 3
  },
  {
    id: 'socialMediaIntegration',
    title: 'wizard.features.socialMediaIntegration.title',
    description: 'wizard.features.socialMediaIntegration.description',
    category: 'integration',
    complexityFactor: 3
  },
  {
    id: 'analyticsIntegration',
    title: 'wizard.features.analyticsIntegration.title',
    description: 'wizard.features.analyticsIntegration.description',
    category: 'integration',
    complexityFactor: 3
  },

  // Marketing & SEO
  {
    id: 'seo',
    title: 'wizard.features.seo.title',
    description: 'wizard.features.seo.description',
    category: 'marketing',
    complexityFactor: 3
  },
  {
    id: 'marketingTools',
    title: 'wizard.features.marketingTools.title',
    description: 'wizard.features.marketingTools.description',
    category: 'marketing',
    complexityFactor: 3
  },

  // Lokalisierung
  {
    id: 'localization',
    title: 'wizard.features.localization.title',
    description: 'wizard.features.localization.description',
    category: 'localization',
    complexityFactor: 3
  },

  // Special Features
  {
    id: 'virtualTour',
    title: 'wizard.features.virtualTour.title',
    description: 'wizard.features.virtualTour.description',
    category: 'specialFeatures',
    complexityFactor: 3
  }
];

export const featureCategoryColors: Record<string, string> = {
  'communication': 'badge-primary',
  'content': 'badge-secondary',
  'navigation': 'badge-accent',
  'functionality': 'badge-info',
  'ecommerce': 'badge-success',
  'users': 'badge-warning',
  'integration': 'badge-error',
  'marketing': 'badge-neutral',
  'localization': 'badge-ghost',
  'specialFeatures': 'badge-soft'
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
  { id: 'text', title: 'wizard.formFieldTypes.text' },
  { id: 'email', title: 'wizard.formFieldTypes.email' },
  { id: 'phone', title: 'wizard.formFieldTypes.phone' },
  { id: 'textarea', title: 'wizard.formFieldTypes.textarea' },
  { id: 'select', title: 'wizard.formFieldTypes.select' },
  { id: 'checkbox', title: 'wizard.formFieldTypes.checkbox' },
  { id: 'radio', title: 'wizard.formFieldTypes.radio' },
  { id: 'file', title: 'wizard.formFieldTypes.file' },
  { id: 'date', title: 'wizard.formFieldTypes.date' },
  { id: 'number', title: 'wizard.formFieldTypes.number' },
];

// Dynamic step configuration function EXTENDED!!!
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
