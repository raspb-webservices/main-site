# Wizard Basic - Umsetzungsplan

## 📋 Zusammenfassung der Analyse

### Aktueller Stand
Der Wizard Basic hat 6 Schritte und sammelt umfangreiche Daten, jedoch:

1. **Step 6 (Zusammenfassung)** zeigt nur:
   - Projektkategorie
   - Projekttyp/Subtyp
   - Ausgewählte Features
   - Geschätzter Preis (nur finale Zahl, keine Aufschlüsselung)

2. **Fehlende Daten in der Zusammenfassung** (aus Step 4):
   - Projektbeschreibung (description)
   - Service Level (0-100 Slider)
   - Engineering Approach (0-100 Slider)
   - Spezielle Anforderungen (specialRequirements)
   - Projektziel (projectGoal)
   - Zielgruppe (targetAudience)
   - Timeline-Präferenz (timelinePreference + specificDeadline)
   - Budget-Range (budgetRange)
   - PWA-spezifisch: Ansatz (pwaApproach) + bestehende URL
   - CMS-spezifisch: Komplexität (cmsComplexity) + Content-Struktur

3. **Contact Modal** ist aktuell nur ein Stub:
   - Zeigt nur Confirm/Cancel Buttons
   - Sammelt KEINE Kundendaten
   - Hat KEINE Versende-Logik

4. **Preisberechnung** existiert, aber:
   - Komplexe Formel (Basispreis + Service-Faktor + Engineering-Faktor + Features mit Mengenrabatt)
   - Wird NICHT visualisiert oder erklärt

### Verfügbare Infrastruktur
✅ API `/api/project/create` - GraphQL Mutation an Hygraph
✅ API `/api/mail/send` - Mailtrap Email-Versand
✅ `@hygraph/management-sdk` - installiert (Version 1.5.2)
✅ Email-Templates in `src/lib/emails/`
✅ Project Interface mit allen benötigten Feldern

### Fehlende Hygraph-Schema-Felder
Die API verwendet folgende Felder, die möglicherweise nicht im Hygraph-Schema existieren:
- `projectCategory` (String)
- `serviceLevel` (Int/Float)
- `engineeringApproach` (Int/Float)
- `specialRequirements` (String)
- `projectGoal` (String)
- `timelinePreference` (String)
- `specificDeadline` (Date)
- `budgetRange` (String)
- `pwaApproach` (String)
- `pwaExistingUrl` (String)
- `cmsComplexity` (Int/Float)
- `cmsContentStructure` (String)

---

## 🎯 Umsetzungsplan

### Phase 1: Hygraph Schema erweitern
**Ziel:** Alle neuen Felder im Hygraph-Schema hinzufügen

**Aufgaben:**
1. Script erstellen, das die Hygraph Management API nutzt
2. Schema-Introspection durchführen (prüfen, welche Felder fehlen)
3. Fehlende Felder zum `Project` Model hinzufügen:
   - `projectCategory: String`
   - `serviceLevel: Int`
   - `engineeringApproach: Int`
   - `specialRequirements: String (Multi-line Text)`
   - `projectGoal: String (Multi-line Text)`
   - `timelinePreference: String`
   - `specificDeadline: Date`
   - `budgetRange: String`
   - `pwaApproach: String`
   - `pwaExistingUrl: String`
   - `cmsComplexity: Int`
   - `cmsContentStructure: String (Multi-line Text)`
4. Schema veröffentlichen

**Dateien:**
- Neu: `src/scripts/extend-hygraph-schema.ts`
- Update: `src/routes/api/project/create/+server.ts`

---

### Phase 2: Projekt-Zusammenfassung erweitern
**Ziel:** Alle gesammelten Daten übersichtlich darstellen

