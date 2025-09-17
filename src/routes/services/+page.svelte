<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { _ } from 'svelte-i18n';
  import Stage from '$lib/components/ui/stage.svelte';
  import Section from '$lib/components/ui/section.svelte';
  import CTABox from '$lib/components/snippets/cta-box.svelte'
  import OnePage from '$lib/components/modals/services/one-page.svelte';
  import LandingPage from '$lib/components/modals/services/landing-page.svelte';
  import CorporateWebsites from '$lib/components/modals/services/corporate-websites.svelte';
  import SimpleCms from '$lib/components/modals/services/simple-cms.svelte';
  import ComplexCms from '$lib/components/modals/services/complex-cms.svelte';
  import BlogCms from '$lib/components/modals/services/blog-cms.svelte';
  import HeadlessCms from '$lib/components/modals/services/headless-cms.svelte';
  import WebApps from '$lib/components/modals/services/web-apps.svelte';
  import Pwa from '$lib/components/modals/services/pwa.svelte';
  import NativeApps from '$lib/components/modals/services/native-apps.svelte';
  import ComplexApps from '$lib/components/modals/services/complex-apps.svelte';
  import FreestyleComponents from '$lib/components/modals/services/freestyle-components.svelte';
  import FreestyleDesign from '$lib/components/modals/services/freestyle-design.svelte';
  import FreestyleExtensions from '$lib/components/modals/services/freestyle-extensions.svelte';
  import FreestyleSpecialApps from '$lib/components/modals/services/freestyle-special-apps.svelte';
  import KIAgenten from '$lib/components/modals/services/ki-agenten.svelte';
  import KIBeratung from '$lib/components/modals/services/ki-beratung.svelte';
  import KIInfrastructure from '$lib/components/modals/services/ki-infrastructure.svelte';
  import KIWorkflows from '$lib/components/modals/services/ki-workflows.svelte';

  const handleHashChange = (event: HashChangeEvent) => {
    const newHash = new URL(event.newURL).hash.slice(1);
    setTimeout(() => {
      scrollToSection(newHash);
    }, 250);
  };

  function openModal(modalId: string) {
    const modal = document.getElementById(modalId) as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  }

  function scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  onMount(() => {
    const { hash } = document.location;
    const scrollTo = hash && document.getElementById(hash.slice(1));
    if (scrollTo)
      scrollTo.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
  });

  onDestroy(() => {
    window.removeEventListener('hashchange', handleHashChange);
  });
</script>

<svelte:head>
  <title>{$_('servicesPage.meta.title')}</title>
  <meta name="description" content={$_('servicesPage.meta.description')} />
</svelte:head>

<Stage style={'basic-gradient'}>
  <div class="inner-box reduced py-36 prose">
    <h1 class="massive animate-fade-in-up">{$_('servicesPage.hero.title')}</h1>
    <p class="teaser animate-fade-in-up">{$_('servicesPage.hero.subtitle')}</p>
    <button
      class="btn-basic animate-fade-in-from-side"
      onclick={() => {
        goto('/get-started');
      }}>{$_('servicesPage.hero.buttonText')}</button
    >
  </div>
</Stage>

<Section type={'centerTeaser'}>
  <div class="massive-spacer"></div>

  <div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-14">
    <div class="animate-fadeIn mr-8 prose">
      <h2>{$_('servicesPage.intro.titleFirst')} <span class="inner-text-special">{$_('servicesPage.intro.titleHighlight')}</span></h2>
      <p>
        {$_('servicesPage.intro.paragraph1')}
      </p>
      <p>
        {$_('servicesPage.intro.paragraph2')}
      </p>
      <div class="benefits">
        <div class="item">{$_('servicesPage.intro.benefits.benefit1')}</div>
        <div class="item">{$_('servicesPage.intro.benefits.benefit2')}</div>
        <div class="item">{$_('servicesPage.intro.benefits.benefit3')}</div>
        <div class="item">{$_('servicesPage.intro.benefits.benefit4')}</div>
        <div class="item">{$_('servicesPage.intro.benefits.benefit5')}</div>
        <div class="item">{$_('servicesPage.intro.benefits.benefit6')}</div>
      </div>
    </div>
    <div>
      <div class="image-container">
        <div class="services-image"></div>
      </div>
    </div>
  </div>
  <div class="massive-spacer"></div>
