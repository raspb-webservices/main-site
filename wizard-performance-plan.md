# /wizard Performance-Plan

> Diagnose-Datum: 2026-02-25
> Betroffene Route: `/de/projektkonfigurator` / `/en/project-wizard`

---

## Befunde

### 1. Netlify Function Cold Start – Hauptursache der TTFB-Spikes

| Zustand | TTFB |
|---------|------|
| Function warm | 0.35–0.70 s |
| Function kalt (Cold Start) | 3.0–3.5 s |

**Kernursache:** Die Paraglide-Middleware (`strategy: ['url', 'cookie', 'preferredLanguage', 'baseLocale']`) läuft im Netlify Lambda und übernimmt URL-Umschreibung/-Redirect. Jeder Request auf `/wizard` trifft damit das Lambda – auch wenn die Seite selbst statisch wäre. Nach ~15–30 Min. Inaktivität friert Netlify den Container ein.

### 2. Caching komplett deaktiviert

```
cache-control: no-cache
cache-status: "Netlify Durable"; fwd=bypass
cache-status: "Netlify Edge"; fwd=miss
age: 0
```

Jeder Request triggert eine neue Lambda-Ausführung → Cold Starts häufen sich.

### 3. JS-Bundle: 50 Chunks + 2 Lottie-Animationen

Betrifft primär Browser-Ladezeit (nicht TTFB). Sekundäres Problem.

### 4. Hygraph-Fetch im SSR (zu prüfen)

Die CSP erlaubt `eu-west-2.cdn.hygraph.com`. Falls bei jedem SSR-Render eine GraphQL-Query mitläuft, addiert sich die Netzwerklatenz nach London zur Serverantwortzeit.

---

## Umsetzungsplan

### Schritt 1 – Keep-Warm Ping `[QUICK WIN]`

Ziel: Lambda warm halten, Cold Starts eliminieren.

- [ ] Externen Uptime-Monitor einrichten (kostenlos):
  - **UptimeRobot**: https://uptimerobot.com → Monitor-Typ: HTTP(S)
  - **BetterStack**: https://betterstack.com/uptime
  - **Cronitor**: https://cronitor.io

  | Setting | Wert |
  |---------|------|
  | URL | `https://raspb.de/de/projektkonfigurator` |
  | Methode | GET |
  | Intervall | 5–10 Minuten |
  | Optional | zweiter Monitor auf `/en/project-wizard` |

- [ ] Alternativ: GitHub Actions Cron (kein externer Dienst, lebt im Repo)

  ```yaml
  # .github/workflows/keep-warm.yml
  name: Keep Wizard Warm
  on:
    schedule:
      - cron: '*/10 * * * *'
  jobs:
    ping:
      runs-on: ubuntu-latest
      steps:
        - run: curl -s -o /dev/null -w "%{http_code}" https://raspb.de/de/projektkonfigurator
  ```

**Erwarteter Effekt:** TTFB-Spikes verschwinden sofort. ⭐⭐⭐

---

### Schritt 2 – Prerender / SSR-Strategie `[MITTEL]`

Ziel: `/de/projektkonfigurator` als statische HTML-Datei ausliefern (kein Lambda nötig).

**Analyse-Ergebnis:**
- `src/routes/wizard/+page.svelte` hat kein `+page.ts` und kein `+page.server.ts`
- `svelte.config.js` hat `prerender: { entries: ['*'], crawl: true }` – sollte prerendern
- Die Paraglide-Middleware im Lambda ist wahrscheinlich der Blocker

**Option A – Netlify Edge-Redirects (empfohlen)**

Localized URLs direkt per Netlify-Redirect auflösen, bevor die Paraglide-Middleware greift:

```toml
# netlify.toml – ergänzen:
[[redirects]]
  from = "/wizard"
  to = "/de/projektkonfigurator"
  status = 302

[[redirects]]
  from = "/en/wizard"
  to = "/en/project-wizard"
  status = 302
```

