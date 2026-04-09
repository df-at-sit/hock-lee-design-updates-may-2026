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
  SELECTED_CHARACTER_STORAGE_KEY,
} from "../story-data";
import { HOCK_LEE_MAP_ROUTE } from "../story-paths";

const INVENTORY_STORAGE_KEY = "inventorySlots";

type CharacterOption = {
  id: CharacterCode;
  sprite: string;
  alt: string;
  portraitBackground: string;
  quote: string;
  mission: string[];
};

const CHARACTER_OPTIONS: CharacterOption[] = [
  {
    id: "BW",
    sprite: "/npcfigures/busworker/south.png",
    alt: "Bus worker sprite",
    portraitBackground: "#efe6dc",
    quote: "I need to make sure the depot workers are heard.",
    mission: [
      "Track how low pay, long shifts, and company decisions push workers toward action.",
      "Observe the bus depot, union pressure, and how unrest grows on the ground.",
      "Document what workers risk when the dispute turns public and political.",
    ],
  },
  {
    id: "CIV",
    sprite: "/npcfigures/civilservant/Civil%20Servant_0001.webp",
    alt: "Civil servant sprite",
    portraitBackground: "#f1ece5",
    quote: "I am here to understand the crisis before it spins out of control.",
    mission: [
      "See how the colonial government and new local leaders respond to rising unrest.",
      "Follow reports, official decisions, and the pressure to maintain public order.",
      "Piece together how political reform, labor demands, and fear of disorder collide.",
    ],
  },
  {
    id: "CS",
    sprite: "/npcfigures/riotfigures/Student%20Union/Student-Riot_South.webp",
    alt: "Chinese student sprite",
    portraitBackground: "#ecebcf",
    quote: "The schools are part of this story too, and students feel every shift.",
    mission: [
      "Witness the Hock Lee tensions through student networks and Chinese-medium schools.",
      "Trace how solidarity, anger, and activism move from classrooms into the streets.",
      "Understand why students become part of a wider anti-colonial struggle.",
    ],
  },
];

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

  const selectedOption =
    CHARACTER_OPTIONS.find((option) => option.id === selectedCharacter) ?? CHARACTER_OPTIONS[0];
  const selectedIndex = CHARACTER_OPTIONS.findIndex((option) => option.id === selectedOption.id);

  const handleStepCharacter = (direction: -1 | 1) => {
    const nextIndex =
      (selectedIndex + direction + CHARACTER_OPTIONS.length) % CHARACTER_OPTIONS.length;
    setSelectedCharacter(CHARACTER_OPTIONS[nextIndex].id);
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

    startTransition(() => {
      router.push(buildRoleAwareRoute(HOCK_LEE_MAP_ROUTE, selectedCharacter));
    });
  };

  return (
    <main className="hl-character-select-page">
      <div className="hl-character-select-stage">
        <div className="hl-character-select-header">
          <div className="scene-title-stack">
            <div className="pixel-corners--wrapper">
              <div className="pixel-corners scene-title">Select Player</div>
            </div>
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
                    <div className="pixel-corners--wrapper hl-character-select-role-shell">
                      <div className="pixel-corners scene-title hl-character-select-role-title">
                        {CHARACTER_LABELS[selectedOption.id].toUpperCase()}
                      </div>
                    </div>
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

          <section className="hl-character-select-hero" aria-live="polite">
            <div className="hl-character-select-figure-stage">
              <div className="npc-chat-bubble-shell hl-character-select-chat-bubble">
                <div className="npc-chat-bubble pixel-corners">
                  <span className="npc-chat-text">{selectedOption.quote}</span>
                </div>
              </div>
              <Image
                alt={selectedOption.alt}
                className="hl-character-select-figure"
                height={520}
                priority
                src={selectedOption.sprite}
                width={300}
              />
              <div className="hl-character-select-figure-shadow" aria-hidden="true" />
            </div>
            <div className="hl-character-select-mission-nav" aria-label="Switch role">
              <button
                aria-label={`Previous role: ${
                  CHARACTER_LABELS[
                    CHARACTER_OPTIONS[
                      (selectedIndex - 1 + CHARACTER_OPTIONS.length) % CHARACTER_OPTIONS.length
                    ].id
                  ]
                }`}
                className="pixel-corners hl-character-select-mission-arrow hl-character-select-mission-arrow--prev"
                onClick={() => handleStepCharacter(-1)}
                type="button"
              >
                <span aria-hidden="true" className="hl-character-select-mission-arrow-icon" />
              </button>
              <button
                aria-label={`Next role: ${
                  CHARACTER_LABELS[CHARACTER_OPTIONS[(selectedIndex + 1) % CHARACTER_OPTIONS.length].id]
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
            {CHARACTER_OPTIONS.map((option, index) => {
              const isSelected = option.id === selectedCharacter;
              const portraitVars = {
                "--hl-character-portrait-bg": isSelected ? "#e97443" : "#a6d9fc",
                "--hl-character-portrait-frame": isSelected ? "#ffd24a" : "#6f99b5",
                "--hl-character-portrait-glow": isSelected
                  ? "rgba(233, 116, 67, 0.28)"
                  : "transparent",
              } as CSSProperties;

              return (
                <div
                  key={option.id}
                  className={`pixel-corners--wrapper hl-character-select-portrait-shell ${
                    index === 2 ? "hl-character-select-portrait-shell--wide" : ""
                  }`}
                  data-selected={isSelected}
                  style={portraitVars}
                >
                  <button
                    aria-checked={isSelected}
                    aria-label={CHARACTER_LABELS[option.id]}
                    className="pixel-corners hl-character-select-portrait"
                    onClick={() => setSelectedCharacter(option.id)}
                    role="radio"
                    type="button"
                  >
                    <Image
                      alt=""
                      aria-hidden="true"
                      className="hl-character-select-portrait-image"
                      height={120}
                      src={option.sprite}
                      width={120}
                    />
                    <span className="hl-character-select-portrait-name">
                      {CHARACTER_LABELS[option.id]}
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
              {isPending ? "Loading..." : "Select"}
            </button>
          </div>
        </div>

        <div className="hl-character-select-floor" aria-hidden="true" />
      </div>
    </main>
  );
}
