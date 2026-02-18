<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  import { untrack } from 'svelte';

  let { config } = $props();

  // PWA-specific variables (initialized from config for persistence)
  // untrack() tells Svelte we intentionally only capture the initial value
  let pwaApproach: string = $state(untrack(() => config.pwaApproach ?? 'new'));
  let pwaExistingUrl: string = $state(untrack(() => config.pwaExistingUrl ?? ''));

  // CMS-specific variables (initialized from config for persistence)
  let cmsComplexity: number = $state(untrack(() => config.cmsComplexity ?? 50));
  let cmsContentStructure: string = $state(untrack(() => config.cmsContentStructure ?? ''));

  // Determines which blocks are shown
  const isFreestyleOrAi = $derived(config.projectCategory === 'ki-and-freestyle');

  // General project variables (all initialized from config for persistence on back/forward)
  let serviceLevel: number = $state(untrack(() => config.serviceLevel ?? 50));
  let engineeringApproach: number = $state(untrack(() => config.engineeringApproach ?? 50));
  let specialRequirements: string = $state(untrack(() => config.specialRequirements ?? ''));
  let estimatedExpertDays: number = $state(untrack(() => config.estimatedExpertDays ?? 0));
  let goalsValue: string = $state(untrack(() => config.goals ?? ''));
  let targetAudience: string = $state(untrack(() => config.targetAudience ?? ''));
  let timelinePreference: string = $state(untrack(() => config.timelinePreference ?? ''));
  let specificDeadline: string = $state(untrack(() => config.specificDeadline ?? ''));
  let budgetRange: string = $state(untrack(() => config.budgetRange ?? ''));

  // Reactive updates to config
  $effect(() => {
    if (config.subType === 'pwaSimple' || config.subType === 'pwaExtended') {
      config.pwaApproach = pwaApproach;
      config.pwaExistingUrl = pwaExistingUrl;
    }

    if (config.subType === 'cms' || config.subType === 'cmsPlus') {
      config.cmsComplexity = cmsComplexity;
      config.cmsContentStructure = cmsContentStructure;
    }

    if (isFreestyleOrAi) {
      // KI & Freestyle: only store expert days, skip standard project sliders
      config.estimatedExpertDays = estimatedExpertDays || undefined;
      config.serviceLevel = undefined;
      config.engineeringApproach = undefined;
      config.specialRequirements = undefined;
    } else {
      config.serviceLevel = serviceLevel;
      config.engineeringApproach = engineeringApproach;
      config.specialRequirements = specialRequirements;
    }

    config.goals = goalsValue;
    config.targetAudience = targetAudience;
    config.timelinePreference = timelinePreference;
    config.specificDeadline = specificDeadline;
    config.budgetRange = budgetRange;
  });

  const timelineOptions = [
    { value: 'urgent', label: m.wizard_basic_timeline_option_urgent() },
    { value: 'fast', label: m.wizard_basic_timeline_option_fast() },
    { value: 'moderate', label: m.wizard_basic_timeline_option_moderate() },
    { value: 'flexible', label: m.wizard_basic_timeline_option_flexible() },
    { value: 'delayed', label: m.wizard_basic_timeline_option_delayed() },
    { value: 'deadline', label: m.wizard_basic_timeline_option_deadline() },
    { value: 'whenever', label: m.wizard_basic_timeline_option_whenever() }
  ];

  const budgetOptions = [
    { value: 'small', label: m.wizard_basic_budget_option_small() },
    { value: 'medium', label: m.wizard_basic_budget_option_medium() },
    { value: 'large', label: m.wizard_basic_budget_option_large() },
    { value: 'xlarge', label: m.wizard_basic_budget_option_xlarge() },
    { value: 'enterprise', label: m.wizard_basic_budget_option_enterprise() },
    { value: 'flexible', label: m.wizard_basic_budget_option_flexible() }
  ];
</script>

<div class="step-header">
  <h1>
    {m.wizard_stepBasicDetails_titleFirst()} <span class="inner-text-special">{m.wizard_stepBasicDetails_titleHighlight()}</span>
    {m.wizard_stepBasicDetails_titleSecond()}
  </h1>
  <p class="teaser">{m.wizard_stepBasicDetails_teaser()}</p>
