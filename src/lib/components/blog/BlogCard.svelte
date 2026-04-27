<script lang="ts">
  import type { BlogPost } from '$lib/data/blog/posts';
  
  interface Props {
    post: BlogPost;
    featured?: boolean;
  }
  
  let { post, featured = false }: Props = $props();
  
  const categoryColors: Record<string, string> = {
    'KI-Agenten': 'badge-primary',
    'Business OS': 'badge-secondary',
    'Tutorial': 'badge-accent',
    'Case Study': 'badge-info',
    'Branchen': 'badge-success',
    'Technologie': 'badge-warning'
  };
</script>

<article class="card {featured ? 'bg-base-100 shadow-xl' : 'bg-base-200 shadow-md'} hover:shadow-xl transition-all duration-300 group">
  <figure class="relative overflow-hidden">
    <img 
      src={post.image} 
      alt={post.title}
      class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
    />
    {#if featured}
      <div class="absolute top-4 left-4">
        <span class="badge badge-primary badge-lg">⭐ Featured</span>
      </div>
    {/if}
    <div class="absolute top-4 right-4">
      <span class="badge {categoryColors[post.category] || 'badge-neutral'}">{post.category}</span>
    </div>
  </figure>
  
  <div class="card-body">
    <div class="flex items-center gap-2 text-sm text-base-content/60 mb-2">
      <time datetime={post.date}>{new Date(post.date).toLocaleDateString('de-DE', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
      <span>•</span>
      <span>{post.readTime} Min. Lesezeit</span>
    </div>
    
    <h2 class="card-title {featured ? 'text-2xl' : 'text-xl'} group-hover:text-primary transition-colors">
      <a href="/blog/{post.slug}">{post.title}</a>
    </h2>
    
    <p class="text-base-content/70 {featured ? 'text-lg' : ''}">{post.excerpt}</p>
    
    <div class="flex flex-wrap gap-2 mt-4">
      {#each post.tags.slice(0, 3) as tag}
        <span class="badge badge-outline badge-sm">{tag}</span>
      {/each}
    </div>
    
    <div class="card-actions justify-end mt-4">
      <a href="/blog/{post.slug}" class="btn btn-primary btn-sm">
        Weiterlesen →
      </a>
    </div>
  </div>
</article>
