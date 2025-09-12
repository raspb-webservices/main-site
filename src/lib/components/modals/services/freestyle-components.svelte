<script lang="ts">
  import { _ } from 'svelte-i18n';
</script>

<dialog id="modal-components" class="modal">
  <div class="modal-box">
    <h3 class="mb-4 text-lg font-bold">{$_('servicesPage.modals.components.title')}</h3>
    <div class="space-y-4">
      <p><strong>{$_('servicesPage.modals.components.perfectFor')}</strong> {$_('servicesPage.modals.components.perfectForDescription')}</p>

      <div>
        <h4 class="mb-2 font-semibold">{$_('servicesPage.modals.components.componentTypesTitle')}</h4>
        <ul class="list-inside list-disc space-y-1">
          <li>{$_('servicesPage.modals.components.componentTypes.c1')}</li>
          <li>{$_('servicesPage.modals.components.componentTypes.c2')}</li>
          <li>{$_('servicesPage.modals.components.componentTypes.c3')}</li>
          <li>{$_('servicesPage.modals.components.componentTypes.c4')}</li>
          <li>{$_('servicesPage.modals.components.componentTypes.c5')}</li>
        </ul>
      </div>

      <div class="bg-base-200 rounded-lg p-4">
        <p class="text-sm">
          <strong>{$_('servicesPage.modals.components.projectDuration')}</strong>
          {$_('servicesPage.modals.components.projectDurationValue')}
        </p>
        <p class="text-sm"><strong>{$_('servicesPage.modals.components.integration')}</strong> {$_('servicesPage.modals.components.integrationValue')}</p>
      </div>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">{$_('servicesPage.modals.components.closeButton')}</button>
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
