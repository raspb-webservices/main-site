<script lang="ts">
  import { _ } from 'svelte-i18n';
</script>

<dialog id="modal-special-apps" class="modal">
  <div class="modal-box">
    <h3 class="mb-4 text-lg font-bold">{$_('servicesPage.modals.specialApps.title')}</h3>
    <div class="space-y-4">
      <p><strong>{$_('servicesPage.modals.specialApps.perfectFor')}</strong> {$_('servicesPage.modals.specialApps.perfectForDescription')}</p>

      <div>
        <h4 class="mb-2 font-semibold">{$_('servicesPage.modals.specialApps.applicationExamplesTitle')}</h4>
        <ul class="list-inside list-disc space-y-1">
          <li>{$_('servicesPage.modals.specialApps.applicationExamples.a1')}</li>
          <li>{$_('servicesPage.modals.specialApps.applicationExamples.a2')}</li>
          <li>{$_('servicesPage.modals.specialApps.applicationExamples.a3')}</li>
          <li>{$_('servicesPage.modals.specialApps.applicationExamples.a4')}</li>
          <li>{$_('servicesPage.modals.specialApps.applicationExamples.a5')}</li>
        </ul>
      </div>

      <div class="bg-base-200 rounded-lg p-4">
        <p class="text-sm">
          <strong>{$_('servicesPage.modals.specialApps.projectDuration')}</strong>
          {$_('servicesPage.modals.specialApps.projectDurationValue')}
        </p>
        <p class="text-sm"><strong>{$_('servicesPage.modals.specialApps.approach')}</strong> {$_('servicesPage.modals.specialApps.approachValue')}</p>
      </div>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">{$_('servicesPage.modals.specialApps.closeButton')}</button>
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
