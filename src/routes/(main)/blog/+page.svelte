<script lang="ts">
  import Section from '$lib/components/ui/section.svelte';
  import BlogCard from '$lib/components/blog/BlogCard.svelte';
  import { posts, getFeaturedPosts, getRecentPosts } from '$lib/data/blog/posts';
  import { m } from '$lib/paraglide/messages';
  import { localizeHref } from '$lib/paraglide/runtime';

  let selectedCategory = $state('all');
  let searchQuery = $state('');

  const categories = ['all', 'KI-Agenten', 'Business OS', 'Tutorial', 'Case Study', 'Branchen', 'Technologie'];

  let filteredPosts = $derived(() => {
    let result = posts;
    
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(query) ||
        p.excerpt.toLowerCase().includes(query) ||
        p.tags.some(t => t.toLowerCase().includes(query))
      );
    }
    
    return result;
  });

  let featuredPosts = $derived(getFeaturedPosts());
  let recentPosts = $derived(getRecentPosts(3));
</script>

<svelte:head>
  <title>Blog - raspb | KI-Agenten, Business OS & Webentwicklung</title>
  <meta name="description" content="Tipps, Trends und Wissen rund um KI-Agenten, Business OS, Webentwicklung und Digitalisierung für KMUs. Praxisnahe Artikel von den Experten." />
  <meta property="og:title" content="Blog - raspb" />
  <meta property="og:description" content="KI-Agenten, Business OS und Webentwicklung - aktuelle Einblicke und Praxiswissen." />
  <meta property="og:type" content="blog" />
</svelte:head>

<!-- Hero Section -->
<section class="hero bg-gradient-to-br from-primary/10 to-secondary/10 py-20">
  <div class="container mx-auto px-6 text-center">
    <h1 class="text-5xl font-bold mb-6">
      {m.blog_hero_title() || 'raspb Blog'}
    </h1>
    <p class="text-xl text-base-content/70 max-w-2xl mx-auto mb-8">
      {m.blog_hero_subtitle() || 'Tipps, Trends und Wissen rund um KI-Agenten, Business OS und Webentwicklung für KMUs.'}
    </p>
    
    <!-- Newsletter Signup -->
    <div class="card bg-base-100 shadow-xl max-w-md mx-auto">
      <div class="card-body">
        <h2 class="card-title justify-center text-lg">📬 Newsletter abonnieren</h2>
        <p class="text-sm text-base-content/70">Wöchentliche KI-Insights direkt in Ihr Postfach.</p>
        <div class="form-control">
          <div class="input-group flex gap-2">
            <input 
              type="email" 
              placeholder="ihre@email.de" 
              class="input input-bordered flex-1"
            />
            <button class="btn btn-primary">Abonnieren</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Featured Posts -->
{#if featuredPosts.length > 0}
  <Section>
    <div class="container mx-auto px-6">
      <h2 class="text-3xl font-bold mb-8">⭐ Featured Articles</h2>
      <div class="grid md:grid-cols-2 gap-8">
        {#each featuredPosts as post}
          <BlogCard {post} featured={true} />
        {/each}
      </div>
    </div>
  </Section>
{/if}

<!-- Filter & Search -->
<Section>
  <div class="container mx-auto px-6">
    <div class="flex flex-col md:flex-row gap-4 mb-8">
      <!-- Search -->
      <div class="form-control flex-1">
        <input 
          type="text" 
          placeholder="🔍 Artikel suchen..." 
          class="input input-bordered w-full"
          bind:value={searchQuery}
        />
      </div>
      
      <!-- Category Filter -->
      <div class="flex flex-wrap gap-2">
        {#each categories as category}
          <button 
            class="btn btn-sm {selectedCategory === category ? 'btn-primary' : 'btn-outline'}"
            onclick={() => selectedCategory = category}
          >
            {category === 'all' ? 'Alle' : category}
          </button>
        {/each}
      </div>
    </div>

    <!-- Posts Grid -->
    {#if filteredPosts.length > 0}
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {#each filteredPosts as post (post.slug)}
          <BlogCard {post} />
        {/each}
      </div>
    {:else}
      <div class="text-center py-12">
        <p class="text-xl text-base-content/50">Keine Artikel gefunden.</p>
        <button 
          class="btn btn-primary mt-4"
          onclick={() => { selectedCategory = 'all'; searchQuery = ''; }}
        >
          Filter zurücksetzen
        </button>
      </div>
    {/if}
  </div>
</Section>

<!-- Categories Overview -->
<Section>
  <div class="container mx-auto px-6">
    <h2 class="text-3xl font-bold mb-8">Kategorien</h2>
    <div class="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
      {#each categories.slice(1) as category}
        <button 
          class="card bg-base-200 hover:bg-base-300 transition-colors cursor-pointer"
          onclick={() => selectedCategory = category}
        >
          <div class="card-body items-center text-center p-4">
            <span class="text-2xl">
              {#if category === 'KI-Agenten'}🤖
              {:else if category === 'Business OS'}⚡
              {:else if category === 'Tutorial'}📚
              {:else if category === 'Case Study'}📊
              {:else if category === 'Branchen'}🏢
              {:else if category === 'Technologie'}💻
              {/if}
            </span>
            <h3 class="card-title text-sm">{category}</h3>
            <p class="text-xs text-base-content/60">
              {posts.filter(p => p.category === category).length} Artikel
            </p>
          </div>
        </button>
      {/each}
    </div>
  </div>
</Section>

<!-- CTA Section -->
<Section>
  <div class="container mx-auto px-6">
    <div class="card bg-gradient-to-r from-primary to-secondary text-primary-content shadow-xl">
      <div class="card-body text-center">
        <h2 class="card-title text-3xl justify-center mb-4">Bereit für Ihr KI-Projekt?</h2>
        <p class="text-lg mb-6">Lassen Sie sich von unseren Experten beraten und starten Sie noch heute mit der Automatisierung.</p>
        <div class="card-actions justify-center">
          <a href={localizeHref('/contact')} class="btn btn-lg">
            Kostenlose Beratung anfordern
          </a>
        </div>
      </div>
    </div>
  </div>
</Section>
