"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import type { CharacterCode } from "./scenes";

export type MindsetKey =
  | "empathy"
  | "courage"
  | "curiosity"
  | "tenacity"
  | "optimism";

export type MindsetProfile = Record<MindsetKey, number>;

type DispositionEntityType = "npc" | "artifact";

type DispositionMetadataEntry = {
  entityType: DispositionEntityType;
  entityId: string;
  label: string;
  scores: MindsetProfile;
};

type DispositionProgressState = {
  interactionKeys: string[];
};

const ROLE_CODES: CharacterCode[] = ["BW", "CIV", "CS"];
const DISPOSITION_STORAGE_KEY_PREFIX = "hockLeeDispositionProgress";
const DISPOSITION_PROGRESS_UPDATED_EVENT = "hock-lee-disposition-progress-updated";
const DISPOSITION_METADATA_CSV_PATH =
  "/data/hock-lee-bus-riots-pixel/disposition-metadata.csv";
const DEFAULT_MINDSET_SCORE = 50;

export const DEFAULT_MINDSET_PROFILE: MindsetProfile = {
  empathy: DEFAULT_MINDSET_SCORE,
  courage: DEFAULT_MINDSET_SCORE,
  curiosity: DEFAULT_MINDSET_SCORE,
  tenacity: DEFAULT_MINDSET_SCORE,
  optimism: DEFAULT_MINDSET_SCORE,
};

const EMPTY_DISPOSITION_PROGRESS: DispositionProgressState = {
  interactionKeys: [],
};
const EMPTY_DISPOSITION_PROGRESS_SNAPSHOT = JSON.stringify(
  EMPTY_DISPOSITION_PROGRESS
);

let dispositionMetadataPromise: Promise<Map<string, DispositionMetadataEntry>> | null = null;

const MINDSET_KEYS: MindsetKey[] = [
  "empathy",
  "courage",
  "curiosity",
  "tenacity",
  "optimism",
];

const buildDispositionStorageKey = (role: CharacterCode) =>
  `${DISPOSITION_STORAGE_KEY_PREFIX}:${role}`;

const emitDispositionProgressUpdated = () => {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(DISPOSITION_PROGRESS_UPDATED_EVENT));
};

const parseCsvLine = (line: string) => {
  const values: string[] = [];
  let currentValue = "";
  let isQuoted = false;

  for (let index = 0; index < line.length; index += 1) {
    const character = line[index];

    if (character === '"') {
      if (isQuoted && line[index + 1] === '"') {
        currentValue += '"';
        index += 1;
        continue;
      }
      isQuoted = !isQuoted;
      continue;
    }

    if (character === "," && !isQuoted) {
      values.push(currentValue.trim());
      currentValue = "";
      continue;
    }

    currentValue += character;
  }

  values.push(currentValue.trim());
  return values;
};

const parseDispositionMetadataCsv = (csvText: string) => {
  const normalizedText = csvText.replace(/^\uFEFF/, "").trim();
  if (normalizedText.length === 0) {
    return new Map<string, DispositionMetadataEntry>();
  }

  const lines = normalizedText
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  if (lines.length === 0) {
    return new Map<string, DispositionMetadataEntry>();
  }

  const header = parseCsvLine(lines[0]).map((value) => value.toLowerCase());
  const columnIndexByName = new Map(header.map((value, index) => [value, index]));

  const readColumn = (values: string[], columnName: string) => {
    const columnIndex = columnIndexByName.get(columnName);
    return columnIndex === undefined ? "" : values[columnIndex] ?? "";
  };

  const parseScore = (value: string) => {
    const parsedValue = Number.parseFloat(value);
    if (!Number.isFinite(parsedValue)) {
      return DEFAULT_MINDSET_SCORE;
    }
    return Math.max(0, Math.min(100, Math.round(parsedValue)));
  };

  const metadataByKey = new Map<string, DispositionMetadataEntry>();

  lines.slice(1).forEach((line) => {
    const values = parseCsvLine(line);
    const rawEntityType = readColumn(values, "entity_type").toLowerCase();
    const entityType =
      rawEntityType === "artifact" ? "artifact" : rawEntityType === "npc" ? "npc" : null;
    const entityId = readColumn(values, "entity_id");
    const label = readColumn(values, "label");

    if (!entityType || entityId.length === 0) {
      return;
    }

    metadataByKey.set(buildDispositionInteractionKey(entityType, entityId), {
      entityType,
      entityId,
      label: label || entityId,
      scores: {
        empathy: parseScore(readColumn(values, "empathy")),
        courage: parseScore(readColumn(values, "courage")),
        curiosity: parseScore(readColumn(values, "curiosity")),
        tenacity: parseScore(readColumn(values, "tenacity")),
        optimism: parseScore(readColumn(values, "optimism")),
      },
    });
  });

  return metadataByKey;
};

