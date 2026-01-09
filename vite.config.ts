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
    tailwindcss({
      optimize: false
    }),
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
          pattern: '/faq',
          localized: [
            ['de', '/de/faq'],
            ['en', '/en/faq']
          ]
        },
        {
          pattern: '/faq/:id',
          localized: [
            ['de', '/de/faq/:id'],
            ['en', '/en/faq/:id']
          ]
        },
        {
          pattern: '/get-started',
          localized: [
            ['de', '/de/projektkonfigurator'],
            ['en', '/en/project-wizard']
          ]
        },
        {
          pattern: '/get-started/:id',
          localized: [
            ['de', '/de/projektkonfigurator/:id'],
            ['en', '/en/project-wizard/:id']
          ]
        },
        {
          pattern: '/make-an-appointment',
          localized: [
            ['de', '/de/einen-termin-vereinbaren'],
            ['en', '/en/make-an-appointment']
          ]
        },
        {
          pattern: '/make-an-appointment/:id',
          localized: [
            ['de', '/de/einen-termin-vereinbaren/:id'],
            ['en', '/en/make-an-appointment/:id']
          ]
        }
      ]
    })
  ],
  css: {
    transformer: 'postcss'
  },
  build: {
    chunkSizeWarningLimit: 2048,
    cssMinify: 'esbuild'
  }
});
