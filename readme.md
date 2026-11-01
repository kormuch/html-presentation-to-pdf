# HTML Presentation to PDF

Converts HTML slide decks to vector PDF with selectable text, sidebar navigation, and page numbers. Renders each slide in a headless browser via Playwright, then stitches the pages into a single PDF using pdf-lib.

## Requirements

- Node.js
- Dependencies: `npm install` (installs playwright and pdf-lib)
- Chromium (one-time): `npx playwright install chromium`

## Usage

```bash
# Windows
build_pdf.bat presentation.html

# Direct
node build_pdf.mjs presentation.html
node build_pdf.mjs presentation.html custom_output.pdf
```

Output defaults to `<input_name>.pdf` in the same directory.

## Creating a Presentation

1. Copy `example_churn_netflix.html` and rename it
2. Edit the slides (each `<div class="slide" data-slide="N" data-chapter="X">` is one page)
3. Update `TOTAL` and the `chapters` array in the `<script>` block
4. Run the build command

## Slide Structure

```html
<div class="slide" data-slide="1" data-chapter="0">
  <div class="slide-chapter">Chapter Name</div>
  <div class="slide-title">Slide Title</div>
  <!-- content -->
</div>
```

## Chapter Navigation (Sidebar)

The sidebar is defined in the `<script>` block and rendered into the PDF as a clickable table of contents:

```javascript
const TOTAL = 20;
const chapters = [
  { id: 0, label: '',       name: 'Opening',    slides: [1, 2] },
  { id: 1, label: 'Part 1', name: 'Topic',      slides: [3, 4, 5] },
  // ...
];
```

## Viewport / PDF Size

Default: 1440x810px (16:9). Adjustable via `WIDTH` and `HEIGHT` constants in `build_pdf.mjs`.

## Tech Stack

- **Node.js** -- runtime
- **Playwright** -- headless Chromium rendering
- **pdf-lib** -- PDF stitching, page numbers, sidebar navigation

## Example

`example_churn_netflix.html` -- a 20-slide Customer Churn Prediction presentation.