</Section>

<!-- Services Overview with Visual Highlight -->
<Section noSpacing={true}>
  <div class="service-overview-highlight">
    <div class="highlight-content">
      <h2 class="mb-8 text-center">
        {$_('servicesPage.categories.titleFirst')} <span class="inner-text-special">{$_('servicesPage.categories.titleHighlight')}</span>
      </h2>
      <div class="service-categories-grid">
        <button class="category-card" onclick={() => scrollToSection('webseiten-section')}>
          <div class="category-icon">🌐</div>
          <h3>{$_('servicesPage.categories.webseiten.title')}</h3>
          <p class="no-padding">{$_('servicesPage.categories.webseiten.description')}</p>
        </button>
        <button class="category-card" onclick={() => scrollToSection('cms-section')}>
          <div class="category-icon">📝</div>
          <h3>{$_('servicesPage.categories.contentManagement.title')}</h3>
          <p class="no-padding">{$_('servicesPage.categories.contentManagement.description')}</p>
        </button>
        <button class="category-card" onclick={() => scrollToSection('applications-section')}>
          <div class="category-icon">📱</div>
          <h3>{$_('servicesPage.categories.applications.title')}</h3>
          <p class="no-padding">{$_('servicesPage.categories.applications.description')}</p>
        </button>
        <button class="category-card" onclick={() => scrollToSection('individual-development-section')}>
          <div class="category-icon">⚙️</div>
          <h3>{$_('servicesPage.categories.freestyle.title')}</h3>
          <p class="no-padding">{$_('servicesPage.categories.freestyle.description')}</p>
        </button>
        <button class="category-card" onclick={() => scrollToSection('ki-services-section')}>
          <div class="category-icon">🤖</div>
          <h3>{$_('servicesPage.categories.aiServices.title')}</h3>
          <p class="no-padding">{$_('servicesPage.categories.aiServices.description')}</p>
        </button>
      </div>
    </div>
  </div>
</Section>

<!-- Webseiten Section -->
<Section noSpacing={true}>
  <div id="webseiten-section" class="service-section">
    <div class="service-header prose">
      <h1>{$_('servicesPage.webseitenSection.titleFirst')} <span class="inner-text-special">{$_('servicesPage.webseitenSection.titleHighlight')}</span></h1>
      <p class="teaser">
        {$_('servicesPage.webseitenSection.teaser')}
      </p>
    </div>

    <div class="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
      <!-- One-Page Websites -->
      <div class="service-card">
        <div class="service-card-content">
          <div class="service-card-header">
            <h3>{$_('servicesPage.webseitenSection.onePage.title')}</h3>
            <div class="service-icon">{$_('servicesPage.webseitenSection.onePage.icon')}</div>
          </div>
          <p>{$_('servicesPage.webseitenSection.onePage.description')}</p>
          <div class="service-highlights">
            <span class="highlight">{$_('servicesPage.webseitenSection.onePage.highlights.h1')}</span>
            <span class="highlight">{$_('servicesPage.webseitenSection.onePage.highlights.h2')}</span>
            <span class="highlight">{$_('servicesPage.webseitenSection.onePage.highlights.h3')}</span>
          </div>
          <button class="btn-outline-basic mt-3 ml-auto" onclick={() => openModal('modal-onepage')}>
            <div class="button-inner">{$_('servicesPage.webseitenSection.onePage.buttonText')}</div>
          </button>
        </div>
      </div>

      <!-- Landing Pages -->
      <div class="service-card">
        <div class="service-card-content">
          <div class="service-card-header">
            <h3>{$_('servicesPage.webseitenSection.landingPages.title')}</h3>
            <div class="service-icon">{$_('servicesPage.webseitenSection.landingPages.icon')}</div>
          </div>
          <p>{$_('servicesPage.webseitenSection.landingPages.description')}</p>
          <div class="service-highlights">
            <span class="highlight">{$_('servicesPage.webseitenSection.landingPages.highlights.h1')}</span>
            <span class="highlight">{$_('servicesPage.webseitenSection.landingPages.highlights.h2')}</span>
            <span class="highlight">{$_('servicesPage.webseitenSection.landingPages.highlights.h3')}</span>
          </div>
          <button class="btn-outline-basic mt-3 ml-auto" onclick={() => openModal('modal-landing')}>
            <div class="button-inner">{$_('servicesPage.webseitenSection.landingPages.buttonText')}</div>
          </button>
        </div>
      </div>

      <!-- Corporate Websites -->
      <div class="service-card">
        <div class="service-card-content">
          <div class="service-card-header">
            <h3>{$_('servicesPage.webseitenSection.corporateWebsites.title')}</h3>
            <div class="service-icon">{$_('servicesPage.webseitenSection.corporateWebsites.icon')}</div>
          </div>
          <p>{$_('servicesPage.webseitenSection.corporateWebsites.description')}</p>
          <div class="service-highlights">
            <span class="highlight">{$_('servicesPage.webseitenSection.corporateWebsites.highlights.h1')}</span>
            <span class="highlight">{$_('servicesPage.webseitenSection.corporateWebsites.highlights.h2')}</span>
            <span class="highlight">{$_('servicesPage.webseitenSection.corporateWebsites.highlights.h3')}</span>
          </div>
          <button class="btn-outline-basic mt-3 ml-auto" onclick={() => openModal('modal-corporate')}>
            <div class="button-inner">{$_('servicesPage.webseitenSection.corporateWebsites.buttonText')}</div>
          </button>
        </div>
      </div>
    </div>
  </div>
