<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  let { config } = $props();
</script>

<div class="step-header">
  <h1>{m['wizard.steps.step3.titleFirst']()} <span class="inner-text-special">{m['wizard.steps.step3.titleHighlight']()}</span></h1>
  <p class="teaser">{m['wizard.steps.step3.teaser']()}</p>
</div>

<div class="content-section">
  <div class="form-control mb-8 w-full">
    <label class="label" for="projectName">
      <span class="label-text text-lg font-semibold">{m['wizard.form.projectName']()}</span>
    </label>
    <input
      type="text"
      id="projectName"
      class="input input-bordered input-lg w-full"
      bind:value={config.name}
      placeholder={m['wizard.form.projectNamePlaceholder']()}
    />
  </div>

  <div class="form-control mb-8 w-full">
    <label class="label" for="description">
      <span class="label-text text-lg font-semibold">{m['wizard.form.projectDescription']()}</span>
    </label>
    <textarea
      id="description"
      class="textarea textarea-bordered textarea-lg w-full"
      bind:value={config.description}
      placeholder={config.projectType === 'webApplication' || config.projectType === 'artificialIntelligence'
        ? m['wizard.form.placeholders.webApplication']()
        : config.projectType === 'freestyle'
          ? m['wizard.form.placeholders.freestyle']()
          : m['wizard.form.placeholders.default']()}
      rows="8"
    ></textarea>
    <div class="label">
      <span class="label-text-alt">{m['wizard.form.characters']({ count: config.description.length })}</span>
    </div>
  </div>

  <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
    <div class="form-control w-full">
      <label class="label" for="targetAudience">
        <span class="label-text font-semibold">{m['wizard.form.targetAudience']()}</span>
      </label>
      <input
        type="text"
        id="targetAudience"
        class="input input-bordered w-full"
        bind:value={config.targetAudience}
        placeholder={m['wizard.form.targetAudiencePlaceholder']()}
      />
    </div>

    <div class="form-control w-full">
      <label class="label" for="goals">
        <span class="label-text font-semibold">{m['wizard.form.goals']()}</span>
      </label>
      <input type="text" id="goals" class="input input-bordered w-full" bind:value={config.goals} placeholder={m['wizard.form.goalsPlaceholder']()} />
    </div>

    <div class="form-control w-full">
      <label class="label" for="inspiration">
        <span class="label-text font-semibold">{m['wizard.form.inspiration']()}</span>
      </label>
      <input
        type="text"
        id="inspiration"
        class="input input-bordered w-full"
        bind:value={config.inspiration}
        placeholder={m['wizard.form.inspirationPlaceholder']()}
      />
    </div>

    <div class="form-control w-full">
      <label class="label" for="desiredDomain">
        <span class="label-text font-semibold">{m['wizard.form.desiredDomain']()}</span>
      </label>
      <input
        type="text"
        id="desiredDomain"
        class="input input-bordered w-full"
        bind:value={config.desiredDomain}
        placeholder={m['wizard.form.desiredDomainPlaceholder']()}
      />
    </div>

    <div class="form-control w-full">
      <label class="label" for="domainStatus">
        <span class="label-text font-semibold">{m['wizard.form.domainStatus']()}</span>
      </label>
      <select id="domainStatus" class="select select-bordered w-full" bind:value={config.domainStatus}>
        <option value="">{m['wizard.form.domainStatusPlaceholder']()}</option>
        <option value="owned">{m['wizard.form.domainStatusOptions.owned']()}</option>
        <option value="needs-registration">{m['wizard.form.domainStatusOptions.needs-registration']()}</option>
        <option value="needs-transfer">{m['wizard.form.domainStatusOptions.needs-transfer']()}</option>
        <option value="undecided">{m['wizard.form.domainStatusOptions.undecided']()}</option>
      </select>
    </div>

    <div class="form-control w-full">
      <label class="label" for="timeline">
        <span class="label-text font-semibold">{m['wizard.form.timeline']()}</span>
      </label>
      <select id="timeline" class="select select-bordered w-full" bind:value={config.timeline}>
        <option value="">{m['wizard.form.timelinePlaceholder']()}</option>
        <option value="asap">{m['wizard.form.timelineOptions.asap']()}</option>
        <option value="5-10-days">{m['wizard.form.timelineOptions.5-10-days']()}</option>
        <option value="2-4-weeks">{m['wizard.form.timelineOptions.2-4-weeks']()}</option>
        <option value="2-6-months">{m['wizard.form.timelineOptions.2-6-months']()}</option>
        <option value="flexible">{m['wizard.form.timelineOptions.flexible']()}</option>
      </select>
    </div>

    <div class="form-control w-full">
      <label class="label" for="budget">
        <span class="label-text font-semibold">{m['wizard.form.budget']()}</span>
      </label>
      <select id="budget" class="select select-bordered w-full" bind:value={config.budget}>
        <option value="">{m['wizard.form.budgetPlaceholder']()}</option>
        <option value="under-500">{m['wizard.form.budgetOptions.under-500']()}</option>
        <option value="1k-3k">{m['wizard.form.budgetOptions.1k-3k']()}</option>
        <option value="3k-7k">{m['wizard.form.budgetOptions.3k-7k']()}</option>
        <option value="7k-10k">{m['wizard.form.budgetOptions.7k-10k']()}</option>
        <option value="10k-15k">{m['wizard.form.budgetOptions.10k-15k']()}</option>
        <option value="over-20k">{m['wizard.form.budgetOptions.over-20k']()}</option>
      </select>
    </div>
  </div>
</div>

<style lang="postcss">
  @reference '../../../../app.css';
  .step-header {
    @apply border-t-base-content/40 mt-0 mb-14 border-t pt-0 text-center md:border-t-0; 

    h1 {
      @apply text-base-content mb-4;
    }

    p.teaser {
      @apply text-base-content/70 text-center max-w-4xl m-auto;
    }
  }
  .content-section {
    @apply mb-12 md:mx-10 lg:mx-20;
    .form-control {
      @apply w-full;

      .label-text {
        @apply text-base-content;
      }

      .label-text-alt {
        @apply text-base-content/60;
      }
    }

    .textarea,
    .input,
    .select {
      @apply bg-white border-base-300 text-base-content w-full;

      &:focus {
        @apply border-primary bg-primary/1;
      }

      &::placeholder {
        @apply text-base-content/50;
      }
    }
  }
</style>
