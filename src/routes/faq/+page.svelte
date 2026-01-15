<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  import Stage from '$lib/components/ui/stage.svelte';

  let myFaqSelection = 'q1';
</script>

<svelte:head>
  <title>{m['faq_meta_title']()}</title>
  <meta name="description" content={m['faq_meta_description']()} />
</svelte:head>

<Stage style={'basic-gradient'}>
  <div class="inner-box reduced prose py-36">
    <h1 class="massive animate-fade-in-up">{m['faq_title']()}</h1>
    <p class="teaser animate-fade-in-up">{m['faq_teaser']()}</p>
  </div>
</Stage>

<div class="inner-box reduced py-16">
  <div class="my-accordion-wrapper">
    <div class="my-accordion join join-vertical">
      <div class="collapse-arrow join-item border-base-300 accordion-item collapse border" class:active={myFaqSelection == 'q1'}>
        <input type="radio" value="q1" name="faq" bind:group={myFaqSelection} />
        <div class="collapse-title">{m['faq_questions_q1_title']()}</div>
        <div class="collapse-content">{m['faq_questions_q1_content']()}</div>
      </div>
      <div class="collapse-arrow join-item border-base-300 accordion-item collapse border" class:active={myFaqSelection == 'q2'}>
        <input type="radio" value="q2" name="faq" bind:group={myFaqSelection} />
        <div class="collapse-title">{m['faq_questions_q2_title']()}</div>
        <div class="collapse-content">{m['faq_questions_q2_content']()}</div>
      </div>
      <div class="collapse-arrow join-item border-base-300 accordion-item collapse border" class:active={myFaqSelection == 'q3'}>
        <input type="radio" value="q3" name="faq" bind:group={myFaqSelection} />
        <div class="collapse-title">{m['faq_questions_q3_title']()}</div>
        <div class="collapse-content">{m['faq_questions_q3_content']()}</div>
      </div>
      <div class="collapse-arrow join-item border-base-300 accordion-item collapse border" class:active={myFaqSelection == 'q4'}>
        <input type="radio" value="q4" name="faq" bind:group={myFaqSelection} />
        <div class="collapse-title">{m['faq_questions_q4_title']()}</div>
        <div class="collapse-content">{m['faq_questions_q4_content']()}</div>
      </div>
      <div class="collapse-arrow join-item border-base-300 accordion-item collapse border" class:active={myFaqSelection == 'q5'}>
        <input type="radio" value="q5" name="faq" bind:group={myFaqSelection} />
        <div class="collapse-title">{m['faq_questions_q5_title']()}</div>
        <div class="collapse-content">{m['faq_questions_q5_content']()}</div>
      </div>
      <div class="collapse-arrow join-item border-base-300 accordion-item collapse border" class:active={myFaqSelection == 'q6'}>
        <input type="radio" value="q6" name="faq" bind:group={myFaqSelection} />
        <div class="collapse-title">{m['faq_questions_q6_title']()}</div>
        <div class="collapse-content">{m['faq_questions_q6_content']()}</div>
      </div>
      <div class="collapse-arrow join-item border-base-300 accordion-item collapse border" class:active={myFaqSelection == 'q7'}>
        <input type="radio" value="q7" name="faq" bind:group={myFaqSelection} />
        <div class="collapse-title">{m['faq_questions_q7_title']()}</div>
        <div class="collapse-content">{m['faq_questions_q7_content']()}</div>
      </div>
      <div class="collapse-arrow join-item border-base-300 accordion-item collapse border" class:active={myFaqSelection == 'q8'}>
        <input type="radio" value="q8" name="faq" bind:group={myFaqSelection} />
        <div class="collapse-title">{m['faq_questions_q8_title']()}</div>
        <div class="collapse-content">{m['faq_questions_q8_content']()}</div>
      </div>
    </div>
  </div>
</div>
<div class="big-spacer"></div>

<style lang="postcss">
  @reference '../../app.css';

  .my-accordion-wrapper {
    .my-accordion {
      .accordion-item {
        @apply border-base-300;
        > .collapse-title {
          @apply bg-base-200 text-base-content font-semibold transition-colors duration-300;
        }
        > .collapse-content {
          @apply text-base-content;
        }
        &.active {
          > .collapse-title {
            @apply bg-base-300 text-base-content font-bold;
          }
          > .collapse-content {
            @apply bg-base-200 text-base-content p-4;
          }
        }
      }
    }
  }
</style>
