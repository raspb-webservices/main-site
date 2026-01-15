<script lang="ts">
  import { m } from '$lib/paraglide/messages';
</script>

<dialog id="modal-pwa" class="modal">
  <div class="modal-box">
    <h3 class="mb-4 text-lg font-bold">{m['servicesPage_modals_pwa_title']()}</h3>
    <div class="space-y-4">
      <p><strong>{m['servicesPage_modals_pwa_perfectFor']()}</strong> {m['servicesPage_modals_pwa_perfectForDescription']()}</p>

      <div>
        <h4 class="mb-2 font-semibold">{m['servicesPage_modals_pwa_appLikeFeaturesTitle']()}</h4>
        <ul class="list-inside list-disc space-y-1">
          <li>{m['servicesPage_modals_pwa_appLikeFeatures_a1']()}</li>
          <li>{m['servicesPage_modals_pwa_appLikeFeatures_a2']()}</li>
          <li>{m['servicesPage_modals_pwa_appLikeFeatures_a3']()}</li>
          <li>{m['servicesPage_modals_pwa_appLikeFeatures_a4']()}</li>
          <li>{m['servicesPage_modals_pwa_appLikeFeatures_a5']()}</li>
          <li>{m['servicesPage_modals_pwa_appLikeFeatures_a6']()}</li>
        </ul>
      </div>

      <div>
        <h4 class="mb-2 font-semibold">{m['servicesPage_modals_pwa_technicalFeaturesTitle']()}</h4>
        <ul class="list-inside list-disc space-y-1">
          <li>{m['servicesPage_modals_pwa_technicalFeatures_t1']()}</li>
          <li>{m['servicesPage_modals_pwa_technicalFeatures_t2']()}</li>
          <li>{m['servicesPage_modals_pwa_technicalFeatures_t3']()}</li>
          <li>{m['servicesPage_modals_pwa_technicalFeatures_t4']()}</li>
          <li>{m['servicesPage_modals_pwa_technicalFeatures_t5']()}</li>
        </ul>
      </div>

      <div class="bg-base-200 rounded-lg p-4">
        <p class="text-sm"><strong>{m['servicesPage_modals_pwa_projectDuration']()}</strong> {m['servicesPage_modals_pwa_projectDurationValue']()}</p>
        <p class="text-sm"><strong>{m['servicesPage_modals_pwa_advantage']()}</strong> {m['servicesPage_modals_pwa_advantageValue']()}</p>
      </div>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">{m['servicesPage_modals_pwa_closeButton']()}</button>
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
