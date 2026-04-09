"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  buildRoleAwareRoute,
  CHARACTER_PRESENTATIONS,
  CUTSCENE_CONTENT_BY_ROLE,
  getNextRouteForCutscene,
  type StoryCutsceneKind,
} from "./story-data";
import {
  getStoredCharacterCode,
  persistCharacterCode,
} from "./scene-config";

type RoleCutscenePageProps = {
  kind: StoryCutsceneKind;
};

export function RoleCutscenePage({ kind }: RoleCutscenePageProps) {
  const searchParams = useSearchParams();
  const selectedCharacter = getStoredCharacterCode(searchParams.get("role"));

  useEffect(() => {
    persistCharacterCode(selectedCharacter);
  }, [selectedCharacter]);

  return (
    <RoleCutsceneShell
      key={`${kind}-${selectedCharacter}`}
      kind={kind}
      selectedCharacter={selectedCharacter}
    />
  );
}

type RoleCutsceneShellProps = {
  kind: StoryCutsceneKind;
  selectedCharacter: ReturnType<typeof getStoredCharacterCode>;
};

function RoleCutsceneShell({
  kind,
  selectedCharacter,
}: RoleCutsceneShellProps) {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(-1);
  const [visibleWordCount, setVisibleWordCount] = useState(0);
  const [prevParagraph, setPrevParagraph] = useState<string | null>(null);
  const [isPrevVisible, setIsPrevVisible] = useState(false);
  const [playerInput, setPlayerInput] = useState("");
  const [isContinueHighlighted, setIsContinueHighlighted] = useState(false);
  const [isContinueHovered, setIsContinueHovered] = useState(false);
  const startTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const nextTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wordIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const merlionBubbleRef = useRef<HTMLDivElement | null>(null);
  const cutscene = CUTSCENE_CONTENT_BY_ROLE[selectedCharacter][kind];
  const paragraphs = useMemo(() => cutscene.paragraphs, [cutscene.paragraphs]);

  useEffect(() => {
    startTimeoutRef.current = setTimeout(() => {
      setActiveIndex(0);
      setVisibleWordCount(0);
    }, 3000);

    return () => {
      if (startTimeoutRef.current) {
        clearTimeout(startTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    let resetWordsTimeout: ReturnType<typeof setTimeout> | null = null;
    let showPrevParagraphTimeout: ReturnType<typeof setTimeout> | null = null;
    let hidePrevParagraphTimeout: ReturnType<typeof setTimeout> | null = null;

    if (wordIntervalRef.current) {
      clearInterval(wordIntervalRef.current);
    }
    if (nextTimeoutRef.current) {
      clearTimeout(nextTimeoutRef.current);
    }

    if (activeIndex < 0 || activeIndex >= paragraphs.length) {
      return undefined;
    }

    const words = paragraphs[activeIndex].split(" ");
    resetWordsTimeout = setTimeout(() => {
      setVisibleWordCount(0);
    }, 0);
    if (merlionBubbleRef.current) {
      merlionBubbleRef.current.scrollTop = 0;
    }
    if (activeIndex > 0) {
      showPrevParagraphTimeout = setTimeout(() => {
        setPrevParagraph(paragraphs[activeIndex - 1]);
        setIsPrevVisible(true);
      }, 0);
      hidePrevParagraphTimeout = setTimeout(() => {
        setIsPrevVisible(false);
      }, 50);
    }

    wordIntervalRef.current = setInterval(() => {
      setVisibleWordCount((prev) => {
        if (prev + 1 >= words.length) {
          if (wordIntervalRef.current) {
            clearInterval(wordIntervalRef.current);
          }
          nextTimeoutRef.current = setTimeout(() => {
            if (activeIndex + 1 < paragraphs.length) {
              setActiveIndex(activeIndex + 1);
            }
          }, 5000);
          return words.length;
        }
        return prev + 1;
      });
    }, 120);

    return () => {
      if (wordIntervalRef.current) {
        clearInterval(wordIntervalRef.current);
      }
      if (nextTimeoutRef.current) {
        clearTimeout(nextTimeoutRef.current);
      }
      if (resetWordsTimeout) {
        clearTimeout(resetWordsTimeout);
      }
      if (showPrevParagraphTimeout) {
        clearTimeout(showPrevParagraphTimeout);
      }
      if (hidePrevParagraphTimeout) {
        clearTimeout(hidePrevParagraphTimeout);
      }
    };
  }, [activeIndex, paragraphs]);

  const continueRoute = buildRoleAwareRoute(
    getNextRouteForCutscene(selectedCharacter, kind),
    selectedCharacter
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement) {
        return;
      }
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setIsContinueHighlighted(true);
        return;
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        setIsContinueHighlighted(false);
        return;
      }
      if (event.key === "Enter" && isContinueHighlighted) {
        event.preventDefault();
        router.push(continueRoute);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [continueRoute, isContinueHighlighted, router]);

  const currentWords =
    activeIndex >= 0 && activeIndex < paragraphs.length
      ? paragraphs[activeIndex].split(" ").slice(0, visibleWordCount).join(" ")
      : "";
  const playerPresentation = CHARACTER_PRESENTATIONS[selectedCharacter];

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-black">
      <div
        className="scene-bg absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/background/hockleescenes/cutscene.png')" }}
      />

      <div
        className="absolute left-6 top-6 z-10 max-w-[340px]"
        style={{
          fontFamily: "\"PPNeueBit Bold\", \"PPNeueBit\", monospace",
        }}
      >
        <div className="rounded-full border-2 border-[#911010] bg-[rgba(29,5,5,0.88)] px-4 py-2 text-xl uppercase tracking-[0.24em] text-[#ff5b52]">
          {cutscene.badge}
        </div>
        <div className="mt-3 pixel-corners bg-[rgba(244,209,166,0.92)] px-4 py-3 text-2xl leading-tight text-[#1a0f0a]">
          {cutscene.heading}
        </div>
      </div>

      <section
        className="absolute left-1/2 top-1/2 z-10 flex w-[40%] -translate-x-1/2 -translate-y-1/2 flex-col gap-6 pb-20"
        style={{
          fontFamily: "\"PPNeueBit Bold\", \"PPNeueBit\", monospace",
        }}
      >
        <div className="flex flex-col gap-6">
          <div className="flex items-start gap-4">
            <div className="flex flex-col items-center gap-2">
              <img
                src="/character-profile-pics/merlion.png"
                alt="Merlion"
                style={{ width: "72px", height: "72px", objectFit: "cover" }}
              />
              <div
                style={{
                  color: "#0a0a0a",
                  fontSize: "24px",
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                  textShadow:
                    "1px 0 #ff7700, -1px 0 #ff7700, 0 1px #ff7700, 0 -1px #ff7700, 1px 1px #ff7700, -1px 1px #ff7700, 1px -1px #ff7700, -1px -1px #ff7700",
                }}
              >
                Merlion
              </div>
            </div>
            <div
              className="pixel-corners"
              style={{
                backgroundColor: "#f4d1a6",
                color: "#1a0f0a",
                padding: "14px 16px",
                fontSize: "22px",
                letterSpacing: "0.4px",
                maxWidth: "85%",
                height: "240px",
                overflowY: "auto",
                border: "3px solid #8bd3ff",
              }}
              ref={merlionBubbleRef}
            >
              <div className="relative">
                {prevParagraph ? (
                  <p
                    key={`previous-paragraph-${activeIndex}`}
                    style={{
                      margin: 0,
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      opacity: isPrevVisible ? 1 : 0,
                      transition: "opacity 1s ease",
                    }}
                  >
                    {prevParagraph}
                  </p>
                ) : null}
                {currentWords ? (
                  <p
                    key={`active-paragraph-${activeIndex}`}
                    style={{
                      margin: 0,
                    }}
                  >
                    {currentWords}
                  </p>
                ) : null}
              </div>
            </div>
          </div>
          <div className="flex items-start justify-end gap-4">
            <div
              className="pixel-corners"
              style={{
                backgroundColor: "#ffb700",
                color: "#5c4638",
                padding: "10px 12px",
                fontSize: "20px",
                letterSpacing: "0.3px",
                maxWidth: "70%",
                border: "8px solid #ff0000",
              }}
            >
              <label className="sr-only" htmlFor="player-input">
                Ask your questions
              </label>
              <input
                id="player-input"
                type="text"
                value={playerInput}
                onChange={(event) => setPlayerInput(event.target.value)}
                placeholder="Ask your questions!"
                className="w-full bg-transparent outline-none"
                style={{
                  color: "inherit",
                  fontFamily: "inherit",
                  fontSize: "20px",
                  letterSpacing: "0.3px",
                  caretColor: "#5c4638",
                }}
              />
            </div>
            <div className="flex flex-col items-center gap-2">
              <img
                src={playerPresentation.cutsceneSprite}
                alt={playerPresentation.playerAlt}
                style={{
                  width: "120px",
                  height: "120px",
                  objectFit: "contain",
                  imageRendering: "pixelated",
                  filter:
                    "drop-shadow(1px 0 0 #ff7700) drop-shadow(-1px 0 0 #ff7700) drop-shadow(0 1px 0 #ff7700) drop-shadow(0 -1px 0 #ff7700) drop-shadow(1px 1px 0 #ff7700) drop-shadow(-1px 1px 0 #ff7700) drop-shadow(1px -1px 0 #ff7700) drop-shadow(-1px -1px 0 #ff7700)",
                }}
              />
              <div
                style={{
                  color: "#0a0a0a",
                  fontSize: "24px",
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                  textShadow:
                    "1px 0 #ff7700, -1px 0 #ff7700, 0 1px #ff7700, 0 -1px #ff7700, 1px 1px #ff7700, -1px 1px #ff7700, 1px -1px #ff7700, -1px -1px #ff7700",
                }}
              >
                {playerPresentation.playerFullName}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2">
        <button
          type="button"
          className="artifact-label artifact-button pixel-corners flex items-center justify-center gap-2 rounded-full border px-4 py-2 uppercase tracking-[0.2em]"
          onClick={() => router.push(continueRoute)}
          onMouseEnter={() => setIsContinueHovered(true)}
          onMouseLeave={() => setIsContinueHovered(false)}
          style={{
            backgroundColor: isContinueHighlighted ? "#f24747" : "#fff4d9",
            color: "#1a1513",
            fontFamily: "\"PPNeueBit Bold\", \"PPNeueBit\", monospace",
            borderColor:
              isContinueHighlighted || isContinueHovered ? "#7a1c1c" : "#d9b58f",
          }}
        >
          {cutscene.continueLabel} <span className="text-base leading-none">↵</span>
        </button>
      </div>
    </main>
  );
}
