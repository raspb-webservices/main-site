<script lang="ts">
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';
  import NewsletterSignup from '$lib/components/newsletter-signup.svelte';

  let { data } = $props();
  const Content = $derived(data.content);

  function formatDate(dateStr: string) {
    return new Intl.DateTimeFormat('de-DE', { day: '2-digit', month: 'long', year: 'numeric' }).format(
      new Date(dateStr)
    );
  }

  const canonicalUrl = $derived(`https://raspb.de/blog/${data.meta.slug}`);
</script>

<svelte:head>
  <title>{data.meta.title} | raspb Blog</title>
  <meta name="description" content={data.meta.excerpt} />
  <link rel="canonical" href={canonicalUrl} />
  <meta property="og:title" content={data.meta.title} />
  <meta property="og:description" content={data.meta.excerpt} />
  <meta property="og:type" content="article" />
  <meta property="og:url" content={canonicalUrl} />
  {#if data.meta.coverImage}
    <meta property="og:image" content="https://raspb.de{data.meta.coverImage}" />
  {/if}
  <meta property="article:published_time" content={data.meta.date} />
</svelte:head>

<article class="blog-post">
  <header class="post-header">
    <div class="inner">
      <button class="back-link" onclick={() => goto(resolve('/blog'))}>
        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Alle Artikel
      </button>
      <span class="badge">{data.meta.category}</span>
      <h1>{data.meta.title}</h1>
      <p class="excerpt">{data.meta.excerpt}</p>
      <time datetime={data.meta.date}>{formatDate(data.meta.date)}</time>
    </div>
  </header>

  {#if data.meta.coverImage}
    <div class="cover-image">
      <img
        src={data.meta.coverImage}
        alt={data.meta.title}
        width="1200"
        height="630"
        loading="eager"
        fetchpriority="high"
        onerror={(e) => {
          (e.currentTarget as HTMLImageElement).src =
            'https://picsum.photos/seed/' + data.meta.slug + '/1200/630';
        }}
      />
    </div>
  {/if}

  <div class="post-content">
    <div class="inner prose">
      <Content />
    </div>
  </div>

  <div class="newsletter-section">
    <div class="inner">
      <NewsletterSignup />
    </div>
  </div>
</article>

<style lang="postcss">
  @reference '../../../../app.css';

  .blog-post {
    @apply pb-20;
  }

  .post-header {
    @apply bg-base-200 py-14;
    .inner {
      @apply mx-auto flex max-w-3xl flex-col gap-4 px-4;
    }
    .back-link {
      @apply text-primary flex cursor-pointer items-center gap-1.5 text-sm font-medium transition-opacity hover:opacity-70;
      svg {
        @apply h-4 w-4;
      }
    }
    .badge {
      @apply bg-primary/10 text-primary w-fit rounded-full px-3 py-0.5 text-xs font-semibold;
    }
    h1 {
      @apply text-base-content text-4xl font-bold leading-tight md:text-5xl;
    }
    .excerpt {
      @apply text-base-content/70 text-xl leading-relaxed;
    }
    time {
      @apply text-base-content/50 text-sm;
    }
  }

  .cover-image {
    @apply mx-auto max-w-5xl px-4 pt-10;
    img {
      @apply h-auto w-full rounded-2xl object-cover shadow-lg;
      max-height: 480px;
    }
  }

  .post-content {
    @apply pt-10;
    .inner {
      @apply mx-auto max-w-3xl px-4;
    }
  }

  .prose {
    :global(h1) { @apply text-base-content mt-10 mb-4 text-3xl font-bold; }
    :global(h2) { @apply text-base-content mt-8 mb-3 text-2xl font-bold; }
    :global(h3) { @apply text-base-content mt-6 mb-2 text-xl font-semibold; }
    :global(p) { @apply text-base-content/80 mb-4 leading-relaxed; }
    :global(ul), :global(ol) { @apply text-base-content/80 mb-4 pl-6; }
    :global(ul) { @apply list-disc; }
    :global(ol) { @apply list-decimal; }
    :global(li) { @apply mb-1.5; }
    :global(strong) { @apply text-base-content font-semibold; }
    :global(a) { @apply text-primary underline; }
    :global(blockquote) {
      @apply border-primary/40 text-base-content/70 my-6 border-l-4 pl-4 italic;
    }
    :global(code) {
      @apply bg-base-200 rounded px-1.5 py-0.5 font-mono text-sm;
    }
    :global(pre) {
      @apply bg-base-200 mb-4 overflow-x-auto rounded-xl p-4;
      :global(code) { @apply bg-transparent p-0; }
    }
    :global(hr) { @apply border-base-300 my-8; }
  }

  .newsletter-section {
    @apply pt-16;
    .inner {
      @apply mx-auto max-w-3xl px-4;
    }
  }
</style>
