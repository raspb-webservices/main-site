<script lang="ts">
  import { _ } from 'svelte-i18n';
</script>

<dialog id="modal-native-apps" class="modal">
  <div class="modal-box">
    <h3 class="mb-4 text-lg font-bold">{$_('servicesPage.modals.nativeApps.title')}</h3>
    <div class="space-y-4">
      <p><strong>{$_('servicesPage.modals.nativeApps.perfectFor')}</strong> {$_('servicesPage.modals.nativeApps.perfectForDescription')}</p>

      <div>
        <h4 class="mb-2 font-semibold">{$_('servicesPage.modals.nativeApps.nativeAdvantagesTitle')}</h4>
        <ul class="list-inside list-disc space-y-1">
          <li>{$_('servicesPage.modals.nativeApps.nativeAdvantages.n1')}</li>
          <li>{$_('servicesPage.modals.nativeApps.nativeAdvantages.n2')}</li>
          <li>{$_('servicesPage.modals.nativeApps.nativeAdvantages.n3')}</li>
          <li>{$_('servicesPage.modals.nativeApps.nativeAdvantages.n4')}</li>
          <li>{$_('servicesPage.modals.nativeApps.nativeAdvantages.n5')}</li>
          <li>{$_('servicesPage.modals.nativeApps.nativeAdvantages.n6')}</li>
        </ul>
      </div>

      <div>
        <h4 class="mb-2 font-semibold">{$_('servicesPage.modals.nativeApps.developmentApproachTitle')}</h4>
        <ul class="list-inside list-disc space-y-1">
          <li>{$_('servicesPage.modals.nativeApps.developmentApproach.d1')}</li>
          <li>{$_('servicesPage.modals.nativeApps.developmentApproach.d2')}</li>
          <li>{$_('servicesPage.modals.nativeApps.developmentApproach.d3')}</li>
          <li>{$_('servicesPage.modals.nativeApps.developmentApproach.d4')}</li>
        </ul>
      </div>

      <div class="bg-base-200 rounded-lg p-4">
        <p class="text-sm">
          <strong>{$_('servicesPage.modals.nativeApps.projectDuration')}</strong>
          {$_('servicesPage.modals.nativeApps.projectDurationValue')}
        </p>
        <p class="text-sm"><strong>{$_('servicesPage.modals.nativeApps.appStore')}</strong> {$_('servicesPage.modals.nativeApps.appStoreValue')}</p>
      </div>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">{$_('servicesPage.modals.nativeApps.closeButton')}</button>
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
