import { addMessages } from 'svelte-i18n';

export async function load() {
  const pageMessagesDe = (await import(`$lib/i18n/locales/de/terms.json`)).default;
  const pageMessagesEn = (await import(`$lib/i18n/locales/en/terms.json`)).default;

  addMessages('de', pageMessagesDe);
  addMessages('en', pageMessagesEn);

  return {};
}