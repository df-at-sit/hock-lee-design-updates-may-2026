"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition, type CSSProperties } from "react";
import {
  MAP_LAST_NODE_KEY,
  MAP_UNLOCK_ANIMATION_SCENE_KEY,
  MAP_VISITED_PROGRESS_KEY,
} from "../map-progression";
import { CHARACTER_LABELS, type CharacterCode } from "../scenes";
import {
  buildRoleAwareRoute,
  CHARACTER_PRESENTATIONS,
  SELECTED_CHARACTER_STORAGE_KEY,
} from "../story-data";
import {
  CHARACTER_JOURNEY_CONTENT,
  CHARACTER_ORDER,
  CHARACTER_ROLE_LABELS,
} from "../character-content";
import { clearAllDispositionProgress } from "../disposition-state";
import { HOCK_LEE_MAP_ROUTE } from "../story-paths";
import { SceneTitleWithCamera } from "../scene-title-with-camera";

const INVENTORY_STORAGE_KEY = "inventorySlots";

export default function ChooseYourCharacterPage() {
  const router = useRouter();
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterCode>("BW");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    router.prefetch(HOCK_LEE_MAP_ROUTE);
  }, [router]);

  useEffect(() => {
    const { body, documentElement } = document;
    const previousHtmlOverflow = documentElement.style.overflow;
    const previousBodyOverflow = body.style.overflow;
    const previousHtmlHeight = documentElement.style.height;
    const previousBodyHeight = body.style.height;
    const previousBodyOverscroll = body.style.overscrollBehavior;

    documentElement.style.overflow = "hidden";
    body.style.overflow = "hidden";
    documentElement.style.height = "100%";
    body.style.height = "100%";
    body.style.overscrollBehavior = "none";

    return () => {
      documentElement.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
      documentElement.style.height = previousHtmlHeight;
      body.style.height = previousBodyHeight;
      body.style.overscrollBehavior = previousBodyOverscroll;
    };
  }, []);

  const selectedOption = CHARACTER_JOURNEY_CONTENT[selectedCharacter];
  const selectedIndex = CHARACTER_ORDER.findIndex((character) => character === selectedCharacter);

  const handleStepCharacter = (direction: -1 | 1) => {
    const nextIndex =
      (selectedIndex + direction + CHARACTER_ORDER.length) % CHARACTER_ORDER.length;
    setSelectedCharacter(CHARACTER_ORDER[nextIndex]);
  };

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
      return;
    }

    router.push("/");
  };

  const handleSelect = () => {
    if (typeof window === "undefined") return;

    window.localStorage.setItem(SELECTED_CHARACTER_STORAGE_KEY, selectedCharacter);
    window.localStorage.removeItem(MAP_LAST_NODE_KEY);
    window.localStorage.removeItem(MAP_VISITED_PROGRESS_KEY);
    window.localStorage.removeItem(MAP_UNLOCK_ANIMATION_SCENE_KEY);
    window.localStorage.removeItem(INVENTORY_STORAGE_KEY);
    clearAllDispositionProgress();

    startTransition(() => {
      router.push(buildRoleAwareRoute(HOCK_LEE_MAP_ROUTE, selectedCharacter));
    });
  };

  return (
    <main className="hl-character-select-page">
      <div className="hl-character-select-stage">
        <div className="hl-character-select-header">
          <div className="scene-title-stack">
            <SceneTitleWithCamera>Choose A Character</SceneTitleWithCamera>
          </div>
        </div>

        <section className="hl-character-select-layout">
          <div className="pixel-corners--wrapper hl-character-select-panel-shell">
            <article className="pixel-corners hl-character-select-panel">
              <div className="pixel-corners--wrapper hl-character-select-mission-shell">
                <div
                  className="scene-description hl-character-select-mission pixel-corners"
                  data-collapsed="false"
                >
                  <div className="scene-title-stack hl-character-select-panel-stack">
                    <SceneTitleWithCamera
                      titleClassName="hl-character-select-role-title"
                      wrapperClassName="hl-character-select-role-shell"
                    >
                      {CHARACTER_ROLE_LABELS[selectedCharacter].toUpperCase()}
                    </SceneTitleWithCamera>
                    <div className="pixel-corners--wrapper hl-character-select-mission-label-shell">
                      <div className="pixel-corners scene-subtitle hl-character-select-mission-label">
                        MISSION
                      </div>
                    </div>
                  </div>
                  <div className="scene-description-content">
                    {selectedOption.mission.map((item) => (
                      <div key={item} className="scene-description-line">
                        • {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          </div>

          <section className="hl-character-select-hero" aria-live="polite">
            <div className="hl-character-select-figure-stage">
              <div className="npc-chat-bubble-shell hl-character-select-chat-bubble">
                <div className="npc-chat-bubble pixel-corners">
                  <span className="npc-chat-speaker">
                    {CHARACTER_PRESENTATIONS[selectedCharacter].playerFullName}
                  </span>
                  <span className="npc-chat-text">{selectedOption.quote}</span>
                </div>
              </div>
              <Image
                alt={CHARACTER_PRESENTATIONS[selectedCharacter].playerAlt}
                className="hl-character-select-figure"
                draggable={false}
                src={CHARACTER_PRESENTATIONS[selectedCharacter].markerSprite}
                unoptimized
                width={460}
                height={460}
              />
            </div>
            <div className="hl-character-select-mission-nav" aria-label="Switch role">
              <button
                aria-label={`Previous role: ${CHARACTER_LABELS[
                  CHARACTER_ORDER[
                    (selectedIndex - 1 + CHARACTER_ORDER.length) % CHARACTER_ORDER.length
                  ]
                ]
                  }`}
                className="pixel-corners hl-character-select-mission-arrow hl-character-select-mission-arrow--prev"
                onClick={() => handleStepCharacter(-1)}
                type="button"
              >
                <span aria-hidden="true" className="hl-character-select-mission-arrow-icon" />
              </button>
              <button
                aria-label={`Next role: ${CHARACTER_LABELS[CHARACTER_ORDER[(selectedIndex + 1) % CHARACTER_ORDER.length]]
                  }`}
                className="pixel-corners hl-character-select-mission-arrow hl-character-select-mission-arrow--next"
                onClick={() => handleStepCharacter(1)}
                type="button"
              >
                <span aria-hidden="true" className="hl-character-select-mission-arrow-icon" />
              </button>
            </div>
          </section>

          <section
            aria-label="Choose one of three characters"
            className="hl-character-select-picker"
            role="radiogroup"
          >
            {CHARACTER_ORDER.map((characterCode, index) => {
              const isSelected = characterCode === selectedCharacter;
              const portraitVars = {
                "--hl-character-portrait-bg": isSelected ? "#e97443" : "#a6d9fc",
                "--hl-character-portrait-frame": isSelected ? "#ffd24a" : "#6f99b5",
                "--hl-character-portrait-glow": isSelected
                  ? "rgba(233, 116, 67, 0.28)"
                  : "transparent",
              } as CSSProperties;

              return (
                <div
                  key={characterCode}
                  className={`pixel-corners--wrapper hl-character-select-portrait-shell ${index === 2 ? "hl-character-select-portrait-shell--wide" : ""
                    }`}
                  data-selected={isSelected}
                  style={portraitVars}
                >
                  <button
                    aria-checked={isSelected}
                    aria-label={CHARACTER_LABELS[characterCode]}
                    className="pixel-corners hl-character-select-portrait"
                    onClick={() => setSelectedCharacter(characterCode)}
                    role="radio"
                    type="button"
                  >
                    <Image
                      alt=""
                      aria-hidden="true"
                      className="hl-character-select-portrait-image"
                      draggable={false}
                      src={CHARACTER_PRESENTATIONS[characterCode].markerSprite}
                      unoptimized
                      width={140}
                      height={140}
                    />
                    <span className="hl-character-select-portrait-name">
                      <strong>{CHARACTER_ROLE_LABELS[characterCode]}</strong>
                    </span>
                  </button>
                </div>
              );
            })}
          </section>
        </section>

        <div className="hl-character-select-actions">
          <div className="pixel-corners--wrapper hl-character-select-action-shell hl-character-select-action-shell--back">
            <button
              className="pixel-corners hl-character-select-action hl-character-select-action--back"
              onClick={handleBack}
              type="button"
            >
              Back
            </button>
          </div>
          <div className="pixel-corners--wrapper hl-character-select-action-shell hl-character-select-action-shell--select">
            <button
              aria-label={`Select ${CHARACTER_LABELS[selectedCharacter]}`}
              className="pixel-corners hl-character-select-action hl-character-select-action--select"
              disabled={isPending}
              onClick={handleSelect}
              type="button"
            >
              {isPending ? "Loading..." : "Start Story"}
            </button>
          </div>
        </div>

        <div className="hl-character-select-floor" aria-hidden="true" />
      </div>
    </main>
  );
}
