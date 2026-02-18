# Dashboard – Status & Offene Punkte

## Abgeschlossen

- Drawer-basiertes Detail-Panel mit 5 Tabs (Übersicht, Specs, Design, Features, Dateien)
- Alle Felder editierbar und persistierbar via PATCH-Endpoint
- Datei-Upload mit Status-Check und Progress-Anzeige
- Schema-Alignment: Alle Hygraph-Felder konsistent in GET/PATCH/Batch, Interface, Zod-Schema, Wizard und Drawer
- Features werden direkt mit deutschen Hygraph-Enum-Werten gespeichert (kein Client-Mapping mehr)

---

## Offene Punkte (priorisiert)

### 1. Admin – immer editierbar

Admins sollen Projekte unabhängig vom Status bearbeiten können.

- `ProjectDetailDrawer.svelte`: Prop `isAdmin: boolean` ergänzen
- `editable`-Derived: `isProjectEditable(status) || isAdmin`
- Footer-Buttons sollen auch für Admins sichtbar sein

---

### 2. Projektstatus ändern (nur Admin)

Admin kann `projectStatus` direkt im Drawer setzen.

- Status-Dropdown im Overview-Tab (nur wenn `isAdmin`)
- Optionen: alle Werte aus `projectStatus`-Enum mit `getStatusLabel()` als Label
- Wird beim Speichern via PATCH übergeben (Endpoint + Schema unterstützen `projectStatus` bereits)

---

### 3. Setup-Tab (nur Admin)

Neuer Tab "Setup" für Service-Credentials – nur für Admins sichtbar.

Datenstruktur (`ProjectSetup` in `project.interface.ts` bereits vorhanden):
```ts
interface ProjectSetup {
  github?: ServiceSetup;   // username, password, authTokens, isConfigured, lastUpdated
  netlify?: ServiceSetup;
  hygraph?: ServiceSetup;
  auth0?: ServiceSetup;
}
```

- Pro Service ein aufklappbarer Abschnitt mit Username, Password (masked), Auth-Tokens (Key-Value)
- `isConfigured`-Toggle + `lastUpdated`-Anzeige
- Speichern als JSON über `setup`-Feld (PATCH unterstützt `setup: Json` bereits)
- **Wichtig:** GET-Endpoints müssen `setup`-Feld serverseitig nur an Admins ausliefern

---

### Reihenfolge

1. `isAdmin`-Prop in Drawer durchreichen + `editable`-Logik anpassen
2. Status-Dropdown einbauen
3. Setup-Tab bauen
4. GET-Endpoints: `setup` nur für Admins im Response