</Section>

<!-- CMS Section -->
<Section noSpacing={true}>
  <div id="cms-section" class="service-section">
    <div class="service-header prose">
      <h1>{$_('servicesPage.cmsSection.titleFirst')} <span class="inner-text-special">{$_('servicesPage.cmsSection.titleHighlight')}</span></h1>
      <p class="teaser">
        {$_('servicesPage.cmsSection.teaser')}
      </p>
    </div>

    <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <!-- Einfache Inhaltsbearbeitung -->
      <div class="service-card large">
        <div class="service-card-content prose">
          <div class="service-card-header">
            <h3 class="pt-2">{$_('servicesPage.cmsSection.simpleCms.title')}</h3>
            <div class="service-icon">{$_('servicesPage.cmsSection.simpleCms.icon')}</div>
          </div>
          <p>{$_('servicesPage.cmsSection.simpleCms.description')}</p>
          <div class="service-highlights">
            <span class="highlight">{$_('servicesPage.cmsSection.simpleCms.highlights.h1')}</span>
            <span class="highlight">{$_('servicesPage.cmsSection.simpleCms.highlights.h2')}</span>
            <span class="highlight">{$_('servicesPage.cmsSection.simpleCms.highlights.h3')}</span>
          </div>
          <button class="btn-outline-basic mt-3 ml-auto" onclick={() => openModal('modal-simple-cms')}>
            <div class="button-inner">{$_('servicesPage.cmsSection.simpleCms.buttonText')}</div>
          </button>
        </div>
      </div>

      <!-- Komplexe CMS-Systeme -->
      <div class="service-card large">
        <div class="service-card-content prose">
          <div class="service-card-header">
            <h3 class="pt-2">{$_('servicesPage.cmsSection.complexCms.title')}</h3>
            <div class="service-icon">{$_('servicesPage.cmsSection.complexCms.icon')}</div>
          </div>
          <p>{$_('servicesPage.cmsSection.complexCms.description')}</p>
          <div class="service-highlights">
            <span class="highlight">{$_('servicesPage.cmsSection.complexCms.highlights.h1')}</span>
            <span class="highlight">{$_('servicesPage.cmsSection.complexCms.highlights.h2')}</span>
            <span class="highlight">{$_('servicesPage.cmsSection.complexCms.highlights.h3')}</span>
          </div>
          <button class="btn-outline-basic mt-3 ml-auto" onclick={() => openModal('modal-complex-cms')}>
            <div class="button-inner">{$_('servicesPage.cmsSection.complexCms.buttonText')}</div>
          </button>
        </div>
      </div>

      <!-- Blog & Content-getriebene Websites -->
      <div class="service-card large">
        <div class="service-card-content prose">
          <div class="service-card-header">
            <h3 class="pt-2">{$_('servicesPage.cmsSection.blogCms.title')}</h3>
            <div class="service-icon">{$_('servicesPage.cmsSection.blogCms.icon')}</div>
          </div>
          <p>{$_('servicesPage.cmsSection.blogCms.description')}</p>
          <div class="service-highlights">
            <span class="highlight">{$_('servicesPage.cmsSection.blogCms.highlights.h1')}</span>
            <span class="highlight">{$_('servicesPage.cmsSection.blogCms.highlights.h2')}</span>
            <span class="highlight">{$_('servicesPage.cmsSection.blogCms.highlights.h3')}</span>
          </div>
          <button class="btn-outline-basic mt-3 ml-auto" onclick={() => openModal('modal-blog-cms')}>
            <div class="button-inner">{$_('servicesPage.cmsSection.blogCms.buttonText')}</div>
          </button>
        </div>
      </div>

      <!-- Headless CMS -->
      <div class="service-card large">
        <div class="service-card-content prose">
          <div class="service-card-header">
            <h3 class="pt-2">{$_('servicesPage.cmsSection.headlessCms.title')}</h3>
            <div class="service-icon">{$_('servicesPage.cmsSection.headlessCms.icon')}</div>
          </div>
          <p>{$_('servicesPage.cmsSection.headlessCms.description')}</p>
          <div class="service-highlights">
            <span class="highlight">{$_('servicesPage.cmsSection.headlessCms.highlights.h1')}</span>
            <span class="highlight">{$_('servicesPage.cmsSection.headlessCms.highlights.h2')}</span>
            <span class="highlight">{$_('servicesPage.cmsSection.headlessCms.highlights.h3')}</span>
          </div>
          <button class="btn-outline-basic mt-3 ml-auto" onclick={() => openModal('modal-headless-cms')}>
            <div class="button-inner">{$_('servicesPage.cmsSection.headlessCms.buttonText')}</div>
          </button>
        </div>
      </div>
    </div>
  </div>
