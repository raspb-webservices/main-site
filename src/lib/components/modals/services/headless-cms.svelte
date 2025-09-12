<script lang="ts">
  import { _ } from 'svelte-i18n';
</script>

<dialog id="modal-headless-cms" class="modal">
  <div class="modal-box">
    <h3 class="mb-4 text-lg font-bold">{$_('servicesPage.modals.headlessCms.title')}</h3>
    <div class="space-y-4">
      <p><strong>{$_('servicesPage.modals.headlessCms.perfectFor')}</strong> {$_('servicesPage.modals.headlessCms.perfectForDescription')}</p>

      <div>
        <h4 class="mb-2 font-semibold">{$_('servicesPage.modals.headlessCms.apiFirstTitle')}</h4>
        <ul class="list-inside list-disc space-y-1">
          <li>{$_('servicesPage.modals.headlessCms.apiFirst.a1')}</li>
          <li>{$_('servicesPage.modals.headlessCms.apiFirst.a2')}</li>
          <li>{$_('servicesPage.modals.headlessCms.apiFirst.a3')}</li>
          <li>{$_('servicesPage.modals.headlessCms.apiFirst.a4')}</li>
          <li>{$_('servicesPage.modals.headlessCms.apiFirst.a5')}</li>
          <li>{$_('servicesPage.modals.headlessCms.apiFirst.a6')}</li>
        </ul>
      </div>

      <div>
        <h4 class="mb-2 font-semibold">{$_('servicesPage.modals.headlessCms.useCasesTitle')}</h4>
        <ul class="list-inside list-disc space-y-1">
          <li>{$_('servicesPage.modals.headlessCms.useCases.u1')}</li>
          <li>{$_('servicesPage.modals.headlessCms.useCases.u2')}</li>
          <li>{$_('servicesPage.modals.headlessCms.useCases.u3')}</li>
          <li>{$_('servicesPage.modals.headlessCms.useCases.u4')}</li>
        </ul>
      </div>

      <div class="bg-base-200 rounded-lg p-4">
        <p class="text-sm">
          <strong>{$_('servicesPage.modals.headlessCms.projectDuration')}</strong>
          {$_('servicesPage.modals.headlessCms.projectDurationValue')}
        </p>
        <p class="text-sm"><strong>{$_('servicesPage.modals.headlessCms.technology')}</strong> {$_('servicesPage.modals.headlessCms.technologyValue')}</p>
      </div>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">{$_('servicesPage.modals.headlessCms.closeButton')}</button>
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
