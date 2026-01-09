<script lang="ts">
  import { m } from '$lib/paraglide/messages';
</script>

<dialog id="modal-complex-cms" class="modal">
  <div class="modal-box">
    <h3 class="mb-4 text-lg font-bold">{m['servicesPage.modals.complexCms.title']()}</h3>
    <div class="space-y-4">
      <p><strong>{m['servicesPage.modals.complexCms.perfectFor']()}</strong> {m['servicesPage.modals.complexCms.perfectForDescription']()}</p>

      <div>
        <h4 class="mb-2 font-semibold">{m['servicesPage.modals.complexCms.enterpriseFeaturesTitle']()}</h4>
        <ul class="list-inside list-disc space-y-1">
          <li>{m['servicesPage.modals.complexCms.enterpriseFeatures.e1']()}</li>
          <li>{m['servicesPage.modals.complexCms.enterpriseFeatures.e2']()}</li>
          <li>{m['servicesPage.modals.complexCms.enterpriseFeatures.e3']()}</li>
          <li>{m['servicesPage.modals.complexCms.enterpriseFeatures.e4']()}</li>
          <li>{m['servicesPage.modals.complexCms.enterpriseFeatures.e5']()}</li>
          <li>{m['servicesPage.modals.complexCms.enterpriseFeatures.e6']()}</li>
        </ul>
      </div>

      <div>
        <h4 class="mb-2 font-semibold">{m['servicesPage.modals.complexCms.scalabilityTitle']()}</h4>
        <ul class="list-inside list-disc space-y-1">
          <li>{m['servicesPage.modals.complexCms.scalability.s1']()}</li>
          <li>{m['servicesPage.modals.complexCms.scalability.s2']()}</li>
          <li>{m['servicesPage.modals.complexCms.scalability.s3']()}</li>
          <li>{m['servicesPage.modals.complexCms.scalability.s4']()}</li>
        </ul>
      </div>

      <div class="bg-base-200 rounded-lg p-4">
        <p class="text-sm">
          <strong>{m['servicesPage.modals.complexCms.projectDuration']()}</strong>
          {m['servicesPage.modals.complexCms.projectDurationValue']()}
        </p>
        <p class="text-sm"><strong>{m['servicesPage.modals.complexCms.support']()}</strong> {m['servicesPage.modals.complexCms.supportValue']()}</p>
      </div>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">{m['servicesPage.modals.complexCms.closeButton']()}</button>
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
