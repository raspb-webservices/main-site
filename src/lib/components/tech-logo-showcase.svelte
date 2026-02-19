<script lang="ts">
  import { onMount } from 'svelte';
  import svelteLogo from '$icons/tech-logos/svelte-logo.svg';
  import typescriptLogo from '$icons/tech-logos/typescript-logo.svg';
  import tailwindLogo from '$icons/tech-logos/tailwind-css-logo.svg';
  import daisyUiLogo from '$icons/tech-logos/daisyUi.svg';
  import graphqlLogo from '$icons/tech-logos/GraphQL-logo.svg';
  import nodejsLogo from '$icons/tech-logos/node-js-logo.svg';
  import netlifyLogo from '$icons/tech-logos/netlify-logo.svg';
  import vitejsLogo from '$icons/tech-logos/vitejs-logo.svg';
  import hygraphLogo from '$icons/tech-logos/hygraph-logo.svg';
  import openaiLogo from '$icons/tech-logos/openai.svg';
  import anthropicLogo from '$icons/tech-logos/anthropic.svg';
  import geminiLogo from '$icons/tech-logos/gemini-color.svg';
  import claudeLogo from '$icons/tech-logos/claude-color.svg';
  import ollamaLogo from '$icons/tech-logos/ollama.svg';
  import postCssLogo from '$icons/tech-logos/PostCSS_Logo.svg';
  import npmLogo from '$icons/tech-logos/npm-logo.svg';
  import githubLogo from '$icons/tech-logos/GitHub-logo.svg';
  import mapboxLogo from '$icons/tech-logos/mapbox-logo.svg';
  import markdownLogo from '$icons/tech-logos/markdown-logo.svg';
  import jamstackLogo from '$icons/tech-logos/Jamstack-logo.svg';
  import clineLogo from '$icons/tech-logos/cline.svg';
  import openrouterLogo from '$icons/tech-logos/openrouter.svg';
  import postCssAr21Logo from '$icons/tech-logos/postcss-ar21.svg';
  import puppeteerLogo from '$icons/tech-logos/pptrdev-icon.svg';
  import swiperLogo from '$icons/tech-logos/swiper-logo.svg';

  // Export speed property to make it configurable (higher number = faster)
  export let speed = 0.5;

  const techLogos = [
    { name: 'Svelte', src: svelteLogo },
    { name: 'TypeScript', src: typescriptLogo },
    { name: 'Tailwind CSS', src: tailwindLogo },
    { name: 'DaisyUI', src: daisyUiLogo },
    { name: 'GraphQL', src: graphqlLogo },
    { name: 'Node.js', src: nodejsLogo },
    { name: 'Netlify', src: netlifyLogo },
    { name: 'Vite', src: vitejsLogo },
    { name: 'Hygraph', src: hygraphLogo },
    { name: 'OpenAI', src: openaiLogo },
    { name: 'Anthropic', src: anthropicLogo },
    { name: 'Gemini', src: geminiLogo },
    { name: 'Claude', src: claudeLogo },
    { name: 'Ollama', src: ollamaLogo },
    { name: 'PostCSS', src: postCssLogo },
    { name: 'npm', src: npmLogo },
    { name: 'GitHub', src: githubLogo },
    { name: 'Mapbox', src: mapboxLogo },
    { name: 'Markdown', src: markdownLogo },
    { name: 'Jamstack', src: jamstackLogo },
    { name: 'Cline', src: clineLogo },
    { name: 'OpenRouter', src: openrouterLogo },
    { name: 'PostCSS AR21', src: postCssAr21Logo },
    { name: 'Puppeteer', src: puppeteerLogo },
    { name: 'Swiper', src: swiperLogo }
  ];

  let container: HTMLElement;
  let animationId: number;
  let position = 0;
  let isHovered = false;

  onMount(() => {
    const animate = () => {
      if (!isHovered) {
        position -= speed;
        if (position < -600 || position > 600) {
          position = 0;
        }
        if (container) {
          container.style.transform = `translateX(${position}%)`;
        }
      }
      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  });

  function handleMouseEnter() {
    isHovered = true;
  }

  function handleMouseLeave() {
    isHovered = false;
  }

  import { m } from '$lib/paraglide/messages';
</script>

<div class="bg-base-200 w-full overflow-hidden py-12">
  <div class="mb-2 text-center">
    <h2 class="mb-2 text-3xl font-bold">{m.homepage_tech_title()}</h2>
    <p class="text-base-content/70">{m.homepage_tech_subtitle()}</p>
  </div>

  <div
    class="relative w-full overflow-hidden py-4"
    role="button"
    aria-label={m.homepage_tech_pause_animation()}
    aria-pressed={isHovered}
    tabindex="0"
    on:mouseenter={handleMouseEnter}
    on:mouseleave={handleMouseLeave}
    on:focus={handleMouseEnter}
    on:blur={handleMouseLeave}
    on:keydown={(event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        isHovered = !isHovered;
      }
    }}
  >
    <div class="flex whitespace-nowrap" bind:this={container}>
      {#each techLogos as logo, i}
        <div class="mx-8 inline-flex items-center justify-center">
          <div class="rounded-xl bg-white p-4 shadow-lg transition-shadow duration-300 hover:cursor-pointer">
            <img src={logo.src} alt={logo.name} class="block h-24 w-auto grayscale filter transition-all duration-300 hover:grayscale-0" loading="lazy" />
          </div>
        </div>
      {/each}

      <!-- Duplicate for seamless loop -->
      {#each techLogos as logo, i}
        <div class="mx-8 inline-flex items-center justify-center">
          <div class="bg-base-100 rounded-xl p-4 shadow-lg transition-shadow duration-300 hover:cursor-pointer">
            <img src={logo.src} alt={logo.name} class="block h-24 w-auto grayscale filter transition-all duration-300 hover:grayscale-0" loading="lazy" />
          </div>
        </div>
      {/each}

      {#each techLogos as logo, i}
        <div class="mx-8 inline-flex items-center justify-center">
          <div class="bg-base-100 rounded-xl p-4 shadow-lg transition-shadow duration-300 hover:cursor-pointer">
            <img src={logo.src} alt={logo.name} class="block h-24 w-auto grayscale filter transition-all duration-300 hover:grayscale-0" loading="lazy" />
          </div>
        </div>
      {/each}
    </div>
  </div>

  <div class="mt-6 text-center">
    <p class="tiny-label">{m.homepage_tech_hover_hint()}</p>
  </div>
</div>

<style lang="postcss">
  @reference '../../app.css';
  img {
    @apply max-w-fit;
  }
</style>
