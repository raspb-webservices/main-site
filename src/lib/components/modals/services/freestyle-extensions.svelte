<script lang="ts">
  import { m } from '$lib/paraglide/messages';
</script>

<dialog id="modal-extensions" class="modal">
  <div class="modal-box">
    <h3 class="mb-4 text-lg font-bold">{m['servicesPage.modals.extensions.title']()}</h3>
    <div class="space-y-4">
      <p><strong>{m['servicesPage.modals.extensions.perfectFor']()}</strong> {m['servicesPage.modals.extensions.perfectForDescription']()}</p>

      <div>
        <h4 class="mb-2 font-semibold">{m['servicesPage.modals.extensions.extensionServicesTitle']()}</h4>
        <ul class="list-inside list-disc space-y-1">
          <li>{m['servicesPage.modals.extensions.extensionServices.e1']()}</li>
          <li>{m['servicesPage.modals.extensions.extensionServices.e2']()}</li>
          <li>{m['servicesPage.modals.extensions.extensionServices.e3']()}</li>
          <li>{m['servicesPage.modals.extensions.extensionServices.e4']()}</li>
          <li>{m['servicesPage.modals.extensions.extensionServices.e5']()}</li>
        </ul>
      </div>

      <div class="bg-base-200 rounded-lg p-4">
        <p class="text-sm">
          <strong>{m['servicesPage.modals.extensions.projectDuration']()}</strong>
          {m['servicesPage.modals.extensions.projectDurationValue']()}
        </p>
        <p class="text-sm"><strong>{m['servicesPage.modals.extensions.compatibility']()}</strong> {m['servicesPage.modals.extensions.compatibilityValue']()}</p>
      </div>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">{m['servicesPage.modals.extensions.closeButton']()}</button>
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
