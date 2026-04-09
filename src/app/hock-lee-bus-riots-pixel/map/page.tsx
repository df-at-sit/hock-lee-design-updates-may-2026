"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
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
  STORY_PHASE_TRACK,
} from "../story-data";
import {
  getStoredCharacterCode,
  persistCharacterCode,
} from "../scene-config";
import { INTRO_CUTSCENE_ROUTE } from "../story-paths";
import { GameMenuOverlay } from "../game-menu-overlay";

const MAP_NODE_IDLE_FILTER =
  "drop-shadow(1px 1px 0 rgba(0, 0, 0, 0.72)) drop-shadow(0 3px 6px rgba(0, 0, 0, 0.55))";
const MAP_NODE_LOCKED_FILTER = "grayscale(1) brightness(0.52) contrast(0.9)";
const SCHOOL_ZONE_POSITION = { left: "14%", top: "49%" } as const;
const SCHOOL_ZONE_NODE_KEYS: MapNodeKey[] = [
  "classroom",
  "school-lake",
  "school-gates",
];
const SCHOOL_ZONE_NODE_KEY_SET = new Set<MapNodeKey>(SCHOOL_ZONE_NODE_KEYS);
const SCHOOL_ZONE_FOCUS_KEY = "school-zone";
const SCHOOL_CLUSTER_NODE_DELAYS: Partial<Record<MapNodeKey, string>> = {
  classroom: "0ms",
  "school-gates": "70ms",
  "school-lake": "140ms",
};

type ArrowDirection = "ArrowLeft" | "ArrowRight" | "ArrowUp" | "ArrowDown";
type MapFocusKey = MapNodeKey | typeof SCHOOL_ZONE_FOCUS_KEY;
type MapNodeNavPoint = { nodeKey: MapFocusKey; x: number; y: number };

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

const findNextSceneNode = (
  currentNodeKey: MapFocusKey,
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
        nodeKey: MapFocusKey;
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

const isSchoolClusterNodeKey = (
  nodeKey: MapFocusKey | null
): nodeKey is MapNodeKey =>
  nodeKey !== null &&
  nodeKey !== SCHOOL_ZONE_FOCUS_KEY &&
  SCHOOL_ZONE_NODE_KEY_SET.has(nodeKey);

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
  const selectedCharacter = getStoredCharacterCode(searchParams.get("role"));

  useEffect(() => {
    persistCharacterCode(selectedCharacter);
  }, [selectedCharacter]);

  return (
    <RoleMapPage
      key={selectedCharacter}
      selectedCharacter={selectedCharacter}
    />
  );
}

type RoleMapPageProps = {
  selectedCharacter: CharacterCode;
};

type InitialMapState = {
  visitedProgress: number;
  activeNodeKey: MapFocusKey | null;
  unlockAnimationNodeKey: MapNodeKey | null;
};

