<script lang="ts">
  import { m } from '$lib/paraglide/messages';
</script>

<dialog id="modal-corporate" class="modal">
  <div class="modal-box">
    <h3 class="mb-4 text-lg font-bold">{m['servicesPage.modals.corporateWebsites.title']()}</h3>
    <div class="space-y-4">
      <p><strong>{m['servicesPage.modals.corporateWebsites.perfectFor']()}</strong> {m['servicesPage.modals.corporateWebsites.perfectForDescription']()}</p>

      <div>
        <h4 class="mb-2 font-semibold">{m['servicesPage.modals.corporateWebsites.extensiveFeaturesTitle']()}</h4>
        <ul class="list-inside list-disc space-y-1">
          <li>{m['servicesPage.modals.corporateWebsites.extensiveFeatures.e1']()}</li>
          <li>{m['servicesPage.modals.corporateWebsites.extensiveFeatures.e2']()}</li>
          <li>{m['servicesPage.modals.corporateWebsites.extensiveFeatures.e3']()}</li>
          <li>{m['servicesPage.modals.corporateWebsites.extensiveFeatures.e4']()}</li>
          <li>{m['servicesPage.modals.corporateWebsites.extensiveFeatures.e5']()}</li>
          <li>{m['servicesPage.modals.corporateWebsites.extensiveFeatures.e6']()}</li>
          <li>{m['servicesPage.modals.corporateWebsites.extensiveFeatures.e7']()}</li>
        </ul>
      </div>

      <div>
        <h4 class="mb-2 font-semibold">{m['servicesPage.modals.corporateWebsites.advancedFunctionsTitle']()}</h4>
        <ul class="list-inside list-disc space-y-1">
          <li>{m['servicesPage.modals.corporateWebsites.advancedFunctions.a1']()}</li>
          <li>{m['servicesPage.modals.corporateWebsites.advancedFunctions.a2']()}</li>
          <li>{m['servicesPage.modals.corporateWebsites.advancedFunctions.a3']()}</li>
          <li>{m['servicesPage.modals.corporateWebsites.advancedFunctions.a4']()}</li>
          <li>{m['servicesPage.modals.corporateWebsites.advancedFunctions.a5']()}</li>
        </ul>
      </div>

      <div class="bg-base-200 rounded-lg p-4">
        <p class="text-sm">
          <strong>{m['servicesPage.modals.corporateWebsites.projectDuration']()}</strong>
          {m['servicesPage.modals.corporateWebsites.projectDurationValue']()}
        </p>
        <p class="text-sm">
          <strong>{m['servicesPage.modals.corporateWebsites.maintenance']()}</strong>
          {m['servicesPage.modals.corporateWebsites.maintenanceValue']()}
        </p>
      </div>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">{m['servicesPage.modals.corporateWebsites.closeButton']()}</button>
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
