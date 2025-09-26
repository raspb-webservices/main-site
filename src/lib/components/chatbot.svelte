<script lang="ts">
  import { onMount } from "svelte";

  interface Message {
    id: number;
    sender: "user" | "bot";
    text: string;
  }

  let messages: Message[] = [];
  let input: string = "";
  let loading = false;
  let isOpen = false; // State to control chat window visibility

  const webhookUrl =
    "https://n8n.raspb.eu/webhook/4a5f6f4f-1ef8-4be3-bd70-1bfe0297b182/chat";

  async function sendMessage() {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      sender: "user",
      text: input,
    };
    messages = [...messages, userMessage];

    const currentInput = input;
    input = "";
    loading = true;

    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: currentInput }),
      });

      const data = await res.json();

      const botMessage: Message = {
        id: Date.now() + 1,
        sender: "bot",
        text: data?.reply ?? JSON.stringify(data) ?? "Fehler: Keine Antwort erhalten", // Display full data if 'reply' is missing
      };
      messages = [...messages, botMessage];
    } catch (err) {
      messages = [
        ...messages,
        {
          id: Date.now() + 2,
          sender: "bot",
          text: "❌ Fehler beim Senden.",
        },
      ];
    } finally {
      loading = false;
    }
  }

  function handleKey(e: KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }
</script>

<div class="fixed bottom-4 right-4 z-50">
  <!-- Chatbot Button -->
  <button
    class="btn btn-primary btn-circle shadow-lg"
    on:click={() => (isOpen = !isOpen)}
  >
    {#if isOpen}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    {:else}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.75 9.75 0 01-3.105-.555L3 20.25l1.394-4.645A11.25 11.22 0 002.25 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
        />
      </svg>
    {/if}
  </button>

  <!-- Chat window -->
  {#if isOpen}
    <div
      class="absolute bottom-20 right-0 flex flex-col w-80 h-[400px] bg-base-200 rounded-2xl shadow-xl overflow-hidden"
    >
      <div class="flex-1 p-4 overflow-y-auto space-y-2">
        {#each messages as msg (msg.id)}
          <div
            class="chat"
            class:chat-start={msg.sender === "bot"}
            class:chat-end={msg.sender === "user"}
          >
            <div
              class="chat-bubble"
              class:bg-primary={msg.sender === "user"}
              class:bg-secondary={msg.sender === "bot"}
            >
              {msg.text}
            </div>
          </div>
        {/each}

        {#if loading}
          <div class="chat chat-start">
            <div class="chat-bubble bg-secondary animate-pulse">
              …
            </div>
          </div>
        {/if}
      </div>

      <!-- Input -->
      <form
        class="p-3 bg-base-300 flex gap-2"
      >
        <textarea
          bind:value={input}
          rows="1"
          placeholder="Nachricht eingeben..."
          class="textarea textarea-bordered flex-1 resize-none"
          on:keydown={handleKey}
        ></textarea> <!-- Fixed self-closing tag -->
        <button type="button" on:click={sendMessage}>Senden</button>
      </form>
    </div>
  {/if}
</div>

<style lang="postcss">
  @reference '../../app.css';
</style>
