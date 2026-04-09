"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { CharacterSpriteSet } from "./character-sprites";
import {
    MAP_LAST_NODE_KEY,
    MAP_UNLOCK_ANIMATION_SCENE_KEY,
    MAP_VISITED_PROGRESS_KEY,
    advanceVisitedProgress,
    getUnlockedNodeKey,
    getUnlockedThroughIndex,
    parseVisitedProgress,
} from "./map-progression";
import type { CharacterCode } from "./scenes";
import { DispositionRadarPanel } from "./disposition-radar-panel";
import { GameMenuOverlay } from "./game-menu-overlay";
import { getStoryStepByRoute } from "./story-data";

type Direction =
    | "north"
    | "south"
    | "east"
    | "west"
    | "north-east"
    | "north-west"
    | "south-east"
    | "south-west";

const STEP = 24;
const CHARACTER_SIZE = 210;
const PROXIMITY_THRESHOLD = 140;
const CLICK_WALK_SPEED = 8;
const MAP_ROUTE_WALK_DURATION_MS = 1000;
const MAP_ROUTE_WALK_DISTANCE =
    (CLICK_WALK_SPEED * MAP_ROUTE_WALK_DURATION_MS) / (1000 / 60);
const WALK_FRAME_COUNT = 8;
const WALK_FRAME_MS = 110;
const SCENE_ANIMATED_ELEMENT_FRAME_MS = 140;
const GRID_SIZE = 28;
const CHARACTER_LABEL_GAP = 10;
const CHARACTER_LABEL_Z_INDEX = 12;
const CHARACTER_SPRITE_Z_INDEX = 11;
const NPC_LABEL_BOTTOM_OFFSET = 12;
const NPC_CHAT_HOTSPOT_SIZE = 100;
const NPC_CHAT_OPEN_DISTANCE = 200;
const NPC_CHAT_AUTOPLAY_MS = 5000;
const NPC_DIALOGUE_REPLY_DELAY_MS = 700;
const NPC_MIN_Z_INDEX = 2;
const NPC_MAX_Z_INDEX = CHARACTER_SPRITE_Z_INDEX - 1;
const ROOTS_COLLECTION_URL = "https://www.roots.gov.sg/Collection-Landing";
const DIALOGUE_BUBBLE_WIDTH = "min(200px, calc(100vw - 48px))";

type Point = { x: number; y: number };

const clamp = (value: number, min: number, max: number) =>
    Math.min(Math.max(value, min), max);

const distance = (a: Point, b: Point) => Math.hypot(a.x - b.x, a.y - b.y);

const extractFirstNumber = (value: string) => {
    const match = value.match(/-?\d+(?:\.\d+)?/);
    return match ? Number(match[0]) : null;
};

const parseCssYValue = (value: string): number | null => {
    const normalized = value.trim().toLowerCase();
    if (normalized.length === 0) return null;

    if (normalized.startsWith("clamp(") && normalized.endsWith(")")) {
        const inner = normalized.slice(6, -1);
        const parts = inner.split(",");
        if (parts.length >= 2) {
            return parseCssYValue(parts[1]) ?? parseCssYValue(parts[0]);
        }
    }

    if (normalized.startsWith("calc(") && normalized.endsWith(")")) {
        return extractFirstNumber(normalized.slice(5, -1));
    }

    return extractFirstNumber(normalized);
};

const resolveNpcDepth = (position: CSSProperties, fallbackDepth: number) => {
    if (typeof position.top === "number") return position.top;
    if (typeof position.top === "string") {
        const parsedTop = parseCssYValue(position.top);
        if (parsedTop !== null) return parsedTop;
    }
    if (typeof position.bottom === "number") return 1000 - position.bottom;
    if (typeof position.bottom === "string") {
        const parsedBottom = parseCssYValue(position.bottom);
        if (parsedBottom !== null) return 1000 - parsedBottom;
    }
    return fallbackDepth;
};

const isPointInPolygon = (point: Point, polygon: Point[]) => {
    if (polygon.length < 3) return false;
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const xi = polygon[i].x;
        const yi = polygon[i].y;
        const xj = polygon[j].x;
        const yj = polygon[j].y;
        const intersect =
            yi > point.y !== yj > point.y &&
            point.x < ((xj - xi) * (point.y - yi)) / (yj - yi + 0.00001) + xi;
        if (intersect) inside = !inside;
    }
    return inside;
};

const buildGridPath = (
    start: Point,
    goal: Point,
    polygon: Point[],
    width: number,
    height: number
) => {
    const cols = Math.max(1, Math.floor(width / GRID_SIZE));
    const rows = Math.max(1, Math.floor(height / GRID_SIZE));
    const toCell = (p: Point) => ({
        c: clamp(Math.floor(p.x / GRID_SIZE), 0, cols - 1),
        r: clamp(Math.floor(p.y / GRID_SIZE), 0, rows - 1),
    });
    const toPoint = (c: number, r: number) => ({
        x: c * GRID_SIZE + GRID_SIZE / 2,
        y: r * GRID_SIZE + GRID_SIZE / 2,
    });

    const startCell = toCell(start);
    const goalCell = toCell(goal);

    const blocked = new Set<string>();
    if (polygon.length >= 3) {
        for (let r = 0; r < rows; r += 1) {
            for (let c = 0; c < cols; c += 1) {
                const p = toPoint(c, r);
                if (isPointInPolygon(p, polygon)) {
                    blocked.add(`${c},${r}`);
                }
            }
        }
    }

    const startKey = `${startCell.c},${startCell.r}`;
    const goalKey = `${goalCell.c},${goalCell.r}`;
    if (blocked.has(startKey) || blocked.has(goalKey)) return null;

    const open: Array<{ c: number; r: number; f: number; g: number }> = [
        { ...startCell, f: 0, g: 0 },
    ];
    const cameFrom = new Map<string, string>();
    const gScore = new Map<string, number>();
    gScore.set(startKey, 0);

    const heuristic = (c: number, r: number) =>
        Math.abs(c - goalCell.c) + Math.abs(r - goalCell.r);

    while (open.length > 0) {
        open.sort((a, b) => a.f - b.f);
        const current = open.shift();
        if (!current) break;
        const currentKey = `${current.c},${current.r}`;
        if (currentKey === goalKey) {
            const path: Point[] = [];
            let key = goalKey;
            while (key !== startKey) {
                const [c, r] = key.split(",").map(Number);
                path.push(toPoint(c, r));
                const prev = cameFrom.get(key);
                if (!prev) break;
                key = prev;
            }
            path.reverse();
            return path;
        }

        const neighbors = [
            { c: current.c + 1, r: current.r },
            { c: current.c - 1, r: current.r },
        ];

        for (const neighbor of neighbors) {
            if (neighbor.c < 0 || neighbor.c >= cols) continue;
            if (neighbor.r < 0 || neighbor.r >= rows) continue;
            const neighborKey = `${neighbor.c},${neighbor.r}`;
            if (blocked.has(neighborKey)) continue;

            const tentativeG = (gScore.get(currentKey) ?? Infinity) + 1;
            if (tentativeG < (gScore.get(neighborKey) ?? Infinity)) {
                cameFrom.set(neighborKey, currentKey);
                gScore.set(neighborKey, tentativeG);
                const f = tentativeG + heuristic(neighbor.c, neighbor.r);
                if (!open.find((node) => node.c === neighbor.c && node.r === neighbor.r)) {
                    open.push({ ...neighbor, f, g: tentativeG });
                }
            }
        }
    }

    return null;
};

type SceneArtifactChat = {
    master1: string;
    user1: string;
    master2: string;
};

type SceneNpcDialogueChoice = {
    id: string;
    label: string;
    playerText?: string;
    npcReply: string;
};

export type SceneArtifact = {
    id: string;
    title: string;
    image: string;
    alt: string;
    description: string;
    inventoryIndex: number;
    position: CSSProperties;
    chat: SceneArtifactChat;
    rootsUrl?: string;
};

export type SceneNpcFigure = {
    id: string;
    image: string;
    imageOnChatOpen?: string;
    alt: string;
    name?: string;
    chatBubbleSpeaker?: string;
    chatBubbleText?: string;
    chatBubbleTexts?: string[];
    dialogueChoices?: SceneNpcDialogueChoice[];
    npcType?: "interactive" | "non-interactive" | "artifact";
    isInteractive?: boolean;
    autoOpenChatOnLoad?: boolean;
    autoChatCycle?: {
        initialDelayMs?: number;
        firstVisibleMs?: number;
        hiddenMs?: number;
        secondVisibleMs?: number;
    };
    flipHorizontallyEachCycle?: boolean;
    artifactWalkToSideBeforeOpen?: "left" | "right";
    artifactId?: string;
    position: CSSProperties;
    className?: string;
    zIndex?: number;
};

export type SceneAnimatedElement = {
    id: string;
    frames: [string, string, ...string[]];
    alt: string;
    position: CSSProperties;
    className?: string;
    zIndex?: number;
    frameOffset?: number;
};

export type SceneIntroGuide = {
    title?: string;
    description: string;
    tips?: string[];
    dismissLabel?: string;
};

const DEFAULT_SCENE_INTRO_GUIDE: SceneIntroGuide = {
    title: "Pro Tip",
    description: "Need a quick refresher before continuing?",
    tips: [
        "Move with Left/Right arrow keys or click on the ground to walk.",
        "Click characters with chat bubbles to talk, and inspect artifacts when prompted.",
        "Use EXIT or MAP when you are ready to continue to the next location.",
    ],
    dismissLabel: "Ok, got it!",
};

export type BaseSceneConfig = {
    sceneTitle: string;
    sceneSubtitle: string;
    sceneBackgroundImage: string;
    artifacts: [SceneArtifact, ...SceneArtifact[]];
    showArtifacts?: boolean;
    npcFigures?: SceneNpcFigure[];
    sceneAnimatedElements?: SceneAnimatedElement[];
    rootClassName?: string;
    characterName?: string;
    characterAlt?: string;
    characterSpriteBasePath?: string;
    characterSprites?: CharacterSpriteSet;
    selectedCharacterCode?: CharacterCode;
    mapRoute?: string;
    mapLabel?: string;
    mapEmoji?: string;
    companionAvatarSrc?: string;
    companionAvatarAlt?: string;
    sceneCharacterZIndex?: number;
    sceneCharacterScaleMultiplier?: number;
    characterScaleMultiplier?: number;
    characterVisualScaleMultiplier?: number;
    characterInitialXRatio?: number;
    characterInitialYRatio?: number;
    characterInitialXOffset?: number;
    characterInitialYOffset?: number;
    introGuide?: SceneIntroGuide;
    npcTransitions?: {
        triggerNpcId: string;
        nextNpcFigures: SceneNpcFigure[];
        runOnce?: boolean;
    }[];
    npcPositionTransitionMs?: number;
};

type BaseSceneShellProps = {
    config: BaseSceneConfig;
};

