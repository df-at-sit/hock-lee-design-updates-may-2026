"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { GameMenuOverlay } from "./game-menu-overlay";
import {
  buildRoleAwareRoute,
  CHARACTER_PRESENTATIONS,
  CUTSCENE_CONTENT_BY_ROLE,
  getNextRouteForCutscene,
  type StoryCutsceneKind,
} from "./story-data";
import type { CharacterCode } from "./scenes";
import { useSelectedCharacterCode } from "./use-selected-character-code";

type RoleCutscenePageProps = {
  kind: StoryCutsceneKind;
};

export function RoleCutscenePage({ kind }: RoleCutscenePageProps) {
  const searchParams = useSearchParams();
  const selectedCharacter = useSelectedCharacterCode(searchParams.get("role"));

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
  selectedCharacter: CharacterCode;
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
  const [isContinueHighlighted, setIsContinueHighlighted] = useState(false);
  const [isContinueHovered, setIsContinueHovered] = useState(false);
  const [isSkipHovered, setIsSkipHovered] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
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
  const isMerlionDone =
    paragraphs.length > 0 &&
    activeIndex === paragraphs.length - 1 &&
    visibleWordCount >= paragraphs[paragraphs.length - 1].split(" ").length;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (isHelpOpen) {
          event.preventDefault();
          setIsHelpOpen(false);
          return;
        }
        if (isMenuOpen) {
          event.preventDefault();
          setIsMenuOpen(false);
          return;
        }
      }
      if (isMenuOpen || isHelpOpen) {
        return;
      }
      if (event.key === "ArrowDown") {
        event.preventDefault();
        if (isMerlionDone) {
          setIsContinueHighlighted(true);
        }
        return;
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        setIsContinueHighlighted(false);
        return;
      }
      if (event.key === "Enter" && isContinueHighlighted && isMerlionDone) {
        event.preventDefault();
        router.push(continueRoute);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    continueRoute,
    isContinueHighlighted,
    isHelpOpen,
    isMenuOpen,
    isMerlionDone,
    router,
  ]);

  const currentWords =
    activeIndex >= 0 && activeIndex < paragraphs.length
      ? paragraphs[activeIndex].split(" ").slice(0, visibleWordCount).join(" ")
      : "";
  const playerPresentation = CHARACTER_PRESENTATIONS[selectedCharacter];
  const continueHighlighted = isMerlionDone && isContinueHighlighted;
  const continueHovered = isMerlionDone && isContinueHovered;
  const navigateToNextScene = () => {
    router.push(continueRoute);
  };
  const handleMenuNavigation = (route: string) => {
    setIsMenuOpen(false);
    setIsHelpOpen(false);
    router.push(route);
  };

  return (
    <main className="relative min-h-screen h-dvh w-full overflow-hidden bg-black">
      <div
        className="scene-bg absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/background/hockleescenes/cutscene.png')" }}
      />

      <div className="scene-menu-help-controls z-20">
        <div className="ui-button-shell ui-button-shell--menu pixel-corners--wrapper">
          <button
            type="button"
            className="ui-button ui-button--menu pixel-corners"
            aria-label="Menu"
            onClick={() => {
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
              setIsMenuOpen(false);
              setIsHelpOpen(true);
            }}
          >
            <span className="ui-button-icon">?</span>
          </button>
        </div>
      </div>

      <section
        className="absolute left-1/2 top-1/2 z-10 flex w-[min(42rem,calc(100vw-5rem))] -translate-x-1/2 -translate-y-1/2 flex-col gap-6"
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
              className="pixel-corners hl-cutscene-dialogue-bubble"
              style={{
                backgroundColor: "#f4d1a6",
                color: "#1a0f0a",
                letterSpacing: "0.4px",
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
          <div className="flex justify-start pl-[88px]">
            <button
              type="button"
              className="artifact-label pixel-corners border px-3 py-2 uppercase tracking-[0.18em]"
              onClick={navigateToNextScene}
              onMouseEnter={() => setIsSkipHovered(true)}
              onMouseLeave={() => setIsSkipHovered(false)}
              style={{
                width: "fit-content",
                minWidth: "120px",
                backgroundColor: isSkipHovered ? "#ffb700" : "#f24747",
                color: isSkipHovered ? "#1a1513" : "#fff4d9",
                borderColor: isSkipHovered ? "#7a1c1c" : "#7a1c1c",
                fontFamily: "\"PPNeueBit Bold\", \"PPNeueBit\", monospace",
                fontSize: "18px",
                fontWeight: 700,
                lineHeight: 1,
                textShadow: "none",
              }}
            >
              Skip
            </button>
          </div>
          <div className="flex items-start justify-end gap-4">
            <div className="flex flex-1 flex-col items-end">
              <button
                type="button"
                className="artifact-label artifact-button pixel-corners flex w-full items-center justify-center gap-2 border px-4 py-3 uppercase tracking-[0.2em]"
                disabled={!isMerlionDone}
                aria-disabled={!isMerlionDone}
                onClick={() => {
                  if (!isMerlionDone) return;
                  navigateToNextScene();
                }}
                onMouseEnter={() => {
                  if (isMerlionDone) {
                    setIsContinueHovered(true);
                  }
                }}
                onMouseLeave={() => setIsContinueHovered(false)}
                style={{
                  backgroundColor: !isMerlionDone
                    ? "#b3aca2"
                    : continueHighlighted
                    ? "#f24747"
                    : continueHovered
                      ? "#ffb700"
                      : "#fff4d9",
                  color: !isMerlionDone ? "#6a6258" : "#1a1513",
                  fontFamily: "\"PPNeueBit Bold\", \"PPNeueBit\", monospace",
                  fontSize: "24px",
                  lineHeight: 1,
                  minHeight: "72px",
                  maxWidth: "70%",
                  borderColor: !isMerlionDone
                    ? "#8d867d"
                    : continueHighlighted || continueHovered
                      ? "#7a1c1c"
                      : "#d9b58f",
                  cursor: isMerlionDone ? "pointer" : "not-allowed",
                  opacity: isMerlionDone ? 1 : 0.8,
                }}
              >
                {cutscene.continueLabel} <span className="text-base leading-none">↵</span>
              </button>
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
            aria-labelledby="cutscene-help-title"
          >
            <div id="cutscene-help-title" className="artifact-label text-4xl sm:text-6xl">
              Cutscene Guide
            </div>
            <p className="mt-3 text-2xl leading-relaxed sm:text-3xl">
              Merlion introduces each phase, explains the historical stakes, and frames your role before the story continues.
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-xl sm:text-3xl">
              <li>Read the dialogue box to understand the historical context for this phase and character.</li>
              <li>Use the button beside your character to move on when you are ready.</li>
              <li>Open the menu if you want to restart, switch characters, or leave the game.</li>
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
    </main>
  );
}
