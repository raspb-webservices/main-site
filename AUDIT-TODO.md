# Audit TODO

Stand: 2026-02-11

## OFFEN - Kritisch

### 1. API-Routes ohne Authentifizierung

- **Schwere:** Kritisch | **Aufwand:** Gross
- **Status:** Offen - erfordert Architektur-Entscheidungen vor Umsetzung

#### Ist-Zustand

Aktuell gibt es **36+ API-Endpoints** unter `src/routes/api/` - **keiner davon prueft, ob der Aufrufer eingeloggt oder berechtigt ist**. In `hooks.server.ts` existiert ausschliesslich die Paraglide-Middleware fuer Sprach-Routing, aber keinerlei Auth-Middleware.

#### Betroffene Bereiche (nach Risiko sortiert)

**Auth-Proxy (KRITISCH):**
Die 7 Routes unter `src/routes/api/auth/*` sind generische Proxys zur Auth0 Management API. Sie nutzen einen Machine-to-Machine-Token (client_credentials) mit vollen Rechten. Der `[url]`-Parameter wird direkt an Auth0 durchgereicht:

```
GET  /api/auth/get/users?q=email:"%"     → Alle Auth0-User enumerieren
POST /api/auth/post/users/[id]/roles     → Beliebigen Usern Rollen zuweisen
DELETE /api/auth/delete/users/[id]       → User-Accounts loeschen
PATCH /api/auth/patch/users/[id]         → User-Daten aendern
```

Ein Angreifer koennte sich selbst Admin-Rechte geben, andere User loeschen oder saemtliche Accounts auslesen.

**Customer-Routes (HOCH):**
`/api/customer/get` liefert **alle Kundendaten inkl. PII** (Name, E-Mail, Telefon, Adresse, Firma, Auth0-ID) ohne jegliche Zugangskontrolle. Modifikation ist ebenso ungeschuetzt:

```
GET   /api/customer/get                    → Alle Kundendaten (PII)
GET   /api/customer/get/byMail/[email]     → Gezielte Abfrage per E-Mail
PATCH /api/customer/patch/byMail/[email]   → Kundendaten aendern
POST  /api/customer/create                 → Fake-Kunden anlegen
```

**Project-Routes (HOCH):**
Projekte enthalten Budget, Design-Specs, Formular-Felder und Owner-Daten. Alles lesbar und schreibbar ohne Auth:

```
GET   /api/project/get                → Alle Projekte mit Owner-Daten
PATCH /api/project/patch/[id]         → Beliebige Projekte aendern
POST  /api/project/create             → Unbegrenzt Projekte anlegen
```

**Mail-Route (MITTEL):**
`POST /api/mail/send` erlaubt das Versenden von E-Mails von der Applikations-Domain ohne Auth oder Rate-Limiting. Kann fuer Spam/Phishing missbraucht werden.

**Content/Enum-Routes (NIEDRIG):**
Liefern nur oeffentliche CMS-Inhalte und Schema-Enums. Koennen oeffentlich bleiben.

#### Empfohlenes Vorgehen

**Schritt 1 - Server-Hook fuer Token-Validierung (`hooks.server.ts`)**
- Client sendet bei jedem API-Call das Auth0 ID-Token im `Authorization`-Header mit
- Server-Hook validiert das Token mit Auth0 JWKS (z.B. `jose` Library)
- Validierter User wird in `event.locals.user` gespeichert
- Oeffentliche Routes (content, enums) werden per Allowlist ausgenommen

**Schritt 2 - Generischen Auth-Proxy durch spezifische Endpoints ersetzen**
- Die 7 generischen `[url]`-Proxys durch konkrete Endpoints ersetzen:
  - `POST /api/auth/create-user` (nur Registration)
  - `POST /api/auth/assign-role` (nur nach Registrierung, serverseitig)
  - `PATCH /api/auth/update-metadata` (nur eigene Metadata)
  - `GET /api/auth/user-roles/[id]` (nur eigene Rollen)
- Kein freier Durchgriff auf die Auth0 Management API mehr

**Schritt 3 - Ownership-Checks in Business-Routes**
- Customer-Routes: User darf nur eigene Daten lesen/aendern (Abgleich Auth0-ID)
- Project-Routes: User darf nur Projekte sehen/aendern, die ihm gehoeren (owner.id)
- Admin-Role: Admins duerfen alles sehen und aendern

