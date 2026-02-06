<script lang="ts">
  import { colors, fontStack } from './emailTheme';
  import { Body, Button, Container, Head, Hr, Html, Img, Link, Preview, Section, Text } from '@sveltelaunch/svelte-5-email';

  const headlineStyle = {
    color: colors.brandPurple,
    fontWeight: '700',
    fontSize: '22px',
    margin: '0'
  };

  export let recipientName: string | null = 'Markus';
  export let headline = 'Guten Tag!';
</script>

<Html lang="en">
  <Section style={{ padding: '24px 28px 10px 28px', backgroundColor: '#fafafa' }}>
    <!-- PNG empfohlen (SVG ist in vielen Mail-Clients problematisch) -->
    <Img src="cid:raspb-logo" alt="raspb" width="180" height="84" style={{ display: 'block' }} />
    <Text style={headlineStyle}>{headline}</Text>
  </Section>
  <Section>
    <Text>Hello, {recipientName}!</Text>
    <Text>{headline}</Text>
    <Button href="https://svelte.dev">Visit Svelte</Button>
  </Section>
</Html>
