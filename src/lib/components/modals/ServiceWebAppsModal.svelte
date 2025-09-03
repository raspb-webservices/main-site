<script lang="ts">
  import { _ } from 'svelte-i18n';
</script>

<dialog id="modal-web-apps" class="modal">
  <div class="modal-box">
    <h3 class="mb-4 text-lg font-bold">{$_('servicesPage.modals.webApps.title')}</h3>
    <div class="space-y-4">
      <p><strong>{$_('servicesPage.modals.webApps.perfectFor')}</strong> {$_('servicesPage.modals.webApps.perfectForDescription')}</p>

      <div>
        <h4 class="mb-2 font-semibold">{$_('servicesPage.modals.webApps.technicalAdvantagesTitle')}</h4>
        <ul class="list-inside list-disc space-y-1">
          <li>{$_('servicesPage.modals.webApps.technicalAdvantages.t1')}</li>
          <li>{$_('servicesPage.modals.webApps.technicalAdvantages.t2')}</li>
          <li>{$_('servicesPage.modals.webApps.technicalAdvantages.t3')}</li>
          <li>{$_('servicesPage.modals.webApps.technicalAdvantages.t4')}</li>
          <li>{$_('servicesPage.modals.webApps.technicalAdvantages.t5')}</li>
          <li>{$_('servicesPage.modals.webApps.technicalAdvantages.t6')}</li>
        </ul>
      </div>

      <div>
        <h4 class="mb-2 font-semibold">{$_('servicesPage.modals.webApps.exampleApplicationsTitle')}</h4>
        <ul class="list-inside list-disc space-y-1">
          <li>{$_('servicesPage.modals.webApps.exampleApplications.e1')}</li>
          <li>{$_('servicesPage.modals.webApps.exampleApplications.e2')}</li>
          <li>{$_('servicesPage.modals.webApps.exampleApplications.e3')}</li>
          <li>{$_('servicesPage.modals.webApps.exampleApplications.e4')}</li>
          <li>{$_('servicesPage.modals.webApps.exampleApplications.e5')}</li>
        </ul>
      </div>

      <div class="bg-base-200 rounded-lg p-4">
        <p class="text-sm"><strong>{$_('servicesPage.modals.webApps.projectDuration')}</strong> {$_('servicesPage.modals.webApps.projectDurationValue')}</p>
        <p class="text-sm"><strong>{$_('servicesPage.modals.webApps.technology')}</strong> {$_('servicesPage.modals.webApps.technologyValue')}</p>
      </div>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">{$_('servicesPage.modals.webApps.closeButton')}</button>
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
