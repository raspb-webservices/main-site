import { addMessages } from 'svelte-i18n';

export const load = async ({ url }: { url: URL }) => {
  const pageMessagesDe = (await import(`$lib/i18n/locales/de/get-started.json`)).default;
  const pageMessagesEn = (await import(`$lib/i18n/locales/en/get-started.json`)).default;
  addMessages('de', pageMessagesDe);
  addMessages('en', pageMessagesEn);
  
  // Extract URL parameters
  const projectType = url.searchParams.get('projectType');
  const subType = url.searchParams.get('subType');

  return {
    projectType,
    subType
  };
};
