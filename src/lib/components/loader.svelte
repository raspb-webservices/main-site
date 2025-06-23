<div class="loader-wrapper">
  <div class="loader"></div>
</div>

<style lang="postcss">
    @reference '../../app.css';
  .loader-wrapper {
    @apply flex h-auto w-full items-center justify-center;
    .loader {
      width: 70px;
      aspect-ratio: 1;
      border-radius: 50%;
      border: 12px solid var(--light-grey);
      border-right-color: var(--pale-blue);
      animation: l2 1s infinite linear;
    }
  }

  @keyframes l2 {
    to {
      transform: rotate(1turn);
    }
  }
</style>
