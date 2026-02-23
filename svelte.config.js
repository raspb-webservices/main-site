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
    inlineStyleThreshold: 2048
  }
};

export default config;
