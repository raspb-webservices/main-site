<script lang="ts">
  import { m } from '$lib/paraglide/messages';
</script>

<dialog id="modal-blog-cms" class="modal">
  <div class="modal-box">
    <h3 class="mb-4 text-lg font-bold">{m['servicesPage_modals_blogCms_title']()}</h3>
    <div class="space-y-4">
      <p><strong>{m['servicesPage_modals_blogCms_perfectFor']()}</strong> {m['servicesPage_modals_blogCms_perfectForDescription']()}</p>

      <div>
        <h4 class="mb-2 font-semibold">{m['servicesPage_modals_blogCms_contentOptimizedFeaturesTitle']()}</h4>
        <ul class="list-inside list-disc space-y-1">
          <li>{m['servicesPage_modals_blogCms_contentOptimizedFeatures_c1']()}</li>
          <li>{m['servicesPage_modals_blogCms_contentOptimizedFeatures_c2']()}</li>
          <li>{m['servicesPage_modals_blogCms_contentOptimizedFeatures_c3']()}</li>
          <li>{m['servicesPage_modals_blogCms_contentOptimizedFeatures_c4']()}</li>
          <li>{m['servicesPage_modals_blogCms_contentOptimizedFeatures_c5']()}</li>
          <li>{m['servicesPage_modals_blogCms_contentOptimizedFeatures_c6']()}</li>
        </ul>
      </div>

      <div>
        <h4 class="mb-2 font-semibold">{m['servicesPage_modals_blogCms_monetizationTitle']()}</h4>
        <ul class="list-inside list-disc space-y-1">
          <li>{m['servicesPage_modals_blogCms_monetization_m1']()}</li>
          <li>{m['servicesPage_modals_blogCms_monetization_m2']()}</li>
          <li>{m['servicesPage_modals_blogCms_monetization_m3']()}</li>
          <li>{m['servicesPage_modals_blogCms_monetization_m4']()}</li>
        </ul>
      </div>

      <div class="bg-base-200 rounded-lg p-4">
        <p class="text-sm"><strong>{m['servicesPage_modals_blogCms_projectDuration']()}</strong> {m['servicesPage_modals_blogCms_projectDurationValue']()}</p>
        <p class="text-sm"><strong>{m['servicesPage_modals_blogCms_contentMigration']()}</strong> {m['servicesPage_modals_blogCms_contentMigrationValue']()}</p>
      </div>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">{m['servicesPage_modals_blogCms_closeButton']()}</button>
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
