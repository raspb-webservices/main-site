<script lang="ts">
  import { _ } from 'svelte-i18n';
</script>

<dialog id="modal-extensions" class="modal">
  <div class="modal-box">
    <h3 class="mb-4 text-lg font-bold">{$_('servicesPage.modals.extensions.title')}</h3>
    <div class="space-y-4">
      <p><strong>{$_('servicesPage.modals.extensions.perfectFor')}</strong> {$_('servicesPage.modals.extensions.perfectForDescription')}</p>

      <div>
        <h4 class="mb-2 font-semibold">{$_('servicesPage.modals.extensions.extensionServicesTitle')}</h4>
        <ul class="list-inside list-disc space-y-1">
          <li>{$_('servicesPage.modals.extensions.extensionServices.e1')}</li>
          <li>{$_('servicesPage.modals.extensions.extensionServices.e2')}</li>
          <li>{$_('servicesPage.modals.extensions.extensionServices.e3')}</li>
          <li>{$_('servicesPage.modals.extensions.extensionServices.e4')}</li>
          <li>{$_('servicesPage.modals.extensions.extensionServices.e5')}</li>
        </ul>
      </div>

      <div class="bg-base-200 rounded-lg p-4">
        <p class="text-sm">
          <strong>{$_('servicesPage.modals.extensions.projectDuration')}</strong>
          {$_('servicesPage.modals.extensions.projectDurationValue')}
        </p>
        <p class="text-sm"><strong>{$_('servicesPage.modals.extensions.compatibility')}</strong> {$_('servicesPage.modals.extensions.compatibilityValue')}</p>
      </div>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">{$_('servicesPage.modals.extensions.closeButton')}</button>
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
