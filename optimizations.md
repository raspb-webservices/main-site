# Optimierungen - Recheck-Ergebnisse

Stand: 2026-02-13

---

## Zusammenfassung bisheriger Audit-Woche

Abgeschlossen: Auth/JWT-Infrastruktur, Ownership-Checks, Zod-Validierung, i18n (330 Strings DE/EN), TypeScript strict mode, Dependency-Cleanup, Accessibility-Grundlagen, N+1 Batch-Fix, Modal-Konsolidierung, Sicherheits-Header (teilweise).

---

## Offene Optimierungen

### 1. KRITISCH - Customer-Create Bug
- **Datei:** `src/routes/api/customer/create/+server.ts` Zeile 42
- **Problem:** GraphQL-Mutation ruft `createProject(...)` statt `createCustomer(...)` auf
- **Auswirkung:** Endpoint erstellt kein Customer-Objekt oder ist komplett kaputt
- **Fix:** Mutation-Aufruf von `createProject` zu `createCustomer` aendern, fehlende schliessende `}` ergaenzt, Variable `projectsIds` zu `projectIds` korrigiert
- [x] Erledigt

### 2. KRITISCH - robots.txt und sitemap.xml fehlen
- **Problem:** Weder statisch noch dynamisch vorhanden
- **Auswirkung:** Suchmaschinen haben keine Crawling-Anleitung, SEO-Grundlage fehlt
- **Fix:** `static/robots.txt` erstellt, dynamische Sitemap via `src/routes/sitemap.xml/+server.ts` mit hreflang-Alternates fuer DE/EN
- [x] Erledigt

### 3. KRITISCH - Content-Security-Policy Header fehlt
- **Datei:** `netlify.toml`
- **Problem:** X-Frame-Options, X-Content-Type-Options sind gesetzt, aber CSP fehlt
- **Auswirkung:** Kein XSS-Schutz auf Header-Ebene trotz externer Ressourcen (fonts.gstatic.com, cdn.jsdelivr.net, mapbox, auth0)
- **Fix:** CSP-Header in netlify.toml ergaenzt mit Whitelist fuer alle externen Quellen (auth0, hygraph, plausible, cal.com, nextcloud, fonts.gstatic.com, picsum)
- [x] Erledigt

### 4. HOCH - 63 MB Tour-Bilder
- **Verzeichnis:** `static/tour/` - 6 JPGs, je 9-11 MB (15520x7760 px 360-Grad-Panoramen, DJI Osmo)
- **Problem:** Grosse Dateien im Build
- **Ergebnis:** MozJPEG q90 bringt nur ~6% Ersparnis - Panoramen sind bereits gut komprimiert. Aufloesung ist fuer Photo Sphere Viewer notwendig.
- **Empfehlung:** Lazy Loading pro Raum im Virtual Tour Viewer, ggf. spaeter Panorama-Tiling
- [x] Beibehalten - Aufloesung notwendig

### 5. HOCH - Font-Ballast in font-collection.css
- **Datei:** `src/font-collection.css` - 1.477 Zeilen, 139 @font-face
- **Ergebnis:** Google Fonts werden absichtlich fuer den Wizard-Font-Picker benoetigt (30 Fonts, konfiguriert in `wizard-config.ts:519-550`). Browser laden @font-face lazy - Fonts werden erst beim Wizard-Preview ueber das Netz geholt, nicht beim Seitenaufruf. Performance-Impact daher gering.
- **Empfehlung:** Spaeter ggf. dynamisches Laden per Google Fonts API statt statischer CSS-Datei
- [x] Beibehalten - absichtliches Feature (Wizard Font-Picker)

### 6. HOCH - error.message Leaking in API-Responses
- **Dateien:** 8 API-Endpoints gefixt
- **Problem:** `error.message` wurde direkt an Client gesendet - konnte interne Details leaken
- **Fix:** `errorMessage = error.message` Default-Zuweisung in allen Endpoints entfernt. Nur noch spezifische Branches (auth, not-found, validation) setzen sichere Meldungen. Fallback ist immer `Unknown error occurred`.
- [x] Erledigt

### 7. HOCH - Oeffentliche Endpoints ohne Rate-Limiting
- **Betrifft:** POST `/api/mail/send`, `/api/project/create`, `/api/customer/create`, `/api/user-question/create`
- **Problem:** Unbegrenzte Aufrufe ohne Login moeglich
- **Fix:** In-Memory Rate-Limiter implementiert (`lib/server/rate-limit.server.ts`), eingebunden in `hooks.server.ts` fuer die 4 oeffentlichen POST-Endpoints. Default: 10 Requests/Minute pro IP+Route. Liefert 429 + Retry-After Header bei Ueberschreitung.
- **Hinweis:** In-Memory funktioniert pro warme Serverless-Instanz. Fuer verteiltes Limiting spaeter Upstash Redis einsetzen.
- [x] Erledigt

