<script lang="ts">
  import { _ } from 'svelte-i18n';
</script>

<dialog id="modal-landing" class="modal">
  <div class="modal-box">
    <h3 class="mb-4 text-lg font-bold">{$_('servicesPage.modals.landingPages.title')}</h3>
    <div class="space-y-4">
      <p><strong>{$_('servicesPage.modals.landingPages.perfectFor')}</strong> {$_('servicesPage.modals.landingPages.perfectForDescription')}</p>

      <div>
        <h4 class="mb-2 font-semibold">{$_('servicesPage.modals.landingPages.conversionOptimizationTitle')}</h4>
        <ul class="list-inside list-disc space-y-1">
          <li>{$_('servicesPage.modals.landingPages.conversionOptimization.c1')}</li>
          <li>{$_('servicesPage.modals.landingPages.conversionOptimization.c2')}</li>
          <li>{$_('servicesPage.modals.landingPages.conversionOptimization.c3')}</li>
          <li>{$_('servicesPage.modals.landingPages.conversionOptimization.c4')}</li>
          <li>{$_('servicesPage.modals.landingPages.conversionOptimization.c5')}</li>
        </ul>
      </div>

      <div>
        <h4 class="mb-2 font-semibold">{$_('servicesPage.modals.landingPages.marketingIntegrationTitle')}</h4>
        <ul class="list-inside list-disc space-y-1">
          <li>{$_('servicesPage.modals.landingPages.marketingIntegration.m1')}</li>
          <li>{$_('servicesPage.modals.landingPages.marketingIntegration.m2')}</li>
          <li>{$_('servicesPage.modals.landingPages.marketingIntegration.m3')}</li>
          <li>{$_('servicesPage.modals.landingPages.marketingIntegration.m4')}</li>
        </ul>
      </div>

      <div class="bg-base-200 rounded-lg p-4">
        <p class="text-sm">
          <strong>{$_('servicesPage.modals.landingPages.projectDuration')}</strong>
          {$_('servicesPage.modals.landingPages.projectDurationValue')}
        </p>
        <p class="text-sm"><strong>{$_('servicesPage.modals.landingPages.performance')}</strong> {$_('servicesPage.modals.landingPages.performanceValue')}</p>
      </div>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">{$_('servicesPage.modals.landingPages.closeButton')}</button>
      </form>
    </div>
  </div>
</dialog>

<style lang="postcss">
  @reference '../../../app.css';
  .modal-box {
    @apply max-w-2xl;
  }
</style>
