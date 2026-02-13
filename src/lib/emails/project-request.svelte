<script lang="ts">
  import { Button, Html, Head, Body, Container, Section, Text, Hr, Row, Column } from 'better-svelte-email';
  
  let { projectData, projectId } = $props();

  // Helper functions
  function getServiceLevelText(level: number) {
    if (level === undefined || level === null) return 'Nicht angegeben';
    if (level < 20) return 'Full-Service (Wir übernehmen alles)';
    if (level < 40) return 'Überwiegend Full-Service';
    if (level < 60) return 'Ausgewogene Zusammenarbeit';
    if (level < 80) return 'Aktive Mitwirkung';
    return 'Maximale Eigenleistung';
  }

  function getEngineeringText(level: number) {
    if (level === undefined || level === null) return 'Nicht angegeben';
    if (level < 20) return 'Pragmatisch & Schnell';
    if (level < 40) return 'Standard-Qualität';
    if (level < 60) return 'Hochwertig';
    if (level < 80) return 'Premium-Qualität';
    return 'Maximal robust & skalierbar';
  }

  function getTimelineText(pref: string) {
    const map: Record<string, string> = {
      urgent: 'Dringend (< 2 Wochen)',
      fast: 'Schnell (2-4 Wochen)',
      moderate: 'Moderat (1-2 Monate)',
      flexible: 'Flexibel (2-3 Monate)',
      delayed: 'Entspannt (3+ Monate)',
      deadline: 'Fester Termin',
      whenever: 'Wann immer möglich'
    };
    return map[pref] || pref;
  }

  function getBudgetText(range: string) {
    const map: Record<string, string> = {
      small: 'Klein (< 5.000 €)',
      medium: 'Mittel (5.000 - 15.000 €)',
      large: 'Groß (15.000 - 50.000 €)',
      xlarge: 'Sehr groß (50.000 - 100.000 €)',
      enterprise: 'Enterprise (> 100.000 €)',
      flexible: 'Flexibel'
    };
    return map[range] || range;
  }

  const owner = projectData.owner || {};
  const salutationMap: Record<string, string> = {
    mr: 'Herr',
    mrs: 'Frau',
    company: 'Firma',
    other: 'Divers'
  };
</script>

