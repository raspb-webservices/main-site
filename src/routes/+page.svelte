<script lang="ts">
  import { goto } from '$app/navigation';
  import Stage from '$lib/components/ui/stage.svelte';
  import Section from '$lib/components/ui/section.svelte';
  import CTABox from '$lib/components/snippets/cta-box.svelte';
  import PhilosophyModal from '$lib/components/modals/general/philosophy.svelte';
  import TimeAsFactorModal from '$lib/components/modals/home/time-as-factor.svelte';
  import CostAsFactorModal from '$lib/components/modals/home/cost-as-factor.svelte';
  import QualityAsFactorModal from '$lib/components/modals/home/quality-as-factor.svelte';
  import { DotLottieSvelte } from '@lottiefiles/dotlottie-svelte';
  import { m } from '$lib/paraglide/messages';
  import { getLocale, localizeHref } from '$lib/paraglide/runtime';
  
  let philosophyModal: PhilosophyModal;
  let timeAsFactorModal: TimeAsFactorModal;
  let costAsFactorModal: CostAsFactorModal;
  let qualityAsFactorModal: QualityAsFactorModal;

  function openPhilosophyModal() {
    philosophyModal?.openModal();
  }

  function openTimeAsFactorModal() {
    timeAsFactorModal?.openModal();
  }

  function openCostAsFactorModal() {
    costAsFactorModal?.openModal();
  }

  function openQualityAsFactorModal() {
    qualityAsFactorModal?.openModal();
  }
</script>

<svelte:head>
  <title>{m['homepage.meta.title']()}</title>
  <meta name="description" content={m['homepage.meta.description']()} />
</svelte:head>

<Stage style={'svg-gradient'}>
  <div class="inner-box reduced prose py-36">
    <h1 class="massive animate-fade-in-up">{m['homepage.hero.title']()}</h1>
    <p class="teaser animate-fade-in-up">
      {m['homepage.hero.subtitleFirst']()} <button class="text-link-button" onclick={openPhilosophyModal}>{m['homepage.hero.subtitleSecond']()}</button>
      {m['homepage.hero.subtitleThird']()}
    </p>
    <div class="flex-wo flex flex-wrap gap-4">
      <button
        class="btn-basic animate-fade-in-from-side"
        onclick={() => {
          goto(localizeHref('/wizard'));
        }}>{m['homepage.hero.buttonText']()}</button
      >
      <button class="btn-inverted-outline animate-fade-in-from-side" onclick={()=>{goto(localizeHref('/appointment'))}}>{m['homepage.hero.buttonText2']()}</button>
    </div>
  </div>
</Stage>

