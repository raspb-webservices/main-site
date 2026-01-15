<script lang="ts">
  import { m } from '$lib/paraglide/messages';
</script>

<dialog id="modal-onepage" class="modal">
  <div class="modal-box">
    <h3 class="mb-4 text-lg font-bold">{m['servicesPage_modals_onePage_title']()}</h3>
    <div class="space-y-4">
      <p><strong>{m['servicesPage_modals_onePage_perfectFor']()}</strong> {m['servicesPage_modals_onePage_perfectForDescription']()}</p>
      <p>
        {m['servicesPage_modals_onePage_paragraph1']()}
      </p>
      <p>
        {m['servicesPage_modals_onePage_paragraph2']()}
      </p>
      <p>
        {m['servicesPage_modals_onePage_paragraph3']()}
      </p>

      <div>
        <h4 class="mb-2 font-semibold">{m['servicesPage_modals_onePage_servicesDetailTitle']()}</h4>
        <ul class="list-inside list-disc space-y-1">
          <li>{m['servicesPage_modals_onePage_servicesDetails_d1']()}</li>
          <li>{m['servicesPage_modals_onePage_servicesDetails_d2']()}</li>
          <li>{m['servicesPage_modals_onePage_servicesDetails_d3']()}</li>
          <li>{m['servicesPage_modals_onePage_servicesDetails_d4']()}</li>
          <li>{m['servicesPage_modals_onePage_servicesDetails_d5']()}</li>
          <li>{m['servicesPage_modals_onePage_servicesDetails_d6']()}</li>
        </ul>
      </div>
      <div class="spacer"></div>
      <div>
        <h4 class="mb-2 font-semibold">{m['servicesPage_modals_onePage_technicalFeaturesTitle']()}</h4>
        <ul class="list-inside list-disc space-y-1">
          <li>{m['servicesPage_modals_onePage_technicalFeatures_t1']()}</li>
          <li>{m['servicesPage_modals_onePage_technicalFeatures_t2']()}</li>
          <li>{m['servicesPage_modals_onePage_technicalFeatures_t3']()}</li>
        </ul>
      </div>

      <div class="bg-base-200 rounded-lg p-4">
        <p class="text-sm"><strong>{m['servicesPage_modals_onePage_projectDuration']()}</strong> {m['servicesPage_modals_onePage_projectDurationValue']()}</p>
        <p class="text-sm"><strong>{m['servicesPage_modals_onePage_maintenance']()}</strong> {m['servicesPage_modals_onePage_maintenanceValue']()}</p>
      </div>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">{m['servicesPage_modals_onePage_closeButton']()}</button>
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
