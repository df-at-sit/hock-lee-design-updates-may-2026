"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { CharacterSpriteSet } from "./character-sprites";
import type { SceneBackgroundReference } from "./scene-title-with-camera";
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
import {
    buildArtifactInteractionKey,
    buildNpcInteractionKey,
    registerDispositionInteraction,
} from "./disposition-state";
import { GameMenuOverlay } from "./game-menu-overlay";
import { SceneCameraButton, SceneTitleWithCamera } from "./scene-title-with-camera";
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
const PLAYER_CHARACTER_LABEL_VERTICAL_OFFSET = 6;
const PLAYER_CHARACTER_VISUAL_SCALE_BUMP = 1.05;
const CHARACTER_LABEL_Z_INDEX = 12;
const CHARACTER_SPRITE_Z_INDEX = 11;
const NPC_LABEL_BOTTOM_OFFSET = 12;
const NPC_CHAT_HOTSPOT_SIZE = 100;
const NPC_CHAT_OPEN_DISTANCE = 200;
const NPC_CHAT_AUTOPLAY_MS = 5000;
const NPC_MIN_Z_INDEX = 2;
const NPC_MAX_Z_INDEX = CHARACTER_SPRITE_Z_INDEX - 1;
const ROOTS_COLLECTION_URL = "https://www.roots.gov.sg/Collection-Landing";
const DIALOGUE_BUBBLE_WIDTH = "var(--hl-dialogue-bubble-width)";
const CHARACTER_ENTRY_CHAT_DEFAULT_DELAY_MS = 2100;
const CHARACTER_ENTRY_CHAT_DEFAULT_DURATION_MS = 3200;
const ONBOARDING_COMPLETION_NOTICE_DURATION_MS = 6000;
const DEFAULT_CHARACTER_INITIAL_Y_RATIO = 0.66;
const LEGACY_CHARACTER_INITIAL_Y_RATIO = 0.55;
const MIN_DERIVED_CHARACTER_INITIAL_Y_RATIO = DEFAULT_CHARACTER_INITIAL_Y_RATIO;
const MAX_DERIVED_CHARACTER_INITIAL_Y_RATIO = 0.74;
const SCENE_TITLE_PHASE_PREFIX = /^(?:Pre-Riot|Riot|Post-Riot):\s*/;

type Point = { x: number; y: number };

const getArtifactSourceLabel = (artifact: SceneArtifact | undefined) => {
    const sourceUrl = artifact?.rootsUrl;
    if (!sourceUrl) return "Open on roots.sg";

    try {
        const hostname = new URL(sourceUrl).hostname.toLowerCase();

        if (hostname.includes("roots.gov.sg")) {
            return "Open on roots.sg";
        }

        if (hostname.includes("nas.gov.sg")) {
            return "Open on National Archives";
        }

        return `Open on ${hostname.replace(/^www\./, "")}`;
    } catch {
        return "Open Source Record";
    }
};

const clamp = (value: number, min: number, max: number) =>
    Math.min(Math.max(value, min), max);

const distance = (a: Point, b: Point) => Math.hypot(a.x - b.x, a.y - b.y);

const disposeAudioElement = (audio: HTMLAudioElement | null) => {
    if (!audio) return;
    audio.pause();
    audio.src = "";
};

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

const stripSceneTitlePhasePrefix = (title: string) =>
    title.replace(SCENE_TITLE_PHASE_PREFIX, "");

