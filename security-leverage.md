# Security Leverage — Offene Punkte

> Stand: Februar 2026
> Alle kritischen und hohen Findings aus dem Security Audit wurden bereits behoben.
> Diese Datei dokumentiert die drei verbleibenden Punkte für eine spätere Umsetzung.

---

## C — Rate-Limiter durch Upstash Redis ersetzen

### Was ist das Problem?
Der aktuelle Rate-Limiter (`src/lib/server/rate-limit.server.ts`) speichert die Request-Zähler **im Arbeitsspeicher des Prozesses**. Netlify Functions laufen als isolierte Serverless-Instanzen (Lambda). Jede Instanz hat ihren eigenen Speicher — ein Bot der z. B. 10 Anfragen/Minute pro IP senden darf, kann dieses Limit umgehen indem er seine Requests auf mehrere Lambda-Instanzen verteilt.

**Betroffene Endpoints:** `/api/mail/send`, `/api/project/create`, `/api/customer/create`, `/api/user-question/create`

**Risiko:** Spam-Projekterstellungen, Inbox-Flooding, massenhafte Fake-Kunden-Einträge.

### Was bedeutet eine Anpassung?
Der In-Memory-Store wird durch einen externen Redis-Store ersetzt. Alle Instanzen teilen sich dann denselben Zähler. Das Rate-Limit greift dann wirklich instanz-übergreifend.

### Wie geht man das konkret an?