const loadDispositionMetadata = async () => {
  if (typeof window === "undefined") {
    return new Map<string, DispositionMetadataEntry>();
  }

  if (!dispositionMetadataPromise) {
    dispositionMetadataPromise = fetch(DISPOSITION_METADATA_CSV_PATH, {
      cache: "no-store",
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`Failed to load disposition metadata: ${response.status}`);
        }
        return response.text();
      })
      .then(parseDispositionMetadataCsv)
      .catch((error) => {
        console.error(error);
        return new Map<string, DispositionMetadataEntry>();
      });
  }

  return dispositionMetadataPromise;
};

const parseDispositionProgressState = (
  storedValue: string | null
): DispositionProgressState => {
  if (!storedValue) {
    return EMPTY_DISPOSITION_PROGRESS;
  }

  try {
    const parsedValue = JSON.parse(storedValue) as Partial<DispositionProgressState>;
    if (!Array.isArray(parsedValue.interactionKeys)) {
      return EMPTY_DISPOSITION_PROGRESS;
    }

    return {
      interactionKeys: parsedValue.interactionKeys.filter(
        (interactionKey): interactionKey is string => typeof interactionKey === "string"
      ),
    };
  } catch {
    return EMPTY_DISPOSITION_PROGRESS;
  }
};

const readDispositionProgressState = (role: CharacterCode): DispositionProgressState => {
  if (typeof window === "undefined") {
    return EMPTY_DISPOSITION_PROGRESS;
  }

  return parseDispositionProgressState(
    window.localStorage.getItem(buildDispositionStorageKey(role))
  );
};

const readDispositionProgressSnapshot = (role: CharacterCode) => {
  if (typeof window === "undefined") {
    return EMPTY_DISPOSITION_PROGRESS_SNAPSHOT;
  }

  return (
    window.localStorage.getItem(buildDispositionStorageKey(role)) ??
    EMPTY_DISPOSITION_PROGRESS_SNAPSHOT
  );
};

const subscribeToDispositionProgress = (
  role: CharacterCode,
  onStoreChange: () => void
) => {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  const handleProgressUpdated = () => {
    onStoreChange();
  };

  const handleStorage = (event: StorageEvent) => {
    if (event.key && event.key !== buildDispositionStorageKey(role)) {
      return;
    }
    onStoreChange();
  };

  window.addEventListener(
    DISPOSITION_PROGRESS_UPDATED_EVENT,
    handleProgressUpdated as EventListener
  );
  window.addEventListener("storage", handleStorage);

  return () => {
    window.removeEventListener(
      DISPOSITION_PROGRESS_UPDATED_EVENT,
      handleProgressUpdated as EventListener
    );
    window.removeEventListener("storage", handleStorage);
  };
};

const writeDispositionProgressState = (
  role: CharacterCode,
  nextState: DispositionProgressState
) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(
    buildDispositionStorageKey(role),
    JSON.stringify(nextState)
  );
  emitDispositionProgressUpdated();
};

