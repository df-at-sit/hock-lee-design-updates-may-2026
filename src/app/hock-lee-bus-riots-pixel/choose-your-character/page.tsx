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
import {
  SIDEQUEST_ACCEPTED_STORAGE_KEY,
  SIDEQUEST_COMPLETED_ACTIONS_STORAGE_KEY,
} from "../sidequest-state";

const INVENTORY_STORAGE_KEY = "inventorySlots";
const CHARACTER_SELECT_ROLE_LABELS: Partial<Record<CharacterCode, string>> = {
  CIV: "Junior Civil Servant",
};

export default function ChooseYourCharacterPage() {
  const router = useRouter();
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterCode>("CIV");
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
  const selectedRoleLabel =
    CHARACTER_SELECT_ROLE_LABELS[selectedCharacter] ?? CHARACTER_ROLE_LABELS[selectedCharacter];

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
    window.localStorage.removeItem(SIDEQUEST_ACCEPTED_STORAGE_KEY);
    window.localStorage.removeItem(SIDEQUEST_COMPLETED_ACTIONS_STORAGE_KEY);
    clearAllDispositionProgress();

    startTransition(() => {
      router.push(buildRoleAwareRoute(HOCK_LEE_MAP_ROUTE, selectedCharacter));
    });
  };

  return (
    <main className="hl-character-select-page hl-character-select-page--choose">
      <div className="hl-character-select-stage">
        <section className="hl-character-select-layout">
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
          </section>

          <section className="hl-character-select-details">
            <div className="hl-character-select-header">
              <div className="scene-title-stack">
                <SceneTitleWithCamera>SELECT PLAYER</SceneTitleWithCamera>
              </div>
            </div>

            <section
              aria-label="Choose one of three characters"
              className="hl-character-select-picker"
              role="radiogroup"
            >
              {CHARACTER_ORDER.map((characterCode) => {
                const isSelected = characterCode === selectedCharacter;
                const portraitVars = {
                  "--hl-character-portrait-bg": isSelected ? "#ff8300" : "#bfbfbf",
                  "--hl-character-portrait-frame": isSelected ? "#111111" : "#6a6a6a",
                  "--hl-character-portrait-glow": "transparent",
                } as CSSProperties;

                return (
                  <div
                    key={characterCode}
                    className="single-one-step hl-character-select-portrait-shell"
                    data-selected={isSelected}
                    style={portraitVars}
                  >
                    <button
                      aria-checked={isSelected}
                      aria-label={CHARACTER_LABELS[characterCode]}
                      className="one-step-border__content hl-character-select-portrait"
                      data-character={characterCode}
                      onClick={() => setSelectedCharacter(characterCode)}
                      role="radio"
                      type="button"
                    >
                      <span className="hl-character-select-portrait-image-viewport">
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
                      </span>
                      <span className="hl-character-select-portrait-name">
                        <strong>{CHARACTER_ROLE_LABELS[characterCode]}</strong>
                      </span>
                    </button>
                  </div>
                );
              })}
            </section>

            <div className="pixel-corners--wrapper hl-character-select-panel-shell">
              <article className="pixel-corners hl-character-select-panel">
                <div className="double-one-step hl-character-select-mission-shell">
                  <div
                    className="scene-description one-step-border__content hl-character-select-mission"
                    data-collapsed="false"
                  >
                    <div className="scene-title-stack hl-character-select-panel-stack">
                      <SceneTitleWithCamera
                        titleClassName="hl-character-select-role-title"
                        wrapperClassName="hl-character-select-role-shell"
                      >
                        {selectedRoleLabel.toUpperCase()}
                      </SceneTitleWithCamera>
                      <div className="pixel-corners--wrapper hl-character-select-mission-label-shell">
                        <div className="pixel-corners scene-subtitle hl-character-select-mission-label">
                          Mission
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
              {isPending ? "Loading..." : "Confirm"}
            </button>
          </div>
        </div>

        <div className="hl-character-select-floor" aria-hidden="true" />
      </div>
    </main>
  );
}
