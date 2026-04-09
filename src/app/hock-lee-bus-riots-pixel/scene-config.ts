import type { BaseSceneConfig } from "./base-scene-shell";
import type { CharacterCode } from "./scenes";
import {
  buildRoleAwareRoute,
  CHARACTER_PRESENTATIONS,
  getExitRouteForStepIndex,
  getStoryStepByRoute,
  getStoryStepIndexByRoute,
  resolveCharacterCode,
  SELECTED_CHARACTER_STORAGE_KEY,
} from "./story-data";
import { COMMAND_CENTER_ROUTE, HOCK_LEE_MAP_ROUTE } from "./story-paths";

const COMMAND_CENTER_DAVID_ID = "command-center-david-marshall-south";
const NPC_BEHIND_DESK_CLASS = "npc-figure--behind-desk";

const appendClassName = (existingClassName: string | undefined, nextClassName: string) => {
  if (!existingClassName) return nextClassName;
  if (existingClassName.split(/\s+/).includes(nextClassName)) return existingClassName;
  return `${existingClassName} ${nextClassName}`;
};

const getRoleSpecificNpcFigures = (
  baseConfig: BaseSceneConfig,
  role: CharacterCode,
  pathname: string
) => {
  if (role !== "CIV" || pathname !== COMMAND_CENTER_ROUTE || !baseConfig.npcFigures) {
    return baseConfig.npcFigures;
  }

  return baseConfig.npcFigures.map((npcFigure) =>
    npcFigure.id === COMMAND_CENTER_DAVID_ID
      ? {
          ...npcFigure,
          className: appendClassName(npcFigure.className, NPC_BEHIND_DESK_CLASS),
        }
      : npcFigure
  );
};

const replaceRoleName = (value: string, playerName: string) =>
  value.replaceAll("Rajiv Menon", playerName).replaceAll("Rajiv", playerName);

export const getStoredCharacterCode = (searchRole?: string | null): CharacterCode => {
  const resolvedSearchRole = resolveCharacterCode(searchRole);
  if (searchRole) return resolvedSearchRole;
  if (typeof window === "undefined") return resolvedSearchRole;
  return resolveCharacterCode(
    window.localStorage.getItem(SELECTED_CHARACTER_STORAGE_KEY)
  );
};

export const persistCharacterCode = (role: CharacterCode) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(SELECTED_CHARACTER_STORAGE_KEY, role);
};

export const resolveSceneConfigForRole = (
  baseConfig: BaseSceneConfig,
  role: CharacterCode,
  pathname: string
): BaseSceneConfig => {
  const presentation = CHARACTER_PRESENTATIONS[role];
  const step = getStoryStepByRoute(role, pathname);
  const stepIndex = getStoryStepIndexByRoute(role, pathname);
  const exitRoute =
    stepIndex >= 0
      ? getExitRouteForStepIndex(role, stepIndex)
      : HOCK_LEE_MAP_ROUTE;
  const introGuide = baseConfig.introGuide
    ? {
        ...baseConfig.introGuide,
        title: baseConfig.introGuide.title
          ? replaceRoleName(baseConfig.introGuide.title, presentation.playerName)
          : undefined,
        description: replaceRoleName(
          baseConfig.introGuide.description,
          presentation.playerName
        ),
        tips: baseConfig.introGuide.tips?.map((tip) =>
          replaceRoleName(tip, presentation.playerName)
        ),
      }
    : undefined;
  const npcFigures = getRoleSpecificNpcFigures(baseConfig, role, pathname);

  return {
    ...baseConfig,
    npcFigures,
    sceneTitle: step?.sceneTitle ?? baseConfig.sceneTitle,
    sceneSubtitle: step?.sceneSubtitle ?? baseConfig.sceneSubtitle,
    characterName: presentation.playerName,
    characterAlt: presentation.playerAlt,
    characterSpriteBasePath:
      presentation.characterSpriteBasePath ?? baseConfig.characterSpriteBasePath,
    characterSprites: presentation.characterSprites ?? baseConfig.characterSprites,
    selectedCharacterCode: role,
    mapRoute: buildRoleAwareRoute(exitRoute, role),
    introGuide,
  };
};
