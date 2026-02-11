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
  projectGoal?: string;
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

export enum projectCategory {
  website,
  app,
  aiSolution,
  freestyle
}

export enum projectType {
  website,
  app,
  aiSolution,
  freestyle
}

export enum subType {
  onepager,
  onepagerPlus,
  corporateWebsite,
  corporateWebsitePlus,
  cms,
  cmsPlus,
  webApp,
  pwaSimple,
  pwaExtended,
  individualApp,
  aiConsulting,
  agenticAi,
  generativeAi,
  bots,
  workflowAutomation,
  aiWorkflows,
  individualAi
}

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

export enum features {
  contactForm,
  newsletterRegistration,
  chatbot,
  voicebot,
  appointments,
  imageGallery,
  videoEmbedding,
  portfolioGrid,
  calendar,
  fileUpload,
  megaMenu,
  customTeaser,
  customCarousel,
  accordeon,
  tabs,
  themeSwitcher,
  search,
  customFilter,
  multiStepDialog,
  configurator,
  assistant,
  rating,
  payment,
  userAccounts,
  ageVerification,
  cookieConsent,
  accessibility,
  mapsIntegration,
  socialMediaIntegration,
  analyticsIntegration,
  seo,
  marketingTools,
  localization,
  virtualTour
}
