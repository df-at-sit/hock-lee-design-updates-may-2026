"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { MindsetKey } from "./disposition-state";
import { DispositionRadarPanel } from "./disposition-radar-panel";
import { useDispositionProfile } from "./disposition-state";
import { CHARACTER_JOURNEY_CONTENT, CHARACTER_ROLE_LABELS } from "./character-content";
import {
  buildRoleAwareRoute,
  CHARACTER_PRESENTATIONS,
  getRoleSteps,
} from "./story-data";
import {
  MERLION_STUDENT_HUNGRY_BUS_WORKERS_INCOMPLETE_MESSAGE,
  getMerlionCompletionMessage,
} from "./merlion-checkpoints";
import {
  GLOBAL_SIDE_QUESTS,
  STUDENT_HUNGRY_BUS_WORKERS_SIDE_QUEST_ID,
  useAcceptedSideQuestIds,
  useCompletedSideQuestActions,
} from "./sidequest-state";
import { HOCK_LEE_MAP_ROUTE, WHAT_REALLY_HAPPENED_ROUTE } from "./story-paths";
import { useSelectedCharacterCode } from "./use-selected-character-code";

const DISPLAY_QUALITY_LABELS = {
  awareness: "Awareness",
  curiosity: "Curiosity",
  empathy: "Empathy",
} as const;

type DisplayQualityKey = keyof typeof DISPLAY_QUALITY_LABELS;

const DISPLAY_QUALITY_ORDER: DisplayQualityKey[] = [
  "awareness",
  "curiosity",
  "empathy",
];

const getDisplayQualityValue = (
  key: DisplayQualityKey,
  profile: Record<MindsetKey, number>
) => {
  if (key === "awareness") {
    return Math.round((profile.courage + profile.tenacity + profile.optimism) / 3);
  }

  return profile[key];
};

const buildFocusSummary = (
  profile: Record<MindsetKey, number>,
  interactionCount: number
) => {
  if (interactionCount === 0) {
    return "Your bars are still at their starting baseline because this route has not recorded any unique interactions yet.";
  }

  const strongestQualities = [...DISPLAY_QUALITY_ORDER]
    .sort(
      (left, right) =>
        getDisplayQualityValue(right, profile) - getDisplayQualityValue(left, profile)
    )
    .slice(0, 2)
    .map((qualityKey) => DISPLAY_QUALITY_LABELS[qualityKey].toLowerCase());

  return `You showed the strongest focus on ${strongestQualities[0]} and ${strongestQualities[1]} in this route.`;
};

const lockFullscreenPage = () => {
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
};

