<script lang="ts">
  import { _ } from 'svelte-i18n';
</script>

<dialog id="modal-complex-cms" class="modal">
  <div class="modal-box">
    <h3 class="mb-4 text-lg font-bold">{$_('servicesPage.modals.complexCms.title')}</h3>
    <div class="space-y-4">
      <p><strong>{$_('servicesPage.modals.complexCms.perfectFor')}</strong> {$_('servicesPage.modals.complexCms.perfectForDescription')}</p>

      <div>
        <h4 class="mb-2 font-semibold">{$_('servicesPage.modals.complexCms.enterpriseFeaturesTitle')}</h4>
        <ul class="list-inside list-disc space-y-1">
          <li>{$_('servicesPage.modals.complexCms.enterpriseFeatures.e1')}</li>
          <li>{$_('servicesPage.modals.complexCms.enterpriseFeatures.e2')}</li>
          <li>{$_('servicesPage.modals.complexCms.enterpriseFeatures.e3')}</li>
          <li>{$_('servicesPage.modals.complexCms.enterpriseFeatures.e4')}</li>
          <li>{$_('servicesPage.modals.complexCms.enterpriseFeatures.e5')}</li>
          <li>{$_('servicesPage.modals.complexCms.enterpriseFeatures.e6')}</li>
        </ul>
      </div>

      <div>
        <h4 class="mb-2 font-semibold">{$_('servicesPage.modals.complexCms.scalabilityTitle')}</h4>
        <ul class="list-inside list-disc space-y-1">
          <li>{$_('servicesPage.modals.complexCms.scalability.s1')}</li>
          <li>{$_('servicesPage.modals.complexCms.scalability.s2')}</li>
          <li>{$_('servicesPage.modals.complexCms.scalability.s3')}</li>
          <li>{$_('servicesPage.modals.complexCms.scalability.s4')}</li>
        </ul>
      </div>

      <div class="bg-base-200 rounded-lg p-4">
        <p class="text-sm">
          <strong>{$_('servicesPage.modals.complexCms.projectDuration')}</strong>
          {$_('servicesPage.modals.complexCms.projectDurationValue')}
        </p>
        <p class="text-sm"><strong>{$_('servicesPage.modals.complexCms.support')}</strong> {$_('servicesPage.modals.complexCms.supportValue')}</p>
      </div>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">{$_('servicesPage.modals.complexCms.closeButton')}</button>
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
