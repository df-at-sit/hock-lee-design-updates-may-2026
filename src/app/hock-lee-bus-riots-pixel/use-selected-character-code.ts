"use client";

import { useEffect, useSyncExternalStore } from "react";
import { persistCharacterCode } from "./scene-config";
import {
  resolveCharacterCode,
  SELECTED_CHARACTER_STORAGE_KEY,
} from "./story-data";

const subscribeToCharacterStorage = (onStoreChange: () => void) => {
  window.addEventListener("storage", onStoreChange);
  return () => window.removeEventListener("storage", onStoreChange);
};

export const useSelectedCharacterCode = (
  searchRole?: string | null
 ) => {
  const hasSearchRole = searchRole !== null && searchRole !== undefined;
  const selectedCharacter = useSyncExternalStore(
    subscribeToCharacterStorage,
    () =>
      hasSearchRole
        ? resolveCharacterCode(searchRole)
        : resolveCharacterCode(
          window.localStorage.getItem(SELECTED_CHARACTER_STORAGE_KEY)
        ),
    () => resolveCharacterCode(searchRole)
  );

  useEffect(() => {
    persistCharacterCode(selectedCharacter);
  }, [selectedCharacter]);

  return selectedCharacter;
};
