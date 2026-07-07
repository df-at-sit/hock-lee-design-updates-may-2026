// Reads public/data/hock-lee-bus-riots-pixel/scene-copy.csv and writes any edited
// cells back into the TypeScript source files (scenes.ts, scene-variants.ts,
// scene-config.ts, story-data.ts) as in-place string literal replacements.
// Run: npm run copy:sync

import fs from "node:fs";
import path from "node:path";
import { extractAllRows, CHARACTERS, computeSupersededByRowId } from "./lib.mjs";

const CSV_PATH = path.resolve(
  new URL(".", import.meta.url).pathname,
  "../../public/data/hock-lee-bus-riots-pixel/scene-copy.csv"
);

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;
  let i = 0;
  const n = text.length;
  while (i < n) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i += 2;
          continue;
        }
        inQuotes = false;
        i += 1;
        continue;
      }
      field += c;
      i += 1;
      continue;
    }
    if (c === '"') {
      inQuotes = true;
      i += 1;
      continue;
    }
    if (c === ",") {
      row.push(field);
      field = "";
      i += 1;
      continue;
    }
    if (c === "\r") {
      i += 1;
      continue;
    }
    if (c === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
      i += 1;
      continue;
    }
    field += c;
    i += 1;
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

function main() {
  const csvText = fs.readFileSync(CSV_PATH, "utf8");
  const table = parseCsv(csvText).filter((r) => r.length > 1 || r[0] !== "");
  const [header, ...dataRows] = table;
  const colIndex = Object.fromEntries(header.map((name, idx) => [name, idx]));

  const currentRows = extractAllRows();
  // Mirror extract.mjs's display-time blanking: a "shared" row's column for a
  // character who has their own separate override elsewhere isn't real
  // editable text for that character, so drop it from comparison entirely
  // (otherwise every such row looks like a conflict, even when untouched).
  const superseded = computeSupersededByRowId(currentRows);
  for (const row of currentRows) {
    const chars = superseded.get(row.rowId);
    if (!chars) continue;
    for (const code of chars) {
      delete row.sources[code];
      row.values[code] = "";
    }
  }
  const byRowId = new Map(currentRows.map((r) => [r.rowId, r]));

  // Detect which (file,start,end) ranges are shared across multiple characters.
  function rangeKey(src) {
    return `${src.file}::${src.start}::${src.end}`;
  }

  // file -> list of { start, end, newText }
  const replacementsByFile = new Map();
  let changedCells = 0;
  let skippedSharedConflicts = 0;
  let skippedNoSource = 0;
  let missingRows = 0;

  for (const csvRow of dataRows) {
    const rowId = csvRow[colIndex["Row ID"]];
    if (!rowId) continue;
    const current = byRowId.get(rowId);
    if (!current) {
      console.warn(`Row not found in source (skipped): ${rowId}`);
      missingRows += 1;
      continue;
    }

    const newValues = {
      CIV: csvRow[colIndex.CIV] ?? "",
      BW: csvRow[colIndex.BW] ?? "",
      CS: csvRow[colIndex.CS] ?? "",
    };

    // Group characters by identical source range to detect "shared text" rows.
    const groupsByRange = new Map();
    for (const code of CHARACTERS) {
      const src = current.sources[code];
      if (!src) continue;
      const key = rangeKey(src);
      if (!groupsByRange.has(key)) groupsByRange.set(key, { src, codes: [] });
      groupsByRange.get(key).codes.push(code);
    }

    for (const { src, codes } of groupsByRange.values()) {
      const oldValue = current.values[codes[0]];
      const desiredValues = codes.map((code) => newValues[code]);
      const anyChanged = desiredValues.some((v) => v !== oldValue);
      if (!anyChanged) continue;

      if (codes.length > 1) {
        const allSame = desiredValues.every((v) => v === desiredValues[0]);
        if (!allSame) {
          console.warn(
            `Skipped "${rowId}": ${codes.join("/")} share one line in the source, but the CSV now has different text for each. Edit them to match, or ask for this line to be split into per-character overrides first.`
          );
          skippedSharedConflicts += 1;
          continue;
        }
      }

      const newText = desiredValues[0];
      if (!newText) {
        console.warn(`Skipped "${rowId}" (${codes.join("/")}): CSV cell is empty, refusing to blank out existing text.`);
        skippedNoSource += 1;
        continue;
      }

      if (!replacementsByFile.has(src.file)) replacementsByFile.set(src.file, []);
      replacementsByFile.get(src.file).push({ start: src.start, end: src.end, newText });
      changedCells += 1;
    }

    // Warn about columns the user filled in where no source line exists for that character.
    for (const code of CHARACTERS) {
      if (current.sources[code]) continue;
      if (newValues[code] && newValues[code] !== current.values[code]) {
        console.warn(
          `Skipped "${rowId}" (${code}): no existing source line for this character — can't add new text this way.`
        );
        skippedNoSource += 1;
      }
    }
  }

  for (const [file, replacements] of replacementsByFile.entries()) {
    let text = fs.readFileSync(file, "utf8");
    replacements.sort((a, b) => b.start - a.start);
    for (const { start, end, newText } of replacements) {
      text = text.slice(0, start) + JSON.stringify(newText) + text.slice(end);
    }
    fs.writeFileSync(file, text, "utf8");
    console.log(`Updated ${path.relative(process.cwd(), file)} (${replacements.length} line(s))`);
  }

  console.log(
    `\nDone. ${changedCells} line(s) updated, ${skippedSharedConflicts} shared-text conflict(s) skipped, ${skippedNoSource} skipped (no source/empty), ${missingRows} unknown row id(s).`
  );
}

main();
