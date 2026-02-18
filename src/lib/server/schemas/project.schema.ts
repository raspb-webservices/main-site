import { z } from 'zod';

const MAX_STRING = 2000;
const MAX_SHORT = 500;

const projectTypeEnum = z.enum(['website', 'app', 'aiSolution', 'freestyle']).nullish();

const subTypeEnum = z
  .enum([
    'onepager',
    'onepagerPlus',
    'corporateWebsite',
    'corporateWebsitePlus',
    'cms',
    'cmsPlus',
    'webApp',
    'pwaSimple',
    'pwaExtended',
    'individualApp',
    'aiConsulting',
    'agenticAi',
    'generativeAi',
    'bots',
    'workflowAutomation',
    'aiWorkflows',
    'individualAi',
    'individualConsulting',
    'individualDevelopment'
  ])
  .nullish();

const featuresEnum = z.enum([
  'kontaktformular',
  'newsletterRegistrierung',
  'chatbot',
  'voicebot',
  'terminbuchung',
  'bildergalerie',
  'videoEmbedding',
  'portfolioGrid',
  'kalender',
  'dateiupload',
  'downloadbereich',
  'megaMenu',
  'customTeaser',
  'customCarousel',
  'akkordeon',
  'tabs',
  'themeSwitcher',
  'suchfunktion',
  'customFilter',
  'multiStepDialog',
  'konfigurator',
  'assistent',
  'bewertungsmechanismus',
  'zahlungsabwicklung',
  'benutzerkonten',
  'altersverifikation',
  'cookieConsent',
  'barrierefreiheitTools',
  'mapsIntegration',
  'socialMediaIntegration',
  'analyticsIntegration',
  'seo',
  'marketingTools',
  'mehrsprachigkeit',
  'virtualTour'
]);

const formFieldSchema = z.object({
  type: z.string().max(100),
  name: z.string().max(200),
  required: z.boolean().optional().nullable()
});

const pageSchema = z.object({
  name: z.string().max(200),
  content: z.string().max(MAX_STRING).nullish(),
  characteristic: z.string().max(MAX_STRING).nullish()
});

const relatedFileSchema = z.object({
  id: z.string().optional().nullable()
});

/**
 * Preprocessor: JSON-String → Array (für pages/formFields aus Hygraph).
 * null/undefined → undefined (kein Update).
 */
function preprocessJsonArray<T extends z.ZodTypeAny>(schema: T) {
  return z.preprocess((val) => {
    if (val === null || val === undefined) return undefined;
    if (typeof val === 'string') {
      try {
        return JSON.parse(val);
      } catch {
        return [];
      }
    }
    return val;
  }, schema);
}

/**
 * Preprocessor: JSON-String → Record (für setup aus Hygraph).
 * null/undefined → undefined (kein Update).
 */
const preprocessJsonRecord = z.preprocess((val) => {
  if (val === null || val === undefined) return undefined;
  if (typeof val === 'string') {
    try {
      return JSON.parse(val);
    } catch {
      return undefined;
    }
  }
  return val;
}, z.record(z.string(), z.unknown()).optional());

