<script lang="ts">
  import { page } from '$app/state';
  import { goto } from '$app/navigation';
  import { locale, _ } from 'svelte-i18n';
  import { onMount } from 'svelte';

  const currentYear = new Date().getFullYear();
  let darkActive = $state(false);

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  function toggleLocale() {
    const newLocale = $locale === 'de' || $locale === 'de-DE' ? 'en' : 'de';
    locale.set(newLocale);
  }

  function gotoExternal(target: string) {
    window.open(target, '_blank');
  }

  function updateDataAttribute() {
    const root = document.documentElement;
    const currentTheme = root.getAttribute('data-theme');
    const themeToActivate = currentTheme === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', themeToActivate);
  }

  onMount(() => {
    const root = document.documentElement;
    const currentTheme = root.getAttribute('data-theme');
    darkActive = currentTheme === 'dark';
  });

  const footerNav = [
    {
      subItems: [
        { name: 'footer.nav.services.website', path: '/services#webseiten-section' },
        { name: 'footer.nav.services.cms', path: '/services#cms-section' },
        { name: 'footer.nav.services.webapp', path: '/services#applications-section' },
        { name: 'footer.nav.services.freestyle', path: '/services#individual-development-section' },
        { name: 'footer.nav.services.ki', path: '/services#ki-services-section' }
      ]
    },
    {
      subItems: [
        { name: 'footer.nav.insights.technology', path: '/insights#tech' },
        { name: 'footer.nav.insights.project', path: '/insights#project' },
        { name: 'footer.nav.insights.references', path: '/insights#showcase' }
      ]
    },
    {
      subItems: [
        { name: 'footer.nav.aboutUs.thisIsRaspb', path: '/about-us#raspb' },
        { name: 'footer.nav.aboutUs.kiTeam', path: '/about-us#ai-team' }
      ]
    },
    {
      subItems: [
        { name: 'footer.nav.legal.faq', path: '/faq' },
        { name: 'footer.nav.legal.contact', path: '/contact' },
        { name: 'footer.nav.legal.registration', path: '/registration' },
        { name: 'footer.nav.legal.imprint', path: '/imprint' },
        { name: 'footer.nav.legal.privacy', path: '/privacy-notice' },
        { name: 'footer.nav.legal.terms', path: '/terms-and-conditions' }
      ]
    }
  ];
</script>

