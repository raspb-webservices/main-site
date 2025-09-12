<script lang="ts">
  import { page } from '$app/state';
  import { goto } from '$app/navigation';
  import { locale, _ } from 'svelte-i18n';

  const currentYear = new Date().getFullYear();

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  function toggleLocale() {
    const newLocale = $locale === 'de' ? 'en' : 'de';
    locale.set(newLocale);
  }

  function gotoExternal(target:string) {
    window.open(target, "_blank");
  }

  const footerNav = [
    {
      title: 'Services',
      subItems: [
        { name: 'Webseiten', path: '/services#webseiten-section' },
        { name: 'Content Management Systeme', path: '/services#cms-section' },
        { name: 'Web- & Business-Anwendungen', path: '/services#applications-section' },
        { name: 'Freestyle Development', path: '/services#individual-development-section' },
        { name: 'KI Services & Use Cases', path: '/services#ki-services-section' }
      ]
    },
    {
      title: 'Einblicke',
      subItems: [
        { name: 'Technologie', path: '/insights#tech' },
        { name: 'Projektablauf', path: '/insights#project' },
        { name: 'Referenzen', path: '/insights#showcase' }
      ]
    },
    {
      title: 'Über uns',
      subItems: [
        { name: 'Das ist raspb', path: '/about-us#raspb' },
        { name: 'Unser KI Team', path: '/about-us#ai-team' }
      ]
    },
    { title: 'FAQ', path: '/faq' },
    { title: 'Kontakt', path: '/contact' },
    { title: 'Impressum', path: '/imprint' },
    { title: 'Datenschutz', path: '/privacy-notice' }
  ];
</script>

