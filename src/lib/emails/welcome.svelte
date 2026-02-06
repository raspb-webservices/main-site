<script lang="ts">
  import { Html, Head, Body, Preview, Container, Section, Text, Button, Row } from 'better-svelte-email';

  let { recipientName = 'Max Mustermann', headline = 'Guten Tag!' } = $props();
</script>

<Html class="bg-zinc-100">
  <Head />
  <Body>
    <!-- Preview is 70 chars long! -->
    <Preview preview="This is an awesome Welcome Email and this line of text represents the..." />
    <Container class="m-8 mx-auto max-w-lg rounded-2xl bg-white p-8">
      <Section class="mx-auto text-center">
        <Text class="text-2xl font-bold text-zinc-900">Welcome {recipientName}!</Text>
        <Text class="text-xl text-zinc-700">{headline}!</Text>
        <Text class="mt-3 text-zinc-600">Better Svelte Email converts Svelte components into email-safe HTML.</Text>
        <Row class="mt-6">
          <Button href="https://raspb.de" pX={30} pY={20} class="m-3 rounded-lg border border-zinc-200 text-zinc-900">Go to raspb home page</Button>
        </Row>
      </Section>
    </Container>
  </Body>
</Html>
