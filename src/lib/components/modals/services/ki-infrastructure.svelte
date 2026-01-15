<script lang="ts">
  import { m } from '$lib/paraglide/messages';
</script>

<dialog id="modal-ai-infrastructure" class="modal">
  <div class="modal-box">
    <h3 class="mb-4 text-lg font-bold">{m['servicesPage_modals_aiInfrastructure_title']()}</h3>
    <div class="space-y-4">
      <p><strong>{m['servicesPage_modals_aiInfrastructure_perfectFor']()}</strong> {m['servicesPage_modals_aiInfrastructure_perfectForDescription']()}</p>

      <div>
        <h4 class="mb-2 font-semibold">{m['servicesPage_modals_aiInfrastructure_serviceModelsTitle']()}</h4>
        <ul class="list-inside list-disc space-y-1">
          <li>{m['servicesPage_modals_aiInfrastructure_serviceModels_s1']()}</li>
          <li>{m['servicesPage_modals_aiInfrastructure_serviceModels_s2']()}</li>
          <li>{m['servicesPage_modals_aiInfrastructure_serviceModels_s3']()}</li>
          <li>{m['servicesPage_modals_aiInfrastructure_serviceModels_s4']()}</li>
          <li>{m['servicesPage_modals_aiInfrastructure_serviceModels_s5']()}</li>
          <li>{m['servicesPage_modals_aiInfrastructure_serviceModels_s6']()}</li>
        </ul>
      </div>

      <div>
        <h4 class="mb-2 font-semibold">{m['servicesPage_modals_aiInfrastructure_billingModelsTitle']()}</h4>
        <ul class="list-inside list-disc space-y-1">
          <li>{m['servicesPage_modals_aiInfrastructure_billingModels_b1']()}</li>
          <li>{m['servicesPage_modals_aiInfrastructure_billingModels_b2']()}</li>
          <li>{m['servicesPage_modals_aiInfrastructure_billingModels_b3']()}</li>
          <li>{m['servicesPage_modals_aiInfrastructure_billingModels_b4']()}</li>
        </ul>
      </div>

      <div class="bg-base-200 rounded-lg p-4">
        <p class="text-sm">
          <strong>{m['servicesPage_modals_aiInfrastructure_setupTime']()}</strong>
          {m['servicesPage_modals_aiInfrastructure_setupTimeValue']()}
        </p>
        <p class="text-sm"><strong>{m['servicesPage_modals_aiInfrastructure_scaling']()}</strong> {m['servicesPage_modals_aiInfrastructure_scalingValue']()}</p>
      </div>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">{m['servicesPage_modals_aiInfrastructure_closeButton']()}</button>
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
