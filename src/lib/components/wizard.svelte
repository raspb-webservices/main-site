<script lang="ts">
  const currentYear = new Date().getFullYear();
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import Infobox from './infobox.svelte';

  let current = $state('');

  let parentItemWebsites: HTMLElement,
    webvisitenkarteSubItem: HTMLElement,
    websiteSimpleSubItem: HTMLElement,
    websitePremiumSubItem: HTMLElement,
    cmsSimpleSubItem: HTMLElement,
    cmsPremiumSubItem: HTMLElement,
    parentItemWebshops: HTMLElement,
    webshopSetupSubItem: HTMLElement,
    webshopOptimierungSubItem: HTMLElement,
    webshopIndividualSubItem: HTMLElement,
    parentItemWebkampagne: HTMLElement,
    onlineCampaignSimpleSubItem: HTMLElement,
    onlineCampaignPremiumSubItem: HTMLElement,
    parentItemCustomApp: HTMLElement,
    pwaSubItem: HTMLElement,
    appExtendedSubItem: HTMLElement,
    parentItemIndividualentwicklung: HTMLElement,
    individualSubItem: HTMLElement,
    websiteExtensionSubItem: HTMLElement;

  onMount(() => {
    parentItemWebsites.querySelector('.item-header')?.addEventListener('click', toggleSubItems(parentItemWebsites));
    parentItemWebshops.querySelector('.item-header')?.addEventListener('click', toggleSubItems(parentItemWebshops));
    parentItemWebkampagne.querySelector('.item-header')?.addEventListener('click', toggleSubItems(parentItemWebkampagne));
    parentItemCustomApp.querySelector('.item-header')?.addEventListener('click', toggleSubItems(parentItemCustomApp));
    parentItemIndividualentwicklung.querySelector('.item-header')?.addEventListener('click', toggleSubItems(parentItemIndividualentwicklung));

    webvisitenkarteSubItem.addEventListener('click', selectSubItem(webvisitenkarteSubItem));
    websiteSimpleSubItem.addEventListener('click', selectSubItem(websiteSimpleSubItem));
    websitePremiumSubItem.addEventListener('click', selectSubItem(websitePremiumSubItem));
    cmsSimpleSubItem.addEventListener('click', selectSubItem(cmsSimpleSubItem));
    cmsPremiumSubItem.addEventListener('click', selectSubItem(cmsPremiumSubItem));

    webshopSetupSubItem.addEventListener('click', selectSubItem(webshopSetupSubItem));
    webshopOptimierungSubItem.addEventListener('click', selectSubItem(webshopOptimierungSubItem));
    webshopIndividualSubItem.addEventListener('click', selectSubItem(webshopIndividualSubItem));

    onlineCampaignSimpleSubItem.addEventListener('click', selectSubItem(onlineCampaignSimpleSubItem));
    onlineCampaignPremiumSubItem.addEventListener('click', selectSubItem(onlineCampaignPremiumSubItem));
  });

  function toggleSubItems(item: HTMLElement) {
    return () => {
      item.classList.toggle('active');
      const subItemWrapper = item.querySelector('.item-content') ?? ({} as HTMLElement);
      subItemWrapper.classList.toggle('hidden');
    };
  }

  function selectSubItem(item: HTMLElement) {
    return () => {
      current = item.id;
      unhighlightAll();
      item.classList.toggle('active');
    };
  }

  function unhighlightAll() {
    webvisitenkarteSubItem.classList.remove('active');
    websiteSimpleSubItem.classList.remove('active');
    websitePremiumSubItem.classList.remove('active');
    cmsSimpleSubItem.classList.remove('active');
    cmsPremiumSubItem.classList.remove('active');
    webshopSetupSubItem.classList.remove('active');
    webshopOptimierungSubItem.classList.remove('active');
    webshopIndividualSubItem.classList.remove('active');
    onlineCampaignSimpleSubItem.classList.remove('active');
    onlineCampaignPremiumSubItem.classList.remove('active');
  }
</script>

