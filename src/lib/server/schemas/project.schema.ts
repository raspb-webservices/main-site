import { z } from 'zod';

const MAX_STRING = 2000;
const MAX_SHORT = 500;

const projectTypeEnum = z.enum(['website', 'app', 'aiSolution', 'freestyle']);

const subTypeEnum = z.enum([
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
  'individualAi'
]);

const featuresEnum = z.enum([
  'contactForm',
  'newsletterRegistration',
  'chatbot',
  'voicebot',
  'appointments',
  'imageGallery',
  'videoEmbedding',
  'portfolioGrid',
  'calendar',
  'fileUpload',
  'megaMenu',
  'customTeaser',
  'customCarousel',
  'accordeon',
  'tabs',
  'themeSwitcher',
  'search',
  'customFilter',
  'multiStepDialog',
  'configurator',
  'assistant',
  'rating',
  'payment',
  'userAccounts',
  'ageVerification',
  'cookieConsent',
  'accessibility',
  'mapsIntegration',
  'socialMediaIntegration',
  'analyticsIntegration',
  'seo',
  'marketingTools',
  'localization',
  'virtualTour'
]);

const formFieldSchema = z.object({
  type: z.string().max(100),
  name: z.string().max(200),
  required: z.boolean().optional()
});

const pageSchema = z.object({
  name: z.string().max(200),
  content: z.string().max(MAX_STRING).optional(),
  characteristic: z.string().max(MAX_STRING).optional()
});

const relatedFileSchema = z.object({
  id: z.string().optional()
});

/** Schema fuer POST /api/project/create */
export const projectCreateSchema = z.object({
  name: z.string().max(MAX_SHORT).optional(),
  description: z.string().max(MAX_STRING).optional(),
  projectType: projectTypeEnum.optional(),
  subType: subTypeEnum.optional(),
  projectDetails: z.string().max(MAX_STRING).optional(),
  desiredDomain: z.string().max(MAX_SHORT).optional(),
  domainStatus: z.string().max(100).optional(),
  goals: z.string().max(MAX_STRING).optional(),
  inspiration: z.string().max(MAX_STRING).optional(),
  targetAudience: z.string().max(MAX_STRING).optional(),
  budget: z.string().max(MAX_SHORT).optional(),
  timeline: z.string().max(MAX_SHORT).optional(),
  features: z.array(featuresEnum).optional(),
  customFeature: z.string().max(MAX_STRING).optional(),
  primaryColour: z.string().max(50).optional(),
  secondaryColour: z.string().max(50).optional(),
  accentColour: z.string().max(50).optional(),
  desiredFont: z.string().max(200).optional(),
  estimatedPrice: z.number().min(0).optional(),
  formFields: z.array(formFieldSchema).optional(),
  pages: z.array(pageSchema).optional(),
  setup: z.record(z.string(), z.unknown()).optional(),
  relatedFiles: z.array(relatedFileSchema).optional()
});

/** Schema fuer PATCH /api/project/patch/[id] */
export const projectPatchSchema = z.object({
  id: z.string().min(1),
  name: z.string().max(MAX_SHORT).optional(),
  description: z.string().max(MAX_STRING).optional(),
  projectType: projectTypeEnum.optional(),
  subType: subTypeEnum.optional(),
  projectDetails: z.string().max(MAX_STRING).optional(),
  desiredDomain: z.string().max(MAX_SHORT).optional(),
  domainStatus: z.string().max(100).optional(),
  goals: z.string().max(MAX_STRING).optional(),
  inspiration: z.string().max(MAX_STRING).optional(),
  targetAudience: z.string().max(MAX_STRING).optional(),
  budget: z.string().max(MAX_SHORT).optional(),
  timeline: z.string().max(MAX_SHORT).optional(),
  features: z.array(featuresEnum).optional(),
  customFeature: z.string().max(MAX_STRING).optional(),
  primaryColour: z.string().max(50).optional(),
  secondaryColour: z.string().max(50).optional(),
  accentColour: z.string().max(50).optional(),
  desiredFont: z.string().max(200).optional(),
  estimatedPrice: z.number().min(0).optional(),
  formFields: z.array(formFieldSchema).optional(),
  pages: z.array(pageSchema).optional(),
  setup: z.record(z.string(), z.unknown()).optional(),
  relatedFiles: z.array(relatedFileSchema).optional()
});

/** Schema fuer POST /api/project/link-customer/[id] */
export const projectLinkCustomerSchema = z.object({
  customerId: z.string().min(1)
});

/** Schema fuer POST /api/project/get/batch */
export const projectBatchSchema = z.object({
  ids: z.array(z.string().min(1)).min(1).max(100)
});
