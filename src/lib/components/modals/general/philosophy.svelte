<script lang="ts">
  import { m } from '$lib/paraglide/messages';

  let modal: HTMLDialogElement;
  
  export function openModal() {
    modal?.showModal();
  }

  export function closeModal() {
    modal?.close();
  }

  function scrollToSection(letterId: string) {
    const element = document.getElementById(`philosophy-${letterId.toLowerCase()}`);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  $: philosophyItems = [
    {
      letter: m['philosophyModal.items.rapid.letter'](),
      title: m['philosophyModal.items.rapid.title'](),
      subtitle: m['philosophyModal.items.rapid.subtitle'](),
      description: m['philosophyModal.items.rapid.description'](),
      icon: m['philosophyModal.items.rapid.icon'](),
      gradient: 'from-yellow-400 to-orange-500',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-800'
    },
    {
      letter: m['philosophyModal.items.accurate.letter'](),
      title: m['philosophyModal.items.accurate.title'](),
      subtitle: m['philosophyModal.items.accurate.subtitle'](),
      description: m['philosophyModal.items.accurate.description'](),
      icon: m['philosophyModal.items.accurate.icon'](),
      gradient: 'from-blue-400 to-indigo-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-800'
    },
    {
      letter: m['philosophyModal.items.services.letter'](),
      title: m['philosophyModal.items.services.title'](),
      subtitle: m['philosophyModal.items.services.subtitle'](),
      description: m['philosophyModal.items.services.description'](),
      icon: m['philosophyModal.items.services.icon'](),
      gradient: 'from-green-400 to-emerald-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-800'
    },
    {
      letter: m['philosophyModal.items.perfectlyBalanced.letter'](),
      title: m['philosophyModal.items.perfectlyBalanced.title'](),
      subtitle: m['philosophyModal.items.perfectlyBalanced.subtitle'](),
      description: m['philosophyModal.items.perfectlyBalanced.description'](),
      icon: m['philosophyModal.items.perfectlyBalanced.icon'](),
      gradient: 'from-teal-400 to-cyan-500',
      bgColor: 'bg-teal-50',
      textColor: 'text-teal-800'
    }
  ];
</script>


<dialog bind:this={modal} class="modal">
  <div class="modal-box large-modal">
    
    <form method="dialog">
      <button class="btn btn-sm btn-circle btn-ghost absolute right-4 top-4" onclick={closeModal}>✕</button>
    </form>

    <div class="flex flex-col items-center justify-center gap-4 my-8">
        <h2>{m['philosophyModal.header.titleFirst']()} <span class="inner-text-special">{m['philosophyModal.header.titleHighlight']()}</span> {m['philosophyModal.header.titleSecond']()}</h2>
        <p class="teaser text-center">{m['philosophyModal.header.subtitle']()}</p>
    </div>

    <div class="mb-8 text-center">
      <!-- RASPB Letters Display -->
      <div class="mb-8 flex items-center justify-center gap-2">
        {#each philosophyItems as item}
          <div class="flex flex-col items-center">
            <button
              type="button"
              class="mx-2 h-12 w-12 rounded-full bg-gradient-to-br md:mx-3 md:h-16 md:w-16 {item.gradient} flex transform cursor-pointer items-center justify-center text-2xl font-bold text-white shadow-lg transition-transform duration-300 hover:scale-110 hover:shadow-xl"
              onclick={() => scrollToSection(item.letter)}
              title="Zu {item.title} springen"
            >
              {item.letter}
            </button>
            <div class="mt-2 min-h-8 text-xs font-semibold opacity-70">{item.title}</div>
          </div>
        {/each}
      </div>
    </div>

    <!-- Philosophy Items -->
    <div class="space-y-10">
      {#each philosophyItems as item, index}
        <div
          id="philosophy-{item.letter.toLowerCase()}"
          class="card {item.bgColor} border-base-300 animate-fade-in-up border shadow-lg transition-all duration-300 hover:shadow-xl sm:m-4 lg:my-16 lg:mx-20"
          style="animation-delay: {index * 0.15}s"
        >
          <div class="card-body p-8 pb-10">
            <div class="flex flex-col items-end lg:items-center lg:flex-row">
              <!-- Icon and Letter -->
              <div class="flex flex-shrink-0 flex-col items-center lg:mr-7">
                <div
                  class="h-20 w-20 rounded-full bg-gradient-to-br {item.gradient} flex items-center justify-center text-3xl font-bold text-white shadow-lg"
                >
                  {item.letter}
                </div>
              </div>

              <!-- Content -->
              <div class="flex-1">
                <div class="mb-4 flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <div class="flex items-center">
                      <div class="text-4xl">{item.icon}</div>
                      <div class="text-wrapper flex flex-col justify-center ml-4">
                        <h3 class="{item.textColor}">{item.title}</h3>
                        <div class="very-tiny-spacer"></div>
                        <p>{item.subtitle}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <p class="md:pr-10 {item.textColor}">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      {/each}
    </div>

    <!-- Footer -->
    <div class="border-base-300 mt-8 border-t pt-6 text-center">
      <div class="from-primary/10 to-secondary/10 rounded-2xl bg-gradient-to-r p-6 sm:mx-4 lg:mx-20">
        <h3 class="mb-3 text-xl font-bold">{m['philosophyModal.footer.missionTitle']()}</h3>
        <p class="text-base-content/80 mx-auto max-w-4xl leading-relaxed">
          {m['philosophyModal.footer.missionDescription']()}
        </p>
        <div class="mt-4 flex justify-center">
          <div class="flex flex-wrap items-center justify-center gap-2 text-sm opacity-70">
            <span class="mx-2">{m['philosophyModal.footer.principles.rapid']()}</span>
            <span class="mx-2">{m['philosophyModal.footer.principles.accurate']()}</span>
            <span class="mx-2">{m['philosophyModal.footer.principles.services']()}</span>
            <span class="mx-2">{m['philosophyModal.footer.principles.perfectlyBalanced']()}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Close Button -->
    <div class="modal-action flex items-center justify-center">
      <button type="button" class="btn btn-simple btn-wide" onclick={closeModal}>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
        {m['philosophyModal.footer.closeButton']()}
      </button>
    </div>
  </div>

  <!-- Modal Backdrop -->
  <form method="dialog" class="modal-backdrop">
    <button onclick={closeModal}>close</button>
  </form>
</dialog>

<style lang="postcss">
  @reference '../../../../app.css';
</style>
