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
import { CHARACTER_LABELS, type CharacterCode } from "./scenes";
import {
    buildArtifactInteractionKey,
    buildNpcInteractionKey,
    registerDispositionInteraction,
} from "./disposition-state";
import { GameMenuOverlay } from "./game-menu-overlay";
import {
    MERLION_CITY_HALL_TUTORIAL_MESSAGE,
    MERLION_IDLE_HELP_MESSAGE,
    getMerlionArtifactNudgeMessage,
    getMerlionNpcNudgeMessage,
    getMerlionSceneDefaultMessage,
    getMerlionSideQuestNpcNudgeMessage,
} from "./merlion-checkpoints";
import { SceneCameraButton, SceneTitleWithCamera } from "./scene-title-with-camera";
import { getStoryStepByRoute } from "./story-data";
import { QuestMenuLightbox, SideQuestLightbox } from "./sidequest-lightboxes";
import {
    GLOBAL_SIDE_QUESTS,
    STUDENT_HUNGRY_BUS_WORKERS_ACTIONS,
    STUDENT_HUNGRY_BUS_WORKERS_SIDE_QUEST_ID,
    acceptSideQuest,
    completeSideQuestAction,
    useAcceptedSideQuestIds,
    useCompletedSideQuestActions,
} from "./sidequest-state";

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
const DIALOGUE_BUBBLE_WIDTH = "var(--hl-dialogue-bubble-width)";
const CHARACTER_ENTRY_CHAT_DEFAULT_DELAY_MS = 2100;
const CHARACTER_ENTRY_CHAT_DEFAULT_DURATION_MS = 3200;
const ONBOARDING_COMPLETION_NOTICE_DURATION_MS = 6000;
const MERLION_CHAT_EXIT_ANIMATION_MS = 260;

const STUDENT_TINGKAT_FOLDER = "ongkimchuan ";
const STUDENT_TINGKAT_IDLE_SPRITE = `/character-figures/${encodeURIComponent(
    STUDENT_TINGKAT_FOLDER
)}/tingkat/${encodeURIComponent("CS with tingkat.webp")}`;
const STUDENT_TINGKAT_WALKING_FRAMES = Array.from({ length: 8 }, (_, index) => {
    const frame = String(index + 1).padStart(4, "0");
    return `/character-figures/${encodeURIComponent(
        STUDENT_TINGKAT_FOLDER
    )}/tingkat/${encodeURIComponent("CS with tingkat walking")}/${encodeURIComponent(
        `CS with Tingkat walking_${frame}.webp`
    )}`;
});
const DEFAULT_CHARACTER_INITIAL_Y_RATIO = 0.66;
const LEGACY_CHARACTER_INITIAL_Y_RATIO = 0.55;
const MIN_DERIVED_CHARACTER_INITIAL_Y_RATIO = DEFAULT_CHARACTER_INITIAL_Y_RATIO;
const MAX_DERIVED_CHARACTER_INITIAL_Y_RATIO = 0.74;

type Point = { x: number; y: number };

const ArtifactDrawerFrame = () => {
    return (
        <svg
            className="artifact-drawer-frame"
            width="1205"
            height="800"
            viewBox="0 0 1205 800"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            aria-hidden="true"
        >
            <g filter="url(#artifact-book-filter-left)">
                <path d="M16.0228 28.5059H605V800H542.707V791.86H18.6071V783.72H9.82042V775.58H0V41.6204H16.0228V28.5059Z" fill="#603204" />
            </g>
            <path d="M602.5 31.0059V797.5H545.207V789.36H21.1074V781.22H12.3203V773.08H2.5V44.1201H18.5225V31.0059H602.5Z" stroke="#111110" strokeWidth="5" />
            <path d="M501.93 22.7295L504.91 32.4492L505.452 34.2168H523.361V44.3252H546.496V51.2178H555.96V60.4082H599.601V774.511H594.085V769.916H574.889V774.511H489.979V769.916H27.5469V766.5H24.1309V44.3252H36.75V22.7295H501.93Z" fill="#8F887B" stroke="#111110" strokeWidth="5" />
            <path d="M525.025 12.3848L528.008 22.1182L528.55 23.8857H546.474V34.0068H569.627V40.9072H579.098V50.1084H598.567V771.98H580.677V775.201H576.205V771.98H556.21V768.761H536.214V765.08H513.062V760.479H50.2695V757H46.8535V34.0068H59.4824V12.3848H525.025Z" fill="#BEB6A4" stroke="#111110" strokeWidth="5" />
            <path d="M540.089 2.5L540.374 11.5723L540.45 13.9941H558.603V24.1094H581.327V31.0059H590.623V40.2012H602.5V774.512H593.556V764.856H576.514V758.879H564.12V754.741H525.904V750.144H72.4771V746.5H68.3452V24.1094H80.7397V2.5H540.089Z" fill="#EEE3CD" stroke="#111110" strokeWidth="5" />
            <path d="M579.179 47.3688H558.011M558.011 37.7074H538.471M538.471 27.5859H122.71V47.3688H109.141V55.65H89.6016V696.522H108.598V708.023H123.796V725.046H534.129M534.129 734.247H566.153M566.153 742.988H576.465M97.2003 715.844H105.342M104.799 37.7074H93.9437" stroke="#BEB6A4" strokeWidth="8" />
            <path d="M592.864 42.5L593.381 762.5H595.963V772H600.094V42.5H592.864Z" fill="#5F5B52" />
            <path d="M579.179 33.1719L588.474 33.1719V42.7031H593.639V762.333H579.179L579.179 33.1719Z" fill="#BEB6A4" />
            <g filter="url(#artifact-book-filter-right)">
                <path d="M1188.98 28.5059H600V800H662.293V791.86H1186.39V783.72H1195.18V775.58H1205V41.6204H1188.98V28.5059Z" fill="#603204" />
            </g>
            <path d="M602.5 31.0059V797.5H659.793V789.36H1183.89V781.22H1192.68V773.08H1202.5V44.1201H1186.48V31.0059H602.5Z" stroke="#111110" strokeWidth="5" />
            <path d="M703.07 22.7295L700.09 32.4492L699.548 34.2168H681.639V44.3252H658.504V51.2178H649.04V60.4082H605.399V774.511H610.915V769.916H630.111V774.511H715.021V769.916H1177.45V766.5H1180.87V44.3252H1168.25V22.7295H703.07Z" fill="#8F887B" stroke="#111110" strokeWidth="5" />
            <path d="M679.975 12.3848L676.992 22.1182L676.45 23.8857H658.526V34.0068H635.373V40.9072H625.902V50.1084H606.433V771.98H624.323V775.201H628.795V771.98H648.79V768.761H668.786V765.08H691.938V760.479H1154.73V757H1158.15V34.0068H1145.52V12.3848H679.975Z" fill="#BEB6A4" stroke="#111110" strokeWidth="5" />
            <path d="M664.911 2.5L664.626 11.5723L664.55 13.9941H646.397V24.1094H623.673V31.0059H614.377V40.2012H602.5V774.512H611.444V764.856H628.486V758.879H640.88V754.741H679.096V750.144H1132.52V746.5H1136.65V24.1094H1124.26V2.5H664.911Z" fill="#EEE3CD" stroke="#111110" strokeWidth="5" />
            <path d="M625.821 47.3688H646.989M646.989 37.7074H666.529M666.529 27.5859H1082.29V47.3688H1095.86V55.65H1115.4V696.522H1096.4V708.023H1081.2V725.046H670.871M670.871 734.247H638.847M638.847 742.988H628.535M1107.8 715.844H1099.66M1100.2 37.7074H1111.06" stroke="#BEB6A4" strokeWidth="8" />
            <path d="M612.136 42.5L611.619 762.5H609.037V772H604.906V42.5H612.136Z" fill="#5F5B52" />
            <path d="M625.821 33.1719L616.526 33.1719V42.7031H611.361V762.333H625.821L625.821 33.1719Z" fill="#BEB6A4" />
            <defs>
                <filter id="artifact-book-filter-left" x="0" y="28.5059" width="605" height="771.494" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dx="10" dy="-10" />
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" />
                    <feBlend mode="normal" in2="shape" result="effect1_innerShadow_1223_6438" />
                </filter>
                <filter id="artifact-book-filter-right" x="600" y="28.5059" width="605" height="771.494" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dx="10" dy="-10" />
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" />
                    <feBlend mode="normal" in2="shape" result="effect1_innerShadow_1223_6438" />
                </filter>
            </defs>
        </svg>
    );
};

