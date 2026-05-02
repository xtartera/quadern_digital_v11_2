# README_PROJECTS_JSON – Gestió de projectes amb JSON (v11)

## Objectiu

La v11 converteix el quadern digital en una petita plataforma de projectes. El motor del quadern no s’ha de modificar per afegir nous dossiers: només cal afegir un fitxer de projecte i registrar-lo al catàleg JSON.

## Estructura principal

```text
/
├── index.html                 ← selector inicial de projectes
├── app.html                   ← motor del quadern
├── data/
│   └── projects.json          ← catàleg de projectes
├── js/
│   ├── loader.js              ← carrega el catàleg JSON
│   ├── storage.js
│   ├── temps.js
│   ├── imatges.js
│   ├── ui.js
│   ├── impressio.js
│   ├── app.js
│   └── projectes/
│       ├── ldap.js
│       ├── Projecte25.js
│       └── plantilla.js
└── assets/
    ├── logo.png
    └── portades/
        ├── ldap.svg
        └── projecte25.svg
```

## Què és cada part?

### `index.html`

És la pantalla inicial. Llegeix `data/projects.json`, mostra les targetes dels projectes disponibles i desa el projecte triat a `localStorage`.

### `app.html`

És el quadern real. Carrega dinàmicament el projecte seleccionat i després executa el motor: autodesat, evidències, impressió, temps i control d’integritat.

### `data/projects.json`

És el catàleg. Aquí s’indica quins projectes existeixen, quin fitxer JS han de carregar i quina portada visual tenen.

### `js/projectes/ProjecteXX.js`

És el contingut del projecte: activitats, passos, enunciats, codi, evidències i preguntes.

## Format de `projects.json`

```json
{
  "projects": [
    {
      "id": "projecte25-integracio-ldap-linux-sssd",
      "title": "Projecte 25 – LDAP amb Linux SSSD",
      "description": "Integració d’un servidor LDAP amb Ubuntu Desktop mitjançant SSSD, NSS i PAM.",
      "file": "js/projectes/Projecte25.js",
      "cover": "assets/portades/projecte25.svg",
      "tag": "SSSD"
    }
  ]
}
```

## Camps obligatoris

| Camp | Funció |
|---|---|
| `id` | Identificador únic del projecte. Ha de coincidir idealment amb el `projectId` intern del projecte. |
| `title` | Títol visible al selector. |
| `file` | Ruta del fitxer JS que conté el projecte. |

## Camps recomanats

| Camp | Funció |
|---|---|
| `description` | Resum breu visible a la targeta. |
| `cover` | Imatge SVG o PNG de portada. |
| `tag` | Etiqueta curta de classificació. |

## Com afegir un projecte nou

### 1. Crear el fitxer del projecte

Crea un fitxer a:

```text
js/projectes/Projecte26.js
```

Ha de tenir aquesta estructura mínima:

```js
window.PROJECT = {
  projectId: "projecte26",
  id: "projecte26",
  title: "Projecte 26 – Exemple",
  subtitle: "Quadern digital interactiu",
  description: "Descripció breu del projecte.",
  cover: "assets/portades/projecte26.svg",
  logo: "assets/logo.png",
  activities: [
    {
      id: "act1",
      tag: "Activitat 1",
      title: "Primera activitat",
      objective: "Objectiu de l’activitat.",
      steps: [
        {
          id: "1.1",
          title: "Primer pas",
          evidence: "both",
          allowMultipleImages: false,
          prompt: "Enunciat del pas.",
          tasks: ["Tasca 1", "Tasca 2"],
          codeLang: "bash",
          code: "echo Hola"
        }
      ]
    }
  ]
};

window.QUADERN_DADES = window.PROJECT;
```

### 2. Afegir-lo al catàleg

Edita:

```text
data/projects.json
```

i afegeix un objecte dins l’array `projects`:

```json
{
  "id": "projecte26",
  "title": "Projecte 26 – Exemple",
  "description": "Descripció breu del nou projecte.",
  "file": "js/projectes/Projecte26.js",
  "cover": "assets/portades/projecte26.svg",
  "tag": "P26"
}
```

### 3. Afegir portada opcional

Desa la portada a:

```text
assets/portades/projecte26.svg
```

Si no tens portada, pots reutilitzar `assets/portades/ldap.svg` temporalment.

## Com provar-ho correctament

El selector usa `fetch("data/projects.json")`. Molts navegadors bloquegen `fetch()` si obres `index.html` amb doble clic (`file://`).

### Opció recomanada amb VS Code

1. Obre la carpeta del quadern amb Visual Studio Code.
2. Instal·la l’extensió **Live Server**.
3. Clica amb el botó dret a `index.html`.
4. Tria **Open with Live Server**.

### Opció amb Python

Des de la carpeta del projecte:

```bash
python3 -m http.server
```

Després obre:

```text
http://localhost:8000
```

## Errors habituals

### No apareix cap projecte

- `projects.json` té un error de sintaxi.
- Estàs obrint amb `file://` en lloc d’un servidor local.
- La ruta `data/projects.json` no existeix.

### La targeta apareix però no obre el quadern

- El camp `file` apunta a una ruta incorrecta.
- El fitxer `ProjecteXX.js` no existeix.

### El quadern obre però no mostra activitats

- Falta `window.PROJECT`.
- Falta `window.QUADERN_DADES = window.PROJECT;`.
- El projecte no té `activities` o `steps`.
- Hi ha un error JavaScript dins el projecte.

### El selector torna enrere a `index.html`

Això passa si `app.html` no troba cap projecte seleccionat a `localStorage`.

## Bones pràctiques

- No modifiquis el motor per afegir projectes.
- Afegeix sempre projectes nous a `js/projectes/`.
- Registra sempre el projecte a `data/projects.json`.
- Usa identificadors únics i estables.
- Evita espais, accents i símbols estranys als noms dels fitxers.
- Mantén les portades dins `assets/portades/`.

## Resum

```text
projects.json       → diu quins projectes hi ha
ProjecteXX.js       → defineix el contingut del projecte
index.html          → mostra el selector
app.html            → executa el quadern
```

El motor no canvia. Els projectes són contingut connectable.

---

# 🔙 Retornar a la plataforma des d’un projecte

A partir de la v11.1, `app.html` inclou un botó visible a la barra d’eines:

```text
← Plataforma
```

Aquest botó permet tornar al selector inicial (`index.html`) sense dependre del botó “enrere” del navegador.

## Funcionament

El botó no esborra dades ni reinicia el quadern. Només canvia de pantalla:

```js
window.location.href = 'index.html';
```

Les dades del projecte continuen desades al `localStorage` segons la clau del projecte i de l’alumne.

## On es defineix

- HTML: `app.html`
- Estil: `css/pantalla.css` (`.platform-back`)

## Recomanació

No eliminis aquest botó si utilitzes diversos projectes, perquè millora molt la navegació de la plataforma.