/** Schema fuer POST /api/project/create */
export const projectCreateSchema = z.object({
  name: z.string().max(MAX_SHORT).nullish(),
  description: z.string().max(MAX_STRING).nullish(),
  projectCategory: z.string().max(100).nullish(),
  projectType: projectTypeEnum,
  subType: subTypeEnum,
  projectDetails: z.string().max(MAX_STRING).nullish(),
  desiredDomain: z.string().max(MAX_SHORT).nullish(),
  domainStatus: z.string().max(100).nullish(),
  goals: z.string().max(MAX_STRING).nullish(),
  inspiration: z.string().max(MAX_STRING).nullish(),
  targetAudience: z.string().max(MAX_STRING).nullish(),
  budget: z.string().max(MAX_SHORT).nullish(),
  timeline: z.string().max(MAX_SHORT).nullish(),
  features: z.array(featuresEnum).nullish(),
  customFeature: z.string().max(MAX_STRING).nullish(),
  primaryColour: z.string().max(50).nullish(),
  secondaryColour: z.string().max(50).nullish(),
  accentColour: z.string().max(50).nullish(),
  desiredFont: z.string().max(200).nullish(),
  estimatedPrice: z.number().min(0).nullish(),
  serviceLevel: z.number().min(0).max(100).nullish(),
  engineeringApproach: z.number().min(0).max(100).nullish(),
  specialRequirements: z.string().max(MAX_STRING).nullish(),
  timelinePreference: z.string().max(100).nullish(),
  specificDeadline: z.string().max(100).nullish(),
  budgetRange: z.string().max(100).nullish(),
  pwaApproach: z.string().max(100).nullish(),
  pwaExistingUrl: z.string().max(500).nullish(),
  cmsComplexity: z.number().min(0).max(100).nullish(),
  cmsContentStructure: z.string().max(MAX_STRING).nullish(),
  estimatedExpertDays: z.number().min(0).max(365).nullish(),
  formFields: preprocessJsonArray(z.array(formFieldSchema).optional()),
  pages: preprocessJsonArray(z.array(pageSchema).optional()),
  setup: preprocessJsonRecord,
  relatedFiles: z.array(relatedFileSchema).nullish()
});

/** Schema fuer PATCH /api/project/patch/[id] */
export const projectPatchSchema = z.object({
  id: z.string().min(1),
  name: z.string().max(MAX_SHORT).nullish(),
  description: z.string().max(MAX_STRING).nullish(),
  projectCategory: z.string().max(100).nullish(),
  projectType: projectTypeEnum,
  subType: subTypeEnum,
  projectDetails: z.string().max(MAX_STRING).nullish(),
  desiredDomain: z.string().max(MAX_SHORT).nullish(),
  domainStatus: z.string().max(100).nullish(),
  goals: z.string().max(MAX_STRING).nullish(),
  inspiration: z.string().max(MAX_STRING).nullish(),
  targetAudience: z.string().max(MAX_STRING).nullish(),
  budget: z.string().max(MAX_SHORT).nullish(),
  timeline: z.string().max(MAX_SHORT).nullish(),
  features: z.array(featuresEnum).nullish(),
  customFeature: z.string().max(MAX_STRING).nullish(),
  primaryColour: z.string().max(50).nullish(),
  secondaryColour: z.string().max(50).nullish(),
  accentColour: z.string().max(50).nullish(),
  desiredFont: z.string().max(200).nullish(),
  estimatedPrice: z.number().min(0).nullish(),
  projectStatus: z.string().max(100).nullish(),
  serviceLevel: z.number().min(0).max(100).nullish(),
  engineeringApproach: z.number().min(0).max(100).nullish(),
  specialRequirements: z.string().max(MAX_STRING).nullish(),
  timelinePreference: z.string().max(100).nullish(),
  specificDeadline: z.string().max(100).nullish(),
  budgetRange: z.string().max(100).nullish(),
  pwaApproach: z.string().max(100).nullish(),
  pwaExistingUrl: z.string().max(500).nullish(),
  cmsComplexity: z.number().min(0).max(100).nullish(),
  cmsContentStructure: z.string().max(MAX_STRING).nullish(),
  estimatedExpertDays: z.number().min(0).max(365).nullish(),
  formFields: preprocessJsonArray(z.array(formFieldSchema).optional()),
  pages: preprocessJsonArray(z.array(pageSchema).optional()),
  setup: preprocessJsonRecord,
  relatedFiles: z.array(relatedFileSchema).nullish()
});

/** Schema fuer POST /api/project/link-customer/[id] */
export const projectLinkCustomerSchema = z.object({
  customerId: z.string().min(1)
});

/** Schema fuer POST /api/project/get/batch */
export const projectBatchSchema = z.object({
  ids: z.array(z.string().min(1)).min(1).max(100)
});
