<script lang="ts">
  import { _ } from 'svelte-i18n';
</script>

<dialog id="modal-design" class="modal">
  <div class="modal-box">
    <h3 class="mb-4 text-lg font-bold">{$_('servicesPage.modals.design.title')}</h3>
    <div class="space-y-4">
      <p><strong>{$_('servicesPage.modals.design.perfectFor')}</strong> {$_('servicesPage.modals.design.perfectForDescription')}</p>

      <div>
        <h4 class="mb-2 font-semibold">{$_('servicesPage.modals.design.designServicesTitle')}</h4>
        <ul class="list-inside list-disc space-y-1">
          <li>{$_('servicesPage.modals.design.designServices.d1')}</li>
          <li>{$_('servicesPage.modals.design.designServices.d2')}</li>
          <li>{$_('servicesPage.modals.design.designServices.d3')}</li>
          <li>{$_('servicesPage.modals.design.designServices.d4')}</li>
          <li>{$_('servicesPage.modals.design.designServices.d5')}</li>
        </ul>
      </div>

      <div class="bg-base-200 rounded-lg p-4">
        <p class="text-sm"><strong>{$_('servicesPage.modals.design.projectDuration')}</strong> {$_('servicesPage.modals.design.projectDurationValue')}</p>
        <p class="text-sm"><strong>{$_('servicesPage.modals.design.tools')}</strong> {$_('servicesPage.modals.design.toolsValue')}</p>
      </div>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">{$_('servicesPage.modals.design.closeButton')}</button>
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
