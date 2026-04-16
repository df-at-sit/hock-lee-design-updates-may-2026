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
  getStoryPhaseTrack,
  getStoryStepByNodeKey,
  MAP_NODE_DEFINITIONS,
  MASTER_MODE_NODE_ORDER,
  type MapNodeKey,
} from "../story-data";
import { clearDispositionProgress } from "../disposition-state";
import { INTRO_CUTSCENE_ROUTE, OUTRO_CUTSCENE_ROUTE } from "../story-paths";
import { GameMenuOverlay } from "../game-menu-overlay";
import { SceneCameraButton, SceneTitleWithCamera } from "../scene-title-with-camera";
import { useSelectedCharacterCode } from "../use-selected-character-code";

const MAP_NODE_IDLE_FILTER =
  "drop-shadow(1px 1px 0 rgba(0, 0, 0, 0.72)) drop-shadow(0 3px 6px rgba(0, 0, 0, 0.55))";
const MAP_NODE_LOCKED_FILTER = "grayscale(1) brightness(0.52) contrast(0.9)";

type ArrowDirection = "ArrowLeft" | "ArrowRight" | "ArrowUp" | "ArrowDown";
type MapNodeNavPoint = { nodeKey: MapNodeKey; x: number; y: number };

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

const MAP_TITLE_PHASE_PREFIX = /^(?:Pre-Riot|Riot|Post-Riot):\s*/;

