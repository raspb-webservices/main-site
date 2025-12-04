<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { _ } from 'svelte-i18n';
  import { teamMembers } from '$lib/configs/teamMembers';
  import Stage from '$lib/components/ui/stage.svelte';
  import Section from '$lib/components/ui/section.svelte';
  import RaspbPhilosophyModal from '$lib/components/modals/general/philosophy.svelte';
  import AboutMeModal from '$lib/components/modals/about-us/about-me-modal.svelte';
  import MemberModal from '$lib/components/modals/about-us/member-modal.svelte';
  import type { Member } from '$interfaces/user.interface';

  let currentTheme = $state('light');
  let selectedMember: Member | null = $state(null);

  let memberModal: MemberModal;
  let aboutMeModal: AboutMeModal;
  let philosophyModal: RaspbPhilosophyModal;
  const myskills = ['svelte', 'typescript', 'nodejs', 'tailwindcss', 'graphql', 'cloudArchitecture', 'kiEngineering']

  const handleHashChange = (event: HashChangeEvent) => {
    const newHash = new URL(event.newURL).hash.slice(1);
    setTimeout(() => {
      scrollToSection(newHash);
    }, 250);
  };

  function openMemberModal(member: Member) {
    selectedMember = member;
    memberModal.openModal();
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
    const root = document.documentElement;
    currentTheme = root.getAttribute("data-theme");

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
  <title>{$_('ueberUns.meta.title')}</title>
  <meta name="description" content={$_('ueberUns.meta.description')} />
</svelte:head>

<Stage style={'fancy-gradient'}>
  <div class="inner-box reduced py-36 prose">
    <h1 class="massive animate-fade-in-up">{$_('ueberUns.header.title')}</h1>
    <p class="teaser animate-fade-in-up">{@html $_('ueberUns.header.subtitle')}</p>
  </div>
</Stage>

<Section noSpacing={true}>
  <div id="raspb" class="inner-box animate-fade-in-up pt-30 pb-24 prose">
    <h2>{$_('ueberUns.introSection.titleFirst')} <span class="inner-text-special">{$_('ueberUns.introSection.titleHighlight')}</span> {$_('ueberUns.introSection.titleSecond')}</h2>
    <p>{@html $_('ueberUns.introSection.teaser1')}</p>
    <p>{@html $_('ueberUns.introSection.teaser2')}</p>
    <p class="no-padding">{@html $_('ueberUns.introSection.teaser3')}</p>
  </div>
</Section>

<Section noSpacing={true}>
  <div class="hero bg-base-200 animate-fade-in-up text-base-content rounded-4xl">
    <div class="hero-content flex-col gap-12 p-10 pr-8 lg:flex-row-reverse">
      <div class="flex-shrink-0">
        <img
          src="/images/markus.jpg"
          alt="Markus - Gründer von raspb Webservices"
          class="h-[416px] w-72 rounded-2xl object-cover shadow-2xl transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div class="flex-1">
        <div class="badge badge-primary badge-lg mb-4 animate-bounce">{$_('ueberUns.markusSection.badge')}</div>
        <h2 class="mb-6 text-5xl font-bold">{$_('ueberUns.markusSection.title')}</h2>
        <p class="mb-6 text-xl leading-relaxed">
          {$_('ueberUns.markusSection.paragraph1')}
        </p>
        <div class="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div class="stat bg-base-300 rounded-xl {currentTheme === 'light' ? 'shadow-lg' : ''}">
            <div class="stat-title">{$_('ueberUns.markusSection.statSpecializationTitle')}</div>
            <div class="stat-value text-base-content-50 text-lg">{$_('ueberUns.markusSection.statSpecializationValue')}</div>
          </div>
          <div class="stat bg-base-300 rounded-xl {currentTheme === 'light' ? 'shadow-lg' : ''}">
            <div class="stat-title">{$_('ueberUns.markusSection.statExperienceTitle')}</div>
            <div class="stat-value text-base-content-50 text-lg">{$_('ueberUns.markusSection.statExperienceValue')}</div>
          </div>
        </div>
        <div class="mb-6 flex flex-wrap gap-2">
          {#each myskills as myskill}
            <span class="badge badge-primary badge-lg transition-colors duration-200">{$_(`ueberUns.markusSection.skills.${myskill}`)}</span>
          {/each}
        </div>
        <p class="add-padding text-lg opacity-80">
          {$_('ueberUns.markusSection.paragraph2')}
          {$_('ueberUns.markusSection.philosophyPrefix')}
          <button type="button" class="link link-primary hover:link-hover" onclick={() => philosophyModal.openModal()}>
            {$_('ueberUns.markusSection.philosophyButton')}
          </button>.
        </p>
        <button
          class="btn-basic-header animate-fade-in-from-side mt-4 mb-2"
          onclick={() => { aboutMeModal.openModal() }}>{$_('mehrErfahren')}</button
        >
      </div>
    </div>
  </div>
</Section>

<Section noSpacing={true}>
  <div id="ai-team" class="inner-box animate-fade-in-up pt-36">
    <div class="m-auto max-w-5xl text-center prose">
      <h2>{$_('ueberUns.aiTeamSection.titleFirst')} <span class="inner-text-special">{$_('ueberUns.aiTeamSection.titleHighlight')}</span></h2>
      <p class="teaser boxed no-padding">{$_('ueberUns.aiTeamSection.subtitle')}</p>
    </div>
  </div>
</Section>

<Section noSpacing={true}>
  <div class="inner-box animate-fade-in-up pt-4 pb-24">
    <div class="grid grid-cols-12 gap-6">
      {#each teamMembers as member, index}
        <div
          class="card from-base-100 to-base-200  bg-linear-to-tl flex cursor-default flex-col animate-fade-in-up text-base-content col-span-12 h-full shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg md:col-span-6 lg:col-span-4 {index === 3 ? 'lg:col-start-3' : ''} "
          style="animation-delay: {index * 0.1}s"
        >
          <figure class="px-6 pt-6">
            <div>
              <img class="h-24 w-auto" src={member.avatar} alt={member.name} />
            </div>
          </figure>
          <div class="card-body flex flex-col items-center justify-between p-4 text-center">
            <div class="flex-grow">
              <h3 class="card-title justify-center">{member.name}</h3>
              <p class="opacity-70 add-padding">{member.role}</p>
              <p class="line-clamp-4 px-4 leading-relaxed">{$_(`ueberUns.teamMembers.${member.id}.description`)}</p>
            </div>
            <div class="card-actions pt-2 pb-4">
              <button class="btn btn-simple btn-xs" onclick="{() => {openMemberModal(member)}}">{$_('ueberUns.aiTeamSection.memberCardButton')}</button>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</Section>

<MemberModal bind:this={memberModal} {selectedMember} />
<RaspbPhilosophyModal bind:this={philosophyModal} />
<AboutMeModal bind:this={aboutMeModal} />

<style lang="postcss">
  @reference '../../app.css';
  .stat {
    border-inline-end: none !important;
  }
</style>
