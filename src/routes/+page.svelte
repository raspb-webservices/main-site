<script lang="ts">
  import { goto } from '$app/navigation';
  import { _ } from 'svelte-i18n';
  import Stage from '$lib/components/ui/stage.svelte';
  import Section from '$lib/components/ui/section.svelte';
  import CTABox from '$lib/components/snippets/cta-box.svelte'
  import PhilosophyModal from '$lib/components/modals/general/philosophy.svelte';
  import TimeAsFactorModal from '$lib/components/modals/home/time-as-factor.svelte';
  import CostAsFactorModal from '$lib/components/modals/home/cost-as-factor.svelte';
  import QualityAsFactorModal from '$lib/components/modals/home/quality-as-factor.svelte';
  import LottieLoader from '$lib/components/lottie-loader.svelte';

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
  <title>{$_('homepage.meta.title')}</title>
  <meta name="description" content={$_('homepage.meta.description')} />
</svelte:head>

<Stage style={'svg-gradient'}>
  <div class="inner-box reduced prose py-36">
    <h1 class="massive animate-fade-in-up">{$_('homepage.hero.title')}</h1>
    <p class="teaser animate-fade-in-up">
      {$_('homepage.hero.subtitleFirst')} <button class="text-link-button" onclick={openPhilosophyModal}>{$_('homepage.hero.subtitleSecond')}</button>
      {$_('homepage.hero.subtitleThird')}
    </p>
    <button
      class="btn-basic animate-fade-in-from-side"
      onclick={() => {
        goto('/services');
      }}>{$_('homepage.hero.buttonText')}</button
    >
  </div>
</Stage>