**Design:**
```
┌─────────────────────────────────────────────────────────┐
│  Ihre Projektkonfiguration                              │
├─────────────────────────────────────────────────────────┤
│  [Kategorie]  [Typ]  [Subtyp]                           │
├─────────────────────────────────────────────────────────┤
│  📝 Projektbeschreibung                                 │
│  [Mehrzeiliger Text...]                                 │
├─────────────────────────────────────────────────────────┤
│  🎯 Projektziel & Zielgruppe                            │
│  Ziel: [...]                                            │
│  Zielgruppe: [...]                                      │
├─────────────────────────────────────────────────────────┤
│  ⚙️ Zusammenarbeit & Umsetzung                          │
│  Service Level: [━━━━━●━━━━] Full-Service ↔ Mitwirkung  │
│  Engineering: [━━━━━●━━━━] Quick ↔ Over-engineered     │
├─────────────────────────────────────────────────────────┤
│  ⏱️ Timeline & Budget                                    │
│  Timeline: [Moderate]  Budget: [Medium]                │
│  [Deadline: 2026-03-15] (falls gesetzt)                │
├─────────────────────────────────────────────────────────┤
│  🎨 Features ([15] ausgewählt)                          │
│  [Badge] [Badge] [Badge]...                             │
├─────────────────────────────────────────────────────────┤
│  ✨ Besondere Anforderungen                             │
│  [Text falls vorhanden...]                              │
├─────────────────────────────────────────────────────────┤
│  💰 PREISBERECHNUNG                                     │
│  ┌───────────────────────────────────────┐              │
│  │ Basispreis (Subtyp):        4.500 €   │              │
│  │ + Service-Faktor (-15%):     -675 €   │              │
│  │ + Engineering-Faktor (+10%):  450 €   │              │
│  │ ──────────────────────────────────     │              │
│  │ = Basis nach Anpassung:     4.275 €   │              │
│  │                                        │              │
│  │ + Features (15x):           3.200 €   │              │
│  │   - Mengenrabatt (-25%):     -800 €   │              │
│  │ ──────────────────────────────────     │              │
│  │ GESAMTPREIS:               6.675 €     │              │
│  └───────────────────────────────────────┘              │
└─────────────────────────────────────────────────────────┘
```

**Aufgaben:**
1. `project-summary.svelte` komplett überarbeiten
2. Alle Daten aus `config` anzeigen
3. Visuelles Design mit Cards/Sections
4. Preisberechnung als Breakdown-Komponente

**Dateien:**
- Update: `src/lib/components/wizard/steps/project-summary.svelte`
- Neu: `src/lib/components/wizard/price-breakdown.svelte` (optional, für bessere Struktur)

---

### Phase 3: Contact Modal mit Kundendaten
**Ziel:** Kundendaten erfassen und Projekt + Email senden

**Design:**
```
┌────────────────────────────────────────┐
│  Projekt anfragen                      │
├────────────────────────────────────────┤
│  Ihre Kontaktdaten:                    │
│  ┌──────────────────────────────────┐  │
│  │ Anrede: [Dropdown]               │  │
│  │ Vorname: [_________________]     │  │
│  │ Nachname: [_________________]    │  │
│  │ Email: [_________________]       │  │
│  │ Telefon: [_________________]     │  │
│  │ Firma (opt): [____________]      │  │
│  │ Adresse (opt): [__________]      │  │
│  │ PLZ/Ort (opt): [__________]      │  │
│  └──────────────────────────────────┘  │
│                                        │
│  [Datenschutz] Ich akzeptiere...       │
│                                        │
│  [Abbrechen]  [Projekt anfragen ✉️]    │
└────────────────────────────────────────┘
```

**Flow:**
1. Benutzer klickt "Projekt anfragen"
2. Modal öffnet sich mit Formular
3. Validierung der Pflichtfelder (Anrede, Vorname, Nachname, Email)
4. Bei Submit:
   - Kundendaten zu `config.owner` hinzufügen
   - Projekt in Hygraph erstellen (`POST /api/project/create`)
   - Email an uns senden mit allen Projektdaten (`POST /api/mail/send`)
   - Success-Message anzeigen

**Aufgaben:**
1. Contact Modal neu implementieren mit Form
2. Zod-Schema für Kundendaten-Validierung
3. Submit-Handler implementiert
4. Loading-State während API-Calls
5. Error-Handling

**Dateien:**
- Update: `src/lib/components/modals/general/contact-modal.svelte`

---

### Phase 4: Email-Template für Projektanfragen
**Ziel:** Schönes Email-Template mit allen Projektdaten

**Inhalt:**
- Kundendaten
- Vollständige Projekt-Konfiguration
- Preisberechnung-Breakdown
- Call-to-Action (Rückruf/Meeting vereinbaren)