### 8. MITTEL - ~100 console.log/warn Statements in Produktion
- **Hauptverursacher:** `wizard-api-handler.svelte` (~30), `wizard-extended.svelte` (~25), `uploadAsset.ts` (~20), `project/create/+server.ts`, `project/patch/+server.ts`, `carousel-slider.svelte`
- **Problem:** Debug-Output in Produktion, teils sensible Daten (PROJECT VARIABLES)
- **Fix:** 60 console.log/warn Statements aus 10 Dateien entfernt. 56 console.error fuer echte Fehler beibehalten. 1 console.warn (plausible, DEV-only) beibehalten.
- [x] Erledigt

### 9. MITTEL - Fehlende OG-Tags auf Unterseiten
- **Problem:** Keine OG-Tags (og:title, og:description, og:type, og:image, twitter:card) auf allen Seiten
- **Auswirkung:** Schlechte Social-Media-Previews, schwaechteres SEO
- **Fix:**
  - Globale OG-Defaults in `+layout.svelte`: og:type=website, og:site_name=raspb, og:image=apple-touch-icon, og:locale (DE/EN), twitter:card=summary
  - Per-Page og:title + og:description auf 11 oeffentlichen Seiten (homepage, services, about-us, contact, faq, insights, imprint, privacy, terms, wizard, appointment)
  - Fehlende `<svelte:head>` Bloecke fuer /contact, /appointment, /thank-you ergaenzt (inkl. title + meta description)
  - Neue i18n-Keys fuer contact_meta_*, appointment_meta_*, thankYou_meta_* (DE+EN)
  - /thank-you mit `noindex` versehen (Post-Form-Redirect)
  - **Hinweis:** Aktuell wird apple-touch-icon (180x180) als og:image-Fallback verwendet. Fuer optimale Social-Media-Previews spaeter ein dediziertes OG-Bild (1200x630) erstellen und unter `/images/og-default.png` ablegen.
- [x] Erledigt

### 10. MITTEL - Prerendering nur auf 2 von ~15 Seiten
- **Aktiv:** Homepage + Offline
- **Fehlt:** `/imprint`, `/privacy`, `/terms`, `/faq`, `/about-us`, `/services`, `/contact`, `/insights`, `/thank-you`
- **Fix:** `+page.ts` mit `export const prerender = true` fuer alle 9 statischen Seiten erstellt. `/appointment` hat Server-Redirect (302 → /?openAppointment=true), wird nicht prerendered.
- [x] Erledigt

### 11. NIEDRIG - Bilder ohne lazy loading
- **Problem:** Nur `tech-logo-showcase.svelte` nutzt `loading="lazy"`, Rest laedt eager
- **Fix:** `loading="lazy"` auf 10 Bilder in 4 Dateien ergaenzt:
  - `+page.svelte` (Homepage): 7 Tech-Stack-Logos (below fold)
  - `about-us/+page.svelte`: Team-Member-Avatare (below fold)
  - `member-modal.svelte`: Modal-Avatar
  - `about-me-modal.svelte`: Modal-Avatar
  - Hero-Bild (`hero.svelte`) bewusst NICHT lazy (above fold, LCP-relevant)
- [x] Erledigt

### 12. NIEDRIG - Tailwind optimize: false
- **Datei:** `vite.config.ts` Zeile 17
- **Problem:** CSS-Optimierung explizit deaktiviert (`optimize: false`)
- **Fix:** `optimize: false` entfernt (Default ist `true`). CSS-Layer-Flattening und Dead-Code-Elimination jetzt aktiv. Build erfolgreich getestet, keine Fehler.
- [x] Erledigt

---

## Nice-to-haves (spaeter)

- **Dediziertes OG-Bild** (1200x630px) fuer Social-Media-Previews erstellen → `static/images/og-default.png`, dann og:image-URL in `+layout.svelte` aktualisieren und twitter:card auf `summary_large_image` aendern
- **Upstash Redis Rate-Limiting** fuer verteiltes Limiting ueber mehrere Serverless-Instanzen hinweg (ersetzt aktuellen In-Memory Rate-Limiter)
- **Google Fonts API** statt statischer font-collection.css fuer den Wizard Font-Picker (dynamisches Laden on-demand)
- **Panorama-Tiling** fuer Tour-Bilder (progressives Laden statt 10MB-Einzelbilder)

---

## Reihenfolge der Umsetzung

1. Customer-Create Bug (#1)
2. robots.txt + sitemap.xml (#2)
3. CSP Header (#3)
4. Tour-Bilder komprimieren (#4)
5. Font-Ballast entfernen (#5)
6. error.message sanitizen (#6)
7. console.logs entfernen (#8)
8. OG-Tags auf alle Seiten (#9)
9. Prerendering aktivieren (#10)
10. Lazy loading (#11)
11. Tailwind optimize (#12)
12. Rate-Limiting (#7) - erfordert externen Service
