<script lang="ts">
  import { Html, Head, Body, Container, Section, Text, Button } from 'better-svelte-email';
  import { colors } from './emailTheme';

  let { recipientName = 'Markus', headline = 'Guten Tag!' }: { recipientName?: string; headline?: string } = $props();
</script>

<Html class="bg-zinc-100">
  <Head />
  <Body>
    <Container class="m-8 mx-auto max-w-lg rounded-2xl bg-white p-8">
      <Section class="mx-auto text-center">
        <img src="cid:raspb-logo" alt="raspb" width="180" height="84" style="display: block" />
        <Text class="text-2xl font-bold" style="color: {colors.brandPurple}">{headline}</Text>
        <Text class="text-xl text-zinc-700">Hello, {recipientName}!</Text>
        <Button href="https://svelte.dev" pX={30} pY={20} class="m-3 rounded-lg border border-zinc-200 text-zinc-900">Visit Svelte</Button>
      </Section>
    </Container>
  </Body>
</Html>
