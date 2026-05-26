"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  MAP_LAST_NODE_KEY,
  MAP_UNLOCK_ANIMATION_SCENE_KEY,
  MAP_VISITED_PROGRESS_KEY,
  getUnlockedThroughIndex,
  parseMapLastNodeKey,
  parseVisitedProgress,
} from "../map-progression";
import { DispositionRadarPanel } from "../disposition-radar-panel";
import type { CharacterCode } from "../scenes";
import {
  buildRoleAwareRoute,
  CHARACTER_PRESENTATIONS,
  getRoleSteps,
  getStoryStepByNodeKey,
  MAP_NODE_DEFINITIONS,
  MASTER_MODE_NODE_ORDER,
  type MapNodeKey,
} from "../story-data";
import { clearDispositionProgress } from "../disposition-state";
import { INTRO_CUTSCENE_ROUTE, OUTRO_CUTSCENE_ROUTE } from "../story-paths";
import { GameMenuOverlay } from "../game-menu-overlay";
import { useSelectedCharacterCode } from "../use-selected-character-code";
import { CharacterProfileCard } from "../character-profile-card";
import {
  MERLION_IDLE_HELP_MESSAGE,
  getMerlionMapCheckpointMessage,
} from "../merlion-checkpoints";
import {
  GLOBAL_SIDE_QUESTS,
  SIDEQUEST_ACCEPTED_STORAGE_KEY,
  SIDEQUEST_COMPLETED_ACTIONS_STORAGE_KEY,
  SIDEQUEST_PROGRESS_UPDATED_EVENT,
  useAcceptedSideQuestIds,
} from "../sidequest-state";

const MAP_NODE_IDLE_FILTER =
  "drop-shadow(1px 1px 0 rgba(0, 0, 0, 0.72)) drop-shadow(0 3px 6px rgba(0, 0, 0, 0.55))";

type ArrowDirection = "ArrowLeft" | "ArrowRight" | "ArrowUp" | "ArrowDown";
type MapNodeNavPoint = { nodeKey: MapNodeKey; x: number; y: number };
type MapNodePosition = { left: string; top: string };

const STUDENT_MAP_ROUTE = {
  className: "hl-pixel-map-route-layer--student",
  width: 597,
  height: 511,
  viewBox: "0 0 597 511",
  path:
    "M479.58 508.37C479.58 508.37 408.226 495.195 362.08 489.87C296.607 482.314 254.987 504.31 193.58 480.37C140.058 459.503 111.456 437.132 76.0804 391.87C48.4397 356.506 -20.8736 309.343 9.58042 276.37C71.2493 209.601 31.8706 106.713 25.8233 92.1154C25.4056 91.107 25.8733 89.9994 26.8621 89.537L171.306 21.9984C171.488 21.9134 171.682 21.8562 171.881 21.8288L315.848 2.02126C317.606 1.77939 318.784 3.77659 317.723 5.19875L245.715 101.689C245.626 101.81 245.523 101.919 245.409 102.016L139.995 191.741C139.015 192.574 139.066 194.102 140.099 194.869L326.684 333.461C327.676 334.199 327.769 335.651 326.878 336.508L224.034 435.471C223.234 436.242 223.193 437.507 224.036 438.232C251.379 461.752 356.801 449.293 368.58 391.87C381.401 329.37 466.097 398.204 475.58 347.87C488.58 278.87 526.581 302.37 578.581 288.87C614.913 279.438 579.854 174.04 569.145 159.574C568.782 159.083 568.225 158.889 567.615 158.922L328.58 171.87",
};

const BUS_WORKER_MAP_ROUTE = {
  className: "hl-pixel-map-route-layer--bus-worker",
  width: 608,
  height: 422,
  viewBox: "0 0 608 422",
  path:
    "M452.705 420C452.705 420 381.35 406.825 335.205 401.5C269.731 393.944 228.111 415.94 166.705 392C113.182 371.133 50.7051 344.5 38.7049 298C27.489 254.539 46.2509 220.973 76.7049 188C136.212 123.571 26.3611 25.5112 2.60027 5.60052C1.1447 4.38081 2.04462 2.00019 3.94367 2.00019C21.7185 2.00018 77.7034 2.00015 128.205 2.00017C167.005 2.00019 183.205 58.9182 185.205 119.752C185.205 203.461 185.205 188.06 300.531 257.097C300.952 257.348 301.29 257.776 301.443 258.242C318.416 309.868 399.215 301.086 433.627 294.806C435.942 294.384 437.232 297.858 435.14 298.934C414.773 309.412 376.273 328.122 346.705 336C293.175 350.263 205.205 346 205.205 346C205.205 346 391.069 370.234 425.205 346C490.705 299.5 613.705 367.5 581.205 308.5C552.255 255.946 587.205 200 587.205 188C587.205 145.964 536.204 123 587.205 92.0002C638.205 61.0002 566.205 28.5 576.205 2",
};

