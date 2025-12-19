import { addMessages } from 'svelte-i18n';

export async function load() {
  const pageMessagesDe = (await import(`$lib/i18n/locales/de/login.json`)).default;
  const pageMessagesEn = (await import(`$lib/i18n/locales/en/login.json`)).default;

  addMessages('de', pageMessagesDe);
  addMessages('en', pageMessagesEn);

  return {};
}