**Aufgaben:**
1. Neues Email-Template erstellen
2. Alle Projektdaten formatiert darstellen
3. Responsive Design

**Dateien:**
- Neu: `src/lib/emails/project-request.svelte`
- Update: `src/routes/api/mail/send/+server.ts` (Template-Switcher)

---

### Phase 5: API-Integration
**Ziel:** Projekt in Hygraph speichern und Email versenden

**Aufgaben:**
1. `/api/project/create` um neue Felder erweitern
2. Validation-Schema erweitern
3. Email-API-Call mit neuem Template

**Dateien:**
- Update: `src/routes/api/project/create/+server.ts`
- Update: `src/lib/server/schemas/project.schema.ts`

---

### Phase 6: Testing & Refinement
**Aufgaben:**
1. End-to-end Test durchführen
2. Error-Handling testen
3. UI/UX-Verbesserungen
4. Mobile Responsiveness prüfen

---

## 🔍 Klärungsfragen

### 1. Email-Empfänger
**Frage:** An welche Email-Adresse sollen die Projektanfragen gesendet werden?
- Soll es eine feste Firmen-Email sein?
- Soll es konfigurierbar sein?
- Soll auch der Kunde eine Bestätigungs-Email erhalten?

### 2. Hygraph Schema-Änderungen
**Frage:** Soll das Schema automatisch erweitert werden oder möchtest du es manuell machen?
- **Option A:** Ich erstelle ein Script, das automatisch fehlende Felder hinzufügt
- **Option B:** Ich gebe dir eine Liste der benötigten Felder zum manuellen Hinzufügen
- **Option C:** Ich erstelle Migration-Steps, die du reviewen kannst

### 3. Projekt-Status nach Erstellung
**Frage:** Welchen initialen Status sollen neue Projekte haben?
- Aktuell: `projectStatus: 'created'`
- Alternatives: `projectStatus: 'inquiry'` oder `'pending'`?

### 4. Pflichtfelder im Contact Modal
**Frage:** Welche Kundendaten sind Pflicht?
- **Aktuell vorgeschlagen:** Anrede, Vorname, Nachname, Email
- **Optional:** Telefon, Firma, Adresse
- Soll Telefon auch Pflicht sein?

### 5. Preisberechnung-Details
**Frage:** Wie detailliert soll die Preisaufschlüsselung sein?
- **Option A:** Nur Hauptkategorien (wie oben im Design)
- **Option B:** Jedes Feature einzeln aufgeführt
- **Option C:** Toggle zwischen Summary und Detail-View

### 6. Erfolgs-Flow nach Absenden
**Frage:** Was soll nach erfolgreichem Absenden passieren?
- Success-Message im Modal
- Weiterleitung zu einer Thank-You-Page
- Wizard zurücksetzen
- Alles zusammen?

---

## 📊 Aufwandsschätzung

| Phase | Aufwand | Priorität |
|-------|---------|-----------|
| Phase 1: Schema-Erweiterung | 2-3h | Hoch |
| Phase 2: Zusammenfassung | 3-4h | Hoch |
| Phase 3: Contact Modal | 3-4h | Hoch |
| Phase 4: Email-Template | 2-3h | Mittel |
| Phase 5: API-Integration | 2-3h | Hoch |
| Phase 6: Testing | 2-3h | Hoch |
| **Gesamt** | **14-20h** | - |

---

## 🚀 Empfohlene Reihenfolge

1. **Start:** Phase 1 (Schema) - Basis für alles weitere
2. **Dann:** Phase 2 (Zusammenfassung) - UI/UX verbessern
3. **Parallel:** Phase 3 + 4 (Modal + Email)
4. **Integration:** Phase 5 (APIs)
5. **Abschluss:** Phase 6 (Testing)

---

## 💡 Zusätzliche Überlegungen

### Mögliche Erweiterungen (optional):
- **PDF-Export** der Projektzusammenfassung
- **Projekt-Link** zum späteren Bearbeiten (für eingeloggte User)
- **Preisvergleich** mit verschiedenen Konfigurationen
- **Progress-Speicherung** im LocalStorage
- **Analytics** für Konversions-Tracking

---

*Erstellt am: 13.02.2026*
*Status: Warte auf Feedback & Klärungen*
