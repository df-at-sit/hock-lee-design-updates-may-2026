// Shared AST extraction logic for the scene-copy CSV pipeline.
// Used by both extract.mjs (source -> CSV) and apply.mjs (CSV -> source).
// Re-parsing the source files the same way in both directions keeps row ids stable.

import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const ROOT = path.resolve(new URL(".", import.meta.url).pathname, "../..");
const GAME_DIR = path.join(ROOT, "src/app/hock-lee-bus-riots-pixel");

export const SOURCE_FILES = {
  scenes: path.join(GAME_DIR, "scenes.ts"),
  variants: path.join(GAME_DIR, "scene-variants.ts"),
  config: path.join(GAME_DIR, "scene-config.ts"),
  story: path.join(GAME_DIR, "story-data.ts"),
};

export const CHARACTERS = ["CIV", "BW", "CS"];

// Plain string-valued fields we treat as player-facing copy.
const TEXT_FIELD_NAMES = new Set([
  "sceneTitle",
  "sceneSubtitle",
  "mapLabel",
  "characterName",
  "characterAlt",
  "alt",
  "name",
  "chatBubbleSpeaker",
  "chatBubbleText",
  "label",
  "playerText",
  "npcReply",
  "availableText",
  "completedText",
  "text",
  "title",
  "description",
  "dismissLabel",
  "details",
  "didYouKnow",
  "typeLabel",
  "previewCardTitle",
  "laterLabel",
  "acceptLabel",
  "caption",
  "eyebrow",
  "body",
  "footer",
  "imageAlt",
  "detailAlt",
  "locationEvent",
  "notes",
  "summary",
  "locationLabel",
  "timelineLabel",
  "dateLabel",
  "easterEggButtonAriaLabel",
]);

// Array-of-string fields.
const ARRAY_TEXT_FIELD_NAMES = new Set(["chatBubbleTexts", "tips"]);

function isChatField(key) {
  return /^(master|user)\d+$/.test(key);
}

function isTextField(key) {
  return TEXT_FIELD_NAMES.has(key) || isChatField(key);
}

export const SCENE_KEY_LABELS = {
  "scene-1-city-hall": "City Hall",
  market: "Market",
  "government-office": "Government Office",
  "bus-depot": "Bus Depot",
  "command-center": "Command Center",
  classroom: "Classroom",
  negotiation: "Negotiation Hall",
  "alexandra-road": "Alexandra Road",
  "school-lake": "School Lake",
  funeral: "Funeral",
  kkhospital: "KK Hospital",
  "school-gates": "School Gates",
  kallangairport: "Kallang Airport",
  "home-civil-servant": "Home (Civil Servant)",
  "home-bus-worker": "Home (Bus Worker)",
  "home-chinese-student": "Home (Chinese Student)",
  "home-bus-worker-return": "Home (Bus Worker) — Return",
  "home-chinese-student-return": "Home (Chinese Student) — Return",
};

// Single-character scenes: only this character's column should be filled.
const HOME_SCENE_CHARACTER = {
  "home-civil-servant": "CIV",
  "home-bus-worker": "BW",
  "home-chinese-student": "CS",
  "home-bus-worker-return": "BW",
  "home-chinese-student-return": "CS",
};

// Longest-prefix-first match of CONST_NAME -> scene key.
const SCENE_PREFIX_TABLE = [
  ["HOME_CHINESE_STUDENT_RETURN", "home-chinese-student-return"],
  ["HOME_BUS_WORKER_RETURN", "home-bus-worker-return"],
  ["HOME_CIVIL_SERVANT", "home-civil-servant"],
  ["HOME_BUS_WORKER", "home-bus-worker"],
  ["HOME_CHINESE_STUDENT", "home-chinese-student"],
  ["HOME_STUDENT", "home-chinese-student"],
  ["CITY_HALL", "scene-1-city-hall"],
  ["GOVERNMENT_OFFICE", "government-office"],
  ["MARKET", "market"],
  ["BUS_DEPOT", "bus-depot"],
  ["COMMAND_CENTER", "command-center"],
  ["CLASSROOM", "classroom"],
  ["NEGOTIATION", "negotiation"],
  ["ALEXANDRA_ROAD", "alexandra-road"],
  ["SCHOOL_LAKE", "school-lake"],
  ["FUNERAL", "funeral"],
  ["KK_HOSPITAL", "kkhospital"],
  ["SCHOOL_GATES", "school-gates"],
  ["KALLANG_AIRPORT", "kallangairport"],
];

