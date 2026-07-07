// Extracts an editor-friendly copy sheet: scene title, scene description, NPC
// dialogue, and player dialogue-choice options, ordered the way a player
// actually walks through the game (City Hall first, then Market, ...).
//
// This is a curated VIEW over the full source data — narrower field set,
// human labels, sequential ordering. Row IDs are unchanged from the full
// extraction, so `npm run copy:sync` still works no matter which rows you
// keep or remove from the sheet.
//
// Run: npm run copy:extract
// After editing the CSV: npm run copy:sync

import fs from "node:fs";
import path from "node:path";
import { extractAllRows, SCENE_KEY_LABELS, computeSupersededByRowId } from "./lib.mjs";

const OUT_PATH = path.resolve(
  new URL(".", import.meta.url).pathname,
  "../../public/data/hock-lee-bus-riots-pixel/scene-copy.csv"
);

// The order a player actually encounters these locations.
const MASTER_SCENE_ORDER = [
  "scene-1-city-hall",
  "market",
  "home-civil-servant",
  "home-bus-worker",
  "home-chinese-student",
  "government-office",
  "bus-depot",
  "negotiation",
  "alexandra-road",
  "command-center",
  "funeral",
  "school-lake",
  "classroom",
  "kkhospital",
  "kallangairport",
  "school-gates",
  "home-bus-worker-return",
  "home-chinese-student-return",
];

function isAllowedRow(row) {
  if (row.field === "sceneTitle" || row.field === "sceneSubtitle") {
    return row.rowId.startsWith("story::"); // the fallback copies in scene-variants.ts are unused defaults
  }
  return (
    /(^|\.)chatBubbleSpeaker$/.test(row.field) ||
    /(^|\.)chatBubbleText$/.test(row.field) ||
    /chatBubbleTexts\[\d+\]$/.test(row.field) ||
    /dialogueChoices\.?\[\d+\]\.(label|playerText|npcReply)$/.test(row.field)
  );
}

function humanizeField(field) {
  if (field === "sceneTitle") return "Scene Title";
  if (field === "sceneSubtitle") return "Scene Description";

  const choiceMatch = field.match(/dialogueChoices\.?\[(\d+)\]\.(label|playerText|npcReply)$/);
  if (choiceMatch) {
    const n = Number(choiceMatch[1]) + 1;
    const sub = choiceMatch[2];
    const subLabel =
      sub === "label" ? "Player Option Text" : sub === "playerText" ? "Player Says" : "NPC Reply";
    return `Chat Option ${n} — ${subLabel}`;
  }

  const lineMatch = field.match(/chatBubbleTexts\[(\d+)\]$/);
  if (lineMatch) return `NPC Line ${Number(lineMatch[1]) + 1}`;

  if (/chatBubbleText$/.test(field)) return "NPC Line";
  if (/chatBubbleSpeaker$/.test(field)) return "NPC Name";
  return field;
}

function fieldSortPriority(field) {
  if (field === "sceneTitle") return 0;
  if (field === "sceneSubtitle") return 1;
  return 2;
}

function prettifyId(id, sceneKey) {
  const sceneLabel = SCENE_KEY_LABELS[sceneKey];
  let cleaned = id;
  if (sceneLabel) {
    const scenePrefix = sceneLabel.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    if (cleaned.startsWith(scenePrefix)) cleaned = cleaned.slice(scenePrefix.length);
  }
  cleaned = cleaned.replace(/^-+/, "").replace(/-+/g, " ").trim();
  if (!cleaned) return id;
  return cleaned.replace(/\b\w/g, (c) => c.toUpperCase());
}

function csvEscape(value) {
  const str = value ?? "";
  if (/[",\n\r]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function main() {
  const allRows = extractAllRows();
  const superseded = computeSupersededByRowId(allRows);
  for (const row of allRows) {
    const chars = superseded.get(row.rowId);
    if (!chars) continue;
    for (const code of chars) row.values[code] = "";
  }

  // NPC id -> display name, keyed by (sceneKey, npc id), gathered from ANY
  // chatBubbleSpeaker row regardless of which source file/dict it came from.
  const speakerByNpc = new Map();
  for (const row of allRows) {
    if (!/chatBubbleSpeaker$/.test(row.field)) continue;
    const name = row.values.CIV || row.values.BW || row.values.CS;
    if (!name) continue;
    const key = `${row.sceneKey}::${row.context}`;
    if (!speakerByNpc.has(key)) speakerByNpc.set(key, name);
  }

  const filtered = allRows.filter(isAllowedRow);

  // First-seen order of each (sceneKey, displayContext) pair, to keep each
  // NPC's speaker/lines/choices grouped together in original source order.
  const contextFirstSeen = new Map();
  filtered.forEach((row, idx) => {
    const displayContext =
      row.field === "sceneTitle" || row.field === "sceneSubtitle"
        ? ""
        : speakerByNpc.get(`${row.sceneKey}::${row.context}`) ?? prettifyId(row.context, row.sceneKey);
    row.displayContext = displayContext;
    const key = `${row.sceneKey}::${displayContext}`;
    if (!contextFirstSeen.has(key)) contextFirstSeen.set(key, idx);
  });

  filtered.forEach((row, idx) => {
    row.originalIndex = idx;
  });

  filtered.sort((a, b) => {
    const sceneOrderA = MASTER_SCENE_ORDER.indexOf(a.sceneKey);
    const sceneOrderB = MASTER_SCENE_ORDER.indexOf(b.sceneKey);
    if (sceneOrderA !== sceneOrderB) return sceneOrderA - sceneOrderB;
    const priorityDiff = fieldSortPriority(a.field) - fieldSortPriority(b.field);
    if (priorityDiff !== 0) return priorityDiff;
    const ctxA = contextFirstSeen.get(`${a.sceneKey}::${a.displayContext}`);
    const ctxB = contextFirstSeen.get(`${b.sceneKey}::${b.displayContext}`);
    if (ctxA !== ctxB) return ctxA - ctxB;
    return a.originalIndex - b.originalIndex;
  });

  const header = ["Scene", "NPC / Context", "Field", "CIV", "BW", "CS", "Row ID"];
  const lines = [header.join(",")];
  let lastScene = null;
  for (const row of filtered) {
    const sceneLabel = SCENE_KEY_LABELS[row.sceneKey] ?? row.scene;
    if (lastScene !== null && sceneLabel !== lastScene) {
      lines.push(""); // blank separator row between scenes
    }
    lastScene = sceneLabel;
    lines.push(
      [
        sceneLabel,
        row.displayContext,
        humanizeField(row.field),
        row.values.CIV,
        row.values.BW,
        row.values.CS,
        row.rowId,
      ]
        .map(csvEscape)
        .join(",")
    );
  }

  fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
  fs.writeFileSync(OUT_PATH, lines.join("\n") + "\n", "utf8");
  console.log(`Wrote ${filtered.length} rows to ${path.relative(process.cwd(), OUT_PATH)}`);
}

main();
