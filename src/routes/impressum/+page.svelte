<script lang="ts">
  import { goto } from '$app/navigation';
</script>

<section class="impressum-content-wrapper">
  <h1>Impressum</h1>
  <div class="px-20 pt-10">
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio hic voluptatem neque consequuntur porro, accusantium sit, doloribus perferendis, reiciendis
      autem labore. Minus explicabo aperiam ratione sapiente voluptate aliquam cum est.
    </p>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio hic voluptatem neque consequuntur porro, accusantium sit, doloribus perferendis, reiciendis
      autem labore. Minus explicabo aperiam ratione sapiente voluptate aliquam cum est.
    </p>

    <div class="spacer"></div>
    <button
      class="btn-basic"
      onclick={() => {
        goto('/');
      }}>Zurück zur Startseite</button
    >
  </div>
  <div class="big-spacer"></div>
</section>

<style lang="postcss">
    @reference '../../app.css';
  section.impressum-content-wrapper {
    @apply m-auto h-full w-full max-w-7xl px-4 py-12;
  }
</style>
