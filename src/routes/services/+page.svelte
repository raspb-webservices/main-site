<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import Stage from '$lib/components/ui/stage.svelte';
  import Section from '$lib/components/section.svelte';
  import { goto } from '$app/navigation';
  import { _ } from 'svelte-i18n';

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

  function closeModal(modalId: string) {
    const modal = document.getElementById(modalId) as HTMLDialogElement;
    if (modal) {
      modal.close();
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
  <div class="inner-box reduced py-36">
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
    <div class="fade-in mr-8">
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
    <div class="service-header">
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
    <div class="service-header">
      <h1>{$_('servicesPage.cmsSection.titleFirst')} <span class="inner-text-special">{$_('servicesPage.cmsSection.titleHighlight')}</span></h1>
      <p class="teaser">
        {$_('servicesPage.cmsSection.teaser')}
      </p>
    </div>

    <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <!-- Einfache Inhaltsbearbeitung -->
      <div class="service-card large">
        <div class="service-card-content">
          <div class="service-card-header">
            <h3>{$_('servicesPage.cmsSection.simpleCms.title')}</h3>
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
        <div class="service-card-content">
          <div class="service-card-header">
            <h3>{$_('servicesPage.cmsSection.complexCms.title')}</h3>
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
        <div class="service-card-content">
          <div class="service-card-header">
            <h3>{$_('servicesPage.cmsSection.blogCms.title')}</h3>
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
        <div class="service-card-content">
          <div class="service-card-header">
            <h3>{$_('servicesPage.cmsSection.headlessCms.title')}</h3>
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
    <div class="service-header">
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
    <div class="service-header">
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
    <div class="service-header">
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
<Section noSpacing={true}>
  <div class="cta-section">
    <div class="cta-content">
      <div class="cta-content-inner">
        <h1>{$_('servicesPage.ctaSection.titleFirst')} <span class="inner-text-special">{$_('servicesPage.ctaSection.titleHighlight')}</span>?</h1>
        <p class="cta-text no-padding">
          {$_('servicesPage.ctaSection.teaser')}
        </p>

        <div class="cta-benefits">
          <div class="cta-benefit">
            <div class="benefit-icon">{$_('servicesPage.ctaSection.benefits.benefit1.icon')}</div>
            <div>
              <h4>{$_('servicesPage.ctaSection.benefits.benefit1.title')}</h4>
              <p class="no-padding">{$_('servicesPage.ctaSection.benefits.benefit1.description')}</p>
            </div>
          </div>
          <div class="cta-benefit">
            <div class="benefit-icon">{$_('servicesPage.ctaSection.benefits.benefit2.icon')}</div>
            <div>
              <h4>{$_('servicesPage.ctaSection.benefits.benefit2.title')}</h4>
              <p class="no-padding">{$_('servicesPage.ctaSection.benefits.benefit2.description')}</p>
            </div>
          </div>
          <div class="cta-benefit">
            <div class="benefit-icon">{$_('servicesPage.ctaSection.benefits.benefit3.icon')}</div>
            <div>
              <h4>{$_('servicesPage.ctaSection.benefits.benefit3.title')}</h4>
              <p class="no-padding">{$_('servicesPage.ctaSection.benefits.benefit3.description')}</p>
            </div>
          </div>
        </div>

        <div class="cta-buttons">
          <button
            class="btn-basic"
            onclick={() => {
              goto('/get-started');
            }}
          >
            {$_('servicesPage.ctaSection.button1')}
          </button>
          <button class="btn btn-outline btn-lg px-8 py-4" onclick={() => goto('/faq')}> {$_('servicesPage.ctaSection.button2')} </button>
        </div>

        <p class="cta-note no-padding">
          {@html $_('servicesPage.ctaSection.note')}
        </p>
      </div>
    </div>
  </div>
</Section>

<!-- DaisyUI Modals for detailed information -->
<!-- One-Page Websites Modal -->
<dialog id="modal-onepage" class="modal">
  <div class="modal-box">
    <h3 class="mb-4 text-lg font-bold">{$_('servicesPage.modals.onePage.title')}</h3>
    <div class="space-y-4">
      <p><strong>{$_('servicesPage.modals.onePage.perfectFor')}</strong> {$_('servicesPage.modals.onePage.perfectForDescription')}</p>
      <p>
        {$_('servicesPage.modals.onePage.paragraph1')}
      </p>
      <p>
        {$_('servicesPage.modals.onePage.paragraph2')}
      </p>
      <p>
        {$_('servicesPage.modals.onePage.paragraph3')}
      </p>

      <div>
        <h4 class="mb-2 font-semibold">{$_('servicesPage.modals.onePage.servicesDetailTitle')}</h4>
        <ul class="list-inside list-disc space-y-1">
          <li>{$_('servicesPage.modals.onePage.servicesDetails.d1')}</li>
          <li>{$_('servicesPage.modals.onePage.servicesDetails.d2')}</li>
          <li>{$_('servicesPage.modals.onePage.servicesDetails.d3')}</li>
          <li>{$_('servicesPage.modals.onePage.servicesDetails.d4')}</li>
          <li>{$_('servicesPage.modals.onePage.servicesDetails.d5')}</li>
          <li>{$_('servicesPage.modals.onePage.servicesDetails.d6')}</li>
        </ul>
      </div>
      <div class="spacer"></div>
      <div>
        <h4 class="mb-2 font-semibold">{$_('servicesPage.modals.onePage.technicalFeaturesTitle')}</h4>
        <ul class="list-inside list-disc space-y-1">
          <li>{$_('servicesPage.modals.onePage.technicalFeatures.t1')}</li>
          <li>{$_('servicesPage.modals.onePage.technicalFeatures.t2')}</li>
          <li>{$_('servicesPage.modals.onePage.technicalFeatures.t3')}</li>
        </ul>
      </div>

      <div class="bg-base-200 rounded-lg p-4">
        <p class="text-sm"><strong>{$_('servicesPage.modals.onePage.projectDuration')}</strong> {$_('servicesPage.modals.onePage.projectDurationValue')}</p>
        <p class="text-sm"><strong>{$_('servicesPage.modals.onePage.maintenance')}</strong> {$_('servicesPage.modals.onePage.maintenanceValue')}</p>
      </div>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">{$_('servicesPage.modals.onePage.closeButton')}</button>
      </form>
    </div>
  </div>
</dialog>

<!-- Landing Pages Modal -->
<dialog id="modal-landing" class="modal">
  <div class="modal-box">
    <h3 class="mb-4 text-lg font-bold">{$_('servicesPage.modals.landingPages.title')}</h3>
    <div class="space-y-4">
      <p><strong>{$_('servicesPage.modals.landingPages.perfectFor')}</strong> {$_('servicesPage.modals.landingPages.perfectForDescription')}</p>

      <div>
        <h4 class="mb-2 font-semibold">{$_('servicesPage.modals.landingPages.conversionOptimizationTitle')}</h4>
        <ul class="list-inside list-disc space-y-1">
          <li>{$_('servicesPage.modals.landingPages.conversionOptimization.c1')}</li>
          <li>{$_('servicesPage.modals.landingPages.conversionOptimization.c2')}</li>
          <li>{$_('servicesPage.modals.landingPages.conversionOptimization.c3')}</li>
          <li>{$_('servicesPage.modals.landingPages.conversionOptimization.c4')}</li>
          <li>{$_('servicesPage.modals.landingPages.conversionOptimization.c5')}</li>
        </ul>
      </div>

      <div>
        <h4 class="mb-2 font-semibold">{$_('servicesPage.modals.landingPages.marketingIntegrationTitle')}</h4>
        <ul class="list-inside list-disc space-y-1">
          <li>{$_('servicesPage.modals.landingPages.marketingIntegration.m1')}</li>
          <li>{$_('servicesPage.modals.landingPages.marketingIntegration.m2')}</li>
          <li>{$_('servicesPage.modals.landingPages.marketingIntegration.m3')}</li>
          <li>{$_('servicesPage.modals.landingPages.marketingIntegration.m4')}</li>
        </ul>
      </div>

      <div class="bg-base-200 rounded-lg p-4">
        <p class="text-sm">
          <strong>{$_('servicesPage.modals.landingPages.projectDuration')}</strong>
          {$_('servicesPage.modals.landingPages.projectDurationValue')}
        </p>
        <p class="text-sm"><strong>{$_('servicesPage.modals.landingPages.performance')}</strong> {$_('servicesPage.modals.landingPages.performanceValue')}</p>
      </div>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">{$_('servicesPage.modals.landingPages.closeButton')}</button>
      </form>
    </div>
  </div>
</dialog>

<!-- Corporate Websites Modal -->
<dialog id="modal-corporate" class="modal">
  <div class="modal-box">
    <h3 class="mb-4 text-lg font-bold">{$_('servicesPage.modals.corporateWebsites.title')}</h3>
    <div class="space-y-4">
      <p><strong>{$_('servicesPage.modals.corporateWebsites.perfectFor')}</strong> {$_('servicesPage.modals.corporateWebsites.perfectForDescription')}</p>

      <div>
        <h4 class="mb-2 font-semibold">{$_('servicesPage.modals.corporateWebsites.extensiveFeaturesTitle')}</h4>
        <ul class="list-inside list-disc space-y-1">
          <li>{$_('servicesPage.modals.corporateWebsites.extensiveFeatures.e1')}</li>
          <li>{$_('servicesPage.modals.corporateWebsites.extensiveFeatures.e2')}</li>
          <li>{$_('servicesPage.modals.corporateWebsites.extensiveFeatures.e3')}</li>
          <li>{$_('servicesPage.modals.corporateWebsites.extensiveFeatures.e4')}</li>
          <li>{$_('servicesPage.modals.corporateWebsites.extensiveFeatures.e5')}</li>
          <li>{$_('servicesPage.modals.corporateWebsites.extensiveFeatures.e6')}</li>
          <li>{$_('servicesPage.modals.corporateWebsites.extensiveFeatures.e7')}</li>
        </ul>
      </div>

      <div>
        <h4 class="mb-2 font-semibold">{$_('servicesPage.modals.corporateWebsites.advancedFunctionsTitle')}</h4>
        <ul class="list-inside list-disc space-y-1">
          <li>{$_('servicesPage.modals.corporateWebsites.advancedFunctions.a1')}</li>
          <li>{$_('servicesPage.modals.corporateWebsites.advancedFunctions.a2')}</li>
          <li>{$_('servicesPage.modals.corporateWebsites.advancedFunctions.a3')}</li>
          <li>{$_('servicesPage.modals.corporateWebsites.advancedFunctions.a4')}</li>
          <li>{$_('servicesPage.modals.corporateWebsites.advancedFunctions.a5')}</li>
        </ul>
      </div>

      <div class="bg-base-200 rounded-lg p-4">
        <p class="text-sm">
          <strong>{$_('servicesPage.modals.corporateWebsites.projectDuration')}</strong>
          {$_('servicesPage.modals.corporateWebsites.projectDurationValue')}
        </p>
        <p class="text-sm">
          <strong>{$_('servicesPage.modals.corporateWebsites.maintenance')}</strong>
          {$_('servicesPage.modals.corporateWebsites.maintenanceValue')}
        </p>
      </div>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">{$_('servicesPage.modals.corporateWebsites.closeButton')}</button>
      </form>
    </div>
  </div>
</dialog>

<!-- Simple CMS Modal -->
<dialog id="modal-simple-cms" class="modal">
  <div class="modal-box">
    <h3 class="mb-4 text-lg font-bold">{$_('servicesPage.modals.simpleCms.title')}</h3>
    <div class="space-y-4">
      <p><strong>{$_('servicesPage.modals.simpleCms.perfectFor')}</strong> {$_('servicesPage.modals.simpleCms.perfectForDescription')}</p>

      <div>
        <h4 class="mb-2 font-semibold">{$_('servicesPage.modals.simpleCms.userFriendlyFeaturesTitle')}</h4>
        <ul class="list-inside list-disc space-y-1">
          <li>{$_('servicesPage.modals.simpleCms.userFriendlyFeatures.u1')}</li>
          <li>{$_('servicesPage.modals.simpleCms.userFriendlyFeatures.u2')}</li>
          <li>{$_('servicesPage.modals.simpleCms.userFriendlyFeatures.u3')}</li>
          <li>{$_('servicesPage.modals.simpleCms.userFriendlyFeatures.u4')}</li>
          <li>{$_('servicesPage.modals.simpleCms.userFriendlyFeatures.u5')}</li>
          <li>{$_('servicesPage.modals.simpleCms.userFriendlyFeatures.u6')}</li>
        </ul>
      </div>

      <div>
        <h4 class="mb-2 font-semibold">{$_('servicesPage.modals.simpleCms.technicalDetailsTitle')}</h4>
        <ul class="list-inside list-disc space-y-1">
          <li>{$_('servicesPage.modals.simpleCms.technicalDetails.t1')}</li>
          <li>{$_('servicesPage.modals.simpleCms.technicalDetails.t2')}</li>
          <li>{$_('servicesPage.modals.simpleCms.technicalDetails.t3')}</li>
          <li>{$_('servicesPage.modals.simpleCms.technicalDetails.t4')}</li>
        </ul>
      </div>

      <div class="bg-base-200 rounded-lg p-4">
        <p class="text-sm"><strong>{$_('servicesPage.modals.simpleCms.setupTime')}</strong> {$_('servicesPage.modals.simpleCms.setupTimeValue')}</p>
        <p class="text-sm"><strong>{$_('servicesPage.modals.simpleCms.training')}</strong> {$_('servicesPage.modals.simpleCms.trainingValue')}</p>
      </div>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">{$_('servicesPage.modals.simpleCms.closeButton')}</button>
      </form>
    </div>
  </div>
</dialog>

<!-- Complex CMS Modal -->
<dialog id="modal-complex-cms" class="modal">
  <div class="modal-box">
    <h3 class="mb-4 text-lg font-bold">{$_('servicesPage.modals.complexCms.title')}</h3>
    <div class="space-y-4">
      <p><strong>{$_('servicesPage.modals.complexCms.perfectFor')}</strong> {$_('servicesPage.modals.complexCms.perfectForDescription')}</p>

      <div>
        <h4 class="mb-2 font-semibold">{$_('servicesPage.modals.complexCms.enterpriseFeaturesTitle')}</h4>
        <ul class="list-inside list-disc space-y-1">
          <li>{$_('servicesPage.modals.complexCms.enterpriseFeatures.e1')}</li>
          <li>{$_('servicesPage.modals.complexCms.enterpriseFeatures.e2')}</li>
          <li>{$_('servicesPage.modals.complexCms.enterpriseFeatures.e3')}</li>
          <li>{$_('servicesPage.modals.complexCms.enterpriseFeatures.e4')}</li>
          <li>{$_('servicesPage.modals.complexCms.enterpriseFeatures.e5')}</li>
          <li>{$_('servicesPage.modals.complexCms.enterpriseFeatures.e6')}</li>
        </ul>
      </div>

      <div>
        <h4 class="mb-2 font-semibold">{$_('servicesPage.modals.complexCms.scalabilityTitle')}</h4>
        <ul class="list-inside list-disc space-y-1">
          <li>{$_('servicesPage.modals.complexCms.scalability.s1')}</li>
          <li>{$_('servicesPage.modals.complexCms.scalability.s2')}</li>
          <li>{$_('servicesPage.modals.complexCms.scalability.s3')}</li>
          <li>{$_('servicesPage.modals.complexCms.scalability.s4')}</li>
        </ul>
      </div>

      <div class="bg-base-200 rounded-lg p-4">
        <p class="text-sm">
          <strong>{$_('servicesPage.modals.complexCms.projectDuration')}</strong>
          {$_('servicesPage.modals.complexCms.projectDurationValue')}
        </p>
        <p class="text-sm"><strong>{$_('servicesPage.modals.complexCms.support')}</strong> {$_('servicesPage.modals.complexCms.supportValue')}</p>
      </div>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">{$_('servicesPage.modals.complexCms.closeButton')}</button>
      </form>
    </div>
  </div>
</dialog>

<!-- Blog CMS Modal -->
<dialog id="modal-blog-cms" class="modal">
  <div class="modal-box">
    <h3 class="mb-4 text-lg font-bold">{$_('servicesPage.modals.blogCms.title')}</h3>
    <div class="space-y-4">
      <p><strong>{$_('servicesPage.modals.blogCms.perfectFor')}</strong> {$_('servicesPage.modals.blogCms.perfectForDescription')}</p>

      <div>
        <h4 class="mb-2 font-semibold">{$_('servicesPage.modals.blogCms.contentOptimizedFeaturesTitle')}</h4>
        <ul class="list-inside list-disc space-y-1">
          <li>{$_('servicesPage.modals.blogCms.contentOptimizedFeatures.c1')}</li>
          <li>{$_('servicesPage.modals.blogCms.contentOptimizedFeatures.c2')}</li>
          <li>{$_('servicesPage.modals.blogCms.contentOptimizedFeatures.c3')}</li>
          <li>{$_('servicesPage.modals.blogCms.contentOptimizedFeatures.c4')}</li>
          <li>{$_('servicesPage.modals.blogCms.contentOptimizedFeatures.c5')}</li>
          <li>{$_('servicesPage.modals.blogCms.contentOptimizedFeatures.c6')}</li>
        </ul>
      </div>

      <div>
        <h4 class="mb-2 font-semibold">{$_('servicesPage.modals.blogCms.monetizationTitle')}</h4>
        <ul class="list-inside list-disc space-y-1">
          <li>{$_('servicesPage.modals.blogCms.monetization.m1')}</li>
          <li>{$_('servicesPage.modals.blogCms.monetization.m2')}</li>
          <li>{$_('servicesPage.modals.blogCms.monetization.m3')}</li>
          <li>{$_('servicesPage.modals.blogCms.monetization.m4')}</li>
        </ul>
      </div>

      <div class="bg-base-200 rounded-lg p-4">
        <p class="text-sm"><strong>{$_('servicesPage.modals.blogCms.projectDuration')}</strong> {$_('servicesPage.modals.blogCms.projectDurationValue')}</p>
        <p class="text-sm"><strong>{$_('servicesPage.modals.blogCms.contentMigration')}</strong> {$_('servicesPage.modals.blogCms.contentMigrationValue')}</p>
      </div>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">{$_('servicesPage.modals.blogCms.closeButton')}</button>
      </form>
    </div>
  </div>
</dialog>

<!-- Headless CMS Modal -->
<dialog id="modal-headless-cms" class="modal">
  <div class="modal-box">
    <h3 class="mb-4 text-lg font-bold">{$_('servicesPage.modals.headlessCms.title')}</h3>
    <div class="space-y-4">
      <p><strong>{$_('servicesPage.modals.headlessCms.perfectFor')}</strong> {$_('servicesPage.modals.headlessCms.perfectForDescription')}</p>

      <div>
        <h4 class="mb-2 font-semibold">{$_('servicesPage.modals.headlessCms.apiFirstTitle')}</h4>
        <ul class="list-inside list-disc space-y-1">
          <li>{$_('servicesPage.modals.headlessCms.apiFirst.a1')}</li>
          <li>{$_('servicesPage.modals.headlessCms.apiFirst.a2')}</li>
          <li>{$_('servicesPage.modals.headlessCms.apiFirst.a3')}</li>
          <li>{$_('servicesPage.modals.headlessCms.apiFirst.a4')}</li>
          <li>{$_('servicesPage.modals.headlessCms.apiFirst.a5')}</li>
          <li>{$_('servicesPage.modals.headlessCms.apiFirst.a6')}</li>
        </ul>
      </div>

      <div>
        <h4 class="mb-2 font-semibold">{$_('servicesPage.modals.headlessCms.useCasesTitle')}</h4>
        <ul class="list-inside list-disc space-y-1">
          <li>{$_('servicesPage.modals.headlessCms.useCases.u1')}</li>
          <li>{$_('servicesPage.modals.headlessCms.useCases.u2')}</li>
          <li>{$_('servicesPage.modals.headlessCms.useCases.u3')}</li>
          <li>{$_('servicesPage.modals.headlessCms.useCases.u4')}</li>
        </ul>
      </div>

      <div class="bg-base-200 rounded-lg p-4">
        <p class="text-sm">
          <strong>{$_('servicesPage.modals.headlessCms.projectDuration')}</strong>
          {$_('servicesPage.modals.headlessCms.projectDurationValue')}
        </p>
        <p class="text-sm"><strong>{$_('servicesPage.modals.headlessCms.technology')}</strong> {$_('servicesPage.modals.headlessCms.technologyValue')}</p>
      </div>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">{$_('servicesPage.modals.headlessCms.closeButton')}</button>
      </form>
    </div>
  </div>
</dialog>

<!-- Web Apps Modal -->
<dialog id="modal-web-apps" class="modal">
  <div class="modal-box">
    <h3 class="mb-4 text-lg font-bold">{$_('servicesPage.modals.webApps.title')}</h3>
    <div class="space-y-4">
      <p><strong>{$_('servicesPage.modals.webApps.perfectFor')}</strong> {$_('servicesPage.modals.webApps.perfectForDescription')}</p>

      <div>
        <h4 class="mb-2 font-semibold">{$_('servicesPage.modals.webApps.technicalAdvantagesTitle')}</h4>
        <ul class="list-inside list-disc space-y-1">
          <li>{$_('servicesPage.modals.webApps.technicalAdvantages.t1')}</li>
          <li>{$_('servicesPage.modals.webApps.technicalAdvantages.t2')}</li>
          <li>{$_('servicesPage.modals.webApps.technicalAdvantages.t3')}</li>
          <li>{$_('servicesPage.modals.webApps.technicalAdvantages.t4')}</li>
          <li>{$_('servicesPage.modals.webApps.technicalAdvantages.t5')}</li>
          <li>{$_('servicesPage.modals.webApps.technicalAdvantages.t6')}</li>
        </ul>
      </div>

      <div>
        <h4 class="mb-2 font-semibold">{$_('servicesPage.modals.webApps.exampleApplicationsTitle')}</h4>
        <ul class="list-inside list-disc space-y-1">
          <li>{$_('servicesPage.modals.webApps.exampleApplications.e1')}</li>
          <li>{$_('servicesPage.modals.webApps.exampleApplications.e2')}</li>
          <li>{$_('servicesPage.modals.webApps.exampleApplications.e3')}</li>
          <li>{$_('servicesPage.modals.webApps.exampleApplications.e4')}</li>
          <li>{$_('servicesPage.modals.webApps.exampleApplications.e5')}</li>
        </ul>
      </div>

      <div class="bg-base-200 rounded-lg p-4">
        <p class="text-sm"><strong>{$_('servicesPage.modals.webApps.projectDuration')}</strong> {$_('servicesPage.modals.webApps.projectDurationValue')}</p>
        <p class="text-sm"><strong>{$_('servicesPage.modals.webApps.technology')}</strong> {$_('servicesPage.modals.webApps.technologyValue')}</p>
      </div>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">{$_('servicesPage.modals.webApps.closeButton')}</button>
      </form>
    </div>
  </div>
</dialog>

<!-- PWA Modal -->
<dialog id="modal-pwa" class="modal">
  <div class="modal-box">
    <h3 class="mb-4 text-lg font-bold">{$_('servicesPage.modals.pwa.title')}</h3>
    <div class="space-y-4">
      <p><strong>{$_('servicesPage.modals.pwa.perfectFor')}</strong> {$_('servicesPage.modals.pwa.perfectForDescription')}</p>

      <div>
        <h4 class="mb-2 font-semibold">{$_('servicesPage.modals.pwa.appLikeFeaturesTitle')}</h4>
        <ul class="list-inside list-disc space-y-1">
          <li>{$_('servicesPage.modals.pwa.appLikeFeatures.a1')}</li>
          <li>{$_('servicesPage.modals.pwa.appLikeFeatures.a2')}</li>
          <li>{$_('servicesPage.modals.pwa.appLikeFeatures.a3')}</li>
          <li>{$_('servicesPage.modals.pwa.appLikeFeatures.a4')}</li>
          <li>{$_('servicesPage.modals.pwa.appLikeFeatures.a5')}</li>
          <li>{$_('servicesPage.modals.pwa.appLikeFeatures.a6')}</li>
        </ul>
      </div>

      <div>
        <h4 class="mb-2 font-semibold">{$_('servicesPage.modals.pwa.technicalFeaturesTitle')}</h4>
        <ul class="list-inside list-disc space-y-1">
          <li>{$_('servicesPage.modals.pwa.technicalFeatures.t1')}</li>
          <li>{$_('servicesPage.modals.pwa.technicalFeatures.t2')}</li>
          <li>{$_('servicesPage.modals.pwa.technicalFeatures.t3')}</li>
          <li>{$_('servicesPage.modals.pwa.technicalFeatures.t4')}</li>
          <li>{$_('servicesPage.modals.pwa.technicalFeatures.t5')}</li>
        </ul>
      </div>

      <div class="bg-base-200 rounded-lg p-4">
        <p class="text-sm"><strong>{$_('servicesPage.modals.pwa.projectDuration')}</strong> {$_('servicesPage.modals.pwa.projectDurationValue')}</p>
        <p class="text-sm"><strong>{$_('servicesPage.modals.pwa.advantage')}</strong> {$_('servicesPage.modals.pwa.advantageValue')}</p>
      </div>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">{$_('servicesPage.modals.pwa.closeButton')}</button>
      </form>
    </div>
  </div>
</dialog>

<!-- Native Apps Modal -->
<dialog id="modal-native-apps" class="modal">
  <div class="modal-box">
    <h3 class="mb-4 text-lg font-bold">{$_('servicesPage.modals.nativeApps.title')}</h3>
    <div class="space-y-4">
      <p><strong>{$_('servicesPage.modals.nativeApps.perfectFor')}</strong> {$_('servicesPage.modals.nativeApps.perfectForDescription')}</p>

      <div>
        <h4 class="mb-2 font-semibold">{$_('servicesPage.modals.nativeApps.nativeAdvantagesTitle')}</h4>
        <ul class="list-inside list-disc space-y-1">
          <li>{$_('servicesPage.modals.nativeApps.nativeAdvantages.n1')}</li>
          <li>{$_('servicesPage.modals.nativeApps.nativeAdvantages.n2')}</li>
          <li>{$_('servicesPage.modals.nativeApps.nativeAdvantages.n3')}</li>
          <li>{$_('servicesPage.modals.nativeApps.nativeAdvantages.n4')}</li>
          <li>{$_('servicesPage.modals.nativeApps.nativeAdvantages.n5')}</li>
          <li>{$_('servicesPage.modals.nativeApps.nativeAdvantages.n6')}</li>
        </ul>
      </div>

      <div>
        <h4 class="mb-2 font-semibold">{$_('servicesPage.modals.nativeApps.developmentApproachTitle')}</h4>
        <ul class="list-inside list-disc space-y-1">
          <li>{$_('servicesPage.modals.nativeApps.developmentApproach.d1')}</li>
          <li>{$_('servicesPage.modals.nativeApps.developmentApproach.d2')}</li>
          <li>{$_('servicesPage.modals.nativeApps.developmentApproach.d3')}</li>
          <li>{$_('servicesPage.modals.nativeApps.developmentApproach.d4')}</li>
        </ul>
      </div>

      <div class="bg-base-200 rounded-lg p-4">
        <p class="text-sm">
          <strong>{$_('servicesPage.modals.nativeApps.projectDuration')}</strong>
          {$_('servicesPage.modals.nativeApps.projectDurationValue')}
        </p>
        <p class="text-sm"><strong>{$_('servicesPage.modals.nativeApps.appStore')}</strong> {$_('servicesPage.modals.nativeApps.appStoreValue')}</p>
      </div>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">{$_('servicesPage.modals.nativeApps.closeButton')}</button>
      </form>
    </div>
  </div>
</dialog>

<!-- Complex Apps Modal -->
<dialog id="modal-complex-apps" class="modal">
  <div class="modal-box">
    <h3 class="mb-4 text-lg font-bold">{$_('servicesPage.modals.complexApps.title')}</h3>
    <div class="space-y-4">
      <p><strong>{$_('servicesPage.modals.complexApps.perfectFor')}</strong> {$_('servicesPage.modals.complexApps.perfectForDescription')}</p>

      <div>
        <h4 class="mb-2 font-semibold">{$_('servicesPage.modals.complexApps.enterpriseFeaturesTitle')}</h4>
        <ul class="list-inside list-disc space-y-1">
          <li>{$_('servicesPage.modals.complexApps.enterpriseFeatures.e1')}</li>
          <li>{$_('servicesPage.modals.complexApps.enterpriseFeatures.e2')}</li>
          <li>{$_('servicesPage.modals.complexApps.enterpriseFeatures.e3')}</li>
          <li>{$_('servicesPage.modals.complexApps.enterpriseFeatures.e4')}</li>
          <li>{$_('servicesPage.modals.complexApps.enterpriseFeatures.e5')}</li>
          <li>{$_('servicesPage.modals.complexApps.enterpriseFeatures.e6')}</li>
        </ul>
      </div>

      <div>
        <h4 class="mb-2 font-semibold">{$_('servicesPage.modals.complexApps.exampleSystemsTitle')}</h4>
        <ul class="list-inside list-disc space-y-1">
          <li>{$_('servicesPage.modals.complexApps.exampleSystems.e1')}</li>
          <li>{$_('servicesPage.modals.complexApps.exampleSystems.e2')}</li>
          <li>{$_('servicesPage.modals.complexApps.exampleSystems.e3')}</li>
          <li>{$_('servicesPage.modals.complexApps.exampleSystems.e4')}</li>
          <li>{$_('servicesPage.modals.complexApps.exampleSystems.e5')}</li>
        </ul>
      </div>

      <div class="bg-base-200 rounded-lg p-4">
        <p class="text-sm">
          <strong>{$_('servicesPage.modals.complexApps.projectDuration')}</strong>
          {$_('servicesPage.modals.complexApps.projectDurationValue')}
        </p>
        <p class="text-sm"><strong>{$_('servicesPage.modals.complexApps.support')}</strong> {$_('servicesPage.modals.complexApps.supportValue')}</p>
      </div>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">{$_('servicesPage.modals.complexApps.closeButton')}</button>
      </form>
    </div>
  </div>
</dialog>

<!-- Individual Development Modals -->
<dialog id="modal-components" class="modal">
  <div class="modal-box">
    <h3 class="mb-4 text-lg font-bold">{$_('servicesPage.modals.components.title')}</h3>
    <div class="space-y-4">
      <p><strong>{$_('servicesPage.modals.components.perfectFor')}</strong> {$_('servicesPage.modals.components.perfectForDescription')}</p>

      <div>
        <h4 class="mb-2 font-semibold">{$_('servicesPage.modals.components.componentTypesTitle')}</h4>
        <ul class="list-inside list-disc space-y-1">
          <li>{$_('servicesPage.modals.components.componentTypes.c1')}</li>
          <li>{$_('servicesPage.modals.components.componentTypes.c2')}</li>
          <li>{$_('servicesPage.modals.components.componentTypes.c3')}</li>
          <li>{$_('servicesPage.modals.components.componentTypes.c4')}</li>
          <li>{$_('servicesPage.modals.components.componentTypes.c5')}</li>
        </ul>
      </div>

      <div class="bg-base-200 rounded-lg p-4">
        <p class="text-sm">
          <strong>{$_('servicesPage.modals.components.projectDuration')}</strong>
          {$_('servicesPage.modals.components.projectDurationValue')}
        </p>
        <p class="text-sm"><strong>{$_('servicesPage.modals.components.integration')}</strong> {$_('servicesPage.modals.components.integrationValue')}</p>
      </div>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">{$_('servicesPage.modals.components.closeButton')}</button>
      </form>
    </div>
  </div>
</dialog>

<dialog id="modal-extensions" class="modal">
  <div class="modal-box">
    <h3 class="mb-4 text-lg font-bold">{$_('servicesPage.modals.extensions.title')}</h3>
    <div class="space-y-4">
      <p><strong>{$_('servicesPage.modals.extensions.perfectFor')}</strong> {$_('servicesPage.modals.extensions.perfectForDescription')}</p>

      <div>
        <h4 class="mb-2 font-semibold">{$_('servicesPage.modals.extensions.extensionServicesTitle')}</h4>
        <ul class="list-inside list-disc space-y-1">
          <li>{$_('servicesPage.modals.extensions.extensionServices.e1')}</li>
          <li>{$_('servicesPage.modals.extensions.extensionServices.e2')}</li>
          <li>{$_('servicesPage.modals.extensions.extensionServices.e3')}</li>
          <li>{$_('servicesPage.modals.extensions.extensionServices.e4')}</li>
          <li>{$_('servicesPage.modals.extensions.extensionServices.e5')}</li>
        </ul>
      </div>

      <div class="bg-base-200 rounded-lg p-4">
        <p class="text-sm">
          <strong>{$_('servicesPage.modals.extensions.projectDuration')}</strong>
          {$_('servicesPage.modals.extensions.projectDurationValue')}
        </p>
        <p class="text-sm"><strong>{$_('servicesPage.modals.extensions.compatibility')}</strong> {$_('servicesPage.modals.extensions.compatibilityValue')}</p>
      </div>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">{$_('servicesPage.modals.extensions.closeButton')}</button>
      </form>
    </div>
  </div>
</dialog>

<dialog id="modal-special-apps" class="modal">
  <div class="modal-box">
    <h3 class="mb-4 text-lg font-bold">{$_('servicesPage.modals.specialApps.title')}</h3>
    <div class="space-y-4">
      <p><strong>{$_('servicesPage.modals.specialApps.perfectFor')}</strong> {$_('servicesPage.modals.specialApps.perfectForDescription')}</p>

      <div>
        <h4 class="mb-2 font-semibold">{$_('servicesPage.modals.specialApps.applicationExamplesTitle')}</h4>
        <ul class="list-inside list-disc space-y-1">
          <li>{$_('servicesPage.modals.specialApps.applicationExamples.a1')}</li>
          <li>{$_('servicesPage.modals.specialApps.applicationExamples.a2')}</li>
          <li>{$_('servicesPage.modals.specialApps.applicationExamples.a3')}</li>
          <li>{$_('servicesPage.modals.specialApps.applicationExamples.a4')}</li>
          <li>{$_('servicesPage.modals.specialApps.applicationExamples.a5')}</li>
        </ul>
      </div>

      <div class="bg-base-200 rounded-lg p-4">
        <p class="text-sm">
          <strong>{$_('servicesPage.modals.specialApps.projectDuration')}</strong>
          {$_('servicesPage.modals.specialApps.projectDurationValue')}
        </p>
        <p class="text-sm"><strong>{$_('servicesPage.modals.specialApps.approach')}</strong> {$_('servicesPage.modals.specialApps.approachValue')}</p>
      </div>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">{$_('servicesPage.modals.specialApps.closeButton')}</button>
      </form>
    </div>
  </div>
</dialog>

<dialog id="modal-design" class="modal">
  <div class="modal-box">
    <h3 class="mb-4 text-lg font-bold">{$_('servicesPage.modals.design.title')}</h3>
    <div class="space-y-4">
      <p><strong>{$_('servicesPage.modals.design.perfectFor')}</strong> {$_('servicesPage.modals.design.perfectForDescription')}</p>

      <div>
        <h4 class="mb-2 font-semibold">{$_('servicesPage.modals.design.designServicesTitle')}</h4>
        <ul class="list-inside list-disc space-y-1">
          <li>{$_('servicesPage.modals.design.designServices.d1')}</li>
          <li>{$_('servicesPage.modals.design.designServices.d2')}</li>
          <li>{$_('servicesPage.modals.design.designServices.d3')}</li>
          <li>{$_('servicesPage.modals.design.designServices.d4')}</li>
          <li>{$_('servicesPage.modals.design.designServices.d5')}</li>
        </ul>
      </div>

      <div class="bg-base-200 rounded-lg p-4">
        <p class="text-sm"><strong>{$_('servicesPage.modals.design.projectDuration')}</strong> {$_('servicesPage.modals.design.projectDurationValue')}</p>
        <p class="text-sm"><strong>{$_('servicesPage.modals.design.tools')}</strong> {$_('servicesPage.modals.design.toolsValue')}</p>
      </div>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">{$_('servicesPage.modals.design.closeButton')}</button>
      </form>
    </div>
  </div>
</dialog>

<!-- KI Services Modals -->
<dialog id="modal-ki-beratung" class="modal">
  <div class="modal-box">
    <h3 class="mb-4 text-lg font-bold">{$_('servicesPage.modals.kiConsulting.title')}</h3>
    <div class="space-y-4">
      <p><strong>{$_('servicesPage.modals.kiConsulting.perfectFor')}</strong> {$_('servicesPage.modals.kiConsulting.perfectForDescription')}</p>

      <div>
        <h4 class="mb-2 font-semibold">{$_('servicesPage.modals.kiConsulting.consultingServicesTitle')}</h4>
        <ul class="list-inside list-disc space-y-1">
          <li>{$_('servicesPage.modals.kiConsulting.consultingServices.c1')}</li>
          <li>{$_('servicesPage.modals.kiConsulting.consultingServices.c2')}</li>
          <li>{$_('servicesPage.modals.kiConsulting.consultingServices.c3')}</li>
          <li>{$_('servicesPage.modals.kiConsulting.consultingServices.c4')}</li>
          <li>{$_('servicesPage.modals.kiConsulting.consultingServices.c5')}</li>
          <li>{$_('servicesPage.modals.kiConsulting.consultingServices.c6')}</li>
        </ul>
      </div>

      <div class="bg-base-200 rounded-lg p-4">
        <p class="text-sm">
          <strong>{$_('servicesPage.modals.kiConsulting.projectDuration')}</strong>
          {$_('servicesPage.modals.kiConsulting.projectDurationValue')}
        </p>
        <p class="text-sm"><strong>{$_('servicesPage.modals.kiConsulting.deliverable')}</strong> {$_('servicesPage.modals.kiConsulting.deliverableValue')}</p>
      </div>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">{$_('servicesPage.modals.kiConsulting.closeButton')}</button>
      </form>
    </div>
  </div>
</dialog>

<dialog id="modal-ki-agenten" class="modal">
  <div class="modal-box">
    <h3 class="mb-4 text-lg font-bold">{$_('servicesPage.modals.kiAgentDevelopment.title')}</h3>
    <div class="space-y-4">
      <p><strong>{$_('servicesPage.modals.kiAgentDevelopment.perfectFor')}</strong> {$_('servicesPage.modals.kiAgentDevelopment.perfectForDescription')}</p>

      <div>
        <h4 class="mb-2 font-semibold">{$_('servicesPage.modals.kiAgentDevelopment.agentTypesTitle')}</h4>
        <ul class="list-inside list-disc space-y-1">
          <li>{$_('servicesPage.modals.kiAgentDevelopment.agentTypes.a1')}</li>
          <li>{$_('servicesPage.modals.kiAgentDevelopment.agentTypes.a2')}</li>
          <li>{$_('servicesPage.modals.kiAgentDevelopment.agentTypes.a3')}</li>
          <li>{$_('servicesPage.modals.kiAgentDevelopment.agentTypes.a4')}</li>
          <li>{$_('servicesPage.modals.kiAgentDevelopment.agentTypes.a5')}</li>
          <li>{$_('servicesPage.modals.kiAgentDevelopment.agentTypes.a6')}</li>
        </ul>
      </div>

      <div class="bg-base-200 rounded-lg p-4">
        <p class="text-sm">
          <strong>{$_('servicesPage.modals.kiAgentDevelopment.projectDuration')}</strong>
          {$_('servicesPage.modals.kiAgentDevelopment.projectDurationValue')}
        </p>
        <p class="text-sm">
          <strong>{$_('servicesPage.modals.kiAgentDevelopment.training')}</strong>
          {$_('servicesPage.modals.kiAgentDevelopment.trainingValue')}
        </p>
      </div>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">{$_('servicesPage.modals.kiAgentDevelopment.closeButton')}</button>
      </form>
    </div>
  </div>
</dialog>

<dialog id="modal-workflow" class="modal">
  <div class="modal-box">
    <h3 class="mb-4 text-lg font-bold">{$_('servicesPage.modals.workflowOptimization.title')}</h3>
    <div class="space-y-4">
      <p><strong>{$_('servicesPage.modals.workflowOptimization.perfectFor')}</strong> {$_('servicesPage.modals.workflowOptimization.perfectForDescription')}</p>

      <div>
        <h4 class="mb-2 font-semibold">{$_('servicesPage.modals.workflowOptimization.optimizationAreasTitle')}</h4>
        <ul class="list-inside list-disc space-y-1">
          <li>{$_('servicesPage.modals.workflowOptimization.optimizationAreas.o1')}</li>
          <li>{$_('servicesPage.modals.workflowOptimization.optimizationAreas.o2')}</li>
          <li>{$_('servicesPage.modals.workflowOptimization.optimizationAreas.o3')}</li>
          <li>{$_('servicesPage.modals.workflowOptimization.optimizationAreas.o4')}</li>
          <li>{$_('servicesPage.modals.workflowOptimization.optimizationAreas.o5')}</li>
          <li>{$_('servicesPage.modals.workflowOptimization.optimizationAreas.o6')}</li>
        </ul>
      </div>

      <div>
        <h4 class="mb-2 font-semibold">{$_('servicesPage.modals.workflowOptimization.measurableBenefitsTitle')}</h4>
        <ul class="list-inside list-disc space-y-1">
          <li>{$_('servicesPage.modals.workflowOptimization.measurableBenefits.m1')}</li>
          <li>{$_('servicesPage.modals.workflowOptimization.measurableBenefits.m2')}</li>
          <li>{$_('servicesPage.modals.workflowOptimization.measurableBenefits.m3')}</li>
          <li>{$_('servicesPage.modals.workflowOptimization.measurableBenefits.m4')}</li>
        </ul>
      </div>

      <div class="bg-base-200 rounded-lg p-4">
        <p class="text-sm">
          <strong>{$_('servicesPage.modals.workflowOptimization.projectDuration')}</strong>
          {$_('servicesPage.modals.workflowOptimization.projectDurationValue')}
        </p>
        <p class="text-sm"><strong>{$_('servicesPage.modals.workflowOptimization.roi')}</strong> {$_('servicesPage.modals.workflowOptimization.roiValue')}</p>
      </div>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">{$_('servicesPage.modals.workflowOptimization.closeButton')}</button>
      </form>
    </div>
  </div>
</dialog>

<dialog id="modal-ai-infrastructure" class="modal">
  <div class="modal-box">
    <h3 class="mb-4 text-lg font-bold">{$_('servicesPage.modals.aiInfrastructure.title')}</h3>
    <div class="space-y-4">
      <p><strong>{$_('servicesPage.modals.aiInfrastructure.perfectFor')}</strong> {$_('servicesPage.modals.aiInfrastructure.perfectForDescription')}</p>

      <div>
        <h4 class="mb-2 font-semibold">{$_('servicesPage.modals.aiInfrastructure.serviceModelsTitle')}</h4>
        <ul class="list-inside list-disc space-y-1">
          <li>{$_('servicesPage.modals.aiInfrastructure.serviceModels.s1')}</li>
          <li>{$_('servicesPage.modals.aiInfrastructure.serviceModels.s2')}</li>
          <li>{$_('servicesPage.modals.aiInfrastructure.serviceModels.s3')}</li>
          <li>{$_('servicesPage.modals.aiInfrastructure.serviceModels.s4')}</li>
          <li>{$_('servicesPage.modals.aiInfrastructure.serviceModels.s5')}</li>
          <li>{$_('servicesPage.modals.aiInfrastructure.serviceModels.s6')}</li>
        </ul>
      </div>

      <div>
        <h4 class="mb-2 font-semibold">{$_('servicesPage.modals.aiInfrastructure.billingModelsTitle')}</h4>
        <ul class="list-inside list-disc space-y-1">
          <li>{$_('servicesPage.modals.aiInfrastructure.billingModels.b1')}</li>
          <li>{$_('servicesPage.modals.aiInfrastructure.billingModels.b2')}</li>
          <li>{$_('servicesPage.modals.aiInfrastructure.billingModels.b3')}</li>
          <li>{$_('servicesPage.modals.aiInfrastructure.billingModels.b4')}</li>
        </ul>
      </div>

      <div class="bg-base-200 rounded-lg p-4">
        <p class="text-sm">
          <strong>{$_('servicesPage.modals.aiInfrastructure.setupTime')}</strong>
          {$_('servicesPage.modals.aiInfrastructure.setupTimeValue')}
        </p>
        <p class="text-sm"><strong>{$_('servicesPage.modals.aiInfrastructure.scaling')}</strong> {$_('servicesPage.modals.aiInfrastructure.scalingValue')}</p>
      </div>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">{$_('servicesPage.modals.aiInfrastructure.closeButton')}</button>
      </form>
    </div>
  </div>
</dialog>

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
        @apply bg-base-100 text-base-content rounded-2xl p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:cursor-pointer hover:shadow-lg;

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
    @apply bg-base-100 text-base-content flex flex-col rounded-2xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg;

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

  .cta-section {
    @apply py-24;
    .cta-content {
      @apply bg-base-100 text-base-content flex w-full flex-col items-center justify-center rounded-3xl px-6 py-16 text-center;

      .cta-content-inner {
        @apply m-auto w-full max-w-4xl;
      }

      h1 {
        @apply mb-6 text-4xl font-bold md:text-5xl;
      }

      .cta-text {
        @apply text-base-content mb-14 text-lg leading-relaxed;
      }

      .cta-benefits {
        @apply mb-10 grid grid-cols-1 gap-6 md:grid-cols-3;

        .cta-benefit {
          @apply flex items-start rounded-2xl bg-white px-4 py-6 text-left;

          .benefit-icon {
            @apply mt-1 mr-4 text-3xl;
          }

          h4 {
            @apply mb-1 font-semibold;
          }

          p {
            @apply text-base-content text-sm;
          }
        }
      }

      .cta-buttons {
        @apply mb-6 flex flex-col items-center justify-center gap-4 sm:flex-row;
      }

      .cta-note {
        @apply text-base-content bg-base-200 rounded-lg p-4 text-sm;
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

  /* Modal Styles */
  .modal-box {
    @apply max-w-2xl;
  }
</style>
