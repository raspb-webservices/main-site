import { addMessages } from 'svelte-i18n';

export const prerender = true;
// export const csr = false;

export async function load() {
  const pageMessagesDe = (await import(`$lib/i18n/locales/de/home.json`)).default;
  const pageMessagesEn = (await import(`$lib/i18n/locales/en/home.json`)).default;

  addMessages('de', pageMessagesDe);
  addMessages('en', pageMessagesEn);

  return {};
}