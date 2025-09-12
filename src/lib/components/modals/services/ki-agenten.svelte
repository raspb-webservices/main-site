<script lang="ts">
  import { _ } from 'svelte-i18n';
</script>

<dialog id="modal-ki-agenten" class="modal">
  <div class="modal-box">
    <h3 class="mb-4 text-lg font-bold">{$_('servicesPage.modals.kiAgentDevelopment.title')}</h3>
    <div class="space-y-4">
      <p><strong>{$_('servicesPage.modals.kiAgentDevelopment.perfectFor')}</strong> {$_('servicesPage.modals.kiAgentDevelopment.perfectForDescription')}</p>

      <div>
        <h4 class="mb-2 font-semibold">{$_('servicesPage.modals.kiAgentDevelopment.agentTypesTitle')}</h4>
        <ul class="list-inside list-disc space-y-1">
          <li>{$_('servicesPage.modals.kiAgentDevelopment.agentTypes.a1')}</li>
          <li>{$_('servicesPage.modals.kiAgentDevelopment.agentTypes.a2')}</li>
          <li>{$_('servicesPage.modals.kiAgentDevelopment.agentTypes.a3')}</li>
          <li>{$_('servicesPage.modals.kiAgentDevelopment.agentTypes.a4')}</li>
          <li>{$_('servicesPage.modals.kiAgentDevelopment.agentTypes.a5')}</li>
          <li>{$_('servicesPage.modals.kiAgentDevelopment.agentTypes.a6')}</li>
        </ul>
      </div>

      <div class="bg-base-200 rounded-lg p-4">
        <p class="text-sm">
          <strong>{$_('servicesPage.modals.kiAgentDevelopment.projectDuration')}</strong>
          {$_('servicesPage.modals.kiAgentDevelopment.projectDurationValue')}
        </p>
        <p class="text-sm">
          <strong>{$_('servicesPage.modals.kiAgentDevelopment.training')}</strong>
          {$_('servicesPage.modals.kiAgentDevelopment.trainingValue')}
        </p>
      </div>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">{$_('servicesPage.modals.kiAgentDevelopment.closeButton')}</button>
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
