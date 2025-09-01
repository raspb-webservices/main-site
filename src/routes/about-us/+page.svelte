<script lang="ts">
  import { page } from '$app/state';
  import { goto } from '$app/navigation';
  import Section from '$lib/components/section.svelte';
  import RaspbPhilosophyModal from '$lib/components/raspb-philosophy-modal.svelte';
  import { _ } from 'svelte-i18n';
  import Stage from '$lib/components/ui/stage.svelte';

  let selectedMember: any = null;
  let philosophyModal: RaspbPhilosophyModal;

  const teamMembers = [
    {
      id: 'alex',
      name: 'Alex',
      role: 'Lead Developer & Architect',
      avatar: '/images/alex.png',
      skills: ['Full-Stack Development', 'AI Integration', 'System Architecture', 'DevOps']
    },
    {
      id: 'maya',
      name: 'Maya',
      role: 'UX/UI Design Specialist',
      avatar: '/images/maya.png',
      skills: ['User Experience Design', 'Interface Design', 'Prototyping', 'Design Systems']
    },
    {
      id: 'sam',
      name: 'Sam',
      role: 'Content Strategy & SEO Expert',
      avatar: '/images/sam.png',
      skills: ['Content Strategy', 'SEO Optimization', 'Analytics', 'Digital Marketing']
    },
    {
      id: 'rio',
      name: 'Rio',
      role: 'Quality Assurance & Testing Lead',
      avatar: '/images/rio.png',
      skills: ['Automated Testing', 'Quality Assurance', 'Performance Testing', 'Bug Detection']
    },
    {
      id: 'melinda',
      name: 'Melinda',
      role: 'Customer Service & Accounting',
      avatar: '/images/melinda.png',
      skills: ['Automated Testing', 'Quality Assurance', 'Performance Testing', 'Bug Detection']
    }
  ];

  function openModal(member: any) {
    selectedMember = member;
    const modal = document.getElementById('member_modal') as HTMLDialogElement;
    modal?.showModal();
  }

  function closeModal() {
    selectedMember = null;
    const modal = document.getElementById('member_modal') as HTMLDialogElement;
    modal?.close();
  }
</script>

<svelte:head>
  <title>{$_('ueberUns.meta.title')}</title>
  <meta name="description" content={$_('ueberUns.meta.description')} />
</svelte:head>

<Stage style={'fancy-gradient'}>
  <div class="inner-box reduced py-36">
    <h1 class="massive animate-fade-in-up">{$_('ueberUns.header.title')}</h1>
    <p class="teaser animate-fade-in-up">{@html $_('ueberUns.header.subtitle')}</p>
  </div>
</Stage>

