<script lang="ts">
  import { _ } from 'svelte-i18n';
  
  let { projects, selectedProject, editingProject, setupForm } = $props();
  let setupSaving = $state(false);
  let setupError = $state('');
  let modal: HTMLDialogElement;

  export function openModal() {
    modal?.showModal();
  }
  export function closeModal() {
    modal?.close();
  }
  async function saveProjectSetup() {
    if (!editingProject) return;

    setupSaving = true;
    setupError = '';

    try {
      // Auth-Tokens JSON parsen
      const parseAuthTokens = (tokenString: string) => {
        if (!tokenString.trim()) return null;
        try {
          return JSON.parse(tokenString);
        } catch (e) {
          throw new Error('Ungültiges JSON-Format in Auth Tokens');
        }
      };

      const setupData = {
        github: {
          username: setupForm.github.username || null,
          password: setupForm.github.password || null,
          authTokens: parseAuthTokens(setupForm.github.authTokens),
          isConfigured: setupForm.github.isConfigured,
          lastUpdated: new Date().toISOString()
        },
        netlify: {
          username: setupForm.netlify.username || null,
          password: setupForm.netlify.password || null,
          authTokens: parseAuthTokens(setupForm.netlify.authTokens),
          isConfigured: setupForm.netlify.isConfigured,
          lastUpdated: new Date().toISOString()
        },
        hygraph: {
          username: setupForm.hygraph.username || null,
          password: setupForm.hygraph.password || null,
          authTokens: parseAuthTokens(setupForm.hygraph.authTokens),
          isConfigured: setupForm.hygraph.isConfigured,
          lastUpdated: new Date().toISOString()
        },
        auth0: {
          username: setupForm.auth0.username || null,
          password: setupForm.auth0.password || null,
          authTokens: parseAuthTokens(setupForm.auth0.authTokens),
          isConfigured: setupForm.auth0.isConfigured,
          lastUpdated: new Date().toISOString()
        }
      };

      const response = await fetch(`/api/project/patch/${editingProject.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: editingProject.id,
          setup: setupData
        })
      });

      const result = await response.json();

      if (response.ok) {
        // Projekt in der Liste aktualisieren
        const projectIndex = editingProject.findIndex((p) => p.id === editingProject.id);
        if (projectIndex !== -1) {
          projects[projectIndex] = { ...projects[projectIndex], setup: setupData };
        }

        // Ausgewähltes Projekt aktualisieren falls es das gleiche ist
        if (selectedProject?.id === editingProject.id) {
          selectedProject = { ...selectedProject, setup: setupData };
        }

        closeModal();
      } else {
        setupError = result.error || 'Fehler beim Speichern der Setup-Daten';
      }
    } catch (error) {
      console.error('Error saving setup:', error);
      setupError = error instanceof Error ? error.message : 'Unbekannter Fehler beim Speichern';
    } finally {
      setupSaving = false;
    }
  }
</script>

<dialog bind:this={modal} class="modal">
  <div class="modal-box w-11/12 max-w-4xl">

      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute top-4 right-4" onclick={closeModal}>✕</button>
      </form>

      <h3 class="mb-4 text-lg font-bold">Service Setup bearbeiten - {editingProject.name}</h3>

      {#if setupError}
        <div class="alert alert-error mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{setupError}</span>
        </div>
      {/if}

      <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
        <!-- GitHub Setup -->
        <div class="card bg-base-200">
          <div class="card-body">
            <div class="mb-4 flex items-center gap-2">
              <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                />
              </svg>
              <h4 class="card-title text-base">GitHub</h4>
            </div>

            <div class="space-y-4">
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Username</span>
                </label>
                <input type="text" bind:value={setupForm.github.username} placeholder="GitHub Username" class="input input-bordered input-sm" />
              </div>

              <div class="form-control">
                <label class="label">
                  <span class="label-text">Passwort</span>
                </label>
                <input type="password" bind:value={setupForm.github.password} placeholder="GitHub Passwort" class="input input-bordered input-sm" />
              </div>

              <div class="form-control">
                <label class="label">
                  <span class="label-text">Auth Tokens (JSON)</span>
                </label>
                <textarea bind:value={setupForm.github.authTokens} placeholder="Token" class="textarea textarea-bordered textarea-sm h-20 font-mono text-xs"
                ></textarea>
              </div>

              <div class="form-control">
                <label class="label cursor-pointer">
                  <span class="label-text">Konfiguriert</span>
                  <input type="checkbox" bind:checked={setupForm.github.isConfigured} class="checkbox checkbox-primary" />
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- Netlify Setup -->
        <div class="card bg-base-200">
          <div class="card-body">
            <div class="mb-4 flex items-center gap-2">
              <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.042-3.441.219-.937 1.404-5.965 1.404-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.888-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.357-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-12C24.007 5.367 18.641.001.017.001z"
                />
              </svg>
              <h4 class="card-title text-base">Netlify</h4>
            </div>

            <div class="space-y-4">
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Username</span>
                </label>
                <input type="text" bind:value={setupForm.netlify.username} placeholder="Netlify Username" class="input input-bordered input-sm" />
              </div>

              <div class="form-control">
                <label class="label">
                  <span class="label-text">Passwort</span>
                </label>
                <input type="password" bind:value={setupForm.netlify.password} placeholder="Netlify Passwort" class="input input-bordered input-sm" />
              </div>

              <div class="form-control">
                <label class="label">
                  <span class="label-text">Auth Tokens (JSON)</span>
                </label>
                <textarea bind:value={setupForm.netlify.authTokens} placeholder="Token" class="textarea textarea-bordered textarea-sm h-20 font-mono text-xs"
                ></textarea>
              </div>

              <div class="form-control">
                <label class="label cursor-pointer">
                  <span class="label-text">Konfiguriert</span>
                  <input type="checkbox" bind:checked={setupForm.netlify.isConfigured} class="checkbox checkbox-primary" />
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- Hygraph Setup -->
        <div class="card bg-base-200">
          <div class="card-body">
            <div class="mb-4 flex items-center gap-2">
              <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M12 0L1.608 6v12L12 24l10.392-6V6L12 0zm-1.073 18.564L5.5 15.846V8.154l5.427 2.718v7.692zm2.146 0V10.872L18.5 8.154v7.692l-5.427 2.718zM12 9.282L6.573 6.564 12 3.846l5.427 2.718L12 9.282z"
                />
              </svg>
              <h4 class="card-title text-base">Hygraph</h4>
            </div>

            <div class="space-y-4">
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Username</span>
                </label>
                <input type="text" bind:value={setupForm.hygraph.username} placeholder="Hygraph Username" class="input input-bordered input-sm" />
              </div>

              <div class="form-control">
                <label class="label">
                  <span class="label-text">Passwort</span>
                </label>
                <input type="password" bind:value={setupForm.hygraph.password} placeholder="Hygraph Passwort" class="input input-bordered input-sm" />
              </div>

              <div class="form-control">
                <label class="label">
                  <span class="label-text">Auth Tokens (JSON)</span>
                </label>
                <textarea bind:value={setupForm.hygraph.authTokens} placeholder="Token" class="textarea textarea-bordered textarea-sm h-20 font-mono text-xs"
                ></textarea>
              </div>

              <div class="form-control">
                <label class="label cursor-pointer">
                  <span class="label-text">Konfiguriert</span>
                  <input type="checkbox" bind:checked={setupForm.hygraph.isConfigured} class="checkbox checkbox-primary" />
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- Auth0 Setup -->
        <div class="card bg-base-200">
          <div class="card-body">
            <div class="mb-4 flex items-center gap-2">
              <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M21.98 7.448L19.62 0H4.347L2.02 7.448c-1.352 4.312.03 9.206 3.815 12.015L12.007 24l6.157-4.537c3.785-2.809 5.167-7.703 3.815-12.015z"
                />
              </svg>
              <h4 class="card-title text-base">Auth0</h4>
            </div>

            <div class="space-y-4">
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Username</span>
                </label>
                <input type="text" bind:value={setupForm.auth0.username} placeholder="Auth0 Username" class="input input-bordered input-sm" />
              </div>

              <div class="form-control">
                <label class="label">
                  <span class="label-text">Passwort</span>
                </label>
                <input type="password" bind:value={setupForm.auth0.password} placeholder="Auth0 Passwort" class="input input-bordered input-sm" />
              </div>

              <div class="form-control">
                <label class="label">
                  <span class="label-text">Auth Tokens (JSON)</span>
                </label>
                <textarea bind:value={setupForm.auth0.authTokens} placeholder="Token" class="textarea textarea-bordered textarea-sm h-20 font-mono text-xs"
                ></textarea>
              </div>

              <div class="form-control">
                <label class="label cursor-pointer">
                  <span class="label-text">Konfiguriert</span>
                  <input type="checkbox" bind:checked={setupForm.auth0.isConfigured} class="checkbox checkbox-primary" />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="modal-action mt-6">
        <button type="button" class="btn btn-ghost" onclick={closeModal}> Abbrechen </button>
        <button type="button" class="btn btn-simple" onclick={saveProjectSetup} disabled={setupSaving}>
          {#if setupSaving}
            <span class="loading loading-spinner loading-sm"></span>
            Speichern...
          {:else}
            Speichern
          {/if}
        </button>
      </div>

  </div>
  <form method="dialog" class="modal-backdrop">
    <button onclick={closeModal}>close</button>
  </form>
</dialog>

<style lang="postcss">
  @reference '../../../../app.css';
</style>