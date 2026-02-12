<script lang="ts">
  import { DotLottieSvelte } from '@lottiefiles/dotlottie-svelte';
  import { goto } from '$app/navigation';
  import { localizeHref } from '$lib/paraglide/runtime';
  import GetAnAppointmentModal from '$lib/components/modals/general/get-an-appointment-modal.svelte';

  let getAnAppointmentModal: GetAnAppointmentModal;

  function openGetAnAppointmentModal() {
    getAnAppointmentModal?.openModal();
  }
</script>

<div class="main-section">
  <div class="feature-block">
    <h2>Die beste Webseite, die du je hattest</h2>
    <div class="lottie-container">
      <DotLottieSvelte src=" /lotties/solution-development-web.lottie" loop autoplay />
    </div>
    <p>
      Ob One Pager, CMS oder komplexe Web-App - wir entwickeln digitale Lösungen, die begeistern und genau zu deinem Unternehmen passen. Modernste Technologien,
      individuelle Designs und ein reibungsloser Ablauf sorgen für ein Ergebnis, das dich und deine Kunden überzeugt.
    </p>
    <ul class="feature-list">
      <li>Modernes, responsives Design</li>
      <li>Individuelle Funktionen & Integrationen</li>
      <li>SEO & Performance optimiert</li>
      <li>Persönliche Beratung & Support</li>
    </ul>
    <div class="cta-row">
      <button
        class="btn btn-sm btn-simple animate-fade-in-from-side"
        onclick={() => {
          goto(localizeHref('/wizard'));
        }}
      >
        Projekt konfigurieren
      </button>
      <button
        class="text-link-button animate-fade-in-from-side"
        onclick={openGetAnAppointmentModal}
      >
        Erstgespräch vereinbaren
      </button>
    </div>
  </div>

  <div class="feature-block">
    <h2>KI - die Superpower für dein Business</h2>
    <div class="lottie-container py-4">
      <DotLottieSvelte src=" /lotties/abstract-robot-with-cloud.lottie" loop autoplay />
    </div>
    <p>
      Nutze künstliche Intelligenz, um Prozesse zu automatisieren, Kosten zu sparen und neue Möglichkeiten zu erschließen. Von smarter Datenanalyse bis hin zu
      individuellen KI-Lösungen - wir zeigen dir, wie du das volle Potenzial für dein Unternehmen ausschöpfst.
    </p>
    <ul class="feature-list">
      <li>Automatisierung & Effizienzsteigerung</li>
      <li>Intelligente Datenanalyse</li>
      <li>Individuelle KI-Integrationen</li>
      <li>Wettbewerbsvorteil sichern</li>
    </ul>
    <div class="cta-row">
      <button
        class="btn btn-sm btn-simple animate-fade-in-from-side"
        onclick={() => {
          goto(localizeHref('/wizard'));
        }}
      >
        Projekt konfigurieren
      </button>
      <button
        class="text-link-button animate-fade-in-from-side"
        onclick={openGetAnAppointmentModal}
      >
        Erstgespräch vereinbaren
      </button>
    </div>
  </div>
</div>

<div class="bottom-cta">
  <button
    class="btn-basic animate-fade-in-from-side"
    onclick={() => {
      goto(localizeHref('/services'));
    }}
  >
    Unser Service-Angebot im Detail
  </button>
</div>
<GetAnAppointmentModal bind:this={getAnAppointmentModal} />

<style lang="postcss">
  @reference '../../../app.css';

  .main-section {
    @apply mt-4 grid w-full grid-cols-1 gap-8 md:grid-cols-2;
  }

  .feature-block {
    @apply flex flex-col items-start rounded-xl bg-white p-8 shadow-md;
    h2 {
      @apply text-center;
    }

    .lottie-container {
      @apply h-full w-full max-h-67.5 aspect-video;
      :global(dotlottie-player),
      :global(canvas) {
        @apply h-full max-h-full w-full max-w-full;
        object-fit: contain;
      }
    }

    .feature-list {
      @apply space-y-2 py-6;

      li {
        @apply text-base-content flex items-start text-sm;

        &::before {
          @apply from-purple to-pink mt-1.5 mr-3 h-2 w-2 min-w-2 rounded-full bg-linear-to-r;
          content: '';
        }
      }
    }
    .cta-row {
      @apply flex gap-3;
    }
  }

  .bottom-cta {
    @apply mt-10 flex justify-center;
  }
</style>