const CIVIL_SERVANT_MAP_ROUTE = {
  className: "hl-pixel-map-route-layer--civil-servant",
  width: 863,
  height: 424,
  viewBox: "0 0 863 424",
  path:
    "M452.705 421.456C452.705 421.456 381.35 408.281 335.205 402.956C269.731 395.4 228.111 417.396 166.705 393.456C113.182 372.589 50.7051 345.956 38.7049 299.456C27.489 255.995 46.2509 222.429 76.7049 189.456C136.212 125.027 26.3611 26.9669 2.60027 7.05626C1.1447 5.83654 2.04462 3.45593 3.94367 3.45593C21.7185 3.45592 77.7034 3.45589 128.205 3.45591C167.005 3.45592 360.205 42.6226 362.205 103.456C362.205 186.948 215.436 203.538 299.05 262.154C299.709 262.616 300.089 263.492 299.946 264.285C295.772 287.388 314.814 281.686 329.705 299.456C342.532 314.764 315.205 337.956 375.705 337.956C425.9 337.956 446.278 324.371 454.551 313.34C455.954 311.469 464.196 311.363 465.706 313.149C474.519 323.584 496.833 338.488 552.705 352.456C601.705 360.456 691.832 355.888 672.205 321.956C642.705 270.956 738.705 254.456 734.205 230.456C732.109 219.279 731.945 213.659 732.47 211.112C732.644 210.266 732.524 210.594 731.788 211.048C714.435 221.753 670.087 235.4 612.205 214.456C551.831 192.61 528.532 173.229 524.292 166.105C524.23 166 524.186 165.902 524.146 165.787C517.155 145.736 508.362 106.664 528.705 109.456C554.205 112.956 573.705 68.4559 578.705 41.4559C583.705 14.4559 569.205 -6.5441 580.705 5.4559C592.205 17.4559 617.205 78.4562 682.705 84.4562C748.205 90.4562 747.656 68.7846 807.705 112.456C846.205 140.456 859.705 179.979 859.705 190.956C859.705 226.956 867.705 268.456 821.205 309.456",
};

const ROLE_MAP_NODE_POSITIONS: Partial<
  Record<CharacterCode, Partial<Record<MapNodeKey, MapNodePosition>>>
> = {
  CIV: {
    "city-hall": { left: "57%", top: "75.3%" },
    market: { left: "32%", top: "30.5%" },
    home: { left: "51%", top: "35.6%" },
    "bus-depot": { left: "47.9%", top: "49.8%" },
    "government-office": { left: "56.4%", top: "54.2%" },
    "command-center": { left: "69.6%", top: "45.6%" },
    funeral: { left: "59.7%", top: "40.9%" },
    "negotiation-hall": { left: "61.9%", top: "27.6%" },
    airport: { left: "72.1%", top: "59.5%" },
  },
  BW: {
    "city-hall": { left: "56.6%", top: "75.5%" },
    market: { left: "32.6%", top: "30.2%" },
    home: { left: "42.2%", top: "38.2%" },
    "bus-depot": { left: "48.1%", top: "49.5%" },
    "government-office": { left: "56.6%", top: "54.2%" },
    "alexandra-road": { left: "42.3%", top: "60.7%" },
    hospital: { left: "62.4%", top: "42.8%" },
    "negotiation-hall": { left: "63.4%", top: "27.6%" },
  },
};

const getRoleMapNodePosition = (
  role: CharacterCode,
  nodeKey: MapNodeKey
): MapNodePosition =>
  ROLE_MAP_NODE_POSITIONS[role]?.[nodeKey] ?? MAP_NODE_DEFINITIONS[nodeKey].position;

const getRoleMapRoute = (role: CharacterCode) =>
  role === "CIV"
    ? CIVIL_SERVANT_MAP_ROUTE
    : role === "BW"
      ? BUS_WORKER_MAP_ROUTE
      : STUDENT_MAP_ROUTE;

type ResolvedMapNode = {
  key: MapNodeKey;
  label: string;
  description: string;
  isSelectable: boolean;
  isNew: boolean;
  isUnlocked: boolean;
  previewStepIndex: number | null;
  route: string | null;
};

const subscribeToMapStorage = (onStoreChange: () => void) => {
  window.addEventListener("storage", onStoreChange);
  return () => window.removeEventListener("storage", onStoreChange);
};

