<script lang="ts">
  import { page } from '$app/state';
  import { goto } from '$app/navigation';
  import Section from '$lib/components/section.svelte';

  let selectedMember: any = null;

  const teamMembers = [
    {
      id: 'alex',
      name: 'Alex',
      role: 'Lead Developer & AI Architect',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex&backgroundColor=b6e3f4',
      skills: ['Full-Stack Development', 'AI Integration', 'System Architecture', 'DevOps'],
      description: 'Alex ist unser technischer Visionär und führt die Entwicklung komplexer Webanwendungen. Mit jahrelanger Erfahrung in modernen Frameworks und KI-Integration bringt Alex innovative Lösungen für jede Herausforderung.',
      experience: 'Über 8 Jahre Erfahrung in der Softwareentwicklung, spezialisiert auf Svelte, React und Node.js. Experte für KI-gestützte Entwicklungstools und Cloud-Architekturen.',
      personality: 'Analytisch, innovativ und immer auf der Suche nach der elegantesten Lösung. Alex liebt es, komplexe Probleme in einfache, benutzerfreundliche Lösungen zu verwandeln.'
    },
    {
      id: 'maya',
      name: 'Maya',
      role: 'UX/UI Design Specialist',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maya&backgroundColor=fde68a',
      skills: ['User Experience Design', 'Interface Design', 'Prototyping', 'Design Systems'],
      description: 'Maya verwandelt Ideen in intuitive und ästhetisch ansprechende Benutzererfahrungen. Sie versteht es, komplexe Anforderungen in klare, benutzerfreundliche Designs zu übersetzen.',
      experience: 'Spezialistin für moderne Design-Tools wie Figma und Adobe Creative Suite. Experte für responsive Design und Accessibility-Standards.',
      personality: 'Kreativ, empathisch und detailorientiert. Maya hat ein Auge für Ästhetik und versteht die Bedürfnisse der Nutzer intuitiv.'
    },
    {
      id: 'sam',
      name: 'Sam',
      role: 'Content Strategy & SEO Expert',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sam&backgroundColor=c084fc',
      skills: ['Content Strategy', 'SEO Optimization', 'Analytics', 'Digital Marketing'],
      description: 'Sam sorgt dafür, dass Ihre Inhalte nicht nur gefunden, sondern auch geliebt werden. Mit datengetriebenen Strategien optimiert Sam die Online-Präsenz für maximale Reichweite.',
      experience: 'Experte für moderne SEO-Techniken, Google Analytics und Content-Management-Systeme. Spezialist für technisches SEO und Performance-Optimierung.',
      personality: 'Strategisch denkend, datenorientiert und kommunikativ. Sam versteht es, komplexe Metriken in verständliche Handlungsempfehlungen zu übersetzen.'
    },
    {
      id: 'rio',
      name: 'Rio',
      role: 'Quality Assurance & Testing Lead',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rio&backgroundColor=86efac',
      skills: ['Automated Testing', 'Quality Assurance', 'Performance Testing', 'Bug Detection'],
      description: 'Rio stellt sicher, dass jede Zeile Code perfekt funktioniert. Mit systematischen Tests und automatisierten Prüfverfahren garantiert Rio höchste Qualitätsstandards.',
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
  <meta name="description" content="Lernen Sie das Team von raspb Webservices kennen - Markus als Solopreneur und unser innovatives KI-Team für moderne Webentwicklung." />
</svelte:head>

<div class="content-area">
  <Section>
    <h1 class="text-4xl font-bold text-center mb-8 animate-fade-in">Über uns</h1>
    <p class="teaser no-padding text-lg text-center max-w-4xl mx-auto animate-fade-in-up">
      Bei raspb Webservices verbinden wir menschliche Kreativität mit der Kraft künstlicher Intelligenz. 
      Als modernes Webentwicklungs-Studio schaffen wir innovative digitale Lösungen, die Ihre Vision zum Leben erwecken.
    </p>
  </Section>

  <!-- Markus Section -->
  <Section>
    <div class="hero bg-base-200 rounded-3xl animate-fade-in-up">
      <div class="hero-content flex-col lg:flex-row-reverse gap-12">
        <div class="flex-shrink-0">
          <img 
            src="/images/markus.png" 
            alt="Markus - Gründer von raspb Webservices"
            class="w-64 h-96 object-cover rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div class="flex-1">
          <div class="badge badge-primary badge-lg mb-4 animate-bounce">Solopreneur & Gründer</div>
          <h2 class="text-5xl font-bold mb-6">Markus</h2>
          <p class="text-xl mb-6 leading-relaxed">
            Als Gründer und kreativer Kopf von raspb Webservices bringe ich über ein Jahrzehnt Erfahrung 
            in der digitalen Welt mit. Meine Leidenschaft gilt der Entwicklung maßgeschneiderter Weblösungen, 
            die nicht nur technisch brillant, sondern auch benutzerfreundlich und zukunftssicher sind.
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div class="stat bg-base-100 rounded-xl shadow-lg">
              <div class="stat-title">Spezialisierung</div>
              <div class="stat-value text-primary text-lg">Full-Stack Development</div>
            </div>
            <div class="stat bg-base-100 rounded-xl shadow-lg">
              <div class="stat-title">Erfahrung</div>
              <div class="stat-value text-secondary text-lg">10+ Jahre</div>
            </div>
          </div>
          <div class="flex flex-wrap gap-2 mb-6">
            {#each ['Svelte', 'TypeScript', 'Node.js', 'TailwindCSS', 'GraphQL', 'Cloud Architecture'] as skill}
              <span class="badge badge-outline badge-lg hover:badge-primary transition-colors duration-200">{skill}</span>
            {/each}
          </div>
          <p class="text-lg opacity-80">
            Mein Ansatz kombiniert bewährte Entwicklungspraktiken mit innovativen KI-Tools, 
            um Projekte effizienter und qualitativ hochwertiger zu realisieren.
          </p>
        </div>
      </div>
    </div>
  </Section>

  <!-- AI Team Section -->
  <Section>
    <div class="text-center mb-12">
      <h2 class="text-4xl font-bold mb-4 animate-fade-in">Unser KI-Team</h2>
      <p class="text-xl opacity-80 max-w-3xl mx-auto animate-fade-in-up">
        Jeder unserer KI-Agenten bringt einzigartige Fähigkeiten und Persönlichkeiten mit. 
        Gemeinsam bilden sie ein hocheffizientes Team, das rund um die Uhr für Ihre Projekte arbeitet.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {#each teamMembers as member, index}
        <div 
          class="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up cursor-pointer h-full"
          style="animation-delay: {index * 0.1}s"
          on:click={() => openModal(member)}
          on:keydown={(e) => e.key === 'Enter' && openModal(member)}
          role="button"
          tabindex="0"
        >
          <figure class="px-6 pt-6">
            <div class="avatar">
              <div class="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={member.avatar} alt={member.name} />
              </div>
            </div>
          </figure>
          <div class="card-body items-center text-center p-4 flex flex-col justify-between">
            <div class="flex-grow">
              <h3 class="card-title text-xl mb-2 justify-center">{member.name}</h3>
              <p class="text-xs opacity-70 mb-3 font-medium">{member.role}</p>
              <p class="text-xs leading-relaxed mb-4 line-clamp-4">{member.description}</p>
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
    <div class="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl p-8 animate-fade-in-up">
      <div class="text-center">
        <h2 class="text-3xl font-bold mb-6">Unsere Philosophie</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="text-4xl mb-4">🚀</div>
            <h3 class="text-xl font-semibold mb-2">Innovation</h3>
            <p class="opacity-80">Wir nutzen modernste Technologien und KI-Tools, um zukunftsweisende Lösungen zu entwickeln.</p>
          </div>
          <div class="text-center">
            <div class="text-4xl mb-4">🎯</div>
            <h3 class="text-xl font-semibold mb-2">Präzision</h3>
            <p class="opacity-80">Jedes Detail wird sorgfältig durchdacht und perfektioniert, um höchste Qualität zu gewährleisten.</p>
          </div>
          <div class="text-center">
            <div class="text-4xl mb-4">🤝</div>
            <h3 class="text-xl font-semibold mb-2">Partnerschaft</h3>
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
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" on:click={closeModal}>✕</button>
      </form>
      
      <div class="flex flex-col items-center text-center mb-6">
        <div class="avatar mb-4">
          <div class="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-4">
            <img src={selectedMember.avatar} alt={selectedMember.name} />
          </div>
        </div>
        <h3 class="text-3xl font-bold">{selectedMember.name}</h3>
        <p class="text-lg text-primary font-semibold">{selectedMember.role}</p>
      </div>

      <div class="space-y-6">
        <div>
          <h4 class="text-xl font-semibold mb-2">Über {selectedMember.name}</h4>
          <p class="leading-relaxed">{selectedMember.description}</p>
        </div>

        <div>
          <h4 class="text-xl font-semibold mb-2">Persönlichkeit</h4>
          <p class="leading-relaxed">{selectedMember.personality}</p>
        </div>

        <div>
          <h4 class="text-xl font-semibold mb-2">Erfahrung & Expertise</h4>
          <p class="leading-relaxed">{selectedMember.experience}</p>
        </div>

        <div>
          <h4 class="text-xl font-semibold mb-3">Kernkompetenzen</h4>
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

<style lang="postcss">
  @reference '../../app.css';
</style>