const stripMapTitlePhasePrefix = (title: string) =>
  title.replace(MAP_TITLE_PHASE_PREFIX, "");

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
  const finalStepIndex = routeSteps.length - 1;
  const finalStepNodeKey = routeSteps[finalStepIndex]?.nodeKey ?? null;
  const hasReachedFinalScene = visitedProgress >= finalStepIndex;
  const finishRoute = useMemo(
    () => buildRoleAwareRoute(OUTRO_CUTSCENE_ROUTE, selectedCharacter),
    [selectedCharacter]
  );
  const phaseTrack = useMemo(
    () => getStoryPhaseTrack(selectedCharacter),
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

    return visibleNodes.map((node) =>
      buildNavPoint(
        node.key,
        MAP_NODE_DEFINITIONS[node.key].position.left,
        MAP_NODE_DEFINITIONS[node.key].position.top
      )
    );
  }, [visibleNodes]);

  const activeNode =
    effectiveActiveNodeKey
      ? resolvedNodes.find((node) => node.key === effectiveActiveNodeKey) ?? null
      : null;
  const activeStep =
    activeNode?.previewStepIndex !== null && activeNode?.previewStepIndex !== undefined
      ? routeSteps[activeNode.previewStepIndex]
      : null;
  const activePanelTitle = activeStep?.sceneTitle
    ? stripMapTitlePhasePrefix(activeStep.sceneTitle)
    : "Hock Lee Bus Riots";
  const activePanelSubtitle =
    activeStep?.sceneSubtitle ?? activeNode?.description ?? undefined;
  const markerSprite =
    CHARACTER_PRESENTATIONS[selectedCharacter].markerSprite;

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

  const renderResolvedNode = (node: ResolvedMapNode) => {
    const nodeDefinition = MAP_NODE_DEFINITIONS[node.key];
    const isActive = activeNode?.key === node.key;
    const isFinalReturnNode =
      node.isUnlocked &&
      node.previewStepIndex !== null &&
      node.previewStepIndex === finalStepIndex &&
      node.key === finalStepNodeKey &&
      node.key === "home";
    const actionLabel = isFinalReturnNode ? "Return Home" : "Visit";

    return (
      <div
        key={node.key}
        className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center"
        style={{
          left: nodeDefinition.position.left,
          top: nodeDefinition.position.top,
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
        <div
          className={`artifact-label mb-2 text-center text-sm sm:text-base ${isActive ? "artifact-label--active pixel-corners" : ""
            }`}
        >
          {node.label}
        </div>
        {isFinalReturnNode ? (
          <div className="-mt-1 mb-2 relative z-[2] rounded-full border border-[#ffe45e] bg-[rgba(18,14,6,0.9)] px-2 py-0.5 text-[10px] uppercase tracking-[0.24em] text-[#ffe45e]">
            Return
          </div>
        ) : null}
        <div className="hl-pixel-map-node-shell">
          <img
            src={nodeDefinition.image.src}
            alt={nodeDefinition.image.alt}
            className={`map-location hl-pixel-map-node ${nodeDefinition.image.className} ${unlockAnimationNodeKey === node.key && node.isUnlocked
                ? "hl-pixel-node-unlock-anim"
                : ""
              }`}
            style={{
              filter: !node.isUnlocked
                ? MAP_NODE_LOCKED_FILTER
                : isActive
                  ? "drop-shadow(2px 0 0 #ffff00) drop-shadow(-2px 0 0 #ffff00) drop-shadow(0 2px 0 #ffff00) drop-shadow(0 -2px 0 #ffff00) drop-shadow(2px 2px 0 #ffff00) drop-shadow(-2px 2px 0 #ffff00) drop-shadow(2px -2px 0 #ffff00) drop-shadow(-2px -2px 0 #ffff00)"
                  : MAP_NODE_IDLE_FILTER,
              cursor: node.isSelectable ? "pointer" : "not-allowed",
            }}
            draggable={false}
          />
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
          <div className="-mt-2 relative z-[2] rounded-full border border-[#ffe45e] bg-[rgba(18,14,6,0.86)] px-2 py-0.5 text-xs uppercase tracking-[0.12em] text-[#ffe45e]">
            NEW!
          </div>
        ) : null}
        {isActive && node.isSelectable ? (
          <button
            type="button"
            className="artifact-label artifact-button pixel-corners pop-in mt-2 flex w-auto items-center justify-center gap-2 rounded-full border border-[#7a1c1c] bg-[#f24747] px-3 py-1.5 text-sm uppercase tracking-[0.2em] hl-pixel-action-button"
            onClick={() => handleActivateNode(node)}
          >
            {actionLabel} <span className="text-xs leading-none">↵</span>
          </button>
        ) : isActive ? (
          <div className="artifact-label pixel-corners pop-in mt-2 rounded-full border border-[#5f5f5f] bg-[rgba(45,45,45,0.92)] px-3 py-1.5 text-sm uppercase tracking-[0.2em] text-[#d0d0d0]">
            Locked
          </div>
        ) : null}
      </div>
    );
  };

  return (
    <main
      className="map-page relative min-h-screen h-dvh w-full overflow-hidden bg-black"
      aria-busy={isRouteLoading}
    >
      <aside className="scene-panel scene-panel-shell">
        <div className="scene-title-stack scene-title-swap">
          <SceneTitleWithCamera>{activePanelTitle}</SceneTitleWithCamera>
          <div className="pixel-corners--wrapper">
            <div className="pixel-corners scene-subtitle">{activePanelSubtitle}</div>
          </div>
          <div className="mt-2">
            <SceneCameraButton />
          </div>
        </div>
        <div className="mt-3 flex items-center gap-3">
          <img
            src={CHARACTER_PRESENTATIONS[selectedCharacter].cutsceneSprite}
            alt={CHARACTER_PRESENTATIONS[selectedCharacter].playerAlt}
            className="h-16 w-16 select-none object-contain"
            style={{ imageRendering: "pixelated" }}
            draggable={false}
          />
          <div className="artifact-label pixel-corners px-3 py-2 text-left uppercase tracking-[0.14em]">
            {CHARACTER_PRESENTATIONS[selectedCharacter].playerFullName}
          </div>
        </div>
      </aside>

      <div className="absolute bottom-[12.5rem] left-6 z-20 flex items-center gap-3">
        <div className="ui-button-shell pixel-corners--wrapper">
          <button
            type="button"
            className="ui-button pixel-corners"
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
        <div className="ui-button-shell pixel-corners--wrapper">
          <button
            type="button"
            className="ui-button pixel-corners"
            aria-label="Help"
            onClick={() => {
              if (isRouteLoadingRef.current) return;
              setIsMenuOpen(false);
              setIsHelpOpen(true);
            }}
          >
            <span className="ui-button-icon">?</span>
          </button>
        </div>
      </div>

      {hasReachedFinalScene ? (
        <div className="absolute bottom-[12.5rem] right-6 z-20 flex items-center">
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
        </div>
      ) : null}

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
                  gridTemplateColumns: phaseTrack.map((phase) => `${phase.span}fr`).join(" "),
                }}
              >
                {phaseTrack.map((phase, index) => (
                  <div
                    key={phase.label}
                    className="hl-pixel-timeline-track-segment"
                    style={{
                      backgroundColor: phase.color,
                      borderTopLeftRadius: index === 0 ? "999px" : 0,
                      borderBottomLeftRadius: index === 0 ? "999px" : 0,
                      borderTopRightRadius: index === phaseTrack.length - 1 ? "999px" : 0,
                      borderBottomRightRadius:
                        index === phaseTrack.length - 1 ? "999px" : 0,
                    }}
                  >
                    <span className="hl-pixel-timeline-track-label">{phase.label}</span>
                  </div>
                ))}
              </div>
              <div className="hl-pixel-timeline-events">
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
                            : "hl-pixel-timeline-date-box--inactive"
                          }`}
                      >
                        <div className="hl-pixel-timeline-date-text">
                          {step.dateLabel ?? `Stop ${index + 1}`}
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

      {masterMode ? (
        <div
          className="absolute left-1/2 top-6 z-20 -translate-x-1/2 rounded-full border-2 border-[#8a0000] bg-[rgba(30,0,0,0.9)] px-6 py-2 text-center text-2xl uppercase tracking-[0.3em] text-[#ff3b30]"
          style={{ fontFamily: "\"PPNeueBit Bold\", \"PPNeueBit\", monospace" }}
        >
          MASTER MODE
        </div>
      ) : null}

      <div className="absolute inset-0 z-[8]">
        {visibleNodes.map((node) => renderResolvedNode(node))}
      </div>

      <div className="absolute right-6 top-6 z-10 inventory-rise-in">
        <DispositionRadarPanel selectedCharacterCode={selectedCharacter} />
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
