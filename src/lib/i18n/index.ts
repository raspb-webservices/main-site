import { init, register, getLocaleFromNavigator } from 'svelte-i18n'

const defaultLocale = 'de';
register('de', async () => {
  const [common, menu, footer] = await Promise.all([
    (await import('./locales/de/common.json')).default,
    (await import('./locales/de/menu.json')).default,
    (await import('./locales/de/footer.json')).default,
  ]);
  return Object.assign({}, common, menu, footer);
});

register('en', async () => {
  const [common, menu, footer] = await Promise.all([
    (await import('./locales/en/common.json')).default,
    (await import('./locales/en/menu.json')).default,
    (await import('./locales/en/footer.json')).default,
  ]);
  return Object.assign({}, common, menu, footer);
});

init({
	fallbackLocale: defaultLocale,
	initialLocale: getLocaleFromNavigator()
});