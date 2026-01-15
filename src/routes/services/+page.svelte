<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { m } from '$lib/paraglide/messages';
  import Stage from '$lib/components/ui/stage.svelte';
  import Section from '$lib/components/ui/section.svelte';
  import CTABox from '$lib/components/snippets/cta-box.svelte';
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
  import { localizeHref } from '$lib/paraglide/runtime';

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
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  });
</script>

<svelte:head>
  <title>{m['servicesPage_meta_title']()}</title>
  <meta name="description" content={m['servicesPage_meta_description']()} />
</svelte:head>

<Stage style={'basic-gradient'}>
  <div class="inner-box reduced prose py-36">
    <h1 class="massive animate-fade-in-up">{m['servicesPage_hero_title']()}</h1>
    <p class="teaser animate-fade-in-up">{m['servicesPage_hero_subtitle']()}</p>
    <button
      class="btn-basic animate-fade-in-from-side"
      onclick={() => {
        goto(localizeHref('/wizard'));
      }}>{m['servicesPage_hero_buttonText']()}</button
    >
  </div>
</Stage>

<Section type={'centerTeaser'}>
  <div class="massive-spacer"></div>

  <div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-14">
    <div class="animate-fadeIn prose mr-8">
      <h2>{m['servicesPage_intro_titleFirst']()} <span class="inner-text-special">{m['servicesPage_intro_titleHighlight']()}</span></h2>
      <p>
        {m['servicesPage_intro_paragraph1']()}
      </p>
      <p>
        {m['servicesPage_intro_paragraph2']()}
      </p>
      <div class="benefits">
        <div class="item">{m['servicesPage_intro_benefits_benefit1']()}</div>
        <div class="item">{m['servicesPage_intro_benefits_benefit2']()}</div>
        <div class="item">{m['servicesPage_intro_benefits_benefit3']()}</div>
        <div class="item">{m['servicesPage_intro_benefits_benefit4']()}</div>
        <div class="item">{m['servicesPage_intro_benefits_benefit5']()}</div>
        <div class="item">{m['servicesPage_intro_benefits_benefit6']()}</div>
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
        {m['servicesPage_categories_titleFirst']()} <span class="inner-text-special">{m['servicesPage_categories_titleHighlight']()}</span>
      </h2>
      <div class="service-categories-grid">
        <button class="category-card" onclick={() => scrollToSection('webseiten-section')}>
          <div class="category-icon">🌐</div>
          <h3>{m['servicesPage_categories_webseiten_title']()}</h3>
          <p class="no-padding">{m['servicesPage_categories_webseiten_description']()}</p>
        </button>
        <button class="category-card" onclick={() => scrollToSection('cms-section')}>
          <div class="category-icon">📝</div>
          <h3>{m['servicesPage_categories_contentManagement_title']()}</h3>
          <p class="no-padding">{m['servicesPage_categories_contentManagement_description']()}</p>
        </button>
        <button class="category-card" onclick={() => scrollToSection('applications-section')}>
          <div class="category-icon">📱</div>
          <h3>{m['servicesPage_categories_applications_title']()}</h3>
          <p class="no-padding">{m['servicesPage_categories_applications_description']()}</p>
        </button>
        <button class="category-card" onclick={() => scrollToSection('individual-development-section')}>
          <div class="category-icon">⚙️</div>
          <h3>{m['servicesPage_categories_freestyle_title']()}</h3>
          <p class="no-padding">{m['servicesPage_categories_freestyle_description']()}</p>
        </button>
        <button class="category-card" onclick={() => scrollToSection('ki-services-section')}>
          <div class="category-icon">🤖</div>
          <h3>{m['servicesPage_categories_aiServices_title']()}</h3>
          <p class="no-padding">{m['servicesPage_categories_aiServices_description']()}</p>
        </button>
      </div>
    </div>
  </div>
</Section>

