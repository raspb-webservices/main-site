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
  basePrice?: number;
}

export interface Feature {
  id: string;
  title: string;
  description?: string;
  category?: string;
  basePrice?: number;
  isSideProject?: boolean;
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
    title: 'wizard_categories_websitesAndApps',
    description: 'wizard_categories_websitesAndApps_description',
    icon: '🛫'
  },
  {
    id: 'ki-and-freestyle',
    title: 'wizard_categories_kiAndFreestyle',
    description: 'wizard_categories_kiAndFreestyle_description',
    icon: '🦄'
  }
];

export const projectTypesWebApp: ProjectType[] = [
  {
    id: 'website',
    title: 'wizard_type_website',
    description: 'wizard_type_website_description',
    icon: '🖥️',
    basePrice: 399
  },
  {
    id: 'app',
    title: 'wizard_type_app',
    description: 'wizard_type_app_description',
    icon: '🚀',
    basePrice: 3000
  }
];

export const projectTypesAiFreestyle: ProjectType[] = [
  {
    id: 'aiSolution',
    title: 'wizard_type_aiSolution',
    description: 'wizard_type_aiSolution_description',
    icon: '🤖',
    basePrice: 5000
  },
  {
    id: 'freestyle',
    title: 'wizard_type_freestyle',
    description: 'wizard_type_freestyle_description',
    icon: '⚗️',
    basePrice: 3000
  }
];

export const projectSubTypesWebsite: ProjectType[] = [
  {
    id: 'onepager',
    title: 'wizard_subTypes_onepager',
    description: 'wizard_subTypes_onepager_description',
    basePrice: 399
  },
  {
    id: 'onepagerPlus',
    title: 'wizard_subTypes_onepagerPlus',
    description: 'wizard_subTypes_onepagerPlus_description',
    basePrice: 699
  },
  {
    id: 'corporateWebsite',
    title: 'wizard_subTypes_corporateWebsite',
    description: 'wizard_subTypes_corporateWebsite_description',
    basePrice: 999
  },
  {
    id: 'corporateWebsitePlus',
    title: 'wizard_subTypes_corporateWebsitePlus',
    description: 'wizard_subTypes_corporateWebsitePlus_description',
    basePrice: 1999
  },
  {
    id: 'cms',
    title: 'wizard_subTypes_cms',
    description: 'wizard_subTypes_cms_description',
    basePrice: 1999
  },
  {
    id: 'cmsPlus',
    title: 'wizard_subTypes_cmsPlus',
    description: 'wizard_subTypes_cmsPlus_description',
    basePrice: 4999
  }
];

export const projectSubTypesApp: ProjectType[] = [
  {
    id: 'webApp',
    title: 'wizard_subTypes_webApp',
    description: 'wizard_subTypes_webApp_description',
    basePrice: 4999
  },
  {
    id: 'pwaSimple',
    title: 'wizard_subTypes_pwaSimple',
    description: 'wizard_subTypes_pwaSimple_description',
    basePrice: 1999
  },
  {
    id: 'pwaExtended',
    title: 'wizard_subTypes_pwaExtended',
    description: 'wizard_subTypes_pwaExtended_description',
    basePrice: 5999
  },
  {
    id: 'individualApp',
    title: 'wizard_subTypes_individualApp',
    description: 'wizard_subTypes_individualApp_description',
    basePrice: 5999
  }
];

