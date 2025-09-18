<script lang="ts">
  import { _ } from 'svelte-i18n';
  let { config } = $props();
</script>

<div class="step-header">
  <h1>{$_('wizard.steps.step3.titleFirst')} <span class="inner-text-special">{$_('wizard.steps.step3.titleHighlight')}</span></h1>
  <p class="teaser">{$_('wizard.steps.step3.teaser')}</p>
</div>

<div class="content-section">
  <div class="form-control mb-8 w-full">
    <label class="label" for="projectName">
      <span class="label-text text-lg font-semibold">{$_('wizard.form.projectName')}</span>
    </label>
    <input
      type="text"
      id="projectName"
      class="input input-bordered input-lg w-full"
      bind:value={config.name}
      placeholder={$_('wizard.form.projectNamePlaceholder')}
    />
  </div>

  <div class="form-control mb-8 w-full">
    <label class="label" for="description">
      <span class="label-text text-lg font-semibold">{$_('wizard.form.projectDescription')}</span>
    </label>
    <textarea
      id="description"
      class="textarea textarea-bordered textarea-lg w-full"
      bind:value={config.description}
      placeholder={config.projectType === 'webApplication' || config.projectType === 'artificialIntelligence'
        ? $_('wizard.form.placeholders.webApplication')
        : config.projectType === 'freestyle'
          ? $_('wizard.form.placeholders.freestyle')
          : $_('wizard.form.placeholders.default')}
      rows="8"
    ></textarea>
    <div class="label">
      <span class="label-text-alt">{$_('wizard.form.characters', { values: { count: config.description.length } })}</span>
    </div>
  </div>

  <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
    <div class="form-control w-full">
      <label class="label" for="targetAudience">
        <span class="label-text font-semibold">{$_('wizard.form.targetAudience')}</span>
      </label>
      <input
        type="text"
        id="targetAudience"
        class="input input-bordered w-full"
        bind:value={config.targetAudience}
        placeholder={$_('wizard.form.targetAudiencePlaceholder')}
      />
    </div>

    <div class="form-control w-full">
      <label class="label" for="goals">
        <span class="label-text font-semibold">{$_('wizard.form.goals')}</span>
      </label>
      <input type="text" id="goals" class="input input-bordered w-full" bind:value={config.goals} placeholder={$_('wizard.form.goalsPlaceholder')} />
    </div>

    <div class="form-control w-full">
      <label class="label" for="inspiration">
        <span class="label-text font-semibold">{$_('wizard.form.inspiration')}</span>
      </label>
      <input
        type="text"
        id="inspiration"
        class="input input-bordered w-full"
        bind:value={config.inspiration}
        placeholder={$_('wizard.form.inspirationPlaceholder')}
      />
    </div>

    <div class="form-control w-full">
      <label class="label" for="desiredDomain">
        <span class="label-text font-semibold">{$_('wizard.form.desiredDomain')}</span>
      </label>
      <input
        type="text"
        id="desiredDomain"
        class="input input-bordered w-full"
        bind:value={config.desiredDomain}
        placeholder={$_('wizard.form.desiredDomainPlaceholder')}
      />
    </div>

    <div class="form-control w-full">
      <label class="label" for="domainStatus">
        <span class="label-text font-semibold">{$_('wizard.form.domainStatus')}</span>
      </label>
      <select id="domainStatus" class="select select-bordered w-full" bind:value={config.domainStatus}>
        <option value="">{$_('wizard.form.domainStatusPlaceholder')}</option>
        <option value="owned">{$_('wizard.form.domainStatusOptions.owned')}</option>
        <option value="needs-registration">{$_('wizard.form.domainStatusOptions.needs-registration')}</option>
        <option value="needs-transfer">{$_('wizard.form.domainStatusOptions.needs-transfer')}</option>
        <option value="undecided">{$_('wizard.form.domainStatusOptions.undecided')}</option>
      </select>
    </div>

    <div class="form-control w-full">
      <label class="label" for="timeline">
        <span class="label-text font-semibold">{$_('wizard.form.timeline')}</span>
      </label>
      <select id="timeline" class="select select-bordered w-full" bind:value={config.timeline}>
        <option value="">{$_('wizard.form.timelinePlaceholder')}</option>
        <option value="asap">{$_('wizard.form.timelineOptions.asap')}</option>
        <option value="5-10-days">{$_('wizard.form.timelineOptions.5-10-days')}</option>
        <option value="2-4-weeks">{$_('wizard.form.timelineOptions.2-4-weeks')}</option>
        <option value="2-6-months">{$_('wizard.form.timelineOptions.2-6-months')}</option>
        <option value="flexible">{$_('wizard.form.timelineOptions.flexible')}</option>
      </select>
    </div>

    <div class="form-control w-full">
      <label class="label" for="budget">
        <span class="label-text font-semibold">{$_('wizard.form.budget')}</span>
      </label>
      <select id="budget" class="select select-bordered w-full" bind:value={config.budget}>
        <option value="">{$_('wizard.form.budgetPlaceholder')}</option>
        <option value="under-500">{$_('wizard.form.budgetOptions.under-500')}</option>
        <option value="1k-3k">{$_('wizard.form.budgetOptions.1k-3k')}</option>
        <option value="3k-7k">{$_('wizard.form.budgetOptions.3k-7k')}</option>
        <option value="7k-10k">{$_('wizard.form.budgetOptions.7k-10k')}</option>
        <option value="10k-15k">{$_('wizard.form.budgetOptions.10k-15k')}</option>
        <option value="over-20k">{$_('wizard.form.budgetOptions.over-20k')}</option>
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

    h2 {
      @apply text-base-content mt-2 mb-4 p-0;
    }

    p {
      @apply text-base-content/80 mb-6;
    }
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