**Schritt 4 - Rate-Limiting fuer sensible Endpoints**
- Mail-Route: Max. X Mails pro Minute/User
- Create-Endpoints: Max. Y Erstellungen pro Minute

#### Aufwand-Schaetzung
- hooks.server.ts + Token-Validierung: ~2-3h
- Auth-Proxy-Umbau (7 Routes → 4 spezifische): ~3-4h
- Ownership-Guards in Business-Routes (~20 Routes): ~4-6h
- Testing + Edge-Cases: ~2-3h
- **Gesamt: ~12-16h**

---

### 2. Keine Input-Validierung in API-Routes

- **Schwere:** Hoch | **Aufwand:** Gross
- **Status:** Offen - sollte zusammen mit Auth umgesetzt werden

#### Ist-Zustand

Alle API-Routes unter `src/routes/api/` nehmen Request-Bodies per `request.json()` entgegen und reichen die Daten ohne jegliche Validierung an Hygraph (GraphQL) oder Auth0 weiter. Es gibt keine Schema-Validierung, keine Typ-Pruefung und keine Sanitization.

#### Konkrete Risiken

**Unerwartete Felder:**
Ein Angreifer koennte beliebige Felder in einem PATCH-Request mitschicken, die direkt an die GraphQL-Mutation weitergereicht werden:
```json
PATCH /api/project/patch/[id]
{ "projectStatus": "published", "owner": { "connect": { "id": "anderer-user" } } }
```

**Fehlende Typ-Pruefung:**
String-Felder werden nicht auf Laenge, Format oder Inhalt geprueft. E-Mail-Felder werden nicht als gueltige E-Mail validiert. Numerische Felder (budget, estimatedPrice) werden nicht als Zahlen geprueft.

**URL-Parameter:**
Route-Parameter wie `[id]`, `[email]`, `[url]` werden direkt verwendet ohne Format-Validierung:
- `[email]` koennte SQL-Injection-artige Strings enthalten (Hygraph schuetzt hier, aber Defense-in-Depth fehlt)
- `[url]` in Auth-Routes wird direkt als URL-Pfad verwendet (Path-Traversal-Risiko)
- `[id]` wird nicht als gueltige ID-Form geprueft

**Fehlende Content-Type-Pruefung:**
Routes pruefen nicht, ob der Request tatsaechlich `application/json` als Content-Type hat.

#### Empfohlenes Vorgehen

**Schritt 1 - Validierungs-Library einrichten**
- `zod` als Validierungs-Library installieren (leichtgewichtig, TypeScript-nativ)
- Zod-Schemas fuer alle Request-Bodies definieren

**Schritt 2 - Shared Validation-Helper erstellen**
```typescript
// src/lib/server/validate.server.ts
import { z } from 'zod';

export function validateBody<T>(schema: z.ZodSchema<T>, data: unknown): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new ValidationError(result.error.flatten());
  }
  return result.data;
}
```

**Schritt 3 - Schemas fuer Business-Objekte**
```typescript
// src/lib/server/schemas/project.schema.ts
export const projectCreateSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(5000).optional(),
  projectType: z.enum(['website', 'app', 'ai', 'freestyle']),
  budget: z.string().max(50).optional(),
  // ...
});

export const projectPatchSchema = projectCreateSchema.partial();
```

**Schritt 4 - In Routes einbauen**
```typescript
// src/routes/api/project/create/+server.ts
export const POST: RequestHandler = async ({ request }) => {
  const body = await request.json();
  const validated = validateBody(projectCreateSchema, body);
  // ... weiter mit validated statt body
};
```

**Schritt 5 - URL-Parameter validieren**
- `[id]`: Regex-Check auf gueltiges Hygraph-ID-Format (cuid)
- `[email]`: E-Mail-Format-Validierung
- `[url]`: Allowlist der erlaubten Auth0-Pfade (wird durch Schritt 2 von Punkt 1 obsolet)

#### Abhaengigkeit zu Punkt 1
Die Input-Validierung macht am meisten Sinn **zusammen mit der Auth-Implementierung** umzusetzen. Wenn die Auth-Proxy-Routes durch spezifische Endpoints ersetzt werden (Punkt 1, Schritt 2), entfallen die gefaehrlichsten Validierungs-Luecken (`[url]`-Parameter) automatisch.

