// Usage: node build_pdf.mjs <input.html> [output.pdf]
// Renders each slide as a vector PDF page with sidebar, page numbers, selectable text.
// Requires: playwright, pdf-lib (install via npm i playwright pdf-lib)

import { chromium } from 'playwright';
import { PDFDocument } from 'pdf-lib';
import path from 'path';
import fs from 'fs';

const inputArg = process.argv[2];
if (!inputArg) {
  console.error('Usage: node build_pdf.mjs <input.html> [output.pdf]');
  process.exit(1);
}

const inputPath = path.resolve(inputArg);
const outputPath = process.argv[3]
  ? path.resolve(process.argv[3])
  : inputPath.replace(/\.html$/i, '.pdf');

const WIDTH = 1440;
const HEIGHT = 810;

console.log(`Input:  ${inputPath}`);
console.log(`Output: ${outputPath}`);
console.log(`Size:   ${WIDTH}x${HEIGHT}\n`);

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setViewportSize({ width: WIDTH, height: HEIGHT });
await page.goto('file:///' + inputPath.replace(/\\/g, '/'));
await page.waitForTimeout(1000);

// Remove @media print and @page rules so page.pdf() uses screen layout
await page.evaluate(() => {
  for (const sheet of document.styleSheets) {
    try {
      const rules = sheet.cssRules;
      for (let i = rules.length - 1; i >= 0; i--) {
        const r = rules[i];
        if (r.type === CSSRule.MEDIA_RULE && r.conditionText === 'print') {
          sheet.deleteRule(i);
        } else if (r.cssText && r.cssText.startsWith('@page')) {
          sheet.deleteRule(i);
        }
      }
    } catch (e) {}
  }
});

const totalSlides = await page.evaluate(() =>
  document.querySelectorAll('.slide').length
);
console.log(`Found ${totalSlides} slides\n`);

const pdf = await PDFDocument.create();

for (let i = 1; i <= totalSlides; i++) {
  await page.evaluate((num) => { goTo(num); }, i);
  await page.waitForTimeout(400);

  const pdfBytes = await page.pdf({
    width: `${WIDTH}px`,
    height: `${HEIGHT}px`,
    printBackground: true,
  });

  const srcDoc = await PDFDocument.load(pdfBytes);
  const [copiedPage] = await pdf.copyPages(srcDoc, [0]);
  pdf.addPage(copiedPage);
  console.log(`  Slide ${i} / ${totalSlides} done`);
}

await browser.close();

fs.writeFileSync(outputPath, await pdf.save());
console.log(`\n=> ${outputPath} (${totalSlides} pages)`);
