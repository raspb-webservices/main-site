<script lang="ts">
  import { _ } from 'svelte-i18n';
</script>

<dialog id="modal-simple-cms" class="modal">
  <div class="modal-box">
    <h3 class="mb-4 text-lg font-bold">{$_('servicesPage.modals.simpleCms.title')}</h3>
    <div class="space-y-4">
      <p><strong>{$_('servicesPage.modals.simpleCms.perfectFor')}</strong> {$_('servicesPage.modals.simpleCms.perfectForDescription')}</p>

      <div>
        <h4 class="mb-2 font-semibold">{$_('servicesPage.modals.simpleCms.userFriendlyFeaturesTitle')}</h4>
        <ul class="list-inside list-disc space-y-1">
          <li>{$_('servicesPage.modals.simpleCms.userFriendlyFeatures.u1')}</li>
          <li>{$_('servicesPage.modals.simpleCms.userFriendlyFeatures.u2')}</li>
          <li>{$_('servicesPage.modals.simpleCms.userFriendlyFeatures.u3')}</li>
          <li>{$_('servicesPage.modals.simpleCms.userFriendlyFeatures.u4')}</li>
          <li>{$_('servicesPage.modals.simpleCms.userFriendlyFeatures.u5')}</li>
          <li>{$_('servicesPage.modals.simpleCms.userFriendlyFeatures.u6')}</li>
        </ul>
      </div>

      <div>
        <h4 class="mb-2 font-semibold">{$_('servicesPage.modals.simpleCms.technicalDetailsTitle')}</h4>
        <ul class="list-inside list-disc space-y-1">
          <li>{$_('servicesPage.modals.simpleCms.technicalDetails.t1')}</li>
          <li>{$_('servicesPage.modals.simpleCms.technicalDetails.t2')}</li>
          <li>{$_('servicesPage.modals.simpleCms.technicalDetails.t3')}</li>
          <li>{$_('servicesPage.modals.simpleCms.technicalDetails.t4')}</li>
        </ul>
      </div>

      <div class="bg-base-200 rounded-lg p-4">
        <p class="text-sm"><strong>{$_('servicesPage.modals.simpleCms.setupTime')}</strong> {$_('servicesPage.modals.simpleCms.setupTimeValue')}</p>
        <p class="text-sm"><strong>{$_('servicesPage.modals.simpleCms.training')}</strong> {$_('servicesPage.modals.simpleCms.trainingValue')}</p>
      </div>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">{$_('servicesPage.modals.simpleCms.closeButton')}</button>
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
