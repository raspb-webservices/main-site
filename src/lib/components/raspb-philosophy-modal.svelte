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
        block: 'start'
      });
    }
  }

  const philosophyItems = [
    {
      letter: 'R',
      title: 'Rapid',
      subtitle: 'Schnell & Effizient',
      description:
        'Wir arbeiten mit modernsten Tools und agilen Methoden, um Ihre Projekte in Rekordzeit zu realisieren. Unsere KI-gestützten Workflows beschleunigen Entwicklungsprozesse ohne Qualitätsverlust. Wir liefern Ergebnisse bereits nach Tagen, nicht Monaten! Ach ja, nicht nur die Projektzeiten sind super schnell, auch die Webseiten und Anwendungen, die daraus hervorgehen, bieten eine unübertroffene Performance.',
      icon: '🚀',
      gradient: 'from-yellow-400 to-orange-500',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-800'
    },
    {
      letter: 'A',
      title: 'Accurate',
      subtitle: 'Präzise & Zuverlässig',
      description:
        'Jedes Detail wird sorgfältig ausgewählt und perfektioniert. Alles, was überflüssig ist, wird weggelassen: Kein Bloat, kein Schnickschnack. Sie bekommen genau das, was sie wünschen und müssen nicht teure Software lizensieren, nur weil Sie ein einziges Feature brauchen. Genaue Anforderungsaufnahme, exakte Umsätzung - unsere Lösungen laufen akurat, wie ein schweizer Uhrwerk.',
      icon: '🎯',
      gradient: 'from-blue-400 to-indigo-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-800'
    },
    {
      letter: 'S',
      title: 'Services',
      subtitle: 'Umfassende Lösungen & Kundenorientiertheit',
      description:
        'Von der ersten Idee bis zur finalen Umsetzung bieten wir alle Services aus einer Hand: Konzept, Design (UI/UX), Entwicklung (Frontend/Backend), Datenmodellierung, Content/SEO, Hosting und mehr - alles perfekt aufeinander abgestimmt. Neben dem umfangreichen Portfolio, steht Service bei uns auch noch für absolute Kundenorientierung. Ihre Zufriedenheit ist unser obersted Ziel.',
      icon: '🛠️',
      gradient: 'from-green-400 to-emerald-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-800'
    },
    {
      letter: 'PB',
      title: 'Perfectly Balanced',
      subtitle: 'Ausgewogen & Harmonisch',
      description:
        'Ein Kunstwerk ist dann perfekt, wenn man nichts mehr hinzufügen muss und nichts mehr entfernen kann. Die akurate Umsetzung Ihrer Anforderungne bedingt sich auch durch die perfekte Balance, die wir in all unseren Projekten leben. Kosten, Zeit und Qualität halten wir stets im Einklang ohne Kompromisse. Dennoch lassen wir Platz für Innovationen. Ausbalanciert, nicht erzeungen.',
      icon: '⚖️',
      gradient: 'from-teal-400 to-cyan-500',
      bgColor: 'bg-teal-50',
      textColor: 'text-teal-800'
    }
  ];
</script>

<!-- Modal -->
<dialog bind:this={modal} class="modal">
  <div class="modal-box max-h-[90vh] max-w-5xl overflow-y-auto lg:w-11/12">
    <!-- Header -->
    <div class="mb-8 text-center">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute top-2 right-2" on:click={closeModal}>✕</button>
      </form>

      <div class="my-2 lg:my-8">
        <h2 class="no-padding"><span class="inner-text-special">raspb</span> Philosophie</h2>
        <p class="text-base-content/70 mt-3 text-xl">rapid - accurate - services - perfectly balanced</p>
      </div>

      <!-- RASPB Letters Display -->
      <div class="mb-8 flex items-center justify-center gap-2">
        {#each philosophyItems as item}
          <div class="flex flex-col items-center">
            <button
              type="button"
              class="mx-2 h-12 w-12 rounded-full bg-gradient-to-br md:mx-3 md:h-16 md:w-16 {item.gradient} flex transform cursor-pointer items-center justify-center text-2xl font-bold text-white shadow-lg transition-transform duration-300 hover:scale-110 hover:shadow-xl"
              on:click={() => scrollToSection(item.letter)}
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
          class="card {item.bgColor} border-base-300 animate-fade-in-up border shadow-lg transition-all duration-300 hover:shadow-xl sm:m-4 lg:m-16"
          style="animation-delay: {index * 0.1}s"
        >
          <div class="card-body">
            <div class="flex flex-col items-end lg:items-center lg:flex-row">
              <!-- Icon and Letter -->
              <div class="flex flex-shrink-0 flex-col items-center lg:mr-6">
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
                    <div class="flex items-center mb-2">
                      <div class="text-4xl">{item.icon}</div>
                      <div class="text-wrapper flex flex-col justify-center ml-4">
                      <h3 class="no-padding {item.textColor} mb-2">{item.title}</h3>
                      <p class="text-lg font-semibold opacity-80 no-padding">{item.subtitle}</p>
                      </div>
                    </div>
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
          Bei raspb vereinen wir diese vier Prinzipien zu einer einzigartigen Arbeitsphilosophie. Wir glauben daran, dass wahre Exzellenz nur durch das in
          Einklang bringen aller Aspekte erreicht werden kann. Jedes Projekt ist eine Gelegenheit, diese Philosophie zu leben und außergewöhnliche Ergebnisse zu
          schaffen.
        </p>
        <div class="mt-4 flex justify-center">
          <div class="flex flex-wrap items-center justify-center gap-2 text-sm opacity-70">
            <span class="mx-2">🚀 rapid</span>
            <span class="mx-2">🎯 accurate</span>
            <span class="mx-2">🛠️ services</span>
            <span class="mx-2">⚖️ perfectly balanced</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Close Button -->
    <div class="modal-action flex items-center justify-center">
      <button type="button" class="btn btn-simple btn-wide" on:click={closeModal}>
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
  @reference '../../app.css';
  @media (max-width: 768px) {
    .modal-box {
      max-height: 85vh;
    }
  }
</style>
