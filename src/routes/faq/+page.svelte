<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  import Stage from '$lib/components/ui/stage.svelte';

  let myFaqSelection = 'q1';
</script>

<svelte:head>
  <title>{m['faq.meta.title']()}</title>
  <meta name="description" content={m['faq.meta.description']()} />
</svelte:head>

<Stage style={'basic-gradient'}>
  <div class="inner-box reduced py-36 prose">
    <h1 class="massive animate-fade-in-up">{m['faq.title']()}</h1>
    <p class="teaser animate-fade-in-up">{m['faq.teaser']()}</p>
  </div>
</Stage>

<div class="inner-box reduced py-16">
  <div class="my-accordion-wrapper">
    <div class="my-accordion join join-vertical">
      <div class="collapse-arrow join-item border-base-300 accordion-item collapse border" class:active={myFaqSelection == 'q1'}>
        <input type="radio" value="q1" name="faq" bind:group={myFaqSelection} />
        <div class="collapse-title">{m['faq.questions.q1.title']()}</div>
        <div class="collapse-content">{m['faq.questions.q1.content']()}</div>
      </div>
      <div class="collapse-arrow join-item border-base-300 accordion-item collapse border" class:active={myFaqSelection == 'q2'}>
        <input type="radio" value="q2" name="faq" bind:group={myFaqSelection} />
        <div class="collapse-title">{m['faq.questions.q2.title']()}</div>
        <div class="collapse-content">{m['faq.questions.q2.content']()}</div>
      </div>
      <div class="collapse-arrow join-item border-base-300 accordion-item collapse border" class:active={myFaqSelection == 'q3'}>
        <input type="radio" value="q3" name="faq" bind:group={myFaqSelection} />
        <div class="collapse-title">{m['faq.questions.q3.title']()}</div>
        <div class="collapse-content">{m['faq.questions.q3.content']()}</div>
      </div>
      <div class="collapse-arrow join-item border-base-300 accordion-item collapse border" class:active={myFaqSelection == 'q4'}>
        <input type="radio" value="q4" name="faq" bind:group={myFaqSelection} />
        <div class="collapse-title">{m['faq.questions.q4.title']()}</div>
        <div class="collapse-content">{m['faq.questions.q4.content']()}</div>
      </div>
      <div class="collapse-arrow join-item border-base-300 accordion-item collapse border" class:active={myFaqSelection == 'q5'}>
        <input type="radio" value="q5" name="faq" bind:group={myFaqSelection} />
        <div class="collapse-title">{m['faq.questions.q5.title']()}</div>
        <div class="collapse-content">{m['faq.questions.q5.content']()}</div>
      </div>
      <div class="collapse-arrow join-item border-base-300 accordion-item collapse border" class:active={myFaqSelection == 'q6'}>
        <input type="radio" value="q6" name="faq" bind:group={myFaqSelection} />
        <div class="collapse-title">{m['faq.questions.q6.title']()}</div>
        <div class="collapse-content">{m['faq.questions.q6.content']()}</div>
      </div>
      <div class="collapse-arrow join-item border-base-300 accordion-item collapse border" class:active={myFaqSelection == 'q7'}>
        <input type="radio" value="q7" name="faq" bind:group={myFaqSelection} />
        <div class="collapse-title">{m['faq.questions.q7.title']()}</div>
        <div class="collapse-content">{m['faq.questions.q7.content']()}</div>
      </div>
      <div class="collapse-arrow join-item border-base-300 accordion-item collapse border" class:active={myFaqSelection == 'q8'}>
        <input type="radio" value="q8" name="faq" bind:group={myFaqSelection} />
        <div class="collapse-title">{m['faq.questions.q8.title']()}</div>
        <div class="collapse-content">{m['faq.questions.q8.content']()}</div>
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
