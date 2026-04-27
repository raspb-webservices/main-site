<script lang="ts">
  import { resolve } from '$app/paths';
  import Fuse from 'fuse.js';
  import type { PostMeta } from '$lib/blog';

  let { data } = $props();

  const categories = $derived(['Alle', ...new Set((data.posts as PostMeta[]).map((p) => p.category))]);

  let selectedCategory = $state('Alle');
  let searchQuery = $state('');

  const fuse = $derived(
    new Fuse(data.posts as PostMeta[], {
      keys: ['title', 'excerpt', 'category'],
      threshold: 0.35
    })
  );

  const filteredPosts = $derived.by(() => {
    let result: PostMeta[] = data.posts;

    if (searchQuery.trim().length > 1) {
      result = fuse.search(searchQuery).map((r) => r.item);
    }

    if (selectedCategory !== 'Alle') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    return result;
  });

  function formatDate(dateStr: string) {
    return new Intl.DateTimeFormat('de-DE', { day: '2-digit', month: 'long', year: 'numeric' }).format(
      new Date(dateStr)
    );
  }
</script>

<svelte:head>
  <title>Blog | raspb — IT-Wissen für den Mittelstand</title>
  <meta name="description" content="Praxisnahes IT-Wissen für KMUs: KI, Webentwicklung, Prozessautomatisierung und IT-Sicherheit — erklärt ohne Fachjargon." />
  <meta property="og:title" content="Blog | raspb — IT-Wissen für den Mittelstand" />
  <meta property="og:description" content="Praxisnahes IT-Wissen für KMUs: KI, Webentwicklung, Prozessautomatisierung und IT-Sicherheit — erklärt ohne Fachjargon." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://raspb.de/blog" />
</svelte:head>

<section class="blog-hero">
  <div class="inner">
    <h1>Blog</h1>
    <p>Praxisnahes IT-Wissen für den Mittelstand — ohne Fachjargon.</p>
  </div>
</section>

<section class="blog-controls">
  <div class="inner">
    <div class="search-box">
      <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <input
        type="search"
        placeholder="Artikel suchen…"
        bind:value={searchQuery}
        aria-label="Artikel suchen"
      />
    </div>

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

<section class="blog-grid">
  <div class="inner">
    {#if filteredPosts.length === 0}
      <p class="no-results">Keine Artikel gefunden. Bitte passen Sie Ihre Suche an.</p>
    {:else}
      <div class="grid">
        {#each filteredPosts as post (post.slug)}
          <article class="card">
            <a class="card-image-link" href={resolve(`/blog/${post.slug}`)} aria-label={post.title}>
              <img
                src={post.coverImage}
                alt={post.title}
                loading="lazy"
                width="640"
                height="360"
                onerror={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    'https://picsum.photos/seed/' + post.slug + '/640/360';
                }}
              />
            </a>
            <div class="card-body">
              <span class="badge">{post.category}</span>
              <h2>
                <a class="title-link" href={resolve(`/blog/${post.slug}`)}>
                  {post.title}
                </a>
              </h2>
              <p class="excerpt">{post.excerpt}</p>
              <div class="card-footer">
                <time datetime={post.date}>{formatDate(post.date)}</time>
                <a class="btn-read" href={resolve(`/blog/${post.slug}`)}>Weiterlesen</a>
              </div>
            </div>
          </article>
        {/each}
      </div>
    {/if}
  </div>
</section>

<style lang="postcss">
  @reference '../../../app.css';

  .blog-hero {
    @apply bg-base-200 py-20 text-center;
    .inner {
      @apply mx-auto max-w-3xl px-4;
      h1 {
        @apply text-base-content mb-4 text-5xl font-bold;
      }
      p {
        @apply text-base-content/70 text-xl;
      }
    }
  }

  .blog-controls {
    @apply border-base-200 border-b py-6;
    .inner {
      @apply mx-auto flex max-w-7xl flex-col gap-4 px-4 sm:flex-row sm:items-center sm:justify-between;
    }
  }

  .search-box {
    @apply border-base-300 bg-base-100 focus-within:border-primary flex items-center gap-2 rounded-xl border px-4 py-2 transition-colors;
    svg {
      @apply text-base-content/40 h-5 w-5 shrink-0;
    }
    input {
      @apply bg-transparent text-base outline-none placeholder:text-base-content/40 w-full;
    }
  }

  .category-filter {
    @apply flex flex-wrap gap-2;
    .cat-btn {
      @apply border-base-300 text-base-content/70 cursor-pointer rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-200;
      &:hover {
        @apply border-primary text-primary;
      }
      &.active {
        @apply bg-primary border-primary text-primary-content;
      }
    }
  }

  .blog-grid {
    @apply py-12;
    .inner {
      @apply mx-auto max-w-7xl px-4;
    }
    .no-results {
      @apply text-base-content/60 py-12 text-center text-lg;
    }
  }

  .grid {
    @apply grid gap-8 sm:grid-cols-2 lg:grid-cols-3;
  }

  .card {
    @apply bg-base-100 border-base-200 flex flex-col overflow-hidden rounded-2xl border shadow-sm transition-shadow duration-300 hover:shadow-lg;

    .card-image-link {
      @apply block cursor-pointer overflow-hidden p-0;
      img {
        @apply h-48 w-full object-cover transition-transform duration-500;
      }
      &:hover img {
        @apply scale-105;
      }
    }

    .card-body {
      @apply flex flex-1 flex-col gap-3 p-5;
    }

    .badge {
      @apply bg-primary/10 text-primary w-fit rounded-full px-3 py-0.5 text-xs font-semibold;
    }

    h2 {
      @apply text-base-content text-xl font-bold leading-snug;
      .title-link {
        @apply cursor-pointer text-left transition-colors duration-200 hover:text-primary;
      }
    }

    .excerpt {
      @apply text-base-content/70 flex-1 text-sm leading-relaxed;
    }

    .card-footer {
      @apply flex items-center justify-between pt-2;
      time {
        @apply text-base-content/50 text-xs;
      }
      .btn-read {
        @apply text-primary cursor-pointer text-sm font-semibold transition-colors hover:underline;
      }
    }
  }
</style>
