<script lang="ts">
  import { _ } from 'svelte-i18n';
</script>

<dialog id="modal-pwa" class="modal">
  <div class="modal-box">
    <h3 class="mb-4 text-lg font-bold">{$_('servicesPage.modals.pwa.title')}</h3>
    <div class="space-y-4">
      <p><strong>{$_('servicesPage.modals.pwa.perfectFor')}</strong> {$_('servicesPage.modals.pwa.perfectForDescription')}</p>

      <div>
        <h4 class="mb-2 font-semibold">{$_('servicesPage.modals.pwa.appLikeFeaturesTitle')}</h4>
        <ul class="list-inside list-disc space-y-1">
          <li>{$_('servicesPage.modals.pwa.appLikeFeatures.a1')}</li>
          <li>{$_('servicesPage.modals.pwa.appLikeFeatures.a2')}</li>
          <li>{$_('servicesPage.modals.pwa.appLikeFeatures.a3')}</li>
          <li>{$_('servicesPage.modals.pwa.appLikeFeatures.a4')}</li>
          <li>{$_('servicesPage.modals.pwa.appLikeFeatures.a5')}</li>
          <li>{$_('servicesPage.modals.pwa.appLikeFeatures.a6')}</li>
        </ul>
      </div>

      <div>
        <h4 class="mb-2 font-semibold">{$_('servicesPage.modals.pwa.technicalFeaturesTitle')}</h4>
        <ul class="list-inside list-disc space-y-1">
          <li>{$_('servicesPage.modals.pwa.technicalFeatures.t1')}</li>
          <li>{$_('servicesPage.modals.pwa.technicalFeatures.t2')}</li>
          <li>{$_('servicesPage.modals.pwa.technicalFeatures.t3')}</li>
          <li>{$_('servicesPage.modals.pwa.technicalFeatures.t4')}</li>
          <li>{$_('servicesPage.modals.pwa.technicalFeatures.t5')}</li>
        </ul>
      </div>

      <div class="bg-base-200 rounded-lg p-4">
        <p class="text-sm"><strong>{$_('servicesPage.modals.pwa.projectDuration')}</strong> {$_('servicesPage.modals.pwa.projectDurationValue')}</p>
        <p class="text-sm"><strong>{$_('servicesPage.modals.pwa.advantage')}</strong> {$_('servicesPage.modals.pwa.advantageValue')}</p>
      </div>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">{$_('servicesPage.modals.pwa.closeButton')}</button>
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
