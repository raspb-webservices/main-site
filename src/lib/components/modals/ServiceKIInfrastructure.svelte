<script lang="ts">
  import { _ } from 'svelte-i18n';
</script>


<dialog id="modal-ai-infrastructure" class="modal">
  <div class="modal-box">
    <h3 class="mb-4 text-lg font-bold">{$_('servicesPage.modals.aiInfrastructure.title')}</h3>
    <div class="space-y-4">
      <p><strong>{$_('servicesPage.modals.aiInfrastructure.perfectFor')}</strong> {$_('servicesPage.modals.aiInfrastructure.perfectForDescription')}</p>

      <div>
        <h4 class="mb-2 font-semibold">{$_('servicesPage.modals.aiInfrastructure.serviceModelsTitle')}</h4>
        <ul class="list-inside list-disc space-y-1">
          <li>{$_('servicesPage.modals.aiInfrastructure.serviceModels.s1')}</li>
          <li>{$_('servicesPage.modals.aiInfrastructure.serviceModels.s2')}</li>
          <li>{$_('servicesPage.modals.aiInfrastructure.serviceModels.s3')}</li>
          <li>{$_('servicesPage.modals.aiInfrastructure.serviceModels.s4')}</li>
          <li>{$_('servicesPage.modals.aiInfrastructure.serviceModels.s5')}</li>
          <li>{$_('servicesPage.modals.aiInfrastructure.serviceModels.s6')}</li>
        </ul>
      </div>

      <div>
        <h4 class="mb-2 font-semibold">{$_('servicesPage.modals.aiInfrastructure.billingModelsTitle')}</h4>
        <ul class="list-inside list-disc space-y-1">
          <li>{$_('servicesPage.modals.aiInfrastructure.billingModels.b1')}</li>
          <li>{$_('servicesPage.modals.aiInfrastructure.billingModels.b2')}</li>
          <li>{$_('servicesPage.modals.aiInfrastructure.billingModels.b3')}</li>
          <li>{$_('servicesPage.modals.aiInfrastructure.billingModels.b4')}</li>
        </ul>
      </div>

      <div class="bg-base-200 rounded-lg p-4">
        <p class="text-sm">
          <strong>{$_('servicesPage.modals.aiInfrastructure.setupTime')}</strong>
          {$_('servicesPage.modals.aiInfrastructure.setupTimeValue')}
        </p>
        <p class="text-sm"><strong>{$_('servicesPage.modals.aiInfrastructure.scaling')}</strong> {$_('servicesPage.modals.aiInfrastructure.scalingValue')}</p>
      </div>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">{$_('servicesPage.modals.aiInfrastructure.closeButton')}</button>
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