<div class="content-area">
  <div class="massive-spacer"></div>

  <!-- Markus Section -->
  <Section>
    <div class="hero bg-base-200 animate-fade-in-up text-base-content rounded-4xl">
      <div class="hero-content flex-col gap-12 lg:flex-row-reverse p-10 pr-8">
        <div class="flex-shrink-0">
          <img
            src="/images/markus.png"
            alt="Markus - Gründer von raspb Webservices"
            class="h-[416px] w-72 rounded-2xl object-cover shadow-2xl transition-transform duration-300 hover:scale-105"
          />
        </div>
        <div class="flex-1">
          <div class="badge badge-primary badge-lg mb-4 animate-bounce">{$_('ueberUns.markusSection.badge')}</div>
          <h2 class="mb-6 text-5xl font-bold no-padding">{$_('ueberUns.markusSection.title')}</h2>
          <p class="mb-6 text-xl leading-relaxed">
            {$_('ueberUns.markusSection.paragraph1')}
          </p>
          <div class="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div class="stat bg-base-300 rounded-xl shadow-lg">
              <div class="stat-title">{$_('ueberUns.markusSection.statSpecializationTitle')}</div>
              <div class="stat-value text-iconic-blue text-lg">{$_('ueberUns.markusSection.statSpecializationValue')}</div>
            </div>
            <div class="stat bg-base-300 rounded-xl shadow-lg">
              <div class="stat-title">{$_('ueberUns.markusSection.statExperienceTitle')}</div>
              <div class="stat-value text-iconic-blue text-lg">{$_('ueberUns.markusSection.statExperienceValue')}</div>
            </div>
          </div>
          <div class="mb-6 flex flex-wrap gap-2">
            {#each ['Svelte', 'TypeScript', 'Node.js', 'TailwindCSS', 'GraphQL', 'Cloud Architecture', 'KI Engineering'] as skill}
              <span class="badge badge-primary badge-lg transition-colors duration-200">{skill}</span>
            {/each}
          </div>
          <p class="text-lg opacity-80 no-padding">
            {$_('ueberUns.markusSection.paragraph2')}
            {$_('ueberUns.markusSection.philosophyPrefix')}
            <button type="button" class="link link-primary hover:link-hover font-semibold" onclick={() => philosophyModal.openModal()}>
              {$_('ueberUns.markusSection.philosophyButton')}
            </button>.
          </p>
          <button
            class="btn-basic-header animate-fade-in-from-side mt-4 mb-2"
            onclick={() => {
              goto('/services');
            }}>{$_('mehrErfahren')}</button
          >
        </div>
      </div>
    </div>
  </Section>

  <!-- AI Team Section -->
  <Section>
    <div class="mb-12 text-center">
      <h1 class="animate-fade-in m-0 p-0">{$_('ueberUns.aiTeamSection.title')}</h1>
      <p class="teaser boxed animate-fade-in-up">
        {$_('ueberUns.aiTeamSection.subtitle')}
      </p>
    </div>

    <div class="grid grid-cols-12 gap-6">
      {#each teamMembers as member, index}
        <div
          class="card bg-base-200 animate-fade-in-up text-base-content col-span-12 h-full cursor-pointer shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl md:col-span-6 lg:col-span-4 {index ===
          3
            ? 'lg:col-start-3'
            : ''} "
          style="animation-delay: {index * 0.1}s"
          onclick={() => openModal(member)}
          onkeydown={(e) => e.key === 'Enter' && openModal(member)}
          role="button"
          tabindex="0"
        >
          <figure class="px-6 pt-6">
            <div>
              <img class="h-24 w-auto" src={member.avatar} alt={member.name} />
            </div>
          </figure>
          <div class="card-body flex flex-col items-center justify-between p-4 text-center">
            <div class="flex-grow">
              <h3 class="card-title no-padding justify-center">{member.name}</h3>
              <p class="opacity-70">{member.role}</p>
              <p class="px-4 leading-relaxed">{$_(`ueberUns.teamMembers.${member.id}.description`)}</p>
            </div>
            <div class="card-actions pb-3">
              <button class="btn btn-simple btn-xs">{$_('ueberUns.aiTeamSection.memberCardButton')}</button>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </Section>
</div>

<!-- Modal for Team Member Details -->
<dialog id="member_modal" class="modal">
  <div class="modal-box w-11/12 max-w-2xl">
    {#if selectedMember}
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute top-2 right-2" onclick={closeModal}>✕</button>
      </form>

      <div class="mt-10 mb-6 flex flex-col items-center text-center">
        <div class="avatar mb-4">
          <div class="w-36">
            <img src={selectedMember.avatar} alt={selectedMember.name} />
          </div>
        </div>
        <h3 class="no-padding">{selectedMember.name}</h3>
        <p class="opacity-70">{selectedMember.role}</p>
      </div>

      <div class="space-y-6">
        <div>
          <h4 class="mb-2 text-xl font-semibold">{$_('ueberUns.memberModal.about', { values: { name: selectedMember.name } })}</h4>
          <p class="leading-relaxed">{$_(`ueberUns.teamMembers.${selectedMember.id}.description`)}</p>
        </div>

        <div>
          <h4 class="mb-2 text-xl font-semibold">{$_('ueberUns.memberModal.personality')}</h4>
          <p class="leading-relaxed">{$_(`ueberUns.teamMembers.${selectedMember.id}.personality`)}</p>
        </div>

        <div>
          <h4 class="mb-2 text-xl font-semibold">{$_('ueberUns.memberModal.experience')}</h4>
          <p class="leading-relaxed">{$_(`ueberUns.teamMembers.${selectedMember.id}.experience`)}</p>
        </div>

        <div class="pb-4">
          <h4>{$_('ueberUns.memberModal.coreCompetencies')}</h4>
          <div class="flex flex-wrap gap-2">
            {#each selectedMember.skills as skill}
              <span class="badge badge-primary badge-lg">{skill}</span>
            {/each}
          </div>
        </div>
      </div>
    {/if}
  </div>
  <form method="dialog" class="modal-backdrop">
    <button onclick={closeModal}>close</button>
  </form>
</dialog>

<!-- RASPB Philosophy Modal -->
<RaspbPhilosophyModal bind:this={philosophyModal} />

<style lang="postcss">
  @reference '../../app.css';
</style>
