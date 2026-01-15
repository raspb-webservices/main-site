<script lang="ts">
  import { m } from '$lib/paraglide/messages';
</script>

<dialog id="modal-simple-cms" class="modal">
  <div class="modal-box">
    <h3 class="mb-4 text-lg font-bold">{m['servicesPage_modals_simpleCms_title']()}</h3>
    <div class="space-y-4">
      <p><strong>{m['servicesPage_modals_simpleCms_perfectFor']()}</strong> {m['servicesPage_modals_simpleCms_perfectForDescription']()}</p>

      <div>
        <h4 class="mb-2 font-semibold">{m['servicesPage_modals_simpleCms_userFriendlyFeaturesTitle']()}</h4>
        <ul class="list-inside list-disc space-y-1">
          <li>{m['servicesPage_modals_simpleCms_userFriendlyFeatures_u1']()}</li>
          <li>{m['servicesPage_modals_simpleCms_userFriendlyFeatures_u2']()}</li>
          <li>{m['servicesPage_modals_simpleCms_userFriendlyFeatures_u3']()}</li>
          <li>{m['servicesPage_modals_simpleCms_userFriendlyFeatures_u4']()}</li>
          <li>{m['servicesPage_modals_simpleCms_userFriendlyFeatures_u5']()}</li>
          <li>{m['servicesPage_modals_simpleCms_userFriendlyFeatures_u6']()}</li>
        </ul>
      </div>

      <div>
        <h4 class="mb-2 font-semibold">{m['servicesPage_modals_simpleCms_technicalDetailsTitle']()}</h4>
        <ul class="list-inside list-disc space-y-1">
          <li>{m['servicesPage_modals_simpleCms_technicalDetails_t1']()}</li>
          <li>{m['servicesPage_modals_simpleCms_technicalDetails_t2']()}</li>
          <li>{m['servicesPage_modals_simpleCms_technicalDetails_t3']()}</li>
          <li>{m['servicesPage_modals_simpleCms_technicalDetails_t4']()}</li>
        </ul>
      </div>

      <div class="bg-base-200 rounded-lg p-4">
        <p class="text-sm"><strong>{m['servicesPage_modals_simpleCms_setupTime']()}</strong> {m['servicesPage_modals_simpleCms_setupTimeValue']()}</p>
        <p class="text-sm"><strong>{m['servicesPage_modals_simpleCms_training']()}</strong> {m['servicesPage_modals_simpleCms_trainingValue']()}</p>
      </div>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">{m['servicesPage_modals_simpleCms_closeButton']()}</button>
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