const computeMindsetProfile = (
  interactionKeys: string[],
  metadataByKey: Map<string, DispositionMetadataEntry> | null
): MindsetProfile => {
  if (!metadataByKey || interactionKeys.length === 0) {
    return DEFAULT_MINDSET_PROFILE;
  }

  const matchedEntries = interactionKeys
    .map((interactionKey) => metadataByKey.get(interactionKey))
    .filter(
      (entry): entry is DispositionMetadataEntry => entry !== undefined
    );

  if (matchedEntries.length === 0) {
    return DEFAULT_MINDSET_PROFILE;
  }

  const totals = matchedEntries.reduce<MindsetProfile>(
    (currentTotals, entry) => ({
      empathy: currentTotals.empathy + entry.scores.empathy,
      courage: currentTotals.courage + entry.scores.courage,
      curiosity: currentTotals.curiosity + entry.scores.curiosity,
      tenacity: currentTotals.tenacity + entry.scores.tenacity,
      optimism: currentTotals.optimism + entry.scores.optimism,
    }),
    {
      empathy: 0,
      courage: 0,
      curiosity: 0,
      tenacity: 0,
      optimism: 0,
    }
  );

  return MINDSET_KEYS.reduce<MindsetProfile>(
    (profile, mindsetKey) => ({
      ...profile,
      [mindsetKey]: Math.round(totals[mindsetKey] / matchedEntries.length),
    }),
    { ...DEFAULT_MINDSET_PROFILE }
  );
};

export const buildDispositionInteractionKey = (
  entityType: DispositionEntityType,
  entityId: string
) => `${entityType}:${entityId}`;

export const buildNpcInteractionKey = (npcId: string) =>
  buildDispositionInteractionKey("npc", npcId);

export const buildArtifactInteractionKey = (artifactId: string) =>
  buildDispositionInteractionKey("artifact", artifactId);

export const registerDispositionInteraction = ({
  role,
  interactionKey,
}: {
  role: CharacterCode;
  interactionKey: string;
}) => {
  const currentState = readDispositionProgressState(role);

  if (currentState.interactionKeys.includes(interactionKey)) {
    return false;
  }

  writeDispositionProgressState(role, {
    interactionKeys: [...currentState.interactionKeys, interactionKey],
  });

  return true;
};

export const clearDispositionProgress = (role: CharacterCode) => {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(buildDispositionStorageKey(role));
  emitDispositionProgressUpdated();
};

export const clearAllDispositionProgress = () => {
  if (typeof window === "undefined") return;

  ROLE_CODES.forEach((role) => {
    window.localStorage.removeItem(buildDispositionStorageKey(role));
  });

  emitDispositionProgressUpdated();
};

export const useDispositionProfile = (role: CharacterCode) => {
  const dispositionProgressSnapshot = useSyncExternalStore(
    (onStoreChange) => subscribeToDispositionProgress(role, onStoreChange),
    () => readDispositionProgressSnapshot(role),
    () => EMPTY_DISPOSITION_PROGRESS_SNAPSHOT
  );
  const interactionKeys = useMemo(
    () => parseDispositionProgressState(dispositionProgressSnapshot).interactionKeys,
    [dispositionProgressSnapshot]
  );
  const [metadataByKey, setMetadataByKey] = useState<Map<
    string,
    DispositionMetadataEntry
  > | null>(null);

  useEffect(() => {
    let isSubscribed = true;

    loadDispositionMetadata().then((nextMetadataByKey) => {
      if (!isSubscribed) return;
      setMetadataByKey(nextMetadataByKey);
    });

    return () => {
      isSubscribed = false;
    };
  }, []);

  const profile = useMemo(
    () => computeMindsetProfile(interactionKeys, metadataByKey),
    [interactionKeys, metadataByKey]
  );

  return {
    profile,
    interactionCount: interactionKeys.length,
    isMetadataReady: metadataByKey !== null,
  };
};