</Section>

<!-- Applikationen Section -->
<Section noSpacing={true}>
  <div id="applications-section" class="service-section">
    <div class="service-header prose">
      <h1>
        {$_('servicesPage.applicationsSection.titleFirst')} <span class="inner-text-special">{$_('servicesPage.applicationsSection.titleHighlight')}</span>
      </h1>
      <p class="teaser">
        {$_('servicesPage.applicationsSection.teaser')}
      </p>
    </div>

    <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <!-- Web Applications -->
      <div class="service-card large">
        <div class="service-card-content">
          <div class="service-card-header">
            <h3>{$_('servicesPage.applicationsSection.webApps.title')}</h3>
            <div class="service-icon">{$_('servicesPage.applicationsSection.webApps.icon')}</div>
          </div>
          <p>{$_('servicesPage.applicationsSection.webApps.description')}</p>
          <div class="service-highlights">
            <span class="highlight">{$_('servicesPage.applicationsSection.webApps.highlights.h1')}</span>
            <span class="highlight">{$_('servicesPage.applicationsSection.webApps.highlights.h2')}</span>
            <span class="highlight">{$_('servicesPage.applicationsSection.webApps.highlights.h3')}</span>
          </div>
          <button class="btn-outline-basic mt-3 ml-auto" onclick={() => openModal('modal-web-apps')}>
            <div class="button-inner">{$_('servicesPage.applicationsSection.webApps.buttonText')}</div>
          </button>
        </div>
      </div>

      <!-- Progressive Web Apps -->
      <div class="service-card large">
        <div class="service-card-content">
          <div class="service-card-header">
            <h3>{$_('servicesPage.applicationsSection.pwa.title')}</h3>
            <div class="service-icon">{$_('servicesPage.applicationsSection.pwa.icon')}</div>
          </div>
          <p>{$_('servicesPage.applicationsSection.pwa.description')}</p>
          <div class="service-highlights">
            <span class="highlight">{$_('servicesPage.applicationsSection.pwa.highlights.h1')}</span>
            <span class="highlight">{$_('servicesPage.applicationsSection.pwa.highlights.h2')}</span>
            <span class="highlight">{$_('servicesPage.applicationsSection.pwa.highlights.h3')}</span>
          </div>
          <button class="btn-outline-basic mt-3 ml-auto" onclick={() => openModal('modal-pwa')}>
            <div class="button-inner">{$_('servicesPage.applicationsSection.pwa.buttonText')}</div>
          </button>
        </div>
      </div>

      <!-- Native Mobile Apps -->
      <div class="service-card large">
        <div class="service-card-content">
          <div class="service-card-header">
            <h3>{$_('servicesPage.applicationsSection.nativeApps.title')}</h3>
            <div class="service-icon">{$_('servicesPage.applicationsSection.nativeApps.icon')}</div>
          </div>
          <p>{$_('servicesPage.applicationsSection.nativeApps.description')}</p>
          <div class="service-highlights">
            <span class="highlight">{$_('servicesPage.applicationsSection.nativeApps.highlights.h1')}</span>
            <span class="highlight">{$_('servicesPage.applicationsSection.nativeApps.highlights.h2')}</span>
            <span class="highlight">{$_('servicesPage.applicationsSection.nativeApps.highlights.h3')}</span>
          </div>
          <button class="btn-outline-basic mt-3 ml-auto" onclick={() => openModal('modal-native-apps')}>
            <div class="button-inner">{$_('servicesPage.applicationsSection.nativeApps.buttonText')}</div>
          </button>
        </div>
      </div>

      <!-- Komplexe Anwendungen -->
      <div class="service-card large">
        <div class="service-card-content">
          <div class="service-card-header">
            <h3>{$_('servicesPage.applicationsSection.complexApps.title')}</h3>
            <div class="service-icon">{$_('servicesPage.applicationsSection.complexApps.icon')}</div>
          </div>
          <p>{$_('servicesPage.applicationsSection.complexApps.description')}</p>
          <div class="service-highlights">
            <span class="highlight">{$_('servicesPage.applicationsSection.complexApps.highlights.h1')}</span>
            <span class="highlight">{$_('servicesPage.applicationsSection.complexApps.highlights.h2')}</span>
            <span class="highlight">{$_('servicesPage.applicationsSection.complexApps.highlights.h3')}</span>
          </div>
          <button class="btn-outline-basic mt-3 ml-auto" onclick={() => openModal('modal-complex-apps')}>
            <div class="button-inner">{$_('servicesPage.applicationsSection.complexApps.buttonText')}</div>
          </button>
        </div>
      </div>
    </div>
  </div>
