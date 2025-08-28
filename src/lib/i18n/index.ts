import { init, register, getLocaleFromNavigator } from 'svelte-i18n'

const defaultLocale = 'de';
register('de', async () => {
  const [common, menu, footer, wizard] = await Promise.all([
    (await import('./locales/de/common.json')).default,
    (await import('./locales/de/menu.json')).default,
    (await import('./locales/de/footer.json')).default,
    (await import('./locales/de/wizard.json')).default,
  ]);
  return Object.assign({}, common, menu, footer, wizard);
});

register('en', async () => {
  const [common, menu, footer, wizard] = await Promise.all([
    (await import('./locales/en/common.json')).default,
    (await import('./locales/en/menu.json')).default,
    (await import('./locales/en/footer.json')).default,
    (await import('./locales/en/wizard.json')).default,
  ]);
  return Object.assign({}, common, menu, footer, wizard);
});

init({
	fallbackLocale: defaultLocale,
	initialLocale: getLocaleFromNavigator()
});