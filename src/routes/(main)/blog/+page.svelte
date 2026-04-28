<script lang="ts">
  import { onMount } from 'svelte';
  import type { PageData } from './$types';
  import NewsletterSignup from '$lib/components/newsletter-signup.svelte';
  import type { Post } from '$lib/blog.server';

  let { data }: { data: PageData } = $props();

  const allPosts: Post[] = data.posts;
  const categories = ['Alle', ...new Set(allPosts.map((p) => p.category))];

  let searchQuery = $state('');
  let selectedCategory = $state('Alle');
  let fuse: import('fuse.js').default<Post> | null = $state(null);

  onMount(async () => {
    const Fuse = (await import('fuse.js')).default;
    fuse = new Fuse(allPosts, {
      keys: ['title', 'excerpt', 'category'],
      threshold: 0.35
    });
  });

  const filteredPosts = $derived.by(() => {
    let result = allPosts;

    if (searchQuery.trim() && fuse) {
      result = fuse.search(searchQuery).map((r) => r.item);
    }

    if (selectedCategory !== 'Alle') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    return result;
  });

  function formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('de-DE', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  }
</script>

<svelte:head>
  <title>Blog | raspb Webservices</title>
  <meta
    name="description"
    content="Praxiswissen für den Mittelstand: KI, Digitalisierung und Webentwicklung ohne Buzzwords."
  />
  <meta property="og:title" content="Blog | raspb Webservices" />
  <meta
    property="og:description"
    content="Praxiswissen für den Mittelstand: KI, Digitalisierung und Webentwicklung ohne Buzzwords."
  />
  <meta property="og:type" content="website" />
</svelte:head>

<section class="blog-hero">
  <div class="hero-content">
    <h1>Blog</h1>
    <p>Praxiswissen für den Mittelstand — ohne Hype, ohne Buzzwords.</p>
  </div>
</section>

<section class="blog-controls">
  <div class="controls-inner">
    <input
      type="search"
      class="search-input"
      placeholder="Artikel suchen..."
      bind:value={searchQuery}
      aria-label="Artikel suchen"
    />
    <div class="category-filter" role="group" aria-label="Kategorie filtern">
      {#each categories as cat}
        <button
          class="cat-btn"
          class:active={selectedCategory === cat}
          onclick={() => (selectedCategory = cat)}
        >
          {cat}
        </button>
      {/each}
    </div>
  </div>
</section>

<section class="blog-grid-section">
  <div class="blog-grid">
    {#if filteredPosts.length === 0}
      <p class="no-results">Keine Artikel gefunden.</p>
    {:else}
      {#each filteredPosts as post (post.slug)}
        <article class="post-card">
          <a href="/blog/{post.slug}" class="card-link" aria-label={post.title}>
            <div class="card-cover" aria-hidden="true">
              <span class="category-badge">{post.category}</span>
            </div>
            <div class="card-body">
              <time class="card-date" datetime={post.date}>{formatDate(post.date)}</time>
              <h2 class="card-title">{post.title}</h2>
              <p class="card-excerpt">{post.excerpt}</p>
              <span class="card-cta">Weiterlesen →</span>
            </div>
          </a>
        </article>
      {/each}
    {/if}
  </div>
</section>

<section class="newsletter-section">
  <NewsletterSignup />
</section>

<style lang="postcss">
  @reference '../../../app.css';

  .blog-hero {
    background-image: radial-gradient(
      100% 308.42% at 102.05% 0%,
      rgb(13, 116, 224) 0%,
      rgb(160, 61, 206) 36.98%,
      rgb(18, 29, 51) 100%
    );
    @apply flex min-h-64 items-center justify-center text-white;

    .hero-content {
      @apply max-w-3xl px-6 py-16 text-center;

      h1 {
        @apply mb-4 text-5xl font-bold;
      }

      p {
        @apply text-xl opacity-85;
      }
    }
  }

  .blog-controls {
    @apply border-b border-gray-100 bg-white py-6 shadow-sm;

    .controls-inner {
      @apply mx-auto flex max-w-6xl flex-col gap-4 px-6 sm:flex-row sm:items-center;
    }

    .search-input {
      @apply w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:max-w-xs;
    }

    .category-filter {
      @apply flex flex-wrap gap-2;
    }

    .cat-btn {
      @apply cursor-pointer rounded-full border border-gray-200 px-4 py-1.5 text-sm font-medium text-gray-600 transition-all hover:border-blue-400 hover:text-blue-600;

      &.active {
        @apply border-blue-500 bg-blue-500 text-white;
      }
    }
  }

  .blog-grid-section {
    @apply bg-gray-50 py-16;

    .blog-grid {
      @apply mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 sm:grid-cols-2 lg:grid-cols-3;
    }

    .no-results {
      @apply col-span-3 py-12 text-center text-gray-500;
    }
  }

  .post-card {
    @apply overflow-hidden rounded-2xl bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md;

    .card-link {
      @apply block no-underline;
    }

    .card-cover {
      @apply relative flex h-44 items-end bg-gradient-to-br from-blue-600 to-purple-700 p-4;
    }

    .category-badge {
      @apply rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm;
    }

    .card-body {
      @apply p-6;
    }

    .card-date {
      @apply text-xs text-gray-400;
    }

    .card-title {
      @apply mt-1 text-lg font-bold leading-snug text-gray-900;
    }

    .card-excerpt {
      @apply mt-2 text-sm leading-relaxed text-gray-500;
    }

    .card-cta {
      @apply mt-4 inline-block text-sm font-semibold text-blue-600;
    }
  }

  .newsletter-section {
    @apply bg-white py-16;
  }
</style>
