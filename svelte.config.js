import adapter from '@sveltejs/adapter-netlify';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import fs from 'fs';

const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter(),
    alias: {
      $store: './src/store',
      $helper: './src/lib/helper',
      $configs: './src/lib/configs',
      $services: './src/lib/services',
      $interfaces: './src/interfaces'
    }
  },
  vite: {
    optimizeDeps: {
      include: ['lodash.get', 'lodash.isequal', 'lodash.clonedeep']
    },
    server: {
      https: {
        key: fs.readFileSync('./local/localhost-key.pem'),
        cert: fs.readFileSync('./local/localhost.pem')
      }
    }
  }
};

export default config;
