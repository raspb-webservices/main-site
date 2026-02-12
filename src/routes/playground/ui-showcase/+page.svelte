<script lang="ts">
  import Section from '$lib/components/ui/section.svelte';
  import Stage from '$lib/components/ui/stage.svelte';
  import { m } from '$lib/paraglide/messages';
</script>

<Section fullWidth={true} noSpacing={true}>
  <h1>{m.ui_showcase_title1()}</h1>
</Section>

<Stage style={'svg-gradient'}>
  <div class="inner-box reduced">
    <h1>{m.ui_showcase_title2()}</h1>
    <p>
      {m.ui_showcase_placeholder_text()}
    </p>
  </div>
</Stage>

<Section>
  <div class="inner-box">
    <p>{m.ui_showcase_placeholder_short()}</p>
  </div>
</Section>

<Stage style={'basic-gradient'}>
  <div class="inner-box reduced">
    <h1>{m.ui_showcase_title3()}</h1>
    <p>
      {m.ui_showcase_placeholder_text()}
    </p>
  </div>
</Stage>

<Section>
  <div class="inner-box">
    <p>{m.ui_showcase_placeholder_short()}</p>
  </div>
</Section>

<Stage style={'fancy-gradient'}>
  <div class="inner-box">
    <h1>{m.ui_showcase_title3()}</h1>
    <p>
      {m.ui_showcase_placeholder_text()}
    </p>
  </div>
</Stage>

<style lang="postcss">
  @reference '../../../app.css';
</style>
