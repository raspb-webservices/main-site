<script lang="ts">
  import { page } from '$app/state';
  import { goto } from '$app/navigation';
  import Section from '$lib/components/section.svelte';
</script>

<svelte:head>
  <title>raspb Webservices - Einblicke</title>
  <meta name="description" content="Hier kann eine Beschreibung stehen..." />
</svelte:head>

<div class="content-area">
  <Section>
    <h1>Einblicke</h1>
    <p class="teaser no-padding">Vertrauen und Transparenz sind wichtig für eine gute Kundenbeziehhung. Hier möchten wir Einblicke in unserer Arbeit und einen typischen Projektablauf geben, damit glasklar ist, womit sie rechnen können.</p>
  </Section>

    <Section>
    <div class="animate-fade-in-up flex w-full flex-col items-center justify-center text-center max-w-4xl m-auto">
      <h1>Wir setzen <span class="inner-text-special">moderne Webtechnologien</span> ein</h1>
      <h3>Wir haben unseren eigenen Technologie-Stack entwickelt, der auf dem Jamstack basiert und alles einfacher, schneller und effizienter macht, ohne dabei Einschränkungen in Kauf nehmen zu müssen.</h3>
      
      <div class="text-left mt-8 space-y-6">
        <p>
          <strong>JAMstack</strong> steht für JavaScript, APIs und Markup und repräsentiert eine moderne Architektur für Webentwicklung. Diese Technologie ermöglicht es uns, extrem schnelle, sichere und skalierbare Websites zu erstellen, die eine außergewöhnliche Benutzererfahrung bieten.
        </p>
        
        <p>
          Der Kern des JAMstack-Ansatzes liegt in der <strong>Vorab-Generierung</strong> von Inhalten. Anstatt Seiten bei jeder Anfrage dynamisch zu erstellen, werden alle Seiten bereits zur Build-Zeit generiert und über ein Content Delivery Network (CDN) ausgeliefert. Dies führt zu blitzschnellen Ladezeiten und einer verbesserten Performance.
        </p>
        
        <p>
          Durch die <strong>Entkopplung von Frontend und Backend</strong> können wir flexibel die besten Tools für jeden Bereich einsetzen. Das Frontend wird als statische Dateien ausgeliefert, während dynamische Funktionen über APIs realisiert werden. Diese Architektur bietet mehrere entscheidende Vorteile:
        </p>
        
        <ul class="list-disc list-inside space-y-2 ml-4">
          <li><strong>Sicherheit:</strong> Weniger Angriffsfläche durch statische Dateien</li>
          <li><strong>Performance:</strong> Globale CDN-Verteilung für minimale Ladezeiten</li>
          <li><strong>Skalierbarkeit:</strong> Automatische Skalierung ohne Serveradministration</li>
          <li><strong>Entwicklerfreundlichkeit:</strong> Moderne Entwicklungstools und Workflows</li>
          <li><strong>Kosteneffizienz:</strong> Reduzierte Hosting- und Wartungskosten</li>
        </ul>
        
        <p>
          Unser JAMstack-Setup umfasst moderne Technologien wie <strong>Svelte/SvelteKit</strong> für das Frontend, <strong>TypeScript</strong> für typsichere Entwicklung, <strong>Tailwind CSS</strong> für effizientes Styling und <strong>Netlify</strong> für Deployment und Hosting. Diese Kombination ermöglicht es uns, robuste und wartbare Webanwendungen zu entwickeln, die sowohl für Entwickler als auch für Endnutzer optimiert sind.
        </p>
        
        <p>
          Die <strong>Headless CMS-Integration</strong> über GraphQL APIs ermöglicht es unseren Kunden, Inhalte einfach zu verwalten, während die technische Komplexität im Hintergrund verborgen bleibt. So können Sie sich auf Ihr Geschäft konzentrieren, während wir für eine technisch einwandfreie und zukunftssichere Lösung sorgen.
        </p>
      </div>
    </div>
  </Section>
</div>

<style lang="postcss">
  @reference '../../app.css';
</style>
