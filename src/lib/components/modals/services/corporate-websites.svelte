<script lang="ts">
  import { m } from '$lib/paraglide/messages';
</script>

<dialog id="modal-corporate" class="modal">
  <div class="modal-box">
    <h3 class="mb-4 text-lg font-bold">{m['servicesPage_modals_corporateWebsites_title']()}</h3>
    <div class="space-y-4">
      <p><strong>{m['servicesPage_modals_corporateWebsites_perfectFor']()}</strong> {m['servicesPage_modals_corporateWebsites_perfectForDescription']()}</p>

      <div>
        <h4 class="mb-2 font-semibold">{m['servicesPage_modals_corporateWebsites_extensiveFeaturesTitle']()}</h4>
        <ul class="list-inside list-disc space-y-1">
          <li>{m['servicesPage_modals_corporateWebsites_extensiveFeatures_e1']()}</li>
          <li>{m['servicesPage_modals_corporateWebsites_extensiveFeatures_e2']()}</li>
          <li>{m['servicesPage_modals_corporateWebsites_extensiveFeatures_e3']()}</li>
          <li>{m['servicesPage_modals_corporateWebsites_extensiveFeatures_e4']()}</li>
          <li>{m['servicesPage_modals_corporateWebsites_extensiveFeatures_e5']()}</li>
          <li>{m['servicesPage_modals_corporateWebsites_extensiveFeatures_e6']()}</li>
          <li>{m['servicesPage_modals_corporateWebsites_extensiveFeatures_e7']()}</li>
        </ul>
      </div>

      <div>
        <h4 class="mb-2 font-semibold">{m['servicesPage_modals_corporateWebsites_advancedFunctionsTitle']()}</h4>
        <ul class="list-inside list-disc space-y-1">
          <li>{m['servicesPage_modals_corporateWebsites_advancedFunctions_a1']()}</li>
          <li>{m['servicesPage_modals_corporateWebsites_advancedFunctions_a2']()}</li>
          <li>{m['servicesPage_modals_corporateWebsites_advancedFunctions_a3']()}</li>
          <li>{m['servicesPage_modals_corporateWebsites_advancedFunctions_a4']()}</li>
          <li>{m['servicesPage_modals_corporateWebsites_advancedFunctions_a5']()}</li>
        </ul>
      </div>

      <div class="bg-base-200 rounded-lg p-4">
        <p class="text-sm">
          <strong>{m['servicesPage_modals_corporateWebsites_projectDuration']()}</strong>
          {m['servicesPage_modals_corporateWebsites_projectDurationValue']()}
        </p>
        <p class="text-sm">
          <strong>{m['servicesPage_modals_corporateWebsites_maintenance']()}</strong>
          {m['servicesPage_modals_corporateWebsites_maintenanceValue']()}
        </p>
      </div>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">{m['servicesPage_modals_corporateWebsites_closeButton']()}</button>
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
