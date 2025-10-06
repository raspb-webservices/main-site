<script lang="ts">
  import { onMount } from 'svelte';
  import '@n8n/chat/style.css';
  import { createChat } from '@n8n/chat';

  let isOpen = $state(false);

  onMount(() => {
    createChat({
      webhookUrl: 'https://n8n.raspb.eu/webhook/4a5f6f4f-1ef8-4be3-bd70-1bfe0297b182/chat',
      initialMessages: ['Hallo 👋', 'Mein Name ist Albert. Wie kann ich helfen?'],
      i18n: {
        en: {
          title: 'Wollen wir chatten? 👋',
          subtitle: 'Legen wir los...',
          footer: '',
          getStarted: 'Neue Unterhaltung',
          inputPlaceholder: 'Starten Sie mit Ihrer Frage',
          closeButtonTooltip: 'Chat schließen'
        },
        de: {
          title: 'Hallo, wie gehts? 👋',
          subtitle: 'Beginne zu chatten',
          footer: '',
          getStarted: 'Neue Unterhaltung',
          inputPlaceholder: 'Starten Sie mit Ihrer Frage',
          closeButtonTooltip: 'Chat schließen'
        }
      }
    });
  });
</script>

<div id="n8n-chat"></div>

<style lang="postcss">
  @reference '../../app.css';

  :root {
    --chat--color-primary: var(--color-primary);
    --chat--color-primary-shade-50: #a31b64;
    --chat--color-primary-shade-100: #a51562;
    --chat--color-secondary: var(--color-secondary);
    --chat--color-secondary-shade-50: #1ca08a;
    --chat--color-white: #ffffff;
    --chat--color-light: #f2f4f8;
    --chat--color-light-shade-50: #e6e9f1;
    --chat--color-light-shade-100: #c2c5cc;
    --chat--color-medium: #d2d4d9;
    --chat--color-dark: #101330;
    --chat--color-disabled: #777980;
    --chat--color-typing: #404040;

    --chat--spacing: 1rem;
    --chat--border-radius: 0.25rem;
    --chat--transition-duration: 0.15s;

    --chat--window--width: 450px;
    --chat--window--height: 650px;

    --chat--header-height: auto;
    --chat--header--padding: var(--chat--spacing);
    --chat--header--background: var(--chat--color-primary-shade-50);
    --chat--header--color: var(--chat--color-light);
    --chat--header--border-top: none;
    --chat--header--border-bottom: none;
    --chat--header--border-bottom: none;
    --chat--header--border-bottom: none;
    --chat--heading--font-size: 2em;
    --chat--header--color: var(--chat--color-light);
    --chat--subtitle--font-size: inherit;
    --chat--subtitle--line-height: 1.8;

    --chat--textarea--height: 50px;

    --chat--message--font-size: 1rem;
    --chat--message--padding: var(--chat--spacing);
    --chat--message--border-radius: var(--chat--border-radius);
    --chat--message-line-height: 1.8;
    --chat--message--bot--background: #3d4451;
    --chat--message--bot--color: var(--chat--color-white);
    --chat--message--bot--border: none;
    --chat--message--user--background: #6d46e6;
    --chat--message--user--color: var(--chat--color-white);
    --chat--message--user--border: none;
    --chat--message--pre--background: rgba(0, 0, 0, 0.05);

    --chat--toggle--background: var(--chat--color-primary);
    --chat--toggle--hover--background: var(--chat--color-primary-shade-50);
    --chat--toggle--active--background: var(--chat--color-primary-shade-100);
    --chat--toggle--color: var(--chat--color-white);
    --chat--toggle--size: 64px;
  }
</style>
