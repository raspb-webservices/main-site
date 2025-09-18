import { init, register, getLocaleFromNavigator } from 'svelte-i18n'

const defaultLocale = 'de';
register('de', async () => {
  const [common, menu, footer, wizard, modals, error] = await Promise.all([
    (await import('./locales/de/common.json')).default,
    (await import('./locales/de/menu.json')).default,
    (await import('./locales/de/footer.json')).default,
    (await import('./locales/de/wizard.json')).default,
    (await import('./locales/de/modal-dialogues.json')).default,
    (await import('./locales/de/error.json')).default,
  ]);
  return Object.assign({}, common, menu, footer, wizard, modals, error);
});

register('en', async () => {
  const [common, menu, footer, wizard, modals, error] = await Promise.all([
    (await import('./locales/en/common.json')).default,
    (await import('./locales/en/menu.json')).default,
    (await import('./locales/en/footer.json')).default,
    (await import('./locales/en/wizard.json')).default,
    (await import('./locales/en/modal-dialogues.json')).default,
    (await import('./locales/en/error.json')).default,
  ]);
  return Object.assign({}, common, menu, footer, wizard, modals, error);
});

init({
	fallbackLocale: defaultLocale,
	initialLocale: getLocaleFromNavigator()
});