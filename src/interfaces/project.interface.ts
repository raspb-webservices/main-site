export interface ServiceSetup {
  username?: string;
  password?: string;
  authTokens?: Record<string, unknown>;
  isConfigured?: boolean;
  lastUpdated?: string;
}

export interface ProjectSetup {
  github?: ServiceSetup;
  netlify?: ServiceSetup;
  hygraph?: ServiceSetup;
  auth0?: ServiceSetup;
}

export interface Project {
  id?: string;
  name: string;
  description?: string;
  /** Freitext-String, kein Enum – entspricht Wizard-Kategorie-ID (z.B. 'websites-and-apps', 'ki-and-freestyle') */
  projectCategory?: string;
  projectType?: string;
  subType?: string;
  projectDetails?: string;
  desiredDomain?: string;
  domainStatus?: string;
  projectStatus?: string;
  goals?: string;
  inspiration?: string;
  targetAudience?: string;
  budget?: string;
  timeline?: string;
  features?: string[];
  customFeature?: string;
  primaryColour?: string;
  secondaryColour?: string;
  accentColour?: string;
  desiredFont?: string;
  estimatedPrice?: number;
  // PWA-specific fields
  pwaApproach?: string; // 'new' or 'extend'
  pwaExistingUrl?: string;
  // CMS-specific fields
  cmsComplexity?: number; // 0-100 scale
  cmsContentStructure?: string;
  // Extended project details
  serviceLevel?: number; // 0-100: 0 = Full-Service, 100 = Active Participation
  engineeringApproach?: number; // 0-100: 0 = Quick & Dirty, 100 = Over-engineered
  specialRequirements?: string;
  // KI & Freestyle only
  estimatedExpertDays?: number; // estimated man-days (optional, only for ki-and-freestyle)
  timelinePreference?: string; // 'urgent', 'fast', 'moderate', 'flexible', 'delayed', 'deadline', 'whenever'
  specificDeadline?: string; // ISO date string
  budgetRange?: string; // 'small', 'medium', 'large', 'xlarge', 'enterprise', 'flexible'
  formFields?: {
    type: string;
    name: string;
    required?: boolean;
  }[];
  pages?: {
    name: string;
    content?: string;
    characteristic?: string;
  }[];
  relatedFiles?: {
    id?: string;
    url?: string;
    fileName?: string;
  }[];
  owner?: {
    id?: string;
    familyName?: string;
    givenName?: string;
    salutation?: string;
    email?: string;
    phone?: string;
    company?: string;
    address?: string;
    postCode?: string;
    city?: string;
    country?: string;
  };
  setup?: ProjectSetup;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
}

export interface WizardConfig extends Project {
  step: number;
  customFont: string;
  uploadedFiles: { name: string; size: number; type: string }[];
  /** Only used client-side for ki-and-freestyle price range display – not sent to Hygraph */
  estimatedPriceMax?: number;
}

export interface ProjectResponse extends Omit<Project, 'pages' | 'formFields' | 'setup'> {
  id: string;
  pages: string;
  formFields: string;
  setup?: string;
}

/**
 * Hygraph ProjectType enum values.
 * Diese Werte werden direkt als Strings in Hygraph gespeichert.
 */
export enum projectType {
  website,
  app,
  aiSolution,
  freestyle
}

/**
 * Hygraph SubType enum values.
 * Diese Werte werden direkt als Strings in Hygraph gespeichert.
 */
export enum subType {
  // Website
  onepager,
  onepagerPlus,
  corporateWebsite,
  corporateWebsitePlus,
  cms,
  cmsPlus,
  // App
  webApp,
  pwaSimple,
  pwaExtended,
  individualApp,
  // AI Solution
  aiConsulting,
  agenticAi,
  generativeAi,
  bots,
  workflowAutomation,
  aiWorkflows,
  individualAi,
  // Freestyle
  individualConsulting,
  individualDevelopment
}

/**
 * Hygraph ProjectStatus enum values (geordnet nach Fortschritt).
 */
export enum projectStatus {
  created,
  introduced,
  prototype,
  refinement,
  ready,
  published,
  paid
}

export enum domainStatus {
  available,
  registered,
  transferred,
  configured,
  unavailable,
  unknown
}

export enum salutationOptions {
  mr,
  mrs,
  company,
  other
}

/**
 * Hygraph Features enum values.
 * IDs stimmen 1:1 mit den Hygraph-Enum-Werten überein.
 * Deutsch benannt, da Hygraph die deutschen Bezeichnungen als Enum-Werte nutzt.
 */
export enum features {
  // Kommunikation
  kontaktformular,
  newsletterRegistrierung,
  chatbot,
  voicebot,
  terminbuchung,
  // Content & Medien
  bildergalerie,
  videoEmbedding,
  portfolioGrid,
  kalender,
  dateiupload,
  downloadbereich,
  // Navigation & UI
  megaMenu,
  customTeaser,
  customCarousel,
  akkordeon,
  tabs,
  themeSwitcher,
  // Funktionalität & Tools
  suchfunktion,
  customFilter,
  multiStepDialog,
  konfigurator,
  assistent,
  bewertungsmechanismus,
  // E-Commerce & Zahlungen
  zahlungsabwicklung,
  // Benutzer & Sicherheit
  benutzerkonten,
  altersverifikation,
  cookieConsent,
  barrierefreiheitTools,
  // Integration & Services
  mapsIntegration,
  socialMediaIntegration,
  analyticsIntegration,
  // Marketing & SEO
  seo,
  marketingTools,
  // Lokalisierung
  mehrsprachigkeit,
  // Special Features
  virtualTour
}
