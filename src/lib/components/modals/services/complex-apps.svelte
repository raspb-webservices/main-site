<script lang="ts">
  import { _ } from 'svelte-i18n';
</script>

<dialog id="modal-complex-apps" class="modal">
  <div class="modal-box">
    <h3 class="mb-4 text-lg font-bold">{$_('servicesPage.modals.complexApps.title')}</h3>
    <div class="space-y-4">
      <p><strong>{$_('servicesPage.modals.complexApps.perfectFor')}</strong> {$_('servicesPage.modals.complexApps.perfectForDescription')}</p>

      <div>
        <h4 class="mb-2 font-semibold">{$_('servicesPage.modals.complexApps.enterpriseFeaturesTitle')}</h4>
        <ul class="list-inside list-disc space-y-1">
          <li>{$_('servicesPage.modals.complexApps.enterpriseFeatures.e1')}</li>
          <li>{$_('servicesPage.modals.complexApps.enterpriseFeatures.e2')}</li>
          <li>{$_('servicesPage.modals.complexApps.enterpriseFeatures.e3')}</li>
          <li>{$_('servicesPage.modals.complexApps.enterpriseFeatures.e4')}</li>
          <li>{$_('servicesPage.modals.complexApps.enterpriseFeatures.e5')}</li>
          <li>{$_('servicesPage.modals.complexApps.enterpriseFeatures.e6')}</li>
        </ul>
      </div>

      <div>
        <h4 class="mb-2 font-semibold">{$_('servicesPage.modals.complexApps.exampleSystemsTitle')}</h4>
        <ul class="list-inside list-disc space-y-1">
          <li>{$_('servicesPage.modals.complexApps.exampleSystems.e1')}</li>
          <li>{$_('servicesPage.modals.complexApps.exampleSystems.e2')}</li>
          <li>{$_('servicesPage.modals.complexApps.exampleSystems.e3')}</li>
          <li>{$_('servicesPage.modals.complexApps.exampleSystems.e4')}</li>
          <li>{$_('servicesPage.modals.complexApps.exampleSystems.e5')}</li>
        </ul>
      </div>

      <div class="bg-base-200 rounded-lg p-4">
        <p class="text-sm">
          <strong>{$_('servicesPage.modals.complexApps.projectDuration')}</strong>
          {$_('servicesPage.modals.complexApps.projectDurationValue')}
        </p>
        <p class="text-sm"><strong>{$_('servicesPage.modals.complexApps.support')}</strong> {$_('servicesPage.modals.complexApps.supportValue')}</p>
      </div>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">{$_('servicesPage.modals.complexApps.closeButton')}</button>
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
