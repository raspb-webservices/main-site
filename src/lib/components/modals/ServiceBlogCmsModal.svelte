<script lang="ts">
  import { _ } from 'svelte-i18n';
</script>

<dialog id="modal-blog-cms" class="modal">
  <div class="modal-box">
    <h3 class="mb-4 text-lg font-bold">{$_('servicesPage.modals.blogCms.title')}</h3>
    <div class="space-y-4">
      <p><strong>{$_('servicesPage.modals.blogCms.perfectFor')}</strong> {$_('servicesPage.modals.blogCms.perfectForDescription')}</p>

      <div>
        <h4 class="mb-2 font-semibold">{$_('servicesPage.modals.blogCms.contentOptimizedFeaturesTitle')}</h4>
        <ul class="list-inside list-disc space-y-1">
          <li>{$_('servicesPage.modals.blogCms.contentOptimizedFeatures.c1')}</li>
          <li>{$_('servicesPage.modals.blogCms.contentOptimizedFeatures.c2')}</li>
          <li>{$_('servicesPage.modals.blogCms.contentOptimizedFeatures.c3')}</li>
          <li>{$_('servicesPage.modals.blogCms.contentOptimizedFeatures.c4')}</li>
          <li>{$_('servicesPage.modals.blogCms.contentOptimizedFeatures.c5')}</li>
          <li>{$_('servicesPage.modals.blogCms.contentOptimizedFeatures.c6')}</li>
        </ul>
      </div>

      <div>
        <h4 class="mb-2 font-semibold">{$_('servicesPage.modals.blogCms.monetizationTitle')}</h4>
        <ul class="list-inside list-disc space-y-1">
          <li>{$_('servicesPage.modals.blogCms.monetization.m1')}</li>
          <li>{$_('servicesPage.modals.blogCms.monetization.m2')}</li>
          <li>{$_('servicesPage.modals.blogCms.monetization.m3')}</li>
          <li>{$_('servicesPage.modals.blogCms.monetization.m4')}</li>
        </ul>
      </div>

      <div class="bg-base-200 rounded-lg p-4">
        <p class="text-sm"><strong>{$_('servicesPage.modals.blogCms.projectDuration')}</strong> {$_('servicesPage.modals.blogCms.projectDurationValue')}</p>
        <p class="text-sm"><strong>{$_('servicesPage.modals.blogCms.contentMigration')}</strong> {$_('servicesPage.modals.blogCms.contentMigrationValue')}</p>
      </div>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">{$_('servicesPage.modals.blogCms.closeButton')}</button>
      </form>
    </div>
  </div>
</dialog>

<style lang="postcss">
  @reference '../../../app.css';
  
  .modal-box {
    @apply max-w-2xl;
  }
</style>