const clamp = (value: number, min: number, max: number) =>
    Math.min(Math.max(value, min), max);

const distance = (a: Point, b: Point) => Math.hypot(a.x - b.x, a.y - b.y);

const disposeAudioElement = (audio: HTMLAudioElement | null) => {
    if (!audio) return;
    audio.pause();
    audio.src = "";
};

const FRONT_FACING_NPC_IMAGE_OVERRIDES: Record<string, string> = {
    "/npcfigures/leekuanyew/LeeKwanYew_East.webp":
        "/npcfigures/leekuanyew/LeeKuanYew_South.webp",
    "/npcfigures/leekuanyew/LeeKwanYew_West.webp":
        "/npcfigures/leekuanyew/LeeKuanYew_South.webp",
    "/npcfigures/busdepotworker3/Bus Worker 02_0002.webp":
        "/npcfigures/busdepotworker3/Bus Worker 02_0001.webp",
    "/npcfigures/busdepotworker3/Bus Worker 02_0003.webp":
        "/npcfigures/busdepotworker3/Bus Worker 02_0001.webp",
    "/npcfigures/busdepotworker3/Bus Worker 02_0004.webp":
        "/npcfigures/busdepotworker3/Bus Worker 02_0001.webp",
};

const NPC_DIRECTION_FILENAME_PATTERN =
    /_(?:north(?: east| west)?|south(?: east| west)?|east(?: south)?|west|wests)(?=\.[^/.]+$)/i;
const NPC_LOWERCASE_DIRECTION_FILENAME_PATTERN =
    /\/(?:north|south|east|west)(?=\.[^/.]+$)/i;