</Section>

<!-- Individualentwicklung Section -->
<Section noSpacing={true}>
  <div id="individual-development-section" class="service-section">
    <div class="service-header prose">
      <h1>
        {$_('servicesPage.individualDevelopmentSection.titleFirst')}<span class="inner-text-special"
          >{$_('servicesPage.individualDevelopmentSection.titleHighlight')}</span
        >
      </h1>
      <p class="teaser">
        {$_('servicesPage.individualDevelopmentSection.teaser')}
      </p>
    </div>

    <div class="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-4">
      <div class="service-card">
        <div class="service-card-content">
          <div class="service-card-header">
            <h3>{$_('servicesPage.individualDevelopmentSection.components.title')}</h3>
            <div class="service-icon">{$_('servicesPage.individualDevelopmentSection.components.icon')}</div>
          </div>
          <p>{$_('servicesPage.individualDevelopmentSection.components.description')}</p>
          <button class="btn-outline-basic mt-3 ml-auto" onclick={() => openModal('modal-components')}>
            <div class="button-inner">{$_('servicesPage.individualDevelopmentSection.components.buttonText')}</div>
          </button>
        </div>
      </div>

      <div class="service-card">
        <div class="service-card-content">
          <div class="service-card-header">
            <h3>{$_('servicesPage.individualDevelopmentSection.extensions.title')}</h3>
            <div class="service-icon">{$_('servicesPage.individualDevelopmentSection.extensions.icon')}</div>
          </div>
          <p>{$_('servicesPage.individualDevelopmentSection.extensions.description')}</p>
          <button class="btn-outline-basic mt-3 ml-auto" onclick={() => openModal('modal-extensions')}>
            <div class="button-inner">{$_('servicesPage.individualDevelopmentSection.extensions.buttonText')}</div>
          </button>
        </div>
      </div>

      <div class="service-card">
        <div class="service-card-content">
          <div class="service-card-header">
            <h3>{$_('servicesPage.individualDevelopmentSection.specialApps.title')}</h3>
            <div class="service-icon">{$_('servicesPage.individualDevelopmentSection.specialApps.icon')}</div>
          </div>
          <p>{$_('servicesPage.individualDevelopmentSection.specialApps.description')}</p>
          <button class="btn-outline-basic mt-3 ml-auto" onclick={() => openModal('modal-special-apps')}>
            <div class="button-inner">{$_('servicesPage.individualDevelopmentSection.specialApps.buttonText')}</div>
          </button>
        </div>
      </div>

      <div class="service-card">
        <div class="service-card-content">
          <div class="service-card-header">
            <h3>{$_('servicesPage.individualDevelopmentSection.design.title')}</h3>
            <div class="service-icon">{$_('servicesPage.individualDevelopmentSection.design.icon')}</div>
          </div>
          <p>{$_('servicesPage.individualDevelopmentSection.design.description')}</p>
          <button class="btn-outline-basic mt-3 ml-auto" onclick={() => openModal('modal-design')}>
            <div class="button-inner">{$_('servicesPage.individualDevelopmentSection.design.buttonText')}</div>
          </button>
        </div>
      </div>
    </div>
  </div>
