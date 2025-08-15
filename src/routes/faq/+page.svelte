<script lang="ts">
  import { page } from '$app/state';
  import { goto } from '$app/navigation';
  import Section from '$lib/components/section.svelte';
  import { _ } from 'svelte-i18n';

  let myFaqSelection = 'q1';
</script>

<svelte:head>
  <title>{$_('faq.meta.title')}</title>
  <meta name="description" content={$_('faq.meta.description')} />
</svelte:head>

<div class="content-area">
  <Section>
    <h1>{$_('faq.title')}</h1>
    <p class="teaser no-padding">
      {$_('faq.teaser')}
    </p>
  </Section>

  <Section>
    <div class="my-accordion-wrapper">
      <div class="my-accordion join join-vertical">
        <div class="collapse-arrow join-item border-base-300 accordion-item collapse border" class:active={myFaqSelection == 'q1'}>
          <input type="radio" value="q1" name="faq" bind:group={myFaqSelection} />
          <div class="collapse-title">{$_('faq.questions.q1.title')}</div>
          <div class="collapse-content">{$_('faq.questions.q1.content')}</div>
        </div>
        <div class="collapse-arrow join-item border-base-300 accordion-item collapse border" class:active={myFaqSelection == 'q2'}>
          <input type="radio" value="q2" name="faq" bind:group={myFaqSelection} />
          <div class="collapse-title">{$_('faq.questions.q2.title')}</div>
          <div class="collapse-content">{$_('faq.questions.q2.content')}</div>
        </div>
        <div class="collapse-arrow join-item border-base-300 accordion-item collapse border" class:active={myFaqSelection == 'q3'}>
          <input type="radio" value="q3" name="faq" bind:group={myFaqSelection} />
          <div class="collapse-title">{$_('faq.questions.q3.title')}</div>
          <div class="collapse-content">{$_('faq.questions.q3.content')}</div>
        </div>
        <div class="collapse-arrow join-item border-base-300 accordion-item collapse border" class:active={myFaqSelection == 'q4'}>
          <input type="radio" value="q4" name="faq" bind:group={myFaqSelection} />
          <div class="collapse-title">{$_('faq.questions.q4.title')}</div>
          <div class="collapse-content">{$_('faq.questions.q4.content')}</div>
        </div>
        <div class="collapse-arrow join-item border-base-300 accordion-item collapse border" class:active={myFaqSelection == 'q5'}>
          <input type="radio" value="q5" name="faq" bind:group={myFaqSelection} />
          <div class="collapse-title">{$_('faq.questions.q5.title')}</div>
          <div class="collapse-content">{$_('faq.questions.q5.content')}</div>
        </div>
        <div class="collapse-arrow join-item border-base-300 accordion-item collapse border" class:active={myFaqSelection == 'q6'}>
          <input type="radio" value="q6" name="faq" bind:group={myFaqSelection} />
          <div class="collapse-title">{$_('faq.questions.q6.title')}</div>
          <div class="collapse-content">{$_('faq.questions.q6.content')}</div>
        </div>
        <div class="collapse-arrow join-item border-base-300 accordion-item collapse border" class:active={myFaqSelection == 'q7'}>
          <input type="radio" value="q7" name="faq" bind:group={myFaqSelection} />
          <div class="collapse-title">{$_('faq.questions.q7.title')}</div>
          <div class="collapse-content">{$_('faq.questions.q7.content')}</div>
        </div>
        <div class="collapse-arrow join-item border-base-300 accordion-item collapse border" class:active={myFaqSelection == 'q8'}>
          <input type="radio" value="q8" name="faq" bind:group={myFaqSelection} />
          <div class="collapse-title">{$_('faq.questions.q8.title')}</div>
          <div class="collapse-content">{$_('faq.questions.q8.content')}</div>
        </div>
      </div>
    </div>
  </Section>
</div>

<style lang="postcss">
  @reference '../../app.css';

  .my-accordion-wrapper {
    @apply grid grid-cols-12 gap-8;
    .my-accordion {
      @apply bg-secondary/15 col-span-full lg:col-span-8;
      .accordion-item {
        > .collapse-title {
          @apply font-semibold;
        }
        &.active {
          > .collapse-title {
            @apply bg-lightGrey font-bold;
          }
          > .collapse-content {
            @apply bg-white p-4;
          }
        }
      }
    }
  }
</style>
