<script lang="ts">
  import { goto } from '$app/navigation';
  import Section from '$lib/components/ui/section.svelte';
  import { m } from '$lib/paraglide/messages';
</script>

<Section type={'fullCenterTeaser'}>
  <div class="inner-content-wrapper prose">
    <h1 class="text-center"><span class="inner-text-special">{m['thankYouHighlight']()}</span> {m['thankYouMessageSecond']()}</h1>
    <p class="teaser text-center">{m['thankYouTeaser']()}</p>

    <div class="spacer"></div>
    <div class="flex w-full justify-center">
      <button
        class="btn-basic"
        onclick={() => {
          goto('/');
        }}>{m['backToHomepage']()}</button
      >
    </div>

    <!-- Cal inline embed code begins -->
    <div style="width:100%;height:100%;overflow:scroll" id="my-cal-inline-kennenlernen"></div>
    <script type="text/javascript">
      (function (C, A, L) {
        let p = function (a, ar) {
          a.q.push(ar);
        };
        let d = C.document;
        C.Cal =
          C.Cal ||
          function () {
            let cal = C.Cal;
            let ar = arguments;
            if (!cal.loaded) {
              cal.ns = {};
              cal.q = cal.q || [];
              d.head.appendChild(d.createElement('script')).src = A;
              cal.loaded = true;
            }
            if (ar[0] === L) {
              const api = function () {
                p(api, arguments);
              };
              const namespace = ar[1];
              api.q = api.q || [];
              if (typeof namespace === 'string') {
                cal.ns[namespace] = cal.ns[namespace] || api;
                p(cal.ns[namespace], ar);
                p(cal, ['initNamespace', namespace]);
              } else p(cal, ar);
              return;
            }
            p(cal, ar);
          };
      })(window, 'https://app.cal.com/embed/embed.js', 'init');
      Cal('init', 'kennenlernen', { origin: 'https://app.cal.com' });

      Cal.ns.kennenlernen('inline', {
        elementOrSelector: '#my-cal-inline-kennenlernen',
        config: { layout: 'month_view', theme: 'light' },
        calLink: 'markus-hartig-00ykq2/kennenlernen'
      });

      Cal.ns.kennenlernen('ui', { theme: 'light', hideEventTypeDetails: false, layout: 'month_view' });
    </script>
    <!-- Cal inline embed code ends -->
  </div>
</Section>

<style lang="postcss">
  @reference '../../app.css';
  .inner-content-wrapper {
    @apply flex flex-col items-center justify-center;
  }
</style>
