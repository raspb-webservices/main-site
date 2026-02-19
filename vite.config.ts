import { paraglideVitePlugin } from '@inlang/paraglide-js';
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

const emptySourceMap = JSON.stringify({
  version: 3,
  sources: [],
  names: [],
  mappings: ''
});

export default defineConfig({
  plugins: [
    tailwindcss({ optimize: false }),
    sveltekit(),
    paraglideVitePlugin({
      project: './project.inlang',
      outdir: './src/lib/paraglide',
      additionalFiles: {
        'strategy.js.map': emptySourceMap,
        'middleware.js.map': emptySourceMap
      },
      strategy: ['url', 'cookie', 'preferredLanguage', 'baseLocale'],
      urlPatterns: [
        {
          pattern: '/about-us',
          localized: [
            ['de', '/de/ueber-uns'],
            ['en', '/en/about-us']
          ]
        },
        {
          pattern: '/about-us/:id',
          localized: [
            ['de', '/de/ueber-uns/:id'],
            ['en', '/en/about-us/:id']
          ]
        },
        {
          pattern: '/contact',
          localized: [
            ['de', '/de/kontakt'],
            ['en', '/en/contact']
          ]
        },
        {
          pattern: '/contact/:id',
          localized: [
            ['de', '/de/kontakt/:id'],
            ['en', '/en/contact/:id']
          ]
        },
        {
          pattern: '/dashboard',
          localized: [
            ['de', '/de/verwaltungszentrale'],
            ['en', '/en/dashboard']
          ]
        },
        {
          pattern: '/dashboard/:id',
          localized: [
            ['de', '/de/verwaltungszentrale/:id'],
            ['en', '/en/dashboard/:id']
          ]
        },
        {
          pattern: '/faq',
          localized: [
            ['de', '/de/haeufig-gestellte-fragen'],
            ['en', '/en/frequently-asked-questions']
          ]
        },
        {
          pattern: '/faq/:id',
          localized: [
            ['de', '/de/haeufig-gestellte-fragen/:id'],
            ['en', '/en/frequently-asked-questions/:id']
          ]
        },
        {
          pattern: '/imprint',
          localized: [
            ['de', '/de/impressum'],
            ['en', '/en/imprint']
          ]
        },
        {
          pattern: '/imprint/:id',
          localized: [
            ['de', '/de/impressum/:id'],
            ['en', '/en/imprint/:id']
          ]
        },
        {
          pattern: '/insights',
          localized: [
            ['de', '/de/einblicke'],
            ['en', '/en/insights']
          ]
        },
        {
          pattern: '/insights/:id',
          localized: [
            ['de', '/de/einblicke/:id'],
            ['en', '/en/insights/:id']
          ]
        },
        {
          pattern: '/login',
          localized: [
            ['de', '/de/anmelden'],
            ['en', '/en/login']
          ]
        },
        {
          pattern: '/login/:id',
          localized: [
            ['de', '/de/anmelden/:id'],
            ['en', '/en/login/:id']
          ]
        },
        {
          pattern: '/playground',
          localized: [
            ['de', '/de/uebungsplatz'],
            ['en', '/en/playground']
          ]
        },
        {
          pattern: '/playground/:id',
          localized: [
            ['de', '/de/uebungsplatz/:id'],
            ['en', '/en/playground/:id']
          ]
        },
        {
          pattern: '/privacy',
          localized: [
            ['de', '/de/datenschutzhinweis'],
            ['en', '/en/privacy-notice']
          ]
        },
        {
          pattern: '/privacy/:id',
          localized: [
            ['de', '/de/datenschutzhinweis/:id'],
            ['en', '/en/privacy-notice/:id']
          ]
        },
        {
          pattern: '/profile',
          localized: [
            ['de', '/de/persoenliches-profil'],
            ['en', '/en/personal-profile']
          ]
        },
        {
          pattern: '/profile/:id',
          localized: [
            ['de', '/de/persoenliches-profil/:id'],
            ['en', '/en/personal-profile/:id']
          ]
        },
        {
          pattern: '/registration',
          localized: [
            ['de', '/de/registrierung'],
            ['en', '/en/registration']
          ]
        },
        {
          pattern: '/registration/:id',
          localized: [
            ['de', '/de/registrierung/:id'],
            ['en', '/en/registration/:id']
          ]
        },
        {
          pattern: '/services',
          localized: [
            ['de', '/de/leistungsportfolio'],
            ['en', '/en/services']
          ]
        },
        {
          pattern: '/services/:id',
          localized: [
            ['de', '/de/leistungsportfolio/:id'],
            ['en', '/en/services/:id']
          ]
        },
        {
          pattern: '/terms',
          localized: [
            ['de', '/de/allgemeine-geschaeftsbedingungen'],
            ['en', '/en/terms-and-conditions']
          ]
        },
        {
          pattern: '/terms/:id',
          localized: [
            ['de', '/de/allgemeine-geschaeftsbedingungen/:id'],
            ['en', '/en/terms-and-conditions/:id']
          ]
        },
        {
          pattern: '/thank-you',
          localized: [
            ['de', '/de/vielen-dank'],
            ['en', '/en/thank-you']
          ]
        },
        {
          pattern: '/thank-you/:id',
          localized: [
            ['de', '/de/vielen-dank/:id'],
            ['en', '/en/thank-you/:id']
          ]
        },
        {
          pattern: '/wizard',
          localized: [
            ['de', '/de/projektkonfigurator'],
            ['en', '/en/project-wizard']
          ]
        },
        {
          pattern: '/wizard/:id',
          localized: [
            ['de', '/de/projektkonfigurator/:id'],
            ['en', '/en/project-wizard/:id']
          ]
        }
      ]
    })
  ],
  css: {
    transformer: 'postcss'
  },
  assetsInclude: ['**/*.lottie'],
  build: {
    chunkSizeWarningLimit: 2048,
    cssMinify: 'esbuild'
  }
});