const loadInitialMapState = (selectedCharacter: CharacterCode): InitialMapState => {
  const firstNodeKey = getRoleSteps(selectedCharacter)[0]?.nodeKey ?? null;
  if (typeof window === "undefined") {
    return {
      visitedProgress: -1,
      activeNodeKey: firstNodeKey,
      unlockAnimationNodeKey: null,
    };
  }

  const hydratedVisitedProgress = parseVisitedProgress(
    window.localStorage.getItem(MAP_VISITED_PROGRESS_KEY),
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
  const storedNodeKey = parseMapLastNodeKey(
    window.localStorage.getItem(MAP_LAST_NODE_KEY)
  ) as MapNodeKey | null;
  const defaultNodeKey =
    getRoleSteps(selectedCharacter)[unlockedThroughIndex]?.nodeKey ?? firstNodeKey;

  return {
    visitedProgress: hydratedVisitedProgress,
    activeNodeKey:
      storedNodeKey && unlockedStepIndexByNodeKey.has(storedNodeKey)
        ? storedNodeKey
        : defaultNodeKey,
    unlockAnimationNodeKey:
      (window.localStorage.getItem(MAP_UNLOCK_ANIMATION_SCENE_KEY) as MapNodeKey | null) ??
      null,
  };
};

function RoleMapPage({ selectedCharacter }: RoleMapPageProps) {
  const router = useRouter();
  const initialMapState = useMemo(
    () => loadInitialMapState(selectedCharacter),
    [selectedCharacter]
  );
  const [visitedProgress, setVisitedProgress] = useState(initialMapState.visitedProgress);
  const [activeNodeKey, setActiveNodeKey] = useState<MapFocusKey | null>(
    initialMapState.activeNodeKey
  );
  const [unlockAnimationNodeKey, setUnlockAnimationNodeKey] = useState<MapNodeKey | null>(
    initialMapState.unlockAnimationNodeKey
  );
  const [isRouteLoading, setIsRouteLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [masterMode, setMasterMode] = useState(false);
  const [isSchoolZoneHovered, setIsSchoolZoneHovered] = useState(false);
  const isRouteLoadingRef = useRef(false);
  const mapNodeLayerRef = useRef<HTMLDivElement | null>(null);
  const schoolZoneHoverTimeoutRef = useRef<number | null>(null);
  const [mapNodeLayerSize, setMapNodeLayerSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(MAP_UNLOCK_ANIMATION_SCENE_KEY);
    }
  }, []);

  const clearSchoolZoneHoverTimeout = useCallback(() => {
    if (schoolZoneHoverTimeoutRef.current === null) return;
    window.clearTimeout(schoolZoneHoverTimeoutRef.current);
    schoolZoneHoverTimeoutRef.current = null;
  }, []);

  const scheduleSchoolZoneHoverExit = useCallback(() => {
    clearSchoolZoneHoverTimeout();
    schoolZoneHoverTimeoutRef.current = window.setTimeout(() => {
      setIsSchoolZoneHovered(false);
      schoolZoneHoverTimeoutRef.current = null;
    }, 90);
  }, [clearSchoolZoneHoverTimeout]);

  useEffect(
    () => () => {
      clearSchoolZoneHoverTimeout();
    },
    [clearSchoolZoneHoverTimeout]
  );

  useEffect(() => {
    const nodeLayer = mapNodeLayerRef.current;
    if (!nodeLayer) return;

    const updateMapNodeLayerSize = () => {
      const bounds = nodeLayer.getBoundingClientRect();
      setMapNodeLayerSize({ width: bounds.width, height: bounds.height });
    };

    updateMapNodeLayerSize();

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", updateMapNodeLayerSize);
      return () => window.removeEventListener("resize", updateMapNodeLayerSize);
    }

    const observer = new ResizeObserver(updateMapNodeLayerSize);
    observer.observe(nodeLayer);

    return () => observer.disconnect();
  }, []);

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

    const firstNodeKey = getRoleSteps(selectedCharacter)[0]?.nodeKey ?? null;
    setVisitedProgress(-1);
    setUnlockAnimationNodeKey(firstNodeKey);
    setActiveNodeKey(firstNodeKey);
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
  const shouldShowSchoolZone = selectedCharacter === "CS" || masterMode;
  const schoolZoneNodes = useMemo(
    () => visibleNodes.filter((node) => SCHOOL_ZONE_NODE_KEY_SET.has(node.key)),
    [visibleNodes]
  );
  const nonSchoolZoneNodes = useMemo(
    () => visibleNodes.filter((node) => !SCHOOL_ZONE_NODE_KEY_SET.has(node.key)),
    [visibleNodes]
  );
  const isSchoolZoneUnlocked = schoolZoneNodes.some((node) => node.isUnlocked);
  const latestUnlockedSchoolZoneNodeKey =
    schoolZoneNodes.filter((node) => node.isUnlocked).at(-1)?.key ?? null;
  const isSchoolZoneAvailable = shouldShowSchoolZone && schoolZoneNodes.length > 0;

  const effectiveActiveNodeKey = useMemo<MapFocusKey | null>(() => {
    if (activeNodeKey === SCHOOL_ZONE_FOCUS_KEY) {
      return isSchoolZoneAvailable ? activeNodeKey : visibleNodes[0]?.key ?? null;
    }

    if (activeNodeKey && visibleNodes.some((node) => node.key === activeNodeKey)) {
      return activeNodeKey;
    }

    if (isSchoolZoneAvailable) {
      return SCHOOL_ZONE_FOCUS_KEY;
    }

    return visibleNodes[0]?.key ?? null;
  }, [activeNodeKey, isSchoolZoneAvailable, visibleNodes]);

  const isSchoolClusterOpen =
    isSchoolZoneHovered || isSchoolClusterNodeKey(effectiveActiveNodeKey);
  const navigationNodes = useMemo<MapNodeNavPoint[]>(() => {
    const buildNavPoint = (nodeKey: MapFocusKey, left: string, top: string) => ({
      nodeKey,
      x: Number.parseFloat(left),
      y: Number.parseFloat(top),
    });

    if (!isSchoolZoneAvailable) {
      return visibleNodes.map((node) =>
        buildNavPoint(node.key, MAP_NODE_DEFINITIONS[node.key].position.left, MAP_NODE_DEFINITIONS[node.key].position.top)
      );
    }

    if (!isSchoolClusterOpen) {
      return [
        ...nonSchoolZoneNodes.map((node) =>
          buildNavPoint(
            node.key,
            MAP_NODE_DEFINITIONS[node.key].position.left,
            MAP_NODE_DEFINITIONS[node.key].position.top
          )
        ),
        buildNavPoint(
          SCHOOL_ZONE_FOCUS_KEY,
          SCHOOL_ZONE_POSITION.left,
          SCHOOL_ZONE_POSITION.top
        ),
      ];
    }

    return [
      ...nonSchoolZoneNodes.map((node) =>
        buildNavPoint(
          node.key,
          MAP_NODE_DEFINITIONS[node.key].position.left,
          MAP_NODE_DEFINITIONS[node.key].position.top
        )
      ),
      ...schoolZoneNodes.map((node) =>
        buildNavPoint(
          node.key,
          MAP_NODE_DEFINITIONS[node.key].position.left,
          MAP_NODE_DEFINITIONS[node.key].position.top
        )
      ),
    ];
  }, [isSchoolClusterOpen, isSchoolZoneAvailable, nonSchoolZoneNodes, schoolZoneNodes, visibleNodes]);

  const activeNode =
    effectiveActiveNodeKey && effectiveActiveNodeKey !== SCHOOL_ZONE_FOCUS_KEY
      ? resolvedNodes.find((node) => node.key === effectiveActiveNodeKey) ?? null
      : null;
  const activeSchoolZoneNode =
    (latestUnlockedSchoolZoneNodeKey
      ? resolvedNodes.find((node) => node.key === latestUnlockedSchoolZoneNodeKey)
      : schoolZoneNodes[0]) ?? null;
  const isSchoolZoneActive =
    isSchoolZoneHovered || effectiveActiveNodeKey === SCHOOL_ZONE_FOCUS_KEY;
  const isSchoolZoneHiddenForCluster =
    isSchoolClusterOpen && effectiveActiveNodeKey !== SCHOOL_ZONE_FOCUS_KEY && !isSchoolZoneHovered;
  const activeStep =
    activeNode?.previewStepIndex !== null && activeNode?.previewStepIndex !== undefined
      ? routeSteps[activeNode.previewStepIndex]
      : null;
  const activePanelTitle =
    effectiveActiveNodeKey === SCHOOL_ZONE_FOCUS_KEY
      ? "School Zone"
      : activeStep?.sceneTitle ?? "Hock Lee Bus Riots";
  const activePanelSubtitle =
    effectiveActiveNodeKey === SCHOOL_ZONE_FOCUS_KEY
      ? "A volatile student network spanning the classroom, school lake, and school gates."
      : activeStep?.sceneSubtitle ?? activeNode?.description ?? undefined;
  const markerSprite =
    CHARACTER_PRESENTATIONS[selectedCharacter].markerSprite;

  const handleActivateNode = useCallback(
    (node: ResolvedMapNode | null) => {
      if (!node || !node.route) return;
      navigateWithLoading(node.route);
    },
    [navigateWithLoading]
  );
  const getSchoolClusterOriginStyle = useCallback(
    (nodeKey: MapNodeKey): CSSProperties => {
      const nodePosition = MAP_NODE_DEFINITIONS[nodeKey].position;
      const originX =
        ((Number.parseFloat(SCHOOL_ZONE_POSITION.left) -
          Number.parseFloat(nodePosition.left)) /
          100) *
        mapNodeLayerSize.width;
      const originY =
        ((Number.parseFloat(SCHOOL_ZONE_POSITION.top) -
          Number.parseFloat(nodePosition.top)) /
          100) *
        mapNodeLayerSize.height;

      return {
        "--hl-school-node-origin-x": `${originX}px`,
        "--hl-school-node-origin-y": `${originY}px`,
        "--hl-school-node-delay": SCHOOL_CLUSTER_NODE_DELAYS[nodeKey] ?? "0ms",
      } as CSSProperties;
    },
    [mapNodeLayerSize.height, mapNodeLayerSize.width]
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!activeNodeKey || navigationNodes.length === 0) {
        const fallbackNodeKey = isSchoolZoneAvailable
          ? SCHOOL_ZONE_FOCUS_KEY
          : visibleNodes[0]?.key ?? null;
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
        if (effectiveActiveNodeKey === SCHOOL_ZONE_FOCUS_KEY) {
          if (latestUnlockedSchoolZoneNodeKey) {
            setActiveNodeKey(latestUnlockedSchoolZoneNodeKey);
          }
          return;
        }
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
    isSchoolZoneAvailable,
    latestUnlockedSchoolZoneNodeKey,
    navigationNodes,
    resetMapProgress,
    visibleNodes,
  ]);

  useEffect(() => {
    isRouteLoadingRef.current = isRouteLoading;
  }, [isRouteLoading]);

  const renderResolvedNode = (
    node: ResolvedMapNode,
    options?: { isSchoolClusterNode?: boolean }
  ) => {
    const nodeDefinition = MAP_NODE_DEFINITIONS[node.key];
    const isActive = activeNode?.key === node.key;
    const isSchoolClusterNode = options?.isSchoolClusterNode ?? false;
    const clusterStyle = isSchoolClusterNode ? getSchoolClusterOriginStyle(node.key) : null;

    return (
      <div
        key={node.key}
        className={`absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center ${isSchoolClusterNode ? "hl-pixel-school-cluster-node" : ""
          } ${isSchoolClusterNode && isSchoolClusterOpen ? "hl-pixel-school-cluster-node--expanded" : ""}`}
        style={{
          left: nodeDefinition.position.left,
          top: nodeDefinition.position.top,
          zIndex: isActive ? 10 : isSchoolClusterNode ? 8 : 6,
          ...(clusterStyle ?? {}),
        }}
        onMouseEnter={() => {
          clearSchoolZoneHoverTimeout();
          setActiveNodeKey(node.key);
          if (!isSchoolClusterNode) {
            setIsSchoolZoneHovered(false);
          }
        }}
        onClick={() => {
          clearSchoolZoneHoverTimeout();
          setActiveNodeKey(node.key);
          setIsSchoolZoneHovered(false);
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
            Visit <span className="text-xs leading-none">↵</span>
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
      className="map-page relative h-screen w-screen overflow-hidden bg-black"
      aria-busy={isRouteLoading}
    >
      <aside className="scene-panel scene-panel-shell">
        <div className="scene-title-stack scene-title-swap">
          <div className="pixel-corners--wrapper">
            <div className="pixel-corners scene-title">{activePanelTitle}</div>
          </div>
          <div className="pixel-corners--wrapper">
            <div className="pixel-corners scene-subtitle">{activePanelSubtitle}</div>
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
                  gridTemplateColumns: STORY_PHASE_TRACK.map((phase) => `${phase.span}fr`).join(" "),
                }}
              >
                {STORY_PHASE_TRACK.map((phase, index) => (
                  <div
                    key={phase.label}
                    className="hl-pixel-timeline-track-segment"
                    style={{
                      backgroundColor: phase.color,
                      borderTopLeftRadius: index === 0 ? "999px" : 0,
                      borderBottomLeftRadius: index === 0 ? "999px" : 0,
                      borderTopRightRadius: index === STORY_PHASE_TRACK.length - 1 ? "999px" : 0,
                      borderBottomRightRadius:
                        index === STORY_PHASE_TRACK.length - 1 ? "999px" : 0,
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
                        <div className="hl-pixel-timeline-date-text">{`Stop ${index + 1}`}</div>
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

      <div ref={mapNodeLayerRef} className="absolute inset-0 z-[8]">
        {isSchoolZoneAvailable ? (
          <div
            className={`absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center hl-pixel-school-zone-node ${isSchoolZoneHiddenForCluster ? "hl-pixel-school-zone-node--content-hidden" : ""
              }`}
            style={{
              left: SCHOOL_ZONE_POSITION.left,
              top: SCHOOL_ZONE_POSITION.top,
              zIndex: isSchoolZoneActive ? 9 : 7,
              pointerEvents: "auto",
            }}
            onMouseEnter={() => {
              if (!isSchoolZoneUnlocked) return;
              clearSchoolZoneHoverTimeout();
              setActiveNodeKey(SCHOOL_ZONE_FOCUS_KEY);
              setIsSchoolZoneHovered(true);
            }}
            onMouseLeave={scheduleSchoolZoneHoverExit}
            onClick={() => {
              if (!isSchoolZoneUnlocked || !latestUnlockedSchoolZoneNodeKey) return;
              clearSchoolZoneHoverTimeout();
              setActiveNodeKey(latestUnlockedSchoolZoneNodeKey);
            }}
          >
            {!isSchoolZoneHovered ? (
              <div
                className={`artifact-label mb-2 text-center text-sm sm:text-base hl-pixel-school-zone-label ${isSchoolZoneActive ? "artifact-label--active pixel-corners" : ""
                  }`}
              >
                School Zone
              </div>
            ) : null}
            <div className="hl-pixel-map-node-shell">
              <div aria-hidden="true" className="hl-pixel-school-zone-hit-area" />
              <div
                aria-hidden="true"
                className={`hl-pixel-school-zone-blob ${isSchoolZoneActive ? "hl-pixel-school-zone-blob--active" : ""
                  } ${isSchoolZoneUnlocked ? "" : "hl-pixel-school-zone-blob--locked"}`}
              />
              {!isSchoolZoneHovered ? (
                <img
                  src="/map-nodes/schoolzone.png"
                  alt="School Zone"
                  className="map-location hl-pixel-map-node hl-pixel-school-zone-image hl-pixel-map-node--schoolzone"
                  style={{
                    filter: !isSchoolZoneUnlocked
                      ? MAP_NODE_LOCKED_FILTER
                      : isSchoolZoneActive
                        ? "drop-shadow(2px 0 0 #ffff00) drop-shadow(-2px 0 0 #ffff00) drop-shadow(0 2px 0 #ffff00) drop-shadow(0 -2px 0 #ffff00) drop-shadow(2px 2px 0 #ffff00) drop-shadow(-2px 2px 0 #ffff00) drop-shadow(2px -2px 0 #ffff00) drop-shadow(-2px -2px 0 #ffff00)"
                        : MAP_NODE_IDLE_FILTER,
                  }}
                  draggable={false}
                />
              ) : null}
            </div>
            {!isSchoolZoneHovered && !isSchoolZoneUnlocked && isSchoolZoneActive ? (
              <div className="artifact-label pixel-corners pop-in mt-2 rounded-full border border-[#5f5f5f] bg-[rgba(45,45,45,0.92)] px-3 py-1.5 text-sm uppercase tracking-[0.2em] text-[#d0d0d0]">
                Locked
              </div>
            ) : !isSchoolZoneHovered &&
              effectiveActiveNodeKey === SCHOOL_ZONE_FOCUS_KEY &&
              activeSchoolZoneNode?.isSelectable ? (
              <div className="artifact-label pixel-corners pop-in mt-2 rounded-full border border-[#c58b19] bg-[rgba(41,24,4,0.92)] px-3 py-1.5 text-sm uppercase tracking-[0.2em] text-[#ffe45e]">
                Open Cluster
              </div>
            ) : null}
          </div>
        ) : null}
        {nonSchoolZoneNodes.map((node) => renderResolvedNode(node))}
        {isSchoolZoneAvailable
          ? schoolZoneNodes.map((node) =>
            renderResolvedNode(node, { isSchoolClusterNode: true })
          )
          : null}
      </div>

      <div className="absolute right-6 top-6 z-10 inventory-rise-in">
        <DispositionRadarPanel />
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
              Track the story through the timeline and select any unlocked stop on the map.
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-xl sm:text-3xl">
              <li>Click an unlocked location or timeline stop to focus it.</li>
              <li>Press Enter or use Visit to enter the active scene.</li>
              <li>Use arrow keys to move between map nodes.</li>
            </ul>
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                className="artifact-button pixel-corners rounded-full border border-[#2a1400] bg-[#ffe7b0] px-5 py-2 text-lg uppercase tracking-[0.16em] text-[#2a1400] sm:text-2xl"
                onClick={() => setIsHelpOpen(false)}
              >
                Ok, got it!
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {isRouteLoading ? (
        <div className="scene-route-loading-overlay" role="status" aria-live="polite">
          <div className="scene-route-loading-panel pixel-corners">
            <div className="scene-route-loading-title">Loading Next Scene</div>
            <div className="scene-route-loading-subtitle">Compiling next page...</div>
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
