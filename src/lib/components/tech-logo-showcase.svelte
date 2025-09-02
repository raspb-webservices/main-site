<script lang="ts">
  import { onMount } from 'svelte';

  // Export speed property to make it configurable (higher number = faster)
  export let speed = 0.5;

  // List of technology logos with correct paths
  const techLogos = [
    { name: 'Svelte', src: '/icons/tech-logos/svelte-logo.svg' },
    { name: 'TypeScript', src: '/icons/tech-logos/typescript-logo.svg' },
    { name: 'Tailwind CSS', src: '/icons/tech-logos/tailwind-css-logo.svg' },
    { name: 'DaisyUI', src: '/icons/tech-logos/daisyUi.svg' },
    { name: 'GraphQL', src: '/icons/tech-logos/GraphQL-logo.svg' },
    { name: 'Node.js', src: '/icons/tech-logos/node-js-logo.svg' },
    { name: 'Netlify', src: '/icons/tech-logos/netlify-logo.svg' },
    { name: 'Vite', src: '/icons/tech-logos/vitejs-logo.svg' },
    { name: 'Hygraph', src: '/icons/tech-logos/hygraph-logo.svg' },
    { name: 'OpenAI', src: '/icons/tech-logos/openai.svg' },
    { name: 'Anthropic', src: '/icons/tech-logos/anthropic.svg' },
    { name: 'Gemini', src: '/icons/tech-logos/gemini-color.svg' },
    { name: 'Claude', src: '/icons/tech-logos/claude-color.svg' },
    { name: 'Ollama', src: '/icons/tech-logos/ollama.svg' },
    { name: 'PostCSS', src: '/icons/tech-logos/PostCSS_Logo.svg' },
    { name: 'npm', src: '/icons/tech-logos/npm-logo.svg' },
    { name: 'GitHub', src: '/icons/tech-logos/GitHub-logo.svg' },
    { name: 'Mapbox', src: '/icons/tech-logos/mapbox-logo.svg' },
    { name: 'Markdown', src: '/icons/tech-logos/markdown-logo.svg' },
    { name: 'Jamstack', src: '/icons/tech-logos/Jamstack-logo.svg' },
    { name: 'Cline', src: '/icons/tech-logos/cline.svg' },
    { name: 'OpenRouter', src: '/icons/tech-logos/openrouter.svg' },
    { name: 'PostCSS AR21', src: '/icons/tech-logos/postcss-ar21.svg' },
    { name: 'Puppeteer', src: '/icons/tech-logos/pptrdev-icon.svg' },
    { name: 'Swiper', src: '/icons/tech-logos/swiper-logo.svg' }
  ];

  let container: HTMLElement;
  let animationId: number;
  let position = 0;
  let isHovered = false;

  onMount(() => {
    const animate = () => {
      if (!isHovered) {
        position -= speed;
        if(position < -600 || position > 600 ) { position = 0}
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
</script>

<div class="bg-base-200 py-12 w-full overflow-hidden">
  <div class="mb-2 text-center">
    <h2 class="mb-2 text-3xl font-bold">Unser Technologie-Stack</h2>
    <p class="text-base-content/70">Moderne Tools für außergewöhnliche Ergebnisse</p>
  </div>

  <div class="relative w-full overflow-hidden py-4" on:mouseenter={handleMouseEnter} on:mouseleave={handleMouseLeave}>
    <div class="flex whitespace-nowrap" bind:this={container}>
      {#each techLogos as logo, i}
        <div class="mx-8 inline-flex items-center justify-center">
          <div class="bg-white rounded-xl p-4 shadow-lg transition-shadow duration-300 hover:cursor-pointer">
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
    <p class="text-base-content/60 text-sm no-padding">Fahren Sie mit der Maus darüber, um die Animation zu pausieren</p>
  </div>
</div>

<style lang="postcss">
  @reference '../../app.css';
  img {
    @apply max-w-fit;
  }
</style>
