<script lang="ts">
  import { m } from '$lib/paraglide/messages';
</script>

<dialog id="modal-ki-agenten" class="modal">
  <div class="modal-box">
    <h3 class="mb-4 text-lg font-bold">{m['servicesPage.modals.kiAgentDevelopment.title']()}</h3>
    <div class="space-y-4">
      <p><strong>{m['servicesPage.modals.kiAgentDevelopment.perfectFor']()}</strong> {m['servicesPage.modals.kiAgentDevelopment.perfectForDescription']()}</p>

      <div>
        <h4 class="mb-2 font-semibold">{m['servicesPage.modals.kiAgentDevelopment.agentTypesTitle']()}</h4>
        <ul class="list-inside list-disc space-y-1">
          <li>{m['servicesPage.modals.kiAgentDevelopment.agentTypes.a1']()}</li>
          <li>{m['servicesPage.modals.kiAgentDevelopment.agentTypes.a2']()}</li>
          <li>{m['servicesPage.modals.kiAgentDevelopment.agentTypes.a3']()}</li>
          <li>{m['servicesPage.modals.kiAgentDevelopment.agentTypes.a4']()}</li>
          <li>{m['servicesPage.modals.kiAgentDevelopment.agentTypes.a5']()}</li>
          <li>{m['servicesPage.modals.kiAgentDevelopment.agentTypes.a6']()}</li>
        </ul>
      </div>

      <div class="bg-base-200 rounded-lg p-4">
        <p class="text-sm">
          <strong>{m['servicesPage.modals.kiAgentDevelopment.projectDuration']()}</strong>
          {m['servicesPage.modals.kiAgentDevelopment.projectDurationValue']()}
        </p>
        <p class="text-sm">
          <strong>{m['servicesPage.modals.kiAgentDevelopment.training']()}</strong>
          {m['servicesPage.modals.kiAgentDevelopment.trainingValue']()}
        </p>
      </div>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">{m['servicesPage.modals.kiAgentDevelopment.closeButton']()}</button>
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