const findNextSceneNode = (
  currentNodeKey: MapNodeKey,
  direction: ArrowDirection,
  nodes: MapNodeNavPoint[]
) => {
  const currentNode = nodes.find((node) => node.nodeKey === currentNodeKey) ?? nodes[0];
  if (!currentNode) return currentNodeKey;

  const directionVector =
    direction === "ArrowLeft"
      ? { x: -1, y: 0 }
      : direction === "ArrowRight"
        ? { x: 1, y: 0 }
        : direction === "ArrowUp"
          ? { x: 0, y: -1 }
          : { x: 0, y: 1 };

  const directionalCandidates = nodes
    .filter((node) => node.nodeKey !== currentNode.nodeKey)
    .map((node) => {
      const dx = node.x - currentNode.x;
      const dy = node.y - currentNode.y;
      const projection = dx * directionVector.x + dy * directionVector.y;
      if (projection <= 0) return null;

      const perpendicular = Math.abs(dx * directionVector.y - dy * directionVector.x);
      const distance = Math.hypot(dx, dy);
      const anglePenalty = perpendicular / projection;

      return {
        nodeKey: node.nodeKey,
        projection,
        distance,
        anglePenalty,
      };
    })
    .filter(
      (
        candidate
      ): candidate is {
        nodeKey: MapNodeKey;
        projection: number;
        distance: number;
        anglePenalty: number;
      } => Boolean(candidate)
    );

  if (directionalCandidates.length === 0) return currentNodeKey;

  const mostlyStraight = directionalCandidates
    .filter((candidate) => candidate.anglePenalty <= 0.75)
    .sort((a, b) => a.distance - b.distance || b.projection - a.projection);

  if (mostlyStraight.length > 0) {
    return mostlyStraight[0].nodeKey;
  }

  const fallback = directionalCandidates.sort(
    (a, b) => a.anglePenalty - b.anglePenalty || a.distance - b.distance
  );
  return fallback[0].nodeKey;
};

const getUnlockedStepIndexByNodeKey = (
  role: CharacterCode,
  unlockedThroughIndex: number
) => {
  const routeSteps = getRoleSteps(role);
  const stepIndexByNodeKey = new Map<MapNodeKey, number>();

  routeSteps.forEach((step, index) => {
    if (index > unlockedThroughIndex) return;
    stepIndexByNodeKey.set(step.nodeKey, index);
  });

  return stepIndexByNodeKey;
};

export default function Map1961Page() {
  const searchParams = useSearchParams();
  const selectedCharacter = useSelectedCharacterCode(searchParams.get("role"));
  const initialMapState = useSyncExternalStore(
    subscribeToMapStorage,
    () => loadInitialMapState(selectedCharacter),
    () => buildDefaultMapState(selectedCharacter)
  );

  useEffect(() => {
    window.localStorage.removeItem(MAP_UNLOCK_ANIMATION_SCENE_KEY);
  }, [initialMapState.unlockAnimationNodeKey]);

  return (
    <RoleMapPage
      key={`${selectedCharacter}-${initialMapState.visitedProgress}-${initialMapState.activeNodeKey ?? "none"}-${initialMapState.unlockAnimationNodeKey ?? "none"}`}
      initialMapState={initialMapState}
      selectedCharacter={selectedCharacter}
    />
  );
}

type RoleMapPageProps = {
  initialMapState: InitialMapState;
  selectedCharacter: CharacterCode;
};

type InitialMapState = {
  visitedProgress: number;
  activeNodeKey: MapNodeKey | null;
  unlockAnimationNodeKey: MapNodeKey | null;
};

const defaultMapStateCache = new Map<CharacterCode, InitialMapState>();

let cachedHydratedMapState:
  | {
      selectedCharacter: CharacterCode;
      visitedProgressStorageValue: string | null;
      lastNodeStorageValue: string | null;
      unlockAnimationStorageValue: string | null;
      state: InitialMapState;
    }
  | null = null;

const buildDefaultMapState = (selectedCharacter: CharacterCode): InitialMapState => {
  const cachedState = defaultMapStateCache.get(selectedCharacter);
  if (cachedState) {
    return cachedState;
  }

  const firstNodeKey = getRoleSteps(selectedCharacter)[0]?.nodeKey ?? null;
  const defaultState = {
    visitedProgress: -1,
    activeNodeKey: firstNodeKey,
    unlockAnimationNodeKey: null,
  };

  defaultMapStateCache.set(selectedCharacter, defaultState);
  return defaultState;
};

const loadInitialMapState = (selectedCharacter: CharacterCode): InitialMapState => {
  const defaultMapState = buildDefaultMapState(selectedCharacter);
  if (typeof window === "undefined") {
    return defaultMapState;
  }

  const visitedProgressStorageValue =
    window.localStorage.getItem(MAP_VISITED_PROGRESS_KEY);
  const lastNodeStorageValue = window.localStorage.getItem(MAP_LAST_NODE_KEY);
  const unlockAnimationStorageValue = window.localStorage.getItem(
    MAP_UNLOCK_ANIMATION_SCENE_KEY
  );
  const cachedState = cachedHydratedMapState;

  if (
    cachedState &&
    cachedState.selectedCharacter === selectedCharacter &&
    cachedState.visitedProgressStorageValue === visitedProgressStorageValue &&
    cachedState.lastNodeStorageValue === lastNodeStorageValue &&
    cachedState.unlockAnimationStorageValue === unlockAnimationStorageValue
  ) {
    return cachedState.state;
  }

  const hydratedVisitedProgress = parseVisitedProgress(
    visitedProgressStorageValue,
    selectedCharacter
  );
  const unlockedThroughIndex = getUnlockedThroughIndex(
    hydratedVisitedProgress,
    selectedCharacter
  );
  const unlockedStepIndexByNodeKey = getUnlockedStepIndexByNodeKey(
    selectedCharacter,
    unlockedThroughIndex
  );
  const storedNodeKey = parseMapLastNodeKey(lastNodeStorageValue) as MapNodeKey | null;
  const defaultNodeKey =
    getRoleSteps(selectedCharacter)[unlockedThroughIndex]?.nodeKey ??
    defaultMapState.activeNodeKey;

  const nextState = {
    visitedProgress: hydratedVisitedProgress,
    activeNodeKey:
      storedNodeKey && unlockedStepIndexByNodeKey.has(storedNodeKey)
        ? storedNodeKey
        : defaultNodeKey,
    unlockAnimationNodeKey:
      (unlockAnimationStorageValue as MapNodeKey | null) ?? null,
  };

  cachedHydratedMapState = {
    selectedCharacter,
    visitedProgressStorageValue,
    lastNodeStorageValue,
    unlockAnimationStorageValue,
    state: nextState,
  };

  return nextState;
};