export const projectSubTypesAi: ProjectType[] = [
  {
    id: 'aiConsulting',
    title: 'wizard_subTypes_aiConsulting',
    description: 'wizard_subTypes_aiConsulting_description',
    basePrice: 3000
  },
  {
    id: 'agenticAi',
    title: 'wizard_subTypes_agenticAi',
    description: 'wizard_subTypes_agenticAi_description',
    basePrice: 3000
  },
  {
    id: 'generativeAi',
    title: 'wizard_subTypes_generativeAi',
    description: 'wizard_subTypes_generativeAi_description',
    basePrice: 3000
  },
  {
    id: 'bots',
    title: 'wizard_subTypes_bots',
    description: 'wizard_subTypes_bots_description',
    basePrice: 5000
  },
  {
    id: 'workflowAutomation',
    title: 'wizard_subTypes_workflowAutomation',
    description: 'wizard_subTypes_workflowAutomation_description',
    basePrice: 5000
  },
  {
    id: 'individualAi',
    title: 'wizard_subTypes_individualAi',
    description: 'wizard_subTypes_individualAi_description',
    basePrice: 5000
  }
];

export const projectSubTypesFreestyle: ProjectType[] = [
  {
    id: 'individualConsulting',
    title: 'wizard_subTypes_individualConsulting',
    description: 'wizard_subTypes_individualConsulting_description',
    basePrice: 3000
  },
  {
    id: 'fullDevelopment',
    title: 'wizard_subTypes_fullDevelopment',
    description: 'wizard_subTypes_fullDevelopment_description',
    basePrice: 15000
  },
  {
    id: 'partDevelopment',
    title: 'wizard_subTypes_partDevelopment',
    description: 'wizard_subTypes_partDevelopment_description',
    basePrice: 3000
  }
];

