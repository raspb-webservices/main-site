<script lang="ts">
  import { m } from '$lib/paraglide/messages';
</script>

<dialog id="modal-landing" class="modal">
  <div class="modal-box">
    <h3 class="mb-4 text-lg font-bold">{m['servicesPage_modals_landingPages_title']()}</h3>
    <div class="space-y-4">
      <p><strong>{m['servicesPage_modals_landingPages_perfectFor']()}</strong> {m['servicesPage_modals_landingPages_perfectForDescription']()}</p>

      <div>
        <h4 class="mb-2 font-semibold">{m['servicesPage_modals_landingPages_conversionOptimizationTitle']()}</h4>
        <ul class="list-inside list-disc space-y-1">
          <li>{m['servicesPage_modals_landingPages_conversionOptimization_c1']()}</li>
          <li>{m['servicesPage_modals_landingPages_conversionOptimization_c2']()}</li>
          <li>{m['servicesPage_modals_landingPages_conversionOptimization_c3']()}</li>
          <li>{m['servicesPage_modals_landingPages_conversionOptimization_c4']()}</li>
          <li>{m['servicesPage_modals_landingPages_conversionOptimization_c5']()}</li>
        </ul>
      </div>

      <div>
        <h4 class="mb-2 font-semibold">{m['servicesPage_modals_landingPages_marketingIntegrationTitle']()}</h4>
        <ul class="list-inside list-disc space-y-1">
          <li>{m['servicesPage_modals_landingPages_marketingIntegration_m1']()}</li>
          <li>{m['servicesPage_modals_landingPages_marketingIntegration_m2']()}</li>
          <li>{m['servicesPage_modals_landingPages_marketingIntegration_m3']()}</li>
          <li>{m['servicesPage_modals_landingPages_marketingIntegration_m4']()}</li>
        </ul>
      </div>

      <div class="bg-base-200 rounded-lg p-4">
        <p class="text-sm">
          <strong>{m['servicesPage_modals_landingPages_projectDuration']()}</strong>
          {m['servicesPage_modals_landingPages_projectDurationValue']()}
        </p>
        <p class="text-sm"><strong>{m['servicesPage_modals_landingPages_performance']()}</strong> {m['servicesPage_modals_landingPages_performanceValue']()}</p>
      </div>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">{m['servicesPage_modals_landingPages_closeButton']()}</button>
      </form>
    </div>
  </div>
</dialog>

<style lang="postcss">
  @reference '../../../../app.css';
  .modal-box {
    @apply max-w-2xl;
  }
</style>
