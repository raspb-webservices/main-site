import { addMessages } from 'svelte-i18n';

export async function load() {
  const pageMessagesDe = (await import(`$lib/i18n/locales/de/thank-you.json`)).default;
  const pageMessagesEn = (await import(`$lib/i18n/locales/en/thank-you.json`)).default;

  addMessages('de', pageMessagesDe);
  addMessages('en', pageMessagesEn);

  return {};
}