<script lang="ts">
  import { m } from '$lib/paraglide/messages';
</script>

<dialog id="modal-special-apps" class="modal">
  <div class="modal-box">
    <h3 class="mb-4 text-lg font-bold">{m['servicesPage_modals_specialApps_title']()}</h3>
    <div class="space-y-4">
      <p><strong>{m['servicesPage_modals_specialApps_perfectFor']()}</strong> {m['servicesPage_modals_specialApps_perfectForDescription']()}</p>

      <div>
        <h4 class="mb-2 font-semibold">{m['servicesPage_modals_specialApps_applicationExamplesTitle']()}</h4>
        <ul class="list-inside list-disc space-y-1">
          <li>{m['servicesPage_modals_specialApps_applicationExamples_a1']()}</li>
          <li>{m['servicesPage_modals_specialApps_applicationExamples_a2']()}</li>
          <li>{m['servicesPage_modals_specialApps_applicationExamples_a3']()}</li>
          <li>{m['servicesPage_modals_specialApps_applicationExamples_a4']()}</li>
          <li>{m['servicesPage_modals_specialApps_applicationExamples_a5']()}</li>
        </ul>
      </div>

      <div class="bg-base-200 rounded-lg p-4">
        <p class="text-sm">
          <strong>{m['servicesPage_modals_specialApps_projectDuration']()}</strong>
          {m['servicesPage_modals_specialApps_projectDurationValue']()}
        </p>
        <p class="text-sm"><strong>{m['servicesPage_modals_specialApps_approach']()}</strong> {m['servicesPage_modals_specialApps_approachValue']()}</p>
      </div>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">{m['servicesPage_modals_specialApps_closeButton']()}</button>
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
