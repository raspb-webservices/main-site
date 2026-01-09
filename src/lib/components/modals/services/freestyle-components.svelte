<script lang="ts">
  import { m } from '$lib/paraglide/messages';
</script>

<dialog id="modal-components" class="modal">
  <div class="modal-box">
    <h3 class="mb-4 text-lg font-bold">{m['servicesPage.modals.components.title']()}</h3>
    <div class="space-y-4">
      <p><strong>{m['servicesPage.modals.components.perfectFor']()}</strong> {m['servicesPage.modals.components.perfectForDescription']()}</p>

      <div>
        <h4 class="mb-2 font-semibold">{m['servicesPage.modals.components.componentTypesTitle']()}</h4>
        <ul class="list-inside list-disc space-y-1">
          <li>{m['servicesPage.modals.components.componentTypes.c1']()}</li>
          <li>{m['servicesPage.modals.components.componentTypes.c2']()}</li>
          <li>{m['servicesPage.modals.components.componentTypes.c3']()}</li>
          <li>{m['servicesPage.modals.components.componentTypes.c4']()}</li>
          <li>{m['servicesPage.modals.components.componentTypes.c5']()}</li>
        </ul>
      </div>

      <div class="bg-base-200 rounded-lg p-4">
        <p class="text-sm">
          <strong>{m['servicesPage.modals.components.projectDuration']()}</strong>
          {m['servicesPage.modals.components.projectDurationValue']()}
        </p>
        <p class="text-sm"><strong>{m['servicesPage.modals.components.integration']()}</strong> {m['servicesPage.modals.components.integrationValue']()}</p>
      </div>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">{m['servicesPage.modals.components.closeButton']()}</button>
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