// Consts whose names don't follow the scene-prefix convention.
const MANUAL_SCENE_OVERRIDES = {
  PARTY_WORKER_MANIFESTO_ARTIFACT: "scene-1-city-hall",
  STUDENT_RIOT_WOODBLOCK_PRINT_ARTIFACT: "market",
  FIRST_SCENE_INTRO_GUIDE: "scene-1-city-hall",
};

const SHARED_LABEL_OVERRIDES = {
  DEFAULT_PETIR_ARTIFACT:
    "Shared — Petir Weekly artifact (Negotiation, School Lake, Funeral, KK Hospital, School Gates, Kallang Airport)",
};

// story-data.ts's StoryStep.route is always an identifier imported from story-paths.ts,
// never a literal — map those identifiers to the matching PIXEL_SCENE_VARIANTS scene key.
const ROUTE_CONST_TO_SCENE_KEY = {
  CITY_HALL_ROUTE: "scene-1-city-hall",
  MARKET_ROUTE: "market",
  HOME_CIVIL_SERVANT_ROUTE: "home-civil-servant",
  HOME_BUS_WORKER_ROUTE: "home-bus-worker",
  HOME_STUDENT_ROUTE: "home-chinese-student",
  GOVERNMENT_OFFICE_ROUTE: "government-office",
  BUS_DEPOT_ROUTE: "bus-depot",
  ALEXANDRA_ROAD_ROUTE: "alexandra-road",
  COMMAND_CENTER_ROUTE: "command-center",
  SCHOOL_LAKE_ROUTE: "school-lake",
  CLASSROOM_ROUTE: "classroom",
  NEGOTIATION_ROUTE: "negotiation",
  FUNERAL_ROUTE: "funeral",
  KK_HOSPITAL_ROUTE: "kkhospital",
  SCHOOL_GATES_ROUTE: "school-gates",
  KALLANG_AIRPORT_ROUTE: "kallangairport",
  HOME_BUS_WORKER_RETURN_ROUTE: "home-bus-worker-return",
  HOME_STUDENT_RETURN_ROUTE: "home-chinese-student-return",
};

function detectCharacterToken(constName) {
  const tokens = constName.split("_");
  for (const code of CHARACTERS) {
    if (tokens.includes(code)) return code;
  }
  return null;
}

function sceneKeyForConstName(constName) {
  if (MANUAL_SCENE_OVERRIDES[constName]) return MANUAL_SCENE_OVERRIDES[constName];
  for (const [prefix, key] of SCENE_PREFIX_TABLE) {
    if (constName.startsWith(prefix)) return key;
  }
  return null;
}

