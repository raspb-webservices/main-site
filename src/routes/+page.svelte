<script lang="ts">
  import { user, isAuthenticated, popupOpen } from '$store/sharedStates.svelte';
  import SLIDER from '$lib/components/slider.svelte';
  import Hero from '$lib/components/hero.svelte';
  import markdownit from 'markdown-it';
  import Section from '$lib/components/section.svelte';
  import RaspbPhilosophyModal from '$lib/components/raspb-philosophy-modal.svelte';
  import { goto } from '$app/navigation';
  import { _ } from 'svelte-i18n';
  
  const { data } = $props();

  let currentUser = $derived(user.get());
  const md = markdownit();
  let philosophyModal: RaspbPhilosophyModal;

  function renderMarkdown(content: string) {
    return md.render(content);
  }

  // Hero button action for testing
  function handleHeroButton() {
    console.log('Hero button clicked!');
    goto('/einblicke');
  }

  function openPhilosophyModal() {
    philosophyModal?.openModal();
  }

  // Modal state for balance section
  let zeitModal: HTMLDialogElement;
  let kostenModal: HTMLDialogElement;
  let qualitaetModal: HTMLDialogElement;

  function openZeitModal() {
    zeitModal?.showModal();
  }

  function openKostenModal() {
    kostenModal?.showModal();
  }

  function openQualitaetModal() {
    qualitaetModal?.showModal();
  }
</script>

<svelte:head>
  <title>{$_('homepage.meta.title')}</title>
  <meta name="description" content={$_('homepage.meta.description')} />
</svelte:head>