function RoleMapPage({ initialMapState, selectedCharacter }: RoleMapPageProps) {
  const router = useRouter();
  const [visitedProgress, setVisitedProgress] = useState(initialMapState.visitedProgress);
  const [activeNodeKey, setActiveNodeKey] = useState<MapNodeKey | null>(
    initialMapState.activeNodeKey
  );
  const [unlockAnimationNodeKey, setUnlockAnimationNodeKey] = useState<MapNodeKey | null>(
    initialMapState.unlockAnimationNodeKey
  );
  const [isRouteLoading, setIsRouteLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [masterMode, setMasterMode] = useState(false);
  const [isMerlionChatOpen, setIsMerlionChatOpen] = useState(false);
  const [idleMerlionMessage, setIdleMerlionMessage] = useState<string | null>(null);
  const acceptedSideQuestIds = useAcceptedSideQuestIds();
  const isRouteLoadingRef = useRef(false);

  const navigateWithLoading = useCallback(
    (route: string) => {
      if (isRouteLoadingRef.current) return;
      isRouteLoadingRef.current = true;
      setIsRouteLoading(true);
      router.push(route);
    },
    [router]
  );

  const resetMapProgress = useCallback(() => {
    if (!selectedCharacter || typeof window === "undefined") return;
    window.localStorage.removeItem(MAP_VISITED_PROGRESS_KEY);
    window.localStorage.removeItem(MAP_LAST_NODE_KEY);
    window.localStorage.removeItem(MAP_UNLOCK_ANIMATION_SCENE_KEY);
    window.localStorage.removeItem("inventorySlots");
    window.localStorage.removeItem(SIDEQUEST_ACCEPTED_STORAGE_KEY);
    window.localStorage.removeItem(SIDEQUEST_COMPLETED_ACTIONS_STORAGE_KEY);
    window.dispatchEvent(new CustomEvent(SIDEQUEST_PROGRESS_UPDATED_EVENT));
    clearDispositionProgress(selectedCharacter);

    const firstNodeKey = getRoleSteps(selectedCharacter)[0]?.nodeKey ?? null;
    setVisitedProgress(-1);
    setUnlockAnimationNodeKey(firstNodeKey);
    setActiveNodeKey(firstNodeKey);
  }, [selectedCharacter]);

  const unlockAllMapNodes = useCallback(() => {
    if (!selectedCharacter || typeof window === "undefined") return;

    const finalStepIndex = getRoleSteps(selectedCharacter).length - 1;
    const finalNodeKey = getRoleSteps(selectedCharacter)[finalStepIndex]?.nodeKey ?? null;

    window.localStorage.setItem(MAP_VISITED_PROGRESS_KEY, String(finalStepIndex));
    if (finalNodeKey) {
      window.localStorage.setItem(MAP_LAST_NODE_KEY, finalNodeKey);
    }

    setVisitedProgress(finalStepIndex);
    setUnlockAnimationNodeKey(finalNodeKey);
    setActiveNodeKey((currentNodeKey) => currentNodeKey ?? finalNodeKey);
  }, [selectedCharacter]);

  const handleMenuNavigation = useCallback(
    (route: string) => {
      setIsMenuOpen(false);
      setIsHelpOpen(false);
      navigateWithLoading(route);
    },
    [navigateWithLoading]
  );

  const routeSteps = useMemo(
    () => getRoleSteps(selectedCharacter),
    [selectedCharacter]
  );
  const acceptedSideQuests = useMemo(
    () =>
      selectedCharacter === "CS"
        ? acceptedSideQuestIds
        .map((sideQuestId) =>
          GLOBAL_SIDE_QUESTS.find((sideQuest) => sideQuest.id === sideQuestId)
        )
        .filter((sideQuest): sideQuest is (typeof GLOBAL_SIDE_QUESTS)[number] =>
          Boolean(sideQuest)
        )
        : [],
    [acceptedSideQuestIds, selectedCharacter]
  );
  const finalStepIndex = routeSteps.length - 1;
  const finalStepNodeKey = routeSteps[finalStepIndex]?.nodeKey ?? null;
  const hasReachedFinalScene = visitedProgress >= finalStepIndex;
  const finishRoute = useMemo(
    () => buildRoleAwareRoute(OUTRO_CUTSCENE_ROUTE, selectedCharacter),
    [selectedCharacter]
  );
  const unlockedThroughIndex = useMemo(
    () => getUnlockedThroughIndex(visitedProgress, selectedCharacter),
    [selectedCharacter, visitedProgress]
  );
  const unlockedStepIndexByNodeKey = useMemo(
    () => getUnlockedStepIndexByNodeKey(selectedCharacter, unlockedThroughIndex),
    [selectedCharacter, unlockedThroughIndex]
  );

  const resolvedNodes = useMemo<ResolvedMapNode[]>(() => {
    return MASTER_MODE_NODE_ORDER.map((nodeKey) => {
      const nodeDefinition = MAP_NODE_DEFINITIONS[nodeKey];
      const unlockedStepIndex = unlockedStepIndexByNodeKey.get(nodeKey) ?? null;
      const firstRoleStep = getStoryStepByNodeKey(selectedCharacter, nodeKey);
      const previewStep =
        unlockedStepIndex !== null ? routeSteps[unlockedStepIndex] : firstRoleStep;
      const isUnlocked = unlockedStepIndex !== null;
      const isSelectable = isUnlocked;
      const previewStepIndex =
        unlockedStepIndex ??
        (firstRoleStep ? routeSteps.findIndex((step) => step.id === firstRoleStep.id) : null);
      const route =
        unlockedStepIndex !== null
          ? buildRoleAwareRoute(
            unlockedStepIndex === 0 && visitedProgress < 0
              ? INTRO_CUTSCENE_ROUTE
              : routeSteps[unlockedStepIndex].route,
            selectedCharacter
          )
          : null;

      return {
        key: nodeKey,
        label: previewStep?.locationLabel ?? nodeDefinition.label,
        description: previewStep?.summary ?? nodeDefinition.description,
        isSelectable,
        isNew: unlockedStepIndex !== null && unlockedStepIndex > visitedProgress,
        isUnlocked,
        previewStepIndex,
        route,
      };
    });
  }, [
    routeSteps,
    selectedCharacter,
    unlockedStepIndexByNodeKey,
    visitedProgress,
  ]);

  const visibleNodes = useMemo(
    () =>
      resolvedNodes.filter((node) => {
        if (masterMode) return true;
        return node.previewStepIndex !== null;
      }),
    [masterMode, resolvedNodes]
  );
  const effectiveActiveNodeKey = useMemo<MapNodeKey | null>(() => {
    if (activeNodeKey && visibleNodes.some((node) => node.key === activeNodeKey)) {
      return activeNodeKey;
    }

    return visibleNodes[0]?.key ?? null;
  }, [activeNodeKey, visibleNodes]);
  const navigationNodes = useMemo<MapNodeNavPoint[]>(() => {
    const buildNavPoint = (nodeKey: MapNodeKey, left: string, top: string) => ({
      nodeKey,
      x: Number.parseFloat(left),
      y: Number.parseFloat(top),
    });

    return visibleNodes.map((node) => {
      const nodePosition = getRoleMapNodePosition(selectedCharacter, node.key);
      return buildNavPoint(node.key, nodePosition.left, nodePosition.top);
    });
  }, [selectedCharacter, visibleNodes]);

  const activeNode =
    effectiveActiveNodeKey
      ? resolvedNodes.find((node) => node.key === effectiveActiveNodeKey) ?? null
      : null;
  const activeStep =
    activeNode?.previewStepIndex !== null && activeNode?.previewStepIndex !== undefined
      ? routeSteps[activeNode.previewStepIndex]
      : null;
  const markerSprite =
    CHARACTER_PRESENTATIONS[selectedCharacter].markerSprite;
  const mapRoute = getRoleMapRoute(selectedCharacter);
  const checkpointMerlionMessage = useMemo(
    () =>
      getMerlionMapCheckpointMessage({
        hasReachedFinalScene,
        routeSteps,
        selectedCharacter,
        unlockedThroughIndex,
        visitedProgress,
      }),
    [
      hasReachedFinalScene,
      routeSteps,
      selectedCharacter,
      unlockedThroughIndex,
      visitedProgress,
    ]
  );
  const merlionChatMessage = idleMerlionMessage ?? checkpointMerlionMessage;

  const handleActivateNode = useCallback(
    (node: ResolvedMapNode | null) => {
      if (!node || !node.route) return;
      navigateWithLoading(node.route);
    },
    [navigateWithLoading]
  );
  const handleFinish = useCallback(() => {
    navigateWithLoading(finishRoute);
  }, [finishRoute, navigateWithLoading]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "u") {
        event.preventDefault();
        unlockAllMapNodes();
        return;
      }

      if (!activeNodeKey || navigationNodes.length === 0) {
        const fallbackNodeKey = visibleNodes[0]?.key ?? null;
        if (event.key.toLowerCase() === "s") {
          event.preventDefault();
          setMasterMode((previous) => !previous);
        }
        if (fallbackNodeKey) {
          setActiveNodeKey(fallbackNodeKey);
        }
        return;
      }

      if (event.key.toLowerCase() === "c") {
        event.preventDefault();
        resetMapProgress();
        return;
      }

      if (event.key.toLowerCase() === "s") {
        event.preventDefault();
        setMasterMode((previous) => !previous);
        return;
      }

      if (
        event.key !== "ArrowLeft" &&
        event.key !== "ArrowRight" &&
        event.key !== "ArrowUp" &&
        event.key !== "ArrowDown" &&
        event.key !== "Enter"
      ) {
        return;
      }

      event.preventDefault();

      if (event.key === "Enter") {
        handleActivateNode(activeNode);
        return;
      }

      const nextNodeKey = findNextSceneNode(
        effectiveActiveNodeKey ?? activeNodeKey,
        event.key,
        navigationNodes
      );
      setActiveNodeKey(nextNodeKey);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    activeNode,
    activeNodeKey,
    effectiveActiveNodeKey,
    handleActivateNode,
    navigationNodes,
    resetMapProgress,
    unlockAllMapNodes,
    visibleNodes,
  ]);

  useEffect(() => {
    isRouteLoadingRef.current = isRouteLoading;
  }, [isRouteLoading]);

  useEffect(() => {
    if (checkpointMerlionMessage) {
      setIsMerlionChatOpen(true);
    }
  }, [checkpointMerlionMessage]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let idleTimeoutId: number | null = null;
    const idleEvents = ["pointerdown", "keydown", "touchstart"] as const;

    const resetIdleTimer = () => {
      if (idleTimeoutId !== null) {
        window.clearTimeout(idleTimeoutId);
      }
      setIdleMerlionMessage(null);
      idleTimeoutId = window.setTimeout(() => {
        setIdleMerlionMessage(MERLION_IDLE_HELP_MESSAGE);
        setIsMerlionChatOpen(true);
      }, 5 * 60 * 1000);
    };

    resetIdleTimer();
    idleEvents.forEach((eventName) => {
      window.addEventListener(eventName, resetIdleTimer, { passive: true });
    });

    return () => {
      if (idleTimeoutId !== null) {
        window.clearTimeout(idleTimeoutId);
      }
      idleEvents.forEach((eventName) => {
        window.removeEventListener(eventName, resetIdleTimer);
      });
    };
  }, []);

  const renderResolvedNode = (node: ResolvedMapNode) => {
    const nodeDefinition = MAP_NODE_DEFINITIONS[node.key];
    const nodePosition = getRoleMapNodePosition(selectedCharacter, node.key);
    const isActive = activeNode?.key === node.key;
    const isFinalReturnNode =
      node.isUnlocked &&
      node.previewStepIndex !== null &&
      node.previewStepIndex === finalStepIndex &&
      node.key === finalStepNodeKey &&
      node.key === "home";
    return (
      <div
        key={node.key}
        className="pointer-events-auto absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center"
        style={{
          left: nodePosition.left,
          top: nodePosition.top,
          zIndex: isActive ? 10 : 6,
        }}
        onMouseEnter={() => {
          setActiveNodeKey(node.key);
        }}
        onClick={() => {
          setActiveNodeKey(node.key);
          if (!node.isSelectable) return;
          handleActivateNode(node);
        }}
      >
        {isFinalReturnNode ? (
          <div className="-mt-1 mb-2 relative z-[2] rounded-full border border-[#ffe45e] bg-[rgba(18,14,6,0.9)] px-2 py-0.5 text-[10px] uppercase tracking-[0.24em] text-[#ffe45e]">
            Return
          </div>
        ) : null}
        <div className="hl-pixel-map-node-shell">
          {node.isUnlocked ? (
            <img
              src={nodeDefinition.image.src}
              alt={nodeDefinition.image.alt}
              className={`map-location hl-pixel-map-node ${nodeDefinition.image.className} ${unlockAnimationNodeKey === node.key
                  ? "hl-pixel-node-unlock-anim"
                  : ""
                }`}
              style={{
                filter: isActive
                  ? "drop-shadow(2px 0 0 #ffff00) drop-shadow(-2px 0 0 #ffff00) drop-shadow(0 2px 0 #ffff00) drop-shadow(0 -2px 0 #ffff00) drop-shadow(2px 2px 0 #ffff00) drop-shadow(-2px 2px 0 #ffff00) drop-shadow(2px -2px 0 #ffff00) drop-shadow(-2px -2px 0 #ffff00)"
                  : MAP_NODE_IDLE_FILTER,
                cursor: node.isSelectable ? "pointer" : "not-allowed",
              }}
              draggable={false}
            />
          ) : (
            <>
              <img
                src={nodeDefinition.image.src}
                alt={nodeDefinition.image.alt}
                className={`map-location hl-pixel-map-node hl-pixel-map-node--locked-silhouette ${nodeDefinition.image.className}`}
                style={{
                  cursor: "not-allowed",
                }}
                draggable={false}
              />
              <span className="hl-pixel-map-node-lock-mark" aria-hidden="true">
                ?
              </span>
            </>
          )}
          {isActive && node.isUnlocked ? (
            <img
              src={markerSprite}
              alt=""
              aria-hidden="true"
              className="hl-pixel-map-rajiv-marker"
              draggable={false}
            />
          ) : null}
        </div>
        {node.isUnlocked && node.isNew ? (
          <div className="hl-pixel-map-node-new-badge">
            NEW!
          </div>
        ) : null}
        <div
          className={`pixel-corners hl-pixel-map-node-label ${isActive ? "hl-pixel-map-node-label--active" : ""
            } ${node.isUnlocked
              ? node.isNew
                ? "hl-pixel-map-node-label--new"
                : "hl-pixel-map-node-label--visited"
              : "hl-pixel-map-node-label--locked"
            }`}
        >
          {node.label}
        </div>
      </div>
    );
  };

  return (
    <main
      className="map-page relative min-h-screen h-dvh w-full overflow-hidden bg-black"
      aria-busy={isRouteLoading}
    >
      <aside className="scene-panel scene-panel-shell">
        <div className="scene-title-stack">
          <CharacterProfileCard characterCode={selectedCharacter} />
          <div className="scene-profile-bars-slot">
            <DispositionRadarPanel
              className="scene-radar-panel"
              selectedCharacterCode={selectedCharacter}
            />
          </div>
        </div>
        <div className="scene-panel-merlion">
          <div className="hl-merlion-hud-anchor">
            {isMerlionChatOpen ? (
              <div
                id="map-merlion-chat"
                className="hl-merlion-chat-bubble-shell"
                role="status"
              >
                <div className="hl-merlion-chat-bubble npc-chat-bubble pixel-corners">
                  <span className="npc-chat-text">
                    {merlionChatMessage}
                  </span>
                </div>
              </div>
            ) : null}
            <button
              type="button"
              className="hl-merlion-hud-button"
              aria-label="Talk to Merlion"
              aria-expanded={isMerlionChatOpen}
              aria-controls="map-merlion-chat"
              onClick={() => {
                if (isRouteLoadingRef.current) return;
                setIsMerlionChatOpen((isOpen) => !isOpen);
              }}
            >
              <img
                src="/character-profile-pics/merlion.png"
                alt=""
                aria-hidden="true"
                className="hl-merlion-hud-icon"
                draggable={false}
              />
            </button>
          </div>
        </div>
      </aside>

      <div className="scene-menu-help-controls z-20">
        <div className="ui-button-shell ui-button-shell--menu pixel-corners--wrapper">
          <button
            type="button"
            className="ui-button ui-button--menu pixel-corners"
            aria-label="Menu"
            onClick={() => {
              if (isRouteLoadingRef.current) return;
              setIsHelpOpen(false);
              setIsMenuOpen(true);
            }}
          >
            <span className="ui-button-icon">≡</span>
          </button>
        </div>
        <button
          type="button"
          className="scene-help-button"
          aria-label="Help"
          onClick={() => {
            if (isRouteLoadingRef.current) return;
            setIsMenuOpen(false);
            setIsHelpOpen(true);
          }}
        >
          <span className="scene-help-button__mark">?</span>
        </button>
        {acceptedSideQuests.length > 0 ? (
          <div className="scene-sidequest-button-stack scene-sidequest-button-stack--map">
            {acceptedSideQuests.map((sideQuest) => (
              <button
                key={sideQuest.id}
                type="button"
                className="scene-sidequest-button"
                aria-label={`Quest accepted: ${sideQuest.title}`}
              >
                <img
                  src="/icons/quest.png"
                  alt=""
                  aria-hidden="true"
                  draggable={false}
                />
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <div className="scene-map-controls z-20">
        {hasReachedFinalScene ? (
          <div className="ui-button-shell pixel-corners--wrapper">
            <button
              type="button"
              className="ui-button ui-button--finish pixel-corners"
              aria-label="Finish"
              onClick={handleFinish}
              disabled={isRouteLoading}
            >
              <span className="ui-button-text">FINISH</span>
            </button>
          </div>
        ) : null}
      </div>

      <div
        className="map-timeline map-timeline--delay absolute bottom-6 left-6 right-6 z-10 overflow-visible"
      >
        <div className="hl-pixel-timeline-shell w-full overflow-visible">
          <div className="hl-pixel-timeline-scroll">
            <div className="hl-pixel-timeline-inner">
              <div
                className="hl-pixel-timeline-track"
                aria-hidden="true"
                style={{
                  gridTemplateColumns: routeSteps.map(() => "1fr").join(" "),
                }}
              >
                {routeSteps.map((step, index) => {
                  const progressState =
                    index <= visitedProgress
                      ? "visited"
                      : index <= unlockedThroughIndex
                        ? "current"
                        : "locked";
                  return (
                    <div
                      key={step.id}
                      className={`hl-pixel-timeline-track-segment hl-pixel-timeline-track-segment--${progressState}`}
                    />
                  );
                })}
              </div>
              <div
                className="hl-pixel-timeline-events"
                style={{
                  gridTemplateColumns: routeSteps.map(() => "1fr").join(" "),
                }}
              >
                {routeSteps.map((step, index) => {
                  const isUnlocked = index <= unlockedThroughIndex;
                  const isActive = activeStep?.id === step.id;
                  return (
                    <button
                      key={step.id}
                      type="button"
                      className={`hl-pixel-timeline-event-item ${isUnlocked
                          ? "hl-pixel-timeline-event-item--enabled"
                          : "hl-pixel-timeline-event-item--disabled"
                        }`}
                      onClick={() => {
                        if (!isUnlocked) return;
                        setActiveNodeKey(step.nodeKey);
                      }}
                    >
                      <div
                        className={`pixel-corners map-timeline-button hl-pixel-timeline-date-box ${isActive
                            ? "hl-pixel-timeline-date-box--active"
                            : isUnlocked
                              ? "hl-pixel-timeline-date-box--inactive"
                              : "hl-pixel-timeline-date-box--locked"
                          }`}
                      >
                        <div className="hl-pixel-timeline-date-text">
                          {`Stop ${index + 1}`}
                        </div>
                        <div
                          className={`hl-pixel-timeline-event-label ${isActive
                              ? "hl-pixel-timeline-event-label--active"
                              : "hl-pixel-timeline-event-label--inactive"
                            }`}
                        >
                          {step.timelineLabel ?? step.locationLabel}
                        </div>
                      </div>
                      <div className="hl-pixel-timeline-marker">
                        <div
                          aria-hidden="true"
                          className={`hl-pixel-timeline-marker-stem ${isActive
                              ? "hl-pixel-timeline-marker-stem--active"
                              : "hl-pixel-timeline-marker-stem--inactive"
                            }`}
                        />
                        <div
                          aria-hidden="true"
                          className={`hl-pixel-timeline-marker-node ${isActive
                              ? "hl-pixel-timeline-marker-node--active"
                              : "hl-pixel-timeline-marker-node--inactive"
                            }`}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="scene-bg h-full w-full bg-cover bg-center bg-no-repeat hl-pixel-map-bg" />

      <div
        className={`hl-pixel-map-route-layer ${mapRoute.className}`}
        aria-hidden="true"
      >
        <svg
          className="hl-pixel-map-route-svg"
          width={mapRoute.width}
          height={mapRoute.height}
          viewBox={mapRoute.viewBox}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d={mapRoute.path}
            stroke="#F9CB9D"
            strokeWidth="4"
            strokeDasharray="10 10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {masterMode ? (
        <div
          className="absolute left-1/2 top-6 z-20 -translate-x-1/2 rounded-full border-2 border-[#8a0000] bg-[rgba(30,0,0,0.9)] px-6 py-2 text-center text-2xl uppercase tracking-[0.3em] text-[#ff3b30]"
          style={{ fontFamily: "\"PPNeueBit Bold\", \"PPNeueBit\", monospace" }}
        >
          MASTER MODE
        </div>
      ) : null}

      <div className="hl-pixel-map-node-layer pointer-events-none absolute inset-0 z-[8]">
        {visibleNodes.map((node) => renderResolvedNode(node))}
      </div>

      <GameMenuOverlay
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavigate={handleMenuNavigation}
      />

      {isHelpOpen ? (
        <div
          className="absolute inset-0 flex items-center justify-center bg-black/75 p-6"
          style={{ zIndex: 120 }}
        >
          <div
            className="scene-intro-guide-panel pixel-corners w-full max-w-2xl border border-[#9d4a1d] bg-[#ed7c42] p-6 text-[#2a1400]"
            role="dialog"
            aria-modal="true"
            aria-labelledby="map-help-title"
          >
            <div id="map-help-title" className="artifact-label text-4xl sm:text-6xl">
              Map Guide
            </div>
            <p className="mt-3 text-2xl leading-relaxed sm:text-3xl">
              Use the map and timeline to jump to any unlocked part of the story.
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-xl sm:text-3xl">
              <li>Click an unlocked place or timeline stop to focus on it.</li>
              <li>Press Enter or choose Visit to enter the selected scene.</li>
              <li>Use the arrow keys to move across the map.</li>
            </ul>
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                className="artifact-button pixel-corners rounded-full border border-[#2a1400] bg-[#ffe7b0] px-5 py-2 text-lg uppercase tracking-[0.16em] text-[#2a1400] sm:text-2xl"
                onClick={() => setIsHelpOpen(false)}
              >
                Okay
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {isRouteLoading ? (
        <div className="scene-route-loading-overlay" role="status" aria-live="polite">
          <div className="scene-route-loading-panel pixel-corners">
            <div className="scene-route-loading-title">Loading Scene</div>
            <div className="scene-route-loading-subtitle">Getting the next scene ready...</div>
            <div className="scene-route-loading-dots" aria-hidden="true">
              <span className="scene-route-loading-dot" />
              <span className="scene-route-loading-dot" />
              <span className="scene-route-loading-dot" />
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
