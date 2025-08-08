<script lang="ts">
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
        block: 'center'
      });
    }
  }

  const philosophyItems = [
    {
      letter: 'R',
      title: 'Rapid',
      subtitle: 'Schnell & Effizient',
      description:
        'Wir arbeiten mit modernsten Tools und agilen Methoden, um Ihre Projekte in Rekordzeit zu realisieren. Unsere KI-gestützten Workflows beschleunigen Entwicklungsprozesse ohne Qualitätsverlust.',
      icon: '⚡',
      gradient: 'from-yellow-400 to-orange-500',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-800'
    },
    {
      letter: 'A',
      title: 'Accurate',
      subtitle: 'Präzise & Zuverlässig',
      description:
        'Jedes Detail wird sorgfältig durchdacht und perfektioniert. Unsere systematischen Tests und Qualitätskontrollen garantieren fehlerfreie Ergebnisse, die Ihre Erwartungen übertreffen.',
      icon: '🎯',
      gradient: 'from-blue-400 to-indigo-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-800'
    },
    {
      letter: 'S',
      title: 'Services',
      subtitle: 'Umfassende Lösungen',
      description:
        'Von der ersten Idee bis zur finalen Umsetzung bieten wir alle Services aus einer Hand. Webentwicklung, Design, SEO, Hosting - alles perfekt aufeinander abgestimmt.',
      icon: '🛠️',
      gradient: 'from-green-400 to-emerald-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-800'
    },
    {
      letter: 'P',
      title: 'Perfectly',
      subtitle: 'Makellose Qualität',
      description:
        'Perfektion ist unser Standard. Wir geben uns nicht mit "gut genug" zufrieden, sondern streben nach Exzellenz in jedem Aspekt unserer Arbeit.',
      icon: '💎',
      gradient: 'from-purple-400 to-pink-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-800'
    },
    {
      letter: 'B',
      title: 'Balanced',
      subtitle: 'Ausgewogen & Harmonisch',
      description:
        'Wir finden die perfekte Balance zwischen Innovation und Bewährtem, zwischen Geschwindigkeit und Qualität, zwischen Technik und Benutzerfreundlichkeit.',
      icon: '⚖️',
      gradient: 'from-teal-400 to-cyan-500',
      bgColor: 'bg-teal-50',
      textColor: 'text-teal-800'
    }
  ];
</script>

<!-- Modal -->
<dialog bind:this={modal} class="modal">
  <div class="modal-box max-h-[90vh] w-11/12 max-w-5xl overflow-y-auto">
    <!-- Header -->
    <div class="mb-8 text-center">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute top-2 right-2" on:click={closeModal}>✕</button>
      </form>

      <div class="my-8">
        <h2 class="no-padding">raspb Philosophie</h2>
        <p class="text-base-content/70 mt-3 text-xl">Rapid - Accurate - Services - Perfectly - Balanced</p>
      </div>

      <!-- RASPB Letters Display -->
      <div class="mb-8 flex items-center justify-center gap-2">
        {#each philosophyItems as item}
          <div class="flex flex-col items-center">
            <button
              type="button"
              class="mx-3 h-16 w-16 rounded-full bg-gradient-to-br {item.gradient} flex transform cursor-pointer items-center justify-center text-2xl font-bold text-white shadow-lg transition-transform duration-300 hover:scale-110 hover:shadow-xl"
              on:click={() => scrollToSection(item.letter)}
              title="Zu {item.title} springen"
            >
              {item.letter}
            </button>
            <div class="mt-2 text-xs font-semibold opacity-70">{item.title}</div>
          </div>
        {/each}
      </div>
    </div>

    <!-- Philosophy Items -->
    <div class="space-y-10">
      {#each philosophyItems as item, index}
        <div
          id="philosophy-{item.letter.toLowerCase()}"
          class="card {item.bgColor} border-base-300 animate-fade-in-up m-16 border shadow-lg transition-all duration-300 hover:shadow-xl"
          style="animation-delay: {index * 0.1}s"
        >
          <div class="card-body">
            <div class="flex flex-col items-start gap-6 lg:flex-row">
              <!-- Icon and Letter -->
              <div class="flex flex-shrink-0 flex-col items-center">
                <div
                  class="h-20 w-20 rounded-full bg-gradient-to-br {item.gradient} mb-2 flex items-center justify-center text-3xl font-bold text-white shadow-lg"
                >
                  {item.letter}
                </div>
                <div class="text-4xl">{item.icon}</div>
              </div>

              <!-- Content -->
              <div class="flex-1">
                <div class="mb-4 flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <h3 class="text-2xl font-bold {item.textColor} mb-1">{item.title}</h3>
                    <p class="text-lg font-semibold opacity-80">{item.subtitle}</p>
                  </div>
                  <div class="hidden lg:block">
                    <div class="badge badge-lg {item.textColor} border-current bg-white/50">
                      {item.letter}
                    </div>
                  </div>
                </div>
                <p class="text-base leading-relaxed {item.textColor}">
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
      <div class="from-primary/10 to-secondary/10 rounded-2xl bg-gradient-to-r p-6">
        <h3 class="mb-3 text-xl font-bold">Unsere Mission</h3>
        <p class="text-base-content/80 mx-auto max-w-4xl leading-relaxed">
          Bei raspb vereinen wir diese fünf Prinzipien zu einer einzigartigen Arbeitsphilosophie. Wir glauben daran, dass wahre Exzellenz nur durch die perfekte
          Balance aller Aspekte erreicht wird. Jedes Projekt ist eine Gelegenheit, diese Philosophie zu leben und außergewöhnliche Ergebnisse zu schaffen.
        </p>
        <div class="mt-4 flex justify-center">
          <div class="flex items-center gap-2 text-sm opacity-70">
            <span>🚀</span>
            <span>Rapid</span>
            <span>•</span>
            <span>🎯</span>
            <span>Accurate</span>
            <span>•</span>
            <span>🛠️</span>
            <span>Services</span>
            <span>•</span>
            <span>💎</span>
            <span>Perfectly</span>
            <span>•</span>
            <span>⚖️</span>
            <span>Balanced</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Close Button -->
    <div class="modal-action">
      <button type="button" class="btn btn-primary btn-wide" on:click={closeModal}>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
        Verstanden
      </button>
    </div>
  </div>

  <!-- Modal Backdrop -->
  <form method="dialog" class="modal-backdrop">
    <button on:click={closeModal}>close</button>
  </form>
</dialog>

<style lang="postcss">
  @keyframes fade-in-up {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fade-in-up {
    animation: fade-in-up 0.6s ease-out forwards;
    opacity: 0;
  }

  /* Custom scrollbar for modal */
  .modal-box {
    scrollbar-width: thin;
    scrollbar-color: #c1121f transparent;
  }

  .modal-box::-webkit-scrollbar {
    width: 6px;
  }

  .modal-box::-webkit-scrollbar-track {
    background: transparent;
  }

  .modal-box::-webkit-scrollbar-thumb {
    background: #c1121f;
    border-radius: 3px;
  }

  .modal-box::-webkit-scrollbar-thumb:hover {
    background: #a10e1a;
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    .modal-box {
      max-height: 85vh;
    }
  }
</style>