export const availableFeatures: Feature[] = [
  // Kommunikation
  {
    id: 'contactForm',
    title: 'wizard_features_contactForm_title',
    description: 'wizard_features_contactForm_description',
    category: 'communication',
    basePrice: 300,
    isSideProject: false
  },
  {
    id: 'newsletterRegistration',
    title: 'wizard_features_newsletterRegistration_title',
    description: 'wizard_features_newsletterRegistration_description',
    category: 'communication',
    basePrice: 150,
    isSideProject: false
  },
  {
    id: 'chatbot',
    title: 'wizard_features_chatbot_title',
    description: 'wizard_features_chatbot_description',
    category: 'communication',
    basePrice: 0,
    isSideProject: true
  },
  {
    id: 'voicebot',
    title: 'wizard_features_voicebot_title',
    description: 'wizard_features_voicebot_description',
    category: 'communication',
    basePrice: 0,
    isSideProject: true
  },
  {
    id: 'appointments',
    title: 'wizard_features_appointments_title',
    description: 'wizard_features_appointments_description',
    category: 'communication',
    basePrice: 300,
    isSideProject: false
  },

  // Content & Medien
  {
    id: 'imageGallery',
    title: 'wizard_features_imageGallery_title',
    description: 'wizard_features_imageGallery_description',
    category: 'content',
    basePrice: 300,
    isSideProject: false
  },
  {
    id: 'videoEmbedding',
    title: 'wizard_features_videoEmbedding_title',
    description: 'wizard_features_videoEmbedding_description',
    category: 'content',
    basePrice: 100,
    isSideProject: false
  },
  {
    id: 'portfolioGrid',
    title: 'wizard_features_portfolioGrid_title',
    description: 'wizard_features_portfolioGrid_description',
    category: 'content',
    basePrice: 300,
    isSideProject: false
  },
  {
    id: 'calendar',
    title: 'wizard_features_calendar_title',
    description: 'wizard_features_calendar_description',
    category: 'content',
    basePrice: 300,
    isSideProject: false
  },
  {
    id: 'fileUpload',
    title: 'wizard_features_fileUpload_title',
    description: 'wizard_features_fileUpload_description',
    category: 'content',
    basePrice: 300,
    isSideProject: false
  },

  // Navigation & UI
  {
    id: 'megaMenu',
    title: 'wizard_features_megaMenu_title',
    description: 'wizard_features_megaMenu_description',
    category: 'navigation',
    basePrice: 200,
    isSideProject: false
  },
  {
    id: 'customTeaser',
    title: 'wizard_features_customTeaser_title',
    description: 'wizard_features_customTeaser_description',
    category: 'navigation',
    basePrice: 150,
    isSideProject: false
  },
  {
    id: 'customCarousel',
    title: 'wizard_features_customCarousel_title',
    description: 'wizard_features_customCarousel_description',
    category: 'navigation',
    basePrice: 150,
    isSideProject: false
  },
  {
    id: 'accordeon',
    title: 'wizard_features_accordeon_title',
    description: 'wizard_features_accordeon_description',
    category: 'navigation',
    basePrice: 50,
    isSideProject: false
  },
  {
    id: 'tabs',
    title: 'wizard_features_tabs_title',
    description: 'wizard_features_tabs_description',
    category: 'navigation',
    basePrice: 50,
    isSideProject: false
  },
  {
    id: 'themeSwitcher',
    title: 'wizard_features_themeSwitcher_title',
    description: 'wizard_features_themeSwitcher_description',
    category: 'navigation',
    basePrice: 150,
    isSideProject: false
  },

  // Funktionalität & Tools
  {
    id: 'search',
    title: 'wizard_features_search_title',
    description: 'wizard_features_search_description',
    category: 'functionality',
    basePrice: 0,
    isSideProject: true
  },
  {
    id: 'customFilter',
    title: 'wizard_features_customFilter_title',
    description: 'wizard_features_customFilter_description',
    category: 'functionality',
    basePrice: 350,
    isSideProject: false
  },
  {
    id: 'multiStepDialog',
    title: 'wizard_features_multiStepDialog_title',
    description: 'wizard_features_multiStepDialog_description',
    category: 'functionality',
    basePrice: 350,
    isSideProject: false
  },
  {
    id: 'configurator',
    title: 'wizard_features_configurator_title',
    description: 'wizard_features_configurator_description',
    category: 'functionality',
    basePrice: 500,
    isSideProject: false
  },
  {
    id: 'assistant',
    title: 'wizard_features_assistant_title',
    description: 'wizard_features_assistant_description',
    category: 'functionality',
    basePrice: 0,
    isSideProject: true
  },
  {
    id: 'rating',
    title: 'wizard_features_rating_title',
    description: 'wizard_features_rating_description',
    category: 'functionality',
    basePrice: 300,
    isSideProject: false
  },

  // E-Commerce & Zahlungen
  {
    id: 'payment',
    title: 'wizard_features_payment_title',
    description: 'wizard_features_payment_description',
    category: 'ecommerce',
    basePrice: 0,
    isSideProject: true
  },

  // Benutzer & Sicherheit
  {
    id: 'userAccounts',
    title: 'wizard_features_userAccounts_title',
    description: 'wizard_features_userAccounts_description',
    category: 'users',
    basePrice: 0,
    isSideProject: true
  },
  {
    id: 'ageVerification',
    title: 'wizard_features_ageVerification_title',
    description: 'wizard_features_ageVerification_description',
    category: 'users',
    basePrice: 100,
    isSideProject: false
  },
  {
    id: 'cookieConsent',
    title: 'wizard_features_cookieConsent_title',
    description: 'wizard_features_cookieConsent_description',
    category: 'users',
    basePrice: 0,
    isSideProject: false
  },
  {
    id: 'accessibility',
    title: 'wizard_features_accessibility_title',
    description: 'wizard_features_accessibility_description',
    category: 'users',
    basePrice: 0,
    isSideProject: true
  },

  // Integration & Services
  {
    id: 'mapsIntegration',
    title: 'wizard_features_mapsIntegration_title',
    description: 'wizard_features_mapsIntegration_description',
    category: 'integration',
    basePrice: 300,
    isSideProject: false
  },
  {
    id: 'socialMediaIntegration',
    title: 'wizard_features_socialMediaIntegration_title',
    description: 'wizard_features_socialMediaIntegration_description',
    category: 'integration',
    basePrice: 300,
    isSideProject: false
  },
  {
    id: 'analyticsIntegration',
    title: 'wizard_features_analyticsIntegration_title',
    description: 'wizard_features_analyticsIntegration_description',
    category: 'integration',
    basePrice: 300,
    isSideProject: true
  },

  // Marketing & SEO
  {
    id: 'seo',
    title: 'wizard_features_seo_title',
    description: 'wizard_features_seo_description',
    category: 'marketing',
    basePrice: 0,
    isSideProject: true
  },
  {
    id: 'marketingTools',
    title: 'wizard_features_marketingTools_title',
    description: 'wizard_features_marketingTools_description',
    category: 'marketing',
    basePrice: 0,
    isSideProject: true
  },

  // Lokalisierung
  {
    id: 'localization',
    title: 'wizard_features_localization_title',
    description: 'wizard_features_localization_description',
    category: 'localization',
    basePrice: 300,
    isSideProject: false
  },

  // Special Features
  {
    id: 'virtualTour',
    title: 'wizard_features_virtualTour_title',
    description: 'wizard_features_virtualTour_description',
    category: 'specialFeatures',
    basePrice: 500,
    isSideProject: false
  }
];