<div class="home-content-wrapper">
  <!-- <LottieLoader></LottieLoader> -->
  <Section type={'centerTeaser'}>
    <div class="massive-spacer"></div>
    <div class="grid grid-cols-1 items-center gap-12 gap-y-10 lg:grid-cols-2 lg:gap-14 lg:gap-y-4">
      <div class="animate-fade-in-from-side prose mr-8">
        <h2>{$_('homepage.intro.titleFirst')} <span class="inner-text-special">{$_('homepage.intro.titleHighlight')}</span></h2>
        <p>
          {$_('homepage.intro.paragraph1')}
        </p>
        <p>
          {$_('homepage.intro.paragraph2')}
        </p>
        <p>
          {$_('homepage.intro.paragraph3')}
        </p>
      </div>
      <div>
        <div class="image-container">
          <div class="solution-image"></div>
        </div>
      </div>
      <div class="benefits col-span-full">
        <p class="add-padding w-full">
          {$_('homepage.intro.benefitsTitle')}
        </p>
        <div class="item">{$_('homepage.intro.benefits.konzept')}</div>
        <div class="item">{$_('homepage.intro.benefits.design')}</div>
        <div class="item">{$_('homepage.intro.benefits.uiux')}</div>
        <div class="item">{$_('homepage.intro.benefits.programmierung')}</div>
        <div class="item">{$_('homepage.intro.benefits.datenmodellierung')}</div>
        <div class="item">{$_('homepage.intro.benefits.hosting')}</div>
        <div class="item">{$_('homepage.intro.benefits.domain')}</div>
        <div class="item">{$_('homepage.intro.benefits.projektdurchfuehrung')}</div>
        <div class="item">{$_('homepage.intro.benefits.monitoring')}</div>
      </div>
    </div>
    <div class="massive-spacer"></div>
  </Section>

  <Section>
    <div class="inner-section-wrapper">
      <div class="intro prose">
        <h1>{$_('homepage.services.titleFirst')} <span class="inner-text-special">{$_('homepage.services.titleHighlight')}</span></h1>
        <p class="teaser">
          {$_('homepage.services.subtitle')}
        </p>
      </div>

      <div class="services-grid">
        <!-- Webseiten -->
        <div class="service-card">
          <div class="service-card-header">
            <div class="service-icon">🌐</div>
            <h3 class="pt-2">{$_('homepage.services.webseiten.title')}</h3>
          </div>
          <p>
            {$_('homepage.services.webseiten.description')}
          </p>
          <div class="very-tiny-spacer"></div>
          <ul class="service-features">
            <li>{$_('homepage.services.webseiten.features.responsive')}</li>
            <li>{$_('homepage.services.webseiten.features.modern')}</li>
            <li>{$_('homepage.services.webseiten.features.performant')}</li>
            <li>{$_('homepage.services.webseiten.features.individuell')}</li>
            <li>{$_('homepage.services.webseiten.features.eigentum')}</li>
            <li>
              <div class="tooltip tooltip-top tooltip-neutral cursor-help">
                <div class="tooltip-content">
                  <div class="px-4 pt-2 pb-3 text-base">
                    {$_('homepage.services.webseiten.tooltip')}
                  </div>
                </div>
                {$_('homepage.services.webseiten.features.keineFolgekosten')}
              </div>
            </li>
          </ul>
          <div class="service-card-actions push-right">
            <button class="btn btn-simple" onclick={() => goto('/get-started?projectType=website')}>{$_('homepage.services.webseiten.buttonText')}</button>
          </div>
        </div>

        <!-- Custom CMS -->
        <div class="service-card">
          <div class="service-card-header">
            <div class="service-icon">📝</div>
            <h3 class="pt-2.5">{$_('homepage.services.cms.title')}</h3>
          </div>
          <p>
            {$_('homepage.services.cms.description')}
          </p>
          <div class="very-tiny-spacer"></div>
          <ul class="service-features">
            <li>{$_('homepage.services.cms.features.kontrolle')}</li>
            <li>
              <div class="tooltip tooltip-bottom tooltip-neutral cursor-help">
                <div class="tooltip-content">
                  <div class="px-4 pt-2 pb-3 text-base">
                    {$_('homepage.services.cms.features.datenstrukturenTooltip')}
                  </div>
                </div>
                {$_('homepage.services.cms.features.datenstrukturen')}
              </div>
            </li>
            <li>{$_('homepage.services.cms.features.sicher')}</li>
            <li>{$_('homepage.services.cms.features.wartungsarm')}</li>
            <li>{$_('homepage.services.cms.features.editierbar')}</li>
            <li>{$_('homepage.services.cms.features.headless')}</li>
          </ul>
          <div class="service-card-actions push-right">
            <button class="btn btn-simple" onclick={() => goto('/get-started?projectType=cms')}>{$_('homepage.services.cms.buttonText')}</button>
          </div>
        </div>

        <!-- Webanwendungen -->
        <div class="service-card">
          <div class="service-card-header">
            <div class="service-icon">📱</div>
            <h3 class="pt-2">{$_('homepage.services.webanwendungen.title')}</h3>
          </div>
          <p>
            {$_('homepage.services.webanwendungen.description')}
          </p>
          <div class="very-tiny-spacer"></div>
          <ul class="service-features">
            <li>{$_('homepage.services.webanwendungen.features.app')}</li>
            <li>{$_('homepage.services.webanwendungen.features.pwa')}</li>
            <li>{$_('homepage.services.webanwendungen.features.offline')}</li>
            <li>{$_('homepage.services.webanwendungen.features.push')}</li>
            <li>{$_('homepage.services.webanwendungen.features.appStores')}</li>
          </ul>
          <div class="service-card-actions push-right">
            <button class="btn btn-simple" onclick={() => goto('/get-started?projectType=webApplication')}
              >{$_('homepage.services.webanwendungen.buttonText')}</button
            >
          </div>
        </div>

        <!-- Freestyle -->
        <div class="service-card freestyle">
          <div class="service-card-header">
            <div class="service-icon">⚙️</div>
            <h3 class="pt-2">{$_('homepage.services.freestyle.title')}</h3>
          </div>
          <p>
            {$_('homepage.services.freestyle.description')}
          </p>
          <div class="very-tiny-spacer"></div>
          <div class="service-examples">
            <span class="example-tag">{$_('homepage.services.freestyle.examples.event')}</span>
            <span class="example-tag">{$_('homepage.services.freestyle.examples.dashboard')}</span>
            <span class="example-tag">{$_('homepage.services.freestyle.examples.api')}</span>
            <span class="example-tag">{$_('homepage.services.freestyle.examples.module')}</span>
            <span class="example-tag">{$_('homepage.services.freestyle.examples.ui')}</span>
          </div>
          <div class="service-card-actions push-right">
            <button class="btn btn-simple" onclick={() => goto('/get-started?projectType=freestyle')}>{$_('homepage.services.freestyle.buttonText')}</button>
          </div>
        </div>

        <!-- KI Services - spans full width -->
        <div class="service-card lg:col-span-2">
          <div class="service-card-header">
            <div class="service-icon">🤖</div>
            <h3 class="pt-2">{$_('homepage.services.ki.title')}</h3>
          </div>

          <p>
            {$_('homepage.services.ki.description')}
          </p>

          <div class="service-list">
            <div class="service-item">
              <div class="service-icon">🧠</div>
              <div>
                <h4>{$_('homepage.services.ki.services.beratung.title')}</h4>
                <div class="very-tiny-spacer"></div>
                <p>{$_('homepage.services.ki.services.beratung.description')}</p>
              </div>
            </div>
            <div class="service-item">
              <div class="service-icon">🤖</div>
              <div>
                <h4>{$_('homepage.services.ki.services.agenten.title')}</h4>
                <div class="very-tiny-spacer"></div>
                <p>{$_('homepage.services.ki.services.agenten.description')}</p>
              </div>
            </div>
            <div class="service-item">
              <div class="service-icon">⚡</div>
              <div>
                <h4>{$_('homepage.services.ki.services.workflow.title')}</h4>
                <div class="very-tiny-spacer"></div>
                <p>{$_('homepage.services.ki.services.workflow.description')}</p>
              </div>
            </div>
            <div class="service-item">
              <div class="service-icon">🏗️</div>
              <div>
                <h4>{$_('homepage.services.ki.services.infrastructure.title')}</h4>
                <div class="very-tiny-spacer"></div>
                <p>{$_('homepage.services.ki.services.infrastructure.description')}</p>
              </div>
            </div>
          </div>
          <div class="service-card-actions push-right">
            <button class="btn btn-simple" onclick={() => goto('/get-started?projectType=artificialIntelligence')}
              >{$_('homepage.services.ki.buttonText')}</button
            >
          </div>
        </div>
      </div>
    </div>
  </Section>

  <Section>
    <div class="inner-section-wrapper">
      <div class="intro prose">
        <h1>{$_('homepage.balance.titleFirst')} <span class="inner-text-special">{$_('homepage.balance.titleHighlight')}</span></h1>
        <p class="teaser">
          {$_('homepage.balance.subtitleFirst')} <button class="text-link-button" onclick={openPhilosophyModal}>{$_('homepage.balance.subtitleSecond')}</button>
          {$_('homepage.balance.subtitleThird')}
        </p>
      </div>

      <div class="balance-grid">
        <div class="balance-card">
          <div class="balance-icon">⚡</div>
          <div class="balance-content prose">
            <h3>{$_('homepage.balance.zeit.title')}</h3>
            <p>
              {$_('homepage.balance.zeit.description')}
              <button class="text-link-button inverted-underline" onclick={openTimeAsFactorModal}>{$_('homepage.balance.zeit.buttonText')}</button>
            </p>
            <div class="balance-features">
              <span class="feature-tag">{$_('homepage.balance.zeit.features.agile')}</span>
              <span class="feature-tag">{$_('homepage.balance.zeit.features.ki')}</span>
              <span class="feature-tag">{$_('homepage.balance.zeit.features.bausteine')}</span>
              <span class="feature-tag">{$_('homepage.balance.zeit.features.experten')}</span>
              <span class="feature-tag">{$_('homepage.balance.zeit.features.oekosystem')}</span>
            </div>
          </div>
        </div>

        <div class="balance-card">
          <div class="balance-icon">💰</div>
          <div class="balance-content prose">
            <h3>{$_('homepage.balance.kosten.title')}</h3>
            <p>
              {$_('homepage.balance.kosten.description')}
              <button class="text-link-button inverted-underline" onclick={openCostAsFactorModal}>{$_('homepage.balance.kosten.buttonText')}</button>
            </p>
            <div class="balance-features">
              <span class="feature-tag">{$_('homepage.balance.kosten.features.festpreise')}</span>
              <span class="feature-tag">{$_('homepage.balance.kosten.features.keineFolgekosten')}</span>
              <span class="feature-tag">{$_('homepage.balance.kosten.features.transparenz')}</span>
              <span class="feature-tag">{$_('homepage.balance.kosten.features.fair')}</span>
              <span class="feature-tag">{$_('homepage.balance.kosten.features.konfigurator')}</span>
            </div>
          </div>
        </div>

        <div class="balance-card">
          <div class="balance-icon">🏆</div>
          <div class="balance-content prose">
            <h3>{$_('homepage.balance.qualitaet.title')}</h3>
            <p>
              {$_('homepage.balance.qualitaet.description')}
              <button class="text-link-button inverted-underline" onclick={openQualityAsFactorModal}>{$_('homepage.balance.qualitaet.buttonText')}</button>
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
        <h1>{$_('homepage.features.titleFirst')} <span class="inner-text-special">{$_('homepage.features.titleHighlight')}</span></h1>
        <p class="teaser">{$_('homepage.features.subtitle')}</p>
      </div>

      <div class="features-grid">
        <div class="feature-card prose">
          <div class="feature-card-header">
            <div class="feature-icon">🎯</div>
            <h3 class="pt-2.5">{$_('homepage.features.allesAusEinerHand.title')}</h3>
          </div>
          <p>{$_('homepage.features.allesAusEinerHand.description')}</p>
          <div class="very-tiny-spacer"></div>
          <ul class="feature-list">
            <li>{$_('homepage.features.allesAusEinerHand.features.konzeption')}</li>
            <li>{$_('homepage.features.allesAusEinerHand.features.design')}</li>
            <li>{$_('homepage.features.allesAusEinerHand.features.entwicklung')}</li>
            <li>{$_('homepage.features.allesAusEinerHand.features.hosting')}</li>
          </ul>
        </div>

        <div class="feature-card prose">
          <div class="feature-card-header">
            <div class="feature-icon">💎</div>
            <h3 class="pt-2.5">{$_('homepage.features.preise.title')}</h3>
          </div>
          <p>{$_('homepage.features.preise.description')}</p>
          <div class="very-tiny-spacer"></div>
          <ul class="feature-list">
            <li>{$_('homepage.features.preise.benefits.sofort')}</li>
            <li>{$_('homepage.features.preise.benefits.keineVersteckten')}</li>
            <li>{$_('homepage.features.preise.benefits.keineFolgegebuehren')}</li>
          </ul>
        </div>

        <div class="feature-card prose">
          <div class="feature-card-header">
            <div class="feature-icon">👤</div>
            <h3 class="pt-2.5">{$_('homepage.features.ansprechpartner.title')}</h3>
          </div>
          <p>{$_('homepage.features.ansprechpartner.description')}</p>
          <div class="very-tiny-spacer"></div>
          <div class="contact-info">
            <div class="contact-avatar"></div>
            <div class="contact-details">
              <p><strong>{$_('homepage.features.ansprechpartner.contact.title')}</strong></p>
              <p>{$_('homepage.features.ansprechpartner.contact.description')}</p>
            </div>
          </div>
        </div>

        <div class="feature-card">
          <div class="feature-card-header">
            <div class="feature-icon">🛠️</div>
            <h3 class="pt-2.5">{$_('homepage.features.massgeschneidert.title')}</h3>
          </div>
          <p>{$_('homepage.features.massgeschneidert.description')}</p>

          <div class="solution-types mt-auto">
            <span class="solution-tag">{$_('homepage.features.massgeschneidert.types.individual')}</span>
            <span class="solution-tag">{$_('homepage.features.massgeschneidert.types.flexibel')}</span>
            <span class="solution-tag">{$_('homepage.features.massgeschneidert.types.skalierbar')}</span>
            <span class="solution-tag">{$_('homepage.features.massgeschneidert.types.zukunftssicher')}</span>
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
    .benefits {
      @apply flex flex-wrap gap-2;
      .item {
        @apply text-base-content bg-base-100 w-fit rounded-lg px-4 py-2 text-sm;
      }
    }
    .image-container {
      @apply relative aspect-[5/3] w-full overflow-hidden rounded-2xl shadow-2xl;
      .solution-image {
        @apply h-full w-full bg-cover bg-center bg-no-repeat;
        background-image: url('/images/visualization-2.png');
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

          h3 {
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
              @apply from-purple to-pink mt-1.5 mr-3 h-2 w-2 min-w-2 rounded-full bg-gradient-to-r;
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

            h4 {
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
          h3 {
            @apply mb-4 text-xl font-semibold;
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
          h3 {
            @apply text-xl font-semibold;
          }
        }

        .feature-list {
          @apply space-y-2;

          li {
            @apply text-base-content flex items-start text-sm;

            &::before {
              @apply from-purple to-pink mt-1.5 mr-3 h-2 w-2 min-w-2 rounded-full bg-gradient-to-r;
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
