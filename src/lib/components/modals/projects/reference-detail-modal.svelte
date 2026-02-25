<script lang="ts">
  import { m } from '$lib/paraglide/messages';

  let { selectedProject } = $props();
  let modal: HTMLDialogElement;
  let lightboxDialog: HTMLDialogElement;
  let lightboxImage: string | null = $state(null);

  const msg = (key: string): string =>
    (m as unknown as Record<string, () => string>)[key]?.() ?? '';

  export function openModal() {
    modal?.showModal();
  }
  export function closeModal() {
    modal?.close();
  }

  function openLightbox(img: string) {
    lightboxImage = img;
    lightboxDialog?.showModal();
  }
</script>

<!-- Main project detail modal -->
<dialog bind:this={modal} class="modal">
  <div class="modal-box w-11/12 max-w-4xl px-8 py-8">
    <!-- Close button -->
    <div class="absolute top-4 right-4">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost" onclick={closeModal}>✕</button>
      </form>
    </div>

    {#if selectedProject}
      <!-- Header: name + badges on one line -->
      <div class="mb-2 flex flex-wrap items-center gap-3">
        <h3 class="text-2xl font-bold">{selectedProject.name}</h3>
        {#if selectedProject.isLighthouse}
          <span class="badge badge-primary gap-1 font-semibold">
            🌟 {m.insights_showcase_modal_badge_lighthouse()}
          </span>
        {/if}
        {#if selectedProject.isProBono}
          <span class="badge badge-secondary gap-1 font-semibold">
            ❤️ {m.insights_showcase_modal_badge_probono()}
          </span>
        {/if}
        {#if selectedProject.isWip}
          <span class="badge badge-warning gap-1 font-semibold">
            🚧 {m.insights_showcase_modal_badge_wip()}
          </span>
        {/if}
      </div>

      <!-- Subtitle -->
      <p class="text-base-content/50 mb-8 text-xs tracking-wide uppercase">
        {msg(`insights_showcase_modal_${selectedProject.key}_subtitle`)}
      </p>

      <!-- Screenshots grid (clickable → lightbox) -->
      {#if selectedProject.images && selectedProject.images.length > 0}
        <div class="mb-8 grid grid-cols-2 gap-3 md:grid-cols-3">
          {#each selectedProject.images as img, i}
            <button
              type="button"
              class="screenshot-thumb"
              onclick={() => openLightbox(img)}
              aria-label="Screenshot {i + 1} vergrößern"
            >
              <img
                src={img}
                alt="{selectedProject.name} Screenshot {i + 1}"
                class="h-36 w-full rounded-xl object-cover object-top shadow-md"
                loading="lazy"
              />
              <span class="screenshot-zoom-hint">🔍</span>
            </button>
          {/each}
        </div>
      {/if}

      <!-- Description -->
      <p class="mb-8 leading-relaxed">
        {msg(`insights_showcase_modal_${selectedProject.key}_description`)}
      </p>

      <!-- Highlights -->
      {#if selectedProject.highlightsCount > 0}
        <div class="mb-8">
          <h4 class="mb-4 font-semibold">{m.insights_showcase_modal_section_highlights()}</h4>
          <ul class="space-y-3">
            {#each Array.from({ length: selectedProject.highlightsCount }, (_, i) => i + 1) as i}
              <li class="flex gap-3">
                <span class="text-primary mt-0.5 shrink-0 font-bold">✓</span>
                <span class="text-sm leading-relaxed">
                  {msg(`insights_showcase_modal_${selectedProject.key}_highlight${i}`)}
                </span>
              </li>
            {/each}
          </ul>
        </div>
      {/if}

      <!-- Tech Stack -->
      {#if selectedProject.tech && selectedProject.tech.length > 0}
        <div class="mb-10">
          <h4 class="mb-4 font-semibold">{m.insights_showcase_modal_section_tech()}</h4>
          <div class="flex flex-wrap gap-2">
            {#each selectedProject.tech as tech}
              <span class="badge badge-outline badge-sm font-medium">{tech}</span>
            {/each}
          </div>
        </div>
      {/if}

      <!-- CTA row -->
      <div class="flex items-center gap-4 border-t border-base-200 pt-6">
        {#if selectedProject.url}
          <button
            type="button"
            class="btn btn-sm btn-simple animate-fade-in-from-side gap-2"
            onclick={() => window.open(selectedProject.url, '_blank', 'noopener,noreferrer')}
          >
            {m.insights_showcase_modal_button_visit()}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </button>
        {/if}
        <form method="dialog">
          <button class="text-link-button animate-fade-in-from-side" onclick={closeModal}>
            {m.insights_showcase_modal_button_close()}
          </button>
        </form>
      </div>
    {/if}
  </div>

  <form method="dialog" class="modal-backdrop">
    <button onclick={closeModal}>{m.insights_showcase_modal_button_close()}</button>
  </form>
</dialog>

<!-- Lightbox modal -->
<dialog bind:this={lightboxDialog} class="modal">
  <div class="modal-box lightbox-box">
    <div class="absolute top-3 right-3 z-10">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost bg-black/40 text-white hover:bg-black/60">✕</button>
      </form>
    </div>
    {#if lightboxImage}
      <img
        src={lightboxImage}
        alt="Screenshot Vorschau"
        class="h-auto w-full rounded-xl object-contain"
      />
    {/if}
  </div>
  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>

<style lang="postcss">
  @reference '../../../../app.css';

  .screenshot-thumb {
    @apply relative block cursor-zoom-in overflow-hidden rounded-xl;
    &:hover {
      .screenshot-zoom-hint {
        @apply opacity-100;
      }
      img {
        @apply scale-105;
      }
    }
    img {
      @apply transition-transform duration-300;
    }
  }

  .screenshot-zoom-hint {
    @apply absolute inset-0 flex items-center justify-center rounded-xl bg-black/30 text-2xl opacity-0 transition-opacity duration-200;
  }

  .lightbox-box {
    @apply max-h-[90vh] w-11/12 max-w-5xl overflow-hidden bg-transparent p-0 shadow-none;
  }
</style>