export const featureCategoryColors: Record<string, string> = {
  communication: 'badge-primary',
  content: 'badge-secondary',
  navigation: 'badge-accent',
  functionality: 'badge-info',
  ecommerce: 'badge-success',
  users: 'badge-warning',
  integration: 'badge-error',
  marketing: 'badge-neutral',
  localization: 'badge-ghost',
  specialFeatures: 'badge-soft'
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
  { id: 'number', title: 'wizard.formFieldTypes.number' }
];

// Dynamic step configuration function EXTENDED!!!
export function getStepConfig(projectType: string): WizardStep[] {
  const baseSteps: WizardStep[] = [{ id: 1, title: 'wizard_config_steps_projekttyp', required: true }];

  if (projectType === 'website' || projectType === 'cms') {
    return [
      ...baseSteps,
      { id: 2, title: 'wizard_config_steps_details', required: true },
      { id: 3, title: 'wizard_config_steps_beschreibung', required: false },
      { id: 4, title: 'wizard_config_steps_features', required: false },
      { id: 5, title: 'wizard_config_steps_inhalte', required: false },
      { id: 6, title: 'wizard_config_steps_materialien', required: false },
      { id: 7, title: 'wizard_config_steps_ergebnis', required: false }
    ];
  } else if (projectType === 'webApplication') {
    return [
      ...baseSteps,
      { id: 2, title: 'wizard_config_steps_details', required: true },
      { id: 3, title: 'wizard_config_steps_beschreibung', required: false },
      { id: 4, title: 'wizard_config_steps_features', required: false },
      { id: 5, title: 'wizard_config_steps_materialien', required: false },
      { id: 6, title: 'wizard_config_steps_ergebnis', required: false }
    ];
  } else if (projectType === 'artificialIntelligence') {
    return [
      ...baseSteps,
      { id: 2, title: 'wizard_config_steps_details', required: true },
      { id: 3, title: 'wizard_config_steps_beschreibung', required: false },
      { id: 4, title: 'wizard_config_steps_materialien', required: false },
      { id: 5, title: 'wizard_config_steps_ergebnis', required: false }
    ];
  } else if (projectType === 'freestyle') {
    return [
      ...baseSteps,
      { id: 2, title: 'wizard_config_steps_beschreibung', required: false },
      { id: 3, title: 'wizard_config_steps_materialien', required: false },
      { id: 4, title: 'wizard_config_steps_ergebnis', required: false }
    ];
  } else {
    // Default fallback
    return [
      ...baseSteps,
      { id: 2, title: 'wizard_config_steps_details', required: true },
      { id: 3, title: 'wizard_config_steps_beschreibung', required: false },
      { id: 4, title: 'wizard_config_steps_materialien', required: false },
      { id: 5, title: 'wizard_config_steps_ergebnis', required: false }
    ];
  }
}
