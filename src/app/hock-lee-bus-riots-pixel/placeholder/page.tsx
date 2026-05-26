"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { GameMenuOverlay } from "../game-menu-overlay";
import { SceneCameraButton, SceneTitleWithCamera } from "../scene-title-with-camera";

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
const WALK_FRAME_COUNT = 8;
const WALK_FRAME_MS = 110;
const GRID_SIZE = 28;
const PLAYER_CHARACTER_LABEL_TOP_OFFSET = 6;
const PLAYER_CHARACTER_VISUAL_SCALE_BUMP = 1.05;

type Point = { x: number; y: number };

const clamp = (value: number, min: number, max: number) =>
    Math.min(Math.max(value, min), max);

const distance = (a: Point, b: Point) => Math.hypot(a.x - b.x, a.y - b.y);

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

export default function Scene2Storehall() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [viewportHeight, setViewportHeight] = useState(() =>
        typeof window === "undefined" ? 1080 : window.innerHeight
    );
    const [direction, setDirection] = useState<Direction>("south");
    const [nearArtifactIndex, setNearArtifactIndex] = useState<number | null>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
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
    const [editMode, setEditMode] = useState(false);
    const [polygonPoints, setPolygonPoints] = useState<Point[]>([]);
    const [isPolygonClosed, setIsPolygonClosed] = useState(false);
    const [navPath, setNavPath] = useState<Point[]>([]);
    const [inventorySlots, setInventorySlots] = useState<(string | null)[]>(
        Array.from({ length: 6 }, () => null)
    );
    const [takeMessage, setTakeMessage] = useState("");
    const [drawerFocus, setDrawerFocus] = useState<
        "take" | "leave" | "chat" | "close"
    >("take");
    const [chatInput, setChatInput] = useState("");
    const nearArtifactIndexRef = useRef<number | null>(null);
    const isDrawerOpenRef = useRef(false);
    const isMenuOpenRef = useRef(false);
    const drawerFocusRef = useRef<"take" | "leave" | "chat" | "close">("take");
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
    const renderedCharacterScale =
        characterScale * PLAYER_CHARACTER_VISUAL_SCALE_BUMP;
    const spriteSrc = useMemo(() => {
        if (!isWalking) {
            return `/character-figures/rajivmenon/${direction}.png`;
        }

        const folder =
            direction === "north"
                ? "North"
                : direction === "south"
                    ? "South"
                    : direction === "east"
                        ? "East"
                        : "West";
        const file = `Rajiv-walking-8-frames_${folder.toLowerCase()}-${walkFrame + 1} (dragged).webp`;
        return `/character-figures/rajivmenon/walking/${folder}/${encodeURIComponent(
            file
        )}`;
    }, [direction, isWalking, walkFrame]);
    const sceneTitle = "Placeholder";
    const sceneSubtitle =
        "This storeroom holds party records, campaign materials, and election-related documents during a period of internal tension. The space reflects ongoing administrative strain as political disagreements are recorded...but not resolved.";
    // const artifacts = useMemo(
    //   () => [
    //     {
    //       id: "ong-eng-guan",
    //       title: "Ong Eng Guan’s Political Manifesto",
    //       image: "/artifacts/Ong-Eng-Guan-political-manifesto.png",
    //       alt: "Ong Eng Guan political manifesto",
    //       description:
    //         "A political manifesto associated with Ong Eng Guan — an important figure in early PAP history. Chat to find out more!",
    //       inventoryIndex: 0,
    //       position: {
    //         right: "62%",
    //         bottom: "40%",
    //         width: "170px",
    //       },
    //       chat: {
    //         master1:
    //           "Ong Eng Guan was a leading figure in early PAP politics, known for strong grassroots organizing.",
    //         user1: "Why is his manifesto moving through the store hall?",
    //         master2:
    //           "It signals a contest over messaging. Vendors keep it quiet so it can reach sympathetic readers.",
    //       },
    //     },
    //     {
    //       id: "david-marshall",
    //       title: "David Marshall: For Effective Opposition (1961)",
    //       image: "/artifacts/DavidMarshall_for-Effective-Opposition-1961.png",
    //       alt: "David Marshall for Effective Opposition 1961",
    //       description:
    //         "A 1961 publication arguing for a stronger opposition voice in government debates.",
    //       inventoryIndex: 1,
    //       position: {
    //         left: "42%",
    //         top: "44%",
    //         width: "180px",
    //       },
    //       chat: {
    //         master1:
    //           "David Marshall’s writings captured concerns about balance of power in early governance.",
    //         user1: "Why was this pamphlet stored here?",
    //         master2:
    //           "It circulated among staff who wanted to preserve dissenting views during tense internal debates.",
    //       },
    //     },
    //     {
    //       id: "petir-weekly",
    //       title: "PAP Publication: Petir Weekly (1959)",
    //       image: "/artifacts/PAP_publication_petir_weekly_1959.png",
    //       alt: "PAP publication Petir weekly 1959",
    //       description:
    //         "An issue of Petir Weekly, a PAP publication used to share policy positions and party updates.",
    //       inventoryIndex: 2,
    //       position: {
    //         left: "55%",
    //         top: "56%",
    //         width: "180px",
    //       },
    //       chat: {
    //         master1:
    //           "Petir Weekly was a key tool for communicating policy and party messaging in 1959.",
    //         user1: "What does this issue highlight?",
    //         master2:
    //           "It emphasizes party unity and policy direction after the 1959 election.",
    //       },
    //     },
    //   ],
    //   []
    // );

    const artifacts = useMemo(
        () => [
            {
                id: "ong-eng-guan",
                title: "Ong Eng Guan’s Political Manifesto",
                image: "/artifacts/Ong-Eng-Guan-political-manifesto.png",
                alt: "Ong Eng Guan political manifesto",
                description:
                    "A political manifesto associated with Ong Eng Guan — an important figure in early PAP history. Chat to find out more!",
                inventoryIndex: 0,
                position: {
                    right: "54%",
                    bottom: "43%",
                    width: "170px",
                },
                chat: {
                    master1:
                        "Ong Eng Guan was a leading figure in early PAP politics, known for strong grassroots organizing.",
                    user1: "Why is his manifesto moving through the store hall?",
                    master2:
                        "It signals a contest over messaging. Vendors keep it quiet so it can reach sympathetic readers.",
                },
            },
            {
                id: "david-marshall",
                title: "David Marshall: For Effective Opposition (1961)",
                image: "/artifacts/DavidMarshall_for-Effective-Opposition-1961.png",
                alt: "David Marshall for Effective Opposition 1961",
                description:
                    "A 1961 publication arguing for a stronger opposition voice in government debates.",
                inventoryIndex: 1,
                position: {
                    left: "66%",
                    top: "44%",
                    width: "180px",
                },
                chat: {
                    master1:
                        "David Marshall’s writings captured concerns about balance of power in early governance.",
                    user1: "Why was this pamphlet stored here?",
                    master2:
                        "It circulated among staff who wanted to preserve dissenting views during tense internal debates.",
                },
            },
            {
                id: "petir-weekly",
                title: "PAP Publication: Petir Weekly (1959)",
                image: "/artifacts/PAP_publication_petir_weekly_1959.png",
                alt: "PAP publication Petir weekly 1959",
                description:
                    "An issue of Petir Weekly, a PAP publication used to share policy positions and party updates.",
                inventoryIndex: 2,
                position: {
                    left: "30%",
                    top: "65%",
                    width: "180px",
                },
                chat: {
                    master1:
                        "Petir Weekly was a key tool for communicating policy and party messaging in 1959.",
                    user1: "What does this issue highlight?",
                    master2:
                        "It emphasizes party unity and policy direction after the 1959 election.",
                },
            },
        ],
        []
    );
    const activeArtifact = artifacts[activeArtifactIndex] ?? artifacts[0];

    const toBasePoint = (pos: { x: number; y: number }) => ({
        x: pos.x + CHARACTER_SIZE / 2,
        y: pos.y + CHARACTER_SIZE,
    });
    const toTopLeft = (base: Point) => ({
        x: base.x - CHARACTER_SIZE / 2,
        y: base.y - CHARACTER_SIZE,
    });

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
        const nextX = window.innerWidth * 0.55;
        const nextY = window.innerHeight * 0.7;
        const maxX = Math.max(0, window.innerWidth - CHARACTER_SIZE);
        const maxY = Math.max(0, window.innerHeight - CHARACTER_SIZE);
        setPosition({
            x: Math.min(Math.max(0, nextX), maxX),
            y: Math.min(Math.max(0, nextY), maxY),
        });
        setViewportHeight(window.innerHeight);
    }, []);

    useEffect(() => {
        const handleResize = () => setViewportHeight(window.innerHeight);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        isDrawerOpenRef.current = isDrawerOpen;
    }, [isDrawerOpen]);

    useEffect(() => {
        isMenuOpenRef.current = isMenuOpen;
    }, [isMenuOpen]);

    useEffect(() => {
        drawerFocusRef.current = drawerFocus;
    }, [drawerFocus]);

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

            if (isMenuOpenRef.current) {
                return;
            }

            if (isDrawerOpenRef.current) {
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
                return;
            }

            if (event.key === "Enter") {
                if (nearArtifactIndexRef.current !== null) {
                    setActiveArtifactIndex(nearArtifactIndexRef.current);
                    setTakeMessage("");
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
            }
            if (navPathRef.current.length > 0) {
                setNavPath([]);
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
    }, [router, targetPosition]);

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
        if (!isDrawerOpen) return;

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
                if (drawerFocusRef.current === "take") {
                    setInventorySlots((prev) => {
                        const targetIndex = activeArtifact.inventoryIndex;
                        if (prev[targetIndex]) {
                            setTakeMessage("You already have this artefact!");
                            return prev;
                        }
                        const next = [...prev];
                        next[targetIndex] = activeArtifact.image;
                        setTakeMessage("");
                        return next;
                    });
                    if (!inventorySlots[activeArtifact.inventoryIndex]) {
                        setIsDrawerOpen(false);
                    }
                }
                return;
            }

            if (event.key === "Escape") {
                setIsDrawerOpen(false);
                return;
            }

            if (event.key === "ArrowUp") {
                setDrawerFocus("chat");
                return;
            }

            if (event.key === "ArrowDown") {
                setDrawerFocus((prev) =>
                    prev === "take" || prev === "leave" ? "close" : "take"
                );
                return;
            }

            if (event.key === "ArrowRight") {
                setDrawerFocus((prev) => (prev === "take" ? "leave" : "leave"));
            }

            if (event.key === "ArrowLeft") {
                setDrawerFocus((prev) => (prev === "leave" ? "take" : "take"));
            }
        };

        window.addEventListener("keydown", handleDrawerKeys);
        return () => window.removeEventListener("keydown", handleDrawerKeys);
    }, [isDrawerOpen, activeArtifact]);

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
    }, [targetPosition]);

    useEffect(() => {
        if (!isAutoWalking || !targetPosition) return;

        const dx = targetPosition.x - position.x;
        const absX = Math.abs(dx);
        const threshold = 8;

        if (absX < threshold) {
            setDirection("south");
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
            className="scene2-storehall-page relative min-h-screen overflow-hidden"
            onClick={(event) => {
                if (isDrawerOpenRef.current) return;
                if (!(event.target instanceof HTMLElement)) return;
                if (event.target.closest("[data-ui='true']")) return;

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

                setPressed({ up: false, down: false, left: false, right: false });
                setNavPath(path);
                setTargetPosition(toTopLeft(path[0]));
                setWalkMarker({ x: clickX, y: clickY, id: Date.now() });
            }}
            style={{
                backgroundColor: "#000000",
                backgroundImage: "url(/background/placeholder.png)",
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
                </div>
            </aside>
            <div
                className="scene-camera-controls z-10"
                data-ui="true"
            >
                <SceneCameraButton />
            </div>
            <div
                className="moving-char-label absolute z-10 text-center text-2xl sm:text-3xl character-drop-in"
                style={{
                    left: `${position.x}px`,
                    top: `${position.y + PLAYER_CHARACTER_LABEL_TOP_OFFSET - CHARACTER_SIZE * (renderedCharacterScale - 1)}px`,
                    width: `${CHARACTER_SIZE}px`,
                    transform: "none",
                    pointerEvents: "none",
                    animationDelay: "750ms",
                }}
            >
                Rajiv
            </div>
            <img
                src={spriteSrc}
                alt="Rajiv Menon"
                className="absolute select-none character-drop-in"
                ref={characterRef}
                style={{
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                    width: `${CHARACTER_SIZE}px`,
                    height: `${CHARACTER_SIZE}px`,
                    imageRendering: "pixelated",
                    transform: `scale(${renderedCharacterScale})`,
                    transformOrigin: "bottom center",
                    filter:
                        "drop-shadow(1px 0 0 #ff7700) drop-shadow(-1px 0 0 #ff7700) drop-shadow(0 1px 0 #ff7700) drop-shadow(0 -1px 0 #ff7700) drop-shadow(1px 1px 0 #ff7700) drop-shadow(-1px 1px 0 #ff7700) drop-shadow(1px -1px 0 #ff7700) drop-shadow(-1px -1px 0 #ff7700)",
                    animationDelay: "750ms",
                }}
                draggable={false}
            />
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
            {isDrawerOpen ? (
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
                                        <div className="mt-4 flex gap-3">
                                            <button
                                                type="button"
                                                className="artifact-label artifact-button pixel-corners flex-1 rounded-full border border-[#bfae82] px-4 py-2 uppercase tracking-[0.2em]"
                                                style={{
                                                    background:
                                                        drawerFocus === "take" ? "#ffff00" : "#1a1513",
                                                    color: drawerFocus === "take" ? "#1a1513" : undefined,
                                                }}
                                                onClick={() => {
                                                    setInventorySlots((prev) => {
                                                        const targetIndex = activeArtifact.inventoryIndex;
                                                        if (prev[targetIndex]) {
                                                            setTakeMessage("You already have this artefact!");
                                                            return prev;
                                                        }
                                                        const next = [...prev];
                                                        next[targetIndex] = activeArtifact.image;
                                                        setTakeMessage("");
                                                        return next;
                                                    });
                                                    if (!inventorySlots[activeArtifact.inventoryIndex]) {
                                                        setIsDrawerOpen(false);
                                                    }
                                                }}
                                            >
                                                Take
                                            </button>
                                            <button
                                                type="button"
                                                className="artifact-label artifact-button pixel-corners flex-1 rounded-full border border-[#3b2f28] px-4 py-2 uppercase tracking-[0.2em]"
                                                style={{
                                                    background:
                                                        drawerFocus === "leave" ? "#ffff00" : "transparent",
                                                    color: drawerFocus === "leave" ? "#1a1513" : undefined,
                                                    borderColor: drawerFocus === "leave" ? "#ffff00" : "#3b2f28",
                                                }}
                                            >
                                                Leave
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
                                    {takeMessage ? (
                                        <div className="mt-3 text-[#ffff00]">{takeMessage}</div>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
            <div
                className="scene-menu-help-controls z-10 hud-rise-in"
                data-ui="true"
            >
                <button
                    type="button"
                    className="hud-button hud-button--menu pixel-corners"
                    aria-label="Menu"
                    onClick={() => setIsMenuOpen(true)}
                >
                    <span className="hud-button-icon">≡</span>
                </button>
                <button type="button" className="hud-button pixel-corners" aria-label="Help">
                    <span className="hud-button-icon">?</span>
                </button>
            </div>
            <GameMenuOverlay
                isOpen={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
                onNavigate={(route) => {
                    setIsMenuOpen(false);
                    router.push(route);
                }}
            />
            <style jsx global>{`
        .scene2-storehall-page .scene-title {
          font-size: 48px;
        }

        .scene2-storehall-page .scene-subtitle {
          font-size: 1.4rem;
          line-height: 1.05;
        }

        .scene2-storehall-page .artifact-label {
          font-size: 1.65rem;
        }

        .scene2-storehall-page .artifact-button {
          font-size: 1.7rem;
        }

        .scene2-storehall-page .artifact-drawer-panel {
          font-size: 1.45rem;
        }

        .scene2-storehall-page input[type="text"] {
          font-size: 1.2rem;
        }

        .scene2-storehall-page .inventory-title {
          font-size: 1.4rem;
        }

        .walk-marker {
          position: absolute;
          width: 16px;
          height: 16px;
          border-radius: 9999px;
          border: 2px solid #ffff00;
          transform: translate(-50%, -50%);
          pointer-events: none;
          z-index: 15;
          animation: walk-ping 900ms ease-out forwards;
          box-shadow: 0 0 12px rgba(255, 255, 0, 0.6);
        }

        @keyframes walk-ping {
          0% {
            transform: translate(-50%, -50%) scale(0.4);
            opacity: 0.9;
          }
          70% {
            opacity: 0.6;
          }
          100% {
            transform: translate(-50%, -50%) scale(3.2);
            opacity: 0;
          }
        }
      `}</style>
        </div>
    );
}
