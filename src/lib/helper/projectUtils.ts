import { projectStatus } from '$interfaces/project.interface';
import {
  projectCategories,
  projectTypesWebApp,
  projectTypesAiFreestyle,
  projectSubTypesWebsite,
  projectSubTypesApp,
  projectSubTypesAi,
  projectSubTypesFreestyle
} from '$lib/configs/wizard-config';
import { m } from '$lib/paraglide/messages';

function resolveTitle(key?: string): string | undefined {
  if (!key) return undefined;
  const fn = (m as unknown as Record<string, (() => string) | undefined>)[key];
  return fn ? fn() : key;
}

const StringIsNumber = (value: string) => isNaN(Number(value)) === false;
export function ToArray(enumme: Record<string, string | number>): string[] {
  return Object.keys(enumme)
    .filter(StringIsNumber)
    .map((key) => enumme[key] as string);
}

export function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('de-DE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function formatBudget(budget: string) {
  return budget ? `${budget} €` : 'Nicht angegeben';
}

export function getStatusBadgeClass(status: string) {
  const statusArray = ToArray(projectStatus);
  switch (status) {
    case statusArray[0]:
      return 'badge-neutral';
    case statusArray[1]:
      return 'badge-info';
    case statusArray[2]:
      return 'badge-warning';
    case statusArray[3]:
      return 'badge-secondary';
    case statusArray[4]:
      return 'badge-accent';
    case statusArray[5]:
      return 'badge-success';
    case statusArray[6]:
      return 'badge-primary';
    default:
      return 'badge-secondary';
  }
}

export function getStatusLabel(status: string) {
  const statusArray = ToArray(projectStatus);
  switch (status) {
    case statusArray[0]:
      return 'Erstellt';
    case statusArray[1]:
      return 'Vorgestellt';
    case statusArray[2]:
      return 'Prototyp';
    case statusArray[3]:
      return 'Verfeinerung';
    case statusArray[4]:
      return 'Bereit';
    case statusArray[5]:
      return 'Veröffentlicht';
    case statusArray[6]:
      return 'Bezahlt';
    default:
      return 'Unbekannt';
  }
}

/**
 * Maps Hygraph feature enum values (which now match wizard-config IDs directly)
 * to human-readable display labels.
 */
const featureLabels: Record<string, string> = {
  kontaktformular: 'Kontaktformular',
  newsletterRegistrierung: 'Newsletter Registrierung',
  chatbot: 'Chatbot',
  voicebot: 'Voicebot',
  terminbuchung: 'Terminbuchung',
  bildergalerie: 'Bildergalerie',
  videoEmbedding: 'Video Embedding',
  portfolioGrid: 'Portfolio Grid',
  kalender: 'Kalender',
  dateiupload: 'Dateiupload',
  downloadbereich: 'Downloadbereich',
  megaMenu: 'Mega Menu',
  customTeaser: 'Custom Teaser',
  customCarousel: 'Custom Carousel',
  akkordeon: 'Akkordeon',
  tabs: 'Tabs',
  themeSwitcher: 'Theme Switcher',
  suchfunktion: 'Suchfunktion',
  customFilter: 'Custom Filter',
  multiStepDialog: 'Multi-Step Dialog',
  konfigurator: 'Konfigurator',
  assistent: 'Assistent',
  bewertungsmechanismus: 'Bewertungsmechanismus',
  zahlungsabwicklung: 'Zahlungsabwicklung',
  benutzerkonten: 'Benutzerkonten',
  altersverifikation: 'Altersverifikation',
  cookieConsent: 'Cookie Consent',
  barrierefreiheitTools: 'Barrierefreiheit-Tools',
  mapsIntegration: 'Maps Integration',
  socialMediaIntegration: 'Social-Media Integration',
  analyticsIntegration: 'Analytics Integration',
  seo: 'SEO',
  marketingTools: 'Marketing Tools',
  mehrsprachigkeit: 'Mehrsprachigkeit',
  virtualTour: 'Virtuelle Tour'
};

export function getFeatureLabel(feature: string) {
  return featureLabels[feature] || feature;
}

export function getProjectCategoryLabel(projectType: string) {
  const result = projectCategories.find((obj) => obj.id === projectType);
  return resolveTitle(result?.title);
}

export function getProjectTypeLabel(projectType: string) {
  const projectTypeArray = [...projectTypesWebApp, ...projectTypesAiFreestyle];
  const result = projectTypeArray.find((obj) => obj.id === projectType);
  // Use the short label if available, otherwise fall back to title
  return resolveTitle(result?.label ?? result?.title);
}

export function getProjectSubTypeLabel(subProjectType: string) {
  const subProjectTypeArray = [...projectSubTypesWebsite, ...projectSubTypesApp, ...projectSubTypesAi, ...projectSubTypesFreestyle];
  const result = subProjectTypeArray.find((obj) => obj.id === subProjectType);
  return resolveTitle(result?.title);
}

export function getProjectTypeIcon(projectType?: string): string {
  switch (projectType) {
    case 'website':
      return '🖥️';
    case 'app':
      return '🚀';
    case 'aiSolution':
      return '🤖';
    case 'freestyle':
      return '⚗️';
    default:
      return '📁';
  }
}

export function getStatusProgress(status?: string): number {
  const statusArray = ToArray(projectStatus);
  if (!status) return 0;
  const index = statusArray.indexOf(status);
  if (index === -1) return 0;
  return Math.round(((index + 1) / statusArray.length) * 100);
}

export function isProjectEditable(status?: string): boolean {
  const statusArray = ToArray(projectStatus);
  return !status || status === statusArray[0]; // only 'created' is editable
}

export function isProjectSubmitted(status?: string): boolean {
  const statusArray = ToArray(projectStatus);
  if (!status) return false;
  const index = statusArray.indexOf(status);
  return index >= 1; // 'introduced' and beyond
}
