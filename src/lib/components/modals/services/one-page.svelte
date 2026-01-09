<script lang="ts">
  import { m } from '$lib/paraglide/messages';
</script>

<dialog id="modal-onepage" class="modal">
  <div class="modal-box">
    <h3 class="mb-4 text-lg font-bold">{m['servicesPage.modals.onePage.title']()}</h3>
    <div class="space-y-4">
      <p><strong>{m['servicesPage.modals.onePage.perfectFor']()}</strong> {m['servicesPage.modals.onePage.perfectForDescription']()}</p>
      <p>
        {m['servicesPage.modals.onePage.paragraph1']()}
      </p>
      <p>
        {m['servicesPage.modals.onePage.paragraph2']()}
      </p>
      <p>
        {m['servicesPage.modals.onePage.paragraph3']()}
      </p>

      <div>
        <h4 class="mb-2 font-semibold">{m['servicesPage.modals.onePage.servicesDetailTitle']()}</h4>
        <ul class="list-inside list-disc space-y-1">
          <li>{m['servicesPage.modals.onePage.servicesDetails.d1']()}</li>
          <li>{m['servicesPage.modals.onePage.servicesDetails.d2']()}</li>
          <li>{m['servicesPage.modals.onePage.servicesDetails.d3']()}</li>
          <li>{m['servicesPage.modals.onePage.servicesDetails.d4']()}</li>
          <li>{m['servicesPage.modals.onePage.servicesDetails.d5']()}</li>
          <li>{m['servicesPage.modals.onePage.servicesDetails.d6']()}</li>
        </ul>
      </div>
      <div class="spacer"></div>
      <div>
        <h4 class="mb-2 font-semibold">{m['servicesPage.modals.onePage.technicalFeaturesTitle']()}</h4>
        <ul class="list-inside list-disc space-y-1">
          <li>{m['servicesPage.modals.onePage.technicalFeatures.t1']()}</li>
          <li>{m['servicesPage.modals.onePage.technicalFeatures.t2']()}</li>
          <li>{m['servicesPage.modals.onePage.technicalFeatures.t3']()}</li>
        </ul>
      </div>

      <div class="bg-base-200 rounded-lg p-4">
        <p class="text-sm"><strong>{m['servicesPage.modals.onePage.projectDuration']()}</strong> {m['servicesPage.modals.onePage.projectDurationValue']()}</p>
        <p class="text-sm"><strong>{m['servicesPage.modals.onePage.maintenance']()}</strong> {m['servicesPage.modals.onePage.maintenanceValue']()}</p>
      </div>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">{m['servicesPage.modals.onePage.closeButton']()}</button>
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
