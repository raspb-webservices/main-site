# AGENTS.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Package Manager

This project uses **Yarn v4 (Berry)** — always use `yarn`, never `npm` or `pnpm`.

## Commands

```bash
yarn dev          # Start dev server (localhost:5173)
yarn build        # svelte-kit sync + vite build (production)
yarn preview      # Preview production build locally
yarn check        # TypeScript + Svelte type checking (svelte-check)
yarn check:watch  # Type checking in watch mode
yarn lint         # Prettier check + ESLint
yarn format       # Prettier auto-format
```

There are no test commands — this project has no automated test suite.

When verifying changes during a build, ensure the required private env vars are set (see Environment Variables below), otherwise the build will fail at server-side imports.

## Environment Variables

Required in `.env.local`. Public vars (accessible in browser) are prefixed `PUBLIC_`:

| Variable | Purpose |
|---|---|
| `PUBLIC_VITE_AUTH0_DOMAIN` | Auth0 tenant domain |
| `PUBLIC_VITE_AUTH0_CLIENT_ID` | Auth0 SPA client ID |
| `PUBLIC_VITE_AUTH0_CALLBACK_URL` | Auth0 redirect URI |
| `PUBLIC_VITE_AUTH0_AUDIENCE` | Auth0 API audience (also used as base URL for Management API calls) |
| `PUBLIC_VITE_AUTH0_TOKEN_URL` | Auth0 token endpoint |
| `PUBLIC_GRAPHQL_ENDPOINT` | Hygraph GraphQL endpoint |
| `PUBLIC_PLAUSIBLE_DOMAIN` | Plausible analytics domain |
| `PUBLIC_PLAUSIBLE_API_HOST` | Self-hosted Plausible instance URL |
| `VITE_AUTH0_CLIENT_SECRET` | Auth0 Management API client secret (server-only) |
| `GRAPHQL_TOKEN` | Hygraph bearer token (server-only) |
| `MAILTRAP_TOKEN` | Mailtrap email API token (server-only) |
| `UPSTASH_REDIS_REST_URL` | Upstash Redis URL for rate limiting (server-only) |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash Redis token (server-only) |

## Architecture Overview

### Stack

- **SvelteKit** (Svelte 5 with runes) + TypeScript
- **Tailwind CSS v4** + DaisyUI v5 for styling
- **Netlify** deployment via `@sveltejs/adapter-netlify`
- **Paraglide.js** for i18n (German/English)
- **Hygraph** (GraphQL CMS) for content
- **Auth0** for authentication
- **Mailtrap** for transactional email
- **Upstash Redis** for API rate limiting

### Route Structure

Routes live in `src/routes/` with two layout groups:

- **`(main)/`** — all standard pages; uses `+layout.svelte` that wraps content with `<HEADER>`, `<FOOTER>`, a Lottie page transition loader, and cookie consent. Auth session is checked in `onMount` here.
- **`solutions/`** — standalone pages (e.g. printable solution briefs) with their own minimal layout.
- **`(main)/api/`** — all API endpoints as SvelteKit server routes (`+server.ts`).

### Server-Side Middleware (`src/hooks.server.ts`)

Three hooks run in sequence for every request:

1. **`handleAuth`** — Applies to `/api/` routes only. Reads `Authorization: Bearer <token>`, validates it with `jose` (JWKS from Auth0), and populates `event.locals.user`. Enforces three auth levels defined in `src/lib/server/route-auth.server.ts`:
   - `public` — no token needed (but rate-limited POST endpoints)
   - `auth` — valid JWT required
   - `admin` — valid JWT + Auth0 Management API admin check required
2. **`handleLocaleRedirect`** — Redirects document requests to the locale-prefixed URL (e.g. `/about-us` → `/de/ueber-uns`).
3. **`handleParaglide`** — Injects the active locale into the rendered HTML.

### Authentication Flow

**Client side** (`src/lib/services/auth-service.ts`):
- Uses `@auth0/auth0-spa-js` singleton client
- On login (`loginWithPopup`): fetches user, stores JWT in `idToken` global state, loads Auth0 user metadata, fetches roles. First-time users auto-get the `customer` role.
- On app load (`checkSession`): silently revalidates session via refresh token.

**Making authenticated API calls** (client → SvelteKit API):
- Use `authFetch()` from `$helper/auth-fetch` — automatically attaches `Authorization: Bearer <idToken>` header.

**Server-side JWT validation** (`src/lib/server/auth.server.ts`):
- Uses `jose` + remote JWKS. Validates issuer/audience and extracts `sub` + `email`.

### Global State (`src/store/sharedStates.svelte.ts`)

Svelte 5 rune-based class instances (not stores):
- `isAuthenticated.value` — boolean
- `user.value` — `User` object
- `userroles.value` — `string[]` of role names
- `idToken.value` — raw JWT string for API calls

Import: `import { isAuthenticated, user, userroles, idToken } from '$store/sharedStates.svelte'`

### CMS Integration (Hygraph)

- GraphQL client: `src/lib/server/graphql-client.server.ts` — a single `GraphQLClient` instance using `GRAPHQL_TOKEN`.
- Only used server-side (`.server.ts` files). Queries are written inline with `gql` template literals.
- Content is read from `stage: PUBLISHED`. Mutations use the `@hygraph/management-sdk` for asset management.

### i18n (Paraglide.js)

- **Source messages**: `messages/` at the repo root (JSON files per locale).
- **Generated output**: `src/lib/paraglide/` — **do not edit manually**; regenerated on build.
- **Usage in components**: `import { m } from '$lib/paraglide/messages'` then call `m.message_key()`.
- **Locale detection strategy**: URL → cookie → browser preference → base locale (`de`).
- URL patterns are explicitly mapped in `vite.config.ts` (e.g. `/about-us` → `/de/ueber-uns` / `/en/about-us`). Add new localized routes there.

### Path Aliases (from `svelte.config.js`)

| Alias | Resolves to |
|---|---|
| `$store` | `src/store` |
| `$helper` | `src/lib/helper` |
| `$components` | `src/lib/components` |
| `$configs` | `src/lib/configs` |
| `$services` | `src/lib/services` |
| `$interfaces` | `src/interfaces` |
| `$images` | `src/lib/assets/images` |
| `$icons` | `src/lib/assets/icons` |
| `$fonts` | `src/lib/assets/fonts` |
| `$lotties` | `src/lib/assets/lotties` |

### API Route Conventions

Each API endpoint (`+server.ts`) typically:
1. Receives `locals.user` already populated by `handleAuth` (no need to re-validate token).
2. Parses and validates the request body using Zod schemas from `src/lib/server/schemas/` via `validateBody()` from `src/lib/server/validate.server.ts`.
3. Calls the Hygraph GraphQL client or Auth0 Management API.
4. Returns JSON responses; errors use `apiErrorResponse()` from `src/lib/server/api-error.server.ts`.

### Code Style

- 2-space indent, single quotes, no trailing commas, 160-char line width (`.prettierrc`)
- Unused variables prefixed with `_` are ignored by ESLint
- `svelte/no-at-html-tags` is disabled (HTML rendering is used intentionally)
- Files named `*.server.ts` are server-only; never import them from client-side code

### Content Security Policy

A strict CSP is configured in `svelte.config.js`. When integrating new external services (fonts, images, scripts, API connections), add their origins to the relevant directives there.
