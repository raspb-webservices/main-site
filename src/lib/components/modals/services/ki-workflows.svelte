<script lang="ts">
  import { m } from '$lib/paraglide/messages';
</script>

<dialog id="modal-workflow" class="modal">
  <div class="modal-box">
    <h3 class="mb-4 text-lg font-bold">{m['servicesPage_modals_workflowOptimization_title']()}</h3>
    <div class="space-y-4">
      <p>
        <strong>{m['servicesPage_modals_workflowOptimization_perfectFor']()}</strong>
        {m['servicesPage_modals_workflowOptimization_perfectForDescription']()}
      </p>

      <div>
        <h4 class="mb-2 font-semibold">{m['servicesPage_modals_workflowOptimization_optimizationAreasTitle']()}</h4>
        <ul class="list-inside list-disc space-y-1">
          <li>{m['servicesPage_modals_workflowOptimization_optimizationAreas_o1']()}</li>
          <li>{m['servicesPage_modals_workflowOptimization_optimizationAreas_o2']()}</li>
          <li>{m['servicesPage_modals_workflowOptimization_optimizationAreas_o3']()}</li>
          <li>{m['servicesPage_modals_workflowOptimization_optimizationAreas_o4']()}</li>
          <li>{m['servicesPage_modals_workflowOptimization_optimizationAreas_o5']()}</li>
          <li>{m['servicesPage_modals_workflowOptimization_optimizationAreas_o6']()}</li>
        </ul>
      </div>

      <div>
        <h4 class="mb-2 font-semibold">{m['servicesPage_modals_workflowOptimization_measurableBenefitsTitle']()}</h4>
        <ul class="list-inside list-disc space-y-1">
          <li>{m['servicesPage_modals_workflowOptimization_measurableBenefits_m1']()}</li>
          <li>{m['servicesPage_modals_workflowOptimization_measurableBenefits_m2']()}</li>
          <li>{m['servicesPage_modals_workflowOptimization_measurableBenefits_m3']()}</li>
          <li>{m['servicesPage_modals_workflowOptimization_measurableBenefits_m4']()}</li>
        </ul>
      </div>

      <div class="bg-base-200 rounded-lg p-4">
        <p class="text-sm">
          <strong>{m['servicesPage_modals_workflowOptimization_projectDuration']()}</strong>
          {m['servicesPage_modals_workflowOptimization_projectDurationValue']()}
        </p>
        <p class="text-sm"><strong>{m['servicesPage_modals_workflowOptimization_roi']()}</strong> {m['servicesPage_modals_workflowOptimization_roiValue']()}</p>
      </div>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">{m['servicesPage_modals_workflowOptimization_closeButton']()}</button>
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
