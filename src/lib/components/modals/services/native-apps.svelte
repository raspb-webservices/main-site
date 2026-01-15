<script lang="ts">
  import { m } from '$lib/paraglide/messages';
</script>

<dialog id="modal-native-apps" class="modal">
  <div class="modal-box">
    <h3 class="mb-4 text-lg font-bold">{m['servicesPage_modals_nativeApps_title']()}</h3>
    <div class="space-y-4">
      <p><strong>{m['servicesPage_modals_nativeApps_perfectFor']()}</strong> {m['servicesPage_modals_nativeApps_perfectForDescription']()}</p>

      <div>
        <h4 class="mb-2 font-semibold">{m['servicesPage_modals_nativeApps_nativeAdvantagesTitle']()}</h4>
        <ul class="list-inside list-disc space-y-1">
          <li>{m['servicesPage_modals_nativeApps_nativeAdvantages_n1']()}</li>
          <li>{m['servicesPage_modals_nativeApps_nativeAdvantages_n2']()}</li>
          <li>{m['servicesPage_modals_nativeApps_nativeAdvantages_n3']()}</li>
          <li>{m['servicesPage_modals_nativeApps_nativeAdvantages_n4']()}</li>
          <li>{m['servicesPage_modals_nativeApps_nativeAdvantages_n5']()}</li>
          <li>{m['servicesPage_modals_nativeApps_nativeAdvantages_n6']()}</li>
        </ul>
      </div>

      <div>
        <h4 class="mb-2 font-semibold">{m['servicesPage_modals_nativeApps_developmentApproachTitle']()}</h4>
        <ul class="list-inside list-disc space-y-1">
          <li>{m['servicesPage_modals_nativeApps_developmentApproach_d1']()}</li>
          <li>{m['servicesPage_modals_nativeApps_developmentApproach_d2']()}</li>
          <li>{m['servicesPage_modals_nativeApps_developmentApproach_d3']()}</li>
          <li>{m['servicesPage_modals_nativeApps_developmentApproach_d4']()}</li>
        </ul>
      </div>

      <div class="bg-base-200 rounded-lg p-4">
        <p class="text-sm">
          <strong>{m['servicesPage_modals_nativeApps_projectDuration']()}</strong>
          {m['servicesPage_modals_nativeApps_projectDurationValue']()}
        </p>
        <p class="text-sm"><strong>{m['servicesPage_modals_nativeApps_appStore']()}</strong> {m['servicesPage_modals_nativeApps_appStoreValue']()}</p>
      </div>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">{m['servicesPage_modals_nativeApps_closeButton']()}</button>
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