const resolveFrontFacingNpcImage = (imageSrc: string) => {
    const override = FRONT_FACING_NPC_IMAGE_OVERRIDES[imageSrc];
    if (override) return override;

    if (NPC_DIRECTION_FILENAME_PATTERN.test(imageSrc)) {
        return imageSrc.replace(NPC_DIRECTION_FILENAME_PATTERN, "_South");
    }

    if (NPC_LOWERCASE_DIRECTION_FILENAME_PATTERN.test(imageSrc)) {
        return imageSrc.replace(NPC_LOWERCASE_DIRECTION_FILENAME_PATTERN, "/south");
    }

    return imageSrc;
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

type ArtifactDrawerChatMessage = {
    id: string;
    sender: "user";
    text: string;
};

type MerlionChatMessage = {
    id: string;
    sender: "merlion" | "user";
    text: string;
};

const MERLION_CHAT_PROMPTS = [
    "About the Story",
    "About Game Play",
    "Ask for a Hint",
] as const;

const MERLION_PROMPT_QUESTIONS: Record<(typeof MERLION_CHAT_PROMPTS)[number], string> = {
    "About the Story": "Tell me about the story in this scene.",
    "About Game Play": "How should I play this scene?",
    "Ask for a Hint": "Can I have a hint?",
};

const buildMerlionQuestionReply = ({
    question,
    sceneLocationLabel,
    sceneTitle,
    hasSceneArtifactInteractions,
    hasSceneNpcInteractions,
    hasInteractedWithSceneArtifact,
    hasInteractedWithSceneNpc,
}: {
    question: string;
    sceneLocationLabel: string;
    sceneTitle: string;
    hasSceneArtifactInteractions: boolean;
    hasSceneNpcInteractions: boolean;
    hasInteractedWithSceneArtifact: boolean;
    hasInteractedWithSceneNpc: boolean;
}) => {
    const normalizedQuestion = question.toLowerCase();
    const locationLabel = sceneLocationLabel || sceneTitle;

    if (
        normalizedQuestion.includes("hint") ||
        normalizedQuestion.includes("stuck") ||
        normalizedQuestion.includes("what should")
    ) {
        if (hasSceneNpcInteractions && !hasInteractedWithSceneNpc) {
            return `Hint: talk to someone at ${locationLabel}. Their perspective can reveal what people are worried about and what choices matter next.`;
        }

        if (hasSceneArtifactInteractions && !hasInteractedWithSceneArtifact) {
            return `Hint: inspect an artefact at ${locationLabel}. Artefacts give clues about daily life, politics, and the pressures behind the Hock Lee Bus Riots.`;
        }

        return `Hint: you have checked the key interactions here. Use the camera for the real-world reference, or open the map when you are ready to continue.`;
    }

    if (
        normalizedQuestion.includes("game") ||
        normalizedQuestion.includes("play") ||
        normalizedQuestion.includes("control") ||
        normalizedQuestion.includes("move") ||
        normalizedQuestion.includes("map")
    ) {
        return `Click around ${locationLabel} to move, speak to highlighted characters, inspect artefacts, and use the camera icon to compare the game scene with historical references.`;
    }

    if (
        normalizedQuestion.includes("story") ||
        normalizedQuestion.includes("history") ||
        normalizedQuestion.includes("riot") ||
        normalizedQuestion.includes("hock lee")
    ) {
        return `${locationLabel} is one part of the Hock Lee Bus Riots timeline. Pay attention to who has power, who feels ignored, and how each group explains the conflict.`;
    }

    if (
        normalizedQuestion.includes("artefact") ||
        normalizedQuestion.includes("artifact") ||
        normalizedQuestion.includes("object")
    ) {
        return `Artefacts in ${locationLabel} connect the scene to real evidence from 1950s Singapore. Open them to learn what the objects reveal about the people and events around you.`;
    }

    return `Good question. In ${locationLabel}, look for what people say, what objects reveal, and how your character's point of view shapes the same historical event.`;
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

type SceneNpcChatBubbleAction = {
    label: string;
    sideQuestId: string;
    actionId?: string;
    requiredCompletedActionIds?: string[];
    hideWhenAccepted?: boolean;
    availableText?: string;
    completedText?: string;
    openQuestAfterComplete?: boolean;
};

type SceneSideQuestActionTrigger = {
    sideQuestId: string;
    actionId: string;
    requiredCompletedActionIds?: string[];
};

export type SceneSideQuest = {
    id: string;
    title: string;
    typeLabel: string;
    iconSrc?: string;
    iconAlt?: string;
    description: string;
    previewImage?: string;
    previewAlt?: string;
    previewNpcImage?: string;
    previewNpcAlt?: string;
    previewCardTitle?: string;
    previewCardImage?: string;
    previewCardImageAlt?: string;
    actions: {
        id: string;
        label: string;
        iconSrc?: string;
        iconAlt?: string;
    }[];
    laterLabel?: string;
    acceptLabel?: string;
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
    sideQuestActionOnOpen?: SceneSideQuestActionTrigger;
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
    chatBubbleAction?: SceneNpcChatBubbleAction;
    chatBubbleActions?: SceneNpcChatBubbleAction[];
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
    characterDialoguePortraitSprite?: string;
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
    sideQuests?: SceneSideQuest[];
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

type ExtendedDialogueOverlayProps = {
    npcFigure: SceneNpcFigure;
    npcImageSrc: string;
    npcSpeakerName: string;
    playerName: string;
    playerImageSrc: string;
    playerImageFallbackSrcs?: string[];
    playerAlt: string;
    speaker: "npc" | "player";
    text: string;
    choices?: SceneNpcDialogueChoice[];
    onAdvance: () => void;
    onChoiceSelect: (choice: SceneNpcDialogueChoice) => void;
};

const ExtendedDialogueOverlay = ({
    npcFigure,
    npcImageSrc,
    npcSpeakerName,
    playerName,
    playerImageSrc,
    playerImageFallbackSrcs = [],
    playerAlt,
    speaker,
    text,
    choices = [],
    onAdvance,
    onChoiceSelect,
}: ExtendedDialogueOverlayProps) => {
    const hasChoices = choices.length > 0;
    const speakerName = speaker === "player" ? playerName : npcSpeakerName;

    return (
        <div
            className={`extended-dialogue-overlay extended-dialogue-overlay--${speaker}`}
            data-ui="true"
            role="dialog"
            aria-label={`${speakerName} dialogue`}
            onClick={(event) => {
                event.stopPropagation();
                if (hasChoices) return;
                onAdvance();
            }}
        >
            <div className="extended-dialogue-scrim" />
            <img
                src={npcImageSrc}
                alt={npcFigure.alt}
                className="extended-dialogue-portrait extended-dialogue-portrait--npc"
                draggable={false}
            />
            <img
                src={playerImageSrc}
                alt={playerAlt}
                className="extended-dialogue-portrait extended-dialogue-portrait--player"
                draggable={false}
                onError={(event) => {
                    const image = event.currentTarget;
                    const fallbackIndex = Number(image.dataset.fallbackIndex ?? "0");
                    const nextSrc = playerImageFallbackSrcs[fallbackIndex];
                    if (!nextSrc) return;
                    image.dataset.fallbackIndex = String(fallbackIndex + 1);
                    image.src = nextSrc;
                }}
            />
            <div className={`extended-dialogue-panel extended-dialogue-panel--${speaker}`}>
                <div className="double-one-step-multicolor extended-dialogue-nameplate-frame">
                    <div className="extended-dialogue-nameplate one-step-border__content">{speakerName}</div>
                </div>
                <div className="double-one-step extended-dialogue-box-frame">
                    <div className="extended-dialogue-box one-step-border__content">
                        {hasChoices ? (
                            <div className="extended-dialogue-choices">
                                {choices.map((choice) => (
                                    <button
                                        key={choice.id}
                                        type="button"
                                        className="extended-dialogue-choice"
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            onChoiceSelect(choice);
                                        }}
                                    >
                                        {choice.label}
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <>
                                <span className="extended-dialogue-text">{text}</span>
                                <span className="extended-dialogue-advance" aria-hidden="true" />
                            </>
                        )}
                    </div>
                </div>
            </div>
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
    const [drawerFocus, setDrawerFocus] = useState<"close">("close");
    const [activeNpcId, setActiveNpcId] = useState<string | null>(null);
    const [activeSideQuestId, setActiveSideQuestId] = useState<string | null>(null);
    const [isQuestMenuOpen, setIsQuestMenuOpen] = useState(false);
    const acceptedSideQuestIds = useAcceptedSideQuestIds();
    const completedSideQuestActions = useCompletedSideQuestActions();
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
    const [artifactChatInputsById, setArtifactChatInputsById] = useState<Record<string, string>>(
        {}
    );
    const [artifactChatMessagesById, setArtifactChatMessagesById] = useState<
        Record<string, ArtifactDrawerChatMessage[]>
    >({});
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
    const [isMerlionChatOpen, setIsMerlionChatOpen] = useState(false);
    const [isMerlionChatClosing, setIsMerlionChatClosing] = useState(false);
    const [merlionCheckpointMessage, setMerlionCheckpointMessage] = useState<string | null>(
        null
    );
    const [idleMerlionMessage, setIdleMerlionMessage] = useState<string | null>(null);
    const [merlionChatInput, setMerlionChatInput] = useState("");
    const [merlionChatMessages, setMerlionChatMessages] = useState<MerlionChatMessage[]>(
        []
    );
    const [hasInteractedWithSceneArtifact, setHasInteractedWithSceneArtifact] =
        useState(false);
    const [hasInteractedWithSceneNpc, setHasInteractedWithSceneNpc] = useState(false);
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
    const drawerFocusRef = useRef<"close">("close");
    const artifactChatScrollRef = useRef<HTMLDivElement | null>(null);
    const merlionChatScrollRef = useRef<HTMLDivElement | null>(null);
    const merlionChatCloseTimeoutRef = useRef<number | null>(null);
    const npcDialogueReplyTimeoutByIdRef = useRef<Record<string, number>>({});
    const ambientAudioRef = useRef<HTMLAudioElement | null>(null);
    const interactionAudioRef = useRef<HTMLAudioElement | null>(null);
    const pendingAmbientPlaybackRef = useRef(false);
    const pendingInteractionPlaybackRef = useRef(false);
    const shownMapExitNudgesRef = useRef<Set<string>>(new Set());
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
    const characterDialoguePortraitSprite = config.characterDialoguePortraitSprite;
    const characterSpriteBasePath =
        config.characterSpriteBasePath ?? "/character-figures/rajivmenon";
    const characterSprites = config.characterSprites;
    const selectedCharacterCode = config.selectedCharacterCode ?? "BW";
    const merlionPlayerName = CHARACTER_LABELS[selectedCharacterCode] ?? characterName;
    const mapRoute = config.mapRoute ?? "/hock-lee-bus-riots-pixel/map";
    const mapLabel = config.mapLabel ?? "MAP";
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
    const currentStoryStep = useMemo(
        () => getStoryStepByRoute(selectedCharacterCode, pathname),
        [pathname, selectedCharacterCode]
    );
    const sceneLocationLabel = currentStoryStep?.locationLabel ?? sceneTitle;
    const sceneNodeKey = currentStoryStep?.nodeKey ?? null;
    const hasSceneArtifactInteractions = useMemo(
        () =>
            sceneArtifacts.length > 0 &&
            (
                showArtifacts ||
                npcFigures.some((npcFigure) => {
                    const chatBubbleLines = getNpcChatBubbleLines(npcFigure);
                    return getNpcType(npcFigure, chatBubbleLines.length > 0) === "artifact";
                })
            ),
        [npcFigures, sceneArtifacts.length, showArtifacts]
    );
    const hasSceneNpcInteractions = useMemo(
        () =>
            npcFigures.some((npcFigure) => {
                const chatBubbleLines = getNpcChatBubbleLines(npcFigure);
                return getNpcType(npcFigure, chatBubbleLines.length > 0) === "interactive";
            }),
        [npcFigures]
    );
    const sceneMerlionDefaultMessage =
        sceneNodeKey === "city-hall"
            ? MERLION_CITY_HALL_TUTORIAL_MESSAGE
            : getMerlionSceneDefaultMessage(sceneLocationLabel);
    const merlionChatMessage =
        idleMerlionMessage ?? merlionCheckpointMessage ?? sceneMerlionDefaultMessage;
    const isMerlionChatVisible = isMerlionChatOpen || isMerlionChatClosing;
    const scrollMerlionChatToBottom = useCallback(() => {
        const scrollElement = merlionChatScrollRef.current;
        if (!scrollElement) return;
        scrollElement.scrollTop = scrollElement.scrollHeight;
    }, []);
    const openMerlionChatPanel = useCallback(() => {
        if (merlionChatCloseTimeoutRef.current !== null) {
            window.clearTimeout(merlionChatCloseTimeoutRef.current);
            merlionChatCloseTimeoutRef.current = null;
        }
        setIsMerlionChatClosing(false);
        setIsMerlionChatOpen(true);
    }, []);
    const closeMerlionChatPanel = useCallback(() => {
        if (merlionChatCloseTimeoutRef.current !== null) {
            window.clearTimeout(merlionChatCloseTimeoutRef.current);
        }
        setIsMerlionChatClosing(true);
        merlionChatCloseTimeoutRef.current = window.setTimeout(() => {
            setIsMerlionChatOpen(false);
            setIsMerlionChatClosing(false);
            merlionChatCloseTimeoutRef.current = null;
        }, MERLION_CHAT_EXIT_ANIMATION_MS);
    }, []);
    const sendMerlionChatMessage = useCallback(
        (presetQuestion?: string) => {
            const text = (presetQuestion ?? merlionChatInput).trim();
            if (!text) return;

            const timestamp = Date.now();
            const reply = buildMerlionQuestionReply({
                question: text,
                sceneLocationLabel,
                sceneTitle,
                hasSceneArtifactInteractions,
                hasSceneNpcInteractions,
                hasInteractedWithSceneArtifact,
                hasInteractedWithSceneNpc,
            });

            setMerlionChatMessages((prev) => [
                ...prev,
                {
                    id: `${timestamp}-user`,
                    sender: "user",
                    text,
                },
                {
                    id: `${timestamp}-merlion`,
                    sender: "merlion",
                    text: reply,
                },
            ]);
            setMerlionChatInput("");

            window.requestAnimationFrame(scrollMerlionChatToBottom);
        },
        [
            hasInteractedWithSceneArtifact,
            hasInteractedWithSceneNpc,
            hasSceneArtifactInteractions,
            hasSceneNpcInteractions,
            merlionChatInput,
            sceneLocationLabel,
            sceneTitle,
            scrollMerlionChatToBottom,
        ]
    );
    const showOnboardingOverlay = isIntroGuideOpen && Boolean(currentOnboardingCallout);
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
    useEffect(() => {
        return () => {
            if (merlionChatCloseTimeoutRef.current !== null) {
                window.clearTimeout(merlionChatCloseTimeoutRef.current);
            }
        };
    }, []);
    useEffect(() => {
        if (!isMerlionChatVisible) return;
        if (merlionChatMessages.length === 0) return;
        window.requestAnimationFrame(scrollMerlionChatToBottom);
    }, [isMerlionChatVisible, merlionChatMessages.length, scrollMerlionChatToBottom]);
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
                openMerlionChatPanel();
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
    }, [openMerlionChatPanel]);
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
    const studentTingkatCompletedActionIds =
        completedSideQuestActions[STUDENT_HUNGRY_BUS_WORKERS_SIDE_QUEST_ID] ?? [];
    const isCarryingTingkat =
        selectedCharacterCode === "CS" &&
        studentTingkatCompletedActionIds.includes(
            STUDENT_HUNGRY_BUS_WORKERS_ACTIONS.findTingkat
        ) &&
        !studentTingkatCompletedActionIds.includes(
            STUDENT_HUNGRY_BUS_WORKERS_ACTIONS.deliverFood
        );
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

        if (isCarryingTingkat) {
            if (isWalking && cardinalDirection === "east" && characterSprites) {
                const eastWalkingFrames = characterSprites.walking?.east;
                if (eastWalkingFrames && eastWalkingFrames.length > 0) {
                    return eastWalkingFrames[walkFrame % eastWalkingFrames.length];
                }
            }
            if (isWalking && STUDENT_TINGKAT_WALKING_FRAMES.length > 0) {
                return STUDENT_TINGKAT_WALKING_FRAMES[
                    walkFrame % STUDENT_TINGKAT_WALKING_FRAMES.length
                ];
            }
            return STUDENT_TINGKAT_IDLE_SPRITE;
        }

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
    }, [
        characterSpriteBasePath,
        characterSprites,
        direction,
        isCarryingTingkat,
        isWalking,
        walkFrame,
    ]);
    const dialoguePortraitSpriteSrc = useMemo(() => {
        if (characterDialoguePortraitSprite) return characterDialoguePortraitSprite;
        if (!characterSprites) return `${characterSpriteBasePath}/south-west.png`;
        if (characterSprites) return characterSprites.idle.south;
        return `${characterSpriteBasePath}/south.png`;
    }, [characterDialoguePortraitSprite, characterSpriteBasePath, characterSprites]);
    const dialoguePortraitFallbackSpriteSrcs = useMemo(() => {
        const fallbackSrcs = characterSprites
            ? [characterSprites.idle.south]
            : [`${characterSpriteBasePath}/south-west.png`, `${characterSpriteBasePath}/south.png`];

        return fallbackSrcs.filter(
            (fallbackSrc, index) =>
                fallbackSrc !== dialoguePortraitSpriteSrc &&
                fallbackSrcs.indexOf(fallbackSrc) === index
        );
    }, [characterSpriteBasePath, characterSprites, dialoguePortraitSpriteSrc]);
    const activeNpcFigure = useMemo(() => {
        if (!activeNpcId) return null;
        return npcFigures.find((candidate) => candidate.id === activeNpcId) ?? null;
    }, [activeNpcId, npcFigures]);
    const activeNpcChatBubbleLines = activeNpcFigure
        ? getNpcChatBubbleLines(activeNpcFigure)
        : [];
    const activeNpcChatBubbleIndex =
        activeNpcFigure && activeNpcChatBubbleLines.length > 0
            ? (npcChatCycleIndex[activeNpcFigure.id] ?? 0) %
              activeNpcChatBubbleLines.length
            : 0;
    const activeNpcType = activeNpcFigure
        ? getNpcType(activeNpcFigure, activeNpcChatBubbleLines.length > 0)
        : "non-interactive";
    const activeNpcUsesExtendedDialogue =
        Boolean(activeNpcFigure) &&
        activeNpcType === "interactive" &&
        (activeNpcChatBubbleLines.length > 1 ||
            (activeNpcFigure?.dialogueChoices?.length ?? 0) > 0);
    const activeDialogueNpc = useMemo(() => {
        const npcFigure = activeNpcFigure;
        if (!npcFigure || !npcFigure.dialogueChoices || npcFigure.dialogueChoices.length === 0) {
            return null;
        }
        return npcFigure;
    }, [activeNpcFigure]);
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
        !activeNpcUsesExtendedDialogue &&
        (
            (!activeDialogueSelectedChoice && activeDialogueChoicesVisible) ||
            (activeDialogueSelectedChoice && !activeDialogueReplyVisible)
        );
    const activeExtendedDialogueChoices =
        activeNpcUsesExtendedDialogue &&
        activeDialogueNpc &&
        !activeDialogueSelectedChoice &&
        activeDialogueChoicesVisible
            ? activeDialogueChoices
            : [];
    const activeExtendedDialogueSpeaker =
        activeNpcUsesExtendedDialogue &&
        (
            activeExtendedDialogueChoices.length > 0 ||
            (activeDialogueSelectedChoice && !activeDialogueReplyVisible)
        )
            ? "player"
            : "npc";
    const activeExtendedDialogueText =
        activeNpcUsesExtendedDialogue && activeDialogueSelectedChoice
            ? activeDialogueReplyVisible
                ? activeDialogueSelectedChoice.npcReply
                : activeDialogueSelectedChoice.playerText ?? activeDialogueSelectedChoice.label
            : activeNpcUsesExtendedDialogue && !activeDialogueChoicesVisible
                ? activeNpcChatBubbleLines[activeNpcChatBubbleIndex] ?? ""
                : "";
    const activeExtendedDialogueNpcImage =
        activeNpcFigure
            ? resolveFrontFacingNpcImage(
                  activeNpcFigure.imageOnChatOpen ?? activeNpcFigure.image
              )
            : "";
    const activeExtendedDialogueNpcSpeaker =
        activeNpcFigure?.chatBubbleSpeaker ?? activeNpcFigure?.name ?? "NPC";
    const shouldRenderExtendedDialogueOverlay =
        Boolean(activeNpcFigure) &&
        activeNpcUsesExtendedDialogue &&
        (
            activeExtendedDialogueText.length > 0 ||
            activeExtendedDialogueChoices.length > 0
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
    const sideQuestById = useMemo(
        () =>
            new Map(
                [...GLOBAL_SIDE_QUESTS, ...(config.sideQuests ?? [])].map((sideQuest) => [
                    sideQuest.id,
                    sideQuest,
                ])
            ),
        [config.sideQuests]
    );
    const activeSideQuest = activeSideQuestId
        ? sideQuestById.get(activeSideQuestId) ?? null
        : null;
    const acceptedSideQuests = acceptedSideQuestIds
        .filter(() => selectedCharacterCode === "CS")
        .map((sideQuestId) => sideQuestById.get(sideQuestId))
        .filter((sideQuest): sideQuest is SceneSideQuest => Boolean(sideQuest));
    const isSideQuestAccepted = useCallback(
        (sideQuestId: string) => acceptedSideQuestIds.includes(sideQuestId),
        [acceptedSideQuestIds]
    );
    const getCompletedSideQuestActionIds = useCallback(
        (sideQuestId: string) => completedSideQuestActions[sideQuestId] ?? [],
        [completedSideQuestActions]
    );
    const areSideQuestActionRequirementsMet = useCallback(
        (trigger: Pick<SceneSideQuestActionTrigger, "sideQuestId" | "requiredCompletedActionIds">) => {
            const completedActionIds = getCompletedSideQuestActionIds(trigger.sideQuestId);
            return (trigger.requiredCompletedActionIds ?? []).every((actionId) =>
                completedActionIds.includes(actionId)
            );
        },
        [getCompletedSideQuestActionIds]
    );
    const isSideQuestActionComplete = useCallback(
        (sideQuestId: string, actionId: string) =>
            getCompletedSideQuestActionIds(sideQuestId).includes(actionId),
        [getCompletedSideQuestActionIds]
    );
    const activeSideQuestCompletedActionIds = activeSideQuest
        ? getCompletedSideQuestActionIds(activeSideQuest.id)
        : [];
    const isActiveSideQuestAccepted = activeSideQuest
        ? isSideQuestAccepted(activeSideQuest.id)
        : false;
    const activeArtifactChatInput = artifactChatInputsById[activeArtifact.id] ?? "";
    const activeArtifactChatMessages = artifactChatMessagesById[activeArtifact.id] ?? [];
    const scrollActiveArtifactChatToBottom = useCallback(() => {
        const scrollElement = artifactChatScrollRef.current;
        if (!scrollElement) return;
        scrollElement.scrollTop = scrollElement.scrollHeight;
    }, []);
    const sendArtifactChatMessage = useCallback(() => {
        const text = (artifactChatInputsById[activeArtifact.id] ?? "").trim();
        if (!text) return;

        setArtifactChatMessagesById((prev) => ({
            ...prev,
            [activeArtifact.id]: [
                ...(prev[activeArtifact.id] ?? []),
                {
                    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
                    sender: "user",
                    text,
                },
            ],
        }));
        setArtifactChatInputsById((prev) => ({
            ...prev,
            [activeArtifact.id]: "",
        }));

        window.requestAnimationFrame(scrollActiveArtifactChatToBottom);
    }, [activeArtifact.id, artifactChatInputsById, scrollActiveArtifactChatToBottom]);
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
                const hasChatBubble = getNpcChatBubbleLines(npcFigure).length > 0;
                const npcType = getNpcType(npcFigure, hasChatBubble);
                if (npcType === "artifact") {
                    setHasInteractedWithSceneArtifact(true);
                } else if (npcType === "interactive") {
                    setHasInteractedWithSceneNpc(true);
                }
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
    const advanceActiveExtendedDialogue = useCallback(() => {
        if (!activeNpcFigure || !activeNpcUsesExtendedDialogue) return;

        if (activeDialogueNpc) {
            if (activeDialogueSelectedChoice) {
                if (!activeDialogueReplyVisible) {
                    setNpcDialogueReplyVisibleById((prev) => ({
                        ...prev,
                        [activeDialogueNpc.id]: true,
                    }));
                    return;
                }

                finishNpcChat(activeDialogueNpc.id);
                return;
            }

            if (!activeDialogueChoicesVisible) {
                setNpcDialogueChoicesVisibleById((prev) => ({
                    ...prev,
                    [activeDialogueNpc.id]: true,
                }));
            }
            return;
        }

        advanceNpcChat(
            activeNpcFigure.id,
            activeNpcChatBubbleIndex,
            activeNpcChatBubbleLines.length
        );
    }, [
        activeDialogueChoicesVisible,
        activeDialogueNpc,
        activeDialogueReplyVisible,
        activeDialogueSelectedChoice,
        activeNpcChatBubbleIndex,
        activeNpcChatBubbleLines.length,
        activeNpcFigure,
        activeNpcUsesExtendedDialogue,
        advanceNpcChat,
        finishNpcChat,
    ]);
    const openArtifactDrawerById = useCallback(
        (artifactId: string | undefined) => {
            if (!artifactId) return;
            const artifactIndex = sceneArtifacts.findIndex(
                (artifact) => artifact.id === artifactId
            );
            if (artifactIndex < 0) return;
            const artifact = sceneArtifacts[artifactIndex];
            setHasInteractedWithSceneArtifact(true);
            registerArtifactDispositionInteraction(artifactId);
            if (
                artifact.sideQuestActionOnOpen &&
                isSideQuestAccepted(artifact.sideQuestActionOnOpen.sideQuestId) &&
                areSideQuestActionRequirementsMet(artifact.sideQuestActionOnOpen)
            ) {
                completeSideQuestAction(
                    artifact.sideQuestActionOnOpen.sideQuestId,
                    artifact.sideQuestActionOnOpen.actionId
                );
            }
            pendingRouteRef.current = null;
            pendingNpcInteractionRef.current = null;
            pendingArtifactNpcInteractionRef.current = null;
            setActiveArtifactIndex(artifactIndex);
            playInteractionSound(artifact?.interactionSound);
            setDrawerFocus("close");
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
            areSideQuestActionRequirementsMet,
            isSideQuestAccepted,
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
    const showMapExitNudgeIfNeeded = useCallback(() => {
        const nudgeCandidates: { key: string; message: string }[] = [];
        const hasInactiveStudentBusDepotQuest =
            selectedCharacterCode === "CS" &&
            sceneNodeKey === "bus-depot" &&
            !acceptedSideQuestIds.includes(STUDENT_HUNGRY_BUS_WORKERS_SIDE_QUEST_ID);

        if (hasInactiveStudentBusDepotQuest) {
            nudgeCandidates.push({
                key: "student-bus-depot-side-quest",
                message: getMerlionSideQuestNpcNudgeMessage("Bus worker"),
            });
        }

        if (hasSceneArtifactInteractions && !hasInteractedWithSceneArtifact) {
            nudgeCandidates.push({
                key: "scene-artifacts",
                message: getMerlionArtifactNudgeMessage(sceneLocationLabel),
            });
        }

        if (hasSceneNpcInteractions && !hasInteractedWithSceneNpc) {
            nudgeCandidates.push({
                key: "scene-npcs",
                message: getMerlionNpcNudgeMessage(sceneNodeKey),
            });
        }

        const nextNudge = nudgeCandidates.find(
            (candidate) => !shownMapExitNudgesRef.current.has(candidate.key)
        );
        if (!nextNudge) return false;

        shownMapExitNudgesRef.current.add(nextNudge.key);
        setMerlionCheckpointMessage(nextNudge.message);
        openMerlionChatPanel();
        return true;
    }, [
        acceptedSideQuestIds,
        hasInteractedWithSceneArtifact,
        hasInteractedWithSceneNpc,
        hasSceneArtifactInteractions,
        hasSceneNpcInteractions,
        sceneLocationLabel,
        sceneNodeKey,
        selectedCharacterCode,
        openMerlionChatPanel,
    ]);
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
        if (!isDrawerOpen) return;
        window.requestAnimationFrame(scrollActiveArtifactChatToBottom);
    }, [
        activeArtifact.id,
        activeArtifactChatMessages.length,
        isDrawerOpen,
        scrollActiveArtifactChatToBottom,
    ]);

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
        if (!activeSideQuest) return;

        const handleSideQuestKeys = (event: KeyboardEvent) => {
            if (event.key !== "Escape") return;
            event.preventDefault();
            setActiveSideQuestId(null);
        };

        window.addEventListener("keydown", handleSideQuestKeys);
        return () => window.removeEventListener("keydown", handleSideQuestKeys);
    }, [activeSideQuest]);

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
                }
                return;
            }

            if (event.key === "Escape") {
                setIsDrawerOpen(false);
                return;
            }

            if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
                setDrawerFocus("close");
                return;
            }

            if (event.key === "ArrowDown" || event.key === "ArrowRight") {
                setDrawerFocus("close");
                return;
            }
        };

        window.addEventListener("keydown", handleDrawerKeys);
        return () => window.removeEventListener("keydown", handleDrawerKeys);
    }, [isDrawerOpen]);

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
                    <SceneTitleWithCamera>{sceneTitle}</SceneTitleWithCamera>
                    <div className="pixel-corners--wrapper">
                        <div className="pixel-corners scene-subtitle">{sceneSubtitle}</div>
                    </div>
                    {isMerlionChatVisible ? (
                        <section
                            id="scene-merlion-chat"
                            className={`hl-merlion-chat-panel-frame double-one-step ${isMerlionChatClosing ? "hl-merlion-chat-panel-frame--closing" : ""}`}
                            aria-label="Game Master Merlion chat"
                            data-ui="true"
                        >
                            <div className="hl-merlion-chat-panel one-step-border__content">
                                <header className="hl-merlion-chat-panel__header">
                                    <img
                                        src="/character-profile-pics/merlion.png"
                                        alt=""
                                        aria-hidden="true"
                                        className="hl-merlion-chat-panel__avatar"
                                        draggable={false}
                                    />
                                    <div className="hl-merlion-chat-panel__title">
                                        Game Master Merlion
                                    </div>
                                    <button
                                        type="button"
                                        className="hl-merlion-chat-panel__close"
                                        aria-label="Close Game Master Merlion chat"
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            closeMerlionChatPanel();
                                        }}
                                    >
                                        ×
                                    </button>
                                </header>
                                <div className="hl-merlion-chat-panel__rule" />
                                <div
                                    className="hl-merlion-chat-panel__messages"
                                    ref={merlionChatScrollRef}
                                    aria-live="polite"
                                >
                                    <div className="hl-merlion-chat-panel__intro">
                                        <p>
                                            Hello, {merlionPlayerName}. I&apos;m Game Master
                                            Merlion. I&apos;m here to guide you through
                                            Singapore&apos;s past, answer your questions, and
                                            help you understand the people, places, and events
                                            you meet in the game.
                                        </p>
                                        <p>{merlionChatMessage}</p>
                                    </div>
                                    {merlionChatMessages.map((message) => (
                                        <div
                                            key={message.id}
                                            className={`hl-merlion-chat-panel__bubble hl-merlion-chat-panel__bubble--${message.sender}`}
                                        >
                                            {message.text}
                                        </div>
                                    ))}
                                </div>
                                <div className="hl-merlion-chat-panel__prompts">
                                    {MERLION_CHAT_PROMPTS.map((prompt) => (
                                        <button
                                            key={prompt}
                                            type="button"
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                sendMerlionChatMessage(
                                                    MERLION_PROMPT_QUESTIONS[prompt]
                                                );
                                            }}
                                        >
                                            {prompt}
                                        </button>
                                    ))}
                                </div>
                                <form
                                    className="hl-merlion-chat-panel__composer"
                                    onSubmit={(event) => {
                                        event.preventDefault();
                                        event.stopPropagation();
                                        sendMerlionChatMessage();
                                    }}
                                >
                                    <input
                                        type="text"
                                        value={merlionChatInput}
                                        onChange={(event) => {
                                            setMerlionChatInput(event.target.value);
                                        }}
                                        placeholder="Type a question to Game Master"
                                        aria-label="Type a question to Game Master Merlion"
                                    />
                                    <button type="submit">Send</button>
                                </form>
                            </div>
                        </section>
                    ) : null}
                </div>
                {!isMerlionChatVisible ? (
                    <div className="scene-panel-merlion" data-ui="true">
                        <div className="hl-merlion-hud-anchor">
                            <button
                                type="button"
                                className="hl-merlion-hud-button"
                                aria-label="Talk to Merlion"
                                aria-expanded={isMerlionChatVisible}
                                aria-controls="scene-merlion-chat"
                                onClick={(event) => {
                                    event.stopPropagation();
                                    openMerlionChatPanel();
                                }}
                                disabled={showOnboardingOverlay && !isOnboardingHudTarget("map")}
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
                ) : null}
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
            <div
                className={`scene-camera-controls ${showOnboardingOverlay ? "z-[140]" : "z-10"}`}
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
                    <div className="absolute right-full top-1/2 z-[140] mr-4 -translate-y-1/2">
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
                                : ""}`
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
                    opacity: shouldRenderExtendedDialogueOverlay ? 0 : undefined,
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
                    opacity: shouldRenderExtendedDialogueOverlay ? 0 : undefined,
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
                const usesExtendedDialogue =
                    !isArtifactNpc && (isCyclingDialogue || hasDialogueChoices);
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
                const chatBubbleActionCandidates = [
                    ...(npcFigure.chatBubbleActions ?? []),
                    ...(npcFigure.chatBubbleAction ? [npcFigure.chatBubbleAction] : []),
                ];
                const completedChatBubbleAction = chatBubbleActionCandidates.find(
                    (action) =>
                        action.actionId &&
                        action.completedText &&
                        isSideQuestActionComplete(action.sideQuestId, action.actionId)
                );
                const activeChatBubbleAction = chatBubbleActionCandidates.find((action) => {
                    const isAccepted = isSideQuestAccepted(action.sideQuestId);
                    if (action.hideWhenAccepted && isAccepted) return false;
                    if ((action.actionId || action.requiredCompletedActionIds?.length) && !isAccepted) {
                        return false;
                    }
                    if (action.actionId && isSideQuestActionComplete(action.sideQuestId, action.actionId)) {
                        return false;
                    }
                    return areSideQuestActionRequirementsMet(action);
                });
                const sideQuestAwareChatBubbleText =
                    activeChatBubbleAction?.availableText ??
                    completedChatBubbleAction?.completedText ??
                    displayedChatBubbleText;
                const fallbackArtifactChatText = isArtifactNpc
                    ? linkedArtifact?.description ??
                    linkedArtifact?.title ??
                    "Take a closer look at this object."
                    : "";
                const bubbleText = sideQuestAwareChatBubbleText || fallbackArtifactChatText;
                const displayedChatSpeaker =
                    npcFigure.chatBubbleSpeaker ??
                    (isArtifactNpc && !hasChatBubble ? linkedArtifact?.title : undefined);
                const hasChatBubbleAction = Boolean(activeChatBubbleAction);
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
                const shouldHideSceneNpcForExtendedDialogue =
                    isChatOpen && usesExtendedDialogue;
                const shouldRenderNpcBubble =
                    isChatOpen &&
                    !usesExtendedDialogue &&
                    (bubbleText.length > 0 || isArtifactNpc);
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
                    opacity: shouldHideSceneNpcForExtendedDialogue ? 0 : undefined,
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
                        className={`absolute npc-figure ${isInteractiveNpc ? "npc-figure--chat" : "npc-figure--non-interactive"} ${isArtifactNpc ? "npc-figure--artifact" : ""} ${isChatOpen ? "npc-figure--chat-open" : ""} ${shouldHideSceneNpcForExtendedDialogue ? "npc-figure--scene-hidden-during-dialogue" : ""} ${onboardingNpcCallout ? "scene-onboarding-focus scene-onboarding-focus--npc" : ""} ${npcFigure.className ?? ""}`}
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
                                            hasChatBubbleAction ||
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
                                    {activeChatBubbleAction ? (
                                        <button
                                            type="button"
                                            className="npc-chat-action-button pixel-corners"
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                if (activeChatBubbleAction.actionId) {
                                                    completeSideQuestAction(
                                                        activeChatBubbleAction.sideQuestId,
                                                        activeChatBubbleAction.actionId
                                                    );
                                                    if (activeChatBubbleAction.openQuestAfterComplete) {
                                                        setActiveSideQuestId(
                                                            activeChatBubbleAction.sideQuestId
                                                        );
                                                    }
                                                    return;
                                                }
                                                setActiveSideQuestId(activeChatBubbleAction.sideQuestId);
                                            }}
                                            data-ui="true"
                                        >
                                            {activeChatBubbleAction.label}
                                        </button>
                                    ) : null}
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
            {shouldRenderExtendedDialogueOverlay && activeNpcFigure ? (
                <ExtendedDialogueOverlay
                    npcFigure={activeNpcFigure}
                    npcImageSrc={activeExtendedDialogueNpcImage}
                    npcSpeakerName={activeExtendedDialogueNpcSpeaker}
                    playerName={characterName}
                    playerImageSrc={dialoguePortraitSpriteSrc}
                    playerImageFallbackSrcs={dialoguePortraitFallbackSpriteSrcs}
                    playerAlt={characterAlt}
                    speaker={activeExtendedDialogueSpeaker}
                    text={activeExtendedDialogueText}
                    choices={activeExtendedDialogueChoices}
                    onAdvance={advanceActiveExtendedDialogue}
                    onChoiceSelect={(choice) => {
                        if (!activeDialogueNpc) return;
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
                />
            ) : null}
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
            {isQuestMenuOpen ? (
                <QuestMenuLightbox
                    sideQuests={acceptedSideQuests}
                    completedSideQuestActions={completedSideQuestActions}
                    onClose={() => setIsQuestMenuOpen(false)}
                    onQuestSelect={(sideQuestId) => {
                        setIsQuestMenuOpen(false);
                        setActiveSideQuestId(sideQuestId);
                    }}
                />
            ) : null}
            {activeSideQuest ? (
                <SideQuestLightbox
                    sideQuest={activeSideQuest}
                    completedActionIds={activeSideQuestCompletedActionIds}
                    isAccepted={isActiveSideQuestAccepted}
                    onClose={() => setActiveSideQuestId(null)}
                    onAccept={() => {
                        acceptSideQuest(activeSideQuest.id);
                        setActiveSideQuestId(null);
                    }}
                    onBack={
                        isActiveSideQuestAccepted
                            ? () => {
                                  setActiveSideQuestId(null);
                                  setIsQuestMenuOpen(true);
                              }
                            : undefined
                    }
                />
            ) : null}
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
                            width: "min(90vw, 1205px)",
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
                            className="artifact-drawer-panel artifact-drawer-panel--framed"
                            style={{
                                width: "100%",
                                height: "min(78vh, 800px)",
                                maxHeight: "calc(100vh - 1.5rem)",
                                overflow: "hidden",
                                display: "flex",
                                flexDirection: "column",
                                position: "relative",
                                border: 0,
                                borderRadius: 0,
                                background: "transparent",
                                boxShadow: "none",
                                color: "#1a1513",
                                padding: "clamp(2.1rem, 3.25vw, 4.75rem) clamp(2.3rem, 5.5vw, 5.75rem)",
                            }}
                        >
                            <ArtifactDrawerFrame />
                            <button
                                type="button"
                                className={`artifact-drawer-close hl-pixel-close-button ${isOnboardingArtifactTarget(
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
                                style={
                                    drawerFocus === "close"
                                        ? {
                                            outline: "2px solid #ffff00",
                                            outlineOffset: "2px",
                                        }
                                        : undefined
                                }
                            >
                                ×
                            </button>
                            <div
                                className="artifact-drawer-panel__content"
                                style={{
                                    position: "relative",
                                    zIndex: 1,
                                    display: "flex",
                                    minHeight: 0,
                                    height: "100%",
                                    flex: 1,
                                    flexDirection: "column",
                                }}
                            >
                            <div className="artifact-drawer-header flex items-start gap-4">
                                <div className="min-w-0">
                                    <div className="artifact-label artifact-drawer-kicker">
                                        Artefact
                                    </div>
                                </div>
                            </div>
                            <div
                                className="artifact-drawer-pages mt-3 grid min-h-0 flex-1 gap-4"
                                style={{
                                    gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
                                }}
                            >
                                <div className="artifact-book-page artifact-book-page--left flex min-h-0 flex-col gap-4">
                                    <div className="artifact-book-preview flex min-h-0 flex-1 flex-col">
                                        <div className="artifact-label mb-3 text-3xl leading-none text-[#111110] sm:text-4xl">
                                            {activeArtifact.title}
                                        </div>
                                        <div className="flex min-h-0 flex-1 items-center justify-center">
                                            <img
                                                src={activeArtifact.detailImage ?? activeArtifact.image}
                                                alt={activeArtifact.detailAlt ?? activeArtifact.alt}
                                                className="artifact-book-preview__image h-auto w-full"
                                                style={{
                                                    maxHeight: "100%",
                                                    objectFit: "contain",
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="artifact-book-page artifact-book-page--right min-h-0 overflow-auto text-[1.05rem] leading-relaxed text-[#5a2a08]">
                                    <div className="artifact-chat-stack">
                                        <div
                                            className="artifact-chat-scroll"
                                            ref={artifactChatScrollRef}
                                        >
                                            <div className="artifact-chat-copy">
                                                <p>{activeArtifact.description}</p>
                                                {activeArtifact.details ? (
                                                    <p>{activeArtifact.details}</p>
                                                ) : null}
                                                {activeArtifact.didYouKnow ? (
                                                    <p>{activeArtifact.didYouKnow}</p>
                                                ) : null}
                                            </div>
                                            <div className="artifact-chat-bubble artifact-chat-bubble--user">
                                                {activeArtifact.chat.user1}
                                            </div>
                                            <div className="artifact-chat-copy">
                                                <p>{activeArtifact.chat.master2}</p>
                                            </div>
                                            {activeArtifactChatMessages.map((message) => (
                                                <div
                                                    key={message.id}
                                                    className="artifact-chat-bubble artifact-chat-bubble--user"
                                                >
                                                    {message.text}
                                                </div>
                                            ))}
                                        </div>
                                        <div className="artifact-chat-actions">
                                            <button type="button">Questions for Artefact</button>
                                            <button type="button">Questions for Artefact</button>
                                        </div>
                                        <div className="artifact-chat-composer">
                                            <input
                                                type="text"
                                                value={activeArtifactChatInput}
                                                onChange={(event) => {
                                                    setArtifactChatInputsById((prev) => ({
                                                        ...prev,
                                                        [activeArtifact.id]: event.target.value,
                                                    }));
                                                }}
                                                onKeyDown={(event) => {
                                                    if (event.key !== "Enter") return;
                                                    event.preventDefault();
                                                    sendArtifactChatMessage();
                                                }}
                                                placeholder={`Type a question about ${activeArtifact.title}...`}
                                                aria-label={`Type a question about ${activeArtifact.title}`}
                                            />
                                            <button
                                                type="button"
                                                onClick={sendArtifactChatMessage}
                                            >
                                                Send
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            ) : null}
            {acceptedSideQuests.length > 0 ? (
                <div
                    className={`scene-sidequest-controls inventory-rise-in ${showOnboardingOverlay ? "z-[140]" : "z-10"}`}
                    data-ui="true"
                >
                    <div className="scene-sidequest-button-stack">
                        <button
                            type="button"
                            className="scene-sidequest-button"
                            onClick={(event) => {
                                event.stopPropagation();
                                setActiveSideQuestId(null);
                                setIsQuestMenuOpen(true);
                            }}
                            aria-label="Open quest menu"
                        >
                            <img
                                src="/icons/quest.png"
                                alt=""
                                aria-hidden="true"
                                draggable={false}
                            />
                        </button>
                    </div>
                </div>
            ) : null}
            <div
                className={`scene-menu-help-controls hud-rise-in ${showOnboardingOverlay ? "z-[140]" : "z-10"}`}
                data-ui="true"
            >
                {showOnboardingOverlay &&
                    currentOnboardingCallout?.target.type === "menu-help" ? (
                    <div className="absolute right-full top-1/2 mr-4 -translate-y-1/2">
                        <SceneOnboardingBubble callout={currentOnboardingCallout} />
                    </div>
                ) : null}
                <div
                    className={`scene-hud-focus-shell relative z-[140] flex flex-col items-end gap-3 ${isOnboardingHudTarget("menu-help") ? "scene-onboarding-focus scene-onboarding-focus--hud" : ""}`}
                >
                    <div className="ui-button-shell ui-button-shell--menu pixel-corners--wrapper">
                        <button
                            type="button"
                            className="ui-button ui-button--secondary ui-button--menu pixel-corners"
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
                    <button
                        type="button"
                        className="scene-help-button"
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
                        <span className="scene-help-button__mark">?</span>
                    </button>
                </div>
            </div>
            <div
                className={`scene-map-controls hud-rise-in ${showOnboardingOverlay ? "z-[140]" : "z-10"}`}
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
                    <div className="ui-button-shell ui-button-shell--map pixel-corners--wrapper">
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
                            <img
                                src="/icons/map-icon.png"
                                alt=""
                                aria-hidden="true"
                                className="ui-button-icon--image"
                                draggable={false}
                            />
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