<div class="home-content-wrapper">
  <Section type={'centerTeaser'}>
    <div class="animate-fade-in-up flex w-full flex-col items-center justify-center text-center">
      <h1 class="massive">{$_('homepage.hero.titleFirst')} <span class="inner-text-special">{$_('homepage.hero.titleHighlight')}</span></h1>
      <h3>{$_('homepage.hero.subtitleFirst')} <button class="text-link-button" onclick={openPhilosophyModal}>{$_('homepage.hero.subtitleSecond')}</button> {$_('homepage.hero.subtitleThird')}</h3>
      <button
        class="btn-basic"
        onclick={() => {
          goto('/einblicke');
        }}>{$_('homepage.hero.buttonText')}</button
      >
    </div>

    <div class="massive-spacer"></div>
    <div class="massive-spacer"></div>

    <div class="grid grid-cols-1 items-center gap-12 gap-y-10 lg:grid-cols-2 lg:gap-14 lg:gap-y-4">
      <div class="animate-fade-in-from-side mr-8">
        <h2>{$_('homepage.intro.titleFirst')} <span class="inner-text-special">{$_('homepage.intro.titleHighlight')}</span></h2>
        <p>
          {@html $_('homepage.intro.paragraph1')}
        </p>
        <p>
          {@html $_('homepage.intro.paragraph2')}
        </p>
        <p>
          {@html $_('homepage.intro.paragraph3')}
        </p>
      </div>
      <div>
        <div class="image-container">
          <div class="solution-image"></div>
        </div>
      </div>
      <div class="benefits col-span-full">
        <p class="w-full">
          {@html $_('homepage.intro.benefitsTitle')}
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
    <div class="flex flex-col items-center justify-center">
      <div class="massive-spacer"></div>
      <div class="intro m-auto max-w-5xl text-center">
        <h1 class="stay-dark">{$_('homepage.services.titleFirst')} <span class="inner-text-special">{$_('homepage.services.titleHighlight')}</span></h1>
        <p class="teaser stay-dark">
          {@html $_('homepage.services.subtitle')}
        </p>
      </div>
      <div class="spacer"></div>

      <!-- Services Grid with improved layout -->
      <div class="services-grid">
        <!-- Webseiten -->
        <div class="service-card">
          <div class="service-card-header">
            <div class="service-icon">🌐</div>
            <h3 class="no-padding">{$_('homepage.services.webseiten.title')}</h3>
          </div>
          <p class="no-padding">
            {@html $_('homepage.services.webseiten.description')}
          </p>
          <ul class="service-features">
            <li>{@html $_('homepage.services.webseiten.features.responsive')}</li>
            <li>{@html $_('homepage.services.webseiten.features.modern')}</li>
            <li>{@html $_('homepage.services.webseiten.features.performant')}</li>
            <li>{@html $_('homepage.services.webseiten.features.individuell')}</li>
            <li>{@html $_('homepage.services.webseiten.features.eigentum')}</li>
            <li>
              <span class="tooltip tooltip-secondary tooltip-left"
                ><span class="tooltip-content"
                  ><p class="no-padding p-2 text-sm">
                    {@html $_('homepage.services.webseiten.tooltip')}
                  </p></span
                >{@html $_('homepage.services.webseiten.features.keineFolgekosten')}</span
              >
            </li>
          </ul>
          <div class="service-card-actions push-right">
            <button class="btn btn-primary" onclick={() => goto('/get-started?projectType=website')}>{$_('homepage.services.webseiten.buttonText')}</button>
          </div>
        </div>

        <!-- Custom CMS -->
        <div class="service-card">
          <div class="service-card-header">
            <div class="service-icon">📝</div>
            <h3 class="no-padding">{$_('homepage.services.cms.title')}</h3>
          </div>
          <p class="no-padding">
            {@html $_('homepage.services.cms.description')}
          </p>
          <ul class="service-features">
            <li>{@html $_('homepage.services.cms.features.kontrolle')}</li>
            <li>
              <span class="tooltip tooltip-secondary tooltip-left"
                ><span class="tooltip-content"
                  ><p class="no-padding p-2 text-sm">
                    {@html $_('homepage.services.cms.features.datenstrukturenTooltip')}
                  </p></span
                >{@html $_('homepage.services.cms.features.datenstrukturen')}</span
              >
            </li>
            <li>{@html $_('homepage.services.cms.features.sicher')}</li>
            <li>{@html $_('homepage.services.cms.features.wartungsarm')}</li>
            <li>{@html $_('homepage.services.cms.features.editierbar')}</li>
            <li>{@html $_('homepage.services.cms.features.headless')}</li>
          </ul>
          <div class="service-card-actions push-right">
            <button class="btn btn-primary" onclick={() => goto('/get-started?projectType=cms')}>{$_('homepage.services.cms.buttonText')}</button>
          </div>
        </div>

        <!-- Webanwendungen -->
        <div class="service-card">
          <div class="service-card-header">
            <div class="service-icon">📱</div>
            <h3 class="no-padding">{$_('homepage.services.webanwendungen.title')}</h3>
          </div>
          <p class="no-padding">
            {@html $_('homepage.services.webanwendungen.description')}
          </p>
          <ul class="service-features">
            <li>{@html $_('homepage.services.webanwendungen.features.app')}</li>
            <li>{@html $_('homepage.services.webanwendungen.features.pwa')}</li>
            <li>{@html $_('homepage.services.webanwendungen.features.offline')}</li>
            <li>{@html $_('homepage.services.webanwendungen.features.push')}</li>
            <li>{@html $_('homepage.services.webanwendungen.features.appStores')}</li>
          </ul>
          <div class="service-card-actions push-right">
            <button class="btn btn-primary" onclick={() => goto('/get-started?projectType=webApplication')}>{$_('homepage.services.webanwendungen.buttonText')}</button>
          </div>
        </div>

        <!-- Freestyle -->
        <div class="service-card freestyle">
          <div class="service-card-header">
            <div class="service-icon">⚙️</div>
            <h3 class="no-padding">{$_('homepage.services.freestyle.title')}</h3>
          </div>
          <p class="no-padding">
            {@html $_('homepage.services.freestyle.description')}
          </p>
          <div class="service-examples">
            <span class="example-tag">{$_('homepage.services.freestyle.examples.event')}</span>
            <span class="example-tag">{$_('homepage.services.freestyle.examples.dashboard')}</span>
            <span class="example-tag">{$_('homepage.services.freestyle.examples.api')}</span>
            <span class="example-tag">{$_('homepage.services.freestyle.examples.module')}</span>
            <span class="example-tag">{$_('homepage.services.freestyle.examples.ui')}</span>
          </div>
          <div class="service-card-actions push-right">
            <button class="btn btn-primary" onclick={() => goto('/get-started?projectType=freestyle')}>{$_('homepage.services.freestyle.buttonText')}</button>
          </div>
        </div>

        <!-- KI Services - spans full width -->
        <div class="service-card lg:col-span-2">
          <div class="service-card-header">
            <div class="service-icon">🤖</div>
            <h3 class="no-padding">{$_('homepage.services.ki.title')}</h3>
          </div>

          <p>
            {@html $_('homepage.services.ki.description')}
          </p>

          <div class="service-list">
            <div class="service-item">
              <div class="service-icon">🧠</div>
              <div>
                <h4 class="no-padding">{$_('homepage.services.ki.services.beratung.title')}</h4>
                <div class="tiny-spacer"></div>
                <p class="no-padding">{$_('homepage.services.ki.services.beratung.description')}</p>
              </div>
            </div>
            <div class="service-item">
              <div class="service-icon">🤖</div>
              <div>
                <h4 class="no-padding">{$_('homepage.services.ki.services.agenten.title')}</h4>
                <div class="tiny-spacer"></div>
                <p class="no-padding">{$_('homepage.services.ki.services.agenten.description')}</p>
              </div>
            </div>
            <div class="service-item">
              <div class="service-icon">⚡</div>
              <div>
                <h4 class="no-padding">{$_('homepage.services.ki.services.workflow.title')}</h4>
                <div class="tiny-spacer"></div>
                <p class="no-padding">{$_('homepage.services.ki.services.workflow.description')}</p>
              </div>
            </div>
            <div class="service-item">
              <div class="service-icon">🏗️</div>
              <div>
                <h4 class="no-padding">{$_('homepage.services.ki.services.infrastructure.title')}</h4>
                <div class="tiny-spacer"></div>
                <p class="no-padding">{$_('homepage.services.ki.services.infrastructure.description')}</p>
              </div>
            </div>
          </div>
          <div class="service-card-actions push-right">
            <button class="btn btn-primary" onclick={() => goto('/get-started?projectType=artificialIntelligence')}>{$_('homepage.services.ki.buttonText')}</button>
          </div>
        </div>
      </div>
    </div>
  </Section>

  <Section>
    <div class="balance-section">
      <div class="massive-spacer"></div>
      <div class="intro m-auto max-w-5xl text-center">
        <h1 class="stay-dark">{$_('homepage.balance.titleFirst')} <span class="inner-text-special">{$_('homepage.balance.titleHighlight')}</span></h1>
        <p class="teaser stay-dark">
          {@html $_('homepage.balance.subtitleFirst')} <button
            class="text-link-button"
            onclick={openPhilosophyModal}>{$_('homepage.balance.subtitleSecond')}</button
          > {@html $_('homepage.balance.subtitleThird')}
        </p>
      </div>
      <div class="spacer"></div>

      <div class="balance-grid">
        <!-- Zeit -->
        <div class="balance-card">
          <div class="balance-icon">⚡</div>
          <div class="balance-content">
            <h3>{$_('homepage.balance.zeit.title')}</h3>
            <p>
              {@html $_('homepage.balance.zeit.description')} <button class="text-link-button inverted-underline" onclick={openZeitModal}>{$_('homepage.balance.zeit.buttonText')}</button>
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

        <!-- Kosten -->
        <div class="balance-card">
          <div class="balance-icon">💰</div>
          <div class="balance-content">
            <h3>{$_('homepage.balance.kosten.title')}</h3>
            <p>
              {@html $_('homepage.balance.kosten.description')} <button class="text-link-button inverted-underline" onclick={openKostenModal}>{$_('homepage.balance.kosten.buttonText')}</button>
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

        <!-- Qualität -->
        <div class="balance-card">
          <div class="balance-icon">🏆</div>
          <div class="balance-content">
            <h3>{$_('homepage.balance.qualitaet.title')}</h3>
            <p>
              {@html $_('homepage.balance.qualitaet.description')} <button class="text-link-button inverted-underline" onclick={openQualitaetModal}>{$_('homepage.balance.qualitaet.buttonText')}</button>
            </p>
            <div class="tech-stack">
              <img src="icons/tech-logos/node-js-logo.svg" alt="Node.js" class="tech-logo" />
              <img src="icons/tech-logos/svelte-logo.svg" alt="Svelte" class="tech-logo smaller" />
              <img src="icons/tech-logos/typescript-logo.svg" alt="TypeScript" class="tech-logo smaller" />
              <img src="icons/tech-logos/GitHub-logo.svg" alt="GitHub" class="tech-logo" />
              <img src="icons/tech-logos/netlify-logo.svg" alt="Netlify" class="tech-logo long" />
              <img src="icons/tech-logos/tailwindcss-logo.svg" alt="TailwindCSS" class="tech-logo long" />
              <img src="icons/tech-logos/GraphQL-logo.svg" alt="GraphQL" class="tech-logo long" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </Section>

  <Section>
    <div class="features-section">
      <div class="massive-spacer"></div>
      <div class="intro m-auto max-w-5xl text-center">
        <h1 class="stay-dark">{$_('homepage.features.titleFirst')} <span class="inner-text-special">{$_('homepage.features.titleHighlight')}</span></h1>
        <p class="teaser stay-dark">{$_('homepage.features.subtitle')}</p>
      </div>
      <div class="spacer"></div>

      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon">🎯</div>
          <div class="feature-content">
            <h3>{$_('homepage.features.allesAusEinerHand.title')}</h3>
            <p>{$_('homepage.features.allesAusEinerHand.description')}</p>
            <ul class="feature-list">
              <li>{$_('homepage.features.allesAusEinerHand.features.konzeption')}</li>
              <li>{$_('homepage.features.allesAusEinerHand.features.design')}</li>
              <li>{$_('homepage.features.allesAusEinerHand.features.entwicklung')}</li>
              <li>{$_('homepage.features.allesAusEinerHand.features.hosting')}</li>
            </ul>
          </div>
        </div>

        <div class="feature-card">
          <div class="feature-icon">👤</div>
          <div class="feature-content">
            <h3>{$_('homepage.features.ansprechpartner.title')}</h3>
            <p>{$_('homepage.features.ansprechpartner.description')}</p>
            <div class="contact-info">
              <div class="contact-avatar">
              </div>
              <div class="contact-details">
                <strong>{$_('homepage.features.ansprechpartner.contact.title')}</strong>
                <p>{$_('homepage.features.ansprechpartner.contact.description')}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="feature-card">
          <div class="feature-icon">💎</div>
          <div class="feature-content">
            <h3>{$_('homepage.features.preise.title')}</h3>
            <p>{$_('homepage.features.preise.description')}</p>
            <div class="price-benefits">
              <div class="price-item">
                <span class="price-check">✓</span>
                <span>{$_('homepage.features.preise.benefits.sofort')}</span>
              </div>
              <div class="price-item">
                <span class="price-check">✓</span>
                <span>{$_('homepage.features.preise.benefits.keineVersteckten')}</span>
              </div>
              <div class="price-item">
                <span class="price-check">✓</span>
                <span>{$_('homepage.features.preise.benefits.keineFolgegebuehren')}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="feature-card">
          <div class="feature-icon">🛠️</div>
          <div class="feature-content">
            <h3>{$_('homepage.features.massgeschneidert.title')}</h3>
            <p>{$_('homepage.features.massgeschneidert.description')}</p>
            <div class="solution-types">
              <span class="solution-tag">{$_('homepage.features.massgeschneidert.types.individual')}</span>
              <span class="solution-tag">{$_('homepage.features.massgeschneidert.types.flexibel')}</span>
              <span class="solution-tag">{$_('homepage.features.massgeschneidert.types.skalierbar')}</span>
              <span class="solution-tag">{$_('homepage.features.massgeschneidert.types.zukunftssicher')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Section>

  <Section>
    <div class="cta-section">
      <div class="massive-spacer"></div>
      <div class="cta-content">
        <h1>{$_('homepage.cta.titleFirst')} <span class="inner-text-special">{$_('homepage.cta.titleHighlight')}</span></h1>
        <p class="cta-text">
          {@html $_('homepage.cta.description')}
        </p>

        <div class="cta-benefits">
          <div class="cta-benefit">
            <div class="benefit-icon">⚡</div>
            <div>
              <h4>{$_('homepage.cta.benefits.zeit.title')}</h4>
              <p>{$_('homepage.cta.benefits.zeit.description')}</p>
            </div>
          </div>
          <div class="cta-benefit">
            <div class="benefit-icon">🎯</div>
            <div>
              <h4>{$_('homepage.cta.benefits.massgeschneidert.title')}</h4>
              <p>{$_('homepage.cta.benefits.massgeschneidert.description')}</p>
            </div>
          </div>
          <div class="cta-benefit">
            <div class="benefit-icon">🤝</div>
            <div>
              <h4>{$_('homepage.cta.benefits.kontakt.title')}</h4>
              <p>{$_('homepage.cta.benefits.kontakt.description')}</p>
            </div>
          </div>
        </div>

        <div class="cta-buttons">
          <button
            class="btn-basic cta-primary"
            onclick={() => {
              goto('/get-started');
            }}
          >
            {$_('homepage.cta.buttonText')}
          </button>
          <button class="btn btn-outline btn-lg px-8 py-4" onclick={() => goto('/faq')}> {$_('homepage.cta.faqButtonText')} </button>
        </div>

        <p class="cta-note">
          {@html $_('homepage.cta.note')}
        </p>
      </div>
      <div class="massive-spacer"></div>
    </div>
  </Section>

  <section class="direct-section hidden">
    {#each data.contents as snippet}
      <h2>{snippet.headline}</h2>
      <h4>{snippet.subheadline}</h4>
      <div>{@html renderMarkdown(snippet.text)}</div>
      <div class="spacer"></div>
    {/each}
  </section>
</div>

<!-- Philosophy Modal -->
<RaspbPhilosophyModal bind:this={philosophyModal} />

<!-- Balance Modals -->
<!-- Zeit Modal -->
<dialog bind:this={zeitModal} class="modal">
  <div class="modal-box max-w-2xl">
    <form method="dialog">
      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    
    <div class="flex items-center gap-4 mb-6">
      <div class="text-5xl">⚡</div>
      <h2 class="text-2xl font-bold text-primary no-padding">{$_('homepage.balance.zeit.title')} - {$_('homepage.hero.titleHighlight')}</h2>
    </div>
    
    <div class="prose max-w-none">
      <p class="text-base leading-relaxed">
        {$_('homepage.balance.zeit.modal.paragraph1')}
      </p>
      
      <p class="text-base leading-relaxed">
        {$_('homepage.balance.zeit.modal.paragraph2')}
      </p>
      
      <p class="text-base leading-relaxed">
        {$_('homepage.balance.zeit.modal.paragraph3')}
      </p>
    </div>
  </div>
  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>

<!-- Kosten Modal -->
<dialog bind:this={kostenModal} class="modal">
  <div class="modal-box max-w-2xl">
    <form method="dialog">
      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    
    <div class="flex items-center gap-4 mb-6">
      <div class="text-5xl">💰</div>
      <h2 class="text-2xl font-bold text-primary no-padding">{$_('homepage.balance.kosten.title')} - {$_('homepage.hero.titleHighlight')}</h2>
    </div>
    
    <div class="prose max-w-none">
      <p class="text-base leading-relaxed">
        {$_('homepage.balance.kosten.modal.paragraph1')}
      </p>
      
      <p class="text-base leading-relaxed">
        {$_('homepage.balance.kosten.modal.paragraph2')}
      </p>
      
      <p class="text-base leading-relaxed">
        {$_('homepage.balance.kosten.modal.paragraph3')}
      </p>
    </div>
  </div>
  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>

<!-- Qualität Modal -->
<dialog bind:this={qualitaetModal} class="modal">
  <div class="modal-box max-w-2xl">
    <form method="dialog">
      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    
    <div class="flex items-center gap-4 mb-6">
      <div class="text-5xl">🏆</div>
      <h2 class="text-2xl font-bold text-primary no-padding">{$_('homepage.balance.qualitaet.title')} - {$_('homepage.hero.titleHighlight')}</h2>
    </div>
    
    <div class="prose max-w-none">
      <p class="text-base leading-relaxed">
        {$_('homepage.balance.qualitaet.modal.paragraph1')}
      </p>
      
      <p class="text-base leading-relaxed">
        {$_('homepage.balance.qualitaet.modal.paragraph2')}
      </p>
      
      <p class="text-base leading-relaxed">
        {$_('homepage.balance.qualitaet.modal.paragraph3')}
      </p>
    </div>
  </div>
  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>

<style lang="postcss">
  @reference '../app.css';

  .home-content-wrapper {
    .direct-section {
      @apply m-auto mb-10 w-full max-w-7xl p-4;
    }
    .benefits {
      @apply flex flex-wrap gap-2;
      .item {
        @apply text-mediumGrey bg-lightGrey w-fit rounded-lg p-2;
      }
    }
    .image-container {
      @apply relative aspect-[5/3] w-full overflow-hidden rounded-2xl shadow-2xl;
      .solution-image {
        @apply h-full w-full bg-cover bg-center bg-no-repeat;
        background-image: url('/images/visualization-2.png');
      }
    }

    /* Services Grid Styles */
    .services-grid {
      @apply grid grid-cols-1 gap-6 lg:grid-cols-2;

      .service-card {
        @apply from-lightGrey/70 via-lightGrey/90 to-lightGrey/45 border-lightGrey/50 flex flex-col justify-between rounded-2xl border bg-gradient-to-br p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg;

        .service-card-header {
          @apply mb-4 flex min-w-full flex-wrap items-center gap-4;

          .service-icon {
            @apply text-4xl;
          }

          h3 {
            @apply text-darkGrey text-xl font-semibold;
          }
        }

        p {
          @apply text-neutral mb-4;
        }

        .service-features {
          @apply mb-6 space-y-2;

          li {
            @apply text-neutral flex items-start text-sm;

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
              @apply text-darkGrey font-semibold;
            }

            p {
              @apply text-neutral text-sm;
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

    /* Balance Section Styles */
    .balance-section {
      @apply flex flex-col items-center justify-center;

      .balance-grid {
        @apply grid grid-cols-1 gap-8 lg:grid-cols-3;

        .balance-card {
          @apply from-primary/5 to-secondary/5 rounded-2xl bg-gradient-to-br p-6 text-center;

          .balance-icon {
            @apply mb-4 text-5xl;
          }

          .balance-content {
            h3 {
              @apply text-darkGrey mb-4 text-xl font-semibold;
            }

            p {
              @apply text-neutral mb-4;
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
    }

    /* Features Section Styles */
    .features-section {
      @apply flex flex-col items-center justify-center;

      .features-grid {
        @apply grid grid-cols-1 gap-8 lg:grid-cols-2;

        .feature-card {
          @apply from-accent/5 to-secondary/5 rounded-2xl bg-gradient-to-br p-6;

          .feature-icon {
            @apply mb-4 text-4xl;
          }

          .feature-content {
            h3 {
              @apply text-darkGrey mb-3 text-xl font-semibold;
            }

            p {
              @apply text-neutral mb-4;
            }

            .feature-list {
              @apply space-y-2;

              li {
                @apply text-neutral flex items-center text-sm;

                &::before {
                  @apply from-accent to-secondary mr-3 h-2 w-2 min-w-2 rounded-full bg-gradient-to-r;
                  content: '';
                }
              }
            }

            .contact-info {
              @apply flex items-center gap-4;

              .contact-details {
                strong {
                  @apply text-darkGrey block font-semibold;
                }

                p {
                  @apply text-neutral text-sm;
                }
              }
            }

            .price-benefits {
              @apply space-y-2;

              .price-item {
                @apply flex items-center gap-3;

                .price-check {
                  @apply text-success text-lg font-bold;
                }

                span:last-child {
                  @apply text-neutral text-sm;
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
    }

    /* CTA Section Styles */
    .cta-section {
      @apply from-primary/5 via-secondary/5 to-accent/5 flex flex-col items-center justify-center rounded-3xl bg-gradient-to-br text-center;

      .cta-content {
        @apply max-w-4xl px-6;

        h1 {
          @apply text-darkGrey mb-6 text-4xl font-bold md:text-5xl;
        }

        .cta-text {
          @apply text-neutral mb-8 text-lg leading-relaxed;
        }

        .cta-benefits {
          @apply mb-8 grid grid-cols-1 gap-6 md:grid-cols-3;

          .cta-benefit {
            @apply flex items-start text-left;

            .benefit-icon {
              @apply mt-1 mr-4 text-3xl;
            }

            h4 {
              @apply text-darkGrey mb-1 font-semibold;
            }

            p {
              @apply text-neutral text-sm;
            }
          }
        }

        .cta-buttons {
          @apply mb-6 flex flex-col items-center justify-center gap-4 sm:flex-row;

          .cta-primary {
            @apply px-8 py-4 text-lg;
          }
        }

        .cta-note {
          @apply text-neutral bg-lightGrey/50 rounded-lg p-4 text-sm;
        }
      }
    }
  }
</style>
