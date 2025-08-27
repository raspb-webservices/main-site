<script lang="ts">
  import Section from '$lib/components/section.svelte';
  import TechLogoShowcase from '$lib/components/tech-logo-showcase.svelte';
  import { locale, _ } from 'svelte-i18n';
</script>

<svelte:head>
  <title>{$_('insights.meta.title')}</title>
  <meta name="description" content={$_('insights.meta.description')} />
</svelte:head>

<div class="content-area">
  
  <!-- Header Section (similar to about-us) -->
  <Section>
    <div class="text-center animate-fade-in-up">
      <h1 class="mb-6 text-4xl md:text-6xl font-bold">
        {$_('insights.header.title')} <span class="inner-text-special">{$_('insights.header.titleHighlight')}</span>
      </h1>
      <p class="teaser animate-fade-in-up mx-auto max-w-4xl text-center text-lg">
        {$_('insights.header.teaser')}
      </p>
    </div>
  </Section>

  <!-- Technology Showcase Section -->
  <Section>
    <TechLogoShowcase speed={0.15} />
  </Section>

  <!-- JAMstack Section with clearer structure -->
  <Section>
    <div class="animate-fade-in-up m-auto flex w-full max-w-4xl flex-col items-center justify-center text-center">
      <h2 class="mb-4 text-4xl font-bold">
        {$_('insights.webtechnologien.titleFirst')} <span class="inner-text-special">{$_('insights.webtechnologien.titleHighlight')}</span>{#if $locale === 'de'}{$_('insights.webtechnologien.titleSecond')}{/if}
      </h2>
      <p class="animate-fade-in-up mx-auto max-w-3xl text-xl opacity-80">
        {$_('insights.webtechnologien.subtitle')}
      </p>

      <div class="mt-8 space-y-8 text-left">
        <div class="bg-base-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h3 class="text-2xl font-bold mb-4 text-primary">{$_('insights.webtechnologien.absatz1headline')}</h3>
          <p class="leading-relaxed">
            {@html $_('insights.webtechnologien.absatz1')}
          </p>
        </div>

        <div class="bg-base-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h3 class="text-2xl font-bold mb-4 text-primary">{$_('insights.webtechnologien.absatz2headline')}</h3>
          <p class="leading-relaxed">
            {@html $_('insights.webtechnologien.absatz2')}
          </p>
        </div>

        <div class="bg-base-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h3 class="text-2xl font-bold mb-4 text-primary">{$_('insights.webtechnologien.absatz3headline')}</h3>
          <p class="leading-relaxed mb-4">
            {@html $_('insights.webtechnologien.absatz3')}
          </p>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div class="bg-base-100 rounded-xl p-4">
              <p class="no-padding">{@html $_('insights.webtechnologien.vorteile.sicherheit')}</p>
            </div>
            <div class="bg-base-100 rounded-xl p-4">
              <p class="no-padding">{@html $_('insights.webtechnologien.vorteile.performance')}</p>
            </div>
            <div class="bg-base-100 rounded-xl p-4">
              <p class="no-padding">{@html $_('insights.webtechnologien.vorteile.skalierbarkeit')}</p>
            </div>
            <div class="bg-base-100 rounded-xl p-4">
              <p class="no-padding">{@html $_('insights.webtechnologien.vorteile.skalierbarkeit2')}</p>
            </div>
            <div class="bg-base-100 rounded-xl p-4">
              <p class="no-padding">{@html $_('insights.webtechnologien.vorteile.entwicklerfreundlichkeit')}</p>
            </div>
            <div class="bg-base-100 rounded-xl p-4">
              <p class="no-padding">{@html $_('insights.webtechnologien.vorteile.kosteneffizienz')}</p>
            </div>
          </div>
        </div>

        <div class="bg-base-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h3 class="text-2xl font-bold mb-4 text-primary">{$_('insights.webtechnologien.absatz4headline')}</h3>
          <p class="leading-relaxed">
            {@html $_('insights.webtechnologien.absatz4')}
          </p>
        </div>

        <div class="bg-base-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h3 class="text-2xl font-bold mb-4 text-primary">{$_('insights.webtechnologien.absatz5headline')}</h3>
          <p class="leading-relaxed">
            {@html $_('insights.webtechnologien.absatz5')}
          </p>
        </div>
      </div>
    </div>
  </Section>

  <!-- Additional Insights Section -->
  <Section>
    <div class="animate-fade-in-up text-center max-w-4xl mx-auto">
      <h2 class="mb-4 text-4xl font-bold">
        {$_('insights.projectInsights.titleFirst')} <span class="inner-text-special">{$_('insights.projectInsights.titleHighlight')}</span> {$_('insights.projectInsights.titleSecond')}?
      </h2>
      <p class="animate-fade-in-up">     
        Den einfachen Start in Ihr anstehendes IT-Projekt finden Sie auf unserer Webseite. Mit dem Absenden des Projektkonfigurators ist bereits der erste große Schritt getan. Um den intelligenten Konfigurator im vollen Umfang nutzen zu können, müssen Sie sich lediglich einen einfachen Account anlegen (Angabe der E-Mail-Adresse genügt). Das geplante Projekt steht in Ihrem persönlichen Dashboard dann zur Verfügung und kannn dort verfeinert und letztendlich an uns übermittelt werden.</p>
      <p class="animate-fade-in-up">
        Sie erhalten sofort eine E-Mail mit allen Details und können mit einem Klick offiziell loslegen und uns beauftragen. <strong>Damit startet die Reise!</strong> Wir beschäftigen uns sofort mit Ihrer Idee, entwickeln ein Konzept sowie einen ersten Prototypen. Für jedes Projekt wird ein eigenes Postfach &lt;projektname&gt;@raspb.de eingerichtet, welches für die Erstellung aller Accounts verwendet wird. Sie erhalten Zugriff auf das Postfach + Zugang zu den E-Mails über den Browser / einen Webmailer. Es wird ein GitHub Konto aufgesetzt, welches den Projektcode trägt und ein eigene Site in Netlify erstellt. Je nach Projekttyp kommt eine Hygraph- und auth0 Account dazu. In der Regel passiert der Zugriff via SSO vom GitHub Konto aus.
      </p>
      <p class="animate-fade-in-up">
        Je nach Projektumfang und Kundenwusch, verfeinern wir gemeinsam Ihre Vision in kleinen Workshops oder Web-Sessions. Was wir aber unbedingt vermeiden wollen, ist es viele zeitfressende Meetings vorzusehen, die meist nur einen geringen Nutzen bieten. Ihr Input aus dem Konfigurtator, so wie unsere umfassende Erfahrung aus IT-Projekten, versetzen uns in die Lage, Ihre Idee/Vision auch ohne zig Schleifen verstehen und umsetzen zu können. Sind sie zwischen Projektkonfiguration und Beauftragung aber noch unsicher, haben Rückfragen  oder brauchen aus sontigen Gründen den Dialog, stehen wir natürlich jederzeit zur Verfügung. Lassen Sie es uns - zum Nutzen aller - aber effizient und schlank halten.
      </p>
      <p class="animate-fade-in-up">
        Alle Systeme haben Sie - auch während des Projektverlaufs - im vollen Zugriff. Wir erabreiten nun innerhalb des geschaffenen GitHub Repositories Ihre Projekt und stellen es über eine temporäre Adresse: &lt;projektname&gt;.netlify.app zur Verfügung. Sie bekommen alle Zugangsaten direkt zur Verfügung gestellt und werden über jeden Schritt in Ihrem Dashboard und per Mail informiert.
      </p>
      <p class="animate-fade-in-up">
        Bei CMS Projekten, werden wir einige Iterationen mit Ihnen drehen, um das Datenmodell und weitere Besonderheiten abzustimmen. Einfache Webseiten benötigen i.d.R. keine zusätzlichen Abstimmunsrunden. Sie erhalten innerhalb von wenigen Tagen einen ersten Prototypen. Bei komplexeren Vorhaben, wie speziellen Anwendungen oder Individual-Entwicklungen, kann es etwas längerer dauern, bis wir einen ersten Prototyp präsentieren können.
      </p>
      <p class="animate-fade-in-up">
        Sie haben nun ausreichend Zeit den Prototypen zu testen und uns Feedback zu geben. Über das Dashboard haben Sie zudem jedezeit die Möglichkeit weitere Projektartefakte bereitzustellen oder Einfluss auf die Entwicklung zu nehmen.
      </p>
      <p class="animate-fade-in-up">
        Mit dem gesammelten Rückmeldungen gehen wir in die Überarbeitung / den Feinschliff. Nach ein paar weiteren Tagen liegt die GoLive-fähige Endversion vor. In Abstimmung mit Ihenn veröffentlichen wir das Ergebnis unter der gewünschten Domain. Alternativ liefern wir den Code an  Sie aus oder transportieren die Anwendung an Ihren Wunschort. Damit ist das Projekt erfolgreich abgeschlossen. 
      </p>
      <p class="animate-fade-in-up">
        Aber damit nicht genug. Der Aufbau unserer Lösungen ist modular, flexibel und erweiterbar. Das Ende Ihres Projekts ist der Anfang eines weiteren...
      </p>
    </div>
  </Section>
    <Section>
    <div class="animate-fade-in-up text-center max-w-4xl mx-auto">
      <h2 class="mb-4 text-4xl font-bold">
        Und was ist jetzt mit KI?
      </h2>
      <p class="animate-fade-in-up">     
        Künstliche Intelligenz ist eine beeindruckendes Werkzeug, was die Erledigung von bestimmten Aufghaben um das 10-fache beschleunigen kann. Es versetzt uns in die Lage, unsere maßgeschneiderten IT-Projekte dermaßen effizient anbieten zu können (Projektlaufzeit, Kosten, etc.). Ganz ohne Menschen geht es aber nicht: Kreativität, Erfahrungen, tiefes Verständnis für menschliche Bedürfnisse, Emotionen,... All das lässt sich nicht ersetzen! Darüber hinaus braucht es erfahrene Personen, die den KI-Modellen die richtigen Anweisungen (Prompts) geben und deren Output kontrolliert. Denn manchmal liefern KIs Dinge, nach denen nicht gefragt wurde (halluzinieren) oder liefern Ergebnisse mit gravierenden Fehlern ab. Auch wenn viele Modelle mittlerweile mit nur einem Prompt ganze Anwnendungen erstellen können, ist für ein wirklich perfektes Ergebnis ein menschlicher Experte nötig. 
      </p>
      <p class="animate-fade-in-up">
        Neben dem Prompt- und Context-Engineering (Wie kann ich eine KI bestmöglich füttern, damit genau das dabei rauskommt, was ich will?) gibt es viele weitere Use-Cases, bei denen sich die Nutzuing von KI - in der ein oder anderen Form - aufdrängt: Chatbots, KI-Agent, KI-Workflows, KI enhanced Automations, Content-Craetion, Personal Assistant, etc.
      </p>
      <p class="animate-fade-in-up">
        Wir haben n8n als Automatisierungplattform für uns entdeckt. Damit lassen sich Szenarien aus allen Bereichen der KI, einfach und effizient umsetzen. Wir bieten neben individuellen KI-Beratungsleistungen auch die Entwicklung spezieller Agenten und Workflows an, welche Ihnen dabei helfen Ihre Unternehmensziele zu erreichen und Kosten zu sparen. Bei unseren KI-Projekten (und teilweise auch bei unserwen Individualentwicklungen), lässt sich der standardisierte Projektablauf nicht zu 100% anwenden. Üblicherweise sind die Projektzeiten hier etwas länger und eine engere Abstimmung ist Voraussetzung. Und dennoch bietet der einztigartige raspb Ansatz auch hier eine einizigartige Effizienz. Ergebnisse der KI Projekte sind deutlich früher verfügbar, als bei anderen Anbieter. </p>
    </div>
  </Section>
</div>

<style lang="postcss">
  @reference '../../app.css';
  h2 {
    @apply max-w-[600px] mx-auto;
  }
</style>
