# HTML Presentation to PDF

HTML Presentation Builder — konvertiert HTML-Slide-Decks zu Vektor-PDF mit selektierbarem Text, Sidebar-Navigation und Seitenzahlen.

## Anforderungen

- Node.js
- Dependencies: `npm install` (playwright, pdf-lib)
- Playwright-Browser: `npx playwright install chromium` (einmalig)

## PDF bauen

```bash
# Windows
build_pdf.bat meine_praesentation.html

# Oder direkt
node build_pdf.mjs meine_praesentation.html
node build_pdf.mjs meine_praesentation.html custom_output.pdf
```

## Neue Präsentation erstellen

1. `example_churn_netflix.html` kopieren und umbenennen
2. Slides anpassen (jeder `<div class="slide" data-slide="N" data-chapter="X">` ist eine Folie)
3. `TOTAL` und `chapters`-Array im `<script>`-Block aktualisieren
4. `build_pdf.bat neue_praesentation.html` ausführen

## Slide-Struktur

```html
<div class="slide" data-slide="1" data-chapter="0">
  <div class="slide-chapter">Kapitelname</div>
  <div class="slide-title">Folientitel</div>
  <!-- Inhalt -->
</div>
```

## Kapitel-Navigation (Sidebar)

```javascript
const TOTAL = 20;
const chapters = [
  { id: 0, label: '',       name: 'Opening',    slides: [1, 2] },
  { id: 1, label: 'Part 1', name: 'Thema',      slides: [3, 4, 5] },
  // ...
];
```

## Viewport / PDF-Größe

Default: 1440x810px. Änderbar in `build_pdf.mjs` (Zeilen WIDTH/HEIGHT).

## Beispiel

`example_churn_netflix.html` — Customer Churn Prediction bei Netflix (20 Slides, Note 1.0).