</div>

<div class="basic-details-section">
  <!-- Project Description -->
  <div class="form-control mb-8 w-full">
    <label class="label" for="description">
      <span class="label-text text-lg font-semibold">{m.wizard_form_projectDescription()}</span>
    </label>

    <p class="description-subtitle">{m.wizard_form_projectDescription_subTitle()}</p>

    <textarea
      id="description"
      class="textarea textarea-bordered textarea-lg w-full"
      bind:value={config.description}
      placeholder={isFreestyleOrAi
        ? m.wizard_form_placeholders_freestyle()
        : config.projectType === 'app'
          ? m.wizard_form_placeholders_webApplication()
          : m.wizard_form_placeholders_default()}
      rows="8"
    ></textarea>
    <div class="label">
      <span class="label-text-alt">{m.wizard_form_characters({ count: config.description.length })}</span>
    </div>
  </div>

  <div class="details-grid">
    <!-- PWA-specific Section -->
    {#if config.subType === 'pwaSimple' || config.subType === 'pwaExtended'}
      <div class="card detail-card">
        <div class="card-body prose">
          <div class="detail-card-header">
            <h3 class="card-title no-padding">{m.wizard_basic_pwa_title()}</h3>
            <div class="detail-icon">📱</div>
          </div>
          <p>
            {m.wizard_basic_pwa_description1()}
          </p>
          <p>
            {m.wizard_basic_pwa_description2()}
          </p>
          <div class="form-section">
            <div class="section-label">
              <span class="label-icon">🔧</span>
              {m.wizard_basic_pwa_approach_label()}
            </div>
            <div class="radio-group">
              <label class="radio-option">
                <input type="radio" name="pwaApproach" value="new" bind:group={pwaApproach} class="radio radio-primary" />
                <div class="flex w-full flex-col gap-1">
                  <div class="flex items-center justify-between gap-2">
                    <span class="radio-title">{m.wizard_basic_pwa_new_title()}</span>
                    <span class="bg-primary/10 text-primary rounded-full px-2 py-0.5 text-xs font-bold whitespace-nowrap">ab 3.000 €</span>
                  </div>
                  <span class="radio-description">{m.wizard_basic_pwa_new_description()}</span>
                </div>
              </label>

              <label class="radio-option">
                <input type="radio" name="pwaApproach" value="extend" bind:group={pwaApproach} class="radio radio-primary" />
                <div class="flex w-full flex-col gap-1">
                  <div class="flex items-center justify-between gap-2">
                    <span class="radio-title">{m.wizard_basic_pwa_extend_title()}</span>
                    <span class="bg-primary/10 text-primary rounded-full px-2 py-0.5 text-xs font-bold whitespace-nowrap">ab 1.999 €</span>
                  </div>
                  <span class="radio-description">{m.wizard_basic_pwa_extend_description()}</span>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
    {/if}

    <!-- CMS-specific Section -->
    {#if config.subType === 'cms' || config.subType === 'cmsPlus'}
      <div class="card detail-card cms-card">
        <div class="card-body">
          <div class="detail-card-header">
            <div class="card-icon">📝</div>
            <h3 class="card-title">{m.wizard_basic_cms_title()}</h3>
          </div>

          <p class="card-description">
            {m.wizard_basic_cms_description()}
          </p>

          <div class="form-section">
            <div class="section-label">
              <span class="label-icon">📊</span>
              {m.wizard_basic_cms_complexity_label()}
            </div>
            <div class="slider-container">
              <div class="slider-labels">
                <span class="slider-label-left">{m.wizard_basic_cms_slider_simple()}</span>
                <span class="slider-label-right">{m.wizard_basic_cms_slider_complex()}</span>
              </div>
              <input type="range" min="0" max="100" bind:value={cmsComplexity} class="custom-slider complexity-slider" />
              <div class="slider-value">
                {m.wizard_basic_cms_complexity_prefix()}
                {cmsComplexity < 25
                  ? m.wizard_basic_cms_complexity_level1()
                  : cmsComplexity < 50
                    ? m.wizard_basic_cms_complexity_level2()
                    : cmsComplexity < 75
                      ? m.wizard_basic_cms_complexity_level3()
                      : m.wizard_basic_cms_complexity_level4()}
              </div>
            </div>
          </div>

          <div class="form-section">
            <label for="cmsContentStructure" class="section-label">
              <span class="label-icon">🗂️</span>
              {m.wizard_basic_cms_structure_label()}
            </label>
            <textarea
              id="cmsContentStructure"
              bind:value={cmsContentStructure}
              placeholder={m.wizard_basic_cms_structure_placeholder()}
              class="form-textarea"
              rows="4"
            ></textarea>
          </div>
        </div>
      </div>
    {/if}

    <!-- Expert Days (only for KI & Freestyle) -->
    {#if isFreestyleOrAi}
      <div class="card detail-card">
        <div class="card-body">
          <div class="detail-card-header">
            <div class="card-icon">📅</div>
            <h3 class="card-title">{m.wizard_basic_expertdays_title()}</h3>
          </div>

          <p class="card-description">
            {m.wizard_basic_expertdays_description()}
          </p>

          <div class="form-section">
            <label for="expertDays" class="section-label">
              <span class="label-icon">🗓️</span>
              {m.wizard_basic_expertdays_label()}
            </label>
            <input
              id="expertDays"
              type="number"
              min="0"
              max="365"
              bind:value={estimatedExpertDays}
              placeholder={m.wizard_basic_expertdays_placeholder()}
              class="form-input"
            />
          </div>
        </div>
      </div>
    {/if}

    <!-- Service Level (only for Websites & Apps) -->
    {#if !isFreestyleOrAi}
    <div class="card detail-card">
      <div class="card-body">
        <div class="detail-card-header">
          <div class="card-icon">🤝</div>
          <h3 class="card-title">{m.wizard_basic_service_title()}</h3>
        </div>

        <p class="card-description">
          {m.wizard_basic_service_description()}
        </p>

        <div class="form-section">
          <div class="slider-container">
            <div class="slider-labels">
              <span class="slider-label-left">{m.wizard_basic_service_slider_left()}<br /><small>{m.wizard_basic_service_slider_left_sub()}</small></span>
              <span class="slider-label-right">{m.wizard_basic_service_slider_right()}<br /><small>{m.wizard_basic_service_slider_right_sub()}</small></span>
            </div>
            <input type="range" min="0" max="100" bind:value={serviceLevel} class="custom-slider" />
            <div class="slider-value">
              {serviceLevel < 20
                ? m.wizard_basic_service_level1()
                : serviceLevel < 40
                  ? m.wizard_basic_service_level2()
                  : serviceLevel < 60
                    ? m.wizard_basic_service_level3()
                    : serviceLevel < 80
                      ? m.wizard_basic_service_level4()
                      : m.wizard_basic_service_level5()}
            </div>
          </div>
          <p class="hint-text">{m.wizard_basic_service_hint()}</p>
        </div>
      </div>
    </div>

    <!-- Engineering Approach -->
    <div class="card detail-card">
      <div class="card-body">
        <div class="detail-card-header">
          <div class="card-icon">⚙️</div>
          <h3 class="card-title">{m.wizard_basic_engineering_title()}</h3>
        </div>

        <p class="card-description">
          {m.wizard_basic_engineering_description()}
        </p>

        <div class="form-section">
          <div class="slider-container">
            <div class="slider-labels">
              <span class="slider-label-left"
                >{m.wizard_basic_engineering_slider_left()}<br /><small>{m.wizard_basic_engineering_slider_left_sub()}</small></span
              >
              <span class="slider-label-right"
                >{m.wizard_basic_engineering_slider_right()}<br /><small>{m.wizard_basic_engineering_slider_right_sub()}</small></span
              >
            </div>
            <input type="range" min="0" max="100" bind:value={engineeringApproach} class="custom-slider engineering-slider" />
            <div class="slider-value">
              {engineeringApproach < 20
                ? m.wizard_basic_engineering_level1()
                : engineeringApproach < 40
                  ? m.wizard_basic_engineering_level2()
                  : engineeringApproach < 60
                    ? m.wizard_basic_engineering_level3()
                    : engineeringApproach < 80
                      ? m.wizard_basic_engineering_level4()
                      : m.wizard_basic_engineering_level5()}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Special Requirements -->
    <div class="card detail-card">
      <div class="card-body">
        <div class="detail-card-header">
          <div class="card-icon">✨</div>
          <h3 class="card-title">{m.wizard_basic_requirements_title()}</h3>
        </div>

        <p class="card-description">
          {m.wizard_basic_requirements_description()}
        </p>

        <div class="form-section">
          <textarea bind:value={specialRequirements} placeholder={m.wizard_basic_requirements_placeholder()} class="form-textarea" rows="5"></textarea>
        </div>
      </div>
    </div>
    {/if}

    <!-- Project Goal -->
    <div class="card detail-card">
      <div class="card-body">
        <div class="detail-card-header">
          <div class="card-icon">🎯</div>
          <h3 class="card-title">{m.wizard_basic_goal_title()}</h3>
        </div>

        <p class="card-description">{m.wizard_basic_goal_description()}</p>

        <div class="form-section">
          <textarea bind:value={goalsValue} placeholder={m.wizard_basic_goal_placeholder()} class="form-textarea" rows="5"></textarea>
        </div>
      </div>
    </div>

    <!-- Target Audience -->
    <div class="card detail-card">
      <div class="card-body">
        <div class="detail-card-header">
          <div class="card-icon">👥</div>
          <h3 class="card-title">{m.wizard_basic_audience_title()}</h3>
        </div>

        <p class="card-description">{m.wizard_basic_audience_description()}</p>

        <div class="form-section">
          <textarea bind:value={targetAudience} placeholder={m.wizard_basic_audience_placeholder()} class="form-textarea" rows="4"></textarea>
        </div>
      </div>
    </div>

    <!-- Timeline -->
    <div class="card detail-card">
      <div class="card-body">
        <div class="detail-card-header">
          <div class="card-icon">⏱️</div>
          <h3 class="card-title">{m.wizard_basic_timeline_title()}</h3>
        </div>

        <p class="card-description">{m.wizard_basic_timeline_description()}</p>

        <div class="form-section">
          <label for="timeline" class="section-label">{m.wizard_basic_timeline_label()}</label>
          <select id="timeline" bind:value={timelinePreference} class="form-select">
            <option value="">Bitte auswählen...</option>
            {#each timelineOptions as option}
              <option value={option.value}>{option.label}</option>
            {/each}
          </select>

          {#if timelinePreference === 'deadline'}
            <div class="form-section mt-4">
              <label for="specificDeadline" class="section-label">
                <span class="label-icon">📅</span>
                {m.wizard_basic_timeline_deadline_label()}
              </label>
              <input id="specificDeadline" type="date" bind:value={specificDeadline} class="form-input" />
            </div>
          {/if}
        </div>
      </div>
    </div>

    <!-- Budget -->
    <div class="card detail-card">
      <div class="card-body">
        <div class="detail-card-header">
          <div class="card-icon">💰</div>
          <h3 class="card-title">{m.wizard_basic_budget_title()}</h3>
        </div>

        <p class="card-description">
          {m.wizard_basic_budget_description()}
        </p>

        <div class="form-section">
          <label for="budget" class="section-label">{m.wizard_basic_budget_label()}</label>
          <select id="budget" bind:value={budgetRange} class="form-select">
            <option value="">{m.wizard_basic_budget_placeholder()}</option>
            {#each budgetOptions as option}
              <option value={option.value}>{option.label}</option>
            {/each}
          </select>
        </div>
      </div>
    </div>

    <!-- Freestyle Notice -->
    {#if config.subType === 'freestyle'}
      <div class="card detail-card">
        <div class="card-body">
          <div class="detail-card-header">
            <div class="card-icon">🚀</div>
            <h3 class="card-title">{m.wizard_basic_freestyle_title()}</h3>
          </div>

          <p class="card-description">
            {m.wizard_basic_freestyle_description()}
          </p>
          <div class="info-box">
            <strong>{m.wizard_basic_freestyle_info()}</strong>{m.wizard_basic_freestyle_info_suffix()}
          </div>
        </div>
      </div>
    {/if}
  </div>
</div>

<style lang="postcss">
  @reference '../../../../app.css';

  .step-header {
    @apply border-t-base-content/40 mt-0 mb-14 border-t pt-8 text-center md:border-t-0;

    h1 {
      @apply text-base-content mb-4;
    }

    p.teaser {
      @apply text-base-content/70 m-auto max-w-4xl text-center;
    }
  }

  .basic-details-section {
    @apply mb-12 md:mx-10 lg:mx-20;

    .description-subtitle {
      @apply text-base-content/70 mb-3 text-sm;
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

    .textarea {
      @apply border-base-300 text-base-content w-full bg-white;

      &:focus {
        @apply border-primary bg-primary/5;
      }

      &::placeholder {
        @apply text-base-content/50;
      }
    }
  }

  .details-grid {
    @apply mt-8 grid grid-cols-1 gap-6;
  }

  .detail-card {
    @apply border-base-300/80 border bg-white transition-all duration-300;

    &:hover {
      @apply bg-primary/1 border-base-300 shadow-md;
    }

    .detail-card-header {
      @apply mb-4 flex items-center justify-start;

      .card-icon {
        @apply pr-2 text-3xl;
      }
    }

    .card-body {
      @apply text-base-content;

      .card-title {
        @apply text-base-content;
      }

      p.card-description {
        @apply text-base-content/80 pb-4;
      }
    }
  }

  .form-section {
    @apply mb-4;

    &:last-child {
      @apply mb-0;
    }
  }

  .section-label {
    @apply text-base-content mb-2 flex items-center gap-2 text-base font-semibold;
    .label-icon {
      @apply text-lg;
    }
  }

  .form-input {
    @apply border-base-300 text-base-content focus:border-primary focus:bg-primary/5 w-full rounded-lg border bg-white px-4 py-3 transition-all;

    &::placeholder {
      @apply text-base-content/50;
    }
  }

  .form-textarea {
    @apply border-base-300 text-base-content focus:border-primary focus:bg-primary/5 w-full rounded-lg border bg-white px-4 py-3 transition-all;

    &::placeholder {
      @apply text-base-content/50;
    }
  }

  .form-select {
    @apply border-base-300 text-base-content focus:border-primary focus:bg-primary/5 w-full cursor-pointer rounded-lg border bg-white px-4 py-3 transition-all;
  }

  .slider-container {
    @apply w-full;

    .slider-labels {
      @apply mb-2 flex justify-between text-sm;

      .slider-label-left,
      .slider-label-right {
        @apply text-base-content/70 font-medium;

        small {
          @apply text-base-content/50 block text-xs;
        }
      }
    }

    .custom-slider {
      @apply h-2 w-full cursor-pointer appearance-none rounded-lg;
      background: linear-gradient(to right, #e0e0e0 0%, #4f46e5 50%, #e0e0e0 100%);

      &::-webkit-slider-thumb {
        @apply bg-primary h-6 w-6 cursor-pointer appearance-none rounded-full shadow-md;
        transition: all 0.2s ease;

        &:hover {
          @apply scale-110 shadow-lg;
        }
      }

      &::-moz-range-thumb {
        @apply bg-primary h-6 w-6 cursor-pointer rounded-full border-0 shadow-md;
        transition: all 0.2s ease;

        &:hover {
          @apply scale-110 shadow-lg;
        }
      }
    }

    .slider-value {
      @apply text-primary mt-3 text-center font-semibold;
    }
  }

  .hint-text {
    @apply text-base-content/60 mt-3 text-sm italic;
  }

  .info-box {
    @apply bg-base-200 border-base-300 text-base-content mt-4 rounded-lg border p-4;
  }

  .radio-group {
    @apply flex flex-row gap-3;

    .radio-option {
      @apply border-base-300 flex flex-1 cursor-pointer items-center gap-3 rounded-lg border bg-white p-4 transition-all duration-200;

      &:hover {
        @apply border-primary/50 bg-primary/5;
      }

      &:has(input:checked) {
        @apply border-primary bg-primary/5;
      }

      input[type='radio'] {
        @apply shrink-0;
      }

      .radio-content {
        @apply flex flex-col gap-1;

        .radio-title {
          @apply text-base-content text-base font-semibold;
        }

        .radio-description {
          @apply text-base-content/70 text-sm;
        }
      }
    }
  }

</style>
