import type { CharacterCode } from "./scenes";
import type { MapNodeKey } from "./story-data";
import {
  getRoleSteps,
  getStoryStepIndexByRoute,
  stripRouteQuery,
} from "./story-data";
export {
  ALEXANDRA_ROAD_ROUTE,
  BUS_DEPOT_ROUTE,
  CITY_HALL_ROUTE,
  CLASSROOM_ROUTE,
  COMMAND_CENTER_ROUTE,
  FUNERAL_ROUTE,
  GOVERNMENT_OFFICE_ROUTE,
  HOCK_LEE_MAP_ROUTE,
  HOME_BUS_WORKER_RETURN_ROUTE,
  HOME_BUS_WORKER_ROUTE,
  HOME_CIVIL_SERVANT_ROUTE,
  HOME_STUDENT_RETURN_ROUTE,
  HOME_STUDENT_ROUTE,
  INTRO_CUTSCENE_ROUTE as CITY_HALL_CUTSCENE_ROUTE,
  INTRO_CUTSCENE_ROUTE,
  KALLANG_AIRPORT_ROUTE,
  KK_HOSPITAL_ROUTE,
  MARKET_ROUTE,
  NEGOTIATION_ROUTE,
  OUTRO_CUTSCENE_ROUTE,
  POST_RIOT_CUTSCENE_ROUTE,
  RIOT_CUTSCENE_ROUTE,
  SCHOOL_GATES_ROUTE,
  SCHOOL_LAKE_ROUTE,
} from "./story-paths";

export const MAP_LAST_NODE_KEY = "mapLastNode";
export const MAP_VISITED_PROGRESS_KEY = "hockLeeMapVisitedProgress";
export const MAP_UNLOCK_ANIMATION_SCENE_KEY = "hockLeeMapUnlockAnimationNode";

const MIN_VISITED_PROGRESS = -1;

export const normalizeVisitedProgress = (
  value: number,
  role: CharacterCode
) => {
  const maxVisitedProgress = getRoleSteps(role).length - 1;
  if (!Number.isFinite(value)) return MIN_VISITED_PROGRESS;
  return Math.min(
    Math.max(Math.floor(value), MIN_VISITED_PROGRESS),
    maxVisitedProgress
  );
};

export const parseVisitedProgress = (
  value: string | null,
  role: CharacterCode
) => {
  if (!value) return MIN_VISITED_PROGRESS;
  return normalizeVisitedProgress(Number.parseInt(value, 10), role);
};

export const getUnlockedThroughIndex = (
  visitedProgress: number,
  role: CharacterCode
) => {
  const maxUnlockedThroughIndex = getRoleSteps(role).length - 1;
  return Math.min(
    maxUnlockedThroughIndex,
    Math.max(0, normalizeVisitedProgress(visitedProgress, role) + 1)
  );
};

export const getUnlockedNodeKey = (
  visitedProgress: number,
  role: CharacterCode
): MapNodeKey | null =>
  getRoleSteps(role)[getUnlockedThroughIndex(visitedProgress, role)]?.nodeKey ?? null;

export const isStepIndexUnlocked = (
  stepIndex: number,
  visitedProgress: number,
  role: CharacterCode
) => stepIndex <= getUnlockedThroughIndex(visitedProgress, role);

export const advanceVisitedProgress = (
  visitedProgress: number,
  route: string,
  role: CharacterCode
) => {
  const current = normalizeVisitedProgress(visitedProgress, role);
  const stepIndex = getStoryStepIndexByRoute(role, stripRouteQuery(route));
  if (stepIndex < 0) return current;
  if (!isStepIndexUnlocked(stepIndex, current, role)) return current;
  return Math.max(current, stepIndex);
};

export const parseMapLastNodeKey = (value: string | null) => {
  if (!value) return null;
  const normalized = value.trim();
  return normalized.length > 0 ? normalized : null;
};