</Section>

<!-- KI Services Section -->
<Section noSpacing={true}>
  <div id="ki-services-section" class="service-section">
    <div class="service-header prose">
      <h1>{$_('servicesPage.kiServicesSection.titleFirst')} <span class="inner-text-special">{$_('servicesPage.kiServicesSection.titleHighlight')}</span></h1>
      <p class="teaser">{$_('servicesPage.kiServicesSection.teaser')}</p>
    </div>

    <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <!-- KI Beratung & Support -->
      <div class="service-card large">
        <div class="service-card-content">
          <div class="service-card-header">
            <h3>{$_('servicesPage.kiServicesSection.consulting.title')}</h3>
            <div class="service-icon">{$_('servicesPage.kiServicesSection.consulting.icon')}</div>
          </div>
          <p>{$_('servicesPage.kiServicesSection.consulting.description')}</p>
          <div class="service-highlights">
            <span class="highlight">{$_('servicesPage.kiServicesSection.consulting.highlights.h1')}</span>
            <span class="highlight">{$_('servicesPage.kiServicesSection.consulting.highlights.h2')}</span>
            <span class="highlight">{$_('servicesPage.kiServicesSection.consulting.highlights.h3')}</span>
          </div>
          <button class="btn-outline-basic mt-3 ml-auto" onclick={() => openModal('modal-ki-beratung')}>
            <div class="button-inner">{$_('servicesPage.kiServicesSection.consulting.buttonText')}</div>
          </button>
        </div>
      </div>

      <!-- KI-Agenten Entwicklung -->
      <div class="service-card large">
        <div class="service-card-content">
          <div class="service-card-header">
            <h3>{$_('servicesPage.kiServicesSection.agentDevelopment.title')}</h3>
            <div class="service-icon">{$_('servicesPage.kiServicesSection.agentDevelopment.icon')}</div>
          </div>
          <p>{$_('servicesPage.kiServicesSection.agentDevelopment.description')}</p>
          <div class="service-highlights">
            <span class="highlight">{$_('servicesPage.kiServicesSection.agentDevelopment.highlights.h1')}</span>
            <span class="highlight">{$_('servicesPage.kiServicesSection.agentDevelopment.highlights.h2')}</span>
            <span class="highlight">{$_('servicesPage.kiServicesSection.agentDevelopment.highlights.h3')}</span>
          </div>
          <button class="btn-outline-basic mt-3 ml-auto" onclick={() => openModal('modal-ki-agenten')}>
            <div class="button-inner">{$_('servicesPage.kiServicesSection.agentDevelopment.buttonText')}</div>
          </button>
        </div>
      </div>

      <!-- Workflow-Optimierung -->
      <div class="service-card large">
        <div class="service-card-content">
          <div class="service-card-header">
            <h3>{$_('servicesPage.kiServicesSection.workflowOptimization.title')}</h3>
            <div class="service-icon">{$_('servicesPage.kiServicesSection.workflowOptimization.icon')}</div>
          </div>
          <p>{$_('servicesPage.kiServicesSection.workflowOptimization.description')}</p>
          <div class="service-highlights">
            <span class="highlight">{$_('servicesPage.kiServicesSection.workflowOptimization.highlights.h1')}</span>
            <span class="highlight">{$_('servicesPage.kiServicesSection.workflowOptimization.highlights.h2')}</span>
            <span class="highlight">{$_('servicesPage.kiServicesSection.workflowOptimization.highlights.h3')}</span>
          </div>
          <button class="btn-outline-basic mt-3 ml-auto" onclick={() => openModal('modal-workflow')}>
            <div class="button-inner">{$_('servicesPage.kiServicesSection.workflowOptimization.buttonText')}</div>
          </button>
        </div>
      </div>

      <!-- AI as Infrastructure -->
      <div class="service-card large">
        <div class="service-card-content">
          <div class="service-card-header">
            <h3>{$_('servicesPage.kiServicesSection.aiAsInfrastructure.title')}</h3>
            <div class="service-icon">{$_('servicesPage.kiServicesSection.aiAsInfrastructure.icon')}</div>
          </div>
          <p>{$_('servicesPage.kiServicesSection.aiAsInfrastructure.description')}</p>
          <div class="service-highlights">
            <span class="highlight">{$_('servicesPage.kiServicesSection.aiAsInfrastructure.highlights.h1')}</span>
            <span class="highlight">{$_('servicesPage.kiServicesSection.aiAsInfrastructure.highlights.h2')}</span>
            <span class="highlight">{$_('servicesPage.kiServicesSection.aiAsInfrastructure.highlights.h3')}</span>
          </div>
          <button class="btn-outline-basic mt-3 ml-auto" onclick={() => openModal('modal-ai-infrastructure')}>
            <div class="button-inner">{$_('servicesPage.kiServicesSection.aiAsInfrastructure.buttonText')}</div>
          </button>
        </div>
      </div>
    </div>
  </div>
