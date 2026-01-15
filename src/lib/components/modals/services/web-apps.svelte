<script lang="ts">
  import { m } from '$lib/paraglide/messages';
</script>

<dialog id="modal-web-apps" class="modal">
  <div class="modal-box">
    <h3 class="mb-4 text-lg font-bold">{m['servicesPage_modals_webApps_title']()}</h3>
    <div class="space-y-4">
      <p><strong>{m['servicesPage_modals_webApps_perfectFor']()}</strong> {m['servicesPage_modals_webApps_perfectForDescription']()}</p>

      <div>
        <h4 class="mb-2 font-semibold">{m['servicesPage_modals_webApps_technicalAdvantagesTitle']()}</h4>
        <ul class="list-inside list-disc space-y-1">
          <li>{m['servicesPage_modals_webApps_technicalAdvantages_t1']()}</li>
          <li>{m['servicesPage_modals_webApps_technicalAdvantages_t2']()}</li>
          <li>{m['servicesPage_modals_webApps_technicalAdvantages_t3']()}</li>
          <li>{m['servicesPage_modals_webApps_technicalAdvantages_t4']()}</li>
          <li>{m['servicesPage_modals_webApps_technicalAdvantages_t5']()}</li>
          <li>{m['servicesPage_modals_webApps_technicalAdvantages_t6']()}</li>
        </ul>
      </div>

      <div>
        <h4 class="mb-2 font-semibold">{m['servicesPage_modals_webApps_exampleApplicationsTitle']()}</h4>
        <ul class="list-inside list-disc space-y-1">
          <li>{m['servicesPage_modals_webApps_exampleApplications_e1']()}</li>
          <li>{m['servicesPage_modals_webApps_exampleApplications_e2']()}</li>
          <li>{m['servicesPage_modals_webApps_exampleApplications_e3']()}</li>
          <li>{m['servicesPage_modals_webApps_exampleApplications_e4']()}</li>
          <li>{m['servicesPage_modals_webApps_exampleApplications_e5']()}</li>
        </ul>
      </div>

      <div class="bg-base-200 rounded-lg p-4">
        <p class="text-sm"><strong>{m['servicesPage_modals_webApps_projectDuration']()}</strong> {m['servicesPage_modals_webApps_projectDurationValue']()}</p>
        <p class="text-sm"><strong>{m['servicesPage_modals_webApps_technology']()}</strong> {m['servicesPage_modals_webApps_technologyValue']()}</p>
      </div>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">{m['servicesPage_modals_webApps_closeButton']()}</button>
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
