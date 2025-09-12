<script lang="ts">
  import { _ } from 'svelte-i18n';
</script>

<dialog id="modal-ki-beratung" class="modal">
  <div class="modal-box">
    <h3 class="mb-4 text-lg font-bold">{$_('servicesPage.modals.kiConsulting.title')}</h3>
    <div class="space-y-4">
      <p><strong>{$_('servicesPage.modals.kiConsulting.perfectFor')}</strong> {$_('servicesPage.modals.kiConsulting.perfectForDescription')}</p>

      <div>
        <h4 class="mb-2 font-semibold">{$_('servicesPage.modals.kiConsulting.consultingServicesTitle')}</h4>
        <ul class="list-inside list-disc space-y-1">
          <li>{$_('servicesPage.modals.kiConsulting.consultingServices.c1')}</li>
          <li>{$_('servicesPage.modals.kiConsulting.consultingServices.c2')}</li>
          <li>{$_('servicesPage.modals.kiConsulting.consultingServices.c3')}</li>
          <li>{$_('servicesPage.modals.kiConsulting.consultingServices.c4')}</li>
          <li>{$_('servicesPage.modals.kiConsulting.consultingServices.c5')}</li>
          <li>{$_('servicesPage.modals.kiConsulting.consultingServices.c6')}</li>
        </ul>
      </div>

      <div class="bg-base-200 rounded-lg p-4">
        <p class="text-sm">
          <strong>{$_('servicesPage.modals.kiConsulting.projectDuration')}</strong>
          {$_('servicesPage.modals.kiConsulting.projectDurationValue')}
        </p>
        <p class="text-sm"><strong>{$_('servicesPage.modals.kiConsulting.deliverable')}</strong> {$_('servicesPage.modals.kiConsulting.deliverableValue')}</p>
      </div>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">{$_('servicesPage.modals.kiConsulting.closeButton')}</button>
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