</Section>

<!-- Call to Action Section -->
<Section>
  <CTABox variant="{'service'}"></CTABox>
</Section>

<!-- DaisyUI Modals for detailed information -->
<OnePage />
<LandingPage />
<CorporateWebsites />
<SimpleCms />
<ComplexCms />
<BlogCms />
<HeadlessCms />
<WebApps />
<Pwa />
<NativeApps />
<ComplexApps />
<FreestyleComponents />
<FreestyleDesign />
<FreestyleExtensions />
<FreestyleSpecialApps />
<KIAgenten />
<KIBeratung />
<KIInfrastructure />
<KIWorkflows />

<style lang="postcss">
  @reference '../../app.css';

  .service-overview-highlight {
    @apply from-primary/10 via-secondary/5 to-accent/10 mt-30 rounded-3xl bg-gradient-to-br py-16;

    .highlight-content {
      @apply mx-auto max-w-6xl px-6;

      h2 {
        @apply mb-12 text-4xl font-bold;
      }
    }

    .service-categories-grid {
      @apply grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-5;

      .category-card {
        @apply from-base-100 to-base-200 text-base-content flex cursor-pointer flex-col justify-between rounded-2xl border-0 bg-linear-to-tl p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg;

        .category-icon {
          @apply mb-4 text-4xl;
        }

        h3 {
          @apply mb-2 text-lg font-semibold;
        }

        p {
          @apply text-base-content mb-4 flex-grow text-sm;
        }
      }
    }
  }

  .service-section {
    @apply flex flex-col items-center justify-center pt-36 pb-12;

    .service-header {
      @apply m-auto mb-12 max-w-5xl text-center;
    }
  }

  .service-card {
    @apply from-base-100 to-base-200 text-base-content flex cursor-default flex-col justify-between rounded-2xl border-0 bg-linear-to-tl p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg;

    &.large {
      @apply min-h-[280px];
    }

    .service-card-content {
      @apply flex h-full flex-col;
    }

    .service-card-header {
      @apply mb-4 flex items-center justify-between;

      h3 {
        @apply text-xl font-semibold;
      }

      .service-icon {
        @apply text-3xl;
      }
    }

    p {
      @apply text-base-content mb-4 flex-grow;
    }

    .service-highlights {
      @apply mb-4 flex flex-wrap gap-2;

      .highlight {
        @apply bg-primary/10 text-primary rounded-full px-3 py-1 text-sm font-medium;
      }
    }
  }

  .benefits {
    @apply mt-4 flex flex-wrap gap-2;
    .item {
      @apply text-base-content bg-base-100 w-fit rounded-lg px-4 py-2 text-sm;
    }
  }

  .image-container {
    @apply relative aspect-[5/3] w-full overflow-hidden rounded-2xl shadow-2xl;
    .services-image {
      @apply h-full w-full bg-cover bg-center bg-no-repeat;
      background-image: url('/images/visualisation-1.jpg');
    }
  }
</style>
