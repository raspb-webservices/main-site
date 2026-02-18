<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  import Stage from '$lib/components/ui/stage.svelte';

  let question = $state('');
  let email = $state('');
  let submitting = $state(false);
  let submitted = $state(false);
  let errorOccurred = $state(false);
  let fadingOut = $state(false);

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    if (!question.trim()) return;
    submitting = true;
    errorOccurred = false;

    try {
      const res = await fetch('/api/user-question/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: question.trim(),
          email: email.trim() || undefined
        })
      });

      if (res.ok) {
        submitted = true;
        question = '';
        email = '';
      } else {
        errorOccurred = true;
      }
    } catch {
      errorOccurred = true;
    } finally {
      submitting = false;
    }
  }

  function resetForm() {
    fadingOut = true;
    setTimeout(() => {
      submitted = false;
      fadingOut = false;
    }, 400);
  }
</script>

<svelte:head>
  <title>{m.faq_meta_title()}</title>
  <meta name="description" content={m.faq_meta_description()} />
  <meta property="og:title" content={m.faq_meta_title()} />
  <meta property="og:description" content={m.faq_meta_description()} />
</svelte:head>

<Stage style={'basic-gradient'}>
  <div class="inner-box reduced prose py-36">
    <h1 class="massive animate-fade-in-up">{m.faq_title()}</h1>
    <p class="teaser animate-fade-in-up">{m.faq_teaser()}</p>
  </div>
</Stage>

<div class="inner-box reduced flex flex-col gap-4 py-16">
  <div class="collapse-plus bg-base-100 border-base-300 collapse border">
    <input type="radio" name="faq-accordion" />
    <div class="collapse-title font-semibold">{m.faq_questions_q1_title()}</div>
    <div class="collapse-content text-base">
      <div class="tiny-spacer"></div>
      {@html m.faq_questions_q1_content()}
      <div class="spacer"></div>
    </div>
  </div>
  <div class="collapse-plus bg-base-100 border-base-300 collapse border">
    <input type="radio" name="faq-accordion" />
    <div class="collapse-title font-semibold">{m.faq_questions_q2_title()}</div>
    <div class="collapse-content text-base">
      <div class="tiny-spacer"></div>
      {@html m.faq_questions_q2_content()}
      <div class="spacer"></div>
    </div>
  </div>
  <div class="collapse-plus bg-base-100 border-base-300 collapse border">
    <input type="radio" name="faq-accordion" />
    <div class="collapse-title font-semibold">{m.faq_questions_q3_title()}</div>
    <div class="collapse-content text-base">
      <div class="tiny-spacer"></div>
      {@html m.faq_questions_q3_content()}
      <div class="spacer"></div>
    </div>
  </div>
  <div class="collapse-plus bg-base-100 border-base-300 collapse border">
    <input type="radio" name="faq-accordion" />
    <div class="collapse-title font-semibold">{m.faq_questions_q4_title()}</div>
    <div class="collapse-content text-base">
      <div class="tiny-spacer"></div>
      {@html m.faq_questions_q4_content()}
      <div class="spacer"></div>
    </div>
  </div>
  <div class="collapse-plus bg-base-100 border-base-300 collapse border">
    <input type="radio" name="faq-accordion" />
    <div class="collapse-title font-semibold">{m.faq_questions_q5_title()}</div>
    <div class="collapse-content text-base">
      <div class="tiny-spacer"></div>
      {@html m.faq_questions_q5_content()}
      <div class="spacer"></div>
    </div>
  </div>
  <div class="collapse-plus bg-base-100 border-base-300 collapse border">
    <input type="radio" name="faq-accordion" />
    <div class="collapse-title font-semibold">{m.faq_questions_q6_title()}</div>
    <div class="collapse-content text-base">
      <div class="tiny-spacer"></div>
      {@html m.faq_questions_q6_content()}
      <div class="spacer"></div>
    </div>
  </div>
  <div class="collapse-plus bg-base-100 border-base-300 collapse border">
    <input type="radio" name="faq-accordion" />
    <div class="collapse-title font-semibold">{m.faq_questions_q7_title()}</div>
    <div class="collapse-content text-base">
      <div class="tiny-spacer"></div>
      {@html m.faq_questions_q7_content()}
      <div class="spacer"></div>
    </div>
  </div>
  <div class="collapse-plus bg-base-100 border-base-300 collapse border">
    <input type="radio" name="faq-accordion" />
    <div class="collapse-title font-semibold">{m.faq_questions_q8_title()}</div>
    <div class="collapse-content text-base">
      <div class="tiny-spacer"></div>
      {@html m.faq_questions_q8_content()}
      <div class="spacer"></div>
    </div>
  </div>
  <div class="collapse-plus bg-base-100 border-base-300 collapse border">
    <input type="radio" name="faq-accordion" />
    <div class="collapse-title font-semibold">{m.faq_questions_q9_title()}</div>
    <div class="collapse-content text-base">
      <div class="tiny-spacer"></div>
      {@html m.faq_questions_q9_content()}
      <div class="spacer"></div>
    </div>
  </div>
  <div class="collapse-plus bg-base-100 border-base-300 collapse border">
    <input type="radio" name="faq-accordion" />
    <div class="collapse-title font-semibold">{m.faq_questions_q10_title()}</div>
    <div class="collapse-content text-base">
      <div class="tiny-spacer"></div>
      {@html m.faq_questions_q10_content()}
      <div class="spacer"></div>
    </div>
  </div>
  <div class="collapse-plus bg-base-100 border-base-300 collapse border">
    <input type="radio" name="faq-accordion" />
    <div class="collapse-title font-semibold">{m.faq_questions_q11_title()}</div>
    <div class="collapse-content text-base">
      <div class="tiny-spacer"></div>
      {@html m.faq_questions_q11_content()}
      <div class="spacer"></div>
    </div>
  </div>
  <div class="collapse-plus bg-base-100 border-base-300 collapse border">
    <input type="radio" name="faq-accordion" />
    <div class="collapse-title font-semibold">{m.faq_questions_q12_title()}</div>
    <div class="collapse-content text-base">
      <div class="tiny-spacer"></div>
      {@html m.faq_questions_q12_content()}
      <div class="spacer"></div>
    </div>
  </div>
  <div class="collapse-plus bg-base-100 border-base-300 collapse border">
    <input type="radio" name="faq-accordion" />
    <div class="collapse-title font-semibold">{m.faq_questions_q13_title()}</div>
    <div class="collapse-content text-base">
      <div class="tiny-spacer"></div>
      {@html m.faq_questions_q13_content()}
      <div class="spacer"></div>
    </div>
  </div>
  <div class="collapse-plus bg-base-100 border-base-300 collapse border">
    <input type="radio" name="faq-accordion" />
    <div class="collapse-title font-semibold">{m.faq_questions_q14_title()}</div>
    <div class="collapse-content text-base">
      <div class="tiny-spacer"></div>
      {@html m.faq_questions_q14_content()}
      <div class="spacer"></div>
    </div>
  </div>
  <div class="collapse-plus bg-base-100 border-base-300 collapse border">
    <input type="radio" name="faq-accordion" />
    <div class="collapse-title font-semibold">{m.faq_questions_q15_title()}</div>
    <div class="collapse-content text-base">
      <div class="tiny-spacer"></div>
      {@html m.faq_questions_q15_content()}
      <div class="spacer"></div>
    </div>
  </div>
