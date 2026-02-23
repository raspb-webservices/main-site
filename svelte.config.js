import adapter from '@sveltejs/adapter-netlify';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { importAssets } from 'svelte-preprocess-import-assets';

const config = {
  preprocess: [
    importAssets({
      urlFilter: (url) => !url.startsWith('/')
    }),
    vitePreprocess()
  ],
  kit: {
    adapter: adapter(),
    paths: {
      relative: false
    },
    alias: {
      $store: './src/store',
      $helper: './src/lib/helper',
      $images: './src/lib/assets/images',
      $icons: './src/lib/assets/icons',
      $fonts: './src/lib/assets/fonts',
      $lotties: './src/lib/assets/lotties',
      $components: './src/lib/components',
      $configs: './src/lib/configs',
      $services: './src/lib/services',
      $interfaces: './src/interfaces'
    },
    serviceWorker: {
      register: true
    },
    prerender: {
      entries: ['*'],
      crawl: true
    },
    inlineStyleThreshold: 2048,
    csp: {
      mode: 'auto',
      directives: {
        'default-src': ['self'],
        'script-src': ['self', 'wasm-unsafe-eval'],
        'style-src': ['self', 'unsafe-inline'],
        'font-src': ['self', 'https://fonts.gstatic.com'],
        'img-src': ['self', 'data:', 'blob:', 'https://picsum.photos', 'https://media.graphassets.com', 'https://s.gravatar.com', 'https://cdn.auth0.com'],
        'connect-src': ['self', 'https://cdn.jsdelivr.net', 'https://auth.raspb.de', 'https://dev-lztna60en7yhpzaq.us.auth0.com', 'https://eu-west-2.cdn.hygraph.com', 'https://media.graphassets.com', 'https://uploads.graphassets.com', 'https://insights.raspb.eu'],
        'frame-src': ['https://nextcloud.raspb.eu'],
        'worker-src': ['self', 'blob:'],
        'manifest-src': ['self'],
        'object-src': ['none'],
        'base-uri': ['self'],
        'form-action': ['self']
      }
    }
  }
};

export default config;
