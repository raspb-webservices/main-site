<script lang="ts">
  import { DotLottieSvelte } from '@lottiefiles/dotlottie-svelte';
  import { goto } from '$app/navigation';
  import { localizeHref } from '$lib/paraglide/runtime';
  import { m } from '$lib/paraglide/messages';
  import GetAnAppointmentModal from '$lib/components/modals/general/get-an-appointment-modal.svelte';

  let getAnAppointmentModal: GetAnAppointmentModal;

  function openGetAnAppointmentModal() {
    getAnAppointmentModal?.openModal();
  }
</script>

<div class="main-section">
  <div class="feature-block">
    <h2>{m.homepage_offering_web_title()}</h2>
    <div class="lottie-container">
      <DotLottieSvelte src=" /lotties/solution-development-web.lottie" loop autoplay />
    </div>
    <p>
      {m.homepage_offering_web_description()}
    </p>
    <ul class="feature-list">
      <li>{m.homepage_offering_web_feature1()}</li>
      <li>{m.homepage_offering_web_feature2()}</li>
      <li>{m.homepage_offering_web_feature3()}</li>
      <li>{m.homepage_offering_web_feature4()}</li>
    </ul>
    <div class="cta-row">
      <button
        class="btn btn-sm btn-simple animate-fade-in-from-side"
        onclick={() => {
          goto(localizeHref('/wizard'));
        }}
      >
        {m.homepage_offering_configure_button()}
      </button>
      <button class="text-link-button animate-fade-in-from-side" onclick={openGetAnAppointmentModal}>
        {m.homepage_offering_appointment_button()}
      </button>
    </div>
  </div>

  <div class="feature-block">
    <h2>{m.homepage_offering_ki_title()}</h2>
    <div class="lottie-container py-4">
      <DotLottieSvelte src=" /lotties/abstract-robot-with-cloud.lottie" loop autoplay />
    </div>
    <p>
      {m.homepage_offering_ki_description()}
    </p>
    <ul class="feature-list">
      <li>{m.homepage_offering_ki_feature1()}</li>
      <li>{m.homepage_offering_ki_feature2()}</li>
      <li>{m.homepage_offering_ki_feature3()}</li>
      <li>{m.homepage_offering_ki_feature4()}</li>
    </ul>
    <div class="cta-row">
      <button
        class="btn btn-sm btn-simple animate-fade-in-from-side"
        onclick={() => {
          goto(localizeHref('/wizard'));
        }}
      >
        {m.homepage_offering_configure_button()}
      </button>
      <button class="text-link-button animate-fade-in-from-side" onclick={openGetAnAppointmentModal}>
        {m.homepage_offering_appointment_button()}
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
    {m.homepage_offering_services_detail_button()}
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
      @apply aspect-video h-full max-h-67.5 w-full;
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
