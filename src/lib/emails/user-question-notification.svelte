<script lang="ts">
  import { Html, Head, Body, Container, Section, Text, Hr } from 'better-svelte-email';

  let { question = '', email = null }: { question: string; email: string | null } = $props();
</script>

<Html class="bg-zinc-100">
  <Head />
  <Body>
    <Container class="m-8 mx-auto max-w-lg rounded-2xl bg-white p-8">
      <Section class="mx-auto">
        <Text class="text-2xl font-bold text-purple-600">Neue Frage aus dem FAQ-Bereich</Text>
        <Hr />
        <Text class="mt-3 font-semibold text-zinc-800">Frage:</Text>
        <Text class="whitespace-pre-wrap text-zinc-700">{question}</Text>
        {#if email}
          <Text class="mt-4 font-semibold text-zinc-800">E-Mail des Fragenden:</Text>
          <Text class="text-purple-600">{email}</Text>
        {:else}
          <Text class="mt-4 italic text-zinc-400">Keine E-Mail-Adresse angegeben.</Text>
        {/if}
        <Hr />
        <Text class="text-xs text-zinc-400">Diese Nachricht wurde automatisch generiert.</Text>
      </Section>
    </Container>
  </Body>
</Html>
