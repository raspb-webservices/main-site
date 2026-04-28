<script lang="ts">
  import type { PageData } from './$types';
  import NewsletterSignup from '$lib/components/newsletter-signup.svelte';

  let { data }: { data: PageData } = $props();
  const { post } = data;

  function formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('de-DE', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  }
</script>

<svelte:head>
  <title>{post.title} | raspb Webservices</title>
  <meta name="description" content={post.excerpt} />
  <meta property="og:title" content={post.title} />
  <meta property="og:description" content={post.excerpt} />
  <meta property="og:type" content="article" />
  {#if post.coverImage}
    <meta property="og:image" content={post.coverImage} />
  {/if}
  <link rel="canonical" href="https://raspb.de/blog/{post.slug}" />
</svelte:head>

<article class="blog-article">
  <header class="article-hero">
    <div class="hero-inner">
      <div class="article-meta">
        <span class="category-badge">{post.category}</span>
        <time class="article-date" datetime={post.date}>{formatDate(post.date)}</time>
      </div>
      <h1 class="article-title">{post.title}</h1>
      <p class="article-excerpt">{post.excerpt}</p>
    </div>
  </header>

  <div class="article-body">
    <div class="prose-wrapper">
      <a href="/blog" class="back-link">← Zurück zum Blog</a>
      <div class="prose">{@html post.content}</div>
    </div>
  </div>
</article>

<section class="newsletter-section">
  <NewsletterSignup />
</section>

<style lang="postcss">
  @reference '../../../../app.css';


  .blog-article {
    @apply min-h-screen;
  }

  .article-hero {
    background-image: radial-gradient(
      100% 308.42% at 102.05% 0%,
      rgb(13, 116, 224) 0%,
      rgb(160, 61, 206) 36.98%,
      rgb(18, 29, 51) 100%
    );
    @apply flex min-h-72 items-center justify-center text-white;

    .hero-inner {
      @apply mx-auto max-w-3xl px-6 py-16 text-center;

      .article-meta {
        @apply mb-4 flex items-center justify-center gap-3;
      }

      .category-badge {
        @apply rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur-sm;
      }

      .article-date {
        @apply text-sm opacity-75;
      }

      .article-title {
        @apply mb-4 text-3xl font-bold leading-tight md:text-4xl;
      }

      .article-excerpt {
        @apply text-lg opacity-85;
      }
    }
  }

  .article-body {
    @apply bg-base-100 py-16;

    .prose-wrapper {
      @apply mx-auto max-w-3xl px-6;

      .back-link {
        @apply text-primary mb-8 inline-block text-sm font-semibold hover:underline;
      }
    }
  }

  .prose {
    @apply text-base-content max-w-none text-base leading-relaxed;

    :global(h1, h2, h3, h4) {
      @apply font-bold leading-snug mt-8 mb-4;
    }
    :global(h1) { @apply text-3xl; }
    :global(h2) { @apply text-2xl; }
    :global(h3) { @apply text-xl; }
    :global(p) { @apply mb-4; }
    :global(ul, ol) { @apply mb-4 pl-6; }
    :global(ul) { @apply list-disc; }
    :global(ol) { @apply list-decimal; }
    :global(li) { @apply mb-1; }
    :global(strong) { @apply font-bold; }
    :global(em) { @apply italic; }
    :global(a) { @apply text-primary underline hover:no-underline; }
    :global(hr) { @apply border-base-300 my-8; }
    :global(blockquote) { @apply border-l-4 border-primary pl-4 italic opacity-80 my-4; }
    :global(code) { @apply bg-base-200 px-1.5 py-0.5 rounded text-sm font-mono; }
    :global(pre) { @apply bg-base-200 p-4 rounded-xl overflow-x-auto mb-4; }
    :global(pre code) { @apply bg-transparent p-0; }
  }

  .newsletter-section {
    @apply bg-gray-50 py-16;
    > :global(*) {
      @apply mx-auto max-w-4xl px-6;
    }
  }
</style>
