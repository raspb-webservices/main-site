# Security Leverage — Offene Punkte

> Stand: Februar 2026
> Alle kritischen und hohen Findings aus dem Security Audit wurden bereits behoben.

---

## ✅ C — Rate-Limiter (Upstash Redis) — ERLEDIGT

In-Memory-Store ersetzt durch `@upstash/ratelimit` mit Upstash Redis (Sliding Window, 10 req/60s).
Alle Serverless-Instanzen teilen jetzt denselben Zähler.
**Netlify Env-Variablen noch setzen:** `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`

---

## ✅ D — CSP `unsafe-inline` entfernen — ERLEDIGT

`kit.csp` in `svelte.config.js` mit `mode: 'auto'` konfiguriert.
- SSR-Seiten: Nonce-basiertes CSP (pro Request generiert)
- Prerenderte Seiten: Hash-basiertes CSP (SHA-256 des inline Scripts, via `<meta http-equiv>`)
- `script-src` enthält kein `unsafe-inline` mehr
- Statischer CSP-Header aus `netlify.toml` entfernt

---

## ✅ E — `*.nsvcs.net` Wildcard in `connect-src` entfernen — ERLEDIGT

Eintrag war unused (kein Code referenziert `nsvcs.net`) — komplett aus der CSP in `netlify.toml` entfernt.

---

*Alle anderen Findings aus dem Security Audit vom 22. Februar 2026 wurden bereits behoben.*
