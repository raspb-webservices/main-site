import { features, projectStatus } from '$interfaces/project.interface';
import {
  projectCategories,
  projectTypesWebApp,
  projectTypesAiFreestyle,
  projectSubTypesWebsite,
  projectSubTypesApp,
  projectSubTypesAi,
  projectSubTypesFreestyle
} from '$lib/configs/wizard-config';

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

export function getFeatureLabel(feature: string) {
  const featureArray = ToArray(features);
  switch (feature) {
    case featureArray[0]:
      return 'Kontaktformular';
    case featureArray[1]:
      return 'Bildergalerie';
    case featureArray[2]:
      return 'Maps Integration';
    case featureArray[3]:
      return 'Social-Media Integration';
    case featureArray[4]:
      return 'Newsletter Registrierung';
    case featureArray[5]:
      return 'Suchfunktion';
    case featureArray[6]:
      return 'Mehrsprachigkeit';
    case featureArray[7]:
      return 'Terminbuchung';
    case featureArray[8]:
      return 'Zahlungsbawicklung';
    case featureArray[9]:
      return 'Benutzerkonten';
    case featureArray[10]:
      return 'Analytics Integration';
    case featureArray[11]:
      return 'SEO';
    case featureArray[12]:
      return 'Custom Teaser';
    case featureArray[13]:
      return 'Custom Carousel';
    case featureArray[14]:
      return 'Custom Filter';
    case featureArray[15]:
      return 'Mega Menu';
    case featureArray[16]:
      return 'Kalender';
    case featureArray[17]:
      return 'Portfolio Grid';
    case featureArray[18]:
      return 'Downloadbereich';
    case featureArray[19]:
      return 'Dateiupload';
    case featureArray[20]:
      return 'Akkordeon';
    case featureArray[21]:
      return 'Tabs';
    case featureArray[22]:
      return 'Multi-Step Dialog';
    case featureArray[23]:
      return 'Chatbot';
    case featureArray[24]:
      return 'Konfigurator';
    case featureArray[25]:
      return 'Assistent';
    case featureArray[26]:
      return 'Bewertungsmechanismus';
    case featureArray[27]:
      return 'Theme Switcher';
    case featureArray[28]:
      return 'Cookie Consent (included)';
    case featureArray[29]:
      return 'Video Embedding';
    case featureArray[30]:
      return 'Barrierefreiheit-Tools';
    case featureArray[31]:
      return 'Altersverifikation';
    case featureArray[32]:
      return 'Marketing Tools';
    default:
      return 'Unbekannt';
  }
}

export function getProjectCategoryLabel(projectType: string) {
  const result = projectCategories.find((obj) => obj.id === projectType);
  return result?.title;
}

export function getProjectTypeLabel(projectType: string) {
  const projectTypeArray = [...projectTypesWebApp, ...projectTypesAiFreestyle];
  const result = projectTypeArray.find((obj) => obj.id === projectType);
  return result?.title;
}

export function getProjectSubTypeLabel(subProjectType: string) {
  const subProjectTypeArray = [...projectSubTypesWebsite, ...projectSubTypesApp, ...projectSubTypesAi, ...projectSubTypesFreestyle];
  const result = subProjectTypeArray.find((obj) => obj.id === subProjectType);
  return result?.title;
}
