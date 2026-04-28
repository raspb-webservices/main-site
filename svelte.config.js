import adapter from '@sveltejs/adapter-netlify';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { importAssets } from 'svelte-preprocess-import-assets';
import { mdsvex } from 'mdsvex';

const config = {
  extensions: ['.svelte', '.svx', '.md'],
  preprocess: [
    mdsvex({
      extensions: ['.svx', '.md']
    }),
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
      $audios: './src/lib/assets/audios',
      $videos: './src/lib/assets/videos',
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
      crawl: true,
      handleHttpError: ({ path, referrer, message }) => {
        // Suppress 404s for:
        // - blog cover images (served from /static, present in production)
        // - internal page links from blog articles (/kontakt, /leistungen, etc.)
        //   that are real routes on the live site but not SvelteKit pages.
        if (path.startsWith('/images/blog/')) return;
        if (referrer?.startsWith('/blog/')) return;
        throw new Error(message);
      }
    },
    inlineStyleThreshold: 2048,
    csp: {
      mode: 'auto',
      directives: {
        'default-src': ['self'],
        'script-src': ['self', 'wasm-unsafe-eval', 'https://sibforms.com'],
        'style-src': ['self', 'unsafe-inline', 'https://sibforms.com'],
        'font-src': ['self', 'https://fonts.gstatic.com'],
        'img-src': ['self', 'data:', 'blob:', 'https://picsum.photos', 'https://media.graphassets.com', 'https://s.gravatar.com', 'https://cdn.auth0.com'],
        'connect-src': ['self', 'https://cdn.jsdelivr.net', 'https://auth.raspb.de', 'https://dev-lztna60en7yhpzaq.us.auth0.com', 'https://eu-west-2.cdn.hygraph.com', 'https://media.graphassets.com', 'https://uploads.graphassets.com', 'https://insights.raspb.eu', 'https://api.brevo.com'],
        'frame-src': ['https://nextcloud.raspb.eu', 'https://app.sibforms.com'],
        'worker-src': ['self', 'blob:'],
        'manifest-src': ['self'],
        'object-src': ['none'],
        'base-uri': ['self'],
        'form-action': ['self', 'https://app.sibforms.com']
      }
    }
  }
};

export default config;