</div>

<div class="inner-box reduced py-16">
  <h2 class="text-2xl font-bold">{m.faq_question_form_heading()}</h2>
  <p class="mt-2 text-lg font-light">{m.faq_question_form_description()}</p>

  {#if submitted}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="success-container mt-8 cursor-pointer py-12 text-center" class:fade-out={fadingOut} onclick={resetForm}>
      <div class="mb-6">
        <svg class="text-success mx-auto h-24 w-24 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
      <h3 class="mb-4 text-xl font-bold">{m.faq_question_form_success()}</h3>
    </div>
  {:else}
    <form onsubmit={handleSubmit} class="mt-6 flex flex-col gap-4">
      <fieldset class="fieldset">
        <legend class="fieldset-legend">{m.faq_question_form_question_label()}</legend>
        <textarea
          bind:value={question}
          class="textarea textarea-bordered w-full"
          placeholder={m.faq_question_form_question_placeholder()}
          rows="4"
          required
          disabled={submitting}
        ></textarea>
      </fieldset>

      <fieldset class="fieldset">
        <legend class="fieldset-legend">{m.faq_question_form_email_label()}</legend>
        <input
          type="email"
          bind:value={email}
          class="input input-bordered w-full"
          placeholder={m.faq_question_form_email_placeholder()}
          disabled={submitting}
        />
      </fieldset>

      {#if errorOccurred}
        <div class="alert alert-error">
          <span>{m.faq_question_form_error()}</span>
        </div>
      {/if}

      <div>
        <button type="submit" class="btn-basic" disabled={submitting || !question.trim()}>
          {submitting ? m.faq_question_form_submitting() : m.faq_question_form_submit()}
        </button>
      </div>
    </form>
  {/if}
</div>

<div class="big-spacer"></div>

<style lang="postcss">
  @reference '../../app.css';
  .collapse-title {
    @apply text-xl;
  }
  .collapse-content {
    @apply pr-8 pl-6 text-lg leading-normal font-light;
  }
  .collapse input[type='radio']:checked ~ .collapse-title,
  .collapse input[type='radio']:checked ~ .collapse-content {
    @apply bg-white;
  }
  .success-container {
    animation: fadeInUp 0.5s ease-out;
  }
  .fade-out {
    @apply opacity-0 transition-opacity duration-400;
  }
</style>
