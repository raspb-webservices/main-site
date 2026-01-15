<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  let { config } = $props();
</script>

<div class="step-header">
  <h1>{m['wizard_steps_step3_titleFirst']()} <span class="inner-text-special">{m['wizard_steps_step3_titleHighlight']()}</span></h1>
  <p class="teaser">{m['wizard_steps_step3_teaser']()}</p>
</div>

<div class="content-section">
  <div class="form-control mb-8 w-full">
    <label class="label" for="projectName">
      <span class="label-text text-lg font-semibold">{m['wizard_form_projectName']()}</span>
    </label>
    <input
      type="text"
      id="projectName"
      class="input input-bordered input-lg w-full"
      bind:value={config.name}
      placeholder={m['wizard_form_projectNamePlaceholder']()}
    />
  </div>

  <div class="form-control mb-8 w-full">
    <label class="label" for="description">
      <span class="label-text text-lg font-semibold">{m['wizard_form_projectDescription']()}</span>
    </label>
    <textarea
      id="description"
      class="textarea textarea-bordered textarea-lg w-full"
      bind:value={config.description}
      placeholder={config.projectType === 'webApplication' || config.projectType === 'artificialIntelligence'
        ? m['wizard_form_placeholders_webApplication']()
        : config.projectType === 'freestyle'
          ? m['wizard_form_placeholders_freestyle']()
          : m['wizard_form_placeholders_default']()}
      rows="8"
    ></textarea>
    <div class="label">
      <span class="label-text-alt">{m['wizard_form_characters']({ count: config.description.length })}</span>
    </div>
  </div>

  <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
    <div class="form-control w-full">
      <label class="label" for="targetAudience">
        <span class="label-text font-semibold">{m['wizard_form_targetAudience']()}</span>
      </label>
      <input
        type="text"
        id="targetAudience"
        class="input input-bordered w-full"
        bind:value={config.targetAudience}
        placeholder={m['wizard_form_targetAudiencePlaceholder']()}
      />
    </div>

    <div class="form-control w-full">
      <label class="label" for="goals">
        <span class="label-text font-semibold">{m['wizard_form_goals']()}</span>
      </label>
      <input type="text" id="goals" class="input input-bordered w-full" bind:value={config.goals} placeholder={m['wizard_form_goalsPlaceholder']()} />
    </div>

    <div class="form-control w-full">
      <label class="label" for="inspiration">
        <span class="label-text font-semibold">{m['wizard_form_inspiration']()}</span>
      </label>
      <input
        type="text"
        id="inspiration"
        class="input input-bordered w-full"
        bind:value={config.inspiration}
        placeholder={m['wizard_form_inspirationPlaceholder']()}
      />
    </div>

    <div class="form-control w-full">
      <label class="label" for="desiredDomain">
        <span class="label-text font-semibold">{m['wizard_form_desiredDomain']()}</span>
      </label>
      <input
        type="text"
        id="desiredDomain"
        class="input input-bordered w-full"
        bind:value={config.desiredDomain}
        placeholder={m['wizard_form_desiredDomainPlaceholder']()}
      />
    </div>

    <div class="form-control w-full">
      <label class="label" for="domainStatus">
        <span class="label-text font-semibold">{m['wizard_form_domainStatus']()}</span>
      </label>
      <select id="domainStatus" class="select select-bordered w-full" bind:value={config.domainStatus}>
        <option value="">{m['wizard_form_domainStatusPlaceholder']()}</option>
        <option value="owned">{m['wizard_form_domainStatusOptions_owned']()}</option>
        <option value="needs-registration">{m['wizard_form_domainStatusOptions_needs-registration']()}</option>
        <option value="needs-transfer">{m['wizard_form_domainStatusOptions_needs-transfer']()}</option>
        <option value="undecided">{m['wizard_form_domainStatusOptions_undecided']()}</option>
      </select>
    </div>

    <div class="form-control w-full">
      <label class="label" for="timeline">
        <span class="label-text font-semibold">{m['wizard_form_timeline']()}</span>
      </label>
      <select id="timeline" class="select select-bordered w-full" bind:value={config.timeline}>
        <option value="">{m['wizard_form_timelinePlaceholder']()}</option>
        <option value="asap">{m['wizard_form_timelineOptions_asap']()}</option>
        <option value="5-10-days">{m['wizard_form_timelineOptions_5-10-days']()}</option>
        <option value="2-4-weeks">{m['wizard_form_timelineOptions_2-4-weeks']()}</option>
        <option value="2-6-months">{m['wizard_form_timelineOptions_2-6-months']()}</option>
        <option value="flexible">{m['wizard_form_timelineOptions_flexible']()}</option>
      </select>
    </div>

    <div class="form-control w-full">
      <label class="label" for="budget">
        <span class="label-text font-semibold">{m['wizard_form_budget']()}</span>
      </label>
      <select id="budget" class="select select-bordered w-full" bind:value={config.budget}>
        <option value="">{m['wizard_form_budgetPlaceholder']()}</option>
        <option value="under-500">{m['wizard_form_budgetOptions_under-500']()}</option>
        <option value="1k-3k">{m['wizard_form_budgetOptions_1k-3k']()}</option>
        <option value="3k-7k">{m['wizard_form_budgetOptions_3k-7k']()}</option>
        <option value="7k-10k">{m['wizard_form_budgetOptions_7k-10k']()}</option>
        <option value="10k-15k">{m['wizard_form_budgetOptions_10k-15k']()}</option>
        <option value="over-20k">{m['wizard_form_budgetOptions_over-20k']()}</option>
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
      @apply text-base-content/70 m-auto max-w-4xl text-center;
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
      @apply border-base-300 text-base-content w-full bg-white;

      &:focus {
        @apply border-primary bg-primary/1;
      }

      &::placeholder {
        @apply text-base-content/50;
      }
    }
  }
</style>
