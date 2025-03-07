<div class="info-box">
  <div class="icon"></div>
  <div class="text">
    <slot></slot>
  </div>
</div>

<style lang="postcss">
  .info-box {
    @apply flex h-auto w-full items-center justify-center bg-lightBlue rounded-xl p-4 px-8 text-white;
    .text, .text p {
      @apply text-lg p-0;
    }

    .icon {
      width: 60px;
      height: 60px;
      background-color: azure;
      mask-image: url(/icons/information-icon.svg);
      mask-repeat: no-repeat;
      mask-size: contain;
      mask-position: center;
      margin: 0 1rem 0 0;
    }
  }
</style>