- [ ] Prüfen ob Netlify Edge-Redirects für `/wizard` konfigurierbar sind ohne Lambda
- [ ] Testen ob prerendered HTML für `/de/projektkonfigurator` im Build-Output vorhanden:
  ```bash
  ls build/de/projektkonfigurator/
  ```

**Option B – explizites Prerender in `+page.ts`**

```typescript
// src/routes/wizard/+page.ts – NEU anlegen
import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = ({ url }) => ({
  projectType: url.searchParams.get('projectType'),
  subType: url.searchParams.get('subType')
});
```

> Hinweis: `data.projectType` / `data.subType` sind aktuell immer `undefined` (kein Load-Function vorhanden). Diese `+page.ts` repariert das und ermöglicht gleichzeitig Prerendering.

- [ ] `src/routes/wizard/+page.ts` anlegen (siehe oben)
- [ ] Build prüfen: Erscheint `/de/projektkonfigurator/index.html` in `build/`?
- [ ] TTFB messen: Ist der Wert jetzt konstant niedrig?

**Erwarteter Effekt:** Lambda wird für Wizard-Seitenaufruf gar nicht mehr benötigt. ⭐⭐⭐

---

### Schritt 3 – Hygraph-Fetch cachen `[OPTIONAL]`

- [ ] In den Wizard-API-Routen (`src/routes/api/`) prüfen: Gibt es `+server.ts`-Files die bei SSR Hygraph abfragen?
- [ ] Falls ja: Upstash Redis (bereits installiert: `@upstash/redis`) für Caching nutzen

```typescript
import { Redis } from '@upstash/redis';

const redis = new Redis({ url: UPSTASH_REDIS_REST_URL, token: UPSTASH_REDIS_REST_TOKEN });

const cached = await redis.get('hygraph:wizard-data');
if (cached) return cached;

const fresh = await hygraphClient.request(query);
await redis.set('hygraph:wizard-data', fresh, { ex: 300 }); // 5 Min. TTL
return fresh;
```

**Erwarteter Effekt:** Spart Hygraph-Roundtrip-Latenz nach `eu-west-2`. ⭐⭐

---

### Schritt 4 – Bundle-Optimierung `[NACHRANG]`

- [ ] Bundle-Analyzer ausführen:
  ```bash
  # rollup-plugin-visualizer ist bereits installiert
  # In vite.config.ts temporär einbinden:
  import { visualizer } from 'rollup-plugin-visualizer';
  plugins: [..., visualizer({ open: true })]
  ```
- [ ] Die größten Chunks identifizieren und ggf. lazy-loaden
- [ ] Lottie-Animationen: Nur laden wenn Wizard-Section sichtbar ist (IntersectionObserver)

**Erwarteter Effekt:** Kleinere JS-Payload → schnelleres Time-to-Interactive im Browser. ⭐

---

## Betroffene Dateien

| Datei | Status | Schritt |
|-------|--------|---------|
| `netlify.toml` | vorhanden – ggf. ergänzen | 2 |
| `src/routes/wizard/+page.ts` | NEU anlegen | 2 |
| `src/routes/wizard/+page.svelte` | ggf. kleinere Anpassung | 2 |
| `.github/workflows/keep-warm.yml` | NEU (optional) | 1 |

---

## Priorität-Übersicht

| # | Maßnahme | Aufwand | Effekt | Status |
|---|----------|---------|--------|--------|
| 1 | Keep-Warm Ping (externer Monitor) | ⬜ 15 Min. | ⭐⭐⭐ | `[ ]` |
| 2 | Prerender für /wizard aktivieren | ⬜ 1–2h | ⭐⭐⭐ | `[ ]` |
| 3 | Hygraph-Fetch cachen | ⬜ 2–4h | ⭐⭐ | `[ ]` |
| 4 | Bundle-Optimierung | ⬜ 1 Tag | ⭐ | `[ ]` |