<div class="home-content-wrapper">
  <Section>
    <div class="inner-section-wrapper">
      <div class="intro prose pt-10 md:pt-0">
        <h1>
          {m['homepage.thisIsUs.titleFirst']()} <span class="inner-text-special">{m['homepage.thisIsUs.titleHighlight']()}</span>
          {#if getLocale() !== 'en'}{m['homepage.thisIsUs.titleSecond']()}{/if}
        </h1>
        <p class="teaser">
          {m['homepage.thisIsUs.subtitle']()}
        </p>
      </div>
    </div>

    <div class="grid grid-cols-12 gap-y-8 md:gap-x-10">
      <div class="animate-fade-in-from-side prose order-2 col-span-full md:order-1 md:col-span-7">
        <p>
          {m['homepage.thisIsUs.paragraph1']()}
        </p>
        <p>
          {m['homepage.thisIsUs.paragraph2']()}
        </p>
      </div>
      <div class="lg:items-top order-1 col-span-full items-center md:order-2 md:col-span-5">
        <div class="lottie-container">
          <DotLottieSvelte src="/lotties/robot-supports.lottie" loop autoplay />
        </div>
      </div>
      <div class="order-3 col-span-full md:col-span-5">
        <div class="lottie-container">
          <DotLottieSvelte src="/lotties/business-launch.lottie" loop autoplay />
        </div>
      </div>
      <div class="animate-fade-in-from-side prose order-4 col-span-full md:col-span-7">
        <p>
          {m['homepage.thisIsUs.paragraph3']()}
        </p>
        <p>
          {m['homepage.thisIsUs.paragraph4']()}
        </p>
        <p>
          {m['homepage.intro.benefitsTitle']()}
        </p>
      </div>

      <div class="benefits order-5 col-span-full">
        <div class="item">{m['homepage.intro.benefits.konzept']()}</div>
        <div class="item">{m['homepage.intro.benefits.design']()}</div>
        <div class="item">{m['homepage.intro.benefits.uiux']()}</div>
        <div class="item">{m['homepage.intro.benefits.programmierung']()}</div>
        <div class="item">{m['homepage.intro.benefits.datenmodellierung']()}</div>
        <div class="item">{m['homepage.intro.benefits.hosting']()}</div>
        <div class="item">{m['homepage.intro.benefits.domain']()}</div>
        <div class="item">{m['homepage.intro.benefits.projektdurchfuehrung']()}</div>
        <div class="item">{m['homepage.intro.benefits.coaching']()}</div>
        <div class="item">{m['homepage.intro.benefits.monitoring']()}</div>
      </div>
    </div>
  </Section>

  <Stage style={'basic-gradient'}>
    <div class="inner-container m-auto max-w-7xl px-4 py-24">
      <div class="inner-section-wrapper">
        <div class="intro prose">
          <h1>{m['homepage.services.titleFirst']()} <span class="inner-text-special">{m['homepage.services.titleHighlight']()}</span></h1>
          <p class="teaser">
            {m['homepage.services.subtitle']()}
          </p>
        </div>

        <div class="services-grid">
          <!-- Webseiten -->
          <div class="service-card">
            <div class="service-card-header">
              <div class="service-icon">🌐</div>
              <h2 class="pt-2">{m['homepage.services.webseiten.title']()}</h2>
            </div>
            <p>
              {m['homepage.services.webseiten.description']()}
            </p>
            <div class="very-tiny-spacer"></div>
            <ul class="service-features">
              <li>{m['homepage.services.webseiten.features.responsive']()}</li>
              <li>{m['homepage.services.webseiten.features.modern']()}</li>
              <li>{m['homepage.services.webseiten.features.performant']()}</li>
              <li>{m['homepage.services.webseiten.features.individuell']()}</li>
              <li>{m['homepage.services.webseiten.features.eigentum']()}</li>
              <li>
                <div class="tooltip tooltip-top tooltip-neutral cursor-help">
                  <div class="tooltip-content">
                    <div class="px-4 pt-2 pb-3 text-base">
                      {m['homepage.services.webseiten.tooltip']()}
                    </div>
                  </div>
                  {m['homepage.services.webseiten.features.keineFolgekosten']()}
                </div>
              </li>
            </ul>
            <div class="service-card-actions push-right">
              <button class="btn btn-simple" onclick={() => goto(localizeHref('get-started?projectType=website'))}>{m['homepage.services.webseiten.buttonText']()}</button>
            </div>
          </div>

          <!-- Custom CMS -->
          <div class="service-card">
            <div class="service-card-header">
              <div class="service-icon">📝</div>
              <h2 class="pt-2.5">{m['homepage.services.cms.title']()}</h2>
            </div>
            <p>
              {m['homepage.services.cms.description']()}
            </p>
            <div class="very-tiny-spacer"></div>
            <ul class="service-features">
              <li>{m['homepage.services.cms.features.kontrolle']()}</li>
              <li>
                <div class="tooltip tooltip-bottom tooltip-neutral cursor-help">
                  <div class="tooltip-content">
                    <div class="px-4 pt-2 pb-3 text-base">
                      {m['homepage.services.cms.features.datenstrukturenTooltip']()}
                    </div>
                  </div>
                  {m['homepage.services.cms.features.datenstrukturen']()}
                </div>
              </li>
              <li>{m['homepage.services.cms.features.sicher']()}</li>
              <li>{m['homepage.services.cms.features.wartungsarm']()}</li>
              <li>{m['homepage.services.cms.features.editierbar']()}</li>
              <li>{m['homepage.services.cms.features.headless']()}</li>
            </ul>
            <div class="service-card-actions push-right">
              <button class="btn btn-simple" onclick={() => goto(localizeHref('get-started?projectType=cms'))}>{m['homepage.services.cms.buttonText']()}</button>
            </div>
          </div>

          <!-- Webanwendungen -->
          <div class="service-card">
            <div class="service-card-header">
              <div class="service-icon">📱</div>
              <h2 class="pt-2">{m['homepage.services.webanwendungen.title']()}</h2>
            </div>
            <p>
              {m['homepage.services.webanwendungen.description']()}
            </p>
            <div class="very-tiny-spacer"></div>
            <ul class="service-features">
              <li>{m['homepage.services.webanwendungen.features.app']()}</li>
              <li>{m['homepage.services.webanwendungen.features.pwa']()}</li>
              <li>{m['homepage.services.webanwendungen.features.offline']()}</li>
              <li>{m['homepage.services.webanwendungen.features.push']()}</li>
              <li>{m['homepage.services.webanwendungen.features.appStores']()}</li>
            </ul>
            <div class="service-card-actions push-right">
              <button class="btn btn-simple" onclick={() => goto(localizeHref('/get-started?projectType=webApplication'))}
                >{m['homepage.services.webanwendungen.buttonText']()}</button
              >
            </div>
          </div>

          <!-- Freestyle -->
          <div class="service-card freestyle">
            <div class="service-card-header">
              <div class="service-icon">⚙️</div>
              <h2 class="pt-2">{m['homepage.services.freestyle.title']()}</h2>
            </div>
            <p>
              {m['homepage.services.freestyle.description']()}
            </p>
            <div class="very-tiny-spacer"></div>
            <div class="service-examples">
              <span class="example-tag">{m['homepage.services.freestyle.examples.event']()}</span>
              <span class="example-tag">{m['homepage.services.freestyle.examples.dashboard']()}</span>
              <span class="example-tag">{m['homepage.services.freestyle.examples.api']()}</span>
              <span class="example-tag">{m['homepage.services.freestyle.examples.module']()}</span>
              <span class="example-tag">{m['homepage.services.freestyle.examples.ui']()}</span>
            </div>
            <div class="service-card-actions push-right">
              <button class="btn btn-simple" onclick={() => goto(localizeHref('/get-started?projectType=freestyle'))}>{m['homepage.services.freestyle.buttonText']()}</button>
            </div>
          </div>

          <!-- KI Services - spans full width -->
          <div class="service-card lg:col-span-2">
            <div class="service-card-header">
              <div class="service-icon">🤖</div>
              <h2 class="pt-2">{m['homepage.services.ki.title']()}</h2>
            </div>

            <p>
              {m['homepage.services.ki.description']()}
            </p>

            <div class="service-list">
              <div class="service-item">
                <div class="service-icon">🧠</div>
                <div>
                  <h3>{m['homepage.services.ki.services.beratung.title']()}</h3>
                  <div class="very-tiny-spacer"></div>
                  <p>{m['homepage.services.ki.services.beratung.description']()}</p>
                </div>
              </div>
              <div class="service-item">
                <div class="service-icon">🤖</div>
                <div>
                  <h3>{m['homepage.services.ki.services.agenten.title']()}</h3>
                  <div class="very-tiny-spacer"></div>
                  <p>{m['homepage.services.ki.services.agenten.description']()}</p>
                </div>
              </div>
              <div class="service-item">
                <div class="service-icon">⚡</div>
                <div>
                  <h3>{m['homepage.services.ki.services.workflow.title']()}</h3>
                  <div class="very-tiny-spacer"></div>
                  <p>{m['homepage.services.ki.services.workflow.description']()}</p>
                </div>
              </div>
              <div class="service-item">
                <div class="service-icon">🏗️</div>
                <div>
                  <h3>{m['homepage.services.ki.services.infrastructure.title']()}</h3>
                  <div class="very-tiny-spacer"></div>
                  <p>{m['homepage.services.ki.services.infrastructure.description']()}</p>
                </div>
              </div>
            </div>
            <div class="service-card-actions push-right">
              <button class="btn btn-simple" onclick={() => goto(localizeHref('/get-started?projectType=artificialIntelligence'))}
                >{m['homepage.services.ki.buttonText']()}</button
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </Stage>

  <Section>
    <div class="inner-section-wrapper">
      <div class="intro prose">
        <h1>{m['homepage.balance.titleFirst']()} <span class="inner-text-special">{m['homepage.balance.titleHighlight']()}</span></h1>
        <p class="teaser">
          {m['homepage.balance.subtitleFirst']()} <button class="text-link-button" onclick={openPhilosophyModal}>{m['homepage.balance.subtitleSecond']()}</button>
          {m['homepage.balance.subtitleThird']()}
        </p>
      </div>

      <div class="balance-grid">
        <div class="balance-card">
          <div class="balance-icon">⚡</div>
          <div class="balance-content prose">
            <h2>{m['homepage.balance.zeit.title']()}</h2>
            <p>
              {m['homepage.balance.zeit.description']()}
              <button class="text-link-button inverted-underline" onclick={openTimeAsFactorModal}>{m['homepage.balance.zeit.buttonText']()}</button>
            </p>
            <div class="balance-features">
              <span class="feature-tag">{m['homepage.balance.zeit.features.agile']()}</span>
              <span class="feature-tag">{m['homepage.balance.zeit.features.ki']()}</span>
              <span class="feature-tag">{m['homepage.balance.zeit.features.bausteine']()}</span>
              <span class="feature-tag">{m['homepage.balance.zeit.features.experten']()}</span>
              <span class="feature-tag">{m['homepage.balance.zeit.features.oekosystem']()}</span>
            </div>
          </div>
        </div>

        <div class="balance-card">
          <div class="balance-icon">💰</div>
          <div class="balance-content prose">
            <h2>{m['homepage.balance.kosten.title']()}</h2>
            <p>
              {m['homepage.balance.kosten.description']()}
              <button class="text-link-button inverted-underline" onclick={openCostAsFactorModal}>{m['homepage.balance.kosten.buttonText']()}</button>
            </p>
            <div class="balance-features">
              <span class="feature-tag">{m['homepage.balance.kosten.features.festpreise']()}</span>
              <span class="feature-tag">{m['homepage.balance.kosten.features.keineFolgekosten']()}</span>
              <span class="feature-tag">{m['homepage.balance.kosten.features.transparenz']()}</span>
              <span class="feature-tag">{m['homepage.balance.kosten.features.fair']()}</span>
              <span class="feature-tag">{m['homepage.balance.kosten.features.konfigurator']()}</span>
            </div>
          </div>
        </div>

        <div class="balance-card">
          <div class="balance-icon">🏆</div>
          <div class="balance-content prose">
            <h2>{m['homepage.balance.qualitaet.title']()}</h2>
            <p>
              {m['homepage.balance.qualitaet.description']()}
              <button class="text-link-button inverted-underline" onclick={openQualityAsFactorModal}>{m['homepage.balance.qualitaet.buttonText']()}</button>
            </p>
            <div class="tech-stack">
              <img src="icons/tech-logos/node-js-logo.svg" alt="Node.js" class="tech-logo" />
              <img src="icons/tech-logos/svelte-logo.svg" alt="Svelte" class="tech-logo smaller" />
              <img src="icons/tech-logos/typescript-logo.svg" alt="TypeScript" class="tech-logo smaller" />
              <img src="icons/tech-logos/GitHub-logo.svg" alt="GitHub" class="tech-logo" />
              <img src="icons/tech-logos/netlify-logo.svg" alt="Netlify" class="tech-logo long" />
              <img src="icons/tech-logos/tailwind-css-logo-full.svg" alt="TailwindCSS" class="tech-logo long" />
              <img src="icons/tech-logos/GraphQL-logo.svg" alt="GraphQL" class="tech-logo long" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </Section>

  <Section>
    <div class="inner-section-wrapper">
      <div class="intro prose">
        <h1>{m['homepage.features.titleFirst']()} <span class="inner-text-special">{m['homepage.features.titleHighlight']()}</span></h1>
        <p class="teaser">{m['homepage.features.subtitle']()}</p>
      </div>

      <div class="features-grid">
        <div class="feature-card prose">
          <div class="feature-card-header">
            <div class="feature-icon">🎯</div>
            <h2 class="pt-2.5">{m['homepage.features.allesAusEinerHand.title']()}</h2>
          </div>
          <p>{m['homepage.features.allesAusEinerHand.description']()}</p>
          <div class="very-tiny-spacer"></div>
          <ul class="feature-list">
            <li>{m['homepage.features.allesAusEinerHand.features.konzeption']()}</li>
            <li>{m['homepage.features.allesAusEinerHand.features.design']()}</li>
            <li>{m['homepage.features.allesAusEinerHand.features.entwicklung']()}</li>
            <li>{m['homepage.features.allesAusEinerHand.features.hosting']()}</li>
          </ul>
        </div>

        <div class="feature-card prose">
          <div class="feature-card-header">
            <div class="feature-icon">💎</div>
            <h2 class="pt-2.5">{m['homepage.features.preise.title']()}</h2>
          </div>
          <p>{m['homepage.features.preise.description']()}</p>
          <div class="very-tiny-spacer"></div>
          <ul class="feature-list">
            <li>{m['homepage.features.preise.benefits.sofort']()}</li>
            <li>{m['homepage.features.preise.benefits.keineVersteckten']()}</li>
            <li>{m['homepage.features.preise.benefits.keineFolgegebuehren']()}</li>
          </ul>
        </div>

        <div class="feature-card prose">
          <div class="feature-card-header">
            <div class="feature-icon">👤</div>
            <h2 class="pt-2.5">{m['homepage.features.ansprechpartner.title']()}</h2>
          </div>
          <p>{m['homepage.features.ansprechpartner.description']()}</p>
          <div class="very-tiny-spacer"></div>
          <div class="contact-info">
            <div class="contact-avatar"></div>
            <div class="contact-details">
              <p><strong>{m['homepage.features.ansprechpartner.contact.title']()}</strong></p>
              <p>{m['homepage.features.ansprechpartner.contact.description']()}</p>
            </div>
          </div>
        </div>

        <div class="feature-card">
          <div class="feature-card-header">
            <div class="feature-icon">🛠️</div>
            <h2 class="pt-2.5">{m['homepage.features.massgeschneidert.title']()}</h2>
          </div>
          <p>{m['homepage.features.massgeschneidert.description']()}</p>

          <div class="solution-types mt-auto">
            <span class="solution-tag">{m['homepage.features.massgeschneidert.types.individual']()}</span>
            <span class="solution-tag">{m['homepage.features.massgeschneidert.types.flexibel']()}</span>
            <span class="solution-tag">{m['homepage.features.massgeschneidert.types.skalierbar']()}</span>
            <span class="solution-tag">{m['homepage.features.massgeschneidert.types.zukunftssicher']()}</span>
          </div>
        </div>
      </div>
    </div>
  </Section>

  <Section>
    <CTABox></CTABox>
  </Section>
  <div class="massive-spacer"></div>
</div>

<PhilosophyModal bind:this={philosophyModal} />
<TimeAsFactorModal bind:this={timeAsFactorModal} />
<CostAsFactorModal bind:this={costAsFactorModal} />
<QualityAsFactorModal bind:this={qualityAsFactorModal} />

<style lang="postcss">
  @reference '../app.css';
  .home-content-wrapper {
    .lottie-container {
      @apply h-full w-full;
      :global(dotlottie-player),
      :global(canvas) {
        @apply h-full max-h-full w-full max-w-full;
        object-fit: contain;
      }
    }

    .benefits {
      @apply flex flex-wrap items-center justify-center gap-2;
      .item {
        @apply text-base-content bg-primary/8 w-fit rounded-lg px-4 py-2 text-sm;
      }
    }

    .inner-section-wrapper {
      .intro {
        @apply m-auto flex max-w-4xl flex-col items-center justify-center pb-8 text-center;
      }
    }
    .services-grid {
      @apply grid grid-cols-1 gap-8 lg:grid-cols-2;

      .service-card {
        @apply from-base-100 to-base-200 text-base-content flex cursor-default flex-col justify-between rounded-2xl border-0 bg-linear-to-tl p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg;

        .service-card-header {
          @apply mb-4 flex min-w-full flex-wrap items-center gap-4;

          .service-icon {
            @apply text-4xl;
          }

          h2 {
            @apply text-xl font-semibold;
          }
        }

        p {
          @apply text-base-content mb-4;
        }

        .service-features {
          @apply mb-6 space-y-2;

          li {
            @apply text-base-content flex items-start text-sm;

            &::before {
              @apply from-purple to-pink mt-1.5 mr-3 h-2 w-2 min-w-2 rounded-full bg-linear-to-r;
              content: '';
            }
          }
        }

        .service-list {
          @apply mt-4 grid grid-cols-1 gap-4 md:grid-cols-2;

          .service-item {
            @apply flex items-start gap-3;

            .service-icon {
              @apply text-2xl;
            }

            h3 {
              @apply font-semibold;
            }

            p {
              @apply text-base-content text-sm;
            }
          }
        }

        .service-examples {
          @apply mb-4 flex flex-wrap gap-2;

          .example-tag {
            @apply bg-primary/10 text-primary rounded-full px-3 py-1 text-sm font-medium;
          }
        }

        .service-card-actions {
          @apply mt-auto;
          &.push-right {
            @apply flex items-center justify-end;
          }
        }
      }
    }
    .balance-grid {
      @apply grid grid-cols-1 gap-8 lg:grid-cols-3;

      .balance-card {
        @apply from-base-100 to-base-200 text-base-content flex cursor-default flex-col rounded-2xl border-0 bg-linear-to-tl p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg;

        .balance-icon {
          @apply mb-4 text-5xl;
        }

        .balance-content {
          h2 {
            @apply mt-3 mb-5 p-0 text-2xl font-semibold;
          }

          p {
            @apply text-base-content mb-4;
          }

          .balance-features {
            @apply flex flex-wrap justify-center gap-2;

            .feature-tag {
              @apply bg-primary/10 text-primary rounded-full px-3 py-1 text-sm font-medium;
            }
          }

          .tech-stack {
            @apply flex flex-wrap items-center justify-center gap-4;

            .tech-logo {
              @apply h-12 w-12 rounded-lg;
              &.long {
                @apply h-12 w-24;
              }
              &.smaller {
                @apply h-10;
              }
            }
          }
        }
      }
    }
    .features-grid {
      @apply grid grid-cols-1 gap-8 lg:grid-cols-2;

      .feature-card {
        @apply from-base-100 to-base-200 text-base-content flex cursor-default flex-col rounded-2xl border-0 bg-linear-to-tl p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg;

        .feature-card-header {
          @apply mb-4 flex min-w-full flex-wrap items-center gap-4;

          .feature-icon {
            @apply text-4xl;
          }
          h2 {
            @apply text-xl font-semibold;
          }
        }

        .feature-list {
          @apply space-y-2;

          li {
            @apply text-base-content flex items-start text-sm;

            &::before {
              @apply from-purple to-pink mt-1.5 mr-3 h-2 w-2 min-w-2 rounded-full bg-linear-to-r;
              content: '';
            }
          }
        }

        .contact-info {
          @apply flex items-center gap-4;
          .contact-avatar {
            @apply h-10 w-10 rounded-full bg-white;
          }
          .contact-details {
            p {
              @apply text-sm;
            }
          }
        }
        .solution-types {
          @apply flex flex-wrap gap-2;

          .solution-tag {
            @apply bg-primary/10 text-primary rounded-full px-3 py-1 text-sm font-medium;
          }
        }
      }
    }
  }
</style>
