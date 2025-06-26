<script lang="ts">
  import { page } from '$app/state';
  import { goto } from '$app/navigation';
  import Section from '$lib/components/section.svelte';

  let myFaqSelection = 'q1';
</script>

<svelte:head>
  <title>raspb Webservices - FAQ</title>
  <meta name="description" content="Hier kann eine Beschreibung stehen..." />
</svelte:head>

<div class="content-area">
  <Section>
    <h1>FAQ</h1>
    <p class="teaser no-padding">
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil, dolor soluta. Suscipit nemo ipsam nostrum sunt debitis. Voluptatum quam, quis dolore
      aspernatur, ab sed fugit neque laudantium, officiis quia quaerat?
    </p>
  </Section>

  <Section>
    <div class="my-accordion-wrapper">
      <div class="my-accordion join join-vertical">
        <div class="collapse-arrow join-item border-base-300 accordion-item collapse border" class:active={myFaqSelection == 'q1'}>
          <input type="radio" value="q1" name="faq" bind:group={myFaqSelection} />
          <div class="collapse-title">How do I create an account?</div>
          <div class="collapse-content">Click the "Sign Up" button in the top right corner and follow the registration process.</div>
        </div>
        <div class="collapse-arrow join-item border-base-300 accordion-item collapse border" class:active={myFaqSelection == 'q2'}>
          <input type="radio" value="q2" name="faq" bind:group={myFaqSelection} />
          <div class="collapse-title">I forgot my password. What should I do?</div>
          <div class="collapse-content">Click on "Forgot Password" on the login page and follow the instructions sent to your email.</div>
        </div>
        <div class="collapse-arrow join-item border-base-300 accordion-item collapse border" class:active={myFaqSelection == 'q3'}>
          <input type="radio" value="q3" name="faq" bind:group={myFaqSelection} />
          <div class="collapse-title" class:active={myFaqSelection == 'q3'}>How do I update my profile information?</div>
          <div class="collapse-content">Go to "My Account" settings and select "Edit Profile" to make changes.</div>
        </div>
        <div class="collapse-arrow join-item border-base-300 accordion-item collapse border" class:active={myFaqSelection == 'q4'}>
          <input type="radio" value="q4" name="faq" bind:group={myFaqSelection} />
          <div class="collapse-title">How do I update my profile information?</div>
          <div class="collapse-content">Go to "My Account" settings and select "Edit Profile" to make changes.</div>
        </div>
        <div class="collapse-arrow join-item border-base-300 accordion-item collapse border" class:active={myFaqSelection == 'q5'}>
          <input type="radio" value="q5" name="faq" bind:group={myFaqSelection} />
          <div class="collapse-title">How do I update my profile information?</div>
          <div class="collapse-content">Go to "My Account" settings and select "Edit Profile" to make changes.</div>
        </div>
        <div class="collapse-arrow join-item border-base-300 accordion-item collapse border" class:active={myFaqSelection == 'q6'}>
          <input type="radio" value="q6" name="faq" bind:group={myFaqSelection} />
          <div class="collapse-title">How do I update my profile information?</div>
          <div class="collapse-content">Go to "My Account" settings and select "Edit Profile" to make changes.</div>
        </div>
        <div class="collapse-arrow join-item border-base-300 accordion-item collapse border" class:active={myFaqSelection == 'q7'}>
          <input type="radio" value="q7" name="faq" bind:group={myFaqSelection} />
          <div class="collapse-title">How do I update my profile information?</div>
          <div class="collapse-content">Go to "My Account" settings and select "Edit Profile" to make changes.</div>
        </div>
        <div class="collapse-arrow join-item border-base-300 accordion-item collapse border" class:active={myFaqSelection == 'q8'}>
          <input type="radio" value="q8" name="faq" bind:group={myFaqSelection} />
          <div class="collapse-title">How do I update my profile information?</div>
          <div class="collapse-content">Go to "My Account" settings and select "Edit Profile" to make changes.</div>
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
      @apply bg-secondary/15 col-span-8;
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