const parseCssViewportRatio = (value: string): number | null => {
    const normalized = value.trim().toLowerCase();
    if (normalized.length === 0) return null;

    if (normalized.startsWith("clamp(") && normalized.endsWith(")")) {
        const inner = normalized.slice(6, -1);
        const parts = inner.split(",");
        if (parts.length >= 2) {
            return parseCssViewportRatio(parts[1]) ?? parseCssViewportRatio(parts[0]);
        }
    }

    const match = normalized.match(/-?\d+(?:\.\d+)?\s*(vh|%)/);
    if (!match) return null;

    const numericValue = extractFirstNumber(match[0]);
    if (numericValue === null) return null;
    return numericValue / 100;
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

export type SceneAudioCue = {
    src: string;
    volume?: number;
    loop?: boolean;
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
    detailImage?: string;
    detailAlt?: string;
    description: string;
    details?: string;
    didYouKnow?: string;
    inventoryIndex: number;
    position: CSSProperties;
    chat: SceneArtifactChat;
    rootsUrl?: string;
    interactionSound?: SceneAudioCue;
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
    autoOpenDelayMs?: number;
    autoAdvanceChatOnLoad?: boolean;
    autoChatCycle?: {
        initialDelayMs?: number;
        firstVisibleMs?: number;
        hiddenMs?: number;
        secondVisibleMs?: number;
    };
    flipHorizontallyEachCycle?: boolean;
    artifactWalkToSideBeforeOpen?: "left" | "right";
    artifactId?: string;
    interactionPromptIcon?: "chat" | "artifact";
    scaleMultiplier?: number;
    interactionHotspotStyle?: Partial<
        Pick<CSSProperties, "left" | "top" | "width" | "height" | "transform">
    >;
    position: CSSProperties;
    className?: string;
    zIndex?: number;
    interactionSound?: SceneAudioCue;
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

export type SceneCharacterEntryChat = {
    text: string;
    delayMs?: number;
    durationMs?: number;
};

export type SceneOnboardingCallout = {
    id: string;
    text: string;
    description?: string;
    renderAboveNpcBubble?: boolean;
    target:
    | {
        type: "npc-open" | "npc-finish";
        npcId: string;
    }
    | {
        type:
        | "camera-open"
        | "camera-close"
        | "menu-help"
        | "map"
        | "disposition-radar"
        | "artifact-look-closer"
        | "artifact-close";
        artifactId?: string;
    };
    direction?: "down" | "left" | "right";
};

export type SceneOnboarding = {
    title?: string;
    description?: string;
    dismissLabel?: string;
    callouts: SceneOnboardingCallout[];
};

type OnboardingHudTarget = "camera" | "menu-help" | "map" | "radar";

const isOnboardingTargetMatch = (
    currentTarget: SceneOnboardingCallout["target"] | null,
    candidateTarget: SceneOnboardingCallout["target"]
) => {
    if (!currentTarget) return false;
    if (currentTarget.type !== candidateTarget.type) return false;
    if (
        (currentTarget.type === "npc-open" || currentTarget.type === "npc-finish") &&
        (candidateTarget.type === "npc-open" || candidateTarget.type === "npc-finish")
    ) {
        return currentTarget.npcId === candidateTarget.npcId;
    }
    if (
        (currentTarget.type === "artifact-look-closer" ||
            currentTarget.type === "artifact-close") &&
        (candidateTarget.type === "artifact-look-closer" ||
            candidateTarget.type === "artifact-close")
    ) {
        return currentTarget.artifactId === candidateTarget.artifactId;
    }
    return true;
};

const DEFAULT_SCENE_INTRO_GUIDE: SceneIntroGuide = {
    title: "Pro Tip",
    description: "Walk around each scene, listen to different people, and move on when you are ready.",
    tips: [
        "Move with the Left and Right arrow keys, or click on the ground to walk.",
        "Talk to people with chat bubbles and inspect objects when they appear.",
        "Use MAP when you are ready to go to the next place.",
    ],
    dismissLabel: "Start Exploring",
};

export type BaseSceneConfig = {
    sceneTitle: string;
    sceneSubtitle: string;
    sceneBackgroundImage: string;
    backgroundReference?: SceneBackgroundReference;
    easterEggReference?: SceneBackgroundReference;
    easterEggLabel?: string;
    easterEggButtonAriaLabel?: string;
    easterEggIconSrc?: string;
    ambientSound?: SceneAudioCue;
    artifacts: [SceneArtifact, ...SceneArtifact[]];
    showArtifacts?: boolean;
    showCompanionAvatar?: boolean;
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
    characterFixedScale?: number;
    characterDialogueYOffset?: number;
    characterInitialXRatio?: number;
    characterInitialYRatio?: number;
    characterInitialXOffset?: number;
    characterInitialYOffset?: number;
    allowCharacterMovement?: boolean;
    allowDirectNpcInteractionWhenUnreachable?: boolean;
    characterMinXRatio?: number;
    characterMaxXRatio?: number;
    characterEntryChat?: SceneCharacterEntryChat;
    introGuide?: SceneIntroGuide;
    onboarding?: SceneOnboarding;
    npcTransitions?: {
        triggerNpcId: string;
        nextNpcFigures: SceneNpcFigure[];
        nextSceneAnimatedElements?: SceneAnimatedElement[];
        runOnce?: boolean;
    }[];
    npcPositionTransitionMs?: number;
};

const getQuantile = (values: number[], quantile: number) => {
    if (values.length === 0) return null;
    const sorted = [...values].sort((a, b) => a - b);
    const index = Math.min(
        sorted.length - 1,
        Math.max(0, Math.ceil(sorted.length * quantile) - 1)
    );
    return sorted[index];
};

const resolveCharacterInitialSpawnYRatio = (config: BaseSceneConfig) => {
    if (config.characterInitialYRatio !== undefined) {
        return config.characterInitialYRatio;
    }

    if (config.characterInitialYOffset !== undefined) {
        return LEGACY_CHARACTER_INITIAL_Y_RATIO;
    }

    const npcTopRatios = (config.npcFigures ?? [])
        .map((npcFigure) =>
            typeof npcFigure.position.top === "string"
                ? parseCssViewportRatio(npcFigure.position.top)
                : null
        )
        .filter((ratio): ratio is number => ratio !== null);

    if (npcTopRatios.length === 0) {
        return DEFAULT_CHARACTER_INITIAL_Y_RATIO;
    }

    const groundedNpcRatio = getQuantile(npcTopRatios, 0.75);
    if (groundedNpcRatio === null) {
        return DEFAULT_CHARACTER_INITIAL_Y_RATIO;
    }

    return clamp(
        groundedNpcRatio,
        MIN_DERIVED_CHARACTER_INITIAL_Y_RATIO,
        MAX_DERIVED_CHARACTER_INITIAL_Y_RATIO
    );
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

const getAutoOpenNpc = (npcFigures: SceneNpcFigure[]) =>
    npcFigures.find((npcFigure) => {
        if (!npcFigure.autoOpenChatOnLoad) return false;
        const chatBubbleLines = getNpcChatBubbleLines(npcFigure);
        if (chatBubbleLines.length === 0) return false;
        const npcType = getNpcType(npcFigure, true);
        return npcType === "interactive" || npcType === "artifact";
    }) ?? null;

const getAutoOpenNpcId = (npcFigures: SceneNpcFigure[]) =>
    getAutoOpenNpc(npcFigures)?.id ?? null;

const getOnboardingCalloutDirection = (
    callout: SceneOnboardingCallout | undefined
) => callout?.direction ?? "down";

const SceneOnboardingBubble = ({
    callout,
    index = 0,
    className,
}: {
    callout: SceneOnboardingCallout;
    index?: number;
    className?: string;
}) => {
    const direction = getOnboardingCalloutDirection(callout);

    return (
        <div
            className={`scene-onboarding-callout scene-onboarding-callout--${direction} ${callout.description ? "scene-onboarding-callout--detailed" : ""} ${className ?? ""}`}
            style={{ animationDelay: `${index * 110}ms` }}
        >
            <div className="scene-onboarding-callout__bubble pixel-corners">
                <span className="scene-onboarding-callout__text">{callout.text}</span>
                {callout.description ? (
                    <span className="scene-onboarding-callout__description">
                        {callout.description}
                    </span>
                ) : null}
            </div>
            <span
                aria-hidden="true"
                className={`scene-onboarding-callout__arrow scene-onboarding-callout__arrow--${direction}`}
            />
        </div>
    );
};

export function BaseSceneShell({ config }: BaseSceneShellProps) {
    const initialNpcFigures = config.npcFigures ?? [];
    const initialAutoOpenNpcId = getAutoOpenNpcId(initialNpcFigures);
    const initialSceneAnimatedElements = config.sceneAnimatedElements ?? [];

    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [viewportHeight, setViewportHeight] = useState(1080);
    const [direction, setDirection] = useState<Direction>("south");
    const [nearArtifactIndex, setNearArtifactIndex] = useState<number | null>(null);
    const [hoveredArtifactIndex, setHoveredArtifactIndex] = useState<number | null>(null);
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
    const [activeSceneAnimatedElements, setActiveSceneAnimatedElements] = useState<SceneAnimatedElement[]>(
        initialSceneAnimatedElements
    );
    const [editMode, setEditMode] = useState(false);
    const [polygonPoints, setPolygonPoints] = useState<Point[]>([]);
    const [isPolygonClosed, setIsPolygonClosed] = useState(false);
    const [navPath, setNavPath] = useState<Point[]>([]);
    const [inventorySlots, setInventorySlots] = useState<(string | null)[]>(
        Array.from({ length: 6 }, () => null)
    );
    const [drawerFocus, setDrawerFocus] = useState<"roots" | "close">("roots");
    const [activeNpcId, setActiveNpcId] = useState<string | null>(null);
    const [sceneNpcFigures, setSceneNpcFigures] = useState<SceneNpcFigure[]>(initialNpcFigures);
    const [visibleCharacterEntryChatKey, setVisibleCharacterEntryChatKey] = useState<
        string | null
    >(null);
    const [isIntroGuideOpen, setIsIntroGuideOpen] = useState(() =>
        Boolean(config.introGuide) || Boolean(config.onboarding?.callouts.length)
    );
    const [activeOnboardingStepIndex, setActiveOnboardingStepIndex] = useState(() =>
        config.onboarding?.callouts.length ? 0 : -1
    );
    const [showOnboardingCompletionNotice, setShowOnboardingCompletionNotice] =
        useState(false);
    const [npcChatCycleIndex, setNpcChatCycleIndex] = useState<Record<string, number>>({});
    const [npcDialogueSelectionById, setNpcDialogueSelectionById] = useState<
        Record<string, string | null>
    >({});
    const [npcDialogueChoicesVisibleById, setNpcDialogueChoicesVisibleById] = useState<
        Record<string, boolean>
    >({});
    const [npcDialogueReplyVisibleById, setNpcDialogueReplyVisibleById] = useState<
        Record<string, boolean>
    >({});
    const [visitedNpcById, setVisitedNpcById] = useState<Record<string, boolean>>({});
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
        autoPlay: boolean;
    } | null>(null);
    const hasStartedInitialAutoAdvanceRef = useRef(false);
    const completedNpcTransitionIdsRef = useRef<Set<string>>(new Set());
    const pendingRouteRef = useRef<string | null>(null);
    const mapRouteTimeoutRef = useRef<number | null>(null);
    const nearArtifactIndexRef = useRef<number | null>(null);
    const isDrawerOpenRef = useRef(false);
    const isIntroGuideOpenRef = useRef(
        Boolean(config.introGuide) || Boolean(config.onboarding?.callouts.length)
    );
    const isMenuOpenRef = useRef(false);
    const drawerFocusRef = useRef<"roots" | "close">("roots");
    const npcDialogueReplyTimeoutByIdRef = useRef<Record<string, number>>({});
    const ambientAudioRef = useRef<HTMLAudioElement | null>(null);
    const interactionAudioRef = useRef<HTMLAudioElement | null>(null);
    const pendingAmbientPlaybackRef = useRef(false);
    const pendingInteractionPlaybackRef = useRef(false);
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
    const router = useRouter();
    const pathname = usePathname();

    const sceneTitle = config.sceneTitle;
    const displaySceneTitle = stripSceneTitlePhasePrefix(sceneTitle);
    const sceneSubtitle = config.sceneSubtitle;
    const sceneBackgroundImage = config.sceneBackgroundImage;
    const ambientSound = config.ambientSound;
    const showArtifacts = config.showArtifacts ?? true;
    const sceneArtifacts = config.artifacts;
    const artifacts = useMemo(
        () => (showArtifacts ? sceneArtifacts : []),
        [sceneArtifacts, showArtifacts]
    );
    const sceneArtifactById = useMemo(() => {
        const artifactMap = new Map<string, SceneArtifact>();
        sceneArtifacts.forEach((artifact) => {
            artifactMap.set(artifact.id, artifact);
        });
        return artifactMap;
    }, [sceneArtifacts]);
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
    const sceneAnimatedElements = useMemo(
        () => activeSceneAnimatedElements,
        [activeSceneAnimatedElements]
    );
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
    const showCompanionAvatar = config.showCompanionAvatar ?? false;
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
    const characterFixedScale = config.characterFixedScale;
    const characterDialogueYOffset = config.characterDialogueYOffset ?? 0;
    const characterInitialXRatio = config.characterInitialXRatio ?? 0.65;
    const characterInitialYRatio = resolveCharacterInitialSpawnYRatio(config);
    const characterInitialXOffset = config.characterInitialXOffset ?? 0;
    const characterInitialYOffset = config.characterInitialYOffset ?? 0;
    const allowCharacterMovement = config.allowCharacterMovement ?? true;
    const allowDirectNpcInteractionWhenUnreachable =
        config.allowDirectNpcInteractionWhenUnreachable ?? false;
    const characterMinXRatio = config.characterMinXRatio;
    const characterMaxXRatio = config.characterMaxXRatio;
    const characterEntryChat = config.characterEntryChat;
    const characterEntryChatKey = characterEntryChat
        ? `${sceneTitle}:${characterEntryChat.text}`
        : null;
    const sceneIntroGuide = config.introGuide ?? DEFAULT_SCENE_INTRO_GUIDE;
    const sceneOnboarding = config.onboarding;
    const onboardingCallouts = sceneOnboarding?.callouts ?? [];
    const currentOnboardingCallout =
        activeOnboardingStepIndex >= 0 ? onboardingCallouts[activeOnboardingStepIndex] ?? null : null;
    const showOnboardingOverlay = isIntroGuideOpen && Boolean(currentOnboardingCallout);
    const shouldHideRadarPanel = showOnboardingOverlay && isDrawerOpen;
    const onboardingStepCount = onboardingCallouts.length;
    const onboardingStepNumber =
        currentOnboardingCallout && activeOnboardingStepIndex >= 0
            ? activeOnboardingStepIndex + 1
            : 0;
    useEffect(() => {
        if (!showOnboardingCompletionNotice) return;
        const timeoutId = window.setTimeout(() => {
            setShowOnboardingCompletionNotice(false);
        }, ONBOARDING_COMPLETION_NOTICE_DURATION_MS);
        return () => window.clearTimeout(timeoutId);
    }, [showOnboardingCompletionNotice]);
    const isWalking =
        isAutoWalking || pressed.up || pressed.down || pressed.left || pressed.right;
    const clampCharacterX = useCallback(
        (x: number, viewportWidth: number) => {
            const minX = Math.max(
                0,
                characterMinXRatio !== undefined ? viewportWidth * characterMinXRatio : 0
            );
            const maxX = Math.min(
                Math.max(0, viewportWidth - CHARACTER_SIZE),
                characterMaxXRatio !== undefined
                    ? viewportWidth * characterMaxXRatio
                    : Math.max(0, viewportWidth - CHARACTER_SIZE)
            );
            return clamp(x, minX, maxX);
        },
        [characterMaxXRatio, characterMinXRatio]
    );
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
        (characterFixedScale ??
            characterBaseScale *
            sceneCharacterScaleMultiplier *
            characterVisualScaleMultiplier) *
        PLAYER_CHARACTER_VISUAL_SCALE_BUMP;
    const characterVisualTop =
        position.y - CHARACTER_SIZE * (renderedCharacterScale - 1);
    const characterLabelTop =
        characterVisualTop + PLAYER_CHARACTER_LABEL_VERTICAL_OFFSET;
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
    const activeDialogueChoicesVisible = activeDialogueNpc
        ? (npcDialogueChoicesVisibleById[activeDialogueNpc.id] ?? false)
        : false;
    const activeDialogueReplyVisible = activeDialogueNpc
        ? (npcDialogueReplyVisibleById[activeDialogueNpc.id] ?? false)
        : false;
    const shouldRenderActiveDialogueBubble =
        Boolean(activeDialogueNpc) &&
        (
            (!activeDialogueSelectedChoice && activeDialogueChoicesVisible) ||
            (activeDialogueSelectedChoice && !activeDialogueReplyVisible)
        );
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
        setActiveSceneAnimatedElements(
            matchingTransition.nextSceneAnimatedElements ?? config.sceneAnimatedElements ?? []
        );
        return true;
    }, [config.npcTransitions, config.sceneAnimatedElements]);
    const activeArtifact = sceneArtifacts[activeArtifactIndex] ?? sceneArtifacts[0];
    const activeArtifactSourceLabel = getArtifactSourceLabel(activeArtifact);
    const registerNpcDispositionInteraction = useCallback(
        (npcFigure: SceneNpcFigure) => {
            const hasChatBubble = getNpcChatBubbleLines(npcFigure).length > 0;
            const npcType = getNpcType(npcFigure, hasChatBubble);

            if (npcType === "artifact" && npcFigure.artifactId) {
                registerDispositionInteraction({
                    role: selectedCharacterCode,
                    interactionKey: buildArtifactInteractionKey(npcFigure.artifactId),
                });
                return;
            }

            registerDispositionInteraction({
                role: selectedCharacterCode,
                interactionKey: buildNpcInteractionKey(npcFigure.id),
            });
        },
        [selectedCharacterCode]
    );
    const registerArtifactDispositionInteraction = useCallback(
        (artifactId: string) => {
            registerDispositionInteraction({
                role: selectedCharacterCode,
                interactionKey: buildArtifactInteractionKey(artifactId),
            });
        },
        [selectedCharacterCode]
    );
    const openArtifactSourcePage = useCallback((artifact: SceneArtifact | undefined) => {
        if (typeof window === "undefined") return;
        window.open(
            artifact?.rootsUrl ?? ROOTS_COLLECTION_URL,
            "_blank",
            "noopener,noreferrer"
        );
    }, []);
    const stopAmbientAudio = useCallback(() => {
        pendingAmbientPlaybackRef.current = false;
        disposeAudioElement(ambientAudioRef.current);
        ambientAudioRef.current = null;
    }, []);
    const stopInteractionAudio = useCallback(() => {
        pendingInteractionPlaybackRef.current = false;
        disposeAudioElement(interactionAudioRef.current);
        interactionAudioRef.current = null;
    }, []);
    const retryPendingAudio = useCallback(() => {
        if (pendingAmbientPlaybackRef.current && ambientAudioRef.current) {
            ambientAudioRef.current
                .play()
                .then(() => {
                    pendingAmbientPlaybackRef.current = false;
                })
                .catch(() => { });
        }

        if (pendingInteractionPlaybackRef.current && interactionAudioRef.current) {
            interactionAudioRef.current.currentTime = 0;
            interactionAudioRef.current
                .play()
                .then(() => {
                    pendingInteractionPlaybackRef.current = false;
                })
                .catch(() => { });
        }
    }, []);
    const playInteractionSound = useCallback(
        (sound?: SceneAudioCue) => {
            if (!sound?.src) return;

            stopInteractionAudio();

            const audio = new Audio(sound.src);
            audio.preload = "auto";
            audio.loop = sound.loop ?? false;
            audio.volume = sound.volume ?? 0.5;

            const handleError = () => {
                pendingInteractionPlaybackRef.current = false;
                if (interactionAudioRef.current === audio) {
                    interactionAudioRef.current = null;
                }
                disposeAudioElement(audio);
            };

            audio.addEventListener("error", handleError);
            interactionAudioRef.current = audio;
            audio
                .play()
                .then(() => {
                    pendingInteractionPlaybackRef.current = false;
                })
                .catch(() => {
                    pendingInteractionPlaybackRef.current = true;
                });
        },
        [stopInteractionAudio]
    );
    useEffect(() => {
        const handleUserGesture = () => {
            retryPendingAudio();
        };

        window.addEventListener("pointerdown", handleUserGesture);
        window.addEventListener("keydown", handleUserGesture);

        return () => {
            window.removeEventListener("pointerdown", handleUserGesture);
            window.removeEventListener("keydown", handleUserGesture);
        };
    }, [retryPendingAudio]);
    useEffect(() => {
        stopAmbientAudio();

        if (!ambientSound?.src) {
            return;
        }

        const audio = new Audio(ambientSound.src);
        audio.preload = "auto";
        audio.loop = ambientSound.loop ?? true;
        audio.volume = ambientSound.volume ?? 0.25;

        const handleError = () => {
            pendingAmbientPlaybackRef.current = false;
            if (ambientAudioRef.current === audio) {
                ambientAudioRef.current = null;
            }
            disposeAudioElement(audio);
        };

        audio.addEventListener("error", handleError);
        ambientAudioRef.current = audio;
        audio
            .play()
            .then(() => {
                pendingAmbientPlaybackRef.current = false;
            })
            .catch(() => {
                pendingAmbientPlaybackRef.current = true;
            });

        return () => {
            audio.removeEventListener("error", handleError);
            if (ambientAudioRef.current === audio) {
                ambientAudioRef.current = null;
            }
            disposeAudioElement(audio);
        };
    }, [ambientSound?.loop, ambientSound?.src, ambientSound?.volume, stopAmbientAudio]);
    useEffect(() => {
        return () => {
            stopAmbientAudio();
            stopInteractionAudio();
        };
    }, [stopAmbientAudio, stopInteractionAudio]);
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
    const openSceneGuide = useCallback(() => {
        if (onboardingCallouts.length > 0) {
            setActiveOnboardingStepIndex(0);
        }
        setShowOnboardingCompletionNotice(false);
        setIsMenuOpen(false);
        setIsIntroGuideOpen(true);
    }, [onboardingCallouts.length]);
    const completeOnboardingStep = useCallback(
        (target: SceneOnboardingCallout["target"]) => {
            if (!showOnboardingOverlay || !currentOnboardingCallout) return false;
            if (!isOnboardingTargetMatch(currentOnboardingCallout.target, target)) return false;

            const isLastStep = activeOnboardingStepIndex >= onboardingCallouts.length - 1;
            if (isLastStep) {
                setIsIntroGuideOpen(false);
                setActiveOnboardingStepIndex(-1);
                setShowOnboardingCompletionNotice(true);
            } else {
                setActiveOnboardingStepIndex((prev) => prev + 1);
            }
            return true;
        },
        [
            activeOnboardingStepIndex,
            currentOnboardingCallout,
            onboardingCallouts.length,
            showOnboardingOverlay,
        ]
    );
    const isOnboardingNpcTarget = useCallback(
        (npcId: string, action?: "npc-open" | "npc-finish") => {
            const target = currentOnboardingCallout?.target ?? null;
            if (!target) return false;
            if (target.type !== "npc-open" && target.type !== "npc-finish") return false;
            if (action && target.type !== action) return false;
            return target.npcId === npcId;
        },
        [currentOnboardingCallout]
    );
    const isOnboardingHudTarget = useCallback(
        (target: OnboardingHudTarget) =>
            isOnboardingTargetMatch(currentOnboardingCallout?.target ?? null, {
                type:
                    target === "camera"
                        ? "camera-open"
                        : target === "radar"
                            ? "disposition-radar"
                            : target,
            }),
        [currentOnboardingCallout]
    );
    const isOnboardingCameraCloseTarget = useCallback(
        () =>
            isOnboardingTargetMatch(currentOnboardingCallout?.target ?? null, {
                type: "camera-close",
            }),
        [currentOnboardingCallout]
    );
    const isOnboardingArtifactTarget = useCallback(
        (
            artifactId: string | undefined,
            action: "artifact-look-closer" | "artifact-close"
        ) => {
            if (!artifactId) return false;
            return isOnboardingTargetMatch(currentOnboardingCallout?.target ?? null, {
                type: action,
                artifactId,
            });
        },
        [currentOnboardingCallout]
    );
    const openNpcChat = useCallback(
        (npcId: string, shouldAutoPlay: boolean) => {
            clearNpcDialogueReplyTimeout(npcId);
            const npcFigure = npcFigures.find((candidate) => candidate.id === npcId);
            if (npcFigure) {
                registerNpcDispositionInteraction(npcFigure);
                playInteractionSound(npcFigure.interactionSound);
            }
            completeOnboardingStep({
                type: "npc-open",
                npcId,
            });
            setNpcChatCycleIndex((prev) => ({
                ...prev,
                [npcId]: 0,
            }));
            setNpcDialogueChoicesVisibleById((prev) => ({
                ...prev,
                [npcId]: false,
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
        [
            clearNpcDialogueReplyTimeout,
            completeOnboardingStep,
            npcFigures,
            playInteractionSound,
            registerNpcDispositionInteraction,
            startNpcAutoAdvance,
            stopNpcAutoAdvance,
        ]
    );
    const finishNpcChat = useCallback(
        (npcId: string) => {
            clearNpcDialogueReplyTimeout(npcId);
            stopNpcAutoAdvance(npcId);
            runNpcTransition(npcId);
            completeOnboardingStep({
                type: "npc-finish",
                npcId,
            });
            setVisitedNpcById((prev) =>
                prev[npcId]
                    ? prev
                    : {
                        ...prev,
                        [npcId]: true,
                    }
            );
            setNpcDialogueReplyVisibleById((prev) => ({
                ...prev,
                [npcId]: false,
            }));
            setNpcDialogueChoicesVisibleById((prev) => ({
                ...prev,
                [npcId]: false,
            }));
            setActiveNpcId((currentActiveNpcId) =>
                currentActiveNpcId === npcId ? null : currentActiveNpcId
            );
        },
        [
            clearNpcDialogueReplyTimeout,
            completeOnboardingStep,
            runNpcTransition,
            stopNpcAutoAdvance,
        ]
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
            const artifact = sceneArtifacts[artifactIndex];
            registerArtifactDispositionInteraction(artifactId);
            pendingRouteRef.current = null;
            pendingNpcInteractionRef.current = null;
            pendingArtifactNpcInteractionRef.current = null;
            setActiveArtifactIndex(artifactIndex);
            playInteractionSound(artifact?.interactionSound);
            setDrawerFocus("roots");
            setIsDrawerOpen(true);
            completeOnboardingStep({
                type: "artifact-look-closer",
                artifactId,
            });
        },
        [
            completeOnboardingStep,
            playInteractionSound,
            registerArtifactDispositionInteraction,
            sceneArtifacts,
        ]
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
        isRouteLoadingRef.current = isRouteLoading;
    }, [isRouteLoading]);

    useEffect(() => {
        const nextX = window.innerWidth * characterInitialXRatio + characterInitialXOffset;
        const nextY = window.innerHeight * characterInitialYRatio + characterInitialYOffset;
        const maxY = Math.max(0, window.innerHeight - CHARACTER_SIZE);
        setPosition({
            x: clampCharacterX(nextX, window.innerWidth),
            y: Math.min(Math.max(0, nextY), maxY),
        });
        setViewportHeight(window.innerHeight);
    }, [
        characterInitialXRatio,
        characterInitialYRatio,
        characterInitialXOffset,
        characterInitialYOffset,
        clampCharacterX,
    ]);

    useEffect(() => {
        const nextNpcFigures = config.npcFigures ?? [];
        const nextAutoOpenNpc = getAutoOpenNpc(nextNpcFigures);
        const nextAutoOpenNpcId = nextAutoOpenNpc?.id ?? null;
        completedNpcTransitionIdsRef.current = new Set();
        hasStartedInitialAutoAdvanceRef.current = false;
        stopNpcAutoAdvance();
        setSceneNpcFigures(nextNpcFigures);
        setActiveSceneAnimatedElements(config.sceneAnimatedElements ?? []);
        setActiveNpcId(null);
        setNpcChatCycleIndex({});
        setNpcDialogueSelectionById({});
        setNpcDialogueChoicesVisibleById({});
        setNpcDialogueReplyVisibleById({});

        if ((config.onboarding?.callouts.length ?? 0) > 0) {
            return;
        }

        if (!nextAutoOpenNpcId) return;

        const autoOpenDelayMs = Math.max(0, nextAutoOpenNpc?.autoOpenDelayMs ?? 0);
        if (autoOpenDelayMs === 0) {
            if (nextAutoOpenNpc) {
                registerNpcDispositionInteraction(nextAutoOpenNpc);
                playInteractionSound(nextAutoOpenNpc.interactionSound);
            }
            setActiveNpcId(nextAutoOpenNpcId);
            setNpcChatCycleIndex({ [nextAutoOpenNpcId]: 0 });
            return;
        }

        const autoOpenTimeoutId = window.setTimeout(() => {
            if (nextAutoOpenNpc) {
                registerNpcDispositionInteraction(nextAutoOpenNpc);
                playInteractionSound(nextAutoOpenNpc.interactionSound);
            }
            setActiveNpcId(nextAutoOpenNpcId);
            setNpcChatCycleIndex({ [nextAutoOpenNpcId]: 0 });
        }, autoOpenDelayMs);

        return () => {
            window.clearTimeout(autoOpenTimeoutId);
        };
    }, [
        config.npcFigures,
        config.sceneAnimatedElements,
        playInteractionSound,
        registerNpcDispositionInteraction,
        stopNpcAutoAdvance,
    ]);

    useEffect(() => {
        if (!characterEntryChat?.text || !characterEntryChatKey) return;
        if (typeof window === "undefined") return;

        const showDelayMs =
            characterEntryChat.delayMs ?? CHARACTER_ENTRY_CHAT_DEFAULT_DELAY_MS;
        const visibleDurationMs =
            characterEntryChat.durationMs ?? CHARACTER_ENTRY_CHAT_DEFAULT_DURATION_MS;

        let hideTimeoutId = 0;
        const showTimeoutId = window.setTimeout(() => {
            setVisibleCharacterEntryChatKey(characterEntryChatKey);
            hideTimeoutId = window.setTimeout(() => {
                setVisibleCharacterEntryChatKey((currentKey) =>
                    currentKey === characterEntryChatKey ? null : currentKey
                );
            }, visibleDurationMs);
        }, showDelayMs);

        return () => {
            window.clearTimeout(showTimeoutId);
            if (hideTimeoutId) {
                window.clearTimeout(hideTimeoutId);
            }
        };
    }, [characterEntryChat, characterEntryChatKey]);

    useEffect(() => {
        const handleResize = () => setViewportHeight(window.innerHeight);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        isDrawerOpenRef.current = isDrawerOpen;
    }, [isDrawerOpen]);

    useEffect(() => {
        if (!isDrawerOpen || typeof document === "undefined") return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = previousOverflow;
        };
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
        setActiveOnboardingStepIndex(onboardingCallouts.length > 0 ? 0 : -1);
    }, [pathname, onboardingCallouts.length]);

    useEffect(() => {
        if (typeof window === "undefined") return;
        window.localStorage.setItem("inventorySlots", JSON.stringify(inventorySlots));
    }, [inventorySlots]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (!allowCharacterMovement) return;
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
                if (showArtifacts && nearArtifactIndexRef.current !== null) {
                    openArtifactDrawerById(
                        artifacts[nearArtifactIndexRef.current]?.id
                    );
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

                const clamped = {
                    x: clampCharacterX(nextX, window.innerWidth),
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
            if (!allowCharacterMovement) return;
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
    }, [
        allowCharacterMovement,
        clampCharacterX,
        navigateWithLoading,
        openArtifactDrawerById,
        showArtifacts,
        targetPosition,
        artifacts,
    ]);

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
                    openArtifactSourcePage(activeArtifact);
                }
                return;
            }

            if (event.key === "Escape") {
                setIsDrawerOpen(false);
                return;
            }

            if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
                setDrawerFocus("roots");
                return;
            }

            if (event.key === "ArrowDown" || event.key === "ArrowRight") {
                setDrawerFocus("close");
                return;
            }
        };

        window.addEventListener("keydown", handleDrawerKeys);
        return () => window.removeEventListener("keydown", handleDrawerKeys);
    }, [activeArtifact, isDrawerOpen, openArtifactSourcePage]);

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
        if (hasStartedInitialAutoAdvanceRef.current) return;
        if (!initialAutoOpenNpcId) return;

        const autoOpenNpc = npcFigures.find(
            (npcFigure) => npcFigure.id === initialAutoOpenNpcId
        );
        if (!autoOpenNpc?.autoAdvanceChatOnLoad) return;

        const chatBubbleLines = getNpcChatBubbleLines(autoOpenNpc);
        if (
            chatBubbleLines.length <= 1 ||
            (autoOpenNpc.dialogueChoices?.length ?? 0) > 0
        ) {
            return;
        }

        hasStartedInitialAutoAdvanceRef.current = true;
        startNpcAutoAdvance(autoOpenNpc.id);
    }, [initialAutoOpenNpcId, npcFigures, startNpcAutoAdvance]);

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
        if (
            (npcType === "artifact" && !activeNpc.autoAdvanceChatOnLoad) ||
            chatBubbleLines.length <= 1 ||
            (activeNpc.dialogueChoices?.length ?? 0) > 0
        ) {
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

        setIsAutoWalking(true);
        const animationFrame = window.requestAnimationFrame(() => {
            const dx = targetPosition.x - position.x;
            const dy = targetPosition.y - position.y;
            const distance = Math.hypot(dx, dy);

            if (distance <= CLICK_WALK_SPEED) {
                setPosition({ x: targetPosition.x, y: targetPosition.y });

                const remaining = navPathRef.current.slice(1);
                setNavPath(remaining);
                if (remaining.length > 0) {
                    setTargetPosition({
                        x: remaining[0].x - CHARACTER_SIZE / 2,
                        y: remaining[0].y - CHARACTER_SIZE,
                    });
                    return;
                }

                setIsAutoWalking(false);
                setTargetPosition(null);
                if (pendingRouteRef.current) {
                    const pendingRoute = pendingRouteRef.current;
                    pendingRouteRef.current = null;
                    navigateWithLoading(pendingRoute);
                    return;
                }
                if (pendingArtifactNpcInteractionRef.current) {
                    const pendingArtifactNpc = pendingArtifactNpcInteractionRef.current;
                    pendingArtifactNpcInteractionRef.current = null;
                    openNpcChat(
                        pendingArtifactNpc.id,
                        Boolean(pendingArtifactNpc.autoPlay)
                    );
                    return;
                }
                if (pendingNpcInteractionRef.current) {
                    const pendingNpc = pendingNpcInteractionRef.current;
                    pendingNpcInteractionRef.current = null;
                    // If this walk was initiated by an NPC interaction, open the bubble on arrival.
                    openNpcChat(pendingNpc.id, Boolean(pendingNpc.autoPlay));
                }
                return;
            }

            const nx = dx / distance;
            const ny = dy / distance;
            setPosition({
                x: clampCharacterX(position.x + nx * CLICK_WALK_SPEED, window.innerWidth),
                y: position.y + ny * CLICK_WALK_SPEED,
            });
        });

        return () => window.cancelAnimationFrame(animationFrame);
    }, [clampCharacterX, navigateWithLoading, openNpcChat, position, targetPosition]);

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
        if (!character) return;

        const characterRect = character.getBoundingClientRect();

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
                const minClickX = clampCharacterX(0, window.innerWidth) + CHARACTER_SIZE / 2;
                const maxClickX =
                    clampCharacterX(
                        Math.max(0, window.innerWidth - CHARACTER_SIZE),
                        window.innerWidth
                    ) + CHARACTER_SIZE / 2;
                const targetBase: Point = {
                    x: clamp(targetBaseForEdit.x, minClickX, maxClickX),
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
                    <SceneTitleWithCamera>{displaySceneTitle}</SceneTitleWithCamera>
                    <div className="pixel-corners--wrapper">
                        <div className="pixel-corners scene-subtitle">{sceneSubtitle}</div>
                    </div>
                    <div
                        className="relative z-[140] mt-2"
                        style={{
                            pointerEvents:
                                showOnboardingOverlay && !isOnboardingHudTarget("camera")
                                    ? "none"
                                    : undefined,
                        }}
                        data-ui="true"
                    >
                        {showOnboardingOverlay &&
                            currentOnboardingCallout?.target.type === "camera-open" ? (
                            <div className="absolute left-full top-1/2 ml-4 -translate-x-[300px] -translate-y-1/2">
                                <SceneOnboardingBubble
                                    callout={currentOnboardingCallout}
                                />
                            </div>
                        ) : null}
                        <div
                            className={`scene-hud-focus-shell ${isOnboardingHudTarget("camera") ? "scene-onboarding-focus scene-onboarding-focus--hud" : ""}`}
                        >
                            <SceneCameraButton
                                reference={config.backgroundReference}
                                onOpen={() => {
                                    completeOnboardingStep({ type: "camera-open" });
                                }}
                                onClose={() => {
                                    completeOnboardingStep({ type: "camera-close" });
                                }}
                                disableImplicitClose={isOnboardingCameraCloseTarget()}
                                className={
                                    `${isOnboardingHudTarget("camera")
                                        ? "scene-camera-button--focus "
                                        : ""}-mt-3`
                                }
                                iconClassName={
                                    `${isOnboardingHudTarget("camera")
                                        ? "scene-camera-button__icon--focus "
                                        : ""}h-6 w-6 sm:h-7 sm:w-7`
                                }
                                closeButtonClassName={
                                    isOnboardingCameraCloseTarget()
                                        ? "scene-onboarding-focus scene-onboarding-focus--hud"
                                        : undefined
                                }
                            />
                        </div>
                    </div>
                </div>
                {showCompanionAvatar ? (
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
                ) : null}
            </aside>
            {config.easterEggReference ? (
                <div
                    className="absolute right-3 top-10 z-[25] flex flex-col items-center gap-2 sm:right-4 sm:top-64"
                    data-ui="true"
                >
                    {config.easterEggLabel ? (
                        <div className="pixel-corners--wrapper">
                            <div className="pixel-corners border border-[#8a6230] bg-[#22140c] px-3 py-2 text-[#fff4dc]">
                                <div className="artifact-label text-center text-lg leading-none sm:text-xl">
                                    {config.easterEggLabel}
                                </div>
                            </div>
                        </div>
                    ) : null}
                    <SceneCameraButton
                        reference={config.easterEggReference}
                        buttonAriaLabel={
                            config.easterEggButtonAriaLabel ?? "Open Easter egg"
                        }
                        iconSrc={config.easterEggIconSrc ?? "/icons/see-artefact-icon.png"}
                        className="pixel-corners border border-[#6c4600] bg-[#ffd24a] p-1 transition-transform duration-150 hover:scale-105"
                        iconClassName="h-5 w-5 sm:h-6 sm:w-6"
                        lightboxVariant="easterEgg"
                    />
                </div>
            ) : null}
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
            {visibleCharacterEntryChatKey === characterEntryChatKey &&
                !activeDialogueNpc &&
                characterEntryChat?.text ? (
                <div
                    className="npc-chat-bubble-shell"
                    style={{
                        left: `${position.x + CHARACTER_SIZE / 2}px`,
                        top: `${characterVisualTop - 16 + characterDialogueYOffset}px`,
                        bottom: "auto",
                        transform: "translate(-50%, -100%)",
                        width: DIALOGUE_BUBBLE_WIDTH,
                        zIndex: sceneCharacterDialogueZIndex,
                    }}
                >
                    <div
                        className="npc-chat-bubble pixel-corners"
                        style={{ width: "100%" }}
                    >
                        <span className="npc-chat-speaker">{characterName}</span>
                        <span className="npc-chat-text">{characterEntryChat.text}</span>
                    </div>
                </div>
            ) : null}
            {shouldRenderActiveDialogueBubble && activeDialogueNpc ? (
                <div
                    className="npc-chat-bubble-shell"
                    data-ui="true"
                    onClick={(event) => {
                        event.stopPropagation();
                        if (activeDialogueSelectedChoice && !activeDialogueReplyVisible) {
                            setNpcDialogueReplyVisibleById((prev) => ({
                                ...prev,
                                [activeDialogueNpc.id]: true,
                            }));
                        }
                    }}
                    style={{
                        left: `${position.x + CHARACTER_SIZE / 2}px`,
                        top: `${characterVisualTop - 16 + characterDialogueYOffset}px`,
                        bottom: "auto",
                        transform: "translate(-50%, -100%)",
                        width: DIALOGUE_BUBBLE_WIDTH,
                        zIndex: sceneCharacterDialogueZIndex,
                        pointerEvents: "auto",
                        cursor:
                            activeDialogueSelectedChoice && !activeDialogueReplyVisible
                                ? "pointer"
                                : "auto",
                    }}
                >
                    <div
                        className="npc-chat-bubble pixel-corners"
                        style={{ width: "100%" }}
                    >
                        <span className="npc-chat-speaker">{characterName}</span>
                        {activeDialogueSelectedChoice && !activeDialogueReplyVisible ? (
                            <span className="npc-chat-text">
                                {activeDialogueSelectedChoice.playerText ??
                                    activeDialogueSelectedChoice.label}
                            </span>
                        ) : !activeDialogueSelectedChoice && activeDialogueChoicesVisible ? (
                            <div className="flex flex-col gap-2">
                                {activeDialogueChoices.map((choice) => (
                                    <button
                                        key={choice.id}
                                        type="button"
                                        className="rounded-xl border border-[#3b2f28] bg-[#1b1615] px-3 py-2 text-left text-[1.35rem] leading-[1.05] text-[#f6eada] transition-colors"
                                        data-ui="true"
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            setNpcDialogueSelectionById((prev) => ({
                                                ...prev,
                                                [activeDialogueNpc.id]: choice.id,
                                            }));
                                            setNpcDialogueChoicesVisibleById((prev) => ({
                                                ...prev,
                                                [activeDialogueNpc.id]: false,
                                            }));
                                            setNpcDialogueReplyVisibleById((prev) => ({
                                                ...prev,
                                                [activeDialogueNpc.id]: false,
                                            }));
                                        }}
                                    >
                                        {choice.label}
                                    </button>
                                ))}
                            </div>
                        ) : null}
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
            {npcFigures.map((npcFigure) => {
                const chatBubbleLines = getNpcChatBubbleLines(npcFigure);
                const hasChatBubble = chatBubbleLines.length > 0;
                const dialogueChoices = npcFigure.dialogueChoices ?? [];
                const hasDialogueChoices = dialogueChoices.length > 0;
                const npcType = getNpcType(npcFigure, hasChatBubble);
                const isArtifactNpc = npcType === "artifact";
                const linkedArtifact = npcFigure.artifactId
                    ? sceneArtifactById.get(npcFigure.artifactId)
                    : undefined;
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
                const isDialogueChoicesVisible =
                    npcDialogueChoicesVisibleById[npcFigure.id] ?? false;
                const isDialogueReplyVisible =
                    npcDialogueReplyVisibleById[npcFigure.id] ?? false;
                const displayedChatBubbleText =
                    hasDialogueChoices
                        ? selectedDialogueChoice
                            ? isDialogueReplyVisible
                                ? selectedDialogueChoice.npcReply
                                : ""
                            : isDialogueChoicesVisible
                                ? ""
                                : activeChatBubbleText
                        : activeChatBubbleText;
                const fallbackArtifactChatText = isArtifactNpc
                    ? linkedArtifact?.description ??
                    linkedArtifact?.title ??
                    "Take a closer look at this object."
                    : "";
                const bubbleText = displayedChatBubbleText || fallbackArtifactChatText;
                const displayedChatSpeaker =
                    npcFigure.chatBubbleSpeaker ??
                    (isArtifactNpc && !hasChatBubble ? linkedArtifact?.title : undefined);
                const isPromptVisible = isInteractiveNpc;
                const usesArtifactPromptIcon =
                    npcFigure.interactionPromptIcon === "artifact";
                const promptIconSrc = usesArtifactPromptIcon
                    ? "/icons/see-artefact-icon.png"
                    : visitedNpcById[npcFigure.id]
                        ? "/icons/chat-bubble-visited.png"
                        : "/icons/chat-bubble.png";
                const isChatOpen =
                    activeNpcId === npcFigure.id &&
                    isInteractiveNpc &&
                    (hasChatBubble || isArtifactNpc);
                const shouldRenderNpcBubble =
                    isChatOpen && (bubbleText.length > 0 || isArtifactNpc);
                const usesWideChatBubble = hasDialogueChoices || isArtifactNpc;
                const npcImage =
                    isChatOpen && npcFigure.imageOnChatOpen
                        ? npcFigure.imageOnChatOpen
                        : npcFigure.image;
                const npcScaleMultiplier =
                    sceneCharacterScaleMultiplier * (npcFigure.scaleMultiplier ?? 1);
                const npcScaleTransform =
                    npcScaleMultiplier === 1
                        ? ""
                        : `scale(${npcScaleMultiplier})`;
                const positionTransform =
                    typeof npcFigure.position.transform === "string"
                        ? npcFigure.position.transform
                        : "";
                const npcTransform = [positionTransform, npcScaleTransform]
                    .filter((transformPart) => transformPart.length > 0)
                    .join(" ");
                const npcChatBubbleScale = 1 / npcScaleMultiplier;
                const npcZIndex = npcZIndexById[npcFigure.id] ?? NPC_MIN_Z_INDEX;
                const onboardingNpcCallout =
                    showOnboardingOverlay &&
                        isOnboardingNpcTarget(npcFigure.id) &&
                        currentOnboardingCallout &&
                        (
                            currentOnboardingCallout.target.type === "npc-open" ||
                            currentOnboardingCallout.target.type === "npc-finish"
                        )
                        ? currentOnboardingCallout
                        : undefined;
                const shouldRenderNpcCalloutAboveBubble =
                    onboardingNpcCallout?.renderAboveNpcBubble === true &&
                    isChatOpen &&
                    shouldRenderNpcBubble;
                const isArtifactLookCloserTarget = isOnboardingArtifactTarget(
                    npcFigure.artifactId,
                    "artifact-look-closer"
                );
                const npcBaseStyle: CSSProperties = {
                    ...npcFigure.position,
                    zIndex: onboardingNpcCallout ? Math.max(npcZIndex, 140) : npcZIndex,
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
                    linkedArtifact?.title ??
                    "NPC"
                ).replace("\n", " ");
                const npcInteractionLabel = isArtifactNpc
                    ? `Talk to ${npcInteractionName} and take a look`
                    : `Talk to ${npcInteractionName}`;
                const advanceDialogueNpc = () => {
                    if (!hasDialogueChoices) return false;

                    if (selectedDialogueChoice) {
                        if (!isDialogueReplyVisible) {
                            setNpcDialogueReplyVisibleById((prev) => ({
                                ...prev,
                                [npcFigure.id]: true,
                            }));
                        } else {
                            finishNpcChat(npcFigure.id);
                        }
                        return true;
                    }

                    if (!isDialogueChoicesVisible) {
                        setNpcDialogueChoicesVisibleById((prev) => ({
                            ...prev,
                            [npcFigure.id]: true,
                        }));
                        return true;
                    }

                    finishNpcChat(npcFigure.id);
                    return true;
                };
                const npcInteractionHotspotStyle: CSSProperties = {
                    left: "50%",
                    top: "-72px",
                    width: `max(100%, ${NPC_CHAT_HOTSPOT_SIZE}px)`,
                    height: "calc(100% + 72px)",
                    transform: "translateX(-50%)",
                    ...npcFigure.interactionHotspotStyle,
                    pointerEvents: "auto",
                    zIndex: 15,
                };
                return (
                    <div
                        key={npcFigure.id}
                        className={`absolute npc-figure ${isInteractiveNpc ? "npc-figure--chat" : "npc-figure--non-interactive"} ${isArtifactNpc ? "npc-figure--artifact" : ""} ${isChatOpen ? "npc-figure--chat-open" : ""} ${onboardingNpcCallout ? "scene-onboarding-focus scene-onboarding-focus--npc" : ""} ${npcFigure.className ?? ""}`}
                        style={npcStyle}
                    >
                        {onboardingNpcCallout && !shouldRenderNpcCalloutAboveBubble ? (
                            <div
                                className="absolute left-1/2 top-0 z-[141]"
                                style={{ transform: "translate(-50%, calc(-100% - 84px))" }}
                                data-ui="true"
                            >
                                <SceneOnboardingBubble
                                    callout={onboardingNpcCallout}
                                />
                            </div>
                        ) : null}
                        {shouldRenderNpcBubble ? (
                            <div
                                className="npc-chat-bubble-shell"
                                data-ui="true"
                                onClick={
                                    isArtifactNpc
                                        ? (event) => event.stopPropagation()
                                        : hasDialogueChoices
                                            ? (event) => {
                                                event.stopPropagation();
                                                advanceDialogueNpc();
                                            }
                                            : undefined
                                }
                                style={{
                                    ...(sceneCharacterScaleMultiplier === 1
                                        ? {}
                                        : {
                                            transform: `translateX(-50%) scale(${npcChatBubbleScale})`,
                                            transformOrigin: "bottom center",
                                        }),
                                    ...(usesWideChatBubble
                                        ? { width: DIALOGUE_BUBBLE_WIDTH }
                                        : {}),
                                    ...(
                                        isArtifactNpc ||
                                            (hasDialogueChoices &&
                                                (
                                                    (!selectedDialogueChoice &&
                                                        !isDialogueChoicesVisible) ||
                                                    (selectedDialogueChoice &&
                                                        isDialogueReplyVisible)
                                                ))
                                            ? { pointerEvents: "auto", cursor: "pointer" }
                                            : {}
                                    ),
                                }}
                            >
                                {shouldRenderNpcCalloutAboveBubble ? (
                                    <div className="absolute bottom-full left-1/2 z-[141] mb-4 -translate-x-1/2">
                                        <SceneOnboardingBubble
                                            callout={onboardingNpcCallout}
                                        />
                                    </div>
                                ) : null}
                                {isArtifactLookCloserTarget ? (
                                    <div className="absolute bottom-full left-1/2 z-[141] mb-4 -translate-x-1/2">
                                        <SceneOnboardingBubble
                                            callout={currentOnboardingCallout!}
                                        />
                                    </div>
                                ) : null}
                                <div
                                    className="npc-chat-bubble pixel-corners"
                                    style={
                                        usesWideChatBubble
                                            ? {
                                                width: DIALOGUE_BUBBLE_WIDTH,
                                            }
                                            : undefined
                                    }
                                >
                                    {displayedChatSpeaker ? (
                                        <span className="npc-chat-speaker">
                                            {displayedChatSpeaker}
                                        </span>
                                    ) : null}
                                    <span className="npc-chat-text">
                                        {bubbleText}
                                    </span>
                                    {isArtifactNpc ? (
                                        <div
                                            className={`relative mt-3 self-center ${isArtifactLookCloserTarget
                                                ? "scene-onboarding-artifact-action-shell"
                                                : ""}`}
                                        >
                                            <button
                                                type="button"
                                                className={`artifact-label artifact-button pixel-corners pop-in flex w-auto items-center justify-center rounded-full border border-[#7a1c1c] bg-[#f24747] px-3 py-1.5 text-sm uppercase tracking-[0.2em] hl-pixel-action-button ${isArtifactLookCloserTarget
                                                    ? "scene-onboarding-focus scene-onboarding-focus--hud scene-onboarding-focus--artifact-action scene-onboarding-artifact-action-button"
                                                    : ""}`}
                                                onClick={(event) => {
                                                    event.stopPropagation();
                                                    openArtifactDrawerById(npcFigure.artifactId);
                                                }}
                                                data-ui="true"
                                            >
                                                LOOK CLOSER
                                            </button>
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                        ) : null}
                        {isPromptVisible && !isChatOpen ? (
                            <div
                                className={`npc-chat-prompt-shell ${isArtifactNpc ? "npc-chat-prompt-shell--artifact" : "npc-chat-prompt-shell--interactive"}`}
                                data-ui="true"
                                style={
                                    sceneCharacterScaleMultiplier === 1
                                        ? undefined
                                        : {
                                            transform: `translateX(-50%) scale(${npcChatBubbleScale})`,
                                            transformOrigin: "bottom center",
                                        }
                                }
                            >
                                <div
                                    className={`npc-chat-prompt-stack ${isArtifactNpc ? "npc-chat-prompt-stack--artifact" : ""}`}
                                >
                                    <Image
                                        src={promptIconSrc}
                                        alt=""
                                        width={44}
                                        height={44}
                                        className={`npc-chat-prompt ${usesArtifactPromptIcon ? "npc-chat-prompt--artifact" : ""}`}
                                        style={
                                            usesArtifactPromptIcon
                                                ? {
                                                    animation: "none",
                                                    transform: "translateY(0)",
                                                }
                                                : undefined
                                        }
                                        aria-hidden="true"
                                        draggable={false}
                                    />
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
                                className="artifact-trigger npc-chat-trigger absolute"
                                style={npcInteractionHotspotStyle}
                                onClick={(event) => {
                                    event.stopPropagation();
                                    if (showOnboardingOverlay) {
                                        if (!isOnboardingNpcTarget(npcFigure.id)) return;
                                    } else if (isIntroGuideOpenRef.current) {
                                        return;
                                    }
                                    pendingRouteRef.current = null;
                                    if (isArtifactNpc) {
                                        pendingNpcInteractionRef.current = null;
                                        const isSameNpcOpen =
                                            activeNpcId === npcFigure.id &&
                                            pendingArtifactNpcInteractionRef.current === null &&
                                            !isAutoWalking &&
                                            targetPosition === null;
                                        const shouldAutoPlayArtifact =
                                            !hasDialogueChoices &&
                                            chatBubbleLines.length > 1 &&
                                            Boolean(npcFigure.autoAdvanceChatOnLoad);
                                        if (isSameNpcOpen) {
                                            if (advanceDialogueNpc()) return;
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
                                        const openArtifactChatNow = () => {
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
                                            openNpcChat(
                                                npcFigure.id,
                                                shouldAutoPlayArtifact
                                            );
                                        };

                                        const walkToSideBeforeOpen =
                                            npcFigure.artifactWalkToSideBeforeOpen;
                                        if (!allowCharacterMovement || !walkToSideBeforeOpen) {
                                            openArtifactChatNow();
                                            return;
                                        }

                                        const npcElement = event.currentTarget.closest(".npc-figure");
                                        if (!(npcElement instanceof HTMLElement)) {
                                            openArtifactChatNow();
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
                                        const targetCenterX =
                                            clampCharacterX(
                                                npcCenterX + sideOffset - CHARACTER_SIZE / 2,
                                                window.innerWidth
                                            ) +
                                            CHARACTER_SIZE / 2;

                                        if (
                                            Math.abs(currentCharacterCenterX - targetCenterX) <=
                                            CLICK_WALK_SPEED
                                        ) {
                                            openArtifactChatNow();
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
                                            openArtifactChatNow();
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
                                            openArtifactChatNow();
                                            return;
                                        }

                                        setActiveNpcId(null);
                                        pendingArtifactNpcInteractionRef.current = {
                                            id: npcFigure.id,
                                            autoPlay: shouldAutoPlayArtifact,
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
                                        if (advanceDialogueNpc()) return;
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
                                    const leftCandidate =
                                        clampCharacterX(
                                            leftTargetCenterX - CHARACTER_SIZE / 2,
                                            window.innerWidth
                                        ) +
                                        CHARACTER_SIZE / 2;
                                    const rightCandidate =
                                        clampCharacterX(
                                            rightTargetCenterX - CHARACTER_SIZE / 2,
                                            window.innerWidth
                                        ) +
                                        CHARACTER_SIZE / 2;
                                    const canStandLeft =
                                        leftTargetCenterX >= minCharacterCenterX;
                                    const canStandRight =
                                        rightTargetCenterX <= maxCharacterCenterX;
                                    const canReachNpcFromWalkRange =
                                        Math.abs(leftCandidate - npcCenterX) <=
                                        NPC_CHAT_OPEN_DISTANCE ||
                                        Math.abs(rightCandidate - npcCenterX) <=
                                        NPC_CHAT_OPEN_DISTANCE;

                                    if (
                                        allowDirectNpcInteractionWhenUnreachable &&
                                        !canReachNpcFromWalkRange
                                    ) {
                                        pendingNpcInteractionRef.current = null;
                                        openNpcChat(npcFigure.id, shouldAutoPlayNpc);
                                        return;
                                    }

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
                                        if (allowDirectNpcInteractionWhenUnreachable) {
                                            openNpcChat(npcFigure.id, shouldAutoPlayNpc);
                                        }
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
                                        if (allowDirectNpcInteractionWhenUnreachable) {
                                            openNpcChat(npcFigure.id, shouldAutoPlayNpc);
                                        }
                                        return;
                                    }
                                    if (path.length === 0) {
                                        const arrivalCenterX = targetBase.x;
                                        if (
                                            Math.abs(arrivalCenterX - npcCenterX) <=
                                            NPC_CHAT_OPEN_DISTANCE
                                        ) {
                                            openNpcChat(npcFigure.id, shouldAutoPlayNpc);
                                        } else if (allowDirectNpcInteractionWhenUnreachable) {
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
                                disabled={
                                    showOnboardingOverlay
                                        ? !isOnboardingNpcTarget(npcFigure.id)
                                        : isIntroGuideOpen
                                }
                            />
                        ) : null}
                    </div>
                );
            })}
            {artifacts.map((artifact, index) => {
                const isNear = nearArtifactIndex === index;
                const isHovered = hoveredArtifactIndex === index;
                const isHighlighted = isNear || isHovered;
                return (
                    <div
                        key={artifact.id}
                        className="absolute"
                        style={artifact.position}
                        data-ui="true"
                        onMouseEnter={() => setHoveredArtifactIndex(index)}
                        onMouseLeave={() =>
                            setHoveredArtifactIndex((currentIndex) =>
                                currentIndex === index ? null : currentIndex
                            )
                        }
                    >
                        <button
                            type="button"
                            className="block w-full cursor-pointer border-0 bg-transparent p-0"
                            aria-label={`Open artifact drawer for ${artifact.title}`}
                            onClick={(event) => {
                                event.stopPropagation();
                                setHoveredArtifactIndex(index);
                                openArtifactDrawerById(artifact.id);
                            }}
                        >
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
                                    filter: isHighlighted
                                        ? "drop-shadow(1px 0 0 #ffff00) drop-shadow(-1px 0 0 #ffff00) drop-shadow(0 1px 0 #ffff00) drop-shadow(0 -1px 0 #ffff00) drop-shadow(1px 1px 0 #ffff00) drop-shadow(-1px 1px 0 #ffff00) drop-shadow(1px -1px 0 #ffff00) drop-shadow(-1px -1px 0 #ffff00) drop-shadow(0 -2px 6px rgba(255, 255, 0, 0.7)) drop-shadow(0 -6px 12px rgba(255, 255, 0, 0.35))"
                                        : "none",
                                    transition: "filter 120ms ease",
                                    animationDelay: "1500ms",
                                }}
                                draggable={false}
                            />
                        </button>
                    </div>
                );
            })}
            {isDrawerOpen && activeArtifact ? (
                <div
                    className="ai-chat-drawer-overlay"
                    role="dialog"
                    aria-modal="true"
                    data-ui="true"
                    style={{
                        padding: "clamp(0.75rem, 3vw, 1.5rem)",
                    }}
                >
                    <div
                        className="artifact-drawer-shell relative z-10"
                        style={{
                            width: "min(76vw, 1100px)",
                            maxWidth: "calc(100vw - 1.5rem)",
                        }}
                    >
                        {isOnboardingArtifactTarget(
                            activeArtifact.id,
                            "artifact-close"
                        ) ? (
                            <div className="absolute left-full top-6 z-[141] ml-4 max-w-[260px]">
                                <SceneOnboardingBubble
                                    callout={currentOnboardingCallout!}
                                />
                            </div>
                        ) : null}
                        <div
                            className="artifact-drawer-panel pixel-corners"
                            style={{
                                width: "100%",
                                height: "78vh",
                                maxHeight: "calc(100vh - 1.5rem)",
                                overflow: "hidden",
                                display: "flex",
                                flexDirection: "column",
                                background: "#d27d2c",
                            }}
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <div className="artifact-label">
                                        Learn About This Object
                                    </div>
                                    <div className="mt-2 text-sm uppercase tracking-[0.3em] text-[#b5a79e]">
                                        Artifact
                                    </div>
                                </div>
                                <div className="relative">
                                    <button
                                        type="button"
                                        className={`pixel-corners flex h-12 w-12 items-center justify-center border border-[#7a1010] bg-[#d94141] text-2xl leading-none text-[#fff4dc] ${isOnboardingArtifactTarget(
                                            activeArtifact.id,
                                            "artifact-close"
                                        )
                                            ? "scene-onboarding-focus scene-onboarding-focus--hud scene-onboarding-focus--artifact-action"
                                            : ""}`}
                                        onClick={() => {
                                            completeOnboardingStep({
                                                type: "artifact-close",
                                                artifactId: activeArtifact.id,
                                            });
                                            setIsDrawerOpen(false);
                                        }}
                                        aria-label="Close drawer"
                                        style={{
                                            flexShrink: 0,
                                            outline:
                                                drawerFocus === "close" ? "2px solid #ffff00" : "none",
                                            outlineOffset: "2px",
                                        }}
                                    >
                                        ×
                                    </button>
                                </div>
                            </div>
                            <div
                                className="mt-4 grid min-h-0 flex-1 gap-4"
                                style={{
                                    gridTemplateColumns: "minmax(0, 0.46fr) minmax(0, 0.54fr)",
                                }}
                            >
                                <div className="flex min-h-0 flex-col gap-4">
                                    <div className="pixel-corners flex min-h-0 flex-1 flex-col rounded-2xl border border-[#3b2f28] bg-[#140c1c] p-3">
                                        <div className="artifact-label mb-2 text-center text-xl text-[#f6eada] sm:text-2xl">
                                            {activeArtifact.title}
                                        </div>
                                        <div className="flex min-h-0 flex-1 items-center justify-center">
                                            <img
                                                src={activeArtifact.detailImage ?? activeArtifact.image}
                                                alt={activeArtifact.detailAlt ?? activeArtifact.alt}
                                                className="h-auto w-full rounded-xl"
                                                style={{
                                                    maxHeight: "100%",
                                                    objectFit: "contain",
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="pixel-corners rounded-2xl border border-[#3b2f28] bg-[#140c1c] p-4 text-[0.95rem] leading-normal">
                                        <button
                                            type="button"
                                            className="artifact-label artifact-button pixel-corners w-full rounded-full border border-[#bfae82] px-4 py-2 uppercase tracking-[0.2em]"
                                            style={{
                                                background:
                                                    drawerFocus === "roots" ? "#ffff00" : "#1a1513",
                                                color: drawerFocus === "roots" ? "#1a1513" : undefined,
                                            }}
                                            onClick={() => openArtifactSourcePage(activeArtifact)}
                                        >
                                            {activeArtifactSourceLabel}
                                        </button>
                                    </div>
                                </div>
                                <div className="pixel-corners min-h-0 overflow-hidden rounded-2xl border border-[#3b2f28] bg-[#f6d07d] p-4 text-[1.05rem] leading-relaxed text-[#1a1513] sm:p-5">
                                    <div className="artifact-label text-xl text-[#1a1513] sm:text-2xl">
                                        About this object
                                    </div>
                                    <p className="mt-3 text-[clamp(1.08rem,0.68vw+0.9rem,1.28rem)] leading-[1.28]">
                                        {activeArtifact.description}
                                    </p>
                                    {activeArtifact.details ? (
                                        <p className="mt-3 text-[clamp(1.08rem,0.68vw+0.9rem,1.28rem)] leading-[1.28]">
                                            {activeArtifact.details}
                                        </p>
                                    ) : null}
                                    {activeArtifact.didYouKnow ? (
                                        <div className="pixel-corners mt-4 rounded-2xl border border-[#3b2f28] bg-[#f6eada] p-4 text-[#1a1513]">
                                            <div className="artifact-label text-lg text-[#1a1513] sm:text-xl">
                                                Did you know?
                                            </div>
                                            <p className="mt-2 text-[clamp(1rem,0.58vw+0.85rem,1.14rem)] leading-[1.28]">
                                                {activeArtifact.didYouKnow}
                                            </p>
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
            {!shouldHideRadarPanel ? (
                <div
                    className={`absolute right-6 top-6 inventory-rise-in ${showOnboardingOverlay ? "z-[140]" : "z-10"}`}
                    data-ui="true"
                >
                    {showOnboardingOverlay &&
                        currentOnboardingCallout?.target.type === "disposition-radar" ? (
                        <div className="absolute right-full top-1/2 z-[140] mr-5 -translate-y-1/2">
                            <SceneOnboardingBubble callout={currentOnboardingCallout} />
                        </div>
                    ) : null}
                    <div
                        className={`scene-hud-focus-shell relative ${isOnboardingHudTarget("radar") ? "scene-onboarding-focus scene-onboarding-focus--hud" : ""}`}
                    >
                        <DispositionRadarPanel
                            className={`scene-radar-panel ${isOnboardingHudTarget("radar") ? "scene-radar-panel--interactive" : ""}`.trim()}
                            selectedCharacterCode={selectedCharacterCode}
                            role={isOnboardingHudTarget("radar") ? "button" : undefined}
                            tabIndex={isOnboardingHudTarget("radar") ? 0 : undefined}
                            onClick={
                                isOnboardingHudTarget("radar")
                                    ? (event) => {
                                        event.stopPropagation();
                                        completeOnboardingStep({ type: "disposition-radar" });
                                    }
                                    : undefined
                            }
                            onKeyDown={
                                isOnboardingHudTarget("radar")
                                    ? (event) => {
                                        if (
                                            event.key !== "Enter" &&
                                            event.key !== " " &&
                                            event.key !== "Spacebar"
                                        ) {
                                            return;
                                        }
                                        event.preventDefault();
                                        event.stopPropagation();
                                        completeOnboardingStep({ type: "disposition-radar" });
                                    }
                                    : undefined
                            }
                        />
                    </div>
                </div>
            ) : null}
            <div
                className={`absolute bottom-10 left-10 flex gap-3 hud-rise-in ${showOnboardingOverlay ? "z-[140]" : "z-10"}`}
                data-ui="true"
            >
                {showOnboardingOverlay &&
                    currentOnboardingCallout?.target.type === "menu-help" ? (
                    <div className="absolute bottom-full left-1/2 mb-5 -translate-x-1/2">
                        <SceneOnboardingBubble callout={currentOnboardingCallout} />
                    </div>
                ) : null}
                <div
                    className={`scene-hud-focus-shell relative z-[140] flex gap-3 ${isOnboardingHudTarget("menu-help") ? "scene-onboarding-focus scene-onboarding-focus--hud" : ""}`}
                >
                    <div className="ui-button-shell pixel-corners--wrapper">
                        <button
                            type="button"
                            className="ui-button ui-button--secondary pixel-corners"
                            aria-label="Menu"
                            onClick={() => {
                                if (showOnboardingOverlay) {
                                    if (completeOnboardingStep({ type: "menu-help" })) return;
                                    return;
                                }
                                if (isRouteLoadingRef.current) return;
                                setIsIntroGuideOpen(false);
                                setIsMenuOpen(true);
                            }}
                            disabled={
                                showOnboardingOverlay
                                    ? !isOnboardingHudTarget("menu-help")
                                    : isIntroGuideOpen
                            }
                        >
                            <span className="ui-button-icon">≡</span>
                        </button>
                    </div>
                    <div className="ui-button-shell pixel-corners--wrapper">
                        <button
                            type="button"
                            className="ui-button ui-button--secondary pixel-corners"
                            aria-label="Help"
                            onClick={() => {
                                if (showOnboardingOverlay) {
                                    if (completeOnboardingStep({ type: "menu-help" })) return;
                                    return;
                                }
                                if (!sceneIntroGuide) return;
                                if (isRouteLoadingRef.current) return;
                                openSceneGuide();
                            }}
                            disabled={
                                showOnboardingOverlay
                                    ? !isOnboardingHudTarget("menu-help")
                                    : isIntroGuideOpen
                            }
                        >
                            <span className="ui-button-icon">?</span>
                        </button>
                    </div>
                </div>
            </div>
            <div
                className={`absolute bottom-10 right-10 flex flex-col items-center gap-2 hud-rise-in ${showOnboardingOverlay ? "z-[140]" : "z-10"}`}
                data-ui="true"
            >
                {showOnboardingOverlay &&
                    currentOnboardingCallout?.target.type === "map" ? (
                    <div className="absolute bottom-full left-1/2 z-[140] mb-5 -translate-x-1/2">
                        <SceneOnboardingBubble callout={currentOnboardingCallout} />
                    </div>
                ) : null}
                <div
                    className={`scene-hud-focus-shell flex flex-col items-center gap-2 ${isOnboardingHudTarget("map") ? "scene-onboarding-focus scene-onboarding-focus--hud" : ""}`}
                >
                    <div className="scene-map-label artifact-label text-center text-xl sm:text-2xl">
                        {mapLabel}
                    </div>
                    <div className="ui-button-shell pixel-corners--wrapper">
                        <button
                            type="button"
                            className="ui-button ui-button--map pixel-corners"
                            aria-label="Map"
                            onClick={() => {
                                if (showOnboardingOverlay) {
                                    if (completeOnboardingStep({ type: "map" })) return;
                                    return;
                                }
                                walkToMapAndNavigate();
                            }}
                            disabled={
                                showOnboardingOverlay
                                    ? !isOnboardingHudTarget("map")
                                    : isIntroGuideOpen
                            }
                        >
                            <span className="ui-button-icon">{mapEmoji}</span>
                        </button>
                    </div>
                </div>
            </div>
            <GameMenuOverlay
                isOpen={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
                onNavigate={handleMenuNavigation}
            />
            {showOnboardingOverlay ? (
                <div
                    className="pointer-events-none absolute inset-0 z-[120]"
                    data-ui="true"
                >
                    <div className="absolute left-1/2 top-6 -translate-x-1/2">
                        <div className="scene-onboarding-header pixel-corners">
                            <div className="scene-onboarding-kicker">
                                Step {onboardingStepNumber} of {onboardingStepCount}
                            </div>
                            <div className="scene-onboarding-title">
                                {sceneOnboarding?.title ?? sceneIntroGuide.title ?? "Tutorial"}
                            </div>
                            <div className="pointer-events-auto mt-3 flex justify-center">
                                <button
                                    type="button"
                                    className="scene-onboarding-dismiss-button artifact-label artifact-button pixel-corners flex items-center justify-center rounded-full border px-5 py-2"
                                    onClick={() => {
                                        setIsIntroGuideOpen(false);
                                        setActiveOnboardingStepIndex(-1);
                                        setShowOnboardingCompletionNotice(false);
                                    }}
                                >
                                    Skip tutorial
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : showOnboardingCompletionNotice ? (
                <div
                    className="pointer-events-none absolute inset-x-0 top-24 z-[145]"
                    data-ui="true"
                >
                    <div className="mx-auto w-fit">
                        <div className="scene-onboarding-completion-popup pixel-corners">
                            <span className="scene-onboarding-completion-popup__eyebrow">
                                All good!
                            </span>
                            <span className="scene-onboarding-completion-popup__message">
                                You&apos;re ready to start.
                            </span>
                            <div className="pointer-events-auto mt-3 flex justify-center">
                                <button
                                    type="button"
                                    className="scene-onboarding-completion-popup__button scene-onboarding-dismiss-button artifact-label artifact-button pixel-corners flex items-center justify-center rounded-full border px-5 py-2"
                                    onClick={() => setShowOnboardingCompletionNotice(false)}
                                    autoFocus
                                >
                                    OK!
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : isIntroGuideOpen && sceneIntroGuide ? (
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
                                className="scene-intro-guide-dismiss-button artifact-label artifact-button pixel-corners flex items-center gap-2 rounded-full border border-[#6c4600] bg-[#ffd24a] px-5 py-2 uppercase tracking-[0.2em] text-[#000000]"
                                onClick={() => setIsIntroGuideOpen(false)}
                                autoFocus
                            >
                                {(sceneIntroGuide.dismissLabel ?? "Ok, got it!") === "Start Exploring" ? (
                                    <Image
                                        src="/icons/see-artefact-icon.png"
                                        alt=""
                                        width={28}
                                        height={28}
                                        aria-hidden="true"
                                        className="scene-intro-guide-dismiss-icon"
                                    />
                                ) : null}
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
                        <div className="scene-route-loading-title">Loading Scene</div>
                        <div className="scene-route-loading-subtitle">
                            Getting the next scene ready...
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
