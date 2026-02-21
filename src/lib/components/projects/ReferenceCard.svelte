<script lang="ts">
  /* 
     Vorschlag für: src/lib/components/projects/ReferenceCard.svelte 
     Angepasst für die öffentliche Portfolio-Ansicht (raspb Standard)
  */
  let { project } = $props();
  
  const techStack = $derived(project.tech || ['SvelteKit', 'TailwindCSS', 'Node.js']);
</script>

<div class="card bg-base-100 shadow-xl overflow-hidden group hover:-translate-y-2 transition-all duration-300 border border-base-200">
  <!-- Image Showcase -->
  <figure class="relative h-48 overflow-hidden bg-base-200">
    <img 
      src={project.image}
      alt={project.name} 
      class="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
    />
    {#if project.isLighthouse}
      <div class="absolute top-4 right-4 badge badge-primary shadow-lg gap-2 p-3 font-bold">
        🌟 Leuchtturm-Projekt
      </div>
    {/if}
  </figure>

  <div class="card-body p-6">
    <div class="flex justify-between items-start mb-2">
      <h3 class="card-title text-xl font-bold">{project.name}</h3>
    </div>
    
    <p class="text-base-content/70 text-sm line-clamp-3 mb-4 min-h-18">
      {project.description}
    </p>

    <!-- Tech Stack Tags -->
    <div class="flex flex-wrap gap-2 mt-auto">
      {#each techStack as tech}
        <span class="badge badge-outline badge-sm opacity-60 font-medium">{tech}</span>
      {/each}
    </div>

    <!-- Actions -->
    <div class="card-actions justify-end mt-6 pt-4 border-t border-base-200">
      <a href={project.url} target="_blank" class="btn btn-primary btn-sm btn-ghost gap-2">
        Details ansehen
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    </div>
  </div>
</div>
