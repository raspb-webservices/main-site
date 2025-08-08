export interface ServiceSetup {
  username?: string;
  password?: string;
  authTokens?: Record<string, any>;
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
  projectType?: string;
  subType?: string;
  projectDetails?: string;
  desiredDomain?: string;
  domainStatus?: string;
  goals?: string;
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
}

export interface WizardConfig extends Project {
  step: number;
  customFont: string;
  uploadedFiles: { name: string; size: number; type: string }[];
}

export interface ProjectResponse extends Omit<Project, 'pages' | 'formFields' | 'setup'> {
  id: string;
  pages: string;
  formFields: string;
  setup?: string;
}

export enum projectType {
  freestyle,
  cms,
  website,
  webApplication,
  artificialIntelligence
}

export enum subType {
  onepager,
  corporateWebsite,
  corporateWebsitePremium,
  cmsSimple,
  cmsPremium,
  blogSystem,
  headlessCms,
  pwa,
  customApp,
  eCommerce,
  apiIntegration,
  customTool,
  onepagerPlus
}

export enum features {
  kontaktformular,
  bildergalerie,
  mapsIntegration,
  socialMedieIntegration,
  newsletterRegistrierung,
  suchfunktion,
  mehrsprachigkeit,
  terminbuchung,
  zahlungsbawicklung,
  benutzerkonten,
  analyticsIntegration,
  seo,
  customTeaser,
  customCarousel,
  customFilter,
  megaMenu,
  kalender,
  portfolioGrid,
  downloadbereich,
  dateiupload,
  akkordeon,
  tabs,
  multiStepDialog,
  chatbot,
  konfigurator,
  assistent,
  bewertungsmechanismus,
  themeSwitcher,
  cookieConsent,
  videoEmbedding,
  barrierefreiheitTools,
  altersverifikation,
  marketingTools
}