<section>
  <div class="inner-box">
    <h2>Was möchten Sie realisieren? {current}</h2>
    <div class="medium-spacer"></div>
    <div class="item-row">
      <div class="item" id="websites" bind:this={parentItemWebsites}>
        <div class="item-header">
          <h3>Ihr Auftritt im Internet (Unternehmens-, Vereins-, Stiftungs-Webseite)</h3>
        </div>
        <div class="item-content hidden">
          <div class="sub-item" id="webvisitenkarte" bind:this={webvisitenkarteSubItem}>
            <h3>Webvisitenkarte</h3>
            <p>Onepager mit Kontaktdaten, Öffnungszeiten, Leistungsversprechen</p>
            <p>Inklusive Hosting via netlify.app</p>
            <p>300 €</p>
          </div>
          <div class="sub-item" id="website-simple" bind:this={websiteSimpleSubItem}>
            <h3>Unternehmenswebsite - simple</h3>
            <p>bis zu 5 individuelle Seiten (z.B. Startseite, Wir über uns, unsere Leistungen / Produkte, Impressum/Datenschutz, Kontakt)</p>
            <p>rechtssicher mit Cookie Banner, etc.</p>
            <p>inkl. Netlify Sub-Domain mit Upgrade Möglichkeit auf eine Custom Domain.</p>
            <p>1500 €</p>
          </div>
          <div class="sub-item" id="website-premium" bind:this={websitePremiumSubItem}>
            <h3>Unternehmenswebsite - premium</h3>
            <p>Leistungsumfang von Unternehmenswebsite - simple</p>
            <p>10 weitere Unterseiten, die Sie frei bestimmen können</p>
            <p>Bildergallerien, Slider, erweitertes UI</p>
            <p>3500 €</p>
          </div>
          <div class="sub-item" id="cms-simple" bind:this={cmsSimpleSubItem}>
            <h3>Content Management System (CMS) - simple</h3>
            <p>Sie wollen die Inhalte auf ihrer Webseite selber verwalten?</p>
            <p>Gerne richten wir für Ihre bestehende Webseite bei uns, einen individuellen Zugriff auf einzelne Inhalte auf ihrer Webseite ein.</p>
            <p>Pflegen Sie bis zu 5 Seiten ganz individuell.</p>
            <p>Ein Nutzer + einfache Kurzanleitung als PDF, wie die Eingabemaske des CMS funktioniert.</p>
            <p>5000 € (Plus)</p>
          </div>
          <div class="sub-item" id="cms-premium" bind:this={cmsPremiumSubItem}>
            <h3>Content Management System (CMS) - premium</h3>
            <p>beliebige Content Strategie</p>
            <p>beliebig viele Seiten und Elemente editierbar</p>
            <p>beliebig viele Nutzer</p>
            <p>Preis auf Anfrage</p>
          </div>
          
          <div class="floating-sub-item">
            <div class="tiny-spacer"></div>
            <Infobox
              >Für komplexe Rollen und Berechtigungs Anforderungen sind U.U. externer Partner heranziehen, was die Projektzeiten verlängert und die Kosten
              steigert.</Infobox
            >
            <div class="spacer"></div>
            <p>Was brauchen Sie wirklich?</p>
          </div>
        </div>
      </div>

      <div class="item" id="webshops" bind:this={parentItemWebshops}>
        <div class="item-header">
          <h3>Ihre Webshop / Online-Store</h3>
        </div>
        <div class="item-content hidden">
          <div class="sub-item" id="webshop-setup" bind:this={webshopSetupSubItem}>
            <h3>Webshop Setup</h3>
            <p>...</p>
            <p>??? €</p>
          </div>
          <div class="sub-item" id="webshop-optimierung" bind:this={webshopOptimierungSubItem}>
            <h3>Webshop Optimierung</h3>
            <p>...</p>
            <p>??? €</p>
          </div>
          <div class="sub-item" id="webshop-individual" bind:this={webshopIndividualSubItem}>
            <h3>Webshop Individual Beratung</h3>
            <p>...</p>
            <p>??? €</p>
          </div>
        </div>
      </div>

      <div class="item" id="webkampagne" bind:this={parentItemWebkampagne}>
        <div class="item-header">
          <h3>Ihre Webkampagne</h3>
        </div>
        <div class="item-content hidden">
          <div class="sub-item" id="online-campaign-simple" bind:this={onlineCampaignSimpleSubItem}>
            <h3>Online Campaign - simple</h3>
            <p>Eine Landing Page mit einem einfachen Call-to-Action</p>
            <p>Sie bestimmen Inhalt, Bilder und die Farbgebung, Schrift...</p>
            <p>Es gibt ein einfaches Formular zum sicheren Erfassen von Daten (Registrierung, o.Ä.)</p>
            <p>Die gesammelten Daten werden am Ende der Kampagne als Excel-Liste zur Verfügung gestellt</p>
            <p>Custom Domain Inklusive</p>
            <p>3000 €</p>
          </div>
          <div class="sub-item" id="online-campaign-premium" bind:this={onlineCampaignPremiumSubItem}>
            <h3>Online Campaign - premium</h3>
            <p>Eine ausgefallene Landing Page mit weiteren, verteilten Inhalten z.B. in Modal-Dialogen</p>
            <p>Anspruchsvolles Formular mit mehreren Schritten, Fileupload, Terminwahl im Kalender-UI, usw.</p>
            <p>Komplette Desgign-Freiheit</p>
            <p>5000 € (Plus)</p>
          </div>
        </div>
      </div>


      <div class="item" id="webkampagne" bind:this={parentItemCustomApp}>
        <div class="item-header">
          <h3>Ihre Custom App</h3>
        </div>
        <div class="item-content hidden">
          <div class="sub-item" id="pwa" bind:this={pwaSubItem}>
            <h3>Webanwendung PWA</h3>
            <p>Ihre eigene kleine Webanwendung / PWA</p>
            <p>Es soll nicht das Schweizer Taschenmesser sein, sonder Ihre App macht eine Sache, aber diese richtig gut!</p>
            <p>Gekoppelt mit einer Content Strategie, könnte es eine kleine App für die Mitarbeiter sein. Sie loggen sich ein und bekommen kuratierte Inhalte präsentiert.</p>
            <p>Oder eine App, um ihre Inhalte auf ihrer Webseite bei uns editieren zu können. Oder oder oder... Sie entscheiden!</p>
            <p>10.000 €</p>
          </div>
          <div class="sub-item" id="pwa" bind:this={appExtendedSubItem}>
            <h3>App - extended</h3>
            <p>Je nach Nutzerbasis können auch laufende Kosten entstehen.</p>
            <p>Eine PWA kann von einem anderen Dienstleister Recht einfach in die App Stores gebraucht werden, was sie zu nativen Apps macht.</p>
            <p>auf Anfrage</p>
          </div>
        </div>
      </div>

      <div class="item" id="webkampagne" bind:this={parentItemIndividualentwicklung}>
        <div class="item-header">
          <h3>Individualentwicklung</h3>
        </div>
        <div class="item-content hidden">
          <div class="sub-item" id="pwa" bind:this={individualSubItem}>
            <h3>Was immer Sie brauchen</h3>
            <p>Sie liefern eine Schnittstelle (API) samt Dokumentation und wir bilden die Daten so ab, wie sie es wünschen.</p>
            <p>Brauchen Sie ein Dashboard? Oder ein kleines Webtool, welches eine Aufgabe erledigt. Müssen Daten manipuliert werden?</p>
            <p>Wir liefern die passende Anwendung</p>
            <p>Preis auf Anfrage</p>
          </div>
          <div class="sub-item" id="pwa" bind:this={websiteExtensionSubItem}>
            <h3>Extensions für bestehende Webseiten</h3>
            <p>Haben Sie bereits eine Webseite oder Anwendung von uns entwicklen lassen? Brauchen Sie nun eine neue Funktion oder eine grundlegende Änderung?</p>
            <p>Dank unseres Ansatzes ist das schnell und einfach möglich.</p>
            <p>Preis auf Anfrage</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<style lang="postcss">
  section {
    @apply h-full w-full rounded-xl bg-lightGrey p-6;

    .item-row {
      @apply flex flex-wrap justify-center;

      .item {
        @apply mb-4 flex flex-grow basis-full flex-wrap overflow-hidden rounded-xl border-2 border-primary text-left;

        .item-header {
          @apply w-full cursor-pointer p-4;
          &:hover {
            @apply bg-primary text-white;
            h3 {
              @apply text-white;
            }
          }
        }

        .item-content {
          @apply w-full;
          .sub-item {
            @apply m-4 flex-grow basis-full rounded-xl border-2 border-secondary p-4 text-left bg-white;
            h3,
              p {
                @apply text-darkGrey;
              }
            &:hover {
              @apply cursor-pointer bg-mediumGrey text-black;
            }
          }

          .floating-sub-item {
            @apply m-4;
          }
        }
      }
    }
  }
</style>