function readFile(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function createSourceFile(filePath) {
  const text = readFile(filePath);
  const sourceFile = ts.createSourceFile(
    path.basename(filePath),
    text,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS
  );
  return { sourceFile, text };
}

function propKeyName(propName) {
  if (ts.isIdentifier(propName) || ts.isStringLiteral(propName)) return propName.text;
  return null;
}

// Walks an object/array literal, emitting one leaf per text-bearing string found.
// ctx: { fileTag, sceneKey, sceneLabel, character, context, path: string[] }
function walkLiteral(node, ctx, emit) {
  if (ts.isObjectLiteralExpression(node)) {
    let localContext = ctx.context;
    for (const prop of node.properties) {
      if (
        ts.isPropertyAssignment(prop) &&
        propKeyName(prop.name) === "id" &&
        ts.isStringLiteralLike(prop.initializer)
      ) {
        localContext = prop.initializer.text;
      }
    }
    const nextCtx = { ...ctx, context: localContext };
    for (const prop of node.properties) {
      if (!ts.isPropertyAssignment(prop)) continue;
      const key = propKeyName(prop.name);
      if (key == null) continue;
      const init = prop.initializer;
      if (ARRAY_TEXT_FIELD_NAMES.has(key) && ts.isArrayLiteralExpression(init)) {
        init.elements.forEach((el, idx) => {
          if (ts.isStringLiteralLike(el)) {
            emit({ ...nextCtx, field: `${key}[${idx}]` }, el);
          }
        });
      } else if (isTextField(key) && ts.isStringLiteralLike(init)) {
        emit({ ...nextCtx, field: key }, init);
      } else if (ts.isObjectLiteralExpression(init) || ts.isArrayLiteralExpression(init)) {
        walkLiteral(init, { ...nextCtx, path: [...nextCtx.path, key] }, emit);
      }
    }
  } else if (ts.isArrayLiteralExpression(node)) {
    node.elements.forEach((el, idx) => {
      if (ts.isObjectLiteralExpression(el) || ts.isArrayLiteralExpression(el)) {
        walkLiteral(el, { ...ctx, path: [...ctx.path, `[${idx}]`] }, emit);
      }
    });
  }
}

function makeRowId(fileTag, topName, ctx) {
  return [fileTag, topName, ...ctx.path, ctx.field].join("::");
}

// ---- scenes.ts: HOCK_LEE_SCENES ----
function extractScenesFile(rows) {
  const { sourceFile } = createSourceFile(SOURCE_FILES.scenes);
  ts.forEachChild(sourceFile, (stmt) => {
    if (!ts.isVariableStatement(stmt)) return;
    for (const decl of stmt.declarationList.declarations) {
      if (!ts.isIdentifier(decl.name) || decl.name.text !== "HOCK_LEE_SCENES") continue;
      if (!decl.initializer || !ts.isArrayLiteralExpression(decl.initializer)) continue;
      decl.initializer.elements.forEach((sceneObj, idx) => {
        if (!ts.isObjectLiteralExpression(sceneObj)) return;
        let sceneNumber = null;
        let locationEvent = null;
        let charactersArr = [];
        for (const prop of sceneObj.properties) {
          if (!ts.isPropertyAssignment(prop)) continue;
          const key = propKeyName(prop.name);
          if (key === "sceneNumber" && ts.isNumericLiteral(prop.initializer)) {
            sceneNumber = prop.initializer.text;
          }
          if (key === "locationEvent" && ts.isStringLiteralLike(prop.initializer)) {
            locationEvent = prop.initializer.text;
          }
          if (key === "characters" && ts.isArrayLiteralExpression(prop.initializer)) {
            charactersArr = prop.initializer.elements
              .filter(ts.isStringLiteralLike)
              .map((el) => el.text);
          }
        }
        const sceneLabel = locationEvent ?? `Scene ${sceneNumber ?? idx}`;
        const ctxBase = {
          fileTag: "scenes",
          sceneKey: null,
          sceneLabel: `${sceneLabel} (design table)`,
          context: "Scene design table",
          path: [`[${idx}]`],
        };
        for (const prop of sceneObj.properties) {
          if (!ts.isPropertyAssignment(prop)) continue;
          const key = propKeyName(prop.name);
          if (key == null || !isTextField(key)) continue;
          if (!ts.isStringLiteralLike(prop.initializer)) continue;
          const node = prop.initializer;
          const sources = {};
          for (const code of CHARACTERS) {
            if (charactersArr.includes(code)) {
              sources[code] = { file: SOURCE_FILES.scenes, start: node.getStart(), end: node.getEnd() };
            }
          }
          rows.push({
            rowId: makeRowId("scenes", "HOCK_LEE_SCENES", { ...ctxBase, field: key }),
            scene: ctxBase.sceneLabel,
            sceneKey: null,
            context: ctxBase.context,
            field: key,
            values: { CIV: node.text, BW: node.text, CS: node.text },
            sources,
          });
        }
      });
    }
  });
}

// ---- scene-variants.ts & scene-config.ts: generic top-level consts ----
function extractGenericFile(filePath, fileTag, rows) {
  const { sourceFile } = createSourceFile(filePath);

  const topLevelDecls = [];
  ts.forEachChild(sourceFile, (stmt) => {
    if (!ts.isVariableStatement(stmt)) return;
    for (const decl of stmt.declarationList.declarations) {
      if (ts.isIdentifier(decl.name) && decl.initializer) {
        topLevelDecls.push({ name: decl.name.text, initializer: decl.initializer });
      }
    }
  });

  for (const { name, initializer } of topLevelDecls) {
    if (name === "PIXEL_SCENE_VARIANTS" && ts.isObjectLiteralExpression(initializer)) {
      // Each property is its own scene.
      for (const prop of initializer.properties) {
        if (!ts.isPropertyAssignment(prop)) continue;
        const sceneKey = propKeyName(prop.name);
        if (sceneKey == null || !ts.isObjectLiteralExpression(prop.initializer)) continue;
        const character = HOME_SCENE_CHARACTER[sceneKey] ?? null;
        const ctx = {
          fileTag,
          sceneKey,
          sceneLabel: SCENE_KEY_LABELS[sceneKey] ?? sceneKey,
          character,
          context: "Scene info",
          path: [],
        };
        walkLiteral(prop.initializer, ctx, (leafCtx, node) =>
          emitLeaf(rows, fileTag, `PIXEL_SCENE_VARIANTS.${sceneKey}`, leafCtx, node)
        );
      }
      continue;
    }

    if (!ts.isObjectLiteralExpression(initializer) && !ts.isArrayLiteralExpression(initializer)) {
      continue; // functions, primitives, Sets, etc. - not walked generically
    }

    // Record<npcId, Partial<SceneNpcFigure>> dicts: the property KEY is the NPC id
    // (there's no nested "id" field to pick up), so use it directly as context.
    if (name.endsWith("_NPC_OVERRIDES") && ts.isObjectLiteralExpression(initializer)) {
      const sceneKey = sceneKeyForConstName(name);
      const sceneLabel = SCENE_KEY_LABELS[sceneKey] ?? sceneKey ?? "Unclassified";
      const character = detectCharacterToken(name);
      for (const prop of initializer.properties) {
        if (!ts.isPropertyAssignment(prop)) continue;
        const npcId = propKeyName(prop.name);
        if (npcId == null || !ts.isObjectLiteralExpression(prop.initializer)) continue;
        const ctx = { fileTag, sceneKey, sceneLabel, character, context: npcId, path: [npcId] };
        walkLiteral(prop.initializer, ctx, (leafCtx, node) => emitLeaf(rows, fileTag, name, leafCtx, node));
      }
      continue;
    }

    const sceneKey = sceneKeyForConstName(name);
    const sceneLabel =
      SCENE_KEY_LABELS[sceneKey] ?? SHARED_LABEL_OVERRIDES[name] ?? (sceneKey ? sceneKey : "Unclassified");
    const character = detectCharacterToken(name) ?? HOME_SCENE_CHARACTER[sceneKey] ?? null;
    const ctx = {
      fileTag,
      sceneKey,
      sceneLabel,
      character,
      context: name,
      path: [],
    };
    walkLiteral(initializer, ctx, (leafCtx, node) => emitLeaf(rows, fileTag, name, leafCtx, node));
  }

  // One-off: the single inline string inside getRoleSpecificSceneContent (scene-config.ts only).
  if (fileTag === "config") {
    ts.forEachChild(sourceFile, (stmt) => {
      if (!ts.isVariableStatement(stmt)) return;
      for (const decl of stmt.declarationList.declarations) {
        if (
          ts.isIdentifier(decl.name) &&
          decl.name.text === "getRoleSpecificSceneContent" &&
          decl.initializer
        ) {
          visitForAriaLabel(decl.initializer, rows, filePath);
        }
      }
    });
  }
}

function visitForAriaLabel(node, rows, filePath) {
  const visit = (n) => {
    if (
      ts.isPropertyAssignment(n) &&
      propKeyName(n.name) === "easterEggButtonAriaLabel" &&
      ts.isStringLiteralLike(n.initializer)
    ) {
      const strNode = n.initializer;
      rows.push({
        rowId: "config::getRoleSpecificSceneContent::bus-depot.easterEggButtonAriaLabel",
        scene: SCENE_KEY_LABELS["bus-depot"],
        context: "Easter egg button",
        field: "easterEggButtonAriaLabel",
        values: { CIV: "", BW: strNode.text, CS: "" },
        sources: { BW: { file: filePath, start: strNode.getStart(), end: strNode.getEnd() } },
      });
    }
    ts.forEachChild(n, visit);
  };
  ts.forEachChild(node, visit);
}

function emitLeaf(rows, fileTag, topName, leafCtx, node) {
  const rowId = makeRowId(fileTag, topName, leafCtx);
  const values = { CIV: "", BW: "", CS: "" };
  const sources = {};
  if (leafCtx.character) {
    values[leafCtx.character] = node.text;
    sources[leafCtx.character] = { file: SOURCE_FILES[fileTag], start: node.getStart(), end: node.getEnd() };
  } else {
    for (const code of CHARACTERS) {
      values[code] = node.text;
      sources[code] = { file: SOURCE_FILES[fileTag], start: node.getStart(), end: node.getEnd() };
    }
  }
  rows.push({
    rowId,
    scene: leafCtx.sceneLabel,
    sceneKey: leafCtx.sceneKey,
    context: leafCtx.context,
    field: [...leafCtx.path, leafCtx.field].join("."),
    values,
    sources,
  });
}

// ---- story-data.ts: ROLE_STORY_STEPS (Record<CharacterCode, StoryStep[]>) ----
function extractStoryFile(rows) {
  const { sourceFile } = createSourceFile(SOURCE_FILES.story);
  const perCharacterLeaves = []; // { route, character, field, node }

  ts.forEachChild(sourceFile, (stmt) => {
    if (!ts.isVariableStatement(stmt)) return;
    for (const decl of stmt.declarationList.declarations) {
      if (!ts.isIdentifier(decl.name) || decl.name.text !== "ROLE_STORY_STEPS") continue;
      if (!decl.initializer || !ts.isObjectLiteralExpression(decl.initializer)) continue;
      for (const prop of decl.initializer.properties) {
        if (!ts.isPropertyAssignment(prop)) continue;
        const character = propKeyName(prop.name);
        if (!CHARACTERS.includes(character)) continue;
        if (!ts.isArrayLiteralExpression(prop.initializer)) continue;
        prop.initializer.elements.forEach((stepObj) => {
          if (!ts.isObjectLiteralExpression(stepObj)) return;
          let routeConstName = null;
          for (const p of stepObj.properties) {
            if (ts.isPropertyAssignment(p) && propKeyName(p.name) === "route") {
              if (ts.isStringLiteralLike(p.initializer)) {
                routeConstName = p.initializer.text;
              } else if (ts.isIdentifier(p.initializer)) {
                routeConstName = p.initializer.text;
              }
            }
          }
          const routeKey = routeConstName ?? `unknown-route-${character}`;
          for (const p of stepObj.properties) {
            if (!ts.isPropertyAssignment(p)) continue;
            const key = propKeyName(p.name);
            if (key == null || !isTextField(key)) continue;
            if (!ts.isStringLiteralLike(p.initializer)) continue;
            perCharacterLeaves.push({
              routeKey,
              routeConstName,
              character,
              field: key,
              node: p.initializer,
            });
          }
        });
      }
    }
  });

  // Group by (routeConstName, field) across characters into one row each.
  const grouped = new Map();
  for (const leaf of perCharacterLeaves) {
    const groupKey = `${leaf.routeKey}::${leaf.field}`;
    if (!grouped.has(groupKey)) {
      grouped.set(groupKey, { routeKey: leaf.routeKey, routeConstName: leaf.routeConstName, field: leaf.field, byChar: {} });
    }
    grouped.get(groupKey).byChar[leaf.character] = leaf.node;
  }

  for (const { routeKey, routeConstName, field, byChar } of grouped.values()) {
    const values = { CIV: "", BW: "", CS: "" };
    const sources = {};
    for (const code of CHARACTERS) {
      const node = byChar[code];
      if (node) {
        values[code] = node.text;
        sources[code] = { file: SOURCE_FILES.story, start: node.getStart(), end: node.getEnd() };
      }
    }
    const sceneKey = routeConstName ? ROUTE_CONST_TO_SCENE_KEY[routeConstName] : null;
    const sceneLabel = sceneKey
      ? `${SCENE_KEY_LABELS[sceneKey]} (journey step)`
      : `${routeConstName ?? routeKey} (journey step)`;
    rows.push({
      rowId: `story::${routeKey}::${field}`,
      scene: sceneLabel,
      sceneKey,
      context: "Character journey step",
      field,
      values,
      sources,
    });
  }
}

export function extractAllRows() {
  const rows = [];
  extractScenesFile(rows);
  extractGenericFile(SOURCE_FILES.variants, "variants", rows);
  extractGenericFile(SOURCE_FILES.config, "config", rows);
  extractStoryFile(rows);
  return rows;
}

// Groups a field into the "unit" that gets replaced wholesale when a character
// has their own override (e.g. chatBubbleTexts[0] and chatBubbleTexts[2] are
// the same family — if BW has a separate 3-line version, none of the base
// array's lines apply to BW anymore, not just the ones at matching indices).
function fieldFamily(field) {
  const parts = field.split(".");
  const last = parts[parts.length - 1];
  if (["label", "playerText", "npcReply"].includes(last) && parts.length >= 2) {
    return "dialogueChoices";
  }
  const bareMatch = last.match(/^([a-zA-Z]+)\[\d+\]$/);
  if (bareMatch) return bareMatch[1];
  return last;
}

function familyKey(row) {
  return `${row.sceneKey}::${row.context}::${fieldFamily(row.field)}`;
}

// For every row that's genuinely shared (all 3 characters point at the same
// physical literal), find any OTHER row that gives one of those characters
// their own separate override for the same NPC + field family. Returns
// rowId -> Set<character code> that is superseded (doesn't reflect what that
// character actually sees) on that shared row. Both extract.mjs (to blank
// those cells for display) and apply.mjs (to exclude them from round-trip
// comparison) must use this same computation, or edits silently desync.
export function computeSupersededByRowId(allRows) {
  const singleCharsByKey = new Map();
  for (const row of allRows) {
    if (!(row.rowId.startsWith("variants::") || row.rowId.startsWith("config::"))) continue;
    if (Object.keys(row.sources).length !== 1) continue;
    const key = familyKey(row);
    if (!singleCharsByKey.has(key)) singleCharsByKey.set(key, new Set());
    for (const code of Object.keys(row.sources)) singleCharsByKey.get(key).add(code);
  }
  const result = new Map();
  for (const row of allRows) {
    if (Object.keys(row.sources).length !== 3) continue;
    const overriddenChars = singleCharsByKey.get(familyKey(row));
    if (!overriddenChars || overriddenChars.size === 0) continue;
    result.set(row.rowId, overriddenChars);
  }
  return result;
}

export function readSourceText(filePath) {
  return readFile(filePath);
}