<footer>
  <div class="inner-box">
    <div class="top-row">
      <img src="/images/logo.png" alt="raspb Logo" class="h-20 w-auto" />
      <div class="line"></div>
      <div class="social-media-links">
        <button class="social-media-icon x" onclick={() => {gotoExternal('https://www.x.com')}} aria-label="X"></button>
        <button class="social-media-icon linkedin" onclick={() => {gotoExternal('https://www.linkedin.com')}} aria-label="LinkedIn"></button>
        <button class="social-media-icon instagram" onclick={() => {gotoExternal('https://www.instagram.com')}} aria-label="Instagram"></button>
        <button class="social-media-icon xing" onclick={() => {gotoExternal('https://www.xing.com')}} aria-label="Xing"></button>
        <button class="social-media-icon facebook" onclick={() => {gotoExternal('https://www.facebook.com')}} aria-label="Facebook"></button>
      </div>
    </div>

    <div class="footer-nav-wrapper">
      <div class="pre-column"></div>
      <div class="service-column">
        <h3>Services</h3>
        <div class="footer-nav-items">
          {#each footerNav[0].subItems as item}
            <button class="footer-nav-item" onclick={() => goto(item.path)}>
              {item.name}
            </button>
          {/each}
        </div>
      </div>
      <div class="insights-column">
        <h3>Einblicke</h3>
        <div class="footer-nav-items">
          {#each footerNav[1].subItems as item}
            <button class="footer-nav-item" onclick={() => goto(item.path)}>
              {item.name}
            </button>
          {/each}
        </div>
      </div>
      <div class="about-us-column">
        <h3>Über uns</h3>
        <div class="footer-nav-items">
          {#each footerNav[2].subItems as item}
            <button class="footer-nav-item" onclick={() => goto(item.path)}>
              {item.name}
            </button>
          {/each}
        </div>
      </div>
      <div class="legal-column">
        <h3>Rechtliches & Kontakt</h3>
        <div class="footer-nav-items">
          <button class="footer-nav-item" onclick={() => goto(footerNav[3].path)}>
            {footerNav[3].title}
          </button>
          <button class="footer-nav-item" onclick={() => goto(footerNav[4].path)}>
            {footerNav[4].title}
          </button>
          <button class="footer-nav-item" onclick={() => goto(footerNav[5].path)}>
            {footerNav[5].title}
          </button>
          <button class="footer-nav-item" onclick={() => goto(footerNav[6].path)}>
            {footerNav[6].title}
          </button>
        </div>
      </div>
    </div>

    <div class="controls-area">
        <button
          class="locale-toggle-btn"
          class:german={$locale === 'de'}
          class:english={$locale === 'en'}
          onclick={toggleLocale}
          aria-label="Switch language"
          title={$locale === 'de' ? $_('menu.switchLanguageToEnglish') : $_('menu.switchLanguageToGerman')}
        ></button>
        <label class="swap swap-rotate ml-4 hover:scale-105">
          <input type="checkbox" class="theme-controller" value="dark" />
          <svg class="swap-off fill-warning h-9 w-9" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"
            />
          </svg>
          <svg class="swap-on fill-warning h-9 w-9" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"
            />
          </svg>
        </label>
    </div>

    <div class="final-row">
      <p class="brand"><strong>raspb webservices</strong> &copy; {currentYear}</p>
      <button class="btn btn-circle opacity-70" onclick={scrollToTop} title="Scroll to top" aria-label="Scroll to top">
        <svg class="text-iconic-blue/80 h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
        </svg>
      </button>
    </div>
  </div>
</footer>

<style lang="postcss">
  @reference '../../app.css';
  footer {
    @apply from-base-200 to-white bg-linear-to-b shadow-2xl;
    .inner-box {
      @apply m-auto flex w-full max-w-7xl flex-col items-center justify-between px-4;

      .top-row {
        @apply flex w-full items-center justify-between py-10;
        .line {
          @apply bg-base-300 mx-2 h-0.5 w-full grow;
        }
        .social-media-links {
          @apply ml-2 flex items-center justify-center;
          .social-media-icon {
            @apply mx-1 h-9 w-9 bg-cover bg-center bg-no-repeat opacity-80;
            &:last-child {
              @apply mr-0;
            }
            &.x {
              background-image: url('/icons/x-logo.svg');
            }
            &.linkedin {
              background-image: url('/icons/linkedin-logo.svg');
            }
            &.instagram {
              background-image: url('/icons/instagram-logo.svg');
            }
            &.xing {
              background-image: url('/icons/xing-logo.svg');
            }
            &.facebook {
              background-image: url('/icons/facebook-logo.svg');
            }
            &:hover {
              @apply scale-105 cursor-pointer opacity-100;
            }
          }
        }
      }
      .footer-nav-wrapper {
        @apply grid w-full grid-cols-30 lg:gap-8 mb-16;
        .pre-column {
          @apply hidden lg:block lg:col-span-4;
        }
        .service-column {
          @apply col-span-full lg:col-span-8 mb-16 lg:mb-2 flex justify-center lg:justify-start items-center lg:items-start flex-col;
        }
        .insights-column {
          @apply col-span-full lg:col-span-6 mb-16 lg:mb-2 flex justify-center lg:justify-start items-center lg:items-start flex-col;
        }
        .about-us-column {
          @apply col-span-full lg:col-span-6 mb-16 lg:mb-2 flex justify-center lg:justify-start items-center lg:items-start flex-col;
        }
        .legal-column {
          @apply col-span-full lg:col-span-6 mb-16 lg:mb-2 flex justify-center lg:justify-start items-center lg:items-start flex-col;
        }
        h3 {
          @apply text-iconic-blue;
        }
        .footer-nav-items {
          @apply flex flex-col justify-start items-center lg:items-start;
          .footer-nav-item {
            @apply py-1.5 text-base-content/70;
            &:hover {
              @apply cursor-pointer text-base-content;
            }
          }
        }
      }

      .controls-area {
        @apply w-full flex justify-center lg:justify-start items-center px-4;
      }
      .final-row {
        @apply border-base-300 mt-6 flex w-full items-center justify-between border-t-2 py-6 pl-4 pr-2;
      }
    }
  }

  .locale-toggle-btn {
    @apply flex h-8 w-8 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-white bg-cover bg-center bg-no-repeat p-0 transition-all duration-300;
    &.german {
      background-image: url('/icons/flags/germany-flag.svg');
    }
    &.english {
      background-image: url('/icons/flags/uk-flag.svg');
    }
    &:hover {
      @apply scale-105 transform shadow-lg;
    }

    &:active {
      @apply scale-95 transform;
    }
  }
</style>