export function EndingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedCharacter = useSelectedCharacterCode(searchParams.get("role"));
  const [isMerlionChatOpen, setIsMerlionChatOpen] = useState(true);
  const content = CHARACTER_JOURNEY_CONTENT[selectedCharacter];
  const presentation = CHARACTER_PRESENTATIONS[selectedCharacter];
  const roleSteps = getRoleSteps(selectedCharacter);
  const finalSceneRoute = roleSteps[roleSteps.length - 1]?.route ?? HOCK_LEE_MAP_ROUTE;
  const { interactionCount, profile } = useDispositionProfile(selectedCharacter);
  const focusSummary = buildFocusSummary(profile, interactionCount);
  const roleLabel = CHARACTER_ROLE_LABELS[selectedCharacter];
  const acceptedSideQuestIds = useAcceptedSideQuestIds();
  const completedSideQuestActions = useCompletedSideQuestActions();
  const hungryBusWorkersQuest = GLOBAL_SIDE_QUESTS.find(
    (sideQuest) => sideQuest.id === STUDENT_HUNGRY_BUS_WORKERS_SIDE_QUEST_ID
  );
  const isHungryBusWorkersQuestAccepted =
    selectedCharacter === "CS" &&
    acceptedSideQuestIds.includes(STUDENT_HUNGRY_BUS_WORKERS_SIDE_QUEST_ID);
  const hungryBusWorkersCompletedActionIds =
    completedSideQuestActions[STUDENT_HUNGRY_BUS_WORKERS_SIDE_QUEST_ID] ?? [];
  const isHungryBusWorkersQuestComplete =
    hungryBusWorkersQuest?.actions.every((action) =>
      hungryBusWorkersCompletedActionIds.includes(action.id)
    ) ?? false;
  const merlionChatMessage =
    isHungryBusWorkersQuestAccepted && !isHungryBusWorkersQuestComplete
      ? MERLION_STUDENT_HUNGRY_BUS_WORKERS_INCOMPLETE_MESSAGE
      : getMerlionCompletionMessage(selectedCharacter);

  useEffect(() => {
    router.prefetch(buildRoleAwareRoute(WHAT_REALLY_HAPPENED_ROUTE, selectedCharacter));
  }, [router, selectedCharacter]);

  useEffect(() => lockFullscreenPage(), []);

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
      return;
    }

    router.push(buildRoleAwareRoute(finalSceneRoute, selectedCharacter));
  };

  const handleFinish = () => {
    router.push(buildRoleAwareRoute(WHAT_REALLY_HAPPENED_ROUTE, selectedCharacter));
  };

  return (
    <main className="hl-character-select-page hl-post-story-page">
      <div className="hl-character-select-stage hl-post-story-stage hl-ending-stage">
        <section className="hl-ending-board-shell">
          <article className="hl-ending-board">
            <header className="hl-ending-title-plaque">
              <span className="hl-ending-title-text">{`THE ${roleLabel.toUpperCase()}`}</span>
            </header>

            <div className="hl-ending-board-content">
              <section className="hl-ending-pane hl-ending-pane--mission">
                <div className="hl-ending-section-label">Your Mission</div>

                <div className="hl-ending-mission-layout">
                  <div
                    className="hl-ending-sprite-frame"
                    data-character={selectedCharacter}
                  >
                    <div className="hl-ending-sprite-role-tag">
                      {presentation.playerFullName}
                    </div>
                    <div className="hl-ending-sprite-viewport">
                      <Image
                        alt={presentation.playerAlt}
                        className="hl-ending-character-figure"
                        draggable={false}
                        src={presentation.markerSprite}
                        unoptimized
                        width={320}
                        height={320}
                      />
                    </div>
                  </div>

                  <ul className="hl-ending-mission-list">
                    {content.endingMission.map((item) => (
                      <li key={item} className="hl-ending-mission-item">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              <section className="hl-ending-pane hl-ending-pane--focus">
                <div className="hl-ending-section-label">Your Focus</div>

                <div className="hl-ending-focus-layout">
                  <DispositionRadarPanel
                    className="hl-ending-radar-panel"
                    selectedCharacterCode={selectedCharacter}
                  />
                  <p className="hl-ending-focus-summary">{focusSummary}</p>
                </div>
              </section>
            </div>
          </article>
        </section>

        <div className="scene-panel-merlion hl-ending-merlion-panel">
          <div className="hl-merlion-hud-anchor">
            {isMerlionChatOpen ? (
              <div
                id="ending-merlion-chat"
                className="hl-merlion-chat-bubble-shell"
                role="status"
              >
                <div className="hl-merlion-chat-bubble npc-chat-bubble pixel-corners">
                  <span className="npc-chat-text">{merlionChatMessage}</span>
                </div>
              </div>
            ) : null}
            <button
              type="button"
              className="hl-merlion-hud-button"
              aria-label="Talk to Merlion"
              aria-expanded={isMerlionChatOpen}
              aria-controls="ending-merlion-chat"
              onClick={() => setIsMerlionChatOpen((isOpen) => !isOpen)}
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
              className="pixel-corners hl-character-select-action hl-character-select-action--select"
              onClick={handleFinish}
              type="button"
            >
              Finish
            </button>
          </div>
        </div>

        <div className="hl-character-select-floor" aria-hidden="true" />
      </div>
    </main>
  );
}