#### Aufwand-Schaetzung
- zod Setup + Validation-Helper: ~1h
- Schemas fuer alle Business-Objekte (Project, Customer, Asset, Mail): ~3-4h
- Integration in ~20 Routes: ~3-4h
- URL-Parameter-Validierung: ~1-2h
- Testing: ~2h
- **Gesamt: ~10-13h**

---

**Gesamtaufwand Phase 2c (beide Punkte zusammen): ~20-25h**
Empfehlung: Auth (Punkt 1) zuerst, dann Validierung (Punkt 2), da viele Validierungs-Probleme durch den Auth-Proxy-Umbau wegfallen.

---

## Erledigt

### Phase 1 - Bugfixes & Sanitization
- [x] `svelte.config.js` - prerender/vite/inlineStyleThreshold in kit verschoben
- [x] `vite.config.ts` - Doppelte URL-Patterns korrigiert
- [x] Login-Seite - openAuth0Popup Import gefixt
- [x] 23 API-Routes - Error-Responses mit apiErrorResponse() sanitized
- [x] Customer-Patch - Doppelter postCode-Check durch salutation ersetzt
- [x] 3 Mutations von GET auf POST umgestellt + Client-Calls angepasst
- [x] uploadAsset.ts - 'error ' String-Bug gefixt
- [x] auth0-helper - Token-Fehlerbehandlung + Promise-Anti-Pattern
- [x] netlify.toml - Sicherheits-Header hinzugefuegt
- [x] philosophy.svelte - $: zu const migriert (Svelte 5)
- [x] Tippfehler projectCetegory und getFeaturese korrigiert
- [x] Unbenutztes auth0 Paket + lodash-Referenzen entfernt
- [x] hooks.ts - Leerer transport-Export entfernt

### Phase 2a - Quick Wins
- [x] Store Anti-Pattern behoben - `.get()/.set()` Wrapper durch Svelte 5 Klassen mit `$state` ersetzt, `popupOpen` (write-only) und `error` (unbenutzt) entfernt (9 Dateien, 60->20 Zeilen)
- [x] axios durch native fetch ersetzt - `auth0-helper.server.ts` umgeschrieben, Dependency entfernt, Imports konsolidiert
- [x] autoprefixer entfernt - redundant mit Tailwind CSS v4 `@tailwindcss/postcss`
- [x] Doppelte Email-Library konsolidiert - `hello.svelte` auf `better-svelte-email` + Svelte 5 `$props()` migriert, `@sveltelaunch/svelte-5-email` entfernt

### Phase 2b - Strukturelle Verbesserungen
- [x] 19 Service-Modals konsolidiert - 1 generisches `service-modal.svelte` + Config-Datei, 19 Einzeldateien geloescht, Services-Page von 19 Imports auf 2 reduziert
- [x] Customer/Project Route-Duplikation behoben - Shared `customer-helpers.server.ts` mit `updateCustomer()` + `linkProjectsToCustomer()`, 4 Routes als duenne Wrapper (~400 auf ~60 Zeilen)
- [x] i18n-Keys synchronisiert - Wizard EN komplett neu (41 fehlende Keys, falsche Key-Namen, deutsche Texte uebersetzt), Homepage DE+EN (12 CTA-Keys + 27 Zeilen deutsche Texte uebersetzt), FAQ war bereits synchron
- [x] N+1 Query im Dashboard behoben - Batch-Endpoint `/api/project/get/batch` mit `id_in` GraphQL-Filter, Dashboard von N Einzel-Fetches auf 1 Call reduziert

### Phase 2b+ - Nice to Have
- [x] Accessibility verbessert - Skip-Nav Link in Layout, aria-labels fuer Desktop/Mobile Navigation und Hamburger-Button
- [x] Data-Loading Pattern bereinigt - Dashboard: doppelten onMount+$effect Trigger durch einzelnen $effect ersetzt, separate checkAccess() inlined
- [x] TypeScript strict mode aktiviert - `noImplicitAny: true` + `strictNullChecks: true` in tsconfig.json, 168 Fehler in 39 Dateien behoben (Paraglide dynamic keys, null-guards, enum types, implicit any, Window|null, etc.)
