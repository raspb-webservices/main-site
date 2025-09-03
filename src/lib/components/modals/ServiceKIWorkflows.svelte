<script lang="ts">
  import { _ } from 'svelte-i18n';
</script>

<dialog id="modal-workflow" class="modal">
  <div class="modal-box">
    <h3 class="mb-4 text-lg font-bold">{$_('servicesPage.modals.workflowOptimization.title')}</h3>
    <div class="space-y-4">
      <p><strong>{$_('servicesPage.modals.workflowOptimization.perfectFor')}</strong> {$_('servicesPage.modals.workflowOptimization.perfectForDescription')}</p>

      <div>
        <h4 class="mb-2 font-semibold">{$_('servicesPage.modals.workflowOptimization.optimizationAreasTitle')}</h4>
        <ul class="list-inside list-disc space-y-1">
          <li>{$_('servicesPage.modals.workflowOptimization.optimizationAreas.o1')}</li>
          <li>{$_('servicesPage.modals.workflowOptimization.optimizationAreas.o2')}</li>
          <li>{$_('servicesPage.modals.workflowOptimization.optimizationAreas.o3')}</li>
          <li>{$_('servicesPage.modals.workflowOptimization.optimizationAreas.o4')}</li>
          <li>{$_('servicesPage.modals.workflowOptimization.optimizationAreas.o5')}</li>
          <li>{$_('servicesPage.modals.workflowOptimization.optimizationAreas.o6')}</li>
        </ul>
      </div>

      <div>
        <h4 class="mb-2 font-semibold">{$_('servicesPage.modals.workflowOptimization.measurableBenefitsTitle')}</h4>
        <ul class="list-inside list-disc space-y-1">
          <li>{$_('servicesPage.modals.workflowOptimization.measurableBenefits.m1')}</li>
          <li>{$_('servicesPage.modals.workflowOptimization.measurableBenefits.m2')}</li>
          <li>{$_('servicesPage.modals.workflowOptimization.measurableBenefits.m3')}</li>
          <li>{$_('servicesPage.modals.workflowOptimization.measurableBenefits.m4')}</li>
        </ul>
      </div>

      <div class="bg-base-200 rounded-lg p-4">
        <p class="text-sm">
          <strong>{$_('servicesPage.modals.workflowOptimization.projectDuration')}</strong>
          {$_('servicesPage.modals.workflowOptimization.projectDurationValue')}
        </p>
        <p class="text-sm"><strong>{$_('servicesPage.modals.workflowOptimization.roi')}</strong> {$_('servicesPage.modals.workflowOptimization.roiValue')}</p>
      </div>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">{$_('servicesPage.modals.workflowOptimization.closeButton')}</button>
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
