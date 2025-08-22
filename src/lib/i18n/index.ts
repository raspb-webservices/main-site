import { init, register, getLocaleFromNavigator } from 'svelte-i18n'

const defaultLocale = 'de';
register('de', async () => {
  const [common, menu, contact] = await Promise.all([
    (await import('./locales/de/common.json')).default,
    (await import('./locales/de/menu.json')).default,
    (await import('./locales/de/contact.json')).default,
  ]);
  return Object.assign({}, common, menu, contact);
});

register('en', async () => {
  const [common, menu, contact] = await Promise.all([
    (await import('./locales/en/common.json')).default,
    (await import('./locales/en/menu.json')).default,
    (await import('./locales/en/contact.json')).default,
  ]);
  return Object.assign({}, common, menu, contact);
});

init({
	fallbackLocale: defaultLocale,
	initialLocale: getLocaleFromNavigator()
});