**1. Upstash-Konto anlegen**
- [upstash.com](https://upstash.com) → Kostenloses Redis-Konto erstellen
- Neue Redis-Datenbank anlegen (Region: EU West empfohlen)
- `UPSTASH_REDIS_REST_URL` und `UPSTASH_REDIS_REST_TOKEN` aus dem Dashboard kopieren

**2. Paket installieren**
```bash
yarn add @upstash/redis @upstash/ratelimit
```

**3. `rate-limit.server.ts` ersetzen**

```typescript
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { env } from '$env/dynamic/private';

const redis = new Redis({
  url: env.UPSTASH_REDIS_REST_URL,
  token: env.UPSTASH_REDIS_REST_TOKEN
});

// 10 Requests pro 60 Sekunden pro IP
const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '60 s'),
  analytics: true
});

export async function checkRateLimit(ip: string, pathname: string): Promise<Response | null> {
  const identifier = `${ip}:${pathname}`;
  const { success } = await ratelimit.limit(identifier);
  if (!success) {
    return new Response(JSON.stringify({ error: 'Too many requests' }), {
      status: 429,
      headers: { 'Content-Type': 'application/json', 'Retry-After': '60' }
    });
  }
  return null;
}
```

**4. Env-Variablen in Netlify setzen**
- Netlify Dashboard → Site Settings → Environment Variables
- `UPSTASH_REDIS_REST_URL` und `UPSTASH_REDIS_REST_TOKEN` hinzufügen

**Aufwand:** ~1–2 Stunden inkl. Setup

---

## D — CSP `unsafe-inline` entfernen (Nonce-basiertes CSP)

### Was ist das Problem?
Die aktuelle Content-Security-Policy in `netlify.toml` enthält `'unsafe-inline'` in `script-src` und `style-src`. Das bedeutet: **jedes inline `<script>`-Tag auf der Seite darf ausgeführt werden** — auch solche, die durch eine XSS-Lücke injiziert wurden. `unsafe-inline` hebelt den Hauptzweck von CSP (XSS-Schutz) aus.

SvelteKit generiert beim Rendern inline `<script>`-Tags für die Hydration, weshalb `unsafe-inline` nicht einfach entfernt werden kann ohne dass die App bricht.

**Risiko:** Wenn irgendwo XSS möglich ist, kann der Angreifer eigenen JS-Code einschleusen und ausführen.

### Was bedeutet eine Anpassung?
Statt `unsafe-inline` zu erlauben, bekommt jedes legitime `<script>`-Tag einen kryptographischen **Nonce** (einmaliges Token, z. B. `nonce-abc123xyz`). Die CSP erlaubt dann nur Scripts mit diesem Nonce. Ein injiziertes Script hat den Nonce nicht und wird blockiert.

Da SvelteKit die Nonces selbst erzeugen muss, ist eine Anpassung in `hooks.server.ts` und `vite.config.ts` nötig.

### Wie geht man das konkret an?

**1. `hooks.server.ts` — Nonce erzeugen und in Response einfügen**

```typescript
import { randomBytes } from 'crypto';

const handleCsp: Handle = async ({ event, resolve }) => {
  const nonce = randomBytes(16).toString('base64');
  event.locals.cspNonce = nonce;

  const response = await resolve(event, {
    transformPageChunk: ({ html }) =>
      html.replace(/%sveltekit\.nonce%/g, nonce)
  });

  response.headers.set(
    'Content-Security-Policy',
    `default-src 'self'; script-src 'self' 'nonce-${nonce}'; style-src 'self' 'nonce-${nonce}'; ...`
  );
  return response;
};
```

**2. `app.html` — Nonce-Placeholder für SvelteKit-Scripts**

SvelteKit unterstützt `%sveltekit.nonce%` nativ (seit SvelteKit 2.x):
```html
<script nonce="%sveltekit.nonce%">
  <!-- SW listeners (bereits vorhanden) -->
</script>
```

**3. `netlify.toml` — CSP-Header dort entfernen**

Da der Header jetzt server-seitig pro Request gesetzt wird (mit individuellem Nonce), muss der statische CSP-Header aus `netlify.toml` entfernt werden. Statische Header können keine dynamischen Nonces enthalten.

**4. TypeScript-Types erweitern**

```typescript
// src/app.d.ts
declare global {
  namespace App {
    interface Locals {
      user: UserPayload | null;
      cspNonce: string;
    }
  }
}
```

**Hinweis zu `style-src`:** Inline-Styles (z. B. von DaisyUI oder Tailwind JIT) brauchen ebenfalls den Nonce. Falls das zu komplex wird: `style-src` kann vorerst auf `'unsafe-inline'` bleiben und nur `script-src` wird auf Nonce umgestellt — das bringt bereits ~80% des Sicherheitsgewinns.

**Aufwand:** ~2–4 Stunden inkl. Testing

---

## E — `*.nsvcs.net` Wildcard in `connect-src` eingrenzen

### Was ist das Problem?
In der CSP `connect-src` steht aktuell `https://*.nsvcs.net` — eine Wildcard die **alle Subdomains** von `nsvcs.net` erlaubt. Das ist breiter als nötig und würde einem Angreifer erlauben, Daten an beliebige Subdomains dieser Domain zu senden (falls XSS besteht).

Es ist unklar welche spezifische Subdomain tatsächlich benötigt wird.

### Was bedeutet eine Anpassung?
Den Wildcard durch die exakte Subdomain ersetzen, z. B. `https://api.nsvcs.net` statt `https://*.nsvcs.net`.

### Wie geht man das konkret an?

**1. Herausfinden welche Domain tatsächlich genutzt wird**
- Browser DevTools öffnen (F12) → Tab **Network**
- Auf der Seite alle relevanten Aktionen durchführen (Login, Wizard, Dashboard)
- In der Suche nach `nsvcs.net` filtern
- Die exakte Subdomain notieren (z. B. `sdk.nsvcs.net`)

**2. `netlify.toml` anpassen**

```toml
# Vorher:
connect-src ... https://*.nsvcs.net ...

# Nachher (Beispiel):
connect-src ... https://sdk.nsvcs.net ...
```

**Aufwand:** 15–30 Minuten

---

*Alle anderen Findings aus dem Security Audit vom 22. Februar 2026 wurden bereits behoben.*
