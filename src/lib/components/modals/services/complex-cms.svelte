<script lang="ts">
  import { m } from '$lib/paraglide/messages';
</script>

<dialog id="modal-complex-cms" class="modal">
  <div class="modal-box">
    <h3 class="mb-4 text-lg font-bold">{m['servicesPage_modals_complexCms_title']()}</h3>
    <div class="space-y-4">
      <p><strong>{m['servicesPage_modals_complexCms_perfectFor']()}</strong> {m['servicesPage_modals_complexCms_perfectForDescription']()}</p>

      <div>
        <h4 class="mb-2 font-semibold">{m['servicesPage_modals_complexCms_enterpriseFeaturesTitle']()}</h4>
        <ul class="list-inside list-disc space-y-1">
          <li>{m['servicesPage_modals_complexCms_enterpriseFeatures_e1']()}</li>
          <li>{m['servicesPage_modals_complexCms_enterpriseFeatures_e2']()}</li>
          <li>{m['servicesPage_modals_complexCms_enterpriseFeatures_e3']()}</li>
          <li>{m['servicesPage_modals_complexCms_enterpriseFeatures_e4']()}</li>
          <li>{m['servicesPage_modals_complexCms_enterpriseFeatures_e5']()}</li>
          <li>{m['servicesPage_modals_complexCms_enterpriseFeatures_e6']()}</li>
        </ul>
      </div>

      <div>
        <h4 class="mb-2 font-semibold">{m['servicesPage_modals_complexCms_scalabilityTitle']()}</h4>
        <ul class="list-inside list-disc space-y-1">
          <li>{m['servicesPage_modals_complexCms_scalability_s1']()}</li>
          <li>{m['servicesPage_modals_complexCms_scalability_s2']()}</li>
          <li>{m['servicesPage_modals_complexCms_scalability_s3']()}</li>
          <li>{m['servicesPage_modals_complexCms_scalability_s4']()}</li>
        </ul>
      </div>

      <div class="bg-base-200 rounded-lg p-4">
        <p class="text-sm">
          <strong>{m['servicesPage_modals_complexCms_projectDuration']()}</strong>
          {m['servicesPage_modals_complexCms_projectDurationValue']()}
        </p>
        <p class="text-sm"><strong>{m['servicesPage_modals_complexCms_support']()}</strong> {m['servicesPage_modals_complexCms_supportValue']()}</p>
      </div>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">{m['servicesPage_modals_complexCms_closeButton']()}</button>
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
