<script lang="ts">
  import { m } from '$lib/paraglide/messages';
</script>

<dialog id="modal-workflow" class="modal">
  <div class="modal-box">
    <h3 class="mb-4 text-lg font-bold">{m['servicesPage.modals.workflowOptimization.title']()}</h3>
    <div class="space-y-4">
      <p><strong>{m['servicesPage.modals.workflowOptimization.perfectFor']()}</strong> {m['servicesPage.modals.workflowOptimization.perfectForDescription']()}</p>

      <div>
        <h4 class="mb-2 font-semibold">{m['servicesPage.modals.workflowOptimization.optimizationAreasTitle']()}</h4>
        <ul class="list-inside list-disc space-y-1">
          <li>{m['servicesPage.modals.workflowOptimization.optimizationAreas.o1']()}</li>
          <li>{m['servicesPage.modals.workflowOptimization.optimizationAreas.o2']()}</li>
          <li>{m['servicesPage.modals.workflowOptimization.optimizationAreas.o3']()}</li>
          <li>{m['servicesPage.modals.workflowOptimization.optimizationAreas.o4']()}</li>
          <li>{m['servicesPage.modals.workflowOptimization.optimizationAreas.o5']()}</li>
          <li>{m['servicesPage.modals.workflowOptimization.optimizationAreas.o6']()}</li>
        </ul>
      </div>

      <div>
        <h4 class="mb-2 font-semibold">{m['servicesPage.modals.workflowOptimization.measurableBenefitsTitle']()}</h4>
        <ul class="list-inside list-disc space-y-1">
          <li>{m['servicesPage.modals.workflowOptimization.measurableBenefits.m1']()}</li>
          <li>{m['servicesPage.modals.workflowOptimization.measurableBenefits.m2']()}</li>
          <li>{m['servicesPage.modals.workflowOptimization.measurableBenefits.m3']()}</li>
          <li>{m['servicesPage.modals.workflowOptimization.measurableBenefits.m4']()}</li>
        </ul>
      </div>

      <div class="bg-base-200 rounded-lg p-4">
        <p class="text-sm">
          <strong>{m['servicesPage.modals.workflowOptimization.projectDuration']()}</strong>
          {m['servicesPage.modals.workflowOptimization.projectDurationValue']()}
        </p>
        <p class="text-sm"><strong>{m['servicesPage.modals.workflowOptimization.roi']()}</strong> {m['servicesPage.modals.workflowOptimization.roiValue']()}</p>
      </div>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">{m['servicesPage.modals.workflowOptimization.closeButton']()}</button>
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
