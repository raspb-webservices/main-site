/**
 * Mapping von englischen Feature-IDs (aus wizard-config.ts)
 * zu deutschen Hygraph Enum-Werten
 */
export const featureMapping: Record<string, string> = {
  // Communication
  contactForm: 'kontaktformular',
  newsletterRegistration: 'newsletterRegistrierung',
  chatbot: 'chatbot',
  voicebot: 'voicebot', // FEHLT IN HYGRAPH - muss hinzugefügt werden!
  appointments: 'terminbuchung',

  // Content & Media
  imageGallery: 'bildergalerie',
  videoEmbedding: 'videoEmbedding',
  portfolioGrid: 'portfolioGrid',
  calendar: 'kalender',
  fileUpload: 'dateiupload',

  // Navigation & UI
  megaMenu: 'megaMenu',
  customTeaser: 'customTeaser',
  customCarousel: 'customCarousel',
  accordeon: 'akkordeon',
  tabs: 'tabs',
  themeSwitcher: 'themeSwitcher',

  // Functionality & Tools
  search: 'suchfunktion',
  customFilter: 'customFilter',
  multiStepDialog: 'multiStepDialog',
  configurator: 'konfigurator',
  assistant: 'assistent',
  rating: 'bewertungsmechanismus',

  // E-Commerce & Payments
  payment: 'zahlungsabwicklung',

  // Users & Security
  userAccounts: 'benutzerkonten',
  ageVerification: 'altersverifikation',
  cookieConsent: 'cookieConsent',
  accessibility: 'barrierefreiheitTools',

  // Integration & Services
  mapsIntegration: 'mapsIntegration',
  socialMediaIntegration: 'socialMediaIntegration',
  analyticsIntegration: 'analyticsIntegration',

  // Marketing & SEO
  seo: 'seo',
  marketingTools: 'marketingTools',

  // Localization
  localization: 'mehrsprachigkeit',

  // Special Features
  virtualTour: 'virtualTour'
};

/**
 * Konvertiert englische Feature-IDs zu Hygraph Enum-Werten
 */
export function mapFeaturesToHygraph(features: string[]): string[] {
  return features.map((feature) => featureMapping[feature]).filter((mapped) => mapped !== undefined);
}
