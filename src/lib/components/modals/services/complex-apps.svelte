<script lang="ts">
  import { m } from '$lib/paraglide/messages';
</script>

<dialog id="modal-complex-apps" class="modal">
  <div class="modal-box">
    <h3 class="mb-4 text-lg font-bold">{m['servicesPage.modals.complexApps.title']()}</h3>
    <div class="space-y-4">
      <p><strong>{m['servicesPage.modals.complexApps.perfectFor']()}</strong> {m['servicesPage.modals.complexApps.perfectForDescription']()}</p>

      <div>
        <h4 class="mb-2 font-semibold">{m['servicesPage.modals.complexApps.enterpriseFeaturesTitle']()}</h4>
        <ul class="list-inside list-disc space-y-1">
          <li>{m['servicesPage.modals.complexApps.enterpriseFeatures.e1']()}</li>
          <li>{m['servicesPage.modals.complexApps.enterpriseFeatures.e2']()}</li>
          <li>{m['servicesPage.modals.complexApps.enterpriseFeatures.e3']()}</li>
          <li>{m['servicesPage.modals.complexApps.enterpriseFeatures.e4']()}</li>
          <li>{m['servicesPage.modals.complexApps.enterpriseFeatures.e5']()}</li>
          <li>{m['servicesPage.modals.complexApps.enterpriseFeatures.e6']()}</li>
        </ul>
      </div>

      <div>
        <h4 class="mb-2 font-semibold">{m['servicesPage.modals.complexApps.exampleSystemsTitle']()}</h4>
        <ul class="list-inside list-disc space-y-1">
          <li>{m['servicesPage.modals.complexApps.exampleSystems.e1']()}</li>
          <li>{m['servicesPage.modals.complexApps.exampleSystems.e2']()}</li>
          <li>{m['servicesPage.modals.complexApps.exampleSystems.e3']()}</li>
          <li>{m['servicesPage.modals.complexApps.exampleSystems.e4']()}</li>
          <li>{m['servicesPage.modals.complexApps.exampleSystems.e5']()}</li>
        </ul>
      </div>

      <div class="bg-base-200 rounded-lg p-4">
        <p class="text-sm">
          <strong>{m['servicesPage.modals.complexApps.projectDuration']()}</strong>
          {m['servicesPage.modals.complexApps.projectDurationValue']()}
        </p>
        <p class="text-sm"><strong>{m['servicesPage.modals.complexApps.support']()}</strong> {m['servicesPage.modals.complexApps.supportValue']()}</p>
      </div>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">{m['servicesPage.modals.complexApps.closeButton']()}</button>
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
