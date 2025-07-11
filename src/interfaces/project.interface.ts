// Interface basierend auf der Wizard-Konfiguration
export interface WizardConfig {
  step: number;
  projectType: string;
  subType: string;
  description: string;
  features: string[];
  customFeatures: string;
  pages: { name: string; content: string }[];
  formFields: { type: string; name: string; required: boolean }[];
  targetAudience: string;
  goals: string;
  timeline: string;
  budget: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  font: string;
  customFont: string;
  uploadedFiles: { name: string; size: number; type: string }[];
  estimatedPrice: number;
  lowestPrice: number;
  highestPrice: number;
  timestamp: string;
}

// Interface für die Hygraph-Response
export interface ProjectResponse {
  id: string;
  projectType: string;
  subType?: string;
  description?: string;
  features?: string[];
  customFeatures?: string;
  pages?: { name: string; content: string }[];
  formFields?: { type: string; name: string; required: boolean }[];
  targetAudience?: string;
  goals?: string;
  timeline?: string;
  budget?: string;
  colors?: {
    primary: string;
    secondary: string;
    accent: string;
  };
  font?: string;
  customFont?: string;
  uploadedFiles?: { name: string; size: number; type: string }[];
  estimatedPrice?: number;
  lowestPrice?: number;
  highestPrice?: number;
  timestamp: string;
  createdAt: string;
}