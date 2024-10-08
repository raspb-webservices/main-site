<script lang="ts">
  import { goto } from '$app/navigation';
</script>

<section class="aktuelles-content-wrapper">
  <div class="container">
    <div class="inner-container">
      <h1>Aktuelles</h1>

      <div class="px-20 pt-10">
        <h2>Termine</h2>
        <div class="tiny-spacer"></div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio hic voluptatem neque consequuntur porro, accusantium sit, doloribus perferendis,
          reiciendis autem labore. Minus explicabo aperiam ratione sapiente voluptate aliquam cum est.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio hic voluptatem neque consequuntur porro, accusantium sit, doloribus perferendis,
          reiciendis autem labore. Minus explicabo aperiam ratione sapiente voluptate aliquam cum est.
        </p>
        <div class="spacer"></div>
        <button
          class="btn-basic"
          on:click={() => {
            goto('/');
          }}>Zurück zur Startseite</button
        >
      </div>
    </div>
  </div>
  <div class="big-spacer"></div>
</section>