<Html>
  <Head />
  <Body style="background-color: #fafafa; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;">
    <Container style="margin: 0 auto; padding: 20px 0; max-width: 600px;">
      <!-- Header -->
      <Section style="background-color: #c1121f; padding: 30px 20px; text-align: center;">
        <Text style="color: #ffffff; font-size: 28px; margin: 0; font-weight: bold;">
          🎉 Neue Projektanfrage!
        </Text>
        <Text style="color: #fdf0d5; font-size: 16px; margin: 10px 0 0 0;">
          Ein neuer Lead hat den Wizard abgeschlossen
        </Text>
      </Section>

      <!-- Project ID -->
      {#if projectId}
        <Section style="padding: 20px; background-color: #f5f5f5; text-align: center;">
          <Text style="margin: 0; font-size: 14px; color: #666;">
            Projekt-ID: <strong>{projectId}</strong>
          </Text>
        </Section>
      {/if}

      <!-- Customer Information -->
      <Section style="padding: 30px 20px;">
        <Text style="font-size: 22px; color: #c1121f; margin-bottom: 15px; font-weight: bold;">
          👤 Kundendaten
        </Text>
        
        <Text style="margin: 5px 0; font-size: 14px;">
          <strong>Anrede:</strong> {salutationMap[owner.salutation] || owner.salutation || '-'}<br/>
          <strong>Name:</strong> {owner.givenName || ''} {owner.familyName || ''}<br/>
          <strong>Firma:</strong> {owner.company || '-'}<br/>
          <strong>Email:</strong> {owner.email || '-'}<br/>
          <strong>Telefon:</strong> {owner.phone || '-'}
        </Text>

        {#if owner.address || owner.city}
          <Text style="margin: 10px 0 5px 0; font-size: 14px;">
            <strong>Adresse:</strong><br />
            {owner.address || ''}<br />
            {owner.postCode || ''} {owner.city || ''}<br />
            {owner.country || ''}
          </Text>
        {/if}
      </Section>

      <Hr />

      <!-- Project Overview -->
      <Section style="padding: 30px 20px; background-color: #fdf0d5;">
        <Text style="font-size: 22px; color: #c1121f; margin-bottom: 15px; font-weight: bold;">
          📋 Projekt-Übersicht
        </Text>
        
        <Text style="margin: 5px 0; font-size: 14px;">
          <strong>Kategorie:</strong> {projectData.projectCategory || '-'}<br/>
          <strong>Projekttyp:</strong> {projectData.projectType || '-'}<br/>
          <strong>Subtyp:</strong> {projectData.subType || '-'}
        </Text>
        
        {#if projectData.description}
          <Text style="margin: 15px 0 5px 0; font-size: 14px;">
            <strong>Beschreibung:</strong>
          </Text>
          <Text style="margin: 0; font-size: 14px; background-color: #ffffff; padding: 10px; border-radius: 5px;">
            {projectData.description}
          </Text>
        {/if}
      </Section>

      <Hr />

      <!-- Project Goals & Audience -->
      {#if projectData.projectGoal || projectData.targetAudience}
        <Section style="padding: 30px 20px;">
          <Text style="font-size: 22px; color: #c1121f; margin-bottom: 15px; font-weight: bold;">
            🎯 Ziel & Zielgruppe
          </Text>
          
          {#if projectData.projectGoal}
            <Text style="margin: 5px 0; font-size: 14px;">
              <strong>Projektziel:</strong>
            </Text>
            <Text style="margin: 0 0 15px 0; font-size: 14px; background-color: #f5f5f5; padding: 10px; border-radius: 5px;">
              {projectData.projectGoal}
            </Text>
          {/if}

          {#if projectData.targetAudience}
            <Text style="margin: 5px 0; font-size: 14px;">
              <strong>Zielgruppe:</strong>
            </Text>
            <Text style="margin: 0; font-size: 14px; background-color: #f5f5f5; padding: 10px; border-radius: 5px;">
              {projectData.targetAudience}
            </Text>
          {/if}
        </Section>

        <Hr />
      {/if}

      <!-- Service Level & Engineering -->
      {#if projectData.serviceLevel !== undefined || projectData.engineeringApproach !== undefined}
        <Section style="padding: 30px 20px; background-color: #fdf0d5;">
          <Text style="font-size: 22px; color: #c1121f; margin-bottom: 15px; font-weight: bold;">
            ⚙️ Zusammenarbeit & Umsetzung
          </Text>
          
          <Text style="margin: 5px 0; font-size: 14px;">
            {#if projectData.serviceLevel !== undefined}
              <strong>Service-Level:</strong> {getServiceLevelText(projectData.serviceLevel)} ({projectData.serviceLevel}/100)<br/>
            {/if}
            {#if projectData.engineeringApproach !== undefined}
              <strong>Engineering-Ansatz:</strong> {getEngineeringText(projectData.engineeringApproach)} ({projectData.engineeringApproach}/100)
            {/if}
          </Text>
        </Section>

        <Hr />
      {/if}

      <!-- Timeline & Budget -->
      {#if projectData.timelinePreference || projectData.budgetRange}
        <Section style="padding: 30px 20px;">
          <Text style="font-size: 22px; color: #c1121f; margin-bottom: 15px; font-weight: bold;">
            ⏱️ Timeline & Budget
          </Text>
          
          <Text style="margin: 5px 0; font-size: 14px;">
            {#if projectData.timelinePreference}
              <strong>Timeline:</strong> {getTimelineText(projectData.timelinePreference)}<br/>
              {#if projectData.specificDeadline && projectData.timelinePreference === 'deadline'}
                <strong>Deadline:</strong> {new Date(projectData.specificDeadline).toLocaleDateString('de-DE')}<br/>
              {/if}
            {/if}
            {#if projectData.budgetRange}
              <strong>Budget:</strong> {getBudgetText(projectData.budgetRange)}
            {/if}
          </Text>
        </Section>

        <Hr />
      {/if}

      <!-- Features -->
      {#if projectData.features && projectData.features.length > 0}
        <Section style="padding: 30px 20px; background-color: #fdf0d5;">
          <Text style="font-size: 22px; color: #c1121f; margin-bottom: 15px; font-weight: bold;">
            🎨 Features ({projectData.features.length})
          </Text>
          
          <Text style="margin: 0; font-size: 14px;">
            {projectData.features.join(', ')}
          </Text>
        </Section>

        <Hr />
      {/if}

      <!-- Special Requirements -->
      {#if projectData.specialRequirements}
        <Section style="padding: 30px 20px;">
          <Text style="font-size: 22px; color: #c1121f; margin-bottom: 15px; font-weight: bold;">
            ✨ Besondere Anforderungen
          </Text>
          
          <Text style="margin: 0; font-size: 14px; background-color: #f5f5f5; padding: 10px; border-radius: 5px;">
            {projectData.specialRequirements}
          </Text>
        </Section>
        
        <Hr />
      {/if}

      <!-- Price Estimation -->
      {#if projectData.estimatedPrice}
        <Section style="padding: 30px 20px; background-color: #003049; text-align: center;">
          <Text style="font-size: 22px; color: #fdf0d5; margin-bottom: 10px; font-weight: bold;">
            💰 Geschätzter Preis
          </Text>
          
          <Text style="margin: 0; font-size: 36px; font-weight: bold; color: #ffffff;">
            {Math.round(projectData.estimatedPrice).toLocaleString('de-DE')} €
          </Text>
          
          <Text style="margin: 10px 0 0 0; font-size: 12px; color: #fdf0d5;">
            Dies ist eine unverbindliche Schätzung auf Basis der Wizard-Eingaben
          </Text>
        </Section>

        <Hr />
      {/if}

      <!-- PWA/CMS Details -->
      {#if projectData.pwaApproach || projectData.cmsComplexity}
        <Section style="padding: 30px 20px;">
          <Text style="font-size: 22px; color: #c1121f; margin-bottom: 15px; font-weight: bold;">
            🔧 Spezifische Details
          </Text>
          
          <Text style="margin: 5px 0; font-size: 14px;">
            {#if projectData.pwaApproach}
              <strong>PWA-Ansatz:</strong> {projectData.pwaApproach === 'new' ? 'Neue PWA erstellen' : 'Bestehende Website erweitern'}<br/>
              {#if projectData.pwaExistingUrl}
                <strong>Bestehende URL:</strong> {projectData.pwaExistingUrl}<br/>
              {/if}
            {/if}
            {#if projectData.cmsComplexity !== undefined}
              <strong>CMS-Komplexität:</strong> {projectData.cmsComplexity}/100<br/>
              {#if projectData.cmsContentStructure}
                <strong>Content-Struktur:</strong> {projectData.cmsContentStructure}
              {/if}
            {/if}
          </Text>
        </Section>

        <Hr />
      {/if}

      <!-- Footer -->
      <Section style="padding: 20px; background-color: #f5f5f5; text-align: center;">
        <Text style="margin: 0; font-size: 12px; color: #666;">
          Diese Email wurde automatisch vom Wizard-System generiert<br />
          RASPB Webservices © {new Date().getFullYear()}
        </Text>
      </Section>
    </Container>
  </Body>
</Html>
