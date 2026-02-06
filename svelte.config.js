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
    alias: {
      $store: './src/store',
      $helper: './src/lib/helper',
      $images: './src/lib/images',
      $configs: './src/lib/configs',
      $services: './src/lib/services',
      $interfaces: './src/interfaces',
      $styles: './src/lib/styles'
    },
    serviceWorker: {
      register: false
    }
  },
  prerender: {
    entries: ['*'],
    crawl: true
  },
  inlineStyleThreshold: 1024,
  vite: {
    optimizeDeps: {
      include: ['lodash.get', 'lodash.isequal', 'lodash.clonedeep']
    }
  }
};

export default config;