type NpcAutoAdvanceSession = {
    id: string;
    runId: number;
};

const getNpcChatBubbleLines = (npcFigure: SceneNpcFigure) => {
    if (npcFigure.chatBubbleTexts && npcFigure.chatBubbleTexts.length > 0) {
        return npcFigure.chatBubbleTexts;
    }
    if (npcFigure.chatBubbleText) {
        return [npcFigure.chatBubbleText];
    }
    return [];
};

const getNpcType = (
    npcFigure: SceneNpcFigure,
    hasChatBubble: boolean
): "interactive" | "non-interactive" | "artifact" => {
    if (npcFigure.npcType) return npcFigure.npcType;
    if (npcFigure.isInteractive === false) return "non-interactive";
    if (npcFigure.isInteractive === true) return "interactive";
    return hasChatBubble ? "interactive" : "non-interactive";
};

const getAutoOpenNpcId = (npcFigures: SceneNpcFigure[]) => {
    const autoNpc = npcFigures.find((npcFigure) => {
        if (!npcFigure.autoOpenChatOnLoad) return false;
        const chatBubbleLines = getNpcChatBubbleLines(npcFigure);
        if (chatBubbleLines.length === 0) return false;
        const npcType = getNpcType(npcFigure, true);
        return npcType === "interactive" || npcType === "artifact";
    });
    return autoNpc?.id ?? null;
};