<!-- Webseiten Section -->
<Section noSpacing={true}>
  <div id="webseiten-section" class="service-section">
    <div class="service-header prose">
      <h1>{m['servicesPage_webseitenSection_titleFirst']()} <span class="inner-text-special">{m['servicesPage_webseitenSection_titleHighlight']()}</span></h1>
      <p class="teaser">
        {m['servicesPage_webseitenSection_teaser']()}
      </p>
    </div>

    <div class="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
      <!-- One-Page Websites -->
      <div class="service-card">
        <div class="service-card-content">
          <div class="service-card-header">
            <h3>{m['servicesPage_webseitenSection_onePage_title']()}</h3>
            <div class="service-icon">{m['servicesPage_webseitenSection_onePage_icon']()}</div>
          </div>
          <p>{m['servicesPage_webseitenSection_onePage_description']()}</p>
          <div class="service-highlights">
            <span class="highlight">{m['servicesPage_webseitenSection_onePage_highlights_h1']()}</span>
            <span class="highlight">{m['servicesPage_webseitenSection_onePage_highlights_h2']()}</span>
            <span class="highlight">{m['servicesPage_webseitenSection_onePage_highlights_h3']()}</span>
          </div>
          <button class="btn-outline-basic mt-3 ml-auto" onclick={() => openModal('modal-onepage')}>
            <div class="button-inner">{m['servicesPage_webseitenSection_onePage_buttonText']()}</div>
          </button>
        </div>
      </div>

      <!-- Landing Pages -->
      <div class="service-card">
        <div class="service-card-content">
          <div class="service-card-header">
            <h3>{m['servicesPage_webseitenSection_landingPages_title']()}</h3>
            <div class="service-icon">{m['servicesPage_webseitenSection_landingPages_icon']()}</div>
          </div>
          <p>{m['servicesPage_webseitenSection_landingPages_description']()}</p>
          <div class="service-highlights">
            <span class="highlight">{m['servicesPage_webseitenSection_landingPages_highlights_h1']()}</span>
            <span class="highlight">{m['servicesPage_webseitenSection_landingPages_highlights_h2']()}</span>
            <span class="highlight">{m['servicesPage_webseitenSection_landingPages_highlights_h3']()}</span>
          </div>
          <button class="btn-outline-basic mt-3 ml-auto" onclick={() => openModal('modal-landing')}>
            <div class="button-inner">{m['servicesPage_webseitenSection_landingPages_buttonText']()}</div>
          </button>
        </div>
      </div>

      <!-- Corporate Websites -->
      <div class="service-card">
        <div class="service-card-content">
          <div class="service-card-header">
            <h3>{m['servicesPage_webseitenSection_corporateWebsites_title']()}</h3>
            <div class="service-icon">{m['servicesPage_webseitenSection_corporateWebsites_icon']()}</div>
          </div>
          <p>{m['servicesPage_webseitenSection_corporateWebsites_description']()}</p>
          <div class="service-highlights">
            <span class="highlight">{m['servicesPage_webseitenSection_corporateWebsites_highlights_h1']()}</span>
            <span class="highlight">{m['servicesPage_webseitenSection_corporateWebsites_highlights_h2']()}</span>
            <span class="highlight">{m['servicesPage_webseitenSection_corporateWebsites_highlights_h3']()}</span>
          </div>
          <button class="btn-outline-basic mt-3 ml-auto" onclick={() => openModal('modal-corporate')}>
            <div class="button-inner">{m['servicesPage_webseitenSection_corporateWebsites_buttonText']()}</div>
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
      <h1>{m['servicesPage_cmsSection_titleFirst']()} <span class="inner-text-special">{m['servicesPage_cmsSection_titleHighlight']()}</span></h1>
      <p class="teaser">
        {m['servicesPage_cmsSection_teaser']()}
      </p>
    </div>

    <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <!-- Einfache Inhaltsbearbeitung -->
      <div class="service-card large">
        <div class="service-card-content prose">
          <div class="service-card-header">
            <h3 class="pt-2">{m['servicesPage_cmsSection_simpleCms_title']()}</h3>
            <div class="service-icon">{m['servicesPage_cmsSection_simpleCms_icon']()}</div>
          </div>
          <p>{m['servicesPage_cmsSection_simpleCms_description']()}</p>
          <div class="service-highlights">
            <span class="highlight">{m['servicesPage_cmsSection_simpleCms_highlights_h1']()}</span>
            <span class="highlight">{m['servicesPage_cmsSection_simpleCms_highlights_h2']()}</span>
            <span class="highlight">{m['servicesPage_cmsSection_simpleCms_highlights_h3']()}</span>
          </div>
          <button class="btn-outline-basic mt-3 ml-auto" onclick={() => openModal('modal-simple-cms')}>
            <div class="button-inner">{m['servicesPage_cmsSection_simpleCms_buttonText']()}</div>
          </button>
        </div>
      </div>

      <!-- Komplexe CMS-Systeme -->
      <div class="service-card large">
        <div class="service-card-content prose">
          <div class="service-card-header">
            <h3 class="pt-2">{m['servicesPage_cmsSection_complexCms_title']()}</h3>
            <div class="service-icon">{m['servicesPage_cmsSection_complexCms_icon']()}</div>
          </div>
          <p>{m['servicesPage_cmsSection_complexCms_description']()}</p>
          <div class="service-highlights">
            <span class="highlight">{m['servicesPage_cmsSection_complexCms_highlights_h1']()}</span>
            <span class="highlight">{m['servicesPage_cmsSection_complexCms_highlights_h2']()}</span>
            <span class="highlight">{m['servicesPage_cmsSection_complexCms_highlights_h3']()}</span>
          </div>
          <button class="btn-outline-basic mt-3 ml-auto" onclick={() => openModal('modal-complex-cms')}>
            <div class="button-inner">{m['servicesPage_cmsSection_complexCms_buttonText']()}</div>
          </button>
        </div>
      </div>

      <!-- Blog & Content-getriebene Websites -->
      <div class="service-card large">
        <div class="service-card-content prose">
          <div class="service-card-header">
            <h3 class="pt-2">{m['servicesPage_cmsSection_blogCms_title']()}</h3>
            <div class="service-icon">{m['servicesPage_cmsSection_blogCms_icon']()}</div>
          </div>
          <p>{m['servicesPage_cmsSection_blogCms_description']()}</p>
          <div class="service-highlights">
            <span class="highlight">{m['servicesPage_cmsSection_blogCms_highlights_h1']()}</span>
            <span class="highlight">{m['servicesPage_cmsSection_blogCms_highlights_h2']()}</span>
            <span class="highlight">{m['servicesPage_cmsSection_blogCms_highlights_h3']()}</span>
          </div>
          <button class="btn-outline-basic mt-3 ml-auto" onclick={() => openModal('modal-blog-cms')}>
            <div class="button-inner">{m['servicesPage_cmsSection_blogCms_buttonText']()}</div>
          </button>
        </div>
      </div>

      <!-- Headless CMS -->
      <div class="service-card large">
        <div class="service-card-content prose">
          <div class="service-card-header">
            <h3 class="pt-2">{m['servicesPage_cmsSection_headlessCms_title']()}</h3>
            <div class="service-icon">{m['servicesPage_cmsSection_headlessCms_icon']()}</div>
          </div>
          <p>{m['servicesPage_cmsSection_headlessCms_description']()}</p>
          <div class="service-highlights">
            <span class="highlight">{m['servicesPage_cmsSection_headlessCms_highlights_h1']()}</span>
            <span class="highlight">{m['servicesPage_cmsSection_headlessCms_highlights_h2']()}</span>
            <span class="highlight">{m['servicesPage_cmsSection_headlessCms_highlights_h3']()}</span>
          </div>
          <button class="btn-outline-basic mt-3 ml-auto" onclick={() => openModal('modal-headless-cms')}>
            <div class="button-inner">{m['servicesPage_cmsSection_headlessCms_buttonText']()}</div>
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
        {m['servicesPage_applicationsSection_titleFirst']()} <span class="inner-text-special">{m['servicesPage_applicationsSection_titleHighlight']()}</span>
      </h1>
      <p class="teaser">
        {m['servicesPage_applicationsSection_teaser']()}
      </p>
    </div>

    <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <!-- Web Applications -->
      <div class="service-card large">
        <div class="service-card-content">
          <div class="service-card-header">
            <h3>{m['servicesPage_applicationsSection_webApps_title']()}</h3>
            <div class="service-icon">{m['servicesPage_applicationsSection_webApps_icon']()}</div>
          </div>
          <p>{m['servicesPage_applicationsSection_webApps_description']()}</p>
          <div class="service-highlights">
            <span class="highlight">{m['servicesPage_applicationsSection_webApps_highlights_h1']()}</span>
            <span class="highlight">{m['servicesPage_applicationsSection_webApps_highlights_h2']()}</span>
            <span class="highlight">{m['servicesPage_applicationsSection_webApps_highlights_h3']()}</span>
          </div>
          <button class="btn-outline-basic mt-3 ml-auto" onclick={() => openModal('modal-web-apps')}>
            <div class="button-inner">{m['servicesPage_applicationsSection_webApps_buttonText']()}</div>
          </button>
        </div>
      </div>

      <!-- Progressive Web Apps -->
      <div class="service-card large">
        <div class="service-card-content">
          <div class="service-card-header">
            <h3>{m['servicesPage_applicationsSection_pwa_title']()}</h3>
            <div class="service-icon">{m['servicesPage_applicationsSection_pwa_icon']()}</div>
          </div>
          <p>{m['servicesPage_applicationsSection_pwa_description']()}</p>
          <div class="service-highlights">
            <span class="highlight">{m['servicesPage_applicationsSection_pwa_highlights_h1']()}</span>
            <span class="highlight">{m['servicesPage_applicationsSection_pwa_highlights_h2']()}</span>
            <span class="highlight">{m['servicesPage_applicationsSection_pwa_highlights_h3']()}</span>
          </div>
          <button class="btn-outline-basic mt-3 ml-auto" onclick={() => openModal('modal-pwa')}>
            <div class="button-inner">{m['servicesPage_applicationsSection_pwa_buttonText']()}</div>
          </button>
        </div>
      </div>

      <!-- Native Mobile Apps -->
      <div class="service-card large">
        <div class="service-card-content">
          <div class="service-card-header">
            <h3>{m['servicesPage_applicationsSection_nativeApps_title']()}</h3>
            <div class="service-icon">{m['servicesPage_applicationsSection_nativeApps_icon']()}</div>
          </div>
          <p>{m['servicesPage_applicationsSection_nativeApps_description']()}</p>
          <div class="service-highlights">
            <span class="highlight">{m['servicesPage_applicationsSection_nativeApps_highlights_h1']()}</span>
            <span class="highlight">{m['servicesPage_applicationsSection_nativeApps_highlights_h2']()}</span>
            <span class="highlight">{m['servicesPage_applicationsSection_nativeApps_highlights_h3']()}</span>
          </div>
          <button class="btn-outline-basic mt-3 ml-auto" onclick={() => openModal('modal-native-apps')}>
            <div class="button-inner">{m['servicesPage_applicationsSection_nativeApps_buttonText']()}</div>
          </button>
        </div>
      </div>

      <!-- Komplexe Anwendungen -->
      <div class="service-card large">
        <div class="service-card-content">
          <div class="service-card-header">
            <h3>{m['servicesPage_applicationsSection_complexApps_title']()}</h3>
            <div class="service-icon">{m['servicesPage_applicationsSection_complexApps_icon']()}</div>
          </div>
          <p>{m['servicesPage_applicationsSection_complexApps_description']()}</p>
          <div class="service-highlights">
            <span class="highlight">{m['servicesPage_applicationsSection_complexApps_highlights_h1']()}</span>
            <span class="highlight">{m['servicesPage_applicationsSection_complexApps_highlights_h2']()}</span>
            <span class="highlight">{m['servicesPage_applicationsSection_complexApps_highlights_h3']()}</span>
          </div>
          <button class="btn-outline-basic mt-3 ml-auto" onclick={() => openModal('modal-complex-apps')}>
            <div class="button-inner">{m['servicesPage_applicationsSection_complexApps_buttonText']()}</div>
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
        {m['servicesPage_individualDevelopmentSection_titleFirst']()}<span class="inner-text-special"
          >{m['servicesPage_individualDevelopmentSection_titleHighlight']()}</span
        >
      </h1>
      <p class="teaser">
        {m['servicesPage_individualDevelopmentSection_teaser']()}
      </p>
    </div>

    <div class="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-4">
      <div class="service-card">
        <div class="service-card-content">
          <div class="service-card-header">
            <h3>{m['servicesPage_individualDevelopmentSection_components_title']()}</h3>
            <div class="service-icon">{m['servicesPage_individualDevelopmentSection_components_icon']()}</div>
          </div>
          <p>{m['servicesPage_individualDevelopmentSection_components_description']()}</p>
          <button class="btn-outline-basic mt-3 ml-auto" onclick={() => openModal('modal-components')}>
            <div class="button-inner">{m['servicesPage_individualDevelopmentSection_components_buttonText']()}</div>
          </button>
        </div>
      </div>

      <div class="service-card">
        <div class="service-card-content">
          <div class="service-card-header">
            <h3>{m['servicesPage_individualDevelopmentSection_extensions_title']()}</h3>
            <div class="service-icon">{m['servicesPage_individualDevelopmentSection_extensions_icon']()}</div>
          </div>
          <p>{m['servicesPage_individualDevelopmentSection_extensions_description']()}</p>
          <button class="btn-outline-basic mt-3 ml-auto" onclick={() => openModal('modal-extensions')}>
            <div class="button-inner">{m['servicesPage_individualDevelopmentSection_extensions_buttonText']()}</div>
          </button>
        </div>
      </div>

      <div class="service-card">
        <div class="service-card-content">
          <div class="service-card-header">
            <h3>{m['servicesPage_individualDevelopmentSection_specialApps_title']()}</h3>
            <div class="service-icon">{m['servicesPage_individualDevelopmentSection_specialApps_icon']()}</div>
          </div>
          <p>{m['servicesPage_individualDevelopmentSection_specialApps_description']()}</p>
          <button class="btn-outline-basic mt-3 ml-auto" onclick={() => openModal('modal-special-apps')}>
            <div class="button-inner">{m['servicesPage_individualDevelopmentSection_specialApps_buttonText']()}</div>
          </button>
        </div>
      </div>

      <div class="service-card">
        <div class="service-card-content">
          <div class="service-card-header">
            <h3>{m['servicesPage_individualDevelopmentSection_design_title']()}</h3>
            <div class="service-icon">{m['servicesPage_individualDevelopmentSection_design_icon']()}</div>
          </div>
          <p>{m['servicesPage_individualDevelopmentSection_design_description']()}</p>
          <button class="btn-outline-basic mt-3 ml-auto" onclick={() => openModal('modal-design')}>
            <div class="button-inner">{m['servicesPage_individualDevelopmentSection_design_buttonText']()}</div>
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
      <h1>{m['servicesPage_kiServicesSection_titleFirst']()} <span class="inner-text-special">{m['servicesPage_kiServicesSection_titleHighlight']()}</span></h1>
      <p class="teaser">{m['servicesPage_kiServicesSection_teaser']()}</p>
    </div>

    <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <!-- KI Beratung & Support -->
      <div class="service-card large">
        <div class="service-card-content">
          <div class="service-card-header">
            <h3>{m['servicesPage_kiServicesSection_consulting_title']()}</h3>
            <div class="service-icon">{m['servicesPage_kiServicesSection_consulting_icon']()}</div>
          </div>
          <p>{m['servicesPage_kiServicesSection_consulting_description']()}</p>
          <div class="service-highlights">
            <span class="highlight">{m['servicesPage_kiServicesSection_consulting_highlights_h1']()}</span>
            <span class="highlight">{m['servicesPage_kiServicesSection_consulting_highlights_h2']()}</span>
            <span class="highlight">{m['servicesPage_kiServicesSection_consulting_highlights_h3']()}</span>
          </div>
          <button class="btn-outline-basic mt-3 ml-auto" onclick={() => openModal('modal-ki-beratung')}>
            <div class="button-inner">{m['servicesPage_kiServicesSection_consulting_buttonText']()}</div>
          </button>
        </div>
      </div>

      <!-- KI-Agenten Entwicklung -->
      <div class="service-card large">
        <div class="service-card-content">
          <div class="service-card-header">
            <h3>{m['servicesPage_kiServicesSection_agentDevelopment_title']()}</h3>
            <div class="service-icon">{m['servicesPage_kiServicesSection_agentDevelopment_icon']()}</div>
          </div>
          <p>{m['servicesPage_kiServicesSection_agentDevelopment_description']()}</p>
          <div class="service-highlights">
            <span class="highlight">{m['servicesPage_kiServicesSection_agentDevelopment_highlights_h1']()}</span>
            <span class="highlight">{m['servicesPage_kiServicesSection_agentDevelopment_highlights_h2']()}</span>
            <span class="highlight">{m['servicesPage_kiServicesSection_agentDevelopment_highlights_h3']()}</span>
          </div>
          <button class="btn-outline-basic mt-3 ml-auto" onclick={() => openModal('modal-ki-agenten')}>
            <div class="button-inner">{m['servicesPage_kiServicesSection_agentDevelopment_buttonText']()}</div>
          </button>
        </div>
      </div>

      <!-- Workflow-Optimierung -->
      <div class="service-card large">
        <div class="service-card-content">
          <div class="service-card-header">
            <h3>{m['servicesPage_kiServicesSection_workflowOptimization_title']()}</h3>
            <div class="service-icon">{m['servicesPage_kiServicesSection_workflowOptimization_icon']()}</div>
          </div>
          <p>{m['servicesPage_kiServicesSection_workflowOptimization_description']()}</p>
          <div class="service-highlights">
            <span class="highlight">{m['servicesPage_kiServicesSection_workflowOptimization_highlights_h1']()}</span>
            <span class="highlight">{m['servicesPage_kiServicesSection_workflowOptimization_highlights_h2']()}</span>
            <span class="highlight">{m['servicesPage_kiServicesSection_workflowOptimization_highlights_h3']()}</span>
          </div>
          <button class="btn-outline-basic mt-3 ml-auto" onclick={() => openModal('modal-workflow')}>
            <div class="button-inner">{m['servicesPage_kiServicesSection_workflowOptimization_buttonText']()}</div>
          </button>
        </div>
      </div>

      <!-- AI as Infrastructure -->
      <div class="service-card large">
        <div class="service-card-content">
          <div class="service-card-header">
            <h3>{m['servicesPage_kiServicesSection_aiAsInfrastructure_title']()}</h3>
            <div class="service-icon">{m['servicesPage_kiServicesSection_aiAsInfrastructure_icon']()}</div>
          </div>
          <p>{m['servicesPage_kiServicesSection_aiAsInfrastructure_description']()}</p>
          <div class="service-highlights">
            <span class="highlight">{m['servicesPage_kiServicesSection_aiAsInfrastructure_highlights_h1']()}</span>
            <span class="highlight">{m['servicesPage_kiServicesSection_aiAsInfrastructure_highlights_h2']()}</span>
            <span class="highlight">{m['servicesPage_kiServicesSection_aiAsInfrastructure_highlights_h3']()}</span>
          </div>
          <button class="btn-outline-basic mt-3 ml-auto" onclick={() => openModal('modal-ai-infrastructure')}>
            <div class="button-inner">{m['servicesPage_kiServicesSection_aiAsInfrastructure_buttonText']()}</div>
          </button>
        </div>
      </div>
    </div>
  </div>
</Section>

<!-- Call to Action Section -->
<Section>
  <CTABox variant={'service'}></CTABox>
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
