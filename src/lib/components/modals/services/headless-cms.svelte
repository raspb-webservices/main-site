<script lang="ts">
  import { m } from '$lib/paraglide/messages';
</script>

<dialog id="modal-headless-cms" class="modal">
  <div class="modal-box">
    <h3 class="mb-4 text-lg font-bold">{m['servicesPage.modals.headlessCms.title']()}</h3>
    <div class="space-y-4">
      <p><strong>{m['servicesPage.modals.headlessCms.perfectFor']()}</strong> {m['servicesPage.modals.headlessCms.perfectForDescription']()}</p>

      <div>
        <h4 class="mb-2 font-semibold">{m['servicesPage.modals.headlessCms.apiFirstTitle']()}</h4>
        <ul class="list-inside list-disc space-y-1">
          <li>{m['servicesPage.modals.headlessCms.apiFirst.a1']()}</li>
          <li>{m['servicesPage.modals.headlessCms.apiFirst.a2']()}</li>
          <li>{m['servicesPage.modals.headlessCms.apiFirst.a3']()}</li>
          <li>{m['servicesPage.modals.headlessCms.apiFirst.a4']()}</li>
          <li>{m['servicesPage.modals.headlessCms.apiFirst.a5']()}</li>
          <li>{m['servicesPage.modals.headlessCms.apiFirst.a6']()}</li>
        </ul>
      </div>

      <div>
        <h4 class="mb-2 font-semibold">{m['servicesPage.modals.headlessCms.useCasesTitle']()}</h4>
        <ul class="list-inside list-disc space-y-1">
          <li>{m['servicesPage.modals.headlessCms.useCases.u1']()}</li>
          <li>{m['servicesPage.modals.headlessCms.useCases.u2']()}</li>
          <li>{m['servicesPage.modals.headlessCms.useCases.u3']()}</li>
          <li>{m['servicesPage.modals.headlessCms.useCases.u4']()}</li>
        </ul>
      </div>

      <div class="bg-base-200 rounded-lg p-4">
        <p class="text-sm">
          <strong>{m['servicesPage.modals.headlessCms.projectDuration']()}</strong>
          {m['servicesPage.modals.headlessCms.projectDurationValue']()}
        </p>
        <p class="text-sm"><strong>{m['servicesPage.modals.headlessCms.technology']()}</strong> {m['servicesPage.modals.headlessCms.technologyValue']()}</p>
      </div>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">{m['servicesPage.modals.headlessCms.closeButton']()}</button>
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