<footer>
  <div class="inner-box">
    <div class="top-row">
      <div class="footer-logo"></div>
      <div class="line"></div>
      <div class="social-media-links">
        <button
          class="social-media-icon x"
          onclick={() => {
            gotoExternal('https://www.x.com');
          }}
          aria-label="X"
        ></button>
        <button
          class="social-media-icon linkedin"
          onclick={() => {
            gotoExternal('https://www.linkedin.com');
          }}
          aria-label="LinkedIn"
        ></button>
        <button
          class="social-media-icon instagram"
          onclick={() => {
            gotoExternal('https://www.instagram.com');
          }}
          aria-label="Instagram"
        ></button>
        <button
          class="social-media-icon xing"
          onclick={() => {
            gotoExternal('https://www.xing.com');
          }}
          aria-label="Xing"
        ></button>
        <button
          class="social-media-icon facebook"
          onclick={() => {
            gotoExternal('https://www.facebook.com');
          }}
          aria-label="Facebook"
        ></button>
      </div>
    </div>

    <div class="footer-nav-wrapper">
      <div class="pre-column"></div>
      <div class="service-column">
        <h3 class="pb-4">{$_('footer.nav.services.title')}</h3>
        <div class="footer-nav-items">
          {#each footerNav[0].subItems as item}
            <button class="footer-nav-item" onclick={() => goto(item.path)}>
              {$_(item.name)}
            </button>
          {/each}
        </div>
      </div>
      <div class="insights-column">
        <h3 class="pb-4">{$_('footer.nav.insights.title')}</h3>
        <div class="footer-nav-items">
          {#each footerNav[1].subItems as item}
            <button class="footer-nav-item" onclick={() => goto(item.path)}>
              {$_(item.name)}
            </button>
          {/each}
        </div>
      </div>
      <div class="about-us-column">
        <h3 class="pb-4">{$_('footer.nav.aboutUs.title')}</h3>
        <div class="footer-nav-items">
          {#each footerNav[2].subItems as item}
            <button class="footer-nav-item" onclick={() => goto(item.path)}>
              {$_(item.name)}
            </button>
          {/each}
        </div>
      </div>
      <div class="legal-column">
        <h3 class="pb-4">{$_('footer.nav.legal.title')}</h3>
        <div class="footer-nav-items">
          {#each footerNav[3].subItems as item}
            <button class="footer-nav-item" onclick={() => goto(item.path)}>
              {$_(item.name)}
            </button>
          {/each}
        </div>
      </div>
    </div>

    <div class="controls-area">
      <button
        class="locale-toggle-btn"
        class:german={$locale === 'de' || $locale === 'de-DE'}
        class:english={$locale === 'en'}
        onclick={toggleLocale}
        aria-label={$locale === 'de' || $locale === 'de-DE' ? $_('menu.switchLanguageToEnglish') : $_('menu.switchLanguageToGerman')}
        title={$locale === 'de' || $locale === 'de-DE' ? $_('menu.switchLanguageToEnglish') : $_('menu.switchLanguageToGerman')}
      ></button>

      <label for="dark-theme-checkbox">Theme-Switch</label>
      <input
        type="checkbox"
        class="theme-controller"
        id="dark-theme-checkbox"
        name="dark-theme-checkbox"
        bind:checked={darkActive}
        value="dark"
        onchange={updateDataAttribute}
      />
    </div>

    <div class="final-row">
      <p class="brand"><strong>raspb webservices</strong> &copy; {currentYear}</p>
      <button class="btn btn-circle opacity-70" onclick={scrollToTop} title="Scroll to top" aria-label="Scroll to top">
        <svg class="text-base-content-50/80 h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
        </svg>
      </button>
    </div>
  </div>
</footer>

<style lang="postcss">
  @reference '../../app.css';
  footer {
    @apply from-base-200 to-base-50 bg-linear-to-b shadow-2xl;
    .inner-box {
      @apply m-auto flex w-full max-w-7xl flex-col items-center justify-between px-4;

      .top-row {
        @apply flex w-full items-center justify-between py-10;
        .footer-logo {
          @apply aspect-video h-[70px] bg-contain bg-center bg-no-repeat;
          background-image: url('/images/logo.webp');
        }
        .line {
          @apply bg-base-content-100 xs:flex mx-2 hidden h-0.5 w-full grow;
        }
        .social-media-links {
          @apply ml-2 flex items-center justify-center;
          .social-media-icon {
            @apply xs:mx-1 xs:h-9 xs:w-9 bg-base-content-50 mx-0.5 h-7 w-7 mask-contain mask-center mask-no-repeat opacity-80;
            &:last-child {
              @apply mr-0;
            }
            &.x {
              mask-image: url('/icons/x-logo.svg');
            }
            &.linkedin {
              mask-image: url('/icons/linkedin-logo.svg');
            }
            &.instagram {
              mask-image: url('/icons/instagram-logo.svg');
            }
            &.xing {
              mask-image: url('/icons/xing-logo.svg');
            }
            &.facebook {
              mask-image: url('/icons/facebook-logo.svg');
            }
            &:hover {
              @apply scale-105 cursor-pointer opacity-100;
            }
          }
        }
      }
      .footer-nav-wrapper {
        @apply mb-16 grid w-full grid-cols-30 lg:gap-8;
        .pre-column {
          @apply hidden lg:col-span-4 lg:block;
        }
        .service-column {
          @apply col-span-full mb-16 flex flex-col items-center justify-center lg:col-span-8 lg:mb-2 lg:items-start lg:justify-start;
        }
        .insights-column {
          @apply col-span-full mb-16 flex flex-col items-center justify-center lg:col-span-6 lg:mb-2 lg:items-start lg:justify-start;
        }
        .about-us-column {
          @apply col-span-full mb-16 flex flex-col items-center justify-center lg:col-span-6 lg:mb-2 lg:items-start lg:justify-start;
        }
        .legal-column {
          @apply col-span-full mb-16 flex flex-col items-center justify-center lg:col-span-6 lg:mb-2 lg:items-start lg:justify-start;
        }
        h3 {
          @apply text-base-content-50;
        }
        .footer-nav-items {
          @apply flex flex-col items-center justify-start lg:items-start;
          .footer-nav-item {
            @apply text-base-content/70 py-1.5;
            &:hover {
              @apply text-base-content cursor-pointer;
            }
          }
        }
      }

      .controls-area {
        @apply flex w-full items-center justify-center px-4 lg:justify-start;
      }
      .final-row {
        @apply border-base-content-100 mt-6 flex w-full items-center justify-between border-t-2 py-6 pr-2 pl-4;
      }
    }
  }

  .locale-toggle-btn {
    @apply bg-base-50 flex h-8 w-8 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-cover bg-center bg-no-repeat p-0 transition-all duration-300;
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
