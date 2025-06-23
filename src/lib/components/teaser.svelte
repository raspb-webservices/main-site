<script lang="ts">
  import { goto } from '$app/navigation';

  export let customImageURL;
  export let headline = 'no headline';
  export let subheadline = 'no sub-headline';

  let customImageStyle = 'url(' + customImageURL + ')';
</script>

<div class="teaser-wrapper fade-ww">
  <div class="teaser-inner" style="--teaserImage:{customImageStyle};">
    <div class="content-section">
      <h2>{headline}</h2>
      <p>{subheadline}</p>
    </div>
  </div>
</div>

<style lang="postcss">
    @reference '../../app.css';
  div.teaser-wrapper {
    @apply w-full bg-darkGrey;

    div.teaser-inner {
      @apply relative m-auto flex aspect-32/9 w-full max-w-wqhd flex-col items-start justify-end bg-cover bg-center bg-no-repeat p-8;
      background-image: var(--teaserImage);

      &:after {
        @apply absolute bottom-0 left-0 h-full w-full;
        background-image: linear-gradient(190deg, rgba(0, 0, 0, 0) 27%, rgba(0, 0, 0, 0.45) 87%);
        content: '';
      }

      .content-section {
        @apply z-10;
        h2,
        p {
          @apply p-0 text-white;
        }
      }
    }
  }
</style>
