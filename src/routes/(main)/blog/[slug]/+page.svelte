<script lang="ts">
  import { page } from '$app/stores';
  import Section from '$lib/components/ui/section.svelte';
  import { getPostBySlug, getRecentPosts } from '$lib/data/blog/posts';
  import { m } from '$lib/paraglide/messages';
  import { localizeHref } from '$lib/paraglide/runtime';

  let slug = $derived($page.params.slug);
  let post = $derived(getPostBySlug(slug || ''));
  let relatedPosts = $derived(getRecentPosts(3).filter(p => p.slug !== slug));
</script>

<svelte:head>
  {#if post}
    <title>{post.title} - raspb Blog</title>
    <meta name="description" content={post.excerpt} />
    <meta property="og:title" content={post.title} />
    <meta property="og:description" content={post.excerpt} />
    <meta property="og:type" content="article" />
    <meta property="article:published_time" content={post.date} />
    <meta property="article:author" content={post.author.name} />
    {#each post.tags as tag}
      <meta property="article:tag" content={tag} />
    {/each}
  {/if}
</svelte:head>

{#if post}
  <!-- Hero Section -->
  <section class="hero bg-gradient-to-br from-primary/10 to-secondary/10 py-20">
    <div class="container mx-auto px-6">
      <div class="max-w-4xl mx-auto">
        <!-- Breadcrumb -->
        <div class="text-sm text-base-content/60 mb-6">
          <a href={localizeHref('/blog')} class="hover:text-primary">Blog</a>
          <span class="mx-2">›</span>
          <span>{post.category}</span>
        </div>
        
        <!-- Category & Date -->
        <div class="flex items-center gap-4 mb-6">
          <span class="badge badge-primary">{post.category}</span>
          <time datetime={post.date} class="text-sm text-base-content/60">
            {new Date(post.date).toLocaleDateString('de-DE', { year: 'numeric', month: 'long', day: 'numeric' })}
          </time>
          <span class="text-sm text-base-content/60">{post.readTime} Min. Lesezeit</span>
        </div>
        
        <!-- Title -->
        <h1 class="text-4xl md:text-5xl font-bold mb-6">{post.title}</h1>
        
        <!-- Author -->
        <div class="flex items-center gap-4">
          <div class="avatar">
            <div class="w-12 h-12 rounded-full">
              <img src={post.author.avatar} alt={post.author.name} />
            </div>
          </div>
          <div>
            <p class="font-semibold">{post.author.name}</p>
            <p class="text-sm text-base-content/60">Autor bei raspb</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Featured Image -->
  <div class="container mx-auto px-6 -mt-10">
    <div class="max-w-4xl mx-auto">
      <img 
        src={post.image} 
        alt={post.title}
        class="w-full h-auto rounded-xl shadow-xl"
      />
    </div>
  </div>

  <!-- Article Content -->
  <Section>
    <div class="container mx-auto px-6">
      <div class="max-w-4xl mx-auto">
        <article class="prose prose-lg max-w-none">
          {@html post.content.replace(/\n/g, '<br>')}
        </article>
        
        <!-- Tags -->
        <div class="flex flex-wrap gap-2 mt-8 pt-8 border-t">
          {#each post.tags as tag}
            <span class="badge badge-outline">{tag}</span>
          {/each}
        </div>
        
        <!-- Share Buttons -->
        <div class="flex gap-4 mt-8">
          <span class="text-sm font-semibold">Teilen:</span>
          <a 
            href="https://twitter.com/intent/tweet?text={encodeURIComponent(post.title)}&url={encodeURIComponent('https://raspb.de/blog/' + post.slug)}" 
            target="_blank" 
            rel="noopener noreferrer"
            class="btn btn-sm btn-outline"
          >
            🐦 Twitter
          </a>
          <a 
            href="https://www.linkedin.com/shareArticle?mini=true&url={encodeURIComponent('https://raspb.de/blog/' + post.slug)}&title={encodeURIComponent(post.title)}" 
            target="_blank" 
            rel="noopener noreferrer"
            class="btn btn-sm btn-outline"
          >
            💼 LinkedIn
          </a>
          <a 
            href="https://www.facebook.com/sharer/sharer.php?u={encodeURIComponent('https://raspb.de/blog/' + post.slug)}" 
            target="_blank" 
            rel="noopener noreferrer"
            class="btn btn-sm btn-outline"
          >
            📘 Facebook
          </a>
        </div>
      </div>
    </div>
  </Section>

  <!-- Related Posts -->
  {#if relatedPosts.length > 0}
    <Section>
      <div class="container mx-auto px-6">
        <h2 class="text-3xl font-bold mb-8">Weitere Artikel</h2>
        <div class="grid md:grid-cols-3 gap-8">
          {#each relatedPosts as relatedPost}
            <article class="card bg-base-200 shadow-md hover:shadow-xl transition-all">
              <figure>
                <img src={relatedPost.image} alt={relatedPost.title} class="w-full h-48 object-cover" />
              </figure>
              <div class="card-body">
                <span class="badge badge-primary badge-sm w-fit">{relatedPost.category}</span>
                <h3 class="card-title text-lg">
                  <a href="/blog/{relatedPost.slug}" class="hover:text-primary">{relatedPost.title}</a>
                </h3>
                <p class="text-sm text-base-content/70">{relatedPost.excerpt.slice(0, 100)}...</p>
              </div>
            </article>
          {/each}
        </div>
      </div>
    </Section>
  {/if}

  <!-- CTA Section -->
  <Section>
    <div class="container mx-auto px-6">
      <div class="card bg-gradient-to-r from-primary to-secondary text-primary-content shadow-xl">
        <div class="card-body text-center">
          <h2 class="card-title text-3xl justify-center mb-4">Newsletter abonnieren</h2>
          <p class="text-lg mb-6">Erhalten Sie wöchentlich die besten KI-Tipps und Trends direkt in Ihr Postfach.</p>
          <div class="card-actions justify-center">
            <div class="form-control">
              <div class="input-group flex gap-2">
                <input 
                  type="email" 
                  placeholder="ihre@email.de" 
                  class="input input-bordered"
                />
                <button class="btn">Abonnieren</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Section>
{:else}
  <!-- 404 State -->
  <section class="hero min-h-[60vh]">
    <div class="hero-content text-center">
      <div>
        <h1 class="text-5xl font-bold">Artikel nicht gefunden</h1>
        <p class="py-6">Der gesuchte Artikel existiert leider nicht.</p>
        <a href={localizeHref('/blog')} class="btn btn-primary">← Zurück zum Blog</a>
      </div>
    </div>
  </section>
{/if}
