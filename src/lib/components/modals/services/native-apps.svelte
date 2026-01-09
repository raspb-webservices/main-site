<script lang="ts">
  import { m } from '$lib/paraglide/messages';
</script>

<dialog id="modal-native-apps" class="modal">
  <div class="modal-box">
    <h3 class="mb-4 text-lg font-bold">{m['servicesPage.modals.nativeApps.title']()}</h3>
    <div class="space-y-4">
      <p><strong>{m['servicesPage.modals.nativeApps.perfectFor']()}</strong> {m['servicesPage.modals.nativeApps.perfectForDescription']()}</p>

      <div>
        <h4 class="mb-2 font-semibold">{m['servicesPage.modals.nativeApps.nativeAdvantagesTitle']()}</h4>
        <ul class="list-inside list-disc space-y-1">
          <li>{m['servicesPage.modals.nativeApps.nativeAdvantages.n1']()}</li>
          <li>{m['servicesPage.modals.nativeApps.nativeAdvantages.n2']()}</li>
          <li>{m['servicesPage.modals.nativeApps.nativeAdvantages.n3']()}</li>
          <li>{m['servicesPage.modals.nativeApps.nativeAdvantages.n4']()}</li>
          <li>{m['servicesPage.modals.nativeApps.nativeAdvantages.n5']()}</li>
          <li>{m['servicesPage.modals.nativeApps.nativeAdvantages.n6']()}</li>
        </ul>
      </div>

      <div>
        <h4 class="mb-2 font-semibold">{m['servicesPage.modals.nativeApps.developmentApproachTitle']()}</h4>
        <ul class="list-inside list-disc space-y-1">
          <li>{m['servicesPage.modals.nativeApps.developmentApproach.d1']()}</li>
          <li>{m['servicesPage.modals.nativeApps.developmentApproach.d2']()}</li>
          <li>{m['servicesPage.modals.nativeApps.developmentApproach.d3']()}</li>
          <li>{m['servicesPage.modals.nativeApps.developmentApproach.d4']()}</li>
        </ul>
      </div>

      <div class="bg-base-200 rounded-lg p-4">
        <p class="text-sm">
          <strong>{m['servicesPage.modals.nativeApps.projectDuration']()}</strong>
          {m['servicesPage.modals.nativeApps.projectDurationValue']()}
        </p>
        <p class="text-sm"><strong>{m['servicesPage.modals.nativeApps.appStore']()}</strong> {m['servicesPage.modals.nativeApps.appStoreValue']()}</p>
      </div>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">{m['servicesPage.modals.nativeApps.closeButton']()}</button>
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
