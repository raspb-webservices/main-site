<script lang="ts">
  import { goto } from '$app/navigation';
  import { localizeHref } from '$lib/paraglide/runtime';
  import { m } from '$lib/paraglide/messages';
</script>

<button
  class="new-project-card group"
  onclick={() => goto(localizeHref('/wizard/extended'))}
>
  <div class="icon-wrapper">
    <svg xmlns="http://www.w3.org/2000/svg" class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  </div>
  <h3 class="title">{m.dashboard_newProject_title()}</h3>
  <p class="description">{m.dashboard_newProject_description()}</p>
</button>

<style lang="postcss">
  @reference '../../../app.css';

  .new-project-card {
    @apply bg-base-100 relative flex min-h-70 w-full cursor-pointer flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-purple/30 p-8 text-center transition-all duration-500;

    &:hover {
      @apply border-pink/60 shadow-lg;
      box-shadow: 0 0 30px oklch(0.6559 0.2118 354.31 / 0.15);

      .icon-wrapper {
        @apply scale-110;
        background: linear-gradient(135deg, oklch(0.6056 0.2189 292.72), oklch(0.6559 0.2118 354.31), oklch(0.6668 0.2591 322.15));

        .icon {
          @apply text-white;
        }
      }
    }
  }

  .icon-wrapper {
    @apply flex h-16 w-16 items-center justify-center rounded-full transition-all duration-500;
    background: linear-gradient(135deg, oklch(0.6056 0.2189 292.72 / 0.15), oklch(0.6559 0.2118 354.31 / 0.15));

    .icon {
      @apply h-8 w-8 text-pink transition-colors duration-500;
    }
  }

  .title {
    @apply text-base-content text-xl font-bold;
  }

  .description {
    @apply text-base-content/50 text-sm font-light;
  }
</style>