export function BaseSceneShell({ config }: BaseSceneShellProps) {
    const initialNpcFigures = config.npcFigures ?? [];
    const initialAutoOpenNpcId = getAutoOpenNpcId(initialNpcFigures);

    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [viewportHeight, setViewportHeight] = useState(1080);
    const [direction, setDirection] = useState<Direction>("south");
    const [nearArtifactIndex, setNearArtifactIndex] = useState<number | null>(null);
    const [isNearExit, setIsNearExit] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [targetPosition, setTargetPosition] = useState<{
        x: number;
        y: number;
    } | null>(null);
    const [isAutoWalking, setIsAutoWalking] = useState(false);
    const [activeArtifactIndex, setActiveArtifactIndex] = useState(0);
    const [walkMarker, setWalkMarker] = useState<{
        x: number;
        y: number;
        id: number;
    } | null>(null);
    const [walkFrame, setWalkFrame] = useState(0);
    const [sceneAnimationFrame, setSceneAnimationFrame] = useState(0);
    const [editMode, setEditMode] = useState(false);
    const [polygonPoints, setPolygonPoints] = useState<Point[]>([]);
    const [isPolygonClosed, setIsPolygonClosed] = useState(false);
    const [navPath, setNavPath] = useState<Point[]>([]);
    const [inventorySlots, setInventorySlots] = useState<(string | null)[]>(
        Array.from({ length: 6 }, () => null)
    );
    const [drawerFocus, setDrawerFocus] = useState<
        "roots" | "chat" | "close"
    >("roots");
    const [chatInput, setChatInput] = useState("");
    const [activeNpcId, setActiveNpcId] = useState<string | null>(initialAutoOpenNpcId);
    const [sceneNpcFigures, setSceneNpcFigures] = useState<SceneNpcFigure[]>(initialNpcFigures);
    const [isIntroGuideOpen, setIsIntroGuideOpen] = useState(() =>
        Boolean(config.introGuide)
    );
    const [npcChatCycleIndex, setNpcChatCycleIndex] = useState<Record<string, number>>(() =>
        initialAutoOpenNpcId ? { [initialAutoOpenNpcId]: 0 } : {}
    );
    const [npcDialogueSelectionById, setNpcDialogueSelectionById] = useState<
        Record<string, string | null>
    >({});
    const [npcDialogueReplyVisibleById, setNpcDialogueReplyVisibleById] = useState<
        Record<string, boolean>
    >({});
    const [autoNpcChatVisibilityById, setAutoNpcChatVisibilityById] = useState<
        Record<string, boolean>
    >({});
    const [npcAutoAdvanceSession, setNpcAutoAdvanceSession] =
        useState<NpcAutoAdvanceSession | null>(null);
    const [npcHorizontalFlipById, setNpcHorizontalFlipById] = useState<Record<string, boolean>>(
        {}
    );
    const [isRouteLoading, setIsRouteLoading] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const isRouteLoadingRef = useRef(false);
    const pendingNpcInteractionRef = useRef<{
        id: string;
        npcCenterX: number;
        autoPlay?: boolean;
    } | null>(null);
    const pendingArtifactNpcInteractionRef = useRef<{
        id: string;
        artifactId?: string;
        openChatOnArrival: boolean;
    } | null>(null);
    const completedNpcTransitionIdsRef = useRef<Set<string>>(new Set());
    const pendingRouteRef = useRef<string | null>(null);
    const mapRouteTimeoutRef = useRef<number | null>(null);
    const nearArtifactIndexRef = useRef<number | null>(null);
    const isNearExitRef = useRef(false);
    const isDrawerOpenRef = useRef(false);
    const isIntroGuideOpenRef = useRef(Boolean(config.introGuide));
    const isMenuOpenRef = useRef(false);
    const drawerFocusRef = useRef<"roots" | "chat" | "close">("roots");
    const npcDialogueReplyTimeoutByIdRef = useRef<Record<string, number>>({});
    const editModeRef = useRef(false);
    const polygonPointsRef = useRef<Point[]>([]);
    const isPolygonClosedRef = useRef(false);
    const navPathRef = useRef<Point[]>([]);
    const [pressed, setPressed] = useState({
        up: false,
        down: false,
        left: false,
        right: false,
    });
    const characterRef = useRef<HTMLImageElement | null>(null);
    const artifactRefs = useRef<(HTMLImageElement | null)[]>([]);
    const exitRef = useRef<HTMLDivElement | null>(null);
    const router = useRouter();
    const pathname = usePathname();

    const sceneTitle = config.sceneTitle;
    const sceneSubtitle = config.sceneSubtitle;
    const sceneBackgroundImage = config.sceneBackgroundImage;
    const showArtifacts = config.showArtifacts ?? true;
    const sceneArtifacts = config.artifacts;
    const artifacts = showArtifacts ? sceneArtifacts : [];
    const npcFigures = useMemo(() => sceneNpcFigures, [sceneNpcFigures]);
    const npcZIndexById = useMemo(() => {
        if (npcFigures.length === 0) return {};
        const sortedEntries = npcFigures
            .map((npcFigure, index) => ({
                id: npcFigure.id,
                depth: resolveNpcDepth(npcFigure.position, index),
                index,
            }))
            .sort((a, b) => (a.depth === b.depth ? a.index - b.index : a.depth - b.depth));
        const maxRank = Math.max(sortedEntries.length - 1, 1);
        const zIndexById: Record<string, number> = {};
        sortedEntries.forEach((entry, rank) => {
            const normalizedRank = rank / maxRank;
            zIndexById[entry.id] = Math.round(
                NPC_MIN_Z_INDEX +
                normalizedRank * (NPC_MAX_Z_INDEX - NPC_MIN_Z_INDEX)
            );
        });
        npcFigures.forEach((npcFigure) => {
            if (typeof npcFigure.zIndex === "number") {
                zIndexById[npcFigure.id] = npcFigure.zIndex;
            }
        });
        return zIndexById;
    }, [npcFigures]);
    const sceneAnimatedElements = config.sceneAnimatedElements ?? [];
    const rootClassName = config.rootClassName ?? "scene2-storehall-page";
    const characterName = config.characterName ?? "Rajiv";
    const characterAlt = config.characterAlt ?? "Rajiv Menon";
    const characterSpriteBasePath =
        config.characterSpriteBasePath ?? "/character-figures/rajivmenon";
    const characterSprites = config.characterSprites;
    const selectedCharacterCode = config.selectedCharacterCode ?? "BW";
    const mapRoute = config.mapRoute ?? "/hock-lee-bus-riots-pixel/map";
    const mapLabel = config.mapLabel ?? "MAP";
    const mapEmoji = config.mapEmoji ?? "🗺️";
    const companionAvatarSrc =
        config.companionAvatarSrc ?? "/character-profile-pics/merlion.png";
    const companionAvatarAlt = config.companionAvatarAlt ?? "Merlion";
    const sceneCharacterZIndex =
        config.sceneCharacterZIndex ?? CHARACTER_SPRITE_Z_INDEX;
    const sceneCharacterLabelZIndex =
        sceneCharacterZIndex === CHARACTER_SPRITE_Z_INDEX
            ? CHARACTER_LABEL_Z_INDEX
            : sceneCharacterZIndex + 1;
    const sceneCharacterDialogueZIndex = sceneCharacterLabelZIndex + 2;
    const sceneCharacterScaleMultiplier =
        config.sceneCharacterScaleMultiplier ?? 1;
    const characterScaleMultiplier = config.characterScaleMultiplier ?? 1;
    const characterVisualScaleMultiplier =
        config.characterVisualScaleMultiplier ?? 1;
    const characterInitialXRatio = config.characterInitialXRatio ?? 0.55;
    const characterInitialYRatio = config.characterInitialYRatio ?? 0.7;
    const characterInitialXOffset = config.characterInitialXOffset ?? 0;
    const characterInitialYOffset = config.characterInitialYOffset ?? 0;
    const sceneIntroGuide = config.introGuide ?? DEFAULT_SCENE_INTRO_GUIDE;
    const isWalking =
        isAutoWalking || pressed.up || pressed.down || pressed.left || pressed.right;
    const characterScale = useMemo(() => {
        const progress = clamp(
            (position.y + CHARACTER_SIZE) / Math.max(viewportHeight, 1),
            0,
            1
        );
        return 1 + progress;
    }, [position.y, viewportHeight]);
    const characterBaseScale =
        characterScaleMultiplier === 1
            ? 1
            : characterScale * characterScaleMultiplier;
    const renderedCharacterScale =
        characterBaseScale *
        sceneCharacterScaleMultiplier *
        characterVisualScaleMultiplier;
    const characterVisualTop =
        position.y - CHARACTER_SIZE * (renderedCharacterScale - 1);
    const characterLabelTop = characterVisualTop - CHARACTER_LABEL_GAP;
    const spriteSrc = useMemo(() => {
        const cardinalDirection =
            direction === "north" || direction === "north-east" || direction === "north-west"
                ? "north"
                : direction === "south" ||
                    direction === "south-east" ||
                    direction === "south-west"
                    ? "south"
                    : direction === "east"
                        ? "east"
                        : "west";

        if (characterSprites) {
            const walkingFrames = characterSprites.walking?.[cardinalDirection];
            if (isWalking && walkingFrames && walkingFrames.length > 0) {
                return walkingFrames[walkFrame % walkingFrames.length];
            }
            return characterSprites.idle[cardinalDirection];
        }

        if (!isWalking) {
            return `${characterSpriteBasePath}/${cardinalDirection}.png`;
        }

        const folder =
            cardinalDirection === "north"
                ? "North"
                : cardinalDirection === "south"
                    ? "South"
                    : cardinalDirection === "east"
                        ? "East"
                        : "West";
        const file = `Rajiv-walking-8-frames_${folder.toLowerCase()}-${walkFrame + 1} (dragged).webp`;
        return `${characterSpriteBasePath}/walking/${folder}/${encodeURIComponent(
            file
        )}`;
    }, [characterSpriteBasePath, characterSprites, direction, isWalking, walkFrame]);
    const activeDialogueNpc = useMemo(() => {
        if (!activeNpcId) return null;
        const npcFigure = npcFigures.find((candidate) => candidate.id === activeNpcId);
        if (!npcFigure || !npcFigure.dialogueChoices || npcFigure.dialogueChoices.length === 0) {
            return null;
        }
        return npcFigure;
    }, [activeNpcId, npcFigures]);
    const activeDialogueChoices = activeDialogueNpc?.dialogueChoices ?? [];
    const activeDialogueSelectedChoiceId = activeDialogueNpc
        ? npcDialogueSelectionById[activeDialogueNpc.id] ?? null
        : null;
    const activeDialogueSelectedChoice = activeDialogueSelectedChoiceId
        ? activeDialogueChoices.find((choice) => choice.id === activeDialogueSelectedChoiceId) ??
        null
        : null;
    const runNpcTransition = useCallback((npcId: string) => {
        const matchingTransition = config.npcTransitions?.find(
            (transition) => transition.triggerNpcId === npcId
        );
        if (!matchingTransition) return false;
        if (
            matchingTransition.runOnce !== false &&
            completedNpcTransitionIdsRef.current.has(npcId)
        ) {
            return false;
        }
        completedNpcTransitionIdsRef.current.add(npcId);
        setSceneNpcFigures(matchingTransition.nextNpcFigures);
        return true;
    }, [config.npcTransitions]);
    const activeArtifact = sceneArtifacts[activeArtifactIndex] ?? sceneArtifacts[0];
    const openArtifactRootsPage = useCallback((artifact: SceneArtifact | undefined) => {
        if (typeof window === "undefined") return;
        window.open(
            artifact?.rootsUrl ?? ROOTS_COLLECTION_URL,
            "_blank",
            "noopener,noreferrer"
        );
    }, []);
    const startNpcAutoAdvance = useCallback((npcId: string) => {
        setNpcAutoAdvanceSession({
            id: npcId,
            runId: Date.now() + Math.floor(Math.random() * 1000),
        });
    }, []);
    const stopNpcAutoAdvance = useCallback((npcId?: string | null) => {
        setNpcAutoAdvanceSession((prev) => {
            if (!prev) return null;
            if (npcId && prev.id !== npcId) return prev;
            return null;
        });
    }, []);
    const clearNpcDialogueReplyTimeout = useCallback((npcId: string) => {
        const timeoutId = npcDialogueReplyTimeoutByIdRef.current[npcId];
        if (timeoutId === undefined) return;
        window.clearTimeout(timeoutId);
        delete npcDialogueReplyTimeoutByIdRef.current[npcId];
    }, []);
    const scheduleNpcDialogueReplyReveal = useCallback((npcId: string) => {
        clearNpcDialogueReplyTimeout(npcId);
        npcDialogueReplyTimeoutByIdRef.current[npcId] = window.setTimeout(() => {
            setNpcDialogueReplyVisibleById((prev) => ({
                ...prev,
                [npcId]: true,
            }));
            delete npcDialogueReplyTimeoutByIdRef.current[npcId];
        }, NPC_DIALOGUE_REPLY_DELAY_MS);
    }, [clearNpcDialogueReplyTimeout]);
    const openNpcChat = useCallback(
        (npcId: string, shouldAutoPlay: boolean) => {
            clearNpcDialogueReplyTimeout(npcId);
            setNpcChatCycleIndex((prev) => ({
                ...prev,
                [npcId]: 0,
            }));
            setNpcDialogueSelectionById((prev) => ({
                ...prev,
                [npcId]: null,
            }));
            setNpcDialogueReplyVisibleById((prev) => ({
                ...prev,
                [npcId]: false,
            }));
            setActiveNpcId(npcId);
            if (shouldAutoPlay) {
                startNpcAutoAdvance(npcId);
                return;
            }
            stopNpcAutoAdvance();
        },
        [clearNpcDialogueReplyTimeout, startNpcAutoAdvance, stopNpcAutoAdvance]
    );
    const finishNpcChat = useCallback(
        (npcId: string) => {
            clearNpcDialogueReplyTimeout(npcId);
            stopNpcAutoAdvance(npcId);
            runNpcTransition(npcId);
            setNpcDialogueReplyVisibleById((prev) => ({
                ...prev,
                [npcId]: false,
            }));
            setActiveNpcId((currentActiveNpcId) =>
                currentActiveNpcId === npcId ? null : currentActiveNpcId
            );
        },
        [clearNpcDialogueReplyTimeout, runNpcTransition, stopNpcAutoAdvance]
    );
    const advanceNpcChat = useCallback(
        (npcId: string, activeIndex: number, lineCount: number) => {
            stopNpcAutoAdvance(npcId);
            if (activeIndex >= lineCount - 1) {
                finishNpcChat(npcId);
                return;
            }
            setNpcChatCycleIndex((prev) => ({
                ...prev,
                [npcId]: activeIndex + 1,
            }));
        },
        [finishNpcChat, stopNpcAutoAdvance]
    );
    const openArtifactDrawerById = useCallback(
        (artifactId: string | undefined) => {
            if (!artifactId) return;
            const artifactIndex = sceneArtifacts.findIndex(
                (artifact) => artifact.id === artifactId
            );
            if (artifactIndex < 0) return;
            pendingRouteRef.current = null;
            pendingNpcInteractionRef.current = null;
            pendingArtifactNpcInteractionRef.current = null;
            setActiveArtifactIndex(artifactIndex);
            setDrawerFocus("roots");
            setIsDrawerOpen(true);
        },
        [sceneArtifacts]
    );
    const navigateWithLoading = useCallback(
        (route: string) => {
            if (isRouteLoadingRef.current) return;
            isRouteLoadingRef.current = true;
            setIsRouteLoading(true);
            router.push(route);
        },
        [router]
    );
    const handleMenuNavigation = useCallback(
        (route: string) => {
            setIsMenuOpen(false);
            setIsIntroGuideOpen(false);
            navigateWithLoading(route);
        },
        [navigateWithLoading]
    );

    const toBasePoint = (pos: { x: number; y: number }) => ({
        x: pos.x + CHARACTER_SIZE / 2,
        y: pos.y + CHARACTER_SIZE,
    });
    const toTopLeft = (base: Point) => ({
        x: base.x - CHARACTER_SIZE / 2,
        y: base.y - CHARACTER_SIZE,
    });
    const walkToMapAndNavigate = () => {
        if (isRouteLoadingRef.current) return;
        if (isIntroGuideOpenRef.current) return;
        if (typeof window === "undefined") return;
        if (mapRouteTimeoutRef.current !== null) {
            window.clearTimeout(mapRouteTimeoutRef.current);
            mapRouteTimeoutRef.current = null;
        }

        pendingNpcInteractionRef.current = null;
        pendingArtifactNpcInteractionRef.current = null;
        pendingRouteRef.current = null;
        setActiveNpcId(null);
        setPressed({ up: false, down: false, left: false, right: false });
        setDirection("east");
        setNavPath([]);
        setIsAutoWalking(true);
        setTargetPosition({
            x: position.x + MAP_ROUTE_WALK_DISTANCE,
            y: position.y,
        });
        setWalkMarker({
            x: position.x + CHARACTER_SIZE / 2 + MAP_ROUTE_WALK_DISTANCE,
            y: position.y + CHARACTER_SIZE,
            id: Date.now(),
        });

        mapRouteTimeoutRef.current = window.setTimeout(() => {
            mapRouteTimeoutRef.current = null;
            navigateWithLoading(mapRoute);
        }, MAP_ROUTE_WALK_DURATION_MS);
    };

    useEffect(() => {
        return () => {
            Object.values(npcDialogueReplyTimeoutByIdRef.current).forEach((timeoutId) => {
                window.clearTimeout(timeoutId);
            });
            npcDialogueReplyTimeoutByIdRef.current = {};
            if (mapRouteTimeoutRef.current === null) return;
            window.clearTimeout(mapRouteTimeoutRef.current);
            mapRouteTimeoutRef.current = null;
        };
    }, []);

    useEffect(() => {
        nearArtifactIndexRef.current = nearArtifactIndex;
    }, [nearArtifactIndex]);

    useEffect(() => {
        if (typeof window === "undefined") return;
        const stored = window.localStorage.getItem("inventorySlots");
        if (!stored) return;
        try {
            const parsed = JSON.parse(stored) as (string | null)[];
            if (Array.isArray(parsed)) {
                setInventorySlots(parsed);
            }
        } catch {
            // ignore invalid storage
        }
    }, []);

    useEffect(() => {
        if (typeof window === "undefined") return;
        const currentStep = getStoryStepByRoute(selectedCharacterCode, pathname);
        const mapNodeKey = currentStep?.nodeKey ?? null;
        if (mapNodeKey) {
            window.localStorage.setItem(MAP_LAST_NODE_KEY, mapNodeKey);
        }
        const currentProgress = parseVisitedProgress(
            window.localStorage.getItem(MAP_VISITED_PROGRESS_KEY),
            selectedCharacterCode
        );
        const nextProgress = advanceVisitedProgress(
            currentProgress,
            pathname,
            selectedCharacterCode
        );
        if (nextProgress === currentProgress) return;
        const previousUnlockedThrough = getUnlockedThroughIndex(
            currentProgress,
            selectedCharacterCode
        );
        const nextUnlockedThrough = getUnlockedThroughIndex(
            nextProgress,
            selectedCharacterCode
        );
        window.localStorage.setItem(MAP_VISITED_PROGRESS_KEY, String(nextProgress));
        if (nextUnlockedThrough > previousUnlockedThrough) {
            const nextUnlockedNode = getUnlockedNodeKey(
                nextProgress,
                selectedCharacterCode
            );
            if (nextUnlockedNode) {
                window.localStorage.setItem(
                    MAP_UNLOCK_ANIMATION_SCENE_KEY,
                    nextUnlockedNode
                );
            }
        }
    }, [pathname, selectedCharacterCode]);

    useEffect(() => {
        isNearExitRef.current = isNearExit;
    }, [isNearExit]);

    useEffect(() => {
        isRouteLoadingRef.current = isRouteLoading;
    }, [isRouteLoading]);

    useEffect(() => {
        const nextX = window.innerWidth * characterInitialXRatio + characterInitialXOffset;
        const nextY = window.innerHeight * characterInitialYRatio + characterInitialYOffset;
        const maxX = Math.max(0, window.innerWidth - CHARACTER_SIZE);
        const maxY = Math.max(0, window.innerHeight - CHARACTER_SIZE);
        setPosition({
            x: Math.min(Math.max(0, nextX), maxX),
            y: Math.min(Math.max(0, nextY), maxY),
        });
        setViewportHeight(window.innerHeight);
    }, [
        characterInitialXRatio,
        characterInitialYRatio,
        characterInitialXOffset,
        characterInitialYOffset,
    ]);

    useEffect(() => {
        const nextNpcFigures = config.npcFigures ?? [];
        const nextAutoOpenNpcId = getAutoOpenNpcId(nextNpcFigures);
        completedNpcTransitionIdsRef.current = new Set();
        stopNpcAutoAdvance();
        setSceneNpcFigures(nextNpcFigures);
        setActiveNpcId(nextAutoOpenNpcId);
        setNpcChatCycleIndex(nextAutoOpenNpcId ? { [nextAutoOpenNpcId]: 0 } : {});
        setNpcDialogueSelectionById({});
        setNpcDialogueReplyVisibleById({});
    }, [config.npcFigures, stopNpcAutoAdvance]);

    useEffect(() => {
        const handleResize = () => setViewportHeight(window.innerHeight);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        isDrawerOpenRef.current = isDrawerOpen;
    }, [isDrawerOpen]);

    useEffect(() => {
        isIntroGuideOpenRef.current = isIntroGuideOpen;
    }, [isIntroGuideOpen]);

    useEffect(() => {
        isMenuOpenRef.current = isMenuOpen;
    }, [isMenuOpen]);

    useEffect(() => {
        drawerFocusRef.current = drawerFocus;
    }, [drawerFocus]);

    useEffect(() => {
        if (typeof window === "undefined") return;
        const cycleNpcs = npcFigures.filter((npcFigure) => {
            const chatBubbleLines = getNpcChatBubbleLines(npcFigure);
            return chatBubbleLines.length > 0 && npcFigure.autoChatCycle;
        });
        if (cycleNpcs.length === 0) return;

        const timeoutIds: number[] = [];
        let cancelled = false;

        const queueTimeout = (callback: () => void, delayMs: number) => {
            const timeoutId = window.setTimeout(() => {
                if (cancelled) return;
                callback();
            }, Math.max(0, delayMs));
            timeoutIds.push(timeoutId);
        };

        cycleNpcs.forEach((npcFigure) => {
            const cycle = npcFigure.autoChatCycle;
            if (!cycle) return;

            const initialDelayMs = cycle.initialDelayMs ?? 0;
            const firstVisibleMs = cycle.firstVisibleMs ?? 0;
            const hiddenMs = cycle.hiddenMs ?? 0;
            const secondVisibleMs = cycle.secondVisibleMs ?? 0;

            const runCycle = () => {
                setAutoNpcChatVisibilityById((prev) => ({
                    ...prev,
                    [npcFigure.id]: true,
                }));
                queueTimeout(() => {
                    setAutoNpcChatVisibilityById((prev) => ({
                        ...prev,
                        [npcFigure.id]: false,
                    }));
                    queueTimeout(() => {
                        setAutoNpcChatVisibilityById((prev) => ({
                            ...prev,
                            [npcFigure.id]: true,
                        }));
                        queueTimeout(() => {
                            setAutoNpcChatVisibilityById((prev) => ({
                                ...prev,
                                [npcFigure.id]: false,
                            }));
                            if (npcFigure.flipHorizontallyEachCycle) {
                                setNpcHorizontalFlipById((prev) => ({
                                    ...prev,
                                    [npcFigure.id]: !prev[npcFigure.id],
                                }));
                            }
                            queueTimeout(runCycle, initialDelayMs);
                        }, secondVisibleMs);
                    }, hiddenMs);
                }, firstVisibleMs);
            };

            queueTimeout(runCycle, initialDelayMs);
        });

        return () => {
            cancelled = true;
            timeoutIds.forEach((timeoutId) => window.clearTimeout(timeoutId));
        };
    }, [npcFigures]);

    useEffect(() => {
        editModeRef.current = editMode;
    }, [editMode]);

    useEffect(() => {
        polygonPointsRef.current = polygonPoints;
    }, [polygonPoints]);

    useEffect(() => {
        isPolygonClosedRef.current = isPolygonClosed;
    }, [isPolygonClosed]);

    useEffect(() => {
        navPathRef.current = navPath;
    }, [navPath]);

    useEffect(() => {
        if (typeof window === "undefined") return;
        window.localStorage.setItem("inventorySlots", JSON.stringify(inventorySlots));
    }, [inventorySlots]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (
                event.key !== "ArrowUp" &&
                event.key !== "ArrowDown" &&
                event.key !== "ArrowLeft" &&
                event.key !== "ArrowRight" &&
                event.key !== "Enter" &&
                event.key.toLowerCase() !== "e"
            ) {
                return;
            }

            event.preventDefault();

            if (isIntroGuideOpenRef.current) {
                return;
            }

            if (isMenuOpenRef.current) {
                return;
            }

            if (isRouteLoadingRef.current || isDrawerOpenRef.current) {
                return;
            }

            if (editModeRef.current && event.key.toLowerCase() !== "e") {
                return;
            }

            if (event.key.toLowerCase() === "e") {
                setEditMode((prev) => !prev);
                setPressed({ up: false, down: false, left: false, right: false });
                setIsAutoWalking(false);
                setTargetPosition(null);
                setNavPath([]);
                pendingNpcInteractionRef.current = null;
                pendingArtifactNpcInteractionRef.current = null;
                pendingRouteRef.current = null;
                return;
            }

            if (event.key === "Enter") {
                if (isNearExitRef.current) {
                    pendingArtifactNpcInteractionRef.current = null;
                    pendingRouteRef.current = null;
                    navigateWithLoading(mapRoute);
                    return;
                }
                if (showArtifacts && nearArtifactIndexRef.current !== null) {
                    setActiveArtifactIndex(nearArtifactIndexRef.current);
                    setDrawerFocus("roots");
                    setIsDrawerOpen(true);
                }
                return;
            }

            if (event.key === "ArrowUp" || event.key === "ArrowDown") {
                return;
            }

            if (targetPosition) {
                setTargetPosition(null);
                setIsAutoWalking(false);
                setNavPath([]);
                pendingNpcInteractionRef.current = null;
                pendingArtifactNpcInteractionRef.current = null;
                pendingRouteRef.current = null;
            }
            if (navPathRef.current.length > 0) {
                setNavPath([]);
                pendingNpcInteractionRef.current = null;
                pendingArtifactNpcInteractionRef.current = null;
                pendingRouteRef.current = null;
            }

            setPressed((prev) => {
                const next = { ...prev };
                if (event.key === "ArrowLeft") {
                    next.left = true;
                    next.right = false;
                    next.up = false;
                    next.down = false;
                }
                if (event.key === "ArrowRight") {
                    next.right = true;
                    next.left = false;
                    next.up = false;
                    next.down = false;
                }
                return next;
            });

            setPosition((prev) => {
                let nextX = prev.x;

                if (event.key === "ArrowLeft") nextX -= STEP;
                if (event.key === "ArrowRight") nextX += STEP;

                const maxX = Math.max(0, window.innerWidth - CHARACTER_SIZE);
                const clamped = {
                    x: Math.min(Math.max(0, nextX), maxX),
                    y: prev.y,
                };
                const nextBase = {
                    x: clamped.x + CHARACTER_SIZE / 2,
                    y: clamped.y + CHARACTER_SIZE,
                };

                if (
                    isPolygonClosedRef.current &&
                    isPointInPolygon(nextBase, polygonPointsRef.current)
                ) {
                    return prev;
                }

                return clamped;
            });
        };

        const handleKeyUp = (event: KeyboardEvent) => {
            if (
                event.key !== "ArrowUp" &&
                event.key !== "ArrowDown" &&
                event.key !== "ArrowLeft" &&
                event.key !== "ArrowRight"
            ) {
                return;
            }

            event.preventDefault();

            setPressed((prev) => {
                const next = { ...prev };
                if (event.key === "ArrowLeft") next.left = false;
                if (event.key === "ArrowRight") next.right = false;
                return next;
            });
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, [mapRoute, navigateWithLoading, showArtifacts, targetPosition]);

    useEffect(() => {
        if (!isMenuOpen) return;

        const handleMenuKeys = (event: KeyboardEvent) => {
            if (event.key !== "Escape") return;
            event.preventDefault();
            setIsMenuOpen(false);
        };

        window.addEventListener("keydown", handleMenuKeys);
        return () => window.removeEventListener("keydown", handleMenuKeys);
    }, [isMenuOpen]);

    useEffect(() => {
        if (!isDrawerOpen || !activeArtifact) return;

        const handleDrawerKeys = (event: KeyboardEvent) => {
            if (
                event.key !== "ArrowRight" &&
                event.key !== "ArrowLeft" &&
                event.key !== "ArrowUp" &&
                event.key !== "ArrowDown" &&
                event.key !== "Escape" &&
                event.key !== "Enter"
            ) {
                return;
            }

            event.preventDefault();

            if (event.key === "Enter") {
                if (drawerFocusRef.current === "close") {
                    setIsDrawerOpen(false);
                    return;
                }
                if (drawerFocusRef.current === "roots") {
                    openArtifactRootsPage(activeArtifact);
                }
                return;
            }

            if (event.key === "Escape") {
                setIsDrawerOpen(false);
                return;
            }

            if (event.key === "ArrowUp") {
                setDrawerFocus((prev) => (prev === "close" ? "roots" : "chat"));
                return;
            }

            if (event.key === "ArrowDown") {
                setDrawerFocus((prev) =>
                    prev === "chat" ? "roots" : "close"
                );
                return;
            }

            if (event.key === "ArrowRight") {
                setDrawerFocus((prev) => {
                    if (prev === "chat") return prev;
                    return prev === "roots" ? "close" : "roots";
                });
            }

            if (event.key === "ArrowLeft") {
                setDrawerFocus((prev) => {
                    if (prev === "chat") return prev;
                    return prev === "close" ? "roots" : "close";
                });
            }
        };

        window.addEventListener("keydown", handleDrawerKeys);
        return () => window.removeEventListener("keydown", handleDrawerKeys);
    }, [activeArtifact, isDrawerOpen, openArtifactRootsPage]);

    useEffect(() => {
        if (isAutoWalking) return;

        const { left, right } = pressed;

        if (!left && !right) {
            setDirection("south");
            return;
        }

        if (left) setDirection("west");
        else if (right) setDirection("east");
    }, [pressed, isAutoWalking]);

    useEffect(() => {
        if (!isWalking) {
            setWalkFrame(0);
            return;
        }

        const interval = window.setInterval(() => {
            setWalkFrame((prev) => (prev + 1) % WALK_FRAME_COUNT);
        }, WALK_FRAME_MS);

        return () => window.clearInterval(interval);
    }, [isWalking]);

    useEffect(() => {
        if (sceneAnimatedElements.length === 0) return;

        const interval = window.setInterval(() => {
            setSceneAnimationFrame((prev) => prev + 1);
        }, SCENE_ANIMATED_ELEMENT_FRAME_MS);

        return () => window.clearInterval(interval);
    }, [sceneAnimatedElements.length]);

    useEffect(() => {
        if (activeNpcId !== null) return;
        stopNpcAutoAdvance();
    }, [activeNpcId, stopNpcAutoAdvance]);

    useEffect(() => {
        if (!npcAutoAdvanceSession || activeNpcId !== npcAutoAdvanceSession.id) {
            return;
        }

        const activeNpc = npcFigures.find(
            (npcFigure) => npcFigure.id === npcAutoAdvanceSession.id
        );
        if (!activeNpc) {
            stopNpcAutoAdvance();
            return;
        }

        const chatBubbleLines = getNpcChatBubbleLines(activeNpc);
        const npcType = getNpcType(activeNpc, chatBubbleLines.length > 0);
        if (npcType === "artifact" || chatBubbleLines.length <= 1) {
            stopNpcAutoAdvance(activeNpc.id);
            return;
        }

        const activeIndex =
            (npcChatCycleIndex[activeNpc.id] ?? 0) % chatBubbleLines.length;
        const timeoutId = window.setTimeout(() => {
            if (activeIndex >= chatBubbleLines.length - 1) {
                finishNpcChat(activeNpc.id);
                return;
            }

            setNpcChatCycleIndex((prev) => ({
                ...prev,
                [activeNpc.id]: activeIndex + 1,
            }));
        }, NPC_CHAT_AUTOPLAY_MS);

        return () => window.clearTimeout(timeoutId);
    }, [
        activeNpcId,
        finishNpcChat,
        npcAutoAdvanceSession,
        npcChatCycleIndex,
        npcFigures,
        stopNpcAutoAdvance,
    ]);

    useEffect(() => {
        if (!targetPosition) return;

        let animationFrame = 0;

        const step = () => {
            setPosition((prev) => {
                const dx = targetPosition.x - prev.x;
                const dy = targetPosition.y - prev.y;
                const distance = Math.hypot(dx, dy);

                if (distance <= CLICK_WALK_SPEED) {
                    const remaining = navPathRef.current.slice(1);
                    setNavPath(remaining);
                    if (remaining.length > 0) {
                        setTargetPosition(toTopLeft(remaining[0]));
                        return { x: targetPosition.x, y: targetPosition.y };
                    }
                    setIsAutoWalking(false);
                    setTargetPosition(null);
                    if (pendingRouteRef.current) {
                        const pendingRoute = pendingRouteRef.current;
                        pendingRouteRef.current = null;
                        navigateWithLoading(pendingRoute);
                        return { x: targetPosition.x, y: targetPosition.y };
                    }
                    if (pendingArtifactNpcInteractionRef.current) {
                        const pendingArtifactNpc = pendingArtifactNpcInteractionRef.current;
                        pendingArtifactNpcInteractionRef.current = null;
                        if (pendingArtifactNpc.openChatOnArrival) {
                            openNpcChat(pendingArtifactNpc.id, false);
                        }
                        openArtifactDrawerById(pendingArtifactNpc.artifactId);
                        return { x: targetPosition.x, y: targetPosition.y };
                    }
                    if (pendingNpcInteractionRef.current) {
                        const pendingNpc = pendingNpcInteractionRef.current;
                        // If this walk was initiated by an NPC interaction, open the bubble on arrival.
                        openNpcChat(pendingNpc.id, Boolean(pendingNpc.autoPlay));
                        pendingNpcInteractionRef.current = null;
                    }
                    return { x: targetPosition.x, y: targetPosition.y };
                }

                let nextX = prev.x;
                let nextY = prev.y;

                const nx = dx / distance;
                const ny = dy / distance;
                nextX = prev.x + nx * CLICK_WALK_SPEED;
                nextY = prev.y + ny * CLICK_WALK_SPEED;

                return { x: nextX, y: nextY };
            });

            animationFrame = window.requestAnimationFrame(step);
        };

        setIsAutoWalking(true);
        animationFrame = window.requestAnimationFrame(step);

        return () => window.cancelAnimationFrame(animationFrame);
    }, [
        navigateWithLoading,
        openNpcChat,
        openArtifactDrawerById,
        targetPosition,
    ]);

    useEffect(() => {
        if (!isAutoWalking || !targetPosition) return;

        const dx = targetPosition.x - position.x;
        const threshold = 1;

        if (Math.abs(dx) <= threshold) {
            return;
        }

        setDirection(dx > 0 ? "east" : "west");
    }, [isAutoWalking, targetPosition, position]);

    useEffect(() => {
        const character = characterRef.current;
        const exitZone = exitRef.current;
        if (!character) return;

        const characterRect = character.getBoundingClientRect();
        const exitRect = exitZone?.getBoundingClientRect();

        const characterCenter = {
            x: characterRect.left + characterRect.width / 2,
            y: characterRect.top + characterRect.height / 2,
        };
        let closestIndex: number | null = null;
        let closestDistance = Number.POSITIVE_INFINITY;

        artifactRefs.current.forEach((artifact, index) => {
            if (!artifact) return;
            const artifactRect = artifact.getBoundingClientRect();
            const artifactCenter = {
                x: artifactRect.left + artifactRect.width / 2,
                y: artifactRect.top + artifactRect.height / 2,
            };
            const dx = characterCenter.x - artifactCenter.x;
            const dy = characterCenter.y - artifactCenter.y;
            const distance = Math.hypot(dx, dy);
            if (distance < closestDistance) {
                closestDistance = distance;
                closestIndex = index;
            }
        });

        setNearArtifactIndex(
            closestIndex !== null && closestDistance <= PROXIMITY_THRESHOLD
                ? closestIndex
                : null
        );

        if (exitRect) {
            const exitCenter = {
                x: exitRect.left + exitRect.width / 2,
                y: exitRect.top + exitRect.height / 2,
            };
            const exitDx = characterCenter.x - exitCenter.x;
            const exitDy = characterCenter.y - exitCenter.y;
            const exitDistance = Math.hypot(exitDx, exitDy);
            setIsNearExit(exitDistance <= PROXIMITY_THRESHOLD);
        }
    }, [position]);

    return (
        <div
            className={`${rootClassName} relative min-h-screen overflow-hidden`}
            aria-busy={isRouteLoading}
            onClick={(event) => {
                if (isIntroGuideOpenRef.current) return;
                if (isRouteLoadingRef.current) return;
                if (isDrawerOpenRef.current) return;
                if (!(event.target instanceof HTMLElement)) return;
                if (event.target.closest("[data-ui='true']")) return;
                if (activeNpcId !== null) {
                    clearNpcDialogueReplyTimeout(activeNpcId);
                    setActiveNpcId(null);
                    setNpcDialogueSelectionById((prev) => ({
                        ...prev,
                        [activeNpcId]: null,
                    }));
                    setNpcDialogueReplyVisibleById((prev) => ({
                        ...prev,
                        [activeNpcId]: false,
                    }));
                }
                if (pendingNpcInteractionRef.current !== null) {
                    pendingNpcInteractionRef.current = null;
                }
                if (pendingArtifactNpcInteractionRef.current !== null) {
                    pendingArtifactNpcInteractionRef.current = null;
                }
                if (pendingRouteRef.current !== null) {
                    pendingRouteRef.current = null;
                }

                const clickX = event.clientX;
                const clickY = event.clientY;
                const maxBaseX = window.innerWidth - CHARACTER_SIZE / 2;
                const maxBaseY = window.innerHeight;
                const targetBaseForEdit: Point = {
                    x: clamp(clickX, CHARACTER_SIZE / 2, maxBaseX),
                    y: clamp(clickY, CHARACTER_SIZE, maxBaseY),
                };

                if (editModeRef.current) {
                    if (isPolygonClosedRef.current) {
                        setPolygonPoints([targetBaseForEdit]);
                        setIsPolygonClosed(false);
                        return;
                    }

                    if (
                        polygonPointsRef.current.length >= 3 &&
                        distance(targetBaseForEdit, polygonPointsRef.current[0]) < 18
                    ) {
                        setIsPolygonClosed(true);
                        return;
                    }

                    setPolygonPoints((prev) => [...prev, targetBaseForEdit]);
                    return;
                }

                const startBase = toBasePoint(position);
                const targetBase: Point = {
                    x: targetBaseForEdit.x,
                    y: startBase.y,
                };
                if (isPolygonClosedRef.current) {
                    if (isPointInPolygon(targetBase, polygonPointsRef.current)) {
                        return;
                    }
                }

                const path = buildGridPath(
                    startBase,
                    targetBase,
                    isPolygonClosedRef.current ? polygonPointsRef.current : [],
                    window.innerWidth,
                    window.innerHeight
                );

                if (!path || path.length === 0) return;

                const firstTarget = toTopLeft(path[0]);
                const firstDx = firstTarget.x - position.x;
                if (Math.abs(firstDx) > 1) {
                    setDirection(firstDx > 0 ? "east" : "west");
                }

                setPressed({ up: false, down: false, left: false, right: false });
                setIsAutoWalking(true);
                setNavPath(path);
                setTargetPosition(firstTarget);
                setWalkMarker({ x: clickX, y: clickY, id: Date.now() });
            }}
            style={{
                backgroundColor: "#000000",
                backgroundImage: sceneBackgroundImage,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            <aside className="scene-panel scene-panel-shell" data-ui="true">
                <div className="scene-title-stack">
                    <div className="pixel-corners--wrapper">
                        <div className="pixel-corners scene-title">{sceneTitle}</div>
                    </div>
                    <div className="pixel-corners--wrapper">
                        <div className="pixel-corners scene-subtitle">{sceneSubtitle}</div>
                    </div>
                </div>
                <div className="mt-2" data-ui="true">
                    <img
                        src={companionAvatarSrc}
                        alt={companionAvatarAlt}
                        className="select-none"
                        style={{
                            width: "64px",
                            height: "64px",
                            objectFit: "cover",
                        }}
                        draggable={false}
                    />
                </div>
            </aside>
            {sceneAnimatedElements.map((sceneElement) => {
                const frameIndex =
                    (sceneAnimationFrame + (sceneElement.frameOffset ?? 0)) %
                    sceneElement.frames.length;
                return (
                    <img
                        key={sceneElement.id}
                        src={sceneElement.frames[frameIndex]}
                        alt={sceneElement.alt}
                        className={`absolute select-none ${sceneElement.className ?? ""}`}
                        style={{
                            ...sceneElement.position,
                            imageRendering: "pixelated",
                            pointerEvents: "none",
                            zIndex: sceneElement.zIndex ?? 2,
                        }}
                        draggable={false}
                    />
                );
            })}
            <div
                className="absolute character-drop-in"
                style={{
                    left: `${position.x}px`,
                    top: `${characterLabelTop}px`,
                    width: `${CHARACTER_SIZE}px`,
                    pointerEvents: "none",
                    zIndex: sceneCharacterLabelZIndex,
                    animationDelay: "750ms",
                }}
            >
                <div
                    className="moving-char-label text-center text-2xl sm:text-3xl"
                    style={{
                        transform: "translateY(-100%)",
                        whiteSpace: "pre-line",
                    }}
                >
                    {characterName}
                </div>
            </div>
            <div
                className="absolute character-drop-in"
                style={{
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                    width: `${CHARACTER_SIZE}px`,
                    height: `${CHARACTER_SIZE}px`,
                    zIndex: sceneCharacterZIndex,
                    animationDelay: "750ms",
                    pointerEvents: "none",
                }}
            >
                <img
                    src={spriteSrc}
                    alt={characterAlt}
                    className="absolute inset-0 select-none"
                    ref={characterRef}
                    style={{
                        width: "100%",
                        height: "100%",
                        imageRendering: "pixelated",
                        transform: `scale(${renderedCharacterScale})`,
                        transformOrigin: "bottom center",
                        filter:
                            "drop-shadow(1px 0 0 #ff7700) drop-shadow(-1px 0 0 #ff7700) drop-shadow(0 1px 0 #ff7700) drop-shadow(0 -1px 0 #ff7700) drop-shadow(1px 1px 0 #ff7700) drop-shadow(-1px 1px 0 #ff7700) drop-shadow(1px -1px 0 #ff7700) drop-shadow(-1px -1px 0 #ff7700)",
                    }}
                    draggable={false}
                />
            </div>
            {activeDialogueNpc ? (
                <div
                    className="npc-chat-bubble-shell"
                    data-ui="true"
                    onClick={(event) => event.stopPropagation()}
                    style={{
                        left: `${position.x + CHARACTER_SIZE / 2}px`,
                        top: `${characterVisualTop - 16}px`,
                        bottom: "auto",
                        transform: "translate(-50%, -100%)",
                        width: DIALOGUE_BUBBLE_WIDTH,
                        zIndex: sceneCharacterDialogueZIndex,
                        pointerEvents: "auto",
                    }}
                >
                    <div
                        className="npc-chat-bubble pixel-corners"
                        style={{ width: "100%" }}
                    >
                        <span className="npc-chat-speaker">{characterName}</span>
                        {activeDialogueSelectedChoice ? (
                            <span className="npc-chat-text">
                                {activeDialogueSelectedChoice.playerText ??
                                    activeDialogueSelectedChoice.label}
                            </span>
                        ) : (
                            <div className="flex flex-col gap-2">
                                {activeDialogueChoices.map((choice) => (
                                    <button
                                        key={choice.id}
                                        type="button"
                                        className="rounded-xl border border-[#3b2f28] bg-[#1b1615] px-3 py-2 text-left text-sm leading-snug text-[#f6eada] transition-colors"
                                        data-ui="true"
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            setNpcDialogueSelectionById((prev) => ({
                                                ...prev,
                                                [activeDialogueNpc.id]: choice.id,
                                            }));
                                            setNpcDialogueReplyVisibleById((prev) => ({
                                                ...prev,
                                                [activeDialogueNpc.id]: false,
                                            }));
                                            scheduleNpcDialogueReplyReveal(activeDialogueNpc.id);
                                        }}
                                    >
                                        {choice.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            ) : null}
            {walkMarker ? (
                <div
                    key={walkMarker.id}
                    className="walk-marker"
                    style={{
                        left: `${walkMarker.x}px`,
                        top: `${walkMarker.y}px`,
                    }}
                />
            ) : null}
            {editMode && polygonPoints.length > 0 ? (
                <svg
                    className="pointer-events-none absolute inset-0 z-20"
                    width="100%"
                    height="100%"
                >
                    {isPolygonClosed ? (
                        <polygon
                            points={polygonPoints.map((p) => `${p.x},${p.y}`).join(" ")}
                            fill="rgba(255, 77, 77, 0.18)"
                            stroke="rgba(255, 77, 77, 0.85)"
                            strokeWidth="2"
                        />
                    ) : (
                        <polyline
                            points={polygonPoints.map((p) => `${p.x},${p.y}`).join(" ")}
                            fill="none"
                            stroke="rgba(255, 77, 77, 0.85)"
                            strokeWidth="2"
                        />
                    )}
                    {polygonPoints.map((point, index) => (
                        <circle
                            key={`poly-point-${index}`}
                            cx={point.x}
                            cy={point.y}
                            r={6}
                            fill={index === 0 && !isPolygonClosed ? "#ffe36e" : "#ff4d4d"}
                            stroke="#0f0f0f"
                            strokeWidth="2"
                        />
                    ))}
                </svg>
            ) : null}
            {editMode ? (
                <div
                    className="absolute left-1/2 top-5 z-30 -translate-x-1/2 rounded-full border border-[#ffe36e] bg-[#0f0f0f] px-4 py-2 text-xs uppercase tracking-[0.3em] text-[#ffe36e]"
                    data-ui="true"
                >
                    Edit mode: click to add points, click first point to close
                </div>
            ) : null}
            <div
                ref={exitRef}
                className="absolute right-6 top-1/2 -translate-y-1/2 exit-slide-in"
                style={{
                    height: "50%",
                    display: "flex",
                    alignItems: "center",
                }}
                data-ui="true"
            >
                <div
                    style={{
                        padding: "12px 16px",
                        fontFamily: "\"PPNeueBit Bold\", \"PPNeueBit\", Arial, sans-serif",
                        fontSize: "2.5rem",
                        color: isNearExit ? "#30346d" : "#ffffff",
                        background: "transparent",
                        filter: isNearExit
                            ? "drop-shadow(1px 0 0 #ffff00) drop-shadow(-1px 0 0 #ffff00) drop-shadow(0 1px 0 #ffff00) drop-shadow(0 -1px 0 #ffff00) drop-shadow(1px 1px 0 #ffff00) drop-shadow(-1px 1px 0 #ffff00) drop-shadow(1px -1px 0 #ffff00) drop-shadow(-1px -1px 0 #ffff00) drop-shadow(0 -2px 6px rgba(255, 255, 0, 0.7)) drop-shadow(0 -6px 12px rgba(255, 255, 0, 0.35))"
                            : "none",
                    }}
                >
                    EXIT →
                </div>
            </div>
            {npcFigures.map((npcFigure) => {
                const chatBubbleLines = getNpcChatBubbleLines(npcFigure);
                const hasChatBubble = chatBubbleLines.length > 0;
                const dialogueChoices = npcFigure.dialogueChoices ?? [];
                const hasDialogueChoices = dialogueChoices.length > 0;
                const npcType = getNpcType(npcFigure, hasChatBubble);
                const isArtifactNpc = npcType === "artifact";
                const isInteractiveNpc = npcType === "interactive" || isArtifactNpc;
                const isCyclingDialogue = !hasDialogueChoices && chatBubbleLines.length > 1;
                const activeChatIndex =
                    hasChatBubble
                        ? (npcChatCycleIndex[npcFigure.id] ?? 0) % chatBubbleLines.length
                        : 0;
                const activeChatBubbleText = hasChatBubble
                    ? chatBubbleLines[activeChatIndex]
                    : "";
                const selectedDialogueChoiceId =
                    npcDialogueSelectionById[npcFigure.id] ?? null;
                const selectedDialogueChoice = selectedDialogueChoiceId
                    ? dialogueChoices.find((choice) => choice.id === selectedDialogueChoiceId) ??
                    null
                    : null;
                const displayedChatBubbleText =
                    hasDialogueChoices &&
                        selectedDialogueChoice &&
                        (npcDialogueReplyVisibleById[npcFigure.id] ?? false)
                        ? selectedDialogueChoice.npcReply
                        : activeChatBubbleText;
                const isAutoChatOpen = autoNpcChatVisibilityById[npcFigure.id] ?? false;
                const isChatOpen =
                    (activeNpcId === npcFigure.id || isAutoChatOpen) &&
                    hasChatBubble &&
                    isInteractiveNpc;
                const npcImage =
                    isChatOpen && npcFigure.imageOnChatOpen
                        ? npcFigure.imageOnChatOpen
                        : npcFigure.image;
                const npcScaleTransform =
                    sceneCharacterScaleMultiplier === 1
                        ? ""
                        : `scale(${sceneCharacterScaleMultiplier})`;
                const positionTransform =
                    typeof npcFigure.position.transform === "string"
                        ? npcFigure.position.transform
                        : "";
                const npcTransform = [positionTransform, npcScaleTransform]
                    .filter((transformPart) => transformPart.length > 0)
                    .join(" ");
                const npcChatBubbleScale = 1 / sceneCharacterScaleMultiplier;
                const npcZIndex = npcZIndexById[npcFigure.id] ?? NPC_MIN_Z_INDEX;
                const npcBaseStyle: CSSProperties = {
                    ...npcFigure.position,
                    zIndex: npcZIndex,
                    transition:
                        config.npcPositionTransitionMs && config.npcPositionTransitionMs > 0
                            ? `left ${config.npcPositionTransitionMs}ms ease, right ${config.npcPositionTransitionMs}ms ease, top ${config.npcPositionTransitionMs}ms ease, bottom ${config.npcPositionTransitionMs}ms ease, transform ${config.npcPositionTransitionMs}ms ease`
                            : undefined,
                    ...(npcTransform
                        ? {
                            transform: npcTransform,
                            transformOrigin:
                                npcFigure.position.transformOrigin ?? "center bottom",
                        }
                        : {}),
                };
                const npcStyle: CSSProperties = isInteractiveNpc
                    ? {
                        ...npcBaseStyle,
                        // Limit hover/click hit-testing to the explicit chat hotspot.
                        pointerEvents: "none",
                    }
                    : npcBaseStyle;
                const npcInteractionName = (
                    npcFigure.name ??
                    npcFigure.chatBubbleSpeaker ??
                    "NPC"
                ).replace("\n", " ");
                const npcInteractionLabel = isArtifactNpc
                    ? `Inspect artifact held by ${npcInteractionName}`
                    : `Talk to ${npcInteractionName}`;
                return (
                    <div
                        key={npcFigure.id}
                        className={`absolute npc-figure ${isInteractiveNpc ? "npc-figure--chat" : "npc-figure--non-interactive"} ${isChatOpen ? "npc-figure--chat-open" : ""} ${npcFigure.className ?? ""}`}
                        style={npcStyle}
                    >
                        {isChatOpen ? (
                            <div
                                className="npc-chat-bubble-shell"
                                data-ui="true"
                                style={
                                    sceneCharacterScaleMultiplier === 1
                                        ? hasDialogueChoices
                                            ? { width: DIALOGUE_BUBBLE_WIDTH }
                                            : undefined
                                        : {
                                            transform: `translateX(-50%) scale(${npcChatBubbleScale})`,
                                            transformOrigin: "bottom center",
                                            width: hasDialogueChoices
                                                ? DIALOGUE_BUBBLE_WIDTH
                                                : undefined,
                                        }
                                }
                            >
                                <div
                                    className="npc-chat-bubble pixel-corners"
                                    style={
                                        hasDialogueChoices
                                            ? {
                                                width: DIALOGUE_BUBBLE_WIDTH,
                                            }
                                            : undefined
                                    }
                                >
                                    {npcFigure.chatBubbleSpeaker ? (
                                        <span className="npc-chat-speaker">
                                            {npcFigure.chatBubbleSpeaker}
                                        </span>
                                    ) : null}
                                    <span className="npc-chat-text">
                                        {displayedChatBubbleText}
                                    </span>
                                </div>
                            </div>
                        ) : null}
                        {npcFigure.name ? (
                            <div
                                className="moving-char-label absolute z-10 text-center text-2xl sm:text-3xl"
                                style={{
                                    left: 0,
                                    bottom: `calc(100% - ${NPC_LABEL_BOTTOM_OFFSET}px)`,
                                    width: "100%",
                                    transform: "none",
                                    pointerEvents: "none",
                                    whiteSpace: "pre-line",
                                }}
                            >
                                {npcFigure.name}
                            </div>
                        ) : null}
                        <img
                            src={npcImage}
                            alt={npcFigure.alt}
                            className="block select-none npc-sprite"
                            style={{
                                width: "100%",
                                height: "auto",
                                imageRendering: "pixelated",
                                animationDelay: "1200ms",
                                transform: npcHorizontalFlipById[npcFigure.id]
                                    ? "scaleX(-1)"
                                    : undefined,
                                transformOrigin: "center bottom",
                                pointerEvents: isInteractiveNpc ? "none" : "auto",
                            }}
                            draggable={false}
                        />
                        {isInteractiveNpc ? (
                            <button
                                type="button"
                                className="artifact-trigger npc-chat-trigger absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                                style={{
                                    width: `${NPC_CHAT_HOTSPOT_SIZE}px`,
                                    height: `${NPC_CHAT_HOTSPOT_SIZE}px`,
                                    pointerEvents: "auto",
                                    zIndex: 15,
                                }}
                                onClick={(event) => {
                                    event.stopPropagation();
                                    pendingRouteRef.current = null;
                                    if (isArtifactNpc) {
                                        pendingNpcInteractionRef.current = null;
                                        const openArtifactNow = () => {
                                            pendingArtifactNpcInteractionRef.current = null;
                                            setPressed({
                                                up: false,
                                                down: false,
                                                left: false,
                                                right: false,
                                            });
                                            setIsAutoWalking(false);
                                            setTargetPosition(null);
                                            setNavPath([]);
                                            if (hasChatBubble) {
                                                setNpcChatCycleIndex((prev) => ({
                                                    ...prev,
                                                    [npcFigure.id]: 0,
                                                }));
                                                setActiveNpcId(npcFigure.id);
                                            }
                                            openArtifactDrawerById(npcFigure.artifactId);
                                        };

                                        const walkToSideBeforeOpen =
                                            npcFigure.artifactWalkToSideBeforeOpen;
                                        if (!walkToSideBeforeOpen) {
                                            openArtifactNow();
                                            return;
                                        }

                                        const npcElement = event.currentTarget.closest(".npc-figure");
                                        if (!(npcElement instanceof HTMLElement)) {
                                            openArtifactNow();
                                            return;
                                        }

                                        const npcRect = npcElement.getBoundingClientRect();
                                        const npcCenterX = npcRect.left + npcRect.width / 2;
                                        const minCharacterCenterX = CHARACTER_SIZE / 2;
                                        const maxCharacterCenterX =
                                            window.innerWidth - CHARACTER_SIZE / 2;
                                        const currentCharacterCenterX =
                                            position.x + CHARACTER_SIZE / 2;
                                        const sideOffset =
                                            walkToSideBeforeOpen === "left"
                                                ? -NPC_CHAT_OPEN_DISTANCE
                                                : NPC_CHAT_OPEN_DISTANCE;
                                        const targetCenterX = clamp(
                                            npcCenterX + sideOffset,
                                            minCharacterCenterX,
                                            maxCharacterCenterX
                                        );

                                        if (
                                            Math.abs(currentCharacterCenterX - targetCenterX) <=
                                            CLICK_WALK_SPEED
                                        ) {
                                            openArtifactNow();
                                            return;
                                        }

                                        const startBase = toBasePoint(position);
                                        const targetBase: Point = {
                                            x: targetCenterX,
                                            y: startBase.y,
                                        };

                                        if (
                                            isPolygonClosedRef.current &&
                                            isPointInPolygon(targetBase, polygonPointsRef.current)
                                        ) {
                                            openArtifactNow();
                                            return;
                                        }

                                        const path = buildGridPath(
                                            startBase,
                                            targetBase,
                                            isPolygonClosedRef.current
                                                ? polygonPointsRef.current
                                                : [],
                                            window.innerWidth,
                                            window.innerHeight
                                        );

                                        if (!path || path.length === 0) {
                                            openArtifactNow();
                                            return;
                                        }

                                        setActiveNpcId(null);
                                        pendingArtifactNpcInteractionRef.current = {
                                            id: npcFigure.id,
                                            artifactId: npcFigure.artifactId,
                                            openChatOnArrival: hasChatBubble,
                                        };
                                        setPressed({
                                            up: false,
                                            down: false,
                                            left: false,
                                            right: false,
                                        });
                                        setNavPath(path);
                                        setTargetPosition(toTopLeft(path[0]));
                                        setWalkMarker({
                                            x: npcCenterX,
                                            y: npcRect.top + npcRect.height / 2,
                                            id: Date.now(),
                                        });
                                        return;
                                    }
                                    pendingArtifactNpcInteractionRef.current = null;
                                    const isSameNpcOpen =
                                        activeNpcId === npcFigure.id &&
                                        pendingNpcInteractionRef.current === null &&
                                        !isAutoWalking &&
                                        targetPosition === null;
                                    const shouldAutoPlayNpc =
                                        !isArtifactNpc &&
                                        !hasDialogueChoices &&
                                        chatBubbleLines.length > 1;
                                    if (isSameNpcOpen) {
                                        if (hasDialogueChoices) {
                                            if (selectedDialogueChoice) {
                                                clearNpcDialogueReplyTimeout(npcFigure.id);
                                                setNpcDialogueSelectionById((prev) => ({
                                                    ...prev,
                                                    [npcFigure.id]: null,
                                                }));
                                                setNpcDialogueReplyVisibleById((prev) => ({
                                                    ...prev,
                                                    [npcFigure.id]: false,
                                                }));
                                                return;
                                            }
                                            finishNpcChat(npcFigure.id);
                                            return;
                                        }
                                        if (isCyclingDialogue) {
                                            advanceNpcChat(
                                                npcFigure.id,
                                                activeChatIndex,
                                                chatBubbleLines.length
                                            );
                                            return;
                                        }
                                        finishNpcChat(npcFigure.id);
                                        return;
                                    }

                                    const npcElement = event.currentTarget.closest(".npc-figure");
                                    if (!(npcElement instanceof HTMLElement)) {
                                        pendingNpcInteractionRef.current = null;
                                        openNpcChat(npcFigure.id, shouldAutoPlayNpc);
                                        return;
                                    }

                                    const npcRect = npcElement.getBoundingClientRect();
                                    const npcCenterX = npcRect.left + npcRect.width / 2;
                                    const minCharacterCenterX = CHARACTER_SIZE / 2;
                                    const maxCharacterCenterX =
                                        window.innerWidth - CHARACTER_SIZE / 2;
                                    const currentCharacterCenterX =
                                        position.x + CHARACTER_SIZE / 2;
                                    if (
                                        Math.abs(currentCharacterCenterX - npcCenterX) <=
                                        NPC_CHAT_OPEN_DISTANCE
                                    ) {
                                        pendingNpcInteractionRef.current = null;
                                        openNpcChat(npcFigure.id, shouldAutoPlayNpc);
                                        return;
                                    }

                                    setActiveNpcId(null);
                                    pendingNpcInteractionRef.current = {
                                        id: npcFigure.id,
                                        npcCenterX,
                                        autoPlay: shouldAutoPlayNpc,
                                    };

                                    const leftTargetCenterX = npcCenterX - NPC_CHAT_OPEN_DISTANCE;
                                    const rightTargetCenterX = npcCenterX + NPC_CHAT_OPEN_DISTANCE;
                                    const leftCandidate = clamp(
                                        leftTargetCenterX,
                                        minCharacterCenterX,
                                        maxCharacterCenterX
                                    );
                                    const rightCandidate = clamp(
                                        rightTargetCenterX,
                                        minCharacterCenterX,
                                        maxCharacterCenterX
                                    );
                                    const canStandLeft =
                                        leftTargetCenterX >= minCharacterCenterX;
                                    const canStandRight =
                                        rightTargetCenterX <= maxCharacterCenterX;

                                    let targetCenterX = leftCandidate;
                                    if (canStandLeft && canStandRight) {
                                        targetCenterX =
                                            Math.abs(currentCharacterCenterX - leftCandidate) <=
                                                Math.abs(currentCharacterCenterX - rightCandidate)
                                                ? leftCandidate
                                                : rightCandidate;
                                    } else if (!canStandLeft && canStandRight) {
                                        targetCenterX = rightCandidate;
                                    } else if (!canStandLeft && !canStandRight) {
                                        targetCenterX =
                                            Math.abs(currentCharacterCenterX - leftCandidate) <=
                                                Math.abs(currentCharacterCenterX - rightCandidate)
                                                ? leftCandidate
                                                : rightCandidate;
                                    }

                                    const startBase = toBasePoint(position);
                                    const targetBase: Point = {
                                        x: targetCenterX,
                                        y: startBase.y,
                                    };

                                    if (
                                        isPolygonClosedRef.current &&
                                        isPointInPolygon(targetBase, polygonPointsRef.current)
                                    ) {
                                        pendingNpcInteractionRef.current = null;
                                        return;
                                    }

                                    const path = buildGridPath(
                                        startBase,
                                        targetBase,
                                        isPolygonClosedRef.current ? polygonPointsRef.current : [],
                                        window.innerWidth,
                                        window.innerHeight
                                    );

                                    if (!path) {
                                        pendingNpcInteractionRef.current = null;
                                        return;
                                    }
                                    if (path.length === 0) {
                                        const arrivalCenterX = targetBase.x;
                                        if (
                                            Math.abs(arrivalCenterX - npcCenterX) <=
                                            NPC_CHAT_OPEN_DISTANCE
                                        ) {
                                            openNpcChat(npcFigure.id, shouldAutoPlayNpc);
                                        }
                                        pendingNpcInteractionRef.current = null;
                                        return;
                                    }

                                    setPressed({ up: false, down: false, left: false, right: false });
                                    setNavPath(path);
                                    setTargetPosition(toTopLeft(path[0]));
                                    setWalkMarker({
                                        x: npcRect.left + npcRect.width / 2,
                                        y: npcRect.top + npcRect.height / 2,
                                        id: Date.now(),
                                    });
                                }}
                                aria-label={npcInteractionLabel}
                                data-ui="true"
                            />
                        ) : null}
                    </div>
                );
            })}
            {artifacts.map((artifact, index) => {
                const isNear = nearArtifactIndex === index;
                return (
                    <div
                        key={artifact.id}
                        className="absolute"
                        style={artifact.position}
                    >
                        {isNear ? (
                            <div className="artifact-label mb-2 text-center text-xl sm:text-2xl">
                                {artifact.title}
                            </div>
                        ) : null}
                        <img
                            src={artifact.image}
                            alt={artifact.alt}
                            className="block artifact-pop-in"
                            ref={(element) => {
                                artifactRefs.current[index] = element;
                            }}
                            style={{
                                width: "100%",
                                height: "auto",
                                filter: isNear
                                    ? "drop-shadow(1px 0 0 #ffff00) drop-shadow(-1px 0 0 #ffff00) drop-shadow(0 1px 0 #ffff00) drop-shadow(0 -1px 0 #ffff00) drop-shadow(1px 1px 0 #ffff00) drop-shadow(-1px 1px 0 #ffff00) drop-shadow(1px -1px 0 #ffff00) drop-shadow(-1px -1px 0 #ffff00) drop-shadow(0 -2px 6px rgba(255, 255, 0, 0.7)) drop-shadow(0 -6px 12px rgba(255, 255, 0, 0.35))"
                                    : "drop-shadow(1px 0 0 #30346d) drop-shadow(-1px 0 0 #30346d) drop-shadow(0 1px 0 #30346d) drop-shadow(0 -1px 0 #30346d) drop-shadow(1px 1px 0 #30346d) drop-shadow(-1px 1px 0 #30346d) drop-shadow(1px -1px 0 #30346d) drop-shadow(-1px -1px 0 #30346d)",
                                transition: "filter 120ms ease",
                                animationDelay: "1500ms",
                            }}
                            draggable={false}
                        />
                        {isNear ? (
                            <button
                                type="button"
                                className="artifact-label artifact-button pixel-corners mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-[#bfae82] bg-[#ffff00] px-4 py-2 uppercase tracking-[0.2em]"
                                aria-disabled="true"
                                style={{ color: "#1a1513" }}
                            >
                                Investigate <span className="text-base leading-none">↵</span>
                            </button>
                        ) : null}
                    </div>
                );
            })}
            {isDrawerOpen && activeArtifact ? (
                <div
                    className="ai-chat-drawer-overlay"
                    role="dialog"
                    aria-modal="true"
                    data-ui="true"
                >
                    <div className="artifact-drawer-shell relative z-10">
                        <div className="artifact-drawer-panel pixel-corners">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <div className="artifact-label">
                                        {activeArtifact.title}
                                    </div>
                                    <div className="mt-2 text-sm uppercase tracking-[0.3em] text-[#b5a79e]">
                                        Artifact
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5 grid gap-5 md:grid-cols-[0.8fr_1.2fr]">
                                <div className="pixel-corners rounded-2xl border border-[#3b2f28] bg-[#140c1c] p-4">
                                    <img
                                        src={activeArtifact.image}
                                        alt={activeArtifact.alt}
                                        className="h-auto w-full rounded-xl"
                                    />
                                    <p className="mt-3 text-[#e8dcc9]">
                                        {activeArtifact.description}
                                    </p>
                                </div>
                                <div className="flex flex-col gap-5">
                                    <div className="pixel-corners rounded-2xl border border-[#3b2f28] bg-[#140c1c] p-4 text-[1rem] leading-normal">
                                        <div className="mt-4 space-y-3">
                                            <div className="mr-auto w-[80%] rounded-xl border border-[#3b2f28] bg-[#d27d2c] p-3 text-[#1a1513]">
                                                <div className="uppercase tracking-[0.25em] text-white">
                                                    Artifact Master
                                                </div>
                                                <div className="mt-2">
                                                    {activeArtifact.chat.master1}
                                                </div>
                                            </div>
                                            <div className="ml-auto w-[80%] rounded-xl border border-[#3b2f28] bg-[#ffffff] p-3 text-[#1a1513]">
                                                <div className="uppercase tracking-[0.25em] text-[#b5a79e]">
                                                    You
                                                </div>
                                                <div className="mt-2">
                                                    {activeArtifact.chat.user1}
                                                </div>
                                            </div>
                                            <div className="mr-auto w-[80%] rounded-xl border border-[#3b2f28] bg-[#d27d2c] p-3 text-[#1a1513]">
                                                <div className="uppercase tracking-[0.25em] text-white">
                                                    Artifact Master
                                                </div>
                                                <div className="mt-2">
                                                    {activeArtifact.chat.master2}
                                                </div>
                                            </div>
                                        </div>
                                        <input
                                            type="text"
                                            value={chatInput}
                                            onChange={(event) => setChatInput(event.target.value)}
                                            placeholder="Type a reply…"
                                            className="mt-4 w-full rounded-xl border border-[#3b2f28] bg-[#1b1615] px-3 py-2 text-[#f6eada] placeholder:text-[#b5a79e]"
                                            style={{
                                                outline:
                                                    drawerFocus === "chat"
                                                        ? "2px solid #ffff00"
                                                        : "none",
                                                outlineOffset: "2px",
                                            }}
                                        />
                                    </div>
                                    <div className="pixel-corners rounded-2xl border border-[#3b2f28] bg-[#140c1c] p-4 text-[1rem] leading-normal">
                                        <div className="mt-4">
                                            <button
                                                type="button"
                                                className="artifact-label artifact-button pixel-corners w-full rounded-full border border-[#bfae82] px-4 py-2 uppercase tracking-[0.2em]"
                                                style={{
                                                    background:
                                                        drawerFocus === "roots" ? "#ffff00" : "#1a1513",
                                                    color: drawerFocus === "roots" ? "#1a1513" : undefined,
                                                }}
                                                onClick={() => openArtifactRootsPage(activeArtifact)}
                                            >
                                                See on roots.sg
                                            </button>
                                        </div>
                                        <div className="mt-4 flex justify-end">
                                            <button
                                                type="button"
                                                className="artifact-label artifact-button pixel-corners rounded-full border border-[#3b2f28] px-4 py-2"
                                                onClick={() => setIsDrawerOpen(false)}
                                                aria-label="Close drawer"
                                                style={{
                                                    background:
                                                        drawerFocus === "close" ? "#d94141" : "transparent",
                                                    color: drawerFocus === "close" ? "#1a1513" : undefined,
                                                    borderColor: drawerFocus === "close" ? "#d94141" : "#3b2f28",
                                                }}
                                            >
                                                x
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
            <div
                className="absolute right-6 top-6 z-10 inventory-rise-in"
                data-ui="true"
            >
                <DispositionRadarPanel />
            </div>
            <div
                className="absolute bottom-10 left-10 z-10 flex gap-3 hud-rise-in"
                data-ui="true"
            >
                <div className="ui-button-shell pixel-corners--wrapper">
                    <button
                        type="button"
                        className="ui-button pixel-corners"
                        aria-label="Menu"
                        onClick={() => {
                            if (isRouteLoadingRef.current) return;
                            setIsIntroGuideOpen(false);
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
                            if (!sceneIntroGuide) return;
                            if (isRouteLoadingRef.current) return;
                            setIsMenuOpen(false);
                            setIsIntroGuideOpen(true);
                        }}
                    >
                        <span className="ui-button-icon">?</span>
                    </button>
                </div>
            </div>
            <div
                className="absolute bottom-10 right-10 z-10 flex flex-col items-center gap-2 hud-rise-in"
                data-ui="true"
            >
                <div className="artifact-label text-center text-xl sm:text-2xl">{mapLabel}</div>
                <div className="ui-button-shell pixel-corners--wrapper">
                    <button
                        type="button"
                        className="ui-button pixel-corners"
                        aria-label="Map"
                        onClick={walkToMapAndNavigate}
                    >
                        <span className="ui-button-icon">{mapEmoji}</span>
                    </button>
                </div>
            </div>
            <GameMenuOverlay
                isOpen={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
                onNavigate={handleMenuNavigation}
            />
            {isIntroGuideOpen && sceneIntroGuide ? (
                <div
                    className="absolute inset-0 flex items-center justify-center bg-black/75 p-6"
                    style={{ zIndex: 120 }}
                    data-ui="true"
                >
                    <div
                        className="scene-intro-guide-panel pixel-corners w-full max-w-2xl border border-[#9d4a1d] bg-[#ed7c42] p-6 text-[#2a1400]"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="scene-intro-guide-title"
                    >
                        <div
                            id="scene-intro-guide-title"
                            className="artifact-label text-4xl sm:text-6xl"
                        >
                            {sceneIntroGuide.title ?? "Pro Tip"}
                        </div>
                        <p className="mt-3 text-2xl leading-relaxed sm:text-3xl">
                            {sceneIntroGuide.description}
                        </p>
                        {sceneIntroGuide.tips && sceneIntroGuide.tips.length > 0 ? (
                            <ul className="mt-4 list-disc space-y-2 pl-5 text-xl sm:text-3xl">
                                {sceneIntroGuide.tips.map((tip, index) => (
                                    <li key={`scene-intro-guide-tip-${index}`}>{tip}</li>
                                ))}
                            </ul>
                        ) : null}
                        <div className="mt-6 flex justify-end">
                            <button
                                type="button"
                                className="scene-intro-guide-dismiss-button artifact-label artifact-button pixel-corners rounded-full border border-[#6c4600] bg-[#ffd24a] px-5 py-2 uppercase tracking-[0.2em] text-[#000000]"
                                onClick={() => setIsIntroGuideOpen(false)}
                                autoFocus
                            >
                                {sceneIntroGuide.dismissLabel ?? "Ok, got it!"}
                            </button>
                        </div>
                    </div>
                </div>
            ) : null}
            {isRouteLoading ? (
                <div
                    className="scene-route-loading-overlay"
                    role="status"
                    aria-live="polite"
                    data-ui="true"
                >
                    <div className="scene-route-loading-panel pixel-corners">
                        <div className="scene-route-loading-title">Loading Next Scene</div>
                        <div className="scene-route-loading-subtitle">
                            Compiling next page...
                        </div>
                        <div className="scene-route-loading-dots" aria-hidden="true">
                            <span className="scene-route-loading-dot" />
                            <span className="scene-route-loading-dot" />
                            <span className="scene-route-loading-dot" />
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
}
