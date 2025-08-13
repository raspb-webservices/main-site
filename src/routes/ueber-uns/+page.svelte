<script lang="ts">
  import { page } from '$app/state';
  import { goto } from '$app/navigation';
  import Section from '$lib/components/section.svelte';
  import RaspbPhilosophyModal from '$lib/components/raspb-philosophy-modal.svelte';


  let selectedMember: any = null;
  let philosophyModal: RaspbPhilosophyModal;

  const teamMembers = [
    {
      id: 'alex',
      name: 'Alex',
      role: 'Lead Developer & AI Architect',
      avatar:
        'https://api.dicebear.com/7.x/avataaars/svg?seed=AlexHappy&backgroundColor=b6e3f4&mouth=smile&eyes=happy&eyebrows=default&accessories=prescription02&clothingGraphic=bear',
      skills: ['Full-Stack Development', 'AI Integration', 'System Architecture', 'DevOps'],
      description:
        'Alex ist unser technischer Visionär und führt die Entwicklung komplexer Webanwendungen. Mit jahrelanger Erfahrung in modernen Frameworks und KI-Integration bringt Alex innovative Lösungen für jede Herausforderung.',
      experience:
        'Über 8 Jahre Erfahrung in der Softwareentwicklung, spezialisiert auf Svelte, React und Node.js. Experte für KI-gestützte Entwicklungstools und Cloud-Architekturen.',
      personality:
        'Analytisch, innovativ und immer auf der Suche nach der elegantesten Lösung. Alex liebt es, komplexe Probleme in einfache, benutzerfreundliche Lösungen zu verwandeln.'
    },
    {
      id: 'maya',
      name: 'Maya',
      role: 'UX/UI Design Specialist',
      avatar:
        'https://api.dicebear.com/7.x/avataaars/svg?seed=MayaJoyful&backgroundColor=fde68a&mouth=twinkle&eyes=wink&eyebrows=raisedExcited&accessories=wayfarers&clothingGraphic=pizza',
      skills: ['User Experience Design', 'Interface Design', 'Prototyping', 'Design Systems'],
      description:
        'Maya verwandelt Ideen in intuitive und ästhetisch ansprechende Benutzererfahrungen. Sie versteht es, komplexe Anforderungen in klare, benutzerfreundliche Designs zu übersetzen.',
      experience: 'Spezialistin für moderne Design-Tools wie Figma und Adobe Creative Suite. Experte für responsive Design und Accessibility-Standards.',
      personality: 'Kreativ, empathisch und detailorientiert. Maya hat ein Auge für Ästhetik und versteht die Bedürfnisse der Nutzer intuitiv.'
    },
    {
      id: 'sam',
      name: 'Sam',
      role: 'Content Strategy & SEO Expert',
      avatar:
        'https://api.dicebear.com/7.x/avataaars/svg?seed=SamCheerful&backgroundColor=c084fc&mouth=eating&eyes=surprised&eyebrows=raisedExcitedNatural&accessories=sunglasses&clothingGraphic=skull',
      skills: ['Content Strategy', 'SEO Optimization', 'Analytics', 'Digital Marketing'],
      description:
        'Sam sorgt dafür, dass Ihre Inhalte nicht nur gefunden, sondern auch geliebt werden. Mit datengetriebenen Strategien optimiert Sam die Online-Präsenz für maximale Reichweite.',
      experience:
        'Experte für moderne SEO-Techniken, Google Analytics und Content-Management-Systeme. Spezialist für technisches SEO und Performance-Optimierung.',
      personality:
        'Strategisch denkend, datenorientiert und kommunikativ. Sam versteht es, komplexe Metriken in verständliche Handlungsempfehlungen zu übersetzen.'
    },
    {
      id: 'rio',
      name: 'Rio',
      role: 'Quality Assurance & Testing Lead',
      avatar:
        'https://api.dicebear.com/7.x/avataaars/svg?seed=RioRadiant&backgroundColor=86efac&mouth=smile&eyes=hearts&eyebrows=default&accessories=round&clothingGraphic=diamond',
      skills: ['Automated Testing', 'Quality Assurance', 'Performance Testing', 'Bug Detection'],
      description:
        'Rio stellt sicher, dass jede Zeile Code perfekt funktioniert. Mit systematischen Tests und automatisierten Prüfverfahren garantiert Rio höchste Qualitätsstandards.',
      experience: 'Spezialist für Test-Frameworks wie Playwright, Jest und Cypress. Experte für CI/CD-Pipelines und automatisierte Qualitätssicherung.',
      personality: 'Präzise, geduldig und lösungsorientiert. Rio hat ein Talent dafür, auch die kleinsten Fehler aufzuspüren und zu beheben.'
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
  <title>raspb Webservices - Über uns</title>
  <meta
    name="description"
    content="Lernen Sie das Team von raspb Webservices kennen - Markus als Solopreneur und unser innovatives KI-Team für moderne Webentwicklung."
  />
</svelte:head>

<div class="content-area">
  <Section>
    <h1 class="animate-fade-in mb-8 text-center text-4xl font-bold">Über uns</h1>
    <p class="teaser animate-fade-in-up mx-auto max-w-4xl text-center text-lg">
      Bei raspb Webservices verbinden wir menschliche Kreativität mit der Kraft künstlicher Intelligenz. Als modernes Webentwicklungs-Studio schaffen wir
      innovative digitale Lösungen, die Ihre Vision zum Leben erwecken.
    </p>
    <p class="teaser no-padding animate-fade-in-up mx-auto max-w-4xl text-center text-lg">
      Und wer genau ist raspb jetzt? - Eigentlich sind das nur ich und meine KI Crew 😉
    </p>
  </Section>

  <!-- Markus Section -->
  <Section>
    <div class="hero bg-base-200 animate-fade-in-up rounded-3xl">
      <div class="hero-content flex-col gap-12 lg:flex-row-reverse">
        <div class="flex-shrink-0">
          <img
            src="/images/markus.png"
            alt="Markus - Gründer von raspb Webservices"
            class="h-96 w-64 rounded-2xl object-cover shadow-2xl transition-transform duration-300 hover:scale-105"
          />
        </div>
        <div class="flex-1">
          <div class="badge badge-primary badge-lg mb-4 animate-bounce">Solopreneur & Gründer</div>
          <h2 class="mb-6 text-5xl font-bold">Markus</h2>
          <p class="mb-6 text-xl leading-relaxed">
            Als Gründer und kreativer Kopf von raspb Webservices bringe ich fast zwei Jahrzehnte Erfahrung in der digitalen Welt mit. Meine Leidenschaft gilt
            der Entwicklung maßgeschneiderter Weblösungen, die nicht nur technisch brillant, sondern auch benutzerfreundlich und zukunftssicher sind.
          </p>
          <div class="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div class="stat bg-base-100 rounded-xl shadow-lg">
              <div class="stat-title">Spezialisierung</div>
              <div class="stat-value text-primary text-lg">Full-Stack Development</div>
            </div>
            <div class="stat bg-base-100 rounded-xl shadow-lg">
              <div class="stat-title">Erfahrung</div>
              <div class="stat-value text-primary text-lg">knapp 20 Jahre</div>
            </div>
          </div>
          <div class="mb-6 flex flex-wrap gap-2">
            {#each ['Svelte', 'TypeScript', 'Node.js', 'TailwindCSS', 'GraphQL', 'Cloud Architecture', 'KI Engineering'] as skill}
              <span class="badge badge-outline badge-lg hover:badge-primary transition-colors duration-200">{skill}</span>
            {/each}
          </div>
          <p class="text-lg opacity-80">
            Mein Ansatz kombiniert bewährte Entwicklungspraktiken mit innovativen KI-Tools, um Projekte effizienter und qualitativ hochwertiger zu realisieren.
            Ganz nach der
            <button type="button" class="link link-primary hover:link-hover font-semibold" on:click={() => philosophyModal.openModal()}>
              raspb Philosophie
            </button>.
          </p>
        </div>
      </div>
    </div>
  </Section>

  <!-- AI Team Section -->
  <Section>
    <div class="mb-12 text-center">
      <h2 class="animate-fade-in mb-4 text-4xl font-bold">Unser KI-Team</h2>
      <p class="animate-fade-in-up mx-auto max-w-3xl text-xl opacity-80">
        Jeder unserer KI-Agenten bringt einzigartige Fähigkeiten und Persönlichkeiten mit. Gemeinsam bilden sie ein hocheffizientes Team, das rund um die Uhr
        für Ihre Projekte arbeitet.
      </p>
    </div>

    <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {#each teamMembers as member, index}
        <div
          class="card bg-base-100 animate-fade-in-up h-full cursor-pointer shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
          style="animation-delay: {index * 0.1}s"
          on:click={() => openModal(member)}
          on:keydown={(e) => e.key === 'Enter' && openModal(member)}
          role="button"
          tabindex="0"
        >
          <figure class="px-6 pt-6">
            <div class="avatar">
              <div class="ring-primary ring-offset-base-100 w-20 rounded-full ring ring-offset-2">
                <img src={member.avatar} alt={member.name} />
              </div>
            </div>
          </figure>
          <div class="card-body flex flex-col items-center justify-between p-4 text-center">
            <div class="flex-grow">
              <h3 class="card-title mb-2 justify-center text-xl">{member.name}</h3>
              <p class="mb-3 text-xs font-medium opacity-70">{member.role}</p>
              <p class="mb-4 line-clamp-4 text-xs leading-relaxed">{member.description}</p>
            </div>
            <div class="card-actions">
              <button class="btn btn-primary btn-xs">Mehr erfahren</button>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </Section>

  <!-- Team Philosophy Section -->
  <Section>
    <div class="from-primary/10 to-secondary/10 animate-fade-in-up rounded-3xl bg-gradient-to-r p-8">
      <div class="text-center">
        <h2 class="mb-6 text-3xl font-bold">Unsere Philosophie</h2>
        <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div class="text-center">
            <div class="mb-4 text-4xl">⚡</div>
            <h3 class="mb-2 text-xl font-semibold">Innovation</h3>
            <p class="opacity-80">Wir nutzen modernste Technologien und KI-Tools, um zukunftsweisende Lösungen zu entwickeln.</p>
          </div>
          <div class="text-center">
            <div class="mb-4 text-4xl">🎯</div>
            <h3 class="mb-2 text-xl font-semibold">Präzision</h3>
            <p class="opacity-80">Jedes Detail wird sorgfältig durchdacht und perfektioniert, um höchste Qualität zu gewährleisten.</p>
          </div>
          <div class="text-center">
            <div class="mb-4 text-4xl">🤝</div>
            <h3 class="mb-2 text-xl font-semibold">Partnerschaft</h3>
            <p class="opacity-80">Wir arbeiten eng mit unseren Kunden zusammen, um ihre Vision optimal umzusetzen.</p>
          </div>
        </div>
      </div>
    </div>
  </Section>
</div>

<!-- Modal for Team Member Details -->
<dialog id="member_modal" class="modal">
  <div class="modal-box w-11/12 max-w-2xl">
    {#if selectedMember}
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute top-2 right-2" on:click={closeModal}>✕</button>
      </form>

      <div class="mb-6 flex flex-col items-center text-center">
        <div class="avatar mb-4">
          <div class="ring-primary ring-offset-base-100 w-32 rounded-full ring ring-offset-4">
            <img src={selectedMember.avatar} alt={selectedMember.name} />
          </div>
        </div>
        <h3 class="text-3xl font-bold">{selectedMember.name}</h3>
        <p class="text-primary text-lg font-semibold">{selectedMember.role}</p>
      </div>

      <div class="space-y-6">
        <div>
          <h4 class="mb-2 text-xl font-semibold">Über {selectedMember.name}</h4>
          <p class="leading-relaxed">{selectedMember.description}</p>
        </div>

        <div>
          <h4 class="mb-2 text-xl font-semibold">Persönlichkeit</h4>
          <p class="leading-relaxed">{selectedMember.personality}</p>
        </div>

        <div>
          <h4 class="mb-2 text-xl font-semibold">Erfahrung & Expertise</h4>
          <p class="leading-relaxed">{selectedMember.experience}</p>
        </div>

        <div>
          <h4 class="mb-3 text-xl font-semibold">Kernkompetenzen</h4>
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
    <button on:click={closeModal}>close</button>
  </form>
</dialog>

<!-- RASPB Philosophy Modal -->
<RaspbPhilosophyModal bind:this={philosophyModal} />

<style lang="postcss">
  @reference '../../app.css';
</